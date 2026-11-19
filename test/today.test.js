'use strict';

/**
 * Today's Study engine (F3): GET /me/today — the ONE server-side list behind
 * the home page's "আজ কী পড়ব? / Today's Study" card and its single
 * Continue Studying button. Scenarios from the brief:
 *   - a student with no plan (and no target exam)
 *   - a Clerkship student on Day 10 of the 60-day plan (plan respected)
 *   - a WBP Constable student (no plan exists for WBP — built from the map)
 *   - a student with overdue revision (revision comes first)
 *   - a student with a weak topic (weak practice before new learning)
 * Seeding mirrors syllabusMap.test.js: real catalogue, a small bank, and
 * real-paper PYQs for Clerkship and WBP Constable.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt, ReviewItem, StudyPlanProgress } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const studyPlan = require('../src/services/studyPlan.service');
const todaySvc = require('../src/services/today.service');
const catalog = require('../db/seed/catalog');

let mongod;
let server;
let base;

async function call(method, url, { body, cookie } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}
const cookieFrom = (setCookie) => setCookie?.split(';')[0];

const OFFICIAL = 'https://psc.wb.gov.in/Download?paper=1';
const OFFICIAL_KEY = 'https://psc.wb.gov.in/Download?key=1';
const POLICE_COPY = 'https://teachingninja.in/papers/wbp-2021.pdf';

let seq = 0;
function mkQuestion(subject, topic, pyq) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `TD-${pyq ? 'P' : 'T'}-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty: 3,
    stem: { en: `Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
    ...(pyq && {
      provenance: pyq.adapted ? 'ADAPTED_PYQ' : 'OFFICIAL_VERIFIED',
      pyq: {
        is_pyq: true,
        refs: [{
          exam_name: pyq.examName,
          tier: 'PRELIMS',
          year: pyq.year,
          question_code: `TD-${pyq.year}-Q${seq}`,
          source_url: pyq.adapted ? POLICE_COPY : OFFICIAL,
          ...(pyq.adapted ? {} : { answer_key_url: OFFICIAL_KEY }),
        }],
      },
    }),
  };
}

const bank = {};
async function seedBank() {
  const spec = [
    ['quant', 'percentage', 10], ['quant', 'profit_loss', 10], ['quant', 'number_system', 10],
    ['english', 'grammar', 10], ['gs', 'polity', 10], ['gs', 'geography', 5],
  ];
  for (const [subject, topic, n] of spec) {
    bank[`${subject}.${topic}`] = await Question.insertMany(Array.from({ length: n }, () => mkQuestion(subject, topic)));
  }
  const pyqSpec = [
    ['quant', 'percentage', 'WBPSC Clerkship (Part-I)', 2023, 2, false],
    ['english', 'grammar', 'WBPSC Clerkship (Part-I)', 2023, 1, false],
    ['gs', 'polity', 'WBPSC Clerkship (Part-I)', 2023, 1, false],
    ['quant', 'percentage', 'WBP Constable (Prelims)', 2021, 2, true],
    ['gs', 'polity', 'WBP Constable (Prelims)', 2021, 1, true],
  ];
  for (const [subject, topic, examName, year, n, adapted] of pyqSpec) {
    for (let i = 0; i < n; i++) await Question.create(mkQuestion(subject, topic, { examName, year, adapted }));
  }
}

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Today Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}

async function setTarget(cookie, examCode) {
  const res = await call('PUT', '/me/target-exam', { cookie, body: { examCode } });
  assert.equal(res.status, 200, JSON.stringify(res.body));
}

const getToday = async (cookie) => {
  const res = await call('GET', '/me/today?tz=330', { cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  return res.body.data;
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('today_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init(), ReviewItem.init(), StudyPlanProgress.init()]);
  await ExamCategory.insertMany(catalog);
  await seedBank();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('today: plan-day helpers follow the FE rule (missed days resume, not skip)', () => {
  assert.equal(todaySvc.dayNumber('2026-11-10', '2026-11-19'), 10);
  const days = Array.from({ length: 5 }, (_, i) => ({
    tasks: [{ id: `d${i + 1}-1`, kind: 'learn' }],
  }));
  // Nothing done, calendar day 4 -> still day 1 (resume where stopped).
  assert.equal(todaySvc.currentPlanDay(days, new Set(), 4), 1);
  // Days 1-2 done -> day 3, even though the calendar says 4.
  assert.equal(todaySvc.currentPlanDay(days, new Set(['d1-1', 'd2-1']), 4), 3);
  // Everything before done and calendar beyond the plan -> last day.
  assert.equal(todaySvc.currentPlanDay(days, new Set(['d1-1', 'd2-1', 'd3-1', 'd4-1']), 9), 5);
});

test('today: auth required', async () => {
  const res = await call('GET', '/me/today?tz=330');
  assert.equal(res.status, 401);
});

test('today: student with no plan and no target still gets one sensible list', async () => {
  const u = await registerUser('today-fresh@example.com');
  const d = await getToday(u.cookie);
  assert.equal(d.plan, null);
  assert.equal(d.exam, null);
  assert.ok(d.items.length >= 2, JSON.stringify(d.items));
  assert.equal(d.primary.id, d.items[0].id);
  // The generic fallbacks: past papers + the daily answer goal.
  assert.ok(d.items.some((i) => i.kind === 'pyq'), JSON.stringify(d.items.map((i) => i.kind)));
  assert.ok(d.items.some((i) => i.kind === 'general'), JSON.stringify(d.items.map((i) => i.kind)));
  // No plan items, no invented exam content.
  assert.ok(d.items.every((i) => i.kind !== 'plan' && i.kind !== 'learn'));
  assert.equal(d.totalMinutes, d.items.reduce((a, i) => a + i.minutes, 0));
});

test('today: Clerkship student on Day 10 — the plan leads and is respected', async () => {
  const u = await registerUser('today-plan@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const startDate = todaySvc.localIsoDate(330, new Date(Date.now() - 9 * 86_400_000));
  await studyPlan.startPlan(u.id, { startDate, budget: 180 });
  const plan = studyPlan.getPlan(180);
  const doneIds = plan.days.slice(0, 9).flatMap((d) => d.tasks.filter((x) => !x.optional && x.kind !== 'rest').map((x) => x.id));
  await studyPlan.setTasks(u.id, { done: doneIds });

  const d = await getToday(u.cookie);
  assert.equal(d.plan?.day, 10, JSON.stringify(d.plan));
  assert.equal(d.plan?.route, '/plan');
  const planItems = d.items.filter((i) => i.kind === 'plan');
  assert.ok(planItems.length >= 1, JSON.stringify(d.items.map((i) => i.kind)));
  assert.ok(planItems.every((i) => i.day === 10));
  const day10Ids = new Set(plan.days[9].tasks.map((x) => x.id));
  assert.ok(planItems.every((i) => day10Ids.has(i.task.id)), 'plan items must be Day 10 tasks, not another day');
  // No revision due, so the plan task is the primary action.
  assert.equal(d.primary.kind, 'plan');
});

test('today: WBP Constable student — no plan, list built from the WBP map', async () => {
  const u = await registerUser('today-wbp@example.com');
  await setTarget(u.cookie, 'WBP_CONSTABLE');
  const d = await getToday(u.cookie);
  assert.equal(d.plan, null);
  assert.equal(d.exam?.code, 'WBP_CONSTABLE');
  assert.ok(d.items.every((i) => i.kind !== 'plan'));
  const learn = d.items.find((i) => i.kind === 'learn');
  assert.ok(learn, JSON.stringify(d.items.map((i) => i.kind)));
  // The learn pick must be a chapter the F2 map calls in-syllabus for WBP.
  const mapRes = await call('GET', '/me/target-exam/syllabus-map/WBP_CONSTABLE', { cookie: u.cookie });
  const inChapters = new Set(mapRes.body.data.subjects.flatMap((s) => s.chapters.filter((c) => c.syllabus === 'in').map((c) => `${s.subject}.${c.topic}`)));
  assert.ok(inChapters.has(`${learn.subject}.${learn.topic}`), `${learn.subject}.${learn.topic} must be in the WBP syllabus`);
  const pyq = d.items.find((i) => i.kind === 'pyq');
  assert.ok(pyq, 'WBP has PYQs in the bank, so a PYQ item is expected');
});

test('today: overdue revision outranks everything, plan included', async () => {
  const u = await registerUser('today-overdue@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const startDate = todaySvc.localIsoDate(330, new Date(Date.now() - 2 * 86_400_000));
  await studyPlan.startPlan(u.id, { startDate, budget: 180 });
  const q = bank['quant.percentage'][0];
  await ReviewItem.create({
    user_id: u.id,
    question_id: q._id,
    subject: 'quant',
    topic: 'percentage',
    from_mistake: true,
    due_at: new Date(Date.now() - 26 * 3_600_000), // due yesterday
    status: 'active',
  });
  const d = await getToday(u.cookie);
  assert.equal(d.items[0].kind, 'revise');
  assert.equal(d.items[0].source, 'overdue_revision');
  assert.ok(d.items[0].overdue >= 1);
  assert.equal(d.primary.kind, 'revise');
  // …and the plan still follows right behind it.
  assert.ok(d.items.some((i) => i.kind === 'plan'), JSON.stringify(d.items.map((i) => i.kind)));
});

test('today: a weak topic is practised before new chapters are started', async () => {
  const u = await registerUser('today-weak@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const qs = bank['quant.percentage'];
  await PracticeAttempt.insertMany(qs.slice(0, 8).map((q, i) => ({
    user_id: u.id,
    question_id: q._id,
    subject: 'quant',
    topic: 'percentage',
    category: 'WBPSC',
    correct: i < 2, // 25% accuracy over 8 answers -> weak
    created_at: new Date(Date.now() - i * 60_000),
  })));
  const d = await getToday(u.cookie);
  const weakIdx = d.items.findIndex((i) => i.source === 'weak_priority');
  assert.ok(weakIdx >= 0, JSON.stringify(d.items));
  assert.equal(d.items[weakIdx].topic, 'percentage');
  const learnIdx = d.items.findIndex((i) => i.kind === 'learn');
  assert.ok(learnIdx === -1 || weakIdx < learnIdx, 'weak practice must come before new learning');
  // The weak chapter itself is not also offered as the "next new chapter".
  assert.ok(!d.items.some((i) => i.kind === 'learn' && i.topic === 'percentage'));
});
