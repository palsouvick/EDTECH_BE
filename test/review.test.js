'use strict';

/**
 * Revision queue (spaced repetition) and mistake notebook: mistakes and
 * bookmarks go in, reviews move them along 1/3/7/21 days, two right in a row
 * retire them.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, ReviewItem } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { endOfLocalDay } = require('../src/services/review.service');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');
const samples = require('../db/seed/pyq-sample-25.json');

let mongod;
let server;
let base;
const DAY = 86_400_000;

async function api(method, url, body, user = 'student_r') {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

let q1;
let q2;
let correct1;
let wrong1;

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('review_test'));
  await Promise.all([Question.init(), ReviewItem.init()]);
  const docs = samples.slice(0, 2).map((s, i) => convertExamStyleQuestion(s, { index: i }).doc);
  const [a, b] = await Question.insertMany(docs);
  q1 = String(a._id);
  q2 = String(b._id);
  correct1 = docs[0].correct_option_id;
  wrong1 = docs[0].options.find((o) => o.oid !== correct1).oid;
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

const settle = () => new Promise((r) => setTimeout(r, 100)); // mistakes are recorded without blocking the answer
const makeDue = (id) => ReviewItem.updateOne({ user_id: 'student_r', question_id: id }, { $set: { due_at: new Date(Date.now() - 1000) } });

test('end of local day follows the student clock', () => {
  const now = new Date('2026-10-23T20:00:00Z'); // 01:30 on the 24th in India
  assert.equal(endOfLocalDay(330, now).toISOString(), '2026-10-24T18:29:59.999Z');
  assert.equal(endOfLocalDay(0, now).toISOString(), '2026-10-23T23:59:59.999Z');
});

test('a wrong practice answer joins the queue, due tomorrow; a right one does not', async () => {
  await api('POST', '/practice/verify-answer', { questionId: q1, selectedOptionId: wrong1 });
  await api('POST', '/practice/verify-answer', { questionId: q2, selectedOptionId: (await Question.findById(q2).select('+correct_option_id')).correct_option_id });
  await settle();
  const items = await ReviewItem.find({ user_id: 'student_r' }).lean();
  assert.equal(items.length, 1);
  assert.equal(items[0].last_wrong_option_id, wrong1);
  assert.ok(Math.abs(items[0].due_at - Date.now() - DAY) < 60_000, 'due in one day');

  const s = (await api('GET', '/review/summary?tz=330')).body.data;
  assert.equal(s.active, 1);
  assert.equal(s.mistakesActive, 1);
  assert.equal(s.dueToday, items[0].due_at <= endOfLocalDay(330) ? 1 : 0);
});

test('reviews: right -> next interval, right again -> mastered; wrong resets', async () => {
  await makeDue(q1);
  const due = (await api('GET', '/review/due?tz=330')).body.data;
  assert.equal(due.items.length, 1);
  assert.equal(due.items[0].reason, 'mistake');
  assert.ok(!('correctOptionId' in due.items[0].question));

  // Wrong in review: back to the start.
  let r = (await api('POST', '/review/answer', { questionId: q1, selectedOptionId: wrong1 })).body.data;
  assert.equal(r.isCorrect, false);
  assert.equal(r.review.streak, 0);
  assert.ok(r.explanation.items.length > 0);

  await makeDue(q1);
  r = (await api('POST', '/review/answer', { questionId: q1, selectedOptionId: correct1 })).body.data;
  assert.deepEqual([r.isCorrect, r.review.status, r.review.streak], [true, 'active', 1]);
  assert.ok(Math.abs(new Date(r.review.nextDueAt) - Date.now() - 3 * DAY) < 60_000, 'next review in 3 days');

  await makeDue(q1);
  r = (await api('POST', '/review/answer', { questionId: q1, selectedOptionId: correct1 })).body.data;
  assert.equal(r.review.status, 'mastered');
  assert.equal((await api('POST', '/review/answer', { questionId: q1, selectedOptionId: correct1 })).status, 404, 'no longer in the queue');
  assert.deepEqual((await api('GET', '/review/summary')).body.data.mastered, 1);
});

test('mistake notebook: still wrong vs fixed, with your answer, the right one and the explanation', async () => {
  const fixed = (await api('GET', '/review/mistakes?status=mastered')).body.data;
  assert.deepEqual(fixed.counts, { active: 0, mastered: 1 });
  const m = fixed.items[0];
  assert.deepEqual([m.yourOptionId, m.correctOptionId, m.wrongCount], [wrong1, correct1, 2]);
  assert.ok(m.steps.length && m.topicName.en);
  assert.equal(fixed.groups[0].count, 1);
  assert.equal((await api('GET', '/review/mistakes')).body.data.total, 0);

  // A new mistake brings a mastered question back.
  await api('POST', '/practice/verify-answer', { questionId: q1, selectedOptionId: wrong1 });
  await settle();
  assert.deepEqual((await api('GET', '/review/mistakes?status=all')).body.data.counts, { active: 1, mastered: 0 });
});

test('bookmarks join the queue; un-bookmarking removes them unless they were mistakes', async () => {
  await api('PUT', `/practice/bookmarks/${q2}`);
  let item = await ReviewItem.findOne({ user_id: 'student_r', question_id: q2 }).lean();
  assert.deepEqual([item.from_bookmark, item.from_mistake, item.status], [true, false, 'active']);
  await api('DELETE', `/practice/bookmarks/${q2}`);
  assert.equal(await ReviewItem.countDocuments({ user_id: 'student_r', question_id: q2 }), 0);

  await api('PUT', `/practice/bookmarks/${q1}`);
  await api('DELETE', `/practice/bookmarks/${q1}`);
  item = await ReviewItem.findOne({ user_id: 'student_r', question_id: q1 }).lean();
  assert.deepEqual([item.from_bookmark, item.from_mistake], [false, true], 'a mistake stays queued');
});

test('Learn Basics quiz mistakes are queued too; everything needs sign-in', async () => {
  const q2doc = await Question.findById(q2).select('+correct_option_id').lean();
  const wrong2 = q2doc.options.find((o) => o.oid !== q2doc.correct_option_id).oid;
  await api('POST', '/learn/quiz/check', { subject: q2doc.subject, topic: q2doc.topic, answers: [{ questionId: q2, selectedOptionId: wrong2 }] });
  await settle();
  const item = await ReviewItem.findOne({ user_id: 'student_r', question_id: q2 }).lean();
  assert.deepEqual([item.from_mistake, item.last_wrong_source], [true, 'learn']);

  for (const path of ['/review/summary', '/review/due', '/review/mistakes']) assert.equal((await api('GET', path, null, null)).status, 401);
  assert.equal((await api('GET', '/review/summary', null, 'someone_else')).body.data.active, 0);
});
