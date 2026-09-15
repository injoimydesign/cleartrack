import { createClient } from "@/lib/supabase/server";
import { updateOwnProfile } from "@/app/(customer)/profile/actions";

export const dynamic = "force-dynamic";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, company, business_address, phone")
    .eq("id", user!.id)
    .maybeSingle();

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-lg font-medium">Profile</h1>

      <div className="mb-6">
        <p className="text-sm text-console-text-muted">Email</p>
        <p className="text-sm text-console-text">{user!.email}</p>
      </div>

      <form action={updateOwnProfile} className="space-y-4">
        <div>
          <label htmlFor="display_name" className="mb-1 block text-sm text-console-text-muted">
            Display name
          </label>
          <input
            id="display_name"
            name="display_name"
            defaultValue={profile?.display_name ?? ""}
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
            defaultValue={profile?.company ?? ""}
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
            defaultValue={profile?.business_address ?? ""}
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm text-console-text-muted">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={profile?.phone ?? ""}
            className={fieldClasses}
          />
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
