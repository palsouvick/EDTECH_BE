'use strict';

/**
 * Adds an exam category to the exam_targets of existing questions whose chapter
 * is in that category's syllabus (db/seed/catalog.js). Used when a new category
 * is added (WB_POLICE, 10 Nov 2026): generation only tops chapters up and never
 * re-tags questions that already exist, so without this the new category starts
 * with no questions.
 *
 * - Previous-year questions (pyq.is_pyq) are left alone: they belong to the paper
 *   they came from, and the PYQ file sync owns their exam_targets.
 * - Idempotent: a question that already lists the category is not touched.
 * - Touches only exam_targets: not version, status, stats or content.
 * - Runs by itself on server start (src/db/bootstrap.js, tagCategoryTargets) for the
 *   categories in AUTO_TAG_CATEGORIES there, so nobody has to run it on the server.
 *
 *   node --env-file-if-exists=.env scripts/addCategoryTargets.js --category WB_POLICE           # dry run
 *   node --env-file-if-exists=.env scripts/addCategoryTargets.js --category WB_POLICE --apply
 */

const mongoose = require('mongoose');
const catalog = require('../db/seed/catalog');

const MAIN_TIER = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE', WB_POLICE: 'SINGLE' };

/** [{ subject, topic }] for every chapter the category's syllabus lists. */
function syllabusChapters(categoryCode) {
  const cat = catalog.find((c) => c.code === categoryCode);
  if (!cat) throw new Error(`unknown category ${categoryCode}`);
  return cat.subjects.flatMap((s) => s.topics.map((t) => ({ subject: s.code, topic: t.code })));
}

function filterFor(categoryCode) {
  return {
    $or: syllabusChapters(categoryCode),
    'pyq.is_pyq': { $ne: true },
    'exam_targets.category': { $ne: categoryCode },
  };
}

async function addCategoryTargets({ category, apply = false, db = mongoose.connection.db, log = console.log }) {
  const tier = MAIN_TIER[category];
  if (!tier) throw new Error(`no main tier for ${category}`);
  const col = db.collection('questions');
  const filter = filterFor(category);
  const bySubject = await col.aggregate([{ $match: filter }, { $group: { _id: '$subject', n: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray();
  const total = bySubject.reduce((a, r) => a + r.n, 0);
  log(`${category}: ${total} questions to tag (${bySubject.map((r) => `${r._id} ${r.n}`).join(', ') || 'none'})`);
  if (!apply) {
    log('dry run: nothing written (add --apply to write)');
    return { matched: total, modified: 0 };
  }
  // $addToSet, not $push: two instances starting together cannot add the target twice.
  const r = await col.updateMany(filter, { $addToSet: { exam_targets: { category, tier } } });
  log(`${category}: tagged ${r.modifiedCount} questions`);
  return { matched: total, modified: r.modifiedCount };
}

/** Changes when the category's syllabus chapters change, so the startup step re-runs only then. */
const syllabusFingerprint = (categoryCode) =>
  require('node:crypto').createHash('sha1').update(JSON.stringify(syllabusChapters(categoryCode))).digest('hex');

module.exports = { addCategoryTargets, syllabusChapters, filterFor, syllabusFingerprint };

if (require.main === module) {
  const arg = (name) => {
    const i = process.argv.indexOf(name);
    return i === -1 ? undefined : process.argv[i + 1];
  };
  const category = arg('--category');
  const apply = process.argv.includes('--apply');
  (async () => {
    if (!category) throw new Error('--category is required');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edtech');
    await addCategoryTargets({ category, apply });
    await mongoose.disconnect();
  })().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
