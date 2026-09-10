"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_PATH = "/writers";

function parseIdArray(raw: FormDataEntryValue | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw.toString());
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

async function syncProLinks(
  writerId: string,
  table: "writer_pros" | "writer_publisher_pros",
  proIds: string[],
) {
  const supabase = createAdminClient();
  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq("writer_id", writerId);
  if (deleteError) throw new Error(deleteError.message);

  if (proIds.length > 0) {
    const { error: insertError } = await supabase
      .from(table)
      .insert(proIds.map((proId) => ({ writer_id: writerId, pro_id: proId })));
    if (insertError) throw new Error(insertError.message);
  }
}

export async function createWriter(formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");
  const publisherId = (formData.get("publisher_id") ?? "").toString() || null;
  const proIds = parseIdArray(formData.get("pro_ids"));
  const publisherProIds = parseIdArray(formData.get("publisher_pro_ids"));

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("writers")
    .insert({ name, publisher_id: publisherId })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  await syncProLinks(data.id, "writer_pros", proIds);
  await syncProLinks(data.id, "writer_publisher_pros", publisherProIds);

  revalidatePath(BASE_PATH);
  redirect(`${BASE_PATH}/${data.id}`);
}

// Used by the Song form's writer picker for inline "Add "<name>"" creation.
export async function createWriterInline(name: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("writers")
    .insert({ name })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
  return data;
}

// Used by the "New writer" modal (opened from the Song form's writer row
// when a search finds no match — PRD §3 point 3). Takes the full field set
// rather than just a name, and returns the created row instead of
// redirecting, since the caller stays on the song form.
export async function createWriterFull(input: {
  name: string;
  publisherId: string | null;
  proIds: string[];
  publisherProIds: string[];
}) {
  const name = input.name.trim();
  if (!name) throw new Error("Name is required.");

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("writers")
    .insert({ name, publisher_id: input.publisherId })
    .select("id, name")
    .single();
  if (error) throw new Error(error.message);

  await syncProLinks(data.id, "writer_pros", input.proIds);
  await syncProLinks(data.id, "writer_publisher_pros", input.publisherProIds);

  revalidatePath(BASE_PATH);
  return data;
}

export async function updateWriter(id: string, formData: FormData) {
  const name = (formData.get("name") ?? "").toString().trim();
  if (!name) throw new Error("Name is required.");
  const publisherId = (formData.get("publisher_id") ?? "").toString() || null;
  const proIds = parseIdArray(formData.get("pro_ids"));
  const publisherProIds = parseIdArray(formData.get("publisher_pro_ids"));

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("writers")
    .update({ name, publisher_id: publisherId })
    .eq("id", id);
  if (error) throw new Error(error.message);

  await syncProLinks(id, "writer_pros", proIds);
  await syncProLinks(id, "writer_publisher_pros", publisherProIds);

  revalidatePath(BASE_PATH);
  revalidatePath(`${BASE_PATH}/${id}`);
}

export async function deleteWriters(ids: string[]) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("writers").delete().in("id", ids);
  if (error) throw new Error(error.message);
  revalidatePath(BASE_PATH);
}
