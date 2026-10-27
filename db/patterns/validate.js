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
 *   patterns: [                                   // 3 to 15
 *     {
 *       key: 'snake_case_id',                     // unique within the file
 *       emoji: '🎯',
 *       name: T,                                  // "Find x% of a number"
 *       spot: T,                                  // how to recognise this pattern in a question (1-2 sentences)
 *       method: [T],                              // 2-5 short steps of the approach
 *       example: { question: T, steps: [T], answer: T },        // worked example, >= 2 steps
 *       tryIt: {                                  // "your turn": a fresh question of the same pattern
 *         question: T,
 *         options: [T, T, T, T],                  // exactly 4, all different
 *         correct: 0 | 1 | 2 | 3,                 // index into options
 *         explanation: [T],                       // >= 2 steps showing why
 *       },
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
  if (list.length < 3 || list.length > 15) errors.push(`${at}: needs 3 to 15 patterns`);
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
    checkText(p.example?.question, `${w} example question`, errors);
    if (!(p.example?.steps?.length >= 2)) errors.push(`${w}: example needs at least 2 steps`);
    (p.example?.steps || []).forEach((s, j) => checkText(s, `${w} example step ${j + 1}`, errors));
    checkText(p.example?.answer, `${w} example answer`, errors);
    const t = p.tryIt || {};
    checkText(t.question, `${w} tryIt question`, errors);
    if (t.options?.length !== 4) errors.push(`${w}: tryIt needs exactly 4 options`);
    (t.options || []).forEach((o, j) => checkOption(o, `${w} tryIt option ${j + 1}`, errors));
    if (new Set((t.options || []).map((o) => o?.en)).size !== (t.options || []).length) errors.push(`${w}: tryIt options must all differ`);
    if (![0, 1, 2, 3].includes(t.correct)) errors.push(`${w}: tryIt.correct must be 0-3`);
    if (!(t.explanation?.length >= 2)) errors.push(`${w}: tryIt needs at least 2 explanation steps`);
    (t.explanation || []).forEach((s, j) => checkText(s, `${w} tryIt explanation ${j + 1}`, errors));
  });

  if (doc.registry !== undefined) {
    if (doc.subject === 'quant' && doc.topic === 'profit_loss' && doc.registry.length !== 15) {
      errors.push(`${at}: Profit & Loss registry must contain exactly 15 patterns`);
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
    });
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
