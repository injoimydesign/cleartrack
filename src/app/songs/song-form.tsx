const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export function SongForm({
  defaultValues,
  action,
  submitLabel,
}: {
  defaultValues?: { title: string; cover_art_url: string | null; notes: string | null };
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm text-console-text-muted">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className={fieldClasses}
          placeholder="Song title"
        />
      </div>

      <div>
        <label
          htmlFor="cover_art_url"
          className="mb-1 block text-sm text-console-text-muted"
        >
          Cover art URL
        </label>
        <input
          id="cover_art_url"
          name="cover_art_url"
          type="url"
          defaultValue={defaultValues?.cover_art_url ?? ""}
          className={fieldClasses}
          placeholder="https://…"
        />
        <p className="mt-1 text-xs text-console-text-muted">
          Manual for now — Spotify auto-fetch arrives in Phase 3.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1 block text-sm text-console-text-muted">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={defaultValues?.notes ?? ""}
          className={fieldClasses}
          placeholder="Anything a coordinator should know about clearing this song."
        />
      </div>

      <button
        type="submit"
        className="rounded-[var(--radius-control)] bg-console-accent px-4 py-2 text-sm font-medium text-console-bg hover:bg-console-accent/90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
