'use strict';

// Industrial Scenario of West Bengal. Every fact used here is in the verified
// GK library (db/gk/wb_industry.jsonl; sources checked 2026-11-09 against
// sail.co.in, wbidc.com, wbsidcl.in, wb.gov.in, wbmsmet.gov.in, pib.gov.in and
// the Syama Prasad Mookerjee Port authority).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'wb_industry',
  patterns: [
    {
      key: 'place_industry_anchor_map',
      emoji: '🗺️',
      name: t('Learn industry by place anchors', 'স্থান-নোঙর ধরে শিল্প শেখা'),
      spot: t(
        'A direct question asking which place is known for which industry, or a match table of places and industries in West Bengal.',
        'কোন স্থান কোন শিল্পের জন্য পরিচিত তা জানতে চাওয়া সরাসরি প্রশ্ন, অথবা পশ্চিমবঙ্গের স্থান ও শিল্প মেলানোর ছক।',
      ),
      method: [
        t('River-belt anchors: Rishra–jute (first mill, 1855), Howrah–foundry and engineering, Haldia–port and petrochemicals.', 'নদীবেল্টের নোঙর: রিশরা–পাট (প্রথম মিল, ১৮৫৫), হাওড়া–ফাউন্ড্রি ও ইঞ্জিনিয়ারিং, হলদিয়া–বন্দর ও পেট্রোরসায়ন।'),
        t('Inland anchors: Durgapur and Burnpur–steel in the Damodar valley; Bantala (east Kolkata)–leather; Darjeeling hills–tea.', 'অভ্যন্তরের নোঙর: দুর্গাপুর ও বার্নপুর–দামোদর উপত্যকায় ইস্পাত; বাঁতলা (পূর্ব কলকাতা)–চামড়া; দার্জিলিং পাহাড়–চা।'),
        t('New-economy anchor: Sector V, Salt Lake–IT, extending to the Bengal Silicon Valley in New Town.', 'নতুন অর্থনীতির নোঙর: সল্টলেকের সেক্টর ৫–আইটি, যা প্রসারিত নিউ টাউনের বেঙ্গল সিলিকন ভ্যালি পর্যন্ত।'),
      ],
      example: {
        question: t('Haldia, at the confluence of the Haldi and the Hooghly, is best known as West Bengal\'s hub for:', 'হলদি ও হুগলি নদীর সঙ্গমে অবস্থিত হলদিয়া পশ্চিমবঙ্গের কোন শিল্পের কেন্দ্র হিসেবে সবচেয়ে পরিচিত?'),
        steps: [
          t('Fix the anchor first: Haldia = the deep-draft dock of Kolkata port plus the refinery–petrochemical complex built beside it.', 'আগে নোঙরটি ঠিক করো: হলদিয়া = কলকাতা বন্দরের গভীর-জল ডক এবং তার পাশে গড়ে ওঠা শোধনাগার–পেট্রোরসায়ন চত্বর।'),
          t('Haldia Petrochemicals (HPL) began commercial production there in 2000, so the industry is petrochemicals.', 'হলদিয়া পেট্রোকেমিক্যালস (HPL) ২০০০ সালে সেখানে বাণিজ্যিক উৎপাদন শুরু করে, তাই শিল্পটি পেট্রোরসায়ন।'),
        ],
        answer: t('Petrochemicals', 'পেট্রোরসায়ন'),
      },
      tryIt: {
        question: t('The Kolkata Leather Complex is located at:', 'কলকাতা লেদার কমপ্লেক্স অবস্থিত:'),
        options: [t('Bantala', 'বাঁতলা'), t('Rishra', 'রিশরা'), t('Durgapur', 'দুর্গাপুর'), t('Haldia', 'হলদিয়া')],
        correct: 0,
        explanation: [
          t('The leather complex stands at Karaidanga, Bantala in east Kolkata — Asia\'s largest integrated leather complex.', 'চামড়া চত্বরটি পূর্ব কলকাতার বাঁতলার কারাইদাঙ্গায় — এশিয়ার বৃহত্তম সংযুক্ত চামড়া চত্বর।'),
          t('Rishra is jute, Durgapur is steel and Haldia is petrochemicals — the other anchors of the map.', 'রিশরা পাট, দুর্গাপুর ইস্পাত ও হলদিয়া পেট্রোরসায়ন — মানচিত্রের বাকি নোঙরগুলি।'),
        ],
      },
      difficulty: 'beginner',
    },
    {
      key: 'sister_corporation_swap',
      emoji: '🔀',
      name: t('The sister-corporation swap: WBIDC vs WBSIDC', 'সহযোগী নিগমের বদল: WBIDC বনাম WBSIDC'),
      spot: t(
        'The question names one of the two State industrial corporations but the options swap their founding years, departments or mandates.',
        'প্রশ্নে রাজ্যের দুই শিল্প নিগমের একটির নাম থাকে, কিন্তু বিকল্পগুলিতে তাদের প্রতিষ্ঠার বছর, দপ্তর বা দায়িত্ব বদলে দেওয়া হয়।',
      ),
      method: [
        t('WBIDC: formed 1967, under Industry, Commerce and Enterprises — investment, infrastructure and medium/large industry; it is the State\'s premier nodal agency.', 'WBIDC: গঠন ১৯৬৭, শিল্প, বাণিজ্য ও উদ্যোগ দপ্তরের অধীনে — বিনিয়োগ, পরিকাঠামো ও মাঝারি/বড় শিল্প; এটি রাজ্যের প্রধান নোডাল সংস্থা।'),
        t('WBSIDC: formed 1961 — the older body — under MSME & Textiles; the S stands for Small: MSME promotion and 54 industrial/commercial estates.', 'WBSIDC: গঠন ১৯৬১ — পুরনো সংস্থা — MSME ও বস্ত্র দপ্তরের অধীনে; S মানে Small: MSME প্রসার ও ৫৪টি শিল্প/বাণিজ্যিক এস্টেট।'),
        t('Field administration is a third line, not a corporation: Directorate of MSME → District Industries Centres → Industrial Development Officers at block level.', 'মাঠ প্রশাসন তৃতীয় একটি ধারা, কোনো নিগম নয়: MSME অধিদপ্তর → জেলা শিল্প কেন্দ্র → ব্লক স্তরে শিল্প উন্নয়ন আধিকারিক।'),
      ],
      example: {
        question: t('Which corporation was established in 1961 to promote micro, small and medium enterprises in West Bengal?', 'পশ্চিমবঙ্গে ক্ষুদ্র, ছোট ও মাঝারি উদ্যোগের প্রসারে ১৯৬১ সালে কোন নিগম প্রতিষ্ঠিত হয়?'),
        steps: [
          t('Two anchors in the stem: the year 1961 and the MSME mandate. Both point to the small-industries body.', 'প্রশ্নে দুটি নোঙর: বছর ১৯৬১ ও MSME-র দায়িত্ব। দুটোই ক্ষুদ্র শিল্পের সংস্থার দিকে ইঙ্গিত করে।'),
          t('That is WBSIDC; WBIDC (1967) handles larger industry and investment.', 'সেটি WBSIDC; WBIDC (১৯৬৭) বড় শিল্প ও বিনিয়োগ দেখে।'),
        ],
        answer: t('WBSIDC', 'WBSIDC (পশ্চিমবঙ্গ ক্ষুদ্র শিল্প উন্নয়ন নিগম)'),
      },
      difficulty: 'intermediate',
      trap: t('Most candidates assume the bigger body is older. It is not: WBSIDC (1961) predates WBIDC (1967) by six years.', 'অধিকাংশ প্রার্থী ধরে নেয় বড় সংস্থাটাই পুরনো। তা নয়: WBSIDC (১৯৬১) WBIDC-র (১৯৬৭) চেয়ে ছয় বছরের পুরনো।'),
    },
    {
      key: 'msme_limit_ladder',
      emoji: '🪜',
      name: t('The MSME limit ladder (2025)', 'MSME সীমার সিঁড়ি (২০২৫)'),
      spot: t(
        'A question quoting one figure of the MSME definition — an investment or turnover ceiling for micro, small or medium — often with the pre-2025 figure as a distractor.',
        'MSME সংজ্ঞার একটি অঙ্ক নিয়ে প্রশ্ন — মাইক্রো, ছোট বা মাঝারি শ্রেণির বিনিয়োগ বা টার্নোভারের ঊর্ধ্বসীমা — যেখানে প্রায়ই ২০২৫-এর আগের অঙ্কটি ফাঁদ হিসেবে থাকে।',
      ),
      method: [
        t('Climb the ladder in pairs (investment / turnover): micro ₹2.5 cr / ₹10 cr → small ₹25 cr / ₹100 cr → medium ₹125 cr / ₹500 cr.', 'জোড়ায় জোড়ায় সিঁড়ি ওঠো (বিনিয়োগ / টার্নোভার): মাইক্রো ₹২.৫ কোটি / ₹১০ কোটি → ছোট ₹২৫ কোটি / ₹১০০ কোটি → মাঝারি ₹১২৫ কোটি / ₹৫০০ কোটি।'),
        t('The 2025 revision (Notification S.O. 1364(E), effective 1 April 2025) multiplied investment ceilings by 2.5 and turnover ceilings by 2 over the 2020 figures.', '২০২৫-এর সংশোধন (বিজ্ঞপ্তি S.O. 1364(E), কার্যকর ১ এপ্রিল ২০২৫) ২০২০-র অঙ্কের তুলনায় বিনিয়োগের সীমা ২.৫ গুণ ও টার্নোভারের সীমা ২ গুণ করেছে।'),
        t('The test is composite: cross either ceiling and the enterprise climbs to the next class; exports are left out of turnover.', 'মাপকাঠি যৌগিক: যেকোনো একটি সীমা ছাড়ালেই উদ্যোগ পরের শ্রেণিতে ওঠে; টার্নোভারে রপ্তানি ধরা হয় না।'),
      ],
      example: {
        question: t('From 1 April 2025, the investment ceiling for a small enterprise is:', '১ এপ্রিল ২০২৫ থেকে ছোট উদ্যোগের বিনিয়োগের ঊর্ধ্বসীমা:'),
        steps: [
          t('Stand on the ladder: small is the middle step, between micro (₹2.5 crore) and medium (₹125 crore).', 'সিঁড়িতে দাঁড়াও: ছোট হল মাঝের ধাপ, মাইক্রো (₹২.৫ কোটি) ও মাঝারির (₹১২৫ কোটি) মাঝখানে।'),
          t('The middle investment figure is ₹25 crore — ₹10 crore was the pre-2025 ceiling.', 'মাঝের বিনিয়োগের অঙ্ক ₹২৫ কোটি — ₹১০ কোটি ছিল ২০২৫-এর আগের সীমা।'),
        ],
        answer: t('₹25 crore', '₹২৫ কোটি'),
      },
      tryIt: {
        question: t('Under the 2025 limits, a micro enterprise may have annual turnover up to:', '২০২৫-এর সীমায় মাইক্রো উদ্যোগের বার্ষিক টার্নোভার হতে পারে সর্বোচ্চ:'),
        options: [t('₹5 crore', '₹৫ কোটি'), t('₹10 crore', '₹১০ কোটি'), t('₹25 crore', '₹২৫ কোটি'), t('₹100 crore', '₹১০০ কোটি')],
        correct: 1,
        explanation: [
          t('Micro turnover doubled in 2025, from ₹5 crore to ₹10 crore.', 'মাইক্রো টার্নোভার ২০২৫-এ দ্বিগুণ হয়েছে, ₹৫ কোটি থেকে ₹১০ কোটি।'),
          t('₹25 crore is the small-enterprise investment ceiling and ₹100 crore its turnover ceiling — neighbouring steps of the ladder.', '₹২৫ কোটি ছোট উদ্যোগের বিনিয়োগের সীমা ও ₹১০০ কোটি তার টার্নোভারের সীমা — সিঁড়ির পাশের ধাপগুলি।'),
        ],
      },
      difficulty: 'intermediate',
    },
    {
      key: 'scheme_figure_grid',
      emoji: '🔢',
      name: t('Scheme figures: keep the grid separate', 'প্রকল্পের অঙ্ক: ছক আলাদা রাখো'),
      spot: t(
        'A question on a State MSME scheme — Bhabishyat Credit Card, Silpasathi or Shilper Samadhane — where the wrong options borrow a figure from a neighbouring cell of the same scheme.',
        'রাজ্যের MSME প্রকল্প নিয়ে প্রশ্ন — ভবিষ্যৎ ক্রেডিট কার্ড, শিল্পসাথী বা শিল্পের সমাধানে — যেখানে ভুল বিকল্পগুলি একই প্রকল্পের পাশের ঘর থেকে অঙ্ক ধার করে।',
      ),
      method: [
        t('Bhabishyat grid: loan ceiling ₹5 lakh per beneficiary; margin-money subsidy 10% of project cost capped at ₹25,000; borrower interest about 4% a year; age 18–55; launched 2023, replacing Karmasathi Prakalpa.', 'ভবিষ্যৎ ছক: ঋণের ঊর্ধ্বসীমা প্রতি সুবিধাভোগী ₹৫ লক্ষ; মার্জিন মানি ভর্তুকি প্রকল্প ব্যয়ের ১০%, সর্বোচ্চ ₹২৫,০০০; ঋণগ্রহীতার সুদ বার্ষিক প্রায় ৪%; বয়স ১৮–৫৫; চালু ২০২৩ সালে, কর্মসাথী প্রকল্পের পরিবর্তে।'),
        t('Silpasathi is not a money scheme at all: it is the online single-window portal — remember CAF, Common Application Form.', 'শিল্পসাথী কোনো অর্থের প্রকল্পই নয়: এটি অনলাইন সিঙ্গল-উইন্ডো পোর্টাল — মনে রাখো CAF, কমন অ্যাপ্লিকেশন ফর্ম।'),
        t('Shilper Samadhane is the offline twin: camps at blocks, municipalities and KMC wards; 2025 targets — 2 lakh Bhabishyat applications sponsored, 5 lakh artisans and weavers enlisted.', 'শিল্পের সমাধানে হল অফলাইন যমজ: ব্লক, পৌরসভা ও KMC ওয়ার্ডে শিবির; ২০২৫-এর লক্ষ্য — ২ লক্ষ ভবিষ্যৎ আবেদন ব্যাংকে পাঠানো, ৫ লক্ষ কারিগর ও তাঁতির তালিকাভুক্তি।'),
      ],
      example: {
        question: t('Under the Bhabishyat Credit Card Scheme, the margin-money subsidy is capped at:', 'ভবিষ্যৎ ক্রেডিট কার্ড প্রকল্পে মার্জিন মানি ভর্তুকির ঊর্ধ্বসীমা:'),
        steps: [
          t('Separate the cells: ₹5 lakh is the LOAN ceiling, not the subsidy. The subsidy is 10% of project cost with its own cap.', 'ঘরগুলি আলাদা করো: ₹৫ লক্ষ হল ঋণের ঊর্ধ্বসীমা, ভর্তুকির নয়। ভর্তুকি প্রকল্প ব্যয়ের ১০%, যার আলাদা ঊর্ধ্বসীমা আছে।'),
          t('That cap is ₹25,000 per beneficiary.', 'সেই ঊর্ধ্বসীমা প্রতি সুবিধাভোগী ₹২৫,০০০।'),
        ],
        answer: t('₹25,000', '₹২৫,০০০'),
      },
      difficulty: 'intermediate',
      trap: t('Many websites wrongly print the Bhabishyat age band as 18–45. The MSME & Textiles Department\'s scheme page says 18–55 — trust the department, not the blogs.', 'অনেক ওয়েবসাইটে ভবিষ্যৎ-এর বয়সসীমা ভুল করে ১৮–৪৫ ছাপা থাকে। MSME ও বস্ত্র দপ্তরের প্রকল্প পৃষ্ঠায় আছে ১৮–৫৫ — ব্লগ নয়, দপ্তরকেই বিশ্বাস করো।'),
    },
    {
      key: 'matched_pair_industry_wb',
      emoji: '✅',
      name: t('Correctly matched pair (West Bengal industry)', 'সঠিকভাবে মেলানো জোড় (পশ্চিমবঙ্গের শিল্প)'),
      spot: t(
        'Four pairs — place–industry, body–year, scheme–figure — of which only one is fully correct; each wrong pair borrows an element from a neighbouring fact of this chapter.',
        'চারটি জোড় — স্থান–শিল্প, সংস্থা–বছর, প্রকল্প–অঙ্ক — যার মাত্র একটি পুরোপুরি সঠিক; প্রতিটি ভুল জোড় এই অধ্যায়ের পাশের তথ্য থেকে একটি উপাদান ধার করে।',
      ),
      method: [
        t('Check the pair element by element: place first, then the body or scheme, then the year or figure — a pair fails if any one element is off.', 'জোড়টি উপাদান ধরে ধরে যাচাই করো: আগে স্থান, তারপর সংস্থা বা প্রকল্প, শেষে বছর বা অঙ্ক — একটি উপাদান ভুল হলেই জোড় ব্যর্থ।'),
        t('The favourite swaps: WBIDC 1967 ↔ WBSIDC 1961; Bantala leather ↔ Howrah foundry; Bhabishyat loan ₹5 lakh ↔ subsidy cap ₹25,000.', 'প্রিয় বদলগুলি: WBIDC ১৯৬৭ ↔ WBSIDC ১৯৬১; বাঁতলা চামড়া ↔ হাওড়া ফাউন্ড্রি; ভবিষ্যৎ ঋণ ₹৫ লক্ষ ↔ ভর্তুকির সীমা ₹২৫,০০০।'),
        t('For NOT-matched questions, look for the pair built from two true halves of different facts — e.g. Sector V (a true IT hub) paired with leather (a true industry, but of Bantala).', 'মেলেনি-জাতীয় প্রশ্নে সেই জোড়টি খোঁজো যা দুটি আলাদা তথ্যের সত্য অর্ধেক জোড়া দিয়ে তৈরি — যেমন সেক্টর ৫ (সত্যিকারের আইটি হাব) চামড়ার সঙ্গে (সত্যিকারের শিল্প, কিন্তু বাঁতলার)।'),
      ],
      example: {
        question: t('Which of the following pairs is NOT correctly matched? (a) Rishra – jute (b) Durgapur – steel (c) Sector V – leather (d) Haldia – petrochemicals', 'নিচের কোন জোড়টি সঠিকভাবে মেলেনি? (ক) রিশরা – পাট (খ) দুর্গাপুর – ইস্পাত (গ) সেক্টর ৫ – চামড়া (ঘ) হলদিয়া – পেট্রোরসায়ন'),
        steps: [
          t('Rishra–jute, Durgapur–steel and Haldia–petrochemicals are all true anchors of the map.', 'রিশরা–পাট, দুর্গাপুর–ইস্পাত ও হলদিয়া–পেট্রোরসায়ন — সবকটিই মানচিত্রের সত্য নোঙর।'),
          t('Sector V is the IT hub; leather belongs to Bantala. So (c) is the unmatched pair.', 'সেক্টর ৫ আইটি হাব; চামড়া বাঁতলার। তাই (গ) হল বেমানান জোড়।'),
        ],
        answer: t('Sector V – leather', 'সেক্টর ৫ – চামড়া'),
      },
      difficulty: 'advanced',
    },
  ],
};
