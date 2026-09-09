# ClearTrack

Music clearance catalog — see `ClearTrack-PRD-v2.0.md` and
`ClearTrack-ARCHITECTURE.md` (in the parent deliverable) for product and
technical context. This README covers local setup only.

## Setup

1. `npm install`
2. Create a Supabase project, then copy `.env.local.example` to `.env.local`
   and fill in the three Supabase values (the new publishable/secret keys, not legacy anon/service_role) from the project dashboard
   (Settings → API).
3. Link the CLI and push the schema:
   ```
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   This runs `supabase/migrations/0001_core_schema.sql` and
   `0002_seed_pros.sql` — the core tables, RLS policies, and the starter PRO
   list.
4. Regenerate types against the real schema (replaces the hand-written
   placeholder):
   ```
   npx supabase gen types typescript --linked > src/lib/types/database.ts
   ```
5. `npm run dev` → http://localhost:3000/songs

## Phase 1 status

Core schema (songs, artists, writers, labels, publishers, PROs, all join
tables with splits, `profiles` + `is_admin()`, full RLS) plus admin CRUD for
the Song entity itself (title, cover art URL, notes). Reference-data
management, writer/label/PRO pickers on the song form, and everything past
that follows the phase order in ClearTrack-ARCHITECTURE.md §5.

**Known Phase 1 shortcut:** admin writes currently go through the
service-role client (`src/lib/supabase/admin.ts`) because there's no
sign-in yet. That file and `src/app/songs/actions.ts` both flag where this
needs to switch to the session-aware client once Phase 6 (auth) lands —
that's the point at which the RLS admin-role check actually starts being
enforced rather than just being present in the schema.
