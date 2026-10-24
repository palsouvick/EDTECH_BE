'use strict';

/**
 * Tags every bank question with the question pattern it belongs to
 * (Question.pattern = a key from db/patterns/<subject>/<topic>.js), so
 * performance can be shown per pattern ("successive % change"), not just per
 * chapter. Rules live in db/patterns/match/<subject>.js:
 *
 *   module.exports = {
 *     percentage: {                                   // chapter (topic code)
 *       successive_change: { subtopics: ['successive_percentage_change'], stem: [/successive/i] },
 *       ...                                           // key order = priority
 *     },
 *   };
 *
 * A question takes the first pattern whose subtopics include its subtopic;
 * failing that, the first whose stem regexes match its English stem;
 * otherwise it stays untagged (it still counts for the chapter).
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { Question } = require('../models');
const { loadPatterns } = require('../../db/patterns');

const MATCH_DIR = path.join(__dirname, '../../db/patterns/match');

function loadRules() {
  const rules = {};
  if (!fs.existsSync(MATCH_DIR)) return rules;
  for (const f of fs.readdirSync(MATCH_DIR).filter((x) => x.endsWith('.js')).sort()) {
    rules[path.basename(f, '.js')] = require(path.join(MATCH_DIR, f));
  }
  return rules;
}

/** Pure: the pattern key for one question, or null. */
function classify(chapterRules, q) {
  if (!chapterRules) return null;
  const entries = Object.entries(chapterRules);
  if (q.subtopic) for (const [key, r] of entries) if (r.subtopics?.includes(q.subtopic)) return key;
  const stem = q.stem?.en || '';
  for (const [key, r] of entries) if (r.stem?.some((re) => re.test(stem))) return key;
  return null;
}

/** Rule keys must be real pattern keys of that chapter. Returns a list of problems. */
function checkRules(rules = loadRules()) {
  const known = new Map(loadPatterns().map(({ doc }) => [`${doc.subject}.${doc.topic}`, new Set(doc.patterns.map((p) => p.key))]));
  const problems = [];
  for (const [subject, chapters] of Object.entries(rules)) {
    for (const [topic, byKey] of Object.entries(chapters)) {
      const keys = known.get(`${subject}.${topic}`);
      if (!keys) problems.push(`${subject}.${topic}: no pattern file`);
      else for (const k of Object.keys(byKey)) if (!keys.has(k)) problems.push(`${subject}.${topic}: unknown pattern "${k}"`);
    }
  }
  return problems;
}

/** Fingerprint of the rules (their source text), so tagging re-runs when they change. */
function rulesFingerprint() {
  const hash = crypto.createHash('sha1');
  if (fs.existsSync(MATCH_DIR)) for (const f of fs.readdirSync(MATCH_DIR).sort()) hash.update(f + fs.readFileSync(path.join(MATCH_DIR, f), 'utf8'));
  return hash.digest('hex');
}

/** Re-tags every published question of the chapters that have rules. Returns per-chapter coverage. */
async function tagAll({ rules = loadRules(), write = true } = {}) {
  const coverage = [];
  for (const [subject, chapters] of Object.entries(rules)) {
    for (const [topic, chapterRules] of Object.entries(chapters)) {
      const qs = await Question.find({ subject, topic }).select('_id subtopic stem.en pattern').lean();
      const ops = [];
      const counts = {};
      const untagged = [];
      for (const q of qs) {
        const key = classify(chapterRules, q);
        counts[key ?? '(none)'] = (counts[key ?? '(none)'] || 0) + 1;
        if (!key && untagged.length < 5) untagged.push(q.stem?.en?.slice(0, 120));
        if ((q.pattern ?? null) !== key) ops.push({ updateOne: { filter: { _id: q._id }, update: key ? { $set: { pattern: key } } : { $unset: { pattern: '' } } } });
      }
      if (write && ops.length) await Question.bulkWrite(ops, { ordered: false });
      coverage.push({ chapter: `${subject}.${topic}`, total: qs.length, tagged: qs.length - (counts['(none)'] || 0), counts, untaggedSamples: untagged, changed: ops.length });
    }
  }
  return coverage;
}

module.exports = { classify, checkRules, loadRules, rulesFingerprint, tagAll };
