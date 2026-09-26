 Kisan Project Specification & Architecture Guide

## 1. Project Overview
**Kisan** is a hyperlocal, AI-assisted agricultural sharing platform and rural e-service portal. It connects small/marginal farmers with tool lenders, job seekers (laborers), and storage owners to democratize farm mechanization, reduce crop waste, and close government welfare gaps.

---

## 2. Tech Stack & Architecture (24-Hour Velocity Stack)

* **Frontend:** React (Vite) + TypeScript
* **Styling & Components:** Tailwind CSS, shadcn/ui, Lucide React (large, high-contrast touch targets for rural accessibility)
* **Backend & Database:** Supabase (PostgreSQL, Supabase Auth, Row-Level Security, Realtime tables)
* **Connecting Layer:** `@supabase/supabase-js` (direct, safe client-side queries)
* **AI & Vernacular Layer:** Gemini API (Government scheme eligibility matching & voice-to-text / natural language query parsing)
* **Hosting & Deployment:** Vercel

---

## 3. User Roles & System Workflows

### Universal Entry Point
* **Auth:** Unified Login / Registration page via Supabase Auth (Phone OTP / Email).
* **Role Selection:** Farmer, Tool Lender, Job Seeker, Storage Unit Owner.
* **Onboarding:** Localized explainer video walkthrough with interactive, skippable setup questionnaires tailored to each role.

---

### Dashboard Specifications

#### 3.1 Farmer Dashboard
* **Dynamic Questionnaire (Skippable):** Crops cultivated, current farming season, land size, owned machinery.
* **Profile Page:** Farmer details, preferred regional language, location, and verified badges.
* **Marketplace:** Search, browse, and book machinery (tractors, tillers, harvesters) and local cold/dry storage.
* **Hiring Section:** On-demand booking for local agricultural labor.
* **Government Subsidies & Programs:** AI-powered eligibility engine (Gemini API) recommending active schemes based on profile constraints.
* **Video Tutorials:** Vernacular, icon-driven video guides for app usage and modern agricultural practices.
* **Communication Channel:** Community chat/forum to interact with nearby farmers.
* **My Requests:** Real-time tracking of equipment bookings, labor hiring, and storage reservations.

#### 3.2 Tool Lender Dashboard
* **Onboarding Questionnaire:** Equipment types owned, operational status, hourly/daily rental rates, operator availability.
* **Profile:** Business/individual details, location perimeter, verified machinery tags.
* **Available Equipment Section:** Inventory management (Add, Edit, Mark as Under Maintenance / In Use).
* **Received Requests:** Incoming booking requests from farmers with Accept/Decline actions.
* **History, Feedbacks & Ratings:** Past rental logs, verified farmer reviews, and aggregate ratings.

#### 3.3 Job Seeker (Laborer) Dashboard
* **Onboarding Questionnaire:** Skill sets (harvesting, tilling, pesticide handling), availability window, wage expectations.
* **Available Job Offers:** Feed of nearby farm tasks needing labor with wage and location filters.
* **Application History:** Active and completed farm gigs.
* **Feedbacks & Ratings:** Performance badges, landowner ratings, and payment tracking.
* **Worker Community Channel:** Peer chat system for laborers to coordinate availability, fair wages, and transport.

#### 3.4 Storage Unit Owner Dashboard
* **Onboarding Questionnaire:** Capacity (metric tons/bags), facility type (Cold Storage, Dry Warehouse, Silo), pricing structure.
* **Availability Section:** Real-time capacity management (Total Space vs. Reserved Space).
* **Requests & Offers Section:** Inbound booking requests from farmers during harvest periods with dynamic quoting.
* **History, Feedbacks & Ratings:** Completed storage cycles, safety ratings, and customer reviews.

---

## 4. Database Schema (Supabase PostgreSQL)

```sql
-- 1. Profiles Table (Encompasses all user roles)
create table profiles (
  id uuid references auth.users primary key,
  full_name text not null,
  phone text,
  role text check (role in ('farmer', 'lender', 'job_seeker', 'storage_owner')),
  language text default 'ml',
  location jsonb, -- { "district": "...", "state": "...", "lat": 0, "lng": 0 }
  metadata jsonb default '{}'::jsonb, -- dynamic questionnaire answers (crops, land_size, skills, etc.)
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Equipment / Listings (For Tool Lenders)
create table equipment_listings (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references profiles(id) on delete cascade,
  title text not null,
  category text not null, -- 'Tractor', 'Harvester', 'Sprayer', etc.
  daily_rate numeric not null,
  is_available boolean default true,
  images text[],
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Storage Units (For Storage Owners)
create table storage_listings (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references profiles(id) on delete cascade,
  name text not null,
  storage_type text not null, -- 'Cold Storage', 'Dry Warehouse'
  total_capacity_tons numeric not null,
  available_capacity_tons numeric not null,
  rate_per_ton_day numeric not null,
  location_address text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Job Postings & Applications (For Farmers & Job Seekers)
create table job_postings (
  id uuid default gen_random_uuid() primary key,
  farmer_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  workers_needed int default 1,
  daily_wage numeric not null,
  date_required date not null,
  status text default 'open' check (status in ('open', 'filled', 'completed'))
);

create table job_applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references job_postings(id) on delete cascade,
  worker_id uuid references profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Bookings / Requests (Unified for Equipment & Storage)
create table service_requests (
  id uuid default gen_random_uuid() primary key,
  requester_id uuid references profiles(id),
  provider_id uuid references profiles(id),
  item_type text check (item_type in ('equipment', 'storage')),
  item_id uuid not null,
  start_date date,
  end_date date,
  total_cost numeric,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Reviews & Community Messages
create table reviews (
  id uuid default gen_random_uuid() primary key,
  target_user_id uuid references profiles(id),
  reviewer_id uuid references profiles(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table community_messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references profiles(id),
  channel text not null, -- 'farmer_forum', 'worker_forum'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
