'use strict';

/**
 * F9 — ONE mastery definition for every subject (Math, English, General
 * Studies, Reasoning). Pure rules, no database: mastery.service.js gathers
 * the evidence; Home, the subject pages, Today's Study and Readiness all read
 * the result. No subject has its own algorithm — a subject only differs in
 * which evidence EXISTS for it (a lesson, a study book, GK fact cards, a
 * mastery test), and a missing kind of evidence is "not required", never
 * "failed".
 *
 * Stages, each needing everything the one before it needs:
 *
 *   not_started  no answers and nothing read
 *   learning     content started (sections read) or a few answers (< MIN_ANSWERS)
 *   practising   enough answers to measure, score below DEVELOPING_FROM
 *   developing   score DEVELOPING_FROM+, but not yet every Strong gate
 *   strong       score STRONG_FROM+, 15+ answers on 10+ different questions,
 *                on 2+ different days, few open mistakes, half the content read
 *   mastered     score MASTERED_FROM+, 30+ answers on 3+ days, practised in
 *                the last 30 days, content (nearly) all read, PYQs answered
 *                well, mistakes revised and none repeating, revision answers
 *                right, and the chapter's mastery test passed recently
 *
 * Score (0–100) is the formula the Math/English analysis already used
 * (moved here so there is one copy): 60% recent accuracy + 15% hard-question
 * accuracy + 15% practice coverage + 10% PYQ coverage, times a confidence
 * factor (answers / 15) and a retention factor (decays after 14 idle days).
 *
 * Nothing is stored: the stage is recomputed from evidence on every read, so
 * no single quiz — and no single good week — is ever permanent. One quiz is
 * at most 10–15 answers in one sitting: below Strong's 15-answer / 2-day bar.
 */

const DAY = 86_400_000;

const STAGES = Object.freeze(['not_started', 'learning', 'practising', 'developing', 'strong', 'mastered']);

const RULES = Object.freeze({
  RECENT: 30, // answers per chapter for accuracy
  MIN_ANSWERS: 5, // below this there is no score
  PRACTICE_GOAL: 60, // different questions that make a chapter "practised" (or the whole bank if smaller)
  CONFIDENCE_AT: 15, // answers for full confidence
  DEVELOPING_FROM: 50,
  STRONG_FROM: 70,
  MASTERED_FROM: 85,
  STRONG: { answers: 15, unique: 10, days: 2, openMistakeRate: 0.25, content: 50 },
  MASTERED: {
    answers: 30,
    days: 3,
    idleDays: 30,
    content: 90,
    pyqMin: 3, // PYQs answered before PYQ accuracy counts (required when the bank has this many)
    pyqAccuracy: 60,
    revised: 80, // % of mistakes revised at least once
    revisionAccuracy: 70, // % right in revision answers (when there are 3+)
    test: 80, // mastery test best %
    testMaxAgeDays: 60,
  },
});

const pct = (c, n) => (n ? Math.round((c / n) * 100) : null);

/**
 * Score 0–100 (null below MIN_ANSWERS). Same formula as the former
 * analysis.logic masteryPct, which now delegates here.
 */
function scoreOf({ answers, recentAccuracy, hardAccuracy, practicePct, pyqPct, daysSinceActivity }) {
  if (answers < RULES.MIN_ANSWERS || recentAccuracy == null) return null;
  const base = 0.6 * recentAccuracy + 0.15 * (hardAccuracy ?? recentAccuracy) + 0.15 * (practicePct ?? 0) + 0.1 * (pyqPct ?? recentAccuracy);
  const confidence = Math.min(1, answers / RULES.CONFIDENCE_AT);
  const idle = daysSinceActivity ?? 0;
  const retention = idle > 14 ? Math.max(0.7, 1 - (idle - 14) / 100) : 1;
  return Math.round(base * confidence * retention);
}

/**
 * Evidence for one chapter from its raw answers (newest first:
 * [{ qid, correct, at, difficulty, source, pyq }]) plus whatever else the
 * caller knows. Everything optional defaults to "this kind of evidence does
 * not exist here".
 */
function evidenceFrom(answers, {
  now = new Date(),
  bank = 0, // published questions in the chapter
  pyqBank = 0, // published real-paper PYQs in the chapter
  pyqSolved = null, // PYQs whose latest answer is right (null: derive from answers)
  content = null, // { pct, source } | null when the chapter has no study content
  mistakes = [], // [{ status, wrong_count, reviews }]
  test = null, // { available, bestPct, at } | null when no mastery test exists
} = {}) {
  const recent = answers.slice(0, RULES.RECENT);
  const hard = recent.filter((a) => (a.difficulty ?? 3) >= 4);
  const unique = new Set(answers.map((a) => a.qid)).size;
  const goal = Math.max(1, Math.min(bank || RULES.PRACTICE_GOAL, RULES.PRACTICE_GOAL));
  const pyqAnswers = answers.filter((a) => a.pyq);
  const latestPyq = new Map();
  for (const a of pyqAnswers) if (!latestPyq.has(a.qid)) latestPyq.set(a.qid, a.correct);
  const solved = pyqSolved ?? [...latestPyq.values()].filter(Boolean).length;
  const review = answers.filter((a) => a.source === 'review');
  const days = new Set(answers.map((a) => new Date(a.at).toISOString().slice(0, 10))).size;
  const lastAt = answers[0]?.at ?? null;
  const made = mistakes.length;
  const open = mistakes.filter((m) => m.status === 'active').length;
  return {
    answers: answers.length,
    unique,
    days,
    recentAccuracy: recent.length >= RULES.MIN_ANSWERS ? pct(recent.filter((a) => a.correct).length, recent.length) : null,
    hardAccuracy: hard.length >= 3 ? pct(hard.filter((a) => a.correct).length, hard.length) : null,
    practicePct: bank ? Math.min(100, pct(unique, goal)) : 0,
    daysSinceActivity: lastAt ? Math.floor((now - new Date(lastAt)) / DAY) : null,
    lastActivityAt: lastAt ? new Date(lastAt) : null,
    // One decimal: 1 section read of a 200-section book is 0.5%, not "nothing read".
    content: content && content.pct != null ? { pct: Math.min(100, Math.round(content.pct * 10) / 10), source: content.source ?? null } : null,
    pyq: {
      bank: pyqBank,
      answered: latestPyq.size,
      accuracy: pyqAnswers.length >= RULES.MASTERED.pyqMin ? pct(pyqAnswers.filter((a) => a.correct).length, pyqAnswers.length) : null,
      coveragePct: pyqBank ? pct(solved, pyqBank) : null,
    },
    mistakes: {
      made,
      open,
      repeated: mistakes.filter((m) => m.status === 'active' && (m.wrong_count ?? 0) >= 2).length,
      revisedPct: made ? pct(mistakes.filter((m) => (m.reviews ?? 0) > 0 || m.status === 'mastered').length, made) : null,
      openRate: unique ? open / unique : 0,
    },
    revision: { answers: review.length, accuracy: review.length >= 3 ? pct(review.filter((a) => a.correct).length, review.length) : null },
    test: test?.available ? { bestPct: test.bestPct ?? null, at: test.at ? new Date(test.at) : null } : null,
  };
}

const gate = (key, met, need) => ({ key, met: Boolean(met), need });

/** The Strong and Mastered gates, each { key, met, need } — `need` says what is required. */
function gatesOf(ev, score, now = new Date()) {
  const S = RULES.STRONG;
  const M = RULES.MASTERED;
  const strong = [
    gate('score', score != null && score >= RULES.STRONG_FROM, `score ${RULES.STRONG_FROM}+`),
    gate('answers', ev.answers >= S.answers && ev.unique >= S.unique, `${S.answers}+ answers on ${S.unique}+ different questions`),
    gate('days', ev.days >= S.days, `practice on ${S.days}+ different days`),
    gate('mistakes', ev.mistakes.openRate <= S.openMistakeRate, `open mistakes under ${Math.round(S.openMistakeRate * 100)}% of questions tried`),
    gate('content', ev.content == null || ev.content.pct >= S.content, `${S.content}%+ of the study content read`),
  ];
  const testAge = ev.test?.at ? Math.floor((now - ev.test.at) / DAY) : null;
  const mastered = [
    gate('score', score != null && score >= RULES.MASTERED_FROM, `score ${RULES.MASTERED_FROM}+`),
    gate('answers', ev.answers >= M.answers, `${M.answers}+ answers`),
    gate('days', ev.days >= M.days, `practice on ${M.days}+ different days`),
    gate('recent', ev.daysSinceActivity != null && ev.daysSinceActivity <= M.idleDays, `practised in the last ${M.idleDays} days`),
    gate('content', ev.content == null || ev.content.pct >= M.content, `${M.content}%+ of the study content read`),
    gate(
      'pyq',
      ev.pyq.bank < M.pyqMin || (ev.pyq.accuracy != null && ev.pyq.accuracy >= M.pyqAccuracy),
      `${M.pyqMin}+ previous-year questions answered, ${M.pyqAccuracy}%+ right`,
    ),
    gate(
      'mistakes',
      ev.mistakes.repeated === 0 && (ev.mistakes.made === 0 || (ev.mistakes.revisedPct ?? 0) >= M.revised),
      `no repeating mistakes, ${M.revised}%+ of mistakes revised`,
    ),
    gate('revision', ev.revision.accuracy == null || ev.revision.accuracy >= M.revisionAccuracy, `${M.revisionAccuracy}%+ right when revising`),
    gate(
      'test',
      ev.test == null || (ev.test.bestPct != null && ev.test.bestPct >= M.test && testAge != null && testAge <= M.testMaxAgeDays),
      `mastery test ${M.test}%+ in the last ${M.testMaxAgeDays} days`,
    ),
  ];
  return { strong, mastered };
}

/**
 * The stage of one chapter from its evidence.
 * @returns {{ stage, score, accuracy, gates: {strong, mastered}, next: {stage, missing: string[]}|null, needsWork: boolean }}
 */
function stageOf(ev, now = new Date()) {
  const score = scoreOf({
    answers: ev.answers,
    recentAccuracy: ev.recentAccuracy,
    hardAccuracy: ev.hardAccuracy,
    practicePct: ev.practicePct,
    pyqPct: ev.pyq?.coveragePct ?? null,
    daysSinceActivity: ev.daysSinceActivity,
  });
  const gates = gatesOf(ev, score, now);
  const allMet = (list) => list.every((g) => g.met);
  let stage;
  if (ev.answers === 0 && !(ev.content?.pct > 0)) stage = 'not_started';
  else if (ev.answers < RULES.MIN_ANSWERS || score == null) stage = 'learning';
  else if (score < RULES.DEVELOPING_FROM) stage = 'practising';
  else if (!allMet(gates.strong)) stage = 'developing';
  else if (!allMet(gates.mastered)) stage = 'strong';
  else stage = 'mastered';

  const nextStage = STAGES[STAGES.indexOf(stage) + 1] ?? null;
  let missing = [];
  if (nextStage === 'learning') missing = ['read the lesson or answer a few questions'];
  else if (nextStage === 'practising') missing = [`answer ${RULES.MIN_ANSWERS}+ questions`];
  else if (nextStage === 'developing') missing = [`score ${RULES.DEVELOPING_FROM}+ (accuracy over more answers)`];
  else if (nextStage === 'strong') missing = gates.strong.filter((g) => !g.met).map((g) => g.need);
  else if (nextStage === 'mastered') missing = [...gates.strong, ...gates.mastered].filter((g) => !g.met).map((g) => g.need);

  return {
    stage,
    score,
    accuracy: ev.recentAccuracy,
    gates,
    next: nextStage ? { stage: nextStage, missing: [...new Set(missing)] } : null,
    // "Needs work": measured, and wrong more often than not — the one weak
    // signal everything (Today, home, custom tests) uses.
    needsWork: ev.recentAccuracy != null && ev.recentAccuracy < 50,
  };
}

/**
 * The older five-value status (not_started / started / weak / improving /
 * strong) that existing screens and badges read, derived from the stage so
 * it can never disagree with it.
 */
function legacyStatus(result) {
  switch (result.stage) {
    case 'not_started':
      return 'not_started';
    case 'learning':
      return 'started';
    case 'strong':
    case 'mastered':
      return 'strong';
    default:
      return result.needsWork ? 'weak' : 'improving';
  }
}

module.exports = { STAGES, RULES, scoreOf, evidenceFrom, gatesOf, stageOf, legacyStatus };
