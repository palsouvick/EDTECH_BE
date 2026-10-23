'use strict';

/**
 * Copilot's question generators (scripts/generators/*) + runner (scripts/generateAndSeed.js),
 * checked as they are connected to the app:
 *  - every generated topic lands on a catalogue topic (reachable from the funnel);
 *  - the real runner inserts valid, untagged questions that the catalogue API counts;
 *  - re-running migrates legacy topic codes and can untag synthetic PYQs WITHOUT
 *    deleting a single question.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { spawn } = require('node:child_process');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { Question, ExamCategory } = require('../src/models');
const common = require('../scripts/generators/common');
const { inCatalog, normalizeTopic } = require('../src/services/taxonomy');
const catalogService = require('../src/services/catalog.service');
const catalog = require('../db/seed/catalog');

const SUBJECTS = ['quant', 'english', 'reasoning'];
let mongod;
let uri;

function runGenerator(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, '../scripts/generateAndSeed.js'), ...args], {
      env: { ...process.env, MONGODB_URI: uri },
    });
    let out = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('exit', (code) => (code === 0 ? resolve(out) : reject(new Error(`exit ${code}\n${out}`))));
  });
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  uri = mongod.getUri('generators_test');
  await mongoose.connect(uri);
  await Question.init();
  await ExamCategory.insertMany(catalog);
});

test.after(async () => {
  await mongoose.disconnect();
  await mongod?.stop();
});

test('every generator topic maps onto a catalogue topic', () => {
  for (const subject of SUBJECTS) {
    common.seed(1);
    const spec = require(`../scripts/generators/${subject}`);
    for (const t of spec.topics) {
      const mapped = normalizeTopic(subject, t.topic).topic;
      assert.ok(
        inCatalog(subject, mapped),
        `${subject}.${t.topic} (-> ${mapped}) is not in db/seed/catalog.js: add it there or alias it in src/services/taxonomy.js`,
      );
    }
  }
});

test('Bengali names match their English names', () => {
  // Regression: "Tapan" was paired with "তাপস" (Tapas).
  const tapan = common.NAMES_M.find((n) => n.en === 'Tapan');
  assert.equal(tapan.bn, 'তপন');
});

test('runner inserts catalogue-coded, untagged questions that the funnel counts', async () => {
  const out = await runGenerator(['--count', '40', '--seed', '7', '--subjects', 'quant,english,reasoning']);
  assert.match(out, /Inserted=120/);
  assert.doesNotMatch(out, /not in db\/seed\/catalog\.js/);

  const docs = await Question.find({ authored_by: 'seed_generator' }).lean();
  assert.equal(docs.length, 120);
  for (const d of docs) {
    assert.ok(inCatalog(d.subject, d.topic), `${d.code}: ${d.subject}.${d.topic} not in catalogue`);
    assert.equal(d.pyq.is_pyq, false, 'no fabricated PYQ refs by default');
    assert.equal(d.lang_set, 'bn_en');
  }

  catalogService.clearCatalogCache();
  const ssc = await catalogService.getCategory('SSC', 'bn');
  const counted = ssc.subjects.reduce((n, s) => n + s.questionCount, 0);
  const sscDocs = docs.filter((d) => d.exam_targets.some((t) => t.category === 'SSC')).length;
  assert.equal(counted, sscDocs, 'every SSC-targeted generated question is visible in the funnel');
});

test('re-run migrates legacy topic codes and untags synthetic PYQs, deleting nothing', async () => {
  const base = await Question.findOne({ subject: 'quant' }).select('+correct_option_id +solution').lean();
  const { _id, ...seedDoc } = base;
  // Questions as an earlier generator run stored them: old topic codes, synthetic PYQ tag.
  await Question.create({ ...seedDoc, code: 'QA-LEGACY-1', topic: 'speed_distance', stem: { en: 'Legacy 1', bn: 'পুরনো ১' } });
  await Question.create({
    ...seedDoc,
    code: 'QA-LEGACY-2',
    subject: 'english',
    topic: 'prepositions',
    subtopic: 'fixed_prepositions',
    stem: { en: 'Legacy 2', bn: 'পুরনো ২' },
    pyq: { refs: [{ exam_name: 'SSC CGL', tier: 'TIER_1', year: 2019, question_code: 'SSC_CGL-2019-SYN-QA-LEGACY-2' }] },
  });
  const before = await Question.countDocuments();

  const out = await runGenerator(['--count', '40', '--seed', '7', '--subjects', 'quant,english,reasoning', '--untag-synthetic-pyq']);
  assert.match(out, /moved 2 existing questions/);
  assert.match(out, /removed pattern-based PYQ tags from 1 questions/);

  assert.equal(await Question.countDocuments(), before, 'no question was removed');
  const l1 = await Question.findOne({ code: 'QA-LEGACY-1' }).lean();
  assert.equal(l1.topic, 'time_speed_distance');
  const l2 = await Question.findOne({ code: 'QA-LEGACY-2' }).lean();
  assert.deepEqual([l2.topic, l2.subtopic], ['grammar', 'prepositions']);
  assert.ok(l2.concept_tags.includes('fixed_prepositions'), 'the finer subtopic is kept as a tag');
  assert.deepEqual([l2.pyq.is_pyq, l2.pyq.refs.length, l2.latest_pyq_year], [false, 0, null]);
});
