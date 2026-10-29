'use strict';

/** GET /mock/session/:id/analytics: review, topic marks lost, peer percentile, cut-offs. */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, ExamCategory, ExamCutoff, MockSession } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { mockQuestionAlias } = require('../src/services/signedToken');
const catalog = require('../db/seed/catalog');

let mongod;
let server;
let base;

async function api(method, url, body, user) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', 'x-user-id': user },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

const TOPICS = ['time_work', 'percentage'];
const Q = (i) => {
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_${String(i).padStart(4, '0')}${c}`);
  return {
    code: `AN-${i}`,
    exam_targets: [{ category: 'SSC', tier: 'TIER_1' }],
    subject: 'quant',
    topic: TOPICS[i % 2],
    difficulty: (i % 5) + 1,
    expected_time_sec: 60,
    stem: { en: `Analytics question ${i}`, bn: `প্রশ্ন ${i}` },
    options: ids.map((oid, k) => ({ oid, text: { en: String(k), bn: String(k) } })),
    correct_option_id: ids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }], shortcut: { en: 'Fast way', bn: 'দ্রুত উপায়' } },
    status: 'PUBLISHED',
  };
};

async function takeTest(user, correctCount, { mark = [] } = {}) {
  const created = await api('POST', '/mock/create-session', {
    category: 'SSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10, language: 'en',
  }, user);
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const s = created.body.data;
  // SSC Quant marks come from the server: SSC CGL Tier-I, +2 / -0.5.
  assert.deepEqual([s.config.markingScheme.positive, s.config.markingScheme.negative, s.config.markingScheme.basis], [2, 0.5, 'OFFICIAL']);
  // The live test shows per-session aliases; the stored key is by real id.
  const doc = await MockSession.findById(s.sessionId).select('+answer_key').lean();
  const key = Object.fromEntries(doc.questions.map((q) => [mockQuestionAlias(s.sessionId, String(q.qid)), doc.answer_key[String(q.qid)]]));
  const responses = s.questions.map((q, i) => ({
    questionId: q.questionId,
    selectedOptionId: i < correctCount ? key[q.questionId] : i < 8 ? q.options.find((o) => o.optionId !== key[q.questionId]).optionId : null,
    timeSpentSec: 30 + i,
    markedForReview: mark.includes(i),
  }));
  const sub = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  return s.sessionId;
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('analytics_test'));
  await Promise.all([Question.init(), ExamCategory.init(), ExamCutoff.init(), MockSession.init()]);
  await ExamCategory.insertMany(catalog);
  await Question.insertMany(Array.from({ length: 60 }, (_, i) => Q(i)));
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('analytics is only for the owner, after submission', async () => {
  const created = await api('POST', '/mock/create-session', {
    category: 'SSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10,
  }, 'early_bird');
  const early = await api('GET', `/mock/session/${created.body.data.sessionId}/analytics`, null, 'early_bird');
  assert.equal(early.status, 409, 'no answer leak before submitting');
  assert.equal((await api('GET', `/mock/session/${created.body.data.sessionId}/analytics`, null, 'someone_else')).status, 404);
});

test('review, marks lost per topic, weakest topic, peers and cut-offs', async () => {
  const id = await takeTest('student_main', 6, { mark: [1, 7] });

  let { status, body } = await api('GET', `/mock/session/${id}/analytics`, null, 'student_main');
  assert.equal(status, 200, JSON.stringify(body));
  let d = body.data;

  // 6 correct (+12), 2 wrong (-1), 2 blank: 11 / 20
  assert.equal(d.result.score, 11);
  assert.equal(d.review.length, 10);
  const first = d.review[0];
  assert.ok(first.stem.en && first.options.length === 4 && first.correctOptionId);
  assert.deepEqual(first.explanation.shortcut, { en: 'Fast way', bn: 'দ্রুত উপায়' });
  assert.deepEqual(d.review.filter((r) => r.markedForReview).map((r) => r.seq), [2, 8]);
  assert.equal(d.review[6].marksLost, 2.5); // wrong: missed +2 and paid −0.5
  assert.equal(d.review[9].marksLost, 2); // blank: missed +2

  const lost = d.topicBreakdown.reduce((s, t) => s + t.marksLost, 0);
  assert.equal(lost, 20 - 11, 'marks lost add up to the gap from full marks');
  assert.equal(d.weakestTopic.topic, d.topicBreakdown[0].topic);
  assert.ok(d.topicNames.time_work.en === 'Time & Work');

  assert.deepEqual(d.peers, { available: false, peers: 0, minPeers: 5, basis: { category: 'SSC', subject: 'quant', questionCount: 10 } });
  assert.deepEqual(d.cutoffs, []);

  // Five comparable submissions (4, 5, 6, 7, 8 correct) + an official cut-off.
  for (const [i, n] of [4, 5, 6, 7, 8].entries()) await takeTest(`peer_${i}`, n);
  await ExamCutoff.create({
    category: 'SSC', exam_code: 'SSC_CGL', exam_name: 'SSC CGL', stage: 'TIER_1', year: 2099, reservation: 'General',
    score: 150, max_score: 200, source_url: 'https://ssc.gov.in/example-notice',
  });
  ({ body } = await api('GET', `/mock/session/${id}/analytics`, null, 'student_main'));
  d = body.data;
  // Peer scores 7,9,11,13,15 of 20; mine 11: 2 below, 1 equal -> (2 + 0.5)/5 = 50th percentile, rank 3 of 6
  assert.deepEqual({ p: d.peers.percentile, rank: d.peers.rank, of: d.peers.of }, { p: 50, rank: 3, of: 6 });
  assert.equal(d.cutoffs[0].pct, 75);
  assert.equal(d.cutoffs[0].sourceUrl, 'https://ssc.gov.in/example-notice');
});
