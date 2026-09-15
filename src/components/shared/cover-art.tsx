import { Music } from "lucide-react";

export function CoverArt({
  url,
  title,
  size = 16,
}: {
  url: string | null;
  title: string;
  size?: 12 | 16;
}) {
  const dimension = size === 16 ? "size-16" : "size-12";
  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-control)] border border-console-border bg-console-panel`}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={`${title} cover art`} className="h-full w-full object-cover" />
      ) : (
        <span className="text-console-text-muted">
          <Music size={20} strokeWidth={2} aria-hidden />
        </span>
      )}
    </div>
  );
}
