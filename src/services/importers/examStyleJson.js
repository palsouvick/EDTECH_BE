'use strict';

const { inCatalog } = require('../taxonomy');

const crypto = require('node:crypto');

/**
 * Converts the authoring JSON used in db/seed/pyq-sample-25.json into
 * Question documents:
 *
 *   { category: "SSC_CGL", subject: "Mathematics", topic: "Profit & Loss",
 *     difficulty: "Easy" | "Medium" | "Hard",
 *     previous_year_reference: "... pattern (exam-style, not verbatim)",
 *     content: { en: { question_text, options: [{ id: "A", text }], explanation }, bn: {...} },
 *     correct_option_id: "A" }
 *
 * Mappings are explicit tables: an unknown category, subject or topic is a
 * reported error, never a silent guess.
 */

const CATEGORY_MAP = {
  SSC_CGL: { category: 'SSC', tier: 'TIER_1' },
  SSC_CHSL: { category: 'SSC', tier: 'TIER_1' },
  SSC_MTS: { category: 'SSC', tier: 'SINGLE' },
  BANK_PO: { category: 'BANK', tier: 'PRELIMS' },
  BANK_CLERK: { category: 'BANK', tier: 'PRELIMS' },
  WBPSC_WBCS: { category: 'WBPSC', tier: 'PRELIMS' },
  WBPSC_CLERKSHIP: { category: 'WBPSC', tier: 'SINGLE' },
  WB_POST: { category: 'WB_POST', tier: 'SINGLE' },
};

const SUBJECT_MAP = {
  Mathematics: 'quant',
  'Quantitative Aptitude': 'quant',
  Reasoning: 'reasoning',
  English: 'english',
  'General Studies': 'gs',
  'General Awareness': 'gs',
};

// value: topic, or [topic, subtopic]
const TOPIC_MAP = {
  Percentage: 'percentage',
  'Profit & Loss': 'profit_loss',
  'Time & Work': 'time_work',
  'Simple & Compound Interest': 'interest',
  'Speed & Distance': 'time_speed_distance',
  Averages: 'average',
  'Ratio & Proportion': 'ratio_proportion',
  'Number System': 'number_system',
  'Idioms & Phrases': 'idioms_phrases',
  'Synonyms/Antonyms': 'synonyms_antonyms',
  'One Word Substitution': 'one_word_substitution',
  'Error Detection': 'error_spotting',
  Prepositions: ['grammar', 'prepositions'],
  'Subject-Verb Agreement': ['grammar', 'subject_verb_agreement'],
  'Conjunctions & Correlatives': ['grammar', 'conjunctions'],
  'Sentence Improvement': 'sentence_improvement',
  'Coding-Decoding': 'coding_decoding',
  'Blood Relations': 'blood_relations',
  'Number Series': 'series',
  'Direction Sense': 'direction_sense',
  Syllogism: 'syllogism',
};

// Our bands: EASY 1-2, MEDIUM 3, HARD 4-5. Imported labels land mid-band.
const DIFFICULTY_MAP = { Easy: 2, Medium: 3, Hard: 4 };

// Explanations end with "10-second shortcut: ..." / "শর্টকাট: ...".
const SHORTCUT_MARKER = {
  en: /\s*(?:\d+-second\s+)?shortcut\s*:\s*/i,
  bn: /\s*শর্টকাট\s*:\s*/,
  hi: /\s*शॉर्टकट\s*:\s*/,
};
// Sentence ends: "." for English, "।" (dari) for Bengali/Hindi.
const SENTENCE_SPLIT = {
  en: /(?<=[.])\s+(?=[A-Z0-9'"(])/,
  bn: /(?<=[।])\s+/,
  hi: /(?<=[।])\s+/,
};

// A sentence such as "Trap: 25 − 12 = 13% ignores ..." / "ভুল ফাঁদ: ..." becomes a trap note.
const TRAP_MARKER = {
  en: /^(?:common\s+)?trap\s*:\s*/i,
  bn: /^(?:ভুল\s*)?ফাঁদ\s*:\s*/,
  hi: /^(?:आम\s*)?(?:जाल|गलती)\s*:\s*/,
};

const hash = (s, n = 8) => crypto.createHash('sha1').update(s).digest('hex').slice(0, n);

function splitExplanation(lang, text) {
  const [body, ...rest] = text.split(SHORTCUT_MARKER[lang]);
  const all = body.trim().split(SENTENCE_SPLIT[lang]).map((s) => s.trim()).filter(Boolean);
  const traps = all.filter((s) => TRAP_MARKER[lang].test(s)).map((s) => s.replace(TRAP_MARKER[lang], ''));
  const sentences = all.filter((s) => !TRAP_MARKER[lang].test(s));
  return { sentences, trap: traps.join(' ') || null, shortcut: rest.join(' ').trim() || null };
}

/**
 * Steps become one per sentence only when every language has the same number
 * of sentences; otherwise the explanation stays one step, so English step 3
 * is never shown beside a Bengali step 3 that says something else.
 */
function buildSolution(content, langs) {
  const parts = Object.fromEntries(langs.map((l) => [l, splitExplanation(l, content[l].explanation)]));
  const counts = new Set(langs.map((l) => parts[l].sentences.length));
  const aligned = counts.size === 1;

  const steps = aligned
    ? parts[langs[0]].sentences.map((_, i) => Object.fromEntries(langs.map((l) => [l, parts[l].sentences[i]])))
    : [Object.fromEntries(langs.map((l) => [l, parts[l].sentences.join(' ')]))];

  const pick = (key) => {
    const present = langs.filter((l) => parts[l][key]);
    return present.length ? Object.fromEntries(present.map((l) => [l, parts[l][key]])) : undefined;
  };
  const shortcut = pick('shortcut');
  const trap = pick('trap');

  // Not linked to an option: matching option text inside the note is too ambiguous
  // ("10%" appears in many notes). Unlinked traps still show when a student answers wrong.
  return { solution: { steps, shortcut, traps: trap ? [{ note: trap }] : [] }, aligned };
}

/**
 * @returns {{ doc?: object, error?: string, warnings: string[] }}
 */
// Real previous-year questions must come from the commission's own published
// paper: these are the only hosts accepted as a PYQ source.
const OFFICIAL_PAPER_HOSTS = [
  'wbpsc.gov.in', 'psc.wb.gov.in', 'ssc.gov.in', 'ssc.nic.in', 'ibps.in', 'sbi.co.in', 'bank.sbi', 'indiapost.gov.in', 'wbssc.gov.in', 'wbsc.gov.in',
];
const isOfficialUrl = (u) => {
  try {
    const { protocol, hostname } = new URL(u);
    return protocol === 'https:' && OFFICIAL_PAPER_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
};

/**
 * Real PYQ reference from the authoring JSON:
 *   pyq: { exam_name, tier?, year, shift?, question_no, paper_url, answer_key_url? }
 * paper_url (and answer_key_url) must be on an official commission host.
 */
function pyqRef(p, index) {
  if (!p || typeof p !== 'object') return { error: `#${index}: pyq must be an object` };
  if (!p.exam_name || !Number.isInteger(p.year) || !Number.isInteger(p.question_no)) {
    return { error: `#${index}: pyq needs exam_name, year and question_no` };
  }
  if (!isOfficialUrl(p.paper_url)) return { error: `#${index}: pyq.paper_url must be an https link on an official commission site` };
  if (p.answer_key_url && !isOfficialUrl(p.answer_key_url)) return { error: `#${index}: pyq.answer_key_url must be on an official commission site` };
  const slug = (s) => String(s).toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  const question_code = [slug(p.exam_name), p.year, p.tier && slug(p.tier), p.shift && slug(p.shift), `Q${p.question_no}`].filter(Boolean).join('-').slice(0, 80);
  return {
    ref: {
      exam_name: p.exam_name,
      ...(p.tier && { tier: p.tier }),
      year: p.year,
      ...(p.shift && { shift: p.shift }),
      question_code,
      source_url: p.paper_url,
      ...(p.answer_key_url && { answer_key_url: p.answer_key_url }),
    },
  };
}

function convertExamStyleQuestion(raw, { status = 'PUBLISHED', index = 0 } = {}) {
  const warnings = [];
  const target = CATEGORY_MAP[raw.category];
  // Catalogue codes (subject_code / topic_code) cover every chapter; the name maps only the common ones.
  const subject = raw.subject_code ?? SUBJECT_MAP[raw.subject];
  const topicEntry = raw.topic_code ? (inCatalog(subject, raw.topic_code) ? raw.topic_code : null) : TOPIC_MAP[raw.topic];
  const difficulty = DIFFICULTY_MAP[raw.difficulty];
  if (!target) return { error: `#${index}: unknown category "${raw.category}"`, warnings };
  if (!subject) return { error: `#${index}: unknown subject "${raw.subject}"`, warnings };
  if (!topicEntry) return { error: `#${index}: unknown topic "${raw.topic_code ?? raw.topic}"`, warnings };
  if (!difficulty) return { error: `#${index}: unknown difficulty "${raw.difficulty}"`, warnings };
  const [topic, subtopic] = Array.isArray(topicEntry) ? topicEntry : [topicEntry, undefined];

  const langs = Object.keys(raw.content || {}).filter((l) => ['en', 'bn', 'hi'].includes(l));
  if (!langs.length) return { error: `#${index}: no en/bn/hi content`, warnings };

  // Stable identity from the English (or first) stem: re-importing updates, never duplicates.
  const identity = raw.content[langs.includes('en') ? 'en' : langs[0]].question_text;
  const code = `IMP-${hash(identity, 10).toUpperCase()}`;
  const optionId = (letter) => `opt_${hash(`${code}:${letter}`)}`;

  const letters = raw.content[langs[0]].options.map((o) => o.id);
  for (const l of langs) {
    const ls = raw.content[l].options.map((o) => o.id);
    if (JSON.stringify(ls) !== JSON.stringify(letters)) {
      return { error: `#${index}: option ids differ between languages`, warnings };
    }
  }
  if (!letters.includes(raw.correct_option_id)) {
    return { error: `#${index}: correct_option_id "${raw.correct_option_id}" is not an option`, warnings };
  }

  const { solution, aligned } = buildSolution(raw.content, langs);
  if (!aligned) warnings.push(`#${index} (${code}): explanation sentences differ across languages; kept as one step`);

  // "... pattern (exam-style, not verbatim)" is NOT a previous-year question: no PYQ ref.
  const ref = raw.previous_year_reference || '';
  const isRealPyq = ref && !/pattern|exam-style|not verbatim/i.test(ref);
  if (isRealPyq && !raw.pyq) warnings.push(`#${index} (${code}): looks like a real PYQ ("${ref}") but has no pyq {} block; not tagged`);

  // A real PYQ: tagged, and the official paper is cited under the explanation.
  let pyq;
  if (raw.pyq) {
    const r = pyqRef(raw.pyq, index);
    if (r.error) return { error: r.error, warnings };
    pyq = { refs: [r.ref] };
    const label = `${r.ref.exam_name} ${r.ref.year}${r.ref.shift ? `, ${r.ref.shift}` : ''}, Q${raw.pyq.question_no}`;
    solution.steps.push(
      Object.fromEntries(langs.map((l) => [l, l === 'bn' ? `📄 আসল প্রশ্ন: ${label} · [সরকারি প্রশ্নপত্র](${r.ref.source_url})` : `📄 Previous-year question: ${label} · [Official paper](${r.ref.source_url})`])),
    );
  }

  return {
    warnings,
    doc: {
      code,
      exam_targets: [target],
      subject,
      topic,
      ...(subtopic && { subtopic }),
      difficulty,
      stem: Object.fromEntries(langs.map((l) => [l, raw.content[l].question_text])),
      options: letters.map((letter, i) => ({
        oid: optionId(letter),
        text: Object.fromEntries(langs.map((l) => [l, raw.content[l].options[i].text])),
      })),
      correct_option_id: optionId(raw.correct_option_id),
      solution,
      ...(pyq && { pyq }),
      provenance: pyq ? 'OFFICIAL_VERIFIED' : 'ORIGINAL_PRACTICE',
      status,
      authored_by: 'import:exam-style-json',
    },
  };
}

module.exports = { convertExamStyleQuestion, CATEGORY_MAP, SUBJECT_MAP, TOPIC_MAP };
