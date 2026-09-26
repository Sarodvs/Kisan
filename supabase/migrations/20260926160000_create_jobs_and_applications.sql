-- ============================================================
-- KISAN: Job Postings & Applications
-- Migration: 20260926160000_create_jobs_and_applications.sql
-- ============================================================

-- 1. Job Postings Table
create table public.job_postings (
    id uuid primary key default gen_random_uuid(),
    farmer_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    description text,
    skills_required text[] not null default '{}'::text[],
    workers_needed int not null default 1 check (workers_needed > 0),
    workers_hired int not null default 0 check (workers_hired >= 0 and workers_hired <= workers_needed),
    daily_wage numeric not null check (daily_wage > 0),
    date_required date not null,
    location_address text,
    location_coords jsonb,
    status text not null default 'open' check (status in ('open', 'filled', 'completed', 'cancelled')),
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

-- Indexes for job_postings
create index job_postings_farmer_id_idx on public.job_postings(farmer_id);
create index job_postings_status_idx on public.job_postings(status);
create index job_postings_date_required_idx on public.job_postings(date_required);

-- RLS for job_postings
alter table public.job_postings enable row level security;

-- Anyone can view job postings
create policy "Anyone can view job postings"
on public.job_postings
for select
to authenticated, anon
using (true);

-- Farmers can create job postings
create policy "Farmers can insert job postings"
on public.job_postings
for insert
to authenticated
with check (
    auth.uid() = farmer_id
    and exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role = 'farmer'
    )
);

-- Farmers can update their own job postings
create policy "Farmers can update own job postings"
on public.job_postings
for update
to authenticated
using (auth.uid() = farmer_id)
with check (auth.uid() = farmer_id);

-- Farmers can delete their own job postings
create policy "Farmers can delete own job postings"
on public.job_postings
for delete
to authenticated
using (auth.uid() = farmer_id);


-- 2. Job Applications Table
create table public.job_applications (
    id uuid primary key default gen_random_uuid(),
    job_id uuid not null references public.job_postings(id) on delete cascade,
    worker_id uuid not null references public.profiles(id) on delete cascade,
    status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'withdrawn')),
    notes text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),

    constraint unique_job_worker_application unique (job_id, worker_id)
);

-- Indexes for job_applications
create index job_applications_job_id_idx on public.job_applications(job_id);
create index job_applications_worker_id_idx on public.job_applications(worker_id);
create index job_applications_status_idx on public.job_applications(status);

-- RLS for job_applications
alter table public.job_applications enable row level security;

-- Workers can view their own applications, and farmers can view applications for their job postings
create policy "Users can view relevant job applications"
on public.job_applications
for select
to authenticated
using (
    auth.uid() = worker_id
    or exists (
        select 1 from public.job_postings jp
        where jp.id = job_applications.job_id
        and jp.farmer_id = auth.uid()
    )
);

-- Job seekers can submit applications for jobs
create policy "Job seekers can apply for jobs"
on public.job_applications
for insert
to authenticated
with check (
    auth.uid() = worker_id
    and exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role = 'job_seeker'
    )
);

-- Workers can update (withdraw) their own applications, and Farmers can update application status (accept/reject)
create policy "Users can update relevant job applications"
on public.job_applications
for update
to authenticated
using (
    auth.uid() = worker_id
    or exists (
        select 1 from public.job_postings jp
        where jp.id = job_applications.job_id
        and jp.farmer_id = auth.uid()
    )
)
with check (
    (
        auth.uid() = worker_id
        and status in ('pending', 'withdrawn')
    )
    or exists (
        select 1 from public.job_postings jp
        where jp.id = job_applications.job_id
        and jp.farmer_id = auth.uid()
    )
);

-- Workers can delete/withdraw their own application
create policy "Workers can delete own applications"
on public.job_applications
for delete
to authenticated
using (auth.uid() = worker_id);
