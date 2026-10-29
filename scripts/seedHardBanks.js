'use strict';

/**
 * Tops up the Hard banks for Percentage, Ratio & Proportion, Average, Interest and
 * Time & Work (generators: scripts/generators/hard/). Profit & Loss keeps its own
 * seeder (scripts/seedProfitLossHard.js). Idempotent: existing questions are kept and
 * only the gap to TARGET_PER_CHAPTER is generated, with fingerprints that do not
 * repeat any stem already in the bank.
 *
 *   node --env-file-if-exists=.env scripts/seedHardBanks.js           # top up
 *   node --env-file-if-exists=.env scripts/seedHardBanks.js --dry-run # generate + validate only
 */

const mongoose = require('mongoose');
const Question = require('../src/models/Question');
const catalog = require('../db/seed/catalog');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');
const { generateBank } = require('./generators/hard/framework');
const { HARD_BANKS } = require('../src/services/hardBanks');

const AUTHOR = 'hard_bank_generator';
const TARGET_PER_CHAPTER = 200;
const TOPICS = Object.values(HARD_BANKS).filter((b) => b.author === AUTHOR).map((b) => b.topic);
const TIER_BY_CATEGORY = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE' };
const CLERKSHIP_SYLLABUS = 'https://psc.wb.gov.in/Download?param1=Clerkship2024-SchemeSyllabus.pdf&param2=advertisement';

function examTargets(topic) {
  return catalog
    .filter((c) => c.subjects.some((s) => s.code === 'quant' && s.topics.some((t) => t.code === topic)))
    .map((c) => ({ category: c.code, tier: TIER_BY_CATEGORY[c.code] }));
}

/** Provenance note shown to editors; never a claim that the item appeared in an exam. */
function sourceReference(topic, pattern) {
  const base = `Original practice question from the ${topic} Hard pattern matrix (db/patterns/quant/hard/${topic}.js); answer checked by an independent solver.`;
  return pattern.clerkship
    ? `${base} Pattern within the WBPSC Clerkship Part-I Arithmetic syllabus: ${CLERKSHIP_SYLLABUS}`
    : `${base} Pattern outside the WBPSC Clerkship Part-I syllabus (SSC / Banking / WB Post practice).`;
}

function toDocuments(topic, generated) {
  const bank = HARD_BANKS[topic];
  const targets = examTargets(topic);
  if (!targets.length) throw new Error(`${topic} is not assigned to an exam category`);
  return generated.map(({ fingerprint, _audit, ...question }) => ({
    code: `QA-HB-${fingerprint.slice(0, 24)}`,
    exam_targets: targets,
    subject: 'quant',
    ...question,
    source_reference: sourceReference(topic, bank.byId.get(question.pattern)),
    provenance: 'ORIGINAL_PRACTICE',
    status: 'PUBLISHED',
    version: 1,
    authored_by: AUTHOR,
  }));
}

async function ensureHardBank(topic, target = TARGET_PER_CHAPTER, { dryRun = false } = {}) {
  const { registry, generators } = require(`./generators/hard/${topic}`);
  const existing = dryRun ? [] : await Question.find({ authored_by: AUTHOR, subject: 'quant', topic }).select('stem.en +duplicate_keys').lean();
  if (existing.length >= target) return { topic, inserted: 0, total: existing.length };
  const known = existing.flatMap((q) => (q.duplicate_keys?.length ? q.duplicate_keys.slice(0, 1) : questionDuplicateKeys(q.stem)));
  const generated = generateBank(topic, registry, generators, target - existing.length, {
    seed: 20261029 + existing.length,
    knownFingerprints: known,
  });
  const documents = toDocuments(topic, generated);
  for (const document of documents) await new Question(document).validate();
  if (dryRun) return { topic, inserted: 0, total: documents.length, dryRun: true };
  const inserted = await Question.insertMany(documents, { ordered: true });
  return { topic, inserted: inserted.length, total: existing.length + inserted.length };
}

async function ensureHardBanks(options) {
  const results = [];
  for (const topic of TOPICS) results.push(await ensureHardBank(topic, TARGET_PER_CHAPTER, options));
  return results;
}

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  (async () => {
    if (!dryRun) await mongoose.connect(require('../src/config').mongoUri);
    try {
      for (const r of await ensureHardBanks({ dryRun })) console.log(`${r.topic}: ${r.dryRun ? `${r.total} generated and validated (dry run)` : `${r.inserted} new, ${r.total} in bank`}`);
    } finally {
      if (!dryRun) await mongoose.disconnect();
    }
  })().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { AUTHOR, TARGET_PER_CHAPTER, TOPICS, ensureHardBank, ensureHardBanks, toDocuments };
