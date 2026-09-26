-- Track the official source behind every government scheme record.
alter table public.government_schemes
  add column if not exists source_url text,
  add column if not exists source_type text not null default 'official_web',
  add column if not exists source_hash text,
  add column if not exists source_checked_at timestamptz,
  add column if not exists active boolean not null default true;

create index if not exists government_schemes_active_idx
  on public.government_schemes(active, source_checked_at);

create unique index if not exists government_schemes_title_unique_idx
  on public.government_schemes(title);

-- Run the sync every day at 03:00 UTC. Configure Supabase Vault first:
-- supabase_url and supabase_service_role_key.
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'sync-official-government-schemes',
  '0 3 * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'supabase_url') || '/functions/v1/sync-government-schemes',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'supabase_service_role_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
