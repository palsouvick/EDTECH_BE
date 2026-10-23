'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'reasoning',
  topic: 'blood_relations',
  patterns: [
    {
      key: 'direct_chain',
      emoji: '👨‍👩‍👦',
      name: t(`Direct chain of relations`, `সরাসরি সম্পর্কের শিকল`),
      spot: t(
        `Two or three short sentences like "P is the brother of Q. Q is the mother of R." and then "How is P related to R?"`,
        `দু-তিনটি ছোট বাক্য, যেমন "P হল Q-এর ভাই। Q হল R-এর মা।", তারপর প্রশ্ন "P, R-এর কে হয়?"`,
      ),
      method: [
        t(`Draw a small family tree: parents above, children below, brothers and sisters side by side.`, `ছোট একটা বংশতালিকা আঁকো: বাবা-মা উপরে, সন্তান নিচে, ভাই-বোন পাশাপাশি।`),
        t(`Mark males with + and females with − as soon as a word tells you (brother = male, mother = female).`, `কোনো শব্দ লিঙ্গ বলে দিলেই চিহ্ন দাও: পুরুষ +, মহিলা − (ভাই = পুরুষ, মা = মহিলা)।`),
        t(`Start from the second person in the question (R) and walk to the first (P), reading the relation off the tree.`, `প্রশ্নের দ্বিতীয় ব্যক্তি (R) থেকে শুরু করে প্রথম ব্যক্তির (P) কাছে যাও, আর তালিকা থেকে সম্পর্কটা পড়ো।`),
      ],
      example: {
        question: t(`P is the brother of Q. Q is the mother of R. How is P related to R?`, `P হল Q-এর ভাই। Q হল R-এর মা। P, R-এর কে হয়?`),
        steps: [
          t(`Q is R's mother, so Q is one level above R.`, `Q হল R-এর মা, তাই Q, R-এর এক ধাপ উপরে।`),
          t(`P is Q's brother, so P is the brother of R's mother.`, `P হল Q-এর ভাই, অর্থাৎ P হল R-এর মায়ের ভাই।`),
          t(`Mother's brother = maternal uncle.`, `মায়ের ভাই = মামা।`),
        ],
        answer: t(`Maternal uncle`, `উত্তর: মামা`),
      },
      tryIt: {
        question: t(`M is the sister of N. N is the father of O. How is M related to O?`, `M হল N-এর বোন। N হল O-এর বাবা। M, O-এর কে হয়?`),
        options: [t('Mother', 'মা'), t('Aunt (father\'s sister)', 'পিসি'), t('Sister', 'বোন'), t('Grandmother', 'ঠাকুমা')],
        correct: 1,
        explanation: [
          t(`N is O's father, and M is N's sister.`, `N হল O-এর বাবা, আর M হল N-এর বোন।`),
          t(`So M is the sister of O's father: O's aunt (father's sister).`, `তাই M হল O-এর বাবার বোন, অর্থাৎ পিসি।`),
        ],
      },
    },
    {
      key: 'gender_trap',
      emoji: '❓',
      name: t(`Gender trap ("cannot be determined")`, `লিঙ্গের ফাঁদ ("নির্ধারণ করা যায় না")`),
      spot: t(
        `A person's gender is never told (no brother/sister, son/daughter word for them), yet the options ask for son or daughter, father or mother.`,
        `কোনো ব্যক্তির লিঙ্গ কোথাও বলা নেই (তার জন্য ভাই/বোন, ছেলে/মেয়ে জাতীয় শব্দ নেই), অথচ বিকল্পে ছেলে না মেয়ে, বাবা না মা জানতে চাওয়া হয়।`,
      ),
      method: [
        t(`Read each sentence and note whose gender it tells. "A is the brother of B" tells A is male, but says nothing about B.`, `প্রতিটি বাক্য পড়ে দেখো কার লিঙ্গ জানা গেল। "A হল B-এর ভাই" থেকে জানা যায় A পুরুষ, কিন্তু B সম্পর্কে কিছুই জানা যায় না।`),
        t(`Find the relation in a gender-free word first: child, parent, sibling.`, `আগে লিঙ্গ-নিরপেক্ষ শব্দে সম্পর্কটা বের করো: সন্তান, অভিভাবক (বাবা বা মা), ভাইবোন।`),
        t(`If the answer needs the gender and it is not given, choose "cannot be determined".`, `উত্তরের জন্য লিঙ্গ জানা দরকার অথচ তা দেওয়া নেই, তাহলে "নির্ধারণ করা যায় না" বেছে নাও।`),
      ],
      example: {
        question: t(`K is the son of L. M is the sister of K. How is L related to M?`, `K হল L-এর ছেলে। M হল K-এর বোন। L, M-এর কে হয়?`),
        steps: [
          t(`K and M are brother and sister, so L is the parent of both.`, `K আর M ভাই-বোন, তাই L দুজনেরই বাবা বা মা।`),
          t(`No sentence tells whether L is male or female.`, `কোনো বাক্যে বলা নেই L পুরুষ না মহিলা।`),
          t(`So L is M's parent, but father or mother cannot be determined.`, `তাই L হল M-এর বাবা বা মা, কিন্তু কোনটা তা নির্ধারণ করা যায় না।`),
        ],
        answer: t(`Parent (father or mother cannot be determined)`, `উত্তর: বাবা না মা, তা নির্ধারণ করা যায় না`),
      },
      tryIt: {
        question: t(`P is the brother of Q. R is the father of P. How is Q related to R?`, `P হল Q-এর ভাই। R হল P-এর বাবা। Q, R-এর কে হয়?`),
        options: [t('Son', 'ছেলে'), t('Daughter', 'মেয়ে'), t('Brother', 'ভাই'), t('Cannot be determined', 'নির্ধারণ করা যায় না')],
        correct: 3,
        explanation: [
          t(`P and Q are siblings and R is P's father, so Q is also R's child.`, `P আর Q ভাইবোন, আর R হল P-এর বাবা, তাই Q-ও R-এর সন্তান।`),
          t(`"P is the brother of Q" tells only that P is male; Q's gender is never given.`, `"P হল Q-এর ভাই" থেকে শুধু জানা যায় P পুরুষ; Q-এর লিঙ্গ কোথাও বলা নেই।`),
          t(`Q may be R's son or daughter, so the answer is "cannot be determined".`, `Q, R-এর ছেলেও হতে পারে, মেয়েও হতে পারে, তাই উত্তর "নির্ধারণ করা যায় না"।`),
        ],
      },
    },
    {
      key: 'pointing_photo',
      emoji: '👉',
      name: t(`Pointing / introducing a person`, `কাউকে দেখিয়ে বা পরিচয় করিয়ে`),
      spot: t(
        `"Pointing to a boy, Riya says ..." or "Introducing a man, Arun said ..." followed by one long relation like "the son of my mother's only brother".`,
        `"একটি ছেলেকে দেখিয়ে রিয়া বলল ..." বা "একজন লোকের পরিচয় দিয়ে অরুণ বলল ...", তারপর একটা লম্বা সম্পর্ক, যেমন "আমার মায়ের একমাত্র ভাইয়ের ছেলে"।`,
      ),
      method: [
        t(`The speaker is "my / I". Start from the **end** of the sentence that is closest to the speaker ("my mother").`, `যে কথা বলছে সে-ই "আমি / আমার"। বাক্যের যে অংশ বক্তার সবচেয়ে কাছের ("আমার মা") সেখান থেকে **শুরু** করো।`),
        t(`Shorten step by step: "my mother's only brother" = my maternal uncle; "my mother's only daughter" (said by a man) = my sister.`, `ধাপে ধাপে ছোট করো: "আমার মায়ের একমাত্র ভাই" = আমার মামা; "আমার মায়ের একমাত্র মেয়ে" (কোনো ছেলে বললে) = আমার বোন।`),
        t(`Keep shortening until you reach the person pointed at, then name the relation.`, `যাকে দেখানো হয়েছে তার কাছে না পৌঁছানো পর্যন্ত ছোট করতে থাকো, তারপর সম্পর্কের নাম বলো।`),
      ],
      example: {
        question: t(
          `Pointing to a boy, Riya says, "He is the son of my mother's only brother." How is the boy related to Riya?`,
          `একটি ছেলেকে দেখিয়ে রিয়া বলল, "ও আমার মায়ের একমাত্র ভাইয়ের ছেলে।" ছেলেটি রিয়ার কে হয়?`,
        ),
        steps: [
          t(`My mother's only brother = Riya's maternal uncle.`, `আমার মায়ের একমাত্র ভাই = রিয়ার মামা।`),
          t(`The boy is the son of her maternal uncle.`, `ছেলেটি রিয়ার মামার ছেলে।`),
          t(`Maternal uncle's son = cousin (brother).`, `মামার ছেলে = মামাতো ভাই।`),
        ],
        answer: t(`Cousin (maternal uncle's son)`, `উত্তর: মামাতো ভাই`),
      },
      tryIt: {
        question: t(
          `Introducing a man, Arun said, "His mother is the only daughter of my mother." How is the man related to Arun?`,
          `একজন লোকের পরিচয় দিয়ে অরুণ বলল, "ওর মা আমার মায়ের একমাত্র মেয়ে।" লোকটি অরুণের কে হয়?`,
        ),
        options: [t('Brother', 'ভাই'), t('Son', 'ছেলে'), t('Nephew (sister\'s son)', 'ভাগ্নে'), t('Cousin', 'মাসতুতো ভাই')],
        correct: 2,
        explanation: [
          t(`Arun is a son, so "the only daughter of my mother" is Arun's sister.`, `অরুণ নিজে ছেলে, তাই "আমার মায়ের একমাত্র মেয়ে" হল অরুণের বোন।`),
          t(`The man's mother is Arun's sister, so the man is Arun's sister's son.`, `লোকটির মা অরুণের বোন, তাই লোকটি অরুণের বোনের ছেলে।`),
          t(`Sister's son = nephew.`, `বোনের ছেলে = ভাগ্নে।`),
        ],
      },
    },
    {
      key: 'coded_relations',
      emoji: '🔣',
      name: t(`Coded relations (A + B, A × B ...)`, `সংকেতে সম্পর্ক (A + B, A × B ...)`),
      spot: t(
        `Symbols stand for relations, e.g. "A + B means A is the mother of B", and you must decode an expression like P − Q + R.`,
        `চিহ্ন দিয়ে সম্পর্ক বোঝানো হয়, যেমন "A + B মানে A হল B-এর মা", আর P − Q + R জাতীয় রাশির মানে বের করতে হয়।`,
      ),
      method: [
        t(`Copy the symbol meanings in a small table.`, `চিহ্নগুলির মানে একটা ছোট তালিকায় লিখে নাও।`),
        t(`Break the expression into pairs from left to right: P − Q, then Q + R.`, `রাশিটিকে বাঁ থেকে ডানে জোড়ায় ভাঙো: P − Q, তারপর Q + R।`),
        t(`Turn each pair into a sentence, draw the tree, then read the relation between the first and the last person.`, `প্রতিটি জোড়াকে বাক্যে বদলাও, বংশতালিকা আঁকো, তারপর প্রথম আর শেষ ব্যক্তির সম্পর্ক পড়ো।`),
      ],
      example: {
        question: t(
          `A + B means A is the mother of B; A − B means A is the brother of B; A × B means A is the wife of B; A ÷ B means A is the father of B. What does P − Q + R mean?`,
          `A + B মানে A হল B-এর মা; A − B মানে A হল B-এর ভাই; A × B মানে A হল B-এর স্ত্রী; A ÷ B মানে A হল B-এর বাবা। P − Q + R মানে কী?`,
        ),
        steps: [
          t(`P − Q: P is the brother of Q.`, `P − Q: P হল Q-এর ভাই।`),
          t(`Q + R: Q is the mother of R.`, `Q + R: Q হল R-এর মা।`),
          t(`P is the brother of R's mother, so P is R's maternal uncle.`, `P হল R-এর মায়ের ভাই, তাই P হল R-এর মামা।`),
        ],
        answer: t(`P is the maternal uncle of R`, `উত্তর: P হল R-এর মামা`),
      },
      tryIt: {
        question: t(
          `Using the same codes (+ mother, − brother, × wife, ÷ father), how is M related to K in M × N ÷ K?`,
          `একই সংকেত ধরে (+ মা, − ভাই, × স্ত্রী, ÷ বাবা), M × N ÷ K-তে M, K-এর কে হয়?`,
        ),
        options: [t('Aunt', 'মাসি'), t('Sister', 'বোন'), t('Grandmother', 'দিদিমা'), t('Mother', 'মা')],
        correct: 3,
        explanation: [
          t(`M × N: M is the wife of N.`, `M × N: M হল N-এর স্ত্রী।`),
          t(`N ÷ K: N is the father of K.`, `N ÷ K: N হল K-এর বাবা।`),
          t(`M is the wife of K's father, so M is K's mother.`, `M হল K-এর বাবার স্ত্রী, তাই M হল K-এর মা।`),
        ],
      },
    },
    {
      key: 'family_tree_puzzle',
      emoji: '🌳',
      name: t(`Family-tree puzzle (many people)`, `বংশতালিকার ধাঁধা (অনেক জন)`),
      spot: t(
        `Four or more people and four or more statements, often with extra facts that are not needed for the question.`,
        `চার বা তার বেশি লোক আর চার বা তার বেশি বাক্য, প্রায়ই এমন কিছু তথ্য থাকে যা প্রশ্নের জন্য লাগে না।`,
      ),
      method: [
        t(`Draw the tree one statement at a time, with generations in rows (grandparents, parents, children).`, `একটা করে বাক্য ধরে বংশতালিকা আঁকো, প্রজন্ম অনুযায়ী সারিতে (দাদু-দিদা, বাবা-মা, সন্তান)।`),
        t(`Mark gender (+ / −) and draw a double line for husband–wife.`, `লিঙ্গ চিহ্ন দাও (+ / −) আর স্বামী–স্ত্রীর জন্য দুটি দাগ টানো।`),
        t(`Look only at the path between the two people asked; ignore the rest.`, `শুধু প্রশ্নের দুজনের মধ্যের পথটা দেখো; বাকিটা বাদ দাও।`),
        t(`Count the generations up and down, and check the gender before naming the relation.`, `কত প্রজন্ম উপরে বা নিচে গুনে নাও, আর সম্পর্কের নাম বলার আগে লিঙ্গ দেখে নাও।`),
      ],
      example: {
        question: t(
          `A is B's brother. C is A's mother. D is C's father. E is D's mother. How is A related to D?`,
          `A হল B-এর ভাই। C হল A-এর মা। D হল C-এর বাবা। E হল D-এর মা। A, D-এর কে হয়?`,
        ),
        steps: [
          t(`A is B's brother, so A is male.`, `A হল B-এর ভাই, তাই A পুরুষ।`),
          t(`Path: D is the father of C, and C is the mother of A. So A is the son of D's daughter.`, `পথ: D হল C-এর বাবা, আর C হল A-এর মা। তাই A হল D-এর মেয়ের ছেলে।`),
          t(`Daughter's son = grandson. (E is extra information.)`, `মেয়ের ছেলে = নাতি। (E-এর তথ্য এখানে লাগে না।)`),
        ],
        answer: t(`Grandson`, `উত্তর: নাতি`),
      },
      tryIt: {
        question: t(
          `K is the daughter of L. M is the son of K. N is the brother of L. L is a woman. How is N related to K?`,
          `K হল L-এর মেয়ে। M হল K-এর ছেলে। N হল L-এর ভাই। L একজন মহিলা। N, K-এর কে হয়?`,
        ),
        options: [t('Maternal uncle', 'মামা'), t('Paternal uncle', 'কাকা'), t('Father', 'বাবা'), t('Grandfather', 'দাদু')],
        correct: 0,
        explanation: [
          t(`L is a woman and K is her daughter, so L is K's mother.`, `L মহিলা আর K তার মেয়ে, তাই L হল K-এর মা।`),
          t(`N is L's brother, so N is the brother of K's mother.`, `N হল L-এর ভাই, অর্থাৎ N হল K-এর মায়ের ভাই।`),
          t(`Mother's brother = maternal uncle. (M is extra information.)`, `মায়ের ভাই = মামা। (M-এর তথ্য এখানে লাগে না।)`),
        ],
      },
    },
  ],
};
