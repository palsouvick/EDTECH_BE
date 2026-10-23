'use strict';

/**
 * Exam details for the "About the exam" panel, keyed by exam code and merged
 * into the catalogue by catalog.js.
 *
 * Every pattern, date and vacancy figure here was read from the official
 * notice, result write-up or exam calendar linked beside it (checked
 * 14 Oct 2026). Figures found only on coaching sites are left out, not
 * estimated. Where a notice says there is negative marking without saying
 * how much, the amount is left unset and negative_note says so.
 *
 * When a new notification comes out, update pattern_as_of, the stage and the
 * source together, and add the cycle at the top of `cycles`.
 */

const L = (en, bn, hi) => ({ en, bn: bn ?? en, hi: hi ?? en });

const section = (subject, title, num_questions, marks_per_question, negative_marks, extra = {}) => ({
  subject,
  title,
  num_questions,
  marks_per_question,
  ...(negative_marks != null && { negative_marks }),
  ...extra,
});

const T1 = L('Tier-I', 'টিয়ার-I', 'टियर-I');
const PRELIMS = L('Preliminary Exam', 'প্রিলিমিনারি পরীক্ষা', 'प्रारंभिक परीक्षा');

// Section titles as the notices word them.
const S = {
  reasoningSSC: L('General Intelligence & Reasoning', 'সাধারণ বুদ্ধিমত্তা ও যুক্তি', 'सामान्य बुद्धि और तर्क'),
  gaSSC: L('General Awareness', 'সাধারণ সচেতনতা', 'सामान्य जागरूकता'),
  quantSSC: L('Quantitative Aptitude', 'পরিমাণগত দক্ষতা', 'मात्रात्मक योग्यता'),
  englishSSC: L('English Comprehension', 'ইংরেজি বোধগম্যতা', 'अंग्रेज़ी बोध'),
  english: L('English Language', 'ইংরেজি ভাষা', 'अंग्रेज़ी भाषा'),
  quantBank: L('Quantitative Aptitude', 'পরিমাণগত দক্ষতা', 'मात्रात्मक अभियोग्यता'),
  numerical: L('Numerical Ability', 'সংখ্যাগত দক্ষতা', 'संख्यात्मक अभियोग्यता'),
  reasoningBank: L('Reasoning Ability', 'যুক্তি ক্ষমতা', 'तर्क क्षमता'),
};

const sscSectional = { sectional_time_min: 15 };

module.exports = {
  // ------------------------------------------------------------------ SSC
  SSC_CGL: {
    full_name: L('Combined Graduate Level Examination', 'কম্বাইন্ড গ্র্যাজুয়েট লেভেল পরীক্ষা', 'संयुक्त स्नातक स्तरीय परीक्षा'),
    pattern_as_of: 'CGL 2026 notice',
    source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf',
    stages: [
      {
        tier: 'TIER_1',
        name: T1,
        mode: 'CBT',
        duration_min: 60,
        note: L(
          'New in the 2026 notice: each section has its own 15-minute timer.',
          '২০২৬-এর বিজ্ঞপ্তিতে নতুন: প্রতিটি বিভাগের জন্য আলাদা ১৫ মিনিটের টাইমার।',
          '2026 की अधिसूचना में नया: हर खंड का अलग 15 मिनट का टाइमर।',
        ),
        languages_note: L(
          'Questions in English and Hindi, except English Comprehension.',
          'ইংরেজি বোধগম্যতা ছাড়া বাকি প্রশ্ন ইংরেজি ও হিন্দিতে।',
          'अंग्रेज़ी बोध को छोड़कर प्रश्न अंग्रेज़ी और हिन्दी में।',
        ),
        sections: [
          section('reasoning', S.reasoningSSC, 25, 2, 0.5, sscSectional),
          section('gs', S.gaSSC, 25, 2, 0.5, sscSectional),
          section('quant', S.quantSSC, 25, 2, 0.5, sscSectional),
          section('english', S.englishSSC, 25, 2, 0.5, sscSectional),
        ],
      },
    ],
    next_stages: [L('Tier-II', 'টিয়ার-II', 'टियर-II'), L('Document Verification', 'নথি যাচাই', 'दस्तावेज़ सत्यापन')],
    notes: L(
      'CGL 2026 Tier-I is being held from 30 Sep to 30 Oct 2026.',
      'CGL ২০২৬ টিয়ার-I চলছে ৩০ সেপ্টেম্বর থেকে ৩০ অক্টোবর ২০২৬।',
      'CGL 2026 टियर-I 30 सितंबर से 30 अक्टूबर 2026 तक चल रही है।',
    ),
    cycles: [
      {
        year: 2025,
        stage: T1,
        dates: '12 Sep – 26 Sep 2025, re-exam 14 Oct 2025',
        vacancies: 15118,
        vacancies_note: L('final', 'চূড়ান্ত', 'अंतिम'),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/Results/Writeup_181225.pdf',
      },
      {
        year: 2024,
        stage: T1,
        dates: '9 Sep – 26 Sep 2024',
        vacancies: 18174,
        vacancies_note: L('final', 'চূড়ান্ত', 'अंतिम'),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/CGLE%20-24%20Final%20Result%20Writeup_12325.pdf',
      },
    ],
  },

  SSC_CHSL: {
    full_name: L('Combined Higher Secondary (10+2) Level Examination', 'কম্বাইন্ড হায়ার সেকেন্ডারি (১০+২) লেভেল পরীক্ষা', 'संयुक्त उच्चतर माध्यमिक (10+2) स्तरीय परीक्षा'),
    pattern_as_of: 'CHSL 2026 notice',
    source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2026.pdf',
    stages: [
      {
        tier: 'TIER_1',
        name: T1,
        mode: 'CBT',
        duration_min: 60,
        note: L(
          'Each section has its own 15-minute timer (2026 notice).',
          'প্রতিটি বিভাগের জন্য আলাদা ১৫ মিনিটের টাইমার (২০২৬ বিজ্ঞপ্তি)।',
          'हर खंड का अलग 15 मिनट का टाइमर (2026 अधिसूचना)।',
        ),
        languages_note: L(
          'English, Hindi or one of 13 regional languages, Bengali included. The English section is in English only.',
          'ইংরেজি, হিন্দি বা বাংলা-সহ ১৩টি আঞ্চলিক ভাষার একটি। ইংরেজি বিভাগ শুধু ইংরেজিতে।',
          'अंग्रेज़ी, हिन्दी या बांग्ला सहित 13 क्षेत्रीय भाषाओं में से एक। अंग्रेज़ी खंड केवल अंग्रेज़ी में।',
        ),
        sections: [
          section('english', L('English Language (Basic Knowledge)', 'ইংরেজি ভাষা (প্রাথমিক জ্ঞান)', 'अंग्रेज़ी भाषा (मूल ज्ञान)'), 25, 2, 0.5, sscSectional),
          section('reasoning', L('General Intelligence', 'সাধারণ বুদ্ধিমত্তা', 'सामान्य बुद्धि'), 25, 2, 0.5, sscSectional),
          section('quant', L('Quantitative Aptitude (Basic Arithmetic)', 'পরিমাণগত দক্ষতা (প্রাথমিক পাটিগণিত)', 'मात्रात्मक योग्यता (मूल अंकगणित)'), 25, 2, 0.5, sscSectional),
          section('gs', S.gaSSC, 25, 2, 0.5, sscSectional),
        ],
      },
    ],
    next_stages: [L('Tier-II (written + skill/typing test)', 'টিয়ার-II (লিখিত + স্কিল/টাইপিং টেস্ট)', 'टियर-II (लिखित + कौशल/टाइपिंग टेस्ट)')],
    notes: L(
      'CHSL 2026: about 2,536 tentative vacancies; the Tier-I date is yet to be announced.',
      'CHSL ২০২৬: প্রায় ২,৫৩৬টি সম্ভাব্য শূন্যপদ; টিয়ার-I-এর তারিখ এখনও ঘোষিত হয়নি।',
      'CHSL 2026: लगभग 2,536 संभावित रिक्तियाँ; टियर-I की तिथि अभी घोषित नहीं हुई।',
    ),
    cycles: [
      {
        year: 2025,
        stage: T1,
        dates: '12 Nov – 30 Nov 2025',
        vacancies: 3522,
        vacancies_note: L('final', 'চূড়ান্ত', 'अंतिम'),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/writeup_final_chsl_2025_07102026.pdf',
      },
      {
        year: 2024,
        stage: T1,
        dates: '1 Jul – 11 Jul 2024',
        vacancies: 3421,
        vacancies_note: L('final', 'চূড়ান্ত', 'अंतिम'),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/Results/CHSLE_2024_Final_Result_Write%20Up_180225.pdf',
      },
    ],
  },

  SSC_MTS: {
    full_name: L('Multi-Tasking (Non-Technical) Staff & Havaldar Examination', 'মাল্টি-টাস্কিং (নন-টেকনিক্যাল) স্টাফ ও হাবিলদার পরীক্ষা', 'मल्टी-टास्किंग (गैर-तकनीकी) स्टाफ और हवलदार परीक्षा'),
    pattern_as_of: 'MTS 2025 notice',
    source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_mts_2025.pdf',
    stages: [
      {
        tier: 'SINGLE',
        name: L('Computer Based Exam (2 sessions)', 'কম্পিউটার-ভিত্তিক পরীক্ষা (২টি সেশন)', 'कंप्यूटर आधारित परीक्षा (2 सत्र)'),
        mode: 'CBT',
        duration_min: 90,
        note: L(
          'Two 45-minute sessions on the same day. Session 1 has no negative marking and only needs to be qualified; the merit list uses Session 2.',
          'একই দিনে ৪৫ মিনিটের দুটি সেশন। সেশন ১-এ নেগেটিভ মার্কিং নেই, শুধু উত্তীর্ণ হতে হয়; মেধা তালিকা সেশন ২-এর নম্বরে।',
          'एक ही दिन 45-45 मिनट के दो सत्र। सत्र 1 में नकारात्मक अंकन नहीं, केवल उत्तीर्ण होना है; मेरिट सत्र 2 के अंकों पर।',
        ),
        languages_note: L(
          'Hindi, English or one of 13 regional languages, Bengali included. The English section is in English only.',
          'হিন্দি, ইংরেজি বা বাংলা-সহ ১৩টি আঞ্চলিক ভাষার একটি। ইংরেজি বিভাগ শুধু ইংরেজিতে।',
          'हिन्दी, अंग्रेज़ी या बांग्ला सहित 13 क्षेत्रीय भाषाओं में से एक। अंग्रेज़ी खंड केवल अंग्रेज़ी में।',
        ),
        sections: [
          section('quant', L('Numerical & Mathematical Ability', 'সংখ্যাগত ও গাণিতিক দক্ষতা', 'संख्यात्मक और गणितीय योग्यता'), 20, 3, 0, { session: 1 }),
          section('reasoning', L('Reasoning Ability & Problem Solving', 'যুক্তি ও সমস্যা সমাধান', 'तर्क क्षमता और समस्या समाधान'), 20, 3, 0, { session: 1 }),
          section('gs', S.gaSSC, 25, 3, 1, { session: 2 }),
          section('english', L('English Language & Comprehension', 'ইংরেজি ভাষা ও বোধগম্যতা', 'अंग्रेज़ी भाषा और बोध'), 25, 3, 1, { session: 2 }),
        ],
      },
    ],
    next_stages: [L('PET/PST (Havaldar only)', 'PET/PST (শুধু হাবিলদার)', 'PET/PST (केवल हवलदार)'), L('Document Verification', 'নথি যাচাই', 'दस्तावेज़ सत्यापन')],
    cycles: [
      {
        year: 2025,
        stage: L('CBE', 'CBE', 'CBE'),
        dates: '4 Feb – 20 Feb 2026',
        note: L(
          'Rescheduled; the notice had planned Sep–Oct 2025. No official total vacancy figure has been published.',
          'পুনর্নির্ধারিত; বিজ্ঞপ্তিতে সেপ্টেম্বর–অক্টোবর ২০২৫ বলা ছিল। মোট শূন্যপদের সরকারি সংখ্যা প্রকাশিত হয়নি।',
          'पुनर्निर्धारित; अधिसूचना में सितंबर–अक्टूबर 2025 था। कुल रिक्तियों का आधिकारिक आँकड़ा प्रकाशित नहीं हुआ।',
        ),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/Results/writeup_mts_03082026.pdf',
      },
      {
        year: 2024,
        stage: L('CBE', 'CBE', 'CBE'),
        dates: '30 Sep – 14 Nov 2024',
        vacancies: 11518,
        vacancies_note: L('final: MTS 8,079 + Havaldar 3,439', 'চূড়ান্ত: MTS ৮,০৭৯ + হাবিলদার ৩,৪৩৯', 'अंतिम: MTS 8,079 + हवलदार 3,439'),
        source_url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Write-up,%20Final%20Result-%20MTS-2024_12325.pdf',
      },
    ],
  },

  // -------------------------------------------------------------- Banking
  IBPS_PO: {
    full_name: L('IBPS Probationary Officers / Management Trainees (CRP PO/MT)', 'IBPS প্রবেশনারি অফিসার / ম্যানেজমেন্ট ট্রেনি', 'IBPS परिवीक्षाधीन अधिकारी / प्रबंधन प्रशिक्षु'),
    pattern_as_of: 'CRP PO/MT-XVI notification (2026)',
    source_url: 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf',
    stages: [
      {
        tier: 'PRELIMS',
        name: PRELIMS,
        mode: 'CBT',
        duration_min: 60,
        negative_note: L('¼ of the question’s marks', 'প্রশ্নের নম্বরের ¼', 'प्रश्न के अंकों का ¼'),
        note: L(
          'Each section is separately timed (20 min) and has its own cut-off. Section marks are as printed in the notice: Quant 35 questions for 30 marks, Reasoning 35 for 40.',
          'প্রতিটি বিভাগ আলাদা সময়ে (২০ মিনিট) এবং আলাদা কাট-অফ। নম্বর বিজ্ঞপ্তি অনুযায়ী: গণিত ৩৫ প্রশ্নে ৩০, যুক্তি ৩৫ প্রশ্নে ৪০।',
          'हर खंड अलग समय (20 मिनट) और अलग कट-ऑफ़ वाला। अंक अधिसूचना अनुसार: गणित 35 प्रश्न 30 अंक, तर्क 35 प्रश्न 40 अंक।',
        ),
        languages_note: L(
          'English Language in English; the other two in English and Hindi.',
          'ইংরেজি বিভাগ ইংরেজিতে; বাকি দুটি ইংরেজি ও হিন্দিতে।',
          'अंग्रेज़ी खंड अंग्रेज़ी में; बाकी दो अंग्रेज़ी और हिन्दी में।',
        ),
        sections: [
          section('english', S.english, 30, undefined, undefined, { max_marks: 30, sectional_time_min: 20 }),
          section('quant', S.quantBank, 35, undefined, undefined, { max_marks: 30, sectional_time_min: 20 }),
          section('reasoning', S.reasoningBank, 35, undefined, undefined, { max_marks: 40, sectional_time_min: 20 }),
        ],
      },
    ],
    next_stages: [L('Mains (objective + descriptive)', 'মেইনস (অবজেক্টিভ + বর্ণনামূলক)', 'मुख्य परीक्षा (वस्तुनिष्ठ + वर्णनात्मक)'), L('Interview', 'ইন্টারভিউ', 'साक्षात्कार')],
    cycles: [
      {
        year: 2026,
        stage: L('Prelims (PO/MT-XVI)', 'প্রিলিমস (PO/MT-XVI)', 'प्रारंभिक (PO/MT-XVI)'),
        dates: '22–23 Aug 2026',
        vacancies: 7565,
        vacancies_note: L('indicative, as updated on 27 Aug 2026', 'আনুমানিক, ২৭ আগস্ট ২০২৬-এর হালনাগাদ', 'सांकेतिक, 27 अगस्त 2026 के अद्यतन अनुसार'),
        source_url: 'https://www.ibps.in/wp-content/uploads/ANNEXURE-I_updated_25.08.2026.pdf',
      },
      {
        year: 2025,
        stage: L('Prelims (PO/MT-XV)', 'প্রিলিমস (PO/MT-XV)', 'प्रारंभिक (PO/MT-XV)'),
        dates: '17, 23, 24 Aug 2025',
        vacancies: 5208,
        vacancies_note: L('indicative, per notification', 'আনুমানিক, বিজ্ঞপ্তি অনুযায়ী', 'सांकेतिक, अधिसूचना अनुसार'),
        source_url: 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XV_10.7.25.pdf',
      },
    ],
  },

  IBPS_CLERK: {
    full_name: L('IBPS Customer Service Associates (CRP CSA, Clerk)', 'IBPS কাস্টমার সার্ভিস অ্যাসোসিয়েট (ক্লার্ক)', 'IBPS ग्राहक सेवा सहयोगी (क्लर्क)'),
    pattern_as_of: 'CRP CSA-XVI prelims handout (2026)',
    source_url: 'https://www.ibps.in/wp-content/uploads/CRP-CSA-PRE-XVI-IH-Eng-2026.pdf',
    stages: [
      {
        tier: 'PRELIMS',
        name: PRELIMS,
        mode: 'CBT',
        duration_min: 60,
        note: L(
          'Each section is separately timed (20 min). You must clear each section’s cut-off and the total cut-off.',
          'প্রতিটি বিভাগ আলাদা সময়ে (২০ মিনিট)। প্রতিটি বিভাগের ও মোট কাট-অফ পেরোতে হবে।',
          'हर खंड अलग समय (20 मिनट)। हर खंड और कुल कट-ऑफ़ पार करना होगा।',
        ),
        languages_note: L(
          'English section in English. For West Bengal, the other sections are in English, Hindi and Bengali.',
          'ইংরেজি বিভাগ ইংরেজিতে। পশ্চিমবঙ্গের জন্য বাকি বিভাগ ইংরেজি, হিন্দি ও বাংলায়।',
          'अंग्रेज़ी खंड अंग्रेज़ी में। पश्चिम बंगाल के लिए बाकी खंड अंग्रेज़ी, हिन्दी और बांग्ला में।',
        ),
        sections: [
          section('english', S.english, 30, 1, 0.25, { sectional_time_min: 20 }),
          section('quant', S.numerical, 35, 1, 0.25, { sectional_time_min: 20 }),
          section('reasoning', S.reasoningBank, 35, 1, 0.25, { sectional_time_min: 20 }),
        ],
      },
    ],
    next_stages: [L('Mains', 'মেইনস', 'मुख्य परीक्षा'), L('Provisional allotment', 'অস্থায়ী নিয়োগ বণ্টন', 'अनंतिम आवंटन')],
    notes: L(
      'Vacancies are state-wise, and you need the state’s local language. West Bengal: 951 (2026), 1,086 (2025).',
      'শূন্যপদ রাজ্যভিত্তিক, রাজ্যের স্থানীয় ভাষা জানা আবশ্যক। পশ্চিমবঙ্গ: ৯৫১ (২০২৬), ১,০৮৬ (২০২৫)।',
      'रिक्तियाँ राज्यवार हैं, राज्य की स्थानीय भाषा आवश्यक। पश्चिम बंगाल: 951 (2026), 1,086 (2025)।',
    ),
    cycles: [
      {
        year: 2026,
        stage: L('Prelims (CSA-XVI)', 'প্রিলিমস (CSA-XVI)', 'प्रारंभिक (CSA-XVI)'),
        dates: '10–11 Oct 2026 (per the IBPS calendar)',
        vacancies: 11663,
        vacancies_note: L('indicative, as on 29 Sep 2026', 'আনুমানিক, ২৯ সেপ্টেম্বর ২০২৬ অনুযায়ী', 'सांकेतिक, 29 सितंबर 2026 तक'),
        source_url: 'https://www.ibps.in/wp-content/uploads/Annexure_Corrigendum_29.09.2026.pdf',
      },
      {
        year: 2025,
        stage: L('Prelims (CSA-XV)', 'প্রিলিমস (CSA-XV)', 'प्रारंभिक (CSA-XV)'),
        dates: '4, 5, 11 Oct 2025',
        vacancies: 15701,
        vacancies_note: L('indicative, as on 14 Nov 2025', 'আনুমানিক, ১৪ নভেম্বর ২০২৫ অনুযায়ী', 'सांकेतिक, 14 नवंबर 2025 तक'),
        source_url: 'https://www.ibps.in/wp-content/uploads/CRP-CSA_XV_BANKWISE_STATEWISE_VACANCY_14.11.2025.pdf',
      },
    ],
  },

  SBI_PO: {
    full_name: L('SBI Probationary Officers', 'SBI প্রবেশনারি অফিসার', 'SBI परिवीक्षाधीन अधिकारी'),
    pattern_as_of: 'SBI PO 2026-27 advertisement',
    source_url: 'https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf',
    stages: [
      {
        tier: 'PRELIMS',
        name: L('Phase-I Prelims', 'ফেজ-I প্রিলিমস', 'चरण-I प्रारंभिक'),
        mode: 'CBT',
        duration_min: 60,
        note: L(
          'Each section is timed (20 min). No sectional cut-off in prelims; about 10× the vacancies are called for Mains.',
          'প্রতিটি বিভাগ ২০ মিনিট। প্রিলিমসে বিভাগীয় কাট-অফ নেই; শূন্যপদের প্রায় ১০ গুণ প্রার্থী মেইনসে ডাক পান।',
          'हर खंड 20 मिनट। प्रारंभिक में खंडवार कट-ऑफ़ नहीं; रिक्तियों के लगभग 10 गुना उम्मीदवार मुख्य परीक्षा में।',
        ),
        languages_note: L('English and Hindi, except the English section.', 'ইংরেজি বিভাগ ছাড়া ইংরেজি ও হিন্দিতে।', 'अंग्रेज़ी खंड को छोड़कर अंग्रेज़ी और हिन्दी में।'),
        sections: [
          section('english', S.english, 40, 1, 0.25, { sectional_time_min: 20 }),
          section('quant', S.quantBank, 30, 1, 0.25, { sectional_time_min: 20 }),
          section('reasoning', S.reasoningBank, 30, 1, 0.25, { sectional_time_min: 20 }),
        ],
      },
    ],
    next_stages: [
      L('Phase-II Mains', 'ফেজ-II মেইনস', 'चरण-II मुख्य'),
      L('Psychometric test', 'সাইকোমেট্রিক টেস্ট', 'साइकोमेट्रिक टेस्ट'),
      L('Group exercise & interview', 'গ্রুপ এক্সারসাইজ ও ইন্টারভিউ', 'समूह अभ्यास और साक्षात्कार'),
    ],
    cycles: [
      {
        year: 2026,
        stage: L('Prelims', 'প্রিলিমস', 'प्रारंभिक'),
        dates: '1–2 Aug 2026',
        vacancies: 1500,
        vacancies_note: L('1,446 regular + 54 backlog', '১,৪৪৬ নিয়মিত + ৫৪ ব্যাকলগ', '1,446 नियमित + 54 बैकलॉग'),
        source_url: 'https://sbi.bank.in/web/careers/popre-results-2026',
      },
      {
        year: 2025,
        stage: L('Prelims', 'প্রিলিমস', 'प्रारंभिक'),
        dates: '4–5 Aug 2025',
        vacancies: 541,
        vacancies_note: L('500 regular + 41 backlog', '৫০০ নিয়মিত + ৪১ ব্যাকলগ', '500 नियमित + 41 बैकलॉग'),
        source_url: 'https://sbi.bank.in/web/careers/po-pre-result-2025',
      },
    ],
  },

  SBI_CLERK: {
    full_name: L('SBI Junior Associates (Customer Support & Sales)', 'SBI জুনিয়র অ্যাসোসিয়েট (ক্লার্ক)', 'SBI जूनियर एसोसिएट (क्लर्क)'),
    pattern_as_of: 'SBI Junior Associates 2026 advertisement',
    source_url: 'https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf',
    stages: [
      {
        tier: 'PRELIMS',
        name: L('Phase-I Prelims', 'ফেজ-I প্রিলিমস', 'चरण-I प्रारंभिक'),
        mode: 'CBT',
        duration_min: 60,
        note: L(
          'Each section is timed (20 min). No sectional cut-off; prelims marks do not count in the final merit.',
          'প্রতিটি বিভাগ ২০ মিনিট। বিভাগীয় কাট-অফ নেই; প্রিলিমসের নম্বর চূড়ান্ত মেধায় যোগ হয় না।',
          'हर खंड 20 मिनट। खंडवार कट-ऑफ़ नहीं; प्रारंभिक अंक अंतिम मेरिट में नहीं जुड़ते।',
        ),
        languages_note: L(
          'English section in English. For West Bengal, the other sections are in English, Hindi and Bengali.',
          'ইংরেজি বিভাগ ইংরেজিতে। পশ্চিমবঙ্গের জন্য বাকি বিভাগ ইংরেজি, হিন্দি ও বাংলায়।',
          'अंग्रेज़ी खंड अंग्रेज़ी में। पश्चिम बंगाल के लिए बाकी खंड अंग्रेज़ी, हिन्दी और बांग्ला में।',
        ),
        sections: [
          section('english', S.english, 30, 1, 0.25, { sectional_time_min: 20 }),
          section('quant', S.numerical, 35, 1, 0.25, { sectional_time_min: 20 }),
          section('reasoning', S.reasoningBank, 35, 1, 0.25, { sectional_time_min: 20 }),
        ],
      },
    ],
    next_stages: [L('Phase-II Mains', 'ফেজ-II মেইনস', 'चरण-II मुख्य'), L('Local language test', 'স্থানীয় ভাষা পরীক্ষা', 'स्थानीय भाषा परीक्षा')],
    cycles: [
      {
        year: 2026,
        stage: L('Prelims', 'প্রিলিমস', 'प्रारंभिक'),
        vacancies: 9766,
        vacancies_note: L('7,680 regular + 2,086 backlog', '৭,৬৮০ নিয়মিত + ২,০৮৬ ব্যাকলগ', '7,680 नियमित + 2,086 बैकलॉग'),
        note: L('Held in late September 2026; SBI has not published the exact days.', 'সেপ্টেম্বর ২০২৬-এর শেষে অনুষ্ঠিত; SBI সঠিক তারিখ প্রকাশ করেনি।', 'सितंबर 2026 के अंत में आयोजित; SBI ने सटीक तिथियाँ प्रकाशित नहीं कीं।'),
        source_url: 'https://sbi.bank.in/webfiles/uploads/files_2627/08/JA_2026_Detailed_Advt_Eng.pdf',
      },
      {
        year: 2025,
        stage: L('Prelims', 'প্রিলিমস', 'प्रारंभिक'),
        dates: 'September 2025',
        vacancies: 6589,
        vacancies_note: L('5,180 regular + 1,409 backlog', '৫,১৮০ নিয়মিত + ১,৪০৯ ব্যাকলগ', '5,180 नियमित + 1,409 बैकलॉग'),
        source_url: 'https://sbi.bank.in/web/careers/clk-prephase-2025',
      },
    ],
  },

  // ---------------------------------------------------------------- WBPSC
  WBCS: {
    full_name: L('West Bengal Civil Service (Exe.) etc. Examination', 'পশ্চিমবঙ্গ সিভিল সার্ভিস (এক্সিকিউটিভ) ইত্যাদি পরীক্ষা', 'पश्चिम बंगाल सिविल सेवा (कार्यकारी) आदि परीक्षा'),
    pattern_as_of: 'WBCS 2024 scheme (Advt 08/2024)',
    source_url: 'https://psc.wb.gov.in/Download?param1=20251114121739_SCHEME_SYLLABUS-2024_Final.pdf&param2=advertisement',
    stages: [
      {
        tier: 'PRELIMS',
        name: PRELIMS,
        mode: 'OFFLINE',
        duration_min: 150,
        negative_note: L('Yes; the notice does not state the amount', 'আছে; পরিমাণ বিজ্ঞপ্তিতে উল্লেখ নেই', 'है; राशि अधिसूचना में नहीं'),
        note: L(
          'One paper of 200 questions. Prelims is for screening only; its marks do not count in the final merit.',
          '২০০ প্রশ্নের একটি পত্র। প্রিলিমস শুধু বাছাইয়ের জন্য; এর নম্বর চূড়ান্ত মেধায় যোগ হয় না।',
          '200 प्रश्नों का एक पत्र। प्रारंभिक केवल छँटनी के लिए; इसके अंक अंतिम मेरिट में नहीं जुड़ते।',
        ),
        sections: [
          section('english', L('English Composition', 'ইংরেজি রচনা', 'अंग्रेज़ी रचना'), 25, 1),
          section('gs', L('General Science', 'সাধারণ বিজ্ঞান', 'सामान्य विज्ञान'), 25, 1),
          section('gs', L('Current Events of National & International Importance', 'জাতীয় ও আন্তর্জাতিক গুরুত্বপূর্ণ সাম্প্রতিক ঘটনা', 'राष्ट्रीय और अंतरराष्ट्रीय महत्व की सामयिक घटनाएँ'), 25, 1),
          section('gs', L('History of India', 'ভারতের ইতিহাস', 'भारत का इतिहास'), 25, 1),
          section('gs', L('Geography of India (with special reference to West Bengal)', 'ভারতের ভূগোল (পশ্চিমবঙ্গের বিশেষ উল্লেখসহ)', 'भारत का भूगोल (पश्चिम बंगाल के विशेष संदर्भ में)'), 25, 1),
          section('gs', L('Indian Polity & Economy', 'ভারতীয় রাষ্ট্রব্যবস্থা ও অর্থনীতি', 'भारतीय राजव्यवस्था और अर्थव्यवस्था'), 25, 1),
          section('gs', L('Indian National Movement', 'ভারতের জাতীয় আন্দোলন', 'भारतीय राष्ट्रीय आंदोलन'), 25, 1),
          section('reasoning', L('General Mental Ability', 'সাধারণ মানসিক দক্ষতা', 'सामान्य मानसिक योग्यता'), 25, 1, undefined, {
            note: L('Includes arithmetic: practise Quantitative Aptitude too', 'পাটিগণিতও থাকে: পরিমাণগত দক্ষতাও অনুশীলন করুন', 'अंकगणित भी शामिल: मात्रात्मक योग्यता का भी अभ्यास करें'),
          }),
        ],
      },
    ],
    next_stages: [L('Mains', 'মেইনস', 'मुख्य परीक्षा'), L('Personality test', 'পার্সোনালিটি টেস্ট', 'व्यक्तित्व परीक्षण')],
    notes: L(
      'WBCS 2025 has been announced (Advt 03/2025); exam dates are not out yet. WBPSC publishes vacancies later, so none are shown here.',
      'WBCS ২০২৫ ঘোষিত (বিজ্ঞাপন ০৩/২০২৫); পরীক্ষার তারিখ এখনও প্রকাশিত হয়নি। WBPSC শূন্যপদ পরে প্রকাশ করে, তাই এখানে দেখানো হয়নি।',
      'WBCS 2025 घोषित (विज्ञापन 03/2025); परीक्षा तिथियाँ अभी नहीं आईं। WBPSC रिक्तियाँ बाद में प्रकाशित करता है, इसलिए यहाँ नहीं दिखाई गईं।',
    ),
    cycles: [
      {
        year: 2024,
        stage: L('Prelims (Advt 08/2024)', 'প্রিলিমস (বিজ্ঞাপন ০৮/২০২৪)', 'प्रारंभिक (विज्ञापन 08/2024)'),
        dates: '14 Jun 2026',
        source_url: 'https://psc.wb.gov.in/Download?param1=202606241652_WBCS_24_Prelim_AK.pdf&param2=advertisement',
      },
      {
        year: 2023,
        stage: L('Prelims (Advt 01/2023)', 'প্রিলিমস (বিজ্ঞাপন ০১/২০২৩)', 'प्रारंभिक (विज्ञापन 01/2023)'),
        dates: '16 Dec 2023',
        note: L('Postponed more than once before it was held.', 'অনুষ্ঠিত হওয়ার আগে একাধিকবার পিছিয়েছে।', 'आयोजन से पहले कई बार स्थगित हुई।'),
        source_url: 'https://psc.wb.gov.in/Download?param1=202405281450_AnsWbcs2023.pdf&param2=advertisement',
      },
    ],
  },

  WBPSC_CLERKSHIP: {
    full_name: L('WBPSC Clerkship Examination', 'WBPSC ক্লার্কশিপ পরীক্ষা', 'WBPSC क्लर्कशिप परीक्षा'),
    pattern_as_of: 'Clerkship 2024 scheme (Advt 12/2024)',
    source_url: 'https://psc.wb.gov.in/Download?param1=Clerkship2024-SchemeSyllabus.pdf&param2=advertisement',
    stages: [
      {
        tier: 'PRELIMS',
        name: L('Part-I (objective)', 'পার্ট-I (অবজেক্টিভ)', 'भाग-I (वस्तुनिष्ठ)'),
        mode: 'OMR',
        duration_min: 90,
        sections: [
          section('english', L('English', 'ইংরেজি', 'अंग्रेज़ी'), 30, 1, 0.25),
          section('gs', L('General Studies', 'সাধারণ পাঠ', 'सामान्य अध्ययन'), 40, 1, 0.25),
          section('quant', L('Arithmetic', 'পাটিগণিত', 'अंकगणित'), 30, 1, 0.25),
        ],
      },
    ],
    next_stages: [
      L('Part-II (written: English + Bengali/Hindi/Urdu/Nepali/Santali)', 'পার্ট-II (লিখিত: ইংরেজি + বাংলা/হিন্দি/উর্দু/নেপালি/সাঁওতালি)', 'भाग-II (लिखित: अंग्रेज़ी + बांग्ला/हिन्दी/उर्दू/नेपाली/संथाली)'),
      L('Computer & typing test', 'কম্পিউটার ও টাইপিং টেস্ট', 'कंप्यूटर और टाइपिंग टेस्ट'),
    ],
    notes: L(
      'Clerkship 2024: applications 6–26 Oct 2026; Part-I is tentatively in December 2026. Eligibility: Madhyamik + typing.',
      'ক্লার্কশিপ ২০২৪: আবেদন ৬–২৬ অক্টোবর ২০২৬; পার্ট-I সম্ভবত ডিসেম্বর ২০২৬-এ। যোগ্যতা: মাধ্যমিক + টাইপিং।',
      'क्लर्कशिप 2024: आवेदन 6–26 अक्टूबर 2026; भाग-I संभवतः दिसंबर 2026 में। योग्यता: माध्यमिक + टाइपिंग।',
    ),
    cycles: [
      {
        year: 2023,
        stage: L('Part-I (Advt 13/2023)', 'পার্ট-I (বিজ্ঞাপন ১৩/২০২৩)', 'भाग-I (विज्ञापन 13/2023)'),
        dates: '16–17 Nov 2024',
        source_url: 'https://psc.wb.gov.in/Download?param1=202412270241_Session-I.pdf&param2=advertisement',
      },
    ],
  },

  WBPSC_MISC: {
    full_name: L('WBPSC Miscellaneous Services Recruitment Examination', 'WBPSC মিসলেনিয়াস সার্ভিসেস রিক্রুটমেন্ট পরীক্ষা', 'WBPSC मिसलेनियस सर्विसेज़ भर्ती परीक्षा'),
    pattern_as_of: 'Miscellaneous 2024 scheme (Advt 13/2024)',
    source_url: 'https://psc.wb.gov.in/Download?param1=20260425210212_SCHEME_SYLLABUS_13_2024.pdf&param2=advertisement',
    stages: [
      {
        tier: 'PRELIMS',
        name: PRELIMS,
        mode: 'OFFLINE',
        duration_min: 90,
        negative_note: L('Yes; the notice does not state the amount', 'আছে; পরিমাণ বিজ্ঞপ্তিতে উল্লেখ নেই', 'है; राशि अधिसूचना में नहीं'),
        note: L(
          'Screening only; prelims marks do not count in the final merit.',
          'শুধু বাছাইয়ের জন্য; প্রিলিমসের নম্বর চূড়ান্ত মেধায় যোগ হয় না।',
          'केवल छँटनी के लिए; प्रारंभिक अंक अंतिम मेरिट में नहीं जुड़ते।',
        ),
        sections: [
          section('gs', L('General Studies', 'সাধারণ পাঠ', 'सामान्य अध्ययन'), 75, 2),
          section('quant', L('Arithmetic', 'পাটিগণিত', 'अंकगणित'), 25, 2),
        ],
      },
    ],
    next_stages: [L('Final written exam (3 papers)', 'চূড়ান্ত লিখিত পরীক্ষা (৩টি পত্র)', 'अंतिम लिखित परीक्षा (3 पत्र)'), L('Personality test', 'পার্সোনালিটি টেস্ট', 'व्यक्तित्व परीक्षण')],
    cycles: [
      {
        year: 2024,
        stage: L('Prelims (Advt 13/2024)', 'প্রিলিমস (বিজ্ঞাপন ১৩/২০২৪)', 'प्रारंभिक (विज्ञापन 13/2024)'),
        dates: '4 Oct 2026',
        source_url: 'https://psc.wb.gov.in/Download?param1=An_20260903195017_Imp_Announcement_Admitcard_MSRE_2024.pdf&param2=advertisement',
      },
      {
        year: 2023,
        stage: PRELIMS,
        dates: '15 Sep 2024',
        source_url: 'https://psc.wb.gov.in/Download?param1=202503171627_Final_Ans_Key_Miscellaneous_Preli_2023.pdf&param2=advertisement',
      },
    ],
  },

  // ------------------------------------------------------------- WB Post
  WB_POST_GDS: {
    full_name: L('Gramin Dak Sevak (GDS) Engagement, West Bengal Circle', 'গ্রামীণ ডাক সেবক (GDS), পশ্চিমবঙ্গ সার্কেল', 'ग्रामीण डाक सेवक (GDS), पश्चिम बंगाल सर्कल'),
    source_url: 'https://www.indiapost.gov.in/gdsonlineengagement/pdf/descriptive-notification.pdf',
    pattern_as_of: 'GDS notification of 20 Aug 2026',
    selection_note: L(
      'There is no written exam. Selection is on a merit list made from Class 10 (Madhyamik) marks, and you must know the local language (Bengali; Nepali in the hill areas). Our GK, maths and English practice still helps with the departmental exams GDS can take later.',
      'কোনো লিখিত পরীক্ষা নেই। দশম শ্রেণির (মাধ্যমিক) নম্বরের মেধা তালিকায় নির্বাচন, এবং স্থানীয় ভাষা (বাংলা; পাহাড়ে নেপালি) জানা আবশ্যক। পরে GDS যে বিভাগীয় পরীক্ষা দিতে পারেন, তার জন্য আমাদের সাধারণ জ্ঞান, গণিত ও ইংরেজি অনুশীলন কাজে লাগে।',
      'कोई लिखित परीक्षा नहीं। चयन कक्षा 10 (माध्यमिक) के अंकों की मेरिट सूची से, और स्थानीय भाषा (बांग्ला; पहाड़ में नेपाली) आवश्यक। बाद में GDS जो विभागीय परीक्षाएँ दे सकते हैं, उनके लिए हमारा सामान्य ज्ञान, गणित और अंग्रेज़ी अभ्यास उपयोगी है।',
    ),
    next_stages: [L('Document verification', 'নথি যাচাই', 'दस्तावेज़ सत्यापन'), L('Engagement', 'নিয়োগ', 'नियुक्ति')],
    cycles: [
      {
        year: 2026,
        stage: L('Schedule-II, July 2026 (merit list)', 'শিডিউল-II, জুলাই ২০২৬ (মেধা তালিকা)', 'शेड्यूल-II, जुलाई 2026 (मेरिट सूची)'),
        dates: 'Applications 2–21 Sep 2026',
        vacancies: 1762,
        vacancies_note: L('West Bengal Circle, tentative', 'পশ্চিমবঙ্গ সার্কেল, সম্ভাব্য', 'पश्चिम बंगाल सर्कल, संभावित'),
        source_url: 'https://www.indiapost.gov.in/gdsonlineengagement/pdf/Annexure-Ia.pdf',
      },
    ],
  },

  WB_POST_POSTMAN: {
    full_name: L('Postman / Mail Guard, West Bengal Circle', 'পোস্টম্যান / মেল গার্ড, পশ্চিমবঙ্গ সার্কেল', 'पोस्टमैन / मेल गार्ड, पश्चिम बंगाल सर्कल'),
    source_url: 'https://westbengalpost.gov.in/RECRUITMENT',
    selection_note: L(
      'Not open to the public. The West Bengal Circle fills these posts through departmental exams that only serving Gramin Dak Sevaks (with 5 years’ engagement) and departmental MTS staff can take.',
      'সাধারণের জন্য খোলা নয়। পশ্চিমবঙ্গ সার্কেল এই পদ বিভাগীয় পরীক্ষায় পূরণ করে, যা শুধু কর্মরত গ্রামীণ ডাক সেবক (৫ বছরের কাজ) ও বিভাগীয় MTS কর্মীরা দিতে পারেন।',
      'आम जनता के लिए खुली नहीं। पश्चिम बंगाल सर्कल ये पद विभागीय परीक्षा से भरता है, जो केवल कार्यरत ग्रामीण डाक सेवक (5 वर्ष) और विभागीय MTS कर्मचारी दे सकते हैं।',
    ),
    cycles: [
      {
        year: 2026,
        stage: L('Departmental exam (Papers I–III)', 'বিভাগীয় পরীক্ষা (পত্র I–III)', 'विभागीय परीक्षा (पत्र I–III)'),
        dates: '12 Jul 2026; data entry test 23–26 Sep 2026',
        source_url: 'https://westbengalpost.gov.in/RECRUITMENT',
      },
      {
        year: 2025,
        stage: L('Departmental exam (Papers I–III)', 'বিভাগীয় পরীক্ষা (পত্র I–III)', 'विभागीय परीक्षा (पत्र I–III)'),
        dates: '31 Aug 2025; data entry test 7 Oct 2025',
        source_url: 'https://westbengalpost.gov.in/technology/docs/RECRUITMENT1758086580cb9fc1d5e1210a6c013739e13c5291de.pdf',
      },
    ],
  },

  WB_POST_MTS: {
    full_name: L('Multi-Tasking Staff, West Bengal Postal Circle', 'মাল্টি-টাস্কিং স্টাফ, পশ্চিমবঙ্গ ডাক সার্কেল', 'मल्टी-टास्किंग स्टाफ, पश्चिम बंगाल डाक सर्कल'),
    source_url: 'https://westbengalpost.gov.in/RECRUITMENT',
    selection_note: L(
      'Not open to the public. Postal MTS posts are filled by a departmental exam for Gramin Dak Sevaks with 3 years of regular engagement.',
      'সাধারণের জন্য খোলা নয়। ডাক বিভাগের MTS পদ ৩ বছর নিয়মিত কাজ করা গ্রামীণ ডাক সেবকদের বিভাগীয় পরীক্ষায় পূরণ হয়।',
      'आम जनता के लिए खुली नहीं। डाक MTS पद 3 वर्ष नियमित कार्यरत ग्रामीण डाक सेवकों की विभागीय परीक्षा से भरे जाते हैं।',
    ),
    cycles: [
      {
        year: 2026,
        stage: L('Departmental exam', 'বিভাগীয় পরীক্ষা', 'विभागीय परीक्षा'),
        dates: '12 Jul 2026',
        source_url: 'https://westbengalpost.gov.in/RECRUITMENT',
      },
      {
        year: 2025,
        stage: L('Departmental exam (GDS to MTS)', 'বিভাগীয় পরীক্ষা (GDS থেকে MTS)', 'विभागीय परीक्षा (GDS से MTS)'),
        dates: '31 Aug 2025',
        source_url: 'https://westbengalpost.gov.in/technology/docs/RECRUITMENT176499461019764ac79daf62009c19014e0f8c9c93.pdf',
      },
    ],
  },
};
