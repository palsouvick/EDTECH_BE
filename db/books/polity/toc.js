'use strict';

/**
 * Table of contents of the Constitution & Polity book (~/workspace/polity-work/AUDIT.md §7: 22 chapters in
 * 7 parts, approved by the owner on 2026-11-16). A chapter is "available" when its file
 * (db/books/polity/<file>.json) exists and is PUBLISHED; the others are listed as "coming soon".
 * `weight` = many PYQs (★; HIGH or MEDIUM-HIGH in audit §7), `bengal` = West Bengal link (🐅).
 * Batch 1 (audit §9): POL-09, POL-03, POL-04, POL-02, POL-06, POL-20.
 */

const PARTS = Object.freeze([
  { code: 'foundation', title: 'সংবিধান: ভিত্তি' },
  { code: 'rights_duties', title: 'অধিকার, নীতি ও কর্তব্য' },
  { code: 'union_govt', title: 'কেন্দ্রীয় সরকার' },
  { code: 'judiciary', title: 'বিচারব্যবস্থা' },
  { code: 'state_federal', title: 'রাজ্য সরকার ও যুক্তরাষ্ট্রীয় ব্যবস্থা' },
  { code: 'bodies_elections_local', title: 'সংস্থা, নির্বাচন ও স্থানীয় সরকার' },
  { code: 'revision', title: 'রিভিশন ও পরিশিষ্ট' },
]);

const c = (number, part, title, { weight = false, bengal = false, subtopics = [] } = {}) => ({
  code: `POL-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  weight,
  bengal,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(1, 'foundation', 'সংবিধান: ধারণা, প্রয়োজন ও সংবিধান সভা', { subtopics: ['preamble'] }),
  c(2, 'foundation', 'সংবিধানের বৈশিষ্ট্য ও প্রস্তাবনা', { weight: true, subtopics: ['preamble'] }),
  c(3, 'rights_duties', 'মৌলিক অধিকার I — সমতা ও স্বাধীনতা', { weight: true, subtopics: ['fundamental_rights'] }),
  c(4, 'rights_duties', 'মৌলিক অধিকার II — শোষণ, ধর্ম, সংস্কৃতি-শিক্ষা ও প্রতিকার', { weight: true, subtopics: ['fundamental_rights'] }),
  c(5, 'rights_duties', 'নীতিনির্দেশক তত্ত্ব, মৌলিক কর্তব্য ও নাগরিকত্ব', { subtopics: ['dpsp_duties', 'union_citizenship'] }),
  c(6, 'rights_duties', 'সংবিধান সংশোধন ও গুরুত্বপূর্ণ সংশোধনী', { weight: true, subtopics: ['amendments'] }),
  c(7, 'union_govt', 'রাষ্ট্রপতি ও উপরাষ্ট্রপতি', { weight: true, subtopics: ['union_executive'] }),
  c(8, 'union_govt', 'প্রধানমন্ত্রী ও মন্ত্রিসভা', { weight: true, subtopics: ['union_executive'] }),
  c(9, 'union_govt', 'সংসদ — গঠন, লোকসভা ও রাজ্যসভা', { weight: true, subtopics: ['parliament'] }),
  c(10, 'union_govt', 'আইন প্রণয়ন, বাজেট ও সংসদীয় কার্যপ্রণালী', { weight: true, subtopics: ['parliament'] }),
  c(11, 'judiciary', 'সুপ্রিম কোর্ট', { weight: true, subtopics: ['judiciary'] }),
  c(12, 'judiciary', 'হাইকোর্ট, অধস্তন বিচারব্যবস্থা ও বিচারবিভাগের স্বাধীনতা', { subtopics: ['judiciary'] }),
  c(13, 'state_federal', 'রাজ্যপাল', { bengal: true, subtopics: ['state_govt'] }),
  c(14, 'state_federal', 'মুখ্যমন্ত্রী, রাজ্য মন্ত্রিসভা ও রাজ্য বিধানসভা', { bengal: true, subtopics: ['state_govt'] }),
  c(15, 'state_federal', 'কেন্দ্র-রাজ্য সম্পর্ক ও তফসিল', { subtopics: ['federalism_emergency', 'schedules_articles'] }),
  c(16, 'state_federal', 'জরুরি অবস্থা ও বিশেষ বিধান', { subtopics: ['federalism_emergency'] }),
  c(17, 'bodies_elections_local', 'নির্বাচন কমিশন, নির্বাচন ব্যবস্থা ও রাজনৈতিক দল', { weight: true, subtopics: ['elections'] }),
  c(18, 'bodies_elections_local', 'সাংবিধানিক সংস্থা — UPSC, Finance Commission, CAG, অ্যাটর্নি জেনারেল', { weight: true, subtopics: ['constitutional_bodies'] }),
  c(19, 'bodies_elections_local', 'অন্যান্য সংস্থা — NHRC, কমিশন, CVC, CIC, লোকপাল', { subtopics: ['constitutional_bodies'] }),
  c(20, 'bodies_elections_local', 'পঞ্চায়েত ব্যবস্থা ও 73rd Amendment', { weight: true, bengal: true, subtopics: ['panchayati_raj'] }),
  c(21, 'bodies_elections_local', 'পৌরসভা, 74th Amendment ও পশ্চিমবঙ্গের স্থানীয় স্বশাসন', { weight: true, bengal: true, subtopics: ['panchayati_raj'] }),
  c(22, 'revision', 'গুরুত্বপূর্ণ অনুচ্ছেদ, তফসিল ও পরিভাষা — রিভিশন', { subtopics: ['schedules_articles'] }),
]);

module.exports = { book: 'polity', title: 'ভারতের সংবিধান ও রাষ্ট্রব্যবস্থা', PARTS, CHAPTERS };
