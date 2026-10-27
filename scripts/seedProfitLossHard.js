'use strict';

const Question = require('../src/models/Question');
const catalog = require('../db/seed/catalog');
const { registry } = require('../db/patterns/quant/profit_loss');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');
const { generateQuestions } = require('./generators/profit_loss_hard');

const AUTHOR = 'profit_loss_hard_generator';
const TARGET_COUNT = 100;
const SOURCE_REFERENCE = 'Original practice informed by the WBPSC Clerkship arithmetic syllabus: https://psc.wb.gov.in/Download?param1=Clerkship2024-SchemeSyllabus.pdf&param2=advertisement';
const TIER_BY_CATEGORY = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE' };

function examTargets() {
  return catalog
    .filter((category) => category.subjects.some((subject) => subject.code === 'quant' && subject.topics.some((topic) => topic.code === 'profit_loss')))
    .map((category) => ({ category: category.code, tier: TIER_BY_CATEGORY[category.code] }));
}

async function ensureHardProfitLossQuestions(targetCount = TARGET_COUNT) {
  if (!Number.isInteger(targetCount) || targetCount < TARGET_COUNT) {
    throw new TypeError(`Hard Profit & Loss bank target must be an integer of at least ${TARGET_COUNT}`);
  }
  const query = {
    authored_by: AUTHOR,
    status: 'PUBLISHED',
    subject: 'quant',
    topic: 'profit_loss',
    difficulty: { $in: [3, 4, 5] },
    pattern: { $in: registry.map((pattern) => pattern.id) },
  };
  const existing = await Question.find(query).select('stem.en +duplicate_keys').lean();
  if (existing.length >= targetCount) return { inserted: 0, total: existing.length };

  const knownFingerprints = new Set(
    existing.flatMap((question) => question.duplicate_keys?.length
      ? question.duplicate_keys.slice(0, 1)
      : questionDuplicateKeys(question.stem)),
  );
  const generated = generateQuestions(targetCount - existing.length, {
    seed: 20261027 + existing.length,
    knownFingerprints: [...knownFingerprints],
  });
  const targets = examTargets();
  if (!targets.length) throw new Error('Profit & Loss is not assigned to an exam category');

  const documents = generated.map(({ fingerprint, _audit, ...question }) => ({
    code: `QA-PLH-${fingerprint.slice(0, 20)}`,
    exam_targets: targets,
    subject: 'quant',
    ...question,
    source_reference: SOURCE_REFERENCE,
    provenance: 'ORIGINAL_PRACTICE',
    status: 'PUBLISHED',
    version: 1,
    authored_by: AUTHOR,
  }));
  for (const document of documents) await new Question(document).validate();
  const inserted = await Question.insertMany(documents, { ordered: true });
  return { inserted: inserted.length, total: existing.length + inserted.length };
}

module.exports = { AUTHOR, TARGET_COUNT, ensureHardProfitLossQuestions };
