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
