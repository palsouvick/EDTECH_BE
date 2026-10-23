'use strict';

/**
 * Startup bootstrap (src/db/bootstrap.js): a fresh database is filled without
 * manual seed commands, and re-running on every start changes nothing.
 */

process.env.SEED_QUESTIONS_PER_TOPIC = '2';

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { ExamCategory, Question, TopicSummary } = require('../src/models');
const { bootstrapData, seedQuestionBank } = require('../src/db/bootstrap');
const { ensureIndexes } = require('../src/db/ensureIndexes');
const catalog = require('../db/seed/catalog');

let mongod;
const quiet = { log: () => {}, warn: () => {} };

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('bootstrap_test'));
  await Promise.all([ExamCategory.init(), Question.init(), TopicSummary.init()]);
});

test.after(async () => {
  await mongoose.disconnect();
  await mongod?.stop();
});

test('fills an empty database and keeps admin edits on re-run', async () => {
  await bootstrapData();
  assert.equal(await ExamCategory.countDocuments(), catalog.length);
  assert.ok((await TopicSummary.countDocuments()) > 0);
  assert.equal(await Question.countDocuments(), 25);

  const q = await Question.findOne().select('code');
  await Question.updateOne({ _id: q._id }, { $set: { status: 'REJECTED' } });
  await TopicSummary.updateOne({}, { $set: { 'title.en': 'Edited' } });

  await bootstrapData();
  assert.equal(await Question.countDocuments(), 25);
  assert.equal((await Question.findById(q._id).lean()).status, 'REJECTED');
  assert.equal(await TopicSummary.countDocuments({ 'title.en': 'Edited' }), 1);
});

test('generates the question bank only while none exists', async () => {
  await seedQuestionBank();
  const generated = await Question.countDocuments({ authored_by: 'seed_generator' });
  assert.ok(generated > 0);
  assert.equal(await mongoose.connection.db.collection('seed_locks').countDocuments(), 0);

  await seedQuestionBank();
  assert.equal(await Question.countDocuments({ authored_by: 'seed_generator' }), generated);
});

test('builds db/indexes.mongo.js without mongosh', async () => {
  const conn = await mongoose.createConnection(mongod.getUri('bootstrap_indexes'), { autoIndex: false }).asPromise();
  try {
    await ensureIndexes(conn, quiet);
    const names = (await conn.db.collection('questions').indexes()).map((i) => i.name);
    assert.ok(names.includes('uniq_code'));
    await ensureIndexes(conn, quiet); // idempotent
  } finally {
    await conn.close();
  }
});
