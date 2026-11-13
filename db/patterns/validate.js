'use strict';

/**
 * Question patterns: the common ways each chapter is asked in exams, shown on
 * the study page between the formulas and the practice questions. One file per
 * chapter: db/patterns/<subject>/<topic>.js.
 *
 *   node db/patterns/validate.js                          # all files
 *   node db/patterns/validate.js db/patterns/quant/ages.js
 *
 * Every text T is { en, bn } (both required) and may use Markdown and KaTeX
 * ($inline$, $$display$$).
 *
 * module.exports = {
 *   subject: 'quant' | 'reasoning' | 'english' | 'gs',
 *   topic: '<catalogue topic code>',
 *   patterns: [                                   // 3 to 20
 *     {
 *       key: 'snake_case_id',                     // unique within the file
 *       emoji: '🎯',
 *       name: T,                                  // "Find x% of a number"
 *       spot: T,                                  // how to recognise this pattern in a question (1-2 sentences)
 *       method: [T],                              // 2-5 short steps of the approach
 *       example?: { question: T, steps: [T], answer: T },       // one worked example, >= 2 steps
 *       examples?: [{ question: T, steps: [T], answer: T }],    // one or more worked examples; use either field
 *       tryIt?: {                                 // "your turn": a fresh question of the same pattern
 *         question: T,
 *         options: [T, T, T, T],                  // exactly 4, all different
 *         correct: 0 | 1 | 2 | 3,                 // index into options
 *         explanation: [T],                       // >= 2 steps showing why
 *       },
 *       typicalWording?: T, formula?: T, shortcut?: T, trap?: T,
 *       difficulty?: 'beginner' | 'intermediate' | 'advanced',
 *       practiceKey?: 'question_bank_pattern_key', practiceLevels?: ['beginner'],
 *     },
 *   ],
 * };
 */

const path = require('node:path');
const katex = require('katex');
const catalog = require('../seed/catalog');
const { loadPatterns } = require('./index');

const BENGALI = /[ঀ-৿]/;
const topicsBySubject = {};
for (const c of catalog) for (const s of c.subjects) for (const t of s.topics) (topicsBySubject[s.code] ||= new Set()).add(t.code);

function checkText(value, where, errors) {
  if (!value || typeof value !== 'object') return errors.push(`${where}: missing { en, bn }`);
  for (const lang of ['en', 'bn']) {
    const s = value[lang];
    if (typeof s !== 'string' || !s.trim()) {
      errors.push(`${where}.${lang}: missing`);
      continue;
    }
    const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
    let m;
    while ((m = re.exec(s))) {
      try {
        katex.renderToString(m[1] ?? m[2], { displayMode: m[1] !== undefined, throwOnError: true, strict: 'ignore' });
      } catch (e) {
        errors.push(`${where}.${lang}: KaTeX error in "${(m[1] ?? m[2]).slice(0, 50)}": ${e.message.split('\n')[0]}`);
      }
    }
  }
  if (typeof value.bn === 'string' && !BENGALI.test(value.bn.replace(/\$[^$]*\$/g, ''))) errors.push(`${where}.bn: no Bengali script (translate it)`);
  if (typeof value.en === 'string' && BENGALI.test(value.en)) errors.push(`${where}.en: contains Bengali script`);
}

/** Options may be bare numbers or English words in both languages; they only need to exist. */
function checkOption(value, where, errors) {
  if (!value || typeof value.en !== 'string' || !value.en.trim() || typeof value.bn !== 'string' || !value.bn.trim()) errors.push(`${where}: needs en and bn`);
}

function validatePatterns(doc, file = '') {
  const errors = [];
  const at = path.basename(file || `${doc?.subject}/${doc?.topic}`);
  if (!doc || typeof doc !== 'object') return [`${at}: does not export an object`];
  if (!topicsBySubject[doc.subject]?.has(doc.topic)) errors.push(`${at}: ${doc.subject}/${doc.topic} is not in db/seed/catalog.js`);
  if (file && path.basename(file, '.js') !== doc.topic) errors.push(`${at}: file name must be <topic>.js`);
  if (file && path.basename(path.dirname(file)) !== doc.subject) errors.push(`${at}: must sit in db/patterns/${doc.subject}/`);
  const list = doc.patterns || [];
  if (list.length < 3 || list.length > 20) errors.push(`${at}: needs 3 to 20 patterns`);
  const keys = new Set();
  list.forEach((p, i) => {
    const w = `${at} pattern ${i + 1}${p?.key ? ` (${p.key})` : ''}`;
    if (!/^[a-z0-9_]+$/.test(p.key || '')) errors.push(`${w}: key must be snake_case`);
    if (keys.has(p.key)) errors.push(`${w}: duplicate key`);
    keys.add(p.key);
    if (typeof p.emoji !== 'string' || !p.emoji || p.emoji.length > 8) errors.push(`${w}: emoji must be one emoji`);
    checkText(p.name, `${w} name`, errors);
    checkText(p.spot, `${w} spot`, errors);
    if (!(p.method?.length >= 2 && p.method.length <= 5)) errors.push(`${w}: method needs 2-5 steps`);
    (p.method || []).forEach((s, j) => checkText(s, `${w} method ${j + 1}`, errors));
    const examples = p.examples ?? (p.example ? [p.example] : []);
    if (!examples.length) errors.push(`${w}: needs at least one solved example`);
    examples.forEach((example, exampleIndex) => {
      const ew = `${w} example ${exampleIndex + 1}`;
      checkText(example.question, `${ew} question`, errors);
      if (!(example.steps?.length >= 2)) errors.push(`${ew}: needs at least 2 steps`);
      (example.steps || []).forEach((s, j) => checkText(s, `${ew} step ${j + 1}`, errors));
      checkText(example.answer, `${ew} answer`, errors);
    });
    if (p.tryIt) {
      const t = p.tryIt;
      checkText(t.question, `${w} tryIt question`, errors);
      if (t.options?.length !== 4) errors.push(`${w}: tryIt needs exactly 4 options`);
      (t.options || []).forEach((o, j) => checkOption(o, `${w} tryIt option ${j + 1}`, errors));
      if (new Set((t.options || []).map((o) => o?.en)).size !== (t.options || []).length) errors.push(`${w}: tryIt options must all differ`);
      if (![0, 1, 2, 3].includes(t.correct)) errors.push(`${w}: tryIt.correct must be 0-3`);
      if (!(t.explanation?.length >= 2)) errors.push(`${w}: tryIt needs at least 2 explanation steps`);
      (t.explanation || []).forEach((s, j) => checkText(s, `${w} tryIt explanation ${j + 1}`, errors));
    }

    for (const field of ['typicalWording', 'formula', 'shortcut', 'trap']) {
      if (p[field]) checkText(p[field], `${w} ${field}`, errors);
    }
    if (p.difficulty && !['beginner', 'intermediate', 'advanced'].includes(p.difficulty)) errors.push(`${w}: invalid learning difficulty`);
    if (p.syllabusNote) checkText(p.syllabusNote, `${w} syllabus note`, errors);
    (p.examTags || []).forEach((tag, j) => checkText(tag, `${w} exam tag ${j + 1}`, errors));
    if (p.registryLinked !== undefined && typeof p.registryLinked !== 'boolean') errors.push(`${w}: registryLinked must be boolean`);
    if (p.practiceKey !== undefined && !/^[a-z0-9_]+$/.test(p.practiceKey)) errors.push(`${w}: practiceKey must be snake_case`);
    if (p.practiceLevels !== undefined && (!Array.isArray(p.practiceLevels) || !p.practiceLevels.length || p.practiceLevels.some((level) => !['beginner', 'intermediate', 'advanced'].includes(level)))) {
      errors.push(`${w}: practiceLevels must contain supported learning levels`);
    }
    if (p.important && examples.length < 2 && !p.tryIt) errors.push(`${w}: important patterns need two worked examples`);
  });

  if (doc.registry !== undefined) {
    if (doc.subject === 'quant' && doc.topic === 'profit_loss' && doc.registry.length !== 16) {
      errors.push(`${at}: Profit & Loss registry must contain exactly 16 patterns`);
    }
    const ids = new Set();
    doc.registry.forEach((pattern, i) => {
      const where = `${at} registry ${i + 1}`;
      if (!/^[a-z0-9_]+$/.test(pattern.id || '')) errors.push(`${where}: id must be snake_case`);
      if (ids.has(pattern.id)) errors.push(`${where}: duplicate id`);
      ids.add(pattern.id);
      if (![1, 2, 3, 4, 5].includes(pattern.difficulty)) errors.push(`${where}: difficulty must be an integer from 1 to 5`);
      if (!Array.isArray(pattern.concepts) || pattern.concepts.length < 2 || pattern.concepts.some((concept) => typeof concept !== 'string' || !concept.trim())) {
        errors.push(`${where}: at least two concepts are required`);
      }
      if (typeof pattern.generationRule !== 'string' || !pattern.generationRule.trim()) errors.push(`${where}: generationRule is required`);
      if (typeof pattern.solutionMethod !== 'string' || !pattern.solutionMethod.trim()) errors.push(`${where}: solutionMethod is required`);
      checkText(pattern.name, `${where} name`, errors);
      const linkedPattern = list.some((p) => p.key === pattern.id && p.registryLinked === true);
      if (keys.has(pattern.id) && !linkedPattern) errors.push(`${where}: id clashes with a study-pattern key`);
      // Hard-bank matrices (db/patterns/<subject>/hard/) also describe framings and syllabus scope.
      if (pattern.variants !== undefined) {
        if (!Array.isArray(pattern.variants) || pattern.variants.length < 2 || pattern.variants.some((v) => !/^[a-z0-9_]+$/.test(v))) {
          errors.push(`${where}: variants must list at least two snake_case framings`);
        }
        if (typeof pattern.clerkship !== 'boolean') errors.push(`${where}: clerkship must be true or false`);
        if (![3, 4, 5].includes(pattern.difficulty)) errors.push(`${where}: Hard-bank difficulty must be 3, 4 or 5`);
        if (!Array.isArray(pattern.skills) || !pattern.skills.length) errors.push(`${where}: skills are required`);
        if (typeof pattern.hardBecause !== 'string' || !pattern.hardBecause.trim()) errors.push(`${where}: hardBecause is required`);
      }
    });
    if (doc.registry.some((p) => p.variants !== undefined)) {
      for (const d of [3, 4, 5]) {
        if (doc.registry.filter((p) => p.difficulty === d).length < 2) errors.push(`${at}: the Hard matrix needs at least two patterns at difficulty ${d}`);
      }
      if (doc.registry.length < 10) errors.push(`${at}: the Hard matrix needs at least 10 patterns`);
    }
  }
  return errors;
}

module.exports = { validatePatterns };

if (require.main === module) {
  const files = process.argv.slice(2);
  const items = files.length ? files.map((f) => ({ file: path.resolve(f), doc: require(path.resolve(f)) })) : loadPatterns();
  let bad = 0;
  for (const { file, doc } of items) {
    const errors = validatePatterns(doc, file);
    if (errors.length) {
      bad += 1;
      errors.forEach((e) => console.error(`  ✗ ${e}`));
    } else {
      console.log(`  ✓ ${doc.subject}/${doc.topic} (${doc.patterns.length} patterns)`);
    }
  }
  console.log(`${items.length - bad}/${items.length} files valid`);
  if (bad) process.exitCode = 1;
}
