-- ============================================================
-- KISAN: Profiles
-- Migration: create_profiles
-- ============================================================

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    phone text,

    role text not null
        check (role in (
            'farmer',
            'tool_lender',
            'job_seeker',
            'storage_owner'
        )),

    language text not null default 'ml',

    location jsonb,

    metadata jsonb not null default '{}'::jsonb,

    created_at timestamptz not null default timezone('utc', now())
);


-- ============================================================
-- INDEXES
-- ============================================================

create index profiles_role_idx
    on public.profiles(role);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;


-- ============================================================
-- POLICIES
-- ============================================================

-- Users can view their own profile.
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);


-- Users can create their own profile.
create policy "Users can create own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);


-- Users can update their own profile.
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);


-- Users can delete their own profile.
create policy "Users can delete own profile"
on public.profiles
for delete
to authenticated
using (auth.uid() = id);