'use strict';

/**
 * "My course": decide which syllabus chapter each page of a student's PDF belongs to, and turn
 * the pages into chapter sections. Pure functions, no AI and no network: keyword scores per page
 * (Bengali and English, as these books are written), then smoothing, because a book's chapters
 * are continuous runs of pages.
 *
 *   scorePage(text, subject?)      -> [{ key, score }] best first
 *   topicsInName(fileName)         -> ['quant/pipes_cistern', ...] from the file name
 *   subjectOf(fileName, pageKeys)  -> 'quant' | 'english' | 'gs' | 'reasoning' | null
 *   buildSections(pages, opts)     -> [{ key, from, to, confidence, source }]
 */

// [keyword, weight]. Weight 4 = only this chapter uses it; 1 = a hint.
const K = {
  'quant/percentage': [['শতকরা', 2], ['শতাংশ', 2], ['percentage', 3], ['per cent', 2], ['percent', 2]],
  'quant/profit_loss': [['লাভ', 3], ['ক্ষতি', 3], ['ক্রয়মূল্য', 4], ['বিক্রয়মূল্য', 4], ['ধার্যমূল্য', 4], ['ছাড়', 2], ['কমিশন', 2], ['profit', 3], ['loss', 2], ['discount', 3], ['cost price', 4], ['selling price', 4], ['marked price', 4]],
  'quant/ratio_proportion': [['অনুপাত', 3], ['সমানুপাত', 4], ['ratio', 3], ['proportion', 3]],
  'quant/time_work': [['শ্রমিক', 3], ['কাজটি', 3], ['কাজ', 1], ['কার্য', 1], ['দিনে শেষ', 3], ['একত্রে', 1], ['work', 2], ['men can', 3], ['days', 1]],
  'quant/pipes_cistern': [['চৌবাচ্চা', 4], ['নল', 3], ['ট্যাপ', 3], ['পূর্ণ করতে', 2], ['খালি করতে', 3], ['cistern', 4], ['pipe', 3], ['tank', 2], ['tap', 2]],
  'quant/interest': [['চক্রবৃদ্ধি', 4], ['সরল সুদ', 4], ['সুদের হার', 4], ['সুদ', 3], ['সমূল', 3], ['আসল', 1], ['interest', 3], ['compound', 2], ['principal', 2], ['per annum', 3]],
  // OCR often drops the dot under ড় (গড়/গড): 'গড' matches both after NFC.
  'quant/average': [['গড', 3], ['গড়ে', 1], ['average', 3], ['mean', 1]],
  'quant/time_speed_distance': [['কিমি/ঘণ্টা', 4], ['কিমি/ঘন্টা', 4], ['গতিবেগ', 4], ['বেগে', 2], ['দূরত্ব', 2], ['ট্রেন', 3], ['স্রোত', 4], ['নৌকা', 3], ['প্ল্যাটফর্ম', 3], ['km/hr', 4], ['km/h', 4], ['speed', 3], ['train', 3], ['stream', 3], ['boat', 3], ['distance', 2]],
  'quant/mixture_alligation': [['মিশ্রণ', 4], ['মিশ্রিত', 3], ['দরের', 2], ['অ্যালিগেশন', 4], ['mixture', 4], ['alligation', 4]],
  'quant/number_system': [['বিভাজ্য', 3], ['মৌলিক সংখ্যা', 3], ['ভাগশেষ', 3], ['গসাগু', 3], ['লসাগু', 3], ['ভাজক', 2], ['একক স্থানীয়', 3], ['divisible', 3], ['remainder', 3], ['hcf', 3], ['lcm', 3], ['prime', 2], ['unit digit', 3]],
  'quant/simplification': [['সরলীকরণ', 4], ['সরল কর', 3], ['মান নির্ণয়', 2], ['মান কত', 1], ['বর্গমূল', 2], ['ঘনমূল', 2], ['bodmas', 4], ['simplify', 3], ['square root', 2]],
  'quant/algebra': [['বীজগণিত', 3], ['সমীকরণ', 2], ['সূচক', 2], ['করণী', 3], ['প্রগতি', 3], ['উৎপাদকে', 3], ['equation', 2], ['algebra', 3], ['progression', 3], ['surd', 3], ['indices', 3]],
  'quant/mensuration': [['ক্ষেত্রফল', 3], ['আয়তন', 3], ['পরিসীমা', 3], ['ব্যাসার্ধ', 3], ['বর্গমিটার', 2], ['ঘনমিটার', 3], ['বেলন', 3], ['শঙ্কু', 3], ['গোলক', 3], ['area', 3], ['volume', 3], ['perimeter', 3], ['radius', 3], ['cylinder', 3], ['cone', 3], ['sphere', 3]],
  'quant/partnership': [['অংশীদার', 4], ['মূলধন', 4], ['লভ্যাংশ', 3], ['লাভের অংশ', 3], ['বিনিয়োগ', 3], ['ব্যবসা শুরু', 3], ['partnership', 4], ['partner', 3], ['capital', 2], ['invest', 3]],
  // "বছর পরে" is common in partnership and interest problems too: a hint only.
  'quant/ages': [['বয়স', 4], ['বয়সের', 2], ['বছর পূর্বে', 1], ['বছর পরে', 1], ['ages', 3], ['age of', 3], ['years ago', 3], ['years hence', 3]],
  'english/parts_of_speech': [['noun', 2], ['pronoun', 2], ['adjective', 2], ['adverb', 2], ['preposition', 2], ['conjunction', 2], ['interjection', 3]],
  'english/articles': [['definite article', 4], ['indefinite article', 4], ['articles', 3]],
  'english/tenses': [['tense', 4], ['present perfect', 3], ['past perfect', 3], ['continuous', 2]],
  'english/voice': [['passive', 4], ['active voice', 4], ['voice', 2]],
  'english/narration': [['narration', 4], ['direct speech', 4], ['indirect speech', 4], ['reported speech', 4]],
  'english/modals_conditionals': [['modal', 3], ['conditional', 3]],
  'english/error_spotting': [['spot the error', 4], ['error', 2], ['no error', 3]],
  'english/sentence_improvement': [['improvement', 3], ['no improvement', 4]],
  'english/fill_blanks': [['fill in the blank', 4], ['blanks', 2]],
  'english/synonyms_antonyms': [['synonym', 4], ['antonym', 4], ['opposite meaning', 3], ['similar meaning', 3]],
  'english/idioms_phrases': [['idiom', 4], ['phrase', 2]],
  'english/one_word_substitution': [['one word', 4], ['substitution', 3]],
  'english/reading_comprehension': [['comprehension', 4], ['passage', 3]],
  'gs/current_affairs': [['current affairs', 4], ['সাম্প্রতিক', 3]],
  'gs/indian_history': [['মুঘল', 3], ['মৌর্য', 3], ['গুপ্ত', 2], ['ইতিহাস', 2], ['history', 3], ['mughal', 3], ['dynasty', 2]],
  'gs/geography': [['ভূগোল', 3], ['নদী', 2], ['পর্বত', 2], ['geography', 3], ['river', 2]],
  'gs/polity': [['সংবিধান', 3], ['ধারা', 2], ['রাষ্ট্রপতি', 2], ['constitution', 3], ['article', 1], ['parliament', 3]],
  'gs/economy': [['অর্থনীতি', 3], ['জিডিপি', 3], ['economy', 3], ['gdp', 3], ['inflation', 3]],
  'gs/general_science': [['বিজ্ঞান', 2], ['রাসায়নিক', 3], ['physics', 3], ['chemistry', 3], ['biology', 3]],
};

// Extra words that name a chapter in a file name (on top of the keywords above).
const NAME_WORDS = {
  'quant/partnership': ['অংশীদারী', 'অংশীদারি'],
  'quant/time_speed_distance': ['সময় ও দূরত্ব', 'সময়_ও_দূরত্ব', 'speed'],
  'quant/pipes_cistern': ['নল ও চৌবাচ্চা'],
  'gs/current_affairs': ['current_affairs', 'current-affairs'],
};

// How books title their chapters (for reading a contents page). Longest match wins, so
// "সময় ও দূরত্ব" beats "সময়", and geometry titles ("উপপাদ্য") never count as mensuration.
const TITLES = {
  'quant/percentage': ['শতকরা', 'শতাংশ', 'percentage'],
  'quant/profit_loss': ['লাভ ও ক্ষতি', 'লাভ-ক্ষতি', 'লাভ', 'বাট্টা', 'profit and loss', 'profit & loss', 'discount'],
  'quant/ratio_proportion': ['অনুপাত ও সমানুপাত', 'অনুপাত', 'সমানুপাত', 'ratio', 'proportion'],
  'quant/time_work': ['সময় ও কার্য', 'সময় ও কাজ', 'কার্য', 'time and work', 'work'],
  'quant/pipes_cistern': ['নল ও চৌবাচ্চা', 'চৌবাচ্চা', 'pipes', 'cistern'],
  'quant/interest': ['চক্রবৃদ্ধি সুদ', 'সরল সুদ', 'সুদ', 'সমহার বৃদ্ধি', 'interest'],
  'quant/average': ['গড', 'average'],
  'quant/time_speed_distance': ['সময় এবং দূরত্ব', 'সময় ও দূরত্ব', 'ট্রেন', 'নৌকা', 'স্রোত', 'গতিবেগ', 'speed', 'distance', 'train', 'boat'],
  'quant/mixture_alligation': ['মিশ্রণ', 'mixture', 'alligation'],
  'quant/number_system': ['সংখ্যাতন্ত্র', 'বাস্তব সংখ্যা', 'অখণ্ড সংখ্যা', 'বিভাজ্যতা', 'ভগ্নাংশ', 'গসাগু', 'লসাগু', 'number system', 'hcf', 'lcm'],
  'quant/simplification': ['সরলীকরণ', 'বর্গমূল', 'ঘনমূল', 'simplification'],
  'quant/algebra': ['বীজগণিত', 'বীজগাণিতিক', 'সূচক', 'করণী', 'সমীকরণ', 'প্রগতি', 'algebra', 'equation', 'progression'],
  'quant/mensuration': ['পরিমিতি', 'ক্ষেত্রফল', 'আয়তঘন', 'ঘনক', 'চৌপল', 'বেলন', 'শঙ্কু', 'গোলক', 'বৃত্তাকার', 'বৃত্ত', 'mensuration', 'cylinder', 'sphere', 'cone'],
  'quant/partnership': ['অংশীদারি', 'অংশীদারী', 'partnership'],
  'quant/ages': ['বয়স', 'ages'],
};
// Titles that are chapters but not syllabus chapters here: they stay "Other", with their own name.
// (not plain 'কোণ': it is inside 'সমকোণী চৌপল', a mensuration chapter; 'কোণমিতি' also catches
// the OCR misreading 'ব্রিকোণমিতি'.)
const NOT_SYLLABUS = ['উপপাদ্য', 'স্পর্শক', 'জ্যামিতি', 'কোণমিতি', 'কোণের ধারণা', 'পূরক কোণ', 'স্থানাঙ্ক', 'স্তম্ভলেখ', 'পাইচিত্র', 'আয়তলেখ', 'রেখাচিত্র', 'ঘড়ি', 'ক্যালেন্ডার', 'mock test', 'geometry', 'trigonometry'];

const SUBJECT_WORDS = {
  quant: ['math', 'mathematics', 'গণিত', 'অঙ্ক', 'arithmetic', 'quant'],
  english: ['english', 'grammar', 'ইংরেজি', 'sarkar'],
  gs: ['gk', 'general knowledge', 'current affairs', 'current_affairs', 'সাধারণ জ্ঞান', 'history', 'geography', 'polity'],
  reasoning: ['reasoning', 'রিজনিং'],
};

const MIN_SCORE = 5; // below this a page says nothing about its chapter
const MARGIN = 1.3; // best must beat the runner-up by 30%
const SMOOTH = 3; // pages each side used to smooth labels
const MIN_RUN = 3; // shorter runs merge into a neighbour

// NFC: য় / ড় / ঢ় can be stored as one code point or two; both sides must match.
const norm = (s) => String(s || '').normalize('NFC').toLowerCase().replace(/[‌‍]/g, '').replace(/ঘন্টা/g, 'ঘণ্টা').replace(/\s+/g, ' ');
for (const words of Object.values(K)) for (const w of words) w[0] = norm(w[0]);
const TITLE_LIST = Object.entries(TITLES).flatMap(([key, ws]) => ws.map((w) => ({ key, w: norm(w) }))).sort((a, b) => b.w.length - a.w.length);
const NOT_SYLLABUS_N = NOT_SYLLABUS.map(norm);
const bnToAscii = (s) => String(s).replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d));

/** The syllabus chapter a chapter title names, or null ("বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য" -> null). */
function titleKey(title, subject = null) {
  const t = norm(title);
  if (NOT_SYLLABUS_N.some((w) => t.includes(w))) return null;
  const hit = TITLE_LIST.find((x) => (!subject || subjectOfKey(x.key) === subject) && t.includes(x.w));
  return hit ? hit.key : null;
}

/**
 * Chapter entries from a book's contents pages (OCR text of the first pages):
 * "36. বৃত্ত 544-561" -> { name: 'বৃত্ত', start: 544, end: 561 }. Only entries with a page range;
 * ranges that contain other entries (part headings) are dropped; the rest sorted by start page.
 */
/**
 * A contents-page title without OCR junk at its ends: "BAS সংখ্যার গুণ" -> "সংখ্যার গুণ",
 * "Sq ([¢)\).@) > TRICKY METHOD for QUICK SOLUTION" -> "TRICKY METHOD for QUICK SOLUTION".
 * Junk = a token with no Bengali that is short (< 5 letters) or has symbols in it.
 */
function cleanTitle(name) {
  // In a Bengali title, short Latin fragments are OCR junk; in an English title ("Profit and
  // Loss") short words are real, so only tokens with symbols go.
  const bengali = /[ঀ-৿]/.test(name);
  const symbols = (t) => /[^A-Za-z]/.test(t.replace(/[,.:;]$/, ''));
  const junk = (t) => !/[ঀ-৿]/.test(t) && (symbols(t) || (bengali && t.replace(/[^A-Za-z]/g, '').length < 5));
  const tokens = name.split(/\s+/).filter(Boolean);
  while (tokens.length && junk(tokens[0])) tokens.shift();
  while (tokens.length && junk(tokens[tokens.length - 1])) tokens.pop();
  return tokens.join(' ');
}

function parseToc(texts) {
  const out = [];
  const re = /(?:^|\s)(?:\d{1,3}\s*[.)]\s*)?([^\d|_]{2,70}?)\s+(\d{1,4})\s*[-–—]\s*(\d{1,4})(?=\s|$)/g;
  const trim = /^[\s.,:;'"‘’“”\-–—]+|[\s.,:;'"‘’“”\-–—]+$/g;
  for (const raw of texts) {
    const text = bnToAscii(String(raw || '').normalize('NFC')).replace(/\s+/g, ' ');
    // Only pages that look like a contents page (several "title start-end" entries); a question
    // page with one "4-11" in it is not.
    if ([...text.matchAll(re)].length < 4) continue;
    for (const m of text.matchAll(re)) {
      const name = cleanTitle(m[1].replace(trim, '').replace(/^\d+\s*[.)]\s*/, '').trim());
      const start = Number(m[2]);
      const end = Number(m[3]);
      if (!(start >= 1 && end >= start && end - start < 250 && end < 3000)) continue;
      if ((name.match(/[ঀ-৿a-zA-Z]/g) || []).length < 3) continue;
      out.push({ name: name.slice(0, 60), start, end });
    }
  }
  const leaves = out.filter((e) => !out.some((o) => o !== e && o.start >= e.start && o.end <= e.end && (o.start !== e.start || o.end !== e.end)));
  const seen = new Set();
  return leaves.sort((a, b) => a.start - b.start).filter((e) => !seen.has(e.start) && seen.add(e.start));
}

/**
 * The shift between the book's printed page numbers and PDF pages: the k for which contents
 * entries (start+k..end+k) agree best with what the pages themselves are about.
 * labels[i] = chapter key of PDF page i+1 (or null). Returns { k, score, matched } or null.
 */
function alignToc(entries, labels, subject = null) {
  const keyed = entries.map((e) => ({ ...e, key: titleKey(e.name, subject) })).filter((e) => e.key);
  if (keyed.length < 2) return null;
  let best = null;
  for (let k = -60; k <= 120; k += 1) {
    let score = 0;
    let span = 0;
    for (const e of keyed) {
      for (let p = e.start + k; p <= e.end + k; p += 1) {
        if (p < 1 || p > labels.length) continue;
        span += 1;
        if (labels[p - 1] === e.key) score += 1;
      }
    }
    if (!best || score > best.score) best = { k, score, span };
  }
  // Trust it only when a real share of the pages agree.
  return best && best.score >= 20 && best.score >= best.span * 0.3 ? { k: best.k, score: best.score, matched: Math.round((best.score / best.span) * 100) / 100 } : null;
}

/**
 * How readable OCR text is (0-1). For Bengali books: the share of letter tokens that are Bengali
 * words (handwriting comes out as runs of Latin junk: "A Aa ATA ROY CORTE"). For English: the
 * share of normal lowercase or Capitalised words.
 */
function textQuality(text, lang = 'ben+eng') {
  const tokens = String(text || '').normalize('NFC').split(/[^ঀ-৿A-Za-z]+/).filter((t) => t.length >= 2);
  if (tokens.length < 15) return null; // too little text to judge
  if (lang.includes('ben')) {
    const bn = tokens.filter((t) => /^[ঀ-৿]+$/.test(t)).length;
    return Math.round((bn / tokens.length) * 100) / 100;
  }
  const good = tokens.filter((t) => /^[a-z]{3,}$/.test(t) || /^[A-Z][a-z]{2,}$/.test(t)).length;
  return Math.round((good / tokens.length) * 100) / 100;
}
const subjectOfKey = (key) => key.split('/')[0];

function countHits(text, word) {
  let n = 0;
  let i = text.indexOf(word);
  while (i !== -1 && n < 20) {
    n += 1;
    i = text.indexOf(word, i + word.length);
  }
  return n;
}

/** Keyword score of one page for every chapter (optionally one subject), best first. Hits are capped so one repeated word cannot dominate. */
function scorePage(text, subject = null) {
  const t = norm(text);
  if (t.length < 40) return [];
  const out = [];
  for (const [key, words] of Object.entries(K)) {
    if (subject && subjectOfKey(key) !== subject) continue;
    let score = 0;
    for (const [w, weight] of words) score += Math.min(countHits(t, w), 6) * weight;
    if (score > 0) out.push({ key, score });
  }
  return out.sort((a, b) => b.score - a.score);
}

/** The single chapter a page clearly belongs to, or null (too little text, or two chapters close). */
function pageLabel(scores) {
  const [a, b] = scores;
  if (!a || a.score < MIN_SCORE) return null;
  if (b && a.score < b.score * MARGIN) return null;
  return a.key;
}

/** Chapters named in a file name ("নল_ও_চৌবাচ্চা_…" -> pipes_cistern), in the order they appear. */
function topicsInName(fileName) {
  const t = norm(String(fileName).replace(/\.pdf$/i, '').replace(/[_-]+/g, ' '));
  const found = [];
  for (const [key, words] of Object.entries(K)) {
    const extra = (NAME_WORDS[key] || []).map((w) => norm(w.replace(/[_-]+/g, ' ')));
    const strong = words.filter(([, w]) => w >= 3).map(([w]) => w);
    const at = [...strong, ...extra].map((w) => t.indexOf(w)).filter((i) => i >= 0);
    if (at.length) found.push({ key, at: Math.min(...at) });
  }
  return found.sort((a, b) => a.at - b.at).map((f) => f.key);
}

/** Subject from the file name, else from the chapters its pages matched most. */
function subjectOf(fileName, pageKeys = []) {
  const t = norm(String(fileName).replace(/[_-]+/g, ' '));
  for (const [s, words] of Object.entries(SUBJECT_WORDS)) if (words.some((w) => t.includes(norm(w)))) return s;
  const named = topicsInName(fileName);
  if (named.length) return subjectOfKey(named[0]);
  const votes = {};
  for (const k of pageKeys) if (k) votes[subjectOfKey(k)] = (votes[subjectOfKey(k)] || 0) + 1;
  const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] >= 3 ? best[0] : null;
}

/** Majority label in a window around each page (raw labels; nulls do not vote). */
function smooth(labels) {
  return labels.map((_, i) => {
    const votes = {};
    for (let j = Math.max(0, i - SMOOTH); j <= Math.min(labels.length - 1, i + SMOOTH); j += 1) {
      if (labels[j]) votes[labels[j]] = (votes[labels[j]] || 0) + (j === i ? 1.5 : 1);
    }
    const best = Object.entries(votes).sort((a, b) => b[1] - a[1])[0];
    return best && best[1] >= 2 ? best[0] : null;
  });
}

function runsOf(labels, firstPage) {
  const runs = [];
  labels.forEach((key, i) => {
    const last = runs[runs.length - 1];
    if (last && last.key === key) last.to = firstPage + i;
    else runs.push({ key, from: firstPage + i, to: firstPage + i });
  });
  return runs;
}

const len = (r) => r.to - r.from + 1;

/** Merge runs shorter than MIN_RUN into a neighbour; a gap between two runs of the same chapter joins them. */
function mergeShort(runs) {
  let changed = true;
  let out = runs.slice();
  while (changed && out.length > 1) {
    changed = false;
    for (let i = 0; i < out.length; i += 1) {
      const r = out[i];
      const prev = out[i - 1];
      const next = out[i + 1];
      if (prev && next && prev.key && prev.key === next.key && (len(r) < MIN_RUN || !r.key)) {
        out.splice(i - 1, 3, { key: prev.key, from: prev.from, to: next.to });
        changed = true;
        break;
      }
      if (len(r) < MIN_RUN) {
        const into = !prev ? next : !next ? prev : (len(prev) >= len(next) ? prev : next);
        if (into === prev) prev.to = r.to;
        else next.from = r.from;
        out.splice(i, 1);
        changed = true;
        break;
      }
    }
    // Neighbours that ended up with the same chapter become one run.
    for (let i = 1; i < out.length; i += 1) {
      if (out[i].key === out[i - 1].key) {
        out[i - 1].to = out[i].to;
        out.splice(i, 1);
        changed = true;
        break;
      }
    }
  }
  return out;
}

/** Runs of the page-by-page labels for pages from..to (1-based, inclusive), as sections. */
function runSections(raw, first, from, to) {
  if (to < from) return [];
  const slice = raw.slice(from - first, to - first + 1);
  return mergeShort(runsOf(smooth(slice), from)).map((r) => {
    const inRun = raw.slice(r.from - first, r.to - first + 1);
    const hit = inRun.filter((k) => k === r.key).length;
    return { key: r.key, from: r.from, to: r.to, confidence: r.key ? Math.round((hit / inRun.length) * 100) / 100 : 0, source: 'auto' };
  });
}

/**
 * Sections from an aligned contents page: each entry covers its pages (shifted by k) up to the
 * next entry; consecutive entries of one syllabus chapter merge ("ট্রেন", "নৌকা" -> Time, Speed &
 * Distance); a non-syllabus entry stays "Other" with the book's own title. Pages before the
 * first and after the last entry are split page by page.
 */
function tocSections(entries, align, raw, first, last, subject) {
  const placed = entries
    .map((e) => ({ name: e.name, key: titleKey(e.name, subject), from: e.start + align.k, to: e.end + align.k }))
    .filter((e) => e.to >= first && e.from <= last)
    .map((e) => ({ ...e, from: Math.max(first, e.from), to: Math.min(last, e.to) }));
  if (!placed.length) return null;
  // Close small gaps (exercise or answer pages between entries); overlaps end at the next entry.
  for (let i = 0; i < placed.length - 1; i += 1) {
    const next = placed[i + 1];
    if (next.from - placed[i].to <= 4 || placed[i].to >= next.from) placed[i].to = next.from - 1;
  }
  const merged = [];
  for (const e of placed.filter((x) => x.to >= x.from)) {
    const prev = merged[merged.length - 1];
    if (prev && e.key && prev.key === e.key && e.from - prev.to <= 5) prev.to = e.to;
    else merged.push({ ...e });
  }
  const out = [...runSections(raw, first, first, merged[0].from - 1)];
  merged.forEach((e, i) => {
    const inRun = raw.slice(e.from - first, e.to - first + 1);
    const hit = e.key ? inRun.filter((k) => k === e.key).length : 0;
    out.push({ key: e.key, label: e.key ? null : e.name, from: e.from, to: e.to, confidence: e.key ? Math.round((hit / inRun.length) * 100) / 100 : 0, source: 'toc' });
    const gapTo = (merged[i + 1]?.from ?? last + 1) - 1;
    if (gapTo > e.to) out.push(...runSections(raw, first, e.to + 1, gapTo));
  });
  return out;
}

/**
 * Sections for a file. pages: [{ page, text }] in order.
 * 1. A readable contents page that lines up with the pages: chapters exactly as the book has them.
 * 2. Otherwise page-by-page labels, smoothed into runs.
 * When too few pages have readable text (handwritten notes, no OCR), the chapters named in the
 * file name cover the whole file (source "filename"); the student can split it.
 */
function buildSections(pages, { fileName = '', subject = null } = {}) {
  if (!pages.length) return [];
  const first = pages[0].page;
  const lastPage = pages[pages.length - 1].page;
  const named = topicsInName(fileName);
  const readable = pages.filter((p) => norm(p.text).length >= 200).length;
  const raw = pages.map((p) => pageLabel(scorePage(p.text, subject)));
  const labelled = raw.filter(Boolean).length;

  // Little readable text or almost no page says anything: trust the file name.
  if (readable < pages.length * 0.3 || labelled < Math.max(2, pages.length * 0.1)) {
    if (named.length) return [{ key: named[0], from: first, to: lastPage, confidence: 0, source: 'filename', alsoNamed: named.slice(1) }];
    return [{ key: null, from: first, to: lastPage, confidence: 0, source: 'auto' }];
  }

  // A file named after one chapter is that chapter, whatever single pages say.
  if (named.length === 1 && pages.length <= 120) {
    const hit = raw.filter((k) => k === named[0]).length;
    return [{ key: named[0], from: first, to: lastPage, confidence: Math.round((hit / pages.length) * 100) / 100, source: 'filename' }];
  }

  // Books: the contents page, when it can be read and lines up with the pages.
  if (pages.length >= 60) {
    const toc = parseToc(pages.slice(0, 25).map((p) => p.text));
    const align = toc.length >= 3 ? alignToc(toc, raw, subject) : null;
    const fromToc = align && tocSections(toc, align, raw, first, lastPage, subject);
    if (fromToc?.length) return fromToc;
  }
  return runSections(raw, first, first, lastPage);
}

module.exports = { scorePage, pageLabel, topicsInName, subjectOf, buildSections, smooth, mergeShort, titleKey, parseToc, alignToc, textQuality, KEYWORDS: K, MIN_SCORE };
