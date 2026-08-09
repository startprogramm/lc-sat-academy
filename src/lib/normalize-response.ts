// Normalizes a free-entry (student_response) SAT answer so that equivalent
// forms compare equal: "$1,200" vs "1200", "1/2" vs "0.5", trimmed
// whitespace and case for non-numeric answers.
export function normalizeResponse(value: string): string {
  const trimmed = value.trim().replace(/^\$/, "").replace(/,/g, "");
  const fractionMatch = trimmed.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const denominator = Number(fractionMatch[2]);
    if (denominator !== 0) {
      return String(Number(fractionMatch[1]) / denominator);
    }
  }
  const asNumber = Number(trimmed);
  if (!Number.isNaN(asNumber) && trimmed !== "") {
    return String(asNumber);
  }
  return trimmed.toLowerCase();
}
