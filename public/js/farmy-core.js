// FARMY Core Engine & Shared Logic
// Manages offline-first persistence (localStorage), agronomic algorithms,
// and API communications with automatic local fallback.

const CONFIG = {
  API_BASE_URL: '/api'
};

// Safe LocalStorage wrapper
const Storage = {
  get(key, defaultValue = null) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.warn('Storage.get error:', e);
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage.set error:', e);
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {}
  }
};

// Default initial state
const defaultFarm = [
  {
    cropId: 'tomato',
    area: 1,
    plantedDate: new Date(Date.now() - 32 * 86400000).toISOString().slice(0, 10)
  }
];

const FarmyState = {
  user: Storage.get('farmy_user', { name: 'Ravi', contact: '9876543210', method: 'phone' }),
  session: Storage.get('farmy_session', null),
  farmId: Storage.get('farmy_farm_id', null),
  backendOnline: null,
  myFarm: Storage.get('farmy_my_farm', defaultFarm),
  soilResult: Storage.get('farmy_soil_result', null),
  weatherCache: null,
  chat: Storage.get('farmy_chat', [
    { role: 'assistant', text: "Hello! I'm Farmy Assistant 🌱. Ask me anything about planting, watering, fertilizer, pests, or your farm." }
  ]),
  saveUser(u) {
    this.user = u;
    Storage.set('farmy_user', u);
  },
  saveMyFarm(farm) {
    this.myFarm = farm;
    Storage.set('farmy_my_farm', farm);
  },
  saveSoilResult(res) {
    this.soilResult = res;
    Storage.set('farmy_soil_result', res);
  },
  saveChat(messages) {
    this.chat = messages;
    Storage.set('farmy_chat', messages);
  },
  logout() {
    this.user = null;
    this.session = null;
    Storage.remove('farmy_user');
    Storage.remove('farmy_session');
    Storage.remove('farmy_farm_id');
  }
};

// DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// Safe crop finder
function findCrop(id) {
  const crops = (typeof window !== "undefined" ? window.CROPS : globalThis.CROPS) || [];
  if (!id) return crops[0] || null;
  return crops.find(c => c.id === id) || crops[0] || null;
}

// Stage calculation helper
function getCropGrowthStage(crop, days) {
  if (!crop || !crop.stages || !crop.stages.length) {
    return { name: 'Growth', care: 'Normal crop care', water: 'Regular', fert: 'Standard', warn: 'None' };
  }
  const safeDays = Math.max(0, parseInt(days, 10) || 0);
  for (let i = 0; i < crop.stages.length; i++) {
    const s = crop.stages[i];
    const parts = s.days.split(/[–-]/).map(x => parseInt(x.trim(), 10));
    const end = parts.length > 1 ? parts[1] : parts[0];
    if (safeDays <= end) {
      return s;
    }
  }
  // Days exceed stages -> Harvesting / Mature
  return crop.stages[crop.stages.length - 1];
}

// ================= API LAYER =================
async function apiFetch(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (FarmyState.session && FarmyState.session.access_token) {
    headers['Authorization'] = 'Bearer ' + FarmyState.session.access_token;
  }
  const res = await fetch(CONFIG.API_BASE_URL + path, Object.assign({}, opts, { headers }));
  let data = null;
  try {
    data = await res.json();
  } catch (e) {}
  if (!res.ok) {
    throw new Error((data && data.error) || ('Request failed (' + res.status + ')'));
  }
  return data;
}

async function checkBackend(callback) {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch(CONFIG.API_BASE_URL + '/health', { signal: ctrl.signal });
    clearTimeout(t);
    FarmyState.backendOnline = Boolean(res.ok);
  } catch (e) {
    FarmyState.backendOnline = false;
  }
  updateStatusPills();
  if (callback) callback(FarmyState.backendOnline);
}

function updateStatusPills() {
  const pills = $$('.backend-status-pill');
  if (!pills.length) return;
  const html = FarmyState.backendOnline
    ? `<div class="statuspill on">🟢 ${window.t ? window.t('common.liveMode') : 'Live mode'} </div>`
    : `<div class="statuspill off">🟡 ${window.t ? window.t('common.demoMode') : 'Demo mode'} — offline/local data ready</div>`;
  pills.forEach(p => { p.innerHTML = html; });
}

// ================= AGRONOMIC ALGORITHMS (LOCAL FALLBACKS) =================

// Weather
function getWeatherDemo() {
  return {
    temp: 29,
    humidity: 68,
    condition: 'Partly cloudy (sample forecast)',
    rainChance: 30,
    forecast: [
      { d: 'Today', t: 29, r: 30 },
      { d: 'Tomorrow', t: 31, r: 10 },
      { d: 'Wed', t: 27, r: 60 },
      { d: 'Thu', t: 28, r: 45 },
      { d: 'Fri', t: 30, r: 15 }
    ]
  };
}

function weatherAlerts(w) {
  const alerts = [];
  if (w.rainChance >= 60) alerts.push({ icon: '🚨', text: 'Heavy rain expected — consider skipping irrigation today.' });
  if (w.temp >= 34) alerts.push({ icon: '🔥', text: 'High temperature — monitor moisture closely for heat-sensitive crops.' });
  if (w.humidity >= 80) alerts.push({ icon: '🐛', text: 'High humidity may increase fungal disease risk — inspect crops closely.' });
  if (alerts.length === 0) alerts.push({ icon: '✅', text: 'No major weather risks right now — regular crop care applies.' });
  return alerts;
}

function weatherSuitability(crop, w) {
  if (!crop) return { msgs: [], score: 80 };
  const msgs = [];
  let score = 100;
  if (w.temp < crop.temp[0] || w.temp > crop.temp[1]) {
    msgs.push({ icon: '❌', text: `Current temperature (${w.temp}°C) is outside ${crop.name}'s ideal range (${crop.temp[0]}–${crop.temp[1]}°C).` });
    score -= 30;
  } else {
    msgs.push({ icon: '✅', text: `Current temperature (${w.temp}°C) fits ${crop.name}'s ideal range.` });
  }
  if (w.humidity > crop.humidity[1] + 15) {
    msgs.push({ icon: '⚠️', text: `Humidity (${w.humidity}%) is high for ${crop.name} — watch for fungal disease.` });
    score -= 15;
  } else if (w.humidity < crop.humidity[0] - 15) {
    msgs.push({ icon: '⚠️', text: `Humidity (${w.humidity}%) is low for ${crop.name}.` });
    score -= 10;
  } else {
    msgs.push({ icon: '✅', text: `Humidity (${w.humidity}%) is suitable for ${crop.name}.` });
  }
  if (w.rainChance > 60 && crop.water === 'Low') {
    msgs.push({ icon: '⚠️', text: `Heavy rain forecast — ${crop.name} prefers drier conditions, watch for waterlogging.` });
    score -= 10;
  }
  return { msgs, score: Math.max(0, Math.min(100, score)) };
}

// Crop Recommendation
function scoreCropLocal(crop, cond) {
  let score = 0;
  const reasons = [];

  // 1. pH
  const ph = parseFloat(cond.ph);
  if (!isNaN(ph)) {
    if (ph >= crop.ph[0] && ph <= crop.ph[1]) {
      score += 25;
      reasons.push({ ok: true, text: `Soil pH ${ph} is within the ideal ${crop.ph[0]}–${crop.ph[1]} range` });
    } else {
      const dist = Math.min(Math.abs(ph - crop.ph[0]), Math.abs(ph - crop.ph[1]));
      score += Math.max(0, 25 - dist * 20);
      reasons.push({ ok: false, text: `Soil pH ${ph} is outside ideal ${crop.ph[0]}–${crop.ph[1]} range` });
    }
  }

  // 2. Temperature
  const temp = parseFloat(cond.temp);
  if (!isNaN(temp)) {
    if (temp >= crop.temp[0] && temp <= crop.temp[1]) {
      score += 25;
      reasons.push({ ok: true, text: `Temperature ${temp}°C fits ideal ${crop.temp[0]}–${crop.temp[1]}°C range` });
    } else {
      const dist = Math.min(Math.abs(temp - crop.temp[0]), Math.abs(temp - crop.temp[1]));
      score += Math.max(0, 25 - dist * 2.5);
      reasons.push({ ok: false, text: `Temperature ${temp}°C is outside ideal ${crop.temp[0]}–${crop.temp[1]}°C range` });
    }
  }

  // 3. Soil type
  if (cond.soil) {
    if (crop.soils.includes(cond.soil)) {
      score += 20;
      reasons.push({ ok: true, text: `${cond.soil} soil suits this crop` });
    } else {
      score += 5;
      reasons.push({ ok: false, text: `${cond.soil} soil isn't ideal — best suited to ${crop.soils.join(' or ')}` });
    }
  }

  // 4. Water availability
  if (cond.waterAvail) {
    const order = { Low: 0, Medium: 1, High: 2 };
    const need = order[crop.water.split('-')[0]] ?? 1;
    const have = order[cond.waterAvail] ?? 1;
    if (have >= need) {
      score += 15;
      reasons.push({ ok: true, text: `Water availability (${cond.waterAvail}) meets this crop's ${crop.water} requirement` });
    } else {
      score += Math.max(0, 15 - (need - have) * 8);
      reasons.push({ ok: false, text: `Water availability (${cond.waterAvail}) is below this crop's ${crop.water} requirement` });
    }
  }

  // 5. Season
  if (cond.season) {
    const seasonMatch = crop.seasons.some(s => s.toLowerCase().includes(cond.season.toLowerCase()));
    if (seasonMatch) {
      score += 15;
      reasons.push({ ok: true, text: `${cond.season} matches this crop's growing season` });
    } else {
      reasons.push({ ok: false, text: `${cond.season} is not this crop's typical season (best: ${crop.seasons.join(', ')})` });
    }
  }

  score = Math.round(Math.max(0, Math.min(100, score)));
  let label, cls;
  if (score >= 80) { label = 'Highly Suitable'; cls = 'great'; }
  else if (score >= 60) { label = 'Suitable'; cls = 'good'; }
  else if (score >= 40) { label = 'Moderately Suitable'; cls = 'ok'; }
  else { label = 'Not Recommended'; cls = 'bad'; }

  return { crop, score, label, cls, reasons };
}

function runRecommendationLocal(cond) {
  const crops = (typeof window !== "undefined" ? window.CROPS : globalThis.CROPS) || [];
  return crops.map(c => scoreCropLocal(c, cond)).sort((a, b) => b.score - a.score);
}

// Pest Matching (Case-Insensitive Bug Fix)
function pestMatchLocal(selectedSymptoms = []) {
  const pests = (typeof window !== "undefined" ? window.PESTS : globalThis.PESTS) || {};
  const lowerSel = selectedSymptoms.map(s => String(s).toLowerCase().trim());
  if (!lowerSel.length) return [];

  const matches = Object.entries(pests).map(([id, p]) => {
    const tags = (p.tags || []).map(t => String(t).toLowerCase().trim());
    const matchCount = lowerSel.filter(s => tags.includes(s)).length;
    return { id, ...p, matchCount };
  })
  .filter(p => p.matchCount > 0)
  .sort((a, b) => b.matchCount - a.matchCount);

  return matches;
}

// Soil Health Scoring
function soilHealthScoreLocal(s) {
  let score = 0;
  const notes = [];
  const npkScore = v => (v === 'Medium' ? 10 : v === 'High' ? 8 : 4);

  score += npkScore(s.n) + npkScore(s.p) + npkScore(s.k);
  if (s.n === 'Low') notes.push('Nitrogen is low — consider adding compost, FYM, or urea.');
  if (s.p === 'Low') notes.push('Phosphorus is low — consider rock phosphate or DAP application.');
  if (s.k === 'Low') notes.push('Potassium is low — consider muriate of potash (MOP) application.');

  const ph = parseFloat(s.ph) || 6.5;
  const phDist = Math.abs(ph - 6.5);
  score += Math.max(0, 10 - phDist * 6);
  if (ph < 6.0) notes.push('Soil is acidic — agricultural lime can help raise pH gradually.');
  if (ph > 7.5) notes.push('Soil is alkaline — organic matter and gypsum help normalize pH over time.');

  const moistScore = s.moisture === 'Medium' ? 10 : (s.moisture === 'High' ? 7 : 5);
  score += moistScore;
  if (s.moisture === 'Low') notes.push('Soil moisture is low — increase irrigation or apply mulch.');
  if (s.moisture === 'High') notes.push('Soil moisture is high — ensure good drainage to avoid root rot.');

  score = Math.round(Math.min(100, (score / 50) * 100));
  const label = score >= 75 ? 'Good' : (score >= 50 ? 'Fair' : 'Needs Improvement');
  return { score, label, notes };
}

function compareSoilToCropLocal(s, crop) {
  if (!crop) return [];
  const msgs = [];
  const ph = parseFloat(s.ph) || 6.5;
  if (ph < crop.ph[0]) {
    msgs.push({ icon: '⚠️', text: `Your soil pH (${ph}) is lower than the ideal range for ${crop.name} (${crop.ph[0]}–${crop.ph[1]}).` });
  } else if (ph > crop.ph[1]) {
    msgs.push({ icon: '⚠️', text: `Your soil pH (${ph}) is higher than the ideal range for ${crop.name} (${crop.ph[0]}–${crop.ph[1]}).` });
  } else {
    msgs.push({ icon: '✅', text: `Your soil pH (${ph}) fits ${crop.name}'s ideal range (${crop.ph[0]}–${crop.ph[1]}).` });
  }

  if (s.type && !crop.soils.includes(s.type)) {
    msgs.push({ icon: '⚠️', text: `${crop.name} grows best in ${crop.soils.join(' or ')} — your soil is ${s.type}.` });
  } else {
    msgs.push({ icon: '✅', text: `${s.type || 'Soil'} is well suited to ${crop.name}.` });
  }
  return msgs;
}

// Yield & Profit Prediction
function predictYieldLocal(crop, area = 1, soilScore = 70, method = 'conventional') {
  if (!crop) return { low: 0, high: 0, unit: 'kg' };
  const [lo, hi] = crop.yieldPerAcre;
  const safeArea = Math.max(0.1, parseFloat(area) || 1);
  const safeSoil = Math.max(0, Math.min(100, parseFloat(soilScore) || 70));

  let mult = 0.75 + (safeSoil / 100) * 0.4;
  if (method === 'organic') mult *= 0.92;

  const low = Math.round(lo * safeArea * mult * 0.9);
  const high = Math.round(hi * safeArea * mult * 1.05);
  return { low, high, unit: 'kg' };
}

function calcProfitLocal(payload) {
  const area = Math.max(0.1, parseFloat(payload.areaAcres) || 1);
  const cost = (parseFloat(payload.seedCost) || 0) +
               (parseFloat(payload.fertilizerCost) || 0) +
               (parseFloat(payload.labourCost) || 0) +
               (parseFloat(payload.irrigationCost) || 0) +
               (parseFloat(payload.otherCost) || 0);

  const revenue = (parseFloat(payload.expectedYield) || 0) * (parseFloat(payload.sellingPrice) || 0);
  const profit = revenue - cost;
  return {
    cost,
    revenue,
    profit,
    perAcre: Math.round(profit / area)
  };
}

// Assistant offline rule-based knowledge engine
function assistantLocalFallback(text) {
  const q = String(text || '').toLowerCase();
  const crops = (typeof window !== "undefined" ? window.CROPS : globalThis.CROPS) || [];
  const mentioned = crops.find(c => q.includes(c.name.toLowerCase().split(' ')[0]) || q.includes(c.id));

  if (mentioned) {
    if (/water|irrigat|moist/.test(q)) {
      return `${mentioned.name} needs ${mentioned.water.toLowerCase()} water — ${mentioned.irrigation}. Critical stage: ${mentioned.waterCritical}.`;
    }
    if (/fertil|npk|nutrient|feed|manure/.test(q)) {
      return `${mentioned.name}'s recommended N-P-K is N:${mentioned.npk.n} P:${mentioned.npk.p} K:${mentioned.npk.k} kg/acre. ${mentioned.fertNote}`;
    }
    if (/pest|disease|insect|bug|rot|spot|leaf/.test(q)) {
      const pestList = mentioned.pests.map(id => (typeof window !== "undefined" ? window.PESTS : globalThis.PESTS)?.[id]?.name).filter(Boolean).join(', ');
      return `Common pests & diseases for ${mentioned.name}: ${pestList}. Open the Pest Check page to diagnose symptoms.`;
    }
    if (/plant|sow|seed|spacing|depth|grow/.test(q)) {
      return `For planting ${mentioned.name}: ${mentioned.planting[0]}. Best season: ${mentioned.seasons.join(', ')} (${mentioned.months}). Growth duration: ~${mentioned.duration} days.`;
    }
    return `${mentioned.name} grows best in ${mentioned.soils.join(' or ')} soil, ideal pH ${mentioned.ph[0]}–${mentioned.ph[1]}, temperature ${mentioned.temp[0]}–${mentioned.temp[1]}°C. Duration is ~${mentioned.duration} days. Check its full profile for stage-by-stage guide.`;
  }

  if (/hi|hello|hey|start/.test(q)) {
    return "Hello! I am your Farmy Assistant 🌱. You can ask me how to plant crops, irrigation schedules, fertilizer doses, pest management, or yield estimates!";
  }
  if (/weather|rain|monsoon/.test(q)) {
    return "Check our Weather page for 5-day forecasts and crop suitability alerts. Make sure to avoid heavy irrigation before expected rainfall!";
  }
  if (/soil|ph|acid|alkaline/.test(q)) {
    return "Most crops thrive in soil pH between 6.0 and 7.2. You can check your soil health and crop compatibility on the Soil Check page!";
  }

  return "I'm running in offline Demo Mode. Try asking about a specific crop like \"how much water does tomato need?\", \"what fertilizer for wheat?\", or \"tomato pests\".";
}

// Navigation Bar Renderer
function renderBottomNav(activeTab = 'home') {
  const existing = document.getElementById('bottomNav');
  if (existing) existing.remove();

  const nav = el('nav');
  nav.id = 'bottomNav';
  const t = (key, fallback) => (window.FARMY_I18N ? window.FARMY_I18N.t(key, fallback) : (fallback || key));
  nav.innerHTML = `
    <a href="index.html" class="navitem ${activeTab === 'home' ? 'active' : ''}">
      <span class="navicon">🏠</span>${t('nav.home', 'Home')}
    </a>
    <a href="recommend.html" class="navitem ${activeTab === 'recommend' ? 'active' : ''}">
      <span class="navicon">🌱</span>${t('nav.recommend', 'Recommend')}
    </a>
    <a href="farm.html" class="navitem ${activeTab === 'farm' ? 'active' : ''}">
      <span class="navicon">🚜</span>${t('nav.farm', 'My Farm')}
    </a>
    <a href="procurement.html" class="navitem ${activeTab === 'procurement' ? 'active' : ''}">
      <span class="navicon">🛒</span>${t('nav.procurement', 'Procurement')}
    </a>
    <a href="crops.html" class="navitem ${activeTab === 'crops' ? 'active' : ''}">
      <span class="navicon">🌾</span>${t('nav.crops', 'Crops')}
    </a>
    <a href="quiz.html" class="navitem ${activeTab === 'quiz' ? 'active' : ''}">
      <span class="navicon">🧠</span>${t('nav.quiz', 'Quiz')}
    </a>
    <a href="assistant.html" class="navitem ${activeTab === 'assistant' ? 'active' : ''}">
      <span class="navicon">💬</span>${t('nav.assistant', 'Assistant')}
    </a>
  `;
  document.getElementById('appwrap').appendChild(nav);
}

// Notification Banner Helper
function showBanner(sel, msg, kind = '') {
  const b = $(sel);
  if (!b) return;
  b.textContent = msg;
  b.className = 'banner show ' + kind;
  clearTimeout(b._t);
  b._t = setTimeout(() => { b.className = 'banner'; }, 4000);
}

// Global & module exports for compatibility
const _exports = {
  CONFIG, Storage, FarmyState, findCrop, getCropGrowthStage,
  apiFetch, checkBackend, updateStatusPills,
  getWeatherDemo, weatherAlerts, weatherSuitability,
  scoreCropLocal, runRecommendationLocal, pestMatchLocal,
  soilHealthScoreLocal, compareSoilToCropLocal,
  predictYieldLocal, calcProfitLocal, assistantLocalFallback,
  renderBottomNav, showBanner
};

if (typeof globalThis !== 'undefined') {
  Object.assign(globalThis, _exports);
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = _exports;
}

