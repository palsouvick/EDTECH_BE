'use strict';

/**
 * Accounts and "My performance": register / login / logout / me, cookie
 * sessions driving practice + mock, and the performance summary.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, MockSession, User, PracticeAttempt } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { hashPassword, verifyPassword, verifyToken } = require('../src/services/auth.service');
const { streakFrom } = require('../src/services/performance.service');

let mongod;
let server;
let base;

/** No dev x-user-id header: only real sessions count here. */
async function call(method, url, { body, cookie, headers = {} } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}
const cookieFrom = (setCookie) => setCookie?.split(';')[0];

function question(i) {
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${i.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `AUTH-T-${String(i).padStart(5, '0')}`,
    exam_targets: [{ category: 'SSC', tier: 'TIER_1' }],
    subject: 'quant',
    topic: i % 2 ? 'percentage' : 'profit_loss',
    difficulty: (i % 5) + 1,
    stem: { en: `Q${i}`, bn: `প্রশ্ন ${i}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
  };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('edtech_auth_test'));
  await Promise.all([Question.init(), MockSession.init(), User.init(), PracticeAttempt.init()]);
  await Question.insertMany(Array.from({ length: 60 }, (_, i) => question(i + 1)));
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('password hashes are salted and verify', async () => {
  const a = await hashPassword('correct horse');
  const b = await hashPassword('correct horse');
  assert.notEqual(a, b, 'random salt');
  assert.ok(await verifyPassword('correct horse', a));
  assert.ok(!(await verifyPassword('wrong horse', a)));
  assert.ok(!(await verifyPassword('x', 'not-a-hash')));
});

test('register -> me -> logout -> login', async () => {
  const anon = await call('GET', '/auth/me');
  assert.equal(anon.status, 200);
  assert.equal(anon.body.data.user, null);

  const reg = await call('POST', '/auth/register', { body: { name: 'Riya Das', email: ' Riya@Example.com ', password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  assert.equal(reg.body.data.user.email, 'riya@example.com');
  assert.ok(!JSON.stringify(reg.body).includes('password_hash'));
  assert.match(reg.setCookie, /edtech_session=.+HttpOnly/i);
  assert.ok(verifyToken(reg.body.data.token));
  const cookie = cookieFrom(reg.setCookie);

  const me = await call('GET', '/auth/me', { cookie });
  assert.equal(me.body.data.user.name, 'Riya Das');

  const bearer = await call('GET', '/auth/me', { headers: { authorization: `Bearer ${reg.body.data.token}` } });
  assert.equal(bearer.body.data.user.email, 'riya@example.com');

  const dup = await call('POST', '/auth/register', { body: { name: 'Riya 2', email: 'riya@example.com', password: 'another123' } });
  assert.equal(dup.status, 409);
  assert.equal(dup.body.error.code, 'EMAIL_TAKEN');

  const out = await call('POST', '/auth/logout', { cookie });
  assert.match(out.setCookie, /edtech_session=;/);

  const wrong = await call('POST', '/auth/login', { body: { email: 'riya@example.com', password: 'nope-nope' } });
  const unknown = await call('POST', '/auth/login', { body: { email: 'ghost@example.com', password: 'nope-nope' } });
  assert.equal(wrong.status, 401);
  assert.equal(unknown.status, 401);
  assert.equal(wrong.body.error.message, unknown.body.error.message, 'no account enumeration');

  const ok = await call('POST', '/auth/login', { body: { email: 'RIYA@example.com', password: 'secret123' } });
  assert.equal(ok.status, 200);
  assert.equal(ok.body.data.user.name, 'Riya Das');
});

test('bad input and tampered tokens are rejected', async () => {
  const short = await call('POST', '/auth/register', { body: { name: 'A', email: 'a@example.com', password: 'short' } });
  assert.equal(short.status, 400);

  const reg = await call('POST', '/auth/register', { body: { name: 'Tamper', email: 'tamper@example.com', password: 'secret123' } });
  const [h, p, s] = reg.body.data.token.split('.');
  const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(p, 'base64url')), sub: 'someone_else' })).toString('base64url');
  assert.equal(verifyToken(`${h}.${forged}.${s}`), null);
  const me = await call('GET', '/auth/me', { cookie: `edtech_session=${h}.${forged}.${s}` });
  assert.equal(me.body.data.user, null);

  const perf = await call('GET', '/me/performance', { cookie: `edtech_session=${h}.${forged}.${s}` });
  assert.equal(perf.status, 401);
});

test('signed-in practice and mocks feed /me/performance', async () => {
  const reg = await call('POST', '/auth/register', { body: { name: 'Arjun', email: 'arjun@example.com', password: 'secret123' } });
  const cookie = cookieFrom(reg.setCookie);
  const userId = reg.body.data.user.id;

  const empty = await call('GET', '/me/performance', { cookie });
  assert.equal(empty.status, 200);
  assert.equal(empty.body.data.summary.practiceAttempts, 0);
  assert.equal(empty.body.data.summary.streakDays, 0);

  // 6 profit_loss answers (2 right), 4 percentage answers (all right).
  const qs = await Question.find({}).select('+correct_option_id').sort({ code: 1 }).limit(20).lean();
  const pl = qs.filter((q) => q.topic === 'profit_loss').slice(0, 6);
  const pc = qs.filter((q) => q.topic === 'percentage').slice(0, 4);
  for (const [i, q] of pl.entries()) {
    const pick = i < 2 ? q.correct_option_id : q.options[1].oid;
    const r = await call('POST', '/practice/verify-answer', { cookie, body: { questionId: String(q._id), selectedOptionId: pick, timeSpentSec: 20 } });
    assert.equal(r.status, 200);
  }
  for (const q of pc) {
    await call('POST', '/practice/verify-answer', { cookie, body: { questionId: String(q._id), selectedOptionId: q.correct_option_id } });
  }
  // Attempts are written without blocking the response; wait until they land.
  for (let i = 0; i < 50 && (await PracticeAttempt.countDocuments({ user_id: userId })) < 10; i++) {
    await new Promise((r) => setTimeout(r, 20));
  }

  // The session cookie alone is enough to take a mock.
  const mock = await call('POST', '/mock/create-session', {
    cookie,
    body: { category: 'SSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10, language: 'en' },
  });
  assert.equal(mock.status, 201, JSON.stringify(mock.body));
  const sessionId = mock.body.data.sessionId;
  const key = (await MockSession.findById(sessionId).select('+answer_key').lean()).answer_key;
  const responses = mock.body.data.questions.map((q, i) => ({
    questionId: q.questionId,
    selectedOptionId: i < 7 ? key[q.questionId] : q.options.find((o) => o.optionId !== key[q.questionId]).optionId,
    timeSpentSec: 30,
  }));
  const sub = await call('POST', '/mock/submit-session', { cookie, body: { sessionId, responses } });
  assert.equal(sub.status, 200, JSON.stringify(sub.body));

  const perf = await call('GET', '/me/performance?tz=330', { cookie });
  assert.equal(perf.status, 200, JSON.stringify(perf.body));
  const d = perf.body.data;
  assert.equal(d.summary.practiceAttempts, 10);
  assert.equal(d.summary.practiceAccuracyPct, 60);
  assert.equal(d.summary.mocksTaken, 1);
  assert.equal(d.summary.attemptedToday, 20, '10 practice answers + a 10-question mock');
  assert.equal(d.summary.streakDays, 1);
  assert.deepEqual(d.subjects.map((s) => [s.subject, s.attempts, s.correct]), [['quant', 10, 6]]);
  assert.equal(d.weakTopics.length, 1, 'percentage has only 4 attempts, below the minimum');
  assert.equal(d.weakTopics[0].topic, 'profit_loss');
  assert.equal(d.weakTopics[0].accuracyPct, 33.3);
  assert.equal(d.recentMocks[0].sessionId, sessionId);
  assert.equal(d.mockTrend.length, 1);

  // Another student sees nothing of Arjun's.
  const other = await call('POST', '/auth/register', { body: { name: 'Other', email: 'other@example.com', password: 'secret123' } });
  const theirs = await call('GET', '/me/performance', { cookie: cookieFrom(other.setCookie) });
  assert.equal(theirs.body.data.summary.practiceAttempts, 0);
  assert.equal(theirs.body.data.summary.mocksTaken, 0);
});

test('streak counts back from today, or from yesterday before today starts', () => {
  const days = new Set(['2026-10-12', '2026-10-13', '2026-10-14']);
  assert.equal(streakFrom(days, '2026-10-14'), 3);
  assert.equal(streakFrom(days, '2026-10-15'), 3, 'today not started yet');
  assert.equal(streakFrom(days, '2026-10-16'), 0);
  assert.equal(streakFrom(new Set(['2026-10-01', '2026-10-14']), '2026-10-14'), 1);
});
