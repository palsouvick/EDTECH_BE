'use strict';

/** Chapter lessons (db/lessons): one per Math and English chapter, all valid. */

const test = require('node:test');
const assert = require('node:assert/strict');
const catalog = require('../db/seed/catalog');
const { SUBJECTS, loadLessons } = require('../db/lessons');
const { validateLesson } = require('../db/lessons/validate');

const lessons = loadLessons();

test('every Math and English chapter has a lesson', () => {
  const want = new Set(catalog.flatMap((c) => c.subjects.filter((s) => SUBJECTS.includes(s.code)).flatMap((s) => s.topics.map((t) => `${s.code}.${t.code}`))));
  const have = new Set(lessons.map(({ lesson }) => `${lesson.subject}.${lesson.topic}`));
  assert.deepEqual([...want].filter((k) => !have.has(k)), []);
});

test('every lesson passes validation (both languages, Bengali script, KaTeX, structure)', () => {
  const errors = lessons.flatMap(({ file, lesson }) => validateLesson(lesson, file));
  assert.deepEqual(errors, []);
});

test('every Mathematics chapter has ten explained Basic examples and guided strategy content', () => {
  const mathLessons = lessons.map(({ lesson }) => lesson).filter(({ subject }) => subject === 'quant');
  assert.ok(mathLessons.length > 0);

  for (const lesson of mathLessons) {
    const basic = lesson.levels.find(({ level }) => level === 'basic');
    assert.ok(basic.examples.length >= 10, `${lesson.topic} needs at least ten Basic examples`);
    assert.equal(new Set(basic.examples.map(({ question }) => question.en)).size, basic.examples.length, `${lesson.topic} examples must be distinct`);
    for (const [index, example] of basic.examples.entries()) {
      for (const field of ['given', 'find', 'method', 'why']) {
        assert.ok(example[field]?.en && example[field]?.bn, `${lesson.topic} example ${index + 1} needs bilingual ${field}`);
      }
      assert.ok(example.steps.length >= 2, `${lesson.topic} example ${index + 1} needs worked steps`);
    }
    assert.ok(lesson.strategy.sections.length >= 5, `${lesson.topic} needs a five-part strategy guide`);
    assert.ok(lesson.practice.question.en && lesson.practice.question.bn, `${lesson.topic} needs a bilingual quick exercise`);
  }
});

test('Time & Work Basic has ten distinct fully worked examples and a decision strategy', () => {
  const lesson = require('../db/lessons/quant/time_work');
  const basic = lesson.levels.find(({ level }) => level === 'basic');

  assert.equal(basic.examples.length, 10);
  assert.equal(new Set(basic.examples.map(({ question }) => question.en)).size, 10);
  for (const example of basic.examples) {
    for (const field of ['given', 'find', 'method', 'why']) assert.ok(example[field]?.en && example[field]?.bn);
    assert.ok(example.steps.length >= 2);
    assert.ok(example.answer.en && example.answer.bn);
  }
  assert.ok(lesson.strategy.sections.length >= 5);
  assert.ok(lesson.practice.question.en && lesson.practice.steps.length >= 2 && lesson.practice.answer.bn);

  const independentlyCalculatedAnswers = [
    { calculated: 3 * (1 / 4), answer: basic.examples[0].answer.en.includes('3}{4}') },
    { calculated: (1 / 2) / 2, answer: basic.examples[1].answer.en.includes('1}{4}') },
    { calculated: 2 / 6, answer: basic.examples[2].answer.en.includes('1}{3}') },
    { calculated: 6 / 2, answer: basic.examples[3].answer.en.includes('3 days') },
    { calculated: 1 / (1 / 6 + 1 / 3), answer: basic.examples[4].answer.en.includes('2 days') },
    { calculated: 1 / (1 / 12 + 1 / 18), answer: basic.examples[5].answer.en.includes('7.2') },
    { calculated: 1 / (1 / 4 - 1 / 6), answer: basic.examples[6].answer.en.includes('12 days') },
    { calculated: (24 - 2 * (3 + 2)) / 2, answer: basic.examples[7].answer.en.includes('7 more days') },
    { calculated: 9 / (2 + 1), answer: basic.examples[8].answer.en.includes('3 days') },
    { calculated: (6 * 4 * 5) / (10 * 6), answer: basic.examples[9].answer.en.includes('2 days') },
  ];
  const expected = [0.75, 0.25, 1 / 3, 3, 2, 7.2, 12, 7, 3, 2];
  independentlyCalculatedAnswers.forEach(({ calculated }, index) => {
    assert.ok(Math.abs(calculated - expected[index]) < 1e-10);
  });
  assert.ok(independentlyCalculatedAnswers.every(({ answer }) => answer));
});
