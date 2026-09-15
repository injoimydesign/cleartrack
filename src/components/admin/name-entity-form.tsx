const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export function NameEntityForm({
  defaultName,
  action,
  submitLabel,
  placeholder,
}: {
  defaultName?: string;
  action: (formData: FormData) => void;
  submitLabel: string;
  placeholder: string;
}) {
  return (
    <form action={action} className="max-w-md space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-console-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultName}
          className={fieldClasses}
          placeholder={placeholder}
        />
      </div>
      <button
        type="submit"
        className="rounded-[var(--radius-pill)] bg-console-action px-5 py-2 text-sm font-medium text-console-text hover:brightness-125"
      >
        {submitLabel}
      </button>
    </form>
  );
}
