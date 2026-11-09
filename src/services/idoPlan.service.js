'use strict';

/**
 * The IDO preparation plan (db/plans/ido.js) laid out day by day for a chosen
 * length (30, 45 or 60 days), and a signed-in student's progress through it.
 * Same contract as the Clerkship plan (services/studyPlan.service.js): the
 * layout is a pure function of the plan file, the length and the study budget,
 * task ids are "d<day>-<n>", and progress lives in StudyPlanProgress with
 * plan = 'IDO' (the chosen length is stored as plan_days; switching length
 * restarts the ticks, because the same task id is a different task).
 * Guests keep progress on their device (frontend).
 */

const plan = require('../../db/plans/ido');
const { loadLessons } = require('../../db/lessons');
const { loadPatterns } = require('../../db/patterns');
const { StudyPlanProgress } = require('../models');
const { topicName } = require('./catalogNames');
const { cardOf } = require('./gkTaxonomy');
const AppError = require('../utils/AppError');

const t = (en, bn) => ({ en, bn });
const bnDigits = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

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

const LEVELS_FOR = { 1: [['basic', 'intermediate']], 2: [['basic'], ['intermediate', 'advanced']], 3: [['basic'], ['intermediate'], ['advanced']] };

let patternIndex;
const patternsFor = (subject, topic) => {
  patternIndex ??= new Map(loadPatterns({ onError: () => {} }).map(({ doc }) => [`${doc.subject}.${doc.topic}`, doc.patterns]));
  return patternIndex.get(`${subject}.${topic}`) || [];
};

function learnList(subject, topic, { n, of }) {
  if (subject === 'gs') {
    // Proportional slices of the card's subtopics: every session gets at least
    // one subtopic even when sessions outnumber subtopics.
    const subs = Object.values(cardOf(topic)?.subtopics || {});
    if (!subs.length) return [];
    const start = Math.floor(((n - 1) * subs.length) / of);
    const end = Math.max(start + 1, Math.floor((n * subs.length) / of));
    return subs.slice(start, end);
  }
  if (subject === 'reasoning') {
    // Reasoning has no written lessons in the app; a session works through the
    // chapter's question patterns instead (split across the sessions).
    const names = patternsFor(subject, topic).map((p) => p.name);
    if (!names.length) return [];
    const start = Math.floor(((n - 1) * names.length) / of);
    const end = Math.max(start + 1, Math.floor((n * names.length) / of));
    return names.slice(start, end);
  }
  const lesson = lessonFor(subject, topic);
  if (!lesson) return [];
  const levels = (LEVELS_FOR[Math.min(of, 3)] || LEVELS_FOR[3])[Math.min(n, 3) - 1] || [];
  return lesson.levels.filter((l) => levels.includes(l.level)).flatMap((l) => l.sections.map((s) => s.heading)).slice(0, 8);
}

const SPLIT = {
  quant: [['concept', 0.4], ['examples', 0.2], ['practice', 0.4]],
  reasoning: [['concept', 0.4], ['examples', 0.2], ['practice', 0.4]],
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
    packs: [],
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
  return { quant: n, reasoning: Math.max(5, Math.round(n / 2)), english: n, gs: n, pyq: n };
};

/** Phase day-ranges for a chosen length, from the plan's phase shares. */
function phasesFor(totalDays) {
  const out = [];
  let from = 1;
  plan.PHASE_SHARES.forEach((p, i) => {
    const last = i === plan.PHASE_SHARES.length - 1;
    const len = last ? totalDays - from + 1 : Math.max(2, Math.round(totalDays * p.share));
    out.push({ code: p.code, from, to: Math.min(totalDays, from + len - 1), title: p.title, goal: p.goal });
    from += len;
  });
  return out;
}

// ---------------------------------------------------------------- layout

/** Day 1…N for a chosen length and study budget (minutes a day). */
function buildDays(totalDays = 60, budget = plan.BASE_BUDGET) {
  if (!plan.DURATIONS.includes(totalDays)) throw AppError.unprocessable('UNKNOWN_DURATION', `Plan length must be one of ${plan.DURATIONS.join(', ')} days`);
  if (!plan.BUDGETS.includes(budget)) throw AppError.unprocessable('UNKNOWN_BUDGET', `Study time must be one of ${plan.BUDGETS.join(', ')} minutes`);
  const sc = scaler(budget);
  const phases = phasesFor(totalDays);
  const phaseOf = (day) => phases.find((p) => day >= p.from && day <= p.to);
  const studyEnd = phases.find((p) => p.code === 'PYQ').from - 1;
  const weeklyInStudy = Array.from({ length: studyEnd }, (_, i) => i + 1).filter((d) => d % 7 === 0).length;
  const queues = {
    gs: sessions(plan.GS, 'gs'),
    english: sessions(plan.ENGLISH, 'english'),
    quant: sessions(plan.ARITHMETIC, 'quant'),
    reasoning: sessions(plan.MENTAL_ABILITY, 'reasoning'),
  };
  const totalSessions = Object.values(queues).reduce((a, q) => a + q.length, 0);
  const perDay = Math.max(1, Math.ceil(totalSessions / Math.max(1, studyEnd - weeklyInStudy)));
  const ROTATION = ['gs', 'quant', 'gs', 'english', 'gs', 'reasoning'];
  let rot = 0;
  const nextSession = () => {
    for (let i = 0; i < ROTATION.length * 2; i += 1) {
      const subject = ROTATION[rot % ROTATION.length];
      rot += 1;
      if (queues[subject].length) return queues[subject].shift();
    }
    return null;
  };

  const learned = [];
  const days = [];
  let paper = 0;
  let topicDay = 0;
  let campIdx = 0;

  const SPACED_MAX = 6;
  const lastRevised = new Map();
  const SUBJECT_ORDER = ['gs', 'quant', 'english', 'reasoning'];
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

  for (let day = 1; day <= totalDays; day += 1) {
    const phase = phaseOf(day);
    const tasks = [];
    let title = null;
    const weekly = day % 7 === 0 && phase.code !== 'CAMP';

    if (phase.code === 'CAMP') {
      const isLast = day === totalDays;
      const theme = isLast ? 'strategy' : plan.CAMP_THEMES[campIdx++ % plan.CAMP_THEMES.length];
      if (theme === 'mock') {
        title = t('Full mock day: the official IDO pattern', 'পূর্ণ মকের দিন: অফিসিয়াল IDO ধাঁচ');
        tasks.push(
          { kind: 'full_mock', sizes: plan.FULL_MOCK.sizes, minutes: plan.FULL_MOCK.minutes, title: t('Full mock: 100 questions in 90 minutes, −0.25 per wrong answer', 'পূর্ণ মক: ৯০ মিনিটে ১০০টি প্রশ্ন, ভুল উত্তরে −০.২৫') },
          { kind: 'mistakes', minutes: sc.min(45), title: t('Check every mock mistake and retry it', 'মকের প্রতিটি ভুল দেখে আবার চেষ্টা করো') },
          { kind: 'gk_revise', minutes: sc.min(20), title: t('Light GK revision', 'হালকা GK রিভিশন') },
        );
      } else if (theme === 'mistakes') {
        title = t('Mistake Notebook day', 'ভুলের খাতার দিন');
        tasks.push(
          { kind: 'mistakes', minutes: sc.min(90), title: t('Your whole Mistake Notebook: retry every question', 'পুরো ভুলের খাতা: প্রতিটি প্রশ্ন আবার চেষ্টা করো') },
          { kind: 'weak', minutes: sc.min(60), title: t('Weak chapters: revise the rules, then practise', 'দুর্বল অধ্যায়: নিয়ম ঝালিয়ে অনুশীলন') },
          { kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test", 'আজকের মিশ্র পরীক্ষা') },
        );
      } else if (theme === 'strategy') {
        title = t('Final day: strategy and rest', 'শেষ দিন: কৌশল ও বিশ্রাম');
        tasks.push(
          { kind: 'ido_strategy', minutes: 20, title: t('Exam-day strategy: time, order, negative marking — see the Exam Strategy section on the IDO page', 'পরীক্ষার দিনের কৌশল: সময়, ক্রম, নেগেটিভ মার্কিং — IDO পাতার পরীক্ষার কৌশল অংশটি দেখো') },
          { kind: 'gk_revise', minutes: 20, title: t('Light revision: GK flashcards', 'হালকা রিভিশন: GK ফ্ল্যাশকার্ড') },
          { kind: 'rest', minutes: 0, title: t('Rest and sleep early. You are ready.', 'বিশ্রাম নাও, তাড়াতাড়ি ঘুমোও। তুমি তৈরি।') },
        );
      } else if (theme === 'weak') {
        title = t('Weak-topic day', 'দুর্বল বিষয়ের দিন');
        tasks.push(
          { kind: 'weak', minutes: sc.min(60), title: t('Your weakest chapter: concept, then 15 questions', 'তোমার সবচেয়ে দুর্বল অধ্যায়: ধারণা, তারপর ১৫টি প্রশ্ন') },
          { kind: 'mistakes', minutes: sc.min(30), title: t('Retry your mistakes in these subjects', 'এই বিষয়গুলিতে তোমার ভুল আবার চেষ্টা করো') },
          { kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test", 'আজকের মিশ্র পরীক্ষা') },
        );
      } else {
        const items = plan.CAMP_SUBJECTS[theme].map(([subject, topic]) => ({ subject, topic, name: topic ? topicName(subject, topic) : null }));
        title = theme === 'gs_core'
          ? t('Revision: the IDO core — safety, industry, environment, science', 'রিভিশন: IDO-র কেন্দ্র — নিরাপত্তা, শিল্প, পরিবেশ, বিজ্ঞান')
          : t('Revision: English, mental ability and arithmetic', 'রিভিশন: ইংরেজি, মানসিক দক্ষতা ও পাটিগণিত');
        tasks.push({ kind: 'revise_subjects', items, minutes: sc.min(100), title });
        tasks.push({ kind: 'mistakes', minutes: sc.min(30), title: t('Retry your mistakes in these subjects', 'এই বিষয়গুলিতে তোমার ভুল আবার চেষ্টা করো') });
        tasks.push({ kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test", 'আজকের মিশ্র পরীক্ষা') });
      }
    } else if (weekly) {
      const week = learned.filter((l) => l.day > day - 7 && l.day < day);
      if (phase.code === 'PYQ') {
        title = t('Weekly test: full mock (official IDO pattern)', 'সাপ্তাহিক পরীক্ষা: পূর্ণ মক (অফিসিয়াল IDO ধাঁচ)');
        tasks.push({ kind: 'full_mock', sizes: plan.FULL_MOCK.sizes, minutes: plan.FULL_MOCK.minutes, title: t('Full mock: 100 questions in 90 minutes, −0.25 per wrong answer', 'পূর্ণ মক: ৯০ মিনিটে ১০০টি প্রশ্ন, ভুল উত্তরে −০.২৫') });
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
    } else if (phase.code === 'FOUNDATION' || phase.code === 'CORE') {
      const m = plan.BLOCKS[phase.code];
      const today = [];
      for (let i = 0; i < perDay; i += 1) {
        const s = nextSession();
        if (!s) break;
        tasks.push(learnTask(s, phase.code, sc.min(m.learn), sc));
        today.push(s);
      }
      if (!today.length) tasks.push({ kind: 'mistakes', minutes: sc.min(m.learn), title: t('Mixed practice and your wrong answers', 'মিশ্র অনুশীলন ও তোমার ভুল উত্তর') });
      const sp = spacedTask(day, sc.min(m.spaced), today);
      const testTopics = [...today, ...(sp?.items || []).filter((i) => i.kind === 'test')].map(({ subject, topic }) => ({ subject, topic }));
      tasks.push({ kind: 'daily_test', sizes: testSizes(budget), topics: testTopics, minutes: sc.min(m.test), title: t("Today's test: English, GS, Arithmetic, Mental Ability and real PYQs", 'আজকের পরীক্ষা: ইংরেজি, সাধারণ পাঠ, পাটিগণিত, মানসিক দক্ষতা ও আসল আগের প্রশ্ন') });
      tasks.push(sp ?? { kind: 'revise', minutes: sc.min(m.spaced), title: t('Revision: questions due today', 'রিভিশন: আজকের বাকি প্রশ্ন') });
      for (const s of today) learned.push({ day, subject: s.subject, topic: s.topic, name: topicName(s.subject, s.topic) });
    } else {
      // PYQ phase (non-weekly day): alternate a real-paper day and a topic-PYQ day.
      const slot = day - phase.from;
      if (slot % 2 === 1 && topicDay < plan.PYQ_TOPIC_DAYS.length) {
        const items = plan.PYQ_TOPIC_DAYS[topicDay++].map(([subject, topic]) => ({ subject, topic, name: topicName(subject, topic) }));
        title = t('Topic-wise PYQs: the chapters this exam weights most', 'বিষয়ভিত্তিক আগের প্রশ্ন: এই পরীক্ষায় সবচেয়ে গুরুত্বপূর্ণ অধ্যায়');
        tasks.push({ kind: 'pyq_topics', items, minutes: sc.min(60), title });
      } else {
        const again = paper >= plan.PYQ_PAPERS.length;
        const [exam, year] = plan.PYQ_PAPERS[paper++ % plan.PYQ_PAPERS.length];
        title = again ? t(`Past paper, second attempt: IDO ${year}`, `আগের প্রশ্নপত্র, দ্বিতীয়বার: IDO ${year}`) : t(`Past paper: IDO ${year}`, `আগের প্রশ্নপত্র: IDO ${year}`);
        tasks.push({ kind: 'pyq_paper', exam, year, minutes: sc.min(60), title });
      }
      tasks.push(
        { kind: 'weak', minutes: sc.min(35), title: t('Your weakest chapter: concept, then 15 questions', 'তোমার সবচেয়ে দুর্বল অধ্যায়: ধারণা, তারপর ১৫টি প্রশ্ন') },
        { kind: 'gk_revise', minutes: sc.min(25), title: t('GK flashcards and topic pages due today', 'আজকের GK ফ্ল্যাশকার্ড ও বিষয়-পাতা') },
        { kind: 'daily_test', sizes: testSizes(budget), topics: [], minutes: sc.min(25), title: t("Today's mixed test with real PYQs", 'আজকের মিশ্র পরীক্ষা, আসল আগের প্রশ্নসহ') },
      );
      const sp2 = spacedTask(day, sc.min(15));
      if (sp2) tasks.push(sp2);
    }

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
  if (leftover.length) throw new Error(`IDO plan sessions do not fit ${totalDays} days (${leftover.join(', ')}): edit db/plans/ido.js`);
  return { phases, days };
}

const built = new Map();
function getPlan(totalDays = 60, budget = plan.BASE_BUDGET) {
  const key = `${totalDays}:${budget}`;
  if (!built.has(key)) {
    const { phases, days } = buildDays(totalDays, budget);
    built.set(key, {
      code: plan.code,
      version: plan.version,
      exam: plan.exam,
      days: totalDays,
      duration: totalDays,
      budget,
      budgets: plan.BUDGETS,
      durations: plan.DURATIONS,
      fullMock: plan.FULL_MOCK,
      sections: plan.SECTIONS.map(({ key: k, subject, topic, count, title }) => ({ key: k, subject, topic, count, title })),
      phases,
      days,
    });
  }
  return built.get(key);
}

/** The test-type task of a day (daily, weekly or full mock), for building and checking tests. */
function testTaskOf(day, totalDays = 60, budget = plan.BASE_BUDGET) {
  const d = getPlan(totalDays, budget).days[day - 1];
  return d?.tasks.find((x) => ['daily_test', 'weekly_test', 'full_mock'].includes(x.kind)) ?? null;
}

/** Every chapter learned up to (not including) a day, for mixed tests. */
function learnedBefore(day, totalDays = 60) {
  return getPlan(totalDays).days.slice(0, day - 1).flatMap((d) => d.tasks.filter((x) => x.kind === 'learn' && !x.optional).map(({ subject, topic }) => ({ subject, topic })));
}

const TASK_IDS = (totalDays) => new Set(getPlan(totalDays).days.flatMap((d) => d.tasks.map((x) => x.id)));

// ---------------------------------------------------------------- progress

function presentProgress(p, extra = {}) {
  if (!p) return null;
  return {
    startDate: p.start_date,
    budget: p.daily_minutes ?? plan.BASE_BUDGET,
    days: p.plan_days ?? 60,
    examDate: p.exam_date ?? null,
    done: p.done,
    tests: p.tests || {},
    updatedAt: p.updated_at,
    ...extra,
  };
}

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

/** Start (or restart) the plan. Choosing a different length restarts the ticks. */
async function startPlan(userId, { startDate, reset = false, budget, examDate, days }) {
  const existing = await StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).select('plan_days').lean();
  const lengthChanged = days !== undefined && existing && (existing.plan_days ?? 60) !== days;
  const set = { start_date: startDate, plan_version: plan.version };
  if (budget !== undefined) set.daily_minutes = budget;
  if (examDate !== undefined) set.exam_date = examDate;
  if (days !== undefined) set.plan_days = days;
  const update = (reset || lengthChanged) ? { $set: { ...set, done: [], tests: {} } } : { $set: set, $setOnInsert: { done: [], tests: {} } };
  const p = await StudyPlanProgress.findOneAndUpdate({ user_id: userId, plan: plan.code }, update, { upsert: true, new: true }).lean();
  return presentProgress(p);
}

async function requireStarted(userId) {
  const exists = await StudyPlanProgress.exists({ user_id: userId, plan: plan.code });
  if (!exists) throw AppError.unprocessable('PLAN_NOT_STARTED', 'Start the plan first');
}

/** Merge ticks made on this device (as a guest, or offline) into the account. */
async function setTasks(userId, { done = [], undone = [] }) {
  const p = await StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).select('plan_days').lean();
  const ids = TASK_IDS(p?.plan_days ?? 60);
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
