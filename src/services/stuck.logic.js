'use strict';

/**
 * Pure rules of the Math "I'm Stuck" learning loop (no database). The service (stuck.service.js)
 * loads the evidence and calls these. Unit-tested in test/stuck.test.js.
 *
 *   Mock → "I'm Stuck" → evidence → diagnosis (this file) → learning content → similar-pattern
 *   quiz (customTest preset 'stuck') → adaptive level (nextLevel) → improvement → mastery
 *
 * A diagnosis is never made from one question. Each probable gap needs repeated evidence:
 *   possible  at least POSSIBLE_MIN pieces of evidence ("practise N more questions to confirm")
 *   high      at least HIGH_MIN pieces AND at least HIGH_RATE of the relevant questions
 * Anything less is not shown at all.
 *
 * Evidence comes only from what the student did or said: their own "I'm Stuck" reason, their own
 * "why did I lose marks" tag, their own skip reason, time taken against the planned time, and
 * accuracy by difficulty level. Nothing is inferred from keywords, and nothing outside the app
 * (search, other sites, AI tools) is ever looked at.
 */

/** Probable gaps, in the order they are explained to a student. */
const GAPS = Object.freeze(['knowledge', 'skill', 'calculation', 'method', 'recall', 'speed', 'reading', 'multistep', 'bodmas']);

/** What each kind of student statement is evidence of. null: says nothing about a gap. */
const REASON_GAP = Object.freeze({
  concept: 'knowledge',
  start: 'knowledge',
  method: 'method',
  calculation: 'calculation',
  forgot_rule: 'recall',
  too_slow: 'speed',
  question_unclear: 'reading',
  other: null,
});
const LOSS_GAP = Object.freeze({ concept: 'knowledge', calculation: 'calculation', misread: 'reading', time: 'speed', guess: null });
const SKIP_GAP = Object.freeze({ forgot_concept: 'recall', did_not_understand: 'reading', time_pressure: 'speed', ran_out_of_time: 'speed', too_difficult: null, unsure: null });

/** Simplification patterns that test order of operations (db/patterns/quant/simplification.js). */
const BODMAS_PATTERNS = Object.freeze(new Set(['bodmas_order', 'nested_brackets', 'mixed_fraction_operations', 'fraction_chain_of']));

const RULES = Object.freeze({
  WINDOW: 20, // the latest relevant questions looked at
  POSSIBLE_MIN: 2,
  HIGH_MIN: 4,
  HIGH_RATE: 0.25,
  CONFIRM_AT: 5, // evidence wanted before "possible" can become "high"
  SLOW_FACTOR: 2, // a correct answer taking 2× the planned time counts as speed evidence
  LEVEL_MIN: 5, // answers needed at a difficulty level before its accuracy is used
  BASIC_OK: 70, // basic questions at/above this: the concept is understood
  BASIC_WEAK: 50, // basic questions under this: the concept is not yet there
  APPLY_WEAK: 50, // moderate questions under this, basics fine: skill (application) gap
  MULTI_WEAK: 40, // hard questions under this, basics fine: multi-step gap
});

/** Practice mode recommended for each gap (customTest preset 'stuck', stuckMode). */
const GAP_MODE = Object.freeze({
  knowledge: 'concept',
  recall: 'formula',
  calculation: 'calculation',
  bodmas: 'calculation',
  method: 'method',
  skill: 'pattern',
  reading: 'pattern',
  multistep: 'exam',
  speed: 'exam',
});

const MODES = Object.freeze(['concept', 'formula', 'calculation', 'method', 'pattern', 'exam', 'mixed']);
const LEVELS = Object.freeze(['basic', 'moderate', 'exam']);

/** Share of questions per stored difficulty (1-5) at each practice level. */
const LEVEL_MIX = Object.freeze({
  basic: { 1: 0.5, 2: 0.5 },
  moderate: { 2: 0.2, 3: 0.6, 4: 0.2 },
  exam: { 3: 0.2, 4: 0.5, 5: 0.3 },
});

/** Stuck reasons that each practice mode works on (an empty list: every stuck question). */
const MODE_REASONS = Object.freeze({
  concept: ['concept', 'start', 'question_unclear'],
  formula: ['forgot_rule'],
  calculation: ['calculation', 'too_slow'],
  method: ['method', 'start'],
  pattern: [],
  exam: [],
  mixed: [],
});

const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
const lost = (e) => e.outcome !== 'CORRECT';

/**
 * Gap signals carried by one evidence row (a question in a Math mock or test). A row counts at
 * most once per gap. Row: { outcome, stuckReason, lossReason, skipReason, timeSec, targetSec,
 * topic, pattern }.
 */
function signalsOf(e) {
  const out = new Set();
  const add = (g) => g && out.add(g);
  if (e.stuck) add(REASON_GAP[e.stuckReason]);
  if (lost(e)) add(LOSS_GAP[e.lossReason]);
  if (e.outcome === 'UNATTEMPTED' || e.outcome === 'TIMED_OUT') add(SKIP_GAP[e.skipReason]);
  if (e.outcome === 'CORRECT' && e.targetSec > 0 && e.timeSec >= RULES.SLOW_FACTOR * e.targetSec) out.add('speed');
  // Order of operations: a lost or stuck question on a BODMAS pattern, or calculation trouble there.
  if (e.topic === 'simplification' && BODMAS_PATTERNS.has(e.pattern) && (lost(e) || e.stuck)) out.add('bodmas');
  return out;
}

/** Accuracy at each difficulty level from answers ({ difficulty, correct }). */
function levelAccuracy(answers) {
  const at = (pred) => {
    const xs = answers.filter((a) => pred(a.difficulty ?? 3));
    return { n: xs.length, correct: xs.filter((a) => a.correct).length, pct: pct(xs.filter((a) => a.correct).length, xs.length) };
  };
  return { basic: at((d) => d <= 2), moderate: at((d) => d === 3), hard: at((d) => d >= 4) };
}

const enough = (lv) => lv.n >= RULES.LEVEL_MIN;

function confidenceOf(n, of) {
  if (n >= RULES.HIGH_MIN && of > 0 && n / of >= RULES.HIGH_RATE) return 'high';
  if (n >= RULES.POSSIBLE_MIN) return 'possible';
  return null;
}

/**
 * Probable gaps from the evidence. Returns the gaps that have enough evidence, strongest first:
 *   { gap, confidence: 'high'|'possible', count, of, toConfirm, evidence: [...], topics: [{topic, n}],
 *     practice: { mode, topic } }
 * evidence entries: { kind: 'signals', n, of } | { kind: 'stuck', n } | { kind: 'slow', factor }
 *                   | { kind: 'levels', basicPct, appliedPct, level }
 *
 * @param {object[]} events   evidence rows, newest first (see signalsOf)
 * @param {object[]} answers  all Math answers, newest first ({ topic, difficulty, correct })
 */
function diagnose(events, answers = []) {
  const recent = events.slice(0, RULES.WINDOW);
  const of = recent.length;
  const acc = new Map(GAPS.map((g) => [g, { n: 0, stuck: 0, topics: new Map(), slow: [] }]));
  for (const e of recent) {
    for (const g of signalsOf(e)) {
      const a = acc.get(g);
      a.n += 1;
      if (e.stuck) a.stuck += 1;
      a.topics.set(e.topic, (a.topics.get(e.topic) || 0) + 1);
      if (g === 'speed' && e.targetSec > 0 && e.timeSec > 0) a.slow.push(e.timeSec / e.targetSec);
    }
  }

  const out = [];
  const topTopics = (m) => [...m].sort((x, y) => y[1] - x[1]).slice(0, 3).map(([topic, n]) => ({ topic, n }));
  for (const [gap, a] of acc) {
    const confidence = confidenceOf(a.n, of);
    if (!confidence) continue;
    const evidence = [{ kind: 'signals', n: a.n, of }];
    if (a.stuck >= 2) evidence.push({ kind: 'stuck', n: a.stuck });
    if (a.slow.length) evidence.push({ kind: 'slow', factor: Math.round((a.slow.reduce((x, y) => x + y, 0) / a.slow.length) * 10) / 10 });
    const topics = topTopics(a.topics);
    out.push({ gap, confidence, count: a.n, of, toConfirm: confidence === 'high' ? 0 : Math.max(0, RULES.CONFIRM_AT - a.n), evidence, topics, practice: { mode: GAP_MODE[gap], topic: topics[0]?.topic ?? null } });
  }

  // Accuracy by level, chapter by chapter: knowledge / skill / multi-step gaps.
  const byTopic = new Map();
  for (const a of answers) {
    if (!byTopic.has(a.topic)) byTopic.set(a.topic, []);
    byTopic.get(a.topic).push(a);
  }
  const levelGaps = { knowledge: [], skill: [], multistep: [] };
  for (const [topic, list] of byTopic) {
    const lv = levelAccuracy(list.slice(0, 40));
    if (enough(lv.basic) && lv.basic.pct < RULES.BASIC_WEAK) {
      levelGaps.knowledge.push({ topic, n: lv.basic.n - lv.basic.correct, of: lv.basic.n, basicPct: lv.basic.pct, appliedPct: null, level: 'basic' });
    } else if (enough(lv.basic) && lv.basic.pct >= RULES.BASIC_OK) {
      if (enough(lv.moderate) && lv.moderate.pct < RULES.APPLY_WEAK) levelGaps.skill.push({ topic, n: lv.moderate.n - lv.moderate.correct, of: lv.moderate.n, basicPct: lv.basic.pct, appliedPct: lv.moderate.pct, level: 'moderate' });
      if (enough(lv.hard) && lv.hard.pct < RULES.MULTI_WEAK) levelGaps.multistep.push({ topic, n: lv.hard.n - lv.hard.correct, of: lv.hard.n, basicPct: lv.basic.pct, appliedPct: lv.hard.pct, level: 'hard' });
    }
  }
  for (const [gap, rows] of Object.entries(levelGaps)) {
    if (!rows.length) continue;
    rows.sort((x, y) => y.n - x.n);
    const n = rows.reduce((s, r) => s + r.n, 0);
    const total = rows.reduce((s, r) => s + r.of, 0);
    const levels = rows.map((r) => ({ kind: 'levels', topic: r.topic, basicPct: r.basicPct, appliedPct: r.appliedPct, level: r.level }));
    const existing = out.find((g) => g.gap === gap);
    if (existing) {
      existing.evidence.push(...levels);
      existing.count += n;
      existing.of += total;
      if (existing.confidence === 'possible' && confidenceOf(existing.count, existing.of) === 'high') {
        existing.confidence = 'high';
        existing.toConfirm = 0;
      }
      continue;
    }
    const confidence = confidenceOf(n, total);
    if (!confidence) continue;
    out.push({
      gap,
      confidence,
      count: n,
      of: total,
      toConfirm: confidence === 'high' ? 0 : Math.max(0, RULES.CONFIRM_AT - n),
      evidence: [{ kind: 'signals', n, of: total }, ...levels],
      topics: rows.slice(0, 3).map((r) => ({ topic: r.topic, n: r.n })),
      practice: { mode: GAP_MODE[gap], topic: rows[0].topic },
    });
  }

  return out.sort((x, y) => (x.confidence === y.confidence ? y.count - x.count || GAPS.indexOf(x.gap) - GAPS.indexOf(y.gap) : x.confidence === 'high' ? -1 : 1));
}

/**
 * The chapter table: stuck questions, wrong answers and recent accuracy per chapter, most stuck first.
 * @param {object[]} stuckRows  one per stuck question ({ topic })
 * @param {object[]} answers    Math answers, newest first ({ topic, correct })
 */
function chapterTable(stuckRows, answers) {
  const rows = new Map();
  const row = (t) => rows.get(t) || rows.set(t, { topic: t, stuck: 0, wrong: 0, answered: 0, correct: 0 }).get(t);
  for (const s of stuckRows) row(s.topic).stuck += 1;
  const recentPer = new Map();
  for (const a of answers) {
    if (!rows.has(a.topic)) continue; // only chapters the student got stuck in
    const r = row(a.topic);
    if (!a.correct) r.wrong += 1;
    const k = recentPer.get(a.topic) || 0;
    if (k < 30) {
      r.answered += 1;
      if (a.correct) r.correct += 1;
      recentPer.set(a.topic, k + 1);
    }
  }
  return [...rows.values()]
    .map((r) => ({ topic: r.topic, stuck: r.stuck, wrong: r.wrong, accuracy: r.answered >= 3 ? pct(r.correct, r.answered) : null, answered: r.answered }))
    .sort((a, b) => b.stuck - a.stuck || (a.accuracy ?? 101) - (b.accuracy ?? 101));
}

/**
 * Which questions a "Practice My Weakness" quiz should be built around, and how many per chapter.
 * Never the exact stuck questions: the quiz uses other questions of the same pattern (or
 * sub-topic) in the same chapter, at the chosen level.
 *
 * @param {object[]} targets  { qid, topic, pattern, subtopic, kind: 'stuck'|'wrong'|'skipped', reason }
 * @param {object} opts       { mode, level, count, topics?: string[], gapTopics?: string[] }
 * @returns {{ plan: {topic, count, mix}[], patterns: string[], subtopics: string[], qids: string[], mode, level }}
 */
function practiceTargets(targets, { mode = 'pattern', level = 'basic', count = 10, topics = [], gapTopics = [] } = {}) {
  const weightOf = { stuck: 3, wrong: 2, skipped: 1 };
  let pool = topics.length ? targets.filter((t) => topics.includes(t.topic)) : targets;
  const reasons = MODE_REASONS[mode] || [];
  if (reasons.length) {
    const byReason = pool.filter((t) => t.kind === 'stuck' && reasons.includes(t.reason));
    if (byReason.length) pool = byReason;
  }
  if (mode === 'calculation' && !topics.length) {
    const calc = pool.filter((t) => t.topic === 'simplification' || (t.kind === 'stuck' && (t.reason === 'calculation' || t.reason === 'too_slow')));
    if (calc.length) pool = calc;
  }
  if (mode === 'mixed' && gapTopics.length && !topics.length) {
    const mixed = pool.filter((t) => gapTopics.includes(t.topic));
    if (mixed.length) pool = mixed;
  }
  const weight = new Map();
  for (const t of pool) weight.set(t.topic, (weight.get(t.topic) || 0) + (weightOf[t.kind] || 1));
  const chosen = [...weight].sort((a, b) => b[1] - a[1]).slice(0, mode === 'mixed' ? 3 : 2);
  const total = chosen.reduce((s, [, w]) => s + w, 0);
  const plan = [];
  let left = count;
  chosen.forEach(([topic, w], i) => {
    const n = i === chosen.length - 1 ? left : Math.max(1, Math.round((count * w) / total));
    const take = Math.min(left, n);
    if (take > 0) plan.push({ topic, count: take, mix: LEVEL_MIX[level] });
    left -= take;
  });
  const inPlan = new Set(plan.map((p) => p.topic));
  const used = pool.filter((t) => inPlan.has(t.topic));
  return {
    plan,
    patterns: [...new Set(used.filter((t) => t.pattern).map((t) => `${t.topic}.${t.pattern}`))],
    subtopics: [...new Set(used.filter((t) => t.subtopic).map((t) => `${t.topic}.${t.subtopic}`))],
    qids: [...new Set(targets.map((t) => String(t.qid)))],
    mode,
    level,
  };
}

/**
 * Adaptive difficulty after a practice set (Basic → Moderate → Exam level):
 *   80%+ right (4/5)   up a level (at Exam level: mastered)
 *   21–79% (2/5, 3/5)  same level, a fresh set of the pattern
 *   0–20% (0–1/5)      back to the learning content before continuing (level drops to Basic)
 */
function nextLevel(level, correct, total) {
  const share = total ? correct / total : 0;
  const i = Math.max(0, LEVELS.indexOf(level));
  if (share >= 0.8) return i === LEVELS.length - 1 ? { level: LEVELS[i], action: 'mastered' } : { level: LEVELS[i + 1], action: 'up' };
  if (share <= 0.2) return { level: 'basic', action: 'revise' };
  return { level: LEVELS[i], action: 'same' };
}

/**
 * Where a first practice set starts: Basic when the concept or a rule is missing, or the basics are
 * not yet measured as solid; Moderate when basic questions are already 80%+ on enough answers.
 */
function startLevel({ gap = null, basic = null } = {}) {
  if (gap === 'knowledge' || gap === 'recall' || gap === 'reading') return 'basic';
  if (basic && basic.n >= RULES.LEVEL_MIN && basic.pct >= 80) return 'moderate';
  return 'basic';
}

/**
 * Improvement per chapter from "Practice My Weakness" results, oldest first. A chapter needs two
 * results (first vs latest); with one, the baseline is the chapter's accuracy before practising.
 * @param {object[]} quizzes   { at, topics: { [topic]: { correct, total } } }, oldest first
 * @param {Map<string, number|null>} baseline  chapter accuracy before the first quiz
 */
function improvementOf(quizzes, baseline = new Map()) {
  const seen = new Map();
  for (const q of quizzes) {
    for (const [topic, v] of Object.entries(q.topics)) {
      if (!v.total) continue;
      const p = pct(v.correct, v.total);
      const s = seen.get(topic);
      if (!s) seen.set(topic, { topic, first: p, latest: p, quizzes: 1 });
      else Object.assign(s, { latest: p, quizzes: s.quizzes + 1 });
    }
  }
  return [...seen.values()]
    .map((s) => {
      const before = s.quizzes >= 2 ? s.first : baseline.get(s.topic) ?? null;
      return { topic: s.topic, before, now: s.latest, change: before == null ? null : s.latest - before, quizzes: s.quizzes };
    })
    .sort((a, b) => (b.change ?? -999) - (a.change ?? -999));
}

/**
 * The one next action: practise the strongest gap at its level, or (no gap proven yet) the most
 * stuck chapter as pattern practice; with nothing at all, null.
 */
function nextAction({ gaps, chapters, levelFor = () => 'basic', count = 10 }) {
  const g = gaps[0];
  if (g) {
    const topic = g.practice.topic ?? chapters[0]?.topic ?? null;
    return { kind: 'practice', gap: g.gap, mode: g.practice.mode, topic, level: levelFor(topic, g.gap), count, confidence: g.confidence };
  }
  const c = chapters[0];
  if (c) return { kind: 'practice', gap: null, mode: 'pattern', topic: c.topic, level: levelFor(c.topic, null), count, confidence: null };
  return null;
}

module.exports = {
  GAPS,
  REASON_GAP,
  LOSS_GAP,
  SKIP_GAP,
  BODMAS_PATTERNS,
  RULES,
  GAP_MODE,
  MODES,
  LEVELS,
  LEVEL_MIX,
  signalsOf,
  levelAccuracy,
  diagnose,
  chapterTable,
  practiceTargets,
  nextLevel,
  startLevel,
  improvementOf,
  nextAction,
};
