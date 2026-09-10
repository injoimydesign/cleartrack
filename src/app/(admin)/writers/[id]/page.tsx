import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteWriters, updateWriter } from "@/app/(admin)/writers/actions";
import { WriterForm } from "@/app/(admin)/writers/writer-form";

export const dynamic = "force-dynamic";

type WriterDetail = {
  id: string;
  name: string;
  publisher_id: string | null;
  writer_pros: { pro_id: string }[];
  writer_publisher_pros: { pro_id: string }[];
};

export default async function WriterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: writer }, { data: publishers }, { data: pros }] = await Promise.all([
    supabase
      .from("writers")
      .select("id, name, publisher_id, writer_pros(pro_id), writer_publisher_pros(pro_id)")
      .eq("id", id)
      .maybeSingle()
      .returns<WriterDetail | null>(),
    supabase.from("publishers").select("id, name").order("name"),
    supabase.from("pros").select("id, name").order("name"),
  ]);

  if (!writer) {
    notFound();
  }

  const updateWithId = updateWriter.bind(null, writer.id);
  const deleteWithId = deleteWriters.bind(null, [writer.id]);

  return (
    <div>
      <Link
        href="/writers"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Writers
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{writer.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1.5 text-sm text-console-warn hover:bg-console-warn/10"
          >
            Delete
          </button>
        </form>
      </div>

      <WriterForm
        defaultValues={{
          name: writer.name,
          publisherId: writer.publisher_id,
          proIds: writer.writer_pros.map((p) => p.pro_id),
          publisherProIds: writer.writer_publisher_pros.map((p) => p.pro_id),
        }}
        publishers={publishers ?? []}
        pros={pros ?? []}
        action={updateWithId}
        submitLabel="Save changes"
      />
    </div>
  );
}
