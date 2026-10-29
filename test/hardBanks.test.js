'use strict';

/**
 * S1: Hard banks for Percentage, Ratio & Proportion, Average, Interest and Time & Work.
 *
 * Every generated question is re-solved by an independent solver
 * (scripts/generators/hard/solvers) from the numbers shown in the stem, and the
 * stored answer must match. The selector and the Learn API must serve Advanced only
 * from the bank, in a fixed difficulty mix, with diverse patterns and framings.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const { createApp } = require('../src/app');
const { Question } = require('../src/models');
const statsBuffer = require('../src/services/questionStats.buffer');
const { clearLearnCache, selectHard } = require('../src/services/learn.service');
const { HARD_BANKS, hardBankFor } = require('../src/services/hardBanks');
const { tagAll } = require('../src/services/patternTagger');
const { validatePatterns } = require('../db/patterns/validate');
const { generateBank, validateQuestion, makeOptions, KINDS, bnOf, clean, cents, ex } = require('../scripts/generators/hard/framework');
const { bisect } = require('../scripts/generators/hard/solvers/util');
const { ensureHardBanks, ensureHardBank, AUTHOR, TARGET_PER_CHAPTER } = require('../scripts/seedHardBanks');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');
const samples = require('../db/seed/pyq-sample-25.json');

const TOPICS = ['percentage', 'ratio_proportion', 'average', 'interest', 'time_work'];
const BENGALI = /[ঀ-৿]/u;
const countBy = (xs, key) => xs.reduce((m, x) => ((m[key(x)] = (m[key(x)] || 0) + 1), m), {});
/** The value as it would be printed: rounded to two decimals, standalone in the text. */
const shownIn = (text, value) => new RegExp(`(?<![\\d.])${String(cents(value)).replace('.', '\\.')}(?![\\d])`).test(text);

// ------------------------------------------------------------------ matrices

for (const topic of TOPICS) {
  test(`${topic}: the pattern matrix is valid and spans difficulty 3-5`, () => {
    const doc = require(`../db/patterns/quant/${topic}`);
    assert.deepEqual(validatePatterns(doc), []);
    const registry = doc.registry;
    assert.equal(registry, HARD_BANKS[topic].registry, 'the chapter file and the bank use the same matrix');
    assert.ok(registry.length >= 10);
    for (const d of [3, 4, 5]) assert.ok(registry.filter((p) => p.difficulty === d).length >= 2, `difficulty ${d}`);
    assert.ok(registry.every((p) => p.variants.length >= 2 && p.skills.length && p.hardBecause && typeof p.clerkship === 'boolean'));
    // Difficulty 4-5 patterns must involve more than one step or a reverse/conditional twist.
    assert.ok(registry.filter((p) => p.difficulty >= 4).every((p) => p.skills.some((s) => ['multi_step', 'reverse', 'conditional', 'weighted'].includes(s))));
  });
}

test('syllabus flags follow the official Clerkship 2024 Arithmetic syllabus', () => {
  // Advt 12/2024 Part-I Arithmetic lists percentage, ratio & proportion, average and
  // simple interest; it does not list compound interest or time & work.
  for (const topic of ['percentage', 'ratio_proportion', 'average']) assert.ok(HARD_BANKS[topic].registry.every((p) => p.clerkship), topic);
  assert.ok(HARD_BANKS.time_work.registry.every((p) => !p.clerkship));
  for (const p of HARD_BANKS.interest.registry) {
    const compound = p.concepts.includes('compound_interest') || p.concepts.includes('instalments');
    assert.equal(p.clerkship, !compound, p.id);
  }
});

// ------------------------------------------------------------------ generated questions

for (const topic of TOPICS) {
  test(`${topic}: 300 questions, every answer confirmed by an independent solver`, () => {
    const { registry, generators } = require(`../scripts/generators/hard/${topic}`);
    const solvers = require(`../scripts/generators/hard/solvers/${topic}`);
    for (const seed of [11, 20261029]) {
      const bank = generateBank(topic, registry, generators, 300, { seed });
      assert.equal(new Set(bank.map((q) => q.fingerprint)).size, 300, 'no repeated stem');
      const byId = new Map(registry.map((p) => [p.id, p]));
      for (const q of bank) {
        const where = `${q.pattern_variant}: ${q.stem.en}`;
        assert.deepEqual(validateQuestion(q), [], where);
        assert.equal(q.difficulty, byId.get(q.pattern).difficulty, where);
        assert.match(q.pattern_variant, /^[a-z0-9_]+\.[a-z0-9_]+$/);
        assert.ok(byId.get(q.pattern).variants.includes(q._audit.variant), where);

        // Independent answer, formatted exactly as an option would be.
        const { kind, given, variant, answerText } = q._audit;
        const solved = solvers[q.pattern](variant, given);
        const solvedText = KINDS[kind](kind === 'ratio' ? solved : cents(solved)).en;
        assert.equal(solvedText, answerText, `solver disagrees on ${where}`);

        // Option mapping: exactly one option shows that answer, and it is the keyed one.
        const matching = q.options.filter((o) => o.text.en === solvedText);
        assert.equal(matching.length, 1, where);
        assert.equal(matching[0].oid, q.correct_option_id, where);
        assert.equal(new Set(q.options.map((o) => o.text.bn)).size, 4, where);
        assert.equal(new Set(q.options.map((o) => o.oid)).size, 4, where);

        // The numbers the solver used are the ones the student sees, in both languages.
        for (const [k, v] of Object.entries(given)) {
          if (k.startsWith('_')) continue;
          assert.ok(shownIn(q.stem.en, v) && shownIn(q.stem.bn, v), `${k}=${v} not shown in ${where}`);
        }
        // Working is exact: no raw float (12.300000000000001) in the stem or the steps.
        assert.doesNotMatch(JSON.stringify([q.stem, q.solution]), /\d\.\d{7,}/, `unformatted number in ${where}`);
        // Distractors look like real answers: same precision class as the answer.
        if (kind !== 'ratio' && Number.isInteger(cents(q._audit.answer))) {
          for (const o of q.options) assert.match(o.text.en, /^[^\d]*-?\d+(?![.\d])/, `fractional distractor beside a whole answer in ${where}`);
        }
        // Wrong options with an explanation must be explained in Bengali too.
        for (const trap of q.solution.traps) assert.ok(trap.note.en && BENGALI.test(trap.note.bn), where);
        assert.doesNotMatch(JSON.stringify(q.solution), /(?<![\d.])1[ukmtx]\b|−\s*-|\+\s*-|= -\d+[a-z]\b/, `awkward algebra in ${where}`);
      }
      // Coverage: every pattern and every framing appears.
      const patterns = countBy(bank, (q) => q.pattern);
      assert.deepEqual(Object.keys(patterns).sort(), registry.map((p) => p.id).sort());
      const shapes = new Set(bank.map((q) => q.pattern_variant));
      for (const p of registry) for (const v of p.variants) assert.ok(shapes.has(`${p.id}.${v}`), `${p.id}.${v} never generated`);
      // Balanced: no pattern is starved.
      assert.ok(Math.min(...Object.values(patterns)) >= Math.floor(300 / registry.length) - 1, JSON.stringify(patterns));
    }
  });
}

test('the bank refuses stems it already has (duplicate detection across top-ups)', () => {
  const { registry, generators } = require('../scripts/generators/hard/percentage');
  const first = generateBank('percentage', registry, generators, 100, { seed: 5 });
  const second = generateBank('percentage', registry, generators, 100, { seed: 5, knownFingerprints: first.map((q) => q.fingerprint) });
  const seen = new Set(first.map((q) => q.fingerprint));
  assert.ok(second.every((q) => !seen.has(q.fingerprint)));
});

// ------------------------------------------------------------------ edge cases in the helpers

test('options: hints equal to the answer, duplicates and invalid values are dropped', () => {
  const o = makeOptions('percent', 20, [[20, 'same'], [20.001, 'rounds to the same'], [-5, 'negative'], [NaN, 'nan'], [25, 'real trap', 'আসল ফাঁদ']]);
  const texts = [o.correct.en, ...o.wrong.map((w) => w.en)];
  assert.equal(new Set(texts).size, 4);
  assert.ok(!texts.includes('-5%'));
  assert.equal(o.wrong.find((w) => w.en === '25%').trap.bn, 'আসল ফাঁদ');
  // Signed kinds keep a sign; ratios are shown in lowest terms and never equal the answer.
  assert.equal(KINDS.change(-12.5).en, '12.5% decrease');
  assert.equal(KINDS.moreLess(8).bn, '8% বেশি');
  assert.equal(KINDS.ratio([6, 9]).en, '2 : 3');
  const r = makeOptions('ratio', [4, 6], [[[2, 3], 'same ratio unsimplified']]);
  assert.ok(r.wrong.every((w) => w.en !== '2 : 3'));
  assert.equal(new Set([r.correct.en, ...r.wrong.map((w) => w.en)]).size, 4);
  assert.equal(new Set(makeOptions('ratio', [2, 3, 5]).wrong.map((w) => w.en)).size, 3, 'three-term ratios too');
});

test('steps show exact numbers: terminating decimals or fractions, never a rounded value', () => {
  assert.deepEqual([0.825, 1.125, 0.004864, 1 / 90, 7 / 3, -0.25, 13225.000000000002].map(ex), ['0.825', '1.125', '0.004864', '1/90', '7/3', '-0.25', '13225']);
  assert.throws(() => ex(Math.PI), /no exact short form/);
});

test('helpers: Bengali possessives, exactness and bisection', () => {
  assert.deepEqual(['রাহুল', 'প্রিয়া', 'বিশ্বজিৎ', 'স্বাতী'].map(bnOf), ['রাহুলের', 'প্রিয়ার', 'বিশ্বজিতের', 'স্বাতীর']);
  assert.equal(clean(12.5), true);
  assert.equal(clean(1 / 3), false);
  assert.equal(cents(13225.000000000002), 13225);
  assert.ok(Math.abs(bisect((x) => x * x, 2, 0, 2) - Math.SQRT2) < 1e-9);
  assert.throws(() => bisect((x) => x * x, -1, 0, 2), /no sign change/);
});

// ------------------------------------------------------------------ selection

for (const topic of TOPICS) {
  test(`${topic}: a Hard quiz has the 2/5/3 mix, ≥7 patterns, ≤2 per pattern and distinct framings`, () => {
    const { registry, generators } = require(`../scripts/generators/hard/${topic}`);
    const pool = generateBank(topic, registry, generators, 200, { seed: 3 }).map((q, i) => ({ ...q, _id: `q${i}`, duplicate_keys: [q.fingerprint] }));
    const bank = hardBankFor('quant', topic);
    for (let round = 0; round < 20; round++) {
      const quiz = selectHard(bank, pool);
      assert.equal(quiz.length, 10);
      assert.deepEqual(countBy(quiz, (q) => q.difficulty), { 3: 2, 4: 5, 5: 3 });
      const perPattern = countBy(quiz, (q) => q.pattern);
      assert.ok(Object.keys(perPattern).length >= 7);
      assert.ok(Object.values(perPattern).every((n) => n <= 2));
      assert.equal(new Set(quiz.map((q) => q.pattern_variant)).size, 10, 'no two questions differ only in their numbers');
    }
    // Patterns from the last quiz go to the back of the queue.
    const d4 = registry.filter((p) => p.difficulty === 4).map((p) => p.id);
    const recent = d4.slice(0, d4.length - 2);
    const next = selectHard(bank, pool, recent);
    for (const fresh of d4.slice(-2)) assert.ok(next.some((q) => q.pattern === fresh), `${fresh} should be preferred over recent patterns`);
    // Too small a pool: no quiz rather than a weaker one.
    assert.deepEqual(selectHard(bank, pool.filter((q) => q.difficulty !== 5)), []);
  });
}

// ------------------------------------------------------------------ API

let mongod;
let server;
let base;
const call = async (path, body) => {
  const res = await fetch(base + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});
  return { status: res.status, body: await res.json() };
};
const general = (topic, n, difficulty, tag) => {
  const sample = convertExamStyleQuestion(samples[0], { index: 0 }).doc;
  return Array.from({ length: n }, (_, i) => ({ ...sample, topic, subtopic: undefined, pattern: undefined, code: `G-${tag}-${i}`, difficulty, stem: { en: `${tag} ${i}`, bn: `${tag} প্রশ্ন ${i}` } }));
};

test('API: Advanced comes only from the Hard bank and never borrows', async (t) => {
  mongod = await MongoMemoryServer.create({ instance: { launchTimeout: 90_000 } });
  await mongoose.connect(mongod.getUri('hard_banks_test'));
  await Question.init();
  t.after(async () => {
    server?.close();
    await statsBuffer.stop();
    await mongoose.disconnect();
    await mongod?.stop();
  });
  await Question.insertMany([
    ...general('percentage', 30, 2, 'pct-easy'),
    ...general('percentage', 30, 3, 'pct-mid'),
    ...general('ages', 25, 3, 'ages-mid'),
    ...general('ages', 4, 4, 'ages-hard'),
  ]);
  const seeded = await ensureHardBanks();
  assert.deepEqual(seeded.map((r) => [r.topic, r.total]), TOPICS.map((t2) => [t2, TARGET_PER_CHAPTER]));
  assert.deepEqual((await ensureHardBanks()).map((r) => r.inserted), [0, 0, 0, 0, 0], 'top-up is idempotent');
  clearLearnCache();
  server = createApp().listen(0);
  base = `http://127.0.0.1:${server.address().port}/api/v1/learn`;

  const chapter = (await call('/subjects/quant/chapters/percentage')).body.data;
  const adv = chapter.levels.find((l) => l.level === 'advanced');
  assert.deepEqual([adv.source, adv.borrowed, adv.count, adv.timed], ['hard_bank', false, TARGET_PER_CHAPTER, true]);
  const inter = chapter.levels.find((l) => l.level === 'intermediate');
  assert.equal(inter.count, 30, 'bank questions are not counted at Intermediate');

  // Two Advanced quizzes in a row: bank only, right mix, nothing repeated.
  const seenIds = [];
  const seenFingerprints = [];
  let recentPatterns = [];
  for (let round = 0; round < 2; round++) {
    const { status, body } = await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'advanced', exclude: seenIds, excludeFingerprints: seenFingerprints, recentPatterns });
    assert.equal(status, 200, JSON.stringify(body));
    const quiz = body.data;
    assert.deepEqual([quiz.source, quiz.borrowed, quiz.timed, quiz.questions.length], ['hard_bank', false, true, 10]);
    const docs = await Question.find({ _id: { $in: quiz.questions.map((q) => q.questionId) } }).select('authored_by difficulty pattern').lean();
    assert.ok(docs.every((d) => d.authored_by === AUTHOR));
    assert.deepEqual(countBy(docs, (d) => d.difficulty), { 3: 2, 4: 5, 5: 3 });
    assert.ok(quiz.questions.every((q) => q.patternName?.bn && q.inClerkshipSyllabus === true && q.provenance === 'ORIGINAL_PRACTICE'));
    assert.ok(quiz.questions.every((q) => !seenIds.includes(q.questionId) && !seenFingerprints.includes(q.fingerprint)));
    assert.doesNotMatch(JSON.stringify(quiz), /correct_option_id|correctOptionId|solution/);
    seenIds.push(...quiz.questions.map((q) => q.questionId));
    seenFingerprints.push(...quiz.questions.map((q) => q.fingerprint));
    recentPatterns = quiz.questions.map((q) => q.pattern);

    // Marking uses the stored key.
    const key = await Question.find({ _id: { $in: quiz.questions.map((q) => q.questionId) } }).select('+correct_option_id').lean();
    const answers = key.map((k) => ({ questionId: String(k._id), selectedOptionId: k.correct_option_id }));
    const checked = await call('/quiz/check', { subject: 'quant', topic: 'percentage', quizToken: quiz.quizToken, answers });
    assert.deepEqual(checked.body.data.score, { correct: 10, total: 10 });
    assert.ok(checked.body.data.results.every((r) => r.steps.length >= 3 && r.steps.every((s) => BENGALI.test(s.bn))));
  }

  // Time & Work questions say they are outside the Clerkship syllabus.
  const tw = (await call('/quiz', { subject: 'quant', topic: 'time_work', level: 'advanced' })).body.data;
  assert.ok(tw.questions.every((q) => q.inClerkshipSyllabus === false));

  // Intermediate never serves bank questions.
  const mid = (await call('/quiz', { subject: 'quant', topic: 'percentage', level: 'intermediate' })).body.data;
  const midDocs = await Question.find({ _id: { $in: mid.questions.map((q) => q.questionId) } }).select('authored_by').lean();
  assert.ok(midDocs.every((d) => d.authored_by !== AUTHOR));

  // A chapter without a bank still borrows when thin, but now says so.
  const ages = (await call('/quiz', { subject: 'quant', topic: 'ages', level: 'advanced' })).body.data;
  assert.deepEqual([ages.source, ages.borrowed], ['general', true]);

  // A bank chapter whose bank is gone gets no quiz, never easier questions.
  await Question.deleteMany({ authored_by: AUTHOR, topic: 'average' });
  await Question.insertMany(general('average', 40, 3, 'avg-mid'));
  clearLearnCache();
  const noBank = await call('/quiz', { subject: 'quant', topic: 'average', level: 'advanced' });
  assert.equal(noBank.status, 422);
  assert.equal((await call('/subjects/quant/chapters/average')).body.data.levels.find((l) => l.level === 'advanced').count, 0);
  await ensureHardBank('average');

  // The startup pattern tagger keeps each bank question's matrix pattern.
  const before = await Question.countDocuments({ authored_by: AUTHOR, pattern: { $in: HARD_BANKS.percentage.ids } });
  await tagAll();
  assert.equal(await Question.countDocuments({ authored_by: AUTHOR, topic: 'percentage', pattern: { $in: HARD_BANKS.percentage.ids } }), TARGET_PER_CHAPTER);
  assert.ok(before >= TARGET_PER_CHAPTER);
});
