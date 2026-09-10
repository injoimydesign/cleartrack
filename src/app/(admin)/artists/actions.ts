"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BASE_PATH = "/artists";

export async function createArtist(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = await createClient();
  const { error } = await supabase.from("artists").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  redirect(BASE_PATH);
}

// Used by the Song form's artist picker for inline "Add "<name>"" creation.
export async function createArtistInline(name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artists")
    .insert({ name })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
  return data;
}

export async function updateArtist(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = await createClient();
  const { error } = await supabase.from("artists").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${id}`);
}

export async function deleteArtists(ids: string[]) {
  const supabase = await createClient();
  const { error } = await supabase.from("artists").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
}
