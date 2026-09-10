-- ClearTrack — Phase 6: first-user-becomes-admin trigger (PRD §7).
--
-- Supabase Auth creates a row in auth.users on sign-up; this trigger
-- creates the matching public.profiles row automatically — 'admin' only
-- when it's the very first account ever created, 'member' for everyone
-- after that. security definer + owned by the migration role (which has
-- BYPASSRLS), same pattern as is_admin() in 0001, so this insert isn't
-- blocked by the profiles RLS policies.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_first boolean;
begin
  select not exists (select 1 from public.profiles) into is_first;

  insert into public.profiles (id, role, display_name)
  values (
    new.id,
    case when is_first then 'admin' else 'member' end,
    new.raw_user_meta_data ->> 'display_name'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
