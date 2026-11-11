'use strict';

/**
 * Applies the content-quality log (db/corrections/*.json) to questions that are already in a database.
 *
 * Why: the question generator only ever adds questions. A factbank question corrected in
 * scripts/generators/factbank/*.js reaches NEW databases from the file, but an existing database keeps the old,
 * wrong text. This script finds the existing question (by the duplicate key of its old or new English stem, among
 * generated questions) and updates it IN PLACE, so its id, attempts, bookmarks and mistake-book entries stay.
 *
 *   node --env-file-if-exists=.env scripts/applyContentCorrections.js            # apply
 *   node --env-file-if-exists=.env scripts/applyContentCorrections.js --dry-run  # report only
 *
 * Only entries with `target.kind: "factbank"` and a `fix` are applied here (GK-library facts are corrected in
 * db/gk/*.jsonl and reach the database through the GK seeder, which updates by question code). A question an
 * admin edited (version > 1) is left alone and reported. Running it twice changes nothing.
 *
 * `fix` fields: stem / answer / explanation as { en, bn }, wrong as [{ en, bn } x3] (same order as the old ones).
 * Entries with `source_verified: true` also get source_check SOURCE_VERIFIED with the NCERT page they cite.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const mongoose = require('mongoose');
const { Question } = require('../src/models');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');

const DIR = path.join(__dirname, '../db/corrections');
const AUTHOR = 'seed_generator';

function loadLog(dir = DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).map((e) => ({ ...e, __file: f })));
}

function correctionsFingerprint(dir = DIR) {
  const h = crypto.createHash('sha1');
  if (!fs.existsSync(dir)) return h.digest('hex');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) h.update(`${f}:${crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, f))).digest('hex')};`);
  return h.digest('hex');
}

const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
/** Comparable text of options or steps (stored documents carry extra fields such as _id). */
const texts = (list) => JSON.stringify((list || []).map((x) => [x.oid ?? null, (x.text ?? x)?.en ?? null, (x.text ?? x)?.bn ?? null]));

/** New option texts, keeping each existing option id: the old answer's option gets the new answer, and so on. */
function remapOptions(doc, entry) {
  const { fix, old_item: before } = entry;
  const answerOid = doc.correct_option_id;
  const wrongOld = (before?.wrong || []).map(norm);
  return doc.options.map((o) => {
    if (o.oid === answerOid) return fix.answer ? { ...o, text: fix.answer } : o;
    const i = wrongOld.indexOf(norm(o.text?.en));
    return i >= 0 && fix.wrong?.[i] ? { ...o, text: fix.wrong[i] } : o;
  });
}

async function applyCorrections({ dryRun = false, log = console.log, dir = DIR } = {}) {
  const stats = { entries: 0, applied: 0, unchanged: 0, notFound: [], protected: [] };
  for (const entry of loadLog(dir)) {
    if (entry.target?.kind !== 'factbank') continue;
    stats.entries += 1;
    const keys = [...questionDuplicateKeys({ en: entry.target.stem_en }), ...(entry.fix?.stem ? questionDuplicateKeys(entry.fix.stem) : [])];
    const doc = await Question.findOne({ authored_by: AUTHOR, subject: 'gs', duplicate_keys: { $in: keys } }).select('+correct_option_id +solution version stem options source_check').lean();
    if (!doc) {
      stats.notFound.push(entry.id);
      continue;
    }
    if (doc.version > 1) {
      stats.protected.push(entry.id);
      continue;
    }
    const set = {};
    if (entry.fix) {
      if (entry.fix.stem && (doc.stem.en !== entry.fix.stem.en || doc.stem.bn !== entry.fix.stem.bn)) {
        set.stem = entry.fix.stem;
        set.duplicate_keys = questionDuplicateKeys(entry.fix.stem);
      }
      const options = remapOptions(doc, entry);
      if (texts(options) !== texts(doc.options)) set.options = options.map((o) => ({ oid: o.oid, text: { en: o.text.en, bn: o.text.bn } }));
      if (entry.fix.explanation) {
        const steps = [entry.fix.explanation, ...(entry.source?.url ? [{ en: `Source: [NCERT](${entry.source.url})`, bn: `সূত্র: [এনসিইআরটি](${entry.source.url})` }] : [])];
        if (texts(steps) !== texts(doc.solution?.steps)) set['solution.steps'] = steps;
      }
    }
    if (entry.source_verified && entry.source?.url && doc.source_check?.status !== 'SOURCE_VERIFIED') {
      set.source_check = { status: 'SOURCE_VERIFIED', source_url: entry.source.url, source_title: entry.source.title || 'NCERT textbook', checked_at: new Date(`${entry.date}T00:00:00Z`), checked_by: 'content_audit', note: `Content-quality log ${entry.id}` };
    }
    if (!Object.keys(set).length) {
      stats.unchanged += 1;
      continue;
    }
    if (!dryRun) await Question.updateOne({ _id: doc._id }, { $set: set }, { runValidators: true });
    stats.applied += 1;
  }
  if (stats.notFound.length) log(`content corrections: ${stats.notFound.length} question(s) not in this database: ${stats.notFound.join(', ')}`);
  if (stats.protected.length) log(`content corrections: ${stats.protected.length} admin-edited question(s) left alone: ${stats.protected.join(', ')}`);
  return stats;
}

module.exports = { applyCorrections, correctionsFingerprint, loadLog, remapOptions };

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  (async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(JSON.stringify(await applyCorrections({ dryRun }), null, 2));
    await mongoose.disconnect();
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
