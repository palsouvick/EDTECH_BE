'use strict';

/**
 * Adaptive practice (owner phase 2026-11-20): per-chapter difficulty. Pure rules, no database — the
 * analysis service passes each chapter's answers, the custom-test generator uses the result.
 *
 * Difficulty is decided per CHAPTER (never from the subject's overall score), on the stored question
 * difficulty 1-5:
 *
 *   1 Basic · 2 Easy · 3 Moderate · 4 Hard · 5 Exam Challenge (plus real PYQs, preferred from level 3 up)
 *
 * The chapter's CURRENT level is the median difficulty of its last 10 answers, so the level is a fact
 * of the answer history and nothing is stored. The NEXT level moves only on a rolling window:
 *
 *   under 5 answers                          → assessment set (no label: "not enough data")
 *   last 10 answers under 40% right          → back to Basic, review the concept
 *   8+ answers at the current level, <50%    → one level down
 *   8+ answers at/above it, 80%+ on 2+ days  → one level up
 *   otherwise                                → stay
 *   a sub-topic with 3+ wrong recently       → review that concept, no promotion until it is fixed
 *
 * The status shown on the Skill Map comes from the ONE mastery stage (mastery.logic.js), not from here.
 */

const DAY = 86_400_000;

const LEVELS = Object.freeze(['basic', 'easy', 'moderate', 'hard', 'challenge']); // index + 1 = stored difficulty
const levelKey = (d) => LEVELS[Math.min(5, Math.max(1, Math.round(d))) - 1];

const RULES = Object.freeze({
  MIN_ANSWERS: 5, // below this: not enough data → assessment
  CURRENT_FROM: 10, // answers whose median difficulty is the current level
  WINDOW: 8, // answers needed at a level before it can change
  RECENT: 20, // answers looked at for the window and for weak concepts
  PROMOTE: 80, // % right at/above the level to go up
  PROMOTE_DAYS: 2, // ...over this many different days
  DEMOTE: 50, // % right at the level below which it goes down
  RESET: 40, // % right in the last 10 answers below which it goes back to Basic
  CONCEPT_WRONG: 3, // wrong answers on one sub-topic (recent) that call for a concept review
  CONCEPT_ACCURACY: 50,
  THIN: 5, // fewer questions than this at a level in the bank: "level is thin"
});

/** Question shares per stored difficulty for a target level: mostly the level, a warm-up below, a stretch above. */
function mixFor(level) {
  if (level === 'assess') return { 1: 0.4, 2: 0.4, 3: 0.2 };
  const d = LEVELS.indexOf(level) + 1;
  if (d <= 1) return { 1: 0.7, 2: 0.3 };
  if (d >= 5) return { 5: 0.6, 4: 0.4 };
  return { [d - 1]: 0.2, [d]: 0.6, [d + 1]: 0.2 };
}

/** How strongly real previous-year questions are preferred at a level (weak: learn first, PYQs later). */
const pyqBoostFor = (level) => (level === 'assess' || level === 'basic' ? 0.5 : level === 'easy' ? 1 : level === 'moderate' ? 2 : 3);

const pct = (c, n) => (n ? Math.round((c / n) * 100) : null);
const accuracy = (list) => pct(list.filter((a) => a.correct).length, list.length);
const daysOf = (list) => new Set(list.map((a) => new Date(a.at).toISOString().slice(0, 10))).size;

function median(nums) {
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** The weakest recent sub-topic with enough wrong answers to call for a concept review, or null. */
function weakConcept(recent, nameOf = (k) => k) {
  const by = new Map();
  for (const a of recent) {
    if (!a.subtopic) continue;
    const g = by.get(a.subtopic) || { key: a.subtopic, answered: 0, wrong: 0 };
    g.answered += 1;
    if (!a.correct) g.wrong += 1;
    by.set(a.subtopic, g);
  }
  const weak = [...by.values()]
    .filter((g) => g.wrong >= RULES.CONCEPT_WRONG && pct(g.answered - g.wrong, g.answered) < RULES.CONCEPT_ACCURACY)
    .sort((a, b) => b.wrong - a.wrong);
  return weak[0] ? { key: weak[0].key, name: nameOf(weak[0].key), wrong: weak[0].wrong, answered: weak[0].answered, accuracy: pct(weak[0].answered - weak[0].wrong, weak[0].answered) } : null;
}

/** Skill Map status from the one mastery stage (mastery.logic STAGES). */
function statusOf(stage, answers) {
  if (answers < RULES.MIN_ANSWERS || stage === 'not_started' || stage === 'learning') return 'insufficient';
  if (stage === 'strong' || stage === 'mastered') return 'strong';
  if (stage === 'developing') return 'developing';
  return 'weak';
}

/**
 * The chapter's level now and the level of its next practice.
 * @param answers newest first: [{ correct, difficulty, at, subtopic }]
 * @param opts.bank questions in the bank per stored difficulty { 1: n, ..., 5: n } (to say when a level is thin)
 * @returns {{ status, current, next, action, evidence, concept, thin, mix, pyqBoost }}
 */
function chapterLevel(answers, { stage = null, bank = null, nameOf } = {}) {
  const n = answers.length;
  const status = statusOf(stage, n);
  const recent = answers.slice(0, RULES.RECENT);
  const concept = n >= RULES.MIN_ANSWERS ? weakConcept(recent, nameOf) : null;
  const evidence = { answers: n, last10: accuracy(answers.slice(0, 10)) };

  if (n < RULES.MIN_ANSWERS) {
    return finish({ status, current: null, next: 'assess', action: 'assess', evidence, concept: null, bank });
  }
  const curD = Math.min(5, Math.max(1, Math.round(median(answers.slice(0, RULES.CURRENT_FROM).map((a) => a.difficulty ?? 3)))));
  const current = levelKey(curD);
  const atLevel = recent.filter((a) => Math.round(a.difficulty ?? 3) === curD).slice(0, RULES.WINDOW);
  const atOrAbove = recent.filter((a) => Math.round(a.difficulty ?? 3) >= curD).slice(0, RULES.WINDOW);
  evidence.atLevel = { answers: atLevel.length, accuracy: accuracy(atLevel) };
  evidence.atOrAbove = { answers: atOrAbove.length, accuracy: accuracy(atOrAbove), days: daysOf(atOrAbove) };

  let next = current;
  let action = 'hold';
  if (evidence.last10 != null && evidence.last10 < RULES.RESET && answers.slice(0, 10).length >= RULES.MIN_ANSWERS) {
    next = 'basic';
    action = curD > 1 ? 'reset' : 'hold';
  } else if (atLevel.length >= RULES.WINDOW && evidence.atLevel.accuracy < RULES.DEMOTE) {
    next = levelKey(curD - 1);
    action = curD > 1 ? 'down' : 'hold';
  } else if (!concept && curD < 5 && atOrAbove.length >= RULES.WINDOW && evidence.atOrAbove.accuracy >= RULES.PROMOTE && evidence.atOrAbove.days >= RULES.PROMOTE_DAYS) {
    next = levelKey(curD + 1);
    action = 'up';
  }
  // A concept going wrong again and again: review it first; the practice after it stays easy enough to rebuild.
  if (concept && action !== 'reset' && action !== 'down') action = 'review_concept';
  return finish({ status, current, next, action, evidence, concept, bank });
}

/** Adds the question mix, PYQ preference, and whether the bank is thin at the target level. */
function finish(r) {
  const target = r.next === 'assess' ? null : LEVELS.indexOf(r.next) + 1;
  const thin = r.bank && target ? (r.bank[target] ?? 0) < RULES.THIN : false;
  let nearest = null;
  if (thin) {
    const order = [1, -1, 2, -2, 3, -3, 4, -4].map((k) => target + k).filter((d) => d >= 1 && d <= 5);
    const d = order.find((x) => (r.bank[x] ?? 0) >= RULES.THIN);
    nearest = d ? levelKey(d) : null;
  }
  const { bank, ...rest } = r;
  return { ...rest, thin, nearest, mix: mixFor(r.next), pyqBoost: pyqBoostFor(r.next) };
}

/** Practice kind shown on actions and buttons: what the student is about to do. */
function practiceKind(lv) {
  if (lv.action === 'assess') return 'assess';
  if (lv.action === 'review_concept' || lv.action === 'reset') return 'review_concept';
  return lv.next;
}

/**
 * "What should I do now?": the top actions across subjects. Priority is the existing focus score
 * (weakness, mistakes, exam importance, PYQ gaps, staleness, decline — analysis.logic focusScore),
 * so a weak but rarely-asked chapter does not beat a weak Must-know one. Strong chapters get at most
 * one slot, as a challenge, and only when they are not just revised.
 * @param chapters [{ subject, topic, title, mastery, status, level, focus: {score, band}, priority, revisionDue, started, hasLesson, readingPct }]
 */
function nextActions(chapters, n = 3) {
  const work = chapters
    .filter((c) => c.status === 'weak' || c.status === 'developing' || (c.status === 'insufficient' && (c.started || c.priority === 'MUST')))
    .sort((a, b) => b.focus.score - a.focus.score || (a.mastery ?? -1) - (b.mastery ?? -1));
  const strong = chapters
    .filter((c) => c.status === 'strong')
    .sort((a, b) => (b.revisionDue ? 1 : 0) - (a.revisionDue ? 1 : 0) || (b.daysSinceTouched ?? 0) - (a.daysSinceTouched ?? 0));
  const out = work.slice(0, strong.length ? n - 1 : n);
  if (strong.length && out.length < n) out.push(strong[0]);
  for (const c of work.slice(out.length)) if (out.length < n && !out.includes(c)) out.push(c);
  return out.slice(0, n).map((c) => ({ ...c, kind: c.status === 'strong' && c.level.action !== 'review_concept' ? (c.revisionDue ? 'revise' : 'challenge') : practiceKind(c.level) }));
}

/**
 * The one "Continue studying" step: learn first when the concept is missing (a weak/new chapter whose
 * lesson is mostly unread), then revision when much is due, else the first next action.
 */
function continueStep(actions, { revisionDue = 0 } = {}) {
  const first = actions[0];
  if (first && first.hasLesson && (first.readingPct ?? 0) < 50 && (first.status === 'weak' || first.status === 'insufficient')) {
    return { kind: 'learn', subject: first.subject, topic: first.topic, title: first.title };
  }
  if (revisionDue >= 15) return { kind: 'revision', count: revisionDue };
  if (first) return { kind: 'practice', subject: first.subject, topic: first.topic, title: first.title, practice: first.kind, level: first.level.next };
  if (revisionDue > 0) return { kind: 'revision', count: revisionDue };
  return null;
}

/**
 * The questions of one adaptive session, by role (owner example for 10: 5 weak, 2 previously wrong,
 * 2 strong challenge, 1 revision), shifted when a role has nothing to offer.
 * @param chapters [{ topic, status, level, focus: {score}, available, openMistakes, revisionDue }]
 * @returns [{ topic, count, role, level }]
 */
function sessionPlan(chapters, count, { topics = [] } = {}) {
  const pool = topics.length ? chapters.filter((c) => topics.includes(c.topic)) : chapters;
  const usable = pool.filter((c) => c.available > 0);
  if (!usable.length) return [];
  // One chapter chosen: the whole session is that chapter at its own level.
  if (topics.length === 1) {
    const c = usable[0];
    return [{ topic: c.topic, count: Math.min(count, c.available), role: 'focus', level: c.level.next }];
  }
  const share = (k) => Math.round(count * k);
  const want = { focus: share(0.5), mistakes: share(0.2), challenge: share(0.2) };
  want.revision = Math.max(0, count - want.focus - want.mistakes - want.challenge);

  const focus = usable.filter((c) => c.status !== 'strong').sort((a, b) => b.focus.score - a.focus.score);
  const withMistakes = usable.filter((c) => c.openMistakes > 0).sort((a, b) => b.openMistakes - a.openMistakes);
  const strong = usable.filter((c) => c.status === 'strong').sort((a, b) => (b.focus.score ?? 0) - (a.focus.score ?? 0));
  const due = usable.filter((c) => c.revisionDue).sort((a, b) => (b.daysSinceTouched ?? 0) - (a.daysSinceTouched ?? 0));

  const out = [];
  const used = new Map();
  const give = (c, n, role, level) => {
    const room = c.available - (used.get(c.topic) || 0);
    const k = Math.max(0, Math.min(n, room));
    if (!k) return 0;
    used.set(c.topic, (used.get(c.topic) || 0) + k);
    out.push({ topic: c.topic, count: k, role, level });
    return k;
  };
  // Roles with nothing to offer pass their questions on to focus.
  let spare = 0;
  if (withMistakes[0]) spare += want.mistakes - give(withMistakes[0], want.mistakes, 'mistakes', withMistakes[0].level.next === 'assess' ? 'basic' : withMistakes[0].level.next);
  else spare += want.mistakes;
  if (strong[0]) spare += want.challenge - give(strong[0], want.challenge, 'challenge', strong[0].level.next === 'challenge' ? 'challenge' : 'hard');
  else spare += want.challenge;
  if (due[0] && due[0] !== strong[0]) spare += want.revision - give(due[0], want.revision, 'retention', due[0].level.current ?? 'moderate');
  else if (due[1]) spare += want.revision - give(due[1], want.revision, 'retention', due[1].level.current ?? 'moderate');
  else spare += want.revision;
  // Focus: the two neediest chapters (3:2), each at its own level; then anything left over.
  let left = want.focus + spare;
  const tops = (focus.length ? focus : usable).slice(0, 2);
  const firstShare = tops.length > 1 ? Math.ceil(left * 0.6) : left;
  if (tops[0]) left -= give(tops[0], firstShare, 'focus', tops[0].level.next);
  if (tops[1]) left -= give(tops[1], left, 'focus', tops[1].level.next);
  for (const c of [...focus, ...usable]) {
    if (left <= 0) break;
    left -= give(c, left, 'focus', c.level.next);
  }
  // One entry per chapter and role.
  const merged = new Map();
  for (const p of out) {
    const k = `${p.topic}.${p.role}`;
    const m = merged.get(k);
    if (m) m.count += p.count;
    else merged.set(k, { ...p });
  }
  return [...merged.values()];
}

/**
 * Label of one picked question, so learning practice, exam-pattern practice, real PYQs and challenge
 * questions are never mixed without saying which is which.
 */
function practiceTypeOf(q) {
  if (q.realPyq) return 'pyq';
  if ((q.difficulty ?? 3) >= 5) return 'challenge';
  if ((q.difficulty ?? 3) >= 3) return 'exam_pattern';
  return 'learning';
}

/**
 * The last 7 days against the 7 before: accuracy, answers, wrong answers (with the answers, newest
 * first, of one subject or of all subjects together).
 */
function weekChange(answers, now = new Date()) {
  const t = now.getTime();
  const thisWeek = answers.filter((a) => t - new Date(a.at).getTime() < 7 * DAY);
  const lastWeek = answers.filter((a) => {
    const age = t - new Date(a.at).getTime();
    return age >= 7 * DAY && age < 14 * DAY;
  });
  const acc = (l) => (l.length >= RULES.MIN_ANSWERS ? accuracy(l) : null);
  const a1 = acc(thisWeek);
  const a0 = acc(lastWeek);
  const wrong = (l) => l.filter((a) => !a.correct).length;
  return {
    answers: thisWeek.length,
    correct: thisWeek.filter((a) => a.correct).length,
    previousAnswers: lastWeek.length,
    accuracy: a1,
    accuracyDelta: a1 != null && a0 != null ? a1 - a0 : null,
    wrong: wrong(thisWeek),
    wrongDelta: lastWeek.length ? wrong(thisWeek) - wrong(lastWeek) : null,
    activeDays: daysOf(thisWeek),
  };
}

/**
 * Insight cards from the student's own data only — never a generic message.
 * @param chapters analysed chapters with { subject, topic, title, status, level, trend, repeatedMistakes }
 */
function insights(chapters, n = 4) {
  const out = [];
  const improved = chapters
    .filter((c) => c.trend?.direction === 'up' && c.trend.previousAccuracy != null && c.trend.recentAccuracy != null)
    .sort((a, b) => (b.trend.recentAccuracy - b.trend.previousAccuracy) - (a.trend.recentAccuracy - a.trend.previousAccuracy))[0];
  if (improved) out.push({ kind: 'progress', subject: improved.subject, topic: improved.topic, title: improved.title, from: improved.trend.previousAccuracy, to: improved.trend.recentAccuracy });
  const concept = chapters.filter((c) => c.level?.concept).sort((a, b) => b.level.concept.wrong - a.level.concept.wrong)[0];
  if (concept) out.push({ kind: 'review', subject: concept.subject, topic: concept.topic, title: concept.title, concept: concept.level.concept.name, wrong: concept.level.concept.wrong });
  const attention = chapters
    .filter((c) => c !== concept && ((c.repeatedMistakes ?? 0) >= 2 || c.trend?.direction === 'down'))
    .sort((a, b) => (b.repeatedMistakes ?? 0) - (a.repeatedMistakes ?? 0))[0];
  if (attention) out.push({ kind: 'attention', subject: attention.subject, topic: attention.topic, title: attention.title, repeated: attention.repeatedMistakes ?? 0, from: attention.trend?.previousAccuracy ?? null, to: attention.trend?.recentAccuracy ?? null });
  const challenge = chapters.filter((c) => c.status === 'strong' && !c.level?.concept).sort((a, b) => (b.mastery ?? 0) - (a.mastery ?? 0))[0];
  if (challenge) out.push({ kind: 'challenge', subject: challenge.subject, topic: challenge.topic, title: challenge.title, mastery: challenge.mastery, level: challenge.level.next });
  return out.slice(0, n);
}

module.exports = { LEVELS, RULES, levelKey, mixFor, pyqBoostFor, statusOf, weakConcept, chapterLevel, practiceKind, nextActions, continueStep, sessionPlan, practiceTypeOf, weekChange, insights };
