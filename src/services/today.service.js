'use strict';

/**
 * F3 — the ONE "Today's Study" engine.
 *
 * Student problem (STUDENT_AUDIT_REPORT §6.2): the home page built one
 * "today's plan" (revision + challenge + weakest pattern + daily goal) while
 * /plan built another from the plan day's tasks, and the two disagreed. This
 * service is now the single server-side source for "what should I study
 * today?": the home page renders exactly this list, with its first item
 * behind the one "Continue Studying" button. No second planner exists —
 * the plan generators, the review queue, insights and the F2 syllabus map
 * are INPUTS here, never competing outputs.
 *
 * Priority order (the audit's order):
 *   1. required overdue revision   — review items already due (oldest first
 *                                     in the queue itself)
 *   2. current plan task           — if the student is on the Clerkship or
 *                                     IDO plan, today's remaining required
 *                                     tasks of their current plan day; the
 *                                     recommendation RESPECTS the plan
 *   3. weak high-priority topic    — a weak/improving chapter of the target
 *                                     exam (F2 priority breaks the tie); for a
 *                                     student without that history yet, a
 *                                     "start here" chapter from their F7
 *                                     starting-level diagnostic
 *   4. unfinished high-priority    — the next not-started / in-progress
 *      learning content               in-syllabus chapter: learn, then
 *                                     practise it
 *   5. PYQ practice                — the exam's PYQ-heaviest subject
 *   6. GK daily set                — today's facts, when GS is in scope
 *   7. general practice            — the daily answer goal (platform
 *                                     default 30, same as the FE default)
 *
 * F7 starting signal: a completed diagnostic (diagnostic.service
 * startingSignal) only fills gaps in the student's own data. It is used
 * for 30 days, and per chapter only while the student has fewer than
 * OWN_DATA_MIN answers of their own there. "Start here" chapters can supply
 * the weak pick when real mastery has none; "looks solid" chapters move to
 * the back of the unfinished-learning queue. It never overrides real data.
 *
 * De-duplication: a chapter already covered by today's plan tasks is not
 * repeated as the weak/unfinished pick; plan revise/spaced/GK tasks are
 * dropped when the engine's own revision/GK items cover the same work.
 *
 * Budget: when the student set a daily study time (F1 profile field), the
 * list is trimmed IN PRIORITY ORDER to fit it (the first item is always
 * kept); `trimmedCount` says how many items were held back. The list is
 * also capped at MAX_ITEMS so "today" stays a list, not a catalogue.
 *
 * Plan-day rule is the frontend's own rule, ported 1:1 (lib/studyPlan.js):
 * a day opens only when every required task of the days before it is done,
 * and never before its calendar date — a student who missed days resumes
 * where they stopped.
 */

const { ReviewItem, User } = require('../models');
const review = require('./review.service');
const insights = require('./insights.service');
const studyPlan = require('./studyPlan.service');
const idoPlan = require('./idoPlan.service');
const syllabusMap = require('./syllabusMap.service');
const gk = require('./gk.service');
const { topicName, subjectName } = require('./catalogNames');
const diagnostic = require('./diagnostic.service');
const { OWN_DATA_MIN } = require('./diagnostic.logic');

const t = (en, bn) => ({ en, bn });
const bnD = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

const MAX_ITEMS = 6;
const DAILY_GOAL = 30; // platform default — mirrors the FE useStudyProgress default
const PLAN_TASK_LIMIT = 3;

// ------------------------------------------------------------ date helpers

/** The student's local calendar date (YYYY-MM-DD) for a tz in minutes east of UTC. */
function localIsoDate(tz = 330, now = new Date()) {
  return new Date(now.getTime() + tz * 60_000).toISOString().slice(0, 10);
}

function startOfLocalDay(tz = 330, now = new Date()) {
  const shifted = new Date(now.getTime() + tz * 60_000);
  return new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) - tz * 60_000);
}

/** 1-based day number of `todayIso` counting from `startDate` (both YYYY-MM-DD). */
function dayNumber(startDate, todayIso) {
  const toUtc = (s) => Date.UTC(...s.split('-').map((n, i) => (i === 1 ? Number(n) - 1 : Number(n))));
  return Math.floor((toUtc(todayIso) - toUtc(startDate)) / 86_400_000) + 1;
}

const requiredTasks = (day) => (day?.tasks ?? []).filter((x) => !x.optional && x.kind !== 'rest');

/** Port of the FE currentPlanDay — see the header note. */
function currentPlanDay(days, done, calendarDay) {
  const cap = Math.min(Math.max(calendarDay, 1), days.length);
  for (let n = 1; n < cap; n += 1) {
    if (requiredTasks(days[n - 1]).some((x) => !done.has(x.id))) return n;
  }
  return cap;
}

// ------------------------------------------------------------ plan input

function planBlock(planObj, progress, code, route, tz) {
  const done = new Set(progress.done ?? []);
  const calendarDay = dayNumber(progress.startDate, localIsoDate(tz));
  const day = currentPlanDay(planObj.days, done, calendarDay);
  const dayObj = planObj.days[day - 1];
  const remaining = requiredTasks(dayObj).filter((x) => !done.has(x.id));
  return {
    code,
    route,
    day,
    total: planObj.days.length,
    dayTitle: dayObj?.title ?? null,
    remaining,
    dayDone: remaining.length === 0,
  };
}

/** The plan the student is actually on (Clerkship first, then IDO), or null. */
async function currentPlan(userId, tz) {
  const cp = await studyPlan.getProgress(userId).catch(() => null);
  if (cp?.startDate) return planBlock(studyPlan.getPlan(cp.budget), cp, 'WBPSC_CLERKSHIP', '/plan', tz);
  const ip = await idoPlan.getProgress(userId).catch(() => null);
  if (ip?.startDate) return planBlock(idoPlan.getPlan(ip.days ?? 60, ip.budget), ip, 'WBPSC_IDO', '/plan/ido', tz);
  return null;
}

// ------------------------------------------------------------ top priorities

const PRIORITY_COUNT = 3;
const STAGE_DONE = new Set(['strong', 'mastered']);

/**
 * Phase 12 — the home page's "Top 3 Priorities": the chapters most worth the
 * student's time, from the same inputs as the Today list (F2 syllabus map,
 * F9 unified mastery, F7 starting signal). Pure, so it is unit-testable.
 *
 *   bucket 0  needs work: measured and under 50% right, or a "start here"
 *             chapter of a recent starting-level check
 *   bucket 1  practising / developing (enough answers, not yet strong)
 *   bucket 2  in the syllabus but not started / just started
 *   strong and mastered chapters are never a priority
 * Inside a bucket: the exam's priority (high first), then its weight, then
 * the lower accuracy. One chapter per subject first, so three priorities
 * are not three chapters of the same subject while others need work.
 * Without a target exam (no map) only measured chapters are considered.
 */
function buildTopPriorities({ chapters, mastery, diagWeak = [], prioRank }) {
  const key = (x) => `${x.subject}.${x.topic}`;
  const mByKey = new Map(mastery.map((m) => [key(m), m]));
  const diagKeys = new Set(diagWeak.map(key));
  const pool = chapters.length
    ? chapters.filter((c) => c.syllabus === 'in').map((c) => ({ c, m: mByKey.get(key(c)) }))
    : mastery.filter((m) => m.stage && m.stage !== 'not_started').map((m) => ({ c: { subject: m.subject, topic: m.topic, priority: null, weight: null }, m }));

  const rows = [];
  for (const { c, m } of pool) {
    const stage = m?.stage ?? c.mastery?.stage ?? 'not_started';
    if (STAGE_DONE.has(stage)) continue;
    const accuracy = m?.accuracyPct ?? null;
    const measured = (m?.recentAnswers ?? 0) >= 5;
    let bucket;
    if ((measured && accuracy != null && accuracy < 50) || diagKeys.has(key(c))) bucket = 0;
    else if (stage === 'practising' || stage === 'developing') bucket = 1;
    else bucket = 2;
    if (bucket === 2 && !chapters.length) continue;
    rows.push({ subject: c.subject, topic: c.topic, stage, accuracy, priority: c.priority ?? null, weight: c.weight ?? null, hasLesson: Boolean(c.hasLesson), bucket, fromDiagnostic: diagKeys.has(key(c)) && !(measured && accuracy < 50) });
  }
  rows.sort((a, b) => a.bucket - b.bucket
    || (prioRank[a.priority] ?? 3) - (prioRank[b.priority] ?? 3)
    || (b.weight ?? -1) - (a.weight ?? -1)
    || (a.accuracy ?? 101) - (b.accuracy ?? 101));

  const picked = [];
  const seenSubjects = new Set();
  for (const r of rows) {
    if (picked.length >= PRIORITY_COUNT) break;
    if (seenSubjects.has(r.subject)) continue;
    picked.push(r);
    seenSubjects.add(r.subject);
  }
  for (const r of rows) {
    if (picked.length >= PRIORITY_COUNT) break;
    if (!picked.includes(r)) picked.push(r);
  }

  return picked.map((r) => {
    const name = topicName(r.subject, r.topic);
    let reason;
    if (r.bucket === 0 && r.fromDiagnostic) reason = t('Your starting check: a good place to begin', 'তোমার শুরুর পরীক্ষা: শুরু করার ভালো জায়গা');
    else if (r.bucket === 0) reason = t(`${r.accuracy}% right so far — needs work`, `এখন পর্যন্ত ${bnD(r.accuracy)}% ঠিক — আরও অনুশীলন দরকার`);
    else if (r.bucket === 1) reason = t('Developing — keep practising', 'উন্নতি হচ্ছে — অনুশীলন চালিয়ে যাও');
    else if (r.priority === 'high') reason = t('High priority in your exam, not started yet', 'তোমার পরীক্ষায় উচ্চ অগ্রাধিকার, এখনও শুরু হয়নি');
    else reason = t('In your syllabus, not started yet', 'তোমার সিলেবাসে আছে, এখনও শুরু হয়নি');
    return {
      subject: r.subject,
      topic: r.topic,
      name,
      subjectName: subjectName(r.subject),
      stage: r.stage,
      accuracy: r.accuracy,
      priority: r.priority,
      // Not started and a lesson exists: learn first; otherwise practise.
      action: r.bucket === 2 && r.hasLesson ? 'learn' : 'practice',
      reason,
    };
  });
}

// ------------------------------------------------------------ the engine

async function getToday(userId, { tz = 330 } = {}) {
  const user = await User.findById(userId).select('daily_study_minutes target_exam').lean();
  // The User schema stores the target exam as the plain code string.
  const examCode = typeof user?.target_exam === 'string' ? user.target_exam : user?.target_exam?.code ?? null;

  const [rev, ins, plan, map, diag] = await Promise.all([
    review.summary(userId, { tz }).catch(() => null),
    insights.getInsights(userId, tz).catch(() => null),
    currentPlan(userId, tz),
    examCode ? syllabusMap.getSyllabusMap(userId, examCode).catch(() => null) : null,
    examCode ? diagnostic.startingSignal(userId, examCode).catch(() => null) : null,
  ]);

  const overdue = rev?.dueToday
    ? await ReviewItem.countDocuments({ user_id: userId, status: 'active', due_at: { $lt: startOfLocalDay(tz) } }).catch(() => 0)
    : 0;

  const chapters = map ? map.subjects.flatMap((s) => s.chapters.map((c) => ({ ...c, subject: s.subject }))) : [];
  const chapterOf = new Map(chapters.map((c) => [`${c.subject}.${c.topic}`, c]));
  const planChapters = new Set(
    (plan?.remaining ?? []).filter((x) => x.subject && x.topic).map((x) => `${x.subject}.${x.topic}`),
  );
  const planKinds = new Set((plan?.remaining ?? []).map((x) => x.kind));

  // F7: diagnostic chapters still worth reading: the student has too few
  // answers of their own there, and the chapter is not out of syllabus.
  const keyOf = (x) => `${x.subject}.${x.topic}`;
  const ownAnswers = new Map((ins?.mastery ?? []).map((m) => [keyOf(m), m.answers ?? 0]));
  const usableDiag = (x) => (ownAnswers.get(keyOf(x)) ?? 0) < OWN_DATA_MIN && chapterOf.get(keyOf(x))?.syllabus !== 'out';
  const diagWeak = (diag?.weak ?? []).filter(usableDiag);
  const diagStrong = new Set((diag?.strong ?? []).filter(usableDiag).map(keyOf));
  let diagUsed = false;

  const items = [];
  const push = (item) => items.push({ id: `today-${items.length + 1}`, minutes: 15, ...item });

  // 1 — required overdue revision (anything already due rides in the same item).
  if (rev?.dueToday > 0) {
    push({
      kind: 'revise',
      source: overdue > 0 ? 'overdue_revision' : 'revision_due',
      title: t(
        overdue > 0 ? `Revise ${rev.dueToday} due questions (${overdue} overdue)` : `Revise ${rev.dueToday} questions due today`,
        overdue > 0 ? `বাকি ${bnD(rev.dueToday)}টি প্রশ্ন রিভিশন করো (${bnD(overdue)}টি মেয়াদোত্তীর্ণ)` : `আজ বাকি ${bnD(rev.dueToday)}টি প্রশ্ন রিভিশন করো`,
      ),
      count: rev.dueToday,
      overdue,
      minutes: Math.min(30, Math.max(5, rev.dueToday * 2)),
    });
  }

  // 2 — the plan's own tasks for the current day (the plan is respected,
  // never re-planned). Revise/spaced/GK plan tasks are the same work as the
  // engine's revision/GK items, so they are not listed twice.
  if (plan && !plan.dayDone) {
    const covered = new Set();
    if (rev?.dueToday > 0) { covered.add('revise'); covered.add('spaced'); }
    let added = 0;
    for (const task of plan.remaining) {
      if (added >= PLAN_TASK_LIMIT) break;
      if (covered.has(task.kind)) continue;
      push({
        kind: 'plan',
        source: 'plan',
        planKind: task.kind,
        day: plan.day,
        task,
        subject: task.subject ?? null,
        topic: task.topic ?? null,
        title: task.title ?? task.name ?? t(`Plan day ${plan.day}`, `প্ল্যানের দিন ${bnD(plan.day)}`),
        minutes: task.minutes > 0 ? task.minutes : 15,
      });
      added += 1;
    }
  }

  // 3 — weak high-priority topic (mastery weak first, then improving;
  // the F2 priority of the chapter breaks ties toward the exam's weight).
  const prioRank = { high: 0, medium: 1, low: 2 };
  const weakRows = (ins?.mastery ?? [])
    .filter((m) => (m.status === 'weak' || m.status === 'improving') && !planChapters.has(`${m.subject}.${m.topic}`))
    .map((m) => ({ m, ch: chapterOf.get(`${m.subject}.${m.topic}`) }))
    .sort((a, b) => (a.m.status === b.m.status ? 0 : a.m.status === 'weak' ? -1 : 1)
      || ((prioRank[a.ch?.priority] ?? 3) - (prioRank[b.ch?.priority] ?? 3))
      || (a.m.accuracyPct ?? 100) - (b.m.accuracyPct ?? 100));
  const weakPick = weakRows[0] ?? null;
  if (weakPick) {
    const { m } = weakPick;
    push({
      kind: 'practice',
      source: 'weak_priority',
      subject: m.subject,
      topic: m.topic,
      title: t(`Practice — ${m.name.en}`, `অনুশীলন — ${m.name.bn ?? m.name.en}`),
      reason: t(`Your weakest chapter: ${m.accuracyPct}% accuracy so far`, `তোমার সবচেয়ে দুর্বল অধ্যায়: এখন পর্যন্ত ${bnD(m.accuracyPct)}% নির্ভুল`),
      minutes: 15,
    });
  }

  // 3b — no weak chapter in the student's own data yet: the first "start
  // here" chapter of their starting-level diagnostic (F2 priority first).
  let diagPick = null;
  if (!weakPick && diagWeak.length) {
    diagPick = diagWeak
      .filter((x) => !planChapters.has(keyOf(x)))
      .map((x) => ({ x, ch: chapterOf.get(keyOf(x)) }))
      .sort((a, b) => ((prioRank[a.ch?.priority] ?? 3) - (prioRank[b.ch?.priority] ?? 3))
        || (b.ch?.weight ?? -1) - (a.ch?.weight ?? -1)
        || (a.x.score ?? 0) - (b.x.score ?? 0))[0] ?? null;
    if (diagPick) {
      const { x, ch } = diagPick;
      const name = topicName(x.subject, x.topic);
      const learnFirst = Boolean(ch?.hasLesson);
      push({
        kind: learnFirst ? 'learn' : 'practice',
        source: 'diagnostic_start',
        subject: x.subject,
        topic: x.topic,
        title: learnFirst
          ? t(`Learn — ${name.en}`, `শেখো — ${name.bn ?? name.en}`)
          : t(`Practice — ${name.en}`, `অনুশীলন — ${name.bn ?? name.en}`),
        reason: t(
          `Your starting check: ${x.correct} of ${x.total} right here — a good place to begin`,
          `তোমার শুরুর পরীক্ষা: এখানে ${bnD(x.total)}টির মধ্যে ${bnD(x.correct)}টি ঠিক — এখান থেকে শুরু করা ভালো`,
        ),
        minutes: learnFirst ? 20 : 15,
      });
      diagUsed = true;
    }
  }

  // 4 — unfinished high-priority learning content: learn it, then practise it.
  // A chapter the starting check showed as solid waits behind the rest.
  const byPriority = (a, b) => ((prioRank[a.priority] ?? 3) - (prioRank[b.priority] ?? 3))
    || (b.pyqCount ?? 0) - (a.pyqCount ?? 0);
  const solidLast = (a, b) => Number(diagStrong.has(keyOf(a))) - Number(diagStrong.has(keyOf(b)));
  const unfinishedPool = chapters
    .filter((c) => c.syllabus === 'in'
      && (c.status === 'not_started' || c.status === 'in_progress')
      && c.hasLesson
      && !planChapters.has(`${c.subject}.${c.topic}`)
      && !(weakPick && weakPick.m.subject === c.subject && weakPick.m.topic === c.topic)
      && !(diagPick && keyOf(diagPick.x) === keyOf(c)));
  const unfinished = [...unfinishedPool].sort((a, b) => solidLast(a, b) || byPriority(a, b));
  const next = unfinished[0] ?? null;
  if (next && diagStrong.size) {
    const withoutSignal = [...unfinishedPool].sort(byPriority)[0];
    if (withoutSignal && keyOf(withoutSignal) !== keyOf(next)) diagUsed = true;
  }
  if (next) {
    const name = topicName(next.subject, next.topic);
    push({
      kind: 'learn',
      source: 'unfinished_priority',
      subject: next.subject,
      topic: next.topic,
      title: t(`Learn — ${name.en}`, `শেখো — ${name.bn ?? name.en}`),
      reason: next.priority === 'high'
        ? t('High priority in your exam syllabus', 'তোমার পরীক্ষার সিলেবাসে উচ্চ অগ্রাধিকার')
        : t('Next unfinished chapter in your syllabus', 'তোমার সিলেবাসের পরের অসমাপ্ত অধ্যায়'),
      minutes: 20,
    });
    if (next.questionCount > 0) {
      push({
        kind: 'practice',
        source: 'unfinished_priority',
        subject: next.subject,
        topic: next.topic,
        title: t(`Practice — ${name.en}`, `অনুশীলন — ${name.bn ?? name.en}`),
        minutes: 15,
      });
    }
  }

  // 5 — PYQ practice: the subject where this exam's past papers live
  // (subject PYQ totals are summed from its chapters — the F2 map carries
  // pyqCount per chapter, not per subject).
  const pyqSubject = map?.subjects
    .map((s) => ({ subject: s.subject, name: s.name, pyqCount: s.chapters.reduce((a, c) => a + (c.pyqCount ?? 0), 0) }))
    .filter((s) => s.pyqCount > 0)
    .sort((a, b) => b.pyqCount - a.pyqCount)[0] ?? null;
  if (!planKinds.has('pyq_paper') && !planKinds.has('pyq_topics')) {
    if (pyqSubject) {
      push({
        kind: 'pyq',
        source: 'pyq',
        subject: pyqSubject.subject,
        title: t(`PYQ — ${map.exam.name.en} ${pyqSubject.name.en}`, `আগের প্রশ্ন — ${map.exam.name.bn ?? map.exam.name.en} ${pyqSubject.name.bn ?? pyqSubject.name.en}`),
        minutes: 20,
      });
    } else if (!map) {
      push({ kind: 'pyq', source: 'pyq', title: t('PYQ — past papers', 'আগের প্রশ্ন — পুরনো প্রশ্নপত্র'), minutes: 20 });
    }
  }

  // 6 — GK daily set, when GS is in this exam's scope (or no exam chosen).
  const gsInScope = !map || map.subjects.some((s) => s.subject === 'gs');
  if (gsInScope && !planKinds.has('gk_revise')) {
    const set = await gk.daily(userId, { tz }).catch(() => null);
    const left = set ? set.total - set.done : 0;
    if (left > 0) {
      push({
        kind: 'gk',
        source: 'gk_daily',
        title: t(`GK — today's set (${left} facts left)`, `সাধারণ জ্ঞান — আজকের সেট (বাকি ${bnD(left)}টি তথ্য)`),
        count: left,
        minutes: 10,
      });
    }
  }

  // 7 — general practice: the daily answer goal, while it is unmet.
  const answered = ins?.today?.answered ?? 0;
  if (answered < DAILY_GOAL) {
    push({
      kind: 'general',
      source: 'daily_goal',
      title: t(`Answer ${DAILY_GOAL} questions today (${answered}/${DAILY_GOAL})`, `আজ ${bnD(DAILY_GOAL)}টি প্রশ্নের উত্তর দাও (${bnD(answered)}/${bnD(DAILY_GOAL)})`),
      count: DAILY_GOAL - answered,
      minutes: 15,
    });
  }

  const topPriorities = buildTopPriorities({ chapters, mastery: ins?.mastery ?? [], diagWeak, prioRank });

  // Budget trim, in priority order; the first item always stays.
  const budget = user?.daily_study_minutes ?? null;
  let totalMinutes = 0;
  let trimmedCount = 0;
  const kept = [];
  for (const item of items) {
    const fits = kept.length < MAX_ITEMS && (budget == null || kept.length === 0 || totalMinutes + item.minutes <= budget);
    if (fits) {
      kept.push(item);
      totalMinutes += item.minutes;
    } else {
      trimmedCount += 1;
    }
  }

  return {
    date: localIsoDate(tz),
    exam: map ? { code: map.exam.code, name: map.exam.name, category: map.category } : examCode ? { code: examCode } : null,
    plan: plan ? { code: plan.code, route: plan.route, day: plan.day, total: plan.total, dayDone: plan.dayDone } : null,
    items: kept,
    totalMinutes,
    budgetMinutes: budget,
    trimmedCount,
    primary: kept[0] ?? null,
    // Phase 12: the home page's Top 3 Priorities (see buildTopPriorities).
    topPriorities,
    // F7: whether a starting-level diagnostic shaped this list (a starting
    // signal only, see the header).
    startingSignal: diag
      ? { takenAt: new Date(diag.takenAt).toISOString(), startingMastery: diag.startingMastery, level: diag.level, used: diagUsed }
      : null,
  };
}

module.exports = { getToday, buildTopPriorities, currentPlanDay, dayNumber, localIsoDate, DAILY_GOAL };
