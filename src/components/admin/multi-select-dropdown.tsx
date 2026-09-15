"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";

export type SelectOption = { id: string; name: string };

/**
 * Trigger + searchable popover multi-select, styled to match the PRO
 * picker reference: a "Select…" field that opens a search box with a
 * filtered list, the highlighted row filled solid with the accent color.
 * Built on Radix's Popover primitive for real focus/dismiss handling
 * (outside click, Escape, focus return to trigger) rather than a
 * hand-rolled click-outside listener.
 */
export function MultiSelectDropdown({
  options,
  initialSelectedIds,
  hiddenFieldName,
  onSelectedChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
}: {
  options: SelectOption[];
  initialSelectedIds: string[];
  /** Provide when used inside a <form> — renders a hidden JSON input. */
  hiddenFieldName?: string;
  /** Provide for controlled, non-form usage (e.g. inside a modal). */
  onSelectedChange?: (ids: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedIds));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.name.toLowerCase().includes(q));
  }, [options, query]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      onSelectedChange?.(Array.from(next));
      return next;
    });
  }

  const selectedNames = options.filter((o) => selected.has(o.id)).map((o) => o.name);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-left text-sm text-console-text focus:border-console-accent focus:outline-none"
        >
          <span className={selectedNames.length ? "" : "text-console-text-muted"}>
            {selectedNames.length ? selectedNames.join(", ") : placeholder}
          </span>
          <span className="text-console-text-muted">
            <ChevronDown size={10} aria-hidden />
          </span>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 w-72 rounded-[var(--radius-control)] border border-console-border bg-console-panel shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-console-border px-3 py-2">
            <span className="text-console-text-muted">
              <Search size={14} aria-hidden />
            </span>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm text-console-text placeholder:text-console-text-muted focus:outline-none"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.map((option) => {
              const isSelected = selected.has(option.id);
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => toggle(option.id)}
                    className={`w-full px-3 py-2 text-left text-sm ${
                      isSelected
                        ? "bg-console-action font-medium text-console-text"
                        : "text-console-text hover:bg-console-border/60"
                    }`}
                  >
                    {option.name}
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-console-text-muted">No matches.</li>
            )}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>

      {hiddenFieldName && (
        <input
          type="hidden"
          name={hiddenFieldName}
          value={JSON.stringify(Array.from(selected))}
        />
      )}
    </PopoverPrimitive.Root>
  );
}
