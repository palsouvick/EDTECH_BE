'use strict';

module.exports = {
  subject: 'english',
  topic: 'reading_comprehension',
  title: { en: 'Reading Comprehension', bn: 'পাঠ বোধগম্যতা' },
  emoji: '📖',
  intro: {
    en: '**Comprehension** means understanding. In a reading comprehension question you read a short passage and answer questions about it. The answers are always inside the passage; you only need to know how to find them.',
    bn: '**Comprehension** মানে বোঝা। Reading comprehension প্রশ্নে একটা ছোট অনুচ্ছেদ (**passage**) পড়ে তার উপর প্রশ্নের উত্তর দিতে হয়। উত্তর সবসময় passage-এর ভেতরেই থাকে; শুধু খুঁজে বের করার কৌশলটা জানতে হবে।',
  },
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: { en: 'What is a passage?', bn: 'Passage কী?' },
          body: {
            en: `A **passage** is a short piece of writing, usually one to four paragraphs, about one topic: a market, an animal, a scientist, the rain.

After the passage come **questions**. Each has four options. Your job is to choose the option that the passage **supports**, not the one you personally believe.`,
            bn: `**Passage** (অনুচ্ছেদ) হলো একটা বিষয় নিয়ে লেখা ছোট লেখা, সাধারণত এক থেকে চারটে paragraph — বাজার, কোনো প্রাণী, কোনো বিজ্ঞানী বা বৃষ্টি নিয়ে।

Passage-এর পরে থাকে **প্রশ্ন**, প্রতিটার চারটে option। তোমার কাজ হলো সেই option বেছে নেওয়া যেটা passage **সমর্থন করে** — তুমি নিজে যা বিশ্বাস করো, সেটা নয়।`,
          },
        },
        {
          heading: { en: 'Three easy steps', bn: 'তিনটে সহজ ধাপ' },
          body: {
            en: `1. **Read the passage once** calmly to know what it is about.
2. **Read the question** and find its **key word** (a name, number, place or idea).
3. **Go back** to the passage, find the sentence with that key word, and read it carefully. The answer is there.

Questions that begin with **"According to the passage..."** are **fact questions**: the answer is written directly in the passage.`,
            bn: `1. **Passage একবার শান্তভাবে পড়ো** — কী নিয়ে লেখা সেটা বোঝো।
2. **প্রশ্নটা পড়ো** আর তার **key word** (মূল শব্দ — কোনো নাম, সংখ্যা, জায়গা বা ভাবনা) খুঁজে নাও।
3. **Passage-এ ফিরে যাও**, সেই key word-ওয়ালা বাক্যটা খুঁজে মন দিয়ে পড়ো। উত্তর ওখানেই আছে।

যে প্রশ্ন **"According to the passage..."** (passage অনুযায়ী) দিয়ে শুরু হয়, সেগুলো **fact question** (তথ্যভিত্তিক প্রশ্ন): উত্তর সরাসরি passage-এ লেখা থাকে।`,
          },
        },
      ],
      examples: [
        {
          question: {
            en: `Read the passage and answer.

> Every Thursday, the village of Kalinagar holds a weekly market, or **haat**, under a huge banyan tree. Farmers bring brinjals, pumpkins and fresh fish. Small farmers come because they can sell directly to buyers, without paying a middleman.

**According to the passage, why do small farmers come to the haat?**
(a) to buy fish (b) to sit under the banyan tree (c) to sell directly to buyers without a middleman (d) because it is a holiday`,
            bn: `Passage পড়ে উত্তর দাও।

> Every Thursday, the village of Kalinagar holds a weekly market, or **haat**, under a huge banyan tree. Farmers bring brinjals, pumpkins and fresh fish. Small farmers come because they can sell directly to buyers, without paying a middleman.

(প্রতি বৃহস্পতিবার কালীনগর গ্রামে বিরাট বটগাছের নিচে হাট বসে। চাষিরা বেগুন, কুমড়ো আর টাটকা মাছ আনেন। ছোট চাষিরা আসেন কারণ এখানে মধ্যস্বত্বভোগী ছাড়া সরাসরি ক্রেতাকে বিক্রি করা যায়।)

**According to the passage, why do small farmers come to the haat?**
(a) to buy fish (b) to sit under the banyan tree (c) to sell directly to buyers without a middleman (d) because it is a holiday`,
          },
          steps: [
            { en: 'Key words in the question: **small farmers** and **why**.', bn: 'প্রশ্নের key word: **small farmers** আর **why** (কেন)।' },
            { en: 'Find them in the passage: "Small farmers come **because** they can sell directly to buyers, without paying a middleman."', bn: 'Passage-এ খোঁজো: "Small farmers come **because** they can sell directly to buyers, without paying a middleman." — **because** (কারণ) শব্দের পরেই উত্তর।' },
            { en: '(a), (b) and (d) are not given as reasons in the passage.', bn: '(a), (b), (d) — passage-এ কারণ হিসেবে বলা নেই।' },
          ],
          answer: { en: '(c) to sell directly to buyers without a middleman', bn: '(c) to sell directly to buyers without a middleman (মধ্যস্বত্বভোগী ছাড়া সরাসরি ক্রেতাকে বিক্রি করতে)' },
        },
        {
          question: {
            en: `> Long ago, villages in Rajasthan dug deep **stepwells**. These were wells with long flights of steps going down to the water. When the water level fell in summer, people simply walked further down the steps to reach it.

**According to the passage, how did people reach the water when its level fell in summer?**`,
            bn: `> Long ago, villages in Rajasthan dug deep **stepwells**. These were wells with long flights of steps going down to the water. When the water level fell in summer, people simply walked further down the steps to reach it.

(অনেক আগে রাজস্থানের গ্রামে গভীর ধাপকুয়ো বা stepwell খোঁড়া হতো — জল পর্যন্ত নেমে যাওয়া লম্বা সিঁড়িওয়ালা কুয়ো। গরমে জলের স্তর নেমে গেলে মানুষ সিঁড়ি বেয়ে আরও নিচে নেমে জল নিত।)

**According to the passage, how did people reach the water when its level fell in summer?** (গরমে জলের স্তর নামলে মানুষ কীভাবে জল পেত?)`,
          },
          steps: [
            { en: 'Key words: **level fell in summer**.', bn: 'Key word: **level fell in summer** (গরমে জলস্তর নামা)।' },
            { en: 'The last sentence has them: "people simply walked further down the steps to reach it".', bn: 'শেষ বাক্যে আছে: "people simply walked further down the steps to reach it"।' },
          ],
          answer: { en: 'They walked further down the steps of the stepwell.', bn: 'তারা stepwell-এর সিঁড়ি বেয়ে আরও নিচে নেমে যেত।' },
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: { en: 'Kinds of questions', bn: 'প্রশ্নের ধরন' },
          body: {
            en: `- **Fact (detail) question**: "According to the passage, what / which / why...?" → the answer is written in the passage.
- **Main idea question**: "Which statement best sums up the passage?" → choose the option that covers the **whole** passage, not one small detail.
- **Title question**: "Which title best suits the passage?" → like main idea, but short. It must match the central topic.
- **Word meaning question**: "The word *X* in the passage most nearly means..." → find the word and read its sentence.`,
            bn: `- **Fact (detail) question** (তথ্যভিত্তিক প্রশ্ন): "According to the passage, what / which / why...?" → উত্তর passage-এ লেখা আছে।
- **Main idea question** (মূল ভাব): "Which statement best sums up the passage?" → যে option **পুরো** passage-কে ধরে, সেটা বাছো; একটা ছোট খুঁটিনাটি নয়।
- **Title question** (শিরোনাম): "Which title best suits the passage?" → মূল ভাবের মতোই, কিন্তু ছোট। কেন্দ্রীয় বিষয়ের সঙ্গে মিলতে হবে।
- **Word meaning question** (শব্দের অর্থ): "The word *X* in the passage most nearly means..." → শব্দটা খুঁজে তার বাক্যটা পড়ো।`,
          },
        },
        {
          heading: { en: 'Finding the main idea', bn: 'মূল ভাব খোঁজা' },
          body: {
            en: `The **main idea** is what the whole passage is mostly about. Look at:

- the **first sentence** (it often introduces the topic),
- the **last sentence** (it often gives the conclusion),
- the word or idea that **repeats** most.

Reject options that are **too narrow** (only one detail) or **too broad** (bigger than the passage, e.g. "The history of India").`,
            bn: `**Main idea** (মূল ভাব) হলো পুরো passage মূলত যা নিয়ে। দেখো:

- **প্রথম বাক্য** (প্রায়ই বিষয়টা জানায়),
- **শেষ বাক্য** (প্রায়ই সিদ্ধান্ত দেয়),
- কোন শব্দ বা ভাবনা বারবার **ফিরে আসছে**।

যে option **খুব সরু** (শুধু একটা খুঁটিনাটি) বা **খুব চওড়া** (passage-এর চেয়ে বড়, যেমন "The history of India"), সেগুলো বাদ দাও।`,
          },
        },
        {
          heading: { en: 'Word meaning in context', bn: 'প্রসঙ্গ অনুযায়ী শব্দের অর্থ' },
          body: {
            en: `**Context** means the words around a word. A word can have several meanings; the passage decides which one.

*The bank of the river was muddy.* → bank = the side of a river (not a place for money).

Method: put each option in place of the word. The one that keeps the sentence's meaning is correct.`,
            bn: `**Context** (প্রসঙ্গ) মানে শব্দটার আশেপাশের শব্দগুলো। একটা শব্দের অনেক মানে থাকতে পারে; passage ঠিক করে দেয় কোনটা।

*The bank of the river was muddy.* → এখানে bank = নদীর পাড় (টাকা রাখার ব্যাংক নয়)।

পদ্ধতি: শব্দটার জায়গায় প্রতিটা option বসাও। যেটা বসালে বাক্যের মানে ঠিক থাকে, সেটাই উত্তর।`,
          },
        },
      ],
      examples: [
        {
          question: {
            en: `> In many Indian cities, streets flood during the monsoon and rainwater rushes into drains and out to the sea. A few months later, the same neighbourhoods queue for water from tankers. If rooftops collected and stored this rain, the cities could use it in the dry months. Rainwater harvesting turns a problem into a resource.

**Which statement best sums up the passage?**
(a) Tankers supply water in summer.
(b) Collecting rainwater can solve both flooding and water shortage.
(c) Monsoon floods damage roads.
(d) India has many cities.`,
            bn: `> In many Indian cities, streets flood during the monsoon and rainwater rushes into drains and out to the sea. A few months later, the same neighbourhoods queue for water from tankers. If rooftops collected and stored this rain, the cities could use it in the dry months. Rainwater harvesting turns a problem into a resource.

(ভারতের বহু শহরে বর্ষায় রাস্তায় জল জমে, আর বৃষ্টির জল নর্দমা হয়ে সমুদ্রে চলে যায়। কয়েক মাস পরে সেই পাড়াতেই ট্যাঙ্কারের জলের লাইন পড়ে। ছাদে বৃষ্টির জল ধরে রাখলে শুকনো মাসে কাজে লাগত। বৃষ্টির জল সংরক্ষণ সমস্যাকে সম্পদে বদলে দেয়।)

**Which statement best sums up the passage?** (কোন বাক্যটা passage-এর মূল ভাব সবচেয়ে ভালো প্রকাশ করে?)
(a) Tankers supply water in summer.
(b) Collecting rainwater can solve both flooding and water shortage.
(c) Monsoon floods damage roads.
(d) India has many cities.`,
          },
          steps: [
            { en: 'The passage moves from a problem (floods, then shortage) to a solution (rainwater harvesting). The last sentence states the conclusion.', bn: 'Passage একটা সমস্যা (বন্যা, তারপর জলের অভাব) থেকে সমাধানে (বৃষ্টির জল সংরক্ষণ) যায়। শেষ বাক্যে সিদ্ধান্তটা বলা আছে।' },
            { en: '(a) is one small detail: too narrow. (c) is not even said in the passage. (d) is too broad.', bn: '(a) একটা ছোট খুঁটিনাটি — খুব সরু। (c) passage-এ বলাই নেই। (d) খুব চওড়া।' },
            { en: '(b) covers the problem and the solution together.', bn: '(b) সমস্যা আর সমাধান দুটোকেই একসঙ্গে ধরে।' },
          ],
          answer: { en: '(b) Collecting rainwater can solve both flooding and water shortage.', bn: '(b) Collecting rainwater can solve both flooding and water shortage. (বৃষ্টির জল ধরে রাখলে বন্যা আর জলকষ্ট দুটোরই সমাধান হতে পারে।)' },
        },
        {
          question: {
            en: `> Teenagers need more sleep than adults. During **adolescence**, the body grows quickly and the brain changes a great deal, so sleep becomes even more important.

**The word "adolescence" in the passage most nearly means:**
(a) old age (b) the teenage years (c) a school subject (d) a sleeping problem`,
            bn: `> Teenagers need more sleep than adults. During **adolescence**, the body grows quickly and the brain changes a great deal, so sleep becomes even more important.

(কিশোর-কিশোরীদের বড়দের চেয়ে বেশি ঘুম দরকার। Adolescence-এর সময় শরীর দ্রুত বাড়ে আর মস্তিষ্কে অনেক বদল আসে, তাই ঘুম আরও জরুরি হয়ে ওঠে।)

**The word "adolescence" in the passage most nearly means:** ("adolescence" শব্দের সবচেয়ে কাছাকাছি মানে কী?)
(a) old age (b) the teenage years (c) a school subject (d) a sleeping problem`,
          },
          steps: [
            { en: 'The sentence before talks about **teenagers**, and the body "grows quickly". That is a clue about age.', bn: 'আগের বাক্যে **teenagers** (কিশোর-কিশোরী)-এর কথা, আর শরীর "দ্রুত বাড়ে"। এটা বয়সের সূত্র।' },
            { en: 'Put (b) in place: "During the teenage years, the body grows quickly..." It makes sense. Old age does not fit "grows quickly".', bn: '(b) বসাও: "During the teenage years, the body grows quickly..." — মানে ঠিক থাকে। Old age (বার্ধক্য) "দ্রুত বাড়া"-র সঙ্গে মেলে না।' },
          ],
          answer: { en: '(b) the teenage years', bn: '(b) the teenage years (কৈশোর)' },
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: { en: 'Inference questions', bn: 'অনুমানভিত্তিক (inference) প্রশ্ন' },
          body: {
            en: `To **infer** means to work out something that is **not written directly** but is clearly suggested by the passage.

Question words: "The passage **suggests**...", "It can be **inferred**...", "What does the author **mean** by...?"

Rules:
- The answer must be **supported** by the passage, not just possible in real life.
- Avoid extreme words like **always, never, all, only** unless the passage uses them.
- Do not add your own outside knowledge.`,
            bn: `**Infer** (অনুমান করা) মানে এমন কিছু বুঝে নেওয়া যা **সরাসরি লেখা নেই**, কিন্তু passage থেকে স্পষ্টভাবে বোঝা যায়।

প্রশ্নের শব্দ: "The passage **suggests**...", "It can be **inferred**...", "What does the author **mean** by...?"

নিয়ম:
- উত্তরকে passage দিয়ে **সমর্থিত** হতে হবে, শুধু বাস্তবে সম্ভব হলেই চলবে না।
- **always, never, all, only** (সবসময়, কখনো না, সব, শুধু)-র মতো চরম শব্দওয়ালা option এড়িয়ে চলো, যদি না passage-এ সেগুলো থাকে।
- নিজের বাইরের জ্ঞান যোগ কোরো না।`,
          },
        },
        {
          heading: { en: "Author's tone and purpose", bn: 'লেখকের সুর ও উদ্দেশ্য' },
          body: {
            en: `**Tone** is the author's feeling or attitude. Common tones:

- **informative / neutral**: just giving facts
- **critical**: pointing out faults
- **appreciative**: praising
- **concerned / worried**: showing a problem is serious
- **ironic**: saying one thing but meaning something different

**Purpose** is why the author wrote: to inform, to persuade, to warn, to describe. Clues come from strong words like *sadly*, *wonderful*, *must*, *yet*.`,
            bn: `**Tone** (সুর) হলো লেখকের অনুভূতি বা মনোভাব। সাধারণ tone:

- **informative / neutral** (তথ্যমূলক / নিরপেক্ষ): শুধু তথ্য দেওয়া
- **critical** (সমালোচনামূলক): দোষ দেখানো
- **appreciative** (প্রশংসামূলক): প্রশংসা করা
- **concerned / worried** (উদ্বিগ্ন): সমস্যাটা গুরুতর বলে দেখানো
- **ironic** (ব্যঙ্গাত্মক): এক কথা বলে অন্য কিছু বোঝানো

**Purpose** (উদ্দেশ্য) হলো লেখক কেন লিখেছেন: জানাতে, বোঝাতে (রাজি করাতে), সাবধান করতে, বর্ণনা করতে। *sadly*, *wonderful*, *must*, *yet*-এর মতো জোরালো শব্দ থেকে সূত্র মেলে।`,
          },
        },
        {
          heading: { en: 'Smart reading for long passages', bn: 'লম্বা passage পড়ার কৌশল' },
          body: {
            en: `- **Skim first**: read the first and last lines of each paragraph to get the map.
- **Read the questions** before reading in detail, so you know what to look for.
- **Scan**: move your eyes quickly to find a name, date or key word.
- Watch **signal words**: *but, however, yet* (a change of direction); *because, so, therefore* (cause and result).
- Wrong options often **copy words** from the passage but change the meaning. Check the meaning, not just the words.`,
            bn: `- **আগে চোখ বুলিয়ে নাও (skim)**: প্রতিটা paragraph-এর প্রথম ও শেষ লাইন পড়ে একটা নকশা বুঝে নাও।
- **খুঁটিয়ে পড়ার আগে প্রশ্নগুলো পড়ো**, তাহলে জানবে কী খুঁজতে হবে।
- **Scan**: কোনো নাম, তারিখ বা key word খুঁজতে দ্রুত চোখ চালাও।
- **Signal word** লক্ষ করো: *but, however, yet* (কিন্তু — দিক বদল); *because, so, therefore* (কারণ ও ফল)।
- ভুল option প্রায়ই passage থেকে **শব্দ নকল** করে কিন্তু মানে বদলে দেয়। শুধু শব্দ নয়, মানেটা মিলিয়ে দেখো।`,
          },
        },
      ],
      examples: [
        {
          question: {
            en: `> Plastic was once celebrated as a wonder material. It is light, cheap and waterproof. Yet the very quality that makes plastic so useful, that it lasts for a very long time, has made it a problem: a bottle thrown away today may still be lying in the sea hundreds of years from now.

**What does the author mean by saying plastic was "once celebrated as a wonder material"?**
(a) Plastic is still loved by everyone.
(b) People used to praise plastic, but now its problems are clear.
(c) Plastic was invented at a festival.
(d) Plastic is never useful.`,
            bn: `> Plastic was once celebrated as a wonder material. It is light, cheap and waterproof. Yet the very quality that makes plastic so useful, that it lasts for a very long time, has made it a problem: a bottle thrown away today may still be lying in the sea hundreds of years from now.

(একসময় প্লাস্টিককে আশ্চর্য উপাদান বলে সবাই প্রশংসা করত। এটা হালকা, সস্তা আর জলরোধী। অথচ যে গুণের জন্য প্লাস্টিক এত কাজের — অনেকদিন টিকে থাকা — সেটাই সমস্যা হয়ে দাঁড়িয়েছে: আজ ফেলে দেওয়া বোতল শত শত বছর পরেও সমুদ্রে পড়ে থাকতে পারে।)

**What does the author mean by saying plastic was "once celebrated as a wonder material"?** (লেখক "once celebrated as a wonder material" বলে কী বোঝাতে চেয়েছেন?)
(a) Plastic is still loved by everyone.
(b) People used to praise plastic, but now its problems are clear.
(c) Plastic was invented at a festival.
(d) Plastic is never useful.`,
          },
          steps: [
            { en: '**Once** means "in the past". So the praise belonged to an earlier time.', bn: '**Once** মানে "একসময়, অতীতে"। তাই প্রশংসাটা আগের সময়ের।' },
            { en: 'The signal word **Yet** shows a change: the passage then describes plastic as a problem.', bn: 'Signal word **Yet** (অথচ) দিক বদল দেখায়: এরপর passage প্লাস্টিককে সমস্যা হিসেবে বর্ণনা করে।' },
            { en: '(a) ignores "once" and "Yet". (c) takes "celebrated" literally (it means praised here). (d) is extreme; the passage says plastic is useful.', bn: '(a) "once" আর "Yet" উপেক্ষা করেছে। (c) "celebrated"-কে আক্ষরিক অর্থে (উৎসব) ধরেছে, এখানে মানে প্রশংসিত। (d) চরম কথা; passage বলছে প্লাস্টিক কাজের।' },
          ],
          answer: { en: '(b) People used to praise plastic, but now its problems are clear.', bn: '(b) People used to praise plastic, but now its problems are clear. (একসময় প্লাস্টিকের প্রশংসা হতো, এখন তার সমস্যা স্পষ্ট।)' },
        },
        {
          question: {
            en: `> Johannes Gutenberg did not invent printing; the Chinese and Koreans had printed books centuries earlier. However, around 1450 he combined movable metal type with a new press and oil-based ink. His system made printing so fast and cheap that books spread across Europe within a few decades.

**What does the passage suggest about Gutenberg's contribution?**
(a) He was the first person ever to print a book.
(b) He combined existing ideas into a faster, cheaper printing system.
(c) He only printed books in China.
(d) His work had no effect on Europe.`,
            bn: `> Johannes Gutenberg did not invent printing; the Chinese and Koreans had printed books centuries earlier. However, around 1450 he combined movable metal type with a new press and oil-based ink. His system made printing so fast and cheap that books spread across Europe within a few decades.

(গুটেনবার্গ ছাপাখানা আবিষ্কার করেননি; চিনা ও কোরীয়রা কয়েকশো বছর আগেই বই ছাপত। তবে ১৪৫০ সাল নাগাদ তিনি সরানো যায় এমন ধাতুর হরফ, নতুন প্রেস আর তেলভিত্তিক কালি একসঙ্গে জুড়েছিলেন। তাঁর পদ্ধতিতে ছাপা এত দ্রুত আর সস্তা হলো যে কয়েক দশকের মধ্যে বই সারা ইউরোপে ছড়িয়ে পড়ল।)

**What does the passage suggest about Gutenberg's contribution?** (Gutenberg-এর অবদান সম্পর্কে passage কী ইঙ্গিত দেয়?)
(a) He was the first person ever to print a book.
(b) He combined existing ideas into a faster, cheaper printing system.
(c) He only printed books in China.
(d) His work had no effect on Europe.`,
          },
          steps: [
            { en: 'The first sentence directly rejects (a): "Gutenberg did not invent printing".', bn: 'প্রথম বাক্যই (a)-কে বাতিল করে: "Gutenberg did not invent printing"।' },
            { en: '**However** signals his real role: he **combined** type, press and ink, making printing fast and cheap.', bn: '**However** (তবে) তাঁর আসল ভূমিকা দেখায়: তিনি হরফ, প্রেস আর কালি **একসঙ্গে জুড়েছিলেন**, ফলে ছাপা দ্রুত ও সস্তা হলো।' },
            { en: '(c) mixes up a detail (China) and (d) contradicts "books spread across Europe".', bn: '(c) একটা খুঁটিনাটি (China) গুলিয়ে ফেলেছে, আর (d) "books spread across Europe"-এর উল্টো কথা বলে।' },
          ],
          answer: { en: '(b) He combined existing ideas into a faster, cheaper printing system.', bn: '(b) He combined existing ideas into a faster, cheaper printing system. (তিনি আগের ধারণাগুলো জুড়ে দ্রুত ও সস্তা ছাপার পদ্ধতি বানিয়েছিলেন।)' },
        },
      ],
    },
  ],
  rules: [
    {
      label: { en: 'The answer is in the passage', bn: 'উত্তর passage-এর ভেতরেই' },
      explain: { en: 'Choose what the passage says or clearly supports, not what you know from outside. If the passage says the haat is on Thursday, the answer is Thursday, even if your local haat is on Sunday.', bn: 'Passage যা বলে বা স্পষ্টভাবে সমর্থন করে, সেটাই বাছো — বাইরের জ্ঞান নয়। Passage-এ হাট বৃহস্পতিবার বললে উত্তর Thursday, তোমার পাড়ার হাট রবিবার হলেও।' },
    },
    {
      label: { en: 'Find the key word, then go back', bn: 'Key word খুঁজে passage-এ ফিরে যাও' },
      explain: { en: 'Underline the key word in the question (a name, number or idea), find it in the passage, and read the whole sentence around it.', bn: 'প্রশ্নের key word-এর (নাম, সংখ্যা বা ভাবনা) নিচে দাগ দাও, passage-এ সেটা খুঁজে তার পুরো বাক্যটা পড়ো।' },
    },
    {
      label: { en: 'Main idea covers the whole passage', bn: 'মূল ভাব পুরো passage জুড়ে' },
      explain: { en: 'For "best sums up" or "best title", reject options that are too narrow (one detail) or too broad (bigger than the passage).', bn: '"best sums up" বা "best title" প্রশ্নে, খুব সরু (একটা খুঁটিনাটি) বা খুব চওড়া (passage-এর চেয়ে বড়) option বাদ দাও।' },
    },
    {
      label: { en: 'Word meaning depends on context', bn: 'শব্দের মানে প্রসঙ্গ অনুযায়ী' },
      explain: { en: 'Replace the word with each option. The one that keeps the sentence meaningful is right: *bank of the river* = side of the river.', bn: 'শব্দটার জায়গায় প্রতিটা option বসাও। যেটায় বাক্যের মানে ঠিক থাকে সেটাই ঠিক: *bank of the river* = নদীর পাড়।' },
    },
    {
      label: { en: 'Beware of extreme words', bn: 'চরম শব্দ থেকে সাবধান' },
      explain: { en: 'Options with *always, never, all, only, completely* are usually wrong unless the passage says the same.', bn: '*always, never, all, only, completely* (সবসময়, কখনো না, সব, শুধু, পুরোপুরি) থাকা option সাধারণত ভুল, যদি না passage-ও তাই বলে।' },
    },
    {
      label: { en: 'Follow the signal words', bn: 'Signal word অনুসরণ করো' },
      explain: { en: '*But, however, yet* turn the idea around; *because, so, therefore* show cause and result. The author\'s real point often comes after *however* or *yet*.', bn: '*But, however, yet* ভাবনার দিক ঘুরিয়ে দেয়; *because, so, therefore* কারণ ও ফল দেখায়। লেখকের আসল কথা প্রায়ই *however* বা *yet*-এর পরে আসে।' },
    },
  ],
  tips: [
    { en: 'Common mistake: choosing an option because it copies words from the passage. Check that the meaning matches too.', bn: 'সাধারণ ভুল: passage-এর শব্দ হুবহু আছে বলে option বেছে নেওয়া। মানেও মিলছে কিনা দেখে নাও।' },
    { en: 'Read the questions first, then the passage; you will know what to look for.', bn: 'আগে প্রশ্নগুলো পড়ো, তারপর passage — তাহলে জানবে কী খুঁজতে হবে।' },
    { en: 'Do not panic at a hard word. Read the sentence around it; the context usually explains it.', bn: 'কঠিন শব্দ দেখে ঘাবড়ে যেয়ো না। আশেপাশের বাক্য পড়ো; প্রসঙ্গই সাধারণত মানে বুঝিয়ে দেয়।' },
    { en: 'Practise daily: read one short English news article and say its main idea in one sentence.', bn: 'রোজ অভ্যাস করো: একটা ছোট English খবর পড়ে তার মূল ভাব এক বাক্যে বলো।' },
    { en: '"According to the passage" = the answer is written there. "Suggests / inferred" = think one step beyond the words, but stay inside the passage.', bn: '"According to the passage" = উত্তর লেখাই আছে। "Suggests / inferred" = লেখার এক ধাপ এগিয়ে ভাবো, কিন্তু passage-এর বাইরে যেয়ো না।' },
  ],
};
