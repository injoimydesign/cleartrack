export type WriterMeta = {
  id: string;
  name: string;
  proNames: string[];
  publisherName: string | null;
  publisherProNames: string[];
};

/** "ASCAP/BMI" or "No PRO" — PRD §2. */
export function formatWriterPros(writer: WriterMeta): string {
  return writer.proNames.length ? writer.proNames.join("/") : "No PRO";
}

/** The writer's publisher's PRO(s), joined "PRO1/PRO2" — empty string if none. */
export function formatWriterPublisherPros(writer: WriterMeta): string {
  return writer.publisherProNames.join("/");
}

/**
 * "Publisher Name · PRO" when both are known, else just the name, else
 * "No publisher" — the exact display convention from PRD §2/§6, used on
 * the writer browsing page's metadata row. Distinct from
 * formatWriterInfoLine, which is a denser one-liner for the song form's
 * row picker.
 */
export function formatWriterPublisherDisplay(writer: WriterMeta): string {
  if (!writer.publisherName) return "No publisher";
  const pros = formatWriterPublisherPros(writer);
  return pros ? `${writer.publisherName} · ${pros}` : writer.publisherName;
}

/** "PRO1/PRO2 · Publisher Name (Publisher PRO1/PRO2)" info line for row pickers. */
export function formatWriterInfoLine(writer: WriterMeta): string {
  const publisherPros = formatWriterPublisherPros(writer);
  const publisherPart = writer.publisherName
    ? `${writer.publisherName}${publisherPros ? ` (${publisherPros})` : ""}`
    : "No publisher";
  return `${formatWriterPros(writer)} · ${publisherPart}`;
}
