'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'west_bengal_gk',
  patterns: [
    {
      key: 'famous_bengalis',
      emoji: '📚',
      name: t('Famous Bengalis and their work', 'বিখ্যাত বাঙালি ও তাঁদের কাজ'),
      spot: t(
        'The question names a famous person from Bengal and asks his work, book or reform, or describes the work and asks who did it.',
        'প্রশ্নে বাংলার কোনো বিখ্যাত মানুষের নাম দিয়ে তাঁর কাজ, বই বা সংস্কার জানতে চায়, অথবা কাজের কথা বলে মানুষটিকে জানতে চায়।',
      ),
      method: [
        t('Rabindranath Tagore: Nobel Prize in Literature 1913 for "Gitanjali"; wrote "Jana Gana Mana"; founded Visva-Bharati at Santiniketan.', 'রবীন্দ্রনাথ ঠাকুর: "গীতাঞ্জলি"-র জন্য 1913 সালে সাহিত্যে নোবেল; "জনগণমন" রচয়িতা; শান্তিনিকেতনে বিশ্বভারতী প্রতিষ্ঠা।'),
        t('Bankim Chandra Chattopadhyay: wrote "Vande Mataram" in the novel "Anandamath".', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়: "আনন্দমঠ" উপন্যাসে "বন্দে মাতরম্" রচনা।'),
        t('Ishwar Chandra Vidyasagar: widow remarriage (Act of 1856), "Barna Parichay". Raja Ram Mohan Roy: fought against Sati, founded Brahmo Samaj.', 'ঈশ্বরচন্দ্র বিদ্যাসাগর: বিধবা বিবাহ (1856 সালের আইন), "বর্ণপরিচয়"। রাজা রামমোহন রায়: সতীদাহের বিরুদ্ধে লড়াই, ব্রাহ্মসমাজ প্রতিষ্ঠা।'),
        t('Scientists: Jagadish Chandra Bose (life in plants, crescograph), Satyendra Nath Bose (Bose–Einstein statistics; "boson" is named after him).', 'বিজ্ঞানী: জগদীশচন্দ্র বসু (উদ্ভিদের প্রাণ, ক্রেসকোগ্রাফ), সত্যেন্দ্রনাথ বসু (বসু–আইনস্টাইন সংখ্যায়ন; "বোসন" কণা তাঁর নামে)।'),
      ],
      example: {
        question: t('Who is linked with the Widow Remarriage Act of 1856?', '1856 সালের বিধবা বিবাহ আইনের সঙ্গে কে যুক্ত?'),
        steps: [
          t('Ram Mohan Roy is linked with Sati, which is a different reform, and he died in 1833.', 'রামমোহন রায় সতীদাহ প্রথার সঙ্গে যুক্ত, যা অন্য সংস্কার, আর তিনি 1833 সালে মারা যান।'),
          t('The campaign for widow remarriage was led by Ishwar Chandra Vidyasagar.', 'বিধবা বিবাহের আন্দোলনের নেতৃত্ব দেন ঈশ্বরচন্দ্র বিদ্যাসাগর।'),
        ],
        answer: t('Ishwar Chandra Vidyasagar', 'ঈশ্বরচন্দ্র বিদ্যাসাগর'),
      },
      tryIt: {
        question: t('Who wrote "Vande Mataram"?', '"বন্দে মাতরম্" কে রচনা করেন?'),
        options: [
          t('Rabindranath Tagore', 'রবীন্দ্রনাথ ঠাকুর'),
          t('Kazi Nazrul Islam', 'কাজী নজরুল ইসলাম'),
          t('Ishwar Chandra Vidyasagar', 'ঈশ্বরচন্দ্র বিদ্যাসাগর'),
          t('Bankim Chandra Chattopadhyay', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়'),
        ],
        correct: 3,
        explanation: [
          t('"Vande Mataram" was written by Bankim Chandra Chattopadhyay and appears in his novel "Anandamath".', '"বন্দে মাতরম্" লেখেন বঙ্কিমচন্দ্র চট্টোপাধ্যায়, এটি তাঁর "আনন্দমঠ" উপন্যাসে আছে।'),
          t('Trap: Tagore wrote the national anthem "Jana Gana Mana", not "Vande Mataram" (the national song).', 'ফাঁদ: রবীন্দ্রনাথ জাতীয় সংগীত "জনগণমন" লেখেন, "বন্দে মাতরম্" (জাতীয় স্তোত্র) নয়।'),
        ],
      },
    },
    {
      key: 'wb_rivers_nature',
      emoji: '🐅',
      name: t('Rivers, hills and forests of West Bengal', 'পশ্চিমবঙ্গের নদী, পাহাড় ও বনভূমি'),
      spot: t(
        'The question asks about a river\'s nickname, the highest peak, or a forest or national park of West Bengal.',
        'প্রশ্নে পশ্চিমবঙ্গের কোনো নদীর ডাকনাম, সর্বোচ্চ শৃঙ্গ, বা কোনো বনভূমি বা জাতীয় উদ্যান নিয়ে জানতে চায়।',
      ),
      method: [
        t('Damodar: once called the "Sorrow of Bengal" because of its floods; the Damodar Valley Corporation (DVC) was set up to control it.', 'দামোদর: বন্যার জন্য একে একসময় "বাংলার দুঃখ" বলা হতো; একে নিয়ন্ত্রণ করতে দামোদর উপত্যকা কর্পোরেশন (DVC) গঠিত হয়।'),
        t('Highest peak of West Bengal: Sandakphu, in the Singalila range of Darjeeling district.', 'পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ: সান্দাকফু, দার্জিলিং জেলার সিঙ্গালিলা পর্বতশ্রেণিতে।'),
        t('Sundarbans: the largest mangrove forest in the world, home of the Royal Bengal Tiger; UNESCO World Heritage Site.', 'সুন্দরবন: পৃথিবীর বৃহত্তম ম্যানগ্রোভ অরণ্য, রয়্যাল বেঙ্গল টাইগারের বাসস্থান; ইউনেস্কো বিশ্ব ঐতিহ্যক্ষেত্র।'),
        t('The Ganga splits in Murshidabad: the Padma goes into Bangladesh, the Bhagirathi-Hooghly flows past Kolkata.', 'মুর্শিদাবাদে গঙ্গা দুই ভাগ হয়: পদ্মা বাংলাদেশে যায়, ভাগীরথী-হুগলি কলকাতার পাশ দিয়ে বয়ে যায়।'),
      ],
      example: {
        question: t('Which is the highest peak of West Bengal?', 'পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ কোনটি?'),
        steps: [
          t('The high mountains of West Bengal are in the north, in Darjeeling district.', 'পশ্চিমবঙ্গের উঁচু পাহাড় উত্তরে, দার্জিলিং জেলায়।'),
          t('The highest point there is Sandakphu in the Singalila range (Kanchenjunga is higher, but it is in Sikkim and Nepal, not in West Bengal).', 'সেখানকার সর্বোচ্চ বিন্দু সিঙ্গালিলা শ্রেণির সান্দাকফু (কাঞ্চনজঙ্ঘা আরও উঁচু, কিন্তু সেটি সিকিম ও নেপালে, পশ্চিমবঙ্গে নয়)।'),
        ],
        answer: t('Sandakphu', 'সান্দাকফু'),
      },
      tryIt: {
        question: t('Which river was called the "Sorrow of Bengal"?', 'কোন নদীকে "বাংলার দুঃখ" বলা হতো?'),
        options: [t('Damodar', 'দামোদর'), t('Teesta', 'তিস্তা'), t('Rupnarayan', 'রূপনারায়ণ'), t('Ajay', 'অজয়')],
        correct: 0,
        explanation: [
          t('The Damodar used to cause terrible floods in the plains of Bengal, so it was called the "Sorrow of Bengal".', 'দামোদর বাংলার সমভূমিতে ভয়াবহ বন্যা ঘটাত, তাই একে "বাংলার দুঃখ" বলা হতো।'),
          t('To control these floods, dams were built under the Damodar Valley Corporation (1948).', 'এই বন্যা আটকাতে দামোদর উপত্যকা কর্পোরেশনের (1948) অধীনে বাঁধ তৈরি হয়।'),
        ],
      },
    },
    {
      key: 'places_famous_for',
      emoji: '🏰',
      name: t('Places of West Bengal and what they are famous for', 'পশ্চিমবঙ্গের স্থান ও তাদের খ্যাতি'),
      spot: t(
        'The question names a monument, craft or institution and asks which place or district it is in.',
        'প্রশ্নে কোনো স্মৃতিসৌধ, কারুশিল্প বা প্রতিষ্ঠানের নাম দিয়ে জানতে চায় সেটি কোন স্থানে বা জেলায়।',
      ),
      method: [
        t('Murshidabad: Hazarduari Palace (palace of a thousand doors), old capital of the Nawabs of Bengal.', 'মুর্শিদাবাদ: হাজারদুয়ারি প্রাসাদ (হাজার দরজার প্রাসাদ), বাংলার নবাবদের পুরোনো রাজধানী।'),
        t('Bishnupur (Bankura): terracotta temples and Baluchari saris. Krishnanagar (Nadia): clay dolls of Ghurni.', 'বিষ্ণুপুর (বাঁকুড়া): টেরাকোটা মন্দির ও বালুচরী শাড়ি। কৃষ্ণনগর (নদিয়া): ঘূর্ণির মাটির পুতুল।'),
        t('Santiniketan (Birbhum): Visva-Bharati. Darjeeling: tea and the Darjeeling Himalayan Railway ("toy train", a UNESCO World Heritage Site).', 'শান্তিনিকেতন (বীরভূম): বিশ্বভারতী। দার্জিলিং: চা এবং দার্জিলিং হিমালয়ান রেলওয়ে ("টয় ট্রেন", ইউনেস্কো বিশ্ব ঐতিহ্যক্ষেত্র)।'),
      ],
      example: {
        question: t('Bishnupur, famous for terracotta temples, is in which district?', 'টেরাকোটা মন্দিরের জন্য বিখ্যাত বিষ্ণুপুর কোন জেলায়?'),
        steps: [
          t('Bishnupur was the capital of the Malla kings, who built brick temples with terracotta work.', 'বিষ্ণুপুর ছিল মল্ল রাজাদের রাজধানী, তাঁরা টেরাকোটার কাজসহ ইটের মন্দির বানান।'),
          t('This town is in Bankura district.', 'এই শহরটি বাঁকুড়া জেলায়।'),
        ],
        answer: t('Bankura', 'বাঁকুড়া'),
      },
      tryIt: {
        question: t('The Hazarduari Palace is located in which place?', 'হাজারদুয়ারি প্রাসাদ কোথায় অবস্থিত?'),
        options: [t('Cooch Behar', 'কোচবিহার'), t('Murshidabad', 'মুর্শিদাবাদ'), t('Bishnupur', 'বিষ্ণুপুর'), t('Krishnanagar', 'কৃষ্ণনগর')],
        correct: 1,
        explanation: [
          t('Hazarduari ("a thousand doors") Palace stands on the bank of the Bhagirathi in Murshidabad, the old capital of the Nawabs.', 'হাজারদুয়ারি ("হাজার দরজা") প্রাসাদ নবাবদের পুরোনো রাজধানী মুর্শিদাবাদে ভাগীরথীর তীরে দাঁড়িয়ে আছে।'),
          t('Cooch Behar has its own Rajbari, Bishnupur has terracotta temples and Krishnanagar has clay dolls.', 'কোচবিহারে আছে রাজবাড়ি, বিষ্ণুপুরে টেরাকোটা মন্দির, আর কৃষ্ণনগরে মাটির পুতুল।'),
        ],
      },
    },
    {
      key: 'bengal_history_dates',
      emoji: '🗓️',
      name: t('History of Bengal: events and institutions', 'বাংলার ইতিহাস: ঘটনা ও প্রতিষ্ঠান'),
      spot: t(
        'The question asks the year of an event in Bengal\'s history, or who founded an old institution in Kolkata.',
        'প্রশ্নে বাংলার ইতিহাসের কোনো ঘটনার সাল, বা কলকাতার কোনো পুরোনো প্রতিষ্ঠান কে প্রতিষ্ঠা করেন তা জানতে চায়।',
      ),
      method: [
        t('Events: Battle of Plassey 1757 → Partition of Bengal 1905 (Lord Curzon) → Partition annulled 1911 (capital shifted from Calcutta to Delhi announced the same year).', 'ঘটনা: পলাশীর যুদ্ধ 1757 → বঙ্গভঙ্গ 1905 (লর্ড কার্জন) → বঙ্গভঙ্গ রদ 1911 (একই বছর কলকাতা থেকে দিল্লিতে রাজধানী সরানোর ঘোষণা)।'),
        t('Institutions in time order: Asiatic Society 1784 (William Jones) → Fort William College 1800 → Hindu College 1817 → University of Calcutta 1857.', 'প্রতিষ্ঠান সময়ের ক্রমে: এশিয়াটিক সোসাইটি 1784 (উইলিয়াম জোন্স) → ফোর্ট উইলিয়াম কলেজ 1800 → হিন্দু কলেজ 1817 → কলকাতা বিশ্ববিদ্যালয় 1857।'),
        t('Trick: the Partition lasted just 6 years: 1905 to 1911.', 'কৌশল: বঙ্গভঙ্গ টিকেছিল মাত্র 6 বছর: 1905 থেকে 1911।'),
      ],
      example: {
        question: t('In which year was the Partition of Bengal annulled?', 'বঙ্গভঙ্গ কোন সালে রদ হয়?'),
        steps: [
          t('Bengal was partitioned by Lord Curzon in 1905, and people protested strongly through the Swadeshi movement.', '1905 সালে লর্ড কার্জন বঙ্গভঙ্গ করেন, আর মানুষ স্বদেশি আন্দোলনের মাধ্যমে প্রবল প্রতিবাদ করে।'),
          t('It lasted 6 years: 1905 + 6 = 1911, when it was cancelled.', 'এটি 6 বছর টিকেছিল: 1905 + 6 = 1911, তখন এটি বাতিল হয়।'),
        ],
        answer: t('1911', '1911 সাল'),
      },
      tryIt: {
        question: t('Who founded the Asiatic Society in Kolkata in 1784?', '1784 সালে কলকাতায় এশিয়াটিক সোসাইটি কে প্রতিষ্ঠা করেন?'),
        options: [t('David Hare', 'ডেভিড হেয়ার'), t('Lord Curzon', 'লর্ড কার্জন'), t('Robert Clive', 'রবার্ট ক্লাইভ'), t('William Jones', 'উইলিয়াম জোন্স')],
        correct: 3,
        explanation: [
          t('Sir William Jones, a scholar of ancient Indian languages, founded the Asiatic Society in 1784.', 'প্রাচীন ভারতীয় ভাষার পণ্ডিত স্যার উইলিয়াম জোন্স 1784 সালে এশিয়াটিক সোসাইটি প্রতিষ্ঠা করেন।'),
          t('David Hare is linked with Hindu College, Curzon with the 1905 Partition, and Clive with Plassey.', 'ডেভিড হেয়ার হিন্দু কলেজের সঙ্গে, কার্জন 1905-এর বঙ্গভঙ্গের সঙ্গে, আর ক্লাইভ পলাশীর সঙ্গে যুক্ত।'),
        ],
      },
    },
    {
      key: 'folk_culture',
      emoji: '🥁',
      name: t('Folk dance and folk songs: which district', 'লোকনৃত্য ও লোকসংগীত: কোন জেলার'),
      spot: t(
        'The question names a folk dance or folk song of Bengal and asks which district or region it belongs to.',
        'প্রশ্নে বাংলার কোনো লোকনৃত্য বা লোকসংগীতের নাম দিয়ে জানতে চায় সেটি কোন জেলা বা অঞ্চলের।',
      ),
      method: [
        t('Chhau dance (with masks): Purulia. Jhumur songs: Purulia and Bankura.', 'ছৌ নাচ (মুখোশ পরে): পুরুলিয়া। ঝুমুর গান: পুরুলিয়া ও বাঁকুড়া।'),
        t('Bhawaiya songs: Cooch Behar (north Bengal). Gambhira: Malda.', 'ভাওয়াইয়া গান: কোচবিহার (উত্তরবঙ্গ)। গম্ভীরা: মালদা।'),
        t('Baul songs: wandering singers, famous at the Joydev Kenduli fair in Birbhum.', 'বাউল গান: ভ্রাম্যমাণ গায়ক, বীরভূমের জয়দেব কেঁদুলির মেলায় বিখ্যাত।'),
      ],
      example: {
        question: t('Gambhira folk song-and-dance is associated with which district?', 'গম্ভীরা লোকগান ও নাচ কোন জেলার সঙ্গে যুক্ত?'),
        steps: [
          t('Gambhira is performed during the Gajan festival in honour of Lord Shiva.', 'গম্ভীরা শিবের গাজন উৎসবের সময় পরিবেশিত হয়।'),
          t('It is the special folk form of Malda district.', 'এটি মালদা জেলার বিশেষ লোকশিল্প।'),
        ],
        answer: t('Malda', 'মালদা'),
      },
      tryIt: {
        question: t('The Chhau dance of West Bengal is mainly associated with which district?', 'পশ্চিমবঙ্গের ছৌ নাচ প্রধানত কোন জেলার সঙ্গে যুক্ত?'),
        options: [t('Darjeeling', 'দার্জিলিং'), t('Nadia', 'নদিয়া'), t('Purulia', 'পুরুলিয়া'), t('Howrah', 'হাওড়া')],
        correct: 2,
        explanation: [
          t('Chhau is a powerful mask dance from Purulia, often showing stories from the epics.', 'ছৌ হলো পুরুলিয়ার জোরালো মুখোশ-নাচ, প্রায়ই মহাকাব্যের কাহিনি দেখায়।'),
          t('Darjeeling, Nadia and Howrah are not known for Chhau, so Purulia is the answer.', 'দার্জিলিং, নদিয়া ও হাওড়া ছৌ নাচের জন্য পরিচিত নয়, তাই উত্তর পুরুলিয়া।'),
        ],
      },
    },
  ],
};
