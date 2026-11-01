'use strict';

/**
 * Turns the hand-authored banks in scripts/generators/factbank/*.js into
 * generator specs ({ topics: [{ topic, weight, gens }] }) like Copilot's
 * generators, so the same runner seeds them.
 *
 * A bank holds a fixed set of questions: its generator hands them out once
 * each, in a seeded random order, then returns null (the runner treats a run
 * of nulls as "this topic is exhausted"). A bank that fails validation is
 * skipped with a warning rather than half-imported.
 */

const fs = require('node:fs');
const path = require('node:path');
const { shuffle, T, build } = require('../common');
const { validateBank } = require('../factbank/validate');
const { itemSubtopics } = require('../factbank/subtopics');

const DIR = path.join(__dirname, '../factbank');
const NOT_BANKS = new Set(['validate.js', 'subtopics.js']);

const pairObj = ([en, bn]) => ({ en, bn });

function toBody(bank, item, passage, itemSubtopic) {
  const englishSubject = bank.subject === 'english';
  let stem;
  if (passage) {
    const quoted = passage.trim().split(/\n\s*\n/).map((p) => `> ${p.trim()}`).join('\n>\n');
    stem = T(
      `Read the passage and answer the question that follows.\n\n${quoted}\n\n**${item.q[0]}**`,
      `অনুচ্ছেদটি পড়ে নিচের প্রশ্নের উত্তর দাও।\n\n${quoted}\n\n**${item.q[1]}**`,
    );
  } else {
    stem = pairObj(item.q);
  }
  // Current affairs: the event date and source under the explanation, and the month as subtopic.
  const steps = [pairObj(item.e)];
  if (item.src) {
    const when = new Date(`${item.src.date}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    steps.push(T(`📰 ${when} · Source: [${item.src.name}](${item.src.url})`, `📰 ${when} · সূত্র: [${item.src.name}](${item.src.url})`));
  }
  return build({
    topic: bank.topic,
    subtopic: bank.month ? `ca_${bank.month.replace('-', '_')}` : itemSubtopic ?? bank.subtopic,
    tags: ['factbank', bank.topic],
    difficulty: item.d,
    time: passage ? 75 : englishSubject ? 45 : 35,
    stem,
    correct: pairObj(item.a),
    wrong: item.w.map(pairObj),
    steps,
  });
}

function bankSpec(bank, file) {
  // GK subcategory of each item, from the section headers in the bank file (null when unknown).
  const subs = !Array.isArray(bank.passages) && file ? itemSubtopics(path.join(DIR, file), bank) : null;
  const entries = Array.isArray(bank.passages)
    ? bank.passages.flatMap((p) => p.items.map((item) => ({ item, passage: p.text })))
    : bank.items.map((item, i) => ({ item, passage: null, subtopic: subs?.[i] ?? undefined }));
  let order = null;
  let next = 0;
  const gen = () => {
    order ??= shuffle(entries); // seeded by the runner's PRNG at first use
    if (next >= order.length) return null;
    const { item, passage, subtopic } = order[next++];
    return toBody(bank, item, passage, subtopic);
  };
  return { topic: bank.topic, weight: 1, gens: [gen], capacity: entries.length };
}

/** All valid banks for one subject, as a generator spec. */
function factbankSpec(subject) {
  const topics = [];
  if (!fs.existsSync(DIR)) return { subject, topics };
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.js') && !NOT_BANKS.has(f)).sort()) {
    const bank = require(path.join(DIR, file));
    if (bank.subject !== subject) continue;
    const { errors, count } = validateBank(bank, file);
    if (errors.length) {
      console.warn(`  ! factbank ${file}: ${errors.length} problems, skipped (run factbank/validate.js on it)`);
      continue;
    }
    topics.push({ ...bankSpec(bank, file), file, count });
  }
  return { subject, topics };
}

module.exports = { factbankSpec };
