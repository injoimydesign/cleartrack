"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function textOrNull(value: FormDataEntryValue | null) {
  const str = (value ?? "").toString().trim();
  return str.length > 0 ? str : null;
}

export async function updateOwnProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: textOrNull(formData.get("display_name")),
      company: textOrNull(formData.get("company")),
      business_address: textOrNull(formData.get("business_address")),
      phone: textOrNull(formData.get("phone")),
    })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/profile");
}
