'use strict';

/**
 * The 60-day WBPSC Clerkship plan (db/plans/clerkship60.js) laid out day by day, and a
 * signed-in student's progress through it (start date + ticked tasks). The layout is a
 * pure function of the plan file, so every student sees the same Day 1…60 and a test can
 * check every day. Guests keep progress on their device (frontend).
 */

const plan = require('../../db/plans/clerkship60');
const { StudyPlanProgress } = require('../models');
const { topicName } = require('./catalogNames');
const AppError = require('../utils/AppError');

const t = (en, bn) => ({ en, bn });
const MINUTES = {
  FOUNDATION: { gs: 30, quant: 30, english: 20, revise: 10 },
  CORE: { gs: 40, quant: 35, english: 25, revise: 15 },
};

/** [[topic, sessions, priority], ...] → one entry per session, in order. */
const expand = (list, subject) =>
  list.flatMap(([topic, sessions, priority]) => {
    const total = list.filter(([x]) => x === topic).reduce((a, [, n]) => a + n, 0);
    return Array.from({ length: sessions }, () => ({ subject, topic, priority, total }));
  });

function numberSessions(queue) {
  const seen = {};
  return queue.map((s) => {
    seen[s.topic] = (seen[s.topic] || 0) + 1;
    return { ...s, session: { n: seen[s.topic], of: s.total } };
  });
}

const phaseOf = (day) => plan.PHASES.find((p) => day >= p.from && day <= p.to);

function learnTask(s, minutes) {
  return { kind: 'learn', subject: s.subject, topic: s.topic, name: topicName(s.subject, s.topic), priority: s.priority, session: s.session, minutes };
}

/** Day 1…60, each with its phase and a short list of tasks that fits the day's minutes. */
function buildDays() {
  const queues = {
    gs: numberSessions(expand(plan.GS, 'gs')),
    quant: numberSessions(expand(plan.ARITHMETIC, 'quant')),
    english: numberSessions(expand(plan.ENGLISH, 'english')),
  };
  const days = [];
  let optional = 0;
  let paper = 0;
  for (let day = 1; day <= plan.days; day += 1) {
    const phase = phaseOf(day);
    const tasks = [];
    if (plan.WEEKLY_TEST_DAYS.includes(day)) {
      tasks.push(
        { kind: 'mock', subject: 'english', questions: 30, minutes: 25, title: t("Weekly test: English (this week's chapters)", 'সাপ্তাহিক পরীক্ষা: ইংরেজি (এই সপ্তাহের অধ্যায়)') },
        { kind: 'mock', subject: 'gs', questions: 40, minutes: 35, title: t("Weekly test: General Studies (this week's chapters)", 'সাপ্তাহিক পরীক্ষা: সাধারণ পাঠ (এই সপ্তাহের অধ্যায়)') },
        { kind: 'mock', subject: 'quant', questions: 30, minutes: 30, title: t("Weekly test: Arithmetic (this week's chapters)", 'সাপ্তাহিক পরীক্ষা: পাটিগণিত (এই সপ্তাহের অধ্যায়)') },
        { kind: 'mistakes', minutes: 20, title: t('Go through this week\'s mistakes', 'এই সপ্তাহের ভুলগুলি দেখে নাও') },
      );
      const extra = plan.GS_OPTIONAL[optional++ % plan.GS_OPTIONAL.length];
      tasks.push({ kind: 'learn', subject: 'gs', topic: extra, name: topicName('gs', extra), priority: null, optional: true, minutes: 20 });
    } else if (phase.code === 'FOUNDATION' || phase.code === 'CORE') {
      const m = MINUTES[phase.code];
      const gs = queues.gs.shift();
      const quant = queues.quant.shift();
      const english = queues.english.shift();
      if (gs) tasks.push(learnTask(gs, m.gs));
      tasks.push(quant ? learnTask(quant, m.quant) : { kind: 'mistakes', subject: 'quant', minutes: m.quant, title: t('Arithmetic: redo your wrong answers', 'পাটিগণিত: ভুল উত্তরগুলি আবার করো') });
      tasks.push(english ? learnTask(english, m.english) : { kind: 'vocabulary', minutes: m.english, title: t('English: today\'s vocabulary', 'ইংরেজি: আজকের শব্দভান্ডার') });
      tasks.push({ kind: 'revise', minutes: m.revise, title: t('Revision: questions due today', 'রিভিশন: আজকের বাকি প্রশ্ন') });
    } else if (phase.code === 'PYQ') {
      // More PYQ days than papers: the most relevant paper comes round again as a second attempt.
      const again = paper >= plan.PYQ_PAPERS.length;
      const [exam, year] = plan.PYQ_PAPERS[paper++ % plan.PYQ_PAPERS.length];
      tasks.push(
        {
          kind: 'pyq_paper', exam, year, minutes: 60,
          title: again ? t(`Past paper, second attempt: ${exam} ${year}`, `আগের প্রশ্নপত্র, দ্বিতীয়বার: ${exam} ${year}`) : t(`Past paper: ${exam} ${year}`, `আগের প্রশ্নপত্র: ${exam} ${year}`),
        },
        { kind: 'weak', minutes: 30, title: t('Your weakest chapter: practise 15 questions', 'তোমার সবচেয়ে দুর্বল অধ্যায়: ১৫টি প্রশ্ন অনুশীলন') },
        { kind: 'vocabulary', minutes: 15, title: t('English: today\'s vocabulary', 'ইংরেজি: আজকের শব্দভান্ডার') },
        { kind: 'revise', minutes: 15, title: t('Revision: questions due today', 'রিভিশন: আজকের বাকি প্রশ্ন') },
      );
    } else if (day === plan.days) {
      tasks.push(
        { kind: 'gk_revise', minutes: 20, title: t('Light revision: GK flashcards', 'হালকা রিভিশন: GK ফ্ল্যাশকার্ড') },
        { kind: 'days_year', minutes: 10, title: t('Important Days: one last look at the year table', 'গুরুত্বপূর্ণ দিবস: বছরের টেবিলে শেষবার চোখ বোলাও') },
        { kind: 'rest', minutes: 0, title: t('Rest and sleep early. You are ready.', 'বিশ্রাম নাও, তাড়াতাড়ি ঘুমোও। তুমি তৈরি।') },
      );
    } else if ((day - phase.from) % 2 === 0) {
      tasks.push(
        { kind: 'mock', subject: 'english', questions: 30, minutes: 25, title: t('Mock: English, 30 questions (exam pattern)', 'মক: ইংরেজি, ৩০টি প্রশ্ন (পরীক্ষার ধাঁচে)') },
        { kind: 'mock', subject: 'gs', questions: 40, minutes: 35, title: t('Mock: General Studies, 40 questions (exam pattern)', 'মক: সাধারণ পাঠ, ৪০টি প্রশ্ন (পরীক্ষার ধাঁচে)') },
        { kind: 'mock', subject: 'quant', questions: 30, minutes: 30, title: t('Mock: Arithmetic, 30 questions (exam pattern)', 'মক: পাটিগণিত, ৩০টি প্রশ্ন (পরীক্ষার ধাঁচে)') },
        { kind: 'mistakes', minutes: 20, title: t('Check every mock mistake', 'মকের প্রতিটি ভুল দেখে নাও') },
      );
    } else {
      tasks.push(
        { kind: 'weak', minutes: 40, title: t('Weak chapters: practise until they turn "improving"', 'দুর্বল অধ্যায়: "উন্নতি হচ্ছে" না হওয়া পর্যন্ত অনুশীলন') },
        { kind: 'gk_revise', minutes: 25, title: t('GK flashcards due today', 'আজকের GK ফ্ল্যাশকার্ড') },
        { kind: 'revise', minutes: 20, title: t('Revision: questions due today', 'রিভিশন: আজকের বাকি প্রশ্ন') },
        { kind: 'vocabulary', minutes: 15, title: t('English: today\'s vocabulary', 'ইংরেজি: আজকের শব্দভান্ডার') },
      );
    }
    days.push({
      day,
      phase: phase.code,
      weeklyTest: plan.WEEKLY_TEST_DAYS.includes(day),
      minutes: tasks.filter((x) => !x.optional).reduce((a, x) => a + x.minutes, 0),
      tasks: tasks.map((x, i) => ({ id: `d${day}-${i + 1}`, ...x })),
    });
  }
  const leftover = Object.entries(queues).filter(([, q]) => q.length).map(([s, q]) => `${s}: ${q.length}`);
  if (leftover.length) throw new Error(`Plan sessions do not fit phases 1–2 (${leftover.join(', ')}): edit db/plans/clerkship60.js`);
  return days;
}

let built;
function getPlan() {
  built ??= { code: plan.code, exam: plan.exam, days: buildDays(), phases: plan.PHASES };
  return built;
}

const TASK_IDS = () => new Set(getPlan().days.flatMap((d) => d.tasks.map((x) => x.id)));

function presentProgress(p) {
  return p ? { startDate: p.start_date, done: p.done, updatedAt: p.updated_at } : null;
}

async function getProgress(userId) {
  return presentProgress(await StudyPlanProgress.findOne({ user_id: userId, plan: plan.code }).lean());
}

/** Start (or restart) the plan on a date; restarting clears ticks only when asked. */
async function startPlan(userId, { startDate, reset = false }) {
  const update = reset ? { $set: { start_date: startDate, done: [] } } : { $set: { start_date: startDate }, $setOnInsert: { done: [] } };
  const p = await StudyPlanProgress.findOneAndUpdate({ user_id: userId, plan: plan.code }, update, { upsert: true, new: true }).lean();
  return presentProgress(p);
}

/** Merge ticks made on this device (as a guest, or offline) into the account. */
async function setTasks(userId, { done = [], undone = [] }) {
  const ids = TASK_IDS();
  const bad = [...done, ...undone].find((id) => !ids.has(id));
  if (bad) throw AppError.unprocessable('UNKNOWN_TASK', `Not a task of this plan: ${bad}`);
  const exists = await StudyPlanProgress.exists({ user_id: userId, plan: plan.code });
  if (!exists) throw AppError.unprocessable('PLAN_NOT_STARTED', 'Start the plan first');
  if (done.length) await StudyPlanProgress.updateOne({ user_id: userId, plan: plan.code }, { $addToSet: { done: { $each: done } } });
  if (undone.length) await StudyPlanProgress.updateOne({ user_id: userId, plan: plan.code }, { $pull: { done: { $in: undone } } });
  return getProgress(userId);
}

module.exports = { getPlan, buildDays, getProgress, startPlan, setTasks };
