'use strict';

// Question patterns: Problems on Ages. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'ages',
  patterns: [
    // 1 ─────────────────────────────────────────────
    {
      key: 'ratio_and_sum',
      emoji: '👫',
      name: t('Ages from ratio and sum', 'অনুপাত ও যোগফল থেকে বয়স'),
      spot: t(
        'The **ratio** of two present ages and their **sum** (or difference) are given.',
        'দুজনের বর্তমান বয়সের **অনুপাত** আর তাদের **যোগফল** (বা অন্তর) দেওয়া থাকে।',
      ),
      method: [
        t(r`Let the ages be $ax$ and $bx$ for the ratio $a : b$.`, r`অনুপাত $a : b$ হলে বয়স দুটি $ax$ ও $bx$ ধরো।`),
        t(r`Sum of parts $= a + b$. One part $x = \text{sum} \div (a + b)$.`, r`মোট অংশ $= a + b$। এক অংশ $x = \text{যোগফল} \div (a + b)$।`),
        t('Multiply back to get each age.', 'গুণ করে প্রত্যেকের বয়স বের করো।'),
      ],
      example: {
        question: t('The ages of Ravi and Sima are in the ratio $3 : 5$. The sum of their ages is $48$ years. Find their ages.', 'রবি ও সীমার বয়সের অনুপাত $3 : 5$। তাদের বয়সের যোগফল $48$ বছর। দুজনের বয়স কত?'),
        steps: [
          t(r`Total parts $= 3 + 5 = 8$. One part $= 48 \div 8 = 6$.`, r`মোট অংশ $= 3 + 5 = 8$। এক অংশ $= 48 \div 8 = 6$।`),
          t(r`Ravi $= 3 \times 6 = 18$, Sima $= 5 \times 6 = 30$.`, r`রবি $= 3 \times 6 = 18$, সীমা $= 5 \times 6 = 30$।`),
        ],
        answer: t('Ravi is $18$ years and Sima is $30$ years old.', 'রবির বয়স $18$ বছর, সীমার $30$ বছর।'),
      },
      tryIt: {
        question: t('The ages of two brothers are in the ratio $4 : 7$, and the sum of their ages is $66$ years. How old is the elder brother?', 'দুই ভাইয়ের বয়সের অনুপাত $4 : 7$, আর তাদের বয়সের যোগফল $66$ বছর। বড়ো ভাইয়ের বয়স কত?'),
        options: [t('24 years', '24 বছর'), t('42 years', '42 বছর'), t('33 years', '33 বছর'), t('36 years', '36 বছর')],
        correct: 1,
        explanation: [
          t(r`Total parts $= 4 + 7 = 11$. One part $= 66 \div 11 = 6$.`, r`মোট অংশ $= 4 + 7 = 11$। এক অংশ $= 66 \div 11 = 6$।`),
          t(r`Elder brother $= 7 \times 6 = 42$ years. ($24$ is the younger one.)`, r`বড়ো ভাই $= 7 \times 6 = 42$ বছর। ($24$ হল ছোটো ভাইয়ের বয়স।)`),
        ],
      },
    },
    // 2 ─────────────────────────────────────────────
    {
      key: 'average_age_new_member',
      emoji: '🧑‍🏫',
      name: t('Average age changes when someone joins', 'কেউ যোগ দিলে গড় বয়সের পরিবর্তন'),
      spot: t(
        'The **average age** of a group is given; when a teacher (or a new member) joins, the average goes up or down. The new person\'s age is asked.',
        'কোনো দলের **গড় বয়স** দেওয়া থাকে; একজন শিক্ষক (বা নতুন সদস্য) যোগ দিলে গড় বাড়ে বা কমে। নতুন জনের বয়স জানতে চাওয়া হয়।',
      ),
      method: [
        t(r`Old total $= \text{old count} \times \text{old average}$.`, r`আগের মোট বয়স $= \text{আগের সংখ্যা} \times \text{আগের গড়}$।`),
        t(r`New total $= \text{new count} \times \text{new average}$.`, r`নতুন মোট বয়স $= \text{নতুন সংখ্যা} \times \text{নতুন গড়}$।`),
        t('New person\'s age $=$ new total $-$ old total.', 'নতুন জনের বয়স $=$ নতুন মোট $-$ আগের মোট।'),
      ],
      example: {
        question: t('The average age of $30$ students is $15$ years. When the teacher\'s age is included, the average rises by $1$ year. Find the teacher\'s age.', '$30$ জন ছাত্রছাত্রীর গড় বয়স $15$ বছর। শিক্ষকের বয়স ধরলে গড় $1$ বছর বেড়ে যায়। শিক্ষকের বয়স কত?'),
        steps: [
          t(r`Old total $= 30 \times 15 = 450$.`, r`আগের মোট বয়স $= 30 \times 15 = 450$।`),
          t(r`New total $= 31 \times 16 = 496$ (now $31$ people, average $16$).`, r`নতুন মোট বয়স $= 31 \times 16 = 496$ (এখন $31$ জন, গড় $16$)।`),
          t(r`Teacher $= 496 - 450 = 46$.`, r`শিক্ষকের বয়স $= 496 - 450 = 46$।`),
        ],
        answer: t('The teacher is $46$ years old.', 'শিক্ষকের বয়স $46$ বছর।'),
      },
      tryIt: {
        question: t('The average age of $20$ students is $14$ years. If the teacher\'s age is included, the average becomes $15$ years. Find the teacher\'s age.', '$20$ জন ছাত্রছাত্রীর গড় বয়স $14$ বছর। শিক্ষকের বয়স ধরলে গড় হয় $15$ বছর। শিক্ষকের বয়স কত?'),
        options: [t('34 years', '34 বছর'), t('15 years', '15 বছর'), t('35 years', '35 বছর'), t('36 years', '36 বছর')],
        correct: 2,
        explanation: [
          t(r`Old total $= 20 \times 14 = 280$. New total $= 21 \times 15 = 315$.`, r`আগের মোট $= 20 \times 14 = 280$। নতুন মোট $= 21 \times 15 = 315$।`),
          t(r`Teacher $= 315 - 280 = 35$ years. (Remember the count becomes $21$, not $20$.)`, r`শিক্ষকের বয়স $= 315 - 280 = 35$ বছর। (মনে রেখো, লোকসংখ্যা হয় $21$, $20$ নয়।)`),
        ],
      },
    },
    // 3 ─────────────────────────────────────────────
    {
      key: 'times_now_and_then',
      emoji: '👨‍👦',
      name: t('"Times as old" now and some years ago or later', 'এখন ও কয়েক বছর আগে/পরে "কত গুণ বয়স"'),
      spot: t(
        'Phrases like "father is **3 times** as old as his son" now, and "after $12$ years he will be **twice**" (or "$5$ years ago he was $7$ times").',
        '"বাবার বয়স ছেলের **3 গুণ**" এখন, আর "$12$ বছর পরে হবে **দ্বিগুণ**" (বা "$5$ বছর আগে ছিল $7$ গুণ") এমন কথা থাকে।',
      ),
      method: [
        t(r`Let the younger person's present age be $x$; write the elder's age using the "times" clue.`, r`ছোটো জনের বর্তমান বয়স $x$ ধরো; "গুণ"-এর তথ্য দিয়ে বড়ো জনের বয়স লেখো।`),
        t(r`Add (future) or subtract (past) the **same** number of years to **both** ages.`, r`ভবিষ্যৎ হলে যোগ, অতীত হলে বিয়োগ, **দুজনের** বয়সেই **একই** বছর।`),
        t('Form the equation from the second clue and solve for $x$.', 'দ্বিতীয় তথ্য থেকে সমীকরণ বানিয়ে $x$ বের করো।'),
      ],
      example: {
        question: t('A father is $3$ times as old as his son. After $12$ years, he will be twice as old as his son. Find the father\'s present age.', 'বাবার বয়স ছেলের বয়সের $3$ গুণ। $12$ বছর পরে বাবার বয়স হবে ছেলের দ্বিগুণ। বাবার বর্তমান বয়স কত?'),
        steps: [
          t(r`Son $= x$, father $= 3x$. After $12$ years: son $x + 12$, father $3x + 12$.`, r`ছেলে $= x$, বাবা $= 3x$। $12$ বছর পরে: ছেলে $x + 12$, বাবা $3x + 12$।`),
          t(r`$3x + 12 = 2(x + 12) = 2x + 24$, so $x = 12$.`, r`সমীকরণ: $3x + 12 = 2(x + 12) = 2x + 24$, তাই $x = 12$।`),
          t(r`Father $= 3 \times 12 = 36$. Check: after $12$ years, $48 = 2 \times 24$.`, r`বাবা $= 3 \times 12 = 36$। যাচাই: $12$ বছর পরে $48 = 2 \times 24$।`),
        ],
        answer: t('The father is $36$ years old.', 'বাবার বর্তমান বয়স $36$ বছর।'),
      },
      tryIt: {
        question: t('A mother is $4$ times as old as her daughter. $5$ years ago, she was $7$ times as old as her daughter. Find the mother\'s present age.', 'মায়ের বয়স মেয়ের বয়সের $4$ গুণ। $5$ বছর আগে মায়ের বয়স ছিল মেয়ের $7$ গুণ। মায়ের বর্তমান বয়স কত?'),
        options: [t('10 years', '10 বছর'), t('35 years', '35 বছর'), t('45 years', '45 বছর'), t('40 years', '40 বছর')],
        correct: 3,
        explanation: [
          t(r`Daughter $= x$, mother $= 4x$. Five years ago: $4x - 5 = 7(x - 5)$.`, r`মেয়ে $= x$, মা $= 4x$। পাঁচ বছর আগে: $4x - 5 = 7(x - 5)$।`),
          t(r`$4x - 5 = 7x - 35$, so $3x = 30$ and $x = 10$.`, r`তাহলে $4x - 5 = 7x - 35$, অর্থাৎ $3x = 30$ এবং $x = 10$।`),
          t(r`Mother $= 4 \times 10 = 40$ years. ($35$ was her age $5$ years ago.)`, r`মায়ের বয়স $= 4 \times 10 = 40$ বছর। ($35$ ছিল $5$ বছর আগের বয়স।)`),
        ],
      },
    },
    // 4 ─────────────────────────────────────────────
    {
      key: 'ratio_now_and_later',
      emoji: '⏩',
      name: t('Ratio now and ratio after some years', 'এখনকার অনুপাত ও কয়েক বছর পরের অনুপাত'),
      spot: t(
        'Two ratios are given: the present ratio, and the ratio after (or before) some years.',
        'দুটি অনুপাত দেওয়া থাকে: বর্তমান অনুপাত, আর কয়েক বছর পরের (বা আগের) অনুপাত।',
      ),
      method: [
        t(r`Present ages: $ax$ and $bx$ from the first ratio.`, r`প্রথম অনুপাত থেকে বর্তমান বয়স: $ax$ ও $bx$।`),
        t(r`Add the years to both, set equal to the second ratio.`, r`দুজনের বয়সেই বছর যোগ করে দ্বিতীয় অনুপাতের সমান লেখো।`),
        t('Cross-multiply, solve for $x$, then find the ages.', 'আড়াআড়ি গুণ করে $x$ বের করো, তারপর বয়স বের করো।'),
      ],
      example: {
        question: t('The present ages of A and B are in the ratio $3 : 4$. After $6$ years the ratio will be $4 : 5$. Find their present ages.', 'A ও B-এর বর্তমান বয়সের অনুপাত $3 : 4$। $6$ বছর পরে অনুপাত হবে $4 : 5$। তাদের বর্তমান বয়স কত?'),
        steps: [
          t(r`$\dfrac{3x + 6}{4x + 6} = \dfrac{4}{5}$.`, r`সমীকরণ: $\dfrac{3x + 6}{4x + 6} = \dfrac{4}{5}$।`),
          t(r`$5(3x + 6) = 4(4x + 6)$, so $15x + 30 = 16x + 24$ and $x = 6$.`, r`তাহলে $5(3x + 6) = 4(4x + 6)$, অর্থাৎ $15x + 30 = 16x + 24$ এবং $x = 6$।`),
          t(r`A $= 18$, B $= 24$. Check: after $6$ years, $24 : 30 = 4 : 5$.`, r`A-এর বয়স $18$, B-এর $24$। যাচাই: $6$ বছর পরে $24 : 30 = 4 : 5$।`),
        ],
        answer: t('A is $18$ years and B is $24$ years old.', 'A-এর বয়স $18$ বছর, B-এর $24$ বছর।'),
      },
      tryIt: {
        question: t('The present ages of two sisters are in the ratio $5 : 7$. After $8$ years the ratio will be $7 : 9$. Find the present age of the younger sister.', 'দুই বোনের বর্তমান বয়সের অনুপাত $5 : 7$। $8$ বছর পরে অনুপাত হবে $7 : 9$। ছোটো বোনের বর্তমান বয়স কত?'),
        options: [t('20 years', '20 বছর'), t('28 years', '28 বছর'), t('12 years', '12 বছর'), t('24 years', '24 বছর')],
        correct: 0,
        explanation: [
          t(r`$\dfrac{5x + 8}{7x + 8} = \dfrac{7}{9}$, so $45x + 72 = 49x + 56$.`, r`সমীকরণ: $\dfrac{5x + 8}{7x + 8} = \dfrac{7}{9}$, তাই $45x + 72 = 49x + 56$।`),
          t(r`$4x = 16$, so $x = 4$.`, r`তাহলে $4x = 16$, অর্থাৎ $x = 4$।`),
          t(r`Younger sister $= 5 \times 4 = 20$ years. (Check: $28 : 36 = 7 : 9$.)`, r`ছোটো বোন $= 5 \times 4 = 20$ বছর। (যাচাই: $28 : 36 = 7 : 9$।)`),
        ],
      },
    },
    // 5 ─────────────────────────────────────────────
    {
      key: 'age_at_birth_gap',
      emoji: '👶',
      name: t('"Was ... years old when the child was born"', '"সন্তানের জন্মের সময় বয়স ছিল ..."'),
      spot: t(
        'The question says how old the parent was **when the child was born**. That number is the fixed age gap between them.',
        'প্রশ্নে বলা থাকে **সন্তানের জন্মের সময়** বাবা বা মায়ের বয়স কত ছিল। ওই সংখ্যাটাই দুজনের বয়সের স্থির ব্যবধান।',
      ),
      method: [
        t('Age at the child\'s birth $=$ age gap. This gap never changes.', 'সন্তানের জন্মের সময়ের বয়স $=$ বয়সের ব্যবধান। এই ব্যবধান কখনও বদলায় না।'),
        t(r`Let the child's present age be $x$; parent $= x + \text{gap}$.`, r`সন্তানের বর্তমান বয়স $x$ ধরো; বাবা/মা $= x + \text{ব্যবধান}$।`),
        t('Use the other clue to form an equation and solve.', 'অন্য তথ্য দিয়ে সমীকরণ বানিয়ে সমাধান করো।'),
      ],
      example: {
        question: t('A father was $30$ years old when his son was born. Now the father is $3$ times as old as the son. Find the son\'s present age.', 'ছেলের জন্মের সময় বাবার বয়স ছিল $30$ বছর। এখন বাবার বয়স ছেলের $3$ গুণ। ছেলের বর্তমান বয়স কত?'),
        steps: [
          t(r`Gap $= 30$. Son $= x$, father $= x + 30$.`, r`ব্যবধান $= 30$। ছেলে $= x$, বাবা $= x + 30$।`),
          t(r`$x + 30 = 3x$, so $2x = 30$ and $x = 15$.`, r`তাহলে $x + 30 = 3x$, অর্থাৎ $2x = 30$ এবং $x = 15$।`),
          t('Check: son $15$, father $45$, and $45 = 3 \\times 15$.', 'যাচাই: ছেলে $15$, বাবা $45$, আর $45 = 3 \\times 15$।'),
        ],
        answer: t('The son is $15$ years old.', 'ছেলের বর্তমান বয়স $15$ বছর।'),
      },
      tryIt: {
        question: t('Rina\'s mother was $24$ years old when Rina was born. After $6$ years, the mother\'s age will be twice Rina\'s age. Find Rina\'s present age.', 'রিনার জন্মের সময় তার মায়ের বয়স ছিল $24$ বছর। $6$ বছর পরে মায়ের বয়স হবে রিনার দ্বিগুণ। রিনার বর্তমান বয়স কত?'),
        options: [t('18 years', '18 বছর'), t('24 years', '24 বছর'), t('12 years', '12 বছর'), t('42 years', '42 বছর')],
        correct: 0,
        explanation: [
          t(r`Rina $= x$, mother $= x + 24$. After $6$ years: $x + 6$ and $x + 30$.`, r`রিনা $= x$, মা $= x + 24$। $6$ বছর পরে: $x + 6$ আর $x + 30$।`),
          t(r`$x + 30 = 2(x + 6) = 2x + 12$, so $x = 18$.`, r`সমীকরণ: $x + 30 = 2(x + 6) = 2x + 12$, তাই $x = 18$।`),
          t(r`Check: now $18$ and $42$; after $6$ years $24$ and $48$, and $48 = 2 \times 24$. ($24$ is her age after $6$ years.)`, r`যাচাই: এখন $18$ ও $42$; $6$ বছর পরে $24$ ও $48$, আর $48 = 2 \times 24$। ($24$ হল $6$ বছর পরের বয়স।)`),
        ],
      },
    },
  ],
};
