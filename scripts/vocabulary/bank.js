'use strict';

/**
 * The Vocabulary Bank content in db/vocabulary/*.jsonl: loading, validation, the
 * publish rule, and Bengali-review priority. Used by the seed script (runtime, no
 * dictionary data needed), the lexicon checker and the tests.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { parseEntry, validateBatch, normalize } = require('../../src/services/vocabularyImport');
const CATEGORIES = require('../../db/vocabulary/categories');

const DIR = path.join(__dirname, '../../db/vocabulary');
const CHECKS_FILE = path.join(DIR, 'lexicon-checks.json');
const PYQ_DIR = path.join(__dirname, '../../db/pyq');

/** Raw entries with their file and line, in a stable order. */
function loadRawEntries() {
  const out = [];
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.jsonl')).sort()) {
    fs.readFileSync(path.join(DIR, file), 'utf8').split(/\r?\n/).forEach((line, i) => {
      if (!line.trim()) return;
      let raw;
      try {
        raw = JSON.parse(line);
      } catch {
        raw = null;
      }
      out.push({ file, line: i + 1, raw });
    });
  }
  return out;
}

// Every bank entry is original editorial content unless it cites an official paper.
const EDITORIAL_SOURCE = Object.freeze({ type: 'EDITORIAL', title: 'Original Vocabulary Bank entry, batch 1 (October 2026). Bengali text pending human review.' });
const withDefaults = (raw) => ({
  ...raw,
  examRelevance: raw.examRelevance ?? [{ basis: 'GENERAL' }],
  sources: raw.sources ?? [EDITORIAL_SOURCE],
});

/** Parsed entries plus every validation error (per entry and across the whole bank). */
function parseBank(rawEntries = loadRawEntries()) {
  const parsed = [];
  const errors = [];
  for (const { file, line, raw } of rawEntries) {
    const row = `${file}:${line}`;
    if (!raw) {
      errors.push({ row, field: 'line', code: 'INVALID_JSON', message: 'Not valid JSON' });
      continue;
    }
    const result = parseEntry(withDefaults(raw), row);
    if (result.errors.length) errors.push(...result.errors);
    else parsed.push({ row, raw, entry: result.entry });
  }
  errors.push(...validateBatch(parsed, { categories: Object.keys(CATEGORIES) }));
  return { parsed, errors };
}

/** The relation fields the lexicon checks depend on; their hash tells whether checks are stale. */
const checkInput = (raw) => ({
  word: raw.word, partOfSpeech: raw.partOfSpeech,
  synonyms: raw.synonyms || [], nearSynonyms: raw.nearSynonyms || [], antonyms: raw.antonyms || [],
});
const hash = (value) => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const checksInputHash = (rawEntries) => hash(rawEntries.filter((e) => e.raw).map((e) => checkInput(e.raw)));

function loadChecks() {
  return fs.existsSync(CHECKS_FILE) ? JSON.parse(fs.readFileSync(CHECKS_FILE, 'utf8')) : null;
}

/**
 * Synonym / antonym pairs fixed by official answer keys (db/pyq): e.g. Magnanimous ↔
 * Selfish (antonym) from WBPSC Clerkship 2023 Q12. Keyed by normalized word.
 */
function officialPairs() {
  const pairs = new Map();
  for (const file of fs.readdirSync(PYQ_DIR).filter((f) => f.endsWith('.json'))) {
    for (const q of JSON.parse(fs.readFileSync(path.join(PYQ_DIR, file), 'utf8'))) {
      if (q.topic_code !== 'synonyms_antonyms') continue;
      const text = q.content.en.question_text;
      const word = /'([A-Za-z-]+)'/.exec(text)?.[1];
      const answer = q.content.en.options.find((o) => o.id === q.correct_option_id)?.text;
      if (!word || !answer) continue;
      const type = /antonym|opposite/i.test(text) ? 'antonym' : 'synonym';
      const list = pairs.get(normalize(word)) || [];
      list.push({ type, answer: normalize(answer), examName: q.pyq.exam_name, year: q.pyq.year, questionNo: q.pyq.question_no, paperUrl: q.pyq.paper_url, answerKeyUrl: q.pyq.answer_key_url });
      pairs.set(normalize(word), list);
    }
  }
  return pairs;
}

/**
 * Whether an entry may be published, and which of its relations are confirmed.
 * Hard failures (never published): no lexicon check, a single word unknown to WordNet,
 * or a part of speech WordNet does not have for it. Unconfirmed synonyms or antonyms
 * are shown to students but never used as practice-test answer keys.
 */
function assess(entry, check, official = new Map()) {
  const failures = [];
  const warnings = [];
  if (!check) failures.push('NOT_CHECKED');
  else if (NOT_IN_WORDNET_POS.has(entry.part_of_speech)) {
    // WordNet covers nouns, verbs, adjectives and adverbs only: it cannot judge these.
    warnings.push('POS_NOT_COVERED_BY_WORDNET');
  } else if (entry.part_of_speech !== 'PHRASE') {
    if (!check.found) failures.push('NOT_IN_WORDNET');
    else if (!check.posMatch) failures.push(`POS_NOT_IN_WORDNET (WordNet has: ${check.poses.join(', ')})`);
  } else if (!check.found) warnings.push('PHRASE_NOT_IN_WORDNET');
  const pyq = official.get(entry.normalized_word) || [];
  const confirmedBy = (word, type, codes, map) => codes.includes(map?.[normalize(word)]) || pyq.some((p) => p.type === type && p.answer === normalize(word));
  const confirmedSynonyms = entry.synonyms.filter((w) => confirmedBy(w, 'synonym', ['SAME_SYNSET', 'RELATED'], check?.synonyms));
  const confirmedAntonyms = entry.antonyms.filter((w) => confirmedBy(w, 'antonym', ['DIRECT', 'INDIRECT'], check?.antonyms));
  const unconfirmed = [
    ...entry.synonyms.filter((w) => !confirmedSynonyms.includes(w)).map((w) => `synonym:${w}:${check?.synonyms?.[normalize(w)] ?? '?'}`),
    ...entry.antonyms.filter((w) => !confirmedAntonyms.includes(w)).map((w) => `antonym:${w}:${check?.antonyms?.[normalize(w)] ?? '?'}`),
  ];
  return { publish: failures.length === 0, failures, warnings, confirmedSynonyms, confirmedAntonyms, unconfirmed };
}

const NOT_IN_WORDNET_POS = new Set(['PREPOSITION', 'CONJUNCTION', 'INTERJECTION']);

/** Review order for Bengali meanings: official exam words, then commonly tested, then frequent words. */
function reviewPriority(entry, check) {
  let p = 0;
  if (entry.exam_relevance.some((r) => r.basis === 'PYQ_VERIFIED')) p += 1000;
  if (entry.categories.includes('common_exam')) p += 300;
  if (entry.categories.includes('advanced_exam')) p += 100;
  if (entry.difficulty === 'BEGINNER') p += 50;
  return p + Math.min(check?.frequency ?? 0, 200);
}

const contentHash = (raw) => hash(raw);

module.exports = {
  DIR, CHECKS_FILE, CATEGORIES,
  loadRawEntries, parseBank, checkInput, checksInputHash, loadChecks, officialPairs, assess, reviewPriority, contentHash,
};
