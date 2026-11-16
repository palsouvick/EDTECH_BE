'use strict';

/**
 * Verifies the real PYQ count in the database against the 2,792 file rows:
 * the importer keys a question by its English stem (IMP-<sha1>), so a stem printed
 * in two papers is ONE document, and a later file overwrites the earlier file's
 * pyq ref on the same document. This test imports every db/pyq file and counts
 * distinct documents and distinct question codes, so the collision impact is a
 * measured number, not an estimate.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { Question } = require('../src/models');
const { importQuestionFile, PYQ_DIR } = require('../src/db/seedData');

const quiet = { log: () => {}, warn: () => {} };
let mongod;

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 120_000 } });
  await mongoose.connect(mongod.getUri('pyq_db_counts_test'));
  await Question.init();
  const files = fs.readdirSync(PYQ_DIR).filter((f) => f.endsWith('.json')).sort();
  assert.equal(files.length, 23, 'all paper files present (plus README.md and SOURCES.md)');
  for (const f of files) {
    const r = await importQuestionFile(path.join(PYQ_DIR, f), quiet);
    assert.deepEqual(r.errors, [], f);
  }
});

test.after(async () => {
  await mongoose.disconnect();
  await mongod?.stop();
});

test('distinct PYQ documents and question codes, against the 2,695 file rows', async () => {
  const docs = await Question.countDocuments({ status: 'PUBLISHED', 'pyq.is_pyq': true });
  const codes = await Question.distinct('pyq.refs.question_code', { status: 'PUBLISHED', 'pyq.is_pyq': true });
  const bySubject = await Question.aggregate([
    { $match: { status: 'PUBLISHED', 'pyq.is_pyq': true } },
    { $group: { _id: '$subject', n: { $sum: 1 } } },
  ]);
  const byProvenance = await Question.aggregate([
    { $match: { status: 'PUBLISHED', 'pyq.is_pyq': true } },
    { $group: { _id: '$provenance', n: { $sum: 1 } } },
  ]);
  const byExam = await Question.aggregate([
    { $match: { status: 'PUBLISHED', 'pyq.is_pyq': true } },
    { $unwind: '$pyq.refs' },
    { $group: { _id: '$pyq.refs.exam_name', n: { $sum: 1 } } },
  ]);
  // Every document carries exactly one ref after import (a later file overwrites the
  // earlier ref on a colliding stem), so documents, codes and ref rows agree.
  const refRows = await Question.aggregate([
    { $match: { status: 'PUBLISHED', 'pyq.is_pyq': true } },
    { $project: { n: { $size: '$pyq.refs' } } },
    { $group: { _id: null, total: { $sum: '$n' } } },
  ]);
  // eslint-disable-next-line no-console
  console.log('[pyq-db-counts]', JSON.stringify({
    fileRows: 2792, documents: docs, distinctCodes: codes.length, refRows: refRows[0]?.total ?? 0,
    bySubject: Object.fromEntries(bySubject.map((r) => [r._id, r.n])),
    byProvenance: Object.fromEntries(byProvenance.map((r) => [r._id, r.n])),
    byExam: Object.fromEntries(byExam.map((r) => [r._id, r.n])),
  }));
  assert.equal(docs, 2775, '2,792 file rows collapse to 2,775 documents (17 colliding stems)');
  assert.equal(codes.length, 2775, 'one distinct question code per document');
  assert.equal(refRows[0]?.total, 2775, 'one ref per document after overwrite');
  assert.equal(bySubject.reduce((a, r) => a + r.n, 0), 2775);
  assert.equal(byProvenance.reduce((a, r) => a + r.n, 0), 2775);
});

test('every PYQ has a stored explanation in English and Bengali', async () => {
  const rows = await Question.find({ status: 'PUBLISHED', 'pyq.is_pyq': true }).select('+solution').lean();
  assert.equal(rows.length, 2775);
  const missing = rows.filter((q) => !(q.solution?.steps || []).some((s) => s.en && s.bn));
  assert.equal(missing.length, 0, `PYQs without an en+bn explanation: ${missing.map((q) => q.code).slice(0, 5).join(', ')}`);
});
