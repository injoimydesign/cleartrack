import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types/database";

/**
 * Service-role client. Bypasses RLS entirely — never import this into
 * anything that runs in the browser, and never use it for a request you can
 * instead run under the user's own session via `lib/supabase/server.ts`.
 *
 * PHASE 1 NOTE: admin CRUD currently uses this client for every write,
 * because there is no auth/session yet (that lands in Phase 6). Once sign-in
 * exists, swap the admin song/reference-data actions over to the session
 * client in `server.ts` — the `*_write_admin` RLS policies already enforce
 * the admin-role check at the database layer, so that swap is what actually
 * turns on the enforcement this app is designed around. This client should
 * end up reserved for genuinely trusted server-only tasks (e.g. the Spotify
 * sync job in Phase 3), not routine admin writes.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
