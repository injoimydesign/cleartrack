/**
 * Builds a prefix tsquery from free-text input so a partially-typed last
 * word still matches — e.g. "bey love" -> "bey:* & love:*". Plain
 * plainto_tsquery requires whole words, which isn't "forgiving" enough for
 * an as-you-type catalog search (PRD §5).
 */
export function toPrefixTsQuery(input: string): string | null {
  const terms = input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    // Strip characters that have special meaning in tsquery syntax so a
    // stray "&" or "(" in someone's search doesn't break the query.
    .map((term) => term.replace(/[&|!():*]/g, ""))
    .filter(Boolean);

  if (terms.length === 0) return null;
  return terms.map((term) => `${term}:*`).join(" & ");
}
