'use strict';

module.exports = {
  subject: 'english',
  topic: 'articles',
  title: { en: 'Articles: a, an, the', bn: 'আর্টিকেল (Article): a, an, the' },
  emoji: '🅰️',
  intro: {
    en: 'Articles are the tiny words *a, an, the* that come before a noun. You meet them in every office letter, email and news headline: "I saw an elephant", "She is the best player". They look easy, but they are tested in fill in the blanks, error spotting and sentence improvement in almost every exam.',
    bn: 'Article হল ছোট্ট শব্দ *a, an, the*, যা noun-এর আগে বসে। অফিসের চিঠি, ইমেল, খবরের শিরোনামে সবখানে এদের দেখা যায়: "I saw an elephant", "She is the best player"। দেখতে সহজ, কিন্তু fill in the blanks, error spotting আর sentence improvement-এ প্রায় প্রতিটি পরীক্ষায় এদের নিয়ে প্রশ্ন আসে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'Start with a real sentence: "I saw an elephant in the zoo."', bn: 'একটি সত্যিকারের বাক্য দিয়ে শুরু: "I saw an elephant in the zoo."' },
          body: {
            en: `Look at this sentence you might say after a school trip:

***I saw an elephant in the zoo.***

- **an** + **elephant**: one elephant, not known to the listener before.
- **the** + **zoo**: the zoo we both know (the one we visited).

There are only **three articles**:

- **a** and **an** are *indefinite*: they mean "any one" (not a particular one).
- **the** is *definite*: it means "this particular one that we both know".

Use them only before a noun (a naming word: *elephant, zoo, book, doctor*).`,
            bn: `স্কুল-ট্যুরের পরে তুমি হয়তো এই বাক্যটি বলবে:

***I saw an elephant in the zoo.***

- **an** + **elephant**: একটি হাতি, যার কথা শ্রোতা আগে জানত না।
- **the** + **zoo**: যে চিড়িয়াখানা দুজনেই চেনে (যেটিতে আমরা গিয়েছিলাম)।

Article মোট **তিনটি**:

- **a** ও **an** হল *indefinite* (অনির্দিষ্ট): মানে "যেকোনো একটি"।
- **the** হল *definite* (নির্দিষ্ট): মানে "এই বিশেষ জিনিসটি, যা আমরা দুজনেই জানি"।

শুধু noun (নাম-শব্দ: *elephant, zoo, book, doctor*)-এর আগে এদের ব্যবহার করো।`,
          },
        },
        {
          heading: { en: 'a or an? Listen to the sound, not the letter', bn: 'a না an? অক্ষর নয়, উচ্চারণ শোনো' },
          body: {
            en: `The rule is about the **first sound** of the next word:

- **an** before a **vowel sound**: *an elephant, an apple, an umbrella, an engineer*
- **a** before a **consonant sound**: *a doctor, a book, a city*

Now the exam traps, where the **letter lies** but the sound tells the truth:

| Word | First sound | Article |
|---|---|---|
| hour | "our" (h is silent) | **an** hour |
| honest | "onest" | **an** honest man |
| university | "you-" (consonant sound) | **a** university |
| uniform | "you-" | **a** uniform |
| one-rupee coin | "won-" | **a** one-rupee coin |
| MLA | "em-el-ay" | **an** MLA |

**Common mistake:** "a hour", "an university". Say the word aloud and listen.`,
            bn: `নিয়মটি পরের শব্দের **প্রথম উচ্চারণ** নিয়ে:

- **স্বরধ্বনির** আগে **an**: *an elephant, an apple, an umbrella, an engineer*
- **ব্যঞ্জনধ্বনির** আগে **a**: *a doctor, a book, a city*

এবার পরীক্ষার ফাঁদ, যেখানে **অক্ষর ঠকায়** কিন্তু উচ্চারণ সত্যি বলে:

| শব্দ | প্রথম ধ্বনি | Article |
|---|---|---|
| hour | "আওয়ার" (h নীরব) | **an** hour |
| honest | "অনেস্ট" | **an** honest man |
| university | "ইউ-" (ব্যঞ্জনধ্বনি) | **a** university |
| uniform | "ইউ-" | **a** uniform |
| one-rupee coin | "ওয়ান-" | **a** one-rupee coin |
| MLA | "এম-এল-এ" | **an** MLA |

**সাধারণ ভুল:** "a hour", "an university"। শব্দটি জোরে বলে শোনো।`,
          },
        },
        {
          heading: { en: 'When do we use "the"?', bn: 'কখন "the" বসে?' },
          body: {
            en: `Use **the** when both speaker and listener know which one is meant:

- **Already mentioned:** *I bought a bag. **The** bag is very light.* (first "a", then "the")
- **Only one in the world:** *the sun, the moon, the earth, the sky*
- **Superlative** (best, tallest, most): *Rahul is **the** best bowler.*
- **Ordinal** (first, second, third): *This is **the** first time I am flying.*
- **One obvious thing in the room:** *Please close **the** door.*

The first time we meet a thing we say **a/an**; after that, **the**.`,
            bn: `বক্তা ও শ্রোতা দুজনেই যখন জানে কোনটির কথা হচ্ছে, তখন **the** বসে:

- **আগে উল্লেখ করা হয়েছে:** *I bought a bag. **The** bag is very light.* (প্রথমে "a", তারপর "the")
- **পৃথিবীতে একটিই:** *the sun, the moon, the earth, the sky*
- **Superlative** (best, tallest, most): *Rahul is **the** best bowler.*
- **Ordinal** (first, second, third): *This is **the** first time I am flying.*
- **ঘরের এক সুস্পষ্ট জিনিস:** *Please close **the** door.*

কোনো জিনিসের কথা প্রথমবার বললে **a/an**; তারপর থেকে **the**।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "I saw ___ elephant in the zoo." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "I saw ___ elephant in the zoo." (a / an / the / no article)' },
          steps: [
            { en: 'Say the next word aloud: *elephant* starts with the vowel sound "e".', bn: 'পরের শব্দটি জোরে বলো: *elephant* স্বরধ্বনি "এ" দিয়ে শুরু।' },
            { en: 'A vowel sound takes *an*. Trap: *a* is only for consonant sounds.', bn: 'স্বরধ্বনির আগে *an* বসে। ফাঁদ: *a* শুধু ব্যঞ্জনধ্বনির আগে।' },
            { en: '*The* is wrong because this elephant is mentioned for the first time.', bn: '*The* ভুল, কারণ হাতিটির কথা প্রথমবার বলা হচ্ছে।' },
          ],
          answer: { en: '**an**: I saw an elephant in the zoo.', bn: 'সঠিক উত্তর: **an**: I saw an elephant in the zoo.' },
        },
        {
          question: { en: 'Fill in the blank: "The interview lasted ___ hour." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "The interview lasted ___ hour." (a / an / the / no article)' },
          steps: [
            { en: 'The letter *h* looks like a consonant, but in *hour* it is silent.', bn: '*h* অক্ষরটি ব্যঞ্জনের মতো দেখায়, কিন্তু *hour*-এ এটি নীরব।' },
            { en: '*Hour* sounds like "our", a vowel sound, so we need *an*. Trap: "a hour" is wrong: the sound decides, not the letter.', bn: '*Hour* শোনায় "আওয়ার", স্বরধ্বনি, তাই *an* লাগবে। ফাঁদ: "a hour" ভুল: উচ্চারণই ঠিক করে, অক্ষর নয়।' },
          ],
          answer: { en: '**an**: The interview lasted an hour.', bn: 'সঠিক উত্তর: **an**: The interview lasted an hour.' },
        },
        {
          question: { en: 'Fill in the blank: "My brother studies in ___ university in Kolkata." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "My brother studies in ___ university in Kolkata." (a / an / the / no article)' },
          steps: [
            { en: '*University* starts with the letter *u*, a vowel letter.', bn: '*University* অক্ষর *u* দিয়ে শুরু, যা স্বরবর্ণ।' },
            { en: 'But the sound is "you", a consonant sound. So we need *a*. Trap: "an university" is wrong.', bn: 'কিন্তু উচ্চারণ "ইউ", ব্যঞ্জনধ্বনি। তাই *a* লাগবে। ফাঁদ: "an university" ভুল।' },
          ],
          answer: { en: '**a**: My brother studies in a university in Kolkata.', bn: 'সঠিক উত্তর: **a**: My brother studies in a university in Kolkata.' },
        },
        {
          question: { en: 'Fill in the blank: "I bought a new bag. ___ bag is very light." (A / An / The / No article)', bn: 'শূন্যস্থান পূরণ করো: "I bought a new bag. ___ bag is very light." (A / An / The / No article)' },
          steps: [
            { en: 'The bag was already mentioned in the first sentence.', bn: 'ব্যাগটির কথা প্রথম বাক্যেই বলা হয়ে গেছে।' },
            { en: 'A thing that is already known takes *the*. Trap: repeating *a* would suggest a second, different bag.', bn: 'যা আগে থেকে জানা, তার আগে *the* বসে। ফাঁদ: আবার *a* বসালে মনে হবে আরেকটি আলাদা ব্যাগ।' },
          ],
          answer: { en: '**The**: The bag is very light.', bn: 'সঠিক উত্তর: **The**: The bag is very light.' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Things that always take "the"', bn: 'যেসব জিনিসের আগে সবসময় "the"' },
          body: {
            en: `Start from real headlines and sentences:

- ***The Ganga** flows through West Bengal.* → **rivers**: *the Hooghly, the Yamuna*
- ***The Bay of Bengal** is warm.* → **seas, oceans, bays**: *the Arabian Sea, the Indian Ocean*
- ***The Himalayas** are in the north.* → **mountain ranges**: *the Alps, the Western Ghats*
- *She reads **the Telegraph** every morning.* → **newspapers**: *the Hindu, the Times of India*
- *He plays **the sitar** very well.* → **musical instruments** after *play*: *the violin, the flute*
- *Delhi is **the capital** of India.* → **unique things**: *the Prime Minister, the President*
- ***The poor** need our help.* → **the + adjective** for a group: *the rich, the old, the blind*

A single mountain, like *Mount Everest*, takes **no** "the".`,
            bn: `সত্যিকারের শিরোনাম ও বাক্য থেকে শুরু করি:

- ***The Ganga** flows through West Bengal.* → **নদী**: *the Hooghly, the Yamuna*
- ***The Bay of Bengal** is warm.* → **সাগর, মহাসাগর, উপসাগর**: *the Arabian Sea, the Indian Ocean*
- ***The Himalayas** are in the north.* → **পর্বতমালা**: *the Alps, the Western Ghats*
- *She reads **the Telegraph** every morning.* → **সংবাদপত্র**: *the Hindu, the Times of India*
- *He plays **the sitar** very well.* → *play*-এর পরে **বাদ্যযন্ত্র**: *the violin, the flute*
- *Delhi is **the capital** of India.* → **একমাত্র জিনিস**: *the Prime Minister, the President*
- ***The poor** need our help.* → গোটা দল বোঝাতে **the + adjective**: *the rich, the old, the blind*

একটি পাহাড়, যেমন *Mount Everest*-এর আগে "the" **বসে না**।`,
          },
        },
        {
          heading: { en: 'Things that take NO article', bn: 'যেসব জিনিসের আগে কোনো article বসে না' },
          body: {
            en: `Some nouns stand alone:

- **Names of people and cities:** *Rahul, Kolkata, Darjeeling* (not "the Kolkata")
- **Meals:** *We have breakfast at eight. What did you have for dinner?*
- **Languages:** *She speaks Bengali. He is learning French.*
- **Games and sports:** *Sourav plays cricket every evening.*
- **Subjects and general ideas:** *Honesty is the best policy.*
- **Single mountains, most countries:** *Mount Everest, India, Nepal*

**Remember:** *the United States, the United Kingdom, the Netherlands* are exceptions (they take "the").`,
            bn: `কিছু noun একা বসে:

- **ব্যক্তি ও শহরের নাম:** *Rahul, Kolkata, Darjeeling* ("the Kolkata" নয়)
- **খাবার:** *We have breakfast at eight. What did you have for dinner?*
- **ভাষা:** *She speaks Bengali. He is learning French.*
- **খেলা:** *Sourav plays cricket every evening.*
- **বিষয় ও সাধারণ ভাব:** *Honesty is the best policy.*
- **একটি পাহাড়, বেশিরভাগ দেশ:** *Mount Everest, India, Nepal*

**মনে রেখো:** *the United States, the United Kingdom, the Netherlands* ব্যতিক্রম (এদের আগে "the" বসে)।`,
          },
        },
        {
          heading: { en: '"go to school" or "go to the school"?', bn: '"go to school" না "go to the school"?' },
          body: {
            en: `Some places have two meanings. Without an article we talk about the **purpose** of the place; with "the" we talk about the **building**.

| Sentence | Meaning |
|---|---|
| *Ravi goes to **school**.* | Ravi is a student (he goes to study). |
| *The electrician went to **the school**.* | He went to the building to repair something. |
| *She goes to **church** on Sundays.* | She goes to pray. |
| *The painter went to **the church**.* | He went to the building to paint it. |
| *The children went to **bed**.* | They went to sleep. |

The same idea works for *college, hospital, prison, court*.`,
            bn: `কিছু জায়গার দুটি অর্থ হয়। Article ছাড়া বললে জায়গাটির **উদ্দেশ্য** বোঝায়; "the" থাকলে **বাড়িটি** বোঝায়।

| বাক্য | অর্থ |
|---|---|
| *Ravi goes to **school**.* | রবি ছাত্র (পড়তে যায়)। |
| *The electrician went to **the school**.* | সে বাড়িটিতে গিয়েছিল কিছু মেরামত করতে। |
| *She goes to **church** on Sundays.* | সে প্রার্থনা করতে যায়। |
| *The painter went to **the church**.* | সে বাড়িটি রং করতে গিয়েছিল। |
| *The children went to **bed**.* | তারা ঘুমোতে গেল। |

*college, hospital, prison, court*-এর ক্ষেত্রেও একই ধারণা খাটে।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "___ Ganga flows through West Bengal." (A / An / The / No article)', bn: 'শূন্যস্থান পূরণ করো: "___ Ganga flows through West Bengal." (A / An / The / No article)' },
          steps: [
            { en: '*Ganga* is the name of a river.', bn: '*Ganga* একটি নদীর নাম।' },
            { en: 'River names take *the*. Trap: do not treat it like a person\'s name (*Rahul*), which takes no article.', bn: 'নদীর নামের আগে *the* বসে। ফাঁদ: একে ব্যক্তির নামের (*Rahul*) মতো ভেবো না, যার আগে article বসে না।' },
          ],
          answer: { en: '**The**: The Ganga flows through West Bengal.', bn: 'সঠিক উত্তর: **The**: The Ganga flows through West Bengal.' },
        },
        {
          question: { en: 'Fill in the blank: "Sourav plays ___ cricket every evening." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "Sourav plays ___ cricket every evening." (a / an / the / no article)' },
          steps: [
            { en: '*Cricket* is the name of a game.', bn: '*Cricket* একটি খেলার নাম।' },
            { en: 'Games take no article. Trap: "the cricket" sounds natural to some students, but it is wrong here.', bn: 'খেলার নামের আগে article বসে না। ফাঁদ: কারও কারও কাছে "the cricket" স্বাভাবিক শোনায়, কিন্তু এখানে ভুল।' },
          ],
          answer: { en: '**No article**: Sourav plays cricket every evening.', bn: 'সঠিক উত্তর: **No article**: Sourav plays cricket every evening.' },
        },
        {
          question: { en: 'Fill in the blank: "Of all the cities I have visited, Jaipur is ___ most beautiful." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "Of all the cities I have visited, Jaipur is ___ most beautiful." (a / an / the / no article)' },
          steps: [
            { en: '*Most beautiful* compares one city with all the others: a superlative.', bn: '*Most beautiful* একটি শহরকে বাকি সবার সঙ্গে তুলনা করছে: এটি superlative।' },
            { en: 'A superlative always takes *the*. Trap: *a* or *an* cannot be used with a superlative.', bn: 'Superlative-এর আগে সবসময় *the* বসে। ফাঁদ: superlative-এর সঙ্গে *a* বা *an* চলে না।' },
          ],
          answer: { en: '**the**: Jaipur is the most beautiful.', bn: 'সঠিক উত্তর: **the**: Jaipur is the most beautiful.' },
        },
        {
          question: { en: 'Fill in the blank: "The electrician went to ___ school to repair the fans." (the / an / no article / one)', bn: 'শূন্যস্থান পূরণ করো: "The electrician went to ___ school to repair the fans." (the / an / no article / one)' },
          steps: [
            { en: 'He did not go to study. He went to the building for a job.', bn: 'সে পড়তে যায়নি। কাজের জন্য বাড়িটিতে গিয়েছিল।' },
            { en: 'The building meaning needs *the*. Trap: "go to school" (no article) would mean he is a student.', bn: 'বাড়ি অর্থে *the* লাগে। ফাঁদ: "go to school" (article ছাড়া) মানে সে ছাত্র।' },
          ],
          answer: { en: '**the**: The electrician went to the school to repair the fans.', bn: 'সঠিক উত্তর: **the**: The electrician went to the school to repair the fans.' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Exam traps with abbreviations and numbers', bn: 'সংক্ষিপ্ত রূপ ও সংখ্যা নিয়ে পরীক্ষার ফাঁদ' },
          body: {
            en: `For letters and abbreviations, use the sound of the **letter name**:

- **an** *MLA, MBA, M.Sc., M.A., SDO, FM channel, HR manager, X-ray, A grade, LIC agent* (they start with "em, ef, es, aitch, eks, ay, el")
- **a** *UPSC exam, B.Ed. degree, PCS officer, CBI officer, ONGC office* ("you", "bee", "pee", "see" ... but *ONGC* starts with "oh", so **an** ONGC office)

Check numbers and hyphenated words by sound too:

- **a** *one-way street, one-rupee coin, ten-minute walk, 50-rupee note*
- **an** *eight-hour day, 80-year-old man, eleventh hour*

Note: in *ten-minute walk*, *minute* stays **singular** before a noun.`,
            bn: `অক্ষর ও সংক্ষিপ্ত রূপে **অক্ষরের নামের** উচ্চারণ দেখো:

- **an** *MLA, MBA, M.Sc., M.A., SDO, FM channel, HR manager, X-ray, A grade, LIC agent* (শুরুতে "এম, এফ, এস, এইচ, এক্স, এ, এল")
- **a** *UPSC exam, B.Ed. degree, PCS officer, CBI officer* ("ইউ", "বি", "পি", "সি" ...)। কিন্তু *ONGC* শুরু হয় "ও" দিয়ে, তাই **an** ONGC office।

সংখ্যা ও হাইফেনযুক্ত শব্দও উচ্চারণ ধরে দেখো:

- **a** *one-way street, one-rupee coin, ten-minute walk, 50-rupee note*
- **an** *eight-hour day, 80-year-old man, eleventh hour*

লক্ষ করো: *ten-minute walk*-এ noun-এর আগে *minute* **একবচন** থাকে।`,
          },
        },
        {
          heading: { en: 'Special patterns: such a, what a, many a, half an hour', bn: 'বিশেষ গঠন: such a, what a, many a, half an hour' },
          body: {
            en: `Examiners love fixed patterns:

- **Such a / What a** + adjective + singular noun: *Such **a** clever boy! What **a** beautiful sight!*
- **Many a** + singular noun + **singular** verb: *Many **a** student has lost marks.*
- **Half an hour** (not "half hour" in Indian exam English): *Wait for half **an** hour.*
- **The ... the ...**: *The more you practise, **the** better you speak.*
- **The same**: *We study in **the** same college.*
- **Twice a year, 120 rupees a kilo** ("a" = per): *He visits twice **a** year.*
- **Stood first / came second** (no article): *Anita stood first in the district.*
- **No article:** *next Sunday, last year, by bus, by train, at night, at noon*`,
            bn: `পরীক্ষকরা এই স্থির গঠনগুলো খুব ভালোবাসেন:

- **Such a / What a** + adjective + একবচন noun: *Such **a** clever boy! What **a** beautiful sight!*
- **Many a** + একবচন noun + **একবচন** verb: *Many **a** student has lost marks.*
- **Half an hour**: *Wait for half **an** hour.*
- **The ... the ...**: *The more you practise, **the** better you speak.*
- **The same**: *We study in **the** same college.*
- **Twice a year, 120 rupees a kilo** ("a" মানে প্রতি): *He visits twice **a** year.*
- **Stood first / came second** (article ছাড়া): *Anita stood first in the district.*
- **Article ছাড়া:** *next Sunday, last year, by bus, by train, at night, at noon*`,
          },
        },
        {
          heading: { en: 'a few / few / a little / little and fixed phrases', bn: 'a few / few / a little / little এবং স্থির বাক্যাংশ' },
          body: {
            en: `A tiny "a" changes the meaning completely:

- **a few / a little** = some, enough (positive): *He has **a few** friends, so he is never lonely.*
- **few / little** = almost none (negative): *He has **few** friends and feels lonely.*

Learn these fixed phrases with their articles:

- *at **a** loss, in **a** hurry, as **a** result, to **a** great extent, **a** lot of*
- *out of **the** question, in **the** long run, on **the** whole, by **the** way, in **the** end*

Also remember: **a black and a white cat** = two cats; **a black and white cat** = one cat.`,
            bn: `ছোট্ট একটি "a" অর্থ পুরো বদলে দেয়:

- **a few / a little** = কিছু, যথেষ্ট (ইতিবাচক): *He has **a few** friends, so he is never lonely.*
- **few / little** = প্রায় কিছুই নেই (নেতিবাচক): *He has **few** friends and feels lonely.*

এই স্থির বাক্যাংশগুলো article-সহ শেখো:

- *at **a** loss, in **a** hurry, as **a** result, to **a** great extent, **a** lot of*
- *out of **the** question, in **the** long run, on **the** whole, by **the** way, in **the** end*

আরও মনে রেখো: **a black and a white cat** = দুটি বিড়াল; **a black and white cat** = একটি বিড়াল।`,
          },
        },
      ],
      examples: [
        {
          question: { en: 'Fill in the blank: "She works as ___ HR manager in a bank." (a / an / one / no article)', bn: 'শূন্যস্থান পূরণ করো: "She works as ___ HR manager in a bank." (a / an / one / no article)' },
          steps: [
            { en: 'For abbreviations, say the letter names: *HR* = "aitch-ar".', bn: 'সংক্ষিপ্ত রূপে অক্ষরের নাম বলো: *HR* = "এইচ-আর"।' },
            { en: 'It starts with the vowel sound "ay", so we need *an*. Trap: the letter *h* looks like a consonant, but the letter name decides.', bn: 'শুরুতে স্বরধ্বনি "এই", তাই *an* লাগবে। ফাঁদ: *h* দেখতে ব্যঞ্জন, কিন্তু অক্ষরের নামের উচ্চারণই ঠিক করে।' },
          ],
          answer: { en: '**an**: She works as an HR manager in a bank.', bn: 'সঠিক উত্তর: **an**: She works as an HR manager in a bank.' },
        },
        {
          question: { en: 'Spot the error: "(A) Many a student (B) have lost marks (C) by careless mistakes." (A / B / C / No error)', bn: 'ভুল খোঁজো: "(A) Many a student (B) have lost marks (C) by careless mistakes." (A / B / C / No error)' },
          steps: [
            { en: '*Many a* is followed by a **singular** noun (*student*).', bn: '*Many a*-র পরে **একবচন** noun (*student*) বসে।' },
            { en: 'So the verb must be singular too: *has lost*. Trap: *many* feels plural, but *many a* is singular.', bn: 'তাই verb-ও একবচন হবে: *has lost*। ফাঁদ: *many* বহুবচন মনে হয়, কিন্তু *many a* একবচন।' },
          ],
          answer: { en: '**B**: it should be "has lost marks".', bn: 'সঠিক উত্তর: **B**: হবে "has lost marks"।' },
        },
        {
          question: { en: 'Fill in the blank: "He has ___ few friends, so he is never lonely." (a / an / one / no article)', bn: 'শূন্যস্থান পূরণ করো: "He has ___ few friends, so he is never lonely." (a / an / one / no article)' },
          steps: [
            { en: 'The clue is *never lonely*: he has some friends, enough company.', bn: 'সূত্র হল *never lonely*: তার কিছু বন্ধু আছে, সঙ্গ যথেষ্ট।' },
            { en: '*A few* means some (positive). Trap: *few* alone means almost none, which would clash with *never lonely*.', bn: '*A few* মানে কিছু (ইতিবাচক)। ফাঁদ: শুধু *few* মানে প্রায় নেই, যা *never lonely*-র সঙ্গে মেলে না।' },
          ],
          answer: { en: '**a**: He has a few friends, so he is never lonely.', bn: 'সঠিক উত্তর: **a**: He has a few friends, so he is never lonely.' },
        },
        {
          question: { en: 'Fill in the blank: "She travels to her office by ___ bus." (a / an / the / no article)', bn: 'শূন্যস্থান পূরণ করো: "She travels to her office by ___ bus." (a / an / the / no article)' },
          steps: [
            { en: 'After *by*, a means of transport is used in a general sense.', bn: '*by*-র পরে যানবাহন সাধারণ অর্থে ব্যবহার হয়।' },
            { en: 'No article: *by bus, by train, by air*. Trap: "by the bus" sounds fine in Bengali thinking, but it is wrong.', bn: 'Article বসে না: *by bus, by train, by air*। ফাঁদ: বাংলায় ভাবলে "by the bus" ঠিক লাগে, কিন্তু ইংরেজিতে ভুল।' },
          ],
          answer: { en: '**No article**: She travels to her office by bus.', bn: 'সঠিক উত্তর: **No article**: She travels to her office by bus.' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'a / an depends on the first SOUND', bn: 'a / an নির্ভর করে প্রথম ধ্বনির উপর' },
      explain: { en: '*an hour, an honest man, an MLA, an umbrella*; *a university, a one-rupee coin, a European, a uniform*.', bn: 'অক্ষর নয়, ধ্বনি দেখো: *an hour, an honest man, an MLA, an umbrella*; *a university, a one-rupee coin, a European, a uniform*।' },
    },
    {
      label: { en: 'First mention: a/an. Next mention: the', bn: 'প্রথম উল্লেখে a/an, পরে the' },
      explain: { en: '*I bought a bag. **The** bag is light.*', bn: '*I bought a bag. **The** bag is light.* (প্রথমে "a", পরে "the")' },
    },
    {
      label: { en: 'the + superlative, ordinal, unique thing', bn: 'the + superlative, ordinal, একমাত্র জিনিস' },
      explain: { en: '*the best player, the first time, the sun, the capital of India, the same college*.', bn: 'সবচেয়ে সেরা, প্রথম, একমাত্র বা একই বোঝালে: *the best player, the first time, the sun, the capital of India, the same college*।' },
    },
    {
      label: { en: 'the with rivers, seas, mountain ranges, newspapers, instruments', bn: 'নদী, সাগর, পর্বতমালা, সংবাদপত্র, বাদ্যযন্ত্রের আগে the' },
      explain: { en: '*the Ganga, the Bay of Bengal, the Himalayas, the Telegraph, play the sitar*.', bn: 'যেমন *the Ganga, the Bay of Bengal, the Himalayas, the Telegraph, play the sitar*।' },
    },
    {
      label: { en: 'No article: persons, cities, meals, languages, games', bn: 'Article ছাড়া: ব্যক্তি, শহর, খাবার, ভাষা, খেলা' },
      explain: { en: '*Rahul, Kolkata, have breakfast, speak Bengali, play cricket*.', bn: 'যেমন *Rahul, Kolkata, have breakfast, speak Bengali, play cricket*।' },
    },
    {
      label: { en: 'Place for its purpose = no article', bn: 'জায়গার উদ্দেশ্য বোঝালে article নেই' },
      explain: { en: '*go to school / church / bed / college* (purpose) but *go to the school* (the building, for another reason).', bn: '*go to school / church / bed / college* (উদ্দেশ্য), কিন্তু *go to the school* (শুধু বাড়িটিতে যাওয়া, অন্য কাজে)।' },
    },
    {
      label: { en: 'Fixed patterns', bn: 'স্থির গঠন' },
      explain: { en: '*such a, what a, many a + singular, half an hour, twice a year, a few / few*.', bn: '*such a, what a, many a + একবচন, half an hour, twice a year, a few / few*।' },
    },
  ],
  tips: [
    { en: 'Say the next word aloud before choosing *a* or *an*. Listen to the first sound, not the first letter.', bn: '*a* না *an* বাছার আগে পরের শব্দটি জোরে বলো। প্রথম অক্ষর নয়, প্রথম ধ্বনি শোনো।' },
    { en: 'Common mistakes: "a hour", "an university", "a MLA". Correct: *an hour, a university, an MLA*.', bn: 'সাধারণ ভুল: "a hour", "an university", "a MLA"। সঠিক: *an hour, a university, an MLA*।' },
    { en: 'Ask: "Which one? Do we both know?" If yes, use *the*. If it is any one, use *a/an*.', bn: 'নিজেকে প্রশ্ন করো: "কোনটি? আমরা দুজনেই কি জানি?" জানলে *the*, যেকোনো একটি হলে *a/an*।' },
    { en: 'A superlative (best, tallest, most beautiful) and an ordinal (first, second) almost always take *the*.', bn: 'Superlative (best, tallest, most beautiful) আর ordinal (first, second)-এর আগে প্রায় সবসময় *the* বসে।' },
    { en: 'Games, languages, meals, cities and persons: no article. Rivers, seas, ranges and newspapers: *the*.', bn: 'খেলা, ভাষা, খাবার, শহর ও ব্যক্তি: article নেই। নদী, সাগর, পর্বতমালা ও সংবাদপত্র: *the*।' },
    { en: 'In error spotting, check every noun for a missing or extra article, especially after *play*, *by*, *go to* and with superlatives.', bn: 'Error spotting-এ প্রতিটি noun দেখো article বাদ গেছে বা বাড়তি আছে কি না, বিশেষ করে *play*, *by*, *go to*-এর পরে আর superlative-এ।' },
    { en: 'Do not choose "the" just because the sentence "feels" definite. Look for a clue: already mentioned, only one, superlative, ordinal.', bn: 'বাক্যটি নির্দিষ্ট "মনে হয়" বলেই "the" বেছো না। সূত্র খোঁজো: আগে উল্লেখ, একমাত্র জিনিস, superlative, ordinal।' },
  ],
};
