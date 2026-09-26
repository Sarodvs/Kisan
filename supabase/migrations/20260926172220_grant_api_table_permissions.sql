-- API privileges for Kisan tables.
-- RLS policies remain responsible for row-level authorization.

-- Public marketplace browsing
grant select on public.equipment_listings to anon, authenticated;
grant select on public.storage_listings to anon, authenticated;

-- Authenticated users can perform operations permitted by RLS.
grant insert, update, delete on public.equipment_listings to authenticated;
grant insert, update, delete on public.storage_listings to authenticated;

grant select, insert, update, delete
on public.job_postings
to authenticated;

grant select, insert, update, delete
on public.job_applications
to authenticated;

grant select, insert, update, delete
on public.service_requests
to authenticated;

grant select, insert, update, delete
on public.reviews
to authenticated;

grant select, insert, update, delete
on public.community_messages
to authenticated;

grant select, insert, update, delete
on public.notifications
to authenticated;

-- Government scheme information is readable by clients.
grant select
on public.government_schemes
to anon, authenticated;