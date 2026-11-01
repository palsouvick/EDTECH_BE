'use strict';

// Environment & Ecology. Every fact used here is in the verified GK library
// (db/gk/environment.jsonl, sources: NCERT Biology, UNEP, convention secretariats, UN).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'environment',
  patterns: [
    {
      key: 'convention_year_place',
      emoji: '🌍',
      name: t('Environmental conventions: year, place and purpose', 'পরিবেশ চুক্তি: সাল, স্থান ও উদ্দেশ্য'),
      spot: t(
        'The question names a convention or protocol and asks its year, the city where it was made, or what it controls, or asks you to put several in order.',
        'প্রশ্নে কোনো চুক্তি বা প্রোটোকলের নাম দিয়ে তার সাল, কোন শহরে হয়েছিল বা কী নিয়ন্ত্রণ করে তা জানতে চায়, অথবা কয়েকটিকে ক্রমানুসারে সাজাতে বলে।',
      ),
      method: [
        t('Link each treaty to its subject: Vienna/Montreal → ozone; Basel → hazardous waste across borders; Stockholm → persistent organic pollutants; CBD → biodiversity; Bonn (CMS) → migratory species; Paris → climate.', 'প্রতিটি চুক্তিকে তার বিষয়ের সঙ্গে জোড়ো: ভিয়েনা/মন্ট্রিল → ওজোন; বাসেল → সীমান্ত পেরোনো বিপজ্জনক বর্জ্য; স্টকহোম → স্থায়ী জৈব দূষক; CBD → জীববৈচিত্র্য; বন (CMS) → পরিযায়ী প্রাণী; প্যারিস → জলবায়ু।'),
        t('Learn the year of creation or adoption: Bonn 1979, Vienna 1985, Montreal 1987, Basel 1989, CBD 1992 (Rio), Stockholm 2001, Paris 2015.', 'সৃষ্টির বা গ্রহণের সাল শেখো: বন ১৯৭৯, ভিয়েনা ১৯৮৫, মন্ট্রিল ১৯৮৭, বাসেল ১৯৮৯, CBD ১৯৯২ (রিও), স্টকহোম ২০০১, প্যারিস ২০১৫।'),
        t('Check whether the question asks for adoption or entry into force: they are different years (Basel adopted 1989, in force 1992).', 'প্রশ্ন গ্রহণের সাল চাইছে না কার্যকর হওয়ার সাল, দেখে নাও: দুটি আলাদা বছর (বাসেল গৃহীত ১৯৮৯, কার্যকর ১৯৯২)।'),
      ],
      example: {
        question: t('Which agreement controls the movement of hazardous wastes across borders?', 'কোন চুক্তি সীমান্ত পেরিয়ে বিপজ্জনক বর্জ্যের চলাচল নিয়ন্ত্রণ করে?'),
        steps: [
          t('Montreal is about ozone-depleting substances and Stockholm about persistent organic pollutants.', 'মন্ট্রিল ওজোন ক্ষয়কারী পদার্থ নিয়ে, আর স্টকহোম স্থায়ী জৈব দূষক নিয়ে।'),
          t('The Basel Convention (adopted 1989) covers transboundary movements of hazardous wastes.', 'বাসেল কনভেনশন (গৃহীত ১৯৮৯) বিপজ্জনক বর্জ্যের আন্তঃসীমান্ত চলাচল নিয়ে।'),
        ],
        answer: t('Basel Convention', 'বাসেল কনভেনশন'),
      },
      tryIt: {
        question: t('The Montreal Protocol (1987) phases out:', 'মন্ট্রিল প্রোটোকল (১৯৮৭) ধাপে ধাপে বন্ধ করে:'),
        options: [t('Ozone-depleting substances', 'ওজোন ক্ষয়কারী পদার্থ'), t('Persistent organic pollutants', 'স্থায়ী জৈব দূষক'), t('Hazardous wastes', 'বিপজ্জনক বর্জ্য'), t('Plastic packaging', 'প্লাস্টিকের মোড়ক')],
        correct: 0,
        explanation: [
          t('The Montreal Protocol covers the production and consumption of ozone-depleting substances.', 'মন্ট্রিল প্রোটোকল ওজোন ক্ষয়কারী পদার্থের উৎপাদন ও ব্যবহার নিয়ে।'),
          t('It followed the Vienna Convention for the Protection of the Ozone Layer (1985).', 'এটি ওজোন স্তর রক্ষার ভিয়েনা কনভেনশন (১৯৮৫)-এর পরে আসে।'),
        ],
      },
    },
    {
      key: 'energy_flow',
      emoji: '🔺',
      name: t('Energy flow and ecological pyramids', 'শক্তিপ্রবাহ ও বাস্তুতান্ত্রিক পিরামিড'),
      spot: t(
        'The question asks how much energy passes to the next trophic level, or which ecological pyramid can or cannot be inverted.',
        'প্রশ্নে জানতে চায় পরের খাদ্যস্তরে কতটা শক্তি যায়, বা কোন বাস্তুতান্ত্রিক পিরামিড উল্টো হতে পারে বা পারে না।',
      ),
      method: [
        t('10 per cent law: only about 10% of the energy passes from one trophic level to the next.', '১০ শতাংশ সূত্র: এক খাদ্যস্তর থেকে পরের স্তরে মাত্র প্রায় ১০% শক্তি যায়।'),
        t('The pyramid of energy is always upright, because energy is lost as heat at every step.', 'শক্তির পিরামিড সবসময় সোজা, কারণ প্রতি ধাপে শক্তি তাপ হিসেবে হারিয়ে যায়।'),
        t('Pyramids of number and biomass can be inverted (NCERT: biomass in the sea is generally inverted).', 'সংখ্যা ও জৈবভরের পিরামিড উল্টো হতে পারে (NCERT: সমুদ্রে জৈবভরের পিরামিড সাধারণত উল্টো)।'),
      ],
      example: {
        question: t('Which ecological pyramid can never be inverted?', 'কোন বাস্তুতান্ত্রিক পিরামিড কখনও উল্টো হতে পারে না?'),
        steps: [
          t('Number and biomass pyramids can be inverted in some ecosystems.', 'কিছু বাস্তুতন্ত্রে সংখ্যা ও জৈবভরের পিরামিড উল্টো হতে পারে।'),
          t('Energy is lost at every transfer, so each level has less energy than the one below.', 'প্রতিটি স্থানান্তরে শক্তি হারায়, তাই প্রতিটি স্তরে নিচের স্তরের চেয়ে কম শক্তি থাকে।'),
        ],
        answer: t('The pyramid of energy', 'শক্তির পিরামিড'),
      },
    },
    {
      key: 'conservation_types',
      emoji: '🌳',
      name: t('Conserving biodiversity: in situ, ex situ and hotspots', 'জীববৈচিত্র্য সংরক্ষণ: ইন সিটু, এক্স সিটু ও হটস্পট'),
      spot: t(
        'The question gives a place (national park, zoo, botanical garden, sacred grove) and asks the type of conservation, or asks which hotspots cover India.',
        'প্রশ্নে একটি স্থান (জাতীয় উদ্যান, চিড়িয়াখানা, উদ্ভিদ উদ্যান, পবিত্র কুঞ্জবন) দিয়ে সংরক্ষণের ধরন, বা ভারতে কোন হটস্পট আছে তা জানতে চায়।',
      ),
      method: [
        t('In situ = in the natural habitat: biosphere reserves, national parks, sanctuaries, sacred groves.', 'ইন সিটু = প্রাকৃতিক বাসস্থানেই: বায়োস্ফিয়ার রিজার্ভ, জাতীয় উদ্যান, অভয়ারণ্য, পবিত্র কুঞ্জবন।'),
        t('Ex situ = off-site: zoological parks and botanical gardens.', 'এক্স সিটু = বাসস্থানের বাইরে: চিড়িয়াখানা ও উদ্ভিদ উদ্যান।'),
        t('Hotspots covering India (NCERT): Western Ghats and Sri Lanka, Indo-Burma, Himalaya. Project Tiger began in 1973.', 'ভারতের হটস্পট (NCERT): পশ্চিমঘাট ও শ্রীলঙ্কা, ইন্দো-বার্মা, হিমালয়। প্রজেক্ট টাইগার শুরু হয় ১৯৭৩ সালে।'),
      ],
      example: {
        question: t('Is a botanical garden an example of in situ or ex situ conservation?', 'উদ্ভিদ উদ্যান কি ইন সিটু না এক্স সিটু সংরক্ষণের উদাহরণ?'),
        steps: [
          t('In situ means protecting a species where it naturally lives.', 'ইন সিটু মানে প্রজাতিকে তার স্বাভাবিক বাসস্থানেই রক্ষা করা।'),
          t('A botanical garden grows plants away from their natural habitat, so it is off-site.', 'উদ্ভিদ উদ্যানে গাছ তাদের প্রাকৃতিক বাসস্থানের বাইরে রাখা হয়, তাই এটি বাসস্থানের বাইরে সংরক্ষণ।'),
        ],
        answer: t('Ex situ', 'এক্স সিটু'),
      },
    },
  ],
};
