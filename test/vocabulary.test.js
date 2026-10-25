'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createApp } = require('../src/app');
const {
  VocabularyWord,
  VocabularyProgress,
  VocabularyDailyWord,
  VocabularyDailyActivity,
  VocabularySettings,
  VocabularyPracticeSession,
} = require('../src/models');
const { parseEntry, parseJsonl } = require('../src/services/vocabularyImport');

let mongod;
let server;
let base;
let words;

function entry(word, index) {
  return {
    word,
    meaningBn: `অর্থ ${index}`,
    definitionEn: `A distinct meaning for ${word}.`,
    partOfSpeech: 'ADJECTIVE',
    synonyms: [`synonym-${index}-a`, `synonym-${index}-b`, `synonym-${index}-c`],
    antonyms: [`antonym-${index}-a`, `antonym-${index}-b`, `antonym-${index}-c`],
    exampleEn: `This ${word} example is useful.`,
    exampleBn: `${word} শব্দের উদাহরণ।`,
    difficulty: 'BEGINNER',
    categories: ['qualities'],
    examRelevance: [{ basis: 'GENERAL' }],
  };
}

async function api(method, url, body, user) {
  const response = await fetch(`${base}${url}`, {
    method,
    headers: {
      ...(body && { 'content-type': 'application/json' }),
      ...(user && { 'x-user-id': user }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, body: await response.json() };
}

test.before(async () => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('vocabulary_test'));
  await Promise.all([
    VocabularyWord.init(),
    VocabularyProgress.init(),
    VocabularyDailyWord.init(),
    VocabularyDailyActivity.init(),
    VocabularySettings.init(),
    VocabularyPracticeSession.init(),
  ]);
  words = await VocabularyWord.insertMany(
    ['abundant', 'benevolent', 'candid', 'diligent', 'eloquent', 'frugal'].map((word, index) => ({
      word: word[0].toUpperCase() + word.slice(1),
      normalized_word: word,
      meaning_bn: `অর্থ ${index}`,
      meaning_bn_normalized: `অর্থ ${index}`,
      meaning_bn_tokens: [`অর্থ`, String(index)],
      definition_en: `A distinct meaning for ${word}.`,
      part_of_speech: 'ADJECTIVE',
      synonyms: [`synonym-${index}-a`, `synonym-${index}-b`, `synonym-${index}-c`],
      antonyms: [`antonym-${index}-a`, `antonym-${index}-b`, `antonym-${index}-c`],
      example_en: `This ${word} example is useful.`,
      example_bn: `${word} শব্দের উদাহরণ।`,
      difficulty: 'BEGINNER',
      categories: ['qualities'],
      exam_relevance: [{ basis: 'GENERAL' }],
      status: 'PUBLISHED',
      source_status: 'UNVERIFIED',
    })),
  );
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1`;
});

test.after(async () => {
  server?.close();
  await mongoose.disconnect();
  await mongod?.stop();
});

test('public library searches Bengali and English but hides internal answer fields and drafts', async () => {
  await VocabularyWord.create({
    ...{
      word: 'Hidden',
      normalized_word: 'hidden',
      meaning_bn: 'গোপন',
      meaning_bn_normalized: 'গোপন',
      meaning_bn_tokens: ['গোপন'],
      definition_en: 'Not published to students.',
      part_of_speech: 'ADJECTIVE',
      synonyms: ['concealed'],
      antonyms: ['visible'],
      example_en: 'The hidden word is not available.',
      example_bn: 'গোপন শব্দটি উপলভ্য নয়।',
      difficulty: 'BEGINNER',
      categories: ['qualities'],
      status: 'DRAFT',
    },
  });
  const english = await api('GET', '/vocabulary/words?q=abun');
  assert.equal(english.status, 200);
  assert.equal(english.body.data.total, 1);
  assert.equal(english.body.data.words[0].word, 'Abundant');
  assert.equal('correct_option_id' in english.body.data.words[0], false);
  const bengali = await api('GET', '/vocabulary/words?q=%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%A5');
  assert.ok(bengali.body.data.words.some((word) => word.word === 'Candid'));
  const hidden = await api('GET', '/vocabulary/words?q=hidden');
  assert.equal(hidden.body.data.total, 0);
});

test('personal progress, daily target, due revision, and missed-word tracking are account scoped', async () => {
  const unauthorized = await api('GET', '/vocabulary/progress/summary');
  assert.equal(unauthorized.status, 401);

  const target = await api('PUT', '/vocabulary/progress/settings', { dailyTarget: 15, timezoneOffsetMin: 330 }, 'student-a');
  assert.equal(target.body.data.dailyTarget, 15);
  let marked = await api('PATCH', `/vocabulary/progress/words/${words[0]._id}`, { state: 'learned', value: true }, 'student-a');
  assert.equal(marked.status, 200);
  await api('PATCH', `/vocabulary/progress/words/${words[0]._id}`, { state: 'favourite', value: true }, 'student-a');
  let summary = await api('GET', '/vocabulary/progress/summary', undefined, 'student-a');
  assert.deepEqual([summary.body.data.learnedToday, summary.body.data.learned, summary.body.data.favourite, summary.body.data.dailyTarget], [1, 1, 1, 15]);

  await VocabularyProgress.updateOne(
    { user_id: 'student-a', word_id: words[0]._id },
    { $set: { next_review_at: new Date(Date.now() - 1000) } },
  );
  const due = await api('GET', '/vocabulary/progress/review?type=due', undefined, 'student-a');
  assert.equal(due.body.data.words.length, 1);
  const result = await api('POST', '/vocabulary/progress/review', { wordId: String(words[0]._id), known: false }, 'student-a');
  assert.equal(result.body.data.intervalDays, 1);
  assert.equal(result.body.data.word.progress.missCount, 1);
  const missed = await api('GET', '/vocabulary/progress/review?type=missed', undefined, 'student-a');
  assert.equal(missed.body.data.words.length, 1);
  const otherStudent = await api('GET', '/vocabulary/words?status=favourite', undefined, 'student-b');
  assert.equal(otherStudent.body.data.total, 0);
});

test('practice keeps answers server-side until checked and supports every requested mode', async () => {
  for (const mode of ['meaning', 'synonym', 'antonym', 'fill_blank', 'context', 'identify', 'match']) {
    const created = await api('POST', '/vocabulary/practice/sessions', { mode, count: 1 }, 'student-practice');
    assert.equal(created.status, 201, mode);
    const question = created.body.data.questions[0];
    assert.equal(Object.hasOwn(question, 'correctOptionId'), false, mode);
    const tokenHash = crypto.createHash('sha256').update(created.body.data.sessionToken).digest('hex');
    const session = await VocabularyPracticeSession.findOne({ token_hash: tokenHash }).lean();
    const stored = session.items.find((item) => item.question_id === question.questionId);
    const checked = await api('POST', `/vocabulary/practice/sessions/${created.body.data.sessionToken}/answers`, {
      questionId: question.questionId,
      selectedOptionId: stored.correct_option_id,
    }, 'student-practice');
    assert.equal(checked.status, 200, mode);
    assert.equal(checked.body.data.isCorrect, true, mode);
    assert.ok(checked.body.data.explanation.meaningBn, mode);
  }
});

test('practice sessions cannot be answered from another signed-in account', async () => {
  const created = await api('POST', '/vocabulary/practice/sessions', { mode: 'meaning', count: 1 }, 'owner');
  const question = created.body.data.questions[0];
  const answer = question.options[0].optionId;
  const forbidden = await api('POST', `/vocabulary/practice/sessions/${created.body.data.sessionToken}/answers`, {
    questionId: question.questionId,
    selectedOptionId: answer,
  }, 'other');
  assert.equal(forbidden.status, 403);
});

test('a missed practice word can be recovered from the missed queue and enters spaced repetition', async () => {
  const created = await api('POST', '/vocabulary/practice/sessions', { mode: 'meaning', count: 1 }, 'student-missed');
  const question = created.body.data.questions[0];
  const tokenHash = crypto.createHash('sha256').update(created.body.data.sessionToken).digest('hex');
  const session = await VocabularyPracticeSession.findOne({ token_hash: tokenHash }).lean();
  const correct = session.items[0].correct_option_id;
  const wrong = question.options.find((option) => option.optionId !== correct).optionId;
  const result = await api('POST', `/vocabulary/practice/sessions/${created.body.data.sessionToken}/answers`, {
    questionId: question.questionId,
    selectedOptionId: wrong,
  }, 'student-missed');
  assert.equal(result.body.data.isCorrect, false);
  const missed = await api('GET', '/vocabulary/progress/review?type=missed', undefined, 'student-missed');
  assert.equal(missed.body.data.words.length, 1);
  const recovered = await api('POST', '/vocabulary/progress/review', {
    wordId: missed.body.data.words[0].id,
    known: true,
  }, 'student-missed');
  assert.equal(recovered.body.data.word.progress.learned, true);
  const summary = await api('GET', '/vocabulary/progress/summary', undefined, 'student-missed');
  assert.equal(summary.body.data.learnedToday, 1);
});

test('JSONL import validation rejects duplicate synonyms, conflicts, and unsupported PYQ evidence', () => {
  const valid = entry('careful', 1);
  const parsed = parseEntry(valid, 2);
  assert.equal(parsed.errors.length, 0);
  assert.equal(parsed.entry.normalized_word, 'careful');

  const invalid = parseEntry({
    ...entry('careful', 2),
    synonyms: ['fair', ' Fair '],
    antonyms: ['fair'],
    examRelevance: [{
      examCode: 'WBCS',
      basis: 'PYQ_VERIFIED',
      references: [{ type: 'OFFICIAL_PAPER', examName: 'WBCS', year: 2024, questionCode: 'WBCS-2024-Q1', url: 'https://example.org/paper.pdf' }],
    }],
  }, 3);
  assert.deepEqual(new Set(invalid.errors.map((error) => error.code)), new Set([
    'DUPLICATE_SYNONYM',
    'SYNONYM_ANTONYM_CONFLICT',
    'OFFICIAL_PYQ_EVIDENCE_REQUIRED',
  ]));
  const trustedEvidence = parseEntry({
    ...entry('verifiable', 4),
    examRelevance: [{
      examCode: 'WBCS',
      basis: 'PYQ_VERIFIED',
      references: [{ type: 'OFFICIAL_PAPER', examName: 'WBCS', year: 2024, questionCode: 'WBCS-2024-Q1', url: 'https://psc.wb.gov.in/papers/2024.pdf' }],
    }],
  }, 4);
  assert.equal(trustedEvidence.errors.length, 0);
  const falseSourceClaim = parseEntry({ ...entry('editorially-checked', 5), sourceStatus: 'EDITORIAL_REVIEWED' }, 5);
  assert.ok(falseSourceClaim.errors.some((error) => error.code === 'ADMIN_REVIEW_REQUIRED'));

  const jsonl = parseJsonl(Buffer.from('{"word":"one"}\nnot-json\n{"word":"two"}'));
  assert.deepEqual(jsonl.entryRows, [1, 3]);
  assert.equal(jsonl.errors[0].row, 2);
});
