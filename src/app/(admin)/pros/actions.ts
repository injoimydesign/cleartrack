"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BASE_PATH = "/pros";

export async function createPro(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = await createClient();
  const { error } = await supabase.from("pros").insert({ name });
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  redirect(BASE_PATH);
}

export async function updatePro(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");

  const supabase = await createClient();
  const { error } = await supabase.from("pros").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${id}`);
}

export async function deletePros(ids: string[]) {
  const supabase = await createClient();
  const { error } = await supabase.from("pros").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
}
