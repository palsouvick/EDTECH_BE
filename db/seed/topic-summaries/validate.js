'use strict';

/**
 * Concept notes ("how to solve" sheets) shown at the top of every topic page.
 *
 * One file per subject: db/seed/topic-summaries/<subject>.js
 *
 *   module.exports = [
 *     {
 *       subject: 'reasoning',
 *       topic: 'coding_decoding',              // must match db/seed/catalog.js
 *       title:    { en, bn, hi? },
 *       overview: { en, bn, hi? },             // Markdown: what the topic is + how to approach it (3-6 sentences)
 *       formulas: [{ key, label: {en,bn}, latex, variables?: [{ symbol, meaning: {en,bn} }], explanation?: {en,bn} }],
 *       derivation_rules: [{ title: {en,bn}, body: {en,bn} }],   // the step-by-step method / rules
 *       speed_tricks:     [{ title: {en,bn}, body: {en,bn}, approx_time_saved_sec? }],
 *       common_traps:     [{ en, bn }],                         // PYQ pitfalls
 *     },
 *   ];
 *
 * Markdown may use KaTeX: $inline$ and $$display$$. Use \frac inside sentences,
 * \dfrac only in `latex` (display) fields. Use ₹ for rupees, never a bare $.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/quant.js
 */

const path = require('node:path');
const katex = require('katex');
const catalog = require('../catalog');

const BN = /[ঀ-৿]/;
const MIN = {
  quant: { formulas: 4, derivation_rules: 2, speed_tricks: 3, common_traps: 3 },
  reasoning: { formulas: 0, derivation_rules: 3, speed_tricks: 3, common_traps: 3 },
  english: { formulas: 0, derivation_rules: 3, speed_tricks: 3, common_traps: 3 },
  gs: { formulas: 0, derivation_rules: 3, speed_tricks: 3, common_traps: 3 },
};

const topicsOf = (subject) =>
  new Set(catalog.flatMap((c) => c.subjects.filter((s) => s.code === subject).flatMap((s) => s.topics.map((t) => t.code))));

function checkTex(tex, where, errors, display) {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'ignore' });
  } catch (e) {
    errors.push(`${where}: KaTeX error in "${tex.slice(0, 60)}": ${e.message.split('\n')[0]}`);
  }
}

/** Find $..$ / $$..$$ in Markdown and make sure KaTeX can render each. */
function checkMarkdown(md, where, errors) {
  if (typeof md !== 'string') return;
  for (const m of md.matchAll(/\$\$([\s\S]+?)\$\$/g)) checkTex(m[1], where, errors, true);
  const inline = md.replace(/\$\$[\s\S]+?\$\$/g, '');
  const dollars = (inline.match(/\$/g) || []).length;
  if (dollars % 2) errors.push(`${where}: unbalanced $ (use ₹ for money)`);
  for (const m of inline.matchAll(/\$([^$]+?)\$/g)) checkTex(m[1], where, errors, false);
}

function loc(v, where, errors, { bengali = true, md = false } = {}) {
  if (!v || typeof v.en !== 'string' || !v.en.trim()) return errors.push(`${where}: missing English`);
  if (typeof v.bn !== 'string' || !v.bn.trim()) return errors.push(`${where}: missing Bengali`);
  if (bengali && !BN.test(v.bn)) errors.push(`${where}: bn has no Bengali script`);
  if (md) for (const l of ['en', 'bn', 'hi']) checkMarkdown(v[l], `${where}.${l}`, errors);
}

function validateSummaries(list, file = 'file') {
  const errors = [];
  if (!Array.isArray(list)) return [`${file}: must export an array`];
  const seen = new Set();
  for (const [i, s] of list.entries()) {
    const at = `${file} #${i + 1} ${s?.topic ?? '?'}`;
    if (!MIN[s.subject]) { errors.push(`${at}: unknown subject ${s.subject}`); continue; }
    if (!topicsOf(s.subject).has(s.topic)) errors.push(`${at}: topic not in catalog`);
    if (seen.has(s.topic)) errors.push(`${at}: duplicate topic`);
    seen.add(s.topic);
    loc(s.title, `${at} title`, errors);
    loc(s.overview, `${at} overview`, errors, { md: true });
    if (s.overview?.en && s.overview.en.length < 150) errors.push(`${at}: overview too short (explain how to approach the topic)`);
    const min = MIN[s.subject];
    for (const k of Object.keys(min)) {
      if (!Array.isArray(s[k])) { errors.push(`${at}: ${k} must be an array`); continue; }
      if (s[k].length < min[k]) errors.push(`${at}: needs at least ${min[k]} ${k} (has ${s[k].length})`);
    }
    (s.formulas || []).forEach((f, j) => {
      const w = `${at} formula ${j + 1}`;
      if (!/^[a-z0-9_]+$/.test(f.key || '')) errors.push(`${w}: key must be a slug`);
      loc(f.label, `${w} label`, errors);
      if (typeof f.latex !== 'string' || !f.latex.trim()) errors.push(`${w}: latex required`);
      else checkTex(f.latex, w, errors, true);
      (f.variables || []).forEach((v, k) => {
        checkTex(v.symbol, `${w} var ${k + 1}`, errors, false);
        loc(v.meaning, `${w} var ${k + 1} meaning`, errors);
      });
      if (f.explanation) loc(f.explanation, `${w} explanation`, errors, { md: true });
    });
    (s.derivation_rules || []).forEach((r, j) => {
      loc(r.title, `${at} rule ${j + 1} title`, errors, { md: true });
      loc(r.body, `${at} rule ${j + 1} body`, errors, { md: true });
    });
    (s.speed_tricks || []).forEach((t, j) => {
      loc(t.title, `${at} trick ${j + 1} title`, errors, { md: true });
      loc(t.body, `${at} trick ${j + 1} body`, errors, { md: true });
    });
    (s.common_traps || []).forEach((t, j) => loc(t, `${at} trap ${j + 1}`, errors, { md: true }));
  }
  return errors;
}

module.exports = { validateSummaries, topicsOf };

if (require.main === module) {
  // A subject's sheets may be split across files (quant.js + quant_more_a.js):
  // missing topics are checked per subject over all the files given.
  let failed = false;
  const bySubject = new Map();
  for (const f of process.argv.slice(2)) {
    const list = require(path.resolve(f));
    if (!Array.isArray(list)) continue; // index.js / validate.js when run on the whole folder
    const errors = validateSummaries(list, path.basename(f));
    console.log(`${path.basename(f)}: ${list.length} topic sheets, ${errors.length} problems`);
    errors.slice(0, 50).forEach((e) => console.log('  ' + e));
    if (errors.length) failed = true;
    for (const s of list) (bySubject.get(s.subject) ?? bySubject.set(s.subject, new Set()).get(s.subject)).add(s.topic);
  }
  for (const [subject, have] of bySubject) {
    const missing = [...topicsOf(subject)].filter((t) => !have.has(t));
    if (missing.length) {
      console.log(`${subject}: missing topics: ${missing.join(', ')} (pass all of the subject's files together)`);
      failed = true;
    }
  }
  process.exit(failed ? 1 : 0);
}
