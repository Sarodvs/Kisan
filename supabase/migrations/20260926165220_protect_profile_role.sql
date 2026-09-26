-- Prevent ordinary users from changing their profile role after creation.
-- Role changes must be performed through trusted server/admin logic.

create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
    if new.role is distinct from old.role then
        raise exception 'Profile role cannot be changed directly';
    end if;

    return new;
end;
$$;

create trigger prevent_profile_role_change_trigger
before update on public.profiles
for each row
execute function public.prevent_profile_role_change();