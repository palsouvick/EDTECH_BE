'use strict';

// Static GK. Every fact used here is in the verified GK library
// (db/gk/static_gk.jsonl, sources: nobelprize.org, Bharatiya Jnanpith, UN, WHO, WTO, UNESCO, Census 2011).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'static_gk',
  patterns: [
    {
      key: 'nobel_india_bengal',
      emoji: '🏅',
      name: t('Nobel laureates linked to India and Bengal', 'ভারত ও বাংলার সঙ্গে যুক্ত নোবেলজয়ী'),
      spot: t(
        'The question names a laureate and asks the year or field, or gives the field and year and asks the person.',
        'প্রশ্নে কোনো নোবেলজয়ীর নাম দিয়ে সাল বা বিষয় জানতে চায়, অথবা বিষয় ও সাল দিয়ে মানুষটিকে জানতে চায়।',
      ),
      method: [
        t('Tagore: Literature, 1913. C.V. Raman: Physics, 1930 (scattering of light; affiliation Calcutta University).', 'রবীন্দ্রনাথ ঠাকুর: সাহিত্য, ১৯১৩। সি. ভি. রমন: পদার্থবিদ্যা, ১৯৩০ (আলোর বিক্ষেপণ; তখন কলকাতা বিশ্ববিদ্যালয়ে)।'),
        t('Amartya Sen: Economic Sciences, 1998 (welfare economics; born at Santiniketan). Abhijit Banerjee: Economic Sciences, 2019, shared (alleviating global poverty).', 'অমর্ত্য সেন: অর্থনীতি, ১৯৯৮ (কল্যাণমূলক অর্থনীতি; জন্ম শান্তিনিকেতনে)। অভিজিৎ বন্দ্যোপাধ্যায়: অর্থনীতি, ২০১৯, যৌথভাবে (বিশ্বের দারিদ্র্য দূরীকরণ)।'),
        t('The economics prize is officially "the Prize in Economic Sciences in Memory of Alfred Nobel".', 'অর্থনীতির পুরস্কারের সরকারি নাম "আলফ্রেড নোবেলের স্মৃতিতে অর্থনৈতিক বিজ্ঞানে পুরস্কার"।'),
      ],
      example: {
        question: t('Who won the Nobel Prize in Physics in 1930?', '১৯৩০ সালে পদার্থবিদ্যায় নোবেল পুরস্কার কে পান?'),
        steps: [
          t('Tagore (1913) won in Literature, and Sen (1998) and Banerjee (2019) in Economic Sciences.', 'রবীন্দ্রনাথ (১৯১৩) সাহিত্যে, আর সেন (১৯৯৮) ও বন্দ্যোপাধ্যায় (২০১৯) অর্থনীতিতে পান।'),
          t('The 1930 Physics prize went to C.V. Raman for his work on the scattering of light.', '১৯৩০-এর পদার্থবিদ্যার পুরস্কার পান সি. ভি. রমন, আলোর বিক্ষেপণ নিয়ে কাজের জন্য।'),
        ],
        answer: t('Sir C.V. Raman', 'স্যার সি. ভি. রমন'),
      },
      tryIt: {
        question: t('Amartya Sen won the Nobel Memorial Prize in Economic Sciences in:', 'অমর্ত্য সেন অর্থনীতিতে নোবেল স্মারক পুরস্কার পান:'),
        options: [t('1913', '১৯১৩'), t('1998', '১৯৯৮'), t('2019', '২০১৯'), t('1930', '১৯৩০')],
        correct: 1,
        explanation: [
          t('Amartya Sen won in 1998 "for his contributions to welfare economics".', 'অমর্ত্য সেন ১৯৯৮ সালে "কল্যাণমূলক অর্থনীতিতে অবদানের জন্য" পুরস্কার পান।'),
          t('2019 is Abhijit Banerjee (economics), 1913 Tagore and 1930 Raman.', '২০১৯ অভিজিৎ বন্দ্যোপাধ্যায় (অর্থনীতি), ১৯১৩ রবীন্দ্রনাথ, ১৯৩০ রমন।'),
        ],
      },
    },
    {
      key: 'important_days',
      emoji: '📅',
      name: t('Important days on the UN list', 'রাষ্ট্রসংঘের তালিকায় গুরুত্বপূর্ণ দিবস'),
      spot: t('The question gives a day (World Environment Day, Yoga Day, UN Day...) and asks the date, or gives the date and asks the day.', 'প্রশ্নে কোনো দিবস (বিশ্ব পরিবেশ দিবস, যোগ দিবস, রাষ্ট্রসংঘ দিবস...) দিয়ে তারিখ জানতে চায়, বা তারিখ দিয়ে দিবসটি জানতে চায়।'),
      method: [
        t('21 February International Mother Language Day; 8 March International Women\'s Day.', '২১ ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস; ৮ মার্চ আন্তর্জাতিক নারী দিবস।'),
        t('5 June World Environment Day; 21 June International Day of Yoga.', '৫ জুন বিশ্ব পরিবেশ দিবস; ২১ জুন আন্তর্জাতিক যোগ দিবস।'),
        t('24 October United Nations Day (the UN came into existence on 24 October 1945); 10 December Human Rights Day.', '২৪ অক্টোবর রাষ্ট্রসংঘ দিবস (২৪ অক্টোবর ১৯৪৫-এ রাষ্ট্রসংঘ গঠিত হয়); ১০ ডিসেম্বর মানবাধিকার দিবস।'),
      ],
      example: {
        question: t('Why is United Nations Day observed on 24 October?', 'রাষ্ট্রসংঘ দিবস কেন ২৪ অক্টোবর পালন করা হয়?'),
        steps: [
          t('The UN Charter had to be ratified by the five major powers and a majority of other signatories.', 'রাষ্ট্রসংঘ সনদ পাঁচটি প্রধান শক্তি ও অধিকাংশ স্বাক্ষরকারী দেশের অনুমোদন পাওয়া দরকার ছিল।'),
          t('That happened, and the UN officially came into existence, on 24 October 1945.', 'তা হয় এবং রাষ্ট্রসংঘ আনুষ্ঠানিকভাবে গঠিত হয় ২৪ অক্টোবর ১৯৪৫-এ।'),
        ],
        answer: t('The UN officially came into existence on 24 October 1945', '২৪ অক্টোবর ১৯৪৫-এ রাষ্ট্রসংঘ আনুষ্ঠানিকভাবে গঠিত হয়'),
      },
    },
    {
      key: 'census_2011',
      emoji: '📊',
      name: t('Census 2011 figures', '২০১১-র জনগণনার তথ্য'),
      spot: t('The question asks India\'s population, the sex ratio, or the ranking of states by population, from the 2011 Census.', 'প্রশ্নে ২০১১-র জনগণনা অনুযায়ী ভারতের জনসংখ্যা, লিঙ্গ অনুপাত বা জনসংখ্যা অনুযায়ী রাজ্যের ক্রম জানতে চায়।'),
      method: [
        t('Always check the reference year: these figures are for 2011.', 'সবসময় তথ্যের বছর দেখে নাও: এই সংখ্যাগুলি ২০১১-র।'),
        t('Sex ratio = females per 1000 males: India 943, West Bengal 950, Kerala 1084 (highest among states).', 'লিঙ্গ অনুপাত = প্রতি ১০০০ পুরুষে মহিলা: ভারত ৯৪৩, পশ্চিমবঙ্গ ৯৫০, কেরল ১০৮৪ (রাজ্যগুলির মধ্যে সর্বোচ্চ)।'),
        t('Most populous states: Uttar Pradesh, Maharashtra, Bihar, West Bengal (4th).', 'সবচেয়ে জনবহুল রাজ্য: উত্তরপ্রদেশ, মহারাষ্ট্র, বিহার, পশ্চিমবঙ্গ (চতুর্থ)।'),
      ],
      example: {
        question: t('In Census 2011, which state had the highest sex ratio?', '২০১১-র জনগণনায় কোন রাজ্যের লিঙ্গ অনুপাত সর্বোচ্চ ছিল?'),
        steps: [
          t('Sex ratio counts females per 1000 males; Kerala had 17,378,649 females to 16,027,412 males.', 'লিঙ্গ অনুপাত মানে প্রতি ১০০০ পুরুষে মহিলার সংখ্যা; কেরলে ছিল ১,৭৩,৭৮,৬৪৯ জন মহিলা ও ১,৬০,২৭,৪১২ জন পুরুষ।'),
          t('That gives 1084, more than any other state (India as a whole: 943).', 'তাতে হয় ১০৮৪, অন্য যেকোনো রাজ্যের চেয়ে বেশি (সারা ভারত: ৯৪৩)।'),
        ],
        answer: t('Kerala (1084)', 'কেরল (১০৮৪)'),
      },
    },
  ],
};
