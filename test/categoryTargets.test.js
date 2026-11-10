'use strict';

/** scripts/addCategoryTargets.js: tags existing questions for a newly added category. */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { addCategoryTargets, syllabusChapters } = require('../scripts/addCategoryTargets');

let mongod;
let col;
const quiet = () => {};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('category_targets_test'));
  col = mongoose.connection.db.collection('questions');
  const wbpsc = { category: 'WBPSC', tier: 'PRELIMS' };
  await col.insertMany([
    { code: 'Q-PCT', subject: 'quant', topic: 'percentage', exam_targets: [wbpsc], version: 1 },
    { code: 'Q-WBG', subject: 'gs', topic: 'west_bengal_gk', exam_targets: [wbpsc], version: 3 },
    { code: 'Q-PYQ', subject: 'gs', topic: 'polity', exam_targets: [wbpsc], pyq: { is_pyq: true } },
    { code: 'Q-BANK', subject: 'gs', topic: 'banking_awareness', exam_targets: [{ category: 'BANK', tier: 'PRELIMS' }] },
    { code: 'Q-DONE', subject: 'reasoning', topic: 'series', exam_targets: [{ category: 'WB_POLICE', tier: 'SINGLE' }] },
  ]);
});

test.after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

const targets = async (code) => (await col.findOne({ code })).exam_targets.map((t) => t.category);

test('WB_POLICE syllabus covers the four notice sections and West Bengal GK, not banking awareness', () => {
  const chapters = syllabusChapters('WB_POLICE');
  assert.deepEqual([...new Set(chapters.map((c) => c.subject))].sort(), ['english', 'gs', 'quant', 'reasoning']);
  assert.ok(chapters.some((c) => c.topic === 'west_bengal_gk'));
  assert.ok(!chapters.some((c) => c.topic === 'banking_awareness'));
  assert.throws(() => syllabusChapters('UPSC'), /unknown category/);
});

test('dry run reports and writes nothing', async () => {
  const r = await addCategoryTargets({ category: 'WB_POLICE', log: quiet });
  assert.deepEqual(r, { matched: 2, modified: 0 });
  assert.deepEqual(await targets('Q-PCT'), ['WBPSC']);
});

test('apply tags syllabus chapters only, skips PYQs, keeps version, and is idempotent', async () => {
  const r = await addCategoryTargets({ category: 'WB_POLICE', apply: true, log: quiet });
  assert.deepEqual(r, { matched: 2, modified: 2 });
  assert.deepEqual(await targets('Q-PCT'), ['WBPSC', 'WB_POLICE']);
  assert.deepEqual(await targets('Q-WBG'), ['WBPSC', 'WB_POLICE']);
  assert.deepEqual(await targets('Q-PYQ'), ['WBPSC'], 'PYQs stay with their own paper');
  assert.deepEqual(await targets('Q-BANK'), ['BANK']);
  assert.deepEqual(await targets('Q-DONE'), ['WB_POLICE']);
  assert.equal((await col.findOne({ code: 'Q-WBG' })).version, 3, 'admin-edit marker untouched');
  const tier = (await col.findOne({ code: 'Q-PCT' })).exam_targets.find((t) => t.category === 'WB_POLICE').tier;
  assert.equal(tier, 'SINGLE');

  const again = await addCategoryTargets({ category: 'WB_POLICE', apply: true, log: quiet });
  assert.deepEqual(again, { matched: 0, modified: 0 });
});

test('server start tags WB_POLICE once by itself, then skips until the syllabus changes', async () => {
  const { tagCategoryTargets } = require('../src/db/bootstrap');
  const state = mongoose.connection.db.collection('seed_state');
  await col.insertOne({ code: 'Q-NEW', subject: 'english', topic: 'articles', exam_targets: [{ category: 'SSC', tier: 'TIER_1' }] });

  await tagCategoryTargets();
  assert.deepEqual(await targets('Q-NEW'), ['SSC', 'WB_POLICE']);
  const stamp = await state.findOne({ _id: 'category_targets:WB_POLICE' });
  assert.ok(stamp.fingerprint && stamp.tagged === 1);

  // Same syllabus: a later start does not scan or write again.
  await col.insertOne({ code: 'Q-LATER', subject: 'english', topic: 'articles', exam_targets: [{ category: 'SSC', tier: 'TIER_1' }] });
  await tagCategoryTargets();
  assert.deepEqual(await targets('Q-LATER'), ['SSC']);

  // Syllabus changed (stamp no longer matches): it runs again and stays duplicate-free.
  await state.updateOne({ _id: 'category_targets:WB_POLICE' }, { $set: { fingerprint: 'old' } });
  await tagCategoryTargets();
  assert.deepEqual(await targets('Q-LATER'), ['SSC', 'WB_POLICE']);
  assert.deepEqual(await targets('Q-NEW'), ['SSC', 'WB_POLICE']);
});
