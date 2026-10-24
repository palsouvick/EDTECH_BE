'use strict';

/** Importing real previous-year questions: official source required, tagged and cited. */

const test = require('node:test');
const assert = require('node:assert/strict');
const { Question } = require('../src/models');
const { convertExamStyleQuestion } = require('../src/services/importers/examStyleJson');

const base = {
  category: 'WBPSC_WBCS',
  subject_code: 'gs',
  topic_code: 'polity',
  difficulty: 'Medium',
  correct_option_id: 'B',
  content: {
    en: { question_text: 'Which Article of the Constitution abolishes untouchability?', options: [{ id: 'A', text: 'Article 14' }, { id: 'B', text: 'Article 17' }, { id: 'C', text: 'Article 19' }, { id: 'D', text: 'Article 21' }], explanation: 'Article 17 abolishes untouchability.' },
    bn: { question_text: 'সংবিধানের কোন অনুচ্ছেদ অস্পৃশ্যতা বিলোপ করেছে?', options: [{ id: 'A', text: 'অনুচ্ছেদ 14' }, { id: 'B', text: 'অনুচ্ছেদ 17' }, { id: 'C', text: 'অনুচ্ছেদ 19' }, { id: 'D', text: 'অনুচ্ছেদ 21' }], explanation: 'অনুচ্ছেদ 17 অস্পৃশ্যতা বিলোপ করেছে।' },
  },
};
const pyq = { exam_name: 'WBCS (Exe.) Prelims', tier: 'PRELIMS', year: 2022, question_no: 17, paper_url: 'https://wbpsc.gov.in/Download/qp/wbcs_2022.pdf', answer_key_url: 'https://wbpsc.gov.in/Download/key/wbcs_2022.pdf' };

test('a PYQ from an official paper is tagged, coded and cites the paper', async () => {
  const { doc, error } = convertExamStyleQuestion({ ...base, pyq });
  assert.equal(error, undefined);
  assert.equal(doc.topic, 'polity');
  assert.deepEqual(doc.pyq.refs[0], {
    exam_name: 'WBCS (Exe.) Prelims', tier: 'PRELIMS', year: 2022, question_code: 'WBCS-EXE-PRELIMS-2022-PRELIMS-Q17',
    source_url: pyq.paper_url, answer_key_url: pyq.answer_key_url,
  });
  const last = doc.solution.steps.at(-1);
  assert.match(last.en, /Official paper\]\(https:\/\/wbpsc\.gov\.in/);
  assert.match(last.bn, /সরকারি প্রশ্নপত্র/);
  const q = new Question(doc);
  await q.validate();
  assert.equal(q.pyq.is_pyq, true);
  assert.equal(q.latest_pyq_year, 2022);
});

test('PYQs from unofficial sites, or without year / question number, are rejected', () => {
  assert.match(convertExamStyleQuestion({ ...base, pyq: { ...pyq, paper_url: 'https://www.adda247.com/wbcs.pdf' } }).error, /official commission site/);
  assert.match(convertExamStyleQuestion({ ...base, pyq: { ...pyq, paper_url: 'http://wbpsc.gov.in/x.pdf' } }).error, /official/);
  assert.match(convertExamStyleQuestion({ ...base, pyq: { ...pyq, year: undefined } }).error, /year/);
  assert.match(convertExamStyleQuestion({ ...base, topic_code: 'not_a_topic' }).error, /unknown topic/);
});
