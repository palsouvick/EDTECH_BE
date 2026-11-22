'use strict';

/**
 * GK mistakes that keep coming back (Byomkesh's creator, P vs K):
 *  1. wrong-option notes (`wn`) become traps: picking "Satyajit Ray" says who he really created;
 *  2. confusion drills mix questions from facts students mix up;
 *  3. a GK mistake also sends its fact back to GK revision, and the review asks the fact
 *     another way instead of repeating the question whose answer was just shown.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { GkFact, Question, ReviewItem, GkFactProgress, ExamCategory } = require('../src/models');
const { validateFact, validateLibrary } = require('../src/services/gkFacts.validate');
const { ensureGkLibrary, loadRecords } = require('../scripts/seedGkFacts');
const drills = require('../src/services/gkDrills.service');
const statsBuffer = require('../src/services/questionStats.buffer');
const { clearCatalogCache } = require('../src/services/catalog.service');
const catalog = require('../db/seed/catalog');

const DAY = 86_400_000;
const SRC = {
  title: 'Prasar Bharati: Byomkesh Bakshi Ep#13',
  url: 'https://prasarbharati.gov.in/example',
  publisher: 'Prasar Bharati',
  publisher_type: 'OFFICIAL',
  accessed_at: '2026-11-21',
  quote: 'Byomkesh Bakshi, the detective created by Sharadindu Bandyopadhyay.',
};

const base = (code, title, questions) => ({
  code,
  topic: 'west_bengal_gk',
  subtopic: 'literature_culture',
  tags: [],
  fact_kind: 'STATIC',
  title: { en: title, bn: 'বাংলা শিরোনাম' },
  statement: { en: `${title}.`, bn: 'বাংলা বিবৃতি।' },
  explanation: { en: 'Context.', bn: 'প্রসঙ্গ।' },
  milestones: [],
  dates: { event_date: null, valid_from: null, review_by: null },
  reference_year: null,
  difficulty: 2,
  exam_relevance: ['WBPSC_CLERKSHIP'],
  sources: [SRC],
  verification: { status: 'VERIFIED', method: 'SOURCE_QUOTE+INDEPENDENT_CHECK', verified_at: '2026-11-21', notes: '' },
  bengali_review: 'PENDING',
  linked_existing: [],
  questions,
});

const who = {
  format: 'DIRECT',
  d: 2,
  q: ['Byomkesh Bakshi was created by which writer?', 'ব্যোমকেশ বক্সী কোন লেখকের সৃষ্টি?'],
  a: ['Sharadindu Bandyopadhyay', 'শরদিন্দু বন্দ্যোপাধ্যায়'],
  w: [['Satyajit Ray', 'সত্যজিৎ রায়'], ['Premendra Mitra', 'প্রেমেন্দ্র মিত্র'], ['Narayan Gangopadhyay', 'নারায়ণ গঙ্গোপাধ্যায়']],
  wn: [
    ['Satyajit Ray created Feluda and Professor Shonku.', 'সত্যজিৎ রায় ফেলুদা ও প্রফেসর শঙ্কুর স্রষ্টা।'],
    ['Premendra Mitra created Ghanada.', 'প্রেমেন্দ্র মিত্র ঘনাদার স্রষ্টা।'],
    null,
  ],
  e: ['Sharadindu Bandyopadhyay created Byomkesh.', 'শরদিন্দু বন্দ্যোপাধ্যায় ব্যোমকেশের স্রষ্টা।'],
};
const reverse = {
  format: 'DIRECT',
  d: 2,
  q: ['Sharadindu Bandyopadhyay created which detective?', 'শরদিন্দু বন্দ্যোপাধ্যায় কোন গোয়েন্দার স্রষ্টা?'],
  a: ['Byomkesh Bakshi', 'ব্যোমকেশ বক্সী'],
  w: [['Feluda', 'ফেলুদা'], ['Ghanada', 'ঘনাদা'], ['Tenida', 'টেনিদা']],
  e: ['Byomkesh Bakshi.', 'ব্যোমকেশ বক্সী।'],
};
const feluda = {
  format: 'DIRECT',
  d: 2,
  q: ['Feluda was created by which writer?', 'ফেলুদা কোন লেখকের সৃষ্টি?'],
  a: ['Satyajit Ray', 'সত্যজিৎ রায়'],
  w: [['Premendra Mitra', 'প্রেমেন্দ্র মিত্র'], ['Sharadindu Bandyopadhyay', 'শরদিন্দু বন্দ্যোপাধ্যায়'], ['Sunil Gangopadhyay', 'সুনীল গঙ্গোপাধ্যায়']],
  e: ['Satyajit Ray created Feluda.', 'সত্যজিৎ রায় ফেলুদার স্রষ্টা।'],
};
const ghanada = { ...feluda, q: ['Ghanada was created by which writer?', 'ঘনাদা কোন লেখকের সৃষ্টি?'], a: ['Premendra Mitra', 'প্রেমেন্দ্র মিত্র'], w: [['Satyajit Ray', 'সত্যজিৎ রায়'], ['Sharadindu Bandyopadhyay', 'শরদিন্দু বন্দ্যোপাধ্যায়'], ['Sunil Gangopadhyay', 'সুনীল গঙ্গোপাধ্যায়']], e: ['Premendra Mitra created Ghanada.', 'প্রেমেন্দ্র মিত্র ঘনাদার স্রষ্টা।'] };

let mongod;
let server;
let root;
let dir;
const api = async (method, p, body, user = 'gk_student') => {
  const res = await fetch(root + p, { method, headers: { 'content-type': 'application/json', ...(user && { 'x-user-id': user }) }, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, body: await res.json() };
};
const withAnswer = (code) => Question.findOne({ code }).select('+correct_option_id +solution').lean();

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('gk_confusion_test'));
  await Promise.all([GkFact.init(), Question.init(), ReviewItem.init(), GkFactProgress.init(), ExamCategory.init()]);
  await ExamCategory.insertMany(catalog);
  clearCatalogCache();
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gkc-'));
  const facts = [base('GK-WBG-900', 'Byomkesh Bakshi: Sharadindu', [who, reverse]), base('GK-WBG-901', 'Feluda: Satyajit Ray', [feluda]), base('GK-WBG-902', 'Ghanada: Premendra Mitra', [ghanada])];
  fs.writeFileSync(path.join(dir, 'west_bengal_gk.jsonl'), facts.map((f) => JSON.stringify(f)).join('\n'));
  await ensureGkLibrary({ log: () => {}, dir });
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  drills.useDrills(null);
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

// ------------------------------------------------------------------ 1. wrong-option notes

test('validator: wn is optional, aligned with w, bilingual or null', () => {
  const ok = base('GK-WBG-900', 'Byomkesh', [who]);
  assert.deepEqual(validateFact(ok), []);
  const codes = (q) => validateFact(base('GK-WBG-900', 'Byomkesh', [q])).map((e) => e.code);
  assert.deepEqual(codes({ ...who, wn: [null, null] }), ['WRONG_NOTES'], 'must align with the 3 wrong options');
  assert.deepEqual(codes({ ...who, wn: [['only English'], null, null] }), ['WRONG_NOTES']);
  assert.deepEqual(codes({ ...who, wn: [['English', 'English again'], null, null] }), ['BENGALI_MISSING']);
});

test('seed: each note becomes a trap on its own wrong option; picking it shows the note', async () => {
  const q = await withAnswer('GKQ-WBG-900-1');
  assert.equal(q.solution.traps.length, 2, 'null notes add no trap');
  const ray = q.options.find((o) => o.text.en === 'Satyajit Ray');
  assert.equal(q.solution.traps.find((t) => t.option_id === ray.oid).note.en, 'Satyajit Ray created Feluda and Professor Shonku.');

  const r = (await api('POST', '/practice/verify-answer', { questionId: String(q._id), selectedOptionId: ray.oid }, 'note_reader')).body.data;
  assert.equal(r.isCorrect, false);
  assert.match(r.trapForSelected.en, /Feluda/);
  assert.match(r.trapForSelected.bn, /ফেলুদা/);
  const narayan = q.options.find((o) => o.text.en === 'Narayan Gangopadhyay');
  assert.equal((await api('POST', '/practice/verify-answer', { questionId: String(q._id), selectedOptionId: narayan.oid }, 'note_reader')).body.data.trapForSelected, null);
});

test('re-seed after only the notes change keeps option ids (revision items point at them)', async () => {
  const before = await withAnswer('GKQ-WBG-900-1');
  const changed = { ...who, wn: [who.wn[0], who.wn[1], ['Narayan Gangopadhyay created Tenida.', 'নারায়ণ গঙ্গোপাধ্যায় টেনিদার স্রষ্টা।']] };
  const facts = [base('GK-WBG-900', 'Byomkesh Bakshi: Sharadindu', [changed, reverse]), base('GK-WBG-901', 'Feluda: Satyajit Ray', [feluda]), base('GK-WBG-902', 'Ghanada: Premendra Mitra', [ghanada])];
  fs.writeFileSync(path.join(dir, 'west_bengal_gk.jsonl'), facts.map((f) => JSON.stringify(f)).join('\n'));
  await ensureGkLibrary({ log: () => {}, dir });
  const after = await withAnswer('GKQ-WBG-900-1');
  assert.deepEqual(after.options.map((o) => o.oid), before.options.map((o) => o.oid));
  assert.equal(after.correct_option_id, before.correct_option_id);
  assert.equal(after.solution.traps.length, 3, 'the new note is in');
});

// ------------------------------------------------------------------ 2. confusion drills

test('drills.json is valid and names only facts in the library or the batch-3/4 drafts', () => {
  const lib = loadRecords().records;
  const b3 = loadRecords(path.join(__dirname, '../db/gk/drafts/b3')).records;
  const b4 = loadRecords(path.join(__dirname, '../db/gk/drafts/b4')).records;
  const known = new Set([...lib, ...b3, ...b4].map((r) => r.code));
  assert.deepEqual(drills.validateDrills(drills.loadDrills(), known), []);
  assert.deepEqual(drills.validateDrills([{ id: 'Bad Id', order: 1, title: { en: 'x', bn: 'x' }, intro: { en: 'y', bn: 'য' }, facts: ['GK-WBG-900'] }]).map((e) => e.message), ['id must be a lowercase slug', 'title.bn has no Bengali text', 'a drill needs at least 2 facts']);
});

test('interleave: neighbouring questions come from different facts', () => {
  const out = drills.interleave([['a1', 'a2', 'a3'], ['b1', 'b2'], ['c1']], () => 0.5);
  assert.equal(out.length, 6);
  for (let i = 1; i < 3; i += 1) assert.notEqual(out[i][0], out[i - 1][0]);
});

test('API: drills list only those with enough published questions; questions carry no answers', async () => {
  drills.useDrills([
    { id: 'detectives', order: 1, title: { en: 'Detectives', bn: 'গোয়েন্দা' }, intro: { en: 'Mixed.', bn: 'মিশ্র।' }, facts: ['GK-WBG-900', 'GK-WBG-901', 'GK-WBG-902'] },
    { id: 'unseeded', order: 2, title: { en: 'Not yet', bn: 'এখনও নয়' }, intro: { en: 'None.', bn: 'নেই।' }, facts: ['GK-SCI-124', 'GK-SCI-125'] },
  ]);
  const list = (await api('GET', '/gk/drills', null, null)).body.data.drills;
  assert.deepEqual(list.map((d) => [d.id, d.questionCount]), [['detectives', 4]]);
  const run = (await api('GET', '/gk/drills/detectives/questions?language=en', null, null)).body.data;
  assert.equal(run.questions.length, 4);
  assert.ok(run.questions.every((q) => !('correctOptionId' in q) && !('correct_option_id' in q)));
  assert.equal((await api('GET', '/gk/drills/nope/questions', null, null)).status, 404);
});

// ------------------------------------------------------------------ 3. revision asks the fact another way

test('a GK mistake re-queues the question and sends its fact back to GK revision', async () => {
  const q = await withAnswer('GKQ-WBG-900-1');
  const wrong = q.options.find((o) => o.oid !== q.correct_option_id).oid;
  await api('POST', '/practice/verify-answer', { questionId: String(q._id), selectedOptionId: wrong }, 'reviser');
  await new Promise((r) => setTimeout(r, 300)); // recorded in the background
  assert.equal(await ReviewItem.countDocuments({ user_id: 'reviser', question_id: q._id }), 1);
  const fact = await GkFact.findOne({ code: 'GK-WBG-900' }).lean();
  const p = await GkFactProgress.findOne({ user_id: 'reviser', fact_id: fact._id }).lean();
  assert.equal(p.status, 'learning');
  assert.ok(p.due_at - Date.now() > 0.9 * DAY && p.due_at - Date.now() < 1.1 * DAY, 'due tomorrow');
});

test('review: asks the reverse question, grades it, moves the queued item; an unrelated question is refused', async () => {
  const queued = await withAnswer('GKQ-WBG-900-1');
  const rev = await withAnswer('GKQ-WBG-900-2');
  await ReviewItem.updateOne({ user_id: 'reviser', question_id: queued._id }, { $set: { due_at: new Date(Date.now() - DAY) } });

  const item = (await api('GET', '/review/due?tz=330', null, 'reviser')).body.data.items[0];
  assert.equal(item.itemQuestionId, String(queued._id));
  assert.equal(item.question.questionId, String(rev._id), 'asked the other way');
  assert.equal(item.askedAnotherWay, true);

  const feluQ = await withAnswer('GKQ-WBG-901-1');
  const refused = await api('POST', '/review/answer', { questionId: String(queued._id), askedQuestionId: String(feluQ._id), selectedOptionId: feluQ.correct_option_id }, 'reviser');
  assert.equal(refused.status, 422);

  const r = (await api('POST', '/review/answer', { questionId: String(queued._id), askedQuestionId: String(rev._id), selectedOptionId: rev.correct_option_id }, 'reviser')).body.data;
  assert.equal(r.isCorrect, true);
  assert.equal(r.correctOptionId, rev.correct_option_id);
  const row = await ReviewItem.findOne({ user_id: 'reviser', question_id: queued._id }).lean();
  assert.deepEqual([row.streak, row.reviews], [1, 1]);

  // Next review comes round to the original question again.
  await ReviewItem.updateOne({ _id: row._id }, { $set: { due_at: new Date(Date.now() - DAY) } });
  const next = (await api('GET', '/review/due?tz=330', null, 'reviser')).body.data.items[0];
  assert.equal(next.question.questionId, String(queued._id));
  assert.equal(next.askedAnotherWay, false);
});

test('the committed library still validates with wn notes present', () => {
  const { records } = loadRecords();
  assert.deepEqual(validateLibrary(records).errors, []);
});
