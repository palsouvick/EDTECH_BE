'use strict';

/**
 * F7 — Find My Starting Level (exam diagnostic).
 *   - pure rules: section allocation by marks, WBCS/IDO section mapping,
 *     candidate ranking, topic signals, weighted starting mastery, expiry
 *   - API: offer / skip / start / submit for the target exam
 *   - honesty: 30–40 questions, easy→medium only, no PYQs, GS answers
 *     source-verified, every question labelled diagnostic, no answers leaked
 *   - not a label: no PracticeAttempt / ReviewItem / QuestionSkip written;
 *     Today uses it as a starting signal that yields to the student's own
 *     data and expires
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, User, PracticeAttempt, ReviewItem, QuestionSkip, DiagnosticResult } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const L = require('../src/services/diagnostic.logic');
const catalog = require('../db/seed/catalog');
const idoPlan = require('../db/plans/ido');

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

let seq = 0;
function mkQuestion(subject, topic, difficulty, extra = {}) {
  seq += 1;
  const oids = ['a', 'b', 'c', 'd'].map((c) => `opt_${seq.toString(16).padStart(6, '0')}${c}0`);
  return {
    code: `DG-${String(seq).padStart(5, '0')}`,
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject,
    topic,
    difficulty,
    provenance: 'ORIGINAL_PRACTICE',
    stem: { en: `Q${seq}`, bn: `প্রশ্ন ${seq}` },
    options: oids.map((oid, k) => ({ oid, text: { en: `${k}`, bn: `${k}` } })),
    correct_option_id: oids[0],
    solution: { steps: [{ en: 'Step', bn: 'ধাপ' }] },
    status: 'PUBLISHED',
    ...(subject === 'gs' && { source_check: { status: 'SOURCE_VERIFIED', source_url: 'https://example.gov.in/x', source_title: 'Source' } }),
    ...extra,
  };
}

const QUANT = ['percentage', 'profit_loss', 'ratio_proportion', 'average', 'interest', 'time_work'];
const ENGLISH = ['grammar', 'synonyms_antonyms', 'fill_blanks', 'error_spotting', 'idioms_phrases', 'one_word_substitution'];
const GS = ['polity', 'geography', 'indian_history', 'general_science', 'west_bengal_gk', 'current_affairs'];
const excludedIds = new Set();

async function seedBank() {
  for (const [subject, topics] of [['quant', QUANT], ['english', ENGLISH], ['gs', GS]]) {
    for (const topic of topics) {
      // 1, 2, 3, 3 are diagnostic-eligible; 4 and 5 must never appear.
      const docs = await Question.insertMany([1, 2, 3, 3, 4, 5].map((d) => mkQuestion(subject, topic, d)));
      for (const d of docs) if (d.difficulty > 3) excludedIds.add(String(d._id));
    }
  }
  // GS without a source check: never in a diagnostic.
  for (const d of await Question.insertMany(Array.from({ length: 6 }, () => mkQuestion('gs', 'polity', 1, { source_check: undefined })))) excludedIds.add(String(d._id));
  // Real previous-year questions: never in a diagnostic (no PYQ labels at all).
  const pyqs = await Question.insertMany(Array.from({ length: 6 }, (_, i) => mkQuestion('quant', 'percentage', 1, {
    provenance: 'OFFICIAL_VERIFIED',
    pyq: { is_pyq: true, refs: [{ exam_name: 'WBPSC Clerkship (Part-I)', tier: 'PRELIMS', year: 2023, question_code: `DG-PYQ-2023-Q${i + 1}`, source_url: 'https://psc.wb.gov.in/p', answer_key_url: 'https://psc.wb.gov.in/k' }] },
  })));
  for (const d of pyqs) excludedIds.add(String(d._id));
}

async function registerUser(email) {
  const reg = await call('POST', '/auth/register', { body: { name: 'Diag Student', email, password: 'secret123' } });
  assert.equal(reg.status, 201, JSON.stringify(reg.body));
  return { id: reg.body.data.user.id, cookie: cookieFrom(reg.setCookie) };
}
async function setTarget(cookie, examCode) {
  const res = await call('PUT', '/me/target-exam', { cookie, body: { examCode } });
  assert.equal(res.status, 200, JSON.stringify(res.body));
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('diagnostic_test'));
  await Promise.all([ExamCategory.init(), Question.init(), User.init(), PracticeAttempt.init(), ReviewItem.init(), QuestionSkip.init(), DiagnosticResult.init()]);
  await ExamCategory.insertMany(catalog);
  await seedBank();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

/* ------------------------------------------------------------ pure rules */

test('diagnostic logic: allocation follows marks, keeps every section, sums to the total', () => {
  // Clerkship Part-I: English 30, GS 40, Arithmetic 30.
  const alloc = L.allocate([{ marks: 30 }, { marks: 40 }, { marks: 30 }]);
  assert.equal(alloc.reduce((a, b) => a + b, 0), L.TOTAL);
  assert.deepEqual(alloc, [11, 14, 10]);
  // A tiny section still gets the minimum; the total never moves.
  const skewed = L.allocate([{ marks: 1 }, { marks: 100 }]);
  assert.equal(skewed.reduce((a, b) => a + b, 0), L.TOTAL);
  assert.ok(skewed[0] >= L.MIN_PER_BLOCK);
  assert.ok(L.TOTAL >= L.MIN_TOTAL && L.TOTAL <= L.MAX_TOTAL);
});

test('diagnostic logic: sections come from the exam itself (WBCS GS sections mapped, IDO notice split, no pattern -> equal)', () => {
  const wbpsc = catalog.find((c) => c.code === 'WBPSC');
  const wbcs = wbpsc.exams.find((e) => e.code === 'WBCS');
  const sections = wbcs.stages.find((s) => s.sections?.length).sections;
  const pattern = { sections: sections.map((s) => ({ subject: s.subject, name: s.title, marks: s.num_questions * s.marks_per_question })) };
  const { basis, blocks } = L.blocksFor('WBCS', pattern, [], null);
  assert.equal(basis, 'pattern');
  assert.equal(blocks.length, sections.length);
  // Every WBCS General Studies section names its chapters — none falls back to "all of GS".
  for (const b of blocks.filter((x) => x.subject === 'gs')) assert.ok(b.topics?.length, `unmapped WBCS section ${b.title.en}`);
  const gsTopics = new Set(wbpsc.subjects.find((s) => s.code === 'gs').topics.map((t) => t.code));
  for (const b of blocks) for (const topic of b.topics ?? []) assert.ok(gsTopics.has(topic), topic);

  const ido = L.blocksFor('WBPSC_IDO', null, [], idoPlan.SECTIONS);
  assert.equal(ido.basis, 'plan_notice');
  assert.equal(ido.blocks.reduce((n, b) => n + b.marks, 0), 100);

  const post = L.blocksFor('WB_POST_GDS', null, [{ code: 'quant', name: { en: 'Maths' } }, { code: 'gs', name: { en: 'GS' } }], null);
  assert.equal(post.basis, 'equal');
  assert.deepEqual(post.blocks.map((b) => b.marks), [1, 1]);
});

test('diagnostic logic: candidates never include out-of-syllabus chapters; in-syllabus and weight first', () => {
  const chapters = [
    { topic: 'a', syllabus: 'supplementary', weight: null },
    { topic: 'b', syllabus: 'out', weight: 50 },
    { topic: 'c', syllabus: 'in', weight: 10 },
    { topic: 'd', syllabus: 'in', weight: 40 },
    { topic: 'e', syllabus: 'unmapped', weight: null },
  ];
  assert.deepEqual(L.rankCandidates({ topics: null }, chapters).map((c) => c.topic), ['d', 'c', 'e', 'a']);
  // A section that names its chapters keeps exactly those, in its own order.
  assert.deepEqual(L.rankCandidates({ topics: ['c', 'a'] }, chapters).map((c) => c.topic), ['c', 'a']);
  // Easy before medium inside a chapter.
  const picks = L.pickForTopic([{ difficulty: 3 }, { difficulty: 3 }, { difficulty: 2 }], 2);
  assert.deepEqual(picks.map((q) => q.difficulty), [2, 3]);
});

test('diagnostic logic: topic signals need two questions; starting mastery is marks-weighted', () => {
  assert.equal(L.topicSignal({ total: 1, correct: 0 }), 'too_few');
  assert.equal(L.topicSignal({ total: 2, correct: 0 }), 'start_here');
  assert.equal(L.topicSignal({ total: 2, correct: 1 }), 'mixed');
  assert.equal(L.topicSignal({ total: 2, correct: 2 }), 'looks_strong');

  const blocks = [{ key: 'x', title: { en: 'X' }, subject: 'gs', marks: 75 }, { key: 'y', title: { en: 'Y' }, subject: 'quant', marks: 25 }];
  const items = [
    { questionId: '1', block: 0, subject: 'gs', topic: 'polity', difficulty: 1 },
    { questionId: '2', block: 0, subject: 'gs', topic: 'polity', difficulty: 3 },
    { questionId: '3', block: 1, subject: 'quant', topic: 'percentage', difficulty: 1 },
    { questionId: '4', block: 1, subject: 'quant', topic: 'percentage', difficulty: 3 },
  ];
  const graded = new Map([
    ['1', { selectedOptionId: 'o', isCorrect: true }],
    ['2', { selectedOptionId: 'o', isCorrect: true }],
    ['3', { selectedOptionId: 'o', isCorrect: false }],
    ['4', { selectedOptionId: null, isCorrect: false }],
  ]);
  const r = L.score(items, graded, blocks);
  assert.equal(r.summary.total, 4);
  assert.equal(r.summary.attempted, 3);
  assert.equal(r.summary.unattempted, 1);
  assert.equal(r.startingMastery, 75); // 100% x 75 + 0% x 25, not the plain 50%
  assert.equal(r.level, 'practice_ready');
  assert.deepEqual(r.weakTopics.map((x) => x.topic), ['percentage']);
  assert.deepEqual(r.strongTopics.map((x) => x.topic), ['polity']);
  assert.equal(r.subjects.find((s) => s.subject === 'quant').accuracy, 0);
  assert.equal(r.summary.byLevel.easy.correct, 1);

  assert.equal(L.signalIsActive(new Date()), true);
  assert.equal(L.signalIsActive(new Date(Date.now() - (L.SIGNAL_DAYS + 1) * 86_400_000)), false);
});

/* ------------------------------------------------------------ API */

test('diagnostic API: auth required; no target exam -> no offer and start refused', async () => {
  assert.equal((await call('GET', '/me/diagnostic')).status, 401);
  const u = await registerUser('diag-none@example.com');
  const st = await call('GET', '/me/diagnostic', { cookie: u.cookie });
  assert.equal(st.status, 200);
  assert.equal(st.body.data.state, 'no_target');
  assert.equal(st.body.data.offer, false);
  const start = await call('POST', '/me/diagnostic/start', { cookie: u.cookie, body: {} });
  assert.equal(start.status, 422);
  assert.equal(start.body.error.code, 'NO_TARGET_EXAM');
});

test('diagnostic API: offered after choosing an exam; skippable, and skipping does not block taking it later', async () => {
  const u = await registerUser('diag-skip@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const st = (await call('GET', '/me/diagnostic', { cookie: u.cookie })).body.data;
  assert.equal(st.state, 'none');
  assert.equal(st.offer, true);
  assert.equal(st.preview.totalQuestions, L.TOTAL);
  assert.equal(st.preview.basis, 'pattern');
  assert.deepEqual(st.preview.sections.map((s) => [s.subject, s.questions]), [['english', 11], ['gs', 14], ['quant', 10]]);

  const sk = await call('POST', '/me/diagnostic/skip', { cookie: u.cookie });
  assert.equal(sk.status, 200);
  assert.equal(sk.body.data.state, 'skipped');
  assert.equal(sk.body.data.offer, false);
  // Still available on request.
  assert.equal((await call('POST', '/me/diagnostic/start', { cookie: u.cookie, body: {} })).status, 200);
});

test('diagnostic API: start -> submit gives subject/topic accuracy, attempted/unattempted, starting mastery; records nothing else', async () => {
  const u = await registerUser('diag-take@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const start = await call('POST', '/me/diagnostic/start', { cookie: u.cookie, body: { language: 'en' } });
  assert.equal(start.status, 200, JSON.stringify(start.body));
  const test0 = start.body.data;
  assert.equal(test0.label, 'DIAGNOSTIC');
  assert.ok(test0.totalQuestions >= L.MIN_TOTAL && test0.totalQuestions <= L.MAX_TOTAL, String(test0.totalQuestions));
  assert.equal(test0.timed, false);
  assert.equal(test0.negativeMarking, 0);
  assert.deepEqual(test0.sections.map((s) => s.subject), ['english', 'gs', 'quant']); // the paper's own order

  const questions = test0.sections.flatMap((s) => s.questions);
  assert.equal(questions.length, test0.totalQuestions);
  assert.equal(new Set(questions.map((q) => q.questionId)).size, questions.length);
  for (const q of questions) {
    assert.equal(q.diagnostic, true);
    assert.ok(q.difficulty <= 3, `difficulty ${q.difficulty}`);
    assert.ok(['easy', 'medium'].includes(q.level));
    assert.deepEqual(q.pyq, []);
    assert.ok(!excludedIds.has(q.questionId), 'excluded question served');
    assert.equal(q.correctOptionId, undefined);
    if (q.subject === 'gs') assert.equal(q.sourceCheck?.status, 'SOURCE_VERIFIED');
  }
  // Easy -> medium inside every section; about two questions per chapter.
  for (const s of test0.sections) {
    const d = s.questions.map((q) => q.difficulty);
    assert.deepEqual(d, [...d].sort((a, b) => a - b), `section ${s.subject} not easy->medium`);
    const chapters = new Set(s.questions.map((q) => q.topic));
    assert.ok(chapters.size >= Math.ceil(s.questions.length / L.PER_TOPIC) - 1, `${s.subject}: ${chapters.size} chapters`);
  }

  // GS all right, Arithmetic all wrong, English left blank.
  const answers = [];
  for (const s of test0.sections) {
    for (const q of s.questions) {
      const right = q.options[0].optionId; // seed: option 0 is correct (options are not shuffled here)
      if (s.subject === 'gs') answers.push({ questionId: q.questionId, selectedOptionId: right, timeSpentSec: 20 });
      if (s.subject === 'quant') answers.push({ questionId: q.questionId, selectedOptionId: q.options[1].optionId, timeSpentSec: 20 });
    }
  }
  const sub = await call('POST', '/me/diagnostic/submit', { cookie: u.cookie, body: { testToken: test0.testToken, answers } });
  assert.equal(sub.status, 200, JSON.stringify(sub.body));
  const { result, results } = sub.body.data;
  const nEnglish = test0.sections.find((s) => s.subject === 'english').questions.length;
  const nGs = test0.sections.find((s) => s.subject === 'gs').questions.length;
  assert.equal(results.length, questions.length);
  assert.ok(results.every((r) => r.correctOptionId), 'answers revealed after submit');
  assert.equal(result.summary.total, questions.length);
  assert.equal(result.summary.attempted, questions.length - nEnglish);
  assert.equal(result.summary.unattempted, nEnglish);
  assert.equal(result.summary.correct, nGs);
  const subj = Object.fromEntries(result.subjects.map((s) => [s.subject, s]));
  assert.equal(subj.gs.accuracy, 100);
  assert.equal(subj.quant.accuracy, 0);
  assert.equal(subj.english.accuracy, null); // nothing tried: accuracy is not 0, it is unknown
  assert.equal(subj.english.unattempted, nEnglish);
  // Weighted by marks: GS is 40 of 100 marks.
  assert.equal(result.startingMastery, 40);
  assert.equal(result.level, 'build_up');
  assert.ok(result.weakTopics.some((x) => x.subject === 'quant'));
  assert.ok(result.strongTopics.every((x) => x.subject === 'gs') && result.strongTopics.length > 0);
  assert.ok(result.topics.every((x) => x.name?.en));
  assert.equal(result.signal.active, true);
  assert.match(result.signal.note.en, /starting signal/);

  // Not practice history: no attempts, no mistakes, no skips.
  assert.equal(await PracticeAttempt.countDocuments({ user_id: u.id }), 0);
  assert.equal(await ReviewItem.countDocuments({ user_id: u.id }), 0);
  assert.equal(await QuestionSkip.countDocuments({ user_id: u.id }), 0);

  const st = (await call('GET', '/me/diagnostic', { cookie: u.cookie })).body.data;
  assert.equal(st.state, 'completed');
  assert.equal(st.offer, false);
  assert.equal(st.result.startingMastery, 40);
  // "Not now" never overwrites a completed result.
  assert.equal((await call('POST', '/me/diagnostic/skip', { cookie: u.cookie })).body.data.state, 'completed');
});

test('diagnostic API: forged token and foreign questions are refused', async () => {
  const u = await registerUser('diag-forge@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const t0 = (await call('POST', '/me/diagnostic/start', { cookie: u.cookie, body: {} })).body.data;
  const bad = await call('POST', '/me/diagnostic/submit', { cookie: u.cookie, body: { testToken: `${t0.testToken}x`, answers: [] } });
  assert.equal(bad.status, 403);
  assert.equal(bad.body.error.code, 'TEST_TOKEN_INVALID');
  const foreign = [...excludedIds][0];
  const res = await call('POST', '/me/diagnostic/submit', { cookie: u.cookie, body: { testToken: t0.testToken, answers: [{ questionId: foreign, selectedOptionId: null }] } });
  assert.equal(res.status, 403);
  assert.equal(res.body.error.code, 'QUESTION_NOT_IN_TEST');
});

test('diagnostic -> Today: a starting signal that yields to own data and expires', async () => {
  const u = await registerUser('diag-today@example.com');
  await setTarget(u.cookie, 'WBPSC_CLERKSHIP');
  const t0 = (await call('POST', '/me/diagnostic/start', { cookie: u.cookie, body: {} })).body.data;
  // Everything right except Arithmetic, which is all wrong.
  const answers = t0.sections.flatMap((s) => s.questions.map((q) => ({
    questionId: q.questionId,
    selectedOptionId: s.subject === 'quant' ? q.options[1].optionId : q.options[0].optionId,
  })));
  const sub = await call('POST', '/me/diagnostic/submit', { cookie: u.cookie, body: { testToken: t0.testToken, answers } });
  assert.equal(sub.status, 200);
  const weak = sub.body.data.result.weakTopics;
  assert.ok(weak.length > 0 && weak.every((x) => x.subject === 'quant'));

  const today = async () => (await call('GET', '/me/today?tz=330', { cookie: u.cookie })).body.data;
  const d1 = await today();
  assert.ok(d1.startingSignal, 'Today exposes the starting signal');
  assert.equal(d1.startingSignal.used, true);
  const diagItem = d1.items.find((i) => i.source === 'diagnostic_start');
  assert.ok(diagItem, JSON.stringify(d1.items.map((i) => i.source)));
  assert.equal(diagItem.subject, 'quant');
  assert.ok(weak.some((x) => x.topic === diagItem.topic));
  assert.match(diagItem.reason.en, /starting check/);

  // The student's own answers take over for that chapter (5 = insights' status minimum).
  const qs = await Question.find({ subject: 'quant', topic: diagItem.topic, difficulty: { $lte: 3 }, 'pyq.is_pyq': { $ne: true } }).limit(5).lean();
  await PracticeAttempt.insertMany(Array.from({ length: L.OWN_DATA_MIN }, (_, i) => ({
    user_id: u.id, question_id: qs[i % qs.length]._id, subject: 'quant', topic: diagItem.topic, correct: true, source: 'practice',
  })));
  const d2 = await today();
  assert.ok(!d2.items.some((i) => i.source === 'diagnostic_start' && i.topic === diagItem.topic), JSON.stringify(d2.items));

  // After SIGNAL_DAYS the diagnostic stops steering anything.
  await DiagnosticResult.updateOne({ user_id: u.id }, { $set: { taken_at: new Date(Date.now() - (L.SIGNAL_DAYS + 1) * 86_400_000) } });
  const d3 = await today();
  assert.equal(d3.startingSignal, null);
  assert.ok(!d3.items.some((i) => i.source === 'diagnostic_start'));
});
