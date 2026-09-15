"use client";

import { FileDown } from "lucide-react";

export type ReportData = {
  title: string;
  artistNames: string[];
  writers: { name: string; pro: string; publisher: string; splitPercent: number }[];
  labels: { name: string; splitPercent: number }[];
  notes: string | null;
};

/**
 * The reference design shows a "Download Report" button but we have no
 * report-generation backend. Rather than fake it with a disabled button,
 * this builds a real plain-text rights summary client-side and triggers a
 * browser download — genuinely functional, just not a formatted PDF.
 */
export function DownloadReportButton({ data }: { data: ReportData }) {
  function handleDownload() {
    const lines = [
      data.title,
      data.artistNames.join(", "),
      "",
      "WRITERS",
      ...data.writers.map(
        (w) => `${w.name} (${w.pro || "No PRO"}) — ${w.publisher || "No publisher"} — ${w.splitPercent}%`,
      ),
      "",
      "LABELS",
      ...data.labels.map((l) => `${l.name} — ${l.splitPercent}%`),
      ...(data.notes ? ["", "NOTES", data.notes] : []),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.title.replace(/[^\w\- ]+/g, "")} — rights summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex h-[42px] items-center gap-2 rounded-[var(--radius-control)] bg-console-action px-4 text-sm text-console-text shadow-[inset_0_0_0_1px_var(--border-default)] hover:brightness-125"
    >
      <FileDown size={15} aria-hidden />
      Download Report
    </button>
  );
}
