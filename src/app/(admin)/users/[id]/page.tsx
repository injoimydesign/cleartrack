import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserDetail, updateUserProfile } from "@/app/(admin)/users/actions";
import { LockControl } from "@/app/(admin)/users/[id]/lock-control";

export const dynamic = "force-dynamic";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text focus:border-console-accent";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", currentUser!.id)
    .maybeSingle();

  if (currentProfile?.role !== "admin") {
    redirect("/songs");
  }

  const detail = await getUserDetail(id);
  if (!detail) {
    notFound();
  }

  const updateWithId = updateUserProfile.bind(null, id);

  return (
    <div className="max-w-md">
      <Link
        href="/users"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Users
      </Link>

      <h1 className="mb-1 text-lg font-medium">{detail.display_name || detail.email}</h1>
      <p className="mb-6 text-sm text-console-text-muted">{detail.email}</p>

      <div className="mb-6">
        <LockControl
          userId={id}
          initialLocked={detail.locked}
          initialMessage={detail.lock_message}
        />
      </div>

      <form action={updateWithId} className="space-y-4">
        <div>
          <label htmlFor="display_name" className="mb-1 block text-sm text-console-text-muted">
            Display name
          </label>
          <input
            id="display_name"
            name="display_name"
            defaultValue={detail.display_name ?? ""}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1 block text-sm text-console-text-muted">
            Company
          </label>
          <input
            id="company"
            name="company"
            defaultValue={detail.company ?? ""}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="business_address" className="mb-1 block text-sm text-console-text-muted">
            Business address
          </label>
          <input
            id="business_address"
            name="business_address"
            defaultValue={detail.business_address ?? ""}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm text-console-text-muted">
            Phone
          </label>
          <input id="phone" name="phone" defaultValue={detail.phone ?? ""} className={fieldClasses} />
        </div>
        <button
          type="submit"
          className="rounded-[var(--radius-pill)] bg-console-action px-5 py-2 text-sm font-medium text-console-text hover:brightness-125"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
