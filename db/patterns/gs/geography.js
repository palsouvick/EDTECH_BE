'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'geography',
  patterns: [
    {
      key: 'rivers_of_india',
      emoji: '🏞️',
      name: t('Rivers of India: source, direction, nickname', 'ভারতের নদী: উৎস, প্রবাহের দিক, ডাকনাম'),
      spot: t(
        'The question asks where a river starts, which way it flows, which sea it meets, or which river has a special nickname.',
        'প্রশ্নে জানতে চায় কোনো নদী কোথা থেকে উৎপন্ন, কোন দিকে বয়, কোন সাগরে মেশে, বা কোন নদীর বিশেষ ডাকনাম আছে।',
      ),
      method: [
        t('Most peninsular rivers (Mahanadi, Godavari, Krishna, Kaveri) flow EAST into the Bay of Bengal and form deltas.', 'বেশিরভাগ উপদ্বীপীয় নদী (মহানদী, গোদাবরী, কৃষ্ণা, কাবেরী) পূর্বদিকে বয়ে বঙ্গোপসাগরে পড়ে এবং ব-দ্বীপ তৈরি করে।'),
        t('The odd ones out: Narmada and Tapi flow WEST into the Arabian Sea through rift valleys and form estuaries.', 'ব্যতিক্রম: নর্মদা ও তাপ্তী গ্রস্ত উপত্যকা দিয়ে পশ্চিমে বয়ে আরব সাগরে পড়ে এবং মোহনা (খাঁড়ি) তৈরি করে।'),
        t('Ganga starts from the Gangotri glacier (as the Bhagirathi). Godavari is the longest peninsular river, called "Dakshin Ganga".', 'গঙ্গার উৎস গঙ্গোত্রী হিমবাহ (ভাগীরথী নামে)। গোদাবরী উপদ্বীপের দীর্ঘতম নদী, একে "দক্ষিণ গঙ্গা" বলে।'),
      ],
      example: {
        question: t('Which river is called the "Dakshin Ganga" (Ganga of the South)?', 'কোন নদীকে "দক্ষিণ গঙ্গা" বলা হয়?'),
        steps: [
          t('"Dakshin Ganga" means a big, holy river of the south, like the Ganga in the north.', '"দক্ষিণ গঙ্গা" মানে দক্ষিণের বড় ও পবিত্র নদী, যেমন উত্তরে গঙ্গা।'),
          t('The longest river of peninsular India is the Godavari, so it gets this name.', 'উপদ্বীপীয় ভারতের দীর্ঘতম নদী গোদাবরী, তাই এই নাম তার।'),
        ],
        answer: t('Godavari', 'গোদাবরী'),
      },
      tryIt: {
        question: t('Which of these rivers flows westward into the Arabian Sea?', 'নিচের কোন নদী পশ্চিমে বয়ে আরব সাগরে পড়েছে?'),
        options: [t('Godavari', 'গোদাবরী'), t('Narmada', 'নর্মদা'), t('Krishna', 'কৃষ্ণা'), t('Mahanadi', 'মহানদী')],
        correct: 1,
        explanation: [
          t('Narmada flows west through a rift valley and falls into the Arabian Sea.', 'নর্মদা একটি গ্রস্ত উপত্যকা দিয়ে পশ্চিমে বয়ে আরব সাগরে পড়ে।'),
          t('Godavari, Krishna and Mahanadi all flow east into the Bay of Bengal.', 'গোদাবরী, কৃষ্ণা আর মহানদী সবাই পূর্বে বয়ে বঙ্গোপসাগরে পড়ে।'),
        ],
      },
    },
    {
      key: 'atmosphere_layers',
      emoji: '🌤️',
      name: t('Layers of the atmosphere', 'বায়ুমণ্ডলের স্তর'),
      spot: t(
        'The question asks which layer of the atmosphere has weather, the ozone layer, or where satellites or meteors are found.',
        'প্রশ্নে জানতে চায় বায়ুমণ্ডলের কোন স্তরে আবহাওয়ার ঘটনা ঘটে, ওজোন স্তর কোথায়, বা উল্কা কোথায় পুড়ে যায়।',
      ),
      method: [
        t('Order from the ground up: Troposphere → Stratosphere → Mesosphere → Thermosphere → Exosphere. Trick: "Tom Sees Many Tall Elephants".', 'মাটি থেকে উপরে ক্রম: ট্রপোস্ফিয়ার → স্ট্র্যাটোস্ফিয়ার → মেসোস্ফিয়ার → থার্মোস্ফিয়ার → এক্সোস্ফিয়ার। কৌশল: প্রথম অক্ষর T-S-M-T-E।'),
        t('Troposphere: lowest layer, all weather (clouds, rain, storms) happens here.', 'ট্রপোস্ফিয়ার: সবচেয়ে নিচের স্তর, সব আবহাওয়ার ঘটনা (মেঘ, বৃষ্টি, ঝড়) এখানে ঘটে।'),
        t('Stratosphere: has the ozone layer that blocks harmful ultraviolet rays; good for flying jet planes.', 'স্ট্র্যাটোস্ফিয়ার: এখানে ওজোন স্তর আছে যা ক্ষতিকর অতিবেগুনি রশ্মি আটকায়; জেট বিমান চলার উপযোগী।'),
        t('Mesosphere: meteors burn up here. Thermosphere (ionosphere): reflects radio waves.', 'মেসোস্ফিয়ার: উল্কা এখানে পুড়ে যায়। থার্মোস্ফিয়ার (আয়নোস্ফিয়ার): বেতার তরঙ্গ ফিরিয়ে দেয়।'),
      ],
      example: {
        question: t('In which layer of the atmosphere do clouds, rain and storms happen?', 'বায়ুমণ্ডলের কোন স্তরে মেঘ, বৃষ্টি ও ঝড় হয়?'),
        steps: [
          t('Clouds and rain need water vapour and dust, which stay close to the ground.', 'মেঘ ও বৃষ্টির জন্য জলীয় বাষ্প ও ধূলিকণা লাগে, যা মাটির কাছাকাছি থাকে।'),
          t('The lowest layer is the troposphere, so weather happens there.', 'সবচেয়ে নিচের স্তর হলো ট্রপোস্ফিয়ার, তাই আবহাওয়ার ঘটনা সেখানে ঘটে।'),
        ],
        answer: t('Troposphere', 'ট্রপোস্ফিয়ার'),
      },
      tryIt: {
        question: t('The ozone layer is found mainly in which layer of the atmosphere?', 'ওজোন স্তর প্রধানত বায়ুমণ্ডলের কোন স্তরে থাকে?'),
        options: [t('Troposphere', 'ট্রপোস্ফিয়ার'), t('Mesosphere', 'মেসোস্ফিয়ার'), t('Exosphere', 'এক্সোস্ফিয়ার'), t('Stratosphere', 'স্ট্র্যাটোস্ফিয়ার')],
        correct: 3,
        explanation: [
          t('The ozone layer lies in the stratosphere, the second layer, and protects us from ultraviolet rays.', 'ওজোন স্তর দ্বিতীয় স্তর স্ট্র্যাটোস্ফিয়ারে থাকে এবং আমাদের অতিবেগুনি রশ্মি থেকে বাঁচায়।'),
          t('The troposphere has weather, the mesosphere burns meteors, and the exosphere is the outermost thin layer.', 'ট্রপোস্ফিয়ারে আবহাওয়া, মেসোস্ফিয়ারে উল্কা পোড়ে, আর এক্সোস্ফিয়ার সবচেয়ে বাইরের পাতলা স্তর।'),
        ],
      },
    },
    {
      key: 'soils_and_crops',
      emoji: '🌱',
      name: t('Soil types and the crops they suit', 'মাটির প্রকার ও উপযুক্ত ফসল'),
      spot: t(
        'The question names a soil (black, alluvial, red, laterite) and asks its other name, where it is found, or which crop grows best in it.',
        'প্রশ্নে কোনো মাটির (কালো, পলি, লাল, ল্যাটেরাইট) নাম দিয়ে তার অন্য নাম, কোথায় পাওয়া যায়, বা কোন ফসল ভালো হয় জানতে চায়।',
      ),
      method: [
        t('Alluvial soil: brought by rivers; the most widespread soil in India (northern plains); good for rice and wheat.', 'পলি মাটি: নদী বয়ে আনে; ভারতে সবচেয়ে বেশি এলাকা জুড়ে আছে (উত্তরের সমভূমি); ধান ও গমের জন্য ভালো।'),
        t('Black soil (Regur): formed from lava rocks of the Deccan; holds moisture well; best for cotton, so also called "black cotton soil".', 'কালো মাটি (রেগুর): দাক্ষিণাত্যের লাভা শিলা থেকে তৈরি; জল ধরে রাখে; তুলোর জন্য সেরা, তাই একে "কৃষ্ণ তুলো মাটি" বলে।'),
        t('Laterite soil: forms in places with heavy rain and high heat; good for tea, coffee and cashew. Red soil: red due to iron.', 'ল্যাটেরাইট মাটি: বেশি বৃষ্টি ও বেশি তাপের জায়গায় তৈরি; চা, কফি ও কাজুর জন্য ভালো। লাল মাটি: লোহার জন্য লাল রং।'),
      ],
      example: {
        question: t('Which is the most widespread soil in India?', 'ভারতে কোন মাটি সবচেয়ে বেশি এলাকা জুড়ে আছে?'),
        steps: [
          t('The huge northern plains of the Ganga, Indus and Brahmaputra are made by soil carried by rivers.', 'গঙ্গা, সিন্ধু ও ব্রহ্মপুত্রের বিশাল উত্তরের সমভূমি নদীবাহিত মাটি দিয়ে তৈরি।'),
          t('River-carried soil is alluvial soil, so it covers the largest area.', 'নদীবাহিত মাটি হলো পলি মাটি, তাই এটিই সবচেয়ে বেশি এলাকা জুড়ে।'),
        ],
        answer: t('Alluvial soil', 'পলি মাটি'),
      },
      tryIt: {
        question: t('Which soil is best suited for growing cotton?', 'তুলো চাষের জন্য কোন মাটি সবচেয়ে উপযুক্ত?'),
        options: [t('Black soil', 'কালো মাটি'), t('Laterite soil', 'ল্যাটেরাইট মাটি'), t('Desert soil', 'মরু মাটি'), t('Mountain soil', 'পার্বত্য মাটি')],
        correct: 0,
        explanation: [
          t('Black soil (Regur) holds moisture for a long time, which cotton needs.', 'কালো মাটি (রেগুর) অনেকক্ষণ জল ধরে রাখে, যা তুলোর দরকার।'),
          t('That is why it is called "black cotton soil"; the other soils are not known for cotton.', 'এজন্যই একে "কৃষ্ণ তুলো মাটি" বলে; অন্য মাটিগুলো তুলোর জন্য পরিচিত নয়।'),
        ],
      },
    },
    {
      key: 'tropic_of_cancer_states',
      emoji: '🧭',
      name: t('Lines on the map: Tropic of Cancer and Standard Meridian', 'মানচিত্রের রেখা: কর্কটক্রান্তি রেখা ও প্রমাণ দ্রাঘিমা'),
      spot: t(
        'The question asks which states the Tropic of Cancer passes through (or does NOT pass through), or about India\'s standard time line.',
        'প্রশ্নে জানতে চায় কর্কটক্রান্তি রেখা কোন কোন রাজ্যের উপর দিয়ে গেছে (বা যায়নি), অথবা ভারতের প্রমাণ সময়ের রেখা নিয়ে।',
      ),
      method: [
        t('The Tropic of Cancer (23.5° N) crosses 8 states, west to east: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.', 'কর্কটক্রান্তি রেখা (23.5° উত্তর) পশ্চিম থেকে পূর্বে 8টি রাজ্যের উপর দিয়ে গেছে: গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা, মিজোরাম।'),
        t('Common traps: Bihar, Odisha, Uttar Pradesh, Manipur and Assam are NOT on this line.', 'সাধারণ ফাঁদ: বিহার, ওড়িশা, উত্তরপ্রদেশ, মণিপুর ও অসম এই রেখার উপর নেই।'),
        t('Indian Standard Time is based on 82°30\' E longitude, which passes near Mirzapur (Uttar Pradesh).', 'ভারতীয় প্রমাণ সময় 82°30\' পূর্ব দ্রাঘিমার উপর ভিত্তি করে, যা উত্তরপ্রদেশের মির্জাপুরের কাছ দিয়ে গেছে।'),
      ],
      example: {
        question: t('How many Indian states does the Tropic of Cancer pass through?', 'কর্কটক্রান্তি রেখা ভারতের কয়টি রাজ্যের উপর দিয়ে গেছে?'),
        steps: [
          t('List them west to east: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.', 'পশ্চিম থেকে পূর্বে লেখো: গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা, মিজোরাম।'),
          t('Count them: 8.', 'গোনো: 8টি।'),
        ],
        answer: t('8 states', '8টি রাজ্য'),
      },
      tryIt: {
        question: t('The Tropic of Cancer does NOT pass through which of these states?', 'কর্কটক্রান্তি রেখা নিচের কোন রাজ্যের উপর দিয়ে যায়নি?'),
        options: [t('West Bengal', 'পশ্চিমবঙ্গ'), t('Bihar', 'বিহার'), t('Tripura', 'ত্রিপুরা'), t('Mizoram', 'মিজোরাম')],
        correct: 1,
        explanation: [
          t('West Bengal, Tripura and Mizoram are all in the list of 8 states.', 'পশ্চিমবঙ্গ, ত্রিপুরা ও মিজোরাম সবাই 8টি রাজ্যের তালিকায় আছে।'),
          t('Bihar lies north of the line (the line passes through Jharkhand, just south of Bihar), so Bihar is the answer.', 'বিহার রেখার উত্তরে (রেখাটি বিহারের ঠিক দক্ষিণে ঝাড়খণ্ড দিয়ে গেছে), তাই উত্তর বিহার।'),
        ],
      },
    },
    {
      key: 'planets_solar_system',
      emoji: '🪐',
      name: t('Planets: the "most" and the nicknames', 'গ্রহ: "সবচেয়ে" এবং ডাকনাম'),
      spot: t(
        'The question asks which planet is the largest, smallest, hottest, closest to the Sun, or has a nickname like "Red Planet".',
        'প্রশ্নে জানতে চায় কোন গ্রহ সবচেয়ে বড়, ছোট, উষ্ণ, সূর্যের সবচেয়ে কাছে, বা কোন গ্রহের ডাকনাম "লাল গ্রহ"।',
      ),
      method: [
        t('Order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Trick: "My Very Educated Mother Just Served Us Noodles".', 'সূর্য থেকে ক্রম: বুধ, শুক্র, পৃথিবী, মঙ্গল, বৃহস্পতি, শনি, ইউরেনাস, নেপচুন। কৌশল: "বু-শু-পৃ-ম-বৃ-শ-ই-নে"।'),
        t('Mercury: closest to the Sun and smallest. Jupiter: largest.', 'বুধ: সূর্যের সবচেয়ে কাছে এবং সবচেয়ে ছোট। বৃহস্পতি: সবচেয়ে বড়।'),
        t('Venus: hottest (thick carbon dioxide blanket), brightest, called Earth\'s twin. Mars: "Red Planet" (iron oxide dust).', 'শুক্র: সবচেয়ে উষ্ণ (ঘন কার্বন ডাইঅক্সাইডের আবরণ), সবচেয়ে উজ্জ্বল, পৃথিবীর যমজ বলে। মঙ্গল: "লাল গ্রহ" (আয়রন অক্সাইডের ধুলো)।'),
        t('Trap: the closest planet (Mercury) is NOT the hottest; Venus is.', 'ফাঁদ: সবচেয়ে কাছের গ্রহ (বুধ) সবচেয়ে উষ্ণ নয়; শুক্র সবচেয়ে উষ্ণ।'),
      ],
      example: {
        question: t('Which is the hottest planet in the solar system?', 'সৌরজগতের সবচেয়ে উষ্ণ গ্রহ কোনটি?'),
        steps: [
          t('Many students say Mercury because it is closest to the Sun, but that is the trap.', 'অনেকে বুধ বলে কারণ এটি সূর্যের সবচেয়ে কাছে, কিন্তু এটিই ফাঁদ।'),
          t('Venus has a thick carbon dioxide atmosphere that traps heat, so it is hotter than Mercury.', 'শুক্রের ঘন কার্বন ডাইঅক্সাইডের বায়ুমণ্ডল তাপ আটকে রাখে, তাই এটি বুধের চেয়েও উষ্ণ।'),
        ],
        answer: t('Venus', 'শুক্র'),
      },
      tryIt: {
        question: t('Which planet is called the "Red Planet"?', 'কোন গ্রহকে "লাল গ্রহ" বলা হয়?'),
        options: [t('Jupiter', 'বৃহস্পতি'), t('Venus', 'শুক্র'), t('Mercury', 'বুধ'), t('Mars', 'মঙ্গল')],
        correct: 3,
        explanation: [
          t('The surface of Mars is covered with iron oxide (rust) dust, which looks red.', 'মঙ্গলের পৃষ্ঠ আয়রন অক্সাইড (মরচে) ধুলোয় ঢাকা, যা লাল দেখায়।'),
          t('Jupiter is the largest, Venus the hottest and Mercury the closest to the Sun; none is called red.', 'বৃহস্পতি সবচেয়ে বড়, শুক্র সবচেয়ে উষ্ণ আর বুধ সূর্যের সবচেয়ে কাছে; কাউকে লাল গ্রহ বলে না।'),
        ],
      },
    },
  ],
};
