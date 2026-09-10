import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

/**
 * Secret-key client. Bypasses RLS entirely — never import this into
 * anything that runs in the browser, and never use it for a request you can
 * instead run under the user's own session via `lib/supabase/server.ts`.
 *
 * Uses Supabase's new `sb_secret_...` key, not the legacy `service_role`
 * JWT — Supabase is deprecating `anon`/`service_role` by end of 2026 in
 * favor of publishable/secret keys (same privilege levels, just not
 * JWT-based). See `.env.local.example`.
 *
 * PHASE 6 UPDATE: as of auth landing, every admin CRUD action and page has
 * been switched to the session-aware client in `server.ts`, so the
 * `*_write_admin` RLS policies are now actually enforced per-request. This
 * client is currently unused in the app — kept as a reserved escape hatch
 * for a genuinely trusted server-only task with no user session to run
 * under (e.g. a future scheduled sync job), not for routine admin writes.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false } },
  );
}
