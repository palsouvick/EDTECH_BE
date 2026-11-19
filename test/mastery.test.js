'use strict';

/**
 * F9/F10 — one mastery definition for every subject.
 *   - pure rules: the six stages, evidence gates, "a single quiz is never
 *     mastery", one sitting is never Strong, mastery decays when idle,
 *     missing kinds of evidence are not required (Reasoning has no lesson)
 *   - the service across Math, English, History, Geography, Polity, GK
 *     (Static GK) and Reasoning, from real kinds of evidence (lesson reading,
 *     study books, mini tests, Learn quizzes, PYQs, mistakes)
 *   - consistency: /me/mastery, /me/insights (Home), the syllabus map,
 *     Today's Study and Readiness report the same stage / score
 *   - the BookProgress fix: every study book can save progress
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt, ReviewItem, ChapterStudy, BookProgress, LearnProgress } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const M = require('../src/services/mastery.logic');
const { masteryStatus } = require('../src/services/insights.service');
const { clearMasteryCache } = require('../src/services/mastery.service');
const books = require('../src/services/books');
const catalog = require('../db/seed/catalog');

const DAY = 86_400_000;
let mongod;
let server;
let base;

async function call(method, url, { body, cookie } = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', ...(cookie && { cookie }) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json(), setCookie: res.headers.get('set-cookie') };
}
const cookieFrom = (setCookie) => setCookie?.split(';')[0];

/* ------------------------------------------------------------ pure rules */

const now = new Date('2026-11-19T12:00:00Z');
/** n answers newest first, `right` of them correct (the newest ones), spread over `days` days. */
function answers(n, right, { days = 1, difficulty = 3, start = now, source = 'practice', pyq = false, prefix = 'q' } = {}) {
  return Array.from({ length: n }, (_, i) => ({
    qid: `${prefix}${i}`,
    correct: i < right,
    difficulty,
    source,
    pyq,
    at: new Date(start.getTime() - (i % days) * DAY - i * 1000),
  }));
}
const stage = (list, opts = {}) => M.stageOf(M.evidenceFrom(list, { now, bank: 60, ...opts }), now);

test('mastery logic: six stages in order, each needing real evidence', () => {
  assert.deepEqual(M.STAGES, ['not_started', 'learning', 'practising', 'developing', 'strong', 'mastered']);
  // Opening a chapter is not evidence: no answers and nothing read.
  assert.equal(stage([], { content: { pct: 0, source: 'lesson' } }).stage, 'not_started');
  // Reading sections is learning; so are a few answers.
  assert.equal(stage([], { content: { pct: 30, source: 'book' } }).stage, 'learning');
  assert.equal(stage(answers(3, 3)).stage, 'learning');
  // Enough answers to measure, poor score: practising (and it needs work).
  const p = stage(answers(8, 3));
  assert.equal(p.stage, 'practising');
  assert.equal(p.needsWork, true);
  assert.equal(M.legacyStatus(p), 'weak');
  // 16 answers at 81% over two days, everything else fine: strong.
  assert.equal(stage(answers(16, 13, { days: 2 })).stage, 'strong');
  // 40 answers at 95%, four days, recent, no missing evidence: mastered.
  assert.equal(stage(answers(40, 38, { days: 4 })).stage, 'mastered');
});

test('mastery logic: a single quiz is never Strong or Mastered, and one sitting is never Strong', () => {
  // A perfect 10-question quiz: confidence keeps it at developing.
  const quiz = stage(answers(10, 10));
  assert.equal(quiz.stage, 'developing');
  assert.ok(quiz.next.missing.some((m) => /15\+ answers/.test(m)), JSON.stringify(quiz.next));
  // 20 perfect answers, but all in one sitting: still developing.
  const sitting = stage(answers(20, 20, { days: 1 }));
  assert.equal(sitting.stage, 'developing');
  assert.ok(sitting.gates.strong.find((g) => g.key === 'days').met === false);
  // A mastery test alone cannot lift a chapter either.
  const tested = stage(answers(10, 10), { test: { available: true, bestPct: 100, at: now } });
  assert.equal(tested.stage, 'developing');
});

test('mastery logic: mastery is not permanent — idle time, mistakes, PYQs, content and tests all gate it', () => {
  const good = answers(40, 38, { days: 4 });
  // 31 days idle: no longer mastered (and the score decays after 14 days).
  const idleStart = new Date(now.getTime() - 31 * DAY);
  const idle = stage(answers(40, 38, { days: 4, start: idleStart }));
  assert.notEqual(idle.stage, 'mastered');
  assert.ok(idle.score < stage(good).score);
  // Repeating open mistakes block mastered.
  const mistakes = [{ status: 'active', wrong_count: 2, reviews: 0 }];
  assert.equal(stage(good, { mistakes }).stage, 'strong');
  // A bank with PYQs: PYQs must be answered well.
  assert.equal(stage(good, { pyqBank: 5 }).stage, 'strong');
  const withPyq = [...answers(4, 4, { pyq: true, prefix: 'p' }), ...good];
  assert.equal(stage(withPyq, { pyqBank: 5 }).stage, 'mastered');
  // Content that exists must be (nearly) read; a test that exists must be passed recently.
  assert.equal(stage(good, { content: { pct: 60, source: 'book' } }).stage, 'strong');
  assert.equal(stage(good, { content: { pct: 100, source: 'book' } }).stage, 'mastered');
  assert.equal(stage(good, { test: { available: true, bestPct: null, at: null } }).stage, 'strong');
  assert.equal(stage(good, { test: { available: true, bestPct: 90, at: new Date(now.getTime() - 90 * DAY) } }).stage, 'strong');
  assert.equal(stage(good, { test: { available: true, bestPct: 90, at: now } }).stage, 'mastered');
  // Low content blocks even strong.
  assert.equal(stage(answers(16, 13, { days: 2 }), { content: { pct: 20, source: 'lesson' } }).stage, 'developing');
});

test('mastery logic: the legacy status is derived from the stage (no second algorithm)', () => {
  assert.equal(masteryStatus([]), 'not_started');
  assert.equal(masteryStatus(answers(2, 2)), 'started');
  assert.equal(masteryStatus(answers(6, 2)), 'weak');
  // Ten good answers used to be "strong"; under the unified rules it is still improving.
  assert.equal(masteryStatus(answers(10, 8)), 'improving');
  assert.equal(masteryStatus(answers(16, 14, { days: 2 })), 'strong');
});

/* ------------------------------------------------------------ service + API */

let seq = 0;
function mkQuestion(subject, topic, { pyq = false, category = 'WBPSC' } = {}) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `MS-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category, tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty: 3,
    provenance: pyq ? 'OFFICIAL_VERIFIED' : 'ORIGINAL_PRACTICE',
    stem: { en: `Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    status: 'PUBLISHED',
    ...(pyq && {
      pyq: { is_pyq: true, refs: [{ exam_name: 'WBPSC Clerkship (Part-I)', tier: 'PRELIMS', year: 2023, question_code: `MS-2023-Q${seq}`, source_url: 'https://psc.wb.gov.in/p', answer_key_url: 'https://psc.wb.gov.in/k' }] },
    }),
  };
}

const bank = {};
async function seedBank() {
  const spec = [
    ['quant', 'percentage', 40], ['english', 'grammar', 20], ['gs', 'indian_history', 10], ['gs', 'geography', 30],
    ['gs', 'polity', 30], ['gs', 'static_gk', 20], ['reasoning', 'series', 30],
  ];
  for (const [subject, topic, n] of spec) {
    bank[`${subject}.${topic}`] = await Question.insertMany(Array.from({ length: n }, () => mkQuestion(subject, topic)));
  }
  bank.pyq = await Question.insertMany(Array.from({ length: 3 }, () => mkQuestion('quant', 'percentage', { pyq: true })));
}

/** Practice answers for a user: `right` of `n` correct (newest), spread over `days` days ending today. */
async function practise(userId, key, n, right, { days = 1, list = bank[key], source = 'practice' } = {}) {
  const [subject, topic] = key.split('.');
  const t0 = Date.now();
  await PracticeAttempt.insertMany(Array.from({ length: n }, (_, i) => ({
    user_id: userId,
    question_id: list[i % list.length]._id,
    subject,
    topic,
    correct: i < right,
    source,
    created_at: new Date(t0 - (i % days) * DAY - i * 1000),
  })));
}

function allSections(book) {
  const out = {};
  for (const ch of books.loadBook(book).chapters.values()) {
    if (books.isPublished(ch)) out[ch.code] = { read: ch.sections.map((s) => s.id) };
  }
  return out;
}

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Mastery Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('mastery_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init(), ReviewItem.init(), ChapterStudy.init(), BookProgress.init(), LearnProgress.init()]);
  await ExamCategory.insertMany(catalog);
  await seedBank();
  clearMasteryCache();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('BookProgress accepts every study book (Polity progress used to fail validation)', async () => {
  for (const book of Object.keys(books.BOOKS)) {
    await assert.doesNotReject(new BookProgress({ user_id: 'bp-check', book }).validate(), book);
  }
});

test('unified mastery across Math, English, History, Geography, Polity, GK and Reasoning — one definition, every screen', async () => {
  const u = await registerUser('mastery-all@example.com');
  const res0 = await call('PUT', '/me/target-exam', { cookie: u.cookie, body: { examCode: 'WBPSC_CLERKSHIP' } });
  assert.equal(res0.status, 200);

  // Math — percentage: lesson fully read, 40 answers (95%) over 4 days, all 3 PYQs right, Advanced quiz 9/10.
  await ChapterStudy.create({ user_id: u.id, subject: 'quant', topic: 'percentage', sections_read: ['a', 'b', 'c', 'd'], sections_total: 4 });
  await practise(u.id, 'quant.percentage', 40, 38, { days: 4 });
  await practise(u.id, 'quant.percentage', 3, 3, { list: bank.pyq });
  await LearnProgress.create({ user_id: u.id, subject: 'quant', topic: 'percentage', level: 'advanced', best: { correct: 9, total: 10 } });
  // English — grammar: 8 answers, 3 right.
  await practise(u.id, 'english.grammar', 8, 3, { days: 2 });
  // History — the book read in part, no questions yet.
  await BookProgress.create({ user_id: u.id, book: 'history', chapters: { [books.loadBook('history').chapters.keys().next().value]: { read: ['x'] } } });
  const histFirst = [...books.loadBook('history').chapters.values()].find((ch) => books.isPublished(ch));
  await BookProgress.updateOne({ user_id: u.id, book: 'history' }, { $set: { chapters: { [histFirst.code]: { read: [histFirst.sections[0].id] } } } });
  // Geography — 20 answers at 90%, all in one sitting.
  await practise(u.id, 'gs.geography', 20, 18, { days: 1 });
  // Polity — whole book read, 20 answers at 85% on 3 days, no mini tests yet.
  await BookProgress.create({ user_id: u.id, book: 'polity', chapters: allSections('polity') });
  await practise(u.id, 'gs.polity', 20, 17, { days: 3 });
  // GK (Static GK) — one perfect 10-question quiz.
  await practise(u.id, 'gs.static_gk', 10, 10, { days: 1 });
  // Reasoning — no lesson or test exists: 30 answers at 90% over 3 days.
  await practise(u.id, 'reasoning.series', 30, 27, { days: 3 });

  const res = await call('GET', '/me/mastery', { cookie: u.cookie });
  assert.equal(res.status, 200, JSON.stringify(res.body));
  const data = res.body.data;
  const ch = Object.fromEntries(data.chapters.map((c) => [`${c.subject}.${c.topic}`, c]));
  const S = (k) => ch[k].stage;

  assert.equal(S('quant.percentage'), 'mastered', JSON.stringify(ch['quant.percentage']));
  assert.equal(ch['quant.percentage'].evidence.content.source, 'lesson');
  assert.equal(ch['quant.percentage'].evidence.test.bestPct, 90);

  assert.equal(S('english.grammar'), 'practising');
  assert.equal(ch['english.grammar'].needsWork, true);
  assert.equal(ch['english.grammar'].status, 'weak');

  assert.equal(S('gs.indian_history'), 'learning');
  assert.equal(ch['gs.indian_history'].evidence.content.source, 'book');
  assert.ok(ch['gs.indian_history'].evidence.content.pct > 0);

  assert.equal(S('gs.geography'), 'developing');
  assert.ok(ch['gs.geography'].next.missing.some((m) => /different days/.test(m)));

  assert.equal(S('gs.polity'), 'strong', JSON.stringify(ch['gs.polity']));
  assert.equal(ch['gs.polity'].evidence.content.pct, 100);
  assert.ok(ch['gs.polity'].next.missing.some((m) => /mastery test/.test(m)), JSON.stringify(ch['gs.polity'].next));

  assert.equal(S('gs.static_gk'), 'developing'); // a single perfect quiz is not mastery
  assert.equal(S('reasoning.series'), 'mastered', JSON.stringify(ch['reasoning.series']));
  assert.equal(ch['reasoning.series'].evidence.content, null);
  assert.equal(ch['reasoning.series'].evidence.test, null);

  assert.equal(S('gs.economy'), 'not_started');
  assert.equal(data.counts.mastered, 2);

  // Home (/me/insights) shows the same stage and score for every chapter.
  const ins = (await call('GET', '/me/insights?tz=330', { cookie: u.cookie })).body.data;
  for (const m of ins.mastery) {
    const k = `${m.subject}.${m.topic}`;
    assert.equal(m.stage, ch[k].stage, k);
    assert.equal(m.score, ch[k].score, k);
  }
  assert.equal(ins.stageCounts.mastered, 2);

  // The Math subject page agrees.
  const math = (await call('GET', '/me/analysis/quant?tz=330', { cookie: u.cookie })).body.data;
  const pctRow = math.chapters.find((c) => c.topic === 'percentage');
  assert.equal(pctRow.stage, 'mastered');
  assert.equal(pctRow.mastery, ch['quant.percentage'].score);
  const eng = (await call('GET', '/me/analysis/english?tz=330', { cookie: u.cookie })).body.data;
  assert.equal(eng.chapters.find((c) => c.topic === 'grammar').stage, 'practising');

  // The syllabus map: "mastered" only for the mastered chapter.
  const map = (await call('GET', '/me/target-exam/syllabus-map/WBPSC_CLERKSHIP', { cookie: u.cookie })).body.data;
  const mapCh = Object.fromEntries(map.subjects.flatMap((s) => s.chapters.map((c) => [`${s.subject}.${c.topic}`, c])));
  assert.equal(mapCh['quant.percentage'].status, 'mastered');
  assert.equal(mapCh['gs.polity'].mastery.stage, 'strong');
  assert.notEqual(mapCh['gs.polity'].status, 'mastered');
  assert.equal(mapCh['gs.indian_history'].status, 'in_progress'); // read, not practised

  // Today's Study: the weak pick is the chapter that needs work (English grammar).
  const today = (await call('GET', '/me/today?tz=330', { cookie: u.cookie })).body.data;
  const weak = today.items.find((i) => i.source === 'weak_priority');
  assert.ok(weak, JSON.stringify(today.items.map((i) => i.source)));
  assert.equal(`${weak.subject}.${weak.topic}`, 'english.grammar');

  // Readiness uses the unified mastery score, not a separate accuracy number.
  const syl = (await call('GET', '/me/target-exam/syllabus', { cookie: u.cookie })).body.data;
  assert.ok(syl.readiness.components.mastery != null, JSON.stringify(syl.readiness));
  assert.equal(syl.readiness.components.accuracy, undefined);
  assert.ok(syl.readiness.basis.included.includes('mastery'));
});

test('GET /me/mastery narrows to one subject and needs sign-in', async () => {
  assert.equal((await call('GET', '/me/mastery')).status, 401);
  const u = await registerUser('mastery-subject@example.com');
  const res = await call('GET', '/me/mastery?subject=reasoning', { cookie: u.cookie });
  assert.equal(res.status, 200);
  assert.ok(res.body.data.chapters.length > 0);
  assert.ok(res.body.data.chapters.every((c) => c.subject === 'reasoning' && c.stage === 'not_started'));
  assert.equal((await call('GET', '/me/mastery?subject=history', { cookie: u.cookie })).status, 400);
});
