'use strict';

const crypto = require('node:crypto');
const {
  VocabularyWord,
  VocabularyProgress,
  VocabularySettings,
  VocabularyDailyWord,
  VocabularyDailyActivity,
  VocabularyPracticeSession,
} = require('../models');
const AppError = require('../utils/AppError');
const { isDictionarySource, parseEntry } = require('./vocabularyImport');

const REVIEW_INTERVALS = Object.freeze([1, 3, 7, 14, 30]);
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const ANSWER_MODES = new Set(['meaning', 'synonym', 'antonym', 'fill_blank', 'context', 'identify', 'match']);
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
const dayKey = (offsetMin, now = new Date()) => new Date(now.getTime() + offsetMin * 60_000).toISOString().slice(0, 10);
const plusDays = (days, from = new Date()) => new Date(from.getTime() + days * 86_400_000);

function presentWord(word, progress) {
  return {
    id: String(word._id),
    word: word.word,
    meaningBn: word.meaning_bn,
    definitionEn: word.definition_en,
    explanationBn: word.explanation_bn || null,
    partOfSpeech: word.part_of_speech,
    pronunciation: word.pronunciation || null,
    synonyms: word.synonyms,
    antonyms: word.antonyms,
    exampleEn: word.example_en,
    exampleBn: word.example_bn,
    collocations: word.collocations,
    difficulty: word.difficulty,
    categories: word.categories,
    examRelevance: word.exam_relevance.map((entry) => ({
      examCode: entry.exam_code || null,
      basis: entry.basis,
      references: entry.references.map((ref) => ({
        type: ref.type,
        title: ref.title || null,
        url: ref.url || null,
        examName: ref.exam_name || null,
        year: ref.year || null,
        questionCode: ref.question_code || null,
      })),
    })),
    sources: word.sources.map((source) => ({
      type: source.type,
      title: source.title || null,
      url: source.url || null,
      examName: source.exam_name || null,
      year: source.year || null,
      questionCode: source.question_code || null,
    })),
    sourceStatus: word.source_status,
    progress: progress ? {
      learned: progress.learned,
      difficult: progress.difficult,
      favourite: progress.favourite,
      missCount: progress.miss_count,
      nextReviewAt: progress.next_review_at,
    } : null,
  };
}

function wordFilter({ q, category, difficulty }) {
  const filter = { status: 'PUBLISHED' };
  if (category) filter.categories = category;
  if (difficulty) filter.difficulty = difficulty;
  if (q) {
    const normalized = q.normalize('NFKC').trim();
    const safe = escapeRegex(normalized);
    const bengaliTokens = normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    filter.$or = [
      { normalized_word: new RegExp(`^${safe}`, 'i') },
      { meaning_bn_tokens: { $in: bengaliTokens.map((token) => new RegExp(`^${escapeRegex(token)}`)) } },
      { meaning_bn_normalized: new RegExp(safe) },
    ];
  }
  return filter;
}

async function listWords({ q, category, difficulty, status, offset, limit, userId }) {
  const filter = wordFilter({ q, category, difficulty });
  const categories = await VocabularyWord.distinct('categories', { status: 'PUBLISHED' });
  let filteredIds = null;
  if (status && userId) {
    const progressFilter = { user_id: userId };
    if (status === 'learned') progressFilter.learned = true;
    if (status === 'difficult') progressFilter.difficult = true;
    if (status === 'favourite') progressFilter.favourite = true;
    if (status !== 'new') {
      filteredIds = (await VocabularyProgress.find(progressFilter).distinct('word_id'));
      if (!filteredIds.length) return { words: [], total: 0, offset, limit, categories };
      filter._id = { $in: filteredIds };
    } else {
      filteredIds = (await VocabularyProgress.find({ user_id: userId, learned: true }).distinct('word_id'));
      if (filteredIds.length) filter._id = { $nin: filteredIds };
    }
  } else if (status && status !== 'new') {
    return { words: [], total: 0, offset, limit, categories };
  }
  const [rows, total] = await Promise.all([
    VocabularyWord.find(filter).sort({ normalized_word: 1, _id: 1 }).skip(offset).limit(limit).lean(),
    VocabularyWord.countDocuments(filter),
  ]);
  const progress = userId && rows.length
    ? await VocabularyProgress.find({ user_id: userId, word_id: { $in: rows.map((row) => row._id) } }).lean()
    : [];
  const byId = new Map(progress.map((p) => [String(p.word_id), p]));
  return { words: rows.map((row) => presentWord(row, byId.get(String(row._id)))), total, offset, limit, categories };
}

async function wordOfDay({ offsetMin = 330 }) {
  const day = dayKey(offsetMin);
  const count = await VocabularyWord.countDocuments({ status: 'PUBLISHED' });
  if (!count) return { day, word: null };
  const hash = crypto.createHash('sha256').update(day).digest();
  const index = hash.readUInt32BE(0) % count;
  const word = await VocabularyWord.findOne({ status: 'PUBLISHED' })
    .sort({ normalized_word: 1, _id: 1 }).skip(index).lean();
  return { day, word: word ? presentWord(word) : null };
}

async function getProgressSummary(userId) {
  const settings = await VocabularySettings.findOneAndUpdate(
    { user_id: userId },
    { $setOnInsert: { user_id: userId } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
  ).lean();
  const day = dayKey(settings.timezone_offset_min);
  const [dailyWords, activity, learned, difficult, favourite, due, missed, totalPublished] = await Promise.all([
    VocabularyDailyWord.countDocuments({ user_id: userId, day }),
    VocabularyDailyActivity.findOne({ user_id: userId, day }).lean(),
    VocabularyProgress.countDocuments({ user_id: userId, learned: true }),
    VocabularyProgress.countDocuments({ user_id: userId, difficult: true }),
    VocabularyProgress.countDocuments({ user_id: userId, favourite: true }),
    VocabularyProgress.countDocuments({ user_id: userId, learned: true, next_review_at: { $lte: new Date() } }),
    VocabularyProgress.countDocuments({ user_id: userId, miss_count: { $gt: 0 } }),
    VocabularyWord.countDocuments({ status: 'PUBLISHED' }),
  ]);
  return {
    day,
    dailyTarget: settings.daily_target,
    learnedToday: dailyWords,
    questionsAnsweredToday: activity?.questions_answered || 0,
    questionsCorrectToday: activity?.questions_correct || 0,
    learned,
    difficult,
    favourite,
    due,
    missed,
    totalPublished,
  };
}

async function setSettings(userId, { dailyTarget, timezoneOffsetMin }) {
  const update = { daily_target: dailyTarget };
  if (timezoneOffsetMin !== undefined) update.timezone_offset_min = timezoneOffsetMin;
  const settings = await VocabularySettings.findOneAndUpdate(
    { user_id: userId },
    { $set: update, $setOnInsert: { user_id: userId } },
    { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
  ).lean();
  return { dailyTarget: settings.daily_target, timezoneOffsetMin: settings.timezone_offset_min };
}

async function updateWordProgress(userId, wordId, { field, value }) {
  const word = await VocabularyWord.findOne({ _id: wordId, status: 'PUBLISHED' }).select('_id').lean();
  if (!word) throw AppError.notFound('VOCABULARY_WORD_NOT_FOUND', 'Vocabulary word not found');
  const previous = field === 'learned' && value
    ? await VocabularyProgress.findOne({ user_id: userId, word_id: word._id }).select('learned').lean()
    : null;
  const now = new Date();
  const update = { $set: { [field]: value } };
  if (field === 'learned') {
    if (value) {
      update.$set.learned_at = now;
      update.$set.next_review_at = plusDays(1, now);
    } else {
      update.$set.learned_at = null;
      update.$set.next_review_at = null;
      update.$set.interval_days = 0;
      update.$set.review_streak = 0;
    }
  }
  const progress = await VocabularyProgress.findOneAndUpdate(
    { user_id: userId, word_id: word._id },
    { ...update, $setOnInsert: { user_id: userId, word_id: word._id } },
    { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true },
  ).lean();
  if (field === 'learned' && value && !previous?.learned) {
    const settings = await VocabularySettings.findOne({ user_id: userId }).select('timezone_offset_min').lean();
    const day = dayKey(settings?.timezone_offset_min ?? 330);
    await VocabularyDailyWord.updateOne(
      { user_id: userId, day, word_id: word._id },
      { $setOnInsert: { user_id: userId, day, word_id: word._id } },
      { upsert: true },
    );
  }
  return {
    learned: progress.learned,
    difficult: progress.difficult,
    favourite: progress.favourite,
    missCount: progress.miss_count,
    nextReviewAt: progress.next_review_at,
  };
}

async function reviewWords(userId, { dueOnly = false, limit = 30 }) {
  const filter = dueOnly
    ? { user_id: userId, learned: true, next_review_at: { $lte: new Date() } }
    : { user_id: userId, miss_count: { $gt: 0 } };
  const progress = await VocabularyProgress.find(filter).sort({ next_review_at: 1, updated_at: -1 }).limit(limit).lean();
  const words = await VocabularyWord.find({ _id: { $in: progress.map((p) => p.word_id) }, status: 'PUBLISHED' }).lean();
  const byId = new Map(words.map((word) => [String(word._id), word]));
  return progress.flatMap((p) => {
    const word = byId.get(String(p.word_id));
    return word ? [{ ...presentWord(word, p), nextReviewAt: p.next_review_at, missCount: p.miss_count }] : [];
  });
}

async function answerReview(userId, { wordId, known }) {
  const word = await VocabularyWord.findOne({ _id: wordId, status: 'PUBLISHED' }).lean();
  if (!word) throw AppError.notFound('VOCABULARY_WORD_NOT_FOUND', 'Vocabulary word not found');
  const current = await VocabularyProgress.findOne({ user_id: userId, word_id: word._id }).lean();
  if (!current) throw AppError.badRequest('WORD_NOT_IN_REVIEW', 'This word is not in your revision queue');
  const now = new Date();
  const interval = known ? REVIEW_INTERVALS[Math.min(current.review_streak, REVIEW_INTERVALS.length - 1)] : 1;
  const progress = await VocabularyProgress.findOneAndUpdate(
    { user_id: userId, word_id: word._id },
    {
      $set: {
        learned: true,
        learned_at: current.learned_at || now,
        next_review_at: plusDays(interval, now),
        interval_days: interval,
        review_streak: known ? current.review_streak + 1 : 0,
        difficult: known ? current.difficult : true,
        last_reviewed_at: now,
      },
      $inc: { review_count: 1, ...(known ? {} : { miss_count: 1 }) },
    },
    { returnDocument: 'after', runValidators: true },
  ).lean();
  const settings = await VocabularySettings.findOne({ user_id: userId }).select('timezone_offset_min').lean();
  const day = dayKey(settings?.timezone_offset_min ?? 330);
  if (!current.learned) {
    await VocabularyDailyWord.updateOne(
      { user_id: userId, day, word_id: word._id },
      { $setOnInsert: { user_id: userId, day, word_id: word._id } },
      { upsert: true },
    );
  }
  await VocabularyDailyActivity.updateOne(
    { user_id: userId, day },
    { $setOnInsert: { user_id: userId, day }, $inc: { reviews: 1 } },
    { upsert: true },
  );
  return {
    known,
    intervalDays: progress.interval_days,
    nextReviewAt: progress.next_review_at,
    word: presentWord(word, progress),
  };
}

function chooseUnique(values, correct, count = 4) {
  const distractors = [...new Set(values.filter((v) => v && v !== correct))];
  if (distractors.length < count - 1) return null;
  for (let i = distractors.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const choices = [correct, ...distractors.slice(0, count - 1)];
  for (let i = choices.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices.map((text, index) => ({ id: `vopt_${index}_${crypto.randomBytes(3).toString('hex')}`, text }));
}

function questionFor(word, pool, mode) {
  let prompt;
  let answer;
  let distractors;
  if (mode === 'meaning') {
    prompt = `What does “${word.word}” mean?`;
    answer = word.meaning_bn;
    distractors = pool.map((entry) => entry.meaning_bn);
  } else if (mode === 'synonym' || mode === 'antonym') {
    const words = mode === 'synonym' ? word.synonyms : word.antonyms;
    if (!words?.length) return null;
    prompt = `Choose a ${mode} of “${word.word}”.`;
    answer = words[0];
    distractors = pool.flatMap((entry) => mode === 'synonym' ? entry.synonyms : entry.antonyms);
  } else if (mode === 'fill_blank' || mode === 'identify') {
    const safe = escapeRegex(word.word);
    const sentence = word.example_en.replace(new RegExp(`\\b${safe}\\b`, 'i'), '_____');
    if (sentence === word.example_en) return null;
    prompt = mode === 'fill_blank' ? `Complete the sentence: ${sentence}` : `Which word completes this sentence and matches “${word.definition_en}”? ${sentence}`;
    answer = word.word;
    distractors = pool.map((entry) => entry.word);
  } else if (mode === 'context') {
    prompt = `Which sentence best demonstrates “${word.word}” (${word.definition_en})?`;
    answer = word.example_en;
    distractors = pool.map((entry) => entry.example_en);
  } else if (mode === 'match') {
    prompt = `Match the meaning of “${word.word}”.`;
    answer = word.meaning_bn;
    distractors = pool.map((entry) => entry.meaning_bn);
  } else {
    return null;
  }
  const options = chooseUnique(distractors, answer);
  if (!options) return null;
  return {
    question_id: crypto.randomBytes(10).toString('hex'),
    word_id: word._id,
    mode,
    prompt,
    options,
    correct_option_id: options.find((entry) => entry.text === answer).id,
  };
}

function presentQuestion(item, index) {
  return {
    questionId: item.question_id,
    index,
    mode: item.mode,
    prompt: item.prompt,
    options: item.options.map((entry) => ({ optionId: entry.id, text: entry.text })),
  };
}

async function createPracticeSession({ mode, category, difficulty, count, userId }) {
  if (!ANSWER_MODES.has(mode)) throw AppError.badRequest('INVALID_PRACTICE_MODE', 'Unsupported vocabulary practice mode');
  const filter = { status: 'PUBLISHED', ...(category && { categories: category }), ...(difficulty && { difficulty }) };
  const candidates = await VocabularyWord.find(filter).sort({ normalized_word: 1 }).limit(2000).lean();
  if (candidates.length < 4) throw AppError.unprocessable('INSUFFICIENT_VOCABULARY', 'At least four published words are needed for practice');
  const items = [];
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  for (const word of shuffled) {
    const rest = shuffled.filter((entry) => String(entry._id) !== String(word._id));
    const sameLevelAndPart = rest.filter((entry) => entry.part_of_speech === word.part_of_speech && entry.difficulty === word.difficulty);
    const samePart = rest.filter((entry) => entry.part_of_speech === word.part_of_speech);
    const pool = sameLevelAndPart.length >= 3 ? sameLevelAndPart : samePart.length >= 3 ? samePart : rest;
    const item = questionFor(word, pool, mode);
    if (item) items.push(item);
    if (items.length >= count) break;
  }
  if (!items.length) throw AppError.unprocessable('PRACTICE_NOT_AVAILABLE', `No valid questions are available for ${mode}`);
  const token = crypto.randomBytes(32).toString('base64url');
  await VocabularyPracticeSession.create({
    token_hash: hashToken(token),
    user_id: userId || null,
    items,
    expires_at: new Date(Date.now() + SESSION_TTL_MS),
  });
  return { sessionToken: token, mode, questions: items.map(presentQuestion) };
}

async function answerPractice({ token, questionId, selectedOptionId, userId }) {
  const tokenHash = hashToken(token);
  const session = await VocabularyPracticeSession.findOne({ token_hash: tokenHash, expires_at: { $gt: new Date() } });
  if (!session) throw AppError.notFound('PRACTICE_SESSION_NOT_FOUND', 'Practice session expired or not found');
  if (session.user_id && session.user_id !== userId) throw new AppError(403, 'PRACTICE_SESSION_FORBIDDEN', 'This practice session belongs to another account');
  const item = session.items.find((entry) => entry.question_id === questionId);
  if (!item) throw AppError.notFound('PRACTICE_QUESTION_NOT_FOUND', 'Question not found in this session');
  if (!item.options.some((entry) => entry.id === selectedOptionId)) throw AppError.badRequest('INVALID_OPTION', 'Select one of the displayed options');
  const isCorrect = selectedOptionId === item.correct_option_id;
  const updated = await VocabularyPracticeSession.findOneAndUpdate(
    { token_hash: tokenHash, 'items.question_id': questionId, 'items.selected_option_id': null },
    { $set: { 'items.$.selected_option_id': selectedOptionId, 'items.$.is_correct': isCorrect } },
    { returnDocument: 'after' },
  );
  const savedItem = updated?.items.find((entry) => entry.question_id === questionId)
    || (await VocabularyPracticeSession.findOne({ token_hash: tokenHash }))?.items.find((entry) => entry.question_id === questionId);
  if (!savedItem) throw AppError.notFound('PRACTICE_SESSION_NOT_FOUND', 'Practice session expired or not found');
  const word = await VocabularyWord.findById(savedItem.word_id).lean();
  if (!word) throw AppError.notFound('VOCABULARY_WORD_NOT_FOUND', 'Vocabulary word not found');
  if (session.user_id && updated) {
    const settings = await VocabularySettings.findOne({ user_id: session.user_id }).select('timezone_offset_min').lean();
    const day = dayKey(settings?.timezone_offset_min ?? 330);
    await VocabularyDailyActivity.updateOne(
      { user_id: session.user_id, day },
      { $setOnInsert: { user_id: session.user_id, day }, $inc: { questions_answered: 1, ...(isCorrect ? { questions_correct: 1 } : {}) } },
      { upsert: true },
    );
    if (!isCorrect) {
      await VocabularyProgress.findOneAndUpdate(
        { user_id: session.user_id, word_id: word._id },
        {
          $set: { difficult: true, next_review_at: plusDays(1), last_reviewed_at: new Date() },
          $inc: { miss_count: 1 },
          $setOnInsert: { user_id: session.user_id, word_id: word._id },
        },
        { upsert: true, runValidators: true, setDefaultsOnInsert: true },
      );
    }
  }
  return {
    questionId,
    selectedOptionId: savedItem.selected_option_id,
    isCorrect: savedItem.is_correct,
    correctOptionId: savedItem.correct_option_id,
    explanation: {
      definitionEn: word.definition_en,
      meaningBn: word.meaning_bn,
      explanationBn: word.explanation_bn || null,
      exampleEn: word.example_en,
      exampleBn: word.example_bn,
      synonyms: word.synonyms,
      antonyms: word.antonyms,
    },
  };
}

async function previewImport(entries, rowNumbers = []) {
  const seen = new Set();
  const parsed = [];
  const errors = [];
  for (let index = 0; index < entries.length; index += 1) {
    const input = entries[index];
    const row = rowNumbers[index] || index + 1;
    const result = parseEntry(input, row);
    if (!result.entry) {
      errors.push(...result.errors);
      continue;
    }
    const key = result.entry.normalized_word;
    if (seen.has(key)) errors.push({ row, field: 'word', code: 'DUPLICATE_IN_FILE', message: `Duplicate word “${result.entry.word}” in this upload` });
    else {
      seen.add(key);
      parsed.push({ row, entry: result.entry });
    }
  }
  const existing = parsed.length
    ? await VocabularyWord.find({ normalized_word: { $in: parsed.map((item) => item.entry.normalized_word) } }).select('normalized_word word').lean()
    : [];
  const existingKeys = new Set(existing.map((item) => item.normalized_word));
  for (const item of parsed) {
    if (existingKeys.has(item.entry.normalized_word)) errors.push({ row: item.row, field: 'word', code: 'DUPLICATE_IN_DATABASE', message: `“${item.entry.word}” already exists in the vocabulary library` });
  }
  return {
    total: entries.length,
    valid: Math.max(0, parsed.length - [...existingKeys].filter((key) => seen.has(key)).length),
    errors,
    preview: parsed.slice(0, 25).map(({ row, entry }) => ({
      row,
      word: entry.word,
      meaningBn: entry.meaning_bn,
      definitionEn: entry.definition_en,
      explanationBn: entry.explanation_bn || null,
      partOfSpeech: entry.part_of_speech,
      pronunciation: entry.pronunciation || null,
      synonyms: entry.synonyms,
      antonyms: entry.antonyms,
      exampleEn: entry.example_en,
      exampleBn: entry.example_bn,
      collocations: entry.collocations,
      difficulty: entry.difficulty,
      categories: entry.categories,
      examRelevance: entry.exam_relevance,
      sources: entry.sources,
      sourceStatus: entry.source_status,
    })),
  };
}

async function commitImport(entries, adminEmail, rowNumbers = []) {
  const preview = await previewImport(entries, rowNumbers);
  if (preview.errors.length) throw AppError.unprocessable('VOCABULARY_IMPORT_INVALID', 'Fix all validation and duplicate errors before importing', preview);
  const importBatchId = crypto.randomUUID();
  const rows = [];
  for (const [index, input] of entries.entries()) {
    const result = parseEntry(input, rowNumbers[index] || index + 1);
    rows.push({ ...result.entry, authored_by: adminEmail, status: 'DRAFT', import_batch_id: importBatchId });
  }
  try {
    const inserted = await VocabularyWord.insertMany(rows, { ordered: true });
    return { imported: inserted.length, status: 'DRAFT' };
  } catch (error) {
    await VocabularyWord.deleteMany({ import_batch_id: importBatchId });
    if (error?.code === 11000) throw AppError.conflict('VOCABULARY_DUPLICATE_RACE', 'A word in this batch was imported concurrently; preview the file again');
    throw error;
  }
}

async function setWordStatus(wordId, status, reviewedBy, sourceStatus) {
  const current = await VocabularyWord.findById(wordId).lean();
  if (!current) throw AppError.notFound('VOCABULARY_WORD_NOT_FOUND', 'Vocabulary word not found');
  const selectedSourceStatus = sourceStatus || current.source_status;
  if (selectedSourceStatus === 'DICTIONARY_CHECKED' && !current.sources.some((source) => (
    source.type === 'DICTIONARY' && isDictionarySource(source.url)
  ))) {
    throw AppError.badRequest('TRUSTED_DICTIONARY_SOURCE_REQUIRED', 'Dictionary-checked status requires a supported HTTPS dictionary source');
  }
  const update = { status };
  update.source_status = selectedSourceStatus;
  if (status === 'PUBLISHED') {
    update.reviewed_by = reviewedBy;
    update.reviewed_at = new Date();
  }
  const word = await VocabularyWord.findByIdAndUpdate(wordId, { $set: update }, { returnDocument: 'after', runValidators: true }).lean();
  return presentWord(word);
}

module.exports = {
  REVIEW_INTERVALS,
  dayKey,
  listWords,
  wordOfDay,
  getProgressSummary,
  setSettings,
  updateWordProgress,
  reviewWords,
  answerReview,
  createPracticeSession,
  answerPractice,
  previewImport,
  commitImport,
  setWordStatus,
  presentWord,
};
