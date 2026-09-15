/**
 * ClearTrack has no logo file in the source design system; the mark is a
 * monogram disc (Inter Extra Bold "ct") set next to the wordmark (Figtree
 * Bold). Orange is used nowhere else in the app — it's reserved for brand
 * identity per the system's "orange identifies" rule.
 */
export function BrandMark({
  size = 28,
  showWordmark = true,
}: {
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ width: size, height: size, fontSize: Math.round(size * 0.43) }}
        className="flex shrink-0 items-center justify-center rounded-full bg-console-brand font-[family-name:var(--font-ui)] font-extrabold text-white"
      >
        ct
      </div>
      {showWordmark && (
        <span className="whitespace-nowrap text-sm font-bold text-console-text">
          ClearTrack
        </span>
      )}
    </div>
  );
}
