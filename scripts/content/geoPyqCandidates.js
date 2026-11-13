'use strict';

/**
 * Writes the Geography PYQ lists the chapter writers work from (db/books/geography/drafts/):
 *   pyq_all.json                 every Geography PYQ in db/pyq (code, exam, question, options, official answer)
 *   pyq_candidates_GEO-NN.json   a keyword pre-sort for one chapter. It is only a starting list: the writer decides
 *                                for each candidate whether the chapter teaches the answer (pyq_map_GEO-NN.json).
 * Usage: node scripts/content/geoPyqCandidates.js
 */

const fs = require('node:fs');
const path = require('node:path');

const PYQ_DIR = path.join(__dirname, '../../db/pyq');
const OUT = path.join(__dirname, '../../db/books/geography/drafts');
const slug = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
const codeOf = (p) => [slug(p.exam_name), p.year, p.tier && slug(p.tier), p.shift && slug(p.shift), `Q${p.question_no}`].filter(Boolean).join('-').slice(0, 80);

const WB = /west bengal|bengal|kolkata|calcutta|darjeeling|sundarban|hooghly|hugli|damodar|teesta|tista|purulia|bankura|jalpaiguri|digha|farakka|haldia|durgapur|asansol|malda|murshidabad|medinipur|midnapore|birbhum|cooch|alipurduar|kalimpong|jhargram|siliguri|nadia|howrah|burdwan|bardhaman|dinajpur|mayurakshi|ajay|rupnarayan|subarnarekha|kangsabati|jaldapara|gorumara|buxa|sandakphu|ayodhya hill/i;
const RIVERS = /river|tributar|confluence|delta|estuar|origin|rises|source of|ganga|ganges|yamuna|brahmaputra|godavari|krishna|narmada|tapi|tapti|kaveri|cauvery|mahanadi|indus|sutlej|beas|ravi|chenab|jhelum|son\b|chambal|betwa|ken\b|gandak|kosi|ghaghara|lake|lagoon|chilika|wular|loktak|sambhar|dal lake|waterfall|falls|drainage/i;
const SETS = {
  'GEO-03': (t) => RIVERS.test(t),
  'GEO-11': (t) => WB.test(t),
};

const all = [];
for (const f of fs.readdirSync(PYQ_DIR).filter((x) => x.endsWith('.json')).sort()) {
  for (const q of JSON.parse(fs.readFileSync(path.join(PYQ_DIR, f), 'utf8'))) {
    if (q.topic_code !== 'geography') continue;
    const en = q.content?.en || {};
    const options = (en.options || []).map((o) => (typeof o === 'string' ? o : o.text));
    const answer = (en.options || []).find((o) => o.id === q.correct_option_id)?.text ?? null;
    all.push({ pyq_code: codeOf(q.pyq), exam: `${q.pyq.exam_name} ${q.pyq.year}`, q: en.question_text, options, answer });
  }
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'pyq_all.json'), `${JSON.stringify(all, null, 1)}\n`);
const counts = { all: all.length };
for (const [code, test] of Object.entries(SETS)) {
  const list = all.filter((x) => test(`${x.q} ${x.options.join(' ')}`));
  counts[code] = list.length;
  fs.writeFileSync(path.join(OUT, `pyq_candidates_${code}.json`), `${JSON.stringify(list, null, 1)}\n`);
}
console.log(counts);
