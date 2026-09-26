-- ============================================================
-- KISAN: Service Requests & Bookings (Equipment & Storage)
-- Migration: 20260926170000_create_service_requests.sql
-- ============================================================

-- 1. Service Requests Table
create table public.service_requests (
    id uuid primary key default gen_random_uuid(),
    requester_id uuid not null references public.profiles(id) on delete cascade,
    provider_id uuid not null references public.profiles(id) on delete cascade,
    item_type text not null check (item_type in ('equipment', 'storage')),
    item_id uuid not null,
    start_date date not null,
    end_date date not null,
    quantity_tons numeric check (quantity_tons is null or quantity_tons > 0),
    total_cost numeric not null check (total_cost >= 0),
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    notes text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),

    constraint check_dates_valid check (end_date >= start_date)
);

-- Indexes for service_requests
create index service_requests_requester_id_idx on public.service_requests(requester_id);
create index service_requests_provider_id_idx on public.service_requests(provider_id);
create index service_requests_item_idx on public.service_requests(item_type, item_id);
create index service_requests_status_idx on public.service_requests(status);
create index service_requests_dates_idx on public.service_requests(start_date, end_date);


-- 2. Function & Trigger to prevent overlapping confirmed equipment bookings (with FOR UPDATE row locking)
create or replace function public.check_equipment_booking_overlap()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    has_conflict boolean;
begin
    -- Only check for confirmed equipment bookings
    if new.item_type = 'equipment' and new.status = 'confirmed' then
        -- Lock target equipment record to serialize concurrent booking confirmations and prevent race conditions
        perform 1
        from public.equipment_listings
        where id = new.item_id
        for update;

        select exists (
            select 1
            from public.service_requests sr
            where sr.item_type = 'equipment'
              and sr.item_id = new.item_id
              and sr.status = 'confirmed'
              and sr.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
              and (sr.start_date <= new.end_date and sr.end_date >= new.start_date)
        ) into has_conflict;

        if has_conflict then
            raise exception 'Equipment is already booked for the selected date range (% to %).', new.start_date, new.end_date;
        end if;
    end if;

    return new;
end;
$$;

create trigger prevent_equipment_booking_overlap_trigger
    before insert or update on public.service_requests
    for each row
    execute function public.check_equipment_booking_overlap();


-- 3. Row Level Security for service_requests
alter table public.service_requests enable row level security;

-- Requesters and Providers can view requests involving them
create policy "Users can view relevant service requests"
on public.service_requests
for select
to authenticated
using (
    auth.uid() = requester_id
    or auth.uid() = provider_id
);

-- Requesters can create service requests
create policy "Users can create service requests"
on public.service_requests
for insert
to authenticated
with check (
    auth.uid() = requester_id
);

-- Requesters and Providers can update status of requests involving them
create policy "Users can update relevant service requests"
on public.service_requests
for update
to authenticated
using (
    auth.uid() = requester_id
    or auth.uid() = provider_id
)
with check (
    auth.uid() = requester_id
    or auth.uid() = provider_id
);

-- Requesters can delete pending or cancelled requests
create policy "Requesters can delete own pending requests"
on public.service_requests
for delete
to authenticated
using (
    auth.uid() = requester_id and status in ('pending', 'cancelled')
);
