'use strict';

/**
 * Fact banks: hand-authored question sets for chapters that cannot be
 * templated (General Studies facts, English passages and sentences).
 *
 * File shape (CommonJS), one question per item, every text as [english, bengali]:
 *
 *   module.exports = {
 *     subject: 'gs',
 *     topic: 'indian_history',
 *     items: [
 *       {
 *         d: 2,                                            // difficulty 1-5
 *         q: ['Who founded the Maurya Empire?', 'মৌর্য সাম্রাজ্যের প্রতিষ্ঠাতা কে?'],
 *         a: ['Chandragupta Maurya', 'চন্দ্রগুপ্ত মৌর্য'],   // correct option
 *         w: [['Ashoka', 'অশোক'], ['Bindusara', 'বিন্দুসার'], ['Bimbisara', 'বিম্বিসার']], // 3 wrong
 *         e: ['Chandragupta Maurya founded it around 321 BCE, guided by Chanakya.', '...'], // explanation
 *       },
 *     ],
 *   };
 *
 * Reading comprehension uses `passages` instead of `items`:
 *   passages: [{ text: 'English passage', items: [ ...items as above... ] }]
 *
 * Current affairs (topic 'current_affairs') are dated and sourced. One file per
 * month, `month: 'YYYY-MM'`, and every item also carries
 *   src: { date: 'YYYY-MM-DD', name: 'PIB', url: 'https://pib.gov.in/...' }
 * (the event date, inside that month, and the page that confirms the fact).
 * The source is shown to students under the explanation. A month file needs
 * at least 30 questions rather than 100.
 *
 * English-subject banks keep options in English (bn may equal en); the Bengali
 * stem is the instruction in Bengali plus the English sentence.
 *
 *   node scripts/generators/factbank/validate.js scripts/generators/factbank/indian_history.js
 */

const path = require('node:path');

const BN = /[ঀ-৿]/;
const pair = (v) => Array.isArray(v) && v.length === 2 && v.every((s) => typeof s === 'string' && s.trim().length > 0);

function validateItems(items, { english, where }) {
  const errors = [];
  items.forEach((it, i) => {
    const at = `${where} item ${i + 1}`;
    if (!Number.isInteger(it.d) || it.d < 1 || it.d > 5) errors.push(`${at}: d must be 1-5`);
    for (const k of ['q', 'a', 'e']) if (!pair(it[k])) errors.push(`${at}: ${k} must be [en, bn]`);
    if (!Array.isArray(it.w) || it.w.length < 2 || it.w.length > 3 || !it.w.every(pair)) errors.push(`${at}: w must be 2-3 [en, bn] pairs`);
    if (errors.length && errors[errors.length - 1].startsWith(at)) return;
    const opts = [it.a, ...it.w];
    if (new Set(opts.map((o) => o[0].trim().toLowerCase())).size !== opts.length) errors.push(`${at}: duplicate option (en)`);
    if (new Set(opts.map((o) => o[1].trim())).size !== opts.length) errors.push(`${at}: duplicate option (bn)`);
    if (!BN.test(it.q[1])) errors.push(`${at}: q[1] has no Bengali text`);
    if (!BN.test(it.e[1])) errors.push(`${at}: e[1] has no Bengali text`);
    if (!english) for (const o of opts) if (!BN.test(o[1]) && /[a-z]{3,}/i.test(o[1])) errors.push(`${at}: option "${o[1]}" is not Bengali`);
    if (it.q[0].length > 600 || it.e[0].length > 900) errors.push(`${at}: text too long`);
  });
  return errors;
}

const CA_MIN = 30;
const isCurrentAffairs = (bank) => bank?.topic === 'current_affairs';

/** Current-affairs items: a real https source and an event date inside the file's month. */
function validateSources(bank, items, file) {
  const errors = [];
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(bank.month || '')) return [`${file}: current affairs needs month: 'YYYY-MM'`];
  items.forEach((it, i) => {
    const at = `${file} item ${i + 1}`;
    const s = it.src;
    if (!s || typeof s !== 'object') return errors.push(`${at}: src { date, name, url } is required`);
    if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(s.url || '')) errors.push(`${at}: src.url must be an https link`);
    if (typeof s.name !== 'string' || !s.name.trim()) errors.push(`${at}: src.name is required`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s.date || '') || Number.isNaN(Date.parse(s.date))) errors.push(`${at}: src.date must be YYYY-MM-DD`);
    else if (!s.date.startsWith(bank.month)) errors.push(`${at}: src.date ${s.date} is outside ${bank.month}`);
  });
  return errors;
}

function validateBank(bank, file = 'bank') {
  const errors = [];
  if (!bank || typeof bank.subject !== 'string' || typeof bank.topic !== 'string') return { errors: [`${file}: missing subject/topic`], count: 0 };
  const english = bank.subject === 'english';
  let items = [];
  if (Array.isArray(bank.passages)) {
    bank.passages.forEach((p, i) => {
      if (typeof p.text !== 'string' || p.text.length < 200) errors.push(`${file} passage ${i + 1}: text too short`);
      errors.push(...validateItems(p.items || [], { english, where: `${file} passage ${i + 1}` }));
      items = items.concat(p.items || []);
    });
  } else {
    errors.push(...validateItems(bank.items || [], { english, where: file }));
    items = bank.items || [];
  }
  const stems = items.map((it) => (Array.isArray(it.q) ? it.q[0].trim().toLowerCase() : ''));
  const dupes = stems.filter((s, i) => s && stems.indexOf(s) !== i);
  if (dupes.length) errors.push(`${file}: duplicate questions: ${[...new Set(dupes)].slice(0, 5).join(' | ')}`);
  if (isCurrentAffairs(bank)) errors.push(...validateSources(bank, items, file));
  return { errors, count: items.length };
}

/** Smallest file worth shipping: a month of current affairs is smaller than a topic bank. */
const minCount = (bank) => (isCurrentAffairs(bank) ? CA_MIN : 100);

module.exports = { validateBank, minCount };

if (require.main === module) {
  let failed = false;
  for (const f of process.argv.slice(2)) {
    const bank = require(path.resolve(f));
    const { errors, count } = validateBank(bank, path.basename(f));
    console.log(`${path.basename(f)}: ${count} questions, ${errors.length} problems`);
    errors.slice(0, 40).forEach((e) => console.log('  ' + e));
    const min = minCount(bank);
    if (errors.length || count < min) failed = true;
    if (count < min) console.log(`  needs at least ${min} questions`);
  }
  process.exit(failed ? 1 : 0);
}
