'use strict';

/**
 * End-to-end against a real mongod (mongodb-memory-server): builds the indexes,
 * seeds a realistic pool, drives the HTTP API, and checks query plans.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { EJSON } = require('bson');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question, TopicSummary, MockSession } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { mockQuestionAlias } = require('../src/services/signedToken');
const { buildMockGenerationPipeline } = require('../src/services/mockGenerator.pipeline');
const { langSetsContaining } = require('../src/models/schemas/localized');
const { PRACTICE_SORT } = require('../src/services/practice.service');

let mongod;
let server;
let base;
const USER = 'student_42';

async function api(method, url, body, headers = {}) {
  const res = await fetch(base + url, {
    method,
    headers: { 'content-type': 'application/json', 'x-user-id': USER, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json() };
}

function syntheticQuestion(i) {
  const topics = ['profit_loss', 'percentage', 'simple_interest'];
  const optIds = ['a', 'b', 'c', 'd'].map((c) => `opt_${i.toString(16).padStart(6, '0')}${c}0`);
  const pyqYear = i % 4 === 0 ? 2015 + (i % 11) : null;
  return {
    code: `QA-T-${String(i).padStart(6, '0')}`,
    exam_targets: [{ category: 'SSC', tier: 'TIER_1' }, ...(i % 2 ? [{ category: 'BANK', tier: 'PRELIMS' }] : [])],
    subject: 'quant',
    topic: topics[i % 3],
    difficulty: (i % 5) + 1,
    stem: { en: `Question ${i} in English`, bn: `প্রশ্ন ${i}`, ...(i % 3 === 0 && { hi: `प्रश्न ${i}` }) },
    options: optIds.map((oid, k) => ({ oid, text: { en: `${k * 5}%`, bn: `${k * 5}%`, hi: `${k * 5}%` } })),
    correct_option_id: optIds[i % 4],
    solution: { steps: [{ en: 'Step 1', bn: 'ধাপ ১' }], shortcut: { en: 'Trick', bn: 'কৌশল' } },
    pyq: pyqYear ? { refs: [{ exam_name: 'SSC CGL', year: pyqYear, shift: 'Shift 1', question_code: `SSC-CGL-${pyqYear}-Q${i}` }] } : {},
    status: i % 50 === 49 ? 'DRAFT' : 'PUBLISHED',
  };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('edtech_test'));
  await Promise.all([Question.init(), TopicSummary.init(), MockSession.init()]);

  // The deliverable sample document must pass full model validation.
  const raw = EJSON.parse(fs.readFileSync(path.join(__dirname, '../db/seed/sample-question.json'), 'utf8'));
  await new Question(raw).save();

  const docs = Array.from({ length: 1500 }, (_, i) => syntheticQuestion(i + 1));
  await Question.insertMany(docs); // runs validation + pre('validate') per doc

  await TopicSummary.create({
    slug: 'quant.profit_loss',
    subject: 'quant',
    topic: 'profit_loss',
    title: { en: 'Profit & Loss', bn: 'লাভ ও ক্ষতি' },
    overview: { en: 'Everything is a % of **CP**.', bn: 'সবকিছু **ক্রয়মূল্যের** শতাংশ।' },
    formulas: [
      {
        key: 'profit_percent',
        label: { en: 'Profit %', bn: 'শতকরা লাভ' },
        latex: '\\text{Profit\\%} = \\frac{SP - CP}{CP} \\times 100',
        explanation: { en: 'Always on cost price.' }, // no bn yet -> fallback
      },
    ],
    speed_tricks: [{ title: { en: 'Successive %' }, body: { en: '$a+b+\\frac{ab}{100}$' } }],
    syllabus_map: [{ category: 'SSC', tier: 'TIER_1', exam_codes: ['SSC_CGL'], avg_questions_per_paper: 2 }],
    status: 'PUBLISHED',
  });

  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('sample document derives lang_set and PYQ fields', async () => {
  const q = await Question.findOne({ code: 'QA-PL-000412' }).lean();
  assert.equal(q.lang_set, 'bn_en');
  assert.equal(q.pyq.is_pyq, true);
  assert.equal(q.latest_pyq_year, 2023);
  assert.equal(q.correct_option_id, undefined, 'answer is select:false by default');
});

test('model rejects bad option sets', async () => {
  const bad = new Question({ ...syntheticQuestion(99999), code: 'BAD-1' });
  bad.options = bad.options.slice(0, 2);
  await assert.rejects(bad.validate(), /3 or 4 options/);

  const dup = new Question({ ...syntheticQuestion(99998), code: 'BAD-2' });
  dup.options[1].oid = dup.options[0].oid;
  await assert.rejects(dup.validate(), /unique/);
});

test('GET /practice/topic-view returns summary + paginated questions, no answers', async () => {
  const { status, body } = await api('GET', '/practice/topic-view?category=ssc&subject=quant&topic=profit_loss&language=bengali&page=2&limit=10', null, { 'x-user-id': '' });
  assert.equal(status, 200, JSON.stringify(body));
  const d = body.data;
  assert.equal(d.language, 'bn');
  assert.equal(d.summary.title, 'লাভ ও ক্ষতি');
  assert.equal(d.summary.formulas[0].explanation, 'Always on cost price.');
  assert.equal(d.summary.fallbackUsed, true);
  assert.equal(d.questions.length, 10);
  assert.equal(d.pagination.page, 2);
  assert.ok(d.pagination.total > 400);
  assert.equal(d.questions[0].index, 11);
  // Sorted easy -> hard.
  const diffs = await Question.find({ _id: { $in: d.questions.map((q) => q.questionId) } }).select('difficulty').lean();
  assert.ok(diffs.every((x) => x.difficulty === 1));
  const text = JSON.stringify(body);
  assert.ok(!/correct_option_id|correctOptionId|solution|"stats"/.test(text), 'no answer data leaked');
});

test('GET /practice/topic-summary returns every language for on-device switching', async () => {
  const { status, body } = await api('GET', '/practice/topic-summary?category=SSC&subject=quant&topic=profit_loss');
  assert.equal(status, 200, JSON.stringify(body));
  const { breadcrumb, summary } = body.data;
  assert.deepEqual(summary.title, { en: 'Profit & Loss', bn: 'লাভ ও ক্ষতি' });
  assert.deepEqual(summary.formulas[0].explanation, { en: 'Always on cost price.' });
  assert.equal(breadcrumb.category.code, 'SSC');
  assert.deepEqual(breadcrumb.topic.name, summary.title, 'falls back to the sheet title');

  const missing = await api('GET', '/practice/topic-summary?category=SSC&subject=quant&topic=algebra');
  assert.equal(missing.status, 404);
});

test('topic-view validates input', async () => {
  const { status, body } = await api('GET', '/practice/topic-view?category=UPSC&subject=quant&topic=x&language=tamil');
  assert.equal(status, 400);
  assert.equal(body.error.code, 'VALIDATION_FAILED');
  assert.deepEqual(body.error.details.map((e) => e.path).sort(), ['category', 'language']);
});

test('POST /practice/verify-answer: wrong answer returns trap note and bilingual steps', async () => {
  const sample = await Question.findOne({ code: 'QA-PL-000412' }).lean();
  const wrong = await api('POST', '/practice/verify-answer', { questionId: String(sample._id), selectedOptionId: 'opt_e842c06d' });
  assert.equal(wrong.status, 200, JSON.stringify(wrong.body));
  assert.equal(wrong.body.data.isCorrect, false);
  assert.equal(wrong.body.data.correctOptionId, 'opt_3f9a1c2e');
  assert.match(wrong.body.data.trapForSelected.bn, /ধার্যমূল্যের/);
  assert.equal(wrong.body.data.explanation.steps.en.length, 4);
  assert.equal(wrong.body.data.explanation.steps.bn.length, 4);
  assert.equal(wrong.body.data.stats.percentCorrect, 60);

  const right = await api('POST', '/practice/verify-answer', { questionId: String(sample._id), selectedOptionId: 'opt_3f9a1c2e' });
  assert.equal(right.body.data.isCorrect, true);
  assert.equal(right.body.data.trapForSelected, null);

  const foreign = await api('POST', '/practice/verify-answer', { questionId: String(sample._id), selectedOptionId: 'opt_00000000' });
  assert.equal(foreign.status, 422);

  await statsBuffer.flush();
  const after = await Question.findById(sample._id).select('stats').lean();
  assert.equal(after.stats.attempts, 1842);
  assert.equal(after.stats.correct, 1105);
});

test('mock engine: create -> resume -> submit -> idempotent resubmit', async () => {
  const payload = {
    category: 'SSC',
    subject: 'quant',
    topicIds: ['profit_loss', 'percentage'],
    questionCount: 20,
    timeLimitMinutes: 20,
    perQuestionTimer: false,
    allowPause: false,
    // Ignored: marks are decided by the server from the exam pattern, never by the client.
    markingScheme: { positive: 4, negative: 0 },
    language: 'bn',
  };

  const t0 = performance.now();
  const created = await api('POST', '/mock/create-session', payload);
  const createMs = performance.now() - t0;
  assert.equal(created.status, 201, JSON.stringify(created.body));
  const s = created.body.data;
  assert.equal(s.questions.length, 20);
  assert.deepEqual(s.difficultyMix.actual, { EASY: 6, MEDIUM: 10, HARD: 4 });
  assert.equal(new Set(s.questions.map((q) => q.questionId)).size, 20);
  assert.ok(s.questions.every((q) => ['profit_loss', 'percentage'].includes(q.topic)));
  assert.ok(s.questions.every((q) => q.languages.includes('bn')));
  assert.ok(!/correct_option_id|correctOptionId|solution|answer_key/.test(JSON.stringify(created.body)), 'no answers in mock payload');
  console.log(`    create-session (20 Qs, HTTP round trip): ${createMs.toFixed(1)} ms`);

  const resumed = await api('GET', `/mock/session/${s.sessionId}`);
  assert.equal(resumed.status, 200);
  assert.equal(resumed.body.data.questions.length, 20);
  assert.ok(resumed.body.data.remainingSec > 1100);

  const other = await api('GET', `/mock/session/${s.sessionId}`, null, { 'x-user-id': 'someone_else' });
  assert.equal(other.status, 404, 'sessions are private to their owner');

  assert.deepEqual(s.config.markingScheme, {
    positive: 2, negative: 0.5, basis: 'OFFICIAL', examCode: 'SSC_CGL',
    sourceUrl: s.config.markingScheme.sourceUrl,
  });
  assert.match(s.config.markingScheme.sourceUrl, /^https:\/\/ssc\.gov\.in\//);

  // Answer 10 correctly, 6 wrong, leave 4 blank. Live ids are aliases, never real question ids.
  const doc = await MockSession.findById(s.sessionId).select('+answer_key').lean();
  const realIds = new Set(doc.questions.map((q) => String(q.qid)));
  assert.ok(s.questions.every((q) => !realIds.has(q.questionId)), 'live mock never exposes real question ids');
  assert.deepEqual(resumed.body.data.questions.map((q) => q.questionId), s.questions.map((q) => q.questionId), 'aliases are stable across resume');
  const key = Object.fromEntries(doc.questions.map((q) => [mockQuestionAlias(s.sessionId, String(q.qid)), doc.answer_key[String(q.qid)]]));
  const responses = s.questions.slice(0, 16).map((q, i) => ({
    questionId: q.questionId,
    selectedOptionId: i < 10 ? key[q.questionId] : q.options.find((o) => o.optionId !== key[q.questionId]).optionId,
    timeSpentSec: 30,
  }));

  const submitted = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses });
  assert.equal(submitted.status, 200, JSON.stringify(submitted.body));
  const r = submitted.body.data;
  assert.deepEqual(r.counts, { correct: 10, incorrect: 6, unattempted: 4, timedOut: 0 });
  assert.equal(r.score, 17); // 10*2 - 6*0.5
  assert.equal(r.maxScore, 40);
  assert.equal(r.negativeMarksDeducted, 3);
  assert.equal(r.accuracyPct, 62.5);
  assert.equal(r.perQuestion.length, 20);
  assert.ok(r.topicBreakdown.length >= 1);
  // Real elapsed time is ~0s, so client-claimed 480s gets scaled to the server-side budget.
  assert.equal(r.timeAdjusted, true);

  const again = await api('POST', '/mock/submit-session', { sessionId: s.sessionId, responses: [] });
  assert.equal(again.status, 200);
  assert.equal(again.body.data.alreadySubmitted, true);
  assert.equal(again.body.data.score, 17);

  // A new session avoids the questions this user was just served.
  const next = await api('POST', '/mock/create-session', payload);
  const overlap = next.body.data.questions.filter((q) => s.questions.some((p) => p.questionId === q.questionId));
  assert.equal(overlap.length, 0);
});

test('mock engine: validation, auth, and insufficient pool', async () => {
  const bad = await api('POST', '/mock/create-session', {
    category: 'SSC', subject: 'quant', questionCount: 15, timeLimitMinutes: 10,
    markingScheme: { positive: 1, negative: 2 },
  });
  assert.equal(bad.status, 400);
  const paths = bad.body.error.details.map((d) => d.path);
  assert.ok(paths.includes('questionCount'));

  const anon = await fetch(`${base}/mock/create-session`, { method: 'POST' });
  assert.equal(anon.status, 401);

  const tiny = await api('POST', '/mock/create-session', {
    category: 'WBPSC', subject: 'quant', questionCount: 10, timeLimitMinutes: 10, language: 'hi',
  });
  assert.equal(tiny.status, 422);
  assert.equal(tiny.body.error.code, 'INSUFFICIENT_QUESTIONS');
});

test('mock engine: CBT setup options (100 questions, per-question seconds)', async () => {
  const perQ = await api('POST', '/mock/create-session', {
    category: 'SSC', subject: 'quant', questionCount: 25, perQuestionTimer: true, perQuestionSeconds: 45,
    allowPause: true, language: 'bn',
  }, { 'x-user-id': 'cbt_student' });
  assert.equal(perQ.status, 201, JSON.stringify(perQ.body));
  assert.equal(perQ.body.data.config.perQuestionLimitSec, 45, 'exactly the chosen seconds, not an even split');
  assert.equal(perQ.body.data.config.timeLimitMinutes, 19); // ceil(25 × 45 s / 60)
  assert.equal(perQ.body.data.questions.length, 25);

  const hundred = await api('POST', '/mock/create-session', {
    category: 'SSC', subject: 'quant', questionCount: 100, timeLimitMinutes: 90,
  }, { 'x-user-id': 'cbt_student_2' });
  assert.equal(hundred.status, 201, JSON.stringify(hundred.body));
  assert.equal(hundred.body.data.questions.length, 100);

  const missing = await api('POST', '/mock/create-session', { category: 'SSC', subject: 'quant', questionCount: 10 });
  assert.equal(missing.status, 400);
  assert.deepEqual(missing.body.error.details.map((d) => d.path), ['timeLimitMinutes']);
});

test('query plans use qb_cat_subj_topic_lang_diff without in-memory sorts', async () => {
  const filter = {
    status: 'PUBLISHED',
    'exam_targets.category': 'SSC',
    subject: 'quant',
    topic: 'profit_loss',
    lang_set: { $in: langSetsContaining('bn') },
  };
  const practice = await Question.find(filter).sort(PRACTICE_SORT).limit(20).explain('executionStats');
  const plan = JSON.stringify(practice.queryPlanner.winningPlan);
  assert.match(plan, /qb_cat_subj_topic_lang_diff/);
  assert.doesNotMatch(plan, /"stage":"SORT"/, 'practice sort must come from the index');

  const pipeline = buildMockGenerationPipeline({
    category: 'SSC', subject: 'quant', topicIds: [], language: 'bn', perBandLimit: 50,
  });
  const agg = await Question.aggregate(pipeline).explain('executionStats');
  const aggPlan = JSON.stringify(agg);
  assert.match(aggPlan, /qb_cat_subj_topic_lang_diff/);

  const t0 = performance.now();
  for (let i = 0; i < 20; i++) await Question.aggregate(pipeline);
  console.log(`    mock generation pipeline, 50 Qs over ~1500-doc pool: ${((performance.now() - t0) / 20).toFixed(1)} ms avg`);
});
