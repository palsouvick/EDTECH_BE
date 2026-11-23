'use strict';

/**
 * "My course": a student's own PDFs (purchased course material), private to that student.
 * Upload -> stored on disk -> a worker process reads every page (text layer or local OCR) and
 * builds chapter sections -> the student reads the original pages, chapter by chapter, searches
 * across all their PDFs, and fixes any section the automatic split got wrong.
 *
 * One worker runs at a time (OCR is CPU-heavy); queued files wait their turn and resume after
 * a server restart.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { fork } = require('node:child_process');
const config = require('../config');
const { CourseFile, CoursePage, CourseSection, CoursePageMark } = require('../models');
const { topicName, subjectName } = require('./catalogNames');
const AppError = require('../utils/AppError');

const WORKER = path.join(__dirname, '../../scripts/courseWorker.js');
const SUBJECTS = ['quant', 'english', 'gs', 'reasoning'];
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const userDir = (userId) => path.join(config.course.storageDir, userId);

// ------------------------------------------------------------------ queue

let running = null; // file id being processed
let disabled = false; // tests: never fork

function setWorkerEnabled(on) {
  disabled = !on;
}

async function pump() {
  if (running || disabled) return;
  const next = await CourseFile.findOne({ status: 'queued' }).sort({ created_at: 1 }).select('_id').lean();
  if (!next) return;
  running = String(next._id);
  // The token lets this worker claim the file; no second worker can start on it meanwhile.
  const token = crypto.randomUUID();
  await CourseFile.updateOne({ _id: next._id }, { $set: { status: 'processing', worker_token: token } });
  const child = fork(WORKER, [running, token], { execArgv: ['--max-old-space-size=6144'], stdio: 'inherit' });
  child.on('exit', async (code) => {
    if (code !== 0) await CourseFile.updateOne({ _id: running, status: 'processing' }, { $set: { status: 'failed', error: `worker exited with code ${code}` } }).catch(() => {});
    running = null;
    pump().catch((e) => console.error('[course] queue:', e.message));
  });
}

/**
 * After a restart: files whose worker stopped go back to the queue (they resume where they
 * stopped). A file whose worker is still reporting is left alone.
 */
async function resumeQueue() {
  const stale = new Date(Date.now() - 90_000);
  await CourseFile.updateMany({ status: 'processing', $or: [{ heartbeat_at: null }, { heartbeat_at: { $lt: stale } }] }, { $set: { status: 'queued', heartbeat_at: null } });
  await pump();
}

// ------------------------------------------------------------------ presenters

const sectionName = (s) => (s.topic ? topicName(s.subject, s.topic) : { en: s.label || 'Other', bn: s.label || 'অন্যান্য' });

/** Pages the student has read, per file: Map(fileId -> Set(page)). */
async function readPagesByFile(userId, fileIds) {
  const rows = await CoursePageMark.find({ user_id: userId, file_id: { $in: fileIds }, read: true }).select('file_id page').lean();
  const out = new Map();
  for (const r of rows) {
    const k = String(r.file_id);
    if (!out.has(k)) out.set(k, new Set());
    out.get(k).add(r.page);
  }
  return out;
}

const countIn = (set, from, to) => {
  let n = 0;
  if (set) for (const p of set) if (p >= from && p <= to) n += 1;
  return n;
};

function presentSection(s, read = null) {
  return {
    readPages: countIn(read, s.from, s.to),
    id: String(s._id),
    subject: s.subject,
    topic: s.topic,
    name: sectionName(s),
    label: s.label,
    from: s.from,
    to: s.to,
    pages: s.to - s.from + 1,
    source: s.source,
    confidence: s.confidence,
  };
}

/**
 * Why a file failed, as a code the page can explain in the student's language. The raw message
 * (which can name server paths and packages) stays in the database and the server log only.
 */
function failReason(f) {
  if (f.status !== 'failed') return null;
  const msg = f.error || '';
  if (/password/i.test(msg)) return 'password';
  if (/invalid pdf|corrupt|xref|formaterror|unexpected end/i.test(msg)) return 'damaged';
  return 'server';
}

function presentFile(f, sections = null, read = null) {
  return {
    readPages: read?.size ?? 0,
    id: String(f._id),
    title: f.title,
    fileName: f.original_name,
    sizeMb: Math.round((f.size / 1048576) * 10) / 10,
    pages: f.pages,
    subject: f.subject,
    subjectName: f.subject ? subjectName(f.subject) : null,
    kind: f.kind,
    status: f.status,
    progress: f.progress,
    ocrAvailable: f.ocr_available,
    failReason: failReason(f),
    lastPage: f.last_page,
    createdAt: f.created_at,
    ...(sections && { sections: sections.map((x) => presentSection(x, read)) }),
  };
}

async function ownFile(userId, id) {
  const f = await CourseFile.findOne({ _id: id, user_id: userId });
  if (!f) throw AppError.notFound('COURSE_FILE_NOT_FOUND', 'File not found');
  return f;
}

// ------------------------------------------------------------------ files

/** Move a file; across drives (EXDEV) rename cannot work, so copy and delete instead. */
function moveFile(from, to, { rename = fs.renameSync } = {}) {
  try {
    rename(from, to);
  } catch (err) {
    if (err.code !== 'EXDEV') throw err;
    fs.copyFileSync(from, to);
    fs.rmSync(from, { force: true });
  }
}

function hashFile(file) {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash('sha256');
    fs.createReadStream(file).on('data', (d) => h.update(d)).on('error', reject).on('end', () => resolve(h.digest('hex')));
  });
}

/**
 * A new upload (multer has written it to a temp path): move it into the student's folder and queue it.
 * The same PDF again (same bytes, any file name, e.g. "test (1).pdf") is not stored or read twice:
 * the answer is 409 DUPLICATE_PDF with the copy already there.
 */
async function addFile(userId, upload) {
  if (!upload) throw AppError.badRequest('Choose a PDF file');
  const head = Buffer.alloc(5);
  const fd = fs.openSync(upload.path, 'r');
  fs.readSync(fd, head, 0, 5, 0);
  fs.closeSync(fd);
  if (head.toString('latin1') !== '%PDF-') {
    fs.rmSync(upload.path, { force: true });
    throw AppError.unprocessable('NOT_A_PDF', 'Only PDF files can be added');
  }
  const contentHash = await hashFile(upload.path);
  const same = await CourseFile.findOne({ user_id: userId, content_hash: contentHash }).lean();
  if (same) {
    fs.rmSync(upload.path, { force: true });
    throw new AppError(409, 'DUPLICATE_PDF', `This PDF is already in your course as "${same.title}"`, { fileId: String(same._id), title: same.title, status: same.status });
  }
  const stored = `${crypto.randomUUID()}.pdf`;
  fs.mkdirSync(userDir(userId), { recursive: true });
  moveFile(upload.path, path.join(userDir(userId), stored));
  // Browsers send the name as latin1; restore UTF-8 (Bengali file names).
  const original = Buffer.from(upload.originalname, 'latin1').toString('utf8');
  const f = await CourseFile.create({
    user_id: userId,
    title: original.replace(/\.pdf$/i, '').replace(/[_]+/g, ' ').trim().slice(0, 200) || 'Course PDF',
    original_name: original.slice(0, 300),
    stored_name: stored,
    size: upload.size,
    content_hash: contentHash,
  });
  pump().catch((e) => console.error('[course] queue:', e.message));
  return presentFile(f.toObject(), []);
}

async function listFiles(userId) {
  const files = await CourseFile.find({ user_id: userId }).sort({ created_at: -1 }).lean();
  const sections = await CourseSection.find({ user_id: userId }).sort({ from: 1 }).lean();
  const byFile = new Map();
  for (const s of sections) byFile.set(String(s.file_id), [...(byFile.get(String(s.file_id)) || []), s]);
  const read = await readPagesByFile(userId, files.map((f) => f._id));
  return { files: files.map((f) => presentFile(f, byFile.get(String(f._id)) || [], read.get(String(f._id)))) };
}

async function getFile(userId, id) {
  const f = await ownFile(userId, id);
  const [sections, marks] = await Promise.all([
    CourseSection.find({ file_id: f._id }).sort({ from: 1 }).lean(),
    CoursePageMark.find({ user_id: userId, file_id: f._id }).select('page read bookmarked note').lean(),
  ]);
  const read = new Set(marks.filter((m) => m.read).map((m) => m.page));
  return {
    ...presentFile(f.toObject(), sections, read),
    // The reader needs which pages are read and which carry a ⭐ or a note.
    readList: [...read].sort((a, b) => a - b),
    marks: marks.filter((m) => m.bookmarked || m.note).map((m) => ({ page: m.page, bookmarked: m.bookmarked, note: m.note })).sort((a, b) => a.page - b.page),
  };
}

// ------------------------------------------------------------------ the student's marks

/** Mark one page: read (after a few seconds on it), ⭐ bookmark, and/or a note. */
async function markPage(userId, id, page, { read, bookmarked, note }) {
  const f = await ownFile(userId, id);
  if (!(page >= 1 && page <= (f.pages || page))) throw AppError.unprocessable('BAD_PAGE_RANGE', `Pages must be within 1-${f.pages}`);
  const set = {};
  if (read !== undefined) Object.assign(set, { read, read_at: read ? new Date() : null });
  if (bookmarked !== undefined) set.bookmarked = bookmarked;
  if (note !== undefined) set.note = note.trim().slice(0, 1000);
  const m = await CoursePageMark.findOneAndUpdate({ user_id: userId, file_id: f._id, page }, { $set: set }, { upsert: true, new: true }).lean();
  return { page: m.page, read: m.read, bookmarked: m.bookmarked, note: m.note };
}

/** "Chapter done" (or undo): mark every page in from..to read or not read. */
async function markRange(userId, id, { from, to, read = true }) {
  const f = await ownFile(userId, id);
  checkRange(f, from, to);
  const now = new Date();
  const ops = [];
  for (let page = from; page <= to; page += 1) {
    ops.push({ updateOne: { filter: { user_id: userId, file_id: f._id, page }, update: { $set: { read, read_at: read ? now : null } }, upsert: true } });
  }
  await CoursePageMark.bulkWrite(ops, { ordered: false });
  return getFile(userId, id);
}

/** Every ⭐ page and note across the student's PDFs, newest first, with the chapter it is in. */
async function bookmarks(userId, { limit = 100 } = {}) {
  const marks = await CoursePageMark.find({ user_id: userId, $or: [{ bookmarked: true }, { note: { $ne: '' } }] }).sort({ updated_at: -1 }).limit(limit).lean();
  if (!marks.length) return { items: [] };
  const fileIds = [...new Set(marks.map((m) => String(m.file_id)))];
  const [files, sections] = await Promise.all([
    CourseFile.find({ _id: { $in: fileIds }, user_id: userId }).select('title').lean(),
    CourseSection.find({ file_id: { $in: fileIds } }).lean(),
  ]);
  const title = new Map(files.map((f) => [String(f._id), f.title]));
  return {
    items: marks.filter((m) => title.has(String(m.file_id))).map((m) => {
      const sec = sections.find((x) => String(x.file_id) === String(m.file_id) && m.page >= x.from && m.page <= x.to);
      return { fileId: String(m.file_id), fileTitle: title.get(String(m.file_id)), page: m.page, bookmarked: m.bookmarked, note: m.note, chapter: sec ? sectionName(sec) : null, updatedAt: m.updated_at };
    }),
  };
}

/** Absolute path of the stored PDF, for streaming (express handles Range requests). */
async function pdfPath(userId, id) {
  const f = await ownFile(userId, id);
  return path.join(userDir(userId), f.stored_name);
}

async function setLastPage(userId, id, page) {
  const f = await ownFile(userId, id);
  f.last_page = Math.max(1, Math.min(page, f.pages || page));
  await f.save();
  return { lastPage: f.last_page };
}

async function renameFile(userId, id, title) {
  const f = await ownFile(userId, id);
  f.title = title;
  await f.save();
  return getFile(userId, id);
}

/**
 * Rebuild the chapters (pages already read are kept, so this is quick), or with reread: true read
 * every page again (slow; for after an OCR improvement).
 */
async function reprocess(userId, id, { keepManual = true, reread = false } = {}) {
  const f = await ownFile(userId, id);
  if (f.status === 'processing') throw AppError.conflict('COURSE_FILE_BUSY', 'This file is being read right now');
  if (!keepManual) await CourseSection.deleteMany({ file_id: f._id });
  if (reread) await CoursePage.deleteMany({ file_id: f._id });
  f.set({ status: 'queued', error: null, progress: { done: 0, total: f.pages } });
  await f.save();
  pump().catch((e) => console.error('[course] queue:', e.message));
  return getFile(userId, id);
}

async function deleteFile(userId, id) {
  const f = await ownFile(userId, id);
  if (running === String(f._id)) throw AppError.conflict('COURSE_FILE_BUSY', 'This file is being read right now; delete it when it finishes');
  await Promise.all([CoursePage.deleteMany({ file_id: f._id }), CourseSection.deleteMany({ file_id: f._id }), CoursePageMark.deleteMany({ file_id: f._id }), CourseFile.deleteOne({ _id: f._id })]);
  fs.rmSync(path.join(userDir(userId), f.stored_name), { force: true });
  return { deleted: true };
}

// ------------------------------------------------------------------ sections (the student's fixes)

function checkRange(f, from, to) {
  if (!(from >= 1 && to >= from && to <= f.pages)) throw AppError.unprocessable('BAD_PAGE_RANGE', `Pages must be within 1-${f.pages}`);
}

function checkTopic(subject, topic) {
  if (subject && !SUBJECTS.includes(subject)) throw AppError.unprocessable('BAD_SUBJECT', 'Unknown subject');
  // Known chapters have a Bengali name in the catalogue; unknown ones fall back to the bare slug.
  if (topic && !topicName(subject, topic).bn) throw AppError.unprocessable('BAD_TOPIC', 'Unknown chapter');
}

/** Add a section (also used to split one: the overlapping part of the old one is trimmed). */
async function addSection(userId, fileId, { subject, topic, label, from, to }) {
  const f = await ownFile(userId, fileId);
  checkRange(f, from, to);
  checkTopic(subject, topic);
  await carve(f._id, from, to);
  await CourseSection.create({ user_id: userId, file_id: f._id, subject: subject ?? f.subject, topic: topic ?? null, label: label ?? null, from, to, source: 'manual', confidence: 1 });
  await CourseSection.updateMany({ file_id: f._id }, { $set: { source: 'manual' } }); // the whole split is now the student's
  return getFile(userId, fileId);
}

async function updateSection(userId, sectionId, { subject, topic, label, from, to }) {
  const s = await CourseSection.findOne({ _id: sectionId, user_id: userId });
  if (!s) throw AppError.notFound('COURSE_SECTION_NOT_FOUND', 'Section not found');
  const f = await ownFile(userId, s.file_id);
  const nf = from ?? s.from;
  const nt = to ?? s.to;
  checkRange(f, nf, nt);
  if (subject !== undefined || topic !== undefined) checkTopic(subject ?? s.subject, topic ?? s.topic);
  if (nf !== s.from || nt !== s.to) await carve(f._id, nf, nt, s._id);
  s.set({ ...(subject !== undefined && { subject }), ...(topic !== undefined && { topic }), ...(label !== undefined && { label }), from: nf, to: nt, source: 'manual', confidence: 1 });
  await s.save();
  await CourseSection.updateMany({ file_id: f._id }, { $set: { source: 'manual' } });
  return getFile(userId, String(f._id));
}

async function deleteSection(userId, sectionId) {
  const s = await CourseSection.findOne({ _id: sectionId, user_id: userId });
  if (!s) throw AppError.notFound('COURSE_SECTION_NOT_FOUND', 'Section not found');
  await s.deleteOne();
  await CourseSection.updateMany({ file_id: s.file_id }, { $set: { source: 'manual' } });
  return getFile(userId, String(s.file_id));
}

/** Make room for pages from..to: trim, split or remove the other sections that overlap them. */
async function carve(fileId, from, to, exceptId = null) {
  const others = await CourseSection.find({ file_id: fileId, ...(exceptId && { _id: { $ne: exceptId } }), from: { $lte: to }, to: { $gte: from } });
  for (const o of others) {
    if (o.from < from && o.to > to) {
      // The new range sits inside: keep the left part, add the right part.
      await CourseSection.create({ ...o.toObject(), _id: undefined, from: to + 1, created_at: undefined, updated_at: undefined });
      o.to = from - 1;
      await o.save();
    } else if (o.from < from) {
      o.to = from - 1;
      await o.save();
    } else if (o.to > to) {
      o.from = to + 1;
      await o.save();
    } else {
      await o.deleteOne();
    }
  }
}

// ------------------------------------------------------------------ search and chapters

/** Search all of a student's PDFs; hits come back as file + page + a snippet around the match. */
async function search(userId, q, { limit = 30 } = {}) {
  const term = q.normalize('NFC').trim();
  if (term.length < 2) return { query: term, hits: [] };
  const re = new RegExp(escapeRegex(term), 'i');
  const rows = await CoursePage.find({ user_id: userId, text: re }).select('file_id page text').sort({ file_id: 1, page: 1 }).limit(limit).lean();
  const files = new Map((await CourseFile.find({ _id: { $in: [...new Set(rows.map((r) => String(r.file_id)))] }, user_id: userId }).select('title').lean()).map((f) => [String(f._id), f.title]));
  return {
    query: term,
    hits: rows.map((r) => {
      const i = r.text.search(re);
      const start = Math.max(0, i - 60);
      return { fileId: String(r.file_id), fileTitle: files.get(String(r.file_id)) ?? '', page: r.page, snippet: `${start > 0 ? '…' : ''}${r.text.slice(start, i + term.length + 80)}…` };
    }),
  };
}

/** Chapters a section can be assigned to, per subject (for the "fix this section" picker). */
function chapterChoices() {
  const out = {};
  for (const c of require('../../db/seed/catalog')) {
    for (const sb of c.subjects) {
      if (!SUBJECTS.includes(sb.code)) continue;
      out[sb.code] ||= { name: sb.name, topics: [] };
      for (const t of sb.topics) if (!out[sb.code].topics.some((x) => x.topic === t.code)) out[sb.code].topics.push({ topic: t.code, name: t.name });
    }
  }
  return { subjects: out };
}

/** A chapter's parts across all of the student's PDFs ("From your course" on the chapter page). */
async function sectionsForTopic(userId, subject, topic) {
  const sections = await CourseSection.find({ user_id: userId, subject, topic }).sort({ file_id: 1, from: 1 }).lean();
  if (!sections.length) return { sections: [] };
  const files = new Map((await CourseFile.find({ _id: { $in: sections.map((s) => s.file_id) }, user_id: userId }).select('title last_page').lean()).map((f) => [String(f._id), f]));
  const read = await readPagesByFile(userId, [...files.keys()]);
  return {
    sections: sections.filter((s) => files.has(String(s.file_id))).map((s) => ({ ...presentSection(s, read.get(String(s.file_id))), fileId: String(s.file_id), fileTitle: files.get(String(s.file_id)).title })),
  };
}

module.exports = {
  markPage, markRange, bookmarks, moveFile, addFile, listFiles, getFile, pdfPath, setLastPage, renameFile, reprocess, deleteFile,
  addSection, updateSection, deleteSection, search, sectionsForTopic, chapterChoices, resumeQueue, setWorkerEnabled, pump, failReason,
};
