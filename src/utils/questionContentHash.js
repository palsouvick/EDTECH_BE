'use strict';

const crypto = require('node:crypto');

/**
 * A stable hash of a question's *content* — everything a source file or a
 * generator defines about the question, and nothing the database adds later
 * (stats, admin review state, timestamps). Two documents with the same hash
 * are the same question content, so the seed sync can tell "already imported"
 * apart from "the source changed this question" without storing anything.
 *
 * Used as the import_fingerprint for file-imported questions
 * (src/db/seedData.js). The admin bulk importer keeps its own fingerprint
 * scheme (src/services/questionBulkImport.service.js); the two never mix,
 * because bulk-import codes derive from that service's fingerprint.
 */

// Fields that define the question as authored. Order here does not matter;
// canonicalisation sorts object keys.
const QUESTION_CONTENT_FIELDS = [
  'code',
  'exam_targets',
  'subject',
  'topic',
  'subtopic',
  'concept_tags',
  'difficulty',
  'stem',
  'media',
  'options',
  'correct_option_id',
  'solution',
  'pyq',
  'provenance',
  'source_reference',
  'source_year',
  'question_format',
  'expected_time_sec',
];

// Content fields plus the values pre('validate') derives from them. An update
// writes exactly these, so runtime state (stats, status, source_check,
// reviewed_by, fact_ids, pattern tags, version) is never touched by a sync.
const QUESTION_SYNC_FIELDS = [...QUESTION_CONTENT_FIELDS, 'lang_set', 'duplicate_keys', 'import_fingerprint'];

function canonicalise(value) {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if (typeof value.toHexString === 'function') return value.toHexString(); // ObjectId
    if (Array.isArray(value)) return value.map(canonicalise);
    const out = {};
    for (const key of Object.keys(value).sort()) {
      if (key === '_id' || key === '__v') continue;
      const v = canonicalise(value[key]);
      if (v !== null || key === 'subtopic') out[key] = v;
    }
    return out;
  }
  return value;
}

function questionContentHash(doc) {
  const picked = {};
  for (const field of QUESTION_CONTENT_FIELDS) {
    if (doc[field] !== undefined) picked[field] = doc[field];
  }
  return crypto.createHash('sha256').update(JSON.stringify(canonicalise(picked))).digest('hex');
}

module.exports = { QUESTION_CONTENT_FIELDS, QUESTION_SYNC_FIELDS, questionContentHash };
