'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'polity',
  patterns: [
    {
      key: 'which_article',
      emoji: '📜',
      name: t('Which Article deals with…', 'কোন ধারা (Article) কী নিয়ে…'),
      spot: t(
        'The question names a right or a rule and asks for its Article number, or gives an Article number and asks what it is about.',
        'প্রশ্নে কোনো অধিকার বা নিয়মের কথা বলে তার ধারা (Article) নম্বর জানতে চায়, অথবা ধারা নম্বর দিয়ে জানতে চায় সেটি কী নিয়ে।',
      ),
      method: [
        t('Learn the "star" Articles first: 14 (equality before law), 17 (end of untouchability), 21 (life and personal liberty), 21A (right to education), 32 (constitutional remedies).',
          'আগে "তারকা" ধারাগুলো মুখস্থ করো: 14 (আইনের চোখে সমতা), 17 (অস্পৃশ্যতার অবসান), 21 (জীবন ও ব্যক্তিগত স্বাধীনতা), 21A (শিক্ষার অধিকার), 32 (সাংবিধানিক প্রতিকারের অধিকার)।'),
        t('Know the emergency trio: 352 (national emergency), 356 (President\'s rule in a state), 360 (financial emergency).',
          'জরুরি অবস্থার তিনটি ধারা মনে রাখো: 352 (জাতীয় জরুরি অবস্থা), 356 (রাজ্যে রাষ্ট্রপতি শাসন), 360 (আর্থিক জরুরি অবস্থা)।'),
        t('Use the Part ranges to eliminate: Fundamental Rights are Articles 12–35, Directive Principles 36–51, Fundamental Duties 51A.',
          'অংশ (Part) অনুযায়ী বাদ দাও: মৌলিক অধিকার 12–35, নির্দেশমূলক নীতি 36–51, মৌলিক কর্তব্য 51A।'),
      ],
      example: {
        question: t('Which Article of the Indian Constitution abolishes untouchability?', 'ভারতীয় সংবিধানের কোন ধারা অস্পৃশ্যতা দূর করেছে?'),
        steps: [
          t('Untouchability is about equality, so the answer is a Fundamental Right (Articles 12–35).', 'অস্পৃশ্যতা সমতার বিষয়, তাই উত্তর মৌলিক অধিকারের মধ্যে (ধারা 12–35)।'),
          t('The Right to Equality covers Articles 14 to 18. Article 17 is the one that abolishes untouchability.', 'সমতার অধিকার হলো ধারা 14 থেকে 18। এর মধ্যে ধারা 17 অস্পৃশ্যতা দূর করে।'),
        ],
        answer: t('Article 17', 'ধারা 17'),
      },
      tryIt: {
        question: t('Dr B. R. Ambedkar called which Article the "heart and soul" of the Constitution?', 'ড. বি. আর. আম্বেদকর কোন ধারাকে সংবিধানের "হৃদয় ও আত্মা" বলেছিলেন?'),
        options: [t('Article 14', 'ধারা 14'), t('Article 32', 'ধারা 32'), t('Article 21', 'ধারা 21'), t('Article 19', 'ধারা 19')],
        correct: 1,
        explanation: [
          t('Article 32 gives the Right to Constitutional Remedies: you can go straight to the Supreme Court if your Fundamental Rights are taken away.', 'ধারা 32 হলো সাংবিধানিক প্রতিকারের অধিকার: মৌলিক অধিকার কেড়ে নেওয়া হলে সরাসরি সুপ্রিম কোর্টে যাওয়া যায়।'),
          t('Without it the other rights could not be protected, so Ambedkar called it the heart and soul of the Constitution.', 'এটি ছাড়া অন্য অধিকারগুলো রক্ষা করা যেত না, তাই আম্বেদকর একে সংবিধানের হৃদয় ও আত্মা বলেছিলেন।'),
        ],
      },
    },
    {
      key: 'who_appoints',
      emoji: '🏛️',
      name: t('Who appoints / removes an office-holder', 'কে নিয়োগ করেন / কে অপসারণ করেন'),
      spot: t(
        'The question asks who appoints, elects or removes a post such as Governor, Chief Justice, CAG or Speaker.',
        'প্রশ্নে জানতে চায় রাজ্যপাল, প্রধান বিচারপতি, CAG বা স্পিকারের মতো পদে কে নিয়োগ করেন, কে নির্বাচন করেন বা কে সরান।',
      ),
      method: [
        t('Rule of thumb: almost all top constitutional posts are APPOINTED by the President (Prime Minister, Governors, Supreme Court and High Court judges, CAG, Election Commissioners, Attorney General).',
          'সহজ নিয়ম: প্রায় সব বড় সাংবিধানিক পদে রাষ্ট্রপতি নিয়োগ করেন (প্রধানমন্ত্রী, রাজ্যপাল, সুপ্রিম কোর্ট ও হাইকোর্টের বিচারপতি, CAG, নির্বাচন কমিশনার, অ্যাটর্নি জেনারেল)।'),
        t('Some posts are ELECTED, not appointed: the Speaker is elected by Lok Sabha members; the Vice-President by members of both Houses of Parliament.',
          'কিছু পদ নিয়োগ নয়, নির্বাচন হয়: স্পিকারকে লোকসভার সদস্যরা নির্বাচন করেন; উপরাষ্ট্রপতিকে সংসদের দুই কক্ষের সদস্যরা।'),
        t('Removal of a Supreme Court judge needs Parliament to pass a motion by special majority; then the President signs the order.',
          'সুপ্রিম কোর্টের বিচারপতিকে সরাতে সংসদে বিশেষ সংখ্যাগরিষ্ঠতায় প্রস্তাব পাশ হতে হয়; তারপর রাষ্ট্রপতি আদেশ দেন।'),
        t('Eliminate options like "Chief Minister" or "Prime Minister" when the post is a Union-level constitutional post.',
          'পদটি কেন্দ্রীয় সাংবিধানিক পদ হলে "মুখ্যমন্ত্রী" বা "প্রধানমন্ত্রী" জাতীয় বিকল্প বাদ দাও।'),
      ],
      example: {
        question: t('Who appoints the Comptroller and Auditor General (CAG) of India?', 'ভারতের নিয়ন্ত্রক ও মহাগাণনিক (CAG) কে নিয়োগ করেন?'),
        steps: [
          t('The CAG is a top constitutional post at the Union level (Article 148).', 'CAG কেন্দ্রের একটি বড় সাংবিধানিক পদ (ধারা 148)।'),
          t('By our rule of thumb, such posts are appointed by the President.', 'আমাদের সহজ নিয়ম অনুযায়ী, এমন পদে নিয়োগ করেন রাষ্ট্রপতি।'),
        ],
        answer: t('The President of India', 'ভারতের রাষ্ট্রপতি'),
      },
      tryIt: {
        question: t('Who appoints the Governor of a state?', 'একটি রাজ্যের রাজ্যপালকে কে নিয়োগ করেন?'),
        options: [t('The Prime Minister', 'প্রধানমন্ত্রী'), t('The Chief Minister', 'মুখ্যমন্ত্রী'), t('The Chief Justice of India', 'ভারতের প্রধান বিচারপতি'), t('The President', 'রাষ্ট্রপতি')],
        correct: 3,
        explanation: [
          t('Article 155 says the Governor is appointed by the President.', 'ধারা 155 অনুযায়ী রাজ্যপালকে রাষ্ট্রপতি নিয়োগ করেন।'),
          t('The Chief Minister works under the Governor, so he cannot appoint the Governor; the Prime Minister and Chief Justice do not appoint Governors either.', 'মুখ্যমন্ত্রী রাজ্যপালের অধীনে কাজ করেন, তাই তিনি রাজ্যপাল নিয়োগ করতে পারেন না; প্রধানমন্ত্রী বা প্রধান বিচারপতিও রাজ্যপাল নিয়োগ করেন না।'),
        ],
      },
    },
    {
      key: 'fr_vs_dpsp',
      emoji: '⚖️',
      name: t('Fundamental Rights vs Directive Principles', 'মৌলিক অধিকার বনাম নির্দেশমূলক নীতি'),
      spot: t(
        'The question asks whether something is a Fundamental Right, a Directive Principle or a Fundamental Duty, or asks which Part it is in.',
        'প্রশ্নে জানতে চায় কোনো বিষয় মৌলিক অধিকার, নির্দেশমূলক নীতি নাকি মৌলিক কর্তব্য, অথবা সেটি কোন অংশে আছে।',
      ),
      method: [
        t('Fundamental Rights: Part III, Articles 12–35. Courts can enforce them (justiciable).', 'মৌলিক অধিকার: তৃতীয় অংশ, ধারা 12–35। আদালত এগুলো বলবৎ করতে পারে।'),
        t('Directive Principles: Part IV, Articles 36–51. They are guidelines for the government; courts cannot enforce them.', 'নির্দেশমূলক নীতি: চতুর্থ অংশ, ধারা 36–51। এগুলো সরকারের জন্য নির্দেশিকা; আদালত এগুলো বলবৎ করতে পারে না।'),
        t('Fundamental Duties: Part IVA, Article 51A, added by the 42nd Amendment (1976).', 'মৌলিক কর্তব্য: চতুর্থ-ক অংশ, ধারা 51A, 42তম সংশোধনী (1976) দিয়ে যোগ করা হয়।'),
        t('Trick: rights say "you CAN have"; directives say "the State SHOULD try" (e.g. equal pay, uniform civil code, free legal aid).', 'কৌশল: অধিকার বলে "তুমি পাবে"; নির্দেশমূলক নীতি বলে "রাষ্ট্র চেষ্টা করবে" (যেমন সমান কাজে সমান বেতন, অভিন্ন দেওয়ানি বিধি, বিনামূল্যে আইনি সহায়তা)।'),
      ],
      example: {
        question: t('A Uniform Civil Code for all citizens is mentioned in which part of the Constitution?', 'সব নাগরিকের জন্য অভিন্ন দেওয়ানি বিধির কথা সংবিধানের কোন অংশে আছে?'),
        steps: [
          t('It is something the State "should try" to bring, not a right you can take to court.', 'এটি এমন কিছু যা রাষ্ট্র আনার "চেষ্টা করবে", আদালতে দাবি করার মতো অধিকার নয়।'),
          t('So it is a Directive Principle: Article 44, in Part IV.', 'তাই এটি নির্দেশমূলক নীতি: ধারা 44, চতুর্থ অংশে।'),
        ],
        answer: t('Directive Principles of State Policy (Part IV, Article 44)', 'রাষ্ট্র পরিচালনার নির্দেশমূলক নীতি (চতুর্থ অংশ, ধারা 44)'),
      },
      tryIt: {
        question: t('Which of these is a Fundamental Right?', 'নিচের কোনটি মৌলিক অধিকার?'),
        options: [
          t('Equal pay for equal work', 'সমান কাজে সমান বেতন'),
          t('Uniform Civil Code', 'অভিন্ন দেওয়ানি বিধি'),
          t('Equality before law', 'আইনের চোখে সমতা'),
          t('Free legal aid', 'বিনামূল্যে আইনি সহায়তা'),
        ],
        correct: 2,
        explanation: [
          t('Equality before law is Article 14, inside Part III, so it is a Fundamental Right.', 'আইনের চোখে সমতা হলো ধারা 14, তৃতীয় অংশে, তাই এটি মৌলিক অধিকার।'),
          t('Equal pay (Article 39), Uniform Civil Code (Article 44) and free legal aid (Article 39A) are all Directive Principles in Part IV.', 'সমান বেতন (ধারা 39), অভিন্ন দেওয়ানি বিধি (ধারা 44) আর বিনামূল্যে আইনি সহায়তা (ধারা 39A) সবই চতুর্থ অংশের নির্দেশমূলক নীতি।'),
        ],
      },
    },
    {
      key: 'amendments',
      emoji: '✍️',
      name: t('Constitutional amendments and their subject', 'সংবিধান সংশোধনী ও তার বিষয়'),
      spot: t(
        'The question gives an amendment number and asks what it did, or describes a change and asks which amendment made it.',
        'প্রশ্নে সংশোধনীর নম্বর দিয়ে জানতে চায় সেটি কী করেছিল, অথবা কোনো পরিবর্তনের কথা বলে জানতে চায় কোন সংশোধনী তা করেছিল।',
      ),
      method: [
        t('42nd (1976): the "mini-Constitution": added "Socialist", "Secular" and "Integrity" to the Preamble and added Fundamental Duties.', '42তম (1976): "ক্ষুদ্র সংবিধান": প্রস্তাবনায় "সমাজতান্ত্রিক", "ধর্মনিরপেক্ষ" ও "সংহতি" শব্দ যোগ করে এবং মৌলিক কর্তব্য যোগ করে।'),
        t('44th (1978): removed the Right to Property from the Fundamental Rights. 61st (1988): voting age lowered from 21 to 18.', '44তম (1978): সম্পত্তির অধিকারকে মৌলিক অধিকার থেকে বাদ দেয়। 61তম (1988): ভোটের বয়স 21 থেকে কমিয়ে 18 করে।'),
        t('Local government pair: 73rd (Panchayats), 74th (Municipalities); remember "3 for villages, 4 for towns".', 'স্থানীয় সরকারের জোড়া: 73তম (পঞ্চায়েত), 74তম (পৌরসভা); মনে রাখো "3 গ্রামের, 4 শহরের"।'),
        t('86th (2002): Right to Education, Article 21A. 101st (2016): GST.', '86তম (2002): শিক্ষার অধিকার, ধারা 21A। 101তম (2016): GST।'),
      ],
      example: {
        question: t('Which amendment made education a Fundamental Right for children aged 6 to 14?', 'কোন সংশোধনী 6 থেকে 14 বছরের শিশুদের শিক্ষাকে মৌলিক অধিকার করেছে?'),
        steps: [
          t('Right to Education is Article 21A, which was added later.', 'শিক্ষার অধিকার হলো ধারা 21A, যা পরে যোগ করা হয়েছে।'),
          t('It was added by the 86th Amendment in 2002.', 'এটি 2002 সালে 86তম সংশোধনী দিয়ে যোগ করা হয়।'),
        ],
        answer: t('86th Amendment (2002)', '86তম সংশোধনী (2002)'),
      },
      tryIt: {
        question: t('Which constitutional amendment lowered the voting age from 21 years to 18 years?', 'কোন সংবিধান সংশোধনী ভোটের বয়স 21 বছর থেকে কমিয়ে 18 বছর করেছে?'),
        options: [t('42nd Amendment', '42তম সংশোধনী'), t('44th Amendment', '44তম সংশোধনী'), t('61st Amendment', '61তম সংশোধনী'), t('73rd Amendment', '73তম সংশোধনী')],
        correct: 2,
        explanation: [
          t('The 61st Amendment Act, 1988 changed the voting age from 21 to 18.', '1988 সালের 61তম সংশোধনী আইন ভোটের বয়স 21 থেকে 18 করে।'),
          t('42nd changed the Preamble, 44th removed the Right to Property, and 73rd is about Panchayats, so they are wrong.', '42তম প্রস্তাবনা বদলায়, 44তম সম্পত্তির অধিকার বাদ দেয়, আর 73তম পঞ্চায়েত নিয়ে, তাই এগুলো ভুল।'),
        ],
      },
    },
    {
      key: 'borrowed_features',
      emoji: '🌍',
      name: t('Borrowed features of the Constitution', 'সংবিধানের গৃহীত (ধার করা) বৈশিষ্ট্য'),
      spot: t(
        'The question asks from which country a feature of the Indian Constitution was taken.',
        'প্রশ্নে জানতে চায় ভারতীয় সংবিধানের কোনো বৈশিষ্ট্য কোন দেশ থেকে নেওয়া হয়েছে।',
      ),
      method: [
        t('UK: parliamentary system, rule of law, single citizenship. USA: Fundamental Rights, judicial review, independent judiciary.', 'ব্রিটেন: সংসদীয় ব্যবস্থা, আইনের শাসন, একক নাগরিকত্ব। আমেরিকা: মৌলিক অধিকার, বিচারবিভাগীয় পর্যালোচনা, স্বাধীন বিচারব্যবস্থা।'),
        t('Ireland: Directive Principles. Canada: federation with a strong Centre. Australia: Concurrent List.', 'আয়ারল্যান্ড: নির্দেশমূলক নীতি। কানাডা: শক্তিশালী কেন্দ্রসহ যুক্তরাষ্ট্র। অস্ট্রেলিয়া: যুগ্ম তালিকা।'),
        t('USSR: Fundamental Duties. France: Republic and "Liberty, Equality, Fraternity". Germany (Weimar): suspension of Fundamental Rights in emergency.', 'সোভিয়েত ইউনিয়ন: মৌলিক কর্তব্য। ফ্রান্স: প্রজাতন্ত্র এবং "স্বাধীনতা, সাম্য, ভ্রাতৃত্ব"। জার্মানি (ভাইমার): জরুরি অবস্থায় মৌলিক অধিকার স্থগিত।'),
      ],
      example: {
        question: t('The idea of Fundamental Duties in the Indian Constitution was taken from which country?', 'ভারতীয় সংবিধানে মৌলিক কর্তব্যের ধারণা কোন দেশ থেকে নেওয়া?'),
        steps: [
          t('Rights came from the USA, but duties came from a different country.', 'অধিকার এসেছে আমেরিকা থেকে, কিন্তু কর্তব্য এসেছে অন্য দেশ থেকে।'),
          t('From our list, Fundamental Duties come from the USSR (former Soviet Union).', 'আমাদের তালিকা অনুযায়ী মৌলিক কর্তব্য এসেছে সোভিয়েত ইউনিয়ন (USSR) থেকে।'),
        ],
        answer: t('USSR (former Soviet Union)', 'সোভিয়েত ইউনিয়ন (USSR)'),
      },
      tryIt: {
        question: t('The Concurrent List of the Indian Constitution was borrowed from which country?', 'ভারতীয় সংবিধানের যুগ্ম তালিকা কোন দেশ থেকে নেওয়া হয়েছে?'),
        options: [t('Canada', 'কানাডা'), t('Australia', 'অস্ট্রেলিয়া'), t('USA', 'আমেরিকা'), t('Ireland', 'আয়ারল্যান্ড')],
        correct: 1,
        explanation: [
          t('The Concurrent List (subjects on which both the Centre and states can make laws) was taken from Australia.', 'যুগ্ম তালিকা (যে বিষয়ে কেন্দ্র ও রাজ্য দুই-ই আইন বানাতে পারে) অস্ট্রেলিয়া থেকে নেওয়া।'),
          t('Canada gave the strong-Centre federation, the USA gave Fundamental Rights and Ireland gave Directive Principles.', 'কানাডা দিয়েছে শক্তিশালী কেন্দ্রসহ যুক্তরাষ্ট্র, আমেরিকা দিয়েছে মৌলিক অধিকার আর আয়ারল্যান্ড দিয়েছে নির্দেশমূলক নীতি।'),
        ],
      },
    },
  ],
};
