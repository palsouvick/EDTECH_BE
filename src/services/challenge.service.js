'use strict';

/**
 * Daily challenge: the same 5 mixed questions for everyone each day
 * (Math, Reasoning, English, General Studies, Current Affairs), bilingual,
 * medium difficulty. The set is picked on the day's first request and stored.
 * Anyone can play; a signed-in student's first attempt is saved (for badges
 * and streaks), and their answers count like practice.
 */

const crypto = require('node:crypto');
const { Question, DailyChallenge, DailyChallengeResult } = require('../models');
const { langSetsContaining } = require('../models/schemas/localized');
const AppError = require('../utils/AppError');
const { PUBLIC_QUESTION_FIELDS, presentQuestion } = require('./presenters');
const { gradeAnswers } = require('./grading');
const { dayKey } = require('./performance.service');

const BILINGUAL = langSetsContaining('bn').filter((s) => s.split('_').includes('en'));
const BASE = { status: 'PUBLISHED', difficulty: { $gte: 2, $lte: 4 }, lang_set: { $in: BILINGUAL } };
const SLOTS = [
  { subject: 'quant' },
  { subject: 'reasoning' },
  { subject: 'english' },
  { subject: 'gs', topic: { $ne: 'current_affairs' } },
  { subject: 'gs', topic: 'current_affairs' },
];

const hashInt = (s) => crypto.createHash('sha1').update(s).digest().readUInt32BE(0);

/** Deterministic picks for a day: the same day gives the same questions. */
async function pickFor(day) {
  const ids = [];
  for (const [i, slot] of SLOTS.entries()) {
    let filter = { ...BASE, ...slot, _id: { $nin: ids } };
    let count = await Question.countDocuments(filter);
    if (!count && slot.topic === 'current_affairs') {
      filter = { ...BASE, subject: 'gs', _id: { $nin: ids } }; // no current affairs yet: any GS
      count = await Question.countDocuments(filter);
    }
    if (!count) continue;
    const [q] = await Question.find(filter).sort({ _id: 1 }).skip(hashInt(`${day}:${i}`) % count).limit(1).select('_id').lean();
    if (q) ids.push(q._id);
  }
  return ids;
}

async function challengeFor(day) {
  const existing = await DailyChallenge.findById(day).lean();
  if (existing) return existing;
  const question_ids = await pickFor(day);
  if (!question_ids.length) throw AppError.unprocessable('NO_QUESTIONS', 'No questions available for the daily challenge');
  // Two first requests at once compute the same set; whichever writes first wins.
  await DailyChallenge.updateOne({ _id: day }, { $setOnInsert: { question_ids } }, { upsert: true }).catch((e) => {
    if (e.code !== 11000) throw e;
  });
  return DailyChallenge.findById(day).lean();
}

async function getToday({ tz }, userId) {
  const day = dayKey(new Date(), tz);
  const ch = await challengeFor(day);
  const docs = await Question.find({ _id: { $in: ch.question_ids } }).select(PUBLIC_QUESTION_FIELDS).lean();
  const byId = new Map(docs.map((q) => [String(q._id), q]));
  const result = userId ? await DailyChallengeResult.findOne({ user_id: userId, day }).lean() : null;
  return {
    day,
    questions: ch.question_ids.map((id) => byId.get(String(id))).filter(Boolean).map((q, i) => presentQuestion(q, { index: i + 1 })),
    done: result ? { correct: result.correct, total: result.total } : null,
  };
}

async function submitToday({ tz, answers }, userId) {
  const day = dayKey(new Date(), tz);
  const ch = await DailyChallenge.findById(day).lean();
  if (!ch) throw AppError.notFound('NO_CHALLENGE', "Today's challenge has not been opened yet");
  const allowed = new Set(ch.question_ids.map(String));
  if (answers.some((a) => !allowed.has(a.questionId))) throw AppError.unprocessable('NOT_IN_CHALLENGE', "Answers include questions that are not in today's challenge");

  const { results, score } = await gradeAnswers(answers, { userId, source: 'practice' });
  let firstAttempt = true;
  if (userId) {
    try {
      await DailyChallengeResult.create({ user_id: userId, day, correct: score.correct, total: score.total });
    } catch (e) {
      if (e.code !== 11000) throw e;
      firstAttempt = false; // only the first attempt of the day counts
    }
  }
  return { day, results, score, firstAttempt };
}

module.exports = { getToday, submitToday, pickFor };
