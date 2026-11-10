'use strict';

/**
 * First-run setup, done by the server on every start so a fresh database (prod
 * or a new dev machine) needs no manual seed commands. Every step is idempotent:
 *
 *   1. indexes        db/indexes.mongo.js, when autoIndex is off (production)
 *   2. reference data catalogue + cut-offs (synced from code), missing concept sheets,
 *                     missing sample questions (db/seed/pyq-sample-25.json) and
 *                     official previous-year papers (db/pyq/*.json)
 *   3. question bank  tops every chapter up to SEED_QUESTIONS_PER_TOPIC generated questions
 *                     when the target or the question files changed; runs in the
 *                     background after the server is listening
 *
 *   4. GK library     db/gk/*.jsonl facts and their questions (scripts/seedGkFacts.js), after
 *                     the bank so links to existing questions resolve; only when the files changed
 *   5. patterns       tags questions with their question pattern (db/patterns/match)
 *                     when the rules or the bank changed
 *
 * The first admin account is created by src/services/adminBootstrap.js.
 * Set AUTO_SEED=false to turn all of this off; SEED_QUESTIONS_PER_TOPIC=0 skips step 3.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const mongoose = require('mongoose');
const config = require('../config');
const { Question } = require('../models');
const { ensureIndexes } = require('./ensureIndexes');
const { DEFAULT_QUESTION_FILE, pyqFiles, seedReferenceData, importQuestionFile } = require('./seedData');
const { QUESTION_BANK_VERSION } = require('./questionBankVersion');
const {
  writeQuestionBankState,
  noteQuestionBankState,
  noteSyncProgress,
  clearSyncProgress,
  getQuestionBankMemory,
  refreshQuestionBankMemory,
} = require('../services/questionBankStatus.service');

const log = (msg) => console.log(`[bootstrap] ${msg}`);
const warn = (msg) => console.warn(`[bootstrap] ${msg}`);

async function bootstrapData() {
  if (!config.seed.auto) return;
  if (!mongoose.connection.config.autoIndex) await ensureIndexes(mongoose.connection, { log, warn });
  await seedReferenceData({ log });
  // File questions sync (not just insert-missing): a source edit to a question
  // updates the stored record in place, admin edits are protected, and every
  // file is pre-flight validated as a whole before anything from it is written.
  const fileTotals = { inserted: 0, updated: 0, skipped: 0, protected: 0, failed: 0 };
  for (const file of [DEFAULT_QUESTION_FILE, ...pyqFiles()]) {
    const r = await importQuestionFile(file, { sync: true, preflight: true, log, warn: () => {} });
    r.errors.forEach((e) => warn(`${path.basename(file)}: question skipped: ${e}`));
    (r.warnings || []).forEach((w) => warn(`${path.basename(file)}: ${w}`));
    fileTotals.inserted += r.written;
    fileTotals.updated += r.updated;
    fileTotals.skipped += r.skipped;
    fileTotals.protected += r.protected;
    fileTotals.failed += r.errors.length;
  }
  if (fileTotals.updated || fileTotals.inserted) {
    log(`question files synced: ${fileTotals.inserted} new, ${fileTotals.updated} updated, ${fileTotals.skipped} unchanged, ${fileTotals.protected} admin-protected, ${fileTotals.failed} failed`);
  }
  noteQuestionBankState({ last_file_sync: fileTotals });
  // Vocabulary Bank (db/vocabulary): a bad file is reported, never fatal to startup.
  try {
    const v = await require('../../scripts/seedVocabularyBank').ensureVocabularyBank({ log: warn });
    log(`vocabulary bank: ${v.total} entries (${v.inserted} new, ${v.updated} updated, ${v.protected} admin-edited kept), ${v.published} published`);
    if (v.draft.length) warn(`vocabulary bank: held back as draft: ${v.draft.join(', ')}`);
  } catch (e) {
    warn(`vocabulary bank not loaded: ${e.message}`);
  }
  return { fileTotals };
}

const LOCK_ID = 'question_bank';
const LOCK_MS = 15 * 60 * 1000;

/** One instance at a time: a lock document that expires if its holder dies mid-run. */
async function acquireLock(locks) {
  const now = new Date();
  try {
    await locks.updateOne(
      { _id: LOCK_ID, until: { $lt: now } },
      { $set: { until: new Date(now.getTime() + LOCK_MS), holder: `${os.hostname()}:${process.pid}` } },
      { upsert: true },
    );
    return true;
  } catch (e) {
    if (e.code === 11000) return false; // held by another instance
    throw e;
  }
}

const GENERATORS_DIR = path.join(__dirname, '../../scripts/generators');

/**
 * Fingerprint of the question sources (generator and fact-bank files: names
 * and sizes). A deploy that adds or edits question files changes it, so the
 * next start tops every chapter up again and the new questions reach the DB.
 */
function sourcesFingerprint() {
  const hash = crypto.createHash('sha1');
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js')) hash.update(`${path.relative(GENERATORS_DIR, full)}:${fs.statSync(full).size};`);
    }
  };
  walk(GENERATORS_DIR);
  return hash.digest('hex');
}

/**
 * Tops every chapter up to SEED_QUESTIONS_PER_TOPIC generated questions, but
 * only when something changed since the last top-up: the target, or the
 * question files (see sourcesFingerprint). Otherwise it is a single read.
 * Top-up is idempotent: existing questions are kept, only the gap is added.
 */
async function seedQuestionBank({ force = false } = {}) {
  const perTopic = config.seed.questionsPerTopic;
  if (!config.seed.auto || perTopic <= 0) return { skipped: 'disabled' };
  const state = mongoose.connection.db.collection('seed_state');
  const fingerprint = sourcesFingerprint();
  const done = await state.findOne({ _id: 'question_bank' });
  // A run counts as complete when it stamped `status: 'completed'` — or, for
  // records written before status existed, when it left a fingerprint stamp.
  // An 'initializing'/'failed' stamp means a run was interrupted (e.g. the
  // host slept mid-generation): fall through and reconcile, which is safe
  // because generation only ever tops up and dedupes by code/stem.
  const stampedComplete = done && (done.status === 'completed' || (!done.status && done.fingerprint && done.at));
  const upToDate = stampedComplete && done.perTopic === perTopic && done.fingerprint === fingerprint
    && done.question_bank_version === QUESTION_BANK_VERSION;
  if (upToDate && !force) return { skipped: 'up-to-date' };
  if (stampedComplete && !done.status && !force && done.perTopic === perTopic && done.fingerprint === fingerprint) {
    // One-time backfill for pre-upgrade records: add the status fields once,
    // without re-running generation for a bank that is already current.
    await writeQuestionBankState({
      status: 'completed',
      question_bank_version: QUESTION_BANK_VERSION,
      source_fingerprint: fingerprint,
      total_questions: await Question.countDocuments(),
      last_completed_at: done.at ?? null,
    });
    return { skipped: 'backfilled' };
  }

  const locks = mongoose.connection.db.collection('seed_locks');
  if (!(await acquireLock(locks))) {
    noteQuestionBankState({ status: 'initializing' });
    log('question bank is being generated by another instance');
    return { skipped: 'locked' };
  }
  await writeQuestionBankState({
    status: 'initializing',
    question_bank_version: QUESTION_BANK_VERSION,
    source_fingerprint: fingerprint,
    fingerprint,
    perTopic,
    last_started_at: new Date(),
    last_error: null,
  });
  try {
    // Required lazily: the generators are only needed when the bank changes.
    const generator = require('../../scripts/generateAndSeed');
    log(`topping every chapter up to ${perTopic} generated questions (bank v${QUESTION_BANK_VERSION}${force ? ', forced sync' : ''})`);
    const totals = await generator.main(generator.parseArgs(['--per-topic', String(perTopic)]), {
      embedded: true,
      onProgress: ({ subject, subjectIndex, subjectsTotal, doneInSubject, subjectTotal }) => {
        noteSyncProgress({
          percent: Math.min(100, Math.round((100 * (subjectIndex + doneInSubject / Math.max(1, subjectTotal))) / subjectsTotal)),
          subject,
          done: doneInSubject,
          total: subjectTotal,
        });
      },
    });
    const hardPool = await require('../../scripts/seedProfitLossHard').ensureHardProfitLossQuestions();
    const hardBanks = await require('../../scripts/seedHardBanks').ensureHardBanks();
    const last_run = {
      inserted: totals.inserted,
      updated: totals.updated ?? 0,
      skipped: totals.skipped,
      failed: totals.failed ?? 0,
      protected: totals.protected ?? 0,
    };
    const total_questions = await Question.countDocuments();
    await writeQuestionBankState({
      status: 'completed',
      question_bank_version: QUESTION_BANK_VERSION,
      source_fingerprint: fingerprint,
      fingerprint,
      perTopic,
      last_completed_at: new Date(),
      last_error: null,
      last_run,
      total_questions,
      // Legacy fields, kept so older readers of this record keep working.
      at: new Date(),
      inserted: totals.inserted,
    });
    log(`question bank ready: ${totals.inserted} new questions (${total_questions} total, v${QUESTION_BANK_VERSION})`);
    log(`Profit & Loss hard bank ready: ${hardPool.total} questions (${hardPool.inserted} new)`);
    for (const b of hardBanks) log(`${b.topic} hard bank ready: ${b.total} questions (${b.inserted} new)`);
    return { ...last_run, total_questions };
  } catch (e) {
    await writeQuestionBankState({ status: 'failed', last_error: e.message }).catch(() => {});
    throw e;
  } finally {
    clearSyncProgress();
    await locks.deleteOne({ _id: LOCK_ID });
  }
}

/**
 * Tags every question with its pattern (src/services/patternTagger.js) when the
 * rules or the bank changed since the last run. Runs after the bank top-up.
 */
async function tagPatterns() {
  if (!config.seed.auto) return;
  const { rulesFingerprint, tagAll } = require('../services/patternTagger');
  const state = mongoose.connection.db.collection('seed_state');
  const fingerprint = `${rulesFingerprint()}:${await mongoose.connection.db.collection('questions').estimatedDocumentCount()}`;
  if ((await state.findOne({ _id: 'patterns' }))?.fingerprint === fingerprint) return;
  const coverage = await tagAll();
  const tagged = coverage.reduce((a, c) => a + c.tagged, 0);
  const total = coverage.reduce((a, c) => a + c.total, 0);
  await state.updateOne({ _id: 'patterns' }, { $set: { fingerprint, at: new Date(), tagged, total } }, { upsert: true });
  log(`question patterns: ${tagged}/${total} questions tagged`);
}

/**
 * Loads the GK fact library when its files changed since the last load. A library
 * that fails validation is reported and nothing from it is written.
 */
async function seedGkLibrary() {
  if (!config.seed.auto) return;
  const gk = require('../../scripts/seedGkFacts');
  const state = mongoose.connection.db.collection('seed_state');
  const fingerprint = gk.libraryFingerprint();
  if ((await state.findOne({ _id: 'gk_library' }))?.fingerprint === fingerprint) return;
  const s = await gk.ensureGkLibrary({ log: warn });
  await state.updateOne({ _id: 'gk_library' }, { $set: { fingerprint, at: new Date(), facts: s.facts, published: s.published } }, { upsert: true });
  log(`GK library: ${s.facts} facts (${s.published} published, ${s.draft} held for review), ${s.questionsInserted} new questions, ${s.linked} existing questions linked`);
  if (s.duplicates.length) warn(`GK library: questions not inserted because they repeat existing ones: ${s.duplicates.join('; ')}`);
  if (s.unmatchedLinks.length) warn(`GK library: ${s.unmatchedLinks.length} linked stems not found in this database`);
}

/**
 * Gives generated General Studies questions their GK subcategory (scripts/tagGsSubtopics.js)
 * when the banks or the header map changed since the last run.
 */
async function tagGsSubtopics() {
  if (!config.seed.auto) return;
  const tagger = require('../../scripts/tagGsSubtopics');
  const state = mongoose.connection.db.collection('seed_state');
  const fingerprint = `${tagger.subtopicsFingerprint()}:${await mongoose.connection.db.collection('questions').estimatedDocumentCount()}`;
  if ((await state.findOne({ _id: 'gs_subtopics' }))?.fingerprint === fingerprint) return;
  const s = await tagger.tagGsSubtopics();
  await state.updateOne({ _id: 'gs_subtopics' }, { $set: { fingerprint, at: new Date(), updated: s.updated } }, { upsert: true });
  log(`GS subcategories: ${s.updated} questions tagged (${s.untagged} without a fitting subcategory)`);
}

/**
 * The full background chain, shared by startup and the admin force-sync so
 * there is only ever one synchronisation implementation. A single in-flight
 * guard (plus the seed_locks document across instances) keeps a startup run
 * and an admin-triggered run from ever overlapping.
 */
let syncInFlight = null;

async function runSyncChain({ force = false } = {}) {
  // The status stays 'initializing' for the whole chain, not just the bank
  // generation: the GK stage can still be adding questions after the bank's
  // own 'completed' stamp, and the status endpoints prefer this in-process
  // state while it says initializing. The durable record is re-read at the
  // end so the reported state settles on the truth.
  noteQuestionBankState({ status: 'initializing' });
  await seedQuestionBank({ force })
    .catch((e) => warn(`question bank generation failed: ${e.message}`));
  noteQuestionBankState({ status: 'initializing' });
  await seedGkLibrary().catch((e) => warn(`GK library not loaded: ${e.message}`));
  await tagGsSubtopics().catch((e) => warn(`GS subcategory tagging failed: ${e.message}`));
  await tagPatterns().catch((e) => warn(`pattern tagging failed: ${e.message}`));
  await refreshQuestionBankMemory().catch(() => {});
}

/** Fire-and-forget: the API is already serving while the bank fills and gets tagged. */
function startQuestionBankSeed() {
  if (syncInFlight) return;
  syncInFlight = runSyncChain().finally(() => { syncInFlight = null; });
}

/**
 * Admin recovery action ("Force Question Bank Sync"): re-runs the exact
 * startup synchronisation — reference/file sync with update-changed and
 * pre-flight validation, then the bank top-up with the fingerprint check
 * bypassed (force), then the taggers. It invents no second import path; all
 * locks, dedupe and validation of the normal flow apply unchanged.
 * Returns { started: false, reason } when a sync is already running.
 */
function requestQuestionBankSync() {
  if (syncInFlight) return { started: false, reason: 'already_running' };
  noteQuestionBankState({ status: 'initializing', last_started_at: new Date() });
  syncInFlight = (async () => {
    const { fileTotals } = (await bootstrapData().catch((e) => {
      warn(`force sync: reference/file sync failed: ${e.message}`);
      return { fileTotals: null };
    })) ?? { fileTotals: null };
    await runSyncChain({ force: true });
    if (fileTotals) {
      const { last_run } = getQuestionBankMemory();
      if (last_run) {
        await writeQuestionBankState({
          last_run: {
            inserted: (last_run.inserted ?? 0) + fileTotals.inserted,
            updated: (last_run.updated ?? 0) + fileTotals.updated,
            skipped: (last_run.skipped ?? 0) + fileTotals.skipped,
            failed: (last_run.failed ?? 0) + fileTotals.failed,
            protected: (last_run.protected ?? 0) + fileTotals.protected,
          },
          total_questions: await Question.countDocuments(),
        }).catch(() => {});
      }
    }
  })().finally(() => { syncInFlight = null; });
  return { started: true };
}

module.exports = { bootstrapData, seedQuestionBank, seedGkLibrary, tagGsSubtopics, tagPatterns, startQuestionBankSeed, requestQuestionBankSync, sourcesFingerprint };
