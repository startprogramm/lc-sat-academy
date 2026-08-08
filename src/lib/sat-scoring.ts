// Official College Board "simplified" raw-score → scaled-score conversion
// table, from the paper-scoring guide published alongside SAT Practice
// Test #5. That guide was calibrated for the print/"nondigital format"
// administration, which uses 33-question Reading & Writing modules (66 raw
// max) and 27-question Math modules (54 raw max) — a different question
// count than the true digital SAT structure this product uses (27-question
// R&W modules / 54 raw max, 22-question Math modules / 44 raw max).
//
// To reuse the official curve for tests built on the real digital-format
// question counts, a raw score is first proportionally rescaled onto the
// table's index range, then looked up. This mirrors the shape of the
// official curve without claiming pixel-precise accuracy — the source
// document itself describes this style of table as "simplified and
// therefore slightly less precise" than actual IRT-based scoring.

type ScoreRange = { lower: number; upper: number };

// index = raw score, value = [lower, upper]
const RW_TABLE: [number, number][] = [
  [200, 200], [200, 200], [200, 200], [200, 200], [200, 200], [200, 210],
  [200, 230], [200, 240], [200, 250], [200, 260], [220, 280], [230, 290],
  [240, 300], [250, 310], [260, 320], [270, 330], [290, 350], [310, 370],
  [330, 370], [340, 380], [350, 390], [360, 400], [360, 400], [370, 410],
  [380, 420], [390, 430], [390, 430], [400, 440], [410, 450], [420, 460],
  [430, 470], [440, 480], [450, 490], [450, 490], [460, 500], [470, 510],
  [480, 520], [490, 530], [500, 540], [500, 540], [510, 550], [520, 560],
  [530, 570], [530, 590], [540, 600], [550, 610], [560, 620], [570, 630],
  [580, 640], [590, 650], [600, 660], [620, 660], [630, 670], [640, 680],
  [650, 690], [660, 700], [680, 720], [690, 730], [700, 740], [710, 750],
  [720, 760], [730, 770], [750, 770], [760, 780], [770, 790], [780, 800],
  [790, 800],
];

const MATH_TABLE: [number, number][] = [
  [200, 200], [200, 200], [200, 200], [200, 210], [200, 220], [200, 240],
  [210, 260], [220, 270], [230, 290], [270, 330], [290, 330], [300, 340],
  [310, 350], [320, 360], [330, 370], [340, 380], [340, 380], [350, 390],
  [350, 390], [360, 400], [370, 410], [380, 420], [380, 420], [390, 430],
  [400, 440], [410, 450], [420, 460], [430, 470], [440, 480], [450, 510],
  [460, 520], [470, 530], [480, 540], [490, 550], [510, 570], [520, 580],
  [530, 590], [540, 600], [550, 610], [560, 620], [570, 630], [580, 640],
  [600, 660], [610, 670], [630, 690], [640, 700], [660, 720], [680, 740],
  [700, 760], [720, 780], [750, 790], [760, 800], [780, 800], [790, 800],
  [790, 800],
];

function lookUp(table: [number, number][], rawScaledIndex: number): ScoreRange {
  const clamped = Math.max(0, Math.min(table.length - 1, Math.round(rawScaledIndex)));
  const [lower, upper] = table[clamped];
  return { lower, upper };
}

/**
 * Converts a raw score (out of `maxRaw`) into a scaled section score range,
 * proportionally mapping it onto the official table's index range first if
 * `maxRaw` differs from the table's native max (66 for R&W, 54 for Math).
 */
export function getSectionScoreRange(
  raw: number,
  maxRaw: number,
  section: "reading_writing" | "math",
): ScoreRange {
  const table = section === "reading_writing" ? RW_TABLE : MATH_TABLE;
  const tableMax = table.length - 1;
  const scaledIndex = maxRaw > 0 ? (raw / maxRaw) * tableMax : 0;
  return lookUp(table, scaledIndex);
}

export function getTotalScoreRange(
  rwRaw: number,
  rwMax: number,
  mathRaw: number,
  mathMax: number,
): ScoreRange {
  const rw = getSectionScoreRange(rwRaw, rwMax, "reading_writing");
  const math = getSectionScoreRange(mathRaw, mathMax, "math");
  return { lower: rw.lower + math.lower, upper: rw.upper + math.upper };
}

/** True only when maxRaw exactly matches the official table's native question count. */
export function isExactTableFit(maxRaw: number, section: "reading_writing" | "math"): boolean {
  return section === "reading_writing" ? maxRaw === 66 : maxRaw === 54;
}
