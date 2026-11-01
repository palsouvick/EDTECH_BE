'use strict';

// Indian GK. Every fact used here is in the verified GK library
// (db/gk/indian_gk.jsonl, sources: PMO, Rashtrapati Bhavan, Vice-President's Secretariat,
// Rajya Sabha, ISRO, Metro Railway Kolkata, NPCIL, BARC, RBI, NMCG, PIB).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'indian_gk',
  patterns: [
    {
      key: 'first_office_holders',
      emoji: '🥇',
      name: t('First holders of high offices', 'সর্বোচ্চ পদে প্রথম যাঁরা'),
      spot: t(
        'The question asks who was the first President, Vice-President, Prime Minister, woman Prime Minister or woman President of India.',
        'প্রশ্নে জানতে চায় ভারতের প্রথম রাষ্ট্রপতি, উপরাষ্ট্রপতি, প্রধানমন্ত্রী, প্রথম মহিলা প্রধানমন্ত্রী বা প্রথম মহিলা রাষ্ট্রপতি কে।',
      ),
      method: [
        t('President: Dr Rajendra Prasad. Vice-President: Dr Sarvepalli Radhakrishnan (1952–62). Prime Minister: Jawaharlal Nehru (1947–64).', 'রাষ্ট্রপতি: ড. রাজেন্দ্র প্রসাদ। উপরাষ্ট্রপতি: ড. সর্বপল্লী রাধাকৃষ্ণন (১৯৫২–৬২)। প্রধানমন্ত্রী: জওহরলাল নেহরু (১৯৪৭–৬৪)।'),
        t('First woman Prime Minister: Indira Gandhi (first term from 24 January 1966). First woman President: Pratibha Devisingh Patil (elected July 2007).', 'প্রথম মহিলা প্রধানমন্ত্রী: ইন্দিরা গান্ধী (প্রথম কার্যকাল ২৪ জানুয়ারি ১৯৬৬ থেকে)। প্রথম মহিলা রাষ্ট্রপতি: প্রতিভা দেবীসিং পাটিল (নির্বাচিত জুলাই ২০০৭)।'),
        t('Read the office carefully: Radhakrishnan was the first Vice-President, not the first President.', 'পদটি মন দিয়ে পড়ো: রাধাকৃষ্ণন প্রথম উপরাষ্ট্রপতি, প্রথম রাষ্ট্রপতি নন।'),
      ],
      example: {
        question: t('Who was the first Vice-President of India?', 'ভারতের প্রথম উপরাষ্ট্রপতি কে ছিলেন?'),
        steps: [
          t('Rajendra Prasad was the first President, so he is not the answer.', 'রাজেন্দ্র প্রসাদ প্রথম রাষ্ট্রপতি, তাই তিনি উত্তর নন।'),
          t('The Vice-President\'s official list begins with Dr Sarvepalli Radhakrishnan, 13 May 1952 to 12 May 1962.', 'উপরাষ্ট্রপতির সরকারি তালিকা শুরু হয় ড. সর্বপল্লী রাধাকৃষ্ণন দিয়ে, ১৩ মে ১৯৫২ থেকে ১২ মে ১৯৬২।'),
        ],
        answer: t('Dr Sarvepalli Radhakrishnan', 'ড. সর্বপল্লী রাধাকৃষ্ণন'),
      },
      tryIt: {
        question: t('Who was the first woman to be elected President of India?', 'ভারতের রাষ্ট্রপতি পদে নির্বাচিত প্রথম মহিলা কে?'),
        options: [t('Indira Gandhi', 'ইন্দিরা গান্ধী'), t('Pratibha Devisingh Patil', 'প্রতিভা দেবীসিং পাটিল'), t('Sarojini Naidu', 'সরোজিনী নাইডু'), t('Droupadi Murmu', 'দ্রৌপদী মুর্মু')],
        correct: 1,
        explanation: [
          t('Pratibha Devisingh Patil was elected President in July 2007, the first woman to hold the office.', 'প্রতিভা দেবীসিং পাটিল ২০০৭ সালের জুলাইয়ে রাষ্ট্রপতি নির্বাচিত হন, এই পদে প্রথম মহিলা।'),
          t('Indira Gandhi was the first woman Prime Minister, a different office.', 'ইন্দিরা গান্ধী প্রথম মহিলা প্রধানমন্ত্রী, যা আলাদা পদ।'),
        ],
      },
    },
    {
      key: 'firsts_with_milestones',
      emoji: '🚇',
      name: t('Firsts in science and transport: which milestone?', 'বিজ্ঞান ও পরিবহনে প্রথম: কোন মাইলফলক?'),
      spot: t(
        'The question asks about the first metro, the first nuclear power plant or the first Indian in space, often with a year that depends on which stage it means.',
        'প্রশ্নে প্রথম মেট্রো, প্রথম পারমাণবিক বিদ্যুৎকেন্দ্র বা মহাকাশে প্রথম ভারতীয় নিয়ে জানতে চায়, প্রায়ই এমন একটি সাল সহ যা কোন পর্যায়ের কথা বলা হচ্ছে তার উপর নির্ভর করে।',
      ),
      method: [
        t('Kolkata Metro: sanctioned 1 June 1972, foundation stone 29 December 1972, first commercial service 24 October 1984 (Esplanade to Netaji Bhavan).', 'কলকাতা মেট্রো: অনুমোদন ১ জুন ১৯৭২, ভিত্তিপ্রস্তর ২৯ ডিসেম্বর ১৯৭২, প্রথম বাণিজ্যিক পরিষেবা ২৪ অক্টোবর ১৯৮৪ (এসপ্ল্যানেড থেকে নেতাজি ভবন)।'),
        t('Tarapur (Maharashtra): NPCIL\'s earliest nuclear power plant, commercial operation 28 October 1969. Apsara (Trombay) is a BARC research reactor, not a power station.', 'তারাপুর (মহারাষ্ট্র): NPCIL-এর সবচেয়ে পুরনো পারমাণবিক বিদ্যুৎকেন্দ্র, বাণিজ্যিক উৎপাদন ২৮ অক্টোবর ১৯৬৯। অপ্সরা (ট্রম্বে) BARC-এর গবেষণা চুল্লি, বিদ্যুৎকেন্দ্র নয়।'),
        t('Rakesh Sharma: first Indian in space, 1984, aboard the Soviet Soyuz.', 'রাকেশ শর্মা: মহাকাশে প্রথম ভারতীয়, ১৯৮৪, সোভিয়েত সয়ুজ-এ।'),
      ],
      example: {
        question: t('In which year did India\'s first metro begin commercial service?', 'ভারতের প্রথম মেট্রো কোন সালে বাণিজ্যিক পরিষেবা শুরু করে?'),
        steps: [
          t('1972 is the year of sanction and the foundation stone, not of service.', '১৯৭২ অনুমোদন ও ভিত্তিপ্রস্তরের সাল, পরিষেবার নয়।'),
          t('Partial commercial service of the Kolkata Metro began on 24 October 1984.', 'কলকাতা মেট্রোর আংশিক বাণিজ্যিক পরিষেবা শুরু হয় ২৪ অক্টোবর ১৯৮৪-এ।'),
        ],
        answer: t('1984', '১৯৮৪'),
      },
    },
    {
      key: 'institutions_headquarters',
      emoji: '🏛️',
      name: t('Institutions: where and when', 'প্রতিষ্ঠান: কোথায় ও কবে'),
      spot: t('The question asks where an institution has its headquarters, or when it was set up.', 'প্রশ্নে জানতে চায় কোনো প্রতিষ্ঠানের সদর দপ্তর কোথায়, বা কবে প্রতিষ্ঠিত।'),
      method: [
        t('RBI: established 1 April 1935; Central Office first in Kolkata, permanently moved to Mumbai in 1937.', 'আরবিআই: প্রতিষ্ঠা ১ এপ্রিল ১৯৩৫; কেন্দ্রীয় কার্যালয় প্রথমে কলকাতায়, ১৯৩৭-এ স্থায়ীভাবে মুম্বাইয়ে।'),
        t('ISRO and the Department of Space: Antariksh Bhavan, Bengaluru. INCOSPAR 1962, ISRO August 1969, Department of Space June 1972.', 'ইসরো ও মহাকাশ বিভাগ: অন্তরীক্ষ ভবন, বেঙ্গালুরু। INCOSPAR ১৯৬২, ইসরো আগস্ট ১৯৬৯, মহাকাশ বিভাগ জুন ১৯৭২।'),
        t('National Aquatic Animal: the Gangetic river dolphin (decision of 5 October 2009). National River: the Ganga.', 'জাতীয় জলজ প্রাণী: গাঙ্গেয় শুশুক (৫ অক্টোবর ২০০৯-এর সিদ্ধান্ত)। জাতীয় নদী: গঙ্গা।'),
      ],
      example: {
        question: t('Where was the RBI\'s Central Office first established?', 'আরবিআই-এর কেন্দ্রীয় কার্যালয় প্রথমে কোথায় স্থাপিত হয়?'),
        steps: [
          t('Today the Central Office is in Mumbai, but it moved there permanently only in 1937.', 'এখন কেন্দ্রীয় কার্যালয় মুম্বাইয়ে, তবে সেখানে স্থায়ীভাবে যায় ১৯৩৭-এ।'),
          t('When the RBI was established in 1935, its Central Office was in Kolkata.', '১৯৩৫-এ আরবিআই প্রতিষ্ঠার সময় এর কেন্দ্রীয় কার্যালয় ছিল কলকাতায়।'),
        ],
        answer: t('Kolkata', 'কলকাতা'),
      },
    },
  ],
};
