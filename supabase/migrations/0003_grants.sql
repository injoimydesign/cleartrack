-- ClearTrack — required GRANTs for Data API access.
--
-- Supabase changed its platform default in 2026: new tables are no longer
-- automatically exposed to anon/authenticated/service_role. RLS (from
-- 0001) is a separate, row-level layer on top of this — these GRANTs are
-- what let those roles touch the tables/functions at all. Without this
-- migration, every table from 0001 returns "permission denied for table
-- X" (Postgres error 42501) even though RLS is configured correctly.
--
-- This is the standard, Supabase-recommended pattern: grant broadly at the
-- table level, then let RLS narrow it row-by-row. Nothing here weakens the
-- admin-only write policies or the RLS read policy from 0001 — an
-- unauthenticated (anon) request still can't read anything, because
-- "*_read_authenticated" requires auth.uid() is not null, which anon never
-- satisfies.

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on all tables in schema public
  to anon, authenticated, service_role;

grant execute on all functions in schema public
  to anon, authenticated, service_role;

-- Apply the same grants to anything created by future migrations, so this
-- file doesn't need repeating after every schema change.
alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated, service_role;

alter default privileges in schema public
  grant execute on functions to anon, authenticated, service_role;
