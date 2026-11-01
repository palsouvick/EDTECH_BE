'use strict';

/**
 * Gives existing General Studies questions their GK subcategory (subtopic), so
 * the GK pages can show topic-wise progress and filter practice by subcategory.
 * New databases get these at seed time; this brings an existing one up to date.
 *
 *   node --env-file-if-exists=.env scripts/tagGsSubtopics.js            # apply
 *   node --env-file-if-exists=.env scripts/tagGsSubtopics.js --dry-run  # report only
 *
 * Rules:
 *  - Only generated questions (authored_by seed_generator) are touched; imported,
 *    admin-written and GK-library questions keep their subtopic.
 *  - Factbank questions are matched to their bank item by the stem's duplicate key; the
 *    subcategory comes from the section header above the item (factbank/subtopics.js).
 *  - Template questions keep their family's label unless it maps to a GK subcategory.
 *  - Only the `subtopic` field changes. Running it twice changes nothing.
 */

const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { Question } = require('../src/models');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');
const { itemSubtopics, generatorSubtopic } = require('./generators/factbank/subtopics');

const DIR = path.join(__dirname, 'generators/factbank');
const AUTHOR = 'seed_generator';

/** duplicate key (English stem) → { topic, subtopic } for every tagged factbank item. */
function factbankIndex() {
  const index = new Map();
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.js') && !['validate.js', 'subtopics.js'].includes(f))) {
    const bank = require(path.join(DIR, file));
    if (bank.subject !== 'gs' || !Array.isArray(bank.items)) continue;
    const subs = itemSubtopics(path.join(DIR, file), bank);
    if (!subs) continue;
    bank.items.forEach((item, i) => {
      if (!subs[i]) return;
      const [key] = questionDuplicateKeys({ en: item.q[0] });
      index.set(key, { topic: bank.topic, subtopic: subs[i] });
    });
  }
  return index;
}

async function tagGsSubtopics({ dryRun = false } = {}) {
  const index = factbankIndex();
  const cursor = Question.find({ subject: 'gs', authored_by: AUTHOR }).select('topic subtopic +duplicate_keys').lean().cursor();
  const ops = [];
  const stats = { scanned: 0, fromBank: 0, fromTemplate: 0, unchanged: 0, untagged: 0 };
  for await (const q of cursor) {
    stats.scanned += 1;
    const hit = (q.duplicate_keys || []).map((k) => index.get(k)).find((x) => x && x.topic === q.topic);
    const next = hit ? hit.subtopic : generatorSubtopic(q.topic, q.subtopic);
    if (!next) {
      stats.untagged += 1;
      continue;
    }
    if (next === q.subtopic) {
      stats.unchanged += 1;
      continue;
    }
    stats[hit ? 'fromBank' : 'fromTemplate'] += 1;
    ops.push({ updateOne: { filter: { _id: q._id }, update: { $set: { subtopic: next } } } });
  }
  if (!dryRun) for (let i = 0; i < ops.length; i += 500) await Question.bulkWrite(ops.slice(i, i + 500), { ordered: false });
  return { ...stats, updated: dryRun ? 0 : ops.length };
}

/** Changes whenever the header map or the banks change, so server start re-runs only then. */
function subtopicsFingerprint() {
  const crypto = require('node:crypto');
  const hash = crypto.createHash('sha1');
  for (const f of fs.readdirSync(DIR).sort()) hash.update(`${f}:${fs.statSync(path.join(DIR, f)).size};`);
  return hash.digest('hex');
}

module.exports = { tagGsSubtopics, subtopicsFingerprint, factbankIndex };

if (require.main === module) {
  (async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(JSON.stringify(await tagGsSubtopics({ dryRun: process.argv.includes('--dry-run') }), null, 2));
  })()
    .catch((e) => {
      console.error(e.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}
