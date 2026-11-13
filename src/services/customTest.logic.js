'use strict';

/**
 * Pure rules of the custom chapter test (no database): difficulty mixes, the suggested time,
 * how questions are shared between chapters, how questions are ranked and picked inside a
 * chapter, and how a result turns into strong / weak chapters and next steps.
 * The service (customTest.service.js) loads the data and calls these. Unit-tested in
 * test/customTest.test.js.
 */

const crypto = require('node:crypto');
const { DIFFICULTY_BANDS } = require('../models/constants');

const SUBJECTS = Object.freeze(['quant', 'english', 'gs']);
const DIFFICULTIES = Object.freeze(['easy', 'moderate', 'hard', 'exam', 'mixed']);
const PRESETS = Object.freeze(['custom', 'weak', 'mistakes', 'quick10', 'mastery', 'challenge', 'followup', 'smart']);
const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 100;
const REAL_PAPER = Object.freeze(['OFFICIAL_VERIFIED', 'ADAPTED_PYQ']);

/**
 * Band shares per difficulty choice, and how strongly real previous-year questions are preferred.
 * "Exam level" leans to medium/hard and real papers; "Mixed" spreads over all three bands.
 */
const DIFFICULTY_RULES = Object.freeze({
  easy: { mix: { EASY: 1 }, pyqBoost: 1 },
  moderate: { mix: { MEDIUM: 1 }, pyqBoost: 1 },
  hard: { mix: { HARD: 1 }, pyqBoost: 1 },
  exam: { mix: { EASY: 0.15, MEDIUM: 0.5, HARD: 0.35 }, pyqBoost: 3 },
  mixed: { mix: { EASY: 0.3, MEDIUM: 0.4, HARD: 0.3 }, pyqBoost: 1.5 },
});

/** Seconds a student should plan per question, by subject and difficulty (20 exam-level Math -> 25 min). */
const SECONDS_PER_QUESTION = Object.freeze({
  quant: { easy: 45, moderate: 70, hard: 100, exam: 75, mixed: 70 },
  english: { easy: 25, moderate: 35, hard: 50, exam: 40, mixed: 36 },
  gs: { easy: 20, moderate: 30, hard: 40, exam: 36, mixed: 30 },
});

function smartMinutes(subject, difficulty, n) {
  const sec = SECONDS_PER_QUESTION[subject]?.[difficulty] ?? 60;
  return Math.max(5, Math.ceil((n * sec) / 60));
}

/** Easy -> Moderate -> Exam level -> Hard: one step up (Challenge me, a follow-up after a high score). */
const LADDER = ['easy', 'moderate', 'exam', 'hard'];
function stepUp(difficulty) {
  if (difficulty === 'mixed') return 'exam';
  const i = LADDER.indexOf(difficulty);
  return LADDER[Math.min(LADDER.length - 1, i + 1)];
}

const bandOf = (difficulty) => Object.keys(DIFFICULTY_BANDS).find((b) => DIFFICULTY_BANDS[b].includes(difficulty)) ?? 'MEDIUM';

/** Largest-remainder split of n by weights, so the parts always sum to n. */
function splitByWeight(n, weights) {
  const keys = Object.keys(weights);
  const total = keys.reduce((a, k) => a + weights[k], 0);
  if (!total || n <= 0) return Object.fromEntries(keys.map((k) => [k, 0]));
  const parts = keys.map((k) => {
    const exact = (n * weights[k]) / total;
    return { k, floor: Math.floor(exact), rem: exact - Math.floor(exact) };
  });
  let left = n - parts.reduce((a, p) => a + p.floor, 0);
  for (const p of [...parts].sort((a, b) => b.rem - a.rem)) {
    if (left-- <= 0) break;
    p.floor += 1;
  }
  return Object.fromEntries(parts.map((p) => [p.k, p.floor]));
}

/**
 * Weight of a chapter in a Smart distribution, with the reasons shown to the student:
 *   1                                  every chapter
 *   + 0.5 / 0.25                       Must know / Important in WBPSC papers
 *   + (1 - accuracy)                   weak chapters get more (needs >= 5 answers to count)
 *   + 0.05 per open mistake (max 0.5)
 *   + 0.75                             a weak chapter of the previous test (follow-up)
 */
function chapterWeight(c) {
  let w = 1;
  const reasons = [];
  if (c.priority === 'MUST') {
    w += 0.5;
    reasons.push('must_know');
  } else if (c.priority === 'IMPORTANT') {
    w += 0.25;
    reasons.push('important');
  }
  if (c.accuracyPct != null && c.answers >= 5) {
    w += 1 - c.accuracyPct / 100;
    if (c.accuracyPct < 60) reasons.push(`weak:${c.accuracyPct}`);
    else if (c.accuracyPct >= 85) reasons.push(`strong:${c.accuracyPct}`);
  } else {
    reasons.push('new');
  }
  if (c.mistakes > 0) {
    w += Math.min(c.mistakes, 10) * 0.05;
    reasons.push(`mistakes:${c.mistakes}`);
  }
  if (c.focus) {
    w += 0.75;
    reasons.push('focus');
  }
  return { w, reasons };
}

/**
 * How many questions each chapter gets.
 * @param {object} p
 * @param {Array<{topic, available, accuracyPct?, answers?, mistakes?, priority?, focus?}>} p.chapters
 * @param {number} p.questionCount
 * @param {'balanced'|'smart'|'mistakes'} p.distribution  mistakes = in proportion to open mistakes
 * @returns {{ plan: Array<{topic, count, reasons}>, total: number, shortBy: number }}
 * Every chapter gets at least one question when there are enough; no chapter gets more than
 * it has. A chapter's unused share moves to the others (reason "limited:<n>").
 */
function planDistribution({ chapters, questionCount, distribution }) {
  const usable = chapters.filter((c) => c.available > 0);
  const info = new Map(usable.map((c) => {
    if (distribution === 'balanced') return [c.topic, { w: 1, reasons: [] }];
    if (distribution === 'mistakes') return [c.topic, { w: Math.max(1, c.mistakes || 0), reasons: c.mistakes ? [`mistakes:${c.mistakes}`] : [] }];
    return [c.topic, chapterWeight(c)];
  }));
  const counts = Object.fromEntries(usable.map((c) => [c.topic, 0]));
  const cap = Object.fromEntries(usable.map((c) => [c.topic, c.available]));
  let left = Math.min(questionCount, usable.reduce((a, c) => a + c.available, 0));
  const target = left;

  // A floor for every chapter (when n allows), so a chosen chapter is never left out.
  if (left >= usable.length) {
    for (const c of usable) {
      counts[c.topic] = 1;
      left -= 1;
    }
  }
  // The rest by weight, capped by what each chapter has; repeat while capped chapters free up room.
  while (left > 0) {
    const open = usable.filter((c) => counts[c.topic] < cap[c.topic]);
    if (!open.length) break;
    const share = splitByWeight(left, Object.fromEntries(open.map((c) => [c.topic, info.get(c.topic).w])));
    let given = 0;
    for (const c of open) {
      const add = Math.min(share[c.topic], cap[c.topic] - counts[c.topic]);
      counts[c.topic] += add;
      given += add;
    }
    left -= given;
    if (given === 0) {
      // Rounding gave the remainder to full chapters: hand it out one by one.
      for (const c of open) {
        if (left <= 0) break;
        counts[c.topic] += 1;
        left -= 1;
      }
    }
  }
  const plan = chapters.map((c) => {
    const reasons = [...(info.get(c.topic)?.reasons ?? [])];
    if (!c.available) return { topic: c.topic, count: 0, reasons: ['none_available'] };
    if (counts[c.topic] === c.available) reasons.push(`limited:${c.available}`);
    return { topic: c.topic, count: counts[c.topic] ?? 0, reasons };
  });
  return { plan, total: target, shortBy: Math.max(0, questionCount - target) };
}

/**
 * Score of one candidate question for this student (higher = more likely picked):
 *   not attempted before                  +2
 *   served in a recent test               x0.15
 *   same pattern/sub-topic as a mistake   +1.5   (in "Retry my mistakes": (w + 4) x 3, so they come first)
 *   the exact question got wrong          only in "Retry my mistakes" (+1), capped at 30% of the chapter
 *   pattern the student is weak at        +1
 *   real previous-year question           +boost x (1..2 by recency)
 * Smart Quiz ("smart") also uses:
 *   a question the student skipped        (w + 5) x 4  (still open: nearly always comes back)
 *   same pattern/sub-topic as a mistake   +3 more (same concept, a DIFFERENT question)
 *   the exact question got wrong          +1, capped at 15% of the chapter: it may come back for
 *                                         revision, but a new question on the concept is preferred
 */
function scoreCandidate(q, s, { preset, pyqBoost, currentYear = new Date().getUTCFullYear() }) {
  const id = String(q._id);
  const key = (x) => `${q.topic}.${x}`;
  let w = 1;
  if (!s.seen.has(id)) w += 2;
  const original = s.mistakeQids.has(id);
  const sibling = !original && ((q.pattern && s.mistakePatterns.has(key(q.pattern))) || (q.subtopic && s.mistakeSubtopics.has(key(q.subtopic))));
  if (sibling) w = preset === 'mistakes' ? (w + 4) * 3 : w + 1.5;
  if (original && (preset === 'mistakes' || preset === 'smart')) w += 1;
  const skipped = Boolean(s.skipQids?.has(id));
  if (preset === 'smart') {
    if (skipped) w = (w + 5) * 4;
    if (sibling) w += 3;
  }
  if (q.pattern && s.weakPatterns.has(key(q.pattern))) w += 1;
  if (q.realPyq) {
    const age = q.latest_pyq_year ? Math.max(0, currentYear - q.latest_pyq_year) : 10;
    w += pyqBoost * (1 + Math.max(0, 1 - age / 10));
  }
  if (s.recent.has(id)) w *= 0.15;
  return { w, original, sibling, skipped };
}

const BACKFILL = { EASY: ['MEDIUM', 'HARD'], MEDIUM: ['HARD', 'EASY'], HARD: ['MEDIUM', 'EASY'] };

/**
 * Picks `count` questions of one chapter. Ranking is weighted random (Efraimidis–Spirakis:
 * key = u^(1/w)), so the same settings give a different test each time while preferring
 * better-suited questions. Band quotas follow the difficulty mix; a short band borrows from
 * the nearest band. No two questions share an id or duplicate key; at most a third of the
 * chapter comes from one pattern while others are available (except the mistaken patterns in
 * "Retry my mistakes").
 * @returns {{ picked: object[], mix: {EASY,MEDIUM,HARD}, borrowed: number, pyq: number, siblings: number, originals: number }}
 */
function pickChapter(candidates, count, { mix, signals, preset = 'custom', pyqBoost = 1, rng = () => crypto.randomInt(1, 2 ** 31) / 2 ** 31 }) {
  const ranked = candidates
    .map((q) => {
      const sc = scoreCandidate(q, signals, { preset, pyqBoost });
      return { q, ...sc, band: bandOf(q.difficulty), k: Math.pow(rng(), 1 / Math.max(0.01, sc.w)) };
    })
    .sort((a, b) => b.k - a.k);

  const quotas = splitByWeight(count, mix);
  const picked = [];
  const ids = new Set();
  const dups = new Set();
  const perPattern = new Map();
  const patternCap = Math.max(2, Math.ceil(count / 3));
  const originalsCap = preset === 'mistakes' ? Math.max(1, Math.floor(count * 0.3)) : preset === 'smart' ? Math.floor(count * 0.15) : 0;
  let originals = 0;
  const bandCount = { EASY: 0, MEDIUM: 0, HARD: 0 };

  const ok = (r, { strictPattern, lastResort = false }) => {
    if (ids.has(String(r.q._id))) return false;
    if ((r.q.duplicate_keys || []).some((d) => dups.has(d))) return false;
    if (r.original && !lastResort && ((preset !== 'mistakes' && preset !== 'smart') || originals >= originalsCap)) return false;
    // Retry my mistakes is meant to repeat the mistaken patterns, so they are not capped there.
    const retrying = preset === 'mistakes' && (r.sibling || r.original);
    if (strictPattern && !retrying && r.q.pattern && (perPattern.get(r.q.pattern) || 0) >= patternCap) return false;
    return true;
  };
  const take = (r) => {
    picked.push(r);
    ids.add(String(r.q._id));
    for (const d of r.q.duplicate_keys || []) dups.add(d);
    if (r.q.pattern) perPattern.set(r.q.pattern, (perPattern.get(r.q.pattern) || 0) + 1);
    if (r.original) originals += 1;
    bandCount[r.band] += 1;
  };
  const fill = (band, need, strictPattern) => {
    for (const r of ranked) {
      if (need <= 0) break;
      if (r.band !== band || !ok(r, { strictPattern })) continue;
      take(r);
      need -= 1;
    }
    return need;
  };

  let borrowed = 0;
  for (const strictPattern of [true, false]) {
    for (const band of Object.keys(quotas)) {
      let need = quotas[band] - bandCount[band];
      if (need <= 0) continue;
      need = fill(band, need, strictPattern);
      if (!strictPattern) {
        for (const donor of BACKFILL[band]) {
          if (need <= 0) break;
          const before = need;
          need = fill(donor, need, false);
          borrowed += before - need;
        }
      }
    }
  }
  // Anything still missing (e.g. a band with no quota but questions left): best remaining, any band.
  // Last of all, a small chapter may repeat questions answered wrongly before rather than come up short.
  for (const lastResort of [false, true]) {
    for (const r of ranked) {
      if (picked.length >= count) break;
      if (!ok(r, { strictPattern: false, lastResort })) continue;
      take(r);
      borrowed += 1;
    }
  }
  return {
    picked: picked.slice(0, count).map((r) => r.q),
    mix: bandCount,
    borrowed,
    pyq: picked.filter((r) => r.q.realPyq).length,
    siblings: picked.filter((r) => r.sibling).length,
    skipped: picked.filter((r) => r.skipped).length,
    originals,
  };
}

const STRONG_FROM = 80;
const OK_FROM = 60;
/** strong (>= 80%), needs practice (60-79%), weak (< 60%). */
const chapterBand = (accuracy) => (accuracy == null ? null : accuracy >= STRONG_FROM ? 'strong' : accuracy >= OK_FROM ? 'practice' : 'weak');

/**
 * What to do next for each chapter of a result:
 *   >= 85%  next_chapter  (or challenge, if there is no next chapter)
 *   60-84%  practice      another targeted test
 *   < 60%   revise        revise the lesson -> 10 basic questions -> a targeted test
 */
function recommendationsFor(chapters, { nextChapterOf }) {
  return chapters.map((c) => {
    if (c.accuracy >= 85) {
      const next = nextChapterOf(c.topic);
      return { topic: c.topic, accuracy: c.accuracy, action: next ? 'next_chapter' : 'challenge', nextTopic: next ?? null };
    }
    if (c.accuracy >= OK_FROM) return { topic: c.topic, accuracy: c.accuracy, action: 'practice' };
    return { topic: c.topic, accuracy: c.accuracy, action: 'revise', steps: ['revise_lesson', 'basic_quiz', 'targeted_test'] };
  });
}

const CHALLENGE_FROM = 85;
const CHALLENGE_STREAK = 3;
/** Challenge me unlocks when the last 3 custom tests (newest first) were all >= 85%. */
const challengeUnlocked = (scoresNewestFirst) =>
  scoresNewestFirst.length >= CHALLENGE_STREAK && scoresNewestFirst.slice(0, CHALLENGE_STREAK).every((s) => s >= CHALLENGE_FROM);

const avg = (xs) => (xs.length ? Math.round(xs.reduce((a, x) => a + x, 0) / xs.length) : null);

/**
 * Custom-practice history from submitted sessions (newest first):
 * { scorePct, accuracy, timeSec, perQuestion: [{topic, correct}] }.
 * Improvement = mean of the latest 3 minus mean of the first 3 (needs 4+ tests).
 * Chapter mastery = accuracy over the latest 30 custom-test answers in that chapter.
 */
function historySummary(tests) {
  const scores = tests.map((t) => t.scorePct);
  const byTopic = new Map();
  for (const t of tests) {
    for (const p of t.perQuestion) {
      const list = byTopic.get(p.topic) || [];
      if (list.length < 30) list.push(p.correct);
      byTopic.set(p.topic, list);
    }
  }
  const mastery = [...byTopic.entries()].map(([topic, list]) => {
    const accuracy = Math.round((list.filter(Boolean).length / list.length) * 100);
    return { topic, answers: list.length, accuracy, band: chapterBand(accuracy) };
  }).sort((a, b) => b.accuracy - a.accuracy);
  const n = tests.length;
  return {
    testsTaken: n,
    avgScorePct: avg(scores),
    bestScorePct: n ? Math.max(...scores) : null,
    avgAccuracy: avg(tests.map((t) => t.accuracy)),
    avgTimeMin: n ? Math.round(tests.reduce((a, t) => a + t.timeSec, 0) / n / 60) : null,
    improvement: n >= 4 ? avg(scores.slice(0, 3)) - avg(scores.slice(-3)) : null,
    challengeUnlocked: challengeUnlocked(scores),
    mastery,
  };
}

module.exports = {
  SUBJECTS,
  DIFFICULTIES,
  PRESETS,
  MIN_QUESTIONS,
  MAX_QUESTIONS,
  REAL_PAPER,
  DIFFICULTY_RULES,
  SECONDS_PER_QUESTION,
  smartMinutes,
  stepUp,
  bandOf,
  splitByWeight,
  chapterWeight,
  planDistribution,
  scoreCandidate,
  pickChapter,
  chapterBand,
  recommendationsFor,
  challengeUnlocked,
  historySummary,
  CHALLENGE_FROM,
  STRONG_FROM,
  OK_FROM,
};
