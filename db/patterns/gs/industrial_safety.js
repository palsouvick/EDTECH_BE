'use strict';

// Industrial Safety & Pollution Control. Every fact used here is in the
// verified GK library (db/gk/industrial_safety.jsonl; verified 2026-11-09
// against the Factories Act text, CPCB, PIB, BIS and ILO sources).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'industrial_safety',
  patterns: [
    {
      key: 'worker_number_ladder',
      emoji: '🪜',
      name: t('Climb the worker-number ladder', 'শ্রমিক-সংখ্যার সিঁড়ি বেয়ে ওঠা'),
      spot: t(
        'A question that gives a factory size (150, 250, 500, 1,200 workers…) and asks what duty, officer or amenity that size triggers under the Factories Act.',
        'এমন প্রশ্ন যেখানে কারখানার আকার দেওয়া থাকে (১৫০, ২৫০, ৫০০, ১,২০০ জন শ্রমিক…) আর জিজ্ঞাসা করা হয় সেই আকারে কারখানা আইনে কোন দায়িত্ব, আধিকারিক বা সুবিধা চালু হয়।',
      ),
      method: [
        t('The gate itself: 10 workers with power or 20 without make a premises a factory (Section 2(m)); the OSH Code, 2020 raises the gate to 20/40.', 'দরজাটাই প্রথম: শক্তিসহ ১০ জন শ্রমিক বা ছাড়া ২০ জন হলেই প্রাঙ্গণ কারখানা (ধারা 2(m)); OSH কোড, ২০২০ দরজাটি ২০/৪০-তে তোলে।'),
        t('Then the rungs: 150 → a first-aid box for every 150; 250 → canteen; 500 → ambulance room and Welfare Officer; 1,000 → Safety Officer.', 'তারপর ধাপগুলি: ১৫০ → প্রতি ১৫০ জনের জন্য প্রাথমিক চিকিৎসার বাক্স; ২৫০ → ক্যান্টিন; ৫০০ → অ্যাম্বুলেন্স কক্ষ ও কল্যাণ আধিকারিক; ১,০০০ → নিরাপত্তা আধিকারিক।'),
        t('Crèche is counted in women, not in total workers: more than 30 women employed (Section 48).', 'ক্রেশ গোনা হয় মহিলাদের সংখ্যায়, মোট শ্রমিকে নয়: ৩০ জনের বেশি মহিলা শ্রমিক থাকলে (ধারা ৪৮)।'),
      ],
      example: {
        question: t('A factory ordinarily employs 600 workers. Which officer must it appoint under the Factories Act, 1948?', 'একটি কারখানায় সাধারণভাবে ৬০০ জন শ্রমিক কাজ করেন। কারখানা আইন, ১৯৪৮ অনুযায়ী কোন আধিকারিক নিয়োগ করতে হবে?'),
        steps: [
          t('Place 600 on the ladder: it has crossed 500 but not 1,000.', '৬০০-কে সিঁড়িতে বসাও: ৫০০ পেরিয়েছে, কিন্তু ১,০০০ নয়।'),
          t('Crossing 500 triggers the Welfare Officer (Section 49); the Safety Officer waits for 1,000 (Section 40B).', '৫০০ পেরোলেই কল্যাণ আধিকারিক চালু হয় (ধারা ৪৯); নিরাপত্তা আধিকারিক অপেক্ষা করেন ১,০০০ পর্যন্ত (ধারা ৪০B)।'),
        ],
        answer: t('Welfare Officer', 'কল্যাণ আধিকারিক'),
      },
      tryIt: {
        question: t('A unit starts a manufacturing process with power and 12 workers. Under the Factories Act, 1948 it is:', 'একটি ইউনিট শক্তির সাহায্যে ১২ জন শ্রমিক নিয়ে উৎপাদন প্রক্রিয়া শুরু করে। কারখানা আইন, ১৯৪৮ অনুযায়ী এটি:'),
        options: [t('Not covered — too small', 'আওতার বাইরে — খুব ছোট'), t('A factory under Section 2(m)', 'ধারা 2(m) অনুযায়ী কারখানা'), t('A factory only after one full year', 'এক পূর্ণ বছর পরেই কারখানা'), t('Covered only if it uses hazardous chemicals', 'শুধু বিপজ্জনক রাসায়নিক ব্যবহার করলেই আওতায়')],
        correct: 1,
        explanation: [
          t('With power the gate is 10 workers, and 12 is above it — the premises is a factory from the start.', 'শক্তিসহ দরজা ১০ জন শ্রমিক, আর ১২ তার ওপরে — প্রাঙ্গণটি শুরু থেকেই কারখানা।'),
          t('The one-year idea is a distortion: the definition only looks back over the preceding 12 months to count workers, it does not make a unit wait a year.', 'এক বছরের ধারণাটি বিকৃতি: সংজ্ঞাটি শ্রমিক গুনতে শুধু গত ১২ মাসের দিকে তাকায়, কোনো ইউনিটকে এক বছর অপেক্ষা করায় না।'),
        ],
      },
      difficulty: 'beginner',
    },
    {
      key: 'section_number_addresses',
      emoji: '🏠',
      name: t('Section numbers are addresses — learn the street', 'ধারার নম্বরই ঠিকানা — রাস্তাটা শিখে নাও'),
      spot: t(
        'The question names a section (40B, 51, 89, 25, 21…) or asks which section carries a named duty, especially where two laws have look-alike provisions.',
        'প্রশ্নে ধারার নম্বর দেওয়া থাকে (40B, ৫১, ৮৯, ২৫, ২১…) অথবা জিজ্ঞাসা করা হয় কোন ধারায় নির্দিষ্ট দায়িত্ব আছে, বিশেষ করে যেখানে দুটি আইনে কাছাকাছি বিধান আছে।',
      ),
      method: [
        t('Factories Act anchors: 2(m) definition, 40B Safety Officer, 41A–41H hazardous processes, 51/54 weekly and daily hours, 59 overtime at double rate, 89 notice of diseases.', 'কারখানা আইনের নোঙর: 2(m) সংজ্ঞা, 40B নিরাপত্তা আধিকারিক, 41A–41H বিপজ্জনক প্রক্রিয়া, ৫১/৫৪ সাপ্তাহিক ও দৈনিক ঘণ্টা, ৫৯ দ্বিগুণ হারে ওভারটাইম, ৮৯ রোগের বিজ্ঞপ্তি।'),
        t('The consent pair never swaps: Water Act consent is Section 25, Air Act consent is Section 21 — both from the State Board.', 'সম্মতির জোড় কখনো বদলায় না: জল আইনের সম্মতি ধারা ২৫, বায়ু আইনের সম্মতি ধারা ২১ — দুটোই রাজ্য বোর্ডের কাছ থেকে।'),
        t('Board births: Water Act Section 3 makes the Central Board, Section 4 the State Boards.', 'বোর্ডের জন্ম: জল আইনের ধারা ৩ কেন্দ্রীয় বোর্ড, ধারা ৪ রাজ্য বোর্ড গড়ে।'),
      ],
      example: {
        question: t('The duty to send notice when a worker contracts a Third Schedule disease is laid down in which section of the Factories Act, 1948?', 'কোনো শ্রমিক তৃতীয় তফসিলের রোগে আক্রান্ত হলে বিজ্ঞপ্তি পাঠানোর দায়িত্ব কারখানা আইন, ১৯৪৮-এর কোন ধারায় দেওয়া আছে?'),
        steps: [
          t('Diseases live at the end of the Act street: the Third Schedule is read with its notice section.', 'রোগ থাকে আইনের রাস্তার শেষে: তৃতীয় তফসিল পড়া হয় তার বিজ্ঞপ্তির ধারার সঙ্গে।'),
          t('That notice section is 89 — the manager must inform the prescribed authorities.', 'সেই বিজ্ঞপ্তির ধারা ৮৯ — ব্যবস্থাপককে নির্ধারিত কর্তৃপক্ষকে জানাতে হয়।'),
        ],
        answer: t('Section 89', 'ধারা ৮৯'),
      },
      difficulty: 'intermediate',
      trap: t('Do not let a big number fool you: Section 51 sounds like hours and is (weekly hours), but Section 25 belongs to the Water Act, not the Factories Act — the same numeral lives on two different streets.', 'বড় সংখ্যায় ভুলো না: ধারা ৫১ শুনতে কর্মঘণ্টার মতো আর তাই (সাপ্তাহিক ঘণ্টা), কিন্তু ধারা ২৫ জল আইনের, কারখানা আইনের নয় — একই সংখ্যা দুটি আলাদা রাস্তায় থাকে।'),
    },
    {
      key: 'law_timeline_staircase',
      emoji: '📅',
      name: t('The law timeline staircase, 1948 to 2020', 'আইনের কালসিঁড়ি, ১৯৪৮ থেকে ২০২০'),
      spot: t(
        'Chronology and "which came first" questions, and any question that hangs a law on an event — a conference, a disaster, a code reform.',
        'কালানুক্রম ও "কোনটি আগে এসেছিল" জাতীয় প্রশ্ন, আর যেকোনো প্রশ্ন যেখানে একটি আইন কোনো ঘটনার সঙ্গে ঝুলিয়ে দেওয়া হয় — একটি সম্মেলন, একটি বিপর্যয়, একটি কোড সংস্কার।',
      ),
      method: [
        t('The staircase: Factories Act 1948 → Water Act 1974 → Air Act 1981 → Bhopal, December 1984 → EPA 1986 → Chapter IVA 1987 → MSIHC Rules 1989 → industry colour classification 2016 → OSH Code 2020.', 'সিঁড়িটি: কারখানা আইন ১৯৪৮ → জল আইন ১৯৭৪ → বায়ু আইন ১৯৮১ → ভোপাল, ডিসেম্বর ১৯৮৪ → EPA ১৯৮৬ → অধ্যায় IVA ১৯৮৭ → MSIHC বিধিমালা ১৯৮৯ → শিল্পের রঙ-শ্রেণিবিন্যাস ২০১৬ → OSH কোড ২০২০।'),
        t('Anchor the middle steps to Bhopal: the disaster sits between the Air Act and the EPA, and everything 1986–89 is its aftershock.', 'মাঝের ধাপগুলি ভোপালের সঙ্গে বাঁধো: বিপর্যয়টি বায়ু আইন ও EPA-র মাঝখানে, আর ১৯৮৬–৮৯-এর সবকিছুই তার পরাঘাত।'),
        t('Events behind the laws: Stockholm Conference 1972 stands behind the Air Act and the EPA (both under Article 253); Article 252 stands behind the Water Act.', 'আইনগুলির পেছনের ঘটনা: স্টকহোম সম্মেলন ১৯৭২ দাঁড়িয়ে বায়ু আইন ও EPA-র পেছনে (দুটোই অনুচ্ছেদ ২৫৩ অনুযায়ী); জল আইনের পেছনে অনুচ্ছেদ ২৫২।'),
      ],
      example: {
        question: t('Which of the following came immediately after the Bhopal disaster in the sequence of Indian safety law?', 'ভারতীয় নিরাপত্তা আইনের ধারায় ভোপাল বিপর্যয়ের ঠিক পরেই কোনটি আসে?'),
        steps: [
          t('Walk the staircase past December 1984: the next legal step is 1986.', '১৯৮৪-এর ডিসেম্বর পেরিয়ে সিঁড়ি বেয়ে হাঁটো: পরের আইনি ধাপ ১৯৮৬।'),
          t('That step is the Environment (Protection) Act — Chapter IVA follows in 1987 and the MSIHC Rules in 1989.', 'সেই ধাপ পরিবেশ (সুরক্ষা) আইন — অধ্যায় IVA আসে ১৯৮৭-তে আর MSIHC বিধিমালা ১৯৮৯-এ।'),
        ],
        answer: t('Environment (Protection) Act, 1986', 'পরিবেশ (সুরক্ষা) আইন, ১৯৮৬'),
      },
      difficulty: 'intermediate',
    },
    {
      key: 'matched_pair_safety',
      emoji: '✅',
      name: t('Correctly matched pair (industrial safety)', 'সঠিকভাবে মেলানো জোড় (শিল্প নিরাপত্তা)'),
      spot: t(
        'Four pairs — hazard–disease, class of fire–agent, device–job, law–year — of which only one is fully correct; each wrong pair borrows a partner from a neighbouring fact.',
        'চারটি জোড় — ঝুঁকি–রোগ, আগুনের শ্রেণি–নির্বাপক, যন্ত্র–কাজ, আইন–সাল — যার মধ্যে মাত্র একটি পুরোপুরি সঠিক; প্রতিটি ভুল জোড় পাশের তথ্য থেকে সঙ্গী ধার করে।',
      ),
      method: [
        t('Dust–disease pairs: silica → silicosis, cotton fibre → byssinosis, coal → anthracosis, asbestos → asbestosis. A swapped dust kills the pair.', 'ধুলো–রোগের জোড়: সিলিকা → সিলিকোসিস, তুলোর আঁশ → বাইসিনোসিস, কয়লা → অ্যানথ্রাকোসিস, অ্যাসবেস্টস → অ্যাসবেস্টোসিস। ধুলো বদলালেই জোড় মরে।'),
        t('Device–job pairs: MCB/fuse → overload and short circuit; RCCB/ELCB → earth leakage and shock. Fire pairs: water never on Class B liquids, Class C electrical or Class D metals; wet chemical belongs to Class K.', 'যন্ত্র–কাজের জোড়: MCB/ফিউজ → অতিরিক্ত ভার ও শর্ট সার্কিট; RCCB/ELCB → মাটিতে লিকেজ ও শক। আগুনের জোড়: জল কখনোই শ্রেণি B তরলে, শ্রেণি C বৈদ্যুতিকে বা শ্রেণি D ধাতুতে নয়; ভেজা রাসায়নিক শ্রেণি K-র।'),
        t('Check both halves of every pair before the next — a pair fails if either side is off, and the false pair is usually the famous neighbour (500 for the Safety Officer, Section 25 for the Air Act).', 'পরেরটায় যাওয়ার আগে প্রতিটি জোড়ের দুই অর্ধেকই যাচাই করো — একদিক ভুল হলেই জোড় ব্যর্থ, আর ভুল জোড়টি সাধারণত বিখ্যাত প্রতিবেশী (নিরাপত্তা আধিকারিকের জন্য ৫০০, বায়ু আইনের জন্য ধারা ২৫)।'),
      ],
      example: {
        question: t('Which of the following industrial-safety pairs is NOT correctly matched? (a) Silica dust – silicosis (b) RCCB – protection against earth leakage (c) Safety Officer – 500 workers (d) Water Act consent – Section 25', 'নিচের কোন শিল্প-নিরাপত্তা জোড়টি সঠিকভাবে মেলেনি? (ক) সিলিকা ধুলো – সিলিকোসিস (খ) RCCB – মাটিতে লিকেজের বিরুদ্ধে সুরক্ষা (গ) নিরাপত্তা আধিকারিক – ৫০০ জন শ্রমিক (ঘ) জল আইনের সম্মতি – ধারা ২৫'),
        steps: [
          t('Silica–silicosis, RCCB–leakage and Water Act–Section 25 are all true pairs.', 'সিলিকা–সিলিকোসিস, RCCB–লিকেজ ও জল আইন–ধারা ২৫ — সবকটিই সত্যিকারের জোড়।'),
          t('500 workers trigger the Welfare Officer; the Safety Officer needs 1,000 — so (c) is the unmatched pair.', '৫০০ জন শ্রমিকে কল্যাণ আধিকারিক চালু হন; নিরাপত্তা আধিকারিকের জন্য ১,০০০ লাগে — তাই (গ) বেমানান জোড়।'),
        ],
        answer: t('Safety Officer – 500 workers', 'নিরাপত্তা আধিকারিক – ৫০০ জন শ্রমিক'),
      },
      difficulty: 'intermediate',
    },
    {
      key: 'score_band_colours',
      emoji: '🎨',
      name: t('Score bands and the White exemption', 'স্কোর ব্যান্ড ও সাদা-শ্রেণির ছাড়'),
      spot: t(
        'A question that hands you a Pollution Index score, or asks what a Red/Orange/Green/White industry must do before it may establish or operate.',
        'এমন প্রশ্ন যেখানে একটি দূষণ সূচকের স্কোর দেওয়া হয়, অথবা জিজ্ঞাসা করা হয় লাল/কমলা/সবুজ/সাদা শিল্পকে স্থাপন বা পরিচালনার আগে কী করতে হয়।',
      ),
      method: [
        t('Read the bands off one line: 60 and above Red, 41–59 Orange, 21–40 Green, up to 20 White (CPCB revised classification, 2016).', 'ব্যান্ডগুলি এক লাইনে পড়ো: ৬০ ও ওপরে লাল, ৪১–৫৯ কমলা, ২১–৪০ সবুজ, ২০ পর্যন্ত সাদা (CPCB সংশোধিত শ্রেণিবিন্যাস, ২০১৬)।'),
        t('Consent runs CTE first, CTO second — Consent to Establish before building, Consent to Operate before production, from the State Board under Water Act Section 25 and Air Act Section 21.', 'সম্মতি চলে আগে CTE, পরে CTO — গড়ার আগে স্থাপনের সম্মতি, উৎপাদনের আগে পরিচালনার সম্মতি, রাজ্য বোর্ডের কাছ থেকে জল আইনের ধারা ২৫ ও বায়ু আইনের ধারা ২১ অনুযায়ী।'),
        t('White is the exemption: practically non-polluting, so no Consent to Operate — only an intimation to the SPCB/PCC. Red sits at the other pole: normally barred from ecologically fragile and protected areas.', 'সাদাই ছাড়: বাস্তবে অদূষণকারী, তাই পরিচালনার সম্মতি লাগে না — শুধু SPCB/PCC-কে অবহিত করা। লাল অন্য মেরুতে: পরিবেশগতভাবে ভঙ্গুর ও সংরক্ষিত এলাকায় সাধারণত নিষিদ্ধ।'),
      ],
      example: {
        question: t('An industrial sector scores a Pollution Index of 35. Its category and consent position are:', 'একটি শিল্প খাতের দূষণ সূচক ৩৫। এর শ্রেণি ও সম্মতির অবস্থান হলো:'),
        steps: [
          t('Place 35 in the bands: 21–40 is Green.', '৩৫-কে ব্যান্ডে বসাও: ২১–৪০ সবুজ।'),
          t('Green is not White, so the exemption does not apply — the unit still needs CTE and CTO from the State Board.', 'সবুজ সাদা নয়, তাই ছাড় প্রযোজ্য নয় — ইউনিটটিকে রাজ্য বোর্ডের কাছ থেকে CTE ও CTO নিতেই হবে।'),
        ],
        answer: t('Green category; consent to establish and to operate required', 'সবুজ শ্রেণি; স্থাপন ও পরিচালনা — দুই সম্মতিই প্রয়োজন'),
      },
      tryIt: {
        question: t('A practically non-polluting unit falls in the White category (Pollution Index 18). Before starting production it must:', 'বাস্তবে অদূষণকারী একটি ইউনিট সাদা শ্রেণিতে পড়ে (দূষণ সূচক ১৮)। উৎপাদন শুরুর আগে তাকে:'),
        options: [t('Obtain Consent to Operate like every other industry', 'অন্য সব শিল্পের মতো পরিচালনার সম্মতি নিতে হবে'), t('Obtain environmental clearance from the CPCB', 'CPCB-র কাছ থেকে পরিবেশগত ছাড়পত্র নিতে হবে'), t('Simply intimate the State Board / PCC — no Consent to Operate is needed', 'রাজ্য বোর্ড / PCC-কে শুধু অবহিত করলেই হবে — পরিচালনার সম্মতি লাগে না'), t('Pay a pollution cess and start', 'দূষণ কর দিয়ে শুরু করতে হবে')],
        correct: 2,
        explanation: [
          t('The 2016 CPCB directions exempt White-category industries from Consent to Operate; an intimation to the SPCB/PCC suffices.', '২০১৬-র CPCB নির্দেশ সাদা-শ্রেণির শিল্পকে পরিচালনার সম্মতি থেকে ছাড় দেয়; SPCB/PCC-কে অবহিত করলেই চলে।'),
          t('Environmental clearance is a separate EIA-Notification track, and the CPCB does not license individual units — State Boards do.', 'পরিবেশগত ছাড়পত্র EIA বিজ্ঞপ্তির আলাদা ধারা, আর CPCB পৃথক ইউনিটকে লাইসেন্স দেয় না — রাজ্য বোর্ড দেয়।'),
        ],
      },
      difficulty: 'intermediate',
      trap: t('The bands are exclusive at the edges: exactly 60 is Red (not Orange) and exactly 20 is still White. Examiners park scores on the boundary to test this.', 'ব্যান্ডগুলি প্রান্তে অনন্য: ঠিক ৬০ লাল (কমলা নয়) আর ঠিক ২০ এখনও সাদা। পরীক্ষকেরা যাচাই করতে স্কোর সীমানাতেই পার্ক করেন।'),
    },
  ],
};
