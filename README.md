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
   This runs the schema, seed, and grants migrations in `supabase/migrations/`
   — including `0003_grants.sql`, which is required. Supabase no longer
   auto-exposes new tables to the Data API by default (a 2026 platform
   change), so without that migration every query returns
   `permission denied for table ...` even though RLS is set up correctly.
   If you already ran `db push` before this file existed, run it again —
   migrations are additive and this one is safe to apply on top.
4. Regenerate types against the real schema (replaces the hand-written
   placeholder):
   ```
   npx supabase gen types typescript --linked > src/lib/types/database.ts
   ```
5. `npm run dev` → http://localhost:3000/songs

## Song form & list UX refresh

Adapted from an uploaded Lovable-generated reference (different stack — TanStack Router/shadcn — reimplemented here, not ported): the song form is now a two-column panel layout with row-based pickers for Writers/Labels/Artists (one row per item, split-percent inline, duplicate-exclusion, an "Add …" button), writer rows show a PRO/publisher info line, split totals show as a colored badge, and cover-art/publisher Spotify fetches are two independent buttons with toast feedback. The songs list now shows cover art, an artist+writer subtitle, label badges, and live split-percentage indicators per row.

**Not carried over from that reference, on purpose:** the logo/wordmark, top global search bar, sidebar icons, a Users admin page, sign-in/out — those belong with Phase 6 (auth) — and the customer-facing card-grid browse view (Phase 7/8).

## Phase 3 status

Spotify integration: a "Fetch from Spotify" button on the song form searches by title + selected artists, fills in cover art and the song's Publisher field (matched/created from the album's copyright line), and shows a live preview immediately — before you've even saved the song.

**Platform note:** Spotify deprecated the `preview_url` field in Nov 2024 and it has stayed removed since — there's no official way to pull a raw 30-second MP3 anymore, for any app. The "Audio preview" section instead embeds Spotify's own official player (`open.spotify.com/embed/track/{id}`), which still plays previews through Spotify's UI. Falls back to "No preview available" when there's no Spotify match, per PRD §4.

Needs `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` in `.env.local` (Client Credentials flow — no user login involved). **If you register a new Spotify Developer app, it starts in "Development Mode,"** which as of Feb 2026 requires the app owner's Spotify account to have an active Premium subscription, or the integration stops working. Apply for Extended Quota Mode if this needs to be more resilient than that.

## Phase 2 status

Full reference-data CRUD for Artists, Writers, Labels, Publishers, and PROs
— each with list (bulk-select + delete), create, and edit pages. The Song
form now has Artists/Writers/Labels pickers wired in: client-side search
over the reference list, "Add "<name>"" inline creation, and a per-item
split-percent field for Writers/Labels with a visible warning when a
song's splits don't total 100% (allowed, per PRD §2, but flagged).
Writer's Publisher field also supports inline "add new."

All admin routes (Songs, Writers, Labels, Publishers, PROs, Artists) now
live under an `(admin)` route group in `src/app/(admin)/` so they share
one sidebar layout — the group folder doesn't affect the URL, so PRD §3's
"admin catalog lives at /songs" still holds; `/writers`, `/labels`, etc.
sit alongside it the same way.

**Known Phase 2 shortcut:** the "Add "<name>"" writer/label/artist/publisher
flow is a simplified inline-create rather than the PRD's separate dialog
(§3 point 3) — same end result (create, refresh, auto-select) without a
modal. Worth revisiting as a real dialog in a later polish pass.

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
