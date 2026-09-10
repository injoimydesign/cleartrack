import { SingleReferenceSelect } from "@/components/admin/single-reference-select";
import { MultiSelectDropdown } from "@/components/admin/multi-select-dropdown";
import { createPublisherInline } from "@/app/(admin)/publishers/actions";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export function WriterForm({
  defaultValues,
  publishers,
  pros,
  action,
  submitLabel,
}: {
  defaultValues?: {
    name: string;
    publisherId: string | null;
    proIds: string[];
    publisherProIds: string[];
  };
  publishers: { id: string; name: string }[];
  pros: { id: string; name: string }[];
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-xl space-y-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-console-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          className={fieldClasses}
          placeholder="Writer name"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-console-text-muted">
          Writer&apos;s PRO(s)
        </label>
        <p className="mb-2 text-xs text-console-text-muted">
          Displayed as &ldquo;PRO1/PRO2&rdquo; — &ldquo;No PRO&rdquo; when none selected.
        </p>
        <MultiSelectDropdown
          options={pros}
          initialSelectedIds={defaultValues?.proIds ?? []}
          hiddenFieldName="pro_ids"
          placeholder="Select PROs…"
          searchPlaceholder="Search PROs…"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-console-text-muted">Publisher</label>
        <SingleReferenceSelect
          options={publishers}
          initialSelectedId={defaultValues?.publisherId ?? null}
          createAction={createPublisherInline}
          hiddenFieldName="publisher_id"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-console-text-muted">
          Publisher&apos;s PRO(s)
        </label>
        <MultiSelectDropdown
          options={pros}
          initialSelectedIds={defaultValues?.publisherProIds ?? []}
          hiddenFieldName="publisher_pro_ids"
          placeholder="Select PROs…"
          searchPlaceholder="Search PROs…"
        />
      </div>

      <button
        type="submit"
        className="rounded-[var(--radius-pill)] bg-console-accent px-5 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
      >
        {submitLabel}
      </button>
    </form>
  );
}
