"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") ?? "");

  return (
    <form
      className="relative w-72"
      onSubmit={(e) => {
        e.preventDefault();
        const q = term.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-console-text-muted" />
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search the catalog…"
        className="w-full rounded-[var(--radius-pill)] border border-console-border bg-console-bg py-1.5 pr-3 pl-9 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent focus:outline-none"
      />
    </form>
  );
}
