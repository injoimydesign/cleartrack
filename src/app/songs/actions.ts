"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

// PHASE 1 NOTE: these actions use the service-role admin client because
// there's no signed-in session yet (auth lands in Phase 6 — see
// src/lib/supabase/admin.ts for the swap-over plan). The *_write_admin RLS
// policies from migration 0001 already exist and will start actually
// gating these writes the moment this file switches to the session client.

function textOrNull(value: FormDataEntryValue | null) {
  const str = (value ?? "").toString().trim();
  return str.length > 0 ? str : null;
}

export async function createSong(formData: FormData) {
  const title = (formData.get("title") ?? "").toString().trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("songs")
    .insert({
      title,
      cover_art_url: textOrNull(formData.get("cover_art_url")),
      notes: textOrNull(formData.get("notes")),
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/songs");
  redirect(`/songs/${data.id}`);
}

export async function updateSong(id: string, formData: FormData) {
  const title = (formData.get("title") ?? "").toString().trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("songs")
    .update({
      title,
      cover_art_url: textOrNull(formData.get("cover_art_url")),
      notes: textOrNull(formData.get("notes")),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/songs");
  revalidatePath(`/songs/${id}`);
}

export async function deleteSong(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("songs").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/songs");
  redirect("/songs");
}
