'use strict';

module.exports = {
  subject: 'english',
  topic: 'synonyms_antonyms',
  title: { en: 'Synonyms & Antonyms', bn: 'সমার্থক ও বিপরীত শব্দ' },
  emoji: '🔁',
  intro: {
    en: 'Some words mean the same thing, and some words mean the opposite. Knowing these word pairs makes your English richer and helps you answer vocabulary questions in every exam.',
    bn: 'কিছু শব্দের মানে একই, আবার কিছু শব্দের মানে ঠিক উল্টো। এই শব্দজোড়াগুলো জানলে তোমার English আরও সুন্দর হবে, আর প্রতিটি পরীক্ষার vocabulary প্রশ্নের উত্তর দিতে সুবিধা হবে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'What is a synonym?', bn: 'Synonym কাকে বলে?' },
          body: {
            en: `A **synonym** is a word that has the **same** (or almost the same) meaning as another word.

- big = **large**
- fast = **quick** = **rapid**
- happy = **glad**
- start = **begin**

Example: *The elephant is **big**.* = *The elephant is **large**.* Both sentences mean the same thing.`,
            bn: `**Synonym** (সমার্থক শব্দ) হলো এমন শব্দ, যার মানে অন্য একটি শব্দের **একই** (বা প্রায় একই)।

- big = **large** (বড়)
- fast = **quick** = **rapid** (দ্রুত)
- happy = **glad** (খুশি)
- start = **begin** (শুরু করা)

উদাহরণ: *The elephant is **big**.* = *The elephant is **large**.* দুটো বাক্যের মানে একই — হাতিটা বড়।`,
          },
        },
        {
          heading: { en: 'What is an antonym?', bn: 'Antonym কাকে বলে?' },
          body: {
            en: `An **antonym** is a word that means the **opposite** of another word.

- hot ↔ **cold**
- rich ↔ **poor**
- victory ↔ **defeat**
- legal ↔ **illegal**
- busy ↔ **idle** (doing nothing)

Example: *Our team won; it was a **victory**. Their team lost; it was a **defeat**.*`,
            bn: `**Antonym** (বিপরীত শব্দ) হলো এমন শব্দ, যার মানে অন্য শব্দের ঠিক **উল্টো**।

- hot (গরম) ↔ **cold** (ঠান্ডা)
- rich (ধনী) ↔ **poor** (গরিব)
- victory (জয়) ↔ **defeat** (পরাজয়)
- legal (আইনসম্মত) ↔ **illegal** (বেআইনি)
- busy (ব্যস্ত) ↔ **idle** (অলস, কিছু না করে বসে থাকা)

উদাহরণ: *Our team won; it was a **victory**. Their team lost; it was a **defeat**.* — আমাদের দল জিতেছে (জয়), ওদের দল হেরেছে (পরাজয়)।`,
          },
        },
        {
          heading: { en: 'Making opposites with a prefix', bn: 'Prefix দিয়ে বিপরীত শব্দ তৈরি' },
          body: {
            en: `A **prefix** is a small part added to the **front** of a word. Some prefixes turn a word into its opposite:

- **un**-: happy → **un**happy, kind → **un**kind
- **dis**-: obedient → **dis**obedient, agree → **dis**agree
- **in**- / **im**- / **il**- / **ir**-: sufficient → **in**sufficient, possible → **im**possible, legal → **il**legal, regular → **ir**regular
- **im**-: mature → **im**mature`,
            bn: `**Prefix** (উপসর্গ) হলো শব্দের **সামনে** জোড়া একটা ছোট অংশ। কিছু prefix শব্দটাকে উল্টো মানে দেয়:

- **un**-: happy (খুশি) → **un**happy (অখুশি), kind → **un**kind
- **dis**-: obedient (বাধ্য) → **dis**obedient (অবাধ্য), agree → **dis**agree
- **in**- / **im**- / **il**- / **ir**-: sufficient → **in**sufficient (অপর্যাপ্ত), possible → **im**possible (অসম্ভব), legal → **il**legal (বেআইনি), regular → **ir**regular (অনিয়মিত)
- **im**-: mature (পরিণত) → **im**mature (অপরিণত)`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the synonym of **rapid**: (a) slow (b) swift (c) heavy (d) late', bn: '**rapid**-এর synonym বেছে নাও: (a) slow (b) swift (c) heavy (d) late' },
          steps: [
            { en: '**Rapid** means "very fast", like a rapid train.', bn: '**Rapid** মানে "খুব দ্রুত", যেমন a rapid train (দ্রুতগামী ট্রেন)।' },
            { en: '*Slow* is the opposite, so it is a trap. *Heavy* and *late* have nothing to do with speed.', bn: '*Slow* (ধীর) তো উল্টো মানে, তাই এটা ফাঁদ। *Heavy* (ভারী) আর *late* (দেরি) গতির সঙ্গে সম্পর্কহীন।' },
            { en: '*Swift* also means "very fast".', bn: '*Swift* মানেও "খুব দ্রুত"।' },
          ],
          answer: { en: '(b) **swift**', bn: '(b) **swift** (দ্রুত)' },
        },
        {
          question: { en: 'Choose the antonym of **victory**: (a) win (b) success (c) defeat (d) prize', bn: '**victory**-র antonym বেছে নাও: (a) win (b) success (c) defeat (d) prize' },
          steps: [
            { en: '**Victory** means winning a match or a fight.', bn: '**Victory** মানে খেলায় বা লড়াইয়ে জেতা (জয়)।' },
            { en: '*Win* and *success* are close in meaning (synonyms), not opposites. *Prize* is what you get after winning.', bn: '*Win* আর *success* প্রায় একই মানে (synonym), উল্টো নয়। *Prize* (পুরস্কার) জেতার পরে পাওয়া জিনিস।' },
            { en: 'The opposite of winning is losing: *defeat*.', bn: 'জেতার উল্টো হলো হারা: *defeat* (পরাজয়)।' },
          ],
          answer: { en: '(c) **defeat**', bn: '(c) **defeat** (পরাজয়)' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Common exam synonyms', bn: 'পরীক্ষায় আসা সাধারণ synonym' },
          body: {
            en: `- **abundant** = plentiful (more than enough)
- **sufficient** = adequate (enough)
- **wealthy** = affluent (rich)
- **humble** = modest (not proud)
- **candid** = frank (open and honest)
- **conceal** = hide
- **destroy** = demolish
- **permanent** = lasting
- **reluctant** = hesitant (not willing)
- **spacious** = roomy (having a lot of space)
- **ban** = prohibit (not allow)
- **expand** = enlarge (make bigger)
- **ancient** = antique (very old)
- **noble** = honourable`,
            bn: `- **abundant** = plentiful (প্রচুর, দরকারের চেয়ে বেশি)
- **sufficient** = adequate (যথেষ্ট)
- **wealthy** = affluent (ধনী)
- **humble** = modest (বিনয়ী, অহংকারহীন)
- **candid** = frank (খোলামেলা, স্পষ্টবাদী)
- **conceal** = hide (লুকোনো)
- **destroy** = demolish (ধ্বংস করা)
- **permanent** = lasting (স্থায়ী)
- **reluctant** = hesitant (অনিচ্ছুক, দ্বিধাগ্রস্ত)
- **spacious** = roomy (প্রশস্ত, অনেক জায়গাওয়ালা)
- **ban** = prohibit (নিষেধ করা)
- **expand** = enlarge (বড় করা)
- **ancient** = antique (প্রাচীন)
- **noble** = honourable (মহৎ, সম্মানীয়)`,
          },
        },
        {
          heading: { en: 'Common exam antonyms', bn: 'পরীক্ষায় আসা সাধারণ antonym' },
          body: {
            en: `- **permanent** ↔ temporary
- **conceal** ↔ reveal (show)
- **expand** ↔ contract (become smaller)
- **humble** ↔ haughty (proud)
- **hostile** ↔ friendly
- **fertile** ↔ sterile / barren (cannot grow anything)
- **gloomy** ↔ cheerful
- **fragile** ↔ sturdy / robust (strong)
- **urban** (of the city) ↔ rural (of the village)
- **hasten** (hurry) ↔ delay / hinder
- **cruel** ↔ gentle
- **decline** ↔ flourish (grow well)
- **lenient** (soft) ↔ harsh`,
            bn: `- **permanent** (স্থায়ী) ↔ temporary (অস্থায়ী)
- **conceal** (লুকোনো) ↔ reveal (প্রকাশ করা)
- **expand** (বাড়া) ↔ contract (সংকুচিত হওয়া)
- **humble** (বিনয়ী) ↔ haughty (উদ্ধত, অহংকারী)
- **hostile** (শত্রুভাবাপন্ন) ↔ friendly (বন্ধুত্বপূর্ণ)
- **fertile** (উর্বর) ↔ sterile / barren (বন্ধ্যা, অনুর্বর)
- **gloomy** (বিষণ্ণ) ↔ cheerful (হাসিখুশি)
- **fragile** (ভঙ্গুর) ↔ sturdy / robust (মজবুত)
- **urban** (শহুরে) ↔ rural (গ্রামীণ)
- **hasten** (তাড়াতাড়ি করা) ↔ delay / hinder (দেরি করানো / বাধা দেওয়া)
- **cruel** (নিষ্ঠুর) ↔ gentle (কোমল, নরম)
- **decline** (কমে যাওয়া) ↔ flourish (সমৃদ্ধ হওয়া)
- **lenient** (নরম, ক্ষমাশীল) ↔ harsh (কঠোর)`,
          },
        },
        {
          heading: { en: 'Use the word in a sentence', bn: 'শব্দটা বাক্যে বসিয়ে দেখো' },
          body: {
            en: `If you are not sure, put each option into a simple sentence and see if the meaning stays the same.

*The hall is **spacious**.* → *The hall is **roomy**.* ✔ Same meaning.
*The hall is **narrow**.* ✘ Opposite meaning.

For an antonym, the sentence should mean the **opposite**: *The teacher is **lenient*** (soft) → *The teacher is **harsh***.`,
            bn: `নিশ্চিত না হলে, প্রতিটি option একটা সহজ বাক্যে বসিয়ে দেখো মানে একই থাকছে কিনা।

*The hall is **spacious**.* (হলঘরটা প্রশস্ত) → *The hall is **roomy**.* ✔ মানে একই।
*The hall is **narrow**.* (সরু) ✘ উল্টো মানে।

Antonym-এর ক্ষেত্রে বাক্যের মানে **উল্টো** হওয়া চাই: *The teacher is **lenient*** (নরম) → *The teacher is **harsh*** (কঠোর)।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the antonym of **humble**: (a) modest (b) haughty (c) polite (d) simple', bn: '**humble**-এর antonym বেছে নাও: (a) modest (b) haughty (c) polite (d) simple' },
          steps: [
            { en: '**Humble** means "not proud", a person who does not show off.', bn: '**Humble** মানে "অহংকারহীন", যে মানুষ বড়াই করে না (বিনয়ী)।' },
            { en: '*Modest* is a synonym, so it is a trap. *Polite* and *simple* are also good qualities, close to humble.', bn: '*Modest* হলো synonym — এটা ফাঁদ। *Polite* (ভদ্র) আর *simple* (সরল) ও humble-এর কাছাকাছি ভালো গুণ।' },
            { en: '*Haughty* means "very proud and rude", the opposite.', bn: '*Haughty* মানে "খুব অহংকারী ও উদ্ধত" — ঠিক উল্টো।' },
          ],
          answer: { en: '(b) **haughty**', bn: '(b) **haughty** (উদ্ধত)' },
        },
        {
          question: { en: 'Choose the synonym of **conceal**: (a) reveal (b) hide (c) show (d) find', bn: '**conceal**-এর synonym বেছে নাও: (a) reveal (b) hide (c) show (d) find' },
          steps: [
            { en: 'Sentence: *The thief tried to **conceal** the money under the bed.* He tried to keep it out of sight.', bn: 'বাক্য: *The thief tried to **conceal** the money under the bed.* — চোর টাকাটা খাটের নিচে লুকোতে চাইল।' },
            { en: '*Reveal* and *show* are opposites. *Find* is different.', bn: '*Reveal* আর *show* (দেখানো) উল্টো মানে। *Find* (খুঁজে পাওয়া) আলাদা।' },
            { en: 'Replace with *hide*: *The thief tried to hide the money.* Same meaning.', bn: '*hide* বসাও: *The thief tried to hide the money.* — মানে একই থাকে।' },
          ],
          answer: { en: '(b) **hide**', bn: '(b) **hide** (লুকোনো)' },
        },
        {
          question: { en: 'Choose the antonym of **fertile**: (a) rich (b) productive (c) sterile (d) green', bn: '**fertile**-এর antonym বেছে নাও: (a) rich (b) productive (c) sterile (d) green' },
          steps: [
            { en: '**Fertile** land is land where crops grow well.', bn: '**Fertile** জমি মানে যেখানে ভালো ফসল হয় (উর্বর)।' },
            { en: '*Rich* and *productive* mean almost the same as fertile. *Green* is a colour.', bn: '*Rich* আর *productive* প্রায় fertile-এরই মানে। *Green* একটা রং।' },
            { en: '*Sterile* land cannot grow anything: the opposite.', bn: '*Sterile* জমিতে কিছুই জন্মায় না (অনুর্বর) — উল্টো মানে।' },
          ],
          answer: { en: '(c) **sterile**', bn: '(c) **sterile** (অনুর্বর)' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Harder words for competitive exams', bn: 'প্রতিযোগিতামূলক পরীক্ষার কঠিন শব্দ' },
          body: {
            en: `Read each line as: **word** (meaning): = synonym ↔ antonym.

- **ephemeral** (lasting a very short time): = short-lived, transient ↔ permanent, eternal
- **frugal** (careful with money): = thrifty ↔ extravagant (wasteful)
- **zealous** (full of energy for a cause): = ardent, fervent ↔ listless, lukewarm
- **diligent** (hard-working): = assiduous ↔ lazy
- **lucid** (clear, easy to understand): = clear, transparent ↔ vague
- **eminent** (famous and respected): = renowned ↔ obscure (unknown)
- **mundane** (ordinary, dull): = commonplace ↔ extraordinary
- **tedious** (long and boring): = monotonous ↔ thrilling
- **obstinate** (stubborn): = adamant ↔ pliable (easily bent)
- **pacify** (calm someone down): = appease, placate ↔ provoke, aggravate
- **prudent** (wise and careful): = discreet, sensible ↔ reckless
- **trivial** (of little importance): = insignificant ↔ important
- **genuine** (real): = authentic ↔ counterfeit (fake)
- **inevitable** (cannot be avoided): = unavoidable ↔ avoidable`,
            bn: `প্রতিটি লাইন এভাবে পড়ো: **word** (মানে): = synonym ↔ antonym।

- **ephemeral** (খুব অল্প সময় থাকে, ক্ষণস্থায়ী): = short-lived, transient ↔ permanent, eternal (চিরস্থায়ী)
- **frugal** (মিতব্যয়ী, হিসেব করে খরচ করে): = thrifty ↔ extravagant (অপব্যয়ী)
- **zealous** (কোনো কাজে প্রবল উৎসাহী): = ardent, fervent ↔ listless, lukewarm (উৎসাহহীন)
- **diligent** (পরিশ্রমী): = assiduous ↔ lazy (অলস)
- **lucid** (স্পষ্ট, সহজবোধ্য): = clear, transparent ↔ vague (অস্পষ্ট)
- **eminent** (বিখ্যাত ও সম্মানিত): = renowned ↔ obscure (অখ্যাত)
- **mundane** (সাধারণ, একঘেয়ে): = commonplace ↔ extraordinary (অসাধারণ)
- **tedious** (দীর্ঘ ও বিরক্তিকর): = monotonous ↔ thrilling (রোমাঞ্চকর)
- **obstinate** (জেদি): = adamant ↔ pliable (নমনীয়)
- **pacify** (শান্ত করা): = appease, placate ↔ provoke, aggravate (উসকে দেওয়া)
- **prudent** (বিচক্ষণ, সাবধানী): = discreet, sensible ↔ reckless (বেপরোয়া)
- **trivial** (তুচ্ছ): = insignificant ↔ important (গুরুত্বপূর্ণ)
- **genuine** (আসল): = authentic ↔ counterfeit (নকল)
- **inevitable** (অনিবার্য, এড়ানো যায় না): = unavoidable ↔ avoidable`,
          },
        },
        {
          heading: { en: 'Elimination: the four-option trick', bn: 'বাদ দেওয়ার কৌশল: চার option-এর ট্রিক' },
          body: {
            en: `Exam setters usually put **one opposite** among the synonym options, and **one synonym** among the antonym options, to trap you.

1. Read the question word carefully: is it asking for a **synonym** or an **antonym**?
2. Find the option that means the same, and the option that means the opposite.
3. Pick the one the question asks for.
4. If you don't know a word, use the **prefix or root**: *in*-*evitable* has "not" inside it; *trans*-ient means "passing through".`,
            bn: `প্রশ্নকর্তারা সাধারণত synonym-এর option-এর মধ্যে **একটা উল্টো শব্দ**, আর antonym-এর option-এর মধ্যে **একটা synonym** রেখে দেন — তোমাকে ফাঁদে ফেলার জন্য।

1. প্রশ্নটা মন দিয়ে পড়ো: **synonym** চাইছে, না **antonym**?
2. কোন option একই মানে, আর কোনটা উল্টো মানে — খুঁজে বের করো।
3. প্রশ্ন যেটা চাইছে, সেটা বেছে নাও।
4. শব্দ না জানলে **prefix বা root** (মূল অংশ) দেখো: *in*-*evitable*-এ "না" অর্থ আছে; *trans*-ient মানে "পেরিয়ে যাওয়া", অর্থাৎ ক্ষণস্থায়ী।`,
          },
        },
        {
          heading: { en: 'Same part of speech', bn: 'একই part of speech' },
          body: {
            en: `A synonym or antonym must be the **same part of speech** (noun for noun, verb for verb, adjective for adjective).

- *pacify* is a verb → synonym *appease* (verb), not *peace* (noun).
- *frugal* is an adjective → antonym *extravagant* (adjective), not *waste* (noun/verb).`,
            bn: `Synonym বা antonym সবসময় **একই part of speech** (পদ) হতে হবে — noun-এর জন্য noun, verb-এর জন্য verb, adjective-এর জন্য adjective।

- *pacify* একটা verb (ক্রিয়া) → synonym *appease* (verb), *peace* (noun) নয়।
- *frugal* একটা adjective (বিশেষণ) → antonym *extravagant* (adjective), *waste* নয়।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Choose the word most similar in meaning to **EPHEMERAL**: (a) eternal (b) short-lived (c) heavenly (d) ancient', bn: '**EPHEMERAL**-এর সবচেয়ে কাছাকাছি মানের শব্দ বেছে নাও: (a) eternal (b) short-lived (c) heavenly (d) ancient' },
          steps: [
            { en: '**Ephemeral** means lasting for a very short time, like a soap bubble or a rainbow.', bn: '**Ephemeral** মানে খুব অল্প সময় টিকে থাকে, যেমন সাবানের বুদবুদ বা রামধনু (ক্ষণস্থায়ী)।' },
            { en: '*Eternal* (lasting forever) is the opposite trap. *Ancient* means very old.', bn: '*Eternal* (চিরস্থায়ী) হলো উল্টো মানের ফাঁদ। *Ancient* মানে প্রাচীন।' },
            { en: '*Heavenly* only sounds poetic; it means "of heaven".', bn: '*Heavenly* শুনতে কাব্যিক, কিন্তু মানে "স্বর্গীয়"।' },
          ],
          answer: { en: '(b) **short-lived**', bn: '(b) **short-lived** (ক্ষণস্থায়ী)' },
        },
        {
          question: { en: 'Choose the antonym of **FRUGAL**: (a) thrifty (b) economical (c) extravagant (d) careful', bn: '**FRUGAL**-এর antonym বেছে নাও: (a) thrifty (b) economical (c) extravagant (d) careful' },
          steps: [
            { en: '**Frugal** means spending very little money, saving carefully.', bn: '**Frugal** মানে খুব কম খরচ করা, হিসেব করে টাকা বাঁচানো (মিতব্যয়ী)।' },
            { en: '*Thrifty*, *economical* and *careful* are all close to frugal (synonym traps).', bn: '*Thrifty*, *economical* আর *careful* — সবই frugal-এর কাছাকাছি মানে (synonym-এর ফাঁদ)।' },
            { en: '*Extravagant* means spending too much and wasting money: the opposite.', bn: '*Extravagant* মানে বেশি খরচ করে টাকা নষ্ট করা (অপব্যয়ী) — উল্টো মানে।' },
          ],
          answer: { en: '(c) **extravagant**', bn: '(c) **extravagant** (অপব্যয়ী)' },
        },
        {
          question: { en: 'Choose the antonym of **PACIFY**: (a) appease (b) calm (c) provoke (d) soothe', bn: '**PACIFY**-এর antonym বেছে নাও: (a) appease (b) calm (c) provoke (d) soothe' },
          steps: [
            { en: '**Pacify** means to make an angry person calm. Think of "Pacific", the calm ocean.', bn: '**Pacify** মানে রাগী মানুষকে শান্ত করা। "Pacific" (শান্ত মহাসাগর) মনে রাখো।' },
            { en: '*Appease*, *calm* and *soothe* all mean making someone calm: synonyms.', bn: '*Appease*, *calm* আর *soothe* — সবকটার মানে কাউকে শান্ত করা: এগুলো synonym।' },
            { en: '*Provoke* means to make someone angry: the opposite.', bn: '*Provoke* মানে কাউকে রাগিয়ে দেওয়া (উসকে দেওয়া) — উল্টো মানে।' },
          ],
          answer: { en: '(c) **provoke**', bn: '(c) **provoke** (উসকে দেওয়া)' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'Synonym = same meaning', bn: 'Synonym = একই মানে' },
      explain: { en: 'A synonym can replace the word in a sentence without changing the meaning: *He is **wealthy*** = *He is **affluent***.', bn: 'Synonym বাক্যে বসালে মানে বদলায় না: *He is **wealthy*** = *He is **affluent*** (সে ধনী)।' },
    },
    {
      label: { en: 'Antonym = opposite meaning', bn: 'Antonym = উল্টো মানে' },
      explain: { en: 'An antonym flips the meaning: *The road is **permanent*** ↔ *The road is **temporary***.', bn: 'Antonym বসালে মানে উল্টে যায়: *permanent* (স্থায়ী) ↔ *temporary* (অস্থায়ী)।' },
    },
    {
      label: { en: 'Negative prefixes make antonyms', bn: 'নেতিবাচক prefix দিয়ে antonym' },
      explain: { en: 'un-, dis-, in-, im-, il-, ir- often mean "not": obedient → disobedient, mature → immature, legal → illegal, sufficient → insufficient.', bn: 'un-, dis-, in-, im-, il-, ir- প্রায়ই "না" বোঝায়: obedient → disobedient (অবাধ্য), mature → immature (অপরিণত), legal → illegal (বেআইনি), sufficient → insufficient (অপর্যাপ্ত)।' },
    },
    {
      label: { en: 'Read the question twice', bn: 'প্রশ্নটা দু-বার পড়ো' },
      explain: { en: 'Check whether it asks for "similar" (synonym) or "opposite" (antonym). Most wrong answers come from picking a synonym when an antonym was asked.', bn: '"similar" (synonym) চাইছে, না "opposite" (antonym) — দেখে নাও। বেশিরভাগ ভুল হয় antonym চাওয়া হলে synonym বেছে ফেলায়।' },
    },
    {
      label: { en: 'Match the part of speech', bn: 'Part of speech মেলাও' },
      explain: { en: 'Verb with verb, adjective with adjective: *hasten* (verb) ↔ *delay* (verb); *rapid* (adjective) ↔ *slow* (adjective).', bn: 'Verb-এর সঙ্গে verb, adjective-এর সঙ্গে adjective: *hasten* (তাড়াতাড়ি করা, verb) ↔ *delay* (দেরি করা, verb); *rapid* (adjective) ↔ *slow* (adjective)।' },
    },
    {
      label: { en: 'Test in a sentence', bn: 'বাক্যে বসিয়ে যাচাই' },
      explain: { en: 'Put the option into an everyday sentence: *Rahul is **zealous** about cricket* = *Rahul is **ardent** about cricket* (very keen).', bn: 'Option-টা রোজকার বাক্যে বসাও: *Rahul is **zealous** about cricket* = *Rahul is **ardent** about cricket* (ক্রিকেট নিয়ে খুব উৎসাহী)।' },
    },
  ],
  tips: [
    { en: 'Learn words in pairs and triples: frugal = thrifty ↔ extravagant. One card, three words.', bn: 'শব্দ জোড়ায় বা তিনটে করে শেখো: frugal = thrifty ↔ extravagant। এক কার্ডে তিনটে শব্দ।' },
    { en: 'Common mistake: choosing *modest* as the antonym of *humble*. Modest is a synonym; the antonym is *haughty*.', bn: 'সাধারণ ভুল: *humble*-এর antonym হিসেবে *modest* বেছে নেওয়া। Modest হলো synonym; antonym হলো *haughty*।' },
    { en: '*Ephemeral* (short-lived) and *eternal* (forever) are opposites; do not mix them up.', bn: '*Ephemeral* (ক্ষণস্থায়ী) আর *eternal* (চিরস্থায়ী) উল্টো মানে — গুলিয়ে ফেলো না।' },
    { en: 'Read English newspapers for 10 minutes a day and note 3 new words with one synonym and one antonym each.', bn: 'রোজ ১০ মিনিট English খবরের কাগজ পড়ো, আর ৩টে নতুন শব্দ লেখো — প্রতিটার একটা synonym আর একটা antonym সহ।' },
    { en: 'Do not choose an option just because it looks or sounds like the question word (e.g. *eminent* vs *imminent*).', bn: 'শুধু দেখতে বা শুনতে মিল আছে বলে কোনো option বেছো না (যেমন *eminent* = বিখ্যাত, কিন্তু *imminent* = আসন্ন)।' },
  ],
};
