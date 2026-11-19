'use strict';

/**
 * Table of contents of the অর্থনীতি ও ব্যাংকিং book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/economy/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'foundations', title: 'ভিত্তি' },
  { code: 'banking_finance', title: 'ব্যাংক ও অর্থ' },
  { code: 'sectors', title: 'ক্ষেত্র ও প্রকল্প' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `ECO-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'foundations', 'অর্থনীতির মূল ধারণা', { subtopics: ['basics'] }),
  c(2, 'foundations', 'মুদ্রাস্ফীতি ও জাতীয় আয়', { subtopics: ['inflation_income'] }),
  c(3, 'foundations', 'বাজেট ও করব্যবস্থা', { subtopics: ['budget_tax'] }),
  c(4, 'foundations', 'পরিকল্পনা ও অর্থনৈতিক সংস্কার', { subtopics: ['plans_reforms'] }),
  c(5, 'foundations', 'দারিদ্র্য ও উন্নয়ন', { subtopics: ['poverty_development'] }),
  c(6, 'banking_finance', 'রিজার্ভ ব্যাংক ও ব্যাংকিং ব্যবস্থা', { subtopics: ['rbi_banking'] }),
  c(7, 'banking_finance', 'ব্যাংকিং কার্যক্রম ও পরিভাষা', { subtopics: ['banking_operations'] }),
  c(8, 'banking_finance', 'আর্থিক প্রতিষ্ঠান', { subtopics: ['financial_institutions'] }),
  c(9, 'sectors', 'কৃষি ও শিল্প', { subtopics: ['agri_industry'] }),
  c(10, 'sectors', 'বৈদেশিক ক্ষেত্র ও বাণিজ্য', { subtopics: ['external_sector'] }),
  c(11, 'sectors', 'সরকারি প্রকল্প', { subtopics: ['schemes'] })
]);

module.exports = { book: 'economy', title: 'অর্থনীতি ও ব্যাংকিং', PARTS, CHAPTERS };
