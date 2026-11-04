'use strict';

// Headquarters & Organisations. Every fact used here is in the verified GK
// library (db/gk/organisations.jsonl; heads verified 2026-11-04 against
// official sources — un.org, unesco.org, wto.org, rbi.org.in, sebi.gov.in).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'organisations',
  patterns: [
    {
      key: 'city_cluster_anchor',
      emoji: '🏙️',
      name: t('Learn headquarters by city cluster', 'শহরের গুচ্ছ ধরে সদর দপ্তর শেখা'),
      spot: t(
        'A direct question asking where an organisation is headquartered, or a match table of organisations and cities.',
        'কোনো সংস্থার সদর দপ্তর কোথায় তা জানতে চাওয়া সরাসরি প্রশ্ন, অথবা সংস্থা ও শহর মেলানোর ছক।',
      ),
      method: [
        t('Geneva cluster: ILO, WHO, UNHCR, WMO, ITU, WTO, ICRC — learn them as one block, not seven facts.', 'জেনেভা গুচ্ছ: ILO, WHO, UNHCR, WMO, ITU, WTO, ICRC — সাতটি আলাদা তথ্য নয়, একটাই ব্লক হিসেবে শেখো।'),
        t('Washington DC holds exactly two: the IMF and the World Bank Group. New York holds the UN, UNICEF and UNDP.', 'ওয়াশিংটন ডিসিতে ঠিক দুটি: IMF ও বিশ্ব ব্যাংক গোষ্ঠী। নিউ ইয়র্কে রাষ্ট্রসংঘ, UNICEF ও UNDP।'),
        t('Single-city anchors: UNESCO–Paris, UNEP–Nairobi, IAEA–Vienna, ADB–Manila, NATO–Brussels, Interpol–Lyon.', 'একক-শহরের নোঙর: UNESCO–প্যারিস, UNEP–নাইরোবি, IAEA–ভিয়েনা, ADB–ম্যানিলা, NATO–ব্রাসেলস, Interpol–লিয়ঁ।'),
      ],
      example: {
        question: t('The headquarters of the UN Environment Programme (UNEP) is in:', 'রাষ্ট্রসংঘ পরিবেশ কর্মসূচি (UNEP)-এর সদর দপ্তর:'),
        steps: [
          t('UNEP is not in the Geneva or New York cluster — it is the famous exception.', 'UNEP জেনেভা বা নিউ ইয়র্ক গুচ্ছে নেই — এটি বিখ্যাত ব্যতিক্রম।'),
          t('Since 1972 it has sat in Nairobi, Kenya, the first UN agency HQ in a developing country.', '১৯৭২ থেকে এটি কেনিয়ার নাইরোবিতে, উন্নয়নশীল দেশে প্রথম রাষ্ট্রসংঘ সংস্থার সদর দপ্তর।'),
        ],
        answer: t('Nairobi', 'নাইরোবি'),
      },
      tryIt: {
        question: t('Which organisation is headquartered in Lyon, France?', 'কোন সংস্থার সদর দপ্তর ফ্রান্সের লিয়ঁতে?'),
        options: [t('UNESCO', 'UNESCO'), t('Interpol', 'Interpol'), t('FAO', 'FAO'), t('OECD', 'OECD')],
        correct: 1,
        explanation: [
          t('Interpol\'s General Secretariat is in Lyon; it was founded in Vienna in 1923.', 'Interpol-এর সাধারণ সচিবালয় লিয়ঁতে; প্রতিষ্ঠা ১৯২৩-এ ভিয়েনায়।'),
          t('UNESCO and the OECD are in Paris, and FAO is in Rome.', 'UNESCO ও OECD প্যারিসে, FAO রোমে।'),
        ],
      },
      difficulty: 'beginner',
    },
    {
      key: 'founded_vs_seated_trap',
      emoji: '🔀',
      name: t('Founded there, seated elsewhere', 'প্রতিষ্ঠা এক জায়গায়, আসন অন্য জায়গায়'),
      spot: t(
        'The question says "founded at" or the wrong option quietly swaps the founding place for the headquarters city (or the reverse).',
        'প্রশ্নে "প্রতিষ্ঠিত হয়েছিল" বলা থাকে, অথবা ভুল বিকল্পটি চুপিসারে প্রতিষ্ঠার জায়গা ও সদর দপ্তরের শহর বদলে দেয় (বা উল্টোটা)।',
      ),
      method: [
        t('FAO: founded at Quebec City (1945), headquartered in Rome (from 1951).', 'FAO: প্রতিষ্ঠা কেবেক সিটিতে (১৯৪৫), সদর দপ্তর রোমে (১৯৫১ থেকে)।'),
        t('OPEC: founded at Baghdad (1960), headquartered in Vienna (from 1965). NATO: treaty signed in Washington (1949), HQ in Brussels.', 'OPEC: প্রতিষ্ঠা বাগদাদে (১৯৬০), সদর দপ্তর ভিয়েনায় (১৯৬৫ থেকে)। NATO: চুক্তি ওয়াশিংটনে (১৯৪৯), সদর দপ্তর ব্রাসেলসে।'),
        t('RBI: established at Calcutta (1935), moved to Mumbai (1937). Interpol: founded at Vienna (1923), seated at Lyon.', 'RBI: প্রতিষ্ঠা কলকাতায় (১৯৩৫), মুম্বইয়ে সরে যায় ১৯৩৭-এ। Interpol: প্রতিষ্ঠা ভিয়েনায় (১৯২৩), আসন লিয়ঁতে।'),
      ],
      example: {
        question: t('OPEC was founded in 1960 at:', 'OPEC ১৯৬০-তে প্রতিষ্ঠিত হয়েছিল:'),
        steps: [
          t('The stem asks where it was FOUNDED, not where it sits today.', 'প্রশ্নে জানতে চাওয়া হয়েছে কোথায় প্রতিষ্ঠিত হয়েছিল, আজ কোথায় আছে তা নয়।'),
          t('The founding conference was in Baghdad; the headquarters moved to Vienna in 1965.', 'প্রতিষ্ঠা সম্মেলন বাগদাদে; সদর দপ্তর ১৯৬৫-তে ভিয়েনায় সরে যায়।'),
        ],
        answer: t('Baghdad', 'বাগদাদ'),
      },
      difficulty: 'intermediate',
      trap: t('If the stem says "headquartered", Vienna is right for OPEC; if it says "founded", Baghdad is right. Read the verb before the city.', 'প্রশ্নে "সদর দপ্তর" থাকলে OPEC-র উত্তর ভিয়েনা; "প্রতিষ্ঠা" থাকলে বাগদাদ। শহরের আগে ক্রিয়াপদটি পড়ো।'),
    },
    {
      key: 'matched_pair_organisations',
      emoji: '✅',
      name: t('Correctly matched pair (organisations)', 'সঠিকভাবে মেলানো জোড় (সংস্থা)'),
      spot: t(
        'Four organisation–city (or organisation–year, organisation–head) pairs, only one fully correct; wrong pairs borrow a city or year from a similar body.',
        'চারটি সংস্থা–শহর (বা সংস্থা–বছর, সংস্থা–প্রধান) জোড়, মাত্র একটি পুরোপুরি সঠিক; ভুল জোড়গুলি কাছাকাছি সংস্থার শহর বা বছর ধার করে।',
      ),
      method: [
        t('Check the city first, then the year, then the head — a pair fails if any one element is off.', 'আগে শহর, তারপর বছর, তারপর প্রধান যাচাই করো — একটি উপাদান ভুল হলেই জোড়টি ব্যর্থ।'),
        t('Eliminate any pair that gives BRICS a headquarters city: BRICS has none; only its bank (NDB, Shanghai) has one.', 'যে জোড় BRICS-কে সদর দপ্তরের শহর দেয় তা বাদ দাও: BRICS-এর কোনো সদর দপ্তর নেই; শুধু এর ব্যাংক (NDB, সাংহাই)-এর আছে।'),
        t('For NOT-matched questions, the false pair is usually the founded-vs-seated swap (OPEC–Baghdad as "headquarters").', 'মেলেনি-জাতীয় প্রশ্নে ভুল জোড়টি সাধারণত প্রতিষ্ঠা বনাম আসনের বদল (OPEC–বাগদাদ কে "সদর দপ্তর" বলা)।'),
      ],
      example: {
        question: t('Which of the following headquarters pairs is NOT correctly matched? (a) UNEP – Nairobi (b) OPEC – Baghdad (c) ADB – Manila (d) Interpol – Lyon', 'নিচের কোন সদর দপ্তরের জোড়টি সঠিকভাবে মেলেনি? (ক) UNEP – নাইরোবি (খ) OPEC – বাগদাদ (গ) ADB – ম্যানিলা (ঘ) Interpol – লিয়ঁ'),
        steps: [
          t('UNEP–Nairobi, ADB–Manila and Interpol–Lyon are all correct headquarters pairs.', 'UNEP–নাইরোবি, ADB–ম্যানিলা ও Interpol–লিয়ঁ সবকটিই সঠিক সদর দপ্তরের জোড়।'),
          t('Baghdad is where OPEC was founded; its headquarters is Vienna, so (b) is the unmatched pair.', 'বাগদাদ OPEC-এর প্রতিষ্ঠার শহর; সদর দপ্তর ভিয়েনা, তাই (খ) বেমানান জোড়।'),
        ],
        answer: t('OPEC – Baghdad', 'OPEC – বাগদাদ'),
      },
      difficulty: 'intermediate',
    },
    {
      key: 'institution_family_years',
      emoji: '🪜',
      name: t('Institution families and their year staircases', 'প্রতিষ্ঠান-পরিবার ও তাদের বছরের সিঁড়ি'),
      spot: t(
        'Match-the-following on the members of one family (World Bank Group, Indian regulators, constitutional bodies) and their founding years.',
        'একটি পরিবারের সদস্যদের (বিশ্ব ব্যাংক গোষ্ঠী, ভারতীয় নিয়ন্ত্রক, সাংবিধানিক সংস্থা) ও তাদের প্রতিষ্ঠার বছর নিয়ে মেলানোর ছক।',
      ),
      method: [
        t('World Bank Group staircase: IBRD 1944 → IFC 1956 → IDA 1960 → ICSID 1966 → MIGA 1988.', 'বিশ্ব ব্যাংক গোষ্ঠীর সিঁড়ি: IBRD ১৯৪৪ → IFC ১৯৫৬ → IDA ১৯৬০ → ICSID ১৯৬৬ → MIGA ১৯৮৮।'),
        t('Indian regulators: NABARD 1982 → SEBI 1988 (statutory 1992) → SIDBI 1990 → IRDAI 1999.', 'ভারতীয় নিয়ন্ত্রক: NABARD ১৯৮২ → SEBI ১৯৮৮ (বিধিবদ্ধ ১৯৯২) → SIDBI ১৯৯০ → IRDAI ১৯৯৯।'),
        t('Constitutional-era anchors: UPSC predecessor 1926, RBI 1935, ECI 1950, DRDO 1958, ISRO 1969, NITI Aayog 2015.', 'সাংবিধানিক যুগের নোঙর: UPSC-র পূর্বসূরি ১৯২৬, RBI ১৯৩৫, ECI ১৯৫০, DRDO ১৯৫৮, ISRO ১৯৬৯, নীতি আয়োগ ২০১৫।'),
      ],
      example: {
        question: t('Which World Bank Group institution was set up in 1960 to give soft loans to the poorest countries?', 'দরিদ্রতম দেশগুলিকে নরম শর্তে ঋণ দিতে ১৯৬০-তে বিশ্ব ব্যাংক গোষ্ঠীর কোন প্রতিষ্ঠান গঠিত হয়?'),
        steps: [
          t('Walk the staircase: 1944 IBRD, 1956 IFC, 1960 — the soft-loan window.', 'সিঁড়ি ধরে হাঁটো: ১৯৪৪ IBRD, ১৯৫৬ IFC, ১৯৬০ — নরম ঋণের জানালা।'),
          t('That is IDA, the International Development Association.', 'সেটি IDA, আন্তর্জাতিক উন্নয়ন সংঘ।'),
        ],
        answer: t('IDA', 'IDA (আন্তর্জাতিক উন্নয়ন সংঘ)'),
      },
      tryIt: {
        question: t('SEBI became a statutory body in:', 'SEBI বিধিবদ্ধ সংস্থা হয়:'),
        options: [t('1988', '১৯৮৮'), t('1992', '১৯৯২'), t('1999', '১৯৯৯'), t('1982', '১৯৮২')],
        correct: 1,
        explanation: [
          t('SEBI was formed in 1988 as a non-statutory body; the SEBI Act gave it statutory powers in 1992.', 'SEBI ১৯৮৮-তে অবিধিবদ্ধ সংস্থা হিসেবে গঠিত হয়; SEBI আইন ১৯৯২-এ বিধিবদ্ধ ক্ষমতা দেয়।'),
          t('1982 is NABARD and 1999 is IRDAI — the neighbouring steps of the staircase.', '১৯৮২ NABARD-এর, ১৯৯৯ IRDAI-এর — সিঁড়ির পাশের ধাপগুলি।'),
        ],
      },
      difficulty: 'intermediate',
    },
    {
      key: 'current_head_date_check',
      emoji: '👤',
      name: t('Current heads — always date-check', 'বর্তমান প্রধান — সবসময় তারিখ যাচাই করো'),
      spot: t(
        'A "who is the present head of X" question, where one option is the previous holder — the classic trap in this chapter.',
        '"X-এর বর্তমান প্রধান কে" জাতীয় প্রশ্ন, যেখানে একটি বিকল্প আগের পদাধিকারী — এই অধ্যায়ের চিরায়ত ফাঁদ।',
      ),
      method: [
        t('UNESCO changed in November 2025: Khaled El-Enany, not Audrey Azoulay. The UN itself changes next: Guterres\'s term ends 31 December 2026.', 'UNESCO বদলেছে নভেম্বর ২০২৫-এ: খালেদ এল-এনানি, অদ্রে আজুলে নন। এরপর বদলাবে রাষ্ট্রসংঘ নিজে: গুতেরেসের মেয়াদ শেষ ৩১ ডিসেম্বর ২০২৬।'),
        t('India\'s 2025 set: RBI Sanjay Malhotra, CEC Gyanesh Kumar, SEBI Tuhin Kanta Pandey, ISRO V. Narayanan, UPSC Ajay Kumar.', 'ভারতের ২০২৫ সেট: RBI সঞ্জয় মালহোত্রা, CEC জ্ঞানেশ কুমার, SEBI তুহিন কান্ত পান্ডে, ISRO ভি. নারায়ণন, UPSC অজয় কুমার।'),
        t('Titles differ: the IMF chief is the Managing Director, the World Bank chief is the President, the WTO/WHO chiefs are Directors-General.', 'পদবি আলাদা: IMF-প্রধান ব্যবস্থাপনা পরিচালক, বিশ্ব ব্যাংক-প্রধান প্রেসিডেন্ট, WTO/WHO-প্রধান মহাপরিচালক।'),
      ],
      example: {
        question: t('Who is the Director-General of UNESCO (as of November 2026)?', 'UNESCO-র মহাপরিচালক কে (নভেম্বর ২০২৬ অনুযায়ী)?'),
        steps: [
          t('Date-check first: UNESCO held an election in 2025, so the pre-2025 name is the trap.', 'আগে তারিখ যাচাই: UNESCO-তে ২০২৫-এ নির্বাচন হয়েছে, তাই ২০২৫-এর আগের নামটাই ফাঁদ।'),
          t('Khaled El-Enany took office on 15 November 2025, succeeding Audrey Azoulay.', 'খালেদ এল-এনানি ১৫ নভেম্বর ২০২৫-এ দায়িত্ব নেন, অদ্রে আজুলের উত্তরসূরি হিসেবে।'),
        ],
        answer: t('Khaled El-Enany', 'খালেদ এল-এনানি'),
      },
      difficulty: 'advanced',
      trap: t('Old GK books still print Azoulay (UNESCO), Shaktikanta Das (RBI), Rajiv Kumar (CEC) and S. Somanath (ISRO). All four left in 2024–25.', 'পুরনো GK বইয়ে এখনো আজুলে (UNESCO), শক্তিকান্ত দাস (RBI), রাজীব কুমার (CEC) ও এস. সোমনাথ (ISRO) ছাপা আছে। চারজনই ২০২৪–২৫-এ পদ ছেড়েছেন।'),
    },
  ],
};
