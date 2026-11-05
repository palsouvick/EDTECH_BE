'use strict';

/**
 * English Language concept sheets for the foundation grammar chapters:
 * Parts of Speech, Articles, Tenses, Voice, Narration, Modals & Conditionals.
 * Explanations are bilingual; the English words and sentences being discussed stay in English.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/english_foundations.js
 */

module.exports = [
  // ─────────────────────────────────────────────────────────────── Parts of Speech
  {
    subject: 'english',
    topic: 'parts_of_speech',
    title: { en: 'Parts of Speech', bn: 'পদ-প্রকরণ (Parts of Speech)', hi: 'शब्द-भेद (Parts of Speech)' },
    overview: {
      en: "Every word in a sentence has a job, and the eight jobs are the **parts of speech**: noun, pronoun, verb, adjective, adverb, preposition, conjunction and interjection. Exam questions ask you to name the part of speech, or to pick the right form for a blank: *beautiful* or *beautifully*, *my* or *mine*, *who* or *whom*, *I* or *me*. Always decide the job of the word **in this sentence**, not the word on its own. Ask what the blank describes (a noun or a verb), what role it plays (doer or receiver), and what comes before and after it.",
      bn: 'বাক্যের প্রতিটি শব্দের একটা কাজ আছে, আর আটটি কাজই হল **parts of speech**: noun, pronoun, verb, adjective, adverb, preposition, conjunction ও interjection। পরীক্ষায় হয় part of speech চিনতে বলা হয়, নয়তো শূন্যস্থানের সঠিক রূপ বাছতে হয়: *beautiful* না *beautifully*, *my* না *mine*, *who* না *whom*, *I* না *me*। সবসময় শব্দটার কাজ **এই বাক্যে** কী তা দেখুন, শব্দটাকে একা বিচার করবেন না। ভাবুন শূন্যস্থান কাকে বর্ণনা করছে (noun না verb), কী ভূমিকায় আছে (কর্তা না কর্ম), আর তার আগে-পরে কী আছে।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Adjective describes a noun, adverb describes a verb', bn: 'Adjective noun-কে বর্ণনা করে, adverb verb-কে' },
        body: {
          en: 'Ask what the blank describes. A noun takes an adjective (*a tall boy*); a verb takes an adverb that answers *how? when? where?* (*She sings **beautifully***). After a **linking verb** (*is, become, seem, look, smell, taste, feel, sound*) use an adjective: *The soup smells **delicious**.*',
          bn: 'শূন্যস্থান কাকে বর্ণনা করছে ভাবুন। Noun-এর জন্য adjective (*a tall boy*); verb-এর জন্য adverb, যা *কীভাবে? কখন? কোথায়?* প্রশ্নের উত্তর দেয় (*She sings **beautifully***)। **Linking verb** (*is, become, seem, look, smell, taste, feel, sound*)-এর পরে adjective বসে: *The soup smells **delicious**.*',
        },
      },
      {
        title: { en: 'Subject form or object form of a pronoun', bn: 'Pronoun-এর subject রূপ না object রূপ' },
        body: {
          en: 'The doer takes **I, he, she, we, they, who**; the receiver, or a word after a preposition, takes **me, him, her, us, them, whom**. Remove the other person to test: *The teacher gave Raju and ___ books* becomes *gave ___ books*, so **me**. *To ___ did you give it?* becomes *to him*, so **whom**.',
          bn: 'কাজ যে করে তার জন্য **I, he, she, we, they, who**; কাজ যে পায়, বা preposition-এর পরের শব্দের জন্য **me, him, her, us, them, whom**। অন্য মানুষটাকে বাদ দিয়ে পরীক্ষা করুন: *The teacher gave Raju and ___ books* হয় *gave ___ books*, তাই **me**। *To ___ did you give it?* হয় *to him*, তাই **whom**।',
        },
      },
      {
        title: { en: 'Possessive adjective or possessive pronoun', bn: 'Possessive adjective না possessive pronoun' },
        body: {
          en: '**my, your, her, our, their** need a noun after them (*my pen*). **mine, yours, hers, ours, theirs** stand alone (*The pen is **mine***). Also *its* (belonging) has no apostrophe, while *it\'s* means *it is*; *whose* (belonging) is not *who\'s* (*who is*).',
          bn: '**my, your, her, our, their**-এর পরে noun লাগে (*my pen*)। **mine, yours, hers, ours, theirs** একা বসে (*The pen is **mine***)। আরও মনে রাখুন: *its* (মালিকানা)-এ apostrophe নেই, আর *it\'s* মানে *it is*; *whose* (মালিকানা) আর *who\'s* (*who is*) এক নয়।',
        },
      },
      {
        title: { en: 'Decide the part of speech by the job', bn: 'কাজ দেখে part of speech ঠিক করুন' },
        body: {
          en: 'One word can do many jobs: *fast* is a verb in *Many people fast on Ekadashi*, an adjective in *a fast bowler* and an adverb in *He runs fast*. Look at the neighbours: a subject before the word suggests a verb; a word after *is* or before a noun suggests an adjective.',
          bn: 'একটা শব্দ অনেক কাজ করতে পারে: *fast* শব্দটা *Many people fast on Ekadashi*-তে verb, *a fast bowler*-এ adjective, আর *He runs fast*-এ adverb। পাশের শব্দ দেখুন: আগে subject থাকলে verb হতে পারে; *is*-এর পরে বা noun-এর আগে থাকলে adjective হতে পারে।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Remove the other person', bn: 'অন্য মানুষটাকে বাদ দিন' },
        body: {
          en: 'For *Raju and I / me*, *you and I / me*, drop the other name and say the sentence aloud. *for you and ___* becomes *for ___*; nobody says *for I*, so **me**.',
          bn: '*Raju and I / me*, *you and I / me*-এর জন্য অন্য নামটা বাদ দিয়ে বাক্যটা জোরে বলুন। *for you and ___* হয় *for ___*; কেউ *for I* বলে না, তাই **me**।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'he / him test for who / whom', bn: 'who / whom-এর জন্য he / him পরীক্ষা' },
        body: {
          en: 'Answer the clause with *he* or *him*. If *he* fits, use **who**; if *him* fits, use **whom**. *The boy ___ won* gives *he won*, so **who**.',
          bn: 'Clause-টার উত্তর *he* বা *him* দিয়ে দিন। *he* বসলে **who**; *him* বসলে **whom**। *The boy ___ won* থেকে *he won*, তাই **who**।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Look at the verb before the blank', bn: 'শূন্যস্থানের আগের verb দেখুন' },
        body: {
          en: 'If the verb before the blank is *look, smell, taste, feel, seem* and it links the subject to a quality, pick the adjective at once; if it is a real action (*sings, walks, speaks*), pick the adverb.',
          bn: 'শূন্যস্থানের আগের verb *look, smell, taste, feel, seem* হয়ে subject-কে গুণের সঙ্গে জুড়লে সঙ্গে সঙ্গে adjective বাছুন; আসল কাজ (*sings, walks, speaks*) হলে adverb বাছুন।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**The -ly word looks more correct.** *The soup smells deliciously* is wrong. After a linking verb the adjective is right: *smells delicious*.',
        bn: '**-ly শব্দটা বেশি শুদ্ধ মনে হয়।** *The soup smells deliciously* ভুল। Linking verb-এর পরে adjective সঠিক: *smells delicious*।',
      },
      {
        en: '**"Raju and I" always sounds polite.** After a verb or a preposition the object form is needed: *gave Raju and **me***, *for you and **me***.',
        bn: '**"Raju and I" সবসময় ভদ্র শোনায়।** Verb বা preposition-এর পরে object রূপ লাগে: *gave Raju and **me***, *for you and **me***।',
      },
      {
        en: '**my instead of mine.** *This pen is my* is wrong because nothing follows; use **mine**. Equally, *mine pen* is wrong; use **my pen**.',
        bn: '**mine-এর জায়গায় my।** *This pen is my* ভুল, কারণ পরে কিছু নেই; **mine** বসবে। আবার *mine pen* ভুল; **my pen** হবে।',
      },
      {
        en: '**Calling a verb a noun because the word can be a noun.** *Mina plays the harmonium*: *plays* has a subject and shows an action, so it is a **verb**.',
        bn: '**শব্দটা noun হতে পারে বলে verb-কে noun বলা।** *Mina plays the harmonium*-এ *plays*-এর subject আছে ও কাজ বোঝায়, তাই এটা **verb**।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Articles
  {
    subject: 'english',
    topic: 'articles',
    title: { en: 'Articles: a, an, the', bn: 'আর্টিকেল (Article): a, an, the', hi: 'आर्टिकल (Article): a, an, the' },
    overview: {
      en: "There are only three articles, *a*, *an* and *the*, but they appear in fill in the blanks, error spotting and sentence improvement in almost every exam. **A / an** mean *any one* (not yet known); **the** means *this particular one that both of us know*. For *a* or *an*, listen to the **first sound** of the next word, not its first letter. For *the*, ask whether the thing is already known, the only one of its kind, a superlative, or a river, sea or mountain range. Some nouns (names, meals, languages, games) take no article at all.",
      bn: 'Article মাত্র তিনটি: *a*, *an*, *the*, কিন্তু প্রায় প্রতিটি পরীক্ষায় fill in the blanks, error spotting ও sentence improvement-এ এগুলো আসে। **A / an** মানে *যে কোনো একটা* (এখনও জানা নেই); **the** মানে *এই নির্দিষ্ট জিনিসটা যা আমরা দুজনেই জানি*। *a* না *an* বাছতে পরের শব্দের **প্রথম উচ্চারণ** শুনুন, প্রথম অক্ষর নয়। *the*-এর জন্য ভাবুন জিনিসটা আগে থেকে জানা, একমাত্র, superlative, বা নদী, সাগর, পর্বতমালা কি না। কিছু noun (নাম, খাবারের বেলা, ভাষা, খেলা)-এর আগে কোনো article-ই বসে না।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'a or an: first sound, not first letter', bn: 'a না an: প্রথম অক্ষর নয়, প্রথম উচ্চারণ' },
        body: {
          en: 'Vowel **sound** takes *an*: *an hour* (silent h), *an honest man*, *an MLA*, *an MBA*, *an eight-hour day*. Consonant **sound** takes *a*: *a university*, *a uniform*, *a European*, *a one-rupee coin*, *a UPSC exam*. For abbreviations use the sound of the first letter name.',
          bn: 'স্বর**ধ্বনির** আগে *an*: *an hour* (h নীরব), *an honest man*, *an MLA*, *an MBA*, *an eight-hour day*। ব্যঞ্জন**ধ্বনির** আগে *a*: *a university*, *a uniform*, *a European*, *a one-rupee coin*, *a UPSC exam*। Abbreviation-এ প্রথম অক্ষরের নামের উচ্চারণ ধরুন।',
        },
      },
      {
        title: { en: 'When "the" is needed', bn: 'কখন "the" লাগে' },
        body: {
          en: 'Use **the** for: something **already mentioned** (*I bought a bag. **The** bag is light.*); things **unique** in the world (*the sun, the moon*); a **superlative** or **ordinal** (*the best bowler, the first time*); **rivers, seas, oceans, mountain ranges and newspapers** (*the Ganga, the Arabian Sea, the Himalayas, the Hindu*); *the* + adjective for a group (*the poor, the old*).',
          bn: '**the** বসে: **আগে বলা** জিনিসের আগে (*I bought a bag. **The** bag is light.*); পৃথিবীতে **একমাত্র** জিনিসের আগে (*the sun, the moon*); **superlative** বা **ordinal**-এর আগে (*the best bowler, the first time*); **নদী, সাগর, মহাসাগর, পর্বতমালা ও সংবাদপত্রের** আগে (*the Ganga, the Arabian Sea, the Himalayas, the Hindu*); দল বোঝাতে *the* + adjective (*the poor, the old*)।',
        },
      },
      {
        title: { en: 'When no article is used', bn: 'কখন কোনো article বসে না' },
        body: {
          en: 'No article before names of people and cities (*Rahul, Kolkata*), **meals** (*have breakfast*), **languages** (*speaks Bengali*), **games** (*plays cricket*), general ideas (*Honesty is the best policy*), a **single mountain** (*Mount Everest*) and most countries. Exceptions with *the*: *the United States, the United Kingdom, the Netherlands*.',
          bn: 'মানুষ ও শহরের নাম (*Rahul, Kolkata*), **খাবারের বেলা** (*have breakfast*), **ভাষা** (*speaks Bengali*), **খেলা** (*plays cricket*), সাধারণ ধারণা (*Honesty is the best policy*), **একটি পাহাড়** (*Mount Everest*) ও বেশিরভাগ দেশের আগে article নেই। *the* সহ ব্যতিক্রম: *the United States, the United Kingdom, the Netherlands*।',
        },
      },
      {
        title: { en: 'Purpose or building: school, hospital, church', bn: 'উদ্দেশ্য না বাড়ি: school, hospital, church' },
        body: {
          en: 'Without an article we talk about the **purpose** of the place (*Ravi goes to school*: he is a student). With *the* we talk about the **building** (*The electrician went to the school* to repair the fans). The same idea works for *college, hospital, prison, court, church, bed*.',
          bn: 'Article ছাড়া জায়গাটার **উদ্দেশ্য** বোঝায় (*Ravi goes to school*: সে ছাত্র)। *the* সহ **বাড়িটা** বোঝায় (*The electrician went to the school* ফ্যান সারাতে)। একই নিয়ম *college, hospital, prison, court, church, bed*-এ খাটে।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Say the word aloud', bn: 'শব্দটা জোরে বলুন' },
        body: {
          en: 'Never decide *a / an* by the letter. Say *hour*, *university*, *honest*, *one-rupee* aloud and listen: *an hour*, *a university*, *an honest man*, *a one-rupee coin*.',
          bn: '*a / an* কখনও অক্ষর দেখে ঠিক করবেন না। *hour*, *university*, *honest*, *one-rupee* জোরে বলে শুনুন: *an hour*, *a university*, *an honest man*, *a one-rupee coin*।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Superlative or first mention', bn: 'Superlative বা আগে বলা জিনিস' },
        body: {
          en: 'See *best, most, tallest, first* before the noun and pick **the** at once. Or check whether the noun appeared in an earlier sentence: if yes, **the**.',
          bn: 'Noun-এর আগে *best, most, tallest, first* দেখলেই **the** বাছুন। কিংবা noun-টা আগের বাক্যে এসেছে কি না দেখুন: এসে থাকলে **the**।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Sort the noun into a group', bn: 'Noun-টাকে একটা দলে ফেলুন' },
        body: {
          en: 'River, sea, range, newspaper: **the**. Game, meal, language, person, city: **no article**. Decide the group before looking at the options.',
          bn: 'নদী, সাগর, পর্বতমালা, সংবাদপত্র: **the**। খেলা, খাবারের বেলা, ভাষা, মানুষ, শহর: **কোনো article নয়**। Option দেখার আগেই দলটা ঠিক করে নিন।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**a hour / an university.** The letter lies; the sound tells the truth: *an hour*, *a university*.',
        bn: '**a hour / an university।** অক্ষর ভুল বোঝায়, উচ্চারণ ঠিক বলে: *an hour*, *a university*।',
      },
      {
        en: '**the cricket / the breakfast.** Games and meals take no article: *plays cricket*, *had breakfast*.',
        bn: '**the cricket / the breakfast।** খেলা আর খাবারের বেলার আগে article বসে না: *plays cricket*, *had breakfast*।',
      },
      {
        en: '**An article with a superlative.** *a best bowler* is wrong; a superlative always takes **the**.',
        bn: '**Superlative-এর আগে a/an।** *a best bowler* ভুল; superlative-এর আগে সবসময় **the**।',
      },
      {
        en: '**go to school and go to the school mean different things.** The first is for study; the second is the building (repair, visit).',
        bn: '**go to school আর go to the school-এর অর্থ আলাদা।** প্রথমটা পড়ার জন্য; দ্বিতীয়টা বাড়ি (মেরামত, দেখা)।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Tenses
  {
    subject: 'english',
    topic: 'tenses',
    title: { en: 'Tenses', bn: 'টেন্স (Tenses)', hi: 'काल (Tenses)' },
    overview: {
      en: "A tense is the form of the verb that tells **when** something happens. There are 3 times (present, past, future) and 4 forms (simple, continuous, perfect, perfect continuous), giving **12 tenses**. Learn the structure and the meaning together, then use the **time words** as clues: *yesterday, ago* ask for simple past; *since, for, already, yet* ask for the present perfect; *by the time* asks for the past perfect. Exams test tenses in fill in the blanks, error spotting and sentence improvement, so first find the time word, then pick the tense, then fix the subject-verb agreement.",
      bn: 'Tense হল verb-এর সেই রূপ যা **কখন** কাজটা ঘটে তা বলে। সময় তিনটি (present, past, future) আর রূপ চারটি (simple, continuous, perfect, perfect continuous), মোট **12টি tense**। গঠন আর অর্থ একসঙ্গে শিখুন, তারপর **সময়ের শব্দ** সূত্র হিসেবে ব্যবহার করুন: *yesterday, ago* চায় simple past; *since, for, already, yet* চায় present perfect; *by the time* চায় past perfect। পরীক্ষায় fill in the blanks, error spotting ও sentence improvement-এ tense আসে, তাই আগে সময়ের শব্দ খুঁজুন, তারপর tense বাছুন, তারপর subject-verb agreement মিলিয়ে নিন।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'The structures of the main tenses', bn: 'প্রধান tense-গুলির গঠন' },
        body: {
          en: '**Simple present**: V1 (+ s/es for he, she, it). **Present continuous**: is/am/are + V-ing. **Present perfect**: has/have + V3. **Simple past**: V2. **Past continuous**: was/were + V-ing. **Past perfect**: had + V3. **Simple future**: will/shall + V1. **Future perfect**: will have + V3. After *do/does/did* and after *will*, the verb stays in its base form.',
          bn: '**Simple present**: V1 (he, she, it-এর সঙ্গে s/es)। **Present continuous**: is/am/are + V-ing। **Present perfect**: has/have + V3। **Simple past**: V2। **Past continuous**: was/were + V-ing। **Past perfect**: had + V3। **Simple future**: will/shall + V1। **Future perfect**: will have + V3। *do/does/did* আর *will*-এর পরে verb base form-এ থাকে।',
        },
      },
      {
        title: { en: 'Finished time or up to now', bn: 'শেষ হওয়া সময় না এখন পর্যন্ত' },
        body: {
          en: 'A finished, named time (*yesterday, last week, in 2019, two days ago*) takes the **simple past**: *I met him two days ago*. Up to now (*already, yet, just, ever, never, so far, recently*) takes the **present perfect**. **Since** + starting point and **for** + length of time also take a perfect tense: *He has lived in Siliguri since 2015.*',
          bn: 'শেষ হওয়া নির্দিষ্ট সময়ে (*yesterday, last week, in 2019, two days ago*) **simple past**: *I met him two days ago*। এখন পর্যন্ত বোঝালে (*already, yet, just, ever, never, so far, recently*) **present perfect**। **Since** + শুরুর বিন্দু আর **for** + সময়ের দৈর্ঘ্যেও perfect tense: *He has lived in Siliguri since 2015.*',
        },
      },
      {
        title: { en: 'Two past actions: past perfect', bn: 'অতীতের দুটো কাজ: past perfect' },
        body: {
          en: 'The **earlier** action takes the past perfect (*had + V3*), the **later** one takes the simple past: *When I reached the station, the train **had left**.* For a future deadline use the future perfect: *She will have completed the course by June.*',
          bn: '**আগের** কাজে past perfect (*had + V3*), **পরের** কাজে simple past: *When I reached the station, the train **had left**.* ভবিষ্যতের সময়সীমার জন্য future perfect: *She will have completed the course by June.*',
        },
      },
      {
        title: { en: 'Present for future in if / when clauses; stative verbs', bn: 'If / when clause-এ ভবিষ্যতের জন্য present; stative verb' },
        body: {
          en: 'In a time or condition clause (*if, when, until, as soon as, before*), use the **simple present**, not *will*: *I will call you as soon as I **reach** home.* **Stative verbs** (*know, understand, believe, like, love, want, need, own, belong*) do not take -ing: *I know the answer*, not *I am knowing*.',
          bn: 'সময় বা শর্তের clause-এ (*if, when, until, as soon as, before*) *will* নয়, **simple present**: *I will call you as soon as I **reach** home.* **Stative verb** (*know, understand, believe, like, love, want, need, own, belong*)-এ -ing বসে না: *I know the answer*, *I am knowing* নয়।',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Find the time word first', bn: 'আগে সময়ের শব্দ খুঁজুন' },
        body: {
          en: 'Scan for *yesterday, ago, last, since, for, already, yet, by the time, if, when*. In *They ___ cricket yesterday evening*, the word *yesterday* settles it: **played**.',
          bn: '*yesterday, ago, last, since, for, already, yet, by the time, if, when* খুঁজুন। *They ___ cricket yesterday evening*-এ *yesterday* দেখেই ঠিক হয়ে যায়: **played**।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Subject then helping verb', bn: 'আগে subject, তারপর helping verb' },
        body: {
          en: 'For perfect tenses check the subject: **I / you / we / they → have**, **he / she / it → has**. *She have gone* is wrong, so it must be *She has gone*.',
          bn: 'Perfect tense-এ subject দেখুন: **I / you / we / they → have**, **he / she / it → has**। *She have gone* ভুল, হবে *She has gone*।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Ago, yesterday, last week cross out present perfect', bn: 'Ago, yesterday, last week দেখলে present perfect কাটুন' },
        body: {
          en: 'If a sentence has *ago*, *yesterday* or *last week*, strike out every option with *has / have + V3* at once.',
          bn: 'বাক্যে *ago*, *yesterday* বা *last week* থাকলে *has / have + V3* যুক্ত সব option সঙ্গে সঙ্গে কেটে দিন।',
        },
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      {
        en: '**have met him two days ago.** Present perfect cannot sit with *ago*; use *met*.',
        bn: '**have met him two days ago।** *ago*-এর সঙ্গে present perfect বসে না; *met* হবে।',
      },
      {
        en: '**If he will come, I will tell him.** No *will* in the if-clause: *If he **comes**, I will tell him.*',
        bn: '**If he will come, I will tell him।** If-clause-এ *will* নয়: *If he **comes**, I will tell him.*',
      },
      {
        en: '**I am knowing / She is owning.** Stative verbs take the simple form: *I know*, *She owns*.',
        bn: '**I am knowing / She is owning।** Stative verb-এ simple রূপ: *I know*, *She owns*।',
      },
      {
        en: '**has left in a past story.** *The train has left before we reached* is wrong; the earlier past action takes **had left**.',
        bn: '**অতীতের গল্পে has left।** *The train has left before we reached* ভুল; আগের অতীত কাজে **had left**।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Voice
  {
    subject: 'english',
    topic: 'voice',
    title: { en: 'Active & Passive Voice', bn: 'ভয়েস (Active & Passive Voice)', hi: 'वाच्य (Active & Passive Voice)' },
    overview: {
      en: "**Voice** shows whether the subject **does** the action (active: *The manager approved the leave*) or **receives** it (passive: *The leave was approved by the manager*). The formula is **object becomes subject + be (in the same tense) + V3 + by + old subject**. Only a sentence with an **object** (a transitive verb) can become passive. Keep the tense of the active verb, change only the form of *be*, and match it to the number of the new subject. Questions, modals and orders have their own patterns, so identify the sentence type before you start.",
      bn: '**Voice** দেখায় subject কাজটা **করছে** (active: *The manager approved the leave*) না কাজটা **পাচ্ছে** (passive: *The leave was approved by the manager*)। সূত্র হল **object হয় subject + be (একই tense-এ) + V3 + by + পুরোনো subject**। শুধু **object** আছে এমন বাক্য (transitive verb) passive হতে পারে। Active verb-এর tense একই রাখুন, শুধু *be*-এর রূপ বদলান, আর নতুন subject-এর বচন অনুযায়ী মেলান। প্রশ্ন, modal ও আদেশের আলাদা ছক আছে, তাই শুরুর আগে বাক্যের ধরন চিনে নিন।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'The three steps', bn: 'তিনটি ধাপ' },
        body: {
          en: '1. Move the **object** to the front. 2. Change the verb to **be + V3** in the same tense (*approved* is past, so *was approved*). 3. Put the old subject after **by**. *The manager approved the leave* → *The leave was approved by the manager.*',
          bn: '1. **Object**-কে সামনে আনুন। 2. Verb-কে একই tense-এ **be + V3** করুন (*approved* অতীত, তাই *was approved*)। 3. পুরোনো subject **by**-এর পরে বসান। *The manager approved the leave* → *The leave was approved by the manager.*',
        },
      },
      {
        title: { en: 'Be-words for each tense', bn: 'প্রতিটি tense-এর be-শব্দ' },
        body: {
          en: 'Simple present: *is/am/are + V3*. Simple past: *was/were + V3*. Simple future: *will be + V3*. Present continuous: *is/am/are **being** + V3*. Past continuous: *was/were **being** + V3*. Present perfect: *has/have **been** + V3*. Past perfect: *had **been** + V3*. Future perfect: *will have been + V3*.',
          bn: 'প্রতিটি tense-এ be-শব্দ বদলায়। Simple present: *is/am/are + V3*। Simple past: *was/were + V3*। Simple future: *will be + V3*। Present continuous: *is/am/are **being** + V3*। Past continuous: *was/were **being** + V3*। Present perfect: *has/have **been** + V3*। Past perfect: *had **been** + V3*। Future perfect: *will have been + V3*।',
        },
      },
      {
        title: { en: 'Questions and negatives', bn: 'প্রশ্ন ও না-বাচক বাক্য' },
        body: {
          en: 'Put **not** after the first helping verb: *The leave was not approved.* For a yes/no question, move the helping verb to the front: *Did she post the letter?* → *Was the letter posted by her?* **Do/does/did disappear** in the passive. For *Who wrote this novel?* the passive is *By whom was this novel written?*',
          bn: 'প্রথম helping verb-এর পরে **not** বসান: *The leave was not approved.* Yes/no প্রশ্নে helping verb সামনে যায়: *Did she post the letter?* → *Was the letter posted by her?* Passive-এ **do/does/did থাকে না**। *Who wrote this novel?*-এর passive *By whom was this novel written?*',
        },
      },
      {
        title: { en: 'Modals and the agent', bn: 'Modal এবং by-অংশ' },
        body: {
          en: 'Modal passive: **modal + be + V3** (*Fire exits must be kept clear*), and for the perfect form **modal + have been + V3** (*The accident could have been avoided*). Drop *by + doer* when the doer is vague (*people, someone, they*) or unknown: *My wallet was stolen.*',
          bn: 'Modal-এর passive: **modal + be + V3** (*Fire exits must be kept clear*), আর perfect রূপে **modal + have been + V3** (*The accident could have been avoided*)। কর্তা অস্পষ্ট (*people, someone, they*) বা অজানা হলে *by + doer* বাদ দিন: *My wallet was stolen.*',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Be-words before V3', bn: 'V3-এর আগে be-শব্দ' },
        body: {
          en: 'The passive always adds a be-word (*be / being / been*) before V3. If an option has V3 with no be-word, such as *The thief caught*, strike it out.',
          bn: 'Passive-এ V3-এর আগে সবসময় একটা be-শব্দ (*be / being / been*) যোগ হয়। কোনো option-এ be-শব্দ ছাড়া V3 থাকলে, যেমন *The thief caught*, সেটা কেটে দিন।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Read the active tense off the -ing / have signal', bn: 'Active-এর tense চিনুন -ing / have দেখে' },
        body: {
          en: '*-ing* in the active means *being* in the passive (*are repairing* → *is being repaired*). *have / has / had + V3* means *been* in the passive (*have sold* → *have been sold*).',
          bn: 'Active-এ *-ing* থাকলে passive-এ *being* (*are repairing* → *is being repaired*)। *have / has / had + V3* থাকলে passive-এ *been* (*have sold* → *have been sold*)।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Match the new subject', bn: 'নতুন subject-এর সঙ্গে মেলান' },
        body: {
          en: 'After you move the object, check its number: *The windows **are** cleaned* but *The window **is** cleaned*.',
          bn: 'Object সামনে আনার পরে তার বচন দেখুন: *The windows **are** cleaned* কিন্তু *The window **is** cleaned*।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**was catch / was wrote.** After *be* we need V3: *was caught*, *was written*.',
        bn: '**was catch / was wrote।** *be*-এর পরে V3 লাগে: *was caught*, *was written*।',
      },
      {
        en: '**Changing the tense.** *The manager approved the leave* becomes *was approved*, not *is approved*.',
        bn: '**Tense বদলে ফেলা।** *The manager approved the leave* হয় *was approved*, *is approved* নয়।',
      },
      {
        en: '**Keeping did in the passive question.** *Did the letter posted?* is wrong; use *Was the letter posted?*',
        bn: '**Passive প্রশ্নে did রেখে দেওয়া।** *Did the letter posted?* ভুল; হবে *Was the letter posted?*',
      },
      {
        en: '**Trying to make a passive without an object.** *He sleeps* has no object, so it has no passive.',
        bn: '**Object ছাড়া passive বানানো।** *He sleeps*-এ object নেই, তাই এর passive হয় না।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Narration
  {
    subject: 'english',
    topic: 'narration',
    title: { en: 'Direct & Indirect Speech', bn: 'নেরেশন (Direct & Indirect Speech)', hi: 'कथन (Direct & Indirect Speech)' },
    overview: {
      en: "**Direct speech** gives the exact words in quotation marks (*Rina said, \"I am busy.\"*); **indirect speech** reports the meaning (*Rina said that she was busy.*). To convert, remove the quotation marks and comma, add **that**, and then make three changes: the **tense** (one step back after a past reporting verb), the **pronouns** (follow the speaker and the listener) and the **time and place words** (*now → then*, *tomorrow → the next day*). Always check the **reporting verb** first, because a present or future reporting verb, or a universal truth, stops the tense from changing.",
      bn: '**Direct speech**-এ উদ্ধৃতিচিহ্নের ভিতরে হুবহু কথা থাকে (*Rina said, "I am busy."*); **indirect speech**-এ অর্থটা জানানো হয় (*Rina said that she was busy.*)। বদলাতে হলে উদ্ধৃতিচিহ্ন আর কমা তুলে **that** বসান, তারপর তিনটি পরিবর্তন করুন: **tense** (অতীতের reporting verb-এর পরে এক ধাপ পিছনে), **pronoun** (বক্তা ও শ্রোতা অনুযায়ী) আর **সময় ও স্থানের শব্দ** (*now → then*, *tomorrow → the next day*)। আগে **reporting verb** দেখুন, কারণ reporting verb বর্তমান বা ভবিষ্যৎ হলে, বা সার্বজনীন সত্য হলে tense বদলায় না।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Backshift of the tense', bn: 'Tense পিছিয়ে দেওয়া' },
        body: {
          en: 'After a past reporting verb: simple present → simple past (*like → liked*); present continuous → past continuous; present perfect and simple past → **past perfect**; *am/is → was*, *are → were*, *will → would*, *can → could*, *may → might*. *He said, "I am waiting"* → *He said that he was waiting.*',
          bn: 'অতীতের reporting verb-এর পরে: simple present → simple past (*like → liked*); present continuous → past continuous; present perfect ও simple past → **past perfect**; *am/is → was*, *are → were*, *will → would*, *can → could*, *may → might*। *He said, "I am waiting"* → *He said that he was waiting.*',
        },
      },
      {
        title: { en: 'Pronouns: ask who speaks and who listens', bn: 'Pronoun: কে বলছে, কে শুনছে' },
        body: {
          en: '**I / my / me** change to match the **speaker**; **you / your** change to match the **listener**; *he / she / they* usually stay. *Hari said to Gopal, "I will give you my notes."* → *Hari told Gopal that **he** would give **him** **his** notes.*',
          bn: '**I / my / me** বদলে **বক্তার** সঙ্গে মেলে; **you / your** বদলে **শ্রোতার** সঙ্গে মেলে; *he / she / they* সাধারণত একই থাকে। *Hari said to Gopal, "I will give you my notes."* → *Hari told Gopal that **he** would give **him** **his** notes.*',
        },
      },
      {
        title: { en: 'Time and place words', bn: 'সময় ও স্থানের শব্দ' },
        body: {
          en: '*now → then*, *today → that day*, *tomorrow → the next day*, *yesterday → the day before*, *last night → the night before*, *next month → the following month*, *ago → before*, *here → there*, *this / these → that / those*.',
          bn: 'বদলের তালিকা: *now → then*, *today → that day*, *tomorrow → the next day*, *yesterday → the day before*, *last night → the night before*, *next month → the following month*, *ago → before*, *here → there*, *this / these → that / those*।',
        },
      },
      {
        title: { en: 'When the tense does not change', bn: 'কখন tense বদলায় না' },
        body: {
          en: 'If the reporting verb is **present or future** (*says, has said, will say*), keep the tense: *He says, "I am tired"* → *He says that he is tired.* **Universal truths, proverbs and scientific facts** stay in the present: *The teacher said that the earth moves round the sun.*',
          bn: 'Reporting verb **বর্তমান বা ভবিষ্যৎ** (*says, has said, will say*) হলে tense একই থাকে: *He says, "I am tired"* → *He says that he is tired.* **সার্বজনীন সত্য, প্রবাদ ও বৈজ্ঞানিক তথ্য** present-এ থাকে: *The teacher said that the earth moves round the sun.*',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Check the reporting verb first', bn: 'আগে reporting verb দেখুন' },
        body: {
          en: 'Past (*said, told*) means backshift; present or future (*says, will say*) means no tense change. Decide this in two seconds before touching the verb.',
          bn: 'অতীত (*said, told*) মানে backshift; বর্তমান বা ভবিষ্যৎ (*says, will say*) মানে tense বদলাবে না। Verb ছোঁয়ার আগে দুই সেকেন্ডে এটা ঠিক করুন।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Tomorrow and yesterday go opposite ways', bn: 'Tomorrow আর yesterday উল্টো দিকে যায়' },
        body: {
          en: '*tomorrow → the next day* (forward); *yesterday → the day before* (backward). Link the direction with the word and you will not mix them up.',
          bn: '*tomorrow → the next day* (সামনে); *yesterday → the day before* (পিছনে)। দিকটা শব্দের সঙ্গে মনে রাখলে গুলিয়ে ফেলবেন না।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Said or told', bn: 'Said না told' },
        body: {
          en: 'If a person follows directly, use **told** (*She told me*). *Said* needs *to* before the person (*She said to me*). A quick check removes *said me* options.',
          bn: 'সরাসরি পরে মানুষ থাকলে **told** (*She told me*)। *Said*-এর পরে মানুষের আগে *to* লাগে (*She said to me*)। এই পরীক্ষায় *said me* option কাটা যায়।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**said me that.** Use *told me that* or *said to me that*.',
        bn: '**said me that।** *told me that* বা *said to me that* হবে।',
      },
      {
        en: '**Keeping I and you unchanged.** Ask who is speaking and who is listening before copying any pronoun.',
        bn: '**I আর you অপরিবর্তিত রাখা।** কোনো pronoun কপি করার আগে ভাবুন কে বলছে, কে শুনছে।',
      },
      {
        en: '**Backshift after a present reporting verb.** *He says that he was tired* is wrong for *He says, "I am tired."*',
        bn: '**বর্তমান reporting verb-এর পরে backshift।** *He says, "I am tired."*-এর জন্য *He says that he was tired* ভুল।',
      },
      {
        en: '**Changing a universal truth.** *The teacher said that the earth moved round the sun* is wrong; the fact stays in the present.',
        bn: '**সার্বজনীন সত্য বদলে ফেলা।** *The teacher said that the earth moved round the sun* ভুল; তথ্যটা present-এই থাকে।',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Modals & Conditionals
  {
    subject: 'english',
    topic: 'modals_conditionals',
    title: { en: 'Modals & Conditionals', bn: 'মোডাল ও শর্তবাচক বাক্য (Modals & Conditionals)', hi: 'मोडल और शर्तवाचक वाक्य (Modals & Conditionals)' },
    overview: {
      en: "**Modals** (*can, could, may, might, must, shall, should, will, would, ought to*) add meaning to a verb: ability, permission, duty, advice, a polite request. The golden rule: after a modal the main verb is in the **base form**, with no -s, no -ed, no -ing and no *to*. **Conditionals** are *if* sentences, and the type is decided by the time and reality of the situation: real future (first), imaginary present (second) and imaginary past (third). Look at the **result part** to identify the type, then check that the *if*-part matches it.",
      bn: '**Modal** (*can, could, may, might, must, shall, should, will, would, ought to*) verb-এ অর্থ যোগ করে: সামর্থ্য, অনুমতি, কর্তব্য, পরামর্শ, ভদ্র অনুরোধ। সোনালি নিয়ম: modal-এর পরে main verb **base form**-এ থাকে, -s, -ed, -ing বা *to* কিছুই নয়। **Conditional** হল *if* বাক্য, আর ধরন ঠিক হয় পরিস্থিতির সময় ও বাস্তবতা দিয়ে: বাস্তব ভবিষ্যৎ (first), কল্পিত বর্তমান (second), কল্পিত অতীত (third)। ধরন চিনতে **result অংশ** দেখুন, তারপর *if*-অংশ তার সঙ্গে মেলে কি না যাচাই করুন।',
    },
    formulas: [],
    derivation_rules: [
      {
        title: { en: 'Modal + base verb', bn: 'Modal-এর পরে base verb' },
        body: {
          en: '*He can **speak** three languages.* Not *can speaks*, *can speaking* or *can to speak*. *You must **be** on time*, not *must to be*. Only *ought* keeps *to*. In polite requests the verb is also the base form: *Could you please **send** me the report?*',
          bn: '*He can **speak** three languages.* *can speaks*, *can speaking* বা *can to speak* নয়। *You must **be** on time*, *must to be* নয়। শুধু *ought* *to* রাখে। ভদ্র অনুরোধেও verb base form: *Could you please **send** me the report?*',
        },
      },
      {
        title: { en: 'Zero, first and second conditionals', bn: 'Zero, first ও second conditional' },
        body: {
          en: '**Zero** (always true): if + simple present, simple present: *If you heat ice, it melts.* **First** (real future): if + simple present, **will** + base verb: *If it rains, the match will be postponed.* **Second** (imaginary present): if + simple past (**were** for every person), **would** + base verb: *If I were you, I would accept the offer.*',
          bn: '**Zero** (সবসময় সত্য): if + simple present, simple present: *If you heat ice, it melts.* **First** (বাস্তব ভবিষ্যৎ): if + simple present, **will** + base verb: *If it rains, the match will be postponed.* **Second** (কল্পিত বর্তমান): if + simple past (সব person-এর সঙ্গে **were**), **would** + base verb: *If I were you, I would accept the offer.*',
        },
      },
      {
        title: { en: 'Third conditional and modal + have + V3', bn: 'Third conditional ও modal + have + V3' },
        body: {
          en: '**Third** (imaginary past): if + **had + V3**, **would have + V3**: *If he had studied, he would have passed.* Modal + have + V3 looks back: **must have** (strong guess), **can\'t have** (sure it did not happen), **should have** (regret), **could have** (possible but did not happen), **needn\'t have** (not necessary).',
          bn: '**Third** (কল্পিত অতীত): if + **had + V3**, **would have + V3**: *If he had studied, he would have passed.* Modal + have + V3 অতীতের দিকে তাকায়: **must have** (দৃঢ় অনুমান), **can\'t have** (নিশ্চিত যে ঘটেনি), **should have** (আফসোস), **could have** (সম্ভব ছিল কিন্তু ঘটেনি), **needn\'t have** (দরকার ছিল না)।',
        },
      },
      {
        title: { en: 'Unless, used to, must and have to', bn: 'Unless, used to, must ও have to' },
        body: {
          en: '**Unless = if ... not**, so the verb after it stays positive: *You will fail unless you work hard.* **Used to + base verb** is a past habit (*I used to play cricket*); **be used to + -ing** means accustomed (*She is used to getting up early*). *Must* has no past form, so use **had to**: *He had to work late yesterday.*',
          bn: '**Unless = if ... not**, তাই তার পরের verb হ্যাঁ-বাচক থাকে: *You will fail unless you work hard.* **Used to + base verb** অতীতের অভ্যাস (*I used to play cricket*); **be used to + -ing** মানে অভ্যস্ত (*She is used to getting up early*)। *Must*-এর অতীত রূপ নেই, তাই **had to**: *He had to work late yesterday.*',
        },
      },
    ],
    speed_tricks: [
      {
        title: { en: 'Read the result part first', bn: 'আগে result অংশ পড়ুন' },
        body: {
          en: '*will + verb* means first conditional; *would + verb* means second; *would have + V3* means third. Then the *if*-part must be simple present, simple past (*were*), or *had + V3* respectively.',
          bn: '*will + verb* মানে first conditional; *would + verb* মানে second; *would have + V3* মানে third। তারপর *if*-অংশ যথাক্রমে simple present, simple past (*were*) বা *had + V3* হবে।',
        },
        approx_time_saved_sec: 15,
      },
      {
        title: { en: 'Check the word after the modal', bn: 'Modal-এর পরের শব্দ দেখুন' },
        body: {
          en: 'Look only at the word right after *can, could, must, should, would*. If it ends in -s, -ed or -ing, or is preceded by *to*, strike the option out.',
          bn: '*can, could, must, should, would*-এর ঠিক পরের শব্দটা দেখুন। সেটা -s, -ed বা -ing দিয়ে শেষ হলে, বা আগে *to* থাকলে, option কেটে দিন।',
        },
        approx_time_saved_sec: 10,
      },
      {
        title: { en: 'Unless equals if not', bn: 'Unless মানে if not' },
        body: {
          en: 'Replace *unless* with *if ... not* to test the meaning. If the option already has *not* after *unless*, it is a double negative and wrong.',
          bn: 'অর্থ পরীক্ষা করতে *unless*-এর জায়গায় *if ... not* বসান। *unless*-এর পরে আবার *not* থাকলে সেটা দ্বিগুণ না-বাচক, ভুল।',
        },
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      {
        en: '**must to be / can speaks / Could you please sent.** After a modal use the plain base verb.',
        bn: '**must to be / can speaks / Could you please sent।** Modal-এর পরে সাধারণ base verb।',
      },
      {
        en: '**would in the if-part.** *If I would be the manager* and *If he would have studied* are wrong; the *if*-part never takes *would*.',
        bn: '**If-অংশে would।** *If I would be the manager* ও *If he would have studied* ভুল; *if*-অংশে *would* বসে না।',
      },
      {
        en: '**will in the if-part.** *If it will rain* is wrong; write *If it rains*.',
        bn: '**If-অংশে will।** *If it will rain* ভুল; লিখুন *If it rains*।',
      },
      {
        en: '**must have went.** After *must have*, *should have* and *could have* the verb is V3: *must have gone*.',
        bn: '**must have went।** *must have*, *should have*, *could have*-এর পরে V3: *must have gone*।',
      },
    ],
  },
];
