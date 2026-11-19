'use strict';

/**
 * Phase 12 — the home page's Top 3 Priorities (today.service buildTopPriorities,
 * returned as `topPriorities` by GET /me/today).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { buildTopPriorities } = require('../src/services/today.service');
const catalog = require('../db/seed/catalog');

const prioRank = { high: 0, medium: 1, low: 2 };
const ch = (subject, topic, extra = {}) => ({ subject, topic, syllabus: 'in', priority: null, weight: null, hasLesson: false, ...extra });
const m = (subject, topic, stage, accuracyPct, recentAnswers = 10) => ({ subject, topic, stage, accuracyPct, recentAnswers });

test('top priorities: needs-work first, then developing, then high-priority unstarted; never strong or mastered', () => {
  const chapters = [
    ch('quant', 'interest', { priority: 'high', weight: 30 }),
    ch('gs', 'indian_history', { priority: 'high', weight: 40, hasLesson: true }),
    ch('reasoning', 'coding_decoding', { priority: 'medium' }),
    ch('english', 'grammar', { priority: 'high' }),
    ch('gs', 'polity', { priority: 'high' }),
    ch('quant', 'percentage', { priority: 'high' }),
    ch('gs', 'geography', { syllabus: 'out', priority: 'high' }),
  ];
  const mastery = [
    m('reasoning', 'coding_decoding', 'practising', 30),
    m('quant', 'interest', 'developing', 60),
    m('english', 'grammar', 'mastered', 95),
    m('gs', 'polity', 'strong', 85),
    m('quant', 'percentage', 'practising', 20),
    m('gs', 'geography', 'practising', 10),
  ];
  const top = buildTopPriorities({ chapters, mastery, prioRank });
  assert.equal(top.length, 3);
  // One per subject first: quant.percentage (needs work, high) beats coding (needs work, medium);
  // the second quant chapter waits while history (unstarted, high) is a different subject.
  assert.deepEqual(top.map((x) => `${x.subject}.${x.topic}`), ['quant.percentage', 'reasoning.coding_decoding', 'gs.indian_history']);
  assert.match(top[0].reason.en, /20% right so far/);
  assert.equal(top[0].action, 'practice');
  assert.equal(top[2].action, 'learn'); // not started, a lesson exists
  assert.ok(top.every((x) => !['english.grammar', 'gs.polity', 'gs.geography'].includes(`${x.subject}.${x.topic}`)));
});

test('top priorities: a starting-check "start here" chapter counts as needs work; no exam -> measured chapters only', () => {
  const top = buildTopPriorities({
    chapters: [ch('gs', 'polity', { priority: 'low' }), ch('quant', 'average', { priority: 'high' })],
    mastery: [],
    diagWeak: [{ subject: 'gs', topic: 'polity' }],
    prioRank,
  });
  assert.equal(`${top[0].subject}.${top[0].topic}`, 'gs.polity');
  assert.match(top[0].reason.en, /starting check/);

  const noExam = buildTopPriorities({
    chapters: [],
    mastery: [m('english', 'grammar', 'practising', 30), m('quant', 'average', 'not_started', null, 0), m('gs', 'polity', 'learning', null, 2)],
    prioRank,
  });
  assert.deepEqual(noExam.map((x) => x.topic), ['grammar']);
});

/* ------------------------------------------------------------ API */

let mongod;
let server;
let base;
async function call(method, url, { body, cookie } = {}) {
  const res = await fetch(base + url, { method, headers: { 'content-type': 'application/json', ...(cookie && { cookie }) }, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('home_priorities_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init()]);
  await ExamCategory.insertMany(catalog);
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});
test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('GET /me/today returns topPriorities led by the chapter that needs work', async () => {
  const qs = await Question.insertMany(Array.from({ length: 8 }, (_, i) => ({
    code: `HP-${i}`, exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }], subject: 'english', topic: 'grammar', difficulty: 2,
    stem: { en: `Q${i}` }, options: ['a', 'b', 'c', 'd'].map((c) => ({ oid: `opt_00000${i}${c}0`, text: { en: c } })), correct_option_id: `opt_00000${i}a0`, status: 'PUBLISHED',
  })));
  const reg = await call('POST', '/auth/register', { body: { name: 'Home Student', email: 'home-prio@example.com', password: 'secret123' } });
  const cookie = reg.setCookie.split(';')[0];
  const id = reg.body.data.user.id;
  assert.equal((await call('PUT', '/me/target-exam', { cookie, body: { examCode: 'WBPSC_CLERKSHIP' } })).status, 200);
  await PracticeAttempt.insertMany(qs.map((q, i) => ({ user_id: id, question_id: q._id, subject: 'english', topic: 'grammar', correct: i < 2, source: 'practice' })));

  const res = await call('GET', '/me/today?tz=330', { cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const top = res.body.data.topPriorities;
  assert.ok(Array.isArray(top) && top.length >= 1 && top.length <= 3, JSON.stringify(top));
  assert.equal(`${top[0].subject}.${top[0].topic}`, 'english.grammar');
  assert.equal(top[0].subjectName.en, 'English Language');
});
