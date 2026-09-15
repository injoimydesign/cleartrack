"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { CoverArt } from "@/components/shared/cover-art";
import { typeaheadSearch, type TypeaheadResult } from "@/app/(customer)/search-actions";

export function CustomerSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TypeaheadResult[]>([]);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = query.trim();
    debounceRef.current = setTimeout(() => {
      if (!trimmed) {
        setResults([]);
        setOpen(false);
        return;
      }
      startTransition(async () => {
        const found = await typeaheadSearch(trimmed);
        setResults(found);
        setOpen(true);
      });
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function goTo(id: string) {
    setOpen(false);
    setQuery("");
    router.push(`/music/${id}`);
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Anchor asChild>
        <div className="flex h-9 w-[280px] items-center gap-2 rounded-[var(--radius-control)] bg-console-panel px-3 shadow-[inset_0_0_0_1px_var(--border-default)]">
          <Search size={14} className="shrink-0 text-console-text-muted" aria-hidden />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search songs, artists, writers…"
            className="w-full min-w-0 bg-transparent text-sm text-console-text placeholder:text-console-text-muted focus:outline-none"
          />
        </div>
      </PopoverPrimitive.Anchor>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-50 w-80 rounded-[var(--radius-control)] border border-console-border bg-console-panel shadow-lg"
        >
          {isPending && (
            <p className="px-3 py-3 text-sm text-console-text-muted">Searching…</p>
          )}
          {!isPending && results.length === 0 && (
            <p className="px-3 py-3 text-sm text-console-text-muted">No matches.</p>
          )}
          {!isPending && results.length > 0 && (
            <ul className="max-h-80 divide-y divide-console-border overflow-y-auto">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => goTo(r.id)}
                    className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-console-border/30"
                  >
                    <CoverArt url={r.cover_art_url} title={r.title} size={12} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-console-text">{r.title}</p>
                      <p className="truncate text-xs text-console-text-muted">
                        {r.artistNames.join(", ") || "No artist yet"}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
