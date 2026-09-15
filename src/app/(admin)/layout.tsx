import Link from "next/link";
import { Suspense } from "react";
import { HeaderSearch } from "@/components/admin/header-search";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { BrandMark } from "@/components/shared/brand-mark";

const NAV = [
  { href: "/songs", label: "Songs" },
  { href: "/writers", label: "Writers" },
  { href: "/labels", label: "Labels" },
  { href: "/publishers", label: "Publishers" },
  { href: "/pros", label: "PROs" },
  { href: "/artists", label: "Artists" },
  { href: "/users", label: "Users" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already redirects signed-out visitors to /auth before this
  // layout ever renders, so `user` is expected here — this is a defensive
  // fallback, not the primary gate.
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-console-text-muted">
        Redirecting to sign in…
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("locked, lock_message")
    .eq("id", user.id)
    .maybeSingle();

  // PRD §7: a locked user sees this notice instead of the catalog.
  if (profile?.locked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-lg font-semibold text-console-text">Account locked</h1>
        <p className="max-w-sm text-sm text-console-text-muted">
          {profile.lock_message}
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-[var(--radius-pill)] border border-console-border px-4 py-1.5 text-sm text-console-text hover:border-console-text-muted"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-console-border bg-console-panel px-4 py-6">
        <div className="mb-8 px-2">
          <BrandMark />
          <p className="mt-1.5 text-xs text-console-text-muted">Catalog admin</p>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[var(--radius-control)] px-2 py-1.5 text-sm text-console-text hover:bg-console-border/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2 px-2 pt-4">
          <Link
            href="/browse"
            className="block text-xs text-console-text-muted hover:text-console-accent"
          >
            Customer view →
          </Link>
          <p className="truncate text-xs text-console-text-muted" title={user.email ?? ""}>
            {user.email}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs text-console-text-muted hover:text-console-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex justify-end border-b border-console-border px-8 py-3">
          <Suspense fallback={<div className="h-9 w-72" />}>
            <HeaderSearch />
          </Suspense>
        </header>
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
