'use strict';

/**
 * Reference data and question-file import, shared by scripts/seed.js (manual
 * runs) and src/db/bootstrap.js (automatic on startup).
 *
 * - Catalogue and cut-offs live in code (db/seed), so they are upserted: a deploy
 *   that edits db/seed/catalog.js reaches the database on the next start.
 * - Concept sheets are inserted only where a topic has none, so sheets edited in
 *   the database are kept unless overwriteSummaries is set.
 * - Question files are upserted by a code derived from the English stem; with
 *   onlyMissing, questions already in the database (perhaps re-reviewed by an
 *   admin) are left as they are.
 */

const fs = require('node:fs');
const path = require('node:path');
const { ExamCategory, ExamCutoff, Question, TopicSummary } = require('../models');
const { questionContentHash, QUESTION_SYNC_FIELDS } = require('../utils/questionContentHash');
const catalog = require('../../db/seed/catalog');
const cutoffs = require('../../db/seed/cutoffs');
const { buildTopicSummaries } = require('../../db/seed/topic-summaries');
const { convertExamStyleQuestion } = require('../services/importers/examStyleJson');

const DEFAULT_QUESTION_FILE = path.join(__dirname, '../../db/seed/pyq-sample-25.json');
// Real previous-year questions from official commission papers, one JSON file per paper (see db/pyq/README.md).
const PYQ_DIR = path.join(__dirname, '../../db/pyq');
const pyqFiles = () => (fs.existsSync(PYQ_DIR) ? fs.readdirSync(PYQ_DIR).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(PYQ_DIR, f)) : []);

/** Validates (runs pre('validate'), which derives lang_set etc.) then writes. Returns true if written. */
async function upsertValidated(Model, filter, raw, { dryRun = false, onlyMissing = false } = {}) {
  const doc = new Model(raw);
  await doc.validate();
  const { _id, ...fields } = doc.toObject();
  if (dryRun) return true;
  if (!onlyMissing) {
    await Model.replaceOne(filter, fields, { upsert: true });
    return true;
  }
  try {
    const r = await Model.updateOne(filter, { $setOnInsert: fields }, { upsert: true });
    return r.upsertedCount > 0;
  } catch (e) {
    if (e.code === 11000) return false; // another instance inserted it first
    throw e;
  }
}

async function seedReferenceData({ dryRun = false, overwriteSummaries = false, log = console.log } = {}) {
  const verb = dryRun ? 'validated' : 'upserted';
  for (const cat of catalog) await upsertValidated(ExamCategory, { code: cat.code }, cat, { dryRun });
  log(`catalogue: ${catalog.length} categories ${verb}`);

  for (const c of cutoffs) {
    await upsertValidated(ExamCutoff, { category: c.category, exam_code: c.exam_code, stage: c.stage, year: c.year, reservation: c.reservation }, c, { dryRun });
  }
  log(`cut-offs: ${cutoffs.length} ${verb}${cutoffs.length ? '' : ' (add official figures with their source to db/seed/cutoffs.js)'}`);

  const sheets = buildTopicSummaries();
  let written = 0;
  for (const sheet of sheets) {
    if (await upsertValidated(TopicSummary, { slug: sheet.slug }, sheet, { dryRun, onlyMissing: !overwriteSummaries })) written += 1;
  }
  const kept = sheets.length - written;
  log(`concept sheets: ${written}/${sheets.length} ${verb}${kept ? `, ${kept} already in the database kept (--overwrite-summaries to replace)` : ''}`);
}

/**
 * Synchronises one converted question with the database, the way
 * scripts/seedGkFacts.js has always done it:
 *   - no such question yet            → insert
 *   - same code, source content changed → update the content fields in place
 *   - identical content                 → skip (one hash comparison)
 * Matching is by the stable `code` (derived from the English stem); when the
 * stem itself changed, a real PYQ is still found through its unique
 * pyq.refs.question_code and updated instead of duplicated.
 *
 * A sync never touches runtime or admin state: stats, status (an archived or
 * rejected question stays that way), source_check, reviewed_by and pattern
 * tags are preserved, and a question an admin has edited (version > 1 — the
 * question editor bumps version on every save) is reported 'protected' and
 * left exactly as the admin left it.
 */
async function syncImportedQuestion(rawDoc) {
  const doc = new Question(rawDoc);
  await doc.validate();
  const { _id, ...fields } = doc.toObject();
  fields.import_fingerprint = questionContentHash(fields);

  // Only +-prefixed fields: a plain field list would switch the projection to
  // inclusion mode and hide the content fields the hash comparison needs.
  const identity = '+import_fingerprint +solution +correct_option_id +duplicate_keys';
  let existing = await Question.findOne({ code: fields.code }).select(identity).lean();
  if (!existing && fields.pyq?.refs?.[0]?.question_code) {
    existing = await Question.findOne({ 'pyq.refs.question_code': fields.pyq.refs[0].question_code }).select(identity).lean();
  }
  if (!existing) {
    try {
      await Question.create(fields);
      return 'inserted';
    } catch (e) {
      if (e.code === 11000) return 'skipped'; // another instance inserted it first
      throw e;
    }
  }
  if (existing.version > 1) return 'protected';
  if (questionContentHash(existing) === fields.import_fingerprint) {
    // Backfill the fingerprint on pre-upgrade records so the stored value exists.
    if (!existing.import_fingerprint) {
      await Question.updateOne({ _id: existing._id }, { $set: { import_fingerprint: fields.import_fingerprint } });
    }
    return 'skipped';
  }
  const set = {};
  for (const f of QUESTION_SYNC_FIELDS) if (fields[f] !== undefined) set[f] = fields[f];
  delete set.code; // identity never moves, even when matched via the PYQ reference
  await Question.updateOne({ _id: existing._id }, { $set: set });
  return 'updated';
}

/**
 * Validates a whole question file without writing anything. Two severities:
 *   errors   — a record cannot convert at all (unknown category/subject/topic/
 *              difficulty, inconsistent option ids, a correct answer that is
 *              not an option). Any error aborts the file's import: syncing a
 *              dataset with broken references halfway would corrupt the bank.
 *   warnings — duplicate codes/content inside the file. Real exam papers do
 *              repeat a question, and dedupe has always absorbed that (the
 *              second copy is skipped on import), so duplicates are reported
 *              but never block the file.
 * Full schema validation still happens per record on the write path itself
 * (syncImportedQuestion / upsertValidated), exactly as before this check
 * existed — pre-flight adds the whole-file gate, it does not replace it.
 */
async function validateQuestionFile(file, { status = 'PUBLISHED' } = {}) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.questions;
  const errors = [];
  const warnings = [];
  const codes = new Map();
  const hashes = new Map();
  for (const [i, item] of items.entries()) {
    const { doc, error } = convertExamStyleQuestion(item, { status, index: i });
    if (error) {
      errors.push(error);
      continue;
    }
    codes.set(doc.code, (codes.get(doc.code) || 0) + 1);
    const h = questionContentHash(doc);
    hashes.set(h, (hashes.get(h) || 0) + 1);
  }
  for (const [code, n] of codes) if (n > 1) warnings.push(`duplicate question code in file: ${code} appears ${n} times (extra copies are skipped)`);
  for (const [h, n] of hashes) if (n > 1) warnings.push(`duplicate question content in file (fingerprint ${h.slice(0, 12)}…) appears ${n} times (extra copies are skipped)`);
  return { total: items.length, errors, warnings, ok: errors.length === 0 };
}

/**
 * Imports one file in the authoring format of db/seed/pyq-sample-25.json.
 *
 * Modes:
 *   default      upsert every record (manual scripts/seed.js behaviour)
 *   onlyMissing  insert only records whose code is not in the database yet
 *   sync         insert missing, update changed, skip identical, protect
 *                admin-edited — the production bootstrap / force-sync mode
 *   preflight    with any mode: validate the whole file first and import
 *                nothing at all when validation fails
 */
async function importQuestionFile(file, { status = 'PUBLISHED', dryRun = false, onlyMissing = false, sync = false, preflight = false, log = console.log, warn = console.warn } = {}) {
  let preflightWarnings = [];
  if (preflight && !dryRun) {
    const check = await validateQuestionFile(file, { status });
    preflightWarnings = check.warnings;
    if (!check.ok) {
      log(`${path.basename(file)}: pre-flight validation failed — nothing imported (${check.errors.length} error(s))`);
      return { written: 0, updated: 0, skipped: 0, protected: 0, total: check.total, errors: check.errors, warnings: check.warnings, aborted: true };
    }
  }
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.questions;
  let written = 0;
  let updated = 0;
  let skipped = 0;
  let protectedCount = 0;
  const errors = [];
  const seenCodes = new Set();
  for (const [i, item] of items.entries()) {
    const { doc, error, warnings } = convertExamStyleQuestion(item, { status, index: i });
    warnings.forEach((w) => warn(`  warn ${w}`));
    if (error) {
      errors.push(error);
      continue;
    }
    // A question repeated inside one file (real papers do this) is imported
    // once; later copies in the same file are skipped here, not re-synced.
    if (sync && !dryRun && seenCodes.has(doc.code)) {
      skipped += 1;
      continue;
    }
    seenCodes.add(doc.code);
    try {
      if (sync && !dryRun) {
        const outcome = await syncImportedQuestion(doc);
        if (outcome === 'inserted') written += 1;
        else if (outcome === 'updated') updated += 1;
        else if (outcome === 'protected') protectedCount += 1;
        else skipped += 1;
      } else if (await upsertValidated(Question, { code: doc.code }, doc, { dryRun, onlyMissing })) {
        written += 1;
      } else if (onlyMissing) {
        skipped += 1;
      }
    } catch (err) {
      errors.push(`#${i} (${doc.code}): ${err.message}`);
    }
  }
  const mode = dryRun ? 'valid' : sync ? 'synced' : `${onlyMissing ? 'new, ' : ''}imported`;
  log(`${path.basename(file)}: ${written}/${items.length} ${mode} as ${status}${sync && !dryRun ? ` (${updated} updated, ${skipped} unchanged, ${protectedCount} admin-protected)` : ''}`);
  return { written, updated, skipped, protected: protectedCount, total: items.length, errors, warnings: preflightWarnings, aborted: false };
}

module.exports = { DEFAULT_QUESTION_FILE, PYQ_DIR, pyqFiles, seedReferenceData, importQuestionFile, validateQuestionFile, syncImportedQuestion };
