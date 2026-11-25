'use strict';

/** Pure parser tests: every case listed in contract §6. */

const test = require('node:test');
const assert = require('node:assert/strict');
const { parsePaperText } = require('../src/services/mockPaperParser');

const PAPER = `1. What is the capital of West Bengal?
(A) Delhi (B) Kolkata (C) Mumbai (D) Chennai
Answer: B

2. What is 2 + 2?
(A) 3 (B) 4 (C) 5 (D) 6
Answer: B`;

test('numbering variants: 1., Q1. and 1)', () => {
  assert.equal(parsePaperText(PAPER).questions.length, 2);

  const qPrefixed = parsePaperText(`Q1. First question?
(A) A (B) B (C) C (D) D
Answer: A
Q2. Second question?
(A) A (B) B (C) C (D) D
Answer: B`);
  assert.deepEqual(qPrefixed.questions.map((q) => q.n), [1, 2]);
  assert.equal(qPrefixed.questions[0].correctIndex, 0);
  assert.equal(qPrefixed.questions[1].correctIndex, 1);

  const qDot = parsePaperText(`Q.1 First question?
(A) A (B) B (C) C (D) D
Answer: A
Q.2 Second question?
(A) A (B) B (C) C (D) D
Answer: B`);
  assert.deepEqual(qDot.questions.map((q) => q.n), [1, 2]);

  const paren = parsePaperText(`1) First question?
(A) A (B) B (C) C (D) D
Answer: A
2) Second question?
(A) A (B) B (C) C (D) D
Answer: B`);
  assert.deepEqual(paren.questions.map((q) => q.n), [1, 2]);
});

test('inline vs own-line options', () => {
  const inline = parsePaperText(PAPER);
  assert.deepEqual(inline.questions[0].options, ['Delhi', 'Kolkata', 'Mumbai', 'Chennai']);

  const ownLine = parsePaperText(`1. What is the capital of West Bengal?
A. Delhi
B. Kolkata
C. Mumbai
D. Chennai
Answer: B`);
  assert.deepEqual(ownLine.questions[0].options, ['Delhi', 'Kolkata', 'Mumbai', 'Chennai']);
  assert.equal(ownLine.questions[0].correctIndex, 1);

  const mixedLabels = parsePaperText(`1. Pick one.
(A) One
B) Two
c. Three
D: Four
Answer: D`);
  assert.deepEqual(mixedLabels.questions[0].options, ['One', 'Two', 'Three', 'Four']);
  assert.equal(mixedLabels.questions[0].correctIndex, 3);
});

test('letter and numeric option labels', () => {
  const numeric = parsePaperText(`1. What is the capital of West Bengal?
1. Delhi
2. Kolkata
3. Mumbai
4. Chennai
Answer: B`);
  assert.equal(numeric.questions.length, 1);
  assert.deepEqual(numeric.questions[0].options, ['Delhi', 'Kolkata', 'Mumbai', 'Chennai']);
  assert.equal(numeric.questions[0].correctIndex, 1, 'answer letter B maps to numeric option 2');

  const numericParen = parsePaperText(`1. Pick one.
(1) One (2) Two (3) Three (4) Four
Answer: C`);
  assert.deepEqual(numericParen.questions[0].options, ['One', 'Two', 'Three', 'Four']);
  assert.equal(numericParen.questions[0].correctIndex, 2);

  const numericTwoQuestions = parsePaperText(`1. First?
1. A1
2. B1
3. C1
4. D1
Answer: A
2. Second?
1. A2
2. B2
3. C2
4. D2
Answer: D`);
  assert.equal(numericTwoQuestions.questions.length, 2);
  assert.deepEqual(numericTwoQuestions.questions[1].options, ['A2', 'B2', 'C2', 'D2']);
  assert.equal(numericTwoQuestions.questions[1].correctIndex, 3);
});

test('per-question answers, including lowercase and parenthesised letters', () => {
  const r = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
Ans: c
2. Second?
(A) A (B) B (C) C (D) D
Answer: (A)`);
  assert.equal(r.questions[0].correctIndex, 2);
  assert.equal(r.questions[1].correctIndex, 0);
});

test('end key list: multi-line and 1-B forms', () => {
  const multiLine = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
2. Second?
(A) A (B) B (C) C (D) D
Answers:
1. B
2. A`);
  assert.deepEqual(multiLine.questions.map((q) => q.correctIndex), [1, 0]);

  const dashForm = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
2. Second?
(A) A (B) B (C) C (D) D
Answer Key: 1-B, 2-A`);
  assert.deepEqual(dashForm.questions.map((q) => q.correctIndex), [1, 0]);

  const qForm = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
2. Second?
(A) A (B) B (C) C (D) D
Answers: Q1: C, Q2: D`);
  assert.deepEqual(qForm.questions.map((q) => q.correctIndex), [2, 3]);
});

test('inline answer wins over the end key list', () => {
  const r = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
Answer: A
2. Second?
(A) A (B) B (C) C (D) D
Answers: 1-D, 2-C`);
  assert.deepEqual(r.questions.map((q) => q.correctIndex), [0, 2]);
});

test('missing answers stay null', () => {
  const r = parsePaperText(PAPER.replace('Answer: B\n\n2.', '2.'));
  // Only the second question keeps its answer; the first has none anywhere.
  const first = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
2. Second?
(A) A (B) B (C) C (D) D
Answer: B`);
  assert.equal(first.questions[0].correctIndex, null);
  assert.equal(first.questions[1].correctIndex, 1);
  assert.equal(r.questions.length, 2);
});

test('answer beyond the option count warns and stays null', () => {
  const r = parsePaperText(`1. First?
(A) A (B) B (C) C
Answer: D`);
  assert.equal(r.questions[0].correctIndex, null);
  assert.ok(r.questions[0].warnings.includes('answer_out_of_range'));
});

test('EN/BN explanations are classified by script', () => {
  const r = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
Answer: A
Explanation: Kolkata is the capital.
ব্যাখ্যা: কলকাতা রাজধানী।`);
  // The Bengali explanation line is its own explanation line, so both buckets fill.
  assert.equal(r.questions[0].explanationEn, 'Kolkata is the capital.');
  assert.equal(r.questions[0].explanationBn, 'কলকাতা রাজধানী।');

  const enOnly = parsePaperText(`1. First?
(A) A (B) B (C) C (D) D
Answer: A
Explanation: Because it is so.`);
  assert.equal(enOnly.questions[0].explanationEn, 'Because it is so.');
  assert.equal(enOnly.questions[0].explanationBn, null);
});

test('bilingual stems: two stem lines, one per script', () => {
  const r = parsePaperText(`1. What is the capital?
পশ্চিমবঙ্গের রাজধানী কী?
(A) Delhi (B) Kolkata (C) Mumbai (D) Chennai
Answer: B`);
  assert.equal(r.questions[0].stemEn, 'What is the capital?');
  assert.equal(r.questions[0].stemBn, 'পশ্চিমবঙ্গের রাজধানী কী?');

  const bnFirst = parsePaperText(`1. পশ্চিমবঙ্গের রাজধানী কী?
What is the capital?
(A) Delhi (B) Kolkata (C) Mumbai (D) Chennai
Answer: B`);
  assert.equal(bnFirst.questions[0].stemEn, 'What is the capital?');
  assert.equal(bnFirst.questions[0].stemBn, 'পশ্চিমবঙ্গের রাজধানী কী?');
});

test('figure flag on stem or option', () => {
  const stemFig = parsePaperText(`1. See the figure below. What is shown?
(A) A (B) B (C) C (D) D
Answer: A`);
  assert.ok(stemFig.questions[0].warnings.includes('figure_reference'));

  const optionFig = parsePaperText(`1. Pick the diagram.
(A) A (B) The diagram shows X (C) C (D) D
Answer: B`);
  assert.ok(optionFig.questions[0].warnings.includes('figure_reference'));

  const bnFig = parsePaperText(`1. চিত্রটি দেখে উত্তর দাও।
(A) A (B) B (C) C (D) D
Answer: A`);
  assert.ok(bnFig.questions[0].warnings.includes('figure_reference'));

  const clean = parsePaperText(PAPER);
  assert.ok(!clean.questions[0].warnings.includes('figure_reference'));
});

test('duplicate stems warn on every copy', () => {
  const r = parsePaperText(`1. Same question?
(A) A (B) B (C) C (D) D
Answer: A
2. Same question?
(A) A (B) B (C) C (D) D
Answer: A
3. Different question?
(A) A (B) B (C) C (D) D
Answer: A`);
  assert.ok(r.questions[0].warnings.includes('duplicate_stem'));
  assert.ok(r.questions[1].warnings.includes('duplicate_stem'));
  assert.ok(!r.questions[2].warnings.includes('duplicate_stem'));
});

test('option-count warning for 3 and 5 options; 1 and 6 options go to unparsed', () => {
  const three = parsePaperText(`1. Pick one.
(A) A (B) B (C) C
Answer: A`);
  assert.equal(three.questions.length, 1);
  assert.ok(three.questions[0].warnings.includes('option_count'));

  const five = parsePaperText(`1. Pick one.
(A) A (B) B (C) C (D) D (E) E
Answer: A`);
  assert.equal(five.questions.length, 1);
  assert.ok(five.questions[0].warnings.includes('option_count'));
  assert.equal(five.questions[0].options.length, 5);

  const one = parsePaperText(`1. Pick one.
(A) Only
Answer: A
2. Good one?
(A) A (B) B (C) C (D) D
Answer: A`);
  assert.equal(one.questions.length, 1);
  assert.equal(one.questions[0].n, 2);
  assert.equal(one.unparsed.length, 1);
  assert.match(one.unparsed[0].text, /Pick one/);

  const six = parsePaperText(`1. Pick one.
(A) A (B) B (C) C (D) D (E) E (F) F
Answer: A`);
  assert.equal(six.questions.length, 0);
  assert.equal(six.unparsed.length, 1);
  assert.match(six.unparsed[0].text, /Pick one/);
});

test('preamble text becomes one unparsed block', () => {
  const r = parsePaperText(`Mock Test - General Knowledge
From Telegram group, 24 Nov 2026

1. First?
(A) A (B) B (C) C (D) D
Answer: A`);
  assert.equal(r.questions.length, 1);
  assert.equal(r.unparsed.length, 1);
  assert.match(r.unparsed[0].text, /Mock Test/);
  assert.match(r.unparsed[0].text, /Telegram group/);
});

test('empty input and input with no questions', () => {
  assert.deepEqual(parsePaperText(''), { questions: [], unparsed: [] });
  assert.deepEqual(parsePaperText('   \n\n  '), { questions: [], unparsed: [] });
  const none = parsePaperText('Just some prose with no questions at all.');
  assert.deepEqual(none.questions, []);
  assert.equal(none.unparsed.length, 1);
  assert.equal(none.unparsed[0].text, 'Just some prose with no questions at all.');
});

test('Bengali stems and options', () => {
  const r = parsePaperText(`1. পশ্চিমবঙ্গের রাজধানী কী?
(A) দিল্লি (B) কলকাতা (C) মুম্বাই (D) চেন্নাই
উত্তর: B`);
  assert.equal(r.questions.length, 1);
  assert.equal(r.questions[0].stemBn, 'পশ্চিমবঙ্গের রাজধানী কী?');
  assert.equal(r.questions[0].stemEn, null);
  assert.deepEqual(r.questions[0].options, ['দিল্লি', 'কলকাতা', 'মুম্বাই', 'চেন্নাই']);
  assert.equal(r.questions[0].correctIndex, 1);
});

test('number gaps are kept as pasted (Q-prefixed jumps)', () => {
  const r = parsePaperText(`Q1. First?
(A) A (B) B (C) C (D) D
Answer: A
Q3. Third?
(A) A (B) B (C) C (D) D
Answer: B
Q4. Fourth?
(A) A (B) B (C) C (D) D
Answer: C`);
  assert.deepEqual(r.questions.map((q) => q.n), [1, 3, 4]);
});

test('numeric option labels inside a question do not split it', () => {
  const r = parsePaperText(`1. What is 2 + 2?
1. Three
2. Four
3. Five
4. Six
Answer: B`);
  assert.equal(r.questions.length, 1);
  assert.equal(r.questions[0].stemEn, 'What is 2 + 2?');
});

test('wrapped option lines append to the last option', () => {
  const r = parsePaperText(`1. Pick one.
(A) The first option
continues here
(B) Second
(C) Third
(D) Fourth
Answer: A`);
  assert.deepEqual(r.questions[0].options[0], 'The first option continues here');
});

test('a question with an empty stem or zero options goes to unparsed', () => {
  const r = parsePaperText(`1.
(A) A (B) B (C) C (D) D
Answer: A`);
  // "1." with nothing after it is not a question start at all, so the whole
  // input has zero parsed questions and becomes one unparsed block.
  assert.equal(r.questions.length, 0);
  assert.equal(r.unparsed.length, 1);
});
