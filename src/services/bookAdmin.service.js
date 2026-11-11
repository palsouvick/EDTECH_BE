'use strict';

/**
 * Admin Console → Books: every chapter of every study book with its check status, and Publish / Unpublish.
 * A decision is stored in book_chapter_state and overrides the chapter file's `status` (books.setOverrides).
 * The chapter's questions follow at once (scripts/seedBooks.js re-run), so students see the change immediately;
 * other server instances pick it up within REFRESH_MS.
 */

const { BookChapterState, Question } = require('../models');
const books = require('./books');
const AppError = require('../utils/AppError');

const REFRESH_MS = 60 * 1000;
let loadedAt = 0;
let loading = null;

/** Loads all admin decisions into the book service. */
async function refreshStates() {
  const rows = await BookChapterState.find().select('book code status').lean();
  books.setOverrides(new Map(rows.map((r) => [`${r.book}:${r.code}`, r.status])));
  loadedAt = Date.now();
  return rows.length;
}

/** Refreshes the decisions when they are more than a minute old (cheap: one small collection). */
async function ensureFresh() {
  if (Date.now() - loadedAt < REFRESH_MS) return;
  loading ||= refreshStates().finally(() => {
    loading = null;
  });
  await loading;
}

async function listChapters() {
  await refreshStates();
  const states = new Map((await BookChapterState.find().lean()).map((s) => [`${s.book}:${s.code}`, s]));
  const out = [];
  const errors = [];
  for (const name of Object.keys(books.BOOKS)) {
    const book = books.loadBook(name, { fresh: true });
    errors.push(...book.errors.map((e) => ({ book: name, file: e.file, problem: `${e.field} ${e.code}: ${e.message}` })));
    const counts = await Question.aggregate([
      { $match: { authored_by: 'book_library', code: { $regex: `^BK-${books.BOOKS[name].prefix}-` } } },
      { $group: { _id: { chapter: { $substrCP: ['$code', 3, 6] }, status: '$status' }, n: { $sum: 1 } } },
    ]);
    const qByChapter = {};
    for (const c of counts) (qByChapter[c._id.chapter] ||= {})[c._id.status] = c.n;
    for (const t of book.toc.CHAPTERS) {
      const ch = book.chapters.get(t.code);
      const state = states.get(`${name}:${t.code}`);
      out.push({
        book: name,
        code: t.code,
        number: t.number,
        part: t.part,
        title: ch?.title || t.title,
        written: Boolean(ch),
        fileStatus: ch?.status ?? null,
        status: ch ? books.effectiveStatus(ch) : null,
        published: ch ? books.isPublished(ch) : false,
        verification: ch ? { status: ch.verification.status, checkedAt: ch.verification.checked_at || null, notes: ch.verification.notes || '' } : null,
        canPublish: Boolean(ch) && ch.verification.status === 'VERIFIED',
        sections: ch?.sections.length ?? 0,
        questions: ch?.questions.length ?? 0,
        questionsLive: qByChapter[t.code]?.PUBLISHED ?? 0,
        pyqsTaught: ch ? books.taughtPyqs(book, t.code).length : 0,
        decision: state ? { status: state.status, by: state.set_by, at: state.set_at } : null,
        history: state?.history?.slice(-10).reverse() ?? [],
      });
    }
  }
  // Chapter files that fail the validator are left out of the book; they are listed so the admin sees why.
  return { chapters: out, errors };
}

/** Publishes or unpublishes one chapter and moves its questions with it. */
async function setStatus(book, code, status, adminEmail) {
  const loaded = books.loadBook(book, { fresh: true });
  const ch = loaded?.chapters.get(code);
  if (!ch) throw AppError.notFound('CHAPTER_NOT_FOUND', 'This chapter has not been written yet (or its file is invalid)');
  if (status === 'PUBLISHED' && ch.verification.status !== 'VERIFIED') {
    throw AppError.unprocessable('NOT_VERIFIED', `This chapter is ${ch.verification.status}: it can be published only after its independent check marks it VERIFIED`);
  }
  const at = new Date();
  await BookChapterState.updateOne(
    { book, code },
    { $set: { status, set_by: adminEmail, set_at: at }, $push: { history: { $each: [{ status, by: adminEmail, at }], $slice: -50 } } },
    { upsert: true },
  );
  await refreshStates();
  const { ensureBooks } = require('../../scripts/seedBooks');
  const seeded = await ensureBooks({ log: () => {} });
  const live = await Question.countDocuments({ code: { $regex: `^BK-${code}-Q` }, status: 'PUBLISHED' });
  return { book, code, status, published: books.isPublished(ch), questionsLive: live, clashes: seeded.clashes };
}

module.exports = { refreshStates, ensureFresh, listChapters, setStatus, REFRESH_MS };
