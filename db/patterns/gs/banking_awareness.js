'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'banking_awareness',
  patterns: [
    {
      key: 'banking_abbreviations',
      emoji: '🔤',
      name: t('Full forms of banking abbreviations', 'ব্যাংকিং সংক্ষিপ্ত রূপের পূর্ণ রূপ'),
      spot: t(
        'The question gives a short form like NEFT, RTGS, IFSC, KYC or NPA and asks its full form.',
        'প্রশ্নে NEFT, RTGS, IFSC, KYC বা NPA-র মতো সংক্ষিপ্ত রূপ দিয়ে পূর্ণ রূপ জানতে চায়।',
      ),
      method: [
        t('Money transfer: NEFT = National Electronic Funds Transfer; RTGS = Real Time Gross Settlement; UPI = Unified Payments Interface.', 'টাকা পাঠানো: NEFT = National Electronic Funds Transfer; RTGS = Real Time Gross Settlement; UPI = Unified Payments Interface।'),
        t('Bank identity: IFSC = Indian Financial System Code; MICR = Magnetic Ink Character Recognition.', 'ব্যাংকের পরিচয়: IFSC = Indian Financial System Code; MICR = Magnetic Ink Character Recognition।'),
        t('Customer and loans: KYC = Know Your Customer; NPA = Non-Performing Asset (a loan that has stopped being repaid).', 'গ্রাহক ও ঋণ: KYC = Know Your Customer (গ্রাহককে জানো); NPA = Non-Performing Asset (যে ঋণ শোধ হওয়া বন্ধ হয়ে গেছে)।'),
        t('Match each letter with a word; reject options where even one letter does not fit.', 'প্রতিটি অক্ষরের সঙ্গে একটি শব্দ মেলাও; একটি অক্ষরও না মিললে সেই বিকল্প বাদ দাও।'),
      ],
      example: {
        question: t('What is the full form of KYC?', 'KYC-র পূর্ণ রূপ কী?'),
        steps: [
          t('Banks ask for your ID and address proof before opening an account, to know who you are.', 'অ্যাকাউন্ট খোলার আগে ব্যাংক তোমার পরিচয়পত্র ও ঠিকানার প্রমাণ চায়, তুমি কে তা জানতে।'),
          t('K = Know, Y = Your, C = Customer.', 'K = Know (জানো), Y = Your (তোমার), C = Customer (গ্রাহক)।'),
        ],
        answer: t('Know Your Customer', 'Know Your Customer (গ্রাহককে জানো)'),
      },
      tryIt: {
        question: t('What does RTGS stand for?', 'RTGS-এর পূর্ণ রূপ কী?'),
        options: [
          t('Rapid Transfer of Government Securities', 'Rapid Transfer of Government Securities'),
          t('Real Time General Saving', 'Real Time General Saving'),
          t('Real Time Gross Settlement', 'Real Time Gross Settlement'),
          t('Reserve Transfer Gross System', 'Reserve Transfer Gross System'),
        ],
        correct: 2,
        explanation: [
          t('RTGS sends money instantly ("real time"), one transfer at a time and in full ("gross settlement").', 'RTGS সঙ্গে সঙ্গে ("রিয়েল টাইম") টাকা পাঠায়, প্রতিটি লেনদেন আলাদা ও পুরোটা ("গ্রস সেটলমেন্ট")।'),
          t('So R-T-G-S = Real Time Gross Settlement; the other options do not fit what RTGS does.', 'তাই R-T-G-S = Real Time Gross Settlement; অন্য বিকল্পগুলো RTGS-এর কাজের সঙ্গে মেলে না।'),
        ],
      },
    },
    {
      key: 'monetary_policy_tools',
      emoji: '🏦',
      name: t('Repo, Reverse Repo, CRR, SLR: what they mean', 'রেপো, রিভার্স রেপো, CRR, SLR: এদের মানে'),
      spot: t(
        'The question describes a rule or rate of the RBI and asks its name, or asks what RBI does to control rising prices.',
        'প্রশ্নে RBI-এর কোনো নিয়ম বা হারের বর্ণনা দিয়ে তার নাম জানতে চায়, বা জানতে চায় দাম বাড়া আটকাতে RBI কী করে।',
      ),
      method: [
        t('Repo rate: the rate at which RBI LENDS short-term money to banks. Reverse repo: the rate at which RBI BORROWS from banks.', 'রেপো রেট: যে হারে RBI ব্যাংকগুলোকে স্বল্পমেয়াদি ঋণ দেয়। রিভার্স রেপো: যে হারে RBI ব্যাংকগুলোর কাছ থেকে ধার নেয়।'),
        t('CRR (Cash Reserve Ratio): part of deposits a bank must keep with the RBI as cash.', 'CRR (নগদ সংরক্ষণ অনুপাত): আমানতের যে অংশ ব্যাংককে নগদে RBI-এর কাছে জমা রাখতে হয়।'),
        t('SLR (Statutory Liquidity Ratio): part of deposits a bank must keep with itself in safe liquid form (cash, gold, government securities).', 'SLR (বিধিবদ্ধ তারল্য অনুপাত): আমানতের যে অংশ ব্যাংককে নিজের কাছে নিরাপদ তরল সম্পদে (নগদ, সোনা, সরকারি ঋণপত্র) রাখতে হয়।'),
        t('Trick: "CRR – with RBI; SLR – with Self". To control inflation, RBI raises these rates so less money flows in the market.', 'কৌশল: "CRR – RBI-এর কাছে; SLR – নিজের (Self) কাছে"। মুদ্রাস্ফীতি আটকাতে RBI এই হারগুলো বাড়ায়, ফলে বাজারে টাকা কম আসে।'),
      ],
      example: {
        question: t('The rate at which the RBI lends short-term money to commercial banks is called what?', 'যে হারে RBI বাণিজ্যিক ব্যাংকগুলোকে স্বল্পমেয়াদি ঋণ দেয়, তাকে কী বলে?'),
        steps: [
          t('The key word is "RBI lends" (RBI gives money to banks).', 'মূল শব্দ "RBI ঋণ দেয়" (RBI ব্যাংককে টাকা দেয়)।'),
          t('RBI lending = repo rate; RBI borrowing would be reverse repo.', 'RBI ঋণ দেয় = রেপো রেট; RBI ধার নিলে হতো রিভার্স রেপো।'),
        ],
        answer: t('Repo rate', 'রেপো রেট'),
      },
      tryIt: {
        question: t('The share of deposits that a bank must keep with the RBI in the form of cash is called:', 'আমানতের যে অংশ ব্যাংককে নগদ আকারে RBI-এর কাছে রাখতে হয়, তাকে বলে:'),
        options: [t('SLR', 'SLR'), t('CRR', 'CRR'), t('Repo rate', 'রেপো রেট'), t('Reverse repo rate', 'রিভার্স রেপো রেট')],
        correct: 1,
        explanation: [
          t('"Cash" + "with the RBI" = Cash Reserve Ratio (CRR).', '"নগদ" + "RBI-এর কাছে" = নগদ সংরক্ষণ অনুপাত (CRR)।'),
          t('SLR is kept by the bank with itself; repo and reverse repo are interest rates, not shares of deposits.', 'SLR ব্যাংক নিজের কাছে রাখে; রেপো ও রিভার্স রেপো সুদের হার, আমানতের অংশ নয়।'),
        ],
      },
    },
    {
      key: 'rbi_facts',
      emoji: '🏛️',
      name: t('Reserve Bank of India: history and functions', 'ভারতীয় রিজার্ভ ব্যাংক: ইতিহাস ও কাজ'),
      spot: t(
        'The question asks when RBI was set up or nationalised, where it is headquartered, or which job is done by RBI.',
        'প্রশ্নে জানতে চায় RBI কবে গঠিত বা জাতীয়করণ হয়, সদর দপ্তর কোথায়, বা কোন কাজ RBI করে।',
      ),
      method: [
        t('Set up on 1 April 1935 (on the Hilton Young Commission\'s advice); nationalised on 1 January 1949. Headquarters: Mumbai (first in Kolkata, moved in 1937).', '1 এপ্রিল 1935 সালে গঠিত (হিলটন ইয়ং কমিশনের পরামর্শে); 1 জানুয়ারি 1949 সালে জাতীয়করণ। সদর দপ্তর: মুম্বাই (প্রথমে কলকাতায়, 1937 সালে সরানো হয়)।'),
        t('Functions: issues currency notes, banker to the government, "banker\'s bank" (lender of last resort), keeps foreign exchange reserves, controls credit.', 'কাজ: নোট ছাপানো ও প্রচলন, সরকারের ব্যাংকার, "ব্যাংকের ব্যাংক" (শেষ আশ্রয়ের ঋণদাতা), বৈদেশিক মুদ্রার ভাণ্ডার রাখা, ঋণ নিয়ন্ত্রণ।'),
        t('Trap: the one-rupee note is issued by the Ministry of Finance (signed by the Finance Secretary), not by RBI.', 'ফাঁদ: এক টাকার নোট অর্থ মন্ত্রক প্রকাশ করে (অর্থসচিবের সই থাকে), RBI নয়।'),
      ],
      example: {
        question: t('The Reserve Bank of India was nationalised in which year?', 'ভারতীয় রিজার্ভ ব্যাংক কোন সালে জাতীয়করণ হয়?'),
        steps: [
          t('RBI started in 1935 as a privately owned (shareholders\') bank.', 'RBI 1935 সালে শেয়ারহোল্ডারদের মালিকানাধীন ব্যাংক হিসেবে শুরু হয়।'),
          t('After independence, the government took full ownership on 1 January 1949.', 'স্বাধীনতার পর সরকার 1 জানুয়ারি 1949 তারিখে পুরো মালিকানা নেয়।'),
        ],
        answer: t('1949', '1949 সাল'),
      },
      tryIt: {
        question: t('In which year was the Reserve Bank of India established?', 'ভারতীয় রিজার্ভ ব্যাংক কোন সালে প্রতিষ্ঠিত হয়?'),
        options: [t('1949', '1949'), t('1969', '1969'), t('1955', '1955'), t('1935', '1935')],
        correct: 3,
        explanation: [
          t('RBI started working on 1 April 1935.', 'RBI 1 এপ্রিল 1935 থেকে কাজ শুরু করে।'),
          t('1949 is when it was nationalised, 1969 is when 14 banks were nationalised, and 1955 is when SBI was formed.', '1949 সালে এর জাতীয়করণ হয়, 1969 সালে 14টি ব্যাংকের জাতীয়করণ হয়, আর 1955 সালে SBI গঠিত হয়।'),
        ],
      },
    },
    {
      key: 'development_institutions',
      emoji: '🌾',
      name: t('Special institutions and their role', 'বিশেষ প্রতিষ্ঠান ও তাদের কাজ'),
      spot: t(
        'The question names NABARD, SIDBI, EXIM Bank, NHB, SEBI or IRDAI and asks what it does, or describes a role and asks which body does it.',
        'প্রশ্নে NABARD, SIDBI, EXIM ব্যাংক, NHB, SEBI বা IRDAI-এর নাম দিয়ে তার কাজ জানতে চায়, অথবা কাজের বর্ণনা দিয়ে সংস্থাটি জানতে চায়।',
      ),
      method: [
        t('Read the name, it tells the job: NABARD = National Bank for Agriculture and Rural Development (1982) → farming and villages.', 'নামটাই কাজ বলে দেয়: NABARD = National Bank for Agriculture and Rural Development (1982) → কৃষি ও গ্রাম।'),
        t('SIDBI = Small Industries Development Bank of India (1990) → small industries (MSMEs). EXIM Bank (1982) → exports and imports. NHB (1988) → housing finance.', 'SIDBI = Small Industries Development Bank of India (1990) → ক্ষুদ্র শিল্প (MSME)। EXIM ব্যাংক (1982) → আমদানি-রপ্তানি। NHB (1988) → গৃহঋণ।'),
        t('Regulators: RBI → banks; SEBI → share market; IRDAI → insurance.', 'নিয়ন্ত্রক: RBI → ব্যাংক; SEBI → শেয়ার বাজার; IRDAI → বিমা।'),
      ],
      example: {
        question: t('Which body regulates the share (stock) market in India?', 'ভারতে শেয়ার বাজার কে নিয়ন্ত্রণ করে?'),
        steps: [
          t('RBI regulates banks and IRDAI regulates insurance, so they are out.', 'RBI ব্যাংক আর IRDAI বিমা নিয়ন্ত্রণ করে, তাই ওরা বাদ।'),
          t('SEBI (Securities and Exchange Board of India) looks after the securities (share) market.', 'SEBI (Securities and Exchange Board of India) শেয়ার বাজার দেখাশোনা করে।'),
        ],
        answer: t('SEBI', 'SEBI (সেবি)'),
      },
      tryIt: {
        question: t('Which is the apex institution for agriculture and rural credit in India?', 'ভারতে কৃষি ও গ্রামীণ ঋণের শীর্ষ প্রতিষ্ঠান কোনটি?'),
        options: [t('NABARD', 'NABARD'), t('SIDBI', 'SIDBI'), t('EXIM Bank', 'EXIM ব্যাংক'), t('NHB', 'NHB')],
        correct: 0,
        explanation: [
          t('NABARD\'s full name has "Agriculture and Rural Development" in it; it was set up in 1982.', 'NABARD-এর পুরো নামে "Agriculture and Rural Development" (কৃষি ও গ্রামোন্নয়ন) আছে; এটি 1982 সালে গঠিত হয়।'),
          t('SIDBI is for small industries, EXIM Bank for foreign trade and NHB for housing.', 'SIDBI ক্ষুদ্র শিল্পের জন্য, EXIM ব্যাংক বৈদেশিক বাণিজ্যের জন্য, আর NHB গৃহঋণের জন্য।'),
        ],
      },
    },
    {
      key: 'bank_nationalisation',
      emoji: '📆',
      name: t('Bank nationalisation and SBI history', 'ব্যাংক জাতীয়করণ ও SBI-এর ইতিহাস'),
      spot: t(
        'The question asks how many banks were nationalised and when, or how and when SBI was formed.',
        'প্রশ্নে জানতে চায় কবে কতগুলো ব্যাংক জাতীয়করণ হয়, বা SBI কীভাবে ও কবে গঠিত হয়।',
      ),
      method: [
        t('19 July 1969: 14 major banks nationalised. 1980: 6 more banks nationalised.', '19 জুলাই 1969: 14টি বড় ব্যাংক জাতীয়করণ। 1980: আরও 6টি ব্যাংক জাতীয়করণ।'),
        t('Trick: "69 → 14, 80 → 6", total 20.', 'কৌশল: "69 → 14, 80 → 6", মোট 20।'),
        t('SBI: formed on 1 July 1955 from the Imperial Bank of India.', 'SBI: ইম্পেরিয়াল ব্যাংক অফ ইন্ডিয়া থেকে 1 জুলাই 1955 সালে গঠিত।'),
      ],
      example: {
        question: t('The State Bank of India was formed from which bank?', 'স্টেট ব্যাংক অফ ইন্ডিয়া কোন ব্যাংক থেকে গঠিত হয়?'),
        steps: [
          t('Before independence, the biggest commercial bank in India was the Imperial Bank of India.', 'স্বাধীনতার আগে ভারতের সবচেয়ে বড় বাণিজ্যিক ব্যাংক ছিল ইম্পেরিয়াল ব্যাংক অফ ইন্ডিয়া।'),
          t('In 1955 the government took it over and renamed it the State Bank of India.', '1955 সালে সরকার এটি অধিগ্রহণ করে নাম দেয় স্টেট ব্যাংক অফ ইন্ডিয়া।'),
        ],
        answer: t('Imperial Bank of India (1955)', 'ইম্পেরিয়াল ব্যাংক অফ ইন্ডিয়া (1955)'),
      },
      tryIt: {
        question: t('How many banks were nationalised in India on 19 July 1969?', '19 জুলাই 1969 সালে ভারতে কয়টি ব্যাংক জাতীয়করণ হয়?'),
        options: [t('6', '6'), t('14', '14'), t('20', '20'), t('12', '12')],
        correct: 1,
        explanation: [
          t('In 1969, 14 major commercial banks were nationalised.', '1969 সালে 14টি বড় বাণিজ্যিক ব্যাংক জাতীয়করণ হয়।'),
          t('6 is the 1980 count and 20 is the total of both rounds, so those are traps.', '6 হলো 1980 সালের সংখ্যা আর 20 হলো দুই দফার মোট, তাই ওগুলো ফাঁদ।'),
        ],
      },
    },
  ],
};
