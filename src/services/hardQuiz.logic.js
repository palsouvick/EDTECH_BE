'use strict';

/**
 * Pure rules of the Math Hard Quiz and the Speed Challenge (no database). The service
 * (customTest.service.js) loads the data and calls these. Unit-tested in test/hardQuiz.test.js.
 *
 * A Hard Quiz is hard because of WHAT it asks, not bigger numbers: questions are picked by
 * skill (reverse thinking, multi-step / mixed concepts, traps, hidden conditions or
 * comparisons, real PYQs, challenge level), and each chapter's difficulty follows the
 * student's own level in that chapter (adaptive.logic): a weak chapter gets foundation
 * questions, never a Hard set.
 *
 * Skills come from the Hard pattern matrices (db/patterns/quant/hard/*.js, `skills`), and for
 * Profit & Loss from the concepts of its Hard registry (db/patterns/quant/profit_loss.js).
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const L = require('./customTest.logic');

/** Skill categories, in the order a result lists them. */
const SKILLS = Object.freeze(['standard', 'reverse', 'mixed', 'trap', 'reasoning', 'pyq', 'challenge']);

/**
 * Slots of a 10-question Hard Quiz (scaled for other sizes): 2 standard hard, 2 reverse, 2 mixed
 * concept / multi-step, 1 trap, 1 hidden-condition / comparison, 1 real PYQ, 1 challenge.
 * Not a rigid formula: a slot with no suitable question is filled from the chapter's level mix.
 */
const SLOT_WEIGHTS = Object.freeze({ standard: 2, reverse: 2, mixed: 2, trap: 1, reasoning: 1, pyq: 1, challenge: 1 });
/** Scarce slots are filled first so common categories cannot use up their questions. */
const SLOT_ORDER = Object.freeze(['challenge', 'pyq', 'trap', 'reasoning', 'reverse', 'mixed', 'standard']);

/** Matrix skill tag -> category. */
const SKILL_MAP = Object.freeze({
  reverse: 'reverse',
  multi_step: 'mixed',
  weighted: 'mixed',
  ratio_reasoning: 'mixed',
  trap: 'trap',
  conditional: 'reasoning',
  comparison: 'reasoning',
});

/**
 * Tiers of a chapter for a Hard Quiz, from its adaptive level, and the stored difficulty mix (1-5) of each:
 *   foundation   weak / Basic or Easy next / a concept to review -> basic, easy, moderate (no Hard set)
 *   developing   Moderate next, or not assessed yet               -> easy, moderate, hard
 *   strong       Hard next                                        -> moderate, hard, challenge
 *   very_strong  Challenge next                                   -> hard + challenge (mixed patterns)
 */
const TIER_MIX = Object.freeze({
  foundation: { 1: 0.2, 2: 0.4, 3: 0.4 },
  developing: { 2: 0.2, 3: 0.4, 4: 0.4 },
  strong: { 3: 0.2, 4: 0.5, 5: 0.3 },
  very_strong: { 4: 0.4, 5: 0.6 },
});
const TIERS = Object.freeze(Object.keys(TIER_MIX));

function tierOf(chapter) {
  const lv = chapter?.level;
  if (!lv) return 'developing';
  if (chapter.status === 'weak' || lv.action === 'review_concept' || lv.next === 'basic' || lv.next === 'easy') return 'foundation';
  if (lv.next === 'challenge') return 'very_strong';
  if (lv.next === 'hard') return 'strong';
  return 'developing';
}

/* ------------------------------------------------------------------ skills of a question */

const HARD_DIR = path.join(__dirname, '..', '..', 'db', 'patterns', 'quant', 'hard');
let INDEX = null;

/** Map "topic.patternId" -> Set of categories, built once from the Hard matrices. */
function skillIndex() {
  if (INDEX) return INDEX;
  const idx = new Map();
  for (const file of fs.readdirSync(HARD_DIR).filter((f) => f.endsWith('.js'))) {
    const topic = file.replace(/\.js$/, '');
    for (const p of require(path.join(HARD_DIR, file))) {
      idx.set(`${topic}.${p.id}`, new Set((p.skills || []).map((s) => SKILL_MAP[s]).filter(Boolean)));
    }
  }
  // Profit & Loss: the Hard registry lists concepts, not skills. reverse_* -> reverse;
  // false weight -> trap; three or more concepts in one question -> mixed.
  const { registry = [] } = require('../../db/patterns/quant/profit_loss');
  for (const p of registry) {
    const c = p.concepts || [];
    const s = new Set();
    if (c.some((x) => x.startsWith('reverse_'))) s.add('reverse');
    if (c.includes('false_weight')) s.add('trap');
    if (c.length >= 3) s.add('mixed');
    idx.set(`profit_loss.${p.id}`, s);
  }
  INDEX = idx;
  return idx;
}

/**
 * Categories of one question (a question may have several, e.g. reverse + trap).
 * "standard" = a moderate-or-harder question with no special skill tag.
 */
function categoriesOf(q, index = skillIndex()) {
  const out = new Set(q.pattern ? index.get(`${q.topic}.${q.pattern}`) || [] : []);
  if (q.realPyq) out.add('pyq');
  if ((q.difficulty ?? 3) >= 5) out.add('challenge');
  if (![...out].some((c) => c !== 'challenge' && c !== 'pyq') && (q.difficulty ?? 3) >= 3) out.add('standard');
  return out;
}

/* ------------------------------------------------------------------ picking */

/**
 * Picks `count` questions of one chapter for a Hard Quiz.
 * Foundation chapters use the plain level mix (no skill slots). Other chapters first fill the
 * skill slots (scarce ones first) from questions inside the tier's difficulty range, ranked by
 * the usual candidate score (weak/mistaken patterns up, mastered patterns down, recent tests
 * down); then any slot left empty is filled from the tier's level mix. At most a third of the
 * chapter (min 2) comes from one pattern while others are available.
 * @returns {{ picked: object[], slots: object, short: string[], mix, borrowed, pyq, siblings, originals, skipped }}
 */
function pickHard(candidates, count, { tier, signals, index = skillIndex(), pyqBoost = 1.5, rng = () => crypto.randomInt(1, 2 ** 31) / 2 ** 31 }) {
  const mix = TIER_MIX[tier] ?? TIER_MIX.developing;
  if (tier === 'foundation') {
    const res = L.pickChapter(candidates, count, { mix, signals, preset: 'hard', pyqBoost: 1, levels: true, rng });
    return { ...res, slots: {}, short: [] };
  }
  const allowed = new Set(Object.keys(mix).map(Number));
  const ranked = candidates
    .map((q) => {
      const sc = L.scoreCandidate(q, signals, { preset: 'hard', pyqBoost });
      return { q, ...sc, cats: categoriesOf(q, index), k: Math.pow(rng(), 1 / Math.max(0.01, sc.w)) };
    })
    .filter((r) => !r.original) // a Hard Quiz is for new questions; mistakes have their own preset
    .sort((a, b) => b.k - a.k);

  const quotas = L.splitByWeight(count, SLOT_WEIGHTS);
  const ids = new Set();
  const dups = new Set();
  const perPattern = new Map();
  const patternCap = Math.max(2, Math.ceil(count / 3));
  const chosen = [];
  const slots = {};
  const ok = (r) =>
    !ids.has(String(r.q._id))
    && !(r.q.duplicate_keys || []).some((d) => dups.has(d))
    && !(r.q.pattern && (perPattern.get(r.q.pattern) || 0) >= patternCap);
  const take = (r, slot) => {
    chosen.push(r);
    r.q.hardSlot = slot;
    ids.add(String(r.q._id));
    for (const d of r.q.duplicate_keys || []) dups.add(d);
    if (r.q.pattern) perPattern.set(r.q.pattern, (perPattern.get(r.q.pattern) || 0) + 1);
    slots[slot] = (slots[slot] || 0) + 1;
  };

  const short = [];
  for (const slot of SLOT_ORDER) {
    let need = quotas[slot] || 0;
    for (const r of ranked) {
      if (need <= 0) break;
      if (!r.cats.has(slot) || !allowed.has(Math.round(r.q.difficulty ?? 3)) || !ok(r)) continue;
      take(r, slot);
      need -= 1;
    }
    if (need > 0) short.push(slot);
  }

  // Empty slots: the tier's level mix, still with the pattern cap. A level that runs short
  // borrows from the other tier levels, then from one level below the tier (a different
  // pattern one level easier beats a fourth question of the same pattern). Only then is the
  // pattern cap dropped (pickChapter), so a small chapter still gets its questions.
  let borrowed = 0;
  const levelOf = (r) => Math.min(5, Math.max(1, Math.round(r.q.difficulty ?? 3)));
  const fillLevel = (levels, need) => {
    for (const r of ranked) {
      if (need <= 0) break;
      if (!levels.has(levelOf(r)) || !ok(r)) continue;
      take(r, 'level_fill');
      need -= 1;
    }
    return need;
  };
  let left = count - chosen.length;
  if (left > 0) {
    const levelQuota = L.splitByWeight(left, mix);
    for (const [lv, n] of Object.entries(levelQuota)) left -= n - fillLevel(new Set([Number(lv)]), n);
    const before = left;
    left = fillLevel(allowed, left);
    left = fillLevel(new Set([Math.max(1, Math.min(...allowed) - 1)]), left);
    borrowed += before - left;
  }
  let rest = { picked: [] };
  if (left > 0) {
    const remaining = candidates.filter((q) => !ids.has(String(q._id)) && !(q.duplicate_keys || []).some((d) => dups.has(d)));
    rest = L.pickChapter(remaining, left, { mix, signals, preset: 'hard', pyqBoost, levels: true, rng });
    borrowed += rest.picked.length;
    for (const q of rest.picked) {
      q.hardSlot = 'level_fill';
      slots.level_fill = (slots.level_fill || 0) + 1;
    }
  }

  const picked = [...chosen.map((r) => r.q), ...rest.picked];
  const mixOut = { EASY: 0, MEDIUM: 0, HARD: 0 };
  for (const q of picked) mixOut[L.bandOf(q.difficulty)] += 1;
  return {
    picked,
    slots,
    short,
    mix: mixOut,
    borrowed,
    pyq: picked.filter((q) => q.realPyq).length,
    siblings: chosen.filter((r) => r.sibling).length + (rest.siblings || 0),
    originals: 0,
    skipped: chosen.filter((r) => r.skipped).length + (rest.skipped || 0),
  };
}

/* ------------------------------------------------------------------ practice type labels */

/**
 * 🟣 pyq          real past-paper question (OFFICIAL_VERIFIED / ADAPTED_PYQ)
 * 🔵 pyq_pattern  original practice question in a pattern that real PYQs of the chapter use
 * 🟢 challenge / exam_pattern / learning   other original practice, by difficulty
 * Never claims an exam or a year for an original question.
 */
function practiceTypeFor(q, pyqPatterns) {
  if (q.realPyq) return 'pyq';
  if (q.pattern && pyqPatterns?.has(`${q.topic}.${q.pattern}`)) return 'pyq_pattern';
  if ((q.difficulty ?? 3) >= 5) return 'challenge';
  if ((q.difficulty ?? 3) >= 3) return 'exam_pattern';
  return 'learning';
}

/* ------------------------------------------------------------------ pattern rotation */

const ROTATION = Object.freeze({ MIN_CORRECT: 5, MIN_DAYS: 2, WINDOW: 8, MIN_ACCURACY: 0.8 });

/**
 * Patterns the student has already mastered ("topic.pattern"): in the latest 8 answers of the
 * pattern, at least 5 correct, on 2+ different days, with 80%+ accuracy. Their questions are
 * down-weighted (customTest.logic scoreCandidate) so practice moves on to other patterns.
 * @param answers newest first, with { topic, pattern, correct, at }
 */
function masteredPatterns(answers) {
  const by = new Map();
  for (const a of answers) {
    if (!a.pattern) continue;
    const k = `${a.topic}.${a.pattern}`;
    const list = by.get(k) || [];
    if (list.length < ROTATION.WINDOW) list.push(a);
    by.set(k, list);
  }
  const out = new Set();
  for (const [k, list] of by) {
    const right = list.filter((a) => a.correct);
    const days = new Set(right.map((a) => new Date(a.at).toISOString().slice(0, 10)));
    if (right.length >= ROTATION.MIN_CORRECT && days.size >= ROTATION.MIN_DAYS && right.length / list.length >= ROTATION.MIN_ACCURACY) out.add(k);
  }
  return out;
}

/* ------------------------------------------------------------------ result analysis */

/**
 * Accuracy per skill category ("Why was this hard?"). A question counts in every category it has.
 * status: strong (>= 75%), weak (< 50%), ok otherwise; only categories with 1+ question.
 * @param rows [{ cats: Set|string[], correct: boolean }]
 */
function skillReport(rows) {
  const by = new Map();
  for (const r of rows) {
    for (const c of r.cats) {
      const v = by.get(c) || { skill: c, correct: 0, total: 0 };
      v.total += 1;
      if (r.correct) v.correct += 1;
      by.set(c, v);
    }
  }
  return SKILLS.filter((s) => by.has(s)).map((s) => {
    const v = by.get(s);
    const accuracy = Math.round((v.correct / v.total) * 100);
    return { ...v, accuracy, status: accuracy >= 75 ? 'strong' : accuracy < 50 ? 'weak' : 'ok' };
  });
}

/**
 * What to practise next after a quiz (one action for the whole result):
 *   foundation    a chapter was below 40%, or the quiz was taken in a weak chapter
 *   review_concept 2+ wrong answers on one pattern
 *   harder_mix    80%+ in a Hard Quiz / strong chapters  -> harder, mixed challenge
 *   new_pattern   80%+ elsewhere                          -> patterns not yet practised
 *   more_moderate otherwise (50-79%, or under 50% without a repeated pattern)
 */
function nextStep({ accuracy, preset, chapters = [], repeatedPattern = null, foundationTopics = [] }) {
  const weakest = [...chapters].sort((a, b) => a.accuracy - b.accuracy)[0];
  if (foundationTopics.length || (weakest && weakest.total >= 2 && weakest.accuracy < 40)) {
    return { action: 'foundation', topic: foundationTopics[0] ?? weakest?.topic ?? null };
  }
  if (repeatedPattern) return { action: 'review_concept', topic: repeatedPattern.topic, pattern: repeatedPattern.pattern };
  if (accuracy >= 80) return { action: preset === 'hard' ? 'harder_mix' : 'new_pattern', topic: null };
  return { action: 'more_moderate', topic: weakest?.topic ?? null };
}

/**
 * Speed Challenge result. "Rushed mistakes" = wrong answers given in under 40% of the time
 * planned per question (time limit / questions): a sign of time pressure, not of the concept.
 * @param perQuestion result.per_question rows ({ outcome, time_spent_sec })
 */
function speedReport(perQuestion, timeLimitMin) {
  const n = perQuestion.length;
  const plannedSec = timeLimitMin ? (timeLimitMin * 60) / Math.max(1, n) : null;
  const answered = perQuestion.filter((p) => p.outcome === 'CORRECT' || p.outcome === 'INCORRECT');
  const times = answered.map((p) => p.time_spent_sec).filter((t) => typeof t === 'number' && t >= 0);
  const avgSec = times.length ? Math.round(times.reduce((a, t) => a + t, 0) / times.length) : null;
  const rushed = plannedSec
    ? perQuestion.filter((p) => p.outcome === 'INCORRECT' && typeof p.time_spent_sec === 'number' && p.time_spent_sec < plannedSec * 0.4).length
    : 0;
  const correct = perQuestion.filter((p) => p.outcome === 'CORRECT').length;
  return {
    questions: n,
    completed: answered.length,
    skipped: n - answered.length,
    accuracy: answered.length ? Math.round((correct / answered.length) * 100) : null,
    avgSecPerQuestion: avgSec,
    plannedSecPerQuestion: plannedSec ? Math.round(plannedSec) : null,
    rushedMistakes: rushed,
  };
}

const SPEED_COUNTS = Object.freeze([5, 10, 15, 20]);

module.exports = {
  SKILLS,
  SLOT_WEIGHTS,
  SLOT_ORDER,
  SKILL_MAP,
  TIER_MIX,
  TIERS,
  ROTATION,
  SPEED_COUNTS,
  tierOf,
  skillIndex,
  categoriesOf,
  pickHard,
  practiceTypeFor,
  masteredPatterns,
  skillReport,
  nextStep,
  speedReport,
};
