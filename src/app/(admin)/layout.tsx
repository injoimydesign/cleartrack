import Link from "next/link";

const NAV = [
  { href: "/songs", label: "Songs" },
  { href: "/writers", label: "Writers" },
  { href: "/labels", label: "Labels" },
  { href: "/publishers", label: "Publishers" },
  { href: "/pros", label: "PROs" },
  { href: "/artists", label: "Artists" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-console-border bg-console-panel px-4 py-6">
        <div className="mb-8 px-2">
          <span className="font-mono text-sm tracking-tight text-console-accent">
            CLEARTRACK
          </span>
          <p className="mt-0.5 text-xs text-console-text-muted">Catalog admin</p>
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
      </aside>
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  );
}
