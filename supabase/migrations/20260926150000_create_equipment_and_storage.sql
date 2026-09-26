-- ============================================================
-- KISAN: Equipment & Storage Listings
-- Migration: 20260926150000_create_equipment_and_storage.sql
-- ============================================================

-- 1. Equipment Listings Table
create table public.equipment_listings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    category text not null,
    description text,
    daily_rate numeric not null check (daily_rate >= 0),
    hourly_rate numeric check (hourly_rate is null or hourly_rate >= 0),
    is_available boolean not null default true,
    location_address text,
    location_coords jsonb,
    images text[] not null default '{}'::text[],
    specs jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

-- Indexes for equipment_listings
create index equipment_listings_owner_id_idx on public.equipment_listings(owner_id);
create index equipment_listings_category_idx on public.equipment_listings(category);
create index equipment_listings_is_available_idx on public.equipment_listings(is_available);

-- RLS for equipment_listings
alter table public.equipment_listings enable row level security;

-- Anyone can view equipment listings
create policy "Anyone can view equipment listings"
on public.equipment_listings
for select
to authenticated, anon
using (true);

-- Tool lenders and farmers can insert their own equipment listings
create policy "Users can insert own equipment listings"
on public.equipment_listings
for insert
to authenticated
with check (
    auth.uid() = owner_id
    and exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('tool_lender', 'farmer')
    )
);

-- Owners can update their own equipment listings
create policy "Users can update own equipment listings"
on public.equipment_listings
for update
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

-- Owners can delete their own equipment listings
create policy "Users can delete own equipment listings"
on public.equipment_listings
for delete
to authenticated
using (auth.uid() = owner_id);


-- 2. Storage Listings Table
create table public.storage_listings (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references public.profiles(id) on delete cascade,
    name text not null,
    storage_type text not null check (storage_type in ('Cold Storage', 'Dry Warehouse', 'Silo', 'Hermetic Bag/Bunker', 'Open Shed')),
    total_capacity_tons numeric not null check (total_capacity_tons >= 0),
    available_capacity_tons numeric not null check (available_capacity_tons >= 0),
    rate_per_ton_day numeric not null check (rate_per_ton_day >= 0),
    location_address text,
    location_coords jsonb,
    features text[] not null default '{}'::text[],
    images text[] not null default '{}'::text[],
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),

    constraint storage_capacity_check check (available_capacity_tons <= total_capacity_tons)
);

-- Indexes for storage_listings
create index storage_listings_owner_id_idx on public.storage_listings(owner_id);
create index storage_listings_storage_type_idx on public.storage_listings(storage_type);

-- RLS for storage_listings
alter table public.storage_listings enable row level security;

-- Anyone can view storage listings
create policy "Anyone can view storage listings"
on public.storage_listings
for select
to authenticated, anon
using (true);

-- Storage owners and farmers can insert their own storage listings
create policy "Users can insert own storage listings"
on public.storage_listings
for insert
to authenticated
with check (
    auth.uid() = owner_id
    and exists (
        select 1 from public.profiles p
        where p.id = auth.uid()
        and p.role in ('storage_owner', 'farmer')
    )
);

-- Owners can update their own storage listings
create policy "Users can update own storage listings"
on public.storage_listings
for update
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

-- Owners can delete their own storage listings
create policy "Users can delete own storage listings"
on public.storage_listings
for delete
to authenticated
using (auth.uid() = owner_id);
