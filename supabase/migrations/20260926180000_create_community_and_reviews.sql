-- ============================================================
-- KISAN: Reviews, Community Forum & Notifications
-- Migration: 20260926180000_create_community_and_reviews.sql
-- ============================================================

-- 1. Reviews Table
create table public.reviews (
    id uuid primary key default gen_random_uuid(),
    target_user_id uuid not null references public.profiles(id) on delete cascade,
    reviewer_id uuid not null references public.profiles(id) on delete cascade,
    service_request_id uuid references public.service_requests(id) on delete set null,
    rating int not null check (rating between 1 and 5),
    comment text,
    created_at timestamptz not null default timezone('utc', now()),

    constraint no_self_review check (reviewer_id <> target_user_id)
);

-- Indexes for reviews
create index reviews_target_user_id_idx on public.reviews(target_user_id);
create index reviews_reviewer_id_idx on public.reviews(reviewer_id);

-- RLS for reviews
alter table public.reviews enable row level security;

-- Anyone can view reviews
create policy "Anyone can view reviews"
on public.reviews
for select
to authenticated, anon
using (true);

-- Authenticated users can post reviews if they participated in a completed service request or direct review
create policy "Users can post reviews"
on public.reviews
for insert
to authenticated
with check (
    auth.uid() = reviewer_id
    and reviewer_id <> target_user_id
    and (
        service_request_id is null
        or exists (
            select 1 from public.service_requests sr
            where sr.id = service_request_id
            and (sr.requester_id = auth.uid() or sr.provider_id = auth.uid())
            and (sr.requester_id = target_user_id or sr.provider_id = target_user_id)
            and sr.status = 'completed'
        )
    )
);

-- Reviewers can update their own reviews
create policy "Users can update own reviews"
on public.reviews
for update
to authenticated
using (auth.uid() = reviewer_id)
with check (auth.uid() = reviewer_id);

-- Reviewers can delete their own reviews
create policy "Users can delete own reviews"
on public.reviews
for delete
to authenticated
using (auth.uid() = reviewer_id);


-- 2. Community Messages Table
create table public.community_messages (
    id uuid primary key default gen_random_uuid(),
    sender_id uuid not null references public.profiles(id) on delete cascade,
    channel text not null check (channel in ('farmer_forum', 'worker_forum', 'general')),
    content text not null,
    media_url text,
    created_at timestamptz not null default timezone('utc', now())
);

-- Indexes for community_messages
create index community_messages_channel_idx on public.community_messages(channel);
create index community_messages_created_at_idx on public.community_messages(created_at desc);

-- RLS for community_messages
alter table public.community_messages enable row level security;

-- Authenticated users can view community messages
create policy "Authenticated users can view community messages"
on public.community_messages
for select
to authenticated
using (true);

-- Users can insert messages in community channels
create policy "Users can send community messages"
on public.community_messages
for insert
to authenticated
with check (auth.uid() = sender_id);


-- 3. Notifications Table
create table public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles(id) on delete cascade,
    title text not null,
    message text not null,
    type text not null default 'info' check (type in ('info', 'booking_request', 'booking_status', 'job_application', 'job_status', 'system')),
    read boolean not null default false,
    payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now())
);

-- Indexes for notifications
create index notifications_user_id_idx on public.notifications(user_id);
create index notifications_read_idx on public.notifications(user_id, read);

-- RLS for notifications
alter table public.notifications enable row level security;

-- Users can view their own notifications
create policy "Users can view own notifications"
on public.notifications
for select
to authenticated
using (auth.uid() = user_id);

-- Users can update (mark as read) their own notifications
create policy "Users can update own notifications"
on public.notifications
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);


-- 4. Enable Supabase Realtime for Community Messages and Notifications
begin;
  -- Add tables to realtime publication if publication exists
  do $$
  begin
    if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
      alter publication supabase_realtime add table public.community_messages;
      alter publication supabase_realtime add table public.notifications;
    end if;
  end $$;
commit;
