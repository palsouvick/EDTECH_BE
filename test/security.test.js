'use strict';

/**
 * S0 regression tests: answers cannot be read before a test is submitted, marks
 * are decided by the server, the dev identity shortcut stays off outside local
 * environments, PYQ labels need official sources, and every schema index is in
 * the production index script.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const config = require('../src/config');
const { createApp } = require('../src/app');
const models = require('../src/models');
const { Question, ExamCategory, User } = models;
const statsBuffer = require('../src/services/questionStats.buffer');
const { signToken, verifySignedToken, mockQuestionAlias } = require('../src/services/signedToken');
const { resolveMarking } = require('../src/services/markingScheme');
const { presentQuestion } = require('../src/services/presenters');
const { ensureMobileIndex } = require('../scripts/ensureMobileIndex');
const catalog = require('../db/seed/catalog');

const ADMIN_EMAIL = 'security-admin@example.test';
if (!config.auth.adminEmails.includes(ADMIN_EMAIL)) config.auth.adminEmails.push(ADMIN_EMAIL);

let mongod;
let server;
let base;
let adminCookie;

async function api(method, url, body, { user = 'sec_student', cookie } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }), ...(cookie && { cookie }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json().catch(() => null), headers: res.headers };
}

const OFFICIAL_PAPER = 'https://psc.wb.gov.in/Download?param1=paper.pdf&param2=advertisement';
const OFFICIAL_KEY = 'https://psc.wb.gov.in/Download?param1=key.pdf&param2=advertisement';

const Q = (i, extra = {}) => {
  const ids = ['a', 'b', 'c', 'd'].map((c) => `opt_${String(i).padStart(4, '0')}${c}`);
  return {
    code: `SEC-${i}`,
    exam_targets: [{ category: 'SSC', tier: 'TIER_1' }, { category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'quant',
    topic: 'percentage',
    difficulty: (i % 5) + 1,
    stem: { en: `Security question ${i}`, bn: `নিরাপত্তা প্রশ্ন ${i}` },
    options: ids.map((oid, k) => ({ oid, text: { en: `${i}-${k}`, bn: `${i}-${k}` } })),
    correct_option_id: ids[2],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
    ...extra,
  };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('security_test'));
  await Promise.all(Object.values(mongoose.models).map((m) => m.init()));
  await ExamCategory.insertMany(catalog);
  await Question.insertMany(Array.from({ length: 60 }, (_, i) => Q(i)));
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;

  await api('POST', '/auth/register', { name: 'Security Admin', email: ADMIN_EMAIL, password: 'safe-password-123' }, { user: null });
  const login = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: 'safe-password-123' }),
  });
  adminCookie = login.headers.get('set-cookie')?.split(';')[0];
  assert.ok(adminCookie, 'admin signed in');
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

// ---------------------------------------------------------------- Learn quiz check

test('quiz check refuses questions that the server did not issue in that quiz', async () => {
  const quiz = (await api('POST', '/learn/quiz', { subject: 'quant', topic: 'percentage', level: 'beginner' }, { user: null })).body.data;
  assert.ok(quiz.quizToken, 'every quiz carries a token');
  const inQuiz = quiz.questions[0].questionId;
  const outsider = await Question.findOne({ _id: { $nin: quiz.questions.map((q) => q.questionId) } }).select('_id').lean();
  const ask = (body) => api('POST', '/learn/quiz/check', { subject: 'quant', topic: 'percentage', ...body }, { user: null });

  // The leak this closes: no token, any question id, no answer chosen.
  const noToken = await ask({ answers: [{ questionId: String(outsider._id), selectedOptionId: null }] });
  assert.equal(noToken.status, 400);
  assert.ok(!JSON.stringify(noToken.body).includes('correctOptionId'));

  const notInQuiz = await ask({ quizToken: quiz.quizToken, answers: [{ questionId: String(outsider._id), selectedOptionId: null }] });
  assert.equal(notInQuiz.status, 403);
  assert.equal(notInQuiz.body.error.code, 'QUESTION_NOT_IN_QUIZ');

  const mixed = await ask({ quizToken: quiz.quizToken, answers: [{ questionId: inQuiz, selectedOptionId: null }, { questionId: String(outsider._id), selectedOptionId: null }] });
  assert.equal(mixed.status, 403, 'one foreign id rejects the whole request');

  const [body, sig] = quiz.quizToken.split('.');
  const forgedPayload = Buffer.from(JSON.stringify({ s: 'quant', t: 'percentage', q: [String(outsider._id)], exp: 4102444800 })).toString('base64url');
  for (const quizToken of [`${forgedPayload}.${sig}`, `${body}.${sig.slice(0, -2)}xx`, 'garbage', `${body}.${sig}.extra`]) {
    const res = await ask({ quizToken, answers: [{ questionId: inQuiz, selectedOptionId: null }] });
    assert.equal(res.status, 403, `rejects ${quizToken.slice(0, 20)}`);
    assert.equal(res.body.error.code, 'QUIZ_TOKEN_INVALID');
  }

  const otherTopic = await api('POST', '/learn/quiz/check', { subject: 'quant', topic: 'ratio_proportion', quizToken: quiz.quizToken, answers: [{ questionId: inQuiz, selectedOptionId: null }] }, { user: null });
  assert.equal(otherTopic.status, 403, 'a token is bound to its chapter');

  const expired = signToken('learn-quiz', { s: 'quant', t: 'percentage', q: [inQuiz] }, 60, Date.now() - 3600_000);
  assert.equal((await ask({ quizToken: expired, answers: [{ questionId: inQuiz, selectedOptionId: null }] })).status, 403);

  const otherPurpose = signToken('something-else', { s: 'quant', t: 'percentage', q: [inQuiz] }, 600);
  assert.equal((await ask({ quizToken: otherPurpose, answers: [{ questionId: inQuiz, selectedOptionId: null }] })).status, 403);

  const dupes = await ask({ quizToken: quiz.quizToken, answers: [{ questionId: inQuiz, selectedOptionId: null }, { questionId: inQuiz, selectedOptionId: null }] });
  assert.equal(dupes.status, 400);

  // The real flow still works, signed in or not.
  const ok = await ask({ quizToken: quiz.quizToken, answers: quiz.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: null })) });
  assert.equal(ok.status, 200);
  assert.equal(ok.body.data.results.length, quiz.questions.length);
});

test('signed tokens reject tampering, other purposes and expiry', () => {
  const t = signToken('p', { a: 1 }, 60, 1_000_000);
  assert.deepEqual(verifySignedToken('p', t, 1_000_000).a, 1);
  assert.equal(verifySignedToken('q', t, 1_000_000), null);
  assert.equal(verifySignedToken('p', t, 1_000_000 + 61_000), null);
  assert.equal(verifySignedToken('p', `${t}x`, 1_000_000), null);
  assert.equal(verifySignedToken('p', null), null);
  assert.equal(verifySignedToken('p', 'a'.repeat(5000)), null);
});

// ---------------------------------------------------------------- Mock answers before submission

test('a live mock never exposes ids that answer-revealing endpoints accept', async () => {
  const created = await api('POST', '/mock/create-session', { category: 'SSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10 }, { user: 'mock_taker' });
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const s = created.body.data;
  const real = new Set((await models.MockSession.findById(s.sessionId).lean()).questions.map((q) => String(q.qid)));
  const payload = JSON.stringify(created.body) + JSON.stringify((await api('GET', `/mock/session/${s.sessionId}`, null, { user: 'mock_taker' })).body);
  for (const id of real) assert.ok(!payload.includes(id), 'real question ids never appear in a live mock');
  assert.ok(s.questions.every((q) => q.fingerprint === null), 'no stem fingerprint either');

  const alias = s.questions[0];
  for (const user of ['mock_taker', null]) {
    const verify = await api('POST', '/practice/verify-answer', { questionId: alias.questionId, selectedOptionId: alias.options[0].optionId }, { user });
    assert.equal(verify.status, 404, 'verify-answer cannot resolve a mock alias');
    const check = await api('POST', '/learn/quiz/check', { subject: 'quant', topic: 'percentage', quizToken: 'x.y', answers: [{ questionId: alias.questionId, selectedOptionId: null }] }, { user });
    assert.equal(check.status, 403);
  }
  assert.equal((await api('GET', `/mock/session/${s.sessionId}/analytics`, null, { user: 'mock_taker' })).status, 409);

  // Aliases are per session: the same question has a different alias in another test.
  const qid = [...real][0];
  assert.notEqual(mockQuestionAlias(s.sessionId, qid), mockQuestionAlias(new mongoose.Types.ObjectId().toString(), qid));

  // Submitting by alias works; answering one question twice (alias + real id) does not.
  const doubled = await api('POST', '/mock/submit-session', {
    sessionId: s.sessionId,
    responses: [{ questionId: mockQuestionAlias(s.sessionId, qid), selectedOptionId: null }, { questionId: qid, selectedOptionId: null }],
  }, { user: 'mock_taker' });
  assert.equal(doubled.status, 422);
  assert.equal(doubled.body.error.code, 'DUPLICATE_RESPONSE');
  const submitted = await api('POST', '/mock/submit-session', {
    sessionId: s.sessionId,
    responses: s.questions.map((q) => ({ questionId: q.questionId, selectedOptionId: q.options[2].optionId, timeSpentSec: 5 })),
  }, { user: 'mock_taker' });
  assert.equal(submitted.status, 200, JSON.stringify(submitted.body));
  assert.equal(submitted.body.data.counts.correct, 10, 'aliases map back to the right questions');
  assert.ok(submitted.body.data.perQuestion.every((p) => real.has(p.questionId)), 'results use real ids, for review and bookmarks');
});

// ---------------------------------------------------------------- Server-side marking

test('marks come from the verified exam pattern, never from the client', async () => {
  assert.deepEqual(resolveMarking({ category: 'WBPSC', subject: 'quant' }), {
    positive: 1, negative: 0.25, basis: 'OFFICIAL', examCode: 'WBPSC_CLERKSHIP',
    sourceUrl: 'https://psc.wb.gov.in/Download?param1=Clerkship2024-SchemeSyllabus.pdf&param2=advertisement',
    patternAsOf: 'Clerkship 2024 scheme (Advt 12/2024)',
  });
  assert.equal(resolveMarking({ category: 'WBPSC', subject: 'english', examCode: 'WBPSC_CLERKSHIP' }).negative, 0.25);
  // WBCS states negative marking without the amount: marks from the notice, nothing deducted, flagged.
  const wbcs = resolveMarking({ category: 'WBPSC', subject: 'english', examCode: 'WBCS' });
  assert.deepEqual([wbcs.positive, wbcs.negative, wbcs.basis], [1, 0, 'OFFICIAL_NO_NEGATIVE']);
  // WBPSC Reasoning: only WBCS tests it, so its marks apply (Clerkship Part-I has no reasoning).
  assert.deepEqual(
    [resolveMarking({ category: 'WBPSC', subject: 'reasoning' }).examCode, resolveMarking({ category: 'WBPSC', subject: 'reasoning' }).basis],
    ['WBCS', 'OFFICIAL_NO_NEGATIVE'],
  );
  assert.deepEqual(
    [resolveMarking({ category: 'SSC', subject: 'quant' }).examCode, resolveMarking({ category: 'SSC', subject: 'quant' }).positive],
    ['SSC_CGL', 2],
  );
  // No verified pattern: a plain practice scheme, labelled as such.
  // (The WB Post exams in exams.js have no sectional marking from a notice.)
  const practice = resolveMarking({ category: 'WB_POST', subject: 'quant' });
  assert.deepEqual([practice.positive, practice.negative, practice.basis, practice.examCode], [1, 0, 'PRACTICE', null]);

  assert.throws(() => resolveMarking({ category: 'WBPSC', subject: 'reasoning', examCode: 'WBPSC_CLERKSHIP' }), /no reasoning section/);
  assert.throws(() => resolveMarking({ category: 'WBPSC', subject: 'quant', examCode: 'SSC_CGL' }), /not an exam in WBPSC/);

  const created = await api('POST', '/mock/create-session', {
    category: 'WBPSC', subject: 'quant', examCode: 'WBPSC_CLERKSHIP', questionCount: 10, timeLimitMinutes: 10,
    markingScheme: { positive: 10, negative: 0 },
  }, { user: 'clerk_aspirant' });
  assert.equal(created.status, 201, JSON.stringify(created.body));
  assert.deepEqual(
    [created.body.data.config.markingScheme.positive, created.body.data.config.markingScheme.negative, created.body.data.config.markingScheme.basis],
    [1, 0.25, 'OFFICIAL'],
  );
  const s = created.body.data;
  const submitted = await api('POST', '/mock/submit-session', {
    sessionId: s.sessionId,
    responses: s.questions.map((q, i) => ({ questionId: q.questionId, selectedOptionId: q.options[i < 6 ? 2 : 0].optionId, timeSpentSec: 5 })),
  }, { user: 'clerk_aspirant' });
  assert.equal(submitted.body.data.score, 5, '6 right x 1 - 4 wrong x 0.25');

  const wrongExam = await api('POST', '/mock/create-session', { category: 'WBPSC', subject: 'reasoning', examCode: 'WBPSC_CLERKSHIP', questionCount: 10, timeLimitMinutes: 10 }, { user: 'clerk_aspirant' });
  assert.equal(wrongExam.status, 422);
  assert.equal(wrongExam.body.error.code, 'SUBJECT_NOT_IN_EXAM');
});

// ---------------------------------------------------------------- Dev identity and secrets

function loadConfig(env, snippet = 'console.log(JSON.stringify({ env: c.env, dev: c.auth.devUserHeader }))') {
  const clean = Object.fromEntries(Object.entries(process.env).filter(([k]) => !['NODE_ENV', 'AUTH_SECRET', 'ALLOW_DEV_USER_HEADER'].includes(k)));
  return spawnSync(process.execPath, ['-e', `const c = require('./src/config'); ${snippet}`], {
    cwd: path.join(__dirname, '..'),
    env: { ...clean, ...env },
    encoding: 'utf8',
  });
}

test('the x-user-id shortcut needs a local NODE_ENV and an explicit opt-in; bad config fails closed', () => {
  const strong = 'x'.repeat(48);
  const ok = (env) => {
    const r = loadConfig(env);
    assert.equal(r.status, 0, r.stderr);
    return JSON.parse(r.stdout);
  };
  assert.deepEqual(ok({ NODE_ENV: 'production', AUTH_SECRET: strong, ALLOW_DEV_USER_HEADER: 'true' }), { env: 'production', dev: false });
  assert.deepEqual(ok({ NODE_ENV: 'development' }), { env: 'development', dev: false });
  assert.deepEqual(ok({ NODE_ENV: 'development', ALLOW_DEV_USER_HEADER: 'true' }), { env: 'development', dev: true });
  assert.deepEqual(ok({ NODE_ENV: 'test', ALLOW_DEV_USER_HEADER: '1' }), { env: 'test', dev: false }, 'only the exact value "true" opts in');

  // Missing NODE_ENV means production: without a strong secret the process refuses to start.
  assert.notEqual(loadConfig({}).status, 0);
  assert.match(loadConfig({}).stderr, /AUTH_SECRET/);
  assert.deepEqual(ok({ AUTH_SECRET: strong, ALLOW_DEV_USER_HEADER: 'true' }), { env: 'production', dev: false });
  assert.notEqual(loadConfig({ NODE_ENV: 'production', AUTH_SECRET: 'short' }).status, 0);
  const typo = loadConfig({ NODE_ENV: 'prod', AUTH_SECRET: strong });
  assert.notEqual(typo.status, 0);
  assert.match(typo.stderr, /NODE_ENV must be one of/);
  assert.notEqual(loadConfig({ NODE_ENV: 'staging', AUTH_SECRET: strong }).status, 0);

  // End to end through the middleware: in production the header is ignored.
  const probe = loadConfig(
    { NODE_ENV: 'production', AUTH_SECRET: strong, ALLOW_DEV_USER_HEADER: 'true' },
    `const { optionalAuth } = require('./src/middleware/auth');
     const req = { headers: {}, get: (h) => (h.toLowerCase() === 'x-user-id' ? 'victim_user' : undefined) };
     optionalAuth(req, {}, () => console.log(JSON.stringify(req.user ?? null)));`,
  );
  assert.equal(probe.status, 0, probe.stderr);
  assert.equal(probe.stdout.trim(), 'null');
});

// ---------------------------------------------------------------- PYQ labels

test('a PYQ tag needs the commission paper and answer key; students never see unverified tags', async () => {
  const q = await Question.create(Q(500, { code: 'SEC-PYQ' }));
  const tag = (body) => fetch(`${base}/admin/questions/${q._id}/pyq`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', cookie: adminCookie },
    body: JSON.stringify({ examName: 'WBPSC Clerkship', year: 2023, ...body }),
  });

  assert.equal((await tag({})).status, 400, 'no sources');
  assert.equal((await tag({ sourceUrl: OFFICIAL_PAPER })).status, 400, 'no answer key');
  assert.equal((await tag({ sourceUrl: 'https://coaching.example.com/paper.pdf', answerKeyUrl: OFFICIAL_KEY })).status, 400, 'unofficial paper');
  assert.equal((await tag({ sourceUrl: 'http://psc.wb.gov.in/paper.pdf', answerKeyUrl: OFFICIAL_KEY })).status, 400, 'not https');
  assert.equal((await tag({ sourceUrl: 'https://psc.wb.gov.in.evil.example/p.pdf', answerKeyUrl: OFFICIAL_KEY })).status, 400, 'look-alike host');
  let doc = await Question.findById(q._id).lean();
  assert.equal(doc.pyq.is_pyq, false);
  assert.notEqual(doc.provenance, 'OFFICIAL_VERIFIED');

  const ok = await tag({ sourceUrl: OFFICIAL_PAPER, answerKeyUrl: OFFICIAL_KEY });
  assert.equal(ok.status, 200);
  doc = await Question.findById(q._id).lean();
  assert.equal(doc.provenance, 'OFFICIAL_VERIFIED');
  assert.equal(doc.pyq.refs[0].source_url, OFFICIAL_PAPER);

  const removed = await fetch(`${base}/admin/questions/${q._id}/pyq?code=${encodeURIComponent(doc.pyq.refs[0].question_code)}`, { method: 'DELETE', headers: { cookie: adminCookie } });
  assert.equal(removed.status, 200);
  doc = await Question.findById(q._id).lean();
  assert.equal(doc.pyq.is_pyq, false);
  assert.notEqual(doc.provenance, 'OFFICIAL_VERIFIED', 'removing the only verified ref drops the verified label');

  // Students: only refs with an official paper and key become a badge.
  const shown = presentQuestion({
    ...Q(501), _id: new mongoose.Types.ObjectId(), lang_set: 'bn_en',
    pyq: {
      is_pyq: true,
      refs: [
        { exam_name: 'Illustrative', year: 2019, question_code: 'X-1' },
        { exam_name: 'Synthetic', year: 2020, question_code: 'X-SYN-2', source_url: OFFICIAL_PAPER, answer_key_url: OFFICIAL_KEY },
        { exam_name: 'WBPSC Clerkship', year: 2023, question_code: 'X-3', source_url: OFFICIAL_PAPER, answer_key_url: OFFICIAL_KEY },
      ],
    },
  });
  assert.deepEqual(shown.pyq.map((r) => r.examName), ['WBPSC Clerkship']);
  assert.equal(shown.pyq[0].sourceUrl, OFFICIAL_PAPER);
});

// ---------------------------------------------------------------- Indexes

test('every schema index is in db/indexes.mongo.js (production builds indexes only from there)', () => {
  const script = fs.readFileSync(path.join(__dirname, '../db/indexes.mongo.js'), 'utf8');
  const missing = [];
  for (const model of Object.values(mongoose.models)) {
    for (const [, options] of model.schema.indexes()) {
      if (options?.name && !script.includes(`name: "${options.name}"`)) missing.push(`${model.collection.name}.${options.name}`);
    }
  }
  assert.deepEqual(missing, []);
});

test('the mobile index migration refuses to run over duplicate numbers and never edits users', async () => {
  const db = mongoose.connection.useDb('mobile_migration', { useCache: false }).db;
  const users = db.collection('users');
  await users.insertMany([
    { email: 'a@x.test', mobile: '9876543210' },
    { email: 'b@x.test', mobile: '9876543210' },
    { email: 'c@x.test' },
    { email: 'd@x.test' },
  ]);
  const quiet = { log: () => {} };
  const blocked = await ensureMobileIndex(db, { create: true, ...quiet });
  assert.equal(blocked.status, 'duplicates');
  assert.equal(blocked.duplicates[0].count, 2);
  assert.ok(!(await users.indexes()).some((i) => i.name === 'uniq_mobile'));
  assert.equal(await users.countDocuments(), 4, 'no user was changed or removed');

  await users.updateOne({ email: 'b@x.test' }, { $set: { mobile: '9123456780' } }); // an admin resolves it
  assert.equal((await ensureMobileIndex(db, quiet)).status, 'ready', 'report-only without --create');
  assert.equal((await ensureMobileIndex(db, { create: true, ...quiet })).status, 'created');
  assert.equal((await ensureMobileIndex(db, { create: true, ...quiet })).status, 'exists');
  await assert.rejects(users.insertOne({ email: 'e@x.test', mobile: '9876543210' }), /duplicate key/);
  await users.insertOne({ email: 'f@x.test' }); // accounts without a mobile never collide
  await db.dropDatabase();
});

test('the app model rejects a second account with the same mobile', async () => {
  await User.init();
  await User.create({ name: 'One', email: 'one@x.test', mobile: '9000000001', password_hash: 'h' });
  await assert.rejects(User.create({ name: 'Two', email: 'two@x.test', mobile: '9000000001', password_hash: 'h' }), /duplicate key/);
});
