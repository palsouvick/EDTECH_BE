'use strict';

/**
 * Practice Arena endpoints: cursor stream, bookmarks, error reports.
 * Seed data deliberately has many ties on (difficulty, latest_pyq_year) and
 * null years, the cases keyset pagination usually gets wrong.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, Bookmark, QuestionReport } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { PRACTICE_SORT } = require('../src/services/practice.service');

let mongod;
let server;
let base;

async function api(method, url, body, user = 'student_7') {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

const Q = (i, extra = {}) => {
  const ids = ['a', 'b', 'c'].map((c) => `opt_${String(i).padStart(4, '0')}${c}`);
  const year = [null, 2019, 2023, 2023, null][i % 5];
  return {
    code: `AR-${i}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'quant',
    topic: 'ratio_proportion',
    difficulty: (i % 3) + 1,
    stem: { en: `Ratio question ${i}`, bn: `অনুপাত প্রশ্ন ${i}` },
    options: ids.map((oid, k) => ({ oid, text: { en: String(k), bn: String(k) } })),
    correct_option_id: ids[0],
    solution: {
      steps: [{ en: 'Step one', bn: 'প্রথম ধাপ' }, { en: 'Step two', bn: 'দ্বিতীয় ধাপ' }],
      traps: [{ option_id: ids[1], note: { en: 'Inverted the ratio', bn: 'অনুপাত উল্টে ফেলেছেন' } }],
    },
    // Odd questions cite the commission's paper and key (a real PYQ); even ones do not, so they get no badge.
    pyq: year ? { refs: [{ exam_name: 'WBCS', tier: 'PRELIMS', year, question_code: `WBCS-${year}-Q${i}`, ...(i % 2 && { source_url: 'https://psc.wb.gov.in/Download?param1=wbcs.pdf', answer_key_url: 'https://psc.wb.gov.in/Download?param1=wbcs-key.pdf' }) }] } : {},
    status: 'PUBLISHED',
    ...extra,
  };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('arena_test'));
  await Promise.all([Question.init(), Bookmark.init(), QuestionReport.init()]);
  await Question.insertMany([
    ...Array.from({ length: 47 }, (_, i) => Q(i + 1)),
    Q(900, { status: 'DRAFT' }),
    Q(901, { topic: 'percentage' }),
  ]);
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1/practice`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

const STREAM = '/questions?category=WBPSC&subject=quant&topic=ratio_proportion&language=bn';

test('cursor walk returns every question exactly once, in practice order', async () => {
  const seen = [];
  let cursor = null;
  let pages = 0;
  do {
    const { status, body } = await api('GET', `${STREAM}&limit=4${cursor ? `&cursor=${cursor}` : ''}`);
    assert.equal(status, 200, JSON.stringify(body));
    seen.push(...body.data.questions.map((q) => q.questionId));
    cursor = body.data.nextCursor;
    assert.equal(body.data.hasMore, cursor !== null);
    pages += 1;
  } while (cursor && pages < 50);

  const expected = await Question.find({ status: 'PUBLISHED', topic: 'ratio_proportion' }).sort(PRACTICE_SORT).select('_id').lean();
  assert.equal(new Set(seen).size, seen.length, 'no duplicates');
  assert.deepEqual(seen, expected.map((q) => String(q._id)));
  assert.equal(seen.length, 47);
  assert.equal(pages, 12);
});

test('stream payload: PYQ tier for badges, bookmark flags, no answers', async () => {
  const { body } = await api('GET', `${STREAM}&limit=20`);
  const withPyq = body.data.questions.find((q) => q.pyq.length);
  assert.deepEqual(Object.keys(withPyq.pyq[0]).sort(), ['examName', 'shift', 'sourceUrl', 'tier', 'year']);
  assert.equal(withPyq.pyq[0].tier, 'PRELIMS');
  assert.match(withPyq.pyq[0].sourceUrl, /^https:\/\/psc\.wb\.gov\.in\//);
  // A ref without the official paper and answer key is never shown as a PYQ.
  const unsourced = await Question.find({ 'pyq.is_pyq': true, 'pyq.refs.source_url': { $exists: false } }).select('_id').lean();
  assert.ok(unsourced.length > 0);
  const unsourcedIds = new Set(unsourced.map((q) => String(q._id)));
  assert.ok(body.data.questions.filter((q) => unsourcedIds.has(q.questionId)).every((q) => q.pyq.length === 0));
  assert.ok(body.data.questions.every((q) => q.bookmarked === false));
  assert.doesNotMatch(JSON.stringify(body), /correct|solution|traps/);
});

test('malformed cursors are rejected', async () => {
  const forged = Buffer.from(JSON.stringify({ d: 9, y: null, id: 'x' })).toString('base64url');
  assert.equal((await api('GET', `${STREAM}&cursor=${forged}`)).status, 400);
  assert.equal((await api('GET', `${STREAM}&cursor=not*valid`)).status, 400);
});

test('bookmarks: add is idempotent, flag shows in the stream, remove works, auth required', async () => {
  const { body } = await api('GET', `${STREAM}&limit=2`);
  const qid = body.data.questions[1].questionId;

  assert.equal((await api('PUT', `/bookmarks/${qid}`)).status, 200);
  assert.equal((await api('PUT', `/bookmarks/${qid}`)).status, 200);
  assert.equal(await Bookmark.countDocuments({ user_id: 'student_7' }), 1);

  const again = await api('GET', `${STREAM}&limit=2`);
  assert.equal(again.body.data.questions[1].bookmarked, true);
  const otherUser = await api('GET', `${STREAM}&limit=2`, null, 'someone_else');
  assert.equal(otherUser.body.data.questions[1].bookmarked, false);

  assert.equal((await api('DELETE', `/bookmarks/${qid}`)).status, 200);
  assert.equal(await Bookmark.countDocuments({ user_id: 'student_7' }), 0);

  assert.equal((await api('PUT', `/bookmarks/${qid}`, null, null)).status, 401);
  const draft = await Question.findOne({ code: 'AR-900' }).lean();
  assert.equal((await api('PUT', `/bookmarks/${draft._id}`)).status, 404);
});

test('bookmarks list: newest first, per-chapter counts, filter, no answers, only my own, auth required', async () => {
  const { body } = await api('GET', `${STREAM}&limit=3`);
  const [a, b, c] = body.data.questions.map((q) => q.questionId);
  for (const id of [a, b, c]) assert.equal((await api('PUT', `/bookmarks/${id}`)).status, 200);
  await api('PUT', `/bookmarks/${a}`, null, 'someone_else');

  const list = await api('GET', '/bookmarks');
  assert.equal(list.status, 200);
  assert.equal(list.body.data.total, 3);
  assert.deepEqual(list.body.data.items.map((i) => i.question.questionId), [c, b, a]);
  assert.ok(list.body.data.items.every((i) => i.question.stem && !('correctOptionId' in i.question)));
  const g = list.body.data.groups[0];
  assert.equal(g.count, 3);
  assert.equal(g.topicName.en, 'Ratio & Proportion');

  const page = await api('GET', '/bookmarks?limit=2&offset=2');
  assert.deepEqual([page.body.data.items.length, page.body.data.hasMore], [1, false]);
  assert.equal((await api('GET', `/bookmarks?subject=quant&topic=${g.topic}`)).body.data.total, 3);
  assert.equal((await api('GET', '/bookmarks?topic=ages')).body.data.total, 0);
  assert.equal((await api('GET', '/bookmarks', null, null)).status, 401);

  await Bookmark.deleteMany({});
});

test('report-error: created, deduplicated per user, anonymous allowed, validated', async () => {
  const q = await Question.findOne({ code: 'AR-3' }).lean();
  const payload = { questionId: String(q._id), reason: 'TRANSLATION', message: 'বাংলা অনুবাদে ভুল', language: 'bn' };

  const first = await api('POST', '/report-error', payload);
  assert.equal(first.status, 201);
  assert.equal(first.body.data.duplicate, false);

  const repeat = await api('POST', '/report-error', payload);
  assert.equal(repeat.status, 200);
  assert.equal(repeat.body.data.duplicate, true);

  assert.equal((await api('POST', '/report-error', payload, null)).status, 201);
  assert.equal((await api('POST', '/report-error', payload, null)).status, 201, 'anonymous reports are not deduplicated');
  assert.equal(await QuestionReport.countDocuments(), 3);

  const bad = await api('POST', '/report-error', { ...payload, reason: 'BORING' });
  assert.equal(bad.status, 400);
});

test('verify-answer returns per-step localized explanation items and the trap for the chosen option', async () => {
  const q = await Question.findOne({ code: 'AR-3' }).lean();
  const { body } = await api('POST', '/verify-answer', { questionId: String(q._id), selectedOptionId: 'opt_0003b' });
  assert.equal(body.data.isCorrect, false);
  assert.deepEqual(body.data.explanation.items, [
    { en: 'Step one', bn: 'প্রথম ধাপ' },
    { en: 'Step two', bn: 'দ্বিতীয় ধাপ' },
  ]);
  assert.deepEqual(body.data.trapForSelected, { en: 'Inverted the ratio', bn: 'অনুপাত উল্টে ফেলেছেন' });
});
