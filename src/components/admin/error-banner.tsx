export function ErrorBanner({ message }: { message: string }) {
  return (
    <p className="rounded-[var(--radius-panel)] border border-console-warn/40 bg-console-warn/10 px-4 py-3 text-sm text-console-warn">
      {message}
    </p>
  );
}
