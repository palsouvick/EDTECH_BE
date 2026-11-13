'use strict';

/**
 * Loads the practice questions of the study-book chapters (db/books/<book>/*.json) into the ordinary
 * question bank (subject gs), so practice, the mistake book and revision work with them. Idempotent.
 *
 *   node --env-file-if-exists=.env scripts/seedBooks.js            # apply
 *   node --env-file-if-exists=.env scripts/seedBooks.js --dry-run  # validate and report only
 *
 * Rules:
 *  - Each question has a stable code (BK-HIS-02-Q01), so a corrected question is updated in place and keeps its
 *    id, attempts and bookmarks. A question an admin edited (version > 1) keeps its content.
 *  - Questions are PUBLISHED only when their chapter is PUBLISHED (and VERIFIED); otherwise they are DRAFT and
 *    never reach students outside the admin preview.
 *  - A question removed from a chapter file is ARCHIVED, never deleted.
 *  - Bengali only: stems, options and explanations have no English text.
 *  - Every question is ORIGINAL_PRACTICE. Real PYQs are linked through pyq_map.json, never copied.
 */

const crypto = require('node:crypto');
const mongoose = require('mongoose');
const { Question } = require('../src/models');
const { newOptionId } = require('../src/models/Question');
const { questionDuplicateKeys } = require('../src/utils/questionDuplicateKeys');
const books = require('../src/services/books');
const { targetsFor } = require('./seedGkFacts');

const AUTHOR = 'book_library';
const DIFFICULTY = { basic: 2, moderate: 3, difficult: 4, exam: 4 };
const sha = (v) => crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');

function questionDoc(book, ch, q) {
  const code = books.questionCode(ch.code, q.id);
  const options = [q.a, ...q.w].map((text) => ({ oid: newOptionId(), text: { bn: text } }));
  const src = ch.sources.find((s) => s.id === ch.claims.find((c) => q.claims.includes(c.id))?.source) || ch.sources[0];
  const published = books.isPublished(ch);
  return {
    code,
    exam_targets: targetsFor(book.meta.topic),
    subject: 'gs',
    topic: book.meta.topic,
    subtopic: ch.subtopics[0],
    concept_tags: ['book', books.chapterTag(ch.code), books.sectionTag(ch.code, q.section), `level:${q.level}`],
    difficulty: DIFFICULTY[q.level],
    expected_time_sec: q.format === 'DIRECT' ? 40 : 80,
    stem: { bn: q.q },
    options,
    correct_option_id: options[0].oid,
    solution: { steps: [{ bn: q.e }, { bn: `সূত্র: [${src.title}](${src.url})` }], traps: [] },
    status: published ? 'PUBLISHED' : 'DRAFT',
    provenance: 'ORIGINAL_PRACTICE',
    question_format: q.format,
    source_check: published
      ? { status: 'SOURCE_VERIFIED', source_url: src.url, source_title: src.title, checked_at: new Date(`${ch.verification.checked_at || '2026-11-11'}T00:00:00Z`), checked_by: AUTHOR }
      : { status: 'SOURCE_PENDING', checked_by: AUTHOR, note: 'Book chapter awaiting review' },
    import_fingerprint: sha({ code, q, sources: src.url }),
    version: 1,
    authored_by: AUTHOR,
  };
}

async function ensureBooks({ dryRun = false, log = console.log } = {}) {
  const stats = { chapters: 0, published: 0, draft: 0, invalid: 0, questions: 0, inserted: 0, updated: 0, retired: 0, protected: 0, clashes: [] };
  for (const name of Object.keys(books.BOOKS)) {
    const book = books.loadBook(name, { fresh: true });
    if (!book) continue; // a book whose folder is not there yet
    for (const e of book.errors.slice(0, 30)) log(`book ${name}: ${e.file} ${e.field} ${e.code}: ${e.message}`);
    stats.invalid += new Set(book.errors.map((e) => e.file)).size;
    for (const ch of book.chapters.values()) {
      stats.chapters += 1;
      if (books.isPublished(ch)) stats.published += 1;
      else stats.draft += 1;
      const codes = [];
      for (const q of ch.questions) {
        stats.questions += 1;
        const body = questionDoc(book, ch, q);
        codes.push(body.code);
        if (dryRun) continue;
        const existing = await Question.findOne({ code: body.code }).select('+import_fingerprint version status').lean();
        if (existing) {
          if (existing.version > 1) {
            stats.protected += 1;
            continue;
          }
          const set = { status: body.status, source_check: body.source_check, exam_targets: body.exam_targets, subtopic: body.subtopic, concept_tags: body.concept_tags };
          if (existing.import_fingerprint !== body.import_fingerprint) {
            Object.assign(set, { stem: body.stem, options: body.options, correct_option_id: body.correct_option_id, solution: body.solution, difficulty: body.difficulty, question_format: body.question_format, expected_time_sec: body.expected_time_sec, import_fingerprint: body.import_fingerprint, duplicate_keys: questionDuplicateKeys(body.stem), lang_set: 'bn' });
            stats.updated += 1;
          }
          await Question.updateOne({ _id: existing._id }, { $set: set }, { runValidators: true });
          continue;
        }
        const clash = await Question.findOne({ duplicate_keys: { $in: questionDuplicateKeys(body.stem) } }).select('code').lean();
        if (clash) {
          stats.clashes.push(`${body.code} repeats ${clash.code}`);
          continue;
        }
        await Question.create(body);
        stats.inserted += 1;
      }
      if (!dryRun) {
        const r = await Question.updateMany(
          { authored_by: AUTHOR, concept_tags: books.chapterTag(ch.code), code: { $nin: codes }, status: { $ne: 'ARCHIVED' } },
          { $set: { status: 'ARCHIVED', retired_reason: 'Removed from the book chapter' } },
        );
        stats.retired += r.modifiedCount;
      }
    }
  }
  return stats;
}

/** Changes when any chapter file or PYQ map changes. */
function booksFingerprint() {
  return Object.keys(books.BOOKS).map((b) => books.loadBook(b, { fresh: true })?.fingerprint ?? 'none').join(':');
}

module.exports = { ensureBooks, booksFingerprint, questionDoc, AUTHOR };

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  (async () => {
    if (!dryRun) await mongoose.connect(process.env.MONGODB_URI);
    const s = await ensureBooks({ dryRun });
    console.log(JSON.stringify(s, null, 2));
    if (!dryRun) await mongoose.disconnect();
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
