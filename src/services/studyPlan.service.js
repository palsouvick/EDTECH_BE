'use strict';

/**
 * The 60-day WBPSC Clerkship plan (db/plans/clerkship60.js) laid out day by day, and a
 * signed-in student's progress through it: start date, study time, exam date, ticked
 * tasks and daily/weekly test results. The layout is a pure function of the plan file and
 * the chosen study time, so every student with the same budget sees the same Day 1…60 and
 * a test can check every day. Task ids are the same for every budget (only minutes and
 * question counts scale). Guests keep progress on their device (frontend).
 */

const plan = require('../../db/plans/clerkship60');
const { loadLessons } = require('../../db/lessons');
const { StudyPlanProgress } = require('../models');
const { topicName } = require('./catalogNames');
const { cardOf } = require('./gkTaxonomy');
const AppError = require('../utils/AppError');

const t = (en, bn) => ({ en, bn });
const bnDigits = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

// ---------------------------------------------------------------- helpers

const scaler = (budget) => {
  const f = budget / plan.BASE_BUDGET;
  return {
    min: (m) => Math.max(5, Math.round((m * f) / 5) * 5),
    qs: (n) => Math.max(5, Math.round((n * f) / 5) * 5),
  };
};

/** [[topic, sessions, priority], ...] → one entry per session, numbered per chapter. */
function sessions(list, subject) {
  const totals = {};
  for (const [topic, n] of list) totals[topic] = (totals[topic] || 0) + n;
  const seen = {};
  return list.flatMap(([topic, n, priority]) => Array.from({ length: n }, () => {
    seen[topic] = (seen[topic] || 0) + 1;
    return { subject, topic, priority, session: { n: seen[topic], of: totals[topic] } };
  }));
}

let lessonIndex;
const lessonFor = (subject, topic) => {
  lessonIndex ??= new Map(loadLessons().map(({ lesson }) => [`${lesson.subject}.${lesson.topic}`, lesson]));
  return lessonIndex.get(`${subject}.${topic}`);
};

// Lesson levels covered in session n of m: 1 session → basic + intermediate; 2 → basic, then the rest.
const LEVELS_FOR = { 1: [['basic', 'intermediate']], 2: [['basic'], ['intermediate', 'advanced']], 3: [['basic'], ['intermediate'], ['advanced']] };

/** What to learn in a session: lesson section headings (Math, English) or GK subcategories. */
function learnList(subject, topic, { n, of }) {
  if (subject === 'gs') {
    const subs = Object.values(cardOf(topic)?.subtopics || {});
    const per = Math.ceil(subs.length / of);
    return subs.slice((n - 1) * per, n * per);
  }
  const lesson = lessonFor(subject, topic);
  if (!lesson) return [];
  const levels = (LEVELS_FOR[Math.min(of, 3)] || LEVELS_FOR[3])[Math.min(n, 3) - 1] || [];
  return lesson.levels.filter((l) => levels.includes(l.level)).flatMap((l) => l.sections.map((s) => s.heading)).slice(0, 8);
}

const SPLIT = {
  quant: [['concept', 0.4], ['examples', 0.2], ['practice', 0.4]],
  english: [['concept', 0.35], ['examples', 0.25], ['practice', 0.4]],
  gs: [['read', 0.6], ['practice', 0.4]],
};

function learnTask(s, phase, minutes, sc) {
  const name = topicName(s.subject, s.topic);
  const accuracy = plan.ACCURACY[phase];
  const questions = sc.qs(plan.PRACTICE[s.subject]);
  return {
    kind: 'learn',
    subject: s.subject,
    topic: s.topic,
    name,
    priority: s.priority,
    session: s.session,
    minutes,
    split: Object.fromEntries(SPLIT[s.subject].map(([k, share]) => [k, Math.max(5, Math.round((minutes * share) / 5) * 5)])),
    learn: learnList(s.subject, s.topic, s.session),
    packs: (plan.GS_PACKS[s.topic] || [])[s.session.n - 1] || [],
    questions,
    accuracyTarget: accuracy,
    outcome: t(
      `You can explain the ideas of ${name.en} and solve ${questions} practice questions with ${accuracy}%+ accuracy.`,
      `তুমি ${name.bn ?? name.en}-এর ধারণাগুলি বোঝাতে পারবে এবং ${bnDigits(questions)}টি অনুশীলন প্রশ্নে ${bnDigits(accuracy)}%+ নির্ভুলতা পাবে।`,
    ),
  };
}

const testSizes = (budget, perBlock) => {
  const n = perBlock ?? plan.DAILY_TEST[budget] ?? plan.DAILY_TEST[plan.BASE_BUDGET];
  return { quant: n, english: n, gs: n, pyq: n };
};

const phaseOf = (day) => plan.PHASES.find((p) => day >= p.from && day <= p.to);

// ---------------------------------------------------------------- layout

/** Day 1…60 for a study budget (minutes a day). */
function buildDays(budget = plan.BASE_BUDGET) {
  if (!plan.BUDGETS.includes(budget)) throw AppError.unprocessable('UNKNOWN_BUDGET', `Study time must be one of ${plan.BUDGETS.join(', ')} minutes`);
  const sc = scaler(budget);
  const queues = { gs: sessions(plan.GS, 'gs'), quant: sessions(plan.ARITHMETIC, 'quant'), english: sessions(plan.ENGLISH, 'english') };
  const learned = []; // { day, subject, topic, name }
  const days = [];
  let optional = 0;
  let paper = 0;
  let topicDay = 0;

  // Spaced revision due on a day: topics learned SPACED[i].after days earlier. Taken in turn
  // from each stage (+2, +6, +14, +29), so the long intervals are not crowded out.
  // A topic revised yesterday, or studied again today, is skipped (it is fresh); the subject that
  // goes first rotates each day so no subject's revisions are always the ones left out.
  const SPACED_MAX = 6;
  const lastRevised = new Map();
  const SUBJECT_ORDER = ['gs', 'quant', 'english'];
  const spacedFor = (day, studyingToday = []) => {
    const order = SUBJECT_ORDER.map((_, i) => SUBJECT_ORDER[(i + day) % SUBJECT_ORDER.length]);
    const fresh = (x) => (lastRevised.get(`${x.subject}.${x.topic}`) ?? -9) >= day - 1 || studyingToday.some((s) => s.subject === x.subject && s.topic === x.topic);
    const stages = plan.SPACED.map(({ after, kind }) => learned
      .filter((x) => x.day === day - after)
      .sort((a, b) => order.indexOf(a.subject) - order.indexOf(b.subject))
      .map((l) => ({ subject: l.subject, topic: l.topic, name: l.name, learnedDay: l.day, kind })));
    const items = [];
    for (let i = 0; items.length < SPACED_MAX && stages.some((s) => i < s.length); i += 1) {
      for (const s of stages) {
        const x = s[i];
        if (x && items.length < SPACED_MAX && !fresh(x) && !items.some((y) => y.subject === x.subject && y.topic === x.topic)) items.push(x);
      }
    }
    for (const x of items) lastRevised.set(`${x.subject}.${x.topic}`, day);
    return items;
  };
  const spacedTask = (day, minutes, studyingToday) => {
    const items = spacedFor(day, studyingToday);
    return items.length ? { kind: 'spaced', items, minutes, title: t('Spaced revision: topics learned earlier', 'নির্দিষ্ট ব্যবধানে রিভিশন: আগে শেখা বিষয়') } : null;
  };

  for (let day = 1; day <= plan.days; day += 1) {
    const phase = phaseOf(day);
    const tasks = [];
    let title = null;
    const weekly = plan.WEEKLY_TEST_DAYS.includes(day);

    if (weekly) {
      const week = learned.filter((l) => l.day > day - 7 && l.day < day);
      if (phase.code === 'PYQ') {
        title = t('Weekly test: full mock (exam pattern)', 'সাপ্তাহিক পরীক্ষা: পূর্ণ মক (পরীক্ষার ধাঁচে)');
        tasks.push({ kind: 'full_mock', sizes: plan.FULL_MOCK.sizes, minutes: plan.FULL_MOCK.minutes, title: t('Full mock: 100 questions in 90 minutes', 'পূর্ণ মক: ৯০ মিনিটে ১০০টি প্রশ্ন') });
      } else {
        title = t('Weekly test day: no new chapter', 'সাপ্তাহিক পরীক্ষার দিন: নতুন অধ্যায় নেই');
        tasks.push({
          kind: 'weekly_test',
          sizes: testSizes(budget, sc.qs(15)),
          topics: week.map(({ subject, topic }) => ({ subject, topic })),
          minutes: sc.min(60),
          title: t("Weekly test: everything from this week", 'সাপ্তাহিক পরীক্ষা: এই সপ্তাহের সব'),
        });
      }
      tasks.push({ kind: 'mistakes', minutes: sc.min(30), title: t("Go through this week's mistakes", 'এই সপ্তাহের ভুলগুলি দেখে নাও') });
      const sp = spacedTask(day, sc.min(15));
      if (sp) tasks.push(sp);
      const extra = plan.GS_OPTIONAL[optional++ % plan.GS_OPTIONAL.length];
      tasks.push({ kind: 'learn', subject: 'gs', topic: extra, name: topicName('gs', extra), priority: null, optional: true, minutes: sc.min(20), learn: learnList('gs', extra, { n: 1, of: 1 }), packs: [] });
    } else if (phase.code === 'FOUNDATION' || phase.code === 'CORE') {
      const m = plan.BLOCKS[phase.code];
      const today = [];
      for (const subject of ['gs', 'quant', 'english']) {
        const s = queues[subject].shift();
        if (s) {
          tasks.push(learnTask(s, phase.code, sc.min(m[subject]), sc));
          today.push(s);
        } else if (subject === 'quant') {
          tasks.push({ kind: 'mistakes', subject: 'quant', minutes: sc.min(m.quant), title: t('Arithmetic: mixed practice and your wrong answers', 'পাটিগণিত: মিশ্র অনুশীলন ও তোমার ভুল উত্তর') });
        }
      }
      const sp = spacedTask(day, sc.min(m.spaced), today);
      const testTopics = [...today, ...(sp?.items || []).filter((i) => i.kind === 'test')].map(({ subject, topic }) => ({ subject, topic }));
      tasks.push({ kind: 'daily_test', sizes: testSizes(budget), topics: testTopics, minutes: sc.min(m.test), title: t("Today's test: Math, English, GS and real PYQs", 'আজকের পরীক্ষা: গণিত, ইংরেজি, সাধারণ পাঠ ও আসল আগের প্রশ্ন') });
      tasks.push(sp ?? { kind: 'revise', minutes: sc.min(m.spaced), title: t('Revision: questions due today', 'রিভিশন: আজকের বাকি প্রশ্ন') });
      for (const s of today) learned.push({ day, subject: s.subject, topic: s.topic, name: topicName(s.subject, s.topic) });
    } else if (phase.code === 'PYQ') {
      const slot = day - phase.from - plan.WEEKLY_TEST_DAYS.filter((w) => w >= phase.from && w < day).length; // 0-based among non-weekly days
      const isTopicDay = slot % 4 === 2 && topicDay < plan.PYQ_TOPIC_DAYS.length;
      if (isTopicDay) {
        const items = plan.PYQ_TOPIC_DAYS[topicDay++].map(([subject, topic]) => ({ subject, topic, name: topicName(subject, topic) }));
        title = t('Topic-wise PYQs: the most-asked chapters', 'বিষয়ভিত্তিক আগের প্রশ্ন: সবচেয়ে বেশি আসা অধ্যায়');
        tasks.push({ kind: 'pyq_topics', items, minutes: sc.min(60), title });
      } else {
        // More PYQ days than papers: the most relevant paper comes round again as a second attempt.
        const again = paper >= plan.PYQ_PAPERS.length;
        const [exam, year] = plan.PYQ_PAPERS[paper++ % plan.PYQ_PAPERS.length];
        title = again ? t(`Past paper, second attempt: ${exam} ${year}`, `আগের প্রশ্নপত্র, দ্বিতীয়বার: ${exam} ${year}`) : t(`Past paper: ${exam} ${year}`, `আগের প্রশ্নপত্র: ${exam} ${year}`);
        tasks.push({ kind: 'pyq_paper', exam, year, minutes: sc.min(60), title });
      }
      tasks.push(
        { kind: 'weak', minutes: sc.min(35), title: t('Your weakest chapter: concept, then 15 questions', 'তোমার সবচেয়ে দুর্বল অধ্যায়: ধারণা, তারপর ১৫টি প্রশ্ন') },
        { kind: 'gk_revise', minutes: sc.min(25), title: t('GK flashcards and topic pages due today', 'আজকের GK ফ্ল্যাশকার্ড ও বিষয়-পাতা') },
        { kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test with real PYQs", 'আজকের মিশ্র পরীক্ষা, আসল আগের প্রশ্নসহ') },
      );
      tasks.push(spacedTask(day, sc.min(15)) ?? { kind: 'vocabulary', minutes: sc.min(15), title: t("English: today's vocabulary", 'ইংরেজি: আজকের শব্দভান্ডার') });
    } else {
      const camp = plan.CAMP[day - phase.from];
      title = camp.title;
      if (camp.theme === 'mock') {
        tasks.push(
          { kind: 'full_mock', sizes: plan.FULL_MOCK.sizes, minutes: plan.FULL_MOCK.minutes, title: t('Full mock: 100 questions in 90 minutes', 'পূর্ণ মক: ৯০ মিনিটে ১০০টি প্রশ্ন') },
          { kind: 'mistakes', minutes: sc.min(45), title: t('Check every mock mistake and retry it', 'মকের প্রতিটি ভুল দেখে আবার চেষ্টা করো') },
          { kind: 'gk_revise', minutes: sc.min(20), title: t('Light GK revision', 'হালকা GK রিভিশন') },
        );
      } else if (camp.theme === 'mistakes') {
        tasks.push(
          { kind: 'mistakes', minutes: sc.min(90), title: t('Your whole Mistake Notebook: retry every question', 'পুরো ভুলের খাতা: প্রতিটি প্রশ্ন আবার চেষ্টা করো') },
          { kind: 'weak', minutes: sc.min(60), title: t('Weak chapters: revise the rules, then practise', 'দুর্বল অধ্যায়: নিয়ম ঝালিয়ে অনুশীলন') },
          { kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test", 'আজকের মিশ্র পরীক্ষা') },
        );
      } else if (camp.theme === 'strategy') {
        tasks.push(
          { kind: 'strategy', minutes: 20, title: t('Exam-day strategy: time, order, negative marking', 'পরীক্ষার দিনের কৌশল: সময়, ক্রম, নেগেটিভ মার্কিং') },
          { kind: 'gk_revise', minutes: 20, title: t('Light revision: GK flashcards', 'হালকা রিভিশন: GK ফ্ল্যাশকার্ড') },
          { kind: 'days_year', minutes: 10, title: t('Important Days: one last look at the year table', 'গুরুত্বপূর্ণ দিবস: বছরের টেবিলে শেষবার চোখ বোলাও') },
          { kind: 'rest', minutes: 0, title: t('Rest and sleep early. You are ready.', 'বিশ্রাম নাও, তাড়াতাড়ি ঘুমোও। তুমি তৈরি।') },
        );
      } else {
        const items = plan.CAMP_SUBJECTS[camp.theme].map(([subject, topic]) => ({ subject, topic, name: topic ? topicName(subject, topic) : null }));
        tasks.push({ kind: 'revise_subjects', items, mustOnly: camp.theme === 'must_know', minutes: sc.min(100), title: camp.title });
        tasks.push({ kind: 'mistakes', minutes: sc.min(30), title: t('Retry your mistakes in these subjects', 'এই বিষয়গুলিতে তোমার ভুল আবার চেষ্টা করো') });
        if (camp.theme === 'gk_history') tasks.push({ kind: 'days_year', minutes: sc.min(15), title: t('Important Days: the whole year table', 'গুরুত্বপূর্ণ দিবস: সারা বছরের টেবিল') });
        tasks.push({ kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test", 'আজকের মিশ্র পরীক্ষা') });
      }
    }

    // Never more than the chosen study time: shrink the flexible tasks, never the timed full mock.
    const required = tasks.filter((x) => !x.optional);
    const fixed = required.filter((x) => x.kind === 'full_mock').reduce((a, x) => a + x.minutes, 0);
    const flexible = required.filter((x) => x.kind !== 'full_mock' && x.minutes > 0);
    const flexMinutes = flexible.reduce((a, x) => a + x.minutes, 0);
    if (fixed + flexMinutes > budget && flexMinutes) {
      const f = Math.max(0, budget - fixed) / flexMinutes;
      for (const x of flexible) x.minutes = Math.max(5, Math.floor((x.minutes * f) / 5) * 5);
    }
    const questions = required.reduce((a, x) => a + (x.questions || 0) + (x.sizes ? Object.values(x.sizes).reduce((p, q) => p + q, 0) : 0), 0);
    days.push({
      day,
      phase: phase.code,
      title,
      weeklyTest: weekly,
      minutes: required.reduce((a, x) => a + x.minutes, 0),
      mission: {
        concepts: required.filter((x) => x.kind === 'learn').length,
        questions,
        revisions: required.filter((x) => x.kind === 'spaced').reduce((a, x) => a + x.items.length, 0),
        minutes: required.reduce((a, x) => a + x.minutes, 0),
      },
      tasks: tasks.map((x, i) => ({ id: `d${day}-${i + 1}`, ...x })),
    });
  }
  const leftover = Object.entries(queues).filter(([, q]) => q.length).map(([s, q]) => `${s}: ${q.length}`);
  if (leftover.length) throw new Error(`Plan sessions do not fit phases 1–2 (${leftover.join(', ')}): edit db/plans/clerkship60.js`);
  return days;
}

const built = new Map();
function getPlan(budget = plan.BASE_BUDGET) {
  if (!built.has(budget)) {
    built.set(budget, {
      code: plan.code,
      version: plan.version,
      exam: plan.exam,
      budget,
      budgets: plan.BUDGETS,
      fullMock: plan.FULL_MOCK,
      phases: plan.PHASES,
      days: buildDays(budget),
    });
  }
  return built.get(budget);
}

/** The test-type task of a day (daily, weekly or full mock), for building and checking tests. */
function testTaskOf(day, budget = plan.BASE_BUDGET) {
  const d = getPlan(budget).days[day - 1];
  return d?.tasks.find((x) => ['daily_test', 'weekly_test', 'full_mock'].includes(x.kind)) ?? null;
}

/** Every chapter learned up to (not including) a day, for mixed tests. */
function learnedBefore(day) {
  return getPlan().days.slice(0, day - 1).flatMap((d) => d.tasks.filter((x) => x.kind === 'learn' && !x.optional).map(({ subject, topic }) => ({ subject, topic })));
}

const TASK_IDS = () => new Set(getPlan().days.flatMap((d) => d.tasks.map((x) => x.id)));

// ---------------------------------------------------------------- progress

function presentProgress(p, extra = {}) {
  if (!p) return null;
  return {
    startDate: p.start_date,
    budget: p.daily_minutes ?? plan.BASE_BUDGET,
    examDate: p.exam_date ?? null,
    done: p.done,
    tests: p.tests || {},
    updatedAt: p.updated_at,
    ...extra,
  };
}

/**
 * A signed-in student's progress. Ticks saved against an older layout of the plan are
 * cleared once (the same task id meant a different task), keeping the start date.
 */
async function getProgress(userId) {
  const p = await StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).lean();
  if (p && (p.plan_version ?? 1) !== plan.version) {
    const fresh = await StudyPlanProgress.findOneAndUpdate(
      { _id: p._id },
      { $set: { plan_version: plan.version, done: [], tests: {} } },
      { new: true },
    ).lean();
    return presentProgress(fresh, { planUpdated: true });
  }
  return presentProgress(p);
}

/** Start (or restart) the plan; also sets study time and exam date. Restarting clears ticks only when asked. */
async function startPlan(userId, { startDate, reset = false, budget, examDate }) {
  const set = { start_date: startDate, plan_version: plan.version };
  if (budget !== undefined) set.daily_minutes = budget;
  if (examDate !== undefined) set.exam_date = examDate;
  const update = reset ? { $set: { ...set, done: [], tests: {} } } : { $set: set, $setOnInsert: { done: [], tests: {} } };
  const p = await StudyPlanProgress.findOneAndUpdate({ user_id: userId, plan: plan.code }, update, { upsert: true, new: true }).lean();
  return presentProgress(p);
}

async function requireStarted(userId) {
  const exists = await StudyPlanProgress.exists({ user_id: userId, plan: plan.code });
  if (!exists) throw AppError.unprocessable('PLAN_NOT_STARTED', 'Start the plan first');
}

/** Merge ticks made on this device (as a guest, or offline) into the account. */
async function setTasks(userId, { done = [], undone = [] }) {
  const ids = TASK_IDS();
  const bad = [...done, ...undone].find((id) => !ids.has(id));
  if (bad) throw AppError.unprocessable('UNKNOWN_TASK', `Not a task of this plan: ${bad}`);
  await requireStarted(userId);
  if (done.length) await StudyPlanProgress.updateOne({ user_id: userId, plan: plan.code }, { $addToSet: { done: { $each: done } } });
  if (undone.length) await StudyPlanProgress.updateOne({ user_id: userId, plan: plan.code }, { $pull: { done: { $in: undone } } });
  return getProgress(userId);
}

/** Keeps a day's test result (the best attempt) and ticks the test task. */
async function recordTest(userId, day, result, taskId) {
  const p = await StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).select('tests').lean();
  if (!p) return;
  const prev = p.tests?.[day];
  const better = !prev || result.correct / result.total > prev.correct / prev.total;
  await StudyPlanProgress.updateOne(
    { _id: p._id },
    { ...(better && { $set: { [`tests.${day}`]: result } }), $addToSet: { done: taskId } },
  );
}

module.exports = { getPlan, buildDays, testTaskOf, learnedBefore, getProgress, startPlan, setTasks, recordTest, requireStarted };
