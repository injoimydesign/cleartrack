import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { createWriter } from "@/app/(admin)/writers/actions";
import { WriterForm } from "@/app/(admin)/writers/writer-form";

export const dynamic = "force-dynamic";

export default async function NewWriterPage() {
  const supabase = createAdminClient();
  const [{ data: publishers }, { data: pros }] = await Promise.all([
    supabase.from("publishers").select("id, name").order("name"),
    supabase.from("pros").select("id, name").order("name"),
  ]);

  return (
    <div>
      <Link
        href="/writers"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Writers
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add writer</h1>
      <WriterForm
        publishers={publishers ?? []}
        pros={pros ?? []}
        action={createWriter}
        submitLabel="Add writer"
      />
    </div>
  );
}
