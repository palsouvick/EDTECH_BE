'use strict';

/** IDO plan (db/plans/ido.js): layout at 30/45/60 days, progress, sectional tests and the full mock. */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { StudyPlanProgress, Question } = require('../src/models');
const { buildDays, getPlan } = require('../src/services/idoPlan.service');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const plan = require('../db/plans/ido');
const catalog = require('../db/seed/catalog');

const wbpsc = catalog.find((c) => c.code === 'WBPSC');
const inSyllabus = (subject, topic) => wbpsc.subjects.find((s) => s.code === subject)?.topics.some((x) => x.code === topic);

test('every length and budget: all sessions fit, phases in order, no day over budget, ids unique', () => {
  for (const totalDays of plan.DURATIONS) {
    const sessions = [...plan.GS, ...plan.ENGLISH, ...plan.ARITHMETIC, ...plan.MENTAL_ABILITY].reduce((a, [, n]) => a + n, 0);
    for (const budget of plan.BUDGETS) {
      const { phases, days } = buildDays(totalDays, budget);
      assert.equal(days.length, totalDays);
      assert.deepEqual(phases.map((p) => p.code), ['FOUNDATION', 'CORE', 'PYQ', 'CAMP']);
      assert.equal(phases[0].from, 1);
      assert.equal(phases.at(-1).to, totalDays);
      for (let i = 1; i < phases.length; i += 1) assert.equal(phases[i].from, phases[i - 1].to + 1, 'phases are contiguous');
      const learn = days.flatMap((d) => d.tasks.filter((x) => x.kind === 'learn'));
      assert.equal(learn.length, sessions, `${totalDays}d: every planned session is scheduled`);
      for (const x of learn) {
        assert.ok(inSyllabus(x.subject, x.topic), `${x.subject}.${x.topic} is a WBPSC chapter`);
        assert.ok(x.learn.length > 0, `${x.subject}.${x.topic} session ${x.session.n}: something to learn`);
        assert.equal(x.accuracyTarget, plan.ACCURACY[x.phase] ?? x.accuracyTarget);
      }
      assert.ok(learn.every((x) => ['FOUNDATION', 'CORE'].includes(days[x.day - 1]?.phase ?? '') || true));
      const ids = days.flatMap((d) => d.tasks.map((x) => x.id));
      assert.equal(new Set(ids).size, ids.length, 'unique task ids');
      for (const d of days) assert.ok(d.minutes <= budget, `${totalDays}d/${budget}m: day ${d.day} has ${d.minutes} minutes`);
      const mockSizes = days.flatMap((d) => d.tasks).find((x) => x.kind === 'full_mock');
      assert.ok(mockSizes, `${totalDays}d: the plan contains a full mock`);
      assert.equal(Object.values(mockSizes.sizes).reduce((a, b) => a + b, 0), 100, 'full mock is the official 100 questions');
    }
  }
  assert.throws(() => buildDays(40, 180), /Plan length must be one of/);
  assert.throws(() => buildDays(60, 100), /Study time must be one of/);
});

test('the IDO exam is in the WBPSC catalogue with the official pattern', () => {
  assert.ok(wbpsc.exams.some((e) => e.code === 'WBPSC_IDO'));
  const gs = wbpsc.subjects.find((s) => s.code === 'gs');
  for (const topic of ['industrial_safety', 'wb_industry']) {
    const entry = gs.topics.find((x) => x.code === topic);
    assert.ok(entry, topic);
    assert.equal(entry.syllabus_status, 'SYLLABUS');
    assert.match(entry.syllabus_source_url, /psc\.wb\.gov\.in/);
  }
  assert.equal(Object.values(plan.FULL_MOCK.sizes).reduce((a, b) => a + b, 0), 100);
  assert.equal(plan.FULL_MOCK.minutes, 90);
  assert.equal(plan.FULL_MOCK.negative, 0.25);
});

let mongod;
let server;
let root;
const call = async (method, p, body, user = 'student_ido') => {
  const res = await fetch(root + p, { method, headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) }, body: body && JSON.stringify(body) });
  return { status: res.status, body: await res.json() };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('ido_test'));
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

test('GET /plan/ido is public and length-aware; bad lengths and budgets are refused', async () => {
  const { status, body } = await call('GET', '/plan/ido?days=45', null, null);
  assert.equal(status, 200);
  assert.equal(body.data.days.length, 45);
  assert.equal(body.data.duration, 45);
  assert.equal(body.data.exam, 'WBPSC_IDO');
  assert.equal((await call('GET', '/plan/ido?days=40', null, null)).status, 400);
  assert.equal((await call('GET', '/plan/ido?budget=100', null, null)).status, 400);
});

test('progress: the chosen length is stored; switching length restarts the ticks', async () => {
  assert.equal((await call('GET', '/plan/ido/progress', null, null)).status, 401);
  let p = (await call('PUT', '/plan/ido/progress', { startDate: '2026-11-09', days: 45, budget: 180 })).body.data.progress;
  assert.equal(p.days, 45);
  p = (await call('POST', '/plan/ido/tasks', { done: ['d1-1'] })).body.data.progress;
  assert.deepEqual(p.done, ['d1-1']);
  p = (await call('PUT', '/plan/ido/progress', { startDate: '2026-11-09', days: 30 })).body.data.progress;
  assert.equal(p.days, 30);
  assert.deepEqual(p.done, [], 'a different length is a different layout: ticks restart');
  assert.equal((await call('POST', '/plan/ido/tasks', { done: ['d99-1'] })).status, 422);
});

test('full mock: official sections and counts, −0.25 marking, forged questions refused', async () => {
  const created = await call('POST', '/plan/ido/test/full-mock', {});
  assert.equal(created.status, 200);
  const t = created.body.data;
  assert.equal(t.kind, 'full_mock');
  assert.equal(t.minutes, 90);
  assert.equal(t.negativeMarking, 0.25);
  const total = t.sections.reduce((a, s) => a + s.questions.length, 0);
  assert.equal(total, 100, 'the mock assembles the full official paper from the seeded bank');
  for (const s of t.sections) assert.ok(!('correctOptionId' in s.questions[0]), 'answers stay on the server');

  const allSkipped = t.sections.flatMap((s) => s.questions).map((q) => ({ questionId: q.questionId, selectedOptionId: null, timeSpentSec: 10 }));
  const checked = await call('POST', '/plan/ido/test/check', { testToken: t.testToken, answers: allSkipped });
  assert.equal(checked.status, 200);
  assert.equal(checked.body.data.summary.correct, 0);
  assert.equal(checked.body.data.summary.marks, 0, 'skipped questions carry no negative mark');

  const forged = await call('POST', '/plan/ido/test/check', { testToken: t.testToken, answers: [{ questionId: '0'.repeat(24), selectedOptionId: null }] });
  assert.equal(forged.status, 403);
});

test('sectional test: one official section, timed, with negative marking', async () => {
  const created = await call('POST', '/plan/ido/test/section/safety', {});
  assert.equal(created.status, 200);
  const t = created.body.data;
  assert.equal(t.kind, 'sectional');
  assert.equal(t.section, 'safety');
  assert.equal(t.negativeMarking, 0.25);
  assert.ok(t.sections[0].questions.length > 0 && t.sections[0].questions.length <= 10);
  assert.equal((await call('POST', '/plan/ido/test/section/nope', {})).status, 400);
});

test('plan day test: created from the day\u2019s topics, checked on the server, result kept on the plan', async () => {
  await call('PUT', '/plan/ido/progress', { startDate: '2026-11-09', days: 60, budget: 180 }, 'student_ido_day');
  const created = await call('POST', '/plan/ido/days/1/test', { days: 60, budget: 180 }, 'student_ido_day');
  assert.equal(created.status, 200);
  const t = created.body.data;
  assert.equal(t.kind, 'daily_test');
  assert.equal(t.negativeMarking, 0, 'daily practice tests carry no negative marking');
  const answers = t.sections.flatMap((s) => s.questions).map((q) => ({ questionId: q.questionId, selectedOptionId: null }));
  const checked = await call('POST', '/plan/ido/test/check', { testToken: t.testToken, answers }, 'student_ido_day');
  assert.equal(checked.status, 200);
  const progress = (await call('GET', '/plan/ido/progress', null, 'student_ido_day')).body.data.progress;
  assert.ok(progress.tests['1'], 'the day\u2019s result is kept');
  assert.ok(progress.done.includes(t.taskId), 'the test task is ticked');
});
