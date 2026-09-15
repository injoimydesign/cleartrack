"use client";

import { useMemo, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";

export type SearchableOption = { id: string; name: string };

/**
 * Single-select searchable dropdown for a row-based picker (one writer,
 * label, or artist per row). Closes on selection, unlike
 * MultiSelectDropdown. `exclude` hides options already chosen in sibling
 * rows so the same reference can't be added twice.
 */
export function SearchableSelect({
  options,
  value,
  onChange,
  exclude = [],
  placeholder = "Select…",
  createAction,
  onRequestCreate,
}: {
  options: SearchableOption[];
  value: string | null;
  onChange: (id: string, name: string) => void;
  exclude?: string[];
  placeholder?: string;
  /** Direct create-inline flow: creates with just a name. */
  createAction?: (name: string) => Promise<{ id: string; name: string }>;
  /** Escape hatch for richer creation (e.g. a modal with more fields).
   * When provided, "Add "<name>"" calls this instead of `createAction` —
   * the caller is responsible for eventually calling `onChange` once the
   * new record exists. */
  onRequestCreate?: (name: string) => void;
}) {
  const [locallyAdded, setLocallyAdded] = useState<SearchableOption[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const allOptions = useMemo(() => {
    const map = new Map(options.map((o) => [o.id, o]));
    for (const o of locallyAdded) map.set(o.id, o);
    return Array.from(map.values());
  }, [options, locallyAdded]);

  const selectedOption = allOptions.find((o) => o.id === value) ?? null;

  const excludeSet = useMemo(() => new Set(exclude.filter((id) => id !== value)), [
    exclude,
    value,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allOptions.filter(
      (o) => !excludeSet.has(o.id) && (!q || o.name.toLowerCase().includes(q)),
    );
  }, [allOptions, query, excludeSet]);

  const exactMatch = allOptions.some(
    (o) => o.name.toLowerCase() === query.trim().toLowerCase(),
  );

  function select(option: SearchableOption) {
    onChange(option.id, option.name);
    setQuery("");
    setOpen(false);
  }

  function addNew() {
    const name = query.trim();
    if (!name) return;
    if (onRequestCreate) {
      onRequestCreate(name);
      setQuery("");
      setOpen(false);
      return;
    }
    if (!createAction) return;
    startTransition(async () => {
      const created = await createAction(name);
      setLocallyAdded((prev) => [...prev, created]);
      onChange(created.id, created.name);
      setQuery("");
      setOpen(false);
    });
  }

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-left text-sm text-console-text focus:border-console-accent focus:outline-none"
        >
          <span className={`truncate ${selectedOption ? "" : "text-console-text-muted"}`}>
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          <span className="shrink-0 text-console-text-muted">
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
          <div className="border-b border-console-border p-2">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent px-1 py-1 text-sm text-console-text placeholder:text-console-text-muted focus:outline-none"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => select(option)}
                  className="block w-full truncate px-3 py-2 text-left text-sm text-console-text hover:bg-console-action hover:text-console-text"
                  title={option.name}
                >
                  {option.name}
                </button>
              </li>
            ))}
            {filtered.length === 0 && !query.trim() && (
              <li className="px-3 py-2 text-sm text-console-text-muted">No options.</li>
            )}
            {(createAction || onRequestCreate) && query.trim() && !exactMatch && (
              <li>
                <button
                  type="button"
                  onClick={addNew}
                  disabled={isPending}
                  className="block w-full px-3 py-2 text-left text-sm text-console-accent hover:bg-console-border/60 disabled:opacity-50"
                >
                  {isPending ? "Adding…" : `Add "${query.trim()}"`}
                </button>
              </li>
            )}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
