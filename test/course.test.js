'use strict';

/**
 * "My course": a student's own PDFs. Classifier (pure), upload -> worker -> sections on a real
 * text PDF (OCR off), the student's section fixes, search, chapter-page lookup, privacy, and
 * streaming the original PDF with Range requests.
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const storage = fs.mkdtempSync(path.join(os.tmpdir(), 'course-store-'));
process.env.COURSE_STORAGE_DIR = storage;

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createApp } = require('../src/app');
const { CourseFile, CoursePage, CourseSection, CoursePageMark } = require('../src/models');
const course = require('../src/services/course.service');
const C = require('../src/services/courseClassify.logic');
const { run, brokenText } = require('../scripts/courseWorker');
const statsBuffer = require('../src/services/questionStats.buffer');

/** A small valid PDF: one page per text, Helvetica, so pdf.js finds a text layer. */
function makePdf(pageTexts) {
  const objs = [];
  const add = (s) => objs.push(s) && objs.length;
  const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const pagesId = objs.length + 1 + pageTexts.length * 2;
  const kids = [];
  for (const text of pageTexts) {
    const lines = text.match(/.{1,80}(\s|$)/g) || [text];
    const stream = `BT /F1 11 Tf 40 780 Td 14 TL ${lines.map((l) => `(${l.replace(/[()\\]/g, '')}) Tj T*`).join(' ')} ET`;
    const content = add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
    kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R >> >> /Contents ${content} 0 R >>`));
  }
  add(`<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`);
  const catalog = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  let out = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((o, i) => {
    offsets.push(Buffer.byteLength(out));
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('')}`;
  out += `trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(out, 'latin1');
}

const PL = 'A trader sells at a profit. Cost price and selling price, marked price and discount. Find the profit and loss percent. ';
const TSD = 'A train runs at 72 km/hr and crosses a platform. Speed of the boat in still water and the stream. Distance and speed. ';
const INTRO = 'Preface. This book is written for students. Contents and acknowledgements follow. ';

let mongod;
let server;
let root;
const api = async (method, p, { body, user = 'stu_a', headers = {}, raw = false } = {}) => {
  const res = await fetch(root + p, { method, headers: { ...(user && { 'x-user-id': user }), ...(body && !(body instanceof FormData) && { 'content-type': 'application/json' }), ...headers }, body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined });
  return raw ? res : { status: res.status, body: await res.json() };
};
const uploadPdf = (buf, name, user = 'stu_a') => {
  const form = new FormData();
  form.append('file', new Blob([buf], { type: 'application/pdf' }), name);
  return api('POST', '/course/files', { body: form, user });
};

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('course_test'));
  await Promise.all([CourseFile.init(), CoursePage.init(), CourseSection.init(), CoursePageMark.init()]);
  course.setWorkerEnabled(false); // the worker runs in-process below, without OCR
  server = createApp().listen(0);
  root = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
  fs.rmSync(storage, { recursive: true, force: true });
});

// ------------------------------------------------------------------ classifier

test('classifier: Bengali and English pages score their chapter; unclear pages say nothing', () => {
  assert.equal(C.pageLabel(C.scorePage('একজন ব্যবসায়ী ক্রয়মূল্য ও বিক্রয়মূল্য ধার্যমূল্য, লাভ কত? ছাড় দেওয়ার পর ক্ষতি', 'quant')), 'quant/profit_loss');
  assert.equal(C.pageLabel(C.scorePage('একটি ট্রেন 72 কিমি/ঘন্টা গতিবেগে একটি প্ল্যাটফর্ম অতিক্রম করে। নৌকা ও স্রোতের বেগ', 'quant')), 'quant/time_speed_distance', 'ঘন্টা and ঘণ্টা both count');
  assert.equal(C.pageLabel(C.scorePage('দুটি নল একটি চৌবাচ্চা 12 মিনিটে পূর্ণ করতে পারে, তৃতীয় নলটি খালি করতে পারে', 'quant')), 'quant/pipes_cistern');
  assert.equal(C.pageLabel(C.scorePage('short')), null);
  assert.equal(C.pageLabel(C.scorePage('profit and loss with cost price and selling price, a train at some speed and km/hr', 'quant')), null, 'two chapters close together: no label');
});

test('classifier: chapters and subject from file names, including decomposed Bengali', () => {
  assert.deepEqual(C.topicsInName('নল_ও_চৌবাচ্চা_সুবীর_দাস_solve.pdf'), ['quant/pipes_cistern']);
  assert.deepEqual(C.topicsInName('অংশীদারী_কারবার_সময়_ও_দূরত্ব.pdf'.normalize('NFD')), ['quant/partnership', 'quant/time_speed_distance']);
  assert.deepEqual(C.topicsInName('Current_Affairs_2025 Jan to Dec.pdf'), ['gs/current_affairs']);
  assert.equal(C.subjectOf('Mathematics book by Subir Das.pdf'), 'quant');
  assert.equal(C.subjectOf('English-Pk de sarkar-2.pdf'), 'english');
});

test('classifier: continuous runs become sections; stray pages and the front matter merge', () => {
  const pages = [
    ...Array.from({ length: 3 }, (_, i) => ({ page: i + 1, text: INTRO.repeat(4) })),
    ...Array.from({ length: 8 }, (_, i) => ({ page: i + 4, text: (i === 3 ? TSD : PL).repeat(3) })), // one stray TSD page inside P&L
    ...Array.from({ length: 6 }, (_, i) => ({ page: i + 12, text: TSD.repeat(3) })),
  ];
  const s = C.buildSections(pages, { fileName: 'Mathematics book.pdf', subject: 'quant' });
  assert.deepEqual(s.map((x) => [x.key, x.from, x.to]), [['quant/profit_loss', 1, 11], ['quant/time_speed_distance', 12, 17]]);
  assert.ok(s[0].confidence > 0.5 && s[0].confidence < 1);
});

test('classifier: unreadable pages (handwritten) fall back to the chapters in the file name', () => {
  const pages = Array.from({ length: 10 }, (_, i) => ({ page: i + 1, text: 'i A Aa ATA ROY' }));
  const [s] = C.buildSections(pages, { fileName: 'অংশীদারী_কারবার_সময়_ও_দূরত্ব.pdf' });
  assert.deepEqual([s.key, s.from, s.to, s.source, s.alsoNamed], ['quant/partnership', 1, 10, 'filename', ['quant/time_speed_distance']]);
  assert.equal(brokenText('? ?? ??? ?? Q86 ? ? ?? ????? ??? ? ?? ? ???? ?? ? ?? ??? ?? ?? ?????'), true, 'a text layer of "?" is not used');
});

test('contents page: entries parsed, titles mapped, the page-number shift found, chapters exact', () => {
  const entries = C.parseToc(['Contents 1. Profit and Loss 10-29 2. Speed and Distance 30-49 3. Geometry theorems 50-60 Part II 10-60']);
  assert.deepEqual(entries.map((e) => [e.name, e.start, e.end]), [['Profit and Loss', 10, 29], ['Speed and Distance', 30, 49], ['Geometry theorems', 50, 60]], 'the part heading that contains them is dropped');
  assert.equal(C.titleKey('সমকোণী চৌপল বা আয়তঘন', 'quant'), 'quant/mensuration', '"কোণ" inside সমকোণী is not geometry');
  assert.equal(C.titleKey('বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য', 'quant'), null);
  assert.equal(C.titleKey('ট্রেন-সংক্রান্ত সময় ও দূরত্ব', 'quant'), 'quant/time_speed_distance');
  assert.deepEqual(C.parseToc(['A question page: find the value of 4-11 here']), [], 'one range on a page is not a contents page');

  // Printed page 10 is PDF page 15 (k = +5); some pages inside each chapter say nothing.
  const text = (p) => {
    if (p === 2) return `${INTRO} Contents 1. Profit and Loss 10-29 2. Speed and Distance 30-49 3. Geometry theorems 50-60 4. Mock test papers 61-65`;
    if (p >= 15 && p <= 34) return p % 4 === 0 ? INTRO.repeat(3) : PL.repeat(3);
    if (p >= 35 && p <= 54) return p % 4 === 0 ? INTRO.repeat(3) : TSD.repeat(3);
    return INTRO.repeat(3);
  };
  const pages = Array.from({ length: 70 }, (_, i) => ({ page: i + 1, text: text(i + 1) }));
  const raw = pages.map((p) => C.pageLabel(C.scorePage(p.text, 'quant')));
  assert.equal(C.alignToc(entries, raw, 'quant').k, 5);
  const s = C.buildSections(pages, { fileName: 'Mathematics book.pdf', subject: 'quant' });
  const toc = s.filter((x) => x.source === 'toc').map((x) => [x.key, x.label, x.from, x.to]);
  assert.deepEqual(toc, [['quant/profit_loss', null, 15, 34], ['quant/time_speed_distance', null, 35, 54], [null, 'Geometry theorems', 55, 65], [null, 'Mock test papers', 66, 70]]);
});

test('OCR quality tells handwriting from print', () => {
  assert.ok(C.textQuality('i A Aa, 0 ATA S 2 কল AeA 1 ROY CORTE ওনার Het ROW Coat aay PTO PY RECT BE aoe PRO GO HOOP AYA Ah BR') < 0.35);
  assert.ok(C.textQuality('কোনো সংখ্যা 17 দ্বারা বিভাজ্য কিনা বোঝার জন্য সংখ্যাটির একক স্থানীয় অঙ্ককে 5 দিয়ে বিয়োগ করতে হবে উত্তরটি 17 দ্বারা বিভাজ্য হলে প্রদত্ত সংখ্যাটি বিভাজ্য হবে') > 0.8);
  assert.ok(C.textQuality('FAITH in, with Have faith in God. He broke faith with me. FAITHFUL to The dog is faithful to its master and the people', 'eng') > 0.6);
  assert.equal(C.textQuality('too short'), null);
});

test('moving an upload across drives (EXDEV) falls back to copy + delete', () => {
  const from = path.join(storage, 'exdev-src.bin');
  const to = path.join(storage, 'exdev-dst.bin');
  fs.writeFileSync(from, 'pdf bytes');
  const crossDrive = () => {
    throw Object.assign(new Error('cross-device link not permitted'), { code: 'EXDEV' });
  };
  course.moveFile(from, to, { rename: crossDrive });
  assert.equal(fs.readFileSync(to, 'utf8'), 'pdf bytes');
  assert.equal(fs.existsSync(from), false);
  assert.throws(() => course.moveFile(to, to, { rename: () => { throw Object.assign(new Error('denied'), { code: 'EPERM' }); } }), /denied/, 'other errors are not hidden');
  fs.rmSync(to, { force: true });
});

// ------------------------------------------------------------------ upload -> worker -> sections

let fileId;

test('upload: only signed-in students, only real PDFs; the file is queued privately', async () => {
  assert.equal((await uploadPdf(makePdf(['x']), 'a.pdf', null)).status, 401);
  assert.equal((await uploadPdf(Buffer.from('not a pdf at all'), 'fake.pdf')).status, 422);
  const pdf = makePdf([INTRO.repeat(3), ...Array(6).fill(PL.repeat(3)), ...Array(5).fill(TSD.repeat(3))]);
  const r = await uploadPdf(pdf, 'Mathematics notes.pdf');
  assert.equal(r.status, 201);
  assert.equal(r.body.data.status, 'queued');
  fileId = r.body.data.id;
  const stored = await CourseFile.findById(fileId).lean();
  assert.ok(fs.existsSync(path.join(storage, 'stu_a', stored.stored_name)));
  assert.equal((await api('GET', `/course/files/${fileId}`, { user: 'stu_b' })).status, 404, 'another student cannot see it');
});

test('duplicate: the same PDF under another name is not stored or read again; another student may add it', async () => {
  const pdf = makePdf([INTRO.repeat(3), ...Array(6).fill(PL.repeat(3)), ...Array(5).fill(TSD.repeat(3))]);
  const files = await fs.promises.readdir(path.join(storage, 'stu_a'));
  const again = await uploadPdf(pdf, 'Mathematics notes (1).pdf');
  assert.equal(again.status, 409);
  assert.equal(again.body.error.code, 'DUPLICATE_PDF');
  assert.deepEqual(again.body.error.details, { fileId, title: 'Mathematics notes', status: 'queued' });
  assert.deepEqual(await fs.promises.readdir(path.join(storage, 'stu_a')), files, 'nothing new stored');
  assert.equal(await CourseFile.countDocuments({ user_id: 'stu_a' }), 1);
  const other = await uploadPdf(pdf, 'mine.pdf', 'stu_c');
  assert.equal(other.status, 201, 'duplicates are per student');
  await api('DELETE', `/course/files/${other.body.data.id}`, { user: 'stu_c' });
});

test('worker: reads the text layer, splits chapters, marks the file ready', async () => {
  await run(fileId, { connect: false, ocr: false });
  const f = (await api('GET', `/course/files/${fileId}`)).body.data;
  assert.deepEqual([f.status, f.kind, f.subject, f.pages, f.progress.done], ['ready', 'text', 'quant', 12, 12]);
  assert.deepEqual(f.sections.map((s) => [s.topic, s.from, s.to]), [['profit_loss', 1, 7], ['time_speed_distance', 8, 12]]);
  assert.equal(f.sections[0].name.bn, 'লাভ, ক্ষতি ও ছাড়');
});

test('resume and one worker per file: a restart reads only the missing pages; a busy file is not taken', async () => {
  await CoursePage.deleteMany({ file_id: fileId, page: { $in: [3, 9] } });
  const r = await run(fileId, { connect: false, ocr: false });
  assert.deepEqual([r.pages, r.read], [12, 2], 'only the 2 missing pages were read');
  assert.equal(await CoursePage.countDocuments({ file_id: fileId }), 12);
  assert.equal((await CourseFile.findById(fileId).lean()).heartbeat_at, null, 'a finished worker releases the file');

  await CourseFile.updateOne({ _id: fileId }, { $set: { heartbeat_at: new Date(), worker_token: 'other-worker' } });
  assert.deepEqual(await run(fileId, { connect: false, ocr: false }), { skipped: 'busy' });
  assert.equal((await run(fileId, { connect: false, ocr: false, token: 'other-worker' })).pages, 12, 'the worker holding the token may go on');
  await CourseFile.updateOne({ _id: fileId }, { $set: { heartbeat_at: new Date(Date.now() - 5 * 60_000) } });
  assert.equal((await run(fileId, { connect: false, ocr: false })).pages, 12, 'a silent worker is taken over');
});

test('search and chapter page: hits with page + snippet; sections per chapter; private', async () => {
  const hits = (await api('GET', '/course/search?q=platform')).body.data.hits;
  assert.ok(hits.length >= 5 && hits.every((h) => h.page >= 8 && h.fileId === fileId && /platform/i.test(h.snippet)));
  assert.equal((await api('GET', '/course/search?q=platform', { user: 'stu_b' })).body.data.hits.length, 0);
  const forTopic = (await api('GET', '/course/topics/quant/time_speed_distance')).body.data.sections;
  assert.deepEqual(forTopic.map((s) => [s.fileTitle, s.from, s.to]), [['Mathematics notes', 8, 12]]);
});

test('fixes: move a boundary, add a part inside another (split), rename to Other; reprocessing keeps them', async () => {
  let f = (await api('GET', `/course/files/${fileId}`)).body.data;
  const [pl, tsd] = f.sections;
  f = (await api('PATCH', `/course/sections/${pl.id}`, { body: { to: 5 } })).body.data;
  assert.deepEqual(f.sections.map((s) => [s.topic, s.from, s.to]), [['profit_loss', 1, 5], ['time_speed_distance', 8, 12]]);
  f = (await api('POST', `/course/files/${fileId}/sections`, { body: { subject: 'quant', topic: 'percentage', from: 9, to: 10 } })).body.data;
  assert.deepEqual(f.sections.map((s) => [s.topic, s.from, s.to]), [['profit_loss', 1, 5], ['time_speed_distance', 8, 8], ['percentage', 9, 10], ['time_speed_distance', 11, 12]]);
  f = (await api('PATCH', `/course/sections/${tsd.id}`, { body: { topic: null, label: 'Trains' } })).body.data;
  assert.equal(f.sections.find((s) => s.id === tsd.id).name.en, 'Trains');
  assert.equal((await api('PATCH', `/course/sections/${pl.id}`, { body: { to: 99 } })).status, 422, 'beyond the last page');
  assert.equal((await api('PATCH', `/course/sections/${pl.id}`, { body: { topic: 'no_such_chapter' } })).status, 422);
  assert.equal((await api('PATCH', `/course/sections/${pl.id}`, { body: { to: 4 }, user: 'stu_b' })).status, 404);

  await run(fileId, { connect: false, ocr: false });
  const again = (await api('GET', `/course/files/${fileId}`)).body.data;
  assert.equal(again.sections.length, 4, 'manual sections survive reprocessing');
});

test('reading progress, bookmarks and notes: per page, per chapter, private', async () => {
  // A page read, a ⭐ with a note, and a whole chapter marked done.
  assert.deepEqual((await api('PUT', `/course/files/${fileId}/pages/2`, { body: { read: true } })).body.data, { page: 2, read: true, bookmarked: false, note: '' });
  await api('PUT', `/course/files/${fileId}/pages/9`, { body: { bookmarked: true, note: '  successive discount trick  ' } });
  assert.equal((await api('PUT', `/course/files/${fileId}/pages/99`, { body: { read: true } })).status, 422, 'beyond the last page');
  assert.equal((await api('PUT', `/course/files/${fileId}/pages/3`, { body: {} })).status, 400, 'nothing to change');
  assert.equal((await api('PUT', `/course/files/${fileId}/pages/3`, { body: { read: true }, user: 'stu_b' })).status, 404);

  let f = (await api('GET', `/course/files/${fileId}`)).body.data;
  assert.deepEqual(f.readList, [2]);
  assert.deepEqual(f.marks, [{ page: 9, bookmarked: true, note: 'successive discount trick' }]);
  const pl = f.sections.find((s) => s.topic === 'profit_loss');
  assert.equal(pl.readPages, 1);

  f = (await api('POST', `/course/files/${fileId}/read`, { body: { from: pl.from, to: pl.to } })).body.data;
  assert.equal(f.sections.find((s) => s.id === pl.id).readPages, pl.pages, 'chapter done marks every page');
  assert.equal((await api('GET', '/course/files')).body.data.files[0].readPages, pl.pages);
  const forTopic = (await api('GET', '/course/topics/quant/profit_loss')).body.data.sections[0];
  assert.equal(forTopic.readPages, pl.pages, 'the chapter page card shows it too');
  f = (await api('POST', `/course/files/${fileId}/read`, { body: { from: pl.from, to: pl.to, read: false } })).body.data;
  assert.equal(f.sections.find((s) => s.id === pl.id).readPages, 0, 'undo');

  const marks = (await api('GET', '/course/bookmarks')).body.data.items;
  assert.deepEqual(marks.map((m) => [m.page, m.bookmarked, m.note, m.fileTitle]), [[9, true, 'successive discount trick', 'Mathematics notes']]);
  assert.ok(marks[0].chapter?.en, 'with the chapter the page is in');
  assert.equal((await api('GET', '/course/bookmarks', { user: 'stu_b' })).body.data.items.length, 0);
});

test('reader: the original PDF streams with Range support; last page is remembered', async () => {
  const full = await api('GET', `/course/files/${fileId}/pdf`, { raw: true });
  assert.equal(full.status, 200);
  assert.equal(full.headers.get('content-type'), 'application/pdf');
  const part = await api('GET', `/course/files/${fileId}/pdf`, { raw: true, headers: { Range: 'bytes=0-4' } });
  assert.equal(part.status, 206);
  assert.equal(await part.text(), '%PDF-');
  assert.equal((await api('GET', `/course/files/${fileId}/pdf`, { raw: true, user: 'stu_b' })).status, 404);
  assert.equal((await api('PUT', `/course/files/${fileId}/last-page`, { body: { page: 7 } })).body.data.lastPage, 7);
  assert.equal((await api('GET', '/course/files')).body.data.files[0].lastPage, 7);
});

test('delete: removes the file, its pages and sections, and the stored PDF', async () => {
  const stored = await CourseFile.findById(fileId).lean();
  assert.equal((await api('DELETE', `/course/files/${fileId}`, { user: 'stu_b' })).status, 404);
  assert.equal((await api('DELETE', `/course/files/${fileId}`)).status, 200);
  assert.equal(await CoursePage.countDocuments({ file_id: fileId }), 0);
  assert.equal(await CourseSection.countDocuments({ file_id: fileId }), 0);
  assert.equal(await CoursePageMark.countDocuments({ file_id: fileId }), 0, "and the student's marks on it");
  assert.equal(fs.existsSync(path.join(storage, 'stu_a', stored.stored_name)), false);
});

test('chapters list for the fix picker covers Math, English, GK', async () => {
  const s = (await api('GET', '/course/chapters')).body.data.subjects;
  assert.ok(s.quant.topics.some((t) => t.topic === 'pipes_cistern'));
  assert.ok(s.english.topics.length > 5 && s.gs.topics.length > 5);
});
