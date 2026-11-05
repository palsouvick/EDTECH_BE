'use strict';

/** 60-day WBPSC Clerkship plan: its layout and a student's progress. */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { StudyPlanProgress } = require('../src/models');
const { buildDays, getPlan } = require('../src/services/studyPlan.service');
const plan = require('../db/plans/clerkship60');
const catalog = require('../db/seed/catalog');

const days = buildDays();
const wbpsc = catalog.find((c) => c.code === 'WBPSC');
const inSyllabus = (subject, topic) => wbpsc.subjects.find((s) => s.code === subject)?.topics.some((x) => x.code === topic);

test('60 days, phases in order, no day over two hours (beginner load)', () => {
  assert.equal(days.length, 60);
  assert.deepEqual([...new Set(days.map((d) => d.phase))], ['FOUNDATION', 'CORE', 'PYQ', 'REVISION']);
  for (const d of days) {
    assert.ok(d.minutes <= 120, `day ${d.day}: ${d.minutes} min`);
    assert.ok(d.tasks.length >= 3 && d.tasks.length <= 5, `day ${d.day}: ${d.tasks.length} tasks`);
    if (d.phase === 'FOUNDATION') assert.ok(d.minutes <= 110, `foundation day ${d.day} is lighter`);
  }
  const ids = days.flatMap((d) => d.tasks.map((x) => x.id));
  assert.equal(new Set(ids).size, ids.length, 'task ids are unique');
});

test('every chapter is a WBPSC syllabus chapter, and every Arithmetic, English and listed GS chapter is studied before Phase 3', () => {
  const learn = days.flatMap((d) => d.tasks.filter((x) => x.kind === 'learn').map((x) => ({ ...x, day: d.day })));
  for (const x of learn) assert.ok(inSyllabus(x.subject, x.topic), `${x.subject}.${x.topic}`);
  const required = learn.filter((x) => !x.optional);
  assert.ok(required.every((x) => x.day <= 36), 'new chapters only in phases 1–2');
  for (const [topic] of plan.ARITHMETIC) assert.ok(required.some((x) => x.subject === 'quant' && x.topic === topic), topic);
  for (const [topic] of plan.ENGLISH) assert.ok(required.some((x) => x.subject === 'english' && x.topic === topic), topic);
  for (const [topic] of plan.GS) assert.ok(required.some((x) => x.subject === 'gs' && x.topic === topic), topic);
  // Sessions are numbered 1…n per chapter, and Must-know chapters get more than Additional ones.
  const history = required.filter((x) => x.topic === 'indian_history');
  assert.deepEqual(history.map((x) => x.session.n), [1, 2, 3, 4, 5, 6]);
  assert.ok(history.every((x) => x.session.of === 6));
  assert.equal(required.filter((x) => x.topic === 'number_system').length, 3);
  assert.equal(required.filter((x) => x.topic === 'partnership').length, 1);
});

test('weekly test days carry the Clerkship section sizes; Phase 3 walks through real papers, Clerkship first', () => {
  for (const day of plan.WEEKLY_TEST_DAYS) {
    const mocks = days[day - 1].tasks.filter((x) => x.kind === 'mock');
    assert.deepEqual(mocks.map((x) => [x.subject, x.questions]), [['english', 30], ['gs', 40], ['quant', 30]], `day ${day}`);
  }
  const papers = days.filter((d) => d.phase === 'PYQ').flatMap((d) => d.tasks.filter((x) => x.kind === 'pyq_paper'));
  assert.deepEqual([papers[0].exam, papers[0].year], ['WBPSC Clerkship (Part-I)', 2023]);
  assert.equal(new Set(papers.map((p) => `${p.exam} ${p.year}`)).size, plan.PYQ_PAPERS.length, 'every paper once…');
  assert.match(papers.at(-1).title.en, /second attempt/, '…and the repeat is labelled');
  assert.equal(days.at(-1).tasks.some((x) => x.kind === 'rest'), true);
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
  await StudyPlanProgress.init();
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('GET /plan/clerkship-60 is public and is the same plan', async () => {
  const { status, body } = await call('GET', '/plan/clerkship-60', null, null);
  assert.equal(status, 200);
  assert.equal(body.data.days.length, 60);
  assert.deepEqual(body.data.days[0], JSON.parse(JSON.stringify(getPlan().days[0])));
});

test('progress: start, tick, untick, merge, restart; strangers and bad ids are refused', async () => {
  assert.equal((await call('GET', '/plan/clerkship-60/progress', null, null)).status, 401);
  assert.deepEqual((await call('GET', '/plan/clerkship-60/progress')).body.data, { progress: null });
  assert.equal((await call('POST', '/plan/clerkship-60/tasks', { done: ['d1-1'] })).status, 422, 'not started');

  const started = await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-11-06' });
  assert.equal(started.status, 200);
  assert.equal(started.body.data.progress.startDate, '2026-11-06');

  await call('POST', '/plan/clerkship-60/tasks', { done: ['d1-1', 'd1-2', 'd1-2'] });
  let p = (await call('POST', '/plan/clerkship-60/tasks', { done: ['d2-1'], undone: ['d1-2'] })).body.data.progress;
  assert.deepEqual(p.done.sort(), ['d1-1', 'd2-1']);

  assert.equal((await call('POST', '/plan/clerkship-60/tasks', { done: ['d61-1'] })).status, 422, 'no such task');
  assert.equal((await call('POST', '/plan/clerkship-60/tasks', { done: ['../x'] })).status, 400);
  assert.equal((await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-13-45' })).status, 400);
  assert.deepEqual((await call('GET', '/plan/clerkship-60/progress', null, 'someone_else')).body.data, { progress: null });

  p = (await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-11-10' })).body.data.progress;
  assert.equal(p.startDate, '2026-11-10');
  assert.equal(p.done.length, 2, 'moving the start date keeps ticks');
  p = (await call('PUT', '/plan/clerkship-60/progress', { startDate: '2026-11-10', reset: true })).body.data.progress;
  assert.deepEqual(p.done, [], 'restart clears ticks');
});
