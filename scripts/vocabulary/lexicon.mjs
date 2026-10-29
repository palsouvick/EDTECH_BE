/**
 * Offline lexical checks for the Vocabulary Bank, using two development-only datasets:
 *
 *  - Princeton WordNet 3.1 (npm `wordnet-db`): does the word exist with this part of
 *    speech; is each synonym in the same synset or a directly linked one; is each
 *    antonym a WordNet antonym (direct, or indirect through similar-to / hypernym links).
 *  - CMU Pronouncing Dictionary (npm `cmu-pronouncing-dictionary`): US-English
 *    pronunciations, converted from ARPAbet to IPA.
 *
 * Neither dataset ships to students: the results are written to
 * db/vocabulary/lexicon-checks.json by ./checkLexicon.mjs. Licences: db/vocabulary/ATTRIBUTION.md.
 *
 * WordNet links show that two words *can* share a meaning, not that they are
 * interchangeable in every sentence; the app treats them that way.
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const FILE_BY_POS = { NOUN: ['noun'], VERB: ['verb'], ADJECTIVE: ['adj'], ADVERB: ['adv'], PHRASE: ['verb', 'noun', 'adj', 'adv'] };
const FILE_BY_CHAR = { n: 'noun', v: 'verb', a: 'adj', s: 'adj', r: 'adv' };
// Pointers that join closely related senses: similar to, also see, verb group, hypernym, hyponym.
const NEAR_POINTERS = new Set(['&', '^', '$', '@', '~']);

export const key = (word) => word.normalize('NFKC').trim().toLowerCase().replace(/\s+/g, '_');

export function loadWordNet() {
  const { path: dir, version } = require('wordnet-db');
  const index = {};
  for (const file of ['noun', 'verb', 'adj', 'adv']) {
    const lemmas = new Map();
    for (const line of fs.readFileSync(path.join(dir, `index.${file}`), 'utf8').split('\n')) {
      if (!line || line.startsWith(' ')) continue;
      const t = line.trim().split(' ');
      const synsets = Number(t[2]);
      const pointers = Number(t[3]);
      lemmas.set(t[0], t.slice(6 + pointers, 6 + pointers + synsets));
    }
    index[file] = lemmas;
  }
  // Corpus frequency: tagged occurrences of the lemma in SemCor (index.sense, field 4).
  const frequency = new Map();
  for (const line of fs.readFileSync(path.join(dir, 'index.sense'), 'utf8').split('\n')) {
    if (!line) continue;
    const t = line.split(' ');
    const lemma = t[0].split('%')[0];
    frequency.set(lemma, (frequency.get(lemma) || 0) + (Number(t[3]) || 0));
  }
  const fds = {};
  const cache = new Map();
  function synset(file, offset) {
    const k = `${file}:${offset}`;
    if (cache.has(k)) return cache.get(k);
    fds[file] ??= fs.openSync(path.join(dir, `data.${file}`), 'r');
    const buffer = Buffer.alloc(65536);
    const n = fs.readSync(fds[file], buffer, 0, buffer.length, Number(offset));
    const head = buffer.toString('utf8', 0, n).split('\n')[0].split(' | ')[0];
    const t = head.split(' ');
    const count = parseInt(t[3], 16);
    const words = [];
    let i = 4;
    for (let w = 0; w < count; w++, i += 2) words.push(t[i].replace(/\(.*\)$/, '').toLowerCase());
    const pointerCount = Number(t[i++]);
    const pointers = [];
    for (let p = 0; p < pointerCount; p++, i += 4) pointers.push({ symbol: t[i], offset: t[i + 1], file: FILE_BY_CHAR[t[i + 2]] });
    const s = { file, offset, words, pointers };
    cache.set(k, s);
    return s;
  }
  const lookup = (word, files) => files.flatMap((file) => (index[file].get(key(word)) || []).map((o) => synset(file, o)));
  const exists = (word) => ['noun', 'verb', 'adj', 'adv'].some((file) => index[file].has(key(word)));
  const posesOf = (word) => ['noun', 'verb', 'adj', 'adv'].filter((file) => index[file].has(key(word)));
  const follow = (synsets, symbols) => synsets.flatMap((s) => s.pointers.filter((p) => symbols.has(p.symbol)).map((p) => synset(p.file, p.offset)));
  return { version, lookup, exists, posesOf, follow, frequency: (word) => frequency.get(key(word)) || 0 };
}

/** One entry's WordNet results. Codes: SAME_SYNSET, RELATED, NOT_LINKED, NOT_IN_WORDNET (synonyms); DIRECT, INDIRECT, ... (antonyms). */
export function checkEntry(wn, entry) {
  const files = FILE_BY_POS[entry.partOfSpeech] || [];
  const senses = wn.lookup(entry.word, files);
  const near = [...senses, ...wn.follow(senses, NEAR_POINTERS)];
  // Two hops of similar-to reach the other satellites of an adjective cluster.
  const cluster = [...near, ...wn.follow(near, new Set(['&']))];
  const has = (synsets, word) => synsets.some((s) => s.words.includes(key(word)));

  const synonymCode = (word) => {
    if (has(senses, word)) return 'SAME_SYNSET';
    if (has(cluster, word)) return 'RELATED';
    return wn.exists(word) ? 'NOT_LINKED' : 'NOT_IN_WORDNET';
  };
  const antonyms = wn.follow(senses, new Set(['!']));
  const indirectBase = wn.follow(cluster, new Set(['!']));
  const indirect = [...indirectBase, ...wn.follow(indirectBase, new Set(['&', '$']))];
  const antonymCode = (word) => {
    if (has(antonyms, word)) return 'DIRECT';
    if (has(indirect, word)) return 'INDIRECT';
    return wn.exists(word) ? 'NOT_LINKED' : 'NOT_IN_WORDNET';
  };
  const relations = (list, code) => Object.fromEntries((list || []).map((w) => [w.toLowerCase(), code(w)]));
  return {
    found: wn.exists(entry.word),
    poses: wn.posesOf(entry.word),
    posMatch: senses.length > 0,
    frequency: wn.frequency(entry.word),
    synonyms: relations(entry.synonyms, synonymCode),
    nearSynonyms: relations(entry.nearSynonyms, synonymCode),
    antonyms: relations(entry.antonyms, antonymCode),
  };
}

// ------------------------------------------------------------------ pronunciation

const VOWELS = {
  AA: 'ɑ', AE: 'æ', AH: 'ʌ', AO: 'ɔ', AW: 'aʊ', AY: 'aɪ', EH: 'ɛ', ER: 'ɜr', EY: 'eɪ',
  IH: 'ɪ', IY: 'i', OW: 'oʊ', OY: 'ɔɪ', UH: 'ʊ', UW: 'u',
};
const CONSONANTS = {
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', F: 'f', G: 'ɡ', HH: 'h', JH: 'dʒ', K: 'k', L: 'l', M: 'm', N: 'n',
  NG: 'ŋ', P: 'p', R: 'r', S: 's', SH: 'ʃ', T: 't', TH: 'θ', V: 'v', W: 'w', Y: 'j', Z: 'z', ZH: 'ʒ',
};
// English syllable onsets (ARPAbet), for placing stress marks by the maximal-onset rule.
const ONSETS = new Set([
  ...Object.keys(CONSONANTS).filter((c) => c !== 'NG'),
  'P R', 'P L', 'B R', 'B L', 'T R', 'D R', 'K R', 'K L', 'G R', 'G L', 'F R', 'F L', 'TH R', 'SH R',
  'S P', 'S T', 'S K', 'S M', 'S N', 'S L', 'S W', 'S F', 'K W', 'T W', 'D W', 'G W', 'TH W',
  'S P R', 'S P L', 'S T R', 'S K R', 'S K W',
  'P Y', 'B Y', 'F Y', 'M Y', 'K Y', 'V Y', 'HH Y', 'S K Y', 'S P Y',
]);

/** ARPAbet ("AH0 B AH1 N D AH0 N T") to IPA ("əˈbʌndənt"). */
export function arpabetToIpa(arpabet) {
  const phones = arpabet.trim().split(/\s+/).map((p) => {
    const m = /^([A-Z]+)([012])?$/.exec(p);
    return { base: m[1], stress: m[2] ?? null };
  });
  const isVowel = (p) => p.stress !== null;
  const out = phones.map((p) => {
    if (!isVowel(p)) return CONSONANTS[p.base] ?? '';
    if (p.base === 'AH' && p.stress === '0') return 'ə';
    if (p.base === 'ER' && p.stress === '0') return 'ər';
    return VOWELS[p.base] ?? '';
  });
  // Place ˈ / ˌ before the onset of each stressed syllable.
  const marks = new Array(phones.length).fill('');
  phones.forEach((p, i) => {
    if (!isVowel(p) || (p.stress !== '1' && p.stress !== '2')) return;
    let start = i;
    let j = i - 1;
    while (j >= 0 && !isVowel(phones[j])) j -= 1;
    // phones j+1..i-1 are the consonants between the previous vowel and this one.
    for (let s = j + 1; s < i; s++) {
      if (ONSETS.has(phones.slice(s, i).map((x) => x.base).join(' '))) {
        start = s;
        break;
      }
    }
    if (j < 0) start = 0;
    marks[start] = p.stress === '1' ? 'ˈ' : 'ˌ';
  });
  return out.map((sound, i) => marks[i] + sound).join('');
}

export async function loadCmudict() {
  const { dictionary } = await import('cmu-pronouncing-dictionary');
  return dictionary;
}

/** IPA for a word or phrase, or null when any part is missing from CMUdict (never guessed). */
export function pronounce(dictionary, word) {
  const parts = word.toLowerCase().split(/\s+/);
  const arpabet = parts.map((p) => dictionary[p]);
  if (arpabet.some((a) => !a)) return null;
  return { arpabet: arpabet.join(' | '), ipa: `/${arpabet.map(arpabetToIpa).join(' ')}/` };
}
