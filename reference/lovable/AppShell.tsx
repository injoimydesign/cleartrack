import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Disc3,
  Library,
  Building2,
  Users,
  BadgeCheck,
  Tag,
  Search,
  Compass,
  LogIn,
  LogOut,
  UserCog,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { to: "/songs", label: "Songs", icon: Disc3 },
  { to: "/writers", label: "Writers", icon: Users },
  { to: "/labels", label: "Labels", icon: Tag },
  { to: "/publishers", label: "Publishers", icon: Building2 },
  { to: "/pros", label: "PROs", icon: BadgeCheck },
  { to: "/artists", label: "Artists", icon: Library },
  { to: "/users", label: "Users", icon: UserCog },
] as const;

function HeaderSearch() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  return (
    <form
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        const q = term.trim();
        if (q) navigate({ to: "/search", search: { q } });
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search the catalog…"
        className="w-56 pl-9 lg:w-72"
      />
    </form>
  );
}

export function AppShell({
  children,
  title,
  eyebrow,
  actions,
}: {
  children: ReactNode;
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  if (!loading && !user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 md:flex">
        <Link to="/songs" className="mb-8 flex items-center gap-2 px-2">
          <span className="surface-warm flex size-8 items-center justify-center rounded-xl font-display text-sm font-bold">
            CT
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">ClearTrack</span>
        </Link>
        <p className="label-eyebrow mb-3 px-2">Catalog admin</p>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/songs" }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-primary"
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-2 px-2">
          <Link
            to="/browse"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <Compass className="size-3.5" /> Customer view
          </Link>
          {user ? (
            <button
              type="button"
              onClick={async () => {
                await signOut();
                navigate({ to: "/auth" });
              }}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <LogIn className="size-3.5" /> Sign in
            </Link>
          )}
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
            <div>
              {eyebrow ? <p className="label-eyebrow">{eyebrow}</p> : null}
              <h1 className="font-display text-2xl font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <HeaderSearch />
              {actions}
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/songs" }}
                className="rounded-full px-3 py-1.5 text-xs whitespace-nowrap text-muted-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
