'use strict';

/**
 * Selection-funnel catalogue + the exam-style JSON importer, using the real
 * db/seed files (catalog.js, pyq-sample-25.json).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { ExamCategory, Question, TopicSummary } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');
const { clearCatalogCache } = require('../src/services/catalog.service');
const catalog = require('../db/seed/catalog');
const samples = require('../db/seed/pyq-sample-25.json');

let mongod;
let server;
let base;

const get = async (url) => {
  const res = await fetch(base + url);
  return { status: res.status, body: await res.json() };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('catalog_test'));
  await Promise.all([ExamCategory.init(), Question.init(), TopicSummary.init()]);

  await ExamCategory.insertMany(catalog);
  const docs = samples.map((q, i) => convertExamStyleQuestion(q, { index: i }).doc);
  await Question.insertMany(docs);
  // One real PYQ, English only, to exercise PYQ counts and the language filter.
  await Question.create({
    ...docs.find((d) => d.topic === 'profit_loss'),
    code: 'PYQ-1',
    stem: { en: 'PYQ stem' },
    options: [0, 1, 2, 3].map((i) => ({ oid: `opt_pyq${i}0`, text: { en: String(i) } })),
    correct_option_id: 'opt_pyq00',
    solution: { steps: [{ en: 'x' }] },
    pyq: { refs: [{ exam_name: 'WBCS', tier: 'PRELIMS', year: 2023, question_code: 'WBCS-2023-Q1' }] },
  });
  await TopicSummary.create({
    slug: 'quant.profit_loss', subject: 'quant', topic: 'profit_loss',
    title: { en: 'Profit & Loss' }, status: 'PUBLISHED',
  });

  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1/catalog`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('importer: all 25 authored questions convert and validate; none are tagged as PYQs', async () => {
  const converted = samples.map((q, i) => convertExamStyleQuestion(q, { index: i }));
  assert.ok(converted.every((c) => c.doc && !c.error));
  for (const { doc } of converted) await new Question(doc).validate();
  const stored = await Question.find({ code: /^IMP-/ }).select('+solution').lean();
  assert.equal(stored.length, 25);
  assert.ok(stored.every((q) => q.lang_set === 'bn_en' && !q.pyq.is_pyq));
  assert.equal(new Set(stored.map((q) => q.code)).size, 25, 'stable, unique codes');
  assert.equal(stored.filter((q) => q.solution.traps.length).length, 5);
});

test('importer reports unknown taxonomy instead of guessing', () => {
  const r = convertExamStyleQuestion({ ...samples[0], topic: 'Trigonometry' }, { index: 7 });
  assert.match(r.error, /#7: unknown topic "Trigonometry"/);
});

test('GET /categories: four categories in display order with exams and counts', async () => {
  const { status, body } = await get('/categories?language=bn');
  assert.equal(status, 200);
  const cats = body.data.categories;
  assert.deepEqual(cats.map((c) => c.code), ['SSC', 'BANK', 'WBPSC', 'WB_POST']);
  assert.deepEqual(cats[0].exams.map((e) => e.name.en), ['CGL', 'CHSL', 'MTS']);
  assert.deepEqual(cats.find((c) => c.code === 'WB_POST').exams.map((e) => e.name.en), ['GDS', 'Postman', 'MTS']);
  // 9 WBCS + 8 SSC CGL + 8 Bank PO in the sample file; the English-only PYQ is excluded in Bengali.
  assert.deepEqual(cats.map((c) => c.questionCount), [8, 8, 9, 0]);
});

test('GET /categories/:category: subjects with language-aware question counts', async () => {
  const bn = (await get('/categories/wbpsc?language=bengali')).body.data;
  assert.equal(bn.category.name.bn, 'WBPSC');
  assert.deepEqual(bn.subjects.map((s) => s.code), ['quant', 'reasoning', 'english', 'gs']);
  const quantBn = bn.subjects.find((s) => s.code === 'quant');

  clearCatalogCache();
  const en = (await get('/categories/WBPSC?language=en')).body.data;
  const quantEn = en.subjects.find((s) => s.code === 'quant');
  assert.equal(quantEn.questionCount, quantBn.questionCount + 1, 'the English-only PYQ counts only in English');
  assert.equal(quantEn.pyqCount, 1);
  assert.equal(en.subjects.find((s) => s.code === 'gs').name.en, 'General Studies');

  assert.equal((await get('/categories/UPSC')).status, 400);
});

test('GET /categories/:category/subjects/:subject: topics with difficulty, PYQs, summary flag', async () => {
  const { body } = await get('/categories/WBPSC/subjects/quant?language=en');
  const pl = body.data.topics.find((t) => t.code === 'profit_loss');
  assert.equal(pl.name.bn, 'লাভ, ক্ষতি ও ছাড়');
  assert.equal(pl.pyqCount, 1);
  assert.equal(pl.hasSummary, true);
  assert.ok(['EASY', 'MODERATE', 'HARD'].includes(pl.difficulty));

  const mixture = body.data.topics.find((t) => t.code === 'mixture_alligation');
  assert.deepEqual(
    { q: mixture.questionCount, d: mixture.difficulty, s: mixture.hasSummary },
    { q: 0, d: null, s: false },
    'syllabus topics without content are still listed',
  );

  assert.equal((await get('/categories/WBPSC/subjects/physics')).status, 404);
});

test('GET /categories/:category: exam details for the info panel, with sources', async () => {
  const ssc = (await get('/categories/ssc?language=en')).body.data.category;
  assert.equal(ssc.website, 'https://ssc.gov.in');
  const cgl = ssc.exams.find((e) => e.code === 'SSC_CGL');
  const t1 = cgl.stages[0];
  assert.equal(t1.totalQuestions, 100);
  assert.equal(t1.totalMarks, 200);
  assert.equal(t1.durationMin, 60);
  assert.deepEqual(t1.sections.map((s) => s.subject).sort(), ['english', 'gs', 'quant', 'reasoning']);
  assert.ok(t1.sections.every((s) => s.negative === 0.5 && s.sectionalMin === 15));
  assert.ok(cgl.cycles.length >= 2 && cgl.cycles.every((c) => /^https:\/\//.test(c.sourceUrl)));

  const mts = ssc.exams.find((e) => e.code === 'SSC_MTS').stages[0];
  assert.equal(mts.totalMarks, 270, '40 x 3 in session 1 + 50 x 3 in session 2');
  assert.deepEqual([...new Set(mts.sections.map((s) => s.session))], [1, 2]);

  const bank = (await get('/categories/bank?language=en')).body.data.category;
  assert.deepEqual(bank.exams.map((e) => e.code), ['IBPS_PO', 'IBPS_CLERK', 'SBI_PO', 'SBI_CLERK']);
  const po = bank.exams[0].stages[0];
  assert.deepEqual(po.sections.map((s) => [s.questions, s.marks]), [[30, 30], [35, 30], [35, 40]], 'as printed in the notice');
  assert.equal(po.totalMarks, 100);
  assert.ok(po.sections.every((s) => s.negative === null) && po.negativeNote.en);

  const wbcs = (await get('/categories/wbpsc?language=en')).body.data.category.exams.find((e) => e.code === 'WBCS').stages[0];
  assert.equal(wbcs.totalQuestions, 200);
  assert.equal(wbcs.mode, 'OFFLINE');

  const gds = (await get('/categories/WB_POST?language=en')).body.data.category.exams.find((e) => e.code === 'WB_POST_GDS');
  assert.equal(gds.stages.length, 0);
  assert.match(gds.selectionNote.en, /no written exam/i);
});
