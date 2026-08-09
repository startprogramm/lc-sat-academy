// The digital SAT organizes every skill into exactly four "domains" per
// section (College Board's own top-level taxonomy). Individual question
// topics (e.g. "Quadratic graphs", "Words in Context") are more granular
// than most students want when filtering the question bank, so the bank
// only exposes these four-per-section groupings — this file maps the
// free-text `topic` column down to them.

export type Section = "reading_writing" | "math";

export const RW_DOMAINS = [
  "Information and Ideas",
  "Craft and Structure",
  "Expression of Ideas",
  "Standard English Conventions",
] as const;

export const MATH_DOMAINS = [
  "Algebra",
  "Advanced Math",
  "Problem-Solving and Data Analysis",
  "Geometry and Trigonometry",
] as const;

export function domainsForSection(section: Section): readonly string[] {
  return section === "reading_writing" ? RW_DOMAINS : MATH_DOMAINS;
}

// Exact topic → domain lookups for every topic string seeded so far.
// Keys are lowercased for case-insensitive matching.
const RW_TOPIC_DOMAIN: Record<string, (typeof RW_DOMAINS)[number]> = {
  "central ideas and details": "Information and Ideas",
  "command of evidence": "Information and Ideas",
  "main idea": "Information and Ideas",
  "cross-text connections": "Craft and Structure",
  "text structure and purpose": "Craft and Structure",
  "words in context": "Craft and Structure",
  vocabulary: "Craft and Structure",
  "rhetorical synthesis": "Expression of Ideas",
  transitions: "Expression of Ideas",
  "standard english conventions": "Standard English Conventions",
  grammar: "Standard English Conventions",
  punctuation: "Standard English Conventions",
};

const MATH_TOPIC_DOMAIN: Record<string, (typeof MATH_DOMAINS)[number]> = {
  "absolute value equations": "Algebra",
  algebra: "Algebra",
  inequalities: "Algebra",
  "linear equations": "Algebra",
  "linear equations — modeling": "Algebra",
  "lines & slope": "Algebra",
  "systems of equations": "Algebra",
  "systems of equations — modeling": "Algebra",
  "systems of inequalities": "Algebra",
  "linear equations in one variable": "Algebra",
  "linear equations in two variables": "Algebra",
  "linear functions": "Algebra",
  "linear inequalities in one or two variables": "Algebra",
  "systems of two linear equations in two variables": "Algebra",

  "exponential functions": "Advanced Math",
  "exponential growth — modeling": "Advanced Math",
  "exponential models": "Advanced Math",
  factoring: "Advanced Math",
  functions: "Advanced Math",
  "nonlinear functions": "Advanced Math",
  "polynomial expressions": "Advanced Math",
  "quadratic equations": "Advanced Math",
  "quadratic graphs": "Advanced Math",
  "quadratic word problems": "Advanced Math",
  quadratics: "Advanced Math",
  radicals: "Advanced Math",
  "rational equations": "Advanced Math",

  "data analysis / graphs": "Problem-Solving and Data Analysis",
  "data analysis / scatterplots": "Problem-Solving and Data Analysis",
  percentages: "Problem-Solving and Data Analysis",
  ratios: "Problem-Solving and Data Analysis",
  "ratios and proportions": "Problem-Solving and Data Analysis",
  statistics: "Problem-Solving and Data Analysis",
  "unit conversion": "Problem-Solving and Data Analysis",

  "angles — radians and degrees": "Geometry and Trigonometry",
  "area — rectangles": "Geometry and Trigonometry",
  "circles — tangent lines": "Geometry and Trigonometry",
  geometry: "Geometry and Trigonometry",
  "geometry — angles": "Geometry and Trigonometry",
  "geometry — circles": "Geometry and Trigonometry",
  "geometry — similarity": "Geometry and Trigonometry",
  "geometry — volume": "Geometry and Trigonometry",
  "right triangles": "Geometry and Trigonometry",
  "triangle inequality": "Geometry and Trigonometry",
  trigonometry: "Geometry and Trigonometry",
};

function keywordFallback(section: Section, topic: string): string {
  const t = topic.toLowerCase();
  if (section === "reading_writing") {
    if (/(evidence|idea|detail|inference)/.test(t)) return "Information and Ideas";
    if (/(context|structure|purpose|cross-text|vocab)/.test(t)) return "Craft and Structure";
    if (/(transition|rhetorical|synthesis)/.test(t)) return "Expression of Ideas";
    if (/(convention|grammar|punctuation|boundar)/.test(t)) return "Standard English Conventions";
    return "Information and Ideas";
  }
  if (/(circle|triangle|angle|volume|area|trig|geometr)/.test(t)) return "Geometry and Trigonometry";
  if (/(ratio|percent|probability|statistic|data|scatter|unit conversion)/.test(t))
    return "Problem-Solving and Data Analysis";
  // Checked before the Advanced Math "function" keyword so "linear
  // functions"/"linear systems" land in Algebra, not Advanced Math — only
  // "nonlinear" should fall through, and \b keeps it from matching the
  // "linear" substring inside that word.
  if (/(\blinear\b|system|inequal|slope|\balgebra\b)/.test(t)) return "Algebra";
  if (/(quadratic|exponential|polynomial|nonlinear|radical|rational|function)/.test(t))
    return "Advanced Math";
  return "Advanced Math";
}

export function getDomain(section: Section, topic: string): string {
  const key = topic.trim().toLowerCase();
  const table = section === "reading_writing" ? RW_TOPIC_DOMAIN : MATH_TOPIC_DOMAIN;
  return table[key] ?? keywordFallback(section, topic);
}
