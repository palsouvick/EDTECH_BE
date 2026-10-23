'use strict';

/**
 * Checks chapter lessons (db/lessons/<subject>/<topic>.js).
 *
 *   node db/lessons/validate.js                         # all lessons
 *   node db/lessons/validate.js db/lessons/quant/ages.js
 *
 * A lesson teaches one chapter from zero, in words a 10-year-old can follow,
 * in English AND Bengali. Every text below is { en, bn } (both required) and
 * may use Markdown and KaTeX ($inline$, $$display$$).
 *
 * module.exports = {
 *   subject: 'quant' | 'english',
 *   topic: '<catalogue topic code>',          // db/seed/catalog.js
 *   title: T,                                 // chapter name
 *   emoji: '💯',                              // one emoji for the chapter card
 *   intro: T,                                 // 1-3 sentences: what it is, where we meet it in daily life
 *   levels: [                                 // exactly basic, intermediate, advanced, in that order
 *     {
 *       level: 'basic' | 'intermediate' | 'advanced',
 *       sections: [{ heading: T, body: T }],  // >= 2; body is Markdown
 *       examples: [{ question: T, steps: [T], answer: T }],  // >= 2 worked examples, >= 2 steps each
 *     },
 *   ],
 *   rules: [{ label: T, latex?: 'LaTeX', explain: T }],  // >= 3; formulas (math) or rules (English)
 *   tips: [T],                                // >= 3 "remember / common mistake" lines
 * };
 */

const path = require('node:path');
const katex = require('katex');
const catalog = require('../seed/catalog');
const { loadLessons } = require('./index');

const LEVELS = ['basic', 'intermediate', 'advanced'];
const BENGALI = /[ঀ-৿]/;
const topicsBySubject = {};
for (const c of catalog) for (const s of c.subjects) for (const t of s.topics) (topicsBySubject[s.code] ||= new Set()).add(t.code);

function mathChunks(md) {
  const out = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let m;
  while ((m = re.exec(md))) out.push({ tex: m[1] ?? m[2], display: m[1] !== undefined });
  return out;
}

function checkTex(tex, display, where, errors) {
  try {
    katex.renderToString(tex, { displayMode: display, throwOnError: true, strict: 'ignore' });
  } catch (e) {
    errors.push(`${where}: KaTeX error in "${tex.slice(0, 60)}": ${e.message.split('\n')[0]}`);
  }
}

function checkText(value, where, errors) {
  if (!value || typeof value !== 'object') return errors.push(`${where}: missing { en, bn }`);
  for (const lang of ['en', 'bn']) {
    const s = value[lang];
    if (typeof s !== 'string' || !s.trim()) {
      errors.push(`${where}.${lang}: missing`);
      continue;
    }
    for (const { tex, display } of mathChunks(s)) checkTex(tex, display, `${where}.${lang}`, errors);
  }
  if (typeof value.bn === 'string' && !BENGALI.test(value.bn.replace(/\$[^$]*\$/g, ''))) {
    errors.push(`${where}.bn: no Bengali script (translate it)`);
  }
  if (typeof value.en === 'string' && BENGALI.test(value.en)) errors.push(`${where}.en: contains Bengali script`);
}

function validateLesson(lesson, file = '') {
  const errors = [];
  const at = path.basename(file || `${lesson?.subject}/${lesson?.topic}`);
  if (!lesson || typeof lesson !== 'object') return [`${at}: does not export an object`];
  if (!topicsBySubject[lesson.subject]?.has(lesson.topic)) errors.push(`${at}: ${lesson.subject}/${lesson.topic} is not in db/seed/catalog.js`);
  if (file && path.basename(file, '.js') !== lesson.topic) errors.push(`${at}: file name must be <topic>.js`);
  if (file && path.basename(path.dirname(file)) !== lesson.subject) errors.push(`${at}: must sit in db/lessons/${lesson.subject}/`);
  checkText(lesson.title, `${at} title`, errors);
  checkText(lesson.intro, `${at} intro`, errors);
  if (typeof lesson.emoji !== 'string' || !lesson.emoji || lesson.emoji.length > 8) errors.push(`${at}: emoji must be one emoji`);

  const levels = lesson.levels || [];
  if (levels.map((l) => l.level).join() !== LEVELS.join()) errors.push(`${at}: levels must be ${LEVELS.join(', ')} in that order`);
  for (const lv of levels) {
    const w = `${at} ${lv.level}`;
    if (!(lv.sections?.length >= 2)) errors.push(`${w}: needs at least 2 sections`);
    (lv.sections || []).forEach((s, i) => {
      checkText(s.heading, `${w} section ${i + 1} heading`, errors);
      checkText(s.body, `${w} section ${i + 1} body`, errors);
    });
    if (!(lv.examples?.length >= 2)) errors.push(`${w}: needs at least 2 worked examples`);
    (lv.examples || []).forEach((ex, i) => {
      checkText(ex.question, `${w} example ${i + 1} question`, errors);
      if (!(ex.steps?.length >= 2)) errors.push(`${w} example ${i + 1}: needs at least 2 steps`);
      (ex.steps || []).forEach((st, j) => checkText(st, `${w} example ${i + 1} step ${j + 1}`, errors));
      checkText(ex.answer, `${w} example ${i + 1} answer`, errors);
    });
  }

  if (!(lesson.rules?.length >= 3)) errors.push(`${at}: needs at least 3 rules/formulas`);
  (lesson.rules || []).forEach((r, i) => {
    checkText(r.label, `${at} rule ${i + 1} label`, errors);
    checkText(r.explain, `${at} rule ${i + 1} explain`, errors);
    if (r.latex !== undefined) checkTex(r.latex, true, `${at} rule ${i + 1} latex`, errors);
  });
  if (!(lesson.tips?.length >= 3)) errors.push(`${at}: needs at least 3 tips`);
  (lesson.tips || []).forEach((t, i) => checkText(t, `${at} tip ${i + 1}`, errors));
  return errors;
}

module.exports = { LEVELS, validateLesson };

if (require.main === module) {
  const files = process.argv.slice(2);
  const items = files.length
    ? files.map((f) => ({ file: path.resolve(f), lesson: require(path.resolve(f)) }))
    : loadLessons();
  let bad = 0;
  for (const { file, lesson } of items) {
    const errors = validateLesson(lesson, file);
    if (errors.length) {
      bad += 1;
      errors.forEach((e) => console.error(`  ✗ ${e}`));
    } else {
      console.log(`  ✓ ${lesson.subject}/${lesson.topic}`);
    }
  }
  console.log(`${items.length - bad}/${items.length} lessons valid`);
  if (bad) process.exitCode = 1;
}
