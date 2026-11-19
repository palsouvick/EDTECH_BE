'use strict';

/**
 * F7 — "Find My Starting Level": the pure rules behind the exam diagnostic.
 * No database access here, so every rule is unit-testable on its own.
 *
 *   blocksFor        the diagnostic's sections, taken from the exam's own
 *                    written-paper sections (IDO: the plan's notice-based
 *                    split; WBCS: each GS section mapped to its chapters)
 *   allocate         TOTAL questions shared across those sections by marks
 *                    (largest remainder), at least MIN_PER_BLOCK each
 *   rankCandidates   which chapters of a section to sample: in-syllabus
 *                    first, then by exam weight, F2 priority, PYQ count and
 *                    catalogue order — never a chapter marked out of syllabus
 *   score            subject / section / topic accuracy, attempted vs
 *                    unattempted, starting mastery, and the "start here" /
 *                    "looks solid" topics
 *   signalIsActive   whether a result may still steer recommendations
 *
 * A diagnostic is a STARTING SIGNAL, never a label: it is not written as
 * practice attempts, mistakes or mastery, it expires after SIGNAL_DAYS, and
 * per chapter it gives way as soon as the student has OWN_DATA_MIN answers
 * of their own there.
 */

const TOTAL = 35; // inside the 30–40 brief; ~25 minutes at easy–medium level
const MIN_TOTAL = 30;
const MAX_TOTAL = 40;
const MIN_PER_BLOCK = 2;
const PER_TOPIC = 2; // one easy + one medium question per sampled chapter
const SIGNAL_DAYS = 30;
const OWN_DATA_MIN = 5; // insights MIN_FOR_STATUS: from here the student's own answers decide
const LEVEL = Object.freeze({ EASY: [1, 2], MEDIUM: [3] }); // difficulty 4–5 never appears

/**
 * WBCS Prelims: the eight official sections, six of them General Studies.
 * Each GS section is sampled only from the catalogue chapters it names
 * (keyed by the section's English title as recorded in the catalogue). A
 * section missing here falls back to its whole subject.
 */
const SECTION_TOPICS = Object.freeze({
  WBCS: {
    'General Science': ['general_science'],
    'Current Events of National & International Importance': ['current_affairs'],
    'History of India': ['indian_history'],
    'Geography of India (with special reference to West Bengal)': ['geography'],
    'Indian Polity & Economy': ['polity', 'economy'],
    'Indian National Movement': ['indian_history'],
  },
});

const round1 = (x) => Math.round(x * 10) / 10;
const pct = (c, n) => (n ? Math.round((c / n) * 100) : null);

/**
 * The diagnostic's sections.
 * @param {string} examCode
 * @param {object|null} pattern   targetExam presentPattern() output, or null
 * @param {Array<{code,name}>} subjects   the category's catalogue subjects (used only without a pattern)
 * @param {Array|null} idoSections   db/plans/ido SECTIONS (passed in to keep this module pure)
 * @returns {{ basis: 'pattern'|'plan_notice'|'equal', blocks: Array<{key,title,subject,topics,marks}> }}
 */
function blocksFor(examCode, pattern, subjects, idoSections = null) {
  if (examCode === 'WBPSC_IDO' && idoSections?.length) {
    // The notice splits "Mental Ability and Arithmetic" (20) into 12 + 8; the
    // plan's SECTIONS carry that split, so the diagnostic follows it.
    return {
      basis: 'plan_notice',
      blocks: idoSections.map((s) => ({ key: s.key, title: s.title, subject: s.subject, topics: s.topic ? [s.topic] : null, marks: s.count })),
    };
  }
  if (pattern?.sections?.length) {
    const map = SECTION_TOPICS[examCode] ?? {};
    return {
      basis: 'pattern',
      blocks: pattern.sections.map((s, i) => ({
        key: `s${i + 1}`,
        title: s.name,
        subject: s.subject,
        topics: map[s.name?.en] ?? null,
        marks: s.marks,
      })),
    };
  }
  // No written-paper pattern recorded: every subject of the category, equally.
  return {
    basis: 'equal',
    blocks: subjects.map((s) => ({ key: s.code, title: s.name, subject: s.code, topics: null, marks: 1 })),
  };
}

/** Questions per block: proportional to marks, at least MIN_PER_BLOCK each, summing to total. */
function allocate(blocks, total = TOTAL) {
  if (!blocks.length) return [];
  const sumMarks = blocks.reduce((n, b) => n + (b.marks > 0 ? b.marks : 0), 0) || blocks.length;
  const quota = blocks.map((b) => ((b.marks > 0 ? b.marks : sumMarks / blocks.length) / sumMarks) * total);
  const alloc = quota.map((q) => Math.max(MIN_PER_BLOCK, Math.floor(q)));
  let sum = alloc.reduce((a, b) => a + b, 0);
  // Too many (minimums pushed it over): take from the most over-served block.
  while (sum > total) {
    let k = -1;
    for (let i = 0; i < alloc.length; i += 1) {
      if (alloc[i] <= MIN_PER_BLOCK) continue;
      if (k < 0 || alloc[i] - quota[i] > alloc[k] - quota[k]) k = i;
    }
    if (k < 0) break; // every block already at the minimum
    alloc[k] -= 1;
    sum -= 1;
  }
  // Too few: give to the most under-served block (largest remainder; ties by order).
  while (sum < total) {
    let k = 0;
    for (let i = 1; i < alloc.length; i += 1) if (quota[i] - alloc[i] > quota[k] - alloc[k]) k = i;
    alloc[k] += 1;
    sum += 1;
  }
  return alloc;
}

const PRIO = { high: 0, medium: 1, low: 2 };
const SYLLABUS_RANK = { in: 0, unmapped: 1, supplementary: 2 };

/**
 * Chapters to sample for one block, best first. `chapters` are the F2 map's
 * chapters of the block's subject (in catalogue order). A block that names
 * its chapters (WBCS GS, IDO) keeps exactly those, whatever their verdict —
 * the official section itself is the evidence. Otherwise: never 'out';
 * 'in' before 'unmapped' before 'supplementary' (foundation chapters).
 */
function rankCandidates(block, chapters) {
  const withOrder = chapters.map((c, order) => ({ ...c, order }));
  if (block.topics) {
    const wanted = new Set(block.topics);
    return withOrder.filter((c) => wanted.has(c.topic)).sort((a, b) => block.topics.indexOf(a.topic) - block.topics.indexOf(b.topic));
  }
  return withOrder
    .filter((c) => c.syllabus !== 'out')
    .sort((a, b) => (SYLLABUS_RANK[a.syllabus] ?? 3) - (SYLLABUS_RANK[b.syllabus] ?? 3)
      || (b.weight ?? -1) - (a.weight ?? -1)
      || (PRIO[a.priority] ?? 3) - (PRIO[b.priority] ?? 3)
      || (b.pyqCount ?? 0) - (a.pyqCount ?? 0)
      || a.order - b.order);
}

const levelOf = (difficulty) => (difficulty <= 2 ? 'easy' : 'medium');

/**
 * From a chapter's sampled questions (difficulty 1–3), up to `n` picks:
 * easy first, then medium, then whatever is left — so each chapter is
 * probed easy → medium.
 */
function pickForTopic(pool, n) {
  const easy = pool.filter((q) => q.difficulty <= 2);
  const medium = pool.filter((q) => q.difficulty === 3);
  const out = [];
  if (easy[0]) out.push(easy[0]);
  if (out.length < n && medium[0]) out.push(medium[0]);
  for (const q of [...easy.slice(1), ...medium.slice(1)]) {
    if (out.length >= n) break;
    out.push(q);
  }
  return out.slice(0, n).sort((a, b) => a.difficulty - b.difficulty);
}

/** How many distinct chapters a block of n questions should probe. */
const topicsFor = (n) => Math.max(1, Math.ceil(n / PER_TOPIC));

/**
 * Topic signal from a diagnostic. Unanswered counts as not correct here
 * (a student who skips a chapter's questions likely needs to start there),
 * but one question alone is never enough to say anything.
 */
function topicSignal({ total, correct }) {
  if (total < PER_TOPIC) return 'too_few';
  const s = correct / total;
  if (s < 0.5) return 'start_here';
  if (correct === total) return 'looks_strong';
  return 'mixed';
}

/** Starting level band from a 0–100 score: where to begin, not a grade. */
function levelBand(score) {
  if (score == null) return null;
  if (score < 40) return 'basics_first';
  if (score < 70) return 'build_up';
  return 'practice_ready';
}

/**
 * Score a submitted diagnostic.
 * @param {Array<{questionId, block, subject, topic, difficulty}>} items   in test order
 * @param {Map<string, {selectedOptionId, isCorrect}>} graded
 * @param {Array<{key,title,subject,marks}>} blocks
 * @param {(subject, topic) => object} nameOf
 */
function score(items, graded, blocks, nameOf = () => null) {
  const counter = () => ({ total: 0, attempted: 0, correct: 0 });
  const bump = (c, r) => {
    c.total += 1;
    if (r?.selectedOptionId) c.attempted += 1;
    if (r?.isCorrect) c.correct += 1;
  };
  const finish = (c) => ({
    ...c,
    unattempted: c.total - c.attempted,
    wrong: c.attempted - c.correct,
    accuracy: pct(c.correct, c.attempted), // of the questions tried
    score: pct(c.correct, c.total), // of all questions — the starting-mastery basis
  });

  const overall = counter();
  const byLevel = { easy: counter(), medium: counter() };
  const bySection = blocks.map(() => counter());
  const bySubject = new Map();
  const byTopic = new Map();
  for (const it of items) {
    const r = graded.get(it.questionId);
    bump(overall, r);
    bump(byLevel[levelOf(it.difficulty)], r);
    if (bySection[it.block]) bump(bySection[it.block], r);
    if (!bySubject.has(it.subject)) bySubject.set(it.subject, counter());
    bump(bySubject.get(it.subject), r);
    const k = `${it.subject}.${it.topic}`;
    if (!byTopic.has(k)) byTopic.set(k, { subject: it.subject, topic: it.topic, ...counter() });
    bump(byTopic.get(k), r);
  }

  const sumMarks = blocks.reduce((n, b) => n + (b.marks > 0 ? b.marks : 0), 0);
  const sections = blocks.map((b, i) => ({
    key: b.key,
    title: b.title,
    subject: b.subject,
    weight: sumMarks ? round1((b.marks / sumMarks) * 100) : null,
    ...finish(bySection[i]),
  })).filter((s) => s.total > 0);

  // Starting mastery: each section's score weighted by its share of the
  // paper's marks — so a 40-mark section counts for more than a 10-mark one.
  const weighted = sections.filter((s) => s.weight != null && s.weight > 0);
  const startingMastery = weighted.length
    ? Math.round(weighted.reduce((n, s) => n + s.score * s.weight, 0) / weighted.reduce((n, s) => n + s.weight, 0))
    : pct(overall.correct, overall.total);

  const subjects = [...bySubject].map(([subject, c]) => {
    const f = finish(c);
    return { subject, ...f, startingMastery: f.score, level: levelBand(f.score) };
  });

  const topics = [...byTopic.values()].map((c) => {
    const f = finish(c);
    return { ...f, name: nameOf(c.subject, c.topic), signal: topicSignal(c) };
  });
  const rankWeak = (a, b) => a.score - b.score || b.total - a.total;
  const weakTopics = topics.filter((x) => x.signal === 'start_here').sort(rankWeak)
    .map(({ subject, topic, name, total, attempted, correct, score: s }) => ({ subject, topic, name, total, attempted, correct, score: s }));
  const strongTopics = topics.filter((x) => x.signal === 'looks_strong')
    .map(({ subject, topic, name, total, attempted, correct, score: s }) => ({ subject, topic, name, total, attempted, correct, score: s }));

  return {
    summary: { ...finish(overall), byLevel: { easy: finish(byLevel.easy), medium: finish(byLevel.medium) } },
    startingMastery,
    level: levelBand(startingMastery),
    sections,
    subjects,
    topics,
    weakTopics,
    strongTopics,
  };
}

/** A completed result steers recommendations for SIGNAL_DAYS after it was taken. */
function signalIsActive(takenAt, now = new Date()) {
  if (!takenAt) return false;
  return now.getTime() - new Date(takenAt).getTime() <= SIGNAL_DAYS * 86_400_000;
}

module.exports = {
  TOTAL,
  MIN_TOTAL,
  MAX_TOTAL,
  MIN_PER_BLOCK,
  PER_TOPIC,
  SIGNAL_DAYS,
  OWN_DATA_MIN,
  LEVEL,
  SECTION_TOPICS,
  blocksFor,
  allocate,
  rankCandidates,
  pickForTopic,
  topicsFor,
  topicSignal,
  levelBand,
  levelOf,
  score,
  signalIsActive,
};
