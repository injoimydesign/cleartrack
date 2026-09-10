import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { listUsers } from "@/app/(admin)/users/actions";
import { UsersListClient } from "@/app/(admin)/users/users-list-client";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/songs");
  }

  const users = await listUsers();

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium">Users</h1>
      <UsersListClient initialUsers={users} currentUserId={user!.id} />
    </div>
  );
}
