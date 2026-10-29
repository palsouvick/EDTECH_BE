'use strict';

const { z } = require('zod');
const { isOfficialSource } = require('./questionProvenance');

const DICTIONARY_HOSTS = [
  'oxfordlearnersdictionaries.com',
  'dictionary.cambridge.org',
  'merriam-webster.com',
  'collinsdictionary.com',
];
const slug = z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/);
const BENGALI = /[ঀ-৿]/u;
const term = z.string().trim().min(1).max(100);
const reference = z.object({
  type: z.enum(['DICTIONARY', 'OFFICIAL_PAPER', 'EDITORIAL']),
  title: z.string().trim().max(200).optional(),
  url: z.string().url().max(1024).refine((value) => value.startsWith('https://'), 'Source URLs must use HTTPS').optional(),
  examName: z.string().trim().min(2).max(120).optional(),
  year: z.number().int().min(1990).max(2100).optional(),
  questionCode: z.string().trim().min(1).max(100).optional(),
}).strict();

const entrySchema = z.object({
  word: z.string().trim().min(1).max(100),
  meaningBn: z.string().trim().min(1).max(300),
  definitionEn: z.string().trim().min(10).max(600),
  explanationBn: z.string().trim().max(1000).optional(),
  partOfSpeech: z.enum(['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION', 'PHRASE']),
  pronunciation: z.string().trim().max(100).optional(),
  // Close synonyms: usable in place of the word in its main sense.
  synonyms: z.array(term).max(20).default([]),
  // Similar meaning but not interchangeable in every context (shown separately).
  nearSynonyms: z.array(term).max(20).default([]),
  // Optional: many words have no true opposite, and none should be forced.
  antonyms: z.array(term).max(20).default([]),
  // Inflected forms the example may use instead of the headword ("gave up" for "give up").
  forms: z.array(term).max(10).default([]),
  // Words often confused with this one; each must be another entry in the bank.
  confusables: z.array(z.object({
    word: term,
    noteEn: z.string().trim().min(5).max(300),
    noteBn: z.string().trim().min(2).max(300),
  }).strict()).max(5).default([]),
  exampleEn: z.string().trim().min(10).max(500),
  exampleBn: z.string().trim().min(1).max(500),
  collocations: z.array(z.string().trim().min(1).max(120)).max(20).default([]),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  categories: z.array(slug).min(1).max(20),
  examRelevance: z.array(z.object({
    examCode: z.string().trim().toUpperCase().max(40).optional(),
    basis: z.enum(['PYQ_VERIFIED', 'CURRICULUM_RECOMMENDED', 'GENERAL']),
    references: z.array(reference).default([]),
  }).strict()).default([]),
  sources: z.array(reference).max(20).default([]),
  sourceStatus: z.enum(['UNVERIFIED', 'EDITORIAL_REVIEWED', 'DICTIONARY_CHECKED']).default('UNVERIFIED'),
}).strict();

const normalize = (value) => value.normalize('NFKC').trim().toLocaleLowerCase('en');
const tokens = (value) => normalize(value).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function parseEntry(input, row) {
  const parsed = entrySchema.safeParse(input);
  if (!parsed.success) {
    return {
      errors: parsed.error.issues.map((issue) => ({
        row,
        field: issue.path.join('.') || 'entry',
        code: issue.code,
        message: issue.message,
      })),
    };
  }
  const item = parsed.data;
  const errors = [];
  const synonyms = item.synonyms.map(normalize);
  const antonyms = item.antonyms.map(normalize);
  if (new Set(synonyms).size !== synonyms.length) {
    errors.push({ row, field: 'synonyms', code: 'DUPLICATE_SYNONYM', message: 'Synonyms must not repeat' });
  }
  if (new Set(antonyms).size !== antonyms.length) {
    errors.push({ row, field: 'antonyms', code: 'DUPLICATE_ANTONYM', message: 'Antonyms must not repeat' });
  }
  if (synonyms.some((value) => antonyms.includes(value))) {
    errors.push({ row, field: 'antonyms', code: 'SYNONYM_ANTONYM_CONFLICT', message: 'A word cannot be listed as both synonym and antonym' });
  }
  const near = item.nearSynonyms.map(normalize);
  if (new Set(near).size !== near.length) {
    errors.push({ row, field: 'nearSynonyms', code: 'DUPLICATE_NEAR_SYNONYM', message: 'Near synonyms must not repeat' });
  }
  if (near.some((value) => synonyms.includes(value) || antonyms.includes(value))) {
    errors.push({ row, field: 'nearSynonyms', code: 'RELATION_CONFLICT', message: 'A near synonym cannot also be a synonym or an antonym' });
  }
  const self = normalize(item.word);
  if ([...synonyms, ...near, ...antonyms].includes(self) || item.confusables.some((c) => normalize(c.word) === self)) {
    errors.push({ row, field: 'synonyms', code: 'SELF_REFERENCE', message: 'A word cannot be its own synonym, antonym or confusable' });
  }
  // Idioms often have no one-word equivalent; single words must be linked to something.
  if (item.partOfSpeech !== 'PHRASE' && !item.synonyms.length && !item.nearSynonyms.length && !item.antonyms.length && !item.confusables.length) {
    errors.push({ row, field: 'synonyms', code: 'NO_RELATIONS', message: 'Give at least one synonym, near synonym, antonym or confusable word' });
  }
  const shown = [item.word, ...item.forms];
  if (!shown.some((form) => new RegExp(`(?<![\\p{L}])${escapeRegex(form)}(?![\\p{L}])`, 'iu').test(item.exampleEn))) {
    errors.push({ row, field: 'exampleEn', code: 'EXAMPLE_MISSING_WORD', message: 'The example sentence must use the vocabulary word (or one of its listed forms)' });
  }
  for (const field of ['meaningBn', 'exampleBn', 'explanationBn']) {
    if (item[field] !== undefined && !BENGALI.test(item[field])) {
      errors.push({ row, field, code: 'BENGALI_TEXT_REQUIRED', message: `${field} must be written in Bengali` });
    }
  }
  for (const field of ['word', 'definitionEn', 'exampleEn']) {
    if (BENGALI.test(item[field])) errors.push({ row, field, code: 'ENGLISH_TEXT_REQUIRED', message: `${field} must be in English` });
  }
  if (item.sourceStatus === 'DICTIONARY_CHECKED' && !item.sources.some((source) => source.type === 'DICTIONARY' && source.url)) {
    errors.push({ row, field: 'sources', code: 'DICTIONARY_SOURCE_REQUIRED', message: 'Dictionary-checked entries require a dictionary source URL' });
  }
  if (item.sourceStatus !== 'UNVERIFIED') {
    errors.push({ row, field: 'sourceStatus', code: 'ADMIN_REVIEW_REQUIRED', message: 'Imported words must remain UNVERIFIED until reviewed by an administrator' });
  }
  if (item.sourceStatus === 'DICTIONARY_CHECKED' && item.sources.some((source) => (
    source.type === 'DICTIONARY'
    && source.url
    && (!source.url.startsWith('https://') || !isDictionarySource(source.url))
  ))) {
    errors.push({ row, field: 'sources', code: 'TRUSTED_DICTIONARY_SOURCE_REQUIRED', message: 'Use HTTPS from a supported dictionary publisher' });
  }
  for (const [index, relevance] of item.examRelevance.entries()) {
    if (relevance.basis !== 'PYQ_VERIFIED') continue;
    const validReference = relevance.references.some((source) => (
      source.type === 'OFFICIAL_PAPER'
      && source.examName
      && source.year
      && source.questionCode
      && isOfficialSource(source.url)
    ));
    if (!validReference) {
      errors.push({
        row,
        field: `examRelevance.${index}.references`,
        code: 'OFFICIAL_PYQ_EVIDENCE_REQUIRED',
        message: 'PYQ_VERIFIED requires an official HTTPS paper URL, exam, year, and question code',
      });
    }
  }
  if (errors.length) return { errors };
  const normalizedWord = normalize(item.word);
  return {
    entry: {
      word: item.word,
      normalized_word: normalizedWord,
      meaning_bn: item.meaningBn,
      meaning_bn_normalized: normalize(item.meaningBn),
      meaning_bn_tokens: tokens(item.meaningBn),
      definition_en: item.definitionEn,
      explanation_bn: item.explanationBn,
      part_of_speech: item.partOfSpeech,
      pronunciation: item.pronunciation,
      synonyms: item.synonyms,
      near_synonyms: item.nearSynonyms,
      antonyms: item.antonyms,
      forms: item.forms,
      confusables: item.confusables.map((c) => ({ word: c.word, note_en: c.noteEn, note_bn: c.noteBn })),
      example_en: item.exampleEn,
      example_bn: item.exampleBn,
      collocations: item.collocations,
      difficulty: item.difficulty,
      categories: item.categories,
      exam_relevance: item.examRelevance.map((relevance) => ({
        exam_code: relevance.examCode,
        basis: relevance.basis,
        references: relevance.references.map(toStoredReference),
      })),
      sources: item.sources.map(toStoredReference),
      source_status: item.sourceStatus,
    },
    errors: [],
  };
}

function isDictionarySource(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && DICTIONARY_HOSTS.some((host) => (
      parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)
    ));
  } catch {
    return false;
  }
}

function toStoredReference(source) {
  return {
    type: source.type,
    title: source.title,
    url: source.url,
    exam_name: source.examName,
    year: source.year,
    question_code: source.questionCode,
  };
}

function parseJsonl(buffer) {
  const text = buffer.toString('utf8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/);
  const entries = [];
  const entryRows = [];
  const errors = [];
  let nonEmpty = 0;
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].trim()) continue;
    nonEmpty += 1;
    if (nonEmpty > 1000) {
      errors.push({ row: i + 1, field: 'line', code: 'TOO_MANY_ROWS', message: 'A vocabulary import may contain at most 1000 words' });
      break;
    }
    try {
      entries.push(JSON.parse(lines[i]));
      entryRows.push(i + 1);
    } catch {
      errors.push({ row: i + 1, field: 'line', code: 'INVALID_JSON', message: 'Each non-empty line must contain one valid JSON object' });
    }
  }
  return { entries, entryRows, errors };
}

/**
 * Checks that need the whole set of entries: duplicate words, and confusable words
 * that point to no entry (broken references). `known` adds words already stored.
 * Returns [{ row, field, code, message }].
 */
function validateBatch(parsed, { known = [], categories } = {}) {
  const errors = [];
  const seen = new Map();
  for (const { entry, row } of parsed) {
    if (seen.has(entry.normalized_word)) {
      errors.push({ row, field: 'word', code: 'DUPLICATE_WORD', message: `"${entry.word}" already appears at row ${seen.get(entry.normalized_word)}` });
    } else seen.set(entry.normalized_word, row);
  }
  const all = new Set([...seen.keys(), ...known.map(normalize)]);
  for (const { entry, row } of parsed) {
    for (const c of entry.confusables || []) {
      if (!all.has(normalize(c.word))) {
        errors.push({ row, field: 'confusables', code: 'BROKEN_REFERENCE', message: `Confusable "${c.word}" is not an entry in the bank` });
      }
    }
    if (categories) {
      for (const category of entry.categories) {
        if (!categories.includes(category)) errors.push({ row, field: 'categories', code: 'UNKNOWN_CATEGORY', message: `Unknown category "${category}"` });
      }
    }
  }
  return errors;
}

module.exports = { entrySchema, parseEntry, parseJsonl, validateBatch, normalize, tokens, isDictionarySource };
