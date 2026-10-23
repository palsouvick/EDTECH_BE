'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'english',
  topic: 'one_word_substitution',
  patterns: [
    {
      key: 'ologist_people',
      emoji: '🔬',
      name: t('A person who studies or collects something (-ologist, -ist)', 'যে কিছু নিয়ে পড়াশোনা করে বা সংগ্রহ করে (-ologist, -ist)'),
      spot: t('The phrase starts "A person who studies..." or "One who collects...", and the options end in -ologist or -ist.', 'বাক্যাংশ শুরু হয় "A person who studies..." বা "One who collects..." দিয়ে, আর option-গুলোর শেষে -ologist বা -ist।'),
      method: [
        t('"-logy" = study of, so "-logist" = a person who studies it. Find what is being studied.', '"-logy" = কোনো বিষয়ের পাঠ, তাই "-logist" = যে সেটা নিয়ে পড়াশোনা করে। কী নিয়ে পড়া হচ্ছে সেটা খোঁজো।'),
        t('Match the first part: ornitho = birds, entomo = insects, anthropo = human beings, geo = earth, cardio = heart.', 'প্রথম অংশ মেলাও: ornitho = পাখি, entomo = পোকামাকড়, anthropo = মানুষ, geo = পৃথিবী, cardio = হৃদ্‌যন্ত্র।'),
        t('Collectors: philatelist = stamps, numismatist = coins.', 'সংগ্রাহক: philatelist = ডাকটিকিট, numismatist = মুদ্রা।'),
      ],
      example: {
        question: t(
          'One word for "a person who collects postage stamps": (a) numismatist (b) philatelist (c) ornithologist (d) cartographer',
          '"a person who collects postage stamps"-এর এক কথায় প্রকাশ: (a) numismatist (b) philatelist (c) ornithologist (d) cartographer',
        ),
        steps: [
          t('Stamp collecting is called philately, so the person is a philatelist.', 'ডাকটিকিট সংগ্রহকে বলে philately, তাই সংগ্রাহক হলেন philatelist।'),
          t('Numismatist collects coins (trap); ornithologist studies birds; cartographer makes maps.', 'Numismatist মুদ্রা সংগ্রহ করেন (ফাঁদ); ornithologist পাখি নিয়ে পড়েন; cartographer মানচিত্র আঁকেন।'),
        ],
        answer: t('(b) philatelist', 'উত্তর: (b) philatelist (ডাকটিকিট সংগ্রাহক)'),
      },
      tryIt: {
        question: t('One word for "a person who studies birds":', '"a person who studies birds"-এর এক কথায় প্রকাশ:'),
        options: [t('entomologist', 'entomologist'), t('ornithologist', 'ornithologist'), t('anthropologist', 'anthropologist'), t('geologist', 'geologist')],
        correct: 1,
        explanation: [
          t('"Ornitho" means bird, and "-logist" means a person who studies, so ornithologist = one who studies birds.', '"Ornitho" মানে পাখি, "-logist" মানে যিনি পড়াশোনা করেন, তাই ornithologist = পক্ষীবিদ।'),
          t('Entomologist = insects (the usual trap), anthropologist = human beings, geologist = rocks and the earth.', 'Entomologist = পোকামাকড় (চেনা ফাঁদ), anthropologist = মানুষ ও মানবসমাজ, geologist = পাথর ও পৃথিবী।'),
        ],
      },
    },
    {
      key: 'phobia_words',
      emoji: '😨',
      name: t('Fears (-phobia)', 'ভয় (-phobia)'),
      spot: t('The phrase starts "Fear of..." and all options end in -phobia.', 'বাক্যাংশ শুরু হয় "Fear of..." দিয়ে, আর সব option-এর শেষে -phobia।'),
      method: [
        t('"-phobia" = fear. Only the first part changes, so match it to what is feared.', '"-phobia" = ভয়। শুধু প্রথম অংশটা বদলায়, তাই ভয়ের বস্তুর সঙ্গে সেটা মেলাও।'),
        t('Learn the common ones: hydro = water, acro = heights, claustro = closed spaces, xeno = foreigners/strangers.', 'চেনাগুলো শেখো: hydro = জল, acro = উঁচু জায়গা, claustro = বদ্ধ জায়গা, xeno = বিদেশি/অচেনা লোক।'),
        t('Link to words you know: hydro-electric (water), Acropolis (high city), closet (closed room).', 'জানা শব্দের সঙ্গে জুড়ে মনে রাখো: hydro-electric (জল), Acropolis (উঁচু শহর), closet (বন্ধ ঘর)।'),
      ],
      example: {
        question: t(
          'One word for "fear of heights": (a) hydrophobia (b) acrophobia (c) claustrophobia (d) xenophobia',
          '"fear of heights"-এর এক কথায় প্রকাশ: (a) hydrophobia (b) acrophobia (c) claustrophobia (d) xenophobia',
        ),
        steps: [
          t('"Acro" means high or top (like "acrobat", who performs high up).', '"Acro" মানে উঁচু বা চূড়া (যেমন "acrobat", যে উঁচুতে খেলা দেখায়)।'),
          t('So fear of heights = acrophobia.', 'তাই উচ্চতার ভয় = acrophobia।'),
        ],
        answer: t('(b) acrophobia', 'উত্তর: (b) acrophobia (উচ্চতাভীতি)'),
      },
      tryIt: {
        question: t('One word for "fear of closed or narrow spaces":', '"fear of closed or narrow spaces"-এর এক কথায় প্রকাশ:'),
        options: [t('hydrophobia', 'hydrophobia'), t('acrophobia', 'acrophobia'), t('xenophobia', 'xenophobia'), t('claustrophobia', 'claustrophobia')],
        correct: 3,
        explanation: [
          t('"Claustro" comes from a Latin word for a closed place (like "closet").', '"Claustro" এসেছে বন্ধ জায়গা বোঝানো Latin শব্দ থেকে ("closet"-এর মতো)।'),
          t('So claustrophobia = fear of closed spaces. Hydrophobia = water, acrophobia = heights, xenophobia = foreigners.', 'তাই claustrophobia = বদ্ধ জায়গার ভয়। Hydrophobia = জলের ভয়, acrophobia = উচ্চতার ভয়, xenophobia = বিদেশিদের প্রতি ভয়/বিদ্বেষ।'),
        ],
      },
    },
    {
      key: 'cide_words',
      emoji: '⚖️',
      name: t('Killing words (-cide)', 'হত্যা বোঝানো শব্দ (-cide)'),
      spot: t('The phrase starts "Killing of..." or "Murder of..." and all options end in -cide.', 'বাক্যাংশ শুরু হয় "Killing of..." বা "Murder of..." দিয়ে, আর সব option-এর শেষে -cide।'),
      method: [
        t('"-cide" = killing. Match the first part with who is killed.', '"-cide" = হত্যা। কাকে হত্যা করা হচ্ছে তার সঙ্গে প্রথম অংশ মেলাও।'),
        t('pater/patri = father → patricide; mater/matri = mother → matricide; frater/fratri = brother → fratricide; soror = sister → sororicide.', 'pater/patri = বাবা → patricide; mater/matri = মা → matricide; frater/fratri = ভাই → fratricide; soror = বোন → sororicide।'),
        t('rex/regi = king → regicide; infant = baby → infanticide; homo = human → homicide; genos = race/group → genocide; sui = self → suicide.', 'rex/regi = রাজা → regicide; infant = শিশু → infanticide; homo = মানুষ → homicide; genos = জাতি/গোষ্ঠী → genocide; sui = নিজে → suicide।'),
      ],
      example: {
        question: t(
          'One word for "the killing of a king": (a) homicide (b) regicide (c) genocide (d) patricide',
          '"the killing of a king"-এর এক কথায় প্রকাশ: (a) homicide (b) regicide (c) genocide (d) patricide',
        ),
        steps: [
          t('"Regi" means king (as in "regal" = royal).', '"Regi" মানে রাজা ("regal" = রাজকীয় শব্দের মতো)।'),
          t('So killing of a king = regicide.', 'তাই রাজাকে হত্যা = regicide।'),
        ],
        answer: t('(b) regicide', 'উত্তর: (b) regicide (রাজহত্যা)'),
      },
      tryIt: {
        question: t('One word for "the killing of one\'s own brother":', '"the killing of one\'s own brother"-এর এক কথায় প্রকাশ:'),
        options: [t('patricide', 'patricide'), t('matricide', 'matricide'), t('fratricide', 'fratricide'), t('homicide', 'homicide')],
        correct: 2,
        explanation: [
          t('"Frater" means brother (as in "fraternity" = brotherhood).', '"Frater" মানে ভাই ("fraternity" = ভ্রাতৃত্ব শব্দের মতো)।'),
          t('So killing one\'s brother = fratricide. Patricide = father, matricide = mother, homicide = any human being.', 'তাই ভাইকে হত্যা = fratricide। Patricide = বাবা, matricide = মা, homicide = যে কোনো মানুষকে হত্যা।'),
        ],
      },
    },
    {
      key: 'government_words',
      emoji: '🏛️',
      name: t('Kinds of government (-cracy, -archy)', 'শাসনব্যবস্থার নাম (-cracy, -archy)'),
      spot: t('The phrase starts "Government by..." or "Rule of...", and the options end in -cracy or -archy.', 'বাক্যাংশ শুরু হয় "Government by..." বা "Rule of..." দিয়ে, আর option-গুলোর শেষে -cracy বা -archy।'),
      method: [
        t('"-cracy" and "-archy" = rule or government. Find WHO rules.', '"-cracy" আর "-archy" = শাসন। কে শাসন করছে সেটা খোঁজো।'),
        t('demo = the people → democracy; auto = one person with total power → autocracy; mon(o) = one (king/queen) → monarchy.', 'demo = জনগণ → democracy; auto = সর্বময় ক্ষমতার একজন → autocracy; mono = একজন (রাজা/রানি) → monarchy।'),
        t('pluto = the rich → plutocracy; theo = God/religious leaders → theocracy; aristo = nobles (the "best" class) → aristocracy; bureau = officials → bureaucracy.', 'pluto = ধনী → plutocracy; theo = ঈশ্বর/ধর্মগুরু → theocracy; aristo = অভিজাত শ্রেণি → aristocracy; bureau = সরকারি আমলা → bureaucracy।'),
      ],
      example: {
        question: t(
          'One word for "government by the rich": (a) aristocracy (b) plutocracy (c) democracy (d) autocracy',
          '"government by the rich"-এর এক কথায় প্রকাশ: (a) aristocracy (b) plutocracy (c) democracy (d) autocracy',
        ),
        steps: [
          t('"Pluto" comes from a Greek word for wealth.', '"Pluto" এসেছে সম্পদ বোঝানো Greek শব্দ থেকে।'),
          t('So rule by the rich = plutocracy. Aristocracy (rule by nobles) is the trap.', 'তাই ধনীদের শাসন = plutocracy। Aristocracy (অভিজাতদের শাসন) হলো ফাঁদ।'),
        ],
        answer: t('(b) plutocracy', 'উত্তর: (b) plutocracy (ধনিকতন্ত্র)'),
      },
      tryIt: {
        question: t('One word for "government by religious leaders (in the name of God)":', '"government by religious leaders (in the name of God)"-এর এক কথায় প্রকাশ:'),
        options: [t('autocracy', 'autocracy'), t('aristocracy', 'aristocracy'), t('theocracy', 'theocracy'), t('democracy', 'democracy')],
        correct: 2,
        explanation: [
          t('"Theo" means God (as in "theology" = study of religion).', '"Theo" মানে ঈশ্বর ("theology" = ধর্মতত্ত্ব শব্দের মতো)।'),
          t('So government by religious leaders = theocracy. Autocracy = one all-powerful ruler, aristocracy = nobles, democracy = the people.', 'তাই ধর্মগুরুদের শাসন = theocracy। Autocracy = একনায়কের শাসন, aristocracy = অভিজাতদের শাসন, democracy = জনগণের শাসন।'),
        ],
      },
    },
    {
      key: 'cannot_be_words',
      emoji: '🚫',
      name: t('"That which cannot be..." words (illegible, inevitable)', '"যা ... করা যায় না" শব্দ (illegible, inevitable)'),
      spot: t('The phrase is "That which cannot be..." or "One who cannot be...", and the options all start with in-, il-, im- or ir-.', 'বাক্যাংশটা "That which cannot be..." বা "One who cannot be...", আর সব option শুরু in-, il-, im- বা ir- দিয়ে।'),
      method: [
        t('The prefix (in-, il-, im-, ir-) = "not"; the rest of the word gives the action.', 'Prefix (in-, il-, im-, ir-) = "না"; শব্দের বাকি অংশ কাজটা বলে।'),
        t('Learn the set: illegible = cannot be read; inaudible = cannot be heard; invisible = cannot be seen; inevitable = cannot be avoided; invincible = cannot be defeated; incurable = cannot be cured.', 'তালিকাটা শেখো: illegible = পড়া যায় না; inaudible = শোনা যায় না; invisible = দেখা যায় না; inevitable = এড়ানো যায় না; invincible = হারানো যায় না; incurable = সারানো যায় না।'),
        t('More: infallible = cannot make a mistake; indelible = cannot be erased; incorrigible = (a person) who cannot be reformed; irreparable = cannot be repaired.', 'আরও: infallible = ভুল করতে পারে না; indelible = মোছা যায় না; incorrigible = (মানুষ) যাকে শোধরানো যায় না; irreparable = মেরামত করা যায় না।'),
        t('The options look alike, so read the meaning slowly before choosing.', 'Option-গুলো দেখতে প্রায় এক, তাই বাছার আগে মানেটা ধীরে পড়ো।'),
      ],
      example: {
        question: t(
          'One word for "handwriting that cannot be read": (a) eligible (b) illegible (c) invisible (d) inaudible',
          '"handwriting that cannot be read"-এর এক কথায় প্রকাশ: (a) eligible (b) illegible (c) invisible (d) inaudible',
        ),
        steps: [
          t('"Legible" means can be read; "il-" makes it "cannot be read".', '"Legible" মানে পড়া যায়; "il-" যোগ করলে হয় "পড়া যায় না"।'),
          t('"Eligible" (suitable/qualified) only looks similar; invisible = cannot be seen; inaudible = cannot be heard.', '"Eligible" (যোগ্য) শুধু দেখতে একরকম; invisible = দেখা যায় না; inaudible = শোনা যায় না।'),
        ],
        answer: t('(b) illegible', 'উত্তর: (b) illegible (অপাঠ্য)'),
      },
      tryIt: {
        question: t('One word for "that which cannot be avoided":', '"that which cannot be avoided"-এর এক কথায় প্রকাশ:'),
        options: [t('invincible', 'invincible'), t('infallible', 'infallible'), t('indelible', 'indelible'), t('inevitable', 'inevitable')],
        correct: 3,
        explanation: [
          t('"Inevitable" means certain to happen; it cannot be avoided (e.g. "Death is inevitable").', '"Inevitable" মানে যা ঘটবেই, এড়ানো যায় না (অবশ্যম্ভাবী), যেমন "Death is inevitable"।'),
          t('Invincible = cannot be defeated, infallible = cannot make a mistake, indelible = cannot be erased.', 'Invincible = অপরাজেয়, infallible = অভ্রান্ত (ভুল করে না), indelible = অমোচনীয় (মোছা যায় না)।'),
        ],
      },
    },
  ],
};
