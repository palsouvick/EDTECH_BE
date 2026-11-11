'use strict';

/** Quote checking for study-book claims: exact for NCERT text, OCR-tolerant for scanned WBBSE books. */

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalise, bestMatch, checkChapter } = require('../scripts/content/checkQuotes');

// OCR output of a real WBBSE page: note "খিস্টাব্দের" (missing ্র) and stray line breaks.
const OCR_PAGE = 'সেভাবে দেখলে\nসত্যিইতো কলিঙ্গ যুদ্ধ এই ২০১৪ খিস্টাব্দের\n\nতুলনায় অনেক আগে ঘটেছে। তার অনেক প\n';

test('normalise: spaces, punctuation and Bengali digits do not matter', () => {
  assert.equal(normalise('১৯০৫, “Partition” — of Bengal!'), normalise('1905 partition of   bengal'));
});

test('bestMatch: exact text scores 1; OCR mistakes still score high; an unrelated sentence scores low', () => {
  const pages = [{ page: 7, text: 'Other text.' }, { page: 30, text: OCR_PAGE }];
  assert.deepEqual(bestMatch('তুলনায় অনেক আগে ঘটেছে', pages), { score: 1, page: 30 });
  const ocr = bestMatch('সত্যিইতো কলিঙ্গ যুদ্ধ এই ২০১৪ খ্রিস্টাব্দের তুলনায় অনেক আগে ঘটেছে', pages);
  assert.equal(ocr.page, 30);
  assert.ok(ocr.score >= 0.9, `score ${ocr.score}`);
  assert.ok(bestMatch('পলাশির যুদ্ধ হয়েছিল ১৮৫৭ সালে মহারাষ্ট্রে', pages).score < 0.6);
});

test('checkChapter: NCERT must match exactly, WBBSE may match by OCR similarity, otherwise a page check is required', () => {
  const chapter = {
    sources: [
      { id: 'n', url: 'https://ncert.nic.in/textbook/pdf/hess208.pdf' },
      { id: 'w', url: 'https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit o Aityaja Class VIII.pdf' },
    ],
    claims: [
      { id: 'c01', source: 'n', quote: 'The two groups reunited in December 1915.' },
      { id: 'c02', source: 'n', quote: 'The two groups reunited in December 1916.' },
      { id: 'c03', source: 'w', quote: 'সত্যিইতো কলিঙ্গ যুদ্ধ এই ২০১৪ খ্রিস্টাব্দের তুলনায় অনেক আগে ঘটেছে' },
      { id: 'c04', source: 'w', quote: 'পলাশির যুদ্ধ হয়েছিল ১৮৫৭ সালে মহারাষ্ট্রে' },
    ],
  };
  const text = { n: [{ page: 6, text: 'Meanwhile, the Congress split in 1907. The two groups reunited in\nDecember 1915. Next year…' }], w: [{ page: 30, text: OCR_PAGE }] };
  const r = Object.fromEntries(checkChapter(chapter, text).map((x) => [x.id, x.status]));
  assert.deepEqual(r, { c01: 'OK', c02: 'NOT_FOUND', c03: 'OK_OCR', c04: 'NEEDS_PAGE_CHECK' });
});
