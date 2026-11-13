'use strict';

/**
 * Pure rules of the learning analysis (no database). One framework for every subject;
 * a subject only adds its configuration (SUBJECT_CONFIG: areas and timing).
 * The service (analysis.service.js) loads the data and calls these. Unit-tested in
 * test/analysis.test.js.
 *
 * Every chapter gets SEPARATE progress indicators (reading is never "completion"):
 *   reading    lesson sections read / sections in the lesson                 (null: no lesson)
 *   practice   different questions answered / practice goal (bank, max 60)
 *   pyq        real previous-year questions solved / PYQs in the bank         (null: none in bank)
 *   revision   mistakes revised at least once / mistakes made                 (null: no mistakes)
 *   accuracy   right answers among the latest 30                              (null: under 5 answers)
 *   mastery    how well the student actually performs (masteryPct below)      (null: under 5 answers)
 */

const { DIFFICULTY_BANDS } = require('../models/constants');

const DAY = 86400_000;
const RECENT = 30; // answers per chapter for accuracy / mastery
const MIN_ANSWERS = 5; // below this, accuracy and mastery are not shown
const PRACTICE_GOAL = 60; // different questions that make a chapter "practised" (or the whole bank if smaller)
const MAX_SEC_PER_ANSWER = 600; // longer = the student walked away; capped so time stays honest
const WEEKS = 8;

/* ----------------------------------------------------------------- subjects */

/**
 * Areas group chapters for "why am I weak" at a higher level (English: grammar vs vocabulary vs
 * reading vs application). targetSec = planned seconds per exam-level question.
 */
const SUBJECT_CONFIG = Object.freeze({
  quant: {
    targetSec: 75,
    areas: [
      { key: 'arithmetic', topics: ['percentage', 'profit_loss', 'ratio_proportion', 'average', 'interest', 'partnership', 'mixture_alligation', 'ages'] },
      { key: 'time_rate', topics: ['time_work', 'pipes_cistern', 'time_speed_distance'] },
      { key: 'numbers', topics: ['number_system', 'simplification'] },
      { key: 'algebra_geometry', topics: ['algebra', 'mensuration'] },
    ],
  },
  english: {
    targetSec: 40,
    areas: [
      { key: 'grammar', topics: ['parts_of_speech', 'articles', 'tenses', 'voice', 'narration', 'modals_conditionals', 'grammar'] },
      { key: 'vocabulary', topics: ['synonyms_antonyms', 'idioms_phrases', 'one_word_substitution'] },
      { key: 'reading', topics: ['reading_comprehension'] },
      { key: 'application', topics: ['error_spotting', 'sentence_improvement', 'fill_blanks'] },
    ],
  },
});
const ANALYSIS_SUBJECTS = Object.freeze(Object.keys(SUBJECT_CONFIG));

const areaOf = (subject, topic) => SUBJECT_CONFIG[subject]?.areas.find((a) => a.topics.includes(topic))?.key ?? 'other';

/* ----------------------------------------------------------------- helpers */

const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const bandOf = (d) => Object.keys(DIFFICULTY_BANDS).find((b) => DIFFICULTY_BANDS[b].includes(d)) ?? 'MEDIUM';
const secOf = (a) => (Number.isFinite(a.timeSec) && a.timeSec > 0 ? Math.min(a.timeSec, MAX_SEC_PER_ANSWER) : 0);
const daysBetween = (a, b) => Math.floor((b - a) / DAY);

/** Local "YYYY-MM-DD" of the Monday of the week that holds `date` (tz = minutes east of UTC). */
function weekKey(date, tzMin) {
  const local = new Date(date.getTime() + tzMin * 60_000);
  const dow = (local.getUTCDay() + 6) % 7; // Monday = 0
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() - dow)).toISOString().slice(0, 10);
}
const monthKey = (date, tzMin) => new Date(date.getTime() + tzMin * 60_000).toISOString().slice(0, 7);

/** Accuracy of a group of answers, with a light confidence shrink for small groups (for ranking). */
function groupStats(list) {
  const answered = list.length;
  const correct = list.filter((a) => a.correct).length;
  return { answered, correct, wrong: answered - correct, accuracyPct: pct(correct, answered) };
}

/* ----------------------------------------------------------------- mastery */

/**
 * Mastery (0-100) = performance, proven over enough answers, kept up to date:
 *   base       = 60% recent accuracy + 15% accuracy on hard questions (or recent accuracy)
 *              + 15% practice progress + 10% PYQ progress (or recent accuracy when the bank has none)
 *   confidence = min(1, answers / 15)        5 lucky answers do not make a chapter mastered
 *   retention  = x1 up to 14 days since the chapter was last practised, then -1 point per day (floor x0.7)
 * null below 5 answers.
 */
function masteryPct({ answers, recentAccuracy, hardAccuracy, practicePct, pyqPct, daysSinceActivity }) {
  if (answers < MIN_ANSWERS || recentAccuracy == null) return null;
  const base = 0.6 * recentAccuracy + 0.15 * (hardAccuracy ?? recentAccuracy) + 0.15 * (practicePct ?? 0) + 0.1 * (pyqPct ?? recentAccuracy);
  const confidence = Math.min(1, answers / 15);
  const idle = daysSinceActivity ?? 0;
  const retention = idle > 14 ? Math.max(0.7, 1 - (idle - 14) / 100) : 1;
  return Math.round(base * confidence * retention);
}

/** Days to the next revision of a chapter, from its mastery (weaker = sooner). */
function revisionIntervalDays(mastery) {
  if (mastery == null || mastery < 50) return 2;
  if (mastery < 70) return 4;
  if (mastery < 85) return 7;
  return 14;
}

/* ----------------------------------------------------------------- focus score */

/**
 * Focus Priority Score (0-100): how much a chapter needs the student's time NOW.
 * Each factor is 0..1; its weight is the most points it can add (weights sum to 100).
 */
const FOCUS_WEIGHTS = Object.freeze({
  low_accuracy: 25, // recent accuracy: 85%+ adds nothing, 25% or less adds all 25 (12.5 while under 5 answers)
  mistakes: 12, // open + repeated mistakes
  skips: 10, // share of the chapter's questions left unanswered
  incomplete: 10, // reading and practice not done
  decline: 10, // accuracy falling in the last 2 weeks
  importance: 8, // Must know / Important in WBPSC papers
  pyq: 7, // previous-year questions not solved
  stale: 7, // days since the chapter was last practised or revised
  revision: 6, // mistakes never revised
  hard: 5, // hard questions answered much worse than the rest
});

/**
 * Bands: strong = mastery 80%+ and score under 35; high = score 50+ or accuracy under 50%;
 * medium = score 30+ or accuracy under 70%; low = the rest; not_started = no answers or skips.
 */
function focusScore(c) {
  const started = c.answers > 0 || c.skipped > 0;
  const f = {
    low_accuracy: c.recentAccuracy == null ? 0.5 : clamp01((85 - c.recentAccuracy) / 60), // 85%+ = 0, 25% or less = 1
    mistakes: clamp01((c.openMistakes + 2 * c.repeatedMistakes) / 10),
    skips: clamp01(((c.skipped / Math.max(1, c.answers + c.skipped)) * 2)),
    incomplete: 1 - ((c.readingPct ?? c.practicePct) + c.practicePct) / 200,
    decline: c.trend?.recentDelta != null && c.trend.recentDelta < 0 ? clamp01(-c.trend.recentDelta / 20) : 0,
    importance: c.priority === 'MUST' ? 1 : c.priority === 'IMPORTANT' ? 0.6 : 0.2,
    pyq: c.pyqPct == null ? 0 : 1 - c.pyqPct / 100,
    stale: started && c.daysSinceTouched != null ? clamp01(c.daysSinceTouched / 30) : 0,
    revision: c.revisionPct == null ? 0 : 1 - c.revisionPct / 100,
    hard: c.hardAccuracy != null && c.recentAccuracy != null ? clamp01((c.recentAccuracy - c.hardAccuracy) / 40) : 0,
  };
  const parts = Object.entries(FOCUS_WEIGHTS).map(([k, w]) => ({ key: k, points: Math.round(f[k] * w * 10) / 10 }));
  const score = Math.round(parts.reduce((a, p) => a + p.points, 0));
  let band;
  if (!started) band = 'not_started';
  else if (c.mastery != null && c.mastery >= 80 && score < 35) band = 'strong';
  else if (score >= 50 || (c.recentAccuracy != null && c.recentAccuracy < 50)) band = 'high';
  else if (score >= 30 || (c.recentAccuracy != null && c.recentAccuracy < 70)) band = 'medium';
  else band = 'low';
  return { score, band, parts: parts.sort((a, b) => b.points - a.points) };
}

/**
 * "Why am I weak?": the facts behind the score, biggest first. Each reason carries numbers
 * the page puts into a sentence ("14/35 questions wrong").
 */
function whyReasons(c, focus) {
  const out = [];
  for (const { key, points } of focus.parts) {
    if (points < 1.5) continue;
    switch (key) {
      case 'low_accuracy':
        if (c.answers >= MIN_ANSWERS) out.push({ key, wrong: c.wrong, answered: c.answers, accuracy: c.recentAccuracy });
        else out.push({ key: 'few_answers', answered: c.answers });
        break;
      case 'mistakes':
        out.push({ key, open: c.openMistakes, repeated: c.repeatedMistakes });
        break;
      case 'skips':
        out.push({ key, skipped: c.skipped });
        break;
      case 'incomplete':
        out.push({ key, reading: c.readingPct, practice: c.practicePct, unique: c.unique, goal: c.practiceGoal });
        break;
      case 'decline':
        out.push({ key, from: c.trend.previousAccuracy, to: c.trend.recentAccuracy });
        break;
      case 'importance':
        if (c.priority) out.push({ key, level: c.priority });
        break;
      case 'pyq':
        out.push({ key, pct: c.pyqPct, solved: c.pyqSolved, total: c.pyqTotal });
        break;
      case 'stale':
        out.push({ key, days: c.daysSinceTouched });
        break;
      case 'revision':
        out.push({ key, pct: c.revisionPct, days: c.daysSinceRevision });
        break;
      case 'hard':
        out.push({ key, hard: c.hardAccuracy, all: c.recentAccuracy });
        break;
      default:
    }
  }
  return out;
}

/**
 * The action plan for one chapter: what to do, in order, with how much.
 * Learn quiz levels: beginner = basic, intermediate = moderate, advanced = exam level.
 */
function actionPlan(c, { targetSec }) {
  const steps = [];
  const acc = c.recentAccuracy;
  if (c.readingPct != null && (c.readingPct < 100 || (c.mastery != null && c.mastery < 50))) {
    steps.push({ kind: 'read', minutes: c.readingPct < 100 ? 20 : 15 });
  }
  if (c.openMistakes > 0) steps.push({ kind: 'mistakes', count: Math.min(c.openMistakes, 10) });
  if (acc == null || acc < 60) {
    steps.push({ kind: 'quiz', level: 'beginner', count: 5 }, { kind: 'quiz', level: 'intermediate', count: 5 }, { kind: 'quiz', level: 'advanced', count: 5 });
  } else if (acc < 80) {
    steps.push({ kind: 'quiz', level: 'intermediate', count: 5 }, { kind: 'quiz', level: 'advanced', count: 5 });
  } else {
    steps.push({ kind: 'quiz', level: 'advanced', count: 5 });
  }
  if (c.pyqPct != null && c.pyqPct < 60) steps.push({ kind: 'pyq', count: 5 });
  steps.push({ kind: 'smart_quiz', count: 10 });
  const questions = steps.reduce((a, s) => a + (s.count ?? 0), 0);
  const minutes = Math.round(steps.reduce((a, s) => a + (s.minutes ?? 0), 0) + (questions * targetSec) / 60);
  return { steps, questions, minutes };
}

/* ----------------------------------------------------------------- trends */

/**
 * Weekly accuracy of a set of answers over the last WEEKS weeks, plus:
 *   firstAccuracy -> lastAccuracy, deltaPts   first and last week with >= 5 answers
 *   previousAccuracy -> recentAccuracy, recentDelta   days 15-28 vs the last 14 days (>= 5 answers each)
 *   direction   up / down when the recent change is 8 points or more, else flat (null: not enough data)
 */
function trendOf(answers, now, tzMin) {
  const keys = [];
  for (let i = WEEKS - 1; i >= 0; i -= 1) keys.push(weekKey(new Date(now.getTime() - i * 7 * DAY), tzMin));
  const byWeek = new Map(keys.map((k) => [k, []]));
  const recent = [];
  const previous = [];
  for (const a of answers) {
    const k = weekKey(a.at, tzMin);
    if (byWeek.has(k)) byWeek.get(k).push(a);
    const age = now - a.at;
    if (age < 14 * DAY) recent.push(a);
    else if (age < 28 * DAY) previous.push(a);
  }
  const weeks = keys.map((k) => {
    const g = groupStats(byWeek.get(k));
    return { week: k, answered: g.answered, accuracyPct: g.answered >= 3 ? g.accuracyPct : null };
  });
  const solid = weeks.filter((w) => w.answered >= MIN_ANSWERS && w.accuracyPct != null);
  const first = solid[0];
  const last = solid[solid.length - 1];
  const r = recent.length >= MIN_ANSWERS ? groupStats(recent).accuracyPct : null;
  const p = previous.length >= MIN_ANSWERS ? groupStats(previous).accuracyPct : null;
  const recentDelta = r != null && p != null ? r - p : null;
  const deltaPts = solid.length >= 2 ? last.accuracyPct - first.accuracyPct : null;
  const change = recentDelta ?? deltaPts;
  return {
    weeks,
    firstAccuracy: solid.length >= 2 ? first.accuracyPct : null,
    lastAccuracy: solid.length >= 2 ? last.accuracyPct : null,
    deltaPts,
    previousAccuracy: p,
    recentAccuracy: r,
    recentDelta,
    direction: change == null ? null : change >= 8 ? 'up' : change <= -8 ? 'down' : 'flat',
  };
}

/** This calendar month against the last one (student's local time), overall and per chapter. */
function monthReport(answers, now, tzMin, titleOf) {
  const thisKey = monthKey(now, tzMin);
  const d = new Date(now.getTime() + tzMin * 60_000);
  const lastKey = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1)).toISOString().slice(0, 7);
  const cur = [];
  const prev = [];
  for (const a of answers) {
    const k = monthKey(a.at, tzMin);
    if (k === thisKey) cur.push(a);
    else if (k === lastKey) prev.push(a);
  }
  const c = groupStats(cur);
  const p = groupStats(prev);
  const chapters = new Map();
  for (const [list, side] of [[cur, 'cur'], [prev, 'prev']]) {
    for (const a of list) {
      const x = chapters.get(a.topic) || { cur: [], prev: [] };
      x[side].push(a);
      chapters.set(a.topic, x);
    }
  }
  const changes = [];
  for (const [topic, x] of chapters) {
    if (x.cur.length < MIN_ANSWERS || x.prev.length < MIN_ANSWERS) continue;
    const from = groupStats(x.prev).accuracyPct;
    const to = groupStats(x.cur).accuracyPct;
    changes.push({ topic, title: titleOf(topic), from, to, deltaPts: to - from });
  }
  changes.sort((a, b) => b.deltaPts - a.deltaPts);
  const best = changes[0]?.deltaPts > 0 ? changes[0] : null;
  const worst = changes.length && changes[changes.length - 1].deltaPts < 0 ? changes[changes.length - 1] : null;
  return {
    month: thisKey,
    attempted: c.answered,
    accuracyPct: c.accuracyPct,
    lastMonth: { month: lastKey, attempted: p.answered, accuracyPct: p.accuracyPct },
    deltaPts: c.answered >= MIN_ANSWERS && p.answered >= MIN_ANSWERS ? c.accuracyPct - p.accuracyPct : null,
    strongestImprovement: best,
    needsAttention: worst,
  };
}

/* ----------------------------------------------------------------- concept levels */

/**
 * Accuracy per sub-topic (topic level) or pattern (skill level) inside a chapter, weakest first.
 * `hidden` marks a weakness the chapter number hides: >= 5 answers and 20+ points below the chapter.
 */
function conceptBreakdown(answers, field, chapterAccuracy, nameOf) {
  const groups = new Map();
  for (const a of answers) {
    const k = a[field];
    if (!k) continue;
    if (!groups.has(k)) groups.set(k, []);
    const g = groups.get(k);
    if (g.length < RECENT) g.push(a);
  }
  return [...groups.entries()]
    .map(([key, list]) => {
      const g = groupStats(list);
      return {
        key,
        name: nameOf(key),
        ...g,
        hidden: g.answered >= MIN_ANSWERS && chapterAccuracy != null && g.accuracyPct <= chapterAccuracy - 20,
      };
    })
    .sort((a, b) => (a.answered >= 3) === (b.answered >= 3) ? a.accuracyPct - b.accuracyPct || b.answered - a.answered : a.answered >= 3 ? -1 : 1);
}

function difficultyBreakdown(answers) {
  const out = { EASY: [], MEDIUM: [], HARD: [] };
  for (const a of answers) out[bandOf(a.difficulty ?? 3)].push(a);
  return Object.fromEntries(Object.entries(out).map(([b, list]) => [b, groupStats(list)]));
}

/* ----------------------------------------------------------------- skips */

/**
 * Skip analysis of one subject. `skips` = mergeSkips() values with each event's likely reason
 * already set (`reason`, or the student's own `ownReason`).
 *   byChapter   skipped questions, skip events, open skips, average time before skipping, reasons
 *   patterns    "You skipped 8 Time & Work questions in the last 3 tests" (>= 3), or 4+ in 30 days
 */
function skipAnalysis(skips, now, titleOf) {
  const byChapter = new Map();
  const lastTests = new Map();
  const last30 = new Map();
  for (const s of skips) {
    const c = byChapter.get(s.topic) || { topic: s.topic, title: titleOf(s.topic), questions: 0, open: 0, events: 0, timeSum: 0, timeN: 0, reasons: {}, difficulty: { EASY: 0, MEDIUM: 0, HARD: 0 } };
    c.questions += 1;
    if (s.open) c.open += 1;
    c.events += s.count;
    c.difficulty[bandOf(s.difficulty ?? 3)] += 1;
    const reason = s.ownReason ?? s.reason;
    c.reasons[reason] = (c.reasons[reason] || 0) + 1;
    for (const e of s.events) {
      if (e.timeSec != null) {
        c.timeSum += e.timeSec;
        c.timeN += 1;
      }
      if (e.testIndex != null && e.testIndex < 3) lastTests.set(s.topic, (lastTests.get(s.topic) || 0) + 1);
      if (now - e.at < 30 * DAY) last30.set(s.topic, (last30.get(s.topic) || 0) + e.count);
    }
    byChapter.set(s.topic, c);
  }
  const chapters = [...byChapter.values()]
    .map(({ timeSum, timeN, ...c }) => ({ ...c, avgTimeSec: timeN ? Math.round(timeSum / timeN) : null, topReason: Object.entries(c.reasons).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null }))
    .sort((a, b) => b.open - a.open || b.events - a.events);
  const patterns = [];
  for (const [topic, n] of lastTests) if (n >= 3) patterns.push({ kind: 'last_tests', topic, title: titleOf(topic), count: n, tests: 3 });
  for (const [topic, n] of last30) {
    if (n >= 4 && !patterns.some((p) => p.topic === topic)) patterns.push({ kind: 'last_30_days', topic, title: titleOf(topic), count: n });
  }
  patterns.sort((a, b) => b.count - a.count);
  return { chapters, patterns: patterns.map((p) => ({ ...p, action: { revise: true, practice: 10 } })) };
}

/* ----------------------------------------------------------------- chapters */

/**
 * Everything about one chapter. `input`:
 *   answers   this chapter's answers, newest first [{qid, correct, at, timeSec, source, difficulty, pattern, subtopic, pyq}]
 *   skips     this chapter's merged skips
 *   mistakes  this chapter's mistake items [{status, wrong_count, reviews, last_wrong_at}]
 *   available published questions in the bank; pyq { total, solved }; study (ChapterStudy) ; hasLesson; priority
 */
function analyseChapter(input, { now, tzMin, targetSec, subject }) {
  const { topic, title, answers, skips, mistakes, available, pyq, study, hasLesson, priority } = input;
  const recent = answers.slice(0, RECENT);
  const hard = recent.filter((a) => (a.difficulty ?? 3) >= 4);
  const all = groupStats(answers);
  const unique = new Set(answers.map((a) => a.qid)).size;
  const practiceGoal = Math.max(1, Math.min(available || PRACTICE_GOAL, PRACTICE_GOAL));
  const practicePct = available ? Math.min(100, pct(unique, practiceGoal)) : 0;
  const readingPct = hasLesson ? (study?.sections_total ? Math.min(100, pct(study.sections_read.length, study.sections_total)) : 0) : null;
  const pyqPct = pyq?.total ? pct(pyq.solved, pyq.total) : null;
  const mistakeItems = mistakes.length;
  const revised = mistakes.filter((m) => m.reviews > 0 || m.status === 'mastered').length;
  const revisionPct = mistakeItems ? pct(revised, mistakeItems) : null;
  const openMistakes = mistakes.filter((m) => m.status === 'active').length;
  const repeatedMistakes = mistakes.filter((m) => m.status === 'active' && m.wrong_count >= 2).length;
  const recentAccuracy = recent.length >= MIN_ANSWERS ? groupStats(recent).accuracyPct : null;
  const hardAccuracy = hard.length >= 3 ? groupStats(hard).accuracyPct : null;

  const lastAnswerAt = answers[0]?.at ?? null;
  const reviewAt = answers.find((a) => a.source === 'review')?.at ?? null;
  const lastRevisedAt = [reviewAt, study?.last_revised_at ?? null].filter(Boolean).sort((a, b) => b - a)[0] ?? null;
  const lastTouchedAt = [lastAnswerAt, lastRevisedAt, study?.last_read_at ?? null].filter(Boolean).sort((a, b) => b - a)[0] ?? null;
  const daysSinceActivity = lastAnswerAt ? daysBetween(lastAnswerAt, now) : null;
  const daysSinceTouched = lastTouchedAt ? daysBetween(lastTouchedAt, now) : null;
  const daysSinceRevision = lastRevisedAt ? daysBetween(lastRevisedAt, now) : null;

  const skipped = skips.reduce((a, s) => a + s.count, 0);
  const openSkips = skips.filter((s) => s.open).length;
  const trend = trendOf(answers, now, tzMin);
  const mastery = masteryPct({ answers: answers.length, recentAccuracy, hardAccuracy, practicePct, pyqPct, daysSinceActivity });

  // Time: reading and re-reading from the chapter page; solving from the answers themselves.
  const time = { readSec: study?.read_sec ?? 0, reviseSec: study?.revise_sec ?? 0, practiceSec: 0, mistakesSec: 0 };
  let timedN = 0;
  let timedSum = 0;
  for (const a of answers) {
    const s = secOf(a);
    if (a.source === 'review') time.mistakesSec += s;
    else time.practiceSec += s;
    if (s) {
      timedN += 1;
      timedSum += s;
    }
  }
  time.totalSec = time.readSec + time.reviseSec + time.practiceSec + time.mistakesSec;
  time.avgSecPerQuestion = timedN ? Math.round(timedSum / timedN) : null;
  time.targetSec = targetSec;

  const c = {
    topic,
    title,
    area: areaOf(subject, topic),
    priority: priority ?? null,
    answers: all.answered,
    correct: all.correct,
    wrong: all.wrong,
    unique,
    available: available ?? 0,
    remaining: Math.max(0, (available ?? 0) - unique),
    practiceGoal,
    skipped,
    openSkips,
    openMistakes,
    repeatedMistakes,
    mistakesMade: mistakeItems,
    recentAccuracy,
    hardAccuracy,
    readingPct,
    practicePct,
    pyqPct,
    pyqSolved: pyq?.solved ?? 0,
    pyqTotal: pyq?.total ?? 0,
    revisionPct,
    mastery,
    trend,
    lastActivityAt: lastTouchedAt,
    lastRevisedAt,
    daysSinceTouched,
    daysSinceRevision,
    time,
  };
  const focus = focusScore(c);
  const interval = revisionIntervalDays(mastery);
  const nextRevisionAt = lastTouchedAt && all.answered ? new Date(lastTouchedAt.getTime() + interval * DAY) : null;
  const complete = (readingPct == null || readingPct >= 100) && practicePct >= 100 && (pyqPct == null || pyqPct >= 60) && mastery != null && mastery >= 70;
  return {
    ...c,
    progress: { reading: readingPct, practice: practicePct, pyq: pyqPct, revision: revisionPct, accuracy: recentAccuracy, mastery },
    // Read it all but not mastered: the gap the student must not mistake for "finished".
    readingMasteryGap: readingPct != null && readingPct >= 80 && (mastery == null || mastery < 70),
    complete,
    started: focus.band !== 'not_started' || (readingPct ?? 0) > 0,
    focus: { score: focus.score, band: focus.band, parts: focus.parts },
    why: whyReasons(c, focus),
    plan: actionPlan(c, { targetSec }),
    revision: { intervalDays: interval, nextAt: nextRevisionAt, due: Boolean(nextRevisionAt && nextRevisionAt <= now) },
    difficulty: difficultyBreakdown(recent),
  };
}

/* ----------------------------------------------------------------- smart quiz */

/**
 * How many questions each chapter gets in a Smart Quiz. NOT equal shares:
 *   focus share   chapters that need work, in proportion to their focus score, plus a bonus for
 *                 wrong / skipped questions in the latest test (+0.1 each, max +0.5)
 *   retention     10% (at least 1 when there are strong chapters) for strong chapters,
 *                 the longest-untouched first, so strong knowledge is kept
 * Chapters never get more than they have (`available`); the rest moves to the others.
 * @param {Array<{topic, focus:{score, band}, available, daysSinceTouched?, latestWrong?, latestSkipped?}>} chapters
 * @returns {Array<{topic, count, role: 'focus'|'retention', reasons: string[]}>}
 */
function smartQuizPlan(chapters, count) {
  const usable = chapters.filter((c) => c.available > 0);
  const strong = usable.filter((c) => c.focus.band === 'strong').sort((a, b) => (b.daysSinceTouched ?? 0) - (a.daysSinceTouched ?? 0));
  let focus = usable.filter((c) => ['high', 'medium', 'low'].includes(c.focus.band));
  if (!focus.length) focus = usable.filter((c) => c.focus.band === 'not_started').slice(0, 3);
  const retention = strong.length && focus.length ? Math.max(1, Math.round(count * 0.1)) : 0;
  const out = new Map();
  const give = (c, n, role, reasons) => {
    const cur = out.get(c.topic) || { topic: c.topic, count: 0, role, reasons };
    const add = Math.min(n, c.available - cur.count);
    cur.count += add;
    out.set(c.topic, cur);
    return add;
  };
  // Retention first (round-robin over strong chapters).
  let left = retention;
  for (let i = 0; left > 0 && strong.length && i < retention * 2; i += 1) left -= give(strong[i % strong.length], 1, 'retention', ['retention']);
  // Focus share by weight, repeated while capped chapters free up room.
  let rest = count - (retention - left);
  const pool = focus.length ? focus : strong;
  const weight = (c) => Math.max(1, c.focus.score) / 100 + Math.min(0.5, 0.1 * ((c.latestWrong || 0) + (c.latestSkipped || 0)));
  const reasonsOf = (c) => {
    const r = [`focus:${c.focus.score}`];
    if (c.latestWrong) r.push(`latest_wrong:${c.latestWrong}`);
    if (c.latestSkipped) r.push(`latest_skipped:${c.latestSkipped}`);
    if (c.openMistakes) r.push(`mistakes:${c.openMistakes}`);
    if (c.openSkips) r.push(`skipped:${c.openSkips}`);
    if (c.focus.band === 'not_started') r.push('new');
    return r;
  };
  for (let guard = 0; rest > 0 && guard < 10; guard += 1) {
    const open = pool.filter((c) => (out.get(c.topic)?.count ?? 0) < c.available);
    if (!open.length) break;
    const total = open.reduce((a, c) => a + weight(c), 0);
    const exact = open.map((c) => ({ c, x: (rest * weight(c)) / total }));
    const floors = exact.map((e) => ({ ...e, n: Math.floor(e.x), rem: e.x - Math.floor(e.x) }));
    let spare = rest - floors.reduce((a, e) => a + e.n, 0);
    for (const e of [...floors].sort((a, b) => b.rem - a.rem)) {
      if (spare <= 0) break;
      e.n += 1;
      spare -= 1;
    }
    let given = 0;
    for (const e of floors) if (e.n) given += give(e.c, e.n, 'focus', reasonsOf(e.c));
    rest -= given;
    if (!given) break;
  }
  return [...out.values()].filter((p) => p.count > 0).sort((a, b) => (a.role === b.role ? b.count - a.count : a.role === 'focus' ? -1 : 1));
}

/* ----------------------------------------------------------------- subject */

/** Subject-level numbers and the ranked focus list. */
function subjectSummary(chapters, answers) {
  const started = chapters.filter((c) => c.started);
  const withMastery = started.filter((c) => c.mastery != null);
  const recent = answers.slice(0, 200);
  return {
    chapters: chapters.length,
    started: started.length,
    masteryPct: withMastery.length ? Math.round(withMastery.reduce((a, c) => a + c.mastery, 0) / withMastery.length) : null,
    syllabusMasteryPct: chapters.length ? Math.round(chapters.reduce((a, c) => a + (c.mastery ?? 0), 0) / chapters.length) : 0,
    accuracyPct: recent.length >= MIN_ANSWERS ? groupStats(recent).accuracyPct : null,
    answered: answers.length,
    weakChapters: chapters.filter((c) => c.focus.band === 'high').length,
    incompleteChapters: started.filter((c) => !c.complete).length,
    strongChapters: chapters.filter((c) => c.focus.band === 'strong').length,
    openMistakes: chapters.reduce((a, c) => a + c.openMistakes, 0),
    openSkips: chapters.reduce((a, c) => a + c.openSkips, 0),
    revisionDue: chapters.filter((c) => c.revision.due).length,
    totalSec: chapters.reduce((a, c) => a + c.time.totalSec, 0),
  };
}

/** Areas (English: grammar / vocabulary / reading / application), weakest first. */
function areaSummary(subject, chapters, answersByTopic) {
  return (SUBJECT_CONFIG[subject]?.areas ?? []).map((a) => {
    const list = a.topics.flatMap((t) => (answersByTopic.get(t) || []).slice(0, RECENT));
    const g = groupStats(list);
    const inArea = chapters.filter((c) => a.topics.includes(c.topic));
    const weakest = inArea.filter((c) => c.recentAccuracy != null).sort((x, y) => x.recentAccuracy - y.recentAccuracy)[0];
    return {
      key: a.key,
      answered: g.answered,
      accuracyPct: g.answered >= MIN_ANSWERS ? g.accuracyPct : null,
      chapters: inArea.length,
      weakestTopic: weakest ? { topic: weakest.topic, title: weakest.title, accuracy: weakest.recentAccuracy } : null,
    };
  }).sort((x, y) => (x.accuracyPct ?? 101) - (y.accuracyPct ?? 101));
}

/** Ordered study list: what to study now (high, then medium, then due revisions), with the next task. */
function focusList(chapters) {
  const rank = { high: 0, medium: 1, low: 2, strong: 3, not_started: 4 };
  return [...chapters]
    .filter((c) => c.started)
    .sort((a, b) => rank[a.focus.band] - rank[b.focus.band] || b.focus.score - a.focus.score);
}

module.exports = {
  SUBJECT_CONFIG,
  ANALYSIS_SUBJECTS,
  FOCUS_WEIGHTS,
  RECENT,
  MIN_ANSWERS,
  PRACTICE_GOAL,
  areaOf,
  weekKey,
  monthKey,
  masteryPct,
  revisionIntervalDays,
  focusScore,
  whyReasons,
  actionPlan,
  trendOf,
  monthReport,
  conceptBreakdown,
  difficultyBreakdown,
  skipAnalysis,
  analyseChapter,
  smartQuizPlan,
  subjectSummary,
  areaSummary,
  focusList,
  groupStats,
};
