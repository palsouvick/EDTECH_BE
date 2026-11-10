'use strict';

/**
 * Question-bank synchronisation status: the single place that reads and
 * writes the `seed_state/question_bank` record and mirrors it in memory.
 *
 * The database record is the durable truth (it survives Render's free-tier
 * sleep/wake restarts); the in-memory mirror exists so /healthz can answer
 * without a database round-trip and so a sync running in this process can
 * publish live progress. Every stamp goes through writeQuestionBankState(),
 * which updates both.
 *
 * Record shape (fields added in the versioning upgrade; the original
 * { perTopic, fingerprint, at, inserted } fields are kept untouched so older
 * code and existing production records keep working):
 *   question_bank_version  logical dataset version (src/db/questionBankVersion.js)
 *   source_fingerprint     same value as `fingerprint`, under a clearer name
 *   status                 idle | initializing | completed | failed
 *   total_questions        questions in the DB when the last sync completed
 *   last_started_at        when the current/last sync run began
 *   last_completed_at      when the last sync run finished successfully
 *   last_error             message of the last failed run, else null
 *   last_run               { inserted, updated, skipped, failed, protected } of the last run
 */

const mongoose = require('mongoose');
const { QUESTION_BANK_VERSION } = require('../db/questionBankVersion');

const STATE_ID = 'question_bank';
const STATUSES = ['idle', 'initializing', 'completed', 'failed'];

let memory = {
  status: 'idle',
  version: QUESTION_BANK_VERSION,
  source_fingerprint: null,
  total_questions: null,
  last_started_at: null,
  last_completed_at: null,
  last_error: null,
  last_run: null,
  progress: null,
};

const stateCollection = () => mongoose.connection.db.collection('seed_state');

function shape(doc, progress) {
  if (!doc) return { ...memory, progress: progress ?? memory.progress };
  const status = STATUSES.includes(doc.status)
    ? doc.status
    // Legacy records (written before status existed) with a fingerprint were
    // completed runs; one without any stamp is simply not initialized yet.
    : doc.fingerprint
      ? 'completed'
      : 'idle';
  return {
    status,
    version: doc.question_bank_version || null,
    source_fingerprint: doc.source_fingerprint || doc.fingerprint || null,
    total_questions: doc.total_questions ?? null,
    last_started_at: doc.last_started_at ?? null,
    last_completed_at: doc.last_completed_at ?? doc.at ?? null,
    last_error: doc.last_error ?? null,
    last_run: doc.last_run ?? (doc.inserted !== undefined ? { inserted: doc.inserted } : null),
    progress: progress ?? null,
  };
}

/** Merge a patch into the in-memory mirror (no database write). */
function noteQuestionBankState(patch) {
  memory = { ...memory, ...patch };
  return memory;
}

/** Stamp the durable record and the mirror together. */
async function writeQuestionBankState(patch) {
  noteQuestionBankState(patch);
  const set = { ...patch };
  // Keep the two names for the fingerprint in step for older readers.
  if (set.source_fingerprint && !set.fingerprint) set.fingerprint = set.source_fingerprint;
  if (set.fingerprint && !set.source_fingerprint) set.source_fingerprint = set.fingerprint;
  delete set.progress; // progress is process-local; a restarted process has none
  await stateCollection().updateOne({ _id: STATE_ID }, { $set: set }, { upsert: true });
  return memory;
}

async function readQuestionBankState() {
  if (mongoose.connection.readyState !== 1) return shape(null);
  const doc = await stateCollection().findOne({ _id: STATE_ID });
  const shaped = shape(doc, memory.progress);
  // A sync running in *this* process is fresher than the last durable stamp.
  if (memory.status === 'initializing') return { ...shaped, status: 'initializing', last_started_at: memory.last_started_at };
  return shaped;
}

/** Load the durable record into the mirror (startup, before listening). */
async function refreshQuestionBankMemory() {
  if (mongoose.connection.readyState !== 1) return memory;
  // Read the record directly, NOT through readQuestionBankState(): that
  // reader prefers the mirror's 'initializing' while a sync runs in this
  // process, and this refresh is exactly what settles the mirror back to the
  // durable truth when the chain ends — routing it through the preference
  // would copy 'initializing' back in and the status would never settle.
  const doc = await stateCollection().findOne({ _id: STATE_ID });
  memory = { ...shape(doc, memory.progress) };
  return memory;
}

function getQuestionBankMemory() {
  return memory;
}

/** Live progress of the run in this process: { percent, subject, done, total } or null. */
function noteSyncProgress(progress) {
  memory = { ...memory, progress };
}

function clearSyncProgress() {
  memory = { ...memory, progress: null };
}

const isInitialized = (s) => Boolean(s.last_completed_at) || (s.total_questions ?? 0) > 0;

/** Public shape: enough for a student-facing "bank is warming up" hint, nothing more. */
function presentPublicStatus(s) {
  return {
    status: s.status,
    version: s.version,
    total_questions: s.total_questions,
    last_completed_at: s.last_completed_at,
    is_initialized: isInitialized(s),
  };
}

/** Admin shape: everything, including run counters and the last error. */
function presentAdminStatus(s, { source_current } = {}) {
  return {
    ...presentPublicStatus(s),
    source_fingerprint: s.source_fingerprint,
    source_current: source_current ?? null,
    last_started_at: s.last_started_at,
    last_error: s.last_error,
    last_run: s.last_run,
    progress: s.progress ?? null,
  };
}

module.exports = {
  STATUSES,
  writeQuestionBankState,
  noteQuestionBankState,
  readQuestionBankState,
  refreshQuestionBankMemory,
  getQuestionBankMemory,
  noteSyncProgress,
  clearSyncProgress,
  presentPublicStatus,
  presentAdminStatus,
};
