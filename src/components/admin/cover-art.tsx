function MusicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

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
          <MusicIcon />
        </span>
      )}
    </div>
  );
}
