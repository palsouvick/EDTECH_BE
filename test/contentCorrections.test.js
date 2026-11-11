'use strict';

/** Content-quality log (db/corrections): in-place correction of existing questions, and log integrity. */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { Question } = require('../src/models');
const { newOptionId } = require('../src/models/Question');
const { applyCorrections, loadLog } = require('../scripts/applyContentCorrections');

const P = (en, bn) => ({ en, bn });
let mongod;
let dir;

test.before(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri('corrections_test'));
  await Question.init();
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'corr-'));
});

test.after(async () => {
  await mongoose.disconnect();
  await mongod?.stop();
  fs.rmSync(dir, { recursive: true, force: true });
});

async function generatedQuestion() {
  const options = ['1025 CE', '1001 CE', '1018 CE', '1030 CE'].map((t) => ({ oid: newOptionId(), text: P(t, t.replace('CE', 'খ্রিস্টাব্দ')) }));
  return Question.create({
    code: 'QA-GS-999001',
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'gs',
    topic: 'indian_history',
    subtopic: 'sultanate',
    difficulty: 3,
    stem: P('Mahmud of Ghazni plundered the Somnath temple in which year?', 'গজনির সুলতান মাহমুদ কোন বছর সোমনাথ মন্দির লুট করেন?'),
    options: [options[1], options[0], options[3], options[2]],
    correct_option_id: options[0].oid,
    solution: { steps: [P('Old explanation 1025', 'পুরোনো ব্যাখ্যা')], traps: [] },
    status: 'PUBLISHED',
    authored_by: 'seed_generator',
  });
}

test('a logged factbank fix updates the existing question in place and is idempotent; admin edits are left alone', async () => {
  const q = await generatedQuestion();
  const entry = {
    id: 'T-1',
    target: { kind: 'factbank', file: 'indian_history_2.js', index: 67, stem_en: 'Mahmud of Ghazni plundered the Somnath temple in which year?' },
    old_item: { answer: '1025 CE', wrong: ['1001 CE', '1018 CE', '1030 CE'] },
    fix: { answer: P('1026 CE', '1026 খ্রিস্টাব্দ'), explanation: P('NCERT: 1026.', 'এনসিইআরটি: 1026।') },
    source: { url: 'https://ncert.nic.in/textbook/pdf/gees204.pdf' },
    date: '2026-11-11',
  };
  fs.writeFileSync(path.join(dir, 'log.json'), JSON.stringify([entry]));
  const r = await applyCorrections({ dir, log: () => {} });
  assert.equal(r.applied, 1);
  const after = await Question.findById(q._id).select('+correct_option_id +solution').lean();
  assert.equal(String(after._id), String(q._id), 'same id');
  assert.equal(after.correct_option_id, q.correct_option_id, 'same answer option id');
  assert.equal(after.options.find((o) => o.oid === after.correct_option_id).text.en, '1026 CE');
  assert.deepEqual(after.options.filter((o) => o.oid !== after.correct_option_id).map((o) => o.text.en).sort(), ['1001 CE', '1018 CE', '1030 CE']);
  assert.equal(after.solution.steps[0].en, 'NCERT: 1026.');
  assert.match(after.solution.steps[1].en, /ncert\.nic\.in/);
  const again = await applyCorrections({ dir, log: () => {} });
  assert.deepEqual([again.applied, again.unchanged], [0, 1]);

  await Question.updateOne({ _id: q._id }, { $set: { version: 2, 'solution.steps': [P('admin text', 'অ্যাডমিন')] } });
  const third = await applyCorrections({ dir, log: () => {} });
  assert.deepEqual(third.protected, ['T-1']);
  assert.equal((await Question.findById(q._id).select('+solution').lean()).solution.steps[0].en, 'admin text');
});

test('a stem fix is found by the old stem and re-keyed to the new one', async () => {
  const options = ['Pandyas', 'Cholas', 'Cheras', 'Pallavas'].map((t) => ({ oid: newOptionId(), text: P(t, t) }));
  const q = await Question.create({
    code: 'QA-GS-999002', exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }], subject: 'gs', topic: 'indian_history', difficulty: 4,
    stem: P('The Sangam assemblies of Tamil poets were held under the patronage of which dynasty?', 'প্রশ্ন'), options, correct_option_id: options[0].oid,
    solution: { steps: [P('old', 'পুরোনো')] }, status: 'PUBLISHED', authored_by: 'seed_generator',
  });
  const [real] = loadLog().filter((e) => e.id === 'HIS-FB-B-060');
  assert.ok(real, 'the real log has the Sangam fix');
  fs.writeFileSync(path.join(dir, 'log.json'), JSON.stringify([real]));
  assert.equal((await applyCorrections({ dir, log: () => {} })).applied, 1);
  const after = await Question.findById(q._id).select('+correct_option_id +duplicate_keys').lean();
  assert.equal(after.stem.en, real.fix.stem.en);
  assert.equal(after.options.find((o) => o.oid === after.correct_option_id).text.en, 'Pallavas');
  assert.deepEqual(after.options.map((o) => o.text.en).sort(), ['Cheras', 'Cholas', 'Pallavas', 'Pandyas']);
  assert.equal((await applyCorrections({ dir, log: () => {} })).unchanged, 1, 'found again by the new stem');
});

test('the History log: ids unique, every entry has old, new, source and status; factbank fixes are already in the bank files', () => {
  const log = loadLog();
  assert.ok(log.length >= 70);
  assert.equal(new Set(log.map((e) => e.id)).size, log.length);
  for (const e of log) {
    assert.ok(e.target?.kind && e.old && e.new && e.status, e.id);
    assert.match(e.source?.url || '', /^https:\/\/ncert\.nic\.in\/textbook\/pdf\//, `${e.id} cites an NCERT page`);
  }
  for (const e of log.filter((x) => x.target.kind === 'factbank' && x.fix)) {
    const item = require(`../scripts/generators/factbank/${e.target.file}`).items[e.target.index];
    if (e.fix.stem) assert.equal(item.q[0], e.fix.stem.en, e.id);
    if (e.fix.answer) assert.equal(item.a[0], e.fix.answer.en, e.id);
    if (e.fix.explanation) assert.equal(item.e[0], e.fix.explanation.en, e.id);
  }
  const gk = fs.readFileSync(path.join(__dirname, '../db/gk/indian_history.jsonl'), 'utf8');
  assert.equal(gk.includes('Report of Alexander Cunningham on Harappan seal 1875') && /GK-HIS-0(19|2[0-6])[^\n]*Report of Alexander Cunningham on Harappan seal/.test(gk), false, 'no fact 019-026 cites the unrelated Harappan quote');
  assert.equal(/broke Maratha power for a generation/.test(gk), false);
});
