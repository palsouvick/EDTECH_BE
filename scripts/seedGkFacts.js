'use strict';

/**
 * Loads the GK fact library (db/gk/*.jsonl) into gk_facts, and each fact's
 * questions into the ordinary question bank (subject gs). Idempotent.
 *
 *   node --env-file-if-exists=.env scripts/seedGkFacts.js            # apply
 *   node --env-file-if-exists=.env scripts/seedGkFacts.js --dry-run  # validate and report only
 *
 * Rules:
 *  - The whole library must pass src/services/gkFacts.validate.js; otherwise nothing is written.
 *  - Only VERIFIED facts (and their questions) are PUBLISHED. NEEDS_REVIEW / UNVERIFIED facts are
 *    loaded as DRAFT for the admin review queue and never reach students.
 *  - Questions are ORIGINAL_PRACTICE, never PYQs. Their source_check follows the fact.
 *  - A new question whose stem repeats an existing question is not inserted; it is reported.
 *  - linked_existing stems are matched to existing GS questions by duplicate key. Those questions
 *    get the fact link, and SOURCE_VERIFIED only when the fact is VERIFIED. A source check an admin
 *    set by hand is never overwritten.
 *  - A fact or question an administrator has edited (admin_edited / version > 1) keeps its content.
 *  - When a fact's content changes in the file, its Bengali review goes back to PENDING.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');
const { GkFact, Question } = require('../src/models');
const { validateLibrary } = require('../src/services/gkFacts.validate');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');
const { newOptionId } = require('../src/models/Question');
const catalog = require('../db/seed/catalog');

const DIR = path.join(__dirname, '../db/gk');
const AUTHOR = 'gk_library';
const MAIN_TIER = { SSC: 'TIER_1', BANK: 'PRELIMS', WBPSC: 'PRELIMS', WB_POST: 'SINGLE' };

const sha = (v) => crypto.createHash('sha256').update(typeof v === 'string' ? v : JSON.stringify(v)).digest('hex');
const pair = ([en, bn]) => ({ en, bn });
const day = (s) => (s ? new Date(`${s}T00:00:00Z`) : null);

/** Raw records with their file and line, for error messages. */
function loadRecords(dir = DIR) {
  if (!fs.existsSync(dir)) return { records: [], parseErrors: [] };
  const records = [];
  const parseErrors = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.jsonl')).sort()) {
    const lines = fs.readFileSync(path.join(dir, file), 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      if (!line.trim()) return;
      try {
        records.push({ ...JSON.parse(line), __row: `${file}:${i + 1}` });
      } catch (e) {
        parseErrors.push({ row: `${file}:${i + 1}`, field: 'line', code: 'INVALID_JSON', message: e.message });
      }
    });
  }
  return { records, parseErrors };
}

/** Exam categories whose catalogue has this GS chapter (same rule as the question generator). */
function targetsFor(topic) {
  return catalog
    .filter((c) => c.subjects.some((s) => s.code === 'gs' && s.topics.some((t) => t.code === topic)))
    .map((c) => ({ category: c.code, tier: MAIN_TIER[c.code] }));
}

function factDoc(rec, { origin = 'GK_LIBRARY', by = AUTHOR } = {}) {
  const status = rec.verification.status === 'VERIFIED' ? 'PUBLISHED' : 'DRAFT';
  return {
    code: rec.code,
    topic: rec.topic,
    subtopic: rec.subtopic,
    tags: rec.tags || [],
    fact_kind: rec.fact_kind,
    title: rec.title,
    statement: rec.statement,
    explanation: rec.explanation,
    milestones: rec.milestones || [],
    dates: {
      event_date: day(rec.dates?.event_date),
      valid_from: day(rec.dates?.valid_from),
      valid_to: day(rec.dates?.valid_to),
      review_by: day(rec.dates?.review_by),
    },
    reference_year: rec.reference_year ?? null,
    difficulty: rec.difficulty,
    exam_relevance: rec.exam_relevance || [],
    sources: (rec.sources || []).map((s) => ({ ...s, accessed_at: day(s.accessed_at) })),
    verification: {
      status: rec.verification.status,
      method: rec.verification.method ?? null,
      verified_at: day(rec.verification.verified_at),
      verified_by: rec.verification.status === 'VERIFIED' ? by : null,
      notes: rec.verification.notes ?? '',
    },
    status,
    origin,
    ...(origin === 'ADMIN' && { admin_edited: true }),
  };
}

/** The fact's own source check, copied onto every question that tests it. */
function sourceCheckFor(fact, by = AUTHOR) {
  const src = (fact.sources || []).find((s) => s.quote && ['OFFICIAL', 'INSTITUTIONAL'].includes(s.publisher_type)) || fact.sources?.[0];
  if (fact.verification.status === 'VERIFIED') {
    return { status: 'SOURCE_VERIFIED', source_url: src.url, source_title: src.title, checked_at: fact.verification.verified_at, checked_by: by };
  }
  return { status: fact.verification.status === 'NEEDS_REVIEW' ? 'NEEDS_REVIEW' : 'SOURCE_PENDING', checked_by: by, note: fact.verification.notes || undefined };
}

function questionDoc(fact, q, index, factId, by = AUTHOR) {
  const code = `GKQ-${fact.code.slice(3)}-${index + 1}`;
  const options = [q.a, ...q.w].map((o) => ({ oid: newOptionId(), text: pair(o) }));
  const src = fact.sources.find((s) => s.quote) || fact.sources[0];
  const steps = [pair(q.e)];
  if (src) steps.push({ en: `Source: [${src.title}](${src.url})`, bn: `সূত্র: [${src.title}](${src.url})` });
  return {
    code,
    exam_targets: targetsFor(fact.topic),
    subject: 'gs',
    topic: fact.topic,
    subtopic: fact.subtopic,
    concept_tags: [...new Set(['gk_library', ...(fact.tags || [])])],
    difficulty: q.d,
    expected_time_sec: q.format === 'DIRECT' ? 35 : 75,
    stem: pair(q.q),
    options,
    correct_option_id: options[0].oid,
    solution: { steps, traps: [] },
    status: fact.status,
    provenance: 'ORIGINAL_PRACTICE',
    question_format: q.format,
    source_check: sourceCheckFor(fact, by),
    fact_ids: [factId],
    review_by: fact.dates.review_by || undefined,
    import_fingerprint: sha({ code, q }),
    version: 1,
    authored_by: by === AUTHOR ? AUTHOR : `admin:${by}`,
  };
}

async function ensureGkLibrary({ dryRun = false, log = console.log, dir = DIR } = {}) {
  const { records, parseErrors } = loadRecords(dir);
  const { errors } = validateLibrary(records);
  const all = [...parseErrors, ...errors];
  if (all.length) {
    for (const e of all.slice(0, 30)) log(`gk library: ${e.row} ${e.factCode ?? ''} ${e.field} ${e.code}: ${e.message}`);
    throw new Error(`GK library has ${all.length} validation error(s); nothing was imported`);
  }
  if (dryRun) {
    const stats = { facts: records.length, published: 0, draft: 0, questions: 0 };
    stats.published = records.filter((r) => r.verification.status === 'VERIFIED').length;
    stats.draft = records.length - stats.published;
    stats.questions = records.reduce((a, r) => a + (r.questions || []).length, 0);
    return stats;
  }
  return applyRecords(records);
}

/**
 * Writes validated records: facts, their questions, links to existing questions.
 * `origin: 'ADMIN'` (admin import) marks the facts admin-edited so the library seed
 * never overwrites them, and records the admin as the verifier.
 */
async function applyRecords(records, { origin = 'GK_LIBRARY', by = AUTHOR } = {}) {
  const stats = { facts: records.length, published: 0, draft: 0, inserted: 0, updated: 0, protected: 0, questions: 0, questionsInserted: 0, duplicates: [], linked: 0, unmatchedLinks: [] };
  for (const rec of records) {
    const { __row, questions = [], linked_existing: links = [], ...content } = rec;
    const doc = factDoc(rec, { origin, by });
    const hash = sha(content);
    let fact = await GkFact.findOne({ code: rec.code });
    if (!fact) {
      fact = await GkFact.create({ ...doc, content_hash: hash });
      stats.inserted += 1;
    } else if (fact.admin_edited) {
      stats.protected += 1;
    } else if (fact.content_hash !== hash) {
      fact.set({ ...doc, content_hash: hash, version: fact.version + 1, bengali_review: { status: 'PENDING', reviewed_by: null, reviewed_at: null } });
      await fact.save();
      stats.updated += 1;
    }
    const current = fact.toObject();
    if (current.status === 'PUBLISHED') stats.published += 1;
    else stats.draft += 1;

    // The fact's own questions.
    const ids = [];
    for (const [i, q] of questions.entries()) {
      stats.questions += 1;
      const body = questionDoc(current, q, i, current._id, by);
      const existing = await Question.findOne({ code: body.code }).select('+import_fingerprint version status').lean();
      if (existing) {
        ids.push(existing._id);
        if (existing.version > 1) continue; // edited by an admin: content stays as they left it
        const set = { status: body.status, source_check: body.source_check, exam_targets: body.exam_targets, subtopic: body.subtopic, review_by: body.review_by, fact_ids: [current._id] };
        if (existing.import_fingerprint !== body.import_fingerprint) {
          Object.assign(set, { stem: body.stem, options: body.options, correct_option_id: body.correct_option_id, solution: body.solution, difficulty: body.difficulty, question_format: body.question_format, expected_time_sec: body.expected_time_sec, import_fingerprint: body.import_fingerprint, duplicate_keys: questionDuplicateKeys(body.stem) });
        }
        await Question.updateOne({ _id: existing._id }, { $set: set }, { runValidators: true });
        continue;
      }
      const clash = await Question.findOne({ duplicate_keys: { $in: questionDuplicateKeys(body.stem) } }).select('code').lean();
      if (clash) {
        stats.duplicates.push(`${body.code} repeats ${clash.code}`);
        continue;
      }
      const created = await Question.create(body);
      ids.push(created._id);
      stats.questionsInserted += 1;
    }

    // Existing questions this fact proves.
    for (const stem of links) {
      const keys = questionDuplicateKeys({ en: stem });
      const matches = await Question.find({ subject: 'gs', duplicate_keys: { $in: keys }, authored_by: { $ne: AUTHOR } }).select('source_check').lean();
      if (!matches.length) {
        stats.unmatchedLinks.push(`${rec.code}: ${stem.slice(0, 80)}`);
        continue;
      }
      for (const m of matches) {
        ids.push(m._id);
        const set = {};
        const manual = m.source_check?.status && m.source_check.checked_by && m.source_check.checked_by !== AUTHOR && origin === 'GK_LIBRARY';
        if (!manual) set.source_check = current.verification.status === 'VERIFIED' ? sourceCheckFor(current, by) : { status: 'SOURCE_PENDING' };
        await Question.updateOne({ _id: m._id }, { $addToSet: { fact_ids: current._id }, ...(Object.keys(set).length && { $set: set }) });
        stats.linked += 1;
      }
    }
    await GkFact.updateOne({ _id: current._id }, { $set: { question_ids: [...new Map(ids.map((id) => [String(id), id])).values()] } });
  }
  return stats;
}

/** Content fingerprint of the library files, so server start skips an unchanged library. */
function libraryFingerprint(dir = DIR) {
  const hash = crypto.createHash('sha1');
  if (!fs.existsSync(dir)) return hash.digest('hex');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.jsonl')).sort()) hash.update(`${f}:${sha(fs.readFileSync(path.join(dir, f)))};`);
  return hash.digest('hex');
}

module.exports = { ensureGkLibrary, applyRecords, loadRecords, libraryFingerprint, targetsFor, sourceCheckFor, AUTHOR };

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  const dirIndex = process.argv.indexOf('--dir');
  const inputDir = dirIndex === -1 ? DIR : path.resolve(process.cwd(), process.argv[dirIndex + 1] || '');
  (async () => {
    if (dirIndex !== -1 && (!process.argv[dirIndex + 1] || process.argv[dirIndex + 1].startsWith('--'))) {
      throw new Error('--dir requires a directory path');
    }
    if (dirIndex !== -1 && !dryRun) {
      throw new Error('--dir is only allowed with --dry-run; imported facts must come from db/gk');
    }
    if (!dryRun) await mongoose.connect(process.env.MONGODB_URI);
    const s = await ensureGkLibrary({ dryRun, dir: inputDir });
    console.log(JSON.stringify(s, null, 2));
  })()
    .catch((e) => {
      console.error(e.message);
      process.exitCode = 1;
    })
    .finally(() => mongoose.disconnect());
}
