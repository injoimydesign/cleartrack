"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_PATH = "/publishers";

export async function createPublisher(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = createAdminClient();
  const { error } = await supabase.from("publishers").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  redirect(BASE_PATH);
}

// Used by pickers elsewhere (song form publisher lookup, writer form
// publisher field) for inline add-new-by-name creation.
export async function createPublisherInline(name: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("publishers")
    .insert({ name })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
  return data;
}

export async function updatePublisher(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = createAdminClient();
  const { error } = await supabase.from("publishers").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${id}`);
}

export async function deletePublishers(ids: string[]) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("publishers").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
}
