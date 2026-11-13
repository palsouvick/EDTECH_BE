'use strict';

/**
 * Builds the answer-free packet for the independent (blind) check of a study-book chapter, and writes the answer key
 * somewhere the checker cannot see it.
 *
 *   node scripts/content/blindPacket.js <chapter.json> <packet.json> <key.json> [--page-check c116,c201]
 *
 * The packet has the sources, every question with its options shuffled and no answer, the chapter's prose and blocks,
 * and (with --page-check) the claims whose WBBSE quote the OCR could not confirm, so the checker reads them on the page image.
 */

const fs = require('node:fs');

const [file, packetFile, keyFile, flag, ids] = process.argv.slice(2);
const ch = JSON.parse(fs.readFileSync(file, 'utf8'));
const shuffle = (a) => a.map((x) => [x, Math.random()]).sort((p, q) => p[1] - q[1]).map((p) => p[0]);
const key = {};
const packet = {
  chapter: ch.code,
  sources: ch.sources,
  questions: ch.questions.map((q) => {
    key[q.id] = q.a;
    return { id: q.id, format: q.format, question: q.q, options: shuffle([q.a, ...q.w]) };
  }),
  prose: [
    ...ch.sections.map((s) => ({ section: s.id, heading: s.heading, quick: s.quick, standard: s.standard, deep: s.deep, boxes: s.boxes })),
    {
      section: '_blocks',
      events: ch.events || [],
      people: ch.people || [],
      timeline: (ch.timeline || []).map(({ claims, ...t }) => t),
      locate: (ch.locate || []).map(({ claims, ...t }) => t), // Geography's "Locate it" table
      terms: ch.terms,
      cause_effect: ch.cause_effect.map(({ claims, ...t }) => t),
      bengal: ch.bengal_connection.body,
      quick_revision: ch.quick_revision,
      exam_focus: ch.exam_focus,
    },
  ],
  page_checks: flag === '--page-check' ? ch.claims.filter((c) => ids.split(',').includes(c.id)).map(({ id, claim, quote, page, source }) => ({ id, claim, quote, page, source })) : [],
};
fs.writeFileSync(packetFile, JSON.stringify(packet, null, 1));
fs.writeFileSync(keyFile, JSON.stringify(key, null, 1));
console.log(`${packet.questions.length} questions, ${packet.page_checks.length} page checks`);
