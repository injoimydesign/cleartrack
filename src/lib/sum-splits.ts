export function sumSplits(rows: { split_percent: number }[]): number {
  return rows.reduce((sum, r) => sum + r.split_percent, 0);
}
