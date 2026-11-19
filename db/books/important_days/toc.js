'use strict';

/**
 * Table of contents of the গুরুত্বপূর্ণ দিবস book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/important_days/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'q1', title: 'জানুয়ারি–মার্চ' },
  { code: 'q2', title: 'এপ্রিল–জুন' },
  { code: 'q3', title: 'জুলাই–সেপ্টেম্বর' },
  { code: 'q4', title: 'অক্টোবর–ডিসেম্বর' },
  { code: 'mixed', title: 'মিশ্র' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `DAY-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'q1', 'জানুয়ারির দিবস', { subtopics: ['january'] }),
  c(2, 'q1', 'ফেব্রুয়ারির দিবস', { subtopics: ['february'] }),
  c(3, 'q1', 'মার্চের দিবস', { subtopics: ['march'] }),
  c(4, 'q2', 'এপ্রিলের দিবস', { subtopics: ['april'] }),
  c(5, 'q2', 'মে মাসের দিবস', { subtopics: ['may'] }),
  c(6, 'q2', 'জুনের দিবস', { subtopics: ['june'] }),
  c(7, 'q3', 'জুলাইয়ের দিবস', { subtopics: ['july'] }),
  c(8, 'q3', 'আগস্টের দিবস', { subtopics: ['august'] }),
  c(9, 'q3', 'সেপ্টেম্বরের দিবস', { subtopics: ['september'] }),
  c(10, 'q4', 'অক্টোবরের দিবস', { subtopics: ['october'] }),
  c(11, 'q4', 'নভেম্বরের দিবস', { subtopics: ['november'] }),
  c(12, 'q4', 'ডিসেম্বরের দিবস', { subtopics: ['december'] }),
  c(13, 'mixed', 'মিশ্র অনুশীলনী: সব মাস একসাথে', { subtopics: ['mixed'] })
]);

module.exports = { book: 'important_days', title: 'গুরুত্বপূর্ণ দিবস', PARTS, CHAPTERS };
