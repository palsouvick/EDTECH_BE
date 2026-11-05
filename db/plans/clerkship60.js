'use strict';

/**
 * WBPSC Clerkship Part-I: 60-day beginner plan (English 30 + General Studies 40 +
 * Arithmetic 30 questions; Clerkship 2024 scheme, db/seed/exams.js).
 *
 * Sessions per chapter follow the WBPSC past-paper priorities (GET /pyq/priorities, 10
 * papers, checked 5 Nov 2026): Must know 3 sessions, Important 2, Additional 1. In General
 * Studies, where one chapter (Indian History) carries 34% of the questions, sessions are
 * roughly proportional to the PYQ share instead. Chapters are ordered easiest-first inside
 * each subject, so a beginner meets the basics before what builds on them.
 *
 * The generator (src/services/studyPlan.service.js) lays these out; edit this file, not
 * the generator, to change what is studied.
 */

const t = (en, bn) => ({ en, bn });

const PHASES = [
  { code: 'FOUNDATION', from: 1, to: 12, title: t('Phase 1 · Foundation', 'পর্ব ১ · ভিত্তি'), goal: t('Basic ideas and terms in every subject. Short days, no pressure.', 'প্রতিটি বিষয়ের মূল ধারণা ও পরিভাষা। ছোট দিন, চাপ নেই।') },
  { code: 'CORE', from: 13, to: 36, title: t('Phase 2 · Core subjects', 'পর্ব ২ · মূল বিষয়'), goal: t('All Must-know and Important chapters, one at a time.', 'সব "অবশ্যই জানতে হবে" ও "গুরুত্বপূর্ণ" অধ্যায়, একটি একটি করে।') },
  { code: 'PYQ', from: 37, to: 48, title: t('Phase 3 · Past papers + practice', 'পর্ব ৩ · আগের প্রশ্ন + অনুশীলন'), goal: t('Real WBPSC questions, paper by paper, to see what repeats.', 'আসল WBPSC প্রশ্ন, প্রশ্নপত্র ধরে ধরে — কী বারবার আসে দেখো।') },
  { code: 'REVISION', from: 49, to: 60, title: t('Phase 4 · Revision + mock tests', 'পর্ব ৪ · রিভিশন + মক টেস্ট'), goal: t('Weak areas, speed and accuracy. No new chapters.', 'দুর্বল জায়গা, গতি ও নির্ভুলতা। নতুন অধ্যায় নয়।') },
];

// Every 7th day in phases 1–3 is a lighter test-and-revise day with no new chapter.
const WEEKLY_TEST_DAYS = [7, 14, 21, 28, 35, 42];

// [topic, sessions, priority]. Order = study order.
const ARITHMETIC = [
  ['number_system', 3, 'MUST'], ['simplification', 2, 'IMPORTANT'], ['percentage', 3, 'MUST'], ['ratio_proportion', 3, 'MUST'],
  ['average', 2, 'IMPORTANT'], ['profit_loss', 2, 'IMPORTANT'], ['interest', 1, 'ADDITIONAL'], ['time_work', 2, 'IMPORTANT'],
  ['time_speed_distance', 2, 'IMPORTANT'], ['algebra', 2, 'IMPORTANT'], ['mixture_alligation', 1, 'ADDITIONAL'],
  ['partnership', 1, 'ADDITIONAL'], ['ages', 1, 'ADDITIONAL'], ['pipes_cistern', 1, 'ADDITIONAL'], ['mensuration', 1, 'ADDITIONAL'],
];
const ENGLISH = [
  ['grammar', 3, 'MUST'], ['fill_blanks', 3, 'MUST'], ['synonyms_antonyms', 3, 'MUST'], ['idioms_phrases', 3, 'MUST'],
  ['one_word_substitution', 3, 'MUST'], ['sentence_improvement', 1, 'ADDITIONAL'], ['error_spotting', 1, 'ADDITIONAL'],
  ['reading_comprehension', 1, 'ADDITIONAL'],
];
// GS share of WBPSC PYQs: history 34%, science 16.5%, current affairs 14%, geography 12%,
// polity 10%, economy 7%, WB GK 6%. GK-only cards (days, organisations, static GK) are not
// coded separately in the papers; they get one or two sessions as exam-standard basics.
const GS = [
  ['polity', 1, 'MUST'], ['geography', 1, 'MUST'], ['indian_history', 1, 'MUST'], ['important_days', 1, null],
  ['general_science', 1, 'MUST'], ['west_bengal_gk', 1, 'IMPORTANT'], ['indian_history', 2, 'MUST'], ['polity', 2, 'MUST'],
  ['geography', 2, 'MUST'], ['general_science', 2, 'MUST'], ['current_affairs', 2, 'MUST'], ['economy', 2, 'IMPORTANT'],
  ['indian_history', 2, 'MUST'], ['west_bengal_gk', 1, 'IMPORTANT'], ['organisations', 1, null], ['general_science', 1, 'MUST'],
  ['indian_history', 1, 'MUST'], ['geography', 1, 'MUST'], ['polity', 1, 'MUST'], ['important_days', 1, null],
  ['current_affairs', 1, 'MUST'], ['static_gk', 1, null], ['west_bengal_gk', 1, 'IMPORTANT'], ['indian_gk', 1, null],
];
// Read if time permits: offered on weekly test days, never required.
const GS_OPTIONAL = ['art_culture', 'environment', 'computer_awareness'];

// Phase 3: one real paper a day, the most relevant first (Clerkship, then the newest WBCS).
const PYQ_PAPERS = [
  ['WBPSC Clerkship (Part-I)', 2023], ['WBCS (Exe.) Prelims', 2024], ['WBCS (Exe.) Prelims', 2023], ['WBCS (Exe.) Prelims', 2022],
  ['WBCS (Exe.) Prelims', 2021], ['WBCS (Exe.) Prelims', 2019], ['WBCS (Exe.) Prelims', 2018], ['WBCS (Exe.) Prelims', 2017],
  ['WBCS (Exe.) Prelims', 2016], ['WBCS (Exe.) Prelims', 2015],
];

module.exports = { code: 'CLERKSHIP_60', exam: 'WBPSC_CLERKSHIP', days: 60, PHASES, WEEKLY_TEST_DAYS, ARITHMETIC, ENGLISH, GS, GS_OPTIONAL, PYQ_PAPERS };
