'use strict';

/**
 * "My course" worker: reads every page of one uploaded PDF, then builds its chapter sections.
 * Runs as a child process (node scripts/courseWorker.js <fileId> [token]) so rendering and OCR
 * never block the web server. No AI and no network: the PDF's own text layer when it is usable,
 * otherwise the page is rendered (pdf.js) and read by Tesseract OCR on this machine.
 *
 * Reliable:  one worker per file (claimed with a heartbeat), and pages already read are not read
 *            again after a restart (resume).
 * Quick:     after a few OCR pages, handwriting (OCR gives junk) is recognised and the rest of the
 *            file is not OCR'd; its chapter then comes from the file name.
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFile } = require('node:child_process');
const mongoose = require('mongoose');
const config = require('../src/config');
const { CourseFile, CoursePage, CourseSection } = require('../src/models');
const C = require('../src/services/courseClassify.logic');

const MAX_TEXT = 8000; // characters kept per page (search + classification)
const RENDER_SCALE = 2; // ~150 dpi for an A4 page: enough for OCR, small enough to be quick
const STALE_MS = 90_000; // a worker that has not reported for this long is gone
const QUALITY_SAMPLE = 6; // OCR pages judged before deciding a file is handwritten
const HANDWRITTEN_BELOW = 0.35; // median OCR quality below this: stop OCR, use the file name

/** Text layer is unusable when it is mostly "?" / replacement characters (fonts without a Unicode map). */
function brokenText(s) {
  const chars = s.replace(/\s/g, '');
  if (chars.length < 50) return true;
  const bad = (chars.match(/[?�]/g) || []).length;
  return bad / chars.length > 0.15;
}

function ocrAvailable() {
  try {
    return fs.existsSync(config.course.tesseractPath) && fs.existsSync(path.join(config.course.tessdataDir, 'eng.traineddata'));
  } catch {
    return false;
  }
}

// One thread per Tesseract process: several run in parallel, and without the limit each one
// grabs every core and they slow each other down.
function ocr(png, lang) {
  return new Promise((resolve) => {
    execFile(config.course.tesseractPath, [png, '-', '-l', lang, '--tessdata-dir', config.course.tessdataDir, '--psm', '3'], { maxBuffer: 8 * 1024 * 1024, windowsHide: true, env: { ...process.env, OMP_THREAD_LIMIT: '1' } }, (err, stdout) => resolve(err ? '' : String(stdout)));
  });
}

/**
 * Claim the file: only one worker reads a file at a time. A worker started by the queue brings the
 * token the queue wrote; anyone else may take over only a file whose worker stopped reporting.
 */
async function claim(fileId, token) {
  const stale = new Date(Date.now() - STALE_MS);
  return CourseFile.findOneAndUpdate(
    { _id: fileId, $or: [{ heartbeat_at: null }, { heartbeat_at: { $lt: stale } }, ...(token ? [{ worker_token: token }] : [])] },
    { $set: { heartbeat_at: new Date(), worker_token: token || crypto.randomUUID() } },
    { new: true },
  );
}

/** (Re)build a file's chapter sections from its stored page texts, and mark it ready. */
async function buildFileSections(file, total) {
  const pages = await CoursePage.find({ file_id: file._id }).select('page text topic method').sort({ page: 1 }).lean();
  const subject = C.subjectOf(file.original_name, pages.map((p) => p.topic));
  const sections = C.buildSections(pages, { fileName: file.original_name, subject });
  // The student's own fixes stay; automatic sections are rebuilt only when there are none.
  const manual = await CourseSection.countDocuments({ file_id: file._id, source: 'manual' });
  if (!manual) {
    await CourseSection.deleteMany({ file_id: file._id });
    await CourseSection.insertMany(sections.map((s) => ({
      user_id: file.user_id,
      file_id: file._id,
      subject: s.key ? s.key.split('/')[0] : subject,
      topic: s.key ? s.key.split('/')[1] : null,
      label: s.label ?? (s.alsoNamed?.length ? `+ ${s.alsoNamed.map((k) => k.split('/')[1]).join(', ')}` : null),
      from: s.from,
      to: s.to,
      source: s.source,
      confidence: s.confidence,
    })));
  }
  const count = (m) => pages.filter((p) => p.method === m).length;
  const readable = pages.filter((p) => p.text.length >= 200).length;
  const kind = count('text') >= total * 0.7 ? 'text' : count('skipped') > 0 || readable < total * 0.3 ? 'handwritten' : count('text') > 0 ? 'mixed' : 'scanned';
  await CourseFile.updateOne({ _id: file._id }, { $set: { status: 'ready', subject, kind, processed_at: new Date(), progress: { done: total, total }, heartbeat_at: null } });
}

async function run(fileId, { connect = true, ocr: allowOcr = true, token = null } = {}) {
  if (connect) await mongoose.connect(config.mongoUri);
  if (!(await CourseFile.exists({ _id: fileId }))) throw new Error(`course file ${fileId} not found`);
  const file = await claim(fileId, token);
  if (!file) {
    console.log(`[courseWorker] ${fileId} is being read by another worker; not starting a second one`);
    return { skipped: 'busy' };
  }
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const { createCanvas } = require('@napi-rs/canvas');

  const pdfPath = path.join(config.course.storageDir, file.user_id, file.stored_name);
  const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(pdfPath)), disableFontFace: true, verbosity: 0, isEvalSupported: false }).promise;
  const total = doc.numPages;
  const canOcr = allowOcr && ocrAvailable();
  const guess = C.subjectOf(file.original_name);
  const lang = guess === 'english' ? 'eng' : fs.existsSync(path.join(config.course.tessdataDir, 'ben.traineddata')) ? 'ben+eng' : 'eng';

  // Resume: pages already read (before a restart) are not read again.
  const already = await CoursePage.find({ file_id: file._id }).select('page method quality').lean();
  const have = new Set(already.map((x) => x.page));
  const qualities = already.filter((x) => x.method === 'ocr' && x.quality != null).map((x) => x.quality);
  let skipOcr = already.some((x) => x.method === 'skipped');
  let done = have.size;
  file.set({ status: 'processing', pages: total, progress: { done, total }, ocr_available: canOcr, error: null });
  await file.save();

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'course-'));
  const todo = Array.from({ length: total }, (_, i) => i + 1).filter((n) => !have.has(n));
  let at = 0;

  /** After a few OCR pages: is this handwriting (or a scan OCR cannot read)? Then stop OCR. */
  function judge() {
    if (skipOcr || qualities.length < QUALITY_SAMPLE) return;
    const sorted = [...qualities].sort((x, y) => x - y);
    if (sorted[Math.floor(sorted.length / 2)] < HANDWRITTEN_BELOW) skipOcr = true;
  }

  async function readPage(n) {
    const page = await doc.getPage(n);
    let text = '';
    let method = 'none';
    let quality = null;
    const layer = (await page.getTextContent()).items.map((i) => i.str).join(' ');
    if (!brokenText(layer)) {
      text = layer;
      method = 'text';
    } else if (canOcr && skipOcr) {
      method = 'skipped';
    } else if (canOcr) {
      const vp = page.getViewport({ scale: RENDER_SCALE });
      const canvas = createCanvas(vp.width, vp.height);
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
      const png = path.join(tmp, `p${n}.png`);
      fs.writeFileSync(png, canvas.toBuffer('image/png'));
      text = await ocr(png, lang);
      fs.rmSync(png, { force: true });
      method = text.trim() ? 'ocr' : 'none';
      quality = C.textQuality(text, lang);
      if (quality != null) {
        qualities.push(quality);
        judge();
      }
    }
    page.cleanup();
    text = text.replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT);
    const scores = C.scorePage(text, guess);
    await CoursePage.updateOne(
      { file_id: file._id, page: n },
      { $set: { user_id: file.user_id, text, method, quality, topic: C.pageLabel(scores), score: scores[0]?.score ?? 0 } },
      { upsert: true },
    );
    done += 1;
    // $max: parallel pages can finish their writes out of order. The heartbeat keeps the claim.
    if (done % 3 === 0 || done === total) await CourseFile.updateOne({ _id: file._id }, { $max: { 'progress.done': done }, $set: { heartbeat_at: new Date() } });
  }

  // A small pool: OCR is the slow part and runs as separate Tesseract processes.
  const workers = Array.from({ length: Math.max(1, config.course.ocrConcurrency) }, async () => {
    while (at < todo.length) {
      const n = todo[at];
      at += 1;
      await readPage(n);
    }
  });
  await Promise.all(workers);
  fs.rmSync(tmp, { recursive: true, force: true });
  await buildFileSections(file, total);
  return { pages: total, read: todo.length, handwritten: skipOcr };
}

if (require.main === module) {
  const [fileId, token] = process.argv.slice(2);
  run(fileId, { token })
    .then(() => mongoose.disconnect())
    .catch(async (err) => {
      console.error('[courseWorker]', err);
      try {
        await CourseFile.updateOne({ _id: fileId }, { $set: { status: 'failed', error: String(err.message || err).slice(0, 300), heartbeat_at: null } });
      } catch {}
      await mongoose.disconnect().catch(() => {});
      process.exitCode = 1;
    });
}

module.exports = { run, buildFileSections, brokenText, STALE_MS };
