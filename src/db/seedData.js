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
const catalog = require('../../db/seed/catalog');
const cutoffs = require('../../db/seed/cutoffs');
const { buildTopicSummaries } = require('../../db/seed/topic-summaries');
const { convertExamStyleQuestion } = require('../services/importers/examStyleJson');

const DEFAULT_QUESTION_FILE = path.join(__dirname, '../../db/seed/pyq-sample-25.json');

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

/** Imports one file in the authoring format of db/seed/pyq-sample-25.json. */
async function importQuestionFile(file, { status = 'PUBLISHED', dryRun = false, onlyMissing = false, log = console.log, warn = console.warn } = {}) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.questions;
  let written = 0;
  const errors = [];
  for (const [i, item] of items.entries()) {
    const { doc, error, warnings } = convertExamStyleQuestion(item, { status, index: i });
    warnings.forEach((w) => warn(`  warn ${w}`));
    if (error) {
      errors.push(error);
      continue;
    }
    try {
      if (await upsertValidated(Question, { code: doc.code }, doc, { dryRun, onlyMissing })) written += 1;
    } catch (err) {
      errors.push(`#${i} (${doc.code}): ${err.message}`);
    }
  }
  log(`${path.basename(file)}: ${written}/${items.length} ${dryRun ? 'valid' : `${onlyMissing ? 'new, ' : ''}imported as ${status}`}`);
  return { written, total: items.length, errors };
}

module.exports = { DEFAULT_QUESTION_FILE, seedReferenceData, importQuestionFile };
