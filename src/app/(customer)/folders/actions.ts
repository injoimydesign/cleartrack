"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  return { supabase, user };
}

export async function createFolder(name: string, description?: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Folder name is required.");
  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("folders")
    .insert({ owner_id: user.id, name: trimmed, description: description?.trim() || null })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/folders");
  return data;
}

export async function renameFolder(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Folder name is required.");
  const { supabase } = await requireUser();

  const { error } = await supabase.from("folders").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/folders");
  revalidatePath(`/folders/${id}`);
}

export async function deleteFolder(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("folders").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/folders");
}

export async function getFolderMembership(songId: string) {
  const { supabase, user } = await requireUser();

  const [{ data: folders }, { data: memberships }] = await Promise.all([
    supabase.from("folders").select("id, name").eq("owner_id", user.id).order("name"),
    supabase.from("folder_songs").select("folder_id").eq("song_id", songId),
  ]);

  return {
    folders: folders ?? [],
    selectedFolderIds: (memberships ?? []).map((m) => m.folder_id),
  };
}

export async function toggleFolderSong(folderId: string, songId: string, shouldContain: boolean) {
  const { supabase } = await requireUser();

  if (shouldContain) {
    const { error } = await supabase.from("folder_songs").insert({ folder_id: folderId, song_id: songId });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("folder_songs")
      .delete()
      .eq("folder_id", folderId)
      .eq("song_id", songId);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/saved");
  revalidatePath("/folders");
}

// "Creating a new folder on the spot" from the save controls — creates
// and immediately adds the current song, in one action.
export async function createFolderAndAdd(name: string, songId: string) {
  const created = await createFolder(name);
  await toggleFolderSong(created.id, songId, true);
  return created;
}
