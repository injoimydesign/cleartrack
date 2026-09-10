"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Every action here first confirms the CALLER is an admin using the
 * session-aware client (which is what actually knows who's asking).
 * Only after that check passes do we reach for the service-role client —
 * and only because listing/deleting auth users requires Supabase's Auth
 * Admin API, which isn't reachable through the regular Data API at any
 * privilege level. This is a second legitimate, narrow, well-authorized
 * use of createAdminClient, distinct from (and unrelated to) the public
 * Browse/landing-page teaser reads.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") throw new Error("Admins only.");
  return { supabase, currentUserId: user.id };
}

export type AdminUserRow = {
  id: string;
  email: string | null;
  role: "admin" | "member";
  display_name: string | null;
  locked: boolean;
};

export async function listUsers(): Promise<AdminUserRow[]> {
  await requireAdmin();
  const admin = createAdminClient();

  const [{ data: authData, error: authError }, { data: profiles, error: profileError }] =
    await Promise.all([
      admin.auth.admin.listUsers({ perPage: 200 }),
      admin.from("profiles").select("id, role, display_name, locked"),
    ]);

  if (authError) throw new Error(authError.message);
  if (profileError) throw new Error(profileError.message);

  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

  return authData.users.map((u) => {
    const profile = profileById.get(u.id);
    return {
      id: u.id,
      email: u.email ?? null,
      role: profile?.role ?? "member",
      display_name: profile?.display_name ?? null,
      locked: profile?.locked ?? false,
    };
  });
}

export async function getUserDetail(id: string) {
  await requireAdmin();
  const admin = createAdminClient();

  const [{ data: authUser, error: authError }, { data: profile, error: profileError }] =
    await Promise.all([
      admin.auth.admin.getUserById(id),
      admin
        .from("profiles")
        .select("role, display_name, company, business_address, phone, locked, lock_message")
        .eq("id", id)
        .maybeSingle(),
    ]);

  if (authError) throw new Error(authError.message);
  if (profileError) throw new Error(profileError.message);
  if (!authUser.user || !profile) return null;

  return { email: authUser.user.email ?? null, ...profile };
}

// Profile field edits, role changes, and lock state are all satisfied by
// the "own row or admin" RLS policy from migration 0001 — the session
// client works fine for these, no Admin API needed.
export async function updateUserProfile(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();

  function textOrNull(value: FormDataEntryValue | null) {
    const str = (value ?? "").toString().trim();
    return str.length > 0 ? str : null;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: textOrNull(formData.get("display_name")),
      company: textOrNull(formData.get("company")),
      business_address: textOrNull(formData.get("business_address")),
      phone: textOrNull(formData.get("phone")),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/users");
  revalidatePath(`/users/${id}`);
}

export async function setUserRole(id: string, role: "admin" | "member") {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/users");
  revalidatePath(`/users/${id}`);
}

const DEFAULT_LOCK_MESSAGE =
  "Please contact ClearTrack administration for help and assistance.";

export async function setUserLock(id: string, locked: boolean, lockMessage?: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("profiles")
    .update({
      locked,
      lock_message: locked ? (lockMessage?.trim() || DEFAULT_LOCK_MESSAGE) : DEFAULT_LOCK_MESSAGE,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/users");
  revalidatePath(`/users/${id}`);
}

// PRD §7: "An admin cannot remove their own account."
export async function removeUser(id: string) {
  const { currentUserId } = await requireAdmin();
  if (id === currentUserId) {
    throw new Error("You can't remove your own account.");
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);

  revalidatePath("/users");
}
