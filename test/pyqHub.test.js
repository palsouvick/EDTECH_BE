'use strict';

/**
 * PYQ hub: answer basis labels and the /pyq API, against the real paper files
 * for one paper of each kind (official key, no official key, unofficial copy).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question } = require('../src/models');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const { pyqRefBasis } = require('../src/services/questionProvenance');
const { pyqSourceLine } = require('../src/services/importers/examStyleJson');
const { relabelPyqSourceLines } = require('../scripts/relabelPyqSourceLines');
const { buildPriorities, levelFor, clearPriorityCache } = require('../src/services/priority.service');

const PAPER = 'https://psc.wb.gov.in/Download?param1=paper.pdf&param2=PYQP';
const KEY = 'https://psc.wb.gov.in/Download?param1=key.pdf&param2=advertisement';
const COPY = 'https://files.wbcs.in/wbcs-2023-question-prelims.pdf';
const ref = (extra) => ({ exam_name: 'WBCS (Exe.) Prelims', year: 2022, question_code: 'WBCS-EXE-PRELIMS-2022-PRELIMS-Q1', source_url: PAPER, answer_key_url: KEY, ...extra });

test('answer basis: official key, cross-checked, unofficial copy, hidden', () => {
  assert.deepEqual(pyqRefBasis(ref(), 'OFFICIAL_VERIFIED'), { answerBasis: 'OFFICIAL_KEY', paperBasis: 'OFFICIAL_PAPER' });
  assert.deepEqual(pyqRefBasis(ref({ answer_key_url: undefined }), 'ADAPTED_PYQ'), { answerBasis: 'CROSS_CHECKED', paperBasis: 'OFFICIAL_PAPER' });
  assert.deepEqual(pyqRefBasis(ref({ source_url: COPY }), 'OFFICIAL_VERIFIED'), { answerBasis: 'OFFICIAL_KEY', paperBasis: 'UNOFFICIAL_COPY' });

  // Never shown as a PYQ:
  assert.equal(pyqRefBasis(ref({ question_code: 'WBCS-2022-SYN-Q1' }), 'OFFICIAL_VERIFIED'), null, 'synthetic ref');
  assert.equal(pyqRefBasis(ref({ source_url: COPY, answer_key_url: undefined }), 'ADAPTED_PYQ'), null, 'unofficial copy without the official key');
  assert.equal(pyqRefBasis(ref({ answer_key_url: undefined }), 'UNCLASSIFIED'), null, 'keyless ref not imported as a real paper');
  assert.equal(pyqRefBasis(ref({ answer_key_url: 'https://example.com/key.pdf' }), 'ADAPTED_PYQ'), null, 'key on an unofficial host');
  assert.equal(pyqRefBasis(ref({ source_url: 'https://example.com/paper.pdf' }), 'OFFICIAL_VERIFIED'), null, 'paper on an unknown host');
  assert.equal(pyqRefBasis(ref({ source_url: COPY.replace('https', 'http') }), 'OFFICIAL_VERIFIED'), null, 'plain http');
});

test('the explanation source line never calls an unofficial copy or a keyless answer official', () => {
  const official = pyqSourceLine(ref(), 1, ['en', 'bn']);
  assert.match(official.en, /\[Official paper\]/);
  assert.match(official.bn, /\[সরকারি প্রশ্নপত্র\]/);

  const keyless = pyqSourceLine(ref({ answer_key_url: undefined }), 1, ['en', 'bn']);
  assert.match(keyless.en, /answer key for this paper is not available.*cross-checked/);
  assert.match(keyless.bn, /সরকারি উত্তরমালা পাওয়া যায় না/);

  const copy = pyqSourceLine(ref({ source_url: COPY }), 1, ['en', 'bn']);
  assert.doesNotMatch(copy.en, /Official paper/);
  assert.match(copy.en, /\[Unofficial copy of the paper\]\(https:\/\/files\.wbcs\.in.*\[official answer key\]\(https:\/\/psc\.wb\.gov\.in/);
  assert.doesNotMatch(copy.bn, /সরকারি প্রশ্নপত্র/);
});

let mongod;
let server;
let root;
const get = async (p) => {
  const res = await fetch(root + p);
  return { status: res.status, body: await res.json() };
};
const quiet = { log: () => {}, warn: () => {} };

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('pyq_hub_test'));
  await Question.init();
  for (const f of ['wbcs-prelims-2022.json', 'wbcs-prelims-2019.json', 'wbcs-prelims-2023.json']) {
    const r = await importQuestionFile(path.join(PYQ_DIR, f), quiet);
    assert.deepEqual(r.errors, [], f);
  }
  // A legacy question with a keyless ref that was never imported as a real paper: stays hidden.
  await Question.create({
    code: 'GS-LEGACY-1', exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }], subject: 'gs', topic: 'polity', difficulty: 2,
    stem: { en: 'Legacy question' }, options: ['a', 'b', 'c', 'd'].map((c) => ({ oid: `opt_legacy${c}`, text: { en: c } })),
    correct_option_id: 'opt_legacya', status: 'PUBLISHED', provenance: 'UNCLASSIFIED',
    pyq: { refs: [{ exam_name: 'WBCS (Exe.) Prelims', year: 2020, question_code: 'WBCS-2020-Q9', source_url: PAPER }] },
  });
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('/pyq/filters lists each paper with its answer basis and links, and topic counts', async () => {
  const { status, body } = await get('/pyq/filters');
  assert.equal(status, 200);
  const [wbcs, ...others] = body.data.exams;
  assert.equal(others.length, 0);
  assert.deepEqual(wbcs.years, [2023, 2022, 2019], 'the hidden legacy 2020 ref is not a paper');
  const by = Object.fromEntries(wbcs.papers.map((p) => [p.year, p]));

  assert.equal(by[2022].answerBasis, 'OFFICIAL_KEY');
  assert.equal(by[2022].paperBasis, 'OFFICIAL_PAPER');
  assert.match(by[2022].answerKeyUrl, /^https:\/\/psc\.wb\.gov\.in\//);
  assert.equal(by[2022].count, 190);

  assert.equal(by[2019].answerBasis, 'CROSS_CHECKED');
  assert.equal(by[2019].answerKeyUrl, null);
  assert.equal(by[2019].count, 193);

  assert.equal(by[2023].answerBasis, 'OFFICIAL_KEY');
  assert.equal(by[2023].paperBasis, 'UNOFFICIAL_COPY');
  assert.match(by[2023].paperUrl, /^https:\/\/files\.wbcs\.in\//);

  // 579, not 190 + 193 + 197: the importer keys a question by its English stem, so 2023 Q37
  // and Q79 (same printed stem) are one document. Known issue, fixed with repeat detection (P2).
  assert.equal(wbcs.count, 190 + 193 + 197 - 1);
  const history = body.data.topics.find((t) => t.subject === 'gs' && t.topic === 'indian_history');
  assert.ok(history.count > 0);
  assert.equal(history.name.en, 'Indian History');
  assert.ok(history.name.bn, 'Bengali chapter name');
  assert.equal(Object.values(history.byYear).reduce((a, b) => a + b, 0), history.count);
});

test('/pyq lists one paper in question order, with the basis on every question and no answers', async () => {
  const { status, body } = await get('/pyq?exam=WBCS%20(Exe.)%20Prelims&year=2019&limit=20');
  assert.equal(status, 200);
  assert.equal(body.data.pagination.total, 193);
  const nos = body.data.questions.map((q) => q.pyq[0].questionNo);
  assert.deepEqual(nos, [...nos].sort((a, b) => a - b), 'paper order');
  for (const q of body.data.questions) {
    assert.equal(q.pyq.length, 1);
    assert.equal(q.pyq[0].year, 2019);
    assert.equal(q.pyq[0].answerBasis, 'CROSS_CHECKED');
    assert.equal(q.pyq[0].answerKeyUrl, null);
    assert.equal(q.correct_option_id, undefined);
    assert.equal(q.correctOptionId, undefined);
    assert.equal(q.solution, undefined);
    assert.equal(q.sourceCheck, null, 'the PYQ badge states the basis; no "source pending" badge as well');
  }
});

test('/pyq filters by subject and topic across years', async () => {
  const { body } = await get('/pyq?subject=gs&topic=polity&limit=20');
  assert.ok(body.data.pagination.total > 0);
  for (const q of body.data.questions) {
    assert.equal(q.subject, 'gs');
    assert.equal(q.topic, 'polity');
  }
  const bad = await get('/pyq?topic=DROP%20TABLE');
  assert.equal(bad.status, 400);
});

test('answers come from verify-answer, and the keyless source line says so', async () => {
  const { body } = await get('/pyq?year=2019&limit=1');
  const q = body.data.questions[0];
  const res = await fetch(`${root}/practice/verify-answer`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ questionId: q.questionId, selectedOptionId: q.options[0].optionId, category: 'WBPSC' }),
  });
  const v = await res.json();
  assert.equal(res.status, 200);
  const last = v.data.explanation.items.at(-1);
  assert.match(last.en, /cross-checked/);
});

test('relabel script fixes an old "Official paper" line on the 2023 copy and touches nothing else', async () => {
  const q = await Question.findOne({ 'pyq.refs.year': 2023 }).select('+solution stats').lean();
  const last = q.solution.steps.length - 1;
  const old = { en: '📄 Previous-year question: WBCS 2023 · [Official paper](https://files.wbcs.in/x.pdf)', bn: '📄 আসল প্রশ্ন · [সরকারি প্রশ্নপত্র](https://files.wbcs.in/x.pdf)' };
  await Question.updateOne({ _id: q._id }, { $set: { [`solution.steps.${last}`]: old, 'stats.attempts': 7 } });

  const dry = await relabelPyqSourceLines({ log: () => {} });
  assert.equal(dry.changed, 1);
  assert.equal((await Question.findById(q._id).select('+solution').lean()).solution.steps[last].en, old.en, 'dry run writes nothing');

  await relabelPyqSourceLines({ apply: true, log: () => {} });
  const after = await Question.findById(q._id).select('+solution stats').lean();
  assert.match(after.solution.steps[last].en, /Unofficial copy of the paper/);
  assert.equal(after.solution.steps.length, q.solution.steps.length);
  assert.deepEqual(after.solution.steps.slice(0, last), q.solution.steps.slice(0, last));
  assert.equal(after.stats.attempts, 7, 'stats kept');
  assert.equal((await relabelPyqSourceLines({ log: () => {} })).changed, 0, 'idempotent');
});

test('priority rule: must = >=10% AND >=80% of papers; important = >=4% OR >=50% of papers', () => {
  assert.equal(levelFor({ share: 0.1, paperShare: 0.8 }), 'MUST');
  assert.equal(levelFor({ share: 0.3, paperShare: 0.7 }), 'IMPORTANT', 'big share but in too few papers');
  assert.equal(levelFor({ share: 0.04, paperShare: 0.1 }), 'IMPORTANT');
  assert.equal(levelFor({ share: 0.01, paperShare: 0.5 }), 'IMPORTANT');
  assert.equal(levelFor({ share: 0.039, paperShare: 0.49 }), 'ADDITIONAL');

  const rows = [
    ...Array.from({ length: 9 }, (_, i) => ({ subject: 'gs', topic: 'polity', paper: `P${i % 3}` })),
    { subject: 'gs', topic: 'economy', paper: 'P0' },
    { subject: 'quant', topic: 'percentage', paper: 'P1' },
  ];
  const p = buildPriorities(rows);
  assert.equal(p.paperCount, 3);
  assert.equal(p.subjects.gs.total, 10);
  assert.deepEqual(p.subjects.gs.topics.polity, { name: { en: 'Indian Polity', bn: p.subjects.gs.topics.polity.name.bn, hi: p.subjects.gs.topics.polity.name.hi }, count: 9, share: 90, papers: 3, level: 'MUST' });
  assert.equal(p.subjects.gs.topics.economy.level, 'IMPORTANT', '10% of GS but only 1 of 3 papers');
  assert.equal(p.subjects.quant.topics.percentage.share, 100, 'shares are within a subject');
});

test('GET /pyq/priorities counts only the PYQs students can see', async () => {
  clearPriorityCache();
  const res = await fetch(`${root}/pyq/priorities`);
  const { data } = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.paperCount, 3, 'the hidden legacy 2020 ref is not a paper');
  const gs = data.subjects.gs;
  assert.equal(Object.values(gs.topics).reduce((a, t) => a + t.count, 0), gs.total);
  assert.equal(gs.topics.indian_history.level, 'MUST');
  assert.equal(gs.topics.polity.papers, 3);
  assert.deepEqual(data.rule, { mustPercent: 10, mustPaperPercent: 80, importantPercent: 4, importantPaperPercent: 50 });
});
