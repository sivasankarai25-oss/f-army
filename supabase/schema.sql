-- ============================================================
-- FARMY — Database Schema (PostgreSQL / Supabase)
-- ============================================================
-- Run this in the Supabase SQL editor (or `psql` against any
-- Postgres 14+ instance) to create the full FARMY schema.
-- Uses Supabase's built-in `auth.users` table for authentication
-- identity, and a `public.users` profile table for app-specific
-- fields (phone/email OTP login is handled by Supabase Auth —
-- see /README.md "Authentication" section).
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm; -- for fast crop name search

-- ------------------------------------------------------------
-- USERS  (profile row linked 1:1 to Supabase auth.users)
-- ------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text unique,
  email text unique,
  login_method text check (login_method in ('phone','email')) not null default 'phone',
  preferred_language text default 'en',
  location_lat numeric(9,6),
  location_lng numeric(9,6),
  location_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- CROPS  (master crop database)
-- ------------------------------------------------------------
create table if not exists public.crops (
  id text primary key,                 -- slug, e.g. 'tomato'
  name text not null,
  scientific_name text,
  category text not null,              -- Vegetable / Grain / Pulse / Fruit
  emoji text,
  image_url text,
  duration_days int,
  seasons text[],                      -- ['Kharif','Rabi']
  planting_months text,
  created_at timestamptz not null default now()
);
create index if not exists idx_crops_name_trgm on public.crops using gin (name gin_trgm_ops);

-- ------------------------------------------------------------
-- CROP REQUIREMENTS  (1:1 with crops — soil/weather/water/fert needs)
-- ------------------------------------------------------------
create table if not exists public.crop_requirements (
  crop_id text primary key references public.crops(id) on delete cascade,
  temp_min numeric(4,1), temp_max numeric(4,1),
  ph_min numeric(3,1), ph_max numeric(3,1),
  soil_types text[],
  humidity_min int, humidity_max int,
  rainfall_note text,
  sunlight_note text,
  water_level text check (water_level in ('Low','Medium','High','Medium-High')),
  irrigation_note text,
  water_critical_note text,
  n_per_acre numeric(6,1), p_per_acre numeric(6,1), k_per_acre numeric(6,1),
  fertilizer_note text,
  yield_low numeric(10,1), yield_high numeric(10,1), yield_unit text default 'kg/acre',
  cost_per_acre numeric(10,2),
  price_estimate numeric(10,2)
);

-- ------------------------------------------------------------
-- PLANTING SCHEDULES  (ordered step-by-step planting guide)
-- ------------------------------------------------------------
create table if not exists public.planting_schedules (
  id uuid primary key default uuid_generate_v4(),
  crop_id text references public.crops(id) on delete cascade,
  step_order int not null,
  instruction text not null
);

-- Growth-stage timeline (Seed -> Germination -> ... -> Harvest)
create table if not exists public.crop_growth_stages (
  id uuid primary key default uuid_generate_v4(),
  crop_id text references public.crops(id) on delete cascade,
  stage_order int not null,
  stage_name text not null,
  day_range text,
  care_note text,
  water_note text,
  fertilizer_note text,
  warning_note text
);

-- ------------------------------------------------------------
-- FERTILIZER SCHEDULES  (per-crop, stage-based application plan)
-- ------------------------------------------------------------
create table if not exists public.fertilizer_schedules (
  id uuid primary key default uuid_generate_v4(),
  crop_id text references public.crops(id) on delete cascade,
  stage_name text not null,
  fertilizer_type text,       -- Organic / Chemical
  npk_note text,
  quantity_note text,
  timing_note text
);

-- ------------------------------------------------------------
-- WATER SCHEDULES  (per-crop irrigation plan)
-- ------------------------------------------------------------
create table if not exists public.water_schedules (
  id uuid primary key default uuid_generate_v4(),
  crop_id text references public.crops(id) on delete cascade,
  stage_name text not null,
  frequency_note text,
  amount_note text,
  critical boolean default false
);

-- ------------------------------------------------------------
-- PESTS & DISEASES  (symptom-tagged, IPM guidance)
-- ------------------------------------------------------------
create table if not exists public.pest_diseases (
  id text primary key,                 -- slug, e.g. 'aphid'
  name text not null,
  type text check (type in ('Pest','Disease')) not null,
  symptom_tags text[],                 -- ['yellow leaves','insects visible']
  cause text,
  prevention text[],
  organic_control text[],
  mechanical_control text[],
  chemical_active_ingredient text,
  chemical_warning text,
  chemical_ppe text,
  chemical_phi text
);

-- Many-to-many: which crops each pest/disease commonly affects
create table if not exists public.crop_pest_diseases (
  crop_id text references public.crops(id) on delete cascade,
  pest_disease_id text references public.pest_diseases(id) on delete cascade,
  primary key (crop_id, pest_disease_id)
);

-- ------------------------------------------------------------
-- WEATHER DATA  (cached live weather lookups, per user location)
-- ------------------------------------------------------------
create table if not exists public.weather_data (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  lat numeric(9,6), lng numeric(9,6),
  temperature numeric(4,1),
  humidity int,
  condition text,
  rain_chance int,
  forecast jsonb,             -- [{day, temp, rainChance}, ...]
  fetched_at timestamptz not null default now(),
  source text default 'openweathermap'
);
create index if not exists idx_weather_user_time on public.weather_data(user_id, fetched_at desc);

-- ------------------------------------------------------------
-- SOIL REPORTS  (farmer-entered or lab-uploaded soil test results)
-- ------------------------------------------------------------
create table if not exists public.soil_reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  farm_id uuid,               -- references farms(id), added below after farms table exists
  soil_type text,
  ph numeric(3,1),
  nitrogen_level text check (nitrogen_level in ('Low','Medium','High')),
  phosphorus_level text check (phosphorus_level in ('Low','Medium','High')),
  potassium_level text check (potassium_level in ('Low','Medium','High')),
  moisture_level text check (moisture_level in ('Low','Medium','High')),
  health_score int,
  health_label text,
  notes text[],
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- FARMS  (a farmer can have multiple plots/farms)
-- ------------------------------------------------------------
create table if not exists public.farms (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null default 'My Farm',
  area_acres numeric(8,2),
  location_lat numeric(9,6),
  location_lng numeric(9,6),
  location_label text,
  created_at timestamptz not null default now()
);

alter table public.soil_reports
  add constraint soil_reports_farm_fk foreign key (farm_id) references public.farms(id) on delete set null;

-- ------------------------------------------------------------
-- FARM CROPS  (a crop instance actively growing on a farm)
-- ------------------------------------------------------------
create table if not exists public.farm_crops (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid references public.farms(id) on delete cascade,
  crop_id text references public.crops(id),
  area_acres numeric(8,2),
  planted_date date not null,
  expected_harvest_date date,
  current_stage text,
  status text check (status in ('active','harvested','failed')) default 'active',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- FARMING TASKS  (reminders — watering, fertilizer, pest checks, harvest)
-- ------------------------------------------------------------
create table if not exists public.farming_tasks (
  id uuid primary key default uuid_generate_v4(),
  farm_crop_id uuid references public.farm_crops(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  task_type text check (task_type in ('watering','fertilizer','pest_inspection','planting','harvest','growth_stage')) not null,
  title text not null,
  due_date date not null,
  is_done boolean default false,
  notified_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_tasks_due on public.farming_tasks(user_id, due_date) where is_done = false;

-- ------------------------------------------------------------
-- YIELD PREDICTIONS
-- ------------------------------------------------------------
create table if not exists public.yield_predictions (
  id uuid primary key default uuid_generate_v4(),
  farm_crop_id uuid references public.farm_crops(id) on delete cascade,
  user_id uuid references public.users(id) on delete cascade,
  soil_health_score int,
  farming_method text check (farming_method in ('organic','conventional')),
  predicted_low numeric(10,1),
  predicted_high numeric(10,1),
  unit text default 'kg',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PROFIT CALCULATIONS
-- ------------------------------------------------------------
create table if not exists public.profit_calculations (
  id uuid primary key default uuid_generate_v4(),
  farm_crop_id uuid references public.farm_crops(id) on delete set null,
  user_id uuid references public.users(id) on delete cascade,
  area_acres numeric(8,2),
  seed_cost numeric(10,2), fertilizer_cost numeric(10,2), labour_cost numeric(10,2),
  irrigation_cost numeric(10,2), other_cost numeric(10,2),
  expected_yield numeric(10,1), selling_price numeric(10,2),
  total_cost numeric(10,2) generated always as
    (coalesce(seed_cost,0)+coalesce(fertilizer_cost,0)+coalesce(labour_cost,0)+coalesce(irrigation_cost,0)+coalesce(other_cost,0)) stored,
  expected_revenue numeric(12,2) generated always as (coalesce(expected_yield,0) * coalesce(selling_price,0)) stored,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- OTP VERIFICATIONS  (short-lived codes for phone/email login)
-- Only needed if you are NOT using Supabase Auth's built-in OTP
-- (see README — Option A vs Option B for auth).
-- ------------------------------------------------------------
create table if not exists public.otp_codes (
  id uuid primary key default uuid_generate_v4(),
  contact text not null,             -- phone or email
  method text check (method in ('phone','email')) not null,
  code_hash text not null,           -- never store the raw code
  attempts int not null default 0,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_otp_contact on public.otp_codes(contact, expires_at desc);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
alter table public.users enable row level security;
alter table public.farms enable row level security;
alter table public.farm_crops enable row level security;
alter table public.farming_tasks enable row level security;
alter table public.soil_reports enable row level security;
alter table public.weather_data enable row level security;
alter table public.yield_predictions enable row level security;
alter table public.profit_calculations enable row level security;

create policy "Users can view/edit own profile" on public.users
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage own farms" on public.farms
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own farm crops" on public.farm_crops
  for all using (exists (select 1 from public.farms f where f.id = farm_id and f.user_id = auth.uid()));

create policy "Users manage own tasks" on public.farming_tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own soil reports" on public.soil_reports
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own weather data" on public.weather_data
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own yield predictions" on public.yield_predictions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own profit calcs" on public.profit_calculations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Crop/pest reference tables are public read-only (no RLS needed for reads);
-- lock down writes to the service role only.
alter table public.crops enable row level security;
alter table public.crop_requirements enable row level security;
alter table public.pest_diseases enable row level security;
create policy "Public can read crops" on public.crops for select using (true);
create policy "Public can read crop requirements" on public.crop_requirements for select using (true);
create policy "Public can read pests" on public.pest_diseases for select using (true);

-- ------------------------------------------------------------
-- QUIZ SYSTEM
-- ------------------------------------------------------------
create table if not exists public.quiz_sets (
  id uuid primary key default uuid_generate_v4(),
  quiz_number int not null unique,
  title text not null,
  description text,
  difficulty text default 'Easy',
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  quiz_id uuid references public.quiz_sets(id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null,
  explanation text,
  category text default 'General Knowledge',
  difficulty text default 'Easy',
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  quiz_id uuid references public.quiz_sets(id) on delete cascade,
  score int not null default 0,
  correct_answers int not null default 0,
  wrong_answers int not null default 0,
  completed_at timestamptz not null default now()
);

create table if not exists public.quiz_user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  current_quiz int not null default 1,
  completed_quizzes int not null default 0,
  total_score int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_leaderboard (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade,
  username text,
  score int not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_quiz_attempts_user on public.quiz_attempts(user_id, completed_at desc);
create index if not exists idx_quiz_progress_user on public.quiz_user_progress(user_id);
create index if not exists idx_quiz_lb_score on public.quiz_leaderboard(score desc);
