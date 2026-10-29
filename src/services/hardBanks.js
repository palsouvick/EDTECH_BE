'use strict';

/**
 * The chapters whose Advanced level is served from a dedicated Hard bank: questions
 * built from a pattern matrix (db/patterns/quant/...) by a deterministic generator
 * whose answers are checked by an independent solver (test/hardBanks.test.js).
 *
 * An Advanced quiz in these chapters uses only bank questions, in a fixed
 * difficulty mix, with at most two questions per pattern; it never falls back to
 * Intermediate questions.
 */

const { registry: profitLoss } = require('../../db/patterns/quant/profit_loss');

const MIX = Object.freeze({ 3: 2, 4: 5, 5: 3 });
const MIN_PATTERNS_PER_QUIZ = 7;
const MAX_PER_PATTERN = 2;

const bank = (topic, author, registry) => Object.freeze({
  subject: 'quant',
  topic,
  author,
  registry,
  ids: Object.freeze(registry.map((p) => p.id)),
  byId: new Map(registry.map((p) => [p.id, p])),
});

const HARD_BANKS = Object.freeze({
  profit_loss: bank('profit_loss', 'profit_loss_hard_generator', profitLoss),
  percentage: bank('percentage', 'hard_bank_generator', require('../../db/patterns/quant/hard/percentage')),
  ratio_proportion: bank('ratio_proportion', 'hard_bank_generator', require('../../db/patterns/quant/hard/ratio_proportion')),
  average: bank('average', 'hard_bank_generator', require('../../db/patterns/quant/hard/average')),
  interest: bank('interest', 'hard_bank_generator', require('../../db/patterns/quant/hard/interest')),
  time_work: bank('time_work', 'hard_bank_generator', require('../../db/patterns/quant/hard/time_work')),
});

const HARD_AUTHORS = Object.freeze([...new Set(Object.values(HARD_BANKS).map((b) => b.author))]);

/** The bank for a chapter, or null when its Advanced level uses the general pool. */
function hardBankFor(subject, topic) {
  const b = HARD_BANKS[topic];
  return b && b.subject === subject ? b : null;
}

/** Registry entry for a pattern id in any bank (for names and syllabus flags), or null. */
function hardPattern(topic, id) {
  return HARD_BANKS[topic]?.byId.get(id) ?? null;
}

module.exports = { HARD_BANKS, HARD_AUTHORS, MIX, MIN_PATTERNS_PER_QUIZ, MAX_PER_PATTERN, hardBankFor, hardPattern };
