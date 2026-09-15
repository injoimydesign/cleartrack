import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { BrandMark } from "@/components/shared/brand-mark";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-console-bg text-console-text">
      <header className="flex items-center justify-between border-b border-console-border px-6 py-4">
        <Link href="/browse">
          <BrandMark />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link href="/browse" className="text-console-text-muted hover:text-console-accent">
                Browse
              </Link>
              <Link href="/saved" className="text-console-text-muted hover:text-console-accent">
                Saved
              </Link>
              <Link href="/folders" className="text-console-text-muted hover:text-console-accent">
                Folders
              </Link>
              <Link href="/profile" className="text-console-text-muted hover:text-console-accent">
                Profile
              </Link>
              <form action={signOut}>
                <button type="submit" className="text-console-text-muted hover:text-console-accent">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link href="/auth" className="text-console-text-muted hover:text-console-accent">
              Sign in
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
