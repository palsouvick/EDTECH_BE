'use strict';

// Important National & International Days. Every date used here is in the
// verified GK library (db/gk/important_days.jsonl, sources: United Nations
// list of international days, PIB, Election Commission of India).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'important_days',
  patterns: [
    {
      key: 'direct_date_recall',
      emoji: '🗓️',
      name: t('Direct date recall', 'সরাসরি তারিখ মনে করা'),
      spot: t(
        'The question names a well-known day (National Science Day, World Water Day...) and asks on which date it is observed, or names a date and asks which day it is.',
        'প্রশ্নে কোনো পরিচিত দিবসের নাম (জাতীয় বিজ্ঞান দিবস, বিশ্ব জল দিবস...) দিয়ে জানতে চায় কোন তারিখে তা পালিত হয়, অথবা তারিখ দিয়ে দিবসটি জানতে চায়।',
      ),
      method: [
        t('Learn each day with its reason attached: a date with a story sticks far better than a bare number.', 'প্রতিটি দিবস তার কারণসহ শেখো: গল্পসহ তারিখ শুধু সংখ্যার চেয়ে অনেক ভালো মনে থাকে।'),
        t('National Science Day: 28 February — C. V. Raman announced the Raman Effect on this day in 1928.', 'জাতীয় বিজ্ঞান দিবস: ২৮ ফেব্রুয়ারি — ১৯২৮ সালের এই দিনে সি. ভি. রামন রামন প্রভাব আবিষ্কারের ঘোষণা দেন।'),
        t('World Water Day: 22 March. World Environment Day: 5 June. International Day of Yoga: 21 June.', 'বিশ্ব জল দিবস: ২২ মার্চ। বিশ্ব পরিবেশ দিবস: ৫ জুন। আন্তর্জাতিক যোগ দিবস: ২১ জুন।'),
      ],
      example: {
        question: t('National Science Day is celebrated in India on:', 'ভারতে জাতীয় বিজ্ঞান দিবস পালিত হয়:'),
        steps: [
          t('The day is tied to the Raman Effect, announced by C. V. Raman in February 1928.', 'দিবসটি রামন প্রভাবের সঙ্গে যুক্ত, যা সি. ভি. রামন ১৯২৮ সালের ফেব্রুয়ারিতে ঘোষণা করেন।'),
          t('The announcement was made on 28 February, so National Science Day is 28 February.', 'ঘোষণাটি হয়েছিল ২৮ ফেব্রুয়ারি, তাই জাতীয় বিজ্ঞান দিবস ২৮ ফেব্রুয়ারি।'),
        ],
        answer: t('28 February', '২৮ ফেব্রুয়ারি'),
      },
      tryIt: {
        question: t('World Water Day is observed on:', 'বিশ্ব জল দিবস পালিত হয়:'),
        options: [t('21 March', '২১ মার্চ'), t('22 March', '২২ মার্চ'), t('23 March', '২৩ মার্চ'), t('5 June', '৫ জুন')],
        correct: 1,
        explanation: [
          t('World Water Day is 22 March, fixed by the UN General Assembly in 1993.', 'বিশ্ব জল দিবস ২২ মার্চ, ১৯৯৩ সালে রাষ্ট্রসংঘের সাধারণ সভা এটি নির্ধারণ করে।'),
          t('21 March is the International Day of Forests and 5 June is World Environment Day.', '২১ মার্চ আন্তর্জাতিক বন দিবস এবং ৫ জুন বিশ্ব পরিবেশ দিবস।'),
        ],
      },
      difficulty: 'beginner',
      trap: t('28 February (Science Day) and 29 August (Sports Day) are the most-swapped pair in this chapter.', '২৮ ফেব্রুয়ারি (বিজ্ঞান দিবস) ও ২৯ আগস্ট (ক্রীড়া দিবস) এই অধ্যায়ের সবচেয়ে বেশি বদলানো জুটি।'),
    },
    {
      key: 'correctly_matched_pair',
      emoji: '✅',
      name: t('Correctly matched pair', 'সঠিকভাবে মেলানো জোড়'),
      spot: t(
        'Four day–date pairs are given and only one is correct; the three wrong pairs are usually made by swapping the dates of two real days.',
        'চারটি দিবস–তারিখ জোড় দেওয়া থাকে, তার মধ্যে মাত্র একটি সঠিক; ভুল তিনটি সাধারণত দুটি আসল দিবসের তারিখ বদলিয়ে তৈরি করা হয়।',
      ),
      method: [
        t('Check each pair against the reason behind the day, not just the number.', 'শুধু সংখ্যা নয়, দিবসের পেছনের কারণ দিয়ে প্রতিটি জোড় যাচাই করো।'),
        t('Cross out any pair whose date belongs to another famous day (26 January can only be Republic Day).', 'যে জোড়ের তারিখ অন্য বিখ্যাত দিবসের, সেটি কেটে দাও (২৬ জানুয়ারি শুধুই প্রজাতন্ত্র দিবস)।'),
        t('The surviving pair is the answer — do not stop at the first pair that merely looks familiar.', 'যে জোড়টি টিকে থাকে সেটিই উত্তর — শুধু পরিচিত দেখালেই প্রথম জোড়ে থেমে যেও না।'),
      ],
      example: {
        question: t('Which pair is correctly matched? (a) National Voters\' Day – 26 January (b) National Youth Day – 12 January (c) National Science Day – 29 August (d) Constitution Day – 26 January', 'কোন জোড়টি সঠিকভাবে মিলেছে? (ক) জাতীয় ভোটার দিবস – ২৬ জানুয়ারি (খ) জাতীয় যুব দিবস – ১২ জানুয়ারি (গ) জাতীয় বিজ্ঞান দিবস – ২৯ আগস্ট (ঘ) সংবিধান দিবস – ২৬ জানুয়ারি'),
        steps: [
          t('Voters\' Day is 25 January and Constitution Day is 26 November, so (a) and (d) fall.', 'ভোটার দিবস ২৫ জানুয়ারি ও সংবিধান দিবস ২৬ নভেম্বর, তাই (ক) ও (ঘ) বাদ।'),
          t('Science Day is 28 February, so (c) falls too. Only (b), Youth Day – 12 January (Vivekananda\'s birthday), survives.', 'বিজ্ঞান দিবস ২৮ ফেব্রুয়ারি, তাই (গ)-ও বাদ। টিকে থাকে শুধু (খ), যুব দিবস – ১২ জানুয়ারি (বিবেকানন্দের জন্মদিন)।'),
        ],
        answer: t('National Youth Day – 12 January', 'জাতীয় যুব দিবস – ১২ জানুয়ারি'),
      },
      difficulty: 'intermediate',
    },
    {
      key: 'not_matched_pair',
      emoji: '🚫',
      name: t('Find the pair that is NOT matched', 'যে জোড়টি মেলেনি তা খোঁজা'),
      spot: t(
        'The stem asks which pair is NOT correctly matched: three pairs are true and one is false, usually an Indian observance replaced by its similar-sounding UN observance.',
        'প্রশ্নে জানতে চাওয়া হয় কোন জোড়টি সঠিকভাবে মেলেনি: তিনটি জোড় সত্য, একটি মিথ্যা — সাধারণত কোনো ভারতীয় পালনের বদলে কাছাকাছি নামের রাষ্ট্রসংঘের পালন বসানো থাকে।',
      ),
      method: [
        t('Mark each pair true or false one by one; the single false pair is the answer.', 'প্রতিটি জোড় একে একে সত্য বা মিথ্যা চিহ্নিত করো; একমাত্র মিথ্যা জোড়টিই উত্তর।'),
        t('Watch the double observances: India\'s Children\'s Day is 14 November, the UN\'s World Children\'s Day is 20 November.', 'দ্বৈত পালনগুলি খেয়াল করো: ভারতের শিশু দিবস ১৪ নভেম্বর, রাষ্ট্রসংঘের বিশ্ব শিশু দিবস ২০ নভেম্বর।'),
        t('India\'s Teachers\' Day is 5 September; UNESCO\'s World Teachers\' Day is 5 October.', 'ভারতের শিক্ষক দিবস ৫ সেপ্টেম্বর; ইউনেস্কোর বিশ্ব শিক্ষক দিবস ৫ অক্টোবর।'),
      ],
      example: {
        question: t('Which pair is NOT correctly matched? (a) Children\'s Day (India) – 20 November (b) World Diabetes Day – 14 November (c) World Toilet Day – 19 November (d) National Milk Day – 26 November', 'কোন জোড়টি সঠিকভাবে মেলেনি? (ক) শিশু দিবস (ভারত) – ২০ নভেম্বর (খ) বিশ্ব ডায়াবেটিস দিবস – ১৪ নভেম্বর (গ) বিশ্ব শৌচাগার দিবস – ১৯ নভেম্বর (ঘ) জাতীয় দুগ্ধ দিবস – ২৬ নভেম্বর'),
        steps: [
          t('Diabetes Day (14 November), Toilet Day (19 November) and Milk Day (26 November) are all correct.', 'ডায়াবেটিস দিবস (১৪ নভেম্বর), শৌচাগার দিবস (১৯ নভেম্বর) ও দুগ্ধ দিবস (২৬ নভেম্বর) সবকটিই সঠিক।'),
          t('India\'s Children\'s Day is 14 November (Nehru\'s birthday); 20 November is the UN\'s World Children\'s Day, so (a) is the wrong pair.', 'ভারতের শিশু দিবস ১৪ নভেম্বর (নেহরুর জন্মদিন); ২০ নভেম্বর রাষ্ট্রসংঘের বিশ্ব শিশু দিবস, তাই (ক) ভুল জোড়।'),
        ],
        answer: t('Children\'s Day (India) – 20 November', 'শিশু দিবস (ভারত) – ২০ নভেম্বর'),
      },
      difficulty: 'intermediate',
      trap: t('Do not pick the first pair you cannot verify; in NOT-matched questions the false pair is usually the one that looks most official (the UN date).', 'যে জোড়টি যাচাই করতে পারছ না সেটিই বেছে নিও না; মেলেনি-জাতীয় প্রশ্নে ভুল জোড়টি সাধারণত সবচেয়ে সরকারি-দেখতে হয় (রাষ্ট্রসংঘের তারিখ)।'),
    },
    {
      key: 'person_behind_the_day',
      emoji: '👤',
      name: t('The person behind the day', 'দিবসের পেছনের মানুষ'),
      spot: t(
        'Many Indian observances are birth anniversaries; the question either names the day and asks whose birthday it is, or names the person and asks the date.',
        'অনেক ভারতীয় পালনই জন্মবার্ষিকী; প্রশ্নে হয় দিবসের নাম দিয়ে কার জন্মদিন জানতে চায়, নয়তো মানুষটির নাম দিয়ে তারিখ জানতে চায়।',
      ),
      method: [
        t('Build the birthday chain: 12 January Vivekananda; 23 January Netaji; 5 September Radhakrishnan; 2 October Gandhi; 31 October Patel; 11 November Azad; 14 November Nehru; 29 August Dhyan Chand; 23 December Charan Singh.', 'জন্মদিনের শৃঙ্খলটি গাঁথো: ১২ জানুয়ারি বিবেকানন্দ; ২৩ জানুয়ারি নেতাজি; ৫ সেপ্টেম্বর রাধাকৃষ্ণন; ২ অক্টোবর গান্ধী; ৩১ অক্টোবর পটেল; ১১ নভেম্বর আজাদ; ১৪ নভেম্বর নেহরু; ২৯ আগস্ট ধ্যানচাঁদ; ২৩ ডিসেম্বর চরণ সিং।'),
        t('When the person is a teacher, scientist or sportsperson, the day usually carries their profession: Teachers\' Day – Radhakrishnan, Science Day – Raman, Sports Day – Dhyan Chand.', 'মানুষটি শিক্ষক, বিজ্ঞানী বা ক্রীড়াবিদ হলে দিবসটি সাধারণত তাঁর পেশা বহন করে: শিক্ষক দিবস – রাধাকৃষ্ণন, বিজ্ঞান দিবস – রামন, ক্রীড়া দিবস – ধ্যানচাঁদ।'),
      ],
      example: {
        question: t('Teachers\' Day in India is celebrated on the birth anniversary of:', 'ভারতে শিক্ষক দিবস পালিত হয় যাঁর জন্মবার্ষিকীতে, তিনি:'),
        steps: [
          t('The day honours a teacher who became President of India.', 'দিবসটি এমন একজন শিক্ষককে সম্মান করে যিনি ভারতের রাষ্ট্রপতি হয়েছিলেন।'),
          t('That is Dr Sarvepalli Radhakrishnan, born 5 September 1888 — hence 5 September.', 'তিনি ড. সর্বপল্লী রাধাকৃষ্ণন, জন্ম ৫ সেপ্টেম্বর ১৮৮৮ — তাই ৫ সেপ্টেম্বর।'),
        ],
        answer: t('Dr Sarvepalli Radhakrishnan', 'ড. সর্বপল্লী রাধাকৃষ্ণন'),
      },
      tryIt: {
        question: t('National Unity Day (31 October) marks the birth anniversary of:', 'জাতীয় ঐক্য দিবস (৩১ অক্টোবর) কার জন্মবার্ষিকীতে পালিত হয়?'),
        options: [t('Mahatma Gandhi', 'মহাত্মা গান্ধী'), t('Sardar Vallabhbhai Patel', 'সর্দার বল্লভভাই পটেল'), t('Lal Bahadur Shastri', 'লাল বাহাদুর শাস্ত্রী'), t('Dr Rajendra Prasad', 'ড. রাজেন্দ্র প্রসাদ')],
        correct: 1,
        explanation: [
          t('Sardar Patel, who integrated the princely states, was born on 31 October 1875.', 'দেশীয় রাজ্যগুলিকে একত্রিত করা সর্দার পটেল ১৮৭৫ সালের ৩১ অক্টোবর জন্মগ্রহণ করেন।'),
          t('Gandhi and Shastri share 2 October; Patel\'s day is 31 October, observed as Unity Day since 2014.', 'গান্ধী ও শাস্ত্রী দুজনেই ২ অক্টোবর; পটেলের দিন ৩১ অক্টোবর, ২০১৪ সাল থেকে ঐক্য দিবস।'),
        ],
      },
      difficulty: 'beginner',
    },
    {
      key: 'match_and_order_days',
      emoji: '🔀',
      name: t('Match the following and chronological order', 'মেলানো ও কালানুক্রমিক ক্রম'),
      spot: t(
        'A List I / List II matching table of four days and four dates, or four observances to arrange earliest-first within a year.',
        'চারটি দিবস ও চারটি তারিখের তালিকা I / তালিকা II মেলানোর ছক, অথবা বছরের মধ্যে চারটি পালনকে আগে-থেকে-পরে সাজানো।',
      ),
      method: [
        t('Fix your most certain pair first and strike out every option that breaks it; one certain pair usually removes two options.', 'সবচেয়ে নিশ্চিত জোড়টি আগে ঠিক করো এবং যেসব বিকল্প সেটি ভাঙে তা কেটে দাও; একটি নিশ্চিত জোড় সাধারণত দুটি বিকল্প বাদ দেয়।'),
        t('For order questions, sort by month first; compare dates only when two fall in the same month.', 'ক্রমের প্রশ্নে আগে মাস অনুযায়ী সাজাও; দুটি একই মাসে পড়লেই কেবল তারিখ তুলনা করো।'),
        t('Anchor set: Voters\' Day 25 January → Science Day 28 February → Yoga Day 21 June → Sports Day 29 August → Constitution Day 26 November.', 'মূল ক্রম: ভোটার দিবস ২৫ জানুয়ারি → বিজ্ঞান দিবস ২৮ ফেব্রুয়ারি → যোগ দিবস ২১ জুন → ক্রীড়া দিবস ২৯ আগস্ট → সংবিধান দিবস ২৬ নভেম্বর।'),
      ],
      example: {
        question: t('Arrange in order (earliest first): 1. National Sports Day 2. National Science Day 3. National Youth Day 4. International Day of Yoga', 'ক্রমে সাজাও (আগেরটি প্রথমে): ১. জাতীয় ক্রীড়া দিবস ২. জাতীয় বিজ্ঞান দিবস ৩. জাতীয় যুব দিবস ৪. আন্তর্জাতিক যোগ দিবস'),
        steps: [
          t('By month: Youth Day is January, Science Day is February, Yoga Day is June, Sports Day is August.', 'মাস অনুযায়ী: যুব দিবস জানুয়ারি, বিজ্ঞান দিবস ফেব্রুয়ারি, যোগ দিবস জুন, ক্রীড়া দিবস আগস্ট।'),
          t('So the order is 3 (12 January), 2 (28 February), 4 (21 June), 1 (29 August).', 'তাই ক্রম হল ৩ (১২ জানুয়ারি), ২ (২৮ ফেব্রুয়ারি), ৪ (২১ জুন), ১ (২৯ আগস্ট)।'),
        ],
        answer: t('3, 2, 4, 1', '৩, ২, ৪, ১'),
      },
      difficulty: 'advanced',
      shortcut: t('In matching tables, dates repeat across options in shuffled columns — solve the pair you know, not the pair listed first.', 'মেলানোর ছকে তারিখগুলি বিকল্পজুড়ে এলোমেলো স্তম্ভে ঘোরে — প্রথমে দেওয়া জোড় নয়, যেটি তুমি জানো সেটি মেলাও।'),
    },
  ],
};
