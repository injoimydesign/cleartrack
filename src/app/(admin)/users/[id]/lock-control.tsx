"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setUserLock } from "@/app/(admin)/users/actions";

const DEFAULT_LOCK_MESSAGE =
  "Please contact ClearTrack administration for help and assistance.";

export function LockControl({
  userId,
  initialLocked,
  initialMessage,
}: {
  userId: string;
  initialLocked: boolean;
  initialMessage: string;
}) {
  const [locked, setLocked] = useState(initialLocked);
  const [message, setMessage] = useState(initialMessage || DEFAULT_LOCK_MESSAGE);
  const [isPending, startTransition] = useTransition();

  function apply(nextLocked: boolean) {
    startTransition(async () => {
      try {
        await setUserLock(userId, nextLocked, message);
        setLocked(nextLocked);
        toast.success(nextLocked ? "Account locked." : "Account unlocked.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't update lock status.");
      }
    });
  }

  return (
    <div className="rounded-[var(--radius-panel)] border border-console-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-console-text">
          {locked ? "Account is locked" : "Account is active"}
        </span>
        <button
          type="button"
          onClick={() => apply(!locked)}
          disabled={isPending}
          className={`rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium disabled:opacity-50 ${
            locked
              ? "border border-console-border text-console-text hover:border-console-accent"
              : "border border-console-warn/40 text-console-warn hover:bg-console-warn/10"
          }`}
        >
          {locked ? "Unlock" : "Lock"}
        </button>
      </div>
      <label className="mb-1 block text-xs text-console-text-muted">
        Message shown to the locked user
      </label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={2}
        className="w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text focus:border-console-accent"
      />
    </div>
  );
}
