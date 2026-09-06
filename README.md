# 🌾 FARMY — Smart Farming Assistant

A mobile-first web app that helps smallholder farmers in India pick the
right crop, check soil and pest issues, track their farm, estimate yield
and profit, and chat with an AI farming assistant.

This version is packaged as **one Vercel project** — a static frontend
plus a serverless API (`/api/*`) — so there's nothing to glue together
and nothing separate to host.

## ✅ It works the moment you deploy it

You do **not** need to configure anything to deploy this. With zero
environment variables set, FARMY runs completely in **Demo Mode**:
built-in crop and pest data, a local recommendation engine, and demo
OTP codes shown right on screen. Every screen works, nothing crashes.

Then, whenever you're ready, add one or more of the optional integrations
below to make that part of the app "go live" — the app detects this
automatically, no code changes needed.

---

## 1. Deploy it (2 minutes, zero config)

**Option A — Vercel dashboard (easiest):**
1. Push this folder to a GitHub repo (or use Vercel's "Upload" import).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Leave all settings as default and click **Deploy**.
4. Open the URL Vercel gives you — FARMY is live in Demo Mode.

**Option B — Render (Web Service):**
1. Push this folder to a GitHub repo.
2. Go to [dashboard.render.com](https://dashboard.render.com), click **New +** → **Web Service**.
3. Select your repository.
4. Render automatically detects `render.yaml` (Build command: `npm run build`, Start command: `npm start`).
5. Click **Deploy Web Service** — FARMY is live.

**Option C — Vercel CLI:**
```bash
npm i -g vercel
cd farmy
vercel
```
Follow the prompts (accept defaults). That's it.

You'll see a yellow "🟡 Demo mode" pill on the login screen — that's
expected until you connect a backend below. Every feature still works
using built-in sample data.

---

## 2. (Optional) Go live, step by step

Add these as **Environment Variables** in your Vercel project
(*Project → Settings → Environment Variables*), then redeploy. You can
do all of them or just the ones you care about — each is independent.

### a) Real login (OTP) + saved farms/history — needs Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** and run the entire contents of
   [`supabase/schema.sql`](./supabase/schema.sql). This creates every
   table (`users`, `farms`, `crops`, `farming_tasks`, etc.) plus Row Level
   Security so each farmer only ever sees their own data.
3. Go to **Project Settings → API** and copy three values into Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only — never expose this in the frontend)
4. Turn on OTP delivery: **Authentication → Providers**
   - **Phone** → enable, connect a Twilio Account SID/Auth Token/From number
     (Indian numbers need Twilio DLT registration, or use an India-first
     provider like MSG91/Kaleyra instead)
   - **Email** → enable, use Supabase's default sender for testing or your
     own SMTP for production volume
5. Seed the crop & pest database into your new tables:
   ```bash
   npm install
   cp .env.example .env     # fill in the 3 Supabase values
   npm run seed
   ```
   This loads 18 crops and 31 pests/diseases — the same data already
   built into the app, now backed by real, extensible tables.

Once this is done, login/OTP, the crop database, farms, soil/yield/profit
history, and reminders all switch from Demo Mode to live automatically.

### b) Real weather — needs OpenWeatherMap
1. Get a free key at [openweathermap.org/api](https://openweathermap.org/api).
2. Add `OPENWEATHER_API_KEY` in Vercel.

The Home and Weather screens now show live current conditions + a 5-day
forecast instead of demo weather. (Requires Supabase to also be
connected, since weather is a logged-in feature.)

### c) AI Assistant chat — needs an Anthropic API key
1. Get a key at [console.anthropic.com](https://console.anthropic.com).
2. Add `ANTHROPIC_API_KEY` in Vercel.

The Assistant tab now grounds every answer in your live crop database
and the farmer's own active crops. Without this key, the Assistant tab
still works with a small built-in rule-based helper.

---

## What's inside

```
public/index.html      → the entire frontend (mobile-first single-page app)
api/                    → serverless functions, one per backend endpoint
  _lib/                 → shared helpers (Supabase client, auth, scoring)
supabase/schema.sql     → full Postgres schema + Row Level Security
seed/                   → crop & pest reference data
scripts/seedCrops.js    → loads seed/ into your Supabase project
optional-services/      → reference code for a custom SMS/email OTP
                          gateway, if you don't want to use Supabase's
                          built-in provider integration
```

## API summary

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/health` | GET | – | Health check + which integrations are configured |
| `/api/auth/send-otp` | POST | – | Send phone/email OTP |
| `/api/auth/verify-otp` | POST | – | Verify OTP, returns a session |
| `/api/weather` | GET | ✅ | Live weather + forecast by lat/lng |
| `/api/crops` | GET | – | List/search crops |
| `/api/crops/:id` | GET | – | Full crop profile |
| `/api/recommend` | POST | – | Crop suitability scoring engine |
| `/api/pests/match` | POST | – | Match symptoms → pests/diseases |
| `/api/pests/:cropId` | GET | – | Pests common to a crop |
| `/api/soil/check` | POST | ✅ | Soil health score + save report |
| `/api/soil/compare` | POST | ✅ | Soil vs. a specific crop's needs |
| `/api/farms` | GET/POST | ✅ | List/create farms |
| `/api/farms/:id/crops` | GET/POST | ✅ | Farm dashboard / add a crop (auto-creates tasks) |
| `/api/farms/tasks/upcoming` | GET | ✅ | Upcoming watering/fertilizer/pest/harvest reminders |
| `/api/farms/tasks/:id/done` | PATCH | ✅ | Mark a task complete |
| `/api/yield/predict` | POST | ✅ | Yield range estimate |
| `/api/profit/calculate` | POST | ✅ | Cost/revenue/profit calculation |
| `/api/assistant/ask` | POST | ✅ | Farmy Assistant chat |

`✅` routes expect `Authorization: Bearer <access_token>` from the
session returned by `/api/auth/verify-otp`. If Supabase isn't connected
yet, these return a clean `503` with an explanatory message instead of
crashing — the frontend automatically falls back to Demo Mode for that
feature.

## Local development

```bash
npm install
npm i -g vercel   # if you don't have it
vercel dev
```
This runs the same static frontend + serverless functions locally
(default: http://localhost:3000), reading from a local `.env` file if
present.

## Notifications (push reminders)

`farming_tasks` rows (created automatically when a farmer adds a crop)
are the source of truth for "Smart Farming Reminders." To actually push
these to a phone, add a scheduled job (a Vercel Cron Job calling a new
`/api/cron/*` route, or a Supabase Edge Function + `pg_cron`) that runs
daily, finds tasks with `due_date = today AND is_done = false`, and sends
a push notification — this isn't built out here since it depends on
which push provider and mobile framework you eventually pick.

## What's deliberately left to you

- **Push notifications** — see above.
- **Local-language content** (Tamil, etc.) — the schema has
  `preferred_language` on `users` for this, but translations aren't
  included.
- **Stricter production hardening** — if you expect real traffic,
  consider tighter per-contact rate limits on OTP, structured logging,
  and input validation with a library like `zod`.
