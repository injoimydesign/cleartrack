"use client";

import { useState, useTransition } from "react";
import { Select as SelectPrimitive } from "radix-ui";

const NONE_VALUE = "__none__";

function ChevronIcon() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SingleReferenceSelect({
  options,
  initialSelectedId,
  createAction,
  hiddenFieldName,
  noneLabel = "— None —",
}: {
  options: { id: string; name: string }[];
  initialSelectedId: string | null;
  createAction: (name: string) => Promise<{ id: string; name: string }>;
  hiddenFieldName: string;
  noneLabel?: string;
}) {
  const [allOptions, setAllOptions] = useState(options);
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId ?? "");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    startTransition(async () => {
      const created = await createAction(name);
      setAllOptions((prev) => [...prev, created]);
      setSelectedId(created.id);
      setNewName("");
      setAdding(false);
    });
  }

  return (
    <div>
      <SelectPrimitive.Root
        value={selectedId || NONE_VALUE}
        onValueChange={(value) => setSelectedId(value === NONE_VALUE ? "" : value)}
      >
        <SelectPrimitive.Trigger className="flex w-full items-center justify-between rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text focus:border-console-accent focus:outline-none data-[placeholder]:text-console-text-muted">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="text-console-text-muted">
            <ChevronIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="overflow-hidden rounded-[var(--radius-control)] border border-console-border bg-console-panel shadow-lg">
            <SelectPrimitive.Viewport className="max-h-64 p-1">
              <SelectPrimitive.Item
                value={NONE_VALUE}
                className="flex cursor-pointer items-center justify-between rounded-[var(--radius-control)] px-3 py-2 text-sm text-console-text outline-none data-[highlighted]:bg-console-accent data-[highlighted]:text-console-bg"
              >
                <SelectPrimitive.ItemText>{noneLabel}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
              {allOptions.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
                  className="flex cursor-pointer items-center justify-between truncate rounded-[var(--radius-control)] px-3 py-2 text-sm text-console-text outline-none data-[highlighted]:bg-console-accent data-[highlighted]:text-console-bg"
                >
                  <SelectPrimitive.ItemText>{option.name}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {!adding ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-1.5 text-xs text-console-accent hover:underline"
        >
          + Add new
        </button>
      ) : (
        <div className="mt-1.5 flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New publisher name"
            className="flex-1 rounded-[var(--radius-control)] border border-console-border bg-console-bg px-2 py-1 text-sm"
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={isPending}
            className="rounded-[var(--radius-pill)] bg-console-accent px-3 py-1 text-xs font-medium text-console-bg hover:bg-console-accent-strong disabled:opacity-50"
          >
            {isPending ? "Adding…" : "Add & use"}
          </button>
        </div>
      )}

      <input type="hidden" name={hiddenFieldName} value={selectedId} />
    </div>
  );
}
