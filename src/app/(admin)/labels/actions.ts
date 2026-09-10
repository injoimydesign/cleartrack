"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_PATH = "/labels";

export async function createLabel(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = createAdminClient();
  const { error } = await supabase.from("labels").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  redirect(BASE_PATH);
}

// Used by pickers elsewhere (song form publisher lookup, writer form
// publisher field) for inline add-new-by-name creation.
export async function createLabelInline(name: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("labels")
    .insert({ name })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
  return data;
}

export async function updateLabel(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = createAdminClient();
  const { error } = await supabase.from("labels").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${id}`);
}

export async function deleteLabels(ids: string[]) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("labels").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
}
