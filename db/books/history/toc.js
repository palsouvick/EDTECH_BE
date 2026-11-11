'use strict';

/**
 * Table of contents of the History book (docs/HISTORY_BOOK_PLAN.md §4, approved by the owner on 2026-11-11).
 * A chapter is "available" when its file (db/books/history/<file>.json) exists and is PUBLISHED; the others are
 * listed as "coming soon". Titles are Bengali only, like the chapter text. `weight` marks the chapters with the
 * most PYQs (★ in the plan) and `bengal` the chapters with a strong Bengal link (🐅).
 */

const PARTS = Object.freeze([
  { code: 'intro', title: 'সূচনা' },
  { code: 'ancient', title: 'প্রাচীন ভারত' },
  { code: 'medieval', title: 'মধ্যযুগের ভারত' },
  { code: 'modern_company', title: 'আধুনিক ভারত: কোম্পানির শাসন' },
  { code: 'modern_national', title: 'আধুনিক ভারত: জাতীয় আন্দোলন' },
  { code: 'post_independence', title: 'স্বাধীনতার পরে' },
]);

const c = (number, part, title, { weight = false, bengal = false, subtopics = [] } = {}) => ({
  code: `HIS-${String(number).padStart(2, '0')}`,
  number,
  part,
  title,
  weight,
  bengal,
  subtopics,
});

const CHAPTERS = Object.freeze([
  c(0, 'intro', 'ইতিহাস কীভাবে পড়বে: উপাদান, সময়গণনা ও যুগবিভাগ'),
  c(1, 'ancient', 'প্রাগৈতিহাসিক ভারত: প্রস্তর যুগ, প্রথম কৃষক ও তাম্রপ্রস্তর সংস্কৃতি', { subtopics: ['prehistoric'] }),
  c(2, 'ancient', 'হরপ্পা সভ্যতা', { weight: true, subtopics: ['ivc'] }),
  c(3, 'ancient', 'বৈদিক যুগ', { weight: true, subtopics: ['vedic'] }),
  c(4, 'ancient', 'মহাজনপদ ও মগধের উত্থান', { weight: true, subtopics: ['mahajanapadas'] }),
  c(5, 'ancient', 'বৌদ্ধধর্ম, জৈনধর্ম ও নতুন চিন্তা', { weight: true, subtopics: ['buddhism_jainism'] }),
  c(6, 'ancient', 'মৌর্য সাম্রাজ্য', { subtopics: ['maurya_gupta'] }),
  c(7, 'ancient', 'মৌর্য-পরবর্তী ভারত ও সঙ্গম যুগ', { weight: true, subtopics: ['post_maurya_sangam'] }),
  c(8, 'ancient', 'গুপ্ত যুগ ও হর্ষবর্ধন', { subtopics: ['maurya_gupta'] }),
  c(9, 'ancient', 'আদি মধ্যযুগ: শশাঙ্ক, পাল ও সেন এবং আঞ্চলিক রাজ্য', { bengal: true, subtopics: ['early_medieval'] }),
  c(10, 'medieval', 'তুর্কি আক্রমণ ও দিল্লি সুলতানি (বাংলার সুলতানি সহ)', { weight: true, bengal: true, subtopics: ['sultanate'] }),
  c(11, 'medieval', 'বিজয়নগর ও বাহমনি রাজ্য', { subtopics: ['vijayanagara'] }),
  c(12, 'medieval', 'ভক্তি ও সুফি আন্দোলন', { bengal: true, subtopics: ['bhakti_sufi'] }),
  c(13, 'medieval', 'মুঘল সাম্রাজ্য ও শূর শাসন', { weight: true, subtopics: ['mughal'] }),
  c(14, 'medieval', 'মারাঠা শক্তি ও অষ্টাদশ শতকের আঞ্চলিক শক্তি (বাংলার নবাব সহ)', { bengal: true, subtopics: ['marathas', 'regional_18c'] }),
  c(15, 'modern_company', 'ইউরোপীয়দের আগমন', { subtopics: ['company_rule'] }),
  c(16, 'modern_company', 'ব্রিটিশ বিজয়: পলাশি থেকে ডালহৌসি', { weight: true, bengal: true, subtopics: ['company_rule'] }),
  c(17, 'modern_company', 'কোম্পানির শাসনব্যবস্থা: আইন, ভূমিরাজস্ব ও অর্থনীতি', { bengal: true, subtopics: ['company_rule', 'acts_policies'] }),
  c(18, 'modern_company', 'কৃষক ও উপজাতি বিদ্রোহ', { weight: true, bengal: true, subtopics: ['peasant_tribal'] }),
  c(19, 'modern_company', '১৮৫৭-র মহাবিদ্রোহ', { weight: true, subtopics: ['revolt_1857'] }),
  c(20, 'modern_company', 'সমাজ ও ধর্মসংস্কার: বাংলার নবজাগরণ', { weight: true, bengal: true, subtopics: ['reform_movements'] }),
  c(21, 'modern_national', 'জাতীয়তাবাদের উত্থান ও আদি কংগ্রেস (১৮৮৫–১৯০৫)', { weight: true, subtopics: ['inc'] }),
  c(22, 'modern_national', 'বঙ্গভঙ্গ ও স্বদেশী আন্দোলন (১৯০৫–১৯১৮)', { weight: true, bengal: true, subtopics: ['inc', 'freedom_movement'] }),
  c(23, 'modern_national', 'বিপ্লবী আন্দোলন', { weight: true, bengal: true, subtopics: ['revolutionaries'] }),
  c(24, 'modern_national', 'গান্ধী যুগ ১ (১৯১৫–১৯২২): চম্পারণ থেকে অসহযোগ', { weight: true, subtopics: ['freedom_movement'] }),
  c(25, 'modern_national', 'গান্ধী যুগ ২ (১৯২২–১৯৩৯): স্বরাজ্য দল থেকে ১৯৩৫-এর আইন', { weight: true, subtopics: ['freedom_movement'] }),
  c(26, 'modern_national', 'স্বাধীনতার পথে (১৯৩৯–১৯৪৭)', { weight: true, bengal: true, subtopics: ['freedom_movement'] }),
  c(27, 'modern_national', 'সাংবিধানিক বিকাশ এবং গভর্নর-জেনারেল ও ভাইসরয় (১৭৭৩–১৯৪৭)', { weight: true, subtopics: ['acts_policies'] }),
  c(28, 'post_independence', 'স্বাধীনতার পরে: দেশীয় রাজ্যের সংযুক্তি, রাজ্য পুনর্গঠন ও বাংলার উদ্বাস্তু', { bengal: true }),
]);

module.exports = { book: 'history', title: 'ইতিহাস', PARTS, CHAPTERS };
