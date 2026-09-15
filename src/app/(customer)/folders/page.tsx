import { createClient } from "@/lib/supabase/server";
import { FoldersClient, type FolderRow } from "@/app/(customer)/folders/folders-client";

export const dynamic = "force-dynamic";

type Row = { id: string; name: string; folder_songs: { count: number }[] };

export default async function FoldersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("folders")
    .select("id, name, folder_songs(count)")
    .eq("owner_id", user!.id)
    .order("name")
    .returns<Row[]>();

  const folders: FolderRow[] = (data ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    songCount: f.folder_songs[0]?.count ?? 0,
  }));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 text-lg font-medium">Folders</h1>
      <FoldersClient initialFolders={folders} />
    </div>
  );
}
