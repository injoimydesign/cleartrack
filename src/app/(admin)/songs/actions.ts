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

type PickedRef = { id: string; splitPercent?: number };

function parsePicked(raw: FormDataEntryValue | null): PickedRef[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw.toString());
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((v) => v && typeof v.id === "string")
      .map((v) => ({ id: v.id, splitPercent: Number(v.splitPercent ?? 0) }));
  } catch {
    return [];
  }
}

function parseIds(raw: FormDataEntryValue | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw.toString());
    if (!Array.isArray(parsed)) return [];
    // Accept either a plain string-id array (artists) or {id, ...} objects.
    return parsed
      .map((v) => (typeof v === "string" ? v : v?.id))
      .filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

// Replace-all sync for each song join table — simplest reliable approach
// for Phase 2. Revisit if catalogs get large enough that a full
// delete + reinsert on every save becomes a real cost (unlikely at scale).
async function syncSongArtists(songId: string, artistIds: string[]) {
  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from("song_artists")
    .delete()
    .eq("song_id", songId);
  if (deleteError) throw new Error(deleteError.message);
  if (artistIds.length === 0) return;

  const { error: insertError } = await supabase
    .from("song_artists")
    .insert(artistIds.map((artist_id) => ({ song_id: songId, artist_id })));
  if (insertError) throw new Error(insertError.message);
}

async function syncSongWriters(songId: string, picked: PickedRef[]) {
  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from("song_writers")
    .delete()
    .eq("song_id", songId);
  if (deleteError) throw new Error(deleteError.message);
  if (picked.length === 0) return;

  const { error: insertError } = await supabase.from("song_writers").insert(
    picked.map((p) => ({
      song_id: songId,
      writer_id: p.id,
      split_percent: p.splitPercent ?? 0,
    })),
  );
  if (insertError) throw new Error(insertError.message);
}

async function syncSongLabels(songId: string, picked: PickedRef[]) {
  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from("song_labels")
    .delete()
    .eq("song_id", songId);
  if (deleteError) throw new Error(deleteError.message);
  if (picked.length === 0) return;

  const { error: insertError } = await supabase.from("song_labels").insert(
    picked.map((p) => ({
      song_id: songId,
      label_id: p.id,
      split_percent: p.splitPercent ?? 0,
    })),
  );
  if (insertError) throw new Error(insertError.message);
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
      publisher_id: textOrNull(formData.get("publisher_id")),
      spotify_track_id: textOrNull(formData.get("spotify_track_id")),
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  await syncSongArtists(data.id, parseIds(formData.get("artist_ids")));
  await syncSongWriters(data.id, parsePicked(formData.get("writers_json")));
  await syncSongLabels(data.id, parsePicked(formData.get("labels_json")));

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
      publisher_id: textOrNull(formData.get("publisher_id")),
      spotify_track_id: textOrNull(formData.get("spotify_track_id")),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await syncSongArtists(id, parseIds(formData.get("artist_ids")));
  await syncSongWriters(id, parsePicked(formData.get("writers_json")));
  await syncSongLabels(id, parsePicked(formData.get("labels_json")));

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

export async function deleteSongs(ids: string[]) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("songs").delete().in("id", ids);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/songs");
}
