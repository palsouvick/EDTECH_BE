'use strict';

/**
 * Mock Papers Phase 1 API: admin create/review/publish, student
 * list/detail/attempt/submit, publish blocks, edit/delete rules,
 * ownership, double-submit, validation, and isolation from
 * MockSession/ReviewItem.
 *
 * Admin auth follows the established pattern in test/books.test.js and
 * test/questionBulkImport.test.js: the admin email is pushed into
 * config.auth.adminEmails, the admin registers and logs in through
 * /auth, and the session cookie is sent on /admin/* calls (the dev
 * x-user-id header never qualifies for requireAdmin). Students act
 * through the x-user-id header (ALLOW_DEV_USER_HEADER=true in
 * test/test.env), as in test/stuck.test.js.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const config = require('../src/config');
const { createApp } = require('../src/app');
const { MockPaper, MockPaperAttempt, MockSession, ReviewItem, User } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');

const ADMIN_EMAIL = 'mock-papers-admin@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);

let mongod;
let server;
let base;
let adminCookie;

async function call(method, url, { body, cookie, user } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }), ...(user && { 'x-user-id': user }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

const admin = (method, url, body) => call(method, url, { body, cookie: adminCookie });
const student = (method, url, body, user) => call(method, url, { body, user });

const FLOW_TEXT = `Mock Paper One
From a Telegram group

1. What is the capital of West Bengal?
(A) Delhi (B) Kolkata (C) Mumbai (D) Chennai
Answer: B
Explanation: Kolkata is the capital of West Bengal.

2. What is 2 + 3?
(A) 4 (B) 5 (C) 6 (D) 7
Answer: B

3. Which river flows through Kolkata?
(A) Ganga (B) Yamuna (C) Godavari (D) Narmada`;

const SIMPLE_TEXT = `1. What is 2 + 2?
(A) 3 (B) 4 (C) 5 (D) 6
Answer: B
2. What is the capital of India?
(A) Mumbai (B) Delhi (C) Chennai (D) Kolkata
Answer: B`;

async function createDraft(text, overrides = {}) {
  const res = await admin('POST', '/admin/mock-papers', {
    title: overrides.title || 'Test Paper',
    sourceLabel: overrides.sourceLabel || 'Test source',
    ...(overrides.subject && { subject: overrides.subject }),
    text,
  });
  assert.equal(res.status, 201, JSON.stringify(res.body));
  return res.body.data.paper;
}

async function publishPaper(id) {
  const res = await admin('POST', `/admin/mock-papers/${id}/publish`);
  assert.equal(res.status, 200, JSON.stringify(res.body));
  return res.body.data.paper;
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('mock_papers_test'));
  await Promise.all([MockPaper.init(), MockPaperAttempt.init(), MockSession.init(), ReviewItem.init(), User.init()]);
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;

  const reg = await call('POST', '/auth/register', { body: { name: 'Mock Admin', email: ADMIN_EMAIL, password: 'safe-password-123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  // Log in capturing the session cookie directly (the `call` helper drops headers).
  const raw = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }),
  });
  assert.equal(raw.status, 200);
  adminCookie = raw.headers.get('set-cookie')?.split(';')[0];
  assert.ok(adminCookie);
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('admin gate: anonymous 401, dev-header student 403, admin allowed', async () => {
  assert.equal((await call('GET', '/admin/mock-papers')).status, 401);
  assert.equal((await call('GET', '/admin/mock-papers', { user: 'mp_student_gate' })).status, 403);
  assert.equal((await call('POST', '/admin/mock-papers', { user: 'mp_student_gate', body: { title: 'X', sourceLabel: 'Y', text: SIMPLE_TEXT } })).status, 403);
  const list = await admin('GET', '/admin/mock-papers');
  assert.equal(list.status, 200);
  assert.deepEqual(list.body.data.papers, []);
});

test('student routes require auth', async () => {
  assert.equal((await call('GET', '/mock-papers')).status, 401);
  const list = await student('GET', '/mock-papers', null, 'mp_student_auth');
  assert.equal(list.status, 200);
});

test('create validates: blank text 400, missing title 400', async () => {
  assert.equal((await admin('POST', '/admin/mock-papers', { title: 'T', sourceLabel: 'S', text: '   ' })).status, 400);
  assert.equal((await admin('POST', '/admin/mock-papers', { sourceLabel: 'S', text: SIMPLE_TEXT })).status, 400);
});

test('full flow: create -> fix via PUT -> publish -> take -> submit -> retake', async () => {
  const user = 'mp_flow_student';
  const paper = await createDraft(FLOW_TEXT, { title: 'Flow Paper', sourceLabel: 'Telegram group' });
  assert.equal(paper.status, 'DRAFT');
  assert.equal(paper.language, 'en');
  assert.equal(paper.questions.length, 3);
  assert.equal(paper.unparsed.length, 1, 'preamble is kept as an unparsed block');
  assert.equal(paper.questions[0].correctIndex, 1);
  assert.equal(paper.questions[0].explanationEn, 'Kolkata is the capital of West Bengal.');
  assert.equal(paper.questions[2].correctIndex, null, 'Q3 has no answer anywhere');
  const paperId = paper.id;

  // Drafts are invisible to students.
  assert.deepEqual((await student('GET', '/mock-papers', null, user)).body.data.papers, []);
  const draftDetail = await student('GET', `/mock-papers/${paperId}`, null, user);
  assert.equal(draftDetail.status, 404);
  assert.equal(draftDetail.body.error.code, 'PAPER_NOT_FOUND');
  const draftStart = await student('POST', `/mock-papers/${paperId}/attempts`, null, user);
  assert.equal(draftStart.status, 404);

  // Publish blocks, in contract check order: missing answers before unparsed blocks.
  const blocked = await admin('POST', `/admin/mock-papers/${paperId}/publish`);
  assert.equal(blocked.status, 409);
  assert.equal(blocked.body.error.code, 'MISSING_ANSWERS');

  // Fix the missing answer via PUT, keeping the unparsed block.
  const fixed = await admin('PUT', `/admin/mock-papers/${paperId}`, {
    questions: paper.questions.map((q) => ({ ...q, correctIndex: q.correctIndex ?? 0 })),
  });
  assert.equal(fixed.status, 200, JSON.stringify(fixed.body));
  assert.equal(fixed.body.data.paper.questions[2].correctIndex, 0);
  const blocked2 = await admin('POST', `/admin/mock-papers/${paperId}/publish`);
  assert.equal(blocked2.status, 409);
  assert.equal(blocked2.body.error.code, 'UNPARSED_BLOCKS');

  // Discard the unparsed block, then publish.
  const discarded = await admin('PUT', `/admin/mock-papers/${paperId}`, { unparsed: [] });
  assert.equal(discarded.status, 200);
  assert.deepEqual(discarded.body.data.paper.unparsed, []);
  const published = await publishPaper(paperId);
  assert.equal(published.status, 'PUBLISHED');

  // Student list + detail carry no answers or explanations.
  const list = await student('GET', '/mock-papers', null, user);
  assert.equal(list.status, 200);
  assert.equal(list.body.data.papers.length, 1);
  const summary = list.body.data.papers[0];
  assert.equal(summary.questionCount, 3);
  assert.equal(summary.timeLimitMin, 3);
  assert.deepEqual(summary.myAttempts, { count: 0, bestScore: null });
  assert.ok(!JSON.stringify(list.body).includes('correctIndex'), 'no answer leak in list');
  assert.ok(!JSON.stringify(list.body).includes('correct_index'), 'no answer leak in list');

  const detail = await student('GET', `/mock-papers/${paperId}`, null, user);
  assert.equal(detail.status, 200);
  assert.equal(detail.body.data.questions.length, 3);
  assert.ok(detail.body.data.questions.every((q) => q.options.length === 4));
  const detailJson = JSON.stringify(detail.body);
  assert.ok(!detailJson.includes('correctIndex'), 'no answer leak in detail');
  assert.ok(!detailJson.includes('explanation'), 'no explanation leak in detail');

  // Isolation snapshot before any attempt activity.
  const sessionsBefore = await MockSession.countDocuments();
  const reviewsBefore = await ReviewItem.countDocuments();

  // Start: a permutation, questions in attempt order, no answers.
  const start = await student('POST', `/mock-papers/${paperId}/attempts`, null, user);
  assert.equal(start.status, 201, JSON.stringify(start.body));
  const { attempt, questions } = start.body.data;
  assert.deepEqual([...attempt.order].sort((a, b) => a - b), [0, 1, 2], 'order is a permutation');
  assert.equal(attempt.timeLimitMin, 3, '1 minute per question');
  assert.equal(questions.length, 3);
  assert.deepEqual(questions.map((q) => q.questionIndex), attempt.order);
  const startJson = JSON.stringify(start.body);
  assert.ok(!startJson.includes('correctIndex'), 'no answer leak at start');
  assert.ok(!startJson.includes('explanation'), 'no explanation leak at start');
  const attemptId = attempt.id;

  // Active attempt re-read: same shape, still no leak.
  const reread = await student('GET', `/mock-papers/attempts/${attemptId}`, null, user);
  assert.equal(reread.status, 200);
  assert.deepEqual(reread.body.data.questions.map((q) => q.questionIndex), attempt.order);
  assert.ok(!JSON.stringify(reread.body).includes('correctIndex'));

  // My attempts list: one ACTIVE, best score still null.
  const mine = await student('GET', `/mock-papers/${paperId}/attempts`, null, user);
  assert.equal(mine.body.data.attempts.length, 1);
  assert.equal(mine.body.data.attempts[0].status, 'ACTIVE');
  assert.deepEqual((await student('GET', '/mock-papers', null, user)).body.data.papers[0].myAttempts, { count: 1, bestScore: null });

  // Ownership: another student gets 404, for both read and submit.
  assert.equal((await student('GET', `/mock-papers/attempts/${attemptId}`, null, 'mp_flow_other')).status, 404);
  const otherSubmit = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, { answers: [] }, 'mp_flow_other');
  assert.equal(otherSubmit.status, 404);
  assert.equal(otherSubmit.body.error.code, 'ATTEMPT_NOT_FOUND');

  // Submit: first question in attempt order wrong, the rest right -> score 2.
  const stored = await MockPaper.findById(paperId).lean();
  const answers = questions.map((q, i) => {
    const right = stored.questions[q.questionIndex].correct_index;
    return { questionIndex: q.questionIndex, selected: i === 0 ? (right + 1) % 4 : right };
  });
  const sub = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, { answers }, user);
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  assert.equal(sub.body.data.attempt.score, 2);
  assert.equal(sub.body.data.attempt.total, 3);
  assert.equal(typeof sub.body.data.attempt.timeUsedSec, 'number');
  assert.equal(sub.body.data.review.length, 3);
  assert.deepEqual(sub.body.data.review.map((r) => r.questionIndex), attempt.order, 'review in attempt order');
  assert.equal(sub.body.data.review[0].correct, false);
  assert.equal(sub.body.data.review[1].correct, true);
  assert.equal(sub.body.data.review[0].selected, answers[0].selected);
  assert.ok(sub.body.data.review.some((r) => r.explanationEn === 'Kolkata is the capital of West Bengal.'), 'review shows explanations after submit');

  // Submitted attempt re-read returns the result shape.
  const result = await student('GET', `/mock-papers/attempts/${attemptId}`, null, user);
  assert.equal(result.status, 200);
  assert.equal(result.body.data.attempt.score, 2);
  assert.equal(result.body.data.review.length, 3);

  // Double submit -> 409.
  const again = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, { answers }, user);
  assert.equal(again.status, 409);
  assert.equal(again.body.error.code, 'ATTEMPT_ALREADY_SUBMITTED');

  // Isolation: no MockSession / ReviewItem documents were created.
  assert.equal(await MockSession.countDocuments(), sessionsBefore);
  assert.equal(await ReviewItem.countDocuments(), reviewsBefore);

  // Retake: a fresh permutation, all correct -> score 3, best score updates.
  const retake = await student('POST', `/mock-papers/${paperId}/attempts`, null, user);
  assert.equal(retake.status, 201);
  assert.deepEqual([...retake.body.data.attempt.order].sort((a, b) => a - b), [0, 1, 2]);
  const retakeAnswers = retake.body.data.questions.map((q) => ({
    questionIndex: q.questionIndex,
    selected: stored.questions[q.questionIndex].correct_index,
  }));
  const retakeSub = await student('POST', `/mock-papers/attempts/${retake.body.data.attempt.id}/submit`, { answers: retakeAnswers }, user);
  assert.equal(retakeSub.body.data.attempt.score, 3);
  assert.deepEqual((await student('GET', '/mock-papers', null, user)).body.data.papers[0].myAttempts, { count: 2, bestScore: 3 });
});

test('publish blocks: EMPTY_PAPER wins the check order', async () => {
  const paper = await createDraft('Just some prose with no questions at all.', { title: 'Empty Paper' });
  assert.equal(paper.questions.length, 0);
  assert.equal(paper.unparsed.length, 1);
  const res = await admin('POST', `/admin/mock-papers/${paper.id}/publish`);
  assert.equal(res.status, 409);
  assert.equal(res.body.error.code, 'EMPTY_PAPER');
});

test('publish block: MISSING_ANSWERS with no unparsed blocks', async () => {
  const paper = await createDraft('1. No answer here?\n(A) A (B) B (C) C (D) D', { title: 'Missing Answer Paper' });
  assert.equal(paper.unparsed.length, 0);
  const res = await admin('POST', `/admin/mock-papers/${paper.id}/publish`);
  assert.equal(res.status, 409);
  assert.equal(res.body.error.code, 'MISSING_ANSWERS');
});

test('language is derived server-side: bn-only and mixed papers', async () => {
  const bn = await createDraft('1. পশ্চিমবঙ্গের রাজধানী কী?\n(A) দিল্লি (B) কলকাতা (C) মুম্বাই (D) চেন্নাই\nউত্তর: B', { title: 'BN Paper' });
  assert.equal(bn.language, 'bn');
  const mixed = await createDraft('1. What is the capital?\nপশ্চিমবঙ্গের রাজধানী কী?\n(A) Delhi (B) Kolkata (C) Mumbai (D) Chennai\nAnswer: B', { title: 'Mixed Paper' });
  assert.equal(mixed.language, 'both');
});

test('admin list shows counts; admin get 404s for a missing paper', async () => {
  const list = await admin('GET', '/admin/mock-papers');
  assert.equal(list.status, 200);
  const flow = list.body.data.papers.find((p) => p.title === 'Flow Paper');
  assert.ok(flow);
  assert.equal(flow.questionCount, 3);
  assert.equal(flow.missingAnswerCount, 0);
  assert.equal(flow.unparsedCount, 0);
  assert.equal(flow.status, 'PUBLISHED');
  const missing = await admin('GET', `/admin/mock-papers/${new mongoose.Types.ObjectId()}`);
  assert.equal(missing.status, 404);
  assert.equal(missing.body.error.code, 'PAPER_NOT_FOUND');
});

test('edit rules: published papers are not editable; drafts with attempts are not editable or deletable', async () => {
  const paper = await createDraft(SIMPLE_TEXT, { title: 'Edit Rules Paper' });
  await publishPaper(paper.id);

  const editPublished = await admin('PUT', `/admin/mock-papers/${paper.id}`, { title: 'New Title' });
  assert.equal(editPublished.status, 409);
  assert.equal(editPublished.body.error.code, 'PAPER_NOT_EDITABLE');

  const deletePublished = await admin('DELETE', `/admin/mock-papers/${paper.id}`);
  assert.equal(deletePublished.status, 409);
  assert.equal(deletePublished.body.error.code, 'PAPER_NOT_EDITABLE');

  // A student takes it, then it is unpublished: DRAFT with attempts.
  const start = await student('POST', `/mock-papers/${paper.id}/attempts`, null, 'mp_edit_student');
  assert.equal(start.status, 201);
  const unpub = await admin('POST', `/admin/mock-papers/${paper.id}/unpublish`);
  assert.equal(unpub.status, 200);
  assert.equal(unpub.body.data.paper.status, 'DRAFT');

  const editWithAttempts = await admin('PUT', `/admin/mock-papers/${paper.id}`, { title: 'New Title' });
  assert.equal(editWithAttempts.status, 409);
  assert.equal(editWithAttempts.body.error.code, 'PAPER_NOT_EDITABLE');

  const deleteWithAttempts = await admin('DELETE', `/admin/mock-papers/${paper.id}`);
  assert.equal(deleteWithAttempts.status, 409);
  assert.equal(deleteWithAttempts.body.error.code, 'PAPER_HAS_ATTEMPTS');

  // Unpublishing hides the paper from students again.
  assert.deepEqual((await student('GET', '/mock-papers', null, 'mp_edit_student')).body.data.papers.filter((p) => p.id === paper.id), []);
});

test('delete: a draft with zero attempts deletes cleanly', async () => {
  const paper = await createDraft(SIMPLE_TEXT, { title: 'Delete Me Paper' });
  const del = await admin('DELETE', `/admin/mock-papers/${paper.id}`);
  assert.equal(del.status, 200);
  assert.deepEqual(del.body.data, { deleted: true });
  assert.equal((await admin('GET', `/admin/mock-papers/${paper.id}`)).status, 404);
});

test('PUT validation and warning handling', async () => {
  const paper = await createDraft(SIMPLE_TEXT, { title: 'PUT Validation Paper' });
  const good = paper.questions[0];

  const outOfRange = await admin('PUT', `/admin/mock-papers/${paper.id}`, {
    questions: [{ ...good, correctIndex: 99 }],
  });
  assert.equal(outOfRange.status, 400);

  const oneOption = await admin('PUT', `/admin/mock-papers/${paper.id}`, {
    questions: [{ ...good, options: ['Only'] }],
  });
  assert.equal(oneOption.status, 400);

  const emptyStem = await admin('PUT', `/admin/mock-papers/${paper.id}`, {
    questions: [{ ...good, stemEn: null, stemBn: null }],
  });
  assert.equal(emptyStem.status, 400);

  // Invalid warnings are stripped, not rejected.
  const stripped = await admin('PUT', `/admin/mock-papers/${paper.id}`, {
    questions: [{ ...good, warnings: ['bogus_warning', 'figure_reference'] }],
  });
  assert.equal(stripped.status, 200, JSON.stringify(stripped.body));
  assert.deepEqual(stripped.body.data.paper.questions[0].warnings, [], 'bogus stripped; figure recomputed away for a figure-free question');

  // A duplicate stem is recomputed on save even when not sent.
  const dupes = await admin('PUT', `/admin/mock-papers/${paper.id}`, {
    questions: [good, { ...good, n: 2 }],
  });
  assert.equal(dupes.status, 200);
  assert.ok(dupes.body.data.paper.questions.every((q) => q.warnings.includes('duplicate_stem')));
});

test('submit validation: duplicates, out-of-range question and option', async () => {
  const paper = await createDraft(SIMPLE_TEXT, { title: 'Submit Validation Paper' });
  await publishPaper(paper.id);
  const user = 'mp_submit_validation';
  const start = await student('POST', `/mock-papers/${paper.id}/attempts`, null, user);
  assert.equal(start.status, 201);
  const attemptId = start.body.data.attempt.id;
  const qi = start.body.data.attempt.order[0];

  const dupes = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, {
    answers: [{ questionIndex: qi, selected: 0 }, { questionIndex: qi, selected: 1 }],
  }, user);
  assert.equal(dupes.status, 400);

  const badQuestion = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, {
    answers: [{ questionIndex: 99, selected: 0 }],
  }, user);
  assert.equal(badQuestion.status, 400);

  const badOption = await student('POST', `/mock-papers/attempts/${attemptId}/submit`, {
    answers: [{ questionIndex: qi, selected: 99 }],
  }, user);
  assert.equal(badOption.status, 400);

  // The attempt is still ACTIVE after the rejected submits.
  const reread = await student('GET', `/mock-papers/attempts/${attemptId}`, null, user);
  assert.equal(reread.status, 200);
  assert.equal(reread.body.data.questions.length, 2);
});

test('submit with missing entries counts them as unattempted', async () => {
  const paper = await createDraft(SIMPLE_TEXT, { title: 'Partial Submit Paper' });
  await publishPaper(paper.id);
  const user = 'mp_partial_student';
  const start = await student('POST', `/mock-papers/${paper.id}/attempts`, null, user);
  const stored = await MockPaper.findById(paper.id).lean();
  const first = start.body.data.questions[0];
  const sub = await student('POST', `/mock-papers/attempts/${start.body.data.attempt.id}/submit`, {
    answers: [{ questionIndex: first.questionIndex, selected: stored.questions[first.questionIndex].correct_index }],
  }, user);
  assert.equal(sub.status, 200);
  assert.equal(sub.body.data.attempt.score, 1);
  const missing = sub.body.data.review.find((r) => r.questionIndex !== first.questionIndex);
  assert.equal(missing.selected, null);
  assert.equal(missing.correct, false);
});

test('attempt on a missing paper 404s', async () => {
  const missingId = new mongoose.Types.ObjectId();
  assert.equal((await student('POST', `/mock-papers/${missingId}/attempts`, null, 'mp_missing_student')).status, 404);
  assert.equal((await student('GET', `/mock-papers/${missingId}`, null, 'mp_missing_student')).status, 404);
  assert.equal((await student('GET', `/mock-papers/attempts/${missingId}`, null, 'mp_missing_student')).status, 404);
});

test('admin can paste a paper larger than the 100kb default JSON limit', async () => {
  // 120 long-stem questions: the JSON body is well over 100kb but under the
  // 200,000-char Zod cap on the pasted text, so only the route-scoped body
  // limit in app.js lets it through.
  const block = (i) => `${i}. Question number ${i} ${'word '.repeat(170).trim()}?\n(A) Alpha (B) Beta (C) Gamma (D) Delta\nAnswer: B\n`;
  const text = Array.from({ length: 120 }, (_, k) => block(k + 1)).join('\n');
  assert.ok(Buffer.byteLength(JSON.stringify({ title: 'Big', sourceLabel: 'Big source', text })) > 100 * 1024);
  assert.ok(text.length < 200000);
  const paper = await createDraft(text, { title: 'Big Paper' });
  assert.equal(paper.questions.length, 120);
  assert.equal(paper.unparsed.length, 0);
});
