"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, Bookmark, Folder, CircleUser } from "lucide-react";

const SECTIONS = [
  { href: "/browse", label: "Browse", icon: FileSearch },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/folders", label: "Folders", icon: Folder },
  { href: "/profile", label: "Profile", icon: CircleUser },
];

export function CustomerNavLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {SECTIONS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
              active
                ? "bg-console-brand/12 text-console-brand"
                : "text-console-text hover:text-console-brand"
            }`}
          >
            <Icon size={14} aria-hidden />
            {label}
          </Link>
        );
      })}
      {isAdmin && (
        <Link
          href="/songs"
          className="text-sm whitespace-nowrap text-console-text hover:text-console-brand"
        >
          Admin
        </Link>
      )}
    </div>
  );
}
