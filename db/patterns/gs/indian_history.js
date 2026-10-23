'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'indian_history',
  patterns: [
    {
      key: 'battles_years',
      emoji: '⚔️',
      name: t('Famous battles: year and sides', 'বিখ্যাত যুদ্ধ: সাল ও কারা লড়েছিল'),
      spot: t(
        'The question names a battle and asks its year, or who fought / who won.',
        'প্রশ্নে কোনো যুদ্ধের নাম দিয়ে তার সাল, কারা লড়েছিল বা কে জিতেছিল তা জানতে চায়।',
      ),
      method: [
        t('Panipat has three battles: 1526 (Babur beat Ibrahim Lodi), 1556 (Akbar\'s side beat Hemu), 1761 (Ahmad Shah Abdali beat the Marathas).', 'পানিপথের তিনটি যুদ্ধ: 1526 (বাবর ইব্রাহিম লোদিকে হারান), 1556 (আকবরের পক্ষ হিমুকে হারায়), 1761 (আহমদ শাহ আবদালি মারাঠাদের হারান)।'),
        t('Bengal pair: Plassey 1757 (Clive beat Siraj-ud-Daulah), Buxar 1764 (British beat Mir Qasim, Shuja-ud-Daulah and Shah Alam II).', 'বাংলার জোড়া: পলাশী 1757 (ক্লাইভ সিরাজউদ্দৌলাকে হারান), বক্সার 1764 (ইংরেজরা মীর কাশিম, সুজাউদ্দৌলা ও দ্বিতীয় শাহ আলমকে হারায়)।'),
        t('Trick for Panipat: the gap is 30 years, then about 200 years (1526 → 1556 → 1761).', 'পানিপথের কৌশল: প্রথমে 30 বছরের ফাঁক, তারপর প্রায় 200 বছর (1526 → 1556 → 1761)।'),
      ],
      example: {
        question: t('Who fought the First Battle of Panipat (1526)?', 'পানিপথের প্রথম যুদ্ধ (1526) কাদের মধ্যে হয়েছিল?'),
        steps: [
          t('1526 is the first Panipat, the start of the Mughal Empire.', '1526 হলো পানিপথের প্রথম যুদ্ধ, মুঘল সাম্রাজ্যের সূচনা।'),
          t('The first Mughal was Babur, and he defeated the Delhi Sultan Ibrahim Lodi.', 'প্রথম মুঘল সম্রাট বাবর, তিনি দিল্লির সুলতান ইব্রাহিম লোদিকে হারান।'),
        ],
        answer: t('Babur and Ibrahim Lodi (Babur won)', 'বাবর ও ইব্রাহিম লোদি (বাবর জয়ী)'),
      },
      tryIt: {
        question: t('In which year was the Battle of Plassey fought?', 'পলাশীর যুদ্ধ কোন সালে হয়েছিল?'),
        options: [t('1764', '1764'), t('1761', '1761'), t('1757', '1757'), t('1857', '1857')],
        correct: 2,
        explanation: [
          t('Plassey (1757) was between Robert Clive and Nawab Siraj-ud-Daulah of Bengal.', 'পলাশীর যুদ্ধ (1757) হয়েছিল রবার্ট ক্লাইভ ও বাংলার নবাব সিরাজউদ্দৌলার মধ্যে।'),
          t('1764 is Buxar, 1761 is the Third Battle of Panipat, and 1857 is the Great Revolt, so they are wrong.', '1764 বক্সারের যুদ্ধ, 1761 পানিপথের তৃতীয় যুদ্ধ, আর 1857 মহাবিদ্রোহ, তাই এগুলো ভুল।'),
        ],
      },
    },
    {
      key: 'reform_founders',
      emoji: '🕯️',
      name: t('Who founded which organisation / reform movement', 'কে কোন সংগঠন / সংস্কার আন্দোলন প্রতিষ্ঠা করেন'),
      spot: t(
        'The question names a Samaj, Mission or society and asks its founder, or names a reformer and asks what he founded.',
        'প্রশ্নে কোনো সমাজ, মিশন বা সংগঠনের নাম দিয়ে প্রতিষ্ঠাতা জানতে চায়, অথবা সংস্কারকের নাম দিয়ে জানতে চায় তিনি কী প্রতিষ্ঠা করেন।',
      ),
      method: [
        t('Make pairs: Brahmo Samaj (1828) – Raja Ram Mohan Roy; Arya Samaj (1875) – Swami Dayanand Saraswati.', 'জোড়া বানাও: ব্রাহ্মসমাজ (1828) – রাজা রামমোহন রায়; আর্যসমাজ (1875) – স্বামী দয়ানন্দ সরস্বতী।'),
        t('Ramakrishna Mission (1897) – Swami Vivekananda (named after his guru Ramakrishna). Satyashodhak Samaj (1873) – Jyotirao Phule.', 'রামকৃষ্ণ মিশন (1897) – স্বামী বিবেকানন্দ (গুরু রামকৃষ্ণের নামে)। সত্যশোধক সমাজ (1873) – জ্যোতিরাও ফুলে।'),
        t('Watch the trap: the Ramakrishna Mission was founded by Vivekananda, not by Ramakrishna himself.', 'ফাঁদ থেকে সাবধান: রামকৃষ্ণ মিশন প্রতিষ্ঠা করেন বিবেকানন্দ, রামকৃষ্ণ নিজে নন।'),
      ],
      example: {
        question: t('Who founded the Ramakrishna Mission?', 'রামকৃষ্ণ মিশন কে প্রতিষ্ঠা করেন?'),
        steps: [
          t('The name says "Ramakrishna", but he passed away in 1886, before the Mission began in 1897.', 'নামে "রামকৃষ্ণ" আছে, কিন্তু তিনি 1886 সালে মারা যান, মিশন শুরু হয় 1897 সালে।'),
          t('His disciple Swami Vivekananda founded it in his guru\'s name.', 'তাঁর শিষ্য স্বামী বিবেকানন্দ গুরুর নামে এটি প্রতিষ্ঠা করেন।'),
        ],
        answer: t('Swami Vivekananda', 'স্বামী বিবেকানন্দ'),
      },
      tryIt: {
        question: t('Who founded the Arya Samaj?', 'আর্যসমাজ কে প্রতিষ্ঠা করেন?'),
        options: [t('Raja Ram Mohan Roy', 'রাজা রামমোহন রায়'), t('Swami Vivekananda', 'স্বামী বিবেকানন্দ'), t('Swami Dayanand Saraswati', 'স্বামী দয়ানন্দ সরস্বতী'), t('Jyotirao Phule', 'জ্যোতিরাও ফুলে')],
        correct: 2,
        explanation: [
          t('Swami Dayanand Saraswati founded the Arya Samaj in 1875 and gave the call "Go back to the Vedas".', 'স্বামী দয়ানন্দ সরস্বতী 1875 সালে আর্যসমাজ প্রতিষ্ঠা করেন এবং "বেদে ফিরে চলো" ডাক দেন।'),
          t('Ram Mohan Roy founded the Brahmo Samaj, Vivekananda the Ramakrishna Mission, and Phule the Satyashodhak Samaj.', 'রামমোহন রায় ব্রাহ্মসমাজ, বিবেকানন্দ রামকৃষ্ণ মিশন, আর ফুলে সত্যশোধক সমাজ প্রতিষ্ঠা করেন।'),
        ],
      },
    },
    {
      key: 'governor_general_events',
      emoji: '👑',
      name: t('Governor-General / Viceroy and the event in his time', 'গভর্নর-জেনারেল / ভাইসরয় ও তাঁর সময়ের ঘটনা'),
      spot: t(
        'The question names a British policy or event and asks which Governor-General or Viceroy was in charge then.',
        'প্রশ্নে কোনো ব্রিটিশ নীতি বা ঘটনার নাম দিয়ে জানতে চায় তখন কোন গভর্নর-জেনারেল বা ভাইসরয় ছিলেন।',
      ),
      method: [
        t('Cornwallis – Permanent Settlement (1793). Wellesley – Subsidiary Alliance.', 'কর্নওয়ালিস – চিরস্থায়ী বন্দোবস্ত (1793)। ওয়েলেসলি – অধীনতামূলক মিত্রতা।'),
        t('William Bentinck – abolition of Sati (1829). Dalhousie – Doctrine of Lapse, first railway (1853).', 'উইলিয়াম বেন্টিঙ্ক – সতীদাহ প্রথা রদ (1829)। ডালহৌসি – স্বত্ববিলোপ নীতি, প্রথম রেলপথ (1853)।'),
        t('Lytton – Vernacular Press Act (1878). Ripon – Ilbert Bill, local self-government. Curzon – Partition of Bengal (1905).', 'লিটন – দেশীয় সংবাদপত্র আইন (1878)। রিপন – ইলবার্ট বিল, স্থানীয় স্বায়ত্তশাসন। কার্জন – বঙ্গভঙ্গ (1905)।'),
        t('Put the names in time order (Cornwallis → Wellesley → Bentinck → Dalhousie → Lytton → Ripon → Curzon) to eliminate quickly.', 'নামগুলো সময়ের ক্রমে সাজাও (কর্নওয়ালিস → ওয়েলেসলি → বেন্টিঙ্ক → ডালহৌসি → লিটন → রিপন → কার্জন), তাহলে দ্রুত বাদ দিতে পারবে।'),
      ],
      example: {
        question: t('Sati was abolished in 1829 during the time of which Governor-General?', '1829 সালে কোন গভর্নর-জেনারেলের সময় সতীদাহ প্রথা রদ হয়?'),
        steps: [
          t('1829 is early 19th century, so Curzon (1905) and Ripon (1880s) are out.', '1829 হলো উনিশ শতকের শুরুর দিক, তাই কার্জন (1905) ও রিপন (1880-এর দশক) বাদ।'),
          t('Raja Ram Mohan Roy campaigned for it, and Lord William Bentinck passed the law.', 'রাজা রামমোহন রায় এর জন্য আন্দোলন করেন, আর লর্ড উইলিয়াম বেন্টিঙ্ক আইন পাশ করেন।'),
        ],
        answer: t('Lord William Bentinck', 'লর্ড উইলিয়াম বেন্টিঙ্ক'),
      },
      tryIt: {
        question: t('The "Doctrine of Lapse" is linked with which Governor-General?', '"স্বত্ববিলোপ নীতি" কোন গভর্নর-জেনারেলের সঙ্গে যুক্ত?'),
        options: [t('Lord Cornwallis', 'লর্ড কর্নওয়ালিস'), t('Lord Dalhousie', 'লর্ড ডালহৌসি'), t('Lord Curzon', 'লর্ড কার্জন'), t('Lord Ripon', 'লর্ড রিপন')],
        correct: 1,
        explanation: [
          t('Under the Doctrine of Lapse, a state whose ruler died without a natural son was taken over by the British; Lord Dalhousie used it to annex Satara, Jhansi and others.', 'স্বত্ববিলোপ নীতিতে কোনো রাজা নিজের পুত্র ছাড়া মারা গেলে ইংরেজরা সেই রাজ্য দখল করত; লর্ড ডালহৌসি এভাবে সাতারা, ঝাঁসি প্রভৃতি দখল করেন।'),
          t('Cornwallis is linked with the Permanent Settlement, Curzon with the Partition of Bengal, and Ripon with local self-government.', 'কর্নওয়ালিস চিরস্থায়ী বন্দোবস্তের সঙ্গে, কার্জন বঙ্গভঙ্গের সঙ্গে, আর রিপন স্থানীয় স্বায়ত্তশাসনের সঙ্গে যুক্ত।'),
        ],
      },
    },
    {
      key: 'freedom_movement_dates',
      emoji: '🇮🇳',
      name: t('Freedom movement: events and years', 'স্বাধীনতা আন্দোলন: ঘটনা ও সাল'),
      spot: t(
        'The question asks the year of a national movement event, or asks you to put events in order.',
        'প্রশ্নে জাতীয় আন্দোলনের কোনো ঘটনার সাল জানতে চায়, অথবা ঘটনাগুলো ক্রমানুসারে সাজাতে বলে।',
      ),
      method: [
        t('Build a timeline: 1885 Congress founded → 1905 Partition of Bengal → 1919 Jallianwala Bagh → 1920 Non-Cooperation → 1930 Dandi March / Civil Disobedience → 1942 Quit India → 1947 Independence.', 'একটি সময়রেখা বানাও: 1885 কংগ্রেস প্রতিষ্ঠা → 1905 বঙ্গভঙ্গ → 1919 জালিয়ানওয়ালাবাগ → 1920 অসহযোগ → 1930 ডান্ডি অভিযান / আইন অমান্য → 1942 ভারত ছাড়ো → 1947 স্বাধীনতা।'),
        t('Gandhi\'s three big movements are about 10 years apart: 1920, 1930, 1942.', 'গান্ধীজির তিনটি বড় আন্দোলন প্রায় 10 বছর অন্তর: 1920, 1930, 1942।'),
        t('Link slogans to movements: "Do or Die" – Quit India (1942).', 'স্লোগানের সঙ্গে আন্দোলন মেলাও: "করেঙ্গে ইয়া মরেঙ্গে" – ভারত ছাড়ো (1942)।'),
      ],
      example: {
        question: t('Arrange in order: Quit India Movement, Jallianwala Bagh massacre, Dandi March.', 'ক্রমানুসারে সাজাও: ভারত ছাড়ো আন্দোলন, জালিয়ানওয়ালাবাগ হত্যাকাণ্ড, ডান্ডি অভিযান।'),
        steps: [
          t('Write the years: Jallianwala Bagh 1919, Dandi March 1930, Quit India 1942.', 'সাল লেখো: জালিয়ানওয়ালাবাগ 1919, ডান্ডি অভিযান 1930, ভারত ছাড়ো 1942।'),
          t('Sort from smallest year to largest.', 'ছোট সাল থেকে বড় সালে সাজাও।'),
        ],
        answer: t('Jallianwala Bagh (1919) → Dandi March (1930) → Quit India (1942)', 'জালিয়ানওয়ালাবাগ (1919) → ডান্ডি অভিযান (1930) → ভারত ছাড়ো (1942)'),
      },
      tryIt: {
        question: t('In which year did the Quit India Movement begin?', 'ভারত ছাড়ো আন্দোলন কোন সালে শুরু হয়?'),
        options: [t('1930', '1930'), t('1920', '1920'), t('1919', '1919'), t('1942', '1942')],
        correct: 3,
        explanation: [
          t('Gandhiji launched the Quit India Movement in August 1942 with the slogan "Do or Die".', 'গান্ধীজি 1942 সালের আগস্টে "করেঙ্গে ইয়া মরেঙ্গে" স্লোগান দিয়ে ভারত ছাড়ো আন্দোলন শুরু করেন।'),
          t('1930 is the Dandi March, 1920 is Non-Cooperation, and 1919 is Jallianwala Bagh.', '1930 ডান্ডি অভিযান, 1920 অসহযোগ আন্দোলন, আর 1919 জালিয়ানওয়ালাবাগ।'),
        ],
      },
    },
    {
      key: 'buddha_mahavira_places',
      emoji: '☸️',
      name: t('Buddha and Mahavira: important places', 'বুদ্ধ ও মহাবীর: গুরুত্বপূর্ণ স্থান'),
      spot: t(
        'The question asks where Buddha or Mahavira was born, gained knowledge, gave a first sermon or died.',
        'প্রশ্নে জানতে চায় বুদ্ধ বা মহাবীর কোথায় জন্মান, জ্ঞানলাভ করেন, প্রথম উপদেশ দেন বা মারা যান।',
      ),
      method: [
        t('Buddha\'s four places in life order: born at Lumbini → enlightenment at Bodh Gaya → first sermon at Sarnath → death at Kushinagar.', 'বুদ্ধের চারটি স্থান জীবনের ক্রমে: জন্ম লুম্বিনী → বোধিলাভ বোধগয়া → প্রথম ধর্মোপদেশ সারনাথ → মৃত্যু কুশীনগর।'),
        t('Memory trick "L-B-S-K": Lumbini, Bodh Gaya, Sarnath, Kushinagar.', 'মনে রাখার কৌশল "লু-বো-সা-কু": লুম্বিনী, বোধগয়া, সারনাথ, কুশীনগর।'),
        t('Mahavira: born at Kundagrama near Vaishali, died at Pawapuri.', 'মহাবীর: বৈশালীর কাছে কুণ্ডগ্রামে জন্ম, পাবাপুরীতে মৃত্যু।'),
      ],
      example: {
        question: t('Where did Gautama Buddha attain enlightenment?', 'গৌতম বুদ্ধ কোথায় বোধিলাভ (জ্ঞানলাভ) করেন?'),
        steps: [
          t('Enlightenment is the second step of L-B-S-K.', 'বোধিলাভ হলো "লু-বো-সা-কু"-র দ্বিতীয় ধাপ।'),
          t('He meditated under a peepal (Bodhi) tree at Bodh Gaya.', 'তিনি বোধগয়ায় একটি অশ্বত্থ (বোধি) গাছের নিচে ধ্যান করেন।'),
        ],
        answer: t('Bodh Gaya', 'বোধগয়া'),
      },
      tryIt: {
        question: t('Where did Gautama Buddha give his first sermon?', 'গৌতম বুদ্ধ তাঁর প্রথম ধর্মোপদেশ কোথায় দেন?'),
        options: [t('Sarnath', 'সারনাথ'), t('Lumbini', 'লুম্বিনী'), t('Kushinagar', 'কুশীনগর'), t('Pawapuri', 'পাবাপুরী')],
        correct: 0,
        explanation: [
          t('The first sermon is the third step of L-B-S-K: Sarnath, near Varanasi.', 'প্রথম ধর্মোপদেশ হলো "লু-বো-সা-কু"-র তৃতীয় ধাপ: বারাণসীর কাছে সারনাথ।'),
          t('Lumbini is his birthplace, Kushinagar is where he died, and Pawapuri is linked with Mahavira.', 'লুম্বিনী তাঁর জন্মস্থান, কুশীনগরে তাঁর মৃত্যু, আর পাবাপুরী মহাবীরের সঙ্গে যুক্ত।'),
        ],
      },
    },
  ],
};
