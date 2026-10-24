'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ExcelJS = require('exceljs');

const config = require('../src/config');
const { createApp } = require('../src/app');
const { ExamCategory, Question, QuestionImportBatch, User } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { CATALOG_HEADERS, HEADERS, createCatalogCsv, createTemplate, parseCsv, parseUpload } = require('../src/services/questionBulkImport.service');
const catalog = require('../db/seed/catalog');

const ADMIN_EMAIL = 'question-import-admin@example.test';
const OTHER_ADMIN_EMAIL = 'question-import-other@example.test';
for (const email of [ADMIN_EMAIL, OTHER_ADMIN_EMAIL]) {
  if (!config.auth.adminEmails.includes(email)) config.auth.adminEmails.push(email);
}

let mongod;
let server;
let base;
let adminCookie;
let otherAdminCookie;

async function call(method, url, { body, cookie, json = true } = {}) {
  const headers = { ...(cookie && { cookie }) };
  let requestBody = body;
  if (json && body) {
    headers['content-type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }
  const response = await fetch(`${base}${url}`, { method, headers, body: requestBody });
  const payload = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : await response.text();
  return { status: response.status, body: payload, headers: response.headers };
}

function questionRow(overrides = {}) {
  return {
    question_text: 'Which is the result if 25% of a number is 40 exactly?',
    question_text_bn: '২৫% যদি ৪০ হয়, সংখ্যাটির মান কত?',
    question_type: 'MCQ',
    option_a: '120', option_a_bn: '১২০',
    option_b: '140', option_b_bn: '১৪০',
    option_c: '160', option_c_bn: '১৬০',
    option_d: '180', option_d_bn: '১৮০',
    correct_answer: 'C',
    explanation: 'Divide 40 by 0.25 to get 160.',
    explanation_bn: '৪০-কে ০.২৫ দিয়ে ভাগ করলে ১৬০ হয়।',
    subject: 'Quantitative Aptitude',
    topic: 'percentage',
    exam_name: 'WBCS',
    difficulty: 'Easy',
    language: 'Bilingual',
    source: 'Unit test source',
    source_year: '2024',
    ...overrides,
  };
}

function asCsv(rows) {
  const quote = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [HEADERS, ...rows.map((row) => HEADERS.map((header) => row[header] ?? ''))]
    .map((row) => row.map(quote).join(','))
    .join('\r\n');
}

function uploadForm(csv) {
  const form = new FormData();
  form.append('category', 'WBPSC');
  form.append('examCode', 'WBCS');
  form.append('defaultSubject', 'quant');
  form.append('defaultTopic', 'percentage');
  form.append('file', new Blob([csv], { type: 'text/csv' }), 'questions.csv');
  return form;
}

async function createStoredQuestion(row, overrides = {}) {
  const ids = ['opt_existinga', 'opt_existingb', 'opt_existingc', 'opt_existingd'];
  const options = ['a', 'b', 'c', 'd']
    .filter((letter) => row[`option_${letter}`] || row[`option_${letter}_bn`])
    .map((letter, index) => ({
      oid: ids[index],
      text: Object.fromEntries(['en', 'bn', 'hi']
        .map((language) => [language, row[`option_${letter}${language === 'en' ? '' : `_${language}`}`]])
        .filter(([, value]) => value)),
    }));
  return Question.create({
    code: overrides.code || `EXISTING-${new mongoose.Types.ObjectId().toString().slice(-12)}`,
    exam_targets: overrides.exam_targets || [{ category: 'SSC', tier: 'TIER_1' }],
    subject: overrides.subject || 'english',
    topic: overrides.topic || 'synonyms_antonyms',
    ...(overrides.subtopic && { subtopic: overrides.subtopic }),
    difficulty: 2,
    stem: {
      en: overrides.question_text ?? row.question_text,
      ...(row.question_text_bn && { bn: overrides.question_text_bn ?? row.question_text_bn }),
      ...(row.question_text_hi && { hi: overrides.question_text_hi ?? row.question_text_hi }),
    },
    options,
    correct_option_id: ids[['A', 'B', 'C', 'D'].indexOf(overrides.correct_answer || row.correct_answer)],
    status: 'PUBLISHED',
  });
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('edtech_question_import_test'));
  await Promise.all([Question.init(), QuestionImportBatch.init(), User.init(), ExamCategory.init()]);
  await mongoose.connection.collection('question_import_migrations').insertOne({
    _id: 'question_duplicate_keys_v1',
    completed_at: new Date(),
    question_count: 0,
  });
  await ExamCategory.create(catalog.find((item) => item.code === 'WBPSC'));
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;

  const registration = await call('POST', '/auth/register', {
    body: { name: 'Import Admin', email: ADMIN_EMAIL, password: 'safe-password-123' },
  });
  assert.equal(registration.status, 201, JSON.stringify(registration.body));
  const login = await call('POST', '/auth/login', {
    body: { email: ADMIN_EMAIL, password: 'safe-password-123' },
  });
  assert.equal(login.status, 200);
  adminCookie = login.headers.get('set-cookie')?.split(';')[0];
  assert.ok(adminCookie);

  const otherRegistration = await call('POST', '/auth/register', {
    body: { name: 'Other Import Admin', email: OTHER_ADMIN_EMAIL, password: 'safe-password-123' },
  });
  assert.equal(otherRegistration.status, 201, JSON.stringify(otherRegistration.body));
  const otherLogin = await call('POST', '/auth/login', {
    body: { email: OTHER_ADMIN_EMAIL, password: 'safe-password-123' },
  });
  assert.equal(otherLogin.status, 200);
  otherAdminCookie = otherLogin.headers.get('set-cookie')?.split(';')[0];
  assert.ok(otherAdminCookie);
});

test.after(async () => {
  server?.close();
  await statsBuffer.stop();
  await mongoose.disconnect();
  await mongod?.stop();
});

test.beforeEach(async () => {
  await Question.deleteMany({});
  await QuestionImportBatch.deleteMany({});
});

test('preview is unavailable until the existing-question key backfill is recorded', async () => {
  await mongoose.connection.collection('question_import_migrations').deleteOne({ _id: 'question_duplicate_keys_v1' });
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([questionRow()])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 503);
  assert.equal(response.body.error.code, 'DUPLICATE_INDEX_NOT_READY');
  await mongoose.connection.collection('question_import_migrations').insertOne({
    _id: 'question_duplicate_keys_v1',
    completed_at: new Date(),
    question_count: 0,
  });
});

test('CSV parser preserves quoted commas, embedded line breaks and empty rows', () => {
  const records = parseCsv(Buffer.from('question_text,question_type\n"Which, if any?",MCQ\n\n"Two\nlines",MCQ\n'));
  assert.equal(records.length, 4);
  assert.equal(records[2][0], '');
  assert.equal(records[3][0], 'Two\nlines');
  assert.throws(() => parseCsv(Buffer.from('a,b\n"unfinished,x')), /unclosed quoted field/);
});

test('xlsx template includes question fields, instructions, and live taxonomy and exam catalogs', async () => {
  const buffer = Buffer.from(await createTemplate());
  const file = { buffer, size: buffer.length, originalname: 'template.xlsx' };
  const records = await parseUpload(file);
  assert.deepEqual(records[0].slice(0, HEADERS.length), HEADERS);
  assert.equal(records.length, 6);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  assert.ok(workbook.getWorksheet('Instructions'));
  const taxonomy = workbook.getWorksheet('Taxonomy');
  const exams = workbook.getWorksheet('Exams');
  assert.ok(taxonomy);
  assert.ok(exams);
  const taxonomyRows = taxonomy.getSheetValues().slice(2).filter(Boolean);
  assert.ok(taxonomyRows.some((row) => row[1] === 'WBPSC' && row[9] === 'percentage' && row[13] === 'percentage_of_number'));
  assert.ok(taxonomyRows.some((row) => row[1] === 'WBPSC' && row[9] === 'percentage' && row[13] === 'percentage_change'));
  assert.ok(taxonomyRows.some((row) => row[1] === 'WBPSC' && row[9] === 'percentage' && row[13] === 'more_than_less_than_comparison' && row[14] === 'percentage_comparison'));
  assert.ok(exams.getSheetValues().slice(2).some((row) => row[1] === 'WBPSC' && row[5] === 'WBCS'));
});

test('catalog CSV contains the live taxonomy codes and configured examinations', async () => {
  const csv = await createCatalogCsv();
  const records = parseCsv(Buffer.from(csv));
  assert.deepEqual(records[0], CATALOG_HEADERS);
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[8] === 'percentage' && row[12] === 'percentage_of_number' && row[13] === 'percentage_of_number'));
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[8] === 'percentage' && row[12] === 'percentage_change' && row[13] === 'percentage_change'));
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[8] === 'percentage' && row[12] === 'more_than_less_than_comparison' && row[13] === 'percentage_comparison'));
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[8] === 'percentage' && row[12] === 'find_the_whole_from_a_percentage' && row[13] === 'finding_whole_from_percentage'));
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[8] === 'percentage' && row[12] === 'exam_marks_percentage' && row[13] === 'marks_percentage'));
  for (const code of ['profit_percent', 'loss_percent', 'find_cost_price', 'marked_price_discount', 'two_articles_same_price', 'cp_sp_articles']) {
    assert.ok(records.some((row) => row[0] === 'WBPSC' && row[4] === 'quant' && row[8] === 'profit_loss' && row[12] === code && row[13] === code), `missing catalog code ${code}`);
  }
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[4] === 'quant' && row[8] === 'profit_loss' && row[12] === 'marked_price_and_discount' && row[13] === 'marked_price_discount'));
  assert.ok(records.some((row) => row[0] === 'WBPSC' && row[17].includes('WBCS')));

  const response = await call('GET', '/admin/import/catalog.csv', { cookie: adminCookie, json: false });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-disposition'), /question-import-catalog\.csv/);
  assert.equal(response.body, csv);
});

test('xlsx preview rejects formula cells rather than importing calculated results', async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Questions');
  sheet.addRow(HEADERS);
  const row = questionRow();
  sheet.addRow(HEADERS.map((header) => row[header] || ''));
  sheet.getCell(2, 1).value = { formula: '1+1', result: '2' };
  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  const form = new FormData();
  form.append('category', 'WBPSC');
  form.append('examCode', 'WBCS');
  form.append('defaultSubject', 'quant');
  form.append('defaultTopic', 'percentage');
  form.append('file', new Blob([buffer]), 'formula.xlsx');

  const response = await call('POST', '/admin/import/preview', {
    body: form,
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.equal(response.body.data.rows[0].status, 'INVALID');
  assert.ok(response.body.data.rows[0].errors.some((error) => error.code === 'FORMULA_NOT_ALLOWED'));
});

test('preview detects uploaded duplicates through any shared language', async () => {
  const rows = [
    questionRow(),
    questionRow({ question_text: 'What number equals forty divided by one quarter?', question_text_bn: questionRow().question_text_bn }),
  ];
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(rows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.deepEqual(response.body.data.rows.map((row) => row.status), ['NEW', 'EXACT_DUPLICATE']);
  assert.equal(response.body.data.rows[1].duplicateReference, 'row 2');
});

test('preview finds existing exact and answer-conflict questions across categories and taxonomy', async () => {
  const exact = await createStoredQuestion(questionRow(), {
    question_text: 'Which is the result if 25% of a number is 40 exactly?',
    subject: 'english',
    topic: 'synonyms_antonyms',
  });
  const conflictRow = questionRow({
    question_text: 'What number equals forty divided by one quarter?',
    question_text_bn: 'একই প্রশ্ন, কিন্তু আলাদা বিকল্পসহ?',
    option_c: '150',
    correct_answer: 'B',
  });
  const conflict = await createStoredQuestion(conflictRow, {
    code: 'EXISTING-ANSWER-CONFLICT',
    question_text: 'What number equals forty divided by one quarter?',
    correct_answer: 'C',
    subject: 'reasoning',
    topic: 'analogy',
  });
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([
      questionRow({ question_text: '  Which is the result if 25% of a number is 40\r\nexactly?  ' }),
      conflictRow,
    ])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  const [exactRow, conflictResult] = response.body.data.rows;
  assert.equal(exactRow.status, 'EXACT_DUPLICATE');
  assert.equal(exactRow.duplicateId, String(exact._id));
  assert.equal(conflictResult.status, 'ANSWER_CONFLICT');
  assert.equal(conflictResult.duplicateId, String(conflict._id));
  assert.match(conflictResult.duplicateReason, /options or the correct answer differ/);
  const unresolved = await call('POST', `/admin/import/batches/${response.body.data.batchId}/confirm`, {
    body: { duplicateDecisions: [] },
    cookie: adminCookie,
  });
  assert.equal(unresolved.status, 400);
  const skipped = await call('POST', `/admin/import/batches/${response.body.data.batchId}/confirm`, {
    body: { duplicateDecisions: [{ rowNumber: 3, decision: 'SKIP' }] },
    cookie: adminCookie,
  });
  assert.equal(skipped.status, 200, JSON.stringify(skipped.body));
  assert.equal(skipped.body.data.summary.answerConflicts, 1);
  assert.equal(skipped.body.data.rows[1].status, 'SKIPPED_ANSWER_CONFLICT');
});

test('preview matches Bengali and mathematical wording using actual normalized database keys', async () => {
  const bengaliRow = questionRow({
    question_text: 'A changed English translation of the question',
  });
  const bengaliExisting = await createStoredQuestion(bengaliRow, {
    question_text: 'Different English version already stored',
    subject: 'gs',
    topic: 'geography',
  });
  const mathExisting = await createStoredQuestion(questionRow({
    question_text: 'Simplify 3 × (2 + 1) = ?',
    question_text_bn: '',
    option_a: '6',
    option_b: '9',
    option_c: '12',
    option_d: '3',
    option_a_bn: '',
    option_b_bn: '',
    option_c_bn: '',
    option_d_bn: '',
    correct_answer: 'A',
    language: 'English',
  }), {
    code: 'EXISTING-MATH-SYMBOLS',
    question_text: 'Simplify 3 × (2 + 1) = ?',
    question_text_bn: '',
    subject: 'quant',
    topic: 'simplification',
  });
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([
      bengaliRow,
      questionRow({
        question_text: 'Simplify 3 ×(2 + 1)=?',
        question_text_bn: '',
        option_a: '6',
        option_b: '9',
        option_c: '12',
        option_d: '3',
        option_a_bn: '',
        option_b_bn: '',
        option_c_bn: '',
        option_d_bn: '',
        correct_answer: 'A',
        language: 'English',
      }),
    ])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.equal(response.body.data.rows[0].status, 'EXACT_DUPLICATE');
  assert.equal(response.body.data.rows[0].duplicateId, String(bengaliExisting._id));
  assert.equal(response.body.data.rows[1].status, 'EXACT_DUPLICATE');
  assert.equal(response.body.data.rows[1].duplicateId, String(mathExisting._id));
});

test('preview identifies similar wording from the indexed database search for manual review', async () => {
  const existingRow = questionRow({
    question_text: 'Which is the result if 25% of a number is 40 exactly?',
  });
  const existing = await createStoredQuestion(existingRow, {
    question_text_bn: '',
  });
  const uploadedRow = questionRow({
    question_text: 'What is the result if 25% of a number is 40 exactly?',
    question_text_bn: '',
    option_a_bn: '',
    option_b_bn: '',
    option_c_bn: '',
    option_d_bn: '',
    explanation_bn: '',
    language: 'English',
  });
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([uploadedRow])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.equal(response.body.data.rows[0].status, 'POSSIBLE_DUPLICATE');
  assert.equal(response.body.data.rows[0].duplicateId, String(existing._id));
});

test('preview searches Bengali wording when English translations differ', async () => {
  const existing = await createStoredQuestion(questionRow({
    question_text: 'A stored English translation unrelated to the upload.',
    question_text_bn: 'একটি সংখ্যার ২৫% যদি ৪০ হয়, সংখ্যাটি কত?',
  }));
  const uploadedRow = questionRow({
    question_text: 'A different English translation unrelated to the stored text.',
    question_text_bn: 'একটি সংখ্যার ২৫% যদি ৪০ হয়, তবে সংখ্যাটি কত?',
  });
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([uploadedRow])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.equal(response.body.data.rows[0].status, 'POSSIBLE_DUPLICATE');
  assert.equal(response.body.data.rows[0].duplicateId, String(existing._id));
});

test('preview accepts percentage subtopic aliases and stores their canonical codes', async () => {
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv([
      questionRow({
        question_text: 'What is 20% of 350?',
        question_text_bn: '৩৫০-এর ২০% কত?',
        subtopic: 'percentage_of_a_number',
      }),
      questionRow({
        question_text: 'A value after a change is given; find its original value.',
        question_text_bn: 'পরিবর্তনের পরের মান থেকে মূল মান নির্ণয় করো।',
        subtopic: 'reverse_percentage',
      }),
      questionRow({
        question_text: 'A value changes twice in succession; find the net change.',
        question_text_bn: 'একটি মানে পরপর দুবার পরিবর্তন হলে মোট পরিবর্তন নির্ণয় করো।',
        subtopic: 'successive_percentage_change',
      }),
    ])),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.deepEqual(response.body.data.rows.map((row) => row.status), ['NEW', 'NEW', 'NEW']);
  const batch = await QuestionImportBatch.findById(response.body.data.batchId).lean();
  assert.deepEqual(batch.rows.map((row) => row.question_doc.subtopic), [
    'percentage_of_number',
    'percentage_change',
    'successive_percentage_change',
  ]);
});

test('preview accepts every percentage subtopic reported by uploaded questions', async () => {
  const subtopics = [
    ['percentage_increase', 'percentage_increase', 'percentage'],
    ['percentage_decrease', 'percentage_decrease', 'percentage'],
    ['marks_percentage', 'marks_percentage', 'percentage'],
    ['more_than_less_than_comparison', 'percentage_comparison', 'percentage'],
    ['compound_growth', 'compound_growth', 'percentage'],
    ['population_growth', 'population_growth', 'percentage'],
    ['population_change', 'population_change', 'percentage'],
    ['find_the_whole_from_a_percentage', 'finding_whole_from_percentage', 'percentage'],
    ['exam_marks_percentage', 'marks_percentage', 'percentage'],
    ['savings_as_a_percentage_of_income', 'income_expenditure_savings', 'percentage'],
    ['marked_price_and_discount', 'marked_price_discount', 'profit_loss'],
  ];
  const rows = subtopics.map(([subtopic], index) => questionRow({
    question_text: `Percentage practice question type ${index + 1}: calculate the requested result.`,
    question_text_bn: `শতকরা অনুশীলনী প্রশ্ন ${index + 1}: চাওয়া ফল নির্ণয় করো।`,
    ...(subtopic === 'marked_price_and_discount' && { topic: 'profit_loss' }),
    subtopic,
  }));
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(rows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.ok(response.body.data.rows.every((row) => row.status !== 'INVALID'));
  const batch = await QuestionImportBatch.findById(response.body.data.batchId).lean();
  assert.deepEqual(
    batch.rows.map((row) => row.question_doc.subtopic),
    subtopics.map(([, canonical]) => canonical),
  );
});

test('preview accepts Profit & Loss generator codes and marked-price alias', async () => {
  const subtopics = [
    ['profit_percent', 'profit_percent'],
    ['loss_percent', 'loss_percent'],
    ['find_cost_price', 'find_cost_price'],
    ['marked_price_discount', 'marked_price_discount'],
    ['marked_price_and_discount', 'marked_price_discount'],
    ['two_articles_same_price', 'two_articles_same_price'],
    ['cp_sp_articles', 'cp_sp_articles'],
  ];
  const rows = subtopics.map(([subtopic], index) => questionRow({
    question_text: `Profit and loss practice question ${index + 1}: calculate the correct amount.`,
    question_text_bn: `লাভ-ক্ষতির অনুশীলনী প্রশ্ন ${index + 1}: সঠিক পরিমাণ নির্ণয় করো।`,
    topic: 'profit_loss',
    subtopic,
  }));
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(rows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.ok(response.body.data.rows.every((row) => row.status !== 'INVALID'));
  const batch = await QuestionImportBatch.findById(response.body.data.batchId).lean();
  assert.deepEqual(batch.rows.map((row) => row.question_doc.subtopic), subtopics.map(([, canonical]) => canonical));
});

test('publishing a completed batch publishes only its drafts and refreshes live history counts', async () => {
  const admin = await User.findOne({ email: ADMIN_EMAIL }).select('_id').lean();
  const batch = await QuestionImportBatch.create({
    status: 'COMPLETED',
    uploaded_by: String(admin._id),
    category: 'WBPSC',
    exam_code: 'WBCS',
    file_name: 'percentage.xlsx',
    summary: { successfullyImported: 2 },
    rows: [],
  });
  const authoredBy = `bulk-import:${batch._id}`;
  const imported = await Promise.all([
    createStoredQuestion(questionRow(), {
      code: 'BULK-PUBLISH-ONE',
      exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
      subject: 'quant',
      topic: 'percentage',
      subtopic: 'percentage_of_number',
    }),
    createStoredQuestion(questionRow({
      question_text: 'A unique percentage question from the import batch.',
      question_text_bn: 'আমদানি করা ব্যাচের একটি স্বতন্ত্র শতকরার প্রশ্ন।',
    }), {
      code: 'BULK-PUBLISH-TWO',
      exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
      subject: 'quant',
      topic: 'percentage',
      subtopic: 'percentage_of_number',
    }),
  ]);
  await Question.updateMany(
    { _id: { $in: imported.map((question) => question._id) } },
    { $set: { authored_by: authoredBy, status: 'DRAFT' } },
  );
  const unrelatedDraft = await createStoredQuestion(questionRow({
    question_text: 'A draft from a different import batch.',
  }), {
    code: 'BULK-PUBLISH-UNRELATED',
    exam_targets: [{ category: 'WBPSC', tier: 'PRELIMS' }],
    subject: 'quant',
    topic: 'percentage',
  });
  await Question.updateOne(
    { _id: unrelatedDraft._id },
    { $set: { authored_by: 'bulk-import:another-batch', status: 'DRAFT' } },
  );

  const response = await call('POST', `/admin/import/batches/${batch._id}/publish`, {
    body: {},
    cookie: adminCookie,
  });
  assert.equal(response.status, 200, JSON.stringify(response.body));
  assert.equal(response.body.data.publishedCount, 2);
  assert.equal(response.body.data.totalPublishedCount, 2);
  assert.equal(response.body.data.remainingDraftCount, 0);

  const published = await Question.find({ authored_by: authoredBy }).lean();
  assert.equal(published.length, 2);
  assert.ok(published.every((question) => question.status === 'PUBLISHED'));
  assert.ok(published.every((question) => question.reviewed_by === ADMIN_EMAIL));
  assert.ok(published.every((question) => question.pattern === 'percent_of_number'));
  assert.equal((await Question.findById(unrelatedDraft._id).lean()).status, 'DRAFT');

  const history = await call('GET', '/admin/import/batches?limit=10', { cookie: adminCookie });
  const historyBatch = history.body.data.batches.find((item) => item.id === String(batch._id));
  assert.equal(historyBatch.draftCount, 0);
  assert.equal(historyBatch.publishedCount, 2);
  assert.ok(historyBatch.publishedAt);

  const repeated = await call('POST', `/admin/import/batches/${batch._id}/publish`, {
    body: {},
    cookie: adminCookie,
  });
  assert.equal(repeated.status, 200);
  assert.equal(repeated.body.data.publishedCount, 0);
  assert.equal(repeated.body.data.totalPublishedCount, 2);
});

test('admin-only preview detects exact and likely duplicates without writing; confirm imports drafts idempotently', async () => {
  const unauthorized = await call('GET', '/admin/import/template.csv', { json: false });
  assert.equal(unauthorized.status, 401);
  const authorizedHistory = await call('GET', '/admin/import/batches', { cookie: adminCookie });
  assert.equal(authorizedHistory.status, 200, JSON.stringify(authorizedHistory.body));

  const before = await Question.countDocuments();
  const rows = [
    questionRow(),
    questionRow({ question_text: 'Which is the result if 25% of a number is 40 exactly?  ' }),
    questionRow({
      question_text: 'Which is the result if 25% of a number is 40 exactly now?',
      question_text_bn: 'পরিবর্তিতভাবে বলা হলেও ২৫% যদি ৪০ হয়, সংখ্যাটি কত?',
    }),
  ];
  const previewResponse = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(rows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(previewResponse.status, 201, JSON.stringify(previewResponse.body));
  const preview = previewResponse.body.data;
  assert.deepEqual(preview.rows.map((row) => row.status), ['NEW', 'EXACT_DUPLICATE', 'POSSIBLE_DUPLICATE']);
  assert.equal(preview.summary.totalRows, 3);
  assert.equal(preview.summary.exactDuplicates, 1);
  assert.equal(preview.summary.possibleDuplicates, 1);
  assert.equal(preview.rows[1].duplicateReference, 'row 2');
  assert.equal(preview.rows[2].duplicateReference, 'row 2');
  assert.equal(await Question.countDocuments(), before, 'preview must not insert questions');

  const missingDecision = await call('POST', `/admin/import/batches/${preview.batchId}/confirm`, {
    body: { duplicateDecisions: [] },
    cookie: adminCookie,
  });
  assert.equal(missingDecision.status, 400);

  const confirmedResponse = await call('POST', `/admin/import/batches/${preview.batchId}/confirm`, {
    body: { duplicateDecisions: [{ rowNumber: 4, decision: 'IMPORT_AS_NEW' }] },
    cookie: adminCookie,
  });
  assert.equal(confirmedResponse.status, 200, JSON.stringify(confirmedResponse.body));
  const confirmed = confirmedResponse.body.data;
  assert.equal(confirmed.status, 'COMPLETED');
  assert.equal(confirmed.summary.successfullyImported, 2);
  assert.equal(confirmed.summary.exactDuplicates, 1);
  assert.equal(confirmed.summary.possibleDuplicates, 1);
  assert.deepEqual(confirmed.rows.map((row) => row.status), ['IMPORTED', 'EXACT_DUPLICATE', 'IMPORTED']);

  const imported = await Question.find({ authored_by: `bulk-import:${preview.batchId}` }).select('+correct_option_id +import_fingerprint +duplicate_keys').lean();
  assert.equal(imported.length, 2);
  assert.ok(imported.every((question) => question.status === 'DRAFT'));
  assert.ok(imported.every((question) => question.duplicate_keys.length === 2));
  assert.equal(imported[0].source_reference, 'Unit test source');
  assert.equal(imported[0].source_year, 2024);
  assert.equal(imported[0].lang_set, 'bn_en');
  assert.ok(imported[0].options.every((option) => option.text.en && option.text.bn));

  const secondPreviewResponse = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(rows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(secondPreviewResponse.status, 201);
  const secondPreview = secondPreviewResponse.body.data;
  assert.ok(secondPreview.rows.every((row) => row.status === 'EXACT_DUPLICATE'));
  const secondConfirm = await call('POST', `/admin/import/batches/${secondPreview.batchId}/confirm`, {
    body: {},
    cookie: adminCookie,
  });
  assert.equal(secondConfirm.body.data.summary.successfullyImported, 0);
  assert.equal(await Question.countDocuments(), before + 2);

  const report = await call('GET', `/admin/import/batches/${preview.batchId}/errors.csv`, { cookie: adminCookie, json: false });
  assert.equal(report.status, 200);
  assert.match(report.body, /"row_number","status","error_codes","messages","duplicate_reference"/);
  assert.match(report.body, /row 2/);
  const history = await call('GET', '/admin/import/batches?limit=10', { cookie: adminCookie });
  assert.equal(history.status, 200);
  assert.ok(history.body.data.batches.some((batch) => batch.id === preview.batchId));
  const otherHistory = await call('GET', '/admin/import/batches?limit=10', { cookie: otherAdminCookie });
  assert.equal(otherHistory.status, 200);
  assert.ok(otherHistory.body.data.batches.every((batch) => batch.id !== preview.batchId));
  const otherReport = await call('GET', `/admin/import/batches/${preview.batchId}/errors.csv`, { cookie: otherAdminCookie, json: false });
  assert.equal(otherReport.status, 404);
});

test('preview reports invalid rows and rejects malformed uploads without database writes', async () => {
  const before = await Question.countDocuments();
  const invalidRows = [
    questionRow({ correct_answer: 'E' }),
    questionRow({ question_type: 'Essay' }),
  ];
  const response = await call('POST', '/admin/import/preview', {
    body: uploadForm(asCsv(invalidRows)),
    cookie: adminCookie,
    json: false,
  });
  assert.equal(response.status, 201, JSON.stringify(response.body));
  assert.deepEqual(response.body.data.rows.map((row) => row.status), ['INVALID', 'INVALID']);
  assert.ok(response.body.data.rows[0].errors.some((error) => error.code === 'INVALID_CORRECT_ANSWER'));
  assert.ok(response.body.data.rows[1].errors.some((error) => error.code === 'UNSUPPORTED_QUESTION_TYPE'));
  assert.equal(await Question.countDocuments(), before);

  const malformed = uploadForm('not,a,question,template');
  const badResponse = await call('POST', '/admin/import/preview', {
    body: malformed,
    cookie: adminCookie,
    json: false,
  });
  assert.equal(badResponse.status, 400);
});
