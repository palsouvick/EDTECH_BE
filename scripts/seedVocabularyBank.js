'use strict';

/**
 * Loads the Vocabulary Bank (db/vocabulary/*.jsonl) into vocabulary_words. Idempotent.
 *
 *   node --env-file-if-exists=.env scripts/seedVocabularyBank.js            # apply
 *   node --env-file-if-exists=.env scripts/seedVocabularyBank.js --dry-run  # report only
 *
 * Rules:
 *  - The whole bank must pass validation (vocabularyImport.parseEntry + validateBatch);
 *    otherwise nothing is written.
 *  - Entries that pass the lexicon checks (db/vocabulary/lexicon-checks.json) are
 *    PUBLISHED; the rest are kept as DRAFT and reported. Bengali review starts PENDING.
 *  - Pronunciations come only from CMUdict (via the checks file); a word missing from
 *    CMUdict has none rather than a guessed one.
 *  - An entry an administrator has corrected or reviewed is never overwritten; only its
 *    lexical-check fields are refreshed. Words imported through the admin portal are left alone.
 */

const mongoose = require('mongoose');
const VocabularyWord = require('../src/models/VocabularyWord');
const bank = require('./vocabulary/bank');

const AUTHOR = 'vocabulary_bank';

async function ensureVocabularyBank({ dryRun = false, log = console.log } = {}) {
  const raw = bank.loadRawEntries();
  const { parsed, errors } = bank.parseBank(raw);
  if (errors.length) {
    for (const e of errors.slice(0, 20)) log(`vocabulary bank: ${e.row} ${e.field} ${e.code}: ${e.message}`);
    throw new Error(`Vocabulary Bank has ${errors.length} validation error(s); nothing was imported`);
  }
  const checks = bank.loadChecks();
  if (!checks || checks.inputHash !== bank.checksInputHash(raw)) {
    throw new Error('db/vocabulary/lexicon-checks.json is missing or out of date; run npm run vocab:check');
  }
  const official = bank.officialPairs();
  const stats = { total: parsed.length, inserted: 0, updated: 0, unchanged: 0, protected: 0, foreign: 0, published: 0, draft: [] };
  const now = new Date();

  for (const { entry, raw: source } of parsed) {
    const check = checks.entries[entry.normalized_word];
    const verdict = bank.assess(entry, check, official);
    if (verdict.publish) stats.published += 1;
    else stats.draft.push(`${entry.word} (${verdict.failures.join('; ')})`);
    const lexical = {
      wordnet_found: Boolean(check?.found),
      wordnet_frequency: check?.frequency ?? 0,
      confirmed_synonyms: verdict.confirmedSynonyms,
      confirmed_antonyms: verdict.confirmedAntonyms,
      unconfirmed: verdict.unconfirmed,
      checked_at: now,
    };
    const priority = bank.reviewPriority(entry, check);
    const hash = bank.contentHash(source);
    const doc = {
      ...entry,
      pronunciation: check?.pronunciation?.ipa ?? undefined,
      pronunciation_source: check?.pronunciation ? 'CMUDICT' : undefined,
      status: verdict.publish ? 'PUBLISHED' : 'DRAFT',
      authored_by: AUTHOR,
      review_priority: priority,
      lexical_checks: lexical,
      content_hash: hash,
    };

    const existing = await VocabularyWord.findOne({ normalized_word: entry.normalized_word }).select('+content_hash').lean();
    if (!existing) {
      stats.inserted += 1;
      if (!dryRun) await VocabularyWord.create({ ...doc, bengali_review: { status: 'PENDING' } });
      continue;
    }
    if (existing.authored_by !== AUTHOR) {
      stats.foreign += 1; // imported through the admin portal: not ours to change
      continue;
    }
    const humanTouched = existing.bengali_review?.status === 'REVIEWED' || existing.edit_history?.length > 0;
    if (humanTouched) {
      stats.protected += 1;
      if (!dryRun) await VocabularyWord.updateOne({ _id: existing._id }, { $set: { lexical_checks: lexical, review_priority: priority } });
      continue;
    }
    if (existing.content_hash === hash && existing.status === doc.status) {
      stats.unchanged += 1;
      if (!dryRun) await VocabularyWord.updateOne({ _id: existing._id }, { $set: { lexical_checks: lexical, review_priority: priority } });
      continue;
    }
    stats.updated += 1;
    if (!dryRun) {
      await VocabularyWord.updateOne(
        { _id: existing._id },
        { $set: doc, ...(!doc.pronunciation && { $unset: { pronunciation: '', pronunciation_source: '' } }) },
        { runValidators: true },
      );
    }
  }
  return stats;
}

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  (async () => {
    await mongoose.connect(require('../src/config').mongoUri);
    try {
      const s = await ensureVocabularyBank({ dryRun });
      console.log(`${dryRun ? '[dry run] ' : ''}${s.total} entries: ${s.inserted} new, ${s.updated} updated, ${s.unchanged} unchanged, ${s.protected} kept (admin-edited), ${s.foreign} skipped (admin import); ${s.published} published`);
      if (s.draft.length) console.log(`held back as draft: ${s.draft.join(', ')}`);
    } finally {
      await mongoose.disconnect();
    }
  })().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

module.exports = { AUTHOR, ensureVocabularyBank };
