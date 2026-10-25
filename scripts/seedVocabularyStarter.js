'use strict';

const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
mongoose.set('autoIndex', false);
const config = require('../src/config');
const { VocabularyWord } = require('../src/models');
const { parseEntry, parseJsonl } = require('../src/services/vocabularyImport');

const FILE = path.join(__dirname, '../db/seed/vocabulary-starter.jsonl');
const apply = process.argv.includes('--apply');

async function main() {
  const parsed = parseJsonl(fs.readFileSync(FILE));
  const errors = [...parsed.errors];
  const normalized = new Set();
  const entries = [];
  for (const [index, input] of parsed.entries.entries()) {
    const result = parseEntry(input, parsed.entryRows[index]);
    if (!result.entry) {
      errors.push(...result.errors);
      continue;
    }
    if (normalized.has(result.entry.normalized_word)) {
      errors.push({ row: parsed.entryRows[index], field: 'word', code: 'DUPLICATE_IN_FILE', message: `Duplicate word “${result.entry.word}”` });
      continue;
    }
    normalized.add(result.entry.normalized_word);
    entries.push(result.entry);
  }
  if (errors.length) {
    console.error(JSON.stringify({ valid: entries.length, errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  await mongoose.connect(config.mongoUri);
  if (apply) {
    await VocabularyWord.collection.createIndex(
      { normalized_word: 1 },
      { name: 'uniq_vocabulary_word', unique: true },
    );
  }
  const existing = await VocabularyWord.find({
    normalized_word: { $in: entries.map((entry) => entry.normalized_word) },
  }).select('normalized_word').lean();
  const existingKeys = new Set(existing.map((entry) => entry.normalized_word));
  const additions = entries
    .filter((entry) => !existingKeys.has(entry.normalized_word))
    .map((entry) => ({
      ...entry,
      status: 'DRAFT',
      authored_by: 'curated-starter-pack',
    }));

  console.log(JSON.stringify({
    mode: apply ? 'apply' : 'dry-run',
    rows: entries.length,
    alreadyPresent: existing.length,
    wouldAddAsDraft: additions.length,
    sourceStatus: 'UNVERIFIED',
    examRelevance: 'GENERAL only; no PYQ claim',
  }, null, 2));

  if (apply && additions.length) {
    const inserted = await VocabularyWord.insertMany(additions, { ordered: true });
    console.log(`Inserted ${inserted.length} draft vocabulary entries. Review and publish through /api/v1/admin/vocabulary.`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
