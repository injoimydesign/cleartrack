"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";

export function Checkbox({
  checked,
  onCheckedChange,
  ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={(value) => onCheckedChange(value === true)}
      aria-label={ariaLabel}
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-console-border bg-console-bg outline-none transition-colors hover:border-console-accent data-[state=checked]:border-console-accent data-[state=checked]:bg-console-accent focus-visible:ring-2 focus-visible:ring-console-accent focus-visible:ring-offset-2 focus-visible:ring-offset-console-bg"
    >
      <CheckboxPrimitive.Indicator>
        <span className="block h-1.5 w-1.5 rounded-full bg-console-bg" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
