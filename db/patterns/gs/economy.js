'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'economy',
  patterns: [
    {
      key: 'sectors_of_economy',
      emoji: '🏭',
      name: t('Which sector does an activity belong to?', 'কোনো কাজ অর্থনীতির কোন ক্ষেত্রের?'),
      spot: t(
        'The question names a job or activity (farming, factory work, banking) and asks if it is primary, secondary or tertiary.',
        'প্রশ্নে কোনো কাজের (চাষ, কারখানার কাজ, ব্যাংকিং) নাম দিয়ে জানতে চায় সেটি প্রাথমিক, মাধ্যমিক না তৃতীয় ক্ষেত্রের।',
      ),
      method: [
        t('Primary: taking things directly from nature: farming, fishing, forestry, mining.', 'প্রাথমিক: প্রকৃতি থেকে সরাসরি জিনিস নেওয়া: চাষ, মাছ ধরা, বনজ সম্পদ, খনি।'),
        t('Secondary: making things from raw materials: factories, manufacturing, construction.', 'মাধ্যমিক: কাঁচামাল থেকে জিনিস তৈরি: কারখানা, শিল্প উৎপাদন, নির্মাণ।'),
        t('Tertiary (service): giving a service, not a product: banking, transport, teaching, hospitals, trade.', 'তৃতীয় (পরিষেবা): জিনিস নয়, পরিষেবা দেওয়া: ব্যাংক, পরিবহণ, শিক্ষকতা, হাসপাতাল, ব্যবসা।'),
        t('Ask yourself: "Is it from nature, made in a factory, or a service?"', 'নিজেকে প্রশ্ন করো: "এটা প্রকৃতি থেকে, কারখানায় তৈরি, নাকি পরিষেবা?"'),
      ],
      example: {
        question: t('Making sugar from sugarcane in a mill belongs to which sector?', 'কলে আখ থেকে চিনি তৈরি কোন ক্ষেত্রের অন্তর্গত?'),
        steps: [
          t('Growing sugarcane is primary, but here we are changing sugarcane into a new product.', 'আখ চাষ প্রাথমিক, কিন্তু এখানে আখকে নতুন জিনিসে বদলানো হচ্ছে।'),
          t('Turning raw material into a product in a mill is manufacturing, which is the secondary sector.', 'কলে কাঁচামাল থেকে জিনিস বানানো হলো শিল্প উৎপাদন, যা মাধ্যমিক ক্ষেত্র।'),
        ],
        answer: t('Secondary sector', 'মাধ্যমিক ক্ষেত্র'),
      },
      tryIt: {
        question: t('Banking belongs to which sector of the economy?', 'ব্যাংকিং অর্থনীতির কোন ক্ষেত্রের অন্তর্গত?'),
        options: [t('Primary sector', 'প্রাথমিক ক্ষেত্র'), t('Secondary sector', 'মাধ্যমিক ক্ষেত্র'), t('None of these', 'কোনোটিই নয়'), t('Tertiary sector', 'তৃতীয় ক্ষেত্র')],
        correct: 3,
        explanation: [
          t('A bank does not take things from nature or make goods; it gives a service (keeping money, giving loans).', 'ব্যাংক প্রকৃতি থেকে কিছু নেয় না বা জিনিস বানায় না; এটি পরিষেবা দেয় (টাকা রাখা, ঋণ দেওয়া)।'),
          t('Services form the tertiary sector.', 'পরিষেবা হলো তৃতীয় ক্ষেত্র।'),
        ],
      },
    },
    {
      key: 'direct_indirect_tax',
      emoji: '🧾',
      name: t('Direct tax or indirect tax?', 'প্রত্যক্ষ কর না পরোক্ষ কর?'),
      spot: t(
        'The question lists taxes and asks which one is direct or indirect, or asks about GST.',
        'প্রশ্নে কয়েকটি কর দিয়ে জানতে চায় কোনটি প্রত্যক্ষ বা পরোক্ষ, অথবা GST নিয়ে প্রশ্ন।',
      ),
      method: [
        t('Direct tax: the person who earns pays it directly to the government and cannot pass it on: income tax, corporation tax.', 'প্রত্যক্ষ কর: যে আয় করে সে নিজেই সরকারকে দেয়, অন্যের ঘাড়ে চাপাতে পারে না: আয়কর, কর্পোরেশন কর।'),
        t('Indirect tax: added to the price of goods and services, so the buyer finally pays it: GST, customs duty.', 'পরোক্ষ কর: জিনিস বা পরিষেবার দামের সঙ্গে যোগ হয়, তাই শেষে ক্রেতা দেয়: GST, আমদানি-রপ্তানি শুল্ক (কাস্টমস)।'),
        t('GST (Goods and Services Tax) started on 1 July 2017 through the 101st Constitutional Amendment; it is an indirect tax.', 'GST (পণ্য ও পরিষেবা কর) 101তম সংবিধান সংশোধনীর মাধ্যমে 1 জুলাই 2017 থেকে চালু হয়; এটি পরোক্ষ কর।'),
      ],
      example: {
        question: t('Is GST a direct tax or an indirect tax?', 'GST প্রত্যক্ষ কর না পরোক্ষ কর?'),
        steps: [
          t('GST is added to the bill when you buy something.', 'কিছু কিনলে বিলের সঙ্গে GST যোগ হয়।'),
          t('The shop collects it but the buyer actually pays it, so the burden is passed on. That makes it indirect.', 'দোকান এটি আদায় করে কিন্তু আসলে ক্রেতা দেয়, অর্থাৎ বোঝা অন্যের উপর যায়। তাই এটি পরোক্ষ।'),
        ],
        answer: t('Indirect tax', 'পরোক্ষ কর'),
      },
      tryIt: {
        question: t('Which of these is a direct tax?', 'নিচের কোনটি প্রত্যক্ষ কর?'),
        options: [t('GST', 'GST'), t('Customs duty', 'কাস্টমস শুল্ক'), t('Income tax', 'আয়কর'), t('Excise duty', 'আবগারি শুল্ক')],
        correct: 2,
        explanation: [
          t('Income tax is paid by the earner directly to the government and cannot be passed on, so it is direct.', 'আয়কর উপার্জনকারী নিজেই সরকারকে দেয়, অন্যের উপর চাপাতে পারে না, তাই এটি প্রত্যক্ষ।'),
          t('GST, customs duty and excise duty are added to prices of goods, so they are indirect taxes.', 'GST, কাস্টমস শুল্ক ও আবগারি শুল্ক জিনিসের দামের সঙ্গে যোগ হয়, তাই এগুলো পরোক্ষ কর।'),
        ],
      },
    },
    {
      key: 'planning_in_india',
      emoji: '📅',
      name: t('Planning in India: Five Year Plans and NITI Aayog', 'ভারতে পরিকল্পনা: পঞ্চবার্ষিকী পরিকল্পনা ও নীতি আয়োগ'),
      spot: t(
        'The question asks when a plan or planning body started, what a plan focused on, or what replaced the Planning Commission.',
        'প্রশ্নে জানতে চায় কোনো পরিকল্পনা বা পরিকল্পনা সংস্থা কবে শুরু হয়, কোন পরিকল্পনা কী বিষয়ে জোর দিয়েছিল, বা যোজনা কমিশনের জায়গায় কী এসেছে।',
      ),
      method: [
        t('Planning Commission: set up in 1950, chaired by the Prime Minister.', 'যোজনা কমিশন: 1950 সালে গঠিত, সভাপতি প্রধানমন্ত্রী।'),
        t('First Five Year Plan (1951–56): focus on agriculture. Second Plan (1956–61): focus on heavy industry, based on the Mahalanobis model.', 'প্রথম পঞ্চবার্ষিকী পরিকল্পনা (1951–56): কৃষিতে জোর। দ্বিতীয় পরিকল্পনা (1956–61): ভারী শিল্পে জোর, মহলানবিশ মডেলের ভিত্তিতে।'),
        t('NITI Aayog replaced the Planning Commission on 1 January 2015.', 'নীতি আয়োগ 1 জানুয়ারি 2015 তারিখে যোজনা কমিশনের জায়গা নেয়।'),
      ],
      example: {
        question: t('The Second Five Year Plan was based on whose model?', 'দ্বিতীয় পঞ্চবার্ষিকী পরিকল্পনা কার মডেলের উপর ভিত্তি করে তৈরি?'),
        steps: [
          t('The Second Plan (1956–61) aimed to build heavy industries like steel.', 'দ্বিতীয় পরিকল্পনা (1956–61) ইস্পাতের মতো ভারী শিল্প গড়তে চেয়েছিল।'),
          t('This industrial plan was designed by the statistician P. C. Mahalanobis.', 'এই শিল্পভিত্তিক পরিকল্পনা তৈরি করেন পরিসংখ্যানবিদ পি. সি. মহলানবিশ।'),
        ],
        answer: t('P. C. Mahalanobis', 'পি. সি. মহলানবিশ'),
      },
      tryIt: {
        question: t('In which year did NITI Aayog replace the Planning Commission?', 'নীতি আয়োগ কোন সালে যোজনা কমিশনের জায়গা নেয়?'),
        options: [t('1950', '1950'), t('2005', '2005'), t('2015', '2015'), t('2017', '2017')],
        correct: 2,
        explanation: [
          t('NITI Aayog came into being on 1 January 2015.', 'নীতি আয়োগ 1 জানুয়ারি 2015 তারিখে গঠিত হয়।'),
          t('1950 is when the Planning Commission began, and 2017 is the year GST started, so those are traps.', '1950 সালে যোজনা কমিশন শুরু হয়, আর 2017 সালে GST চালু হয়, তাই ওগুলো ফাঁদ।'),
        ],
      },
    },
    {
      key: 'economic_terms',
      emoji: '📈',
      name: t('Meaning of economic terms', 'অর্থনীতির শব্দের অর্থ'),
      spot: t(
        'The question gives a term like inflation, GDP or fiscal deficit and asks what it means, or describes a situation and asks for the term.',
        'প্রশ্নে মুদ্রাস্ফীতি, GDP বা রাজকোষ ঘাটতির মতো কোনো শব্দ দিয়ে অর্থ জানতে চায়, অথবা কোনো অবস্থা বর্ণনা করে শব্দটি জানতে চায়।',
      ),
      method: [
        t('Inflation: general prices keep rising, so money buys less. Deflation: general prices keep falling.', 'মুদ্রাস্ফীতি: সাধারণ দাম ক্রমাগত বাড়ে, তাই টাকায় কম জিনিস কেনা যায়। মুদ্রা সংকোচন: সাধারণ দাম ক্রমাগত কমে।'),
        t('GDP: total value of all final goods and services produced inside a country in one year.', 'GDP (মোট দেশীয় উৎপাদন): এক বছরে দেশের ভেতরে তৈরি সব চূড়ান্ত পণ্য ও পরিষেবার মোট মূল্য।'),
        t('Fiscal deficit: the government\'s total spending minus its total receipts other than borrowing; it shows how much the government must borrow.', 'রাজকোষ ঘাটতি: সরকারের মোট ব্যয় থেকে ধার ছাড়া মোট আয় বাদ দিলে যা থাকে; এটি দেখায় সরকারকে কত ধার করতে হবে।'),
        t('Look for the key word: "prices rise" → inflation; "inside the country" → GDP; "borrowing" → fiscal deficit.', 'মূল শব্দ খোঁজো: "দাম বাড়ে" → মুদ্রাস্ফীতি; "দেশের ভেতরে" → GDP; "ধার" → রাজকোষ ঘাটতি।'),
      ],
      example: {
        question: t('A situation in which the general price level keeps rising is called what?', 'যে অবস্থায় জিনিসপত্রের সাধারণ দাম ক্রমাগত বাড়তে থাকে, তাকে কী বলে?'),
        steps: [
          t('The key words are "price level keeps rising".', 'মূল শব্দ হলো "সাধারণ দাম ক্রমাগত বাড়ে"।'),
          t('Rising prices mean inflation; falling prices would be deflation.', 'দাম বাড়া মানে মুদ্রাস্ফীতি; দাম কমলে হতো মুদ্রা সংকোচন।'),
        ],
        answer: t('Inflation', 'মুদ্রাস্ফীতি'),
      },
      tryIt: {
        question: t('What does "fiscal deficit" show?', '"রাজকোষ ঘাটতি" কী দেখায়?'),
        options: [
          t('How much a country exports', 'দেশ কত রপ্তানি করে'),
          t('How much the government needs to borrow', 'সরকারকে কত টাকা ধার করতে হবে'),
          t('The rise in prices', 'দাম কতটা বেড়েছে'),
          t('The total value of goods made in a year', 'এক বছরে তৈরি জিনিসের মোট মূল্য'),
        ],
        correct: 1,
        explanation: [
          t('Fiscal deficit = total spending − total receipts other than borrowing. That gap has to be filled by borrowing.', 'রাজকোষ ঘাটতি = মোট ব্যয় − ধার ছাড়া মোট আয়। এই ফাঁক ধার করে পূরণ করতে হয়।'),
          t('Rise in prices is inflation, and total value of goods made is GDP, so those options are wrong.', 'দাম বাড়া হলো মুদ্রাস্ফীতি, আর তৈরি জিনিসের মোট মূল্য হলো GDP, তাই ওই বিকল্পগুলো ভুল।'),
        ],
      },
    },
    {
      key: 'international_organisations',
      emoji: '🌐',
      name: t('International economic organisations and headquarters', 'আন্তর্জাতিক অর্থনৈতিক সংস্থা ও সদর দপ্তর'),
      spot: t(
        'The question names an organisation such as the WTO, IMF, World Bank or ADB and asks its headquarters or founding year.',
        'প্রশ্নে WTO, IMF, বিশ্ব ব্যাংক বা ADB-র মতো কোনো সংস্থার নাম দিয়ে তার সদর দপ্তর বা প্রতিষ্ঠার সাল জানতে চায়।',
      ),
      method: [
        t('IMF and World Bank: twins born together (Bretton Woods, 1944); both headquarters in Washington DC.', 'IMF ও বিশ্ব ব্যাংক: একসঙ্গে জন্ম নেওয়া যমজ (ব্রেটন উডস, 1944); দুটিরই সদর দপ্তর ওয়াশিংটন ডিসি।'),
        t('WTO: started on 1 January 1995, replacing GATT; headquarters Geneva (Switzerland).', 'WTO: 1 জানুয়ারি 1995 থেকে শুরু, GATT-এর জায়গায়; সদর দপ্তর জেনেভা (সুইজারল্যান্ড)।'),
        t('ADB (Asian Development Bank): headquarters Manila (Philippines); "Asia\'s bank sits in Asia".', 'ADB (এশীয় উন্নয়ন ব্যাংক): সদর দপ্তর ম্যানিলা (ফিলিপিন্স); "এশিয়ার ব্যাংক এশিয়াতেই"।'),
      ],
      example: {
        question: t('Where is the headquarters of the International Monetary Fund (IMF)?', 'আন্তর্জাতিক অর্থ ভাণ্ডারের (IMF) সদর দপ্তর কোথায়?'),
        steps: [
          t('IMF and World Bank are twins from the Bretton Woods meeting of 1944.', 'IMF ও বিশ্ব ব্যাংক 1944 সালের ব্রেটন উডস সম্মেলনের যমজ।'),
          t('Both twins live in the same city: Washington DC.', 'দুই যমজই একই শহরে থাকে: ওয়াশিংটন ডিসি।'),
        ],
        answer: t('Washington DC (USA)', 'ওয়াশিংটন ডিসি (আমেরিকা)'),
      },
      tryIt: {
        question: t('Where is the headquarters of the World Trade Organization (WTO)?', 'বিশ্ব বাণিজ্য সংস্থার (WTO) সদর দপ্তর কোথায়?'),
        options: [t('Washington DC', 'ওয়াশিংটন ডিসি'), t('Manila', 'ম্যানিলা'), t('New York', 'নিউ ইয়র্ক'), t('Geneva', 'জেনেভা')],
        correct: 3,
        explanation: [
          t('The WTO was set up in 1995 and has its headquarters in Geneva, Switzerland.', 'WTO 1995 সালে গঠিত হয় এবং এর সদর দপ্তর সুইজারল্যান্ডের জেনেভায়।'),
          t('Washington DC is for the IMF and World Bank, Manila for the ADB, and New York for the United Nations.', 'ওয়াশিংটন ডিসি IMF ও বিশ্ব ব্যাংকের, ম্যানিলা ADB-র, আর নিউ ইয়র্ক জাতিসংঘের সদর দপ্তর।'),
        ],
      },
    },
  ],
};
