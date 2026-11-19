'use strict';

/**
 * Table of contents of the বিজ্ঞান book (Phase 5 content completion, owner order 2026-11-19).
 * A chapter is "available" when its file (db/books/science/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text.
 */

const PARTS = Object.freeze([
  { code: 'physics', title: 'পদার্থবিদ্যা' },
  { code: 'chemistry', title: 'রসায়ন' },
  { code: 'biology', title: 'জীববিদ্যা' },
  { code: 'general', title: 'সাধারণ' }
]);

const c = (number, part, title, { subtopics = [] } = {}) => ({
  code: `SCI-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'physics', 'একক ও পরিমাপ', { subtopics: ['physics_units'] }),
  c(2, 'physics', 'গতি, বল ও শক্তি', { subtopics: ['physics_mechanics'] }),
  c(3, 'physics', 'তাপ, আলো ও শব্দ', { subtopics: ['physics_heat_light_sound'] }),
  c(4, 'physics', 'তড়িৎ ও চুম্বকত্ব', { subtopics: ['physics_electricity'] }),
  c(5, 'physics', 'আধুনিক পদার্থবিদ্যা', { subtopics: ['physics_modern'] }),
  c(6, 'chemistry', 'পদার্থ: মৌল, যৌগ ও মিশ্রণ', { subtopics: ['chemistry_matter'] }),
  c(7, 'chemistry', 'অ্যাসিড, ক্ষার ও লবণ', { subtopics: ['chemistry_acids_bases'] }),
  c(8, 'chemistry', 'ধাতু ও অধাতু', { subtopics: ['chemistry_metals'] }),
  c(9, 'chemistry', 'দৈনন্দিন জীবনে রসায়ন', { subtopics: ['chemistry_everyday'] }),
  c(10, 'biology', 'কোষ ও বংশগতি', { subtopics: ['biology_cell_genetics'] }),
  c(11, 'biology', 'মানবদেহ', { subtopics: ['biology_human_body'] }),
  c(12, 'biology', 'পুষ্টি ও ভিটামিন', { subtopics: ['biology_nutrition'] }),
  c(13, 'biology', 'রোগ ও রোগজীবাণু', { subtopics: ['biology_diseases'] }),
  c(14, 'biology', 'উদ্ভিদ ও প্রাণীজগৎ', { subtopics: ['biology_plants_animals'] }),
  c(15, 'general', 'আবিষ্কার ও উদ্ভাবন', { subtopics: ['discoveries'] })
]);

module.exports = { book: 'science', title: 'বিজ্ঞান', PARTS, CHAPTERS };
