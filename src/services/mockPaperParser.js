'use strict';

/**
 * Pure parser for pasted mock-paper text (contract §3). No DB imports.
 *
 * parsePaperText(text) -> { questions, unparsed }
 *   questions: [{ n, stemEn, stemBn, options, correctIndex,
 *                explanationEn, explanationBn, warnings }]
 *   unparsed:  [{ text }]
 *
 * Two points where the contract text, read literally, would break its own
 * test cases, resolved with the most reasonable interpretation (reported
 * to the coordinator):
 *  1. The answer-key header regex also matches a per-question
 *     "Answer: B" line. A line is therefore treated as the key section
 *     only when the text after its colon/dash already holds a key pair,
 *     or the line is a bare header ("Answers:") whose following lines
 *     hold key pairs. Per-question answer lines keep working.
 *  2. "A non-matching line after options began appends to the last
 *     option" would swallow an explanation's continuation lines and a
 *     wrapped stem line that follows an inline-options line. Lines in
 *     the explanation phase append to the explanation instead, and a
 *     wrapped line is recognised only while the block is in the options
 *     phase (i.e. before any answer/explanation line).
 */

const BENGALI_RE = /[\u0980-\u09FF]/;
const FIGURE_RE = /figure|diagram|table|graph|picture|চিত্র|ছবি/i;

// Step 1: answer-key section header.
const KEY_HEADER_RE = /^\s*(answers?|answer\s*key|উত্তর(মালা|পত্র)?)\s*[:\-]/i;
// Step 1: key pairs (an optional leading Q is stripped first).
const KEY_PAIR_RE = /(\d+)\s*[.\)\:\-–]\s*\(?([A-Ea-e])\)?/g;
// Step 2: question starts. Group 1 is present for Q-prefixed numbers.
// The Q form also allows "Q.1" (dot before the number, no dot after it):
// with a Q prefix the separator after the digits may be a bare space,
// but a plain number still needs "." or ")" after it.
const START_RE = /^\s*(?:(Q)\s*\.?\s*(\d+)(?:\s*[.\)]\s+|\s+)|(\d+)\s*[.\)]\s+)\S/i;
const START_PREFIX_RE = /^\s*(?:Q\s*\.?\s*\d+(?:\s*[.\)]\s+|\s+)|\d+\s*[.\)]\s+)/i;
// Step 4: an option label at the start of a line (contract's label regex,
// widened to F/6 so a sixth option is countable: with A-E/1-5 only, a
// 6-option block could never reach the 6+ -> unparsed rule in §3 step 4.
// Answers still only name A-E (see ANSWER_RE / KEY_PAIR_RE), and a
// 6-option block is unparsed before any answer is resolved.
const OPTION_LINE_RE = /^\s*\(?([A-Fa-f1-6])\)?[.\)\:\-]\s+(.+)$/;
// Step 5: per-question answer line.
const ANSWER_RE = /^\s*(answer|ans|উত্তর)\s*[:\-]\s*\(?([A-Ea-e])\)?/i;
// Step 6: explanation line.
const EXPLANATION_RE = /^\s*(explanation|ব্যাখ্যা)\s*[:\-]/i;
const EXPLANATION_PREFIX_RE = /^\s*(explanation|ব্যাখ্যা)\s*[:\-]\s*/i;
// A label token anywhere in a line (for inline-options detection).
const LABEL_TOKEN_RE = /\(?([A-Fa-f1-6])\)?[.\)\:\-]\s+/g;

const WARNINGS = Object.freeze(['option_count', 'duplicate_stem', 'figure_reference', 'answer_out_of_range']);

function hasBengali(text) {
  return BENGALI_RE.test(text);
}

/** Split lines into EN/BN buckets by Bengali-script presence, space-joined; empty bucket -> null. */
function classifyLines(lines) {
  const en = [];
  const bn = [];
  for (const line of lines) {
    const text = line.trim();
    if (!text) continue;
    (hasBengali(text) ? bn : en).push(text);
  }
  return { en: en.length ? en.join(' ') : null, bn: bn.length ? bn.join(' ') : null };
}

function normaliseStem(question) {
  return `${question.stemEn || ''} ${question.stemBn || ''}`
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?,;:।]+$/, '')
    .trim();
}

/** A label's letter equivalent: letter labels as-is (uppercased), numeric labels 1->A ... 6->F. */
function labelLetter(label) {
  if (/[1-6]/.test(label)) return String.fromCharCode(64 + Number(label));
  return label.toUpperCase();
}

/**
 * Find option-label tokens in a line. A token whose letter/digit is glued
 * to a preceding word character (e.g. the "A" in "xA. ") is not a label.
 */
function findLabels(line) {
  const found = [];
  LABEL_TOKEN_RE.lastIndex = 0;
  let m;
  while ((m = LABEL_TOKEN_RE.exec(line)) !== null) {
    const start = m.index;
    const glued = start > 0 && /[A-Za-z0-9]/.test(line[start - 1]) && line[start] !== '(';
    if (!glued) found.push({ label: m[1], start, end: start + m[0].length });
  }
  return found;
}

/** Split the answer-key section off the body. Returns { bodyLines, keyMap }. */
function splitKeySection(lines) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const header = KEY_HEADER_RE.exec(line);
    if (!header) continue;
    const rest = line.slice(header.index + header[0].length);
    const keyText = lines.slice(i).join('\n').replace(/\bQ(?=\d)/gi, '');
    const restHasPair = KEY_PAIR_RE.test(rest.replace(/\bQ(?=\d)/gi, ''));
    KEY_PAIR_RE.lastIndex = 0;
    const restBlank = rest.trim() === '';
    KEY_PAIR_RE.lastIndex = 0;
    const keyHasPair = KEY_PAIR_RE.test(keyText);
    KEY_PAIR_RE.lastIndex = 0;
    if (!restHasPair && !(restBlank && keyHasPair)) continue;

    const keyMap = new Map();
    KEY_PAIR_RE.lastIndex = 0;
    let pair;
    while ((pair = KEY_PAIR_RE.exec(keyText)) !== null) {
      const n = Number(pair[1]);
      if (!keyMap.has(n)) keyMap.set(n, pair[2].toUpperCase().charCodeAt(0) - 65);
    }
    return { bodyLines: lines.slice(0, i), keyMap };
  }
  return { bodyLines: lines, keyMap: new Map() };
}

/**
 * Split the body into a preamble (lines before the first question) and raw
 * question blocks. The sequential-number rule alone would split a paper
 * whose options are numbered ("2. Kolkata" is both option 2 and the next
 * question number), so a plain-numbered line is NOT a new question while
 * the current block is still collecting consecutive numeric options: a
 * numeric label equal to the last numeric option label + 1, before any
 * answer/explanation line, continues the block. An answer or explanation
 * line re-arms the sequential rule, as does a numeric label that does not
 * continue the option run (e.g. "2. ..." after options 1-4).
 */
function splitBlocks(lines) {
  const preamble = [];
  const blocks = [];
  let current = null;
  let prevN = null;
  let expected = 1;
  let blockState = null;

  const trackLine = (line) => {
    if (!blockState) return;
    if (ANSWER_RE.test(line) || EXPLANATION_RE.test(line)) {
      blockState.sawAnswerOrExpl = true;
      return;
    }
    const labels = findLabels(line);
    if (labels.length >= 2) {
      for (const { label } of labels) {
        if (/[1-6]/.test(label)) { blockState.hasNumeric = true; blockState.lastNumeric = Number(label); }
        else blockState.hasLetter = true;
      }
      return;
    }
    const option = OPTION_LINE_RE.exec(line);
    if (option) {
      if (/[1-6]/.test(option[1])) { blockState.hasNumeric = true; blockState.lastNumeric = Number(option[1]); }
      else blockState.hasLetter = true;
    }
  };

  for (const line of lines) {
    const start = START_RE.exec(line);
    let isStart = false;
    let n = null;
    if (start) {
      n = Number(start[2] ?? start[3]);
      if (start[1]) {
        // Q-prefixed numbers always start a new question when greater than the previous.
        isStart = prevN === null || n > prevN;
      } else if (n === expected) {
        isStart = true;
        // Numeric option run: "2. Kolkata" after option "1. Delhi".
        if (current && blockState && !blockState.sawAnswerOrExpl && blockState.hasNumeric && !blockState.hasLetter) {
          const option = OPTION_LINE_RE.exec(line);
          if (option && /[1-6]/.test(option[1]) && Number(option[1]) === blockState.lastNumeric + 1) {
            isStart = false;
          }
        }
      }
    }
    if (isStart) {
      if (current) blocks.push(current);
      const rest = line.replace(START_PREFIX_RE, '');
      current = { n, lines: rest ? [rest] : [], raw: [line] };
      prevN = n;
      expected = n + 1;
      blockState = { hasNumeric: false, hasLetter: false, lastNumeric: null, sawAnswerOrExpl: false };
      if (rest) trackLine(rest);
      continue;
    }
    if (current) {
      current.lines.push(line);
      current.raw.push(line);
      trackLine(line);
    } else if (line.trim()) {
      preamble.push(line);
    }
  }
  if (current) blocks.push(current);
  return { preamble, blocks };
}

/** Parse one raw question block into a question, or null when it belongs in `unparsed`. */
function parseBlock(block, keyMap) {
  const stemLines = [];
  const explanationLines = [];
  const options = []; // [{ label, text }]
  let answerLetter = null;
  let phase = 'stem'; // 'stem' | 'options' | 'explanation'

  const addOption = (label, text) => {
    options.push({ label, text: text.trim() });
  };

  for (const rawLine of block.lines) {
    const line = rawLine;
    if (!line.trim()) continue;

    // Answer line (first one wins).
    const answer = ANSWER_RE.exec(line);
    if (answer) {
      if (answerLetter === null) answerLetter = answer[2].toUpperCase();
      phase = 'answer';
      continue;
    }

    // Explanation line (and its continuations, until the next option/answer/question line).
    if (EXPLANATION_RE.test(line)) {
      phase = 'explanation';
      const text = line.replace(EXPLANATION_PREFIX_RE, '').trim();
      if (text) explanationLines.push(text);
      continue;
    }

    // Inline options: a line with 2+ option labels splits on the labels.
    const labels = findLabels(line);
    if (labels.length >= 2) {
      const prefix = line.slice(0, labels[0].start).trim();
      if (prefix) {
        if (phase === 'stem') stemLines.push(prefix);
        else if (phase === 'options' && options.length) options[options.length - 1].text += ` ${prefix}`;
        else if (phase === 'explanation') explanationLines.push(prefix);
        else if (options.length) options[options.length - 1].text += ` ${prefix}`;
      }
      for (let i = 0; i < labels.length; i++) {
        const end = i + 1 < labels.length ? labels[i + 1].start : line.length;
        addOption(labels[i].label, line.slice(labels[i].end, end));
      }
      phase = 'options';
      continue;
    }

    // Own-line option.
    const option = OPTION_LINE_RE.exec(line);
    if (option) {
      addOption(option[1], option[2]);
      phase = 'options';
      continue;
    }

    // Non-matching line: stem, wrapped option, or explanation continuation.
    if (phase === 'stem') stemLines.push(line.trim());
    else if (phase === 'explanation') explanationLines.push(line.trim());
    else if (options.length) options[options.length - 1].text += ` ${line.trim()}`;
    else stemLines.push(line.trim());
  }

  const stem = classifyLines(stemLines);
  const explanation = classifyLines(explanationLines);
  const optionTexts = options.map((o) => o.text).filter((t) => t.length > 0);

  // A parsed question with an empty stem or zero options goes to unparsed.
  if ((!stem.en && !stem.bn) || optionTexts.length === 0) return null;
  // Option count 2-5 -> question; exactly 1 or 6+ -> the whole block is unparsed.
  if (optionTexts.length === 1 || optionTexts.length >= 6) return null;

  const warnings = [];
  if (optionTexts.length !== 4) warnings.push('option_count');

  let correctIndex = null;
  if (answerLetter !== null) {
    const at = options.findIndex((o) => labelLetter(o.label) === answerLetter);
    if (at !== -1) correctIndex = at;
    else warnings.push('answer_out_of_range');
  } else if (keyMap.has(block.n)) {
    // The key map fills correctIndex only when the inline answer is absent.
    const keyIdx = keyMap.get(block.n);
    const letter = String.fromCharCode(65 + keyIdx);
    const at = options.findIndex((o) => labelLetter(o.label) === letter);
    if (at !== -1) correctIndex = at;
    else if (keyIdx >= optionTexts.length) warnings.push('answer_out_of_range');
    else correctIndex = keyIdx;
  }

  const stemText = `${stem.en || ''} ${stem.bn || ''}`;
  if (FIGURE_RE.test(stemText) || optionTexts.some((t) => FIGURE_RE.test(t))) {
    warnings.push('figure_reference');
  }

  return {
    n: block.n,
    stemEn: stem.en,
    stemBn: stem.bn,
    options: optionTexts,
    correctIndex,
    explanationEn: explanation.en,
    explanationBn: explanation.bn,
    warnings,
  };
}

function parsePaperText(text) {
  if (typeof text !== 'string' || !text.trim()) return { questions: [], unparsed: [] };

  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const { bodyLines, keyMap } = splitKeySection(lines);
  const { preamble, blocks } = splitBlocks(bodyLines);

  const questions = [];
  const unparsed = [];

  if (preamble.length) {
    unparsed.push({ text: preamble.join('\n').trim() });
  }

  for (const block of blocks) {
    const parsed = parseBlock(block, keyMap);
    if (parsed) questions.push(parsed);
    else unparsed.push({ text: block.raw.join('\n').trim() });
  }

  // Non-empty input with zero parsed questions -> the whole trimmed input as one block.
  if (questions.length === 0) {
    return { questions: [], unparsed: [{ text: text.trim() }] };
  }

  // Duplicate stems (warning only, never a block).
  const seen = new Map();
  for (const q of questions) {
    const key = normaliseStem(q);
    if (!key) continue;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(q);
  }
  for (const group of seen.values()) {
    if (group.length > 1) {
      for (const q of group) {
        if (!q.warnings.includes('duplicate_stem')) q.warnings.push('duplicate_stem');
      }
    }
  }

  return { questions, unparsed };
}

module.exports = { parsePaperText, WARNINGS };
