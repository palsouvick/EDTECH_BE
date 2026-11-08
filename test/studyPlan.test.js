'use strict';

/** 60-day WBPSC Clerkship plan (v2): layout, study-time scaling, progress, and plan tests. */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { StudyPlanProgress, Question, ReviewItem } = require('../src/models');
const { buildDays, getPlan } = require('../src/services/studyPlan.service');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const plan = require('../db/plans/clerkship60');
const catalog = require('../db/seed/catalog');

const days = buildDays();
const wbpsc = catalog.find((c) => c.code === 'WBPSC');
const inSyllabus = (subject, topic) => wbpsc.subjects.find((s) => s.code === subject)?.topics.some((x) => x.code === topic);
const priorityOf = Object.fromEntries([...plan.ARITHMETIC, ...plan.ENGLISH, ...plan.GS].map(([topic, , p]) => [topic, p]));

test('60 days in the four phases; every budget fits its study time; task ids do not depend on the budget', () => {
  assert.equal(days.length, 60);
  const phaseDays = (code) => days.filter((d) => d.phase === code).map((d) => d.day);
  assert.deepEqual([phaseDays('FOUNDATION').at(0), phaseDays('FOUNDATION').at(-1)], [1, 15]);
  assert.deepEqual([phaseDays('CORE').at(0), phaseDays('CORE').at(-1)], [16, 35]);
  assert.deepEqual([phaseDays('PYQ').at(0), phaseDays('PYQ').at(-1)], [36, 50]);
  assert.deepEqual([phaseDays('CAMP').at(0), phaseDays('CAMP').at(-1)], [51, 60]);
  const ids = (ds) => ds.flatMap((d) => d.tasks.map((x) => `${x.id}:${x.kind}`));
  for (const budget of plan.BUDGETS) {
    const ds = buildDays(budget);
    for (const d of ds) assert.ok(d.minutes <= budget, `${budget} min: day ${d.day} has ${d.minutes}`);
    assert.deepEqual(ids(ds), ids(days), `${budget} min: same tasks`);
  }
  assert.equal(new Set(ids(days)).size, ids(days).length, 'unique ids');
  assert.ok(buildDays(360)[0].tasks[1].questions > buildDays(120)[0].tasks[1].questions, 'more time, more practice');
  assert.throws(() => buildDays(100), /Study time must be one of/);
});

test('learning days: every syllabus chapter before Phase 3, with what to learn, minutes split, questions, target and outcome', () => {
  const learn = days.flatMap((d) => d.tasks.filter((x) => x.kind === 'learn').map((x) => ({ ...x, day: d.day, phase: d.phase })));
  const required = learn.filter((x) => !x.optional);
  for (const x of learn) assert.ok(inSyllabus(x.subject, x.topic), `${x.subject}.${x.topic}`);
  assert.ok(required.every((x) => x.day <= 35), 'new chapters only in phases 1–2');
  for (const [topic] of [...plan.ARITHMETIC, ...plan.ENGLISH, ...plan.GS]) assert.ok(required.some((x) => x.topic === topic), topic);
  for (const x of required) {
    assert.ok(x.learn.length > 0, `day ${x.day} ${x.topic}: nothing listed to learn`);
    assert.ok(x.questions >= 5 && x.accuracyTarget === plan.ACCURACY[x.phase]);
    assert.ok(Math.abs(Object.values(x.split).reduce((a, b) => a + b, 0) - x.minutes) <= 10, `day ${x.day} split`);
    assert.match(x.outcome.en, /accuracy/);
  }
  assert.deepEqual(required.filter((x) => x.topic === 'indian_history').map((x) => x.session.n), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(days[0].tasks.filter((x) => x.kind === 'learn').map((x) => x.topic), ['polity', 'number_system', 'parts_of_speech'], 'Day 1 starts from the basics');
  const firstHistory = required.find((x) => x.topic === 'indian_history');
  assert.deepEqual(firstHistory.packs, ['GK-HIS-104', 'GK-HIS-101', 'GK-HIS-105'], 'connected topic pages with the matching session');
  for (const d of days) {
    const m = d.mission;
    assert.equal(m.minutes, d.minutes);
    assert.equal(m.concepts, d.tasks.filter((x) => x.kind === 'learn' && !x.optional).length);
  }
});

test('spaced revision: each Must-know chapter comes back about 2, 6, 14 and 29 days after its last session; never more than 6 a day', () => {
  const learnedOn = (topic) => days.filter((d) => d.tasks.some((x) => x.kind === 'learn' && !x.optional && x.topic === topic)).map((d) => d.day);
  const revisedOn = (topic) => days.filter((d) => d.tasks.some((x) => x.kind === 'spaced' && x.items.some((i) => i.topic === topic))).map((d) => d.day);
  for (const [topic, p] of Object.entries(priorityOf)) {
    if (p !== 'MUST') continue;
    const last = learnedOn(topic).at(-1);
    const r = revisedOn(topic);
    const has = (a, b) => r.some((x) => x >= last + a && x <= last + b);
    assert.ok(has(1, 4) && has(5, 9) && has(12, 18), `${topic}: revisions ${r} after ${last}`);
    if (last + 29 <= 50) assert.ok(has(26, 33), `${topic}: 29-day revision`);
  }
  assert.ok(days.every((d) => d.mission.revisions <= 6));
});

test('tests: a daily test on every learning day, weekly tests on the week\'s topics, full mocks in the Part-I pattern', () => {
  for (const d of days.filter((x) => ['FOUNDATION', 'CORE'].includes(x.phase) && !x.weeklyTest)) {
    const dt = d.tasks.find((x) => x.kind === 'daily_test');
    assert.ok(dt, `day ${d.day}`);
    assert.deepEqual(dt.sizes, { quant: 10, english: 10, gs: 10, pyq: 10 });
  }
  const week2 = days[13].tasks.find((x) => x.kind === 'weekly_test');
  assert.ok(week2.topics.length >= 15 && week2.topics.every((x) => x.subject && x.topic));
  for (const day of [42, 49, 56, 58]) {
    const mock = days[day - 1].tasks.find((x) => x.kind === 'full_mock');
    assert.deepEqual(mock.sizes, { english: 30, gs: 40, quant: 30, pyq: 0 }, `day ${day}`);
    assert.equal(mock.minutes, 90);
  }
  const papers = days.flatMap((d) => d.tasks.filter((x) => x.kind === 'pyq_paper'));
  assert.deepEqual([papers[0].exam, papers[0].year], ['WBPSC Clerkship (Part-I)', 2023]);
  assert.equal(days.filter((d) => d.tasks.some((x) => x.kind === 'pyq_topics')).length, plan.PYQ_TOPIC_DAYS.length);
});

test('final camp: Days 51–60 follow the fixed themes, with no new chapters', () => {
  const camp = days.slice(50);
  assert.deepEqual(camp.map((d) => d.title.en), plan.CAMP.map((c) => c.title.en));
  assert.ok(camp.every((d) => !d.tasks.some((x) => x.kind === 'learn')));
  assert.ok(days[59].tasks.some((x) => x.kind === 'strategy') && days[59].tasks.some((x) => x.kind === 'rest'));
});

let mongod;
let server;
let root;
const call = async (method, p, body, user = 'student_plan') => {
  const res = await fetch(root + p, { method, headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) }, body: body && JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('plan_test'));
  await Promise.all([StudyPlanProgress.init(), Question.init()]);
  for (const f of ['wbcs-prelims-2022.json', 'wbpsc-clerkship-2023-session-1.json']) await importQuestionFile(path.join(PYQ_DIR, f), { log: () => {}, warn: () => {} });
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('GET /plan/clerkship-60 is public; ?budget= scales it; unknown budgets are refused', async () => {
  const { status, body } = await call('GET', '/plan/clerkship-60', null, null);
  assert.equal(status, 200);
  assert.equal(body.data.days.length, 60);
  assert.equal(body.data.version, plan.version);
  assert.deepEqual(body.data.days[0], JSON.parse(JSON.stringify(getPlan().days[0])));
  assert.equal((await call('GET', '/plan/clerkship-60?budget=360', null, null)).body.data.days[0].minutes, 360);
  assert.equal((await call('GET', '/plan/clerkship-60?budget=100', null, null)).status, 400);
});

test('progress: study time and exam date are saved; ticks from the old plan layout are cleared once', async () => {
  assert.equal((await call('GET', '/plan/clerkship-60/progress', null, null)).status, 401);
  let p = (await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-11-06', budget: 240, examDate: '2026-12-20' })).body.data.progress;
  assert.deepEqual([p.startDate, p.budget, p.examDate], ['2026-11-06', 240, '2026-12-20']);
  p = (await call('POST', '/plan/clerkship-60/tasks', { done: ['d1-1'] })).body.data.progress;
  assert.deepEqual(p.done, ['d1-1']);
  assert.equal((await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-11-06', budget: 90 })).status, 400);

  await StudyPlanProgress.create({ user_id: 'old_student', plan: 'CLERKSHIP_60', start_date: '2026-11-01', done: ['d3-2'], plan_version: 1 });
  const first = (await call('GET', '/plan/clerkship-60/progress', null, 'old_student')).body.data.progress;
  assert.equal(first.planUpdated, true);
  assert.deepEqual([first.startDate, first.done], ['2026-11-01', []]);
  const second = (await call('GET', '/plan/clerkship-60/progress', null, 'old_student')).body.data.progress;
  assert.equal(second.planUpdated, undefined, 'only once');
});

test('daily test: sections in paper order, no answers, graded on the server, result kept, mistakes saved', async () => {
  const created = await call('POST', '/plan/clerkship-60/days/1/test', { budget: 180 });
  assert.equal(created.status, 200);
  const t = created.body.data;
  assert.equal(t.kind, 'daily_test');
  assert.deepEqual(t.sections.map((s) => s.section), ['english', 'gs', 'quant', 'pyq']);
  const qs = t.sections.flatMap((s) => s.questions);
  assert.ok(qs.length >= 20, `${qs.length} questions`);
  assert.equal(new Set(qs.map((q) => q.questionId)).size, qs.length, 'no repeats');
  assert.ok(qs.every((q) => q.correctOptionId === undefined));
  assert.ok(t.sections.find((s) => s.section === 'pyq').questions.every((q) => q.pyq.length), 'PYQ block is real papers');

  const answers = qs.map((q, i) => ({ questionId: q.questionId, selectedOptionId: i % 2 ? q.options[0].optionId : null, timeSpentSec: 20 }));
  const checked = await call('POST', '/plan/clerkship-60/days/1/test/check', { testToken: t.testToken, answers });
  assert.equal(checked.status, 200);
  const s = checked.body.data.summary;
  assert.equal(s.total, qs.length);
  assert.equal(s.correct + s.wrong + s.skipped, s.total);
  assert.equal(s.timeSec, 20 * qs.length);
  assert.ok(Object.keys(s.bySubject).length >= 3);
  assert.equal(checked.body.data.results.length, qs.length);
  assert.ok(checked.body.data.results.every((r) => r.correctOptionId));

  const progress = (await call('GET', '/plan/clerkship-60/progress')).body.data.progress;
  assert.equal(progress.tests['1'].total, s.total);
  assert.ok(progress.done.includes(t.taskId), 'the test task is ticked');
  if (s.wrong) assert.ok(await ReviewItem.exists({ user_id: 'student_plan' }), 'wrong answers go to the Mistake Notebook');

  assert.equal((await call('POST', '/plan/clerkship-60/days/2/test/check', { testToken: t.testToken, answers })).status, 403, 'token is for day 1');
  assert.equal((await call('POST', '/plan/clerkship-60/days/1/test/check', { testToken: t.testToken, answers: [{ questionId: '0'.repeat(24), selectedOptionId: null }] })).status, 403);
  assert.equal((await call('POST', '/plan/clerkship-60/days/60/test', {})).status, 404, 'Day 60 has no test');
});

test('full mock: 100-question pattern where the pool allows, negative marking applied', async () => {
  const t = (await call('POST', '/plan/clerkship-60/days/56/test', {}, null)).body.data;
  assert.equal(t.kind, 'full_mock');
  assert.equal(t.timed, true);
  assert.equal(t.negativeMarking, 0.25);
  assert.deepEqual(t.sections.map((s) => s.section), ['english', 'gs', 'quant']);
  const qs = t.sections.flatMap((s) => s.questions);
  const answers = qs.map((q) => ({ questionId: q.questionId, selectedOptionId: q.options[1].optionId }));
  const s = (await call('POST', '/plan/clerkship-60/days/56/test/check', { testToken: t.testToken, answers }, null)).body.data.summary;
  assert.equal(s.marks, Math.round((s.correct - 0.25 * s.wrong) * 100) / 100);
});
