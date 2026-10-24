'use strict';

const crypto = require('node:crypto');
const path = require('node:path');
const ExcelJS = require('exceljs');
const mongoose = require('mongoose');
const { ExamCategory, Question, QuestionImportBatch } = require('../models');
const AppError = require('../utils/AppError');
const { normalizeQuestionText, questionDuplicateKeys } = require('../utils/questionDuplicateKeys');
const { classify, loadRules } = require('./patternTagger');

const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_UNCOMPRESSED_BYTES = 24 * 1024 * 1024;
const MAX_ROWS = 500;
const MAX_TEXT_BYTES = 6 * 1024 * 1024;
const PREVIEW_TTL_MS = 24 * 60 * 60 * 1000;
const LANGUAGES = ['en', 'bn', 'hi'];
const LETTERS = ['A', 'B', 'C', 'D'];

const HEADERS = [
  'question_text', 'question_text_bn', 'question_text_hi', 'question_type',
  'option_a', 'option_a_bn', 'option_a_hi',
  'option_b', 'option_b_bn', 'option_b_hi',
  'option_c', 'option_c_bn', 'option_c_hi',
  'option_d', 'option_d_bn', 'option_d_hi',
  'correct_answer', 'explanation', 'explanation_bn', 'explanation_hi',
  'subject', 'topic', 'subtopic', 'exam_name', 'difficulty', 'language',
  'source', 'source_year',
];
const REQUIRED_HEADERS = ['question_text', 'question_type', 'option_a', 'option_b', 'option_c', 'correct_answer', 'difficulty'];
const CATALOG_HEADERS = [
  'category_code', 'category_name_en', 'category_name_bn', 'category_name_hi',
  'subject_code', 'subject_name_en', 'subject_name_bn', 'subject_name_hi',
  'topic_code', 'topic_name_en', 'topic_name_bn', 'topic_name_hi',
  'subtopic_code', 'canonical_subtopic_code', 'subtopic_name_en', 'subtopic_name_bn', 'subtopic_name_hi',
  'exam_codes',
];
const EXAM_HEADERS = [
  'category_code', 'category_name_en', 'category_name_bn', 'category_name_hi',
  'exam_code', 'exam_name_en', 'exam_name_bn', 'exam_name_hi',
];

const text = (value) => (value == null ? '' : String(value).normalize('NFC').trim());
const comparisonText = normalizeQuestionText;
const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
const safeName = (value) => path.basename(String(value || 'questions.xlsx').replace(/\\/g, '/')).slice(0, 255) || 'questions.xlsx';
const localizedText = (value, language = 'en') => value?.[language] || value?.en || Object.values(value || {}).find(Boolean) || '';
const keyOf = (...values) => values.map((v) => comparisonText(v)).join('\u001f');

function rowError(code, message) {
  return { code, message };
}

function parseCsv(buffer) {
  let source;
  try {
    source = new TextDecoder('utf-8', { fatal: true }).decode(buffer).replace(/^\uFEFF/, '');
  } catch {
    throw AppError.badRequest('CSV must be valid UTF-8 text');
  }
  if (source.includes('\0')) throw AppError.badRequest('CSV contains invalid binary characters');

  const records = [];
  let record = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < source.length; i += 1) {
    const c = source[i];
    if (quoted) {
      if (c === '"') {
        if (source[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"' && field.length === 0) {
      quoted = true;
    } else if (c === '"') {
      throw AppError.badRequest('CSV contains a quote inside an unquoted field');
    } else if (c === ',') {
      record.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      record.push(field);
      field = '';
      records.push(record);
      record = [];
      if (c === '\r' && source[i + 1] === '\n') i += 1;
    } else {
      field += c;
    }
  }
  if (quoted) throw AppError.badRequest('CSV contains an unclosed quoted field');
  record.push(field);
  records.push(record);
  while (records.length > 1 && records.at(-1).every((value) => value.trim() === '')) records.pop();
  if (!records.length) throw AppError.badRequest('CSV is empty');
  return records;
}

function validateZipContainer(buffer) {
  const start = Math.max(0, buffer.length - 65_557);
  let eocd = -1;
  for (let i = buffer.length - 22; i >= start; i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw AppError.badRequest('The Excel file is not a valid .xlsx workbook');
  const entries = buffer.readUInt16LE(eocd + 10);
  const centralSize = buffer.readUInt32LE(eocd + 12);
  const centralOffset = buffer.readUInt32LE(eocd + 16);
  if (entries > 1000 || centralOffset + centralSize > eocd) {
    throw AppError.badRequest('Excel workbook has an invalid or excessive ZIP directory');
  }

  let offset = centralOffset;
  let expanded = 0;
  for (let i = 0; i < entries; i += 1) {
    if (offset + 46 > buffer.length || buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw AppError.badRequest('Excel workbook has a malformed ZIP entry');
    }
    const flags = buffer.readUInt16LE(offset + 8);
    const compressed = buffer.readUInt32LE(offset + 20);
    const uncompressed = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const name = buffer.toString('utf8', offset + 46, offset + 46 + nameLength);
    if ((flags & 1) !== 0 || /vbaproject\.bin/i.test(name)) {
      throw AppError.badRequest('Encrypted or macro-enabled workbooks are not supported');
    }
    if (compressed > 0 && uncompressed / compressed > 100) {
      throw AppError.badRequest('Excel workbook compression ratio is too high');
    }
    expanded += uncompressed;
    if (expanded > MAX_UNCOMPRESSED_BYTES) throw AppError.badRequest('Excel workbook expands beyond the 24 MB safety limit');
    offset += 46 + nameLength + extraLength + commentLength;
  }
}

function cellText(cell) {
  if (cell == null || cell === '') return '';
  if (typeof cell === 'object') {
    if (cell.formula || cell.sharedFormula) return { invalidFormula: true };
    if (Array.isArray(cell.richText)) return cell.richText.map((part) => part.text).join('');
    if (cell.text != null) return cell.text;
    if (cell.result != null) return cell.result;
    return { invalidCell: true };
  }
  return cell;
}

async function parseXlsx(buffer) {
  validateZipContainer(buffer);
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.load(buffer, { ignoreNodes: ['drawing', 'picture', 'extLst'] });
  } catch {
    throw AppError.badRequest('Could not read the Excel workbook. Upload a valid .xlsx file.');
  }
  const sheet = workbook.getWorksheet('Questions');
  if (!sheet) throw AppError.badRequest('Excel workbook must contain a sheet named "Questions"');
  if (sheet.actualRowCount > MAX_ROWS + 1) throw AppError.badRequest(`Workbook exceeds the ${MAX_ROWS}-row limit`);
  const records = [];
  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber === 1) {
      records.push(Array.from({ length: Math.max(row.cellCount, HEADERS.length) }, (_, i) => cellText(row.getCell(i + 1).value)));
    } else {
      records.push(Array.from({ length: Math.max(row.cellCount, HEADERS.length) }, (_, i) => cellText(row.getCell(i + 1).value)));
    }
  });
  while (records.length > 1 && records.at(-1).every((v) => v == null || v === '')) records.pop();
  return records;
}

async function parseUpload(file) {
  if (!file || !Buffer.isBuffer(file.buffer)) throw AppError.badRequest('Choose a .xlsx or .csv file');
  if (file.size > MAX_FILE_BYTES) throw new AppError(413, 'FILE_TOO_LARGE', 'Upload must be 2 MB or smaller');
  const extension = path.extname(file.originalname || '').toLowerCase();
  if (!['.xlsx', '.csv'].includes(extension)) throw AppError.badRequest('Only .xlsx and .csv files are supported');
  if (extension === '.xlsx') {
    if (file.buffer.length < 4 || file.buffer[0] !== 0x50 || file.buffer[1] !== 0x4b) {
      throw AppError.badRequest('File content does not match an .xlsx workbook');
    }
    return parseXlsx(file.buffer);
  }
  if (file.buffer.subarray(0, 2).toString() === 'PK') throw AppError.badRequest('Excel workbook content cannot be uploaded as CSV');
  return parseCsv(file.buffer);
}

function recordObjects(records) {
  if (!records.length) throw AppError.badRequest('Upload has no header row');
  const headers = records[0].map((value) => comparisonText(value));
  if (headers.some((value) => typeof value !== 'string' || !value)) {
    throw AppError.badRequest('Column headers must be non-empty text');
  }
  const seen = new Set();
  for (const header of headers) {
    if (seen.has(header)) throw AppError.badRequest(`Duplicate column header "${header}"`);
    seen.add(header);
    if (!HEADERS.includes(header)) throw AppError.badRequest(`Unsupported column header "${header}"`);
  }
  const missing = REQUIRED_HEADERS.filter((header) => !seen.has(header));
  if (missing.length) throw AppError.badRequest(`Missing required columns: ${missing.join(', ')}`);
  const inputRows = records.slice(1);
  if (inputRows.length > MAX_ROWS) throw AppError.badRequest(`Upload exceeds the ${MAX_ROWS}-row limit`);
  return inputRows.map((values, index) => {
    const record = {};
    for (let i = 0; i < headers.length; i += 1) {
      const value = values[i];
      record[headers[i]] = value && typeof value === 'object' ? value : (value == null ? '' : String(value));
    }
    if (values.slice(headers.length).some((value) => String(value ?? '').trim() !== '')) {
      record.__rowErrors = [rowError('EXTRA_CELLS', 'This row has values beyond the final column header')];
    }
    return { rowNumber: index + 2, record };
  });
}

function resolveNamed(items, value) {
  const wanted = comparisonText(value);
  return (
    items.find((item) => comparisonText(item.code) === wanted || comparisonText(localizedText(item.name)) === wanted)
    ?? items.find((item) => comparisonText(item.code) === wanted)
  );
}

const SUBTOPIC_ALIASES = {
  percentage: new Map([
    ['reverse_percentage', 'percentage_change'],
    ['percentage_of_a_number', 'percentage_of_number'],
    ['more_than_less_than_comparison', 'percentage_comparison'],
    ['find_whole_from_percent', 'finding_whole_from_percentage'],
    ['find_the_whole_from_a_percentage', 'finding_whole_from_percentage'],
    ['exam_marks_percentage', 'marks_percentage'],
    ['savings_as_percent_income', 'income_expenditure_savings'],
    ['savings_as_a_percentage_of_income', 'income_expenditure_savings'],
  ]),
  profit_loss: new Map([
    ['marked_price_and_discount', 'marked_price_discount'],
    ['marked_price_discount', 'marked_price_discount'],
  ]),
};

function resolveSubtopic(topic, value) {
  const wanted = comparisonText(value);
  const canonicalCode = SUBTOPIC_ALIASES[topic.code]?.get(wanted) || wanted;
  return resolveNamed(topic.subtopics || [], canonicalCode);
}

const SUBJECT_ALIASES = new Map([
  ['mathematics', 'quant'], ['math', 'quant'], ['quantitative aptitude', 'quant'], ['quant', 'quant'],
  ['english language', 'english'], ['english', 'english'],
  ['reasoning', 'reasoning'], ['logical reasoning', 'reasoning'],
  ['gk', 'gs'], ['general knowledge', 'gs'], ['general studies', 'gs'], ['gs', 'gs'],
]);

function resolveSubject(subjects, value) {
  const alias = SUBJECT_ALIASES.get(comparisonText(value));
  if (alias) return subjects.find((item) => item.code === alias);
  return resolveNamed(subjects, value, 'subject');
}

function resolveLanguage(row, content) {
  const value = comparisonText(row.language);
  const aliases = new Map([
    ['en', ['en']], ['english', ['en']], ['bn', ['bn']], ['bengali', ['bn']], ['bangla', ['bn']],
    ['hi', ['hi']], ['hindi', ['hi']], ['bilingual', ['en', 'bn']], ['en/bn', ['en', 'bn']],
    ['english and bengali', ['en', 'bn']], ['english and hindi', ['en', 'hi']],
  ]);
  if (value && !aliases.has(value)) return { error: 'Language must be English, Bengali, Hindi, or Bilingual' };
  const actual = LANGUAGES.filter((lang) => Boolean(content[lang]?.question_text) && content[lang].options.slice(0, 3).every(Boolean));
  if (value && aliases.get(value).some((lang) => !actual.includes(lang))) {
    return { error: `Language says "${text(row.language)}" but its question/options are incomplete` };
  }
  if (!actual.length) return { error: 'Provide a complete question and at least three options in one language' };
  return { languages: actual };
}

function makeQuestion({ row, category, exam, categoryDoc, defaultSubject, defaultTopic, batchId }) {
  const errors = [...(row.__rowErrors || [])];
  for (const [field, value] of Object.entries(row)) {
    if (value?.invalidFormula) errors.push(rowError('FORMULA_NOT_ALLOWED', `${field} must be plain text; formulas are not imported`));
    else if (value?.invalidCell) errors.push(rowError('INVALID_CELL', `${field} must contain plain text or a number`));
  }
  if (errors.length) return { errors };

  const subjects = categoryDoc.subjects || [];
  const subject = row.subject ? resolveSubject(subjects, row.subject) : subjects.find((s) => s.code === defaultSubject);
  if (!subject) errors.push(rowError('UNKNOWN_SUBJECT', `Unknown subject "${text(row.subject)}" for ${category}`));

  const topic = subject
    ? (row.topic ? resolveNamed(subject.topics || [], row.topic, 'topic') : (subject.topics || []).find((t) => t.code === defaultTopic))
    : null;
  if (!topic) errors.push(rowError('UNKNOWN_TOPIC', `Unknown or missing topic "${text(row.topic)}"`));

  const activeExam = categoryDoc.exams?.find((item) => item.code === exam.code);
  const rowExam = row.exam_name
    ? resolveNamed(categoryDoc.exams || [], row.exam_name, 'exam')
    : activeExam;
  if (!rowExam || rowExam.code !== activeExam?.code) {
    errors.push(rowError('UNKNOWN_EXAM', `Exam must match the selected ${localizedText(activeExam?.name)}`));
  }

  const questionType = comparisonText(row.question_type);
  if (questionType !== 'mcq' && questionType !== 'multiple choice' && questionType !== 'multiple-choice') {
    errors.push(rowError('UNSUPPORTED_QUESTION_TYPE', 'Only MCQ question_type is supported by the current question bank'));
  }

  const difficultyValue = comparisonText(row.difficulty);
  const difficultyMap = new Map([['easy', 2], ['medium', 3], ['moderate', 3], ['hard', 4], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5]]);
  const difficulty = difficultyMap.get(difficultyValue);
  if (!difficulty) errors.push(rowError('INVALID_DIFFICULTY', 'Difficulty must be Easy, Medium, Hard, or an integer from 1 to 5'));

  const content = {};
  for (const language of LANGUAGES) {
    const suffix = language === 'en' ? '' : `_${language}`;
    const questionText = text(row[`question_text${suffix}`]);
    const options = LETTERS.map((letter) => text(row[`option_${letter.toLowerCase()}${suffix}`]));
    while (options.length && !options.at(-1)) options.pop();
    if (questionText || options.some(Boolean)) {
      content[language] = { question_text: questionText, options };
    }
  }
  const languageResult = resolveLanguage(row, content);
  if (languageResult.error) errors.push(rowError('INVALID_LANGUAGE_CONTENT', languageResult.error));
  if (!(languageResult.languages || []).some((language) => content[language]?.question_text)) {
    errors.push(rowError('EMPTY_QUESTION', 'Provide a question_text in at least one language'));
  }

  let optionCount = 0;
  for (const language of languageResult.languages || []) {
    const options = content[language].options;
    while (options.length && !options.at(-1)) options.pop();
    optionCount = Math.max(optionCount, options.length);
    if (options.length < 3 || options.length > 4 || options.slice(0, 3).some((option) => !option)) {
      errors.push(rowError('INVALID_OPTIONS', `${language.toUpperCase()} content must have three or four consecutive options`));
      continue;
    }
    const normalized = options.map(comparisonText);
    if (new Set(normalized).size !== normalized.length) {
      errors.push(rowError('DUPLICATE_OPTIONS', `${language.toUpperCase()} options must be different`));
    }
  }
  const optionCounts = (languageResult.languages || []).map((language) => content[language].options.length);
  if (new Set(optionCounts).size > 1) {
    errors.push(rowError('LANGUAGE_OPTION_MISMATCH', 'Every supplied language must have the same number of options'));
  }

  const correctLetter = text(row.correct_answer).toUpperCase();
  if (!LETTERS.includes(correctLetter) || !content[languageResult.languages?.[0]]?.options[LETTERS.indexOf(correctLetter)]) {
    errors.push(rowError('INVALID_CORRECT_ANSWER', 'correct_answer must be A, B, C, or D for an option present in every language'));
  }
  for (const language of languageResult.languages || []) {
    if (!content[language].options[LETTERS.indexOf(correctLetter)]) {
      errors.push(rowError('INVALID_CORRECT_ANSWER', `${correctLetter} has no option in ${language.toUpperCase()}`));
    }
  }

  const declaredYear = text(row.source_year);
  const sourceYear = declaredYear ? Number(declaredYear) : undefined;
  if (declaredYear && (!Number.isInteger(sourceYear) || sourceYear < 1990 || sourceYear > 2100)) {
    errors.push(rowError('INVALID_SOURCE_YEAR', 'source_year must be a year from 1990 to 2100'));
  }
  const sourceReference = text(row.source);
  if (sourceReference.length > 1024) errors.push(rowError('SOURCE_TOO_LONG', 'source must be 1024 characters or fewer'));
  const explanation = {};
  for (const language of LANGUAGES) {
    const value = text(row[`explanation${language === 'en' ? '' : `_${language}`}`]);
    if (value) explanation[language] = value;
  }
  const estimatedBytes = Object.values(content).reduce((sum, lang) => sum + Buffer.byteLength(lang.question_text) + lang.options.reduce((n, option) => n + Buffer.byteLength(option), 0), 0)
    + Object.values(explanation).reduce((sum, value) => sum + Buffer.byteLength(value), 0);
  if (estimatedBytes > 20_000) errors.push(rowError('QUESTION_TOO_LONG', 'Question, options, and explanations exceed the 20 KB per-row limit'));
  if (errors.length) return { errors };

  const languages = languageResult.languages;
  const fingerprintContent = [...languages].sort().map((language) => keyOf(
    language,
    content[language].question_text,
    ...content[language].options.map(comparisonText).sort(),
    content[language].options[LETTERS.indexOf(correctLetter)],
  )).join('\u001e');
  const fingerprint = hash(fingerprintContent);
  const code = `BULK-${fingerprint.slice(0, 20).toUpperCase()}`;
  const optionIds = Object.fromEntries(LETTERS.map((letter) => [letter, `opt_${hash(`${fingerprint}:${letter}`).slice(0, 8)}`]));
  const options = LETTERS.slice(0, optionCount).map((letter, index) => ({
    oid: optionIds[letter],
    text: Object.fromEntries(languages.map((language) => [language, content[language].options[index]])),
  }));
  const explanationText = Object.fromEntries(languages.filter((language) => explanation[language]).map((language) => [language, explanation[language]]));
  const examStage = rowExam.stages?.[0]?.tier || 'SINGLE';
  const doc = {
    code,
    exam_targets: [{ category, tier: examStage }],
    subject: subject.code,
    topic: topic.code,
    ...(row.subtopic && (() => {
      const subtopic = resolveSubtopic(topic, row.subtopic);
      if (!subtopic) return {};
      return { subtopic: subtopic.code };
    })()),
    difficulty,
    stem: Object.fromEntries(languages.map((language) => [language, content[language].question_text])),
    options,
    correct_option_id: optionIds[correctLetter],
    solution: { steps: Object.keys(explanationText).length ? [explanationText] : [] },
    ...(sourceReference && { source_reference: sourceReference }),
    ...(sourceYear && { source_year: sourceYear }),
    import_fingerprint: fingerprint,
    status: 'DRAFT',
    authored_by: `bulk-import:${batchId}`,
  };
  if (row.subtopic && !doc.subtopic) return { errors: [rowError('UNKNOWN_SUBTOPIC', `Unknown subtopic "${text(row.subtopic)}" for ${topic.code}`)] };
  return {
    doc,
    fingerprint,
    duplicateKeys: questionDuplicateKeys(doc.stem),
    languages,
    normalizedStems: Object.fromEntries(languages.map((language) => [language, comparisonText(content[language].question_text)])),
    preview: {
      subject: localizedText(subject.name),
      topic: localizedText(topic.name),
      question: doc.stem,
      options: doc.options.map((option) => option.text),
      correctAnswer: correctLetter,
      explanation: explanationText,
      difficulty: difficultyValue,
      language: languages.join(', '),
      source: sourceReference || null,
      sourceYear: sourceYear || null,
    },
  };
}

function tokenSimilarity(a, b) {
  const tokensA = new Set((a.match(/[\p{L}\p{N}]+/gu) || []).filter((token) => token.length > 1));
  const tokensB = new Set((b.match(/[\p{L}\p{N}]+/gu) || []).filter((token) => token.length > 1));
  if (Math.min(tokensA.size, tokensB.size) < 5) return 0;
  let intersection = 0;
  for (const token of tokensA) if (tokensB.has(token)) intersection += 1;
  return intersection / (tokensA.size + tokensB.size - intersection);
}

function mathSignature(value) {
  return (value.match(/\d+(?:[.,]\d+)?|[+\-*/=<>≤≥≠±×÷%^()]/gu) || []).join('');
}

function optionSignature(question, language) {
  const options = (question.options || []).map((option) => comparisonText(option.text?.[language] || '')).sort();
  const answer = comparisonText((question.options || [])
    .find((option) => option.oid === question.correct_option_id)?.text?.[language] || '');
  return { options, answer };
}

function sameOptionsAndAnswer(row, candidate, language) {
  const left = optionSignature(row.question_doc, language);
  const right = optionSignature(candidate, language);
  return JSON.stringify(left.options) === JSON.stringify(right.options)
    && left.answer === right.answer;
}

function duplicateClassification(row, candidate, language, existing) {
  const rowStem = row.normalizedStems[language];
  const candidateStem = comparisonText(candidate.stem?.[language] || '');
  const sameStem = rowStem === candidateStem;
  const similarity = sameStem ? 1 : tokenSimilarity(rowStem, candidateStem);
  if (!sameStem && (similarity < 0.72 || mathSignature(rowStem) !== mathSignature(candidateStem))) {
    return null;
  }

  const matchingOptions = sameOptionsAndAnswer(row, candidate, language);
  const base = {
    duplicateReference: existing ? String(candidate._id) : `row ${candidate.rowNumber}`,
    duplicateCode: candidate.code || null,
    duplicateId: existing ? String(candidate._id) : null,
    duplicateType: existing ? 'DATABASE' : 'UPLOAD',
    duplicateQuestion: existing ? {
      id: String(candidate._id),
      code: candidate.code,
      subject: candidate.subject,
      topic: candidate.topic,
      categories: (candidate.exam_targets || []).map((target) => target.category),
      question: candidate.stem,
    } : null,
  };
  if (sameStem && matchingOptions) {
    return {
      ...base,
      status: 'EXACT_DUPLICATE',
      duplicateReason: `Same ${language.toUpperCase()} question after Unicode and whitespace normalization; options and correct answer match.`,
    };
  }
  if (sameStem || !matchingOptions) {
    return {
      ...base,
      status: 'ANSWER_CONFLICT',
      duplicateReason: `${sameStem ? `Same ${language.toUpperCase()} question text` : `Similar ${language.toUpperCase()} wording (${Math.round(similarity * 100)}% token overlap)`}, but options or the correct answer differ.`,
    };
  }
  return {
    ...base,
    status: 'POSSIBLE_DUPLICATE',
    duplicateReason: `Similar ${language.toUpperCase()} wording (${Math.round(similarity * 100)}% token overlap); numbers and mathematical operators match.`,
  };
}

function exactCandidatesForRow(row, candidatesByKey) {
  return [...new Map(row.duplicateKeys.flatMap((key) => candidatesByKey.get(key) || [])
    .map((candidate) => [String(candidate._id), candidate])).values()];
}

function exactLanguageForCandidate(row, candidate) {
  return row.languages.find((language) => (
    comparisonText(candidate.stem?.[language] || '') === row.normalizedStems[language]
  ));
}

async function ensureDuplicateKeysReady() {
  const migration = await Question.db.db.collection('question_import_migrations')
    .findOne({ _id: 'question_duplicate_keys_v1' });
  if (!migration) {
    throw new AppError(
      503,
      'DUPLICATE_INDEX_NOT_READY',
      'Question duplicate index is not ready. Run npm run db:duplicate-keys before importing.',
    );
  }
}

function blankCounts(totalRows = 0) {
  return {
    totalRows,
    validRows: 0,
    invalidRows: 0,
    exactDuplicates: 0,
    possibleDuplicates: 0,
    answerConflicts: 0,
    questionsAlreadyPresent: 0,
    newQuestionsReady: 0,
    successfullyImported: 0,
    failedRows: 0,
  };
}

function summaryForRows(rows, imported = 0, failed = 0) {
  const counts = blankCounts(rows.length);
  for (const row of rows) {
    const duplicateStatus = row.reviewedDuplicateStatus || row.status;
    if (row.status === 'INVALID') counts.invalidRows += 1;
    if (row.status === 'EXACT_DUPLICATE') {
      counts.exactDuplicates += 1;
      if (row.duplicateType === 'DATABASE') counts.questionsAlreadyPresent += 1;
    }
    if (duplicateStatus === 'POSSIBLE_DUPLICATE') {
      counts.possibleDuplicates += 1;
    }
    if (duplicateStatus === 'ANSWER_CONFLICT') {
      counts.answerConflicts += 1;
    }
    if (['NEW', 'IMPORTED', 'FAILED', 'POSSIBLE_DUPLICATE', 'ANSWER_CONFLICT', 'SKIPPED_POSSIBLE_DUPLICATE', 'SKIPPED_ANSWER_CONFLICT'].includes(row.status)) counts.validRows += 1;
    if (['NEW', 'IMPORTED', 'FAILED'].includes(row.status)) {
      counts.newQuestionsReady += 1;
    }
  }
  counts.successfullyImported = imported;
  counts.failedRows = failed;
  return counts;
}

function csvSafe(value) {
  const content = String(value ?? '').replace(/\r\n?/g, '\n');
  const neutralized = /^[\s\u0000-\u001f]*[=+\-@]/.test(content) ? `'${content}` : content;
  return `"${neutralized.replace(/"/g, '""')}"`;
}

function localizedColumns(value) {
  return ['en', 'bn', 'hi'].map((language) => value?.[language] || '');
}

function catalogRows(categories) {
  const taxonomy = [];
  const exams = [];
  for (const category of categories) {
    const categoryNames = localizedColumns(category.name);
    const examCodes = (category.exams || [])
      .filter((exam) => exam.is_active !== false)
      .map((exam) => exam.code);
    exams.push(...(category.exams || [])
      .filter((exam) => exam.is_active !== false)
      .map((exam) => [
        category.code,
        ...categoryNames,
        exam.code,
        ...localizedColumns(exam.name),
      ]));
    for (const subject of category.subjects || []) {
      for (const topic of subject.topics || []) {
        const subtopics = topic.subtopics?.length ? topic.subtopics : [null];
        for (const subtopic of subtopics) {
          const aliases = subtopic
            ? [...(SUBTOPIC_ALIASES[topic.code] || new Map())]
              .filter(([, canonicalCode]) => canonicalCode === subtopic.code)
              .map(([alias]) => alias)
            : [];
          for (const acceptedCode of [subtopic?.code || '', ...aliases]) {
            taxonomy.push([
              category.code,
              ...categoryNames,
              subject.code,
              ...localizedColumns(subject.name),
              topic.code,
              ...localizedColumns(topic.name),
              acceptedCode,
              subtopic?.code || '',
              ...localizedColumns(subtopic?.name),
              examCodes.join('; '),
            ]);
          }
        }
      }
    }
  }
  return { taxonomy, exams };
}

async function loadCatalogRows() {
  const categories = await ExamCategory.find({ is_active: true }).sort({ display_order: 1 }).lean();
  return catalogRows(categories);
}

async function createTemplate() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Exam Preparation Platform';
  workbook.subject = 'Admin question bulk-import template';
  const { taxonomy, exams } = await loadCatalogRows();
  const sheet = workbook.addWorksheet('Questions');
  sheet.addRow(HEADERS);
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
  sheet.columns = HEADERS.map((header) => ({ header, key: header, width: Math.max(16, Math.min(30, header.length + 4)) }));
  sheet.addRows([
    {
      question_text: 'If 25% of a number is 40, what is the number?',
      question_text_bn: 'একটি সংখ্যার ২৫% যদি ৪০ হয়, সংখ্যাটি কত?',
      question_type: 'MCQ',
      option_a: '120', option_a_bn: '১২০',
      option_b: '140', option_b_bn: '১৪০',
      option_c: '160', option_c_bn: '১৬০',
      option_d: '180', option_d_bn: '১৮০',
      correct_answer: 'C',
      explanation: 'Let the number be x. Then 0.25x = 40, so x = 160.',
      explanation_bn: 'ধরি সংখ্যাটি x। ০.২৫x = ৪০, তাই x = ১৬০।',
      subject: 'Quantitative Aptitude', topic: 'percentage', exam_name: 'WBCS', difficulty: 'Easy', language: 'Bilingual',
    },
    {
      question_text: 'Choose the synonym of “brief”.',
      question_type: 'MCQ',
      option_a: 'Concise', option_b: 'Distant', option_c: 'Unclear', option_d: 'Careless',
      correct_answer: 'A', explanation: 'Brief means short in duration or concise.',
      subject: 'English', topic: 'synonyms_antonyms', exam_name: 'WBCS', difficulty: 'Easy', language: 'English',
    },
    {
      question_text: 'Which is the largest planet in the Solar System?',
      question_type: 'MCQ',
      option_a: 'Earth', option_b: 'Mars', option_c: 'Jupiter', option_d: 'Venus',
      correct_answer: 'C', explanation: 'Jupiter is the largest planet in the Solar System.',
      subject: 'General Studies', topic: 'general_science', exam_name: 'WBCS', difficulty: 'Easy', language: 'English',
    },
    {
      question_text: 'Which river flows through Kolkata?',
      question_type: 'MCQ',
      option_a: 'Damodar', option_b: 'Hooghly', option_c: 'Teesta', option_d: 'Mayurakshi',
      correct_answer: 'B', explanation: 'The Hooghly River flows by Kolkata.',
      subject: 'General Studies', topic: 'geography', exam_name: 'WBCS', difficulty: 'Medium', language: 'English',
    },
    {
      question_text: 'Which district is famous for the Bishnupur terracotta temples?',
      question_type: 'MCQ',
      option_a: 'Bankura', option_b: 'Malda', option_c: 'Jalpaiguri', option_d: 'Nadia',
      correct_answer: 'A', explanation: 'Bishnupur is in Bankura district.',
      subject: 'General Knowledge', topic: 'west_bengal_gk', exam_name: 'WBCS', difficulty: 'Easy', language: 'English',
    },
  ]);
  const instructions = workbook.addWorksheet('Instructions');
  instructions.addRows([
    ['Bulk question import — instructions'],
    ['Required columns', REQUIRED_HEADERS.join(', ')],
    ['Question content', 'Provide question_text plus matching option_a, option_b, option_c. Add option_d only when needed. For Bengali/other translations use the _bn or _hi columns for both stem and options.'],
    ['Question type', 'MCQ only. Correct answer must be A, B, C, or D and refer to an option present in every supplied language.'],
    ['Subjects, topics, and subtopics', 'Use the exact codes in the Taxonomy sheet (recommended), or a configured English name. Blank subtopic is allowed. The admin selections supply subject/topic defaults when row values are blank. No taxonomy records are created by import.'],
    ['Examinations', 'Choose an exam_code listed on the Exams sheet for the selected category. The upload form selection takes precedence over row values.'],
    ['Difficulty', 'Use Easy, Medium, Hard, or an integer from 1 to 5.'],
    ['Language', 'Use English, Bengali, Hindi, or Bilingual. Leave blank to infer from supplied question and option columns.'],
    ['Source fields', 'source and source_year are preserved as metadata only. They do not mark a question as a verified PYQ.'],
    ['Exam scoring', 'marks and negative marks are not question fields in the current database; mock marking comes from the configured exam pattern.'],
    ['Duplicates', 'The database is checked across categories, subjects, and topics. Exact duplicates are skipped; possible duplicates and answer conflicts require an explicit Import as new draft or Skip decision. Existing questions are never modified.'],
    ['Publication', 'All imported questions are saved as DRAFT and require editorial review before publication.'],
    ['Invalid example', 'A row with a blank question_text, missing option_b, question_type=Essay, or correct_answer=E is rejected with its spreadsheet row number.'],
    ['File limits', `Upload .xlsx or UTF-8 .csv, maximum ${MAX_FILE_BYTES / 1024 / 1024} MB and ${MAX_ROWS} data rows.`],
  ]);
  instructions.getRow(1).font = { bold: true, size: 16 };
  instructions.getColumn(1).width = 28;
  instructions.getColumn(2).width = 110;
  instructions.eachRow((row) => { row.alignment = { vertical: 'top', wrapText: true }; });
  const taxonomySheet = workbook.addWorksheet('Taxonomy');
  taxonomySheet.addRow(CATALOG_HEADERS);
  taxonomySheet.addRows(taxonomy);
  taxonomySheet.views = [{ state: 'frozen', ySplit: 1 }];
  taxonomySheet.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + CATALOG_HEADERS.length)}${taxonomy.length + 1}` };
  taxonomySheet.columns = CATALOG_HEADERS.map((header) => ({ header, key: header, width: Math.max(18, Math.min(32, header.length + 3)) }));
  taxonomySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  taxonomySheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
  const examsSheet = workbook.addWorksheet('Exams');
  examsSheet.addRow(EXAM_HEADERS);
  examsSheet.addRows(exams);
  examsSheet.views = [{ state: 'frozen', ySplit: 1 }];
  examsSheet.autoFilter = { from: 'A1', to: `${String.fromCharCode(64 + EXAM_HEADERS.length)}${exams.length + 1}` };
  examsSheet.columns = EXAM_HEADERS.map((header) => ({ header, key: header, width: Math.max(18, Math.min(32, header.length + 3)) }));
  examsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  examsSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
  return workbook.xlsx.writeBuffer();
}

async function createCatalogCsv() {
  const { taxonomy } = await loadCatalogRows();
  const rows = [CATALOG_HEADERS, ...taxonomy];
  return `${rows.map((row) => row.map(csvSafe).join(',')).join('\r\n')}\r\n`;
}

function createCsvTemplate() {
  const rows = [
    HEADERS,
    ['What is 2 + 2?', '', '', 'MCQ', '3', '', '', '4', '', '', '5', '', '', '', '', '', 'B', 'Add the two numbers.', '', '', 'Quantitative Aptitude', 'simplification', '', 'WBCS', 'Easy', 'English', '', ''],
    ['Choose the synonym of “brief”.', '', '', 'MCQ', 'Concise', '', '', 'Distant', '', '', 'Unclear', '', '', '', '', '', 'A', 'Brief means concise.', '', '', 'English', 'synonyms_antonyms', '', 'WBCS', 'Easy', 'English', '', ''],
    ['Which is the largest planet in the Solar System?', '', '', 'MCQ', 'Earth', '', '', 'Mars', '', '', 'Jupiter', '', '', 'Venus', '', '', 'C', 'Jupiter is the largest planet.', '', '', 'General Studies', 'general_science', '', 'WBCS', 'Easy', 'English', '', ''],
    ['Which river flows through Kolkata?', '', '', 'MCQ', 'Damodar', '', '', 'Hooghly', '', '', 'Teesta', '', '', 'Mayurakshi', '', '', 'B', 'The Hooghly flows by Kolkata.', '', '', 'General Studies', 'geography', '', 'WBCS', 'Medium', 'English', '', ''],
    ['Which district is famous for the Bishnupur terracotta temples?', '', '', 'MCQ', 'Bankura', '', '', 'Malda', '', '', 'Jalpaiguri', '', '', 'Nadia', '', '', 'A', 'Bishnupur is in Bankura district.', '', '', 'General Knowledge', 'west_bengal_gk', '', 'WBCS', 'Easy', 'English', '', ''],
  ];
  return `${rows.map((row) => row.map(csvSafe).join(',')).join('\r\n')}\r\n`;
}

async function previewImport({ file, category: categoryCode, examCode, defaultSubject, defaultTopic, userId }) {
  await ensureDuplicateKeysReady();
  const records = await parseUpload(file);
  const inputRows = recordObjects(records);
  if (!inputRows.length) throw AppError.badRequest('Upload must contain at least one question row');

  const categoryDoc = await ExamCategory.findOne({ code: categoryCode, is_active: true }).lean();
  if (!categoryDoc) throw AppError.badRequest('Select an active exam category');
  const exam = categoryDoc.exams?.find((item) => item.code === examCode && item.is_active !== false);
  if (!exam) throw AppError.badRequest('Select an active examination in the chosen category');

  const batchId = new mongoose.Types.ObjectId();
  let inputBytes = 0;
  const rows = inputRows.map(({ rowNumber, record }) => {
    inputBytes += Object.values(record).reduce((sum, value) => sum + Buffer.byteLength(typeof value === 'string' ? value : ''), 0);
    if (inputBytes > MAX_TEXT_BYTES) {
      return { rowNumber, status: 'INVALID', errors: [rowError('FILE_CONTENT_LIMIT', 'Parsed question text exceeds the 6 MB total limit')] };
    }
    const normalized = makeQuestion({
      row: record,
      category: categoryCode,
      exam,
      categoryDoc,
      defaultSubject,
      defaultTopic,
      batchId: String(batchId),
    });
    return {
      rowNumber,
      status: normalized.errors ? 'INVALID' : 'NEW',
      ...(normalized.errors ? { errors: normalized.errors } : {
        question_doc: normalized.doc,
        fingerprint: normalized.fingerprint,
        duplicateKeys: normalized.duplicateKeys,
        languages: normalized.languages,
        normalizedStems: normalized.normalizedStems,
        preview: normalized.preview,
      }),
    };
  });

  const goodRows = rows.filter((row) => row.question_doc);
  const duplicateKeys = [...new Set(goodRows.flatMap((row) => row.duplicateKeys))];
  const keyCandidates = duplicateKeys.length
    ? await Question.find({ duplicate_keys: { $in: duplicateKeys } })
      .select('_id code subject topic exam_targets.category stem options +correct_option_id +duplicate_keys')
      .limit(10_001)
      .maxTimeMS(5_000)
      .lean()
    : [];
  if (keyCandidates.length > 10_000) {
    throw new AppError(503, 'DUPLICATE_MATCH_LIMIT', 'Too many existing exact matches were found. Split the upload into smaller files and review this repeated question.');
  }
  const candidatesByKey = new Map();
  for (const candidate of keyCandidates) {
    for (const key of candidate.duplicate_keys || []) {
      if (!candidatesByKey.has(key)) candidatesByKey.set(key, []);
      candidatesByKey.get(key).push(candidate);
    }
  }
  const textSearchRows = goodRows.filter((row) => !exactCandidatesForRow(row, candidatesByKey)
    .some((candidate) => exactLanguageForCandidate(row, candidate)));
  const similarCandidatesByRow = new Map();
  for (let start = 0; start < textSearchRows.length; start += 8) {
    const group = textSearchRows.slice(start, start + 8);
    const results = await Promise.all(group.map(async (row) => {
      const terms = [...new Set(row.languages.flatMap((language) => (
        row.question_doc.stem[language]?.match(/[\p{L}\p{N}]+/gu) || []
      )))]
        .sort((a, b) => b.length - a.length)
        .slice(0, 12);
      if (!terms.length) return [row.rowNumber, []];
      const matches = await Question.find({
        $text: { $search: terms.join(' '), $language: 'none' },
      })
        .select('_id code subject topic exam_targets.category stem options +correct_option_id +duplicate_keys')
        .sort({ score: { $meta: 'textScore' } })
        .limit(30)
        .maxTimeMS(5_000)
        .lean();
      return [row.rowNumber, matches];
    }));
    for (const [rowNumber, matches] of results) similarCandidatesByRow.set(rowNumber, matches);
  }

  const seenUploadedKeys = new Map();
  for (const row of goodRows) {
    const exactCandidates = exactCandidatesForRow(row, candidatesByKey);
    const existingMatches = exactCandidates.flatMap((candidate) => {
      const language = exactLanguageForCandidate(row, candidate);
      if (!language) return [];
      return [duplicateClassification(row, candidate, language, true)];
    }).filter(Boolean);
    const existingMatch = existingMatches.find((match) => match.status === 'ANSWER_CONFLICT')
      || existingMatches.find((match) => match.status === 'EXACT_DUPLICATE');
    if (existingMatch) {
      Object.assign(row, existingMatch);
      continue;
    }

    const uploadedMatch = row.duplicateKeys.map((key) => seenUploadedKeys.get(key)).find(Boolean);
    if (uploadedMatch) {
      const language = exactLanguageForCandidate(row, uploadedMatch.question_doc);
      if (language) {
        Object.assign(row, duplicateClassification(row, {
          ...uploadedMatch.question_doc,
          rowNumber: uploadedMatch.rowNumber,
        }, language, false));
      }
      continue;
    }

    const possibleExisting = (similarCandidatesByRow.get(row.rowNumber) || [])
      .flatMap((candidate) => row.languages.flatMap((language) => {
        if (!candidate.stem?.[language]) return [];
        return [duplicateClassification(row, candidate, language, true)];
      }))
      .filter(Boolean)
      .sort((a, b) => Number(b.status === 'ANSWER_CONFLICT') - Number(a.status === 'ANSWER_CONFLICT'))[0];
    const earlierRows = goodRows.filter((other) => other.rowNumber < row.rowNumber && other.status === 'NEW');
    const possibleUpload = earlierRows.flatMap((other) => row.languages.flatMap((language) => {
      if (!other.question_doc.stem?.[language]) return [];
      return [duplicateClassification(row, { ...other.question_doc, rowNumber: other.rowNumber }, language, false)];
    })).filter(Boolean)[0];
    if (possibleExisting || possibleUpload) {
      Object.assign(row, possibleExisting || possibleUpload);
    } else {
      for (const key of row.duplicateKeys) seenUploadedKeys.set(key, row);
    }
  }

  const summary = summaryForRows(rows);
  const batch = new QuestionImportBatch({
    _id: batchId,
    status: 'PREVIEWED',
    uploaded_by: userId,
    category: categoryCode,
    exam_code: exam.code,
    file_name: safeName(file.originalname),
    summary: { ...summary, expiresAt: new Date(Date.now() + PREVIEW_TTL_MS) },
    rows,
  });
  await batch.save();
  return { batchId: String(batch._id), status: batch.status, expiresAt: batch.summary.expiresAt, summary, rows: rows.map(presentRow) };
}

function presentRow(row) {
  return {
    rowNumber: row.rowNumber,
    status: row.status,
    errors: row.errors || [],
    duplicateReference: row.duplicateReference || null,
    duplicateId: row.duplicateId || null,
    duplicateCode: row.duplicateCode || null,
    duplicateType: row.duplicateType || null,
    duplicateReason: row.duplicateReason || null,
    duplicateQuestion: row.duplicateQuestion || null,
    duplicateDecision: row.duplicateDecision || null,
    question: row.preview || null,
  };
}

function ensureBatchObjectId(id) {
  if (!mongoose.isValidObjectId(id)) throw AppError.badRequest('Invalid import batch id');
  return new mongoose.Types.ObjectId(id);
}

async function confirmImport({ batchId, userId, duplicateDecisions = [] }) {
  const id = ensureBatchObjectId(batchId);
  const batch = await QuestionImportBatch.findOne({ _id: id, uploaded_by: userId });
  if (!batch) throw AppError.notFound('IMPORT_BATCH_NOT_FOUND', 'Import batch not found');
  if (batch.status === 'COMPLETED') {
    return { batchId: String(id), status: batch.status, summary: batch.summary, rows: batch.rows.map(presentRow) };
  }
  if (batch.summary?.expiresAt && new Date(batch.summary.expiresAt) < new Date()) {
    throw AppError.conflict('IMPORT_PREVIEW_EXPIRED', 'Preview expired; upload the file again to create a new preview');
  }
  const decisionByRow = new Map(duplicateDecisions.map(({ rowNumber, decision }) => [rowNumber, decision]));
  const unresolvedRows = batch.rows.filter((row) => ['POSSIBLE_DUPLICATE', 'ANSWER_CONFLICT'].includes(row.status));
  const allowedRows = new Set(unresolvedRows.map((row) => row.rowNumber));
  if (decisionByRow.size !== duplicateDecisions.length || [...decisionByRow.keys()].some((rowNumber) => !allowedRows.has(rowNumber))) {
    throw AppError.badRequest('Duplicate decisions must refer to possible-duplicate or answer-conflict rows in this preview');
  }
  if (unresolvedRows.some((row) => !decisionByRow.has(row.rowNumber))) {
    throw AppError.badRequest('Review every possible duplicate and answer conflict before confirming this import');
  }
  const retryPartial = batch.status === 'PARTIAL';

  const staleBefore = new Date(Date.now() - 5 * 60_000);
  const locked = await QuestionImportBatch.findOneAndUpdate(
    {
      _id: id,
      uploaded_by: userId,
      $or: [
        { status: 'PREVIEWED' },
        { status: 'PARTIAL' },
        { status: 'IMPORTING', import_started_at: { $lt: staleBefore } },
      ],
    },
    { $set: { status: 'IMPORTING', confirmed_by: userId, import_started_at: new Date() } },
    { returnDocument: 'after' },
  );
  if (!locked) throw AppError.conflict('IMPORT_IN_PROGRESS', 'This import is already being confirmed');

  const rows = locked.rows.map((row) => ({ ...(row.toObject?.() || row) }));
  for (const row of rows) {
    if (retryPartial && row.status === 'FAILED') {
      row.status = 'NEW';
      row.errors = [];
    } else if (['POSSIBLE_DUPLICATE', 'ANSWER_CONFLICT'].includes(row.status)) {
      row.reviewedDuplicateStatus = row.status;
      row.duplicateDecision = decisionByRow.get(row.rowNumber);
      if (decisionByRow.get(row.rowNumber) === 'SKIP') {
        row.status = `SKIPPED_${row.status}`;
        delete row.question_doc;
      } else {
        row.status = 'NEW';
      }
    }
  }
  const accepted = rows.filter((row) => row.status === 'NEW' && row.question_doc);
  let writeError;
  if (accepted.length) {
    try {
      await Question.insertMany(accepted.map((row) => row.question_doc), { ordered: false });
    } catch (error) {
      writeError = error;
    }
  }

  const acceptedFingerprints = accepted.map((row) => row.fingerprint).filter(Boolean);
  const persisted = acceptedFingerprints.length
    ? await Question.find({ import_fingerprint: { $in: acceptedFingerprints } }).select('code authored_by +import_fingerprint').lean()
    : [];
  const persistedByFingerprint = new Map(persisted.map((question) => [question.import_fingerprint, question]));
  const writeErrors = new Map((writeError?.writeErrors || []).map((item) => [item.index, item]));
  let imported = 0;
  let failed = 0;
  accepted.forEach((row, index) => {
    const found = persistedByFingerprint.get(row.fingerprint);
    if (found?.authored_by === `bulk-import:${String(id)}`) {
      row.status = 'IMPORTED';
      row.importedCode = found.code;
      imported += 1;
    } else if (found) {
      row.status = 'EXACT_DUPLICATE';
      row.duplicateType = 'DATABASE';
      row.duplicateReference = String(found._id);
      row.duplicateId = String(found._id);
      row.duplicateCode = found.code;
      row.duplicateReason = 'The question was imported by another batch after this preview was created.';
      delete row.question_doc;
    } else {
      row.status = 'FAILED';
      row.errors = [rowError('DATABASE_WRITE_FAILED', 'Database rejected this row. Check the row and retry the import.')];
      if (writeErrors.get(index)?.code === 11000) {
        row.errors = [rowError('DUPLICATE_RACE', 'An identical question was imported by another batch; upload it again to see the existing-question match.')];
      }
      failed += 1;
    }
  });

  const finalRows = rows.map((row) => {
    if (row.status === 'IMPORTED' || row.status === 'EXACT_DUPLICATE'
      || row.status.startsWith('SKIPPED_') || row.status === 'INVALID') {
      delete row.question_doc;
    }
    return row;
  });
  const summary = summaryForRows(finalRows, imported, failed);
  const status = failed ? 'PARTIAL' : 'COMPLETED';
  locked.status = status;
  locked.summary = { ...summary, expiresAt: locked.summary.expiresAt };
  locked.rows = finalRows;
  locked.confirmed_at = new Date();
  await locked.save();
  return { batchId: String(id), status, summary, rows: finalRows.map(presentRow) };
}

async function listHistory({ page = 1, limit = 10, userId }) {
  const filter = { uploaded_by: userId };
  const [batches, total] = await Promise.all([
    QuestionImportBatch.find(filter).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit).select('-rows').lean(),
    QuestionImportBatch.countDocuments(filter),
  ]);
  const authors = batches.map((batch) => `bulk-import:${batch._id}`);
  const questionCounts = authors.length
    ? await Question.aggregate([
      { $match: { authored_by: { $in: authors }, status: { $in: ['DRAFT', 'PUBLISHED'] } } },
      { $group: { _id: { authored_by: '$authored_by', status: '$status' }, count: { $sum: 1 } } },
    ])
    : [];
  const countsByAuthor = new Map();
  for (const item of questionCounts) {
    const counts = countsByAuthor.get(item._id.authored_by) || { DRAFT: 0, PUBLISHED: 0 };
    counts[item._id.status] = item.count;
    countsByAuthor.set(item._id.authored_by, counts);
  }
  return {
    batches: batches.map((batch) => ({
      id: String(batch._id),
      status: batch.status,
      fileName: batch.file_name,
      category: batch.category,
      examCode: batch.exam_code,
      uploadedBy: batch.uploaded_by,
      confirmedBy: batch.confirmed_by || null,
      uploadedAt: batch.created_at,
      confirmedAt: batch.confirmed_at || null,
      publishedAt: batch.published_at || null,
      draftCount: countsByAuthor.get(`bulk-import:${batch._id}`)?.DRAFT || 0,
      publishedCount: countsByAuthor.get(`bulk-import:${batch._id}`)?.PUBLISHED || 0,
      summary: batch.summary,
    })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function publishBatch({ batchId, userId, reviewedBy }) {
  const id = ensureBatchObjectId(batchId);
  const batch = await QuestionImportBatch.findOne({ _id: id, uploaded_by: userId }).select('status').lean();
  if (!batch) throw AppError.notFound('IMPORT_BATCH_NOT_FOUND', 'Import batch not found');
  if (!['COMPLETED', 'PARTIAL'].includes(batch.status)) {
    throw AppError.conflict('IMPORT_BATCH_NOT_CONFIRMED', 'Confirm the import before publishing its questions');
  }

  const authoredBy = `bulk-import:${id}`;
  const drafts = await Question.find({ authored_by: authoredBy, status: 'DRAFT' })
    .select('_id subject topic subtopic stem.en')
    .lean();
  const rules = loadRules();
  const operations = drafts.map((question) => {
    const pattern = classify(rules[question.subject]?.[question.topic], question);
    return {
      updateOne: {
        filter: { _id: question._id, authored_by: authoredBy, status: 'DRAFT' },
        update: {
          $set: {
            status: 'PUBLISHED',
            reviewed_by: reviewedBy,
            ...(pattern && { pattern }),
          },
          ...(!pattern && { $unset: { pattern: '' } }),
        },
      },
    };
  });
  const result = operations.length
    ? await Question.bulkWrite(operations, { ordered: false })
    : { modifiedCount: 0 };
  const [draftCount, publishedCount] = await Promise.all([
    Question.countDocuments({ authored_by: authoredBy, status: 'DRAFT' }),
    Question.countDocuments({ authored_by: authoredBy, status: 'PUBLISHED' }),
  ]);
  const publishedAt = publishedCount > 0 ? new Date() : null;
  await QuestionImportBatch.updateOne(
    { _id: id, uploaded_by: userId },
    {
      $set: {
        published_count: publishedCount,
        ...(publishedAt && { published_at: publishedAt }),
      },
    },
  );
  return {
    batchId: String(id),
    publishedCount: result.modifiedCount,
    totalPublishedCount: publishedCount,
    remainingDraftCount: draftCount,
  };
}

async function errorReport(batchId, userId) {
  const id = ensureBatchObjectId(batchId);
  const batch = await QuestionImportBatch.findOne({ _id: id, uploaded_by: userId }).select('file_name rows').lean();
  if (!batch) throw AppError.notFound('IMPORT_BATCH_NOT_FOUND', 'Import batch not found');
  const rows = batch.rows.filter((row) => row.errors?.length
    || ['EXACT_DUPLICATE', 'POSSIBLE_DUPLICATE', 'ANSWER_CONFLICT', 'SKIPPED_POSSIBLE_DUPLICATE', 'SKIPPED_ANSWER_CONFLICT'].includes(row.status));
  const headers = ['row_number', 'status', 'error_codes', 'messages', 'duplicate_reference'];
  const csv = [headers, ...rows.map((row) => [
    row.rowNumber,
    row.status,
    (row.errors || []).map((error) => error.code).join('; '),
    (row.errors || []).map((error) => error.message).join('; ') || row.duplicateReason || '',
    row.duplicateReference || '',
  ])].map((row) => row.map(csvSafe).join(',')).join('\r\n');
  return { fileName: `${path.parse(batch.file_name).name}-import-report.csv`, csv: `${csv}\r\n` };
}

module.exports = {
  HEADERS,
  CATALOG_HEADERS,
  MAX_FILE_BYTES,
  MAX_ROWS,
  createTemplate,
  createCatalogCsv,
  createCsvTemplate,
  previewImport,
  confirmImport,
  listHistory,
  publishBatch,
  errorReport,
  parseCsv,
  parseUpload,
  tokenSimilarity,
};
