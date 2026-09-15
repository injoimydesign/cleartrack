import Link from "next/link";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { BrandMark } from "@/components/shared/brand-mark";
import { CustomerNavLinks } from "@/components/customer/customer-nav-links";
import { CustomerSearch } from "@/components/customer/customer-search";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    isAdmin = profile?.role === "admin";
  }

  return (
    <div className="flex min-h-screen flex-col bg-console-bg text-console-text">
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-console-border bg-console-nav px-6">
        <div className="flex items-center gap-6">
          <Link href="/browse">
            <BrandMark />
          </Link>
          {user && <CustomerNavLinks isAdmin={isAdmin} />}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <CustomerSearch />
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-1.5 text-xs text-console-text-muted hover:text-console-text"
                >
                  <LogOut size={13} aria-hidden />
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/auth" className="text-sm text-console-text-muted hover:text-console-accent">
              Sign in
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 px-16 py-8">{children}</main>
    </div>
  );
}
