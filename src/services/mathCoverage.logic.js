'use strict';

/**
 * Pure rules of the Math pattern-coverage report (admin). Quantity alone hides a weak chapter:
 * 100 questions in 3 shapes teach less than 60 questions in 15. So the report tracks both
 * question count and pattern diversity. Unit-tested in test/mathCoverage.test.js.
 *
 *   template   a question's English stem with numbers and capitalised names masked, i.e. the
 *              question "shape"; the same shape with new numbers is one template
 */

/** Stem -> template key ("A sells 12 pens for ₹30" and "B sells 8 pens for ₹50" match). */
function templateOf(stem) {
  return String(stem || '')
    .replace(/₹?\d[\d,]*(\.\d+)?/g, '#')
    .replace(/\b[A-Z][a-z]+\b/g, 'N')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

const THRESHOLDS = Object.freeze({
  GOOD_COVERAGE: 0.6, // share of library patterns with at least one question
  POOR_COVERAGE: 0.35,
  GOOD_TOP_SHARE: 0.3, // largest single template's share of the chapter
  POOR_TOP_SHARE: 0.5,
  FEW_SHAPES_MIN_QUESTIONS: 200, // "many questions, few patterns" flag
  FEW_SHAPES_MAX_TEMPLATES: 20,
  MIN_PER_LEVEL: 10, // a difficulty level with fewer questions counts as missing
});

/**
 * One chapter's row.
 * @param {object} p
 * @param {string} p.topic
 * @param {Array<{pattern?, difficulty?, stem?, pyq?}>} p.questions published questions
 * @param {string[]} p.libraryPatterns learning pattern keys (db/patterns/quant/<topic>.js)
 * @param {string[]} p.hardPatterns Hard matrix / registry ids (may be empty)
 */
function coverageRow({ topic, questions, libraryPatterns = [], hardPatterns = [] }) {
  const byPattern = new Map();
  const templates = new Map();
  const levels = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let untagged = 0;
  let pyq = 0;
  for (const q of questions) {
    if (q.pattern) byPattern.set(q.pattern, (byPattern.get(q.pattern) || 0) + 1);
    else untagged += 1;
    const t = templateOf(q.stem);
    templates.set(t, (templates.get(t) || 0) + 1);
    const d = Math.min(5, Math.max(1, Math.round(q.difficulty ?? 3)));
    levels[d] += 1;
    if (q.pyq) pyq += 1;
  }
  const n = questions.length;
  const covered = libraryPatterns.filter((k) => byPattern.has(k));
  const hardCovered = hardPatterns.filter((k) => byPattern.has(k));
  const missing = libraryPatterns.filter((k) => !byPattern.has(k));
  // Patterns available = learning patterns + Hard patterns; both count towards coverage.
  const available = libraryPatterns.length + hardPatterns.length;
  const coverage = available ? (covered.length + hardCovered.length) / available : 0;
  const top = Math.max(0, ...templates.values());
  const topShare = n ? top / n : 0;
  const missingLevels = Object.entries(levels).filter(([, c]) => c < THRESHOLDS.MIN_PER_LEVEL).map(([d]) => Number(d));
  const fewShapes = n >= THRESHOLDS.FEW_SHAPES_MIN_QUESTIONS && templates.size <= THRESHOLDS.FEW_SHAPES_MAX_TEMPLATES;
  const noHard = levels[4] + levels[5] < THRESHOLDS.MIN_PER_LEVEL;

  const flags = [];
  if (fewShapes) flags.push('many_questions_few_patterns');
  if (topShare > THRESHOLDS.POOR_TOP_SHARE) flags.push('one_template_dominates');
  if (noHard) flags.push('no_hard_questions');
  else if (levels[5] < THRESHOLDS.MIN_PER_LEVEL) flags.push('no_challenge_level');
  if (!hardPatterns.length) flags.push('no_hard_matrix');
  if (n && untagged / n > 0.25) flags.push('many_untagged');

  let status = 'good';
  if (coverage < THRESHOLDS.POOR_COVERAGE || topShare > THRESHOLDS.POOR_TOP_SHARE || fewShapes || noHard) status = 'poor';
  else if (coverage < THRESHOLDS.GOOD_COVERAGE || topShare > THRESHOLDS.GOOD_TOP_SHARE || levels[5] < THRESHOLDS.MIN_PER_LEVEL) status = 'needs_more';

  return {
    topic,
    questions: n,
    pyq,
    levels,
    missingLevels,
    patternsAvailable: available,
    patternsCoveredTotal: covered.length + hardCovered.length,
    coveragePct: Math.round(coverage * 100),
    libraryPatterns: libraryPatterns.length,
    patternsCovered: covered.length,
    hardPatterns: hardPatterns.length,
    hardPatternsCovered: hardCovered.length,
    distinctPatterns: byPattern.size,
    untagged,
    templates: templates.size,
    largestTemplate: top,
    largestTemplateShare: Math.round(topShare * 100),
    questionsPerTemplate: templates.size ? Math.round((n / templates.size) * 10) / 10 : 0,
    missingPatterns: missing,
    flags,
    status,
  };
}

const ORDER = { poor: 0, needs_more: 1, good: 2 };
/** Worst first, then by size. */
const sortRows = (rows) => [...rows].sort((a, b) => ORDER[a.status] - ORDER[b.status] || b.questions - a.questions);

module.exports = { templateOf, THRESHOLDS, coverageRow, sortRows };
