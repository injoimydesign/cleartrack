"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function redirectWithError(mode: "sign-in" | "sign-up", message: string): never {
  redirect(`/auth?mode=${mode}&error=${encodeURIComponent(message)}`);
}

export async function signUp(formData: FormData) {
  const email = (formData.get("email") ?? "").toString().trim();
  const password = (formData.get("password") ?? "").toString();
  const displayName = (formData.get("display_name") ?? "").toString().trim() || null;

  if (!email || !password) {
    redirectWithError("sign-up", "Email and password are required.");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (error) {
    redirectWithError("sign-up", error.message);
  }

  // If email confirmation is required, Supabase returns a user but no
  // session yet — PRD §7: "Email confirmation messaging is shown where
  // relevant."
  if (data.user && !data.session) {
    redirect("/auth?mode=sign-in&notice=" + encodeURIComponent("Check your email to confirm your account, then sign in."));
  }

  redirect("/songs");
}

export async function signIn(formData: FormData) {
  const email = (formData.get("email") ?? "").toString().trim();
  const password = (formData.get("password") ?? "").toString();
  const redirectTo = (formData.get("redirect_to") ?? "").toString();

  if (!email || !password) {
    redirectWithError("sign-in", "Email and password are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWithError("sign-in", error.message);
  }

  redirect(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/songs");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
