'use strict';

/** GK topic packs: validation, "You should also learn" links, knowledge map, questions, related PYQs. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { GkFact, Question, ExamCategory } = require('../src/models');
const { ensureGkLibrary } = require('../scripts/seedGkFacts');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');
const { validateFact, validatePack } = require('../src/services/gkFacts.validate');
const { clearGkCache } = require('../src/services/gk.service');
const catalog = require('../db/seed/catalog');

const t = (en, bn) => ({ en, bn });
const history = fs.readFileSync(path.join(__dirname, '../db/gk/indian_history.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const real = (code) => structuredClone(history.find((f) => f.code === code));

const pack = {
  order: 30,
  must_remember: [t('First Panipat 1526: Babur defeated Ibrahim Lodi.', 'পানিপথের প্রথম যুদ্ধ ১৫২৬: বাবর ইব্রাহিম লোদিকে পরাজিত করেন।')],
  table: {
    caption: t('The battles', 'যুদ্ধগুলি'),
    columns: [t('Battle', 'যুদ্ধ'), t('Year', 'সাল')],
    rows: [[t('First', 'প্রথম'), t('1526', '১৫২৬')], [t('Second', 'দ্বিতীয়'), t('1556', '১৫৫৬')]],
  },
  dont_confuse: [t('1526 Babur, 1556 Akbar', '১৫২৬ বাবর, ১৫৫৬ আকবর')],
  memory_trick: t('1526 → 1556: thirty years apart', '১৫২৬ → ১৫৫৬: তিরিশ বছরের ব্যবধান'),
  related: ['GK-HIS-008', 'GK-HIS-021'],
  keywords: { en: ['Panipat'], bn: ['পানিপথ'] },
  pyq_terms: ['Panipat'],
};

function packRecord() {
  const f = real('GK-HIS-008');
  f.code = 'GK-HIS-102';
  f.title = t('Test pack: the Battles of Panipat', 'পরীক্ষামূলক: পানিপথের যুদ্ধ');
  f.linked_existing = [];
  f.questions = f.questions.map((q, i) => ({ ...q, q: [`Pack question ${i + 1}: ${q.q[0]}`, `প্যাক প্রশ্ন ${i + 1}: ${q.q[1]}`] }));
  f.pack = structuredClone(pack);
  return f;
}

test('pack validation: bilingual, rectangular table, keywords, terms, related codes', () => {
  assert.deepEqual(validateFact(packRecord()), []);
  const bad = (patch) => validatePack({ ...structuredClone(pack), ...patch }).map((e) => e.code);
  assert.ok(bad({ must_remember: [] }).includes('COUNT'));
  assert.ok(bad({ table: { ...pack.table, rows: [[t('First', 'প্রথম')]] } }).includes('ROW_WIDTH'));
  assert.ok(bad({ keywords: { en: ['Panipat'], bn: ['Panipat'] } }).includes('BENGALI_MISSING'));
  assert.ok(bad({ pyq_terms: ['P'] }).includes('INVALID_TERMS'));
  assert.ok(bad({ related: ['HIS-8'] }).includes('INVALID_RELATED'));
  assert.ok(bad({ memory_trick: t('only english', 'only english') }).includes('BENGALI_MISSING'));
});

let mongod;
let server;
let root;
let dir;
const get = async (p) => {
  const res = await fetch(root + p);
  return { status: res.status, body: await res.json() };
};

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('packs_test'));
  await Promise.all([GkFact.init(), Question.init(), ExamCategory.init()]);
  await ExamCategory.insertMany(catalog);
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'packs-'));
  const records = [real('GK-HIS-002'), real('GK-HIS-008'), real('GK-HIS-021'), packRecord()];
  fs.writeFileSync(path.join(dir, 'indian_history.jsonl'), records.map((r) => JSON.stringify(r)).join('\n'));
  await ensureGkLibrary({ log: () => {}, dir });
  await importQuestionFile(path.join(PYQ_DIR, 'wbcs-prelims-2022.json'), { log: () => {}, warn: () => {} });
  clearGkCache();
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

test('a pack is presented with its revision sections', async () => {
  const { status, body } = await get('/gk/facts/GK-HIS-102');
  assert.equal(status, 200);
  const p = body.data.pack;
  assert.equal(p.mustRemember[0].en, pack.must_remember[0].en);
  assert.deepEqual(p.table.columns.map((c) => c.en), ['Battle', 'Year']);
  assert.equal(p.table.rows[1][1].bn, '১৫৫৬');
  assert.equal(p.memoryTrick.en, pack.memory_trick.en);
  assert.deepEqual(p.related, ['GK-HIS-008', 'GK-HIS-021']);
  assert.equal(p.hasPyqTerms, true);
  assert.equal(body.data.relatedPacks.length, 0, 'a pack does not link to itself');
});

test('"You should also learn": facts that mention the topic, or that the pack lists, link to it; others do not', async () => {
  const { body } = await get('/gk/facts?card=indian_history&limit=20');
  const by = Object.fromEntries(body.data.facts.map((f) => [f.code, f]));
  assert.deepEqual(by['GK-HIS-008'].relatedPacks.map((p) => p.code), ['GK-HIS-102']);
  assert.deepEqual(by['GK-HIS-021'].relatedPacks.map((p) => p.code), ['GK-HIS-102']);
  assert.deepEqual(by['GK-HIS-002'].relatedPacks, [], 'the Rigveda fact has nothing to do with Panipat');
  assert.equal(by['GK-HIS-002'].pack, null);
});

test('knowledge map lists a chapter\'s packs in order; unknown cards are refused', async () => {
  const { body } = await get('/gk/cards/indian_history/packs');
  assert.deepEqual(body.data.packs.map((p) => [p.code, p.subtopic, p.order]), [['GK-HIS-102', 'mughal', 30]]);
  assert.deepEqual((await get('/gk/cards/polity/packs')).body.data.packs, []);
  assert.equal((await get('/gk/cards/nope/packs')).status, 400);
});

test('a fact\'s own practice questions, without answers', async () => {
  const { body } = await get('/gk/facts/GK-HIS-102/questions');
  assert.ok(body.data.questions.length >= 1);
  for (const q of body.data.questions) {
    assert.match(q.stem.en, /^Pack question/);
    assert.equal(q.correctOptionId, undefined);
  }
  assert.equal((await get('/gk/facts/GK-HIS-999/questions')).status, 404);
});

test('related PYQs: real papers whose stem, options or explanation name the topic; practise them via /pyq?pack=', async () => {
  const { body } = await get('/gk/facts/GK-HIS-102/pyqs');
  const nos = body.data.questions.map((q) => q.pyq[0].questionNo);
  assert.ok(nos.includes(116), '2022 Q116 (tulughma) names Panipat only in its explanation');
  assert.equal(body.data.total, body.data.questions.length);
  for (const q of body.data.questions) assert.equal(q.pyq[0].year, 2022);

  const list = await get('/pyq?pack=GK-HIS-102&limit=20');
  assert.equal(list.body.data.pagination.total, body.data.total);
  assert.equal((await get('/gk/facts/GK-HIS-002/pyqs')).body.data.total, 0, 'an ordinary fact has no PYQ terms');
  assert.equal((await get('/pyq?pack=bad')).status, 400);
});
