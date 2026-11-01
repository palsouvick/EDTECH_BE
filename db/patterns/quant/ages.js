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
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“The ages are in the ratio a : b and their sum is S. Find each age.”', '“বয়সের অনুপাত a : b এবং যোগফল S। প্রত্যেকের বয়স কত?”'),
      formula: t(r`Ages $= ax, bx$ where $x = \dfrac{S}{a + b}$ (for a difference $D$, $x = \dfrac{D}{|a - b|}$).`, r`বয়স $= ax, bx$, যেখানে $x = \dfrac{S}{a + b}$ (অন্তর $D$ হলে $x = \dfrac{D}{|a - b|}$)।`),
      shortcut: t('Find one part first (sum ÷ total parts), then multiply by each ratio term — no equation needed.', 'আগে এক অংশ বের করো (যোগফল ÷ মোট অংশ), তারপর প্রতিটি অনুপাতের অংশ দিয়ে গুণ করো — সমীকরণ লাগে না।'),
      trap: t('If the difference is given instead of the sum, divide by the difference of the parts, not by their sum.', 'যোগফলের বদলে অন্তর দেওয়া থাকলে অংশের যোগফল দিয়ে নয়, অংশের অন্তর দিয়ে ভাগ করো।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“The average age of n students is A. Including the teacher it rises by 1. Find the teacher’s age.”', '“n জন ছাত্রের গড় বয়স A। শিক্ষককে ধরলে গড় 1 বাড়ে। শিক্ষকের বয়স কত?”'),
      formula: t(r`New person's age $= (n + 1) \times \text{new average} - n \times \text{old average}$.`, r`নতুন জনের বয়স $= (n + 1) \times \text{নতুন গড়} - n \times \text{আগের গড়}$।`),
      shortcut: t(r`New person's age $=$ new average $+ \, n \times$ (rise in average) — one line, no totals needed.`, r`নতুন জনের বয়স $=$ নতুন গড় $+ \, n \times$ (গড়ের বৃদ্ধি) — এক লাইনে, মোট বের করা লাগে না।`),
      trap: t('After someone joins, the count becomes n + 1. Using the old count for the new total gives a wrong age.', 'কেউ যোগ দিলে সংখ্যা হয় n + 1। নতুন মোটে পুরোনো সংখ্যা ব্যবহার করলে ভুল বয়স আসবে।'),
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
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A father is 3 times as old as his son. After 12 years he will be twice as old.”', '“বাবার বয়স ছেলের 3 গুণ। 12 বছর পরে তিনি হবেন দ্বিগুণ।”'),
      formula: t(r`With younger $= x$ and elder $= mx$ now: after $n$ years, $mx + n = p(x + n)$; $n$ years ago, $mx - n = p(x - n)$.`, r`ছোটোজন $= x$ ও বড়োজন $= mx$ হলে: $n$ বছর পরে $mx + n = p(x + n)$; $n$ বছর আগে $mx - n = p(x - n)$।`),
      shortcut: t(r`For the future case, younger's age $= \dfrac{n(p - 1)}{m - p}$ directly; for the past case use $\dfrac{n(p - 1)}{p - m}$.`, r`ভবিষ্যতের ক্ষেত্রে ছোটোজনের বয়স সরাসরি $= \dfrac{n(p - 1)}{m - p}$; অতীতের ক্ষেত্রে $\dfrac{n(p - 1)}{p - m}$ ব্যবহার করো।`),
      trap: t('The same number of years must be added to (or subtracted from) both ages — shifting only the elder breaks the equation.', 'দুজনের বয়সেই একই বছর যোগ (বা বিয়োগ) করতে হয় — শুধু বড়োজনের বয়স সরালে সমীকরণ ভুল হবে।'),
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
      difficulty: 'intermediate',
      typicalWording: t('“Present ages are in the ratio 3 : 4. After 6 years the ratio will be 4 : 5.”', '“বর্তমান বয়সের অনুপাত 3 : 4। 6 বছর পরে অনুপাত হবে 4 : 5।”'),
      formula: t(r`$\dfrac{ax + n}{bx + n} = \dfrac{c}{d}$ for ages $ax, bx$ after $n$ years (use $-n$ for years ago).`, r`বয়স $ax, bx$ হলে $n$ বছর পরে $\dfrac{ax + n}{bx + n} = \dfrac{c}{d}$ (বছর আগে হলে $-n$ ব্যবহার করো)।`),
      shortcut: t('If both ratios have the same difference of parts, one part equals the years gap directly — read the ages off without cross-multiplying.', 'দুটি অনুপাতের অংশের অন্তর সমান হলে এক অংশ সরাসরি বছরের ব্যবধানের সমান — আড়াআড়ি গুণ ছাড়াই বয়স পড়ে নাও।'),
      trap: t('Never add the years to the ratio parts themselves (3 : 4 does not become 8 : 9 after 5 years); add them to the actual ages ax and bx.', 'অনুপাতের অংশে সরাসরি বছর যোগ করো না (5 বছর পরে 3 : 4, 8 : 9 হয় না); প্রকৃত বয়স ax ও bx-এ যোগ করো।'),
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
      difficulty: 'beginner',
      typicalWording: t('“A father was 30 years old when his son was born. Now he is 3 times as old as the son.”', '“ছেলের জন্মের সময় বাবার বয়স ছিল 30 বছর। এখন তিনি ছেলের 3 গুণ।”'),
      formula: t(r`Parent's age $=$ child's age $+ \, g$, where $g$ is the parent's age at the child's birth.`, r`বাবা/মায়ের বয়স $=$ সন্তানের বয়স $+ \, g$, যেখানে $g$ হল সন্তানের জন্মের সময় বাবা/মায়ের বয়স।`),
      shortcut: t('Treat the age at the birth as the ready-made difference and write the parent as child + gap at once — no second variable needed.', 'জন্মের সময়ের বয়সকে তৈরি অন্তর ধরে বাবা/মাকে সরাসরি সন্তান + ব্যবধান লেখো — দ্বিতীয় চলক লাগে না।'),
      trap: t('That number is the gap, not the parent\'s present age and not the child\'s age — do not use it as either one directly.', 'ওই সংখ্যাটি ব্যবধান, বাবা/মায়ের বর্তমান বয়সও নয়, সন্তানের বয়সও নয় — সরাসরি কোনোটি হিসেবে ব্যবহার করো না।'),
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
    // 6 ─────────────────────────────────────────────
    {
      key: 'married_years_event',
      emoji: '💍',
      name: t('Marriage and birth timeline events', 'বিয়ে ও জন্মের সময়রেখার ঘটনা'),
      difficulty: 'beginner',
      typicalWording: t('“He was 25 when he married 8 years ago. His son was born 3 years after the marriage.”', '“8 বছর আগে বিয়ের সময় তার বয়স ছিল 25। বিয়ের 3 বছর পরে ছেলের জন্ম হয়।”'),
      formula: t(r`Present age $=$ age at marriage $+$ years since marriage; child's age $=$ years since marriage $-$ years from marriage to birth.`, r`বর্তমান বয়স $=$ বিয়ের সময়ের বয়স $+$ বিয়ের পর কেটে যাওয়া বছর; সন্তানের বয়স $=$ বিয়ের পরের বছর $-$ বিয়ে থেকে জন্ম পর্যন্ত বছর।`),
      shortcut: t('Draw one timeline: marriage point, birth point, today. Every age is just a distance between two points on it.', 'একটি সময়রেখা আঁকো: বিয়ের বিন্দু, জন্মের বিন্দু, আজ। প্রতিটি বয়স হল রেখার দুটি বিন্দুর দূরত্ব।'),
      trap: t('“Born 3 years after marriage” counts from the wedding, not from today — subtract it from the years since marriage, do not add it.', '“বিয়ের 3 বছর পরে জন্ম” বিয়ে থেকে গোনা হয়, আজ থেকে নয় — বিয়ের পরের বছর থেকে বিয়োগ করো, যোগ নয়।'),
      spot: t(
        'The story is anchored to an **event** — “married $n$ years ago”, “the son was born $k$ years after the marriage” — and ages at that event are given.',
        'গল্পটি একটি **ঘটনা**-কে কেন্দ্র করে — “$n$ বছর আগে বিয়ে হয়েছিল”, “বিয়ের $k$ বছর পরে ছেলের জন্ম” — এবং সেই ঘটনার সময়ের বয়স দেওয়া থাকে।',
      ),
      method: [
        t('Put the events in order on a timeline: marriage, then the birth, then today.', 'ঘটনাগুলো সময়রেখায় সাজাও: বিয়ে, তারপর জন্ম, তারপর আজ।'),
        t('Present age of the married person = age at marriage + years since the marriage.', 'বিবাহিত জনের বর্তমান বয়স = বিয়ের সময়ের বয়স + বিয়ের পরের বছর।'),
        t('Child\'s present age = years since marriage − years from marriage to the birth.', 'সন্তানের বর্তমান বয়স = বিয়ের পরের বছর − বিয়ে থেকে জন্ম পর্যন্ত বছর।'),
      ],
      example: {
        question: t('Ramesh was $25$ years old when he got married $8$ years ago. His son was born $3$ years after the marriage. How old is the son now?', 'রমেশের বিয়ে হয়েছিল $8$ বছর আগে, তখন তার বয়স ছিল $25$ বছর। বিয়ের $3$ বছর পরে তার ছেলের জন্ম হয়। ছেলের বর্তমান বয়স কত?'),
        steps: [
          t(r`Ramesh now $= 25 + 8 = 33$ years.`, r`রমেশের বর্তমান বয়স $= 25 + 8 = 33$ বছর।`),
          t(r`The son was born $8 - 3 = 5$ years ago.`, r`ছেলের জন্ম হয়েছিল $8 - 3 = 5$ বছর আগে।`),
          t(r`So the son is $5$ years old now.`, r`তাই ছেলের বর্তমান বয়স $5$ বছর।`),
        ],
        answer: t('The son is $5$ years old.', 'ছেলের বয়স $5$ বছর।'),
      },
      tryIt: {
        question: t('A woman got married $12$ years ago at the age of $24$. Her daughter was born $5$ years after the marriage. How old is the daughter now?', 'একজন মহিলার বিয়ে হয়েছিল $12$ বছর আগে, তখন তার বয়স ছিল $24$ বছর। বিয়ের $5$ বছর পরে তার মেয়ের জন্ম হয়। মেয়ের বর্তমান বয়স কত?'),
        options: [t('5 years', '5 বছর'), t('12 years', '12 বছর'), t('7 years', '7 বছর'), t('17 years', '17 বছর')],
        correct: 2,
        explanation: [
          t(r`Years since the marriage $= 12$; the daughter was born $5$ years into it.`, r`বিয়ের পর কেটেছে $12$ বছর; মেয়ের জন্ম বিয়ের $5$ বছর পরে।`),
          t(r`Daughter's age $= 12 - 5 = 7$ years. ($17$ wrongly adds the two numbers.)`, r`মেয়ের বয়স $= 12 - 5 = 7$ বছর। ($17$ ভুল করে দুটি সংখ্যা যোগ করে পাওয়া।)`),
        ],
      },
    },
    // 7 ─────────────────────────────────────────────
    {
      key: 'chain_multiple_ages',
      emoji: '🔗',
      name: t('Chain of multiples: A of B, B of C', 'গুণের শৃঙ্খল: A, B-এর গুণ; B, C-এর গুণ'),
      difficulty: 'beginner',
      typicalWording: t('“A is twice as old as B, B is three times as old as C, and C is 8.”', '“A-এর বয়স B-এর দ্বিগুণ, B-এর বয়স C-এর তিনগুণ, আর C-এর বয়স 8।”'),
      formula: t(r`If $A = mB$ and $B = nC$, then $A = mnC$ — multiply along the chain.`, r`$A = mB$ এবং $B = nC$ হলে $A = mnC$ — শৃঙ্খল বরাবর গুণ করো।`),
      shortcut: t('Start from the one age actually given (usually the youngest) and multiply step by step up the chain.', 'যে একজনের বয়স সত্যিই দেওয়া আছে (সাধারণত সবচেয়ে ছোটোজন) সেখান থেকে শুরু করে ধাপে ধাপে গুণ করে উপরে ওঠো।'),
      trap: t('“A is twice B” means A is the bigger one. Reversing one link of the chain flips every age after it.', '“A, B-এর দ্বিগুণ” মানে A বড়ো। শৃঙ্খলের একটি ধাপ উল্টে দিলে তার পরের সব বয়স উল্টে যাবে।'),
      spot: t(
        'Three (or more) people are linked in a chain: **A is so-many times B, B is so-many times C**, and one age in the chain is given.',
        'তিনজন (বা বেশি) একটি শৃঙ্খলে যুক্ত: **A, B-এর এত গুণ; B, C-এর এত গুণ**, আর শৃঙ্খলের একজনের বয়স দেওয়া থাকে।',
      ),
      method: [
        t('Find the person whose age is given and start there.', 'যার বয়স দেওয়া আছে তাকে খুঁজে সেখান থেকে শুরু করো।'),
        t('Move one link at a time, multiplying by the stated multiple.', 'একটি করে ধাপ এগিয়ে বলা গুণ দিয়ে গুণ করো।'),
        t('The last multiplication gives the eldest person\'s age; add up only if a total is asked.', 'শেষ গুণে সবচেয়ে বড়োজনের বয়স পাবে; মোট চাইলে তবেই যোগ করো।'),
      ],
      example: {
        question: t('A is twice as old as B. B is $3$ times as old as C. If C is $8$ years old, how old is A?', 'A-এর বয়স B-এর দ্বিগুণ। B-এর বয়স C-এর $3$ গুণ। C-এর বয়স $8$ বছর হলে A-এর বয়স কত?'),
        steps: [
          t(r`$C = 8$, so $B = 3 \times 8 = 24$.`, r`$C = 8$, তাই $B = 3 \times 8 = 24$।`),
          t(r`$A = 2 \times B = 2 \times 24 = 48$.`, r`তাই $A = 2 \times B = 2 \times 24 = 48$।`),
          t(r`Check the chain: $8 \to 24 \to 48$, each step the stated multiple.`, r`শৃঙ্খল যাচাই: $8 \to 24 \to 48$, প্রতিটি ধাপে বলা গুণ ঠিক আছে।`),
        ],
        answer: t('A is $48$ years old.', 'A-এর বয়স $48$ বছর।'),
      },
      tryIt: {
        question: t('P is twice as old as Q. Q is twice as old as R. If R is $9$ years old, how old is P?', 'P-এর বয়স Q-এর দ্বিগুণ। Q-এর বয়স R-এর দ্বিগুণ। R-এর বয়স $9$ বছর হলে P-এর বয়স কত?'),
        options: [t('18 years', '18 বছর'), t('27 years', '27 বছর'), t('36 years', '36 বছর'), t('45 years', '45 বছর')],
        correct: 2,
        explanation: [
          t(r`$R = 9$, so $Q = 2 \times 9 = 18$.`, r`$R = 9$, তাই $Q = 2 \times 9 = 18$।`),
          t(r`$P = 2 \times 18 = 36$ years. ($18$ is only Q's age — one link short.)`, r`$P = 2 \times 18 = 36$ বছর। ($18$ শুধু Q-এর বয়স — এক ধাপ কম।)`),
        ],
      },
    },
    // 8 ─────────────────────────────────────────────
    {
      key: 'ratio_terms_add_years',
      emoji: '➕',
      name: t('How many years to add to reach a target ratio', 'লক্ষ্য অনুপাতে পৌঁছাতে কত বছর যোগ করতে হবে'),
      difficulty: 'intermediate',
      typicalWording: t('“Their ages are 20 and 30. After how many years will the ratio be 3 : 4?”', '“তাদের বয়স 20 ও 30। কত বছর পরে অনুপাত হবে 3 : 4?”'),
      formula: t(r`$\dfrac{A + x}{B + x} = \dfrac{c}{d}$, where $x$ is the unknown number of years.`, r`$\dfrac{A + x}{B + x} = \dfrac{c}{d}$, যেখানে $x$ হল অজানা বছরসংখ্যা।`),
      shortcut: t('Cross-multiply at once: the x-terms nearly cancel, leaving a one-step subtraction and division.', 'সরাসরি আড়াআড়ি গুণ করো: x-এর পদ প্রায় কেটে যায়, এক ধাপ বিয়োগ ও ভাগই বাকি থাকে।'),
      trap: t('The unknown here is the years, not the ages — and the same x is added to both ages, never to the ratio parts.', 'এখানে অজানা হল বছর, বয়স নয় — আর একই x দুজনের বয়সেই যোগ হয়, অনুপাতের অংশে কখনও নয়।'),
      spot: t(
        'Both **present ages are given as plain numbers**, and the question asks **after how many years** their ratio will become a stated ratio.',
        'দুজনের **বর্তমান বয়স সাধারণ সংখ্যায় দেওয়া** থাকে, আর প্রশ্নে জানতে চাওয়া হয় **কত বছর পরে** তাদের অনুপাত একটি নির্দিষ্ট অনুপাত হবে।',
      ),
      method: [
        t(r`Let the years to be added be $x$; both ages become $A + x$ and $B + x$.`, r`যোগ করতে হবে এমন বছর $x$ ধরো; দুজনের বয়স হবে $A + x$ ও $B + x$।`),
        t('Set the new ratio equal to the target ratio.', 'নতুন অনুপাতকে লক্ষ্য অনুপাতের সমান লেখো।'),
        t('Cross-multiply and solve the simple linear equation for $x$.', 'আড়াআড়ি গুণ করে সরল সমীকরণ থেকে $x$ বের করো।'),
      ],
      example: {
        question: t('The ages of A and B are $20$ years and $30$ years. After how many years will the ratio of their ages be $3 : 4$?', 'A ও B-এর বয়স $20$ বছর ও $30$ বছর। কত বছর পরে তাদের বয়সের অনুপাত হবে $3 : 4$?'),
        steps: [
          t(r`$\dfrac{20 + x}{30 + x} = \dfrac{3}{4}$.`, r`সমীকরণ: $\dfrac{20 + x}{30 + x} = \dfrac{3}{4}$।`),
          t(r`$4(20 + x) = 3(30 + x)$, so $80 + 4x = 90 + 3x$.`, r`তাহলে $4(20 + x) = 3(30 + x)$, অর্থাৎ $80 + 4x = 90 + 3x$।`),
          t(r`$x = 10$. Check: $30 : 40 = 3 : 4$.`, r`$x = 10$। যাচাই: $30 : 40 = 3 : 4$।`),
        ],
        answer: t('After $10$ years.', '$10$ বছর পরে।'),
      },
      tryIt: {
        question: t('The ages of two brothers are $24$ years and $36$ years. After how many years will the ratio of their ages be $3 : 4$?', 'দুই ভাইয়ের বয়স $24$ বছর ও $36$ বছর। কত বছর পরে তাদের বয়সের অনুপাত হবে $3 : 4$?'),
        options: [t('6 years', '6 বছর'), t('12 years', '12 বছর'), t('10 years', '10 বছর'), t('18 years', '18 বছর')],
        correct: 1,
        explanation: [
          t(r`$\dfrac{24 + x}{36 + x} = \dfrac{3}{4}$, so $96 + 4x = 108 + 3x$.`, r`সমীকরণ: $\dfrac{24 + x}{36 + x} = \dfrac{3}{4}$, তাই $96 + 4x = 108 + 3x$।`),
          t(r`$x = 12$ years. Check: $36 : 48 = 3 : 4$.`, r`$x = 12$ বছর। যাচাই: $36 : 48 = 3 : 4$।`),
        ],
      },
    },
    // 9 ─────────────────────────────────────────────
    {
      key: 'family_total_with_newborn',
      emoji: '👨‍👩‍👧',
      name: t('Family total with a baby born in between', 'মাঝখানে শিশু জন্মানোসহ পরিবারের মোট বয়স'),
      difficulty: 'intermediate',
      typicalWording: t('“4 years ago the average of a family of 4 was 18. A baby has since been born and now the average of 5 is 18.”', '“4 বছর আগে 4 জনের পরিবারের গড় ছিল 18। এর মধ্যে একটি শিশু জন্মেছে, এখন 5 জনের গড় 18।”'),
      formula: t(r`Baby's age $=$ (new count $\times$ present average) $-$ (old total $+$ old count $\times$ years passed).`, r`শিশুর বয়স $=$ (নতুন সংখ্যা $\times$ বর্তমান গড়) $-$ (আগের মোট $+$ আগের সংখ্যা $\times$ কেটে যাওয়া বছর)।`),
      shortcut: t('First grow the old members\' total to today (add years per person), then subtract it from today\'s full total — the leftover is the baby.', 'আগে পুরোনো সদস্যদের মোট আজ পর্যন্ত বাড়াও (মাথাপিছু বছর যোগ), তারপর আজকের পূর্ণ মোট থেকে বিয়োগ করো — বাকিটাই শিশু।'),
      trap: t('The baby was not there years ago: do not add the passed years to the baby, and do not use the old count for today\'s total.', 'বছর আগে শিশুটি ছিল না: শিশুর বয়সে কেটে যাওয়া বছর যোগ করো না, আর আজকের মোটে পুরোনো সংখ্যা ব্যবহার করো না।'),
      spot: t(
        'A family average from **some years ago** is given for the old members only; a **baby born since then** joins the count in today\'s average.',
        'কয়েক **বছর আগের** পরিবারের গড় দেওয়া থাকে শুধু পুরোনো সদস্যদের জন্য; **এর মধ্যে জন্মানো শিশু** আজকের গড়ে সংখ্যায় যোগ হয়।',
      ),
      method: [
        t('Old total then = old count × old average.', 'তখনকার মোট = আগের সংখ্যা × আগের গড়।'),
        t('Grow it to today: add (years passed × old count) — the baby gets nothing.', 'আজ পর্যন্ত বাড়াও: (কেটে যাওয়া বছর × আগের সংখ্যা) যোগ করো — শিশু কিছু পায় না।'),
        t('Today\'s total of everyone = new count × present average.', 'আজ সবার মোট = নতুন সংখ্যা × বর্তমান গড়।'),
        t('Baby\'s age = today\'s total − grown old total.', 'শিশুর বয়স = আজকের মোট − বাড়ানো পুরোনো মোট।'),
      ],
      example: {
        question: t('$4$ years ago, the average age of a family of $4$ was $18$ years. A baby was born during this time, and the average age of the family of $5$ is still $18$ years today. How old is the baby?', '$4$ বছর আগে $4$ জনের একটি পরিবারের গড় বয়স ছিল $18$ বছর। এই সময়ের মধ্যে একটি শিশুর জন্ম হয়েছে, আর আজ $5$ জনের পরিবারের গড় বয়স এখনও $18$ বছর। শিশুটির বয়স কত?'),
        steps: [
          t(r`Total $4$ years ago $= 4 \times 18 = 72$.`, r`$4$ বছর আগে মোট বয়স $= 4 \times 18 = 72$।`),
          t(r`Those $4$ members today total $72 + 4 \times 4 = 88$.`, r`সেই $4$ জনের আজকের মোট $= 72 + 4 \times 4 = 88$।`),
          t(r`All $5$ today total $5 \times 18 = 90$, so the baby $= 90 - 88 = 2$ years.`, r`আজ $5$ জনের মোট $= 5 \times 18 = 90$, তাই শিশু $= 90 - 88 = 2$ বছর।`),
        ],
        answer: t('The baby is $2$ years old.', 'শিশুটির বয়স $2$ বছর।'),
      },
      tryIt: {
        question: t('$5$ years ago, the average age of a family of $5$ was $20$ years. A baby was born during this time, and the average age of the family of $6$ is $21$ years today. How old is the baby?', '$5$ বছর আগে $5$ জনের একটি পরিবারের গড় বয়স ছিল $20$ বছর। এই সময়ের মধ্যে একটি শিশুর জন্ম হয়েছে, আর আজ $6$ জনের পরিবারের গড় বয়স $21$ বছর। শিশুটির বয়স কত?'),
        options: [t('6 years', '6 বছর'), t('1 year', '1 বছর'), t('5 years', '5 বছর'), t('3 years', '3 বছর')],
        correct: 1,
        explanation: [
          t(r`Total $5$ years ago $= 5 \times 20 = 100$; those $5$ today total $100 + 5 \times 5 = 125$.`, r`$5$ বছর আগে মোট $= 5 \times 20 = 100$; সেই $5$ জনের আজকের মোট $= 100 + 5 \times 5 = 125$।`),
          t(r`All $6$ today total $6 \times 21 = 126$, so the baby $= 126 - 125 = 1$ year.`, r`আজ $6$ জনের মোট $= 6 \times 21 = 126$, তাই শিশু $= 126 - 125 = 1$ বছর।`),
        ],
      },
    },
    // 10 ─────────────────────────────────────────────
    {
      key: 'average_age_family_future',
      emoji: '📅',
      name: t('Average age of a family after some years', 'কয়েক বছর পরে পরিবারের গড় বয়স'),
      difficulty: 'intermediate',
      typicalWording: t('“The average age of a family of 6 is 27. What will the total be after 5 years?”', '“6 জনের পরিবারের গড় বয়স 27। 5 বছর পরে মোট বয়স কত হবে?”'),
      formula: t(r`$\text{Average}_{+n} = \text{Average} + n$ and $\text{Total}_{+n} = \text{Total} + N \times n$ for $N$ unchanged members.`, r`$N$ জন সদস্য অপরিবর্তিত থাকলে $\text{গড়}_{+n} = \text{গড়} + n$ এবং $\text{মোট}_{+n} = \text{মোট} + N \times n$।`),
      shortcut: t('The average simply rises by the number of years — add n to the average first, then multiply by the count only if a total is asked.', 'গড় সরাসরি বছরসংখ্যা পরিমাণ বাড়ে — আগে গড়ে n যোগ করো, মোট চাইলেই কেবল সংখ্যা দিয়ে গুণ করো।'),
      trap: t('The total grows by n per person, not by n once. Adding just n to the family total is the classic wrong option.', 'মোট বাড়ে মাথাপিছু n করে, একবারে n নয়। পরিবারের মোটে শুধু n যোগ করাটাই চেনা ভুল বিকল্প।'),
      spot: t(
        'The **same family** (nobody joins or leaves) is asked about at a **later time** — its average or total age after some years.',
        '**একই পরিবার** (কেউ যোগ দেয় না বা ছাড়ে না) সম্পর্কে **পরের সময়ে** জানতে চাওয়া হয় — কয়েক বছর পরে তার গড় বা মোট বয়স।',
      ),
      method: [
        t('Keep the number of members fixed — nobody is added or removed.', 'সদস্যসংখ্যা স্থির রাখো — কেউ যোগ বা বাদ হয় না।'),
        t('New average = old average + years passed (every member grows by the same years).', 'নতুন গড় = পুরোনো গড় + কেটে যাওয়া বছর (প্রত্যেক সদস্য একই বছর বাড়ে)।'),
        t('If a total is asked: new total = new average × count (or old total + count × years).', 'মোট চাইলে: নতুন মোট = নতুন গড় × সংখ্যা (বা পুরোনো মোট + সংখ্যা × বছর)।'),
      ],
      example: {
        question: t('The average age of a family of $6$ members is $27$ years. What will the total age of the family be after $5$ years?', '$6$ জন সদস্যের একটি পরিবারের গড় বয়স $27$ বছর। $5$ বছর পরে পরিবারের মোট বয়স কত হবে?'),
        steps: [
          t(r`After $5$ years the average $= 27 + 5 = 32$ years.`, r`$5$ বছর পরে গড় $= 27 + 5 = 32$ বছর।`),
          t(r`Total then $= 6 \times 32 = 192$ years.`, r`তখন মোট বয়স $= 6 \times 32 = 192$ বছর।`),
          t(r`Check the other way: present total $= 162$, plus $6 \times 5 = 30$, gives $192$.`, r`অন্যভাবে যাচাই: বর্তমান মোট $= 162$, সঙ্গে $6 \times 5 = 30$, মোট $192$।`),
        ],
        answer: t('The total age will be $192$ years.', 'মোট বয়স হবে $192$ বছর।'),
      },
      tryIt: {
        question: t('After $7$ years, the average age of a family of $5$ members will be $35$ years. What is the total of their present ages?', '$7$ বছর পরে $5$ জন সদস্যের একটি পরিবারের গড় বয়স হবে $35$ বছর। তাদের বর্তমান বয়সের মোট কত?'),
        options: [t('175 years', '175 বছর'), t('140 years', '140 বছর'), t('168 years', '168 বছর'), t('150 years', '150 বছর')],
        correct: 1,
        explanation: [
          t(r`Present average $= 35 - 7 = 28$ years (run the shift backwards).`, r`বর্তমান গড় $= 35 - 7 = 28$ বছর (সময়ের সরানো উল্টো দিকে চালাও)।`),
          t(r`Present total $= 5 \times 28 = 140$ years. ($175$ forgets to subtract the $7$ years.)`, r`বর্তমান মোট $= 5 \times 28 = 140$ বছর। ($175$ হলে $7$ বছর বিয়োগ করতে ভুলে গেছ।)`),
        ],
      },
    },
    // 11 ─────────────────────────────────────────────
    {
      key: 'sum_product_ages',
      emoji: '✖️',
      name: t('Ages from sum and product', 'যোগফল ও গুণফল থেকে বয়স'),
      difficulty: 'advanced',
      typicalWording: t('“The sum of two ages is 25 and their product is 144. Find the ages.”', '“দুজনের বয়সের যোগফল 25 এবং গুণফল 144। বয়স দুটি কত?”'),
      formula: t(r`The ages are the roots of $x^2 - Sx + P = 0$; difference $= \sqrt{S^2 - 4P}$.`, r`বয়স দুটি $x^2 - Sx + P = 0$ সমীকরণের বীজ; অন্তর $= \sqrt{S^2 - 4P}$।`),
      shortcut: t('List factor pairs of the product and pick the pair whose sum matches — faster than the quadratic formula for exam-sized numbers.', 'গুণফলের গুণনীয়ক জোড়াগুলো লেখো এবং যেটির যোগফল মিলে যায় সেটি নাও — পরীক্ষার আকারের সংখ্যায় দ্বিঘাত সূত্রের থেকে দ্রুত।'),
      trap: t('A sum of squares clue is not the sum: use $a^2 + b^2 = S^2 - 2P$ to recover the product before splitting the ages.', 'বর্গের যোগফলের তথ্য যোগফল নয়: বয়স ভাগ করার আগে $a^2 + b^2 = S^2 - 2P$ দিয়ে গুণফল বের করো।'),
      spot: t(
        'Instead of a ratio, the question gives the **sum and the product** (or the sum of squares) of two ages.',
        'অনুপাতের বদলে প্রশ্নে দুজনের বয়সের **যোগফল ও গুণফল** (বা বর্গের যোগফল) দেওয়া থাকে।',
      ),
      method: [
        t('Write the two ages as the pair with the given sum S and product P.', 'দুটি বয়সকে সেই জোড়া হিসেবে লেখো যার যোগফল S ও গুণফল P।'),
        t(r`Use the difference: $\sqrt{S^2 - 4P}$, or factor $x^2 - Sx + P$.`, r`অন্তর ব্যবহার করো: $\sqrt{S^2 - 4P}$, অথবা $x^2 - Sx + P$-এর উৎপাদক বিশ্লেষণ করো।`),
        t('Ages = (S − difference) ÷ 2 and (S + difference) ÷ 2.', 'বয়স = (S − অন্তর) ÷ 2 এবং (S + অন্তর) ÷ 2।'),
        t('Check both clues: the pair must match the sum and the product.', 'দুটি তথ্যই যাচাই করো: জোড়াটির যোগফল ও গুণফল দুটোই মিলতে হবে।'),
      ],
      example: {
        question: t('The sum of the ages of two brothers is $25$ years and the product of their ages is $144$. Find their ages.', 'দুই ভাইয়ের বয়সের যোগফল $25$ বছর এবং বয়সের গুণফল $144$। তাদের বয়স কত?'),
        steps: [
          t(r`Difference $= \sqrt{25^2 - 4 \times 144} = \sqrt{625 - 576} = \sqrt{49} = 7$.`, r`অন্তর $= \sqrt{25^2 - 4 \times 144} = \sqrt{625 - 576} = \sqrt{49} = 7$।`),
          t(r`Younger $= (25 - 7) \div 2 = 9$; elder $= (25 + 7) \div 2 = 16$.`, r`ছোটোজন $= (25 - 7) \div 2 = 9$; বড়োজন $= (25 + 7) \div 2 = 16$।`),
          t(r`Check: $9 + 16 = 25$ and $9 \times 16 = 144$.`, r`যাচাই: $9 + 16 = 25$ এবং $9 \times 16 = 144$।`),
        ],
        answer: t('The brothers are $9$ and $16$ years old.', 'ভাইদের বয়স $9$ ও $16$ বছর।'),
      },
      tryIt: {
        question: t('The sum of the ages of two sisters is $27$ years and the product of their ages is $182$. Find their ages.', 'দুই বোনের বয়সের যোগফল $27$ বছর এবং বয়সের গুণফল $182$। তাদের বয়স কত?'),
        options: [t('12 and 15 years', '12 ও 15 বছর'), t('13 and 14 years', '13 ও 14 বছর'), t('11 and 16 years', '11 ও 16 বছর'), t('10 and 17 years', '10 ও 17 বছর')],
        correct: 1,
        explanation: [
          t(r`Difference $= \sqrt{27^2 - 4 \times 182} = \sqrt{729 - 728} = 1$.`, r`অন্তর $= \sqrt{27^2 - 4 \times 182} = \sqrt{729 - 728} = 1$।`),
          t(r`Ages $= (27 - 1) \div 2 = 13$ and $(27 + 1) \div 2 = 14$. Check: $13 \times 14 = 182$.`, r`বয়স $= (27 - 1) \div 2 = 13$ এবং $(27 + 1) \div 2 = 14$। যাচাই: $13 \times 14 = 182$।`),
        ],
      },
    },
    // 12 ─────────────────────────────────────────────
    {
      key: 'two_conditions_past_future',
      emoji: '⏪⏩',
      name: t('Two conditions: one past, one future', 'দুটি শর্ত: একটি অতীতে, একটি ভবিষ্যতে'),
      difficulty: 'advanced',
      typicalWording: t('“5 years ago the father was 7 times the son; 5 years hence he will be 3 times.”', '“5 বছর আগে বাবা ছিলেন ছেলের 7 গুণ; 5 বছর পরে হবেন 3 গুণ।”'),
      formula: t(r`From the past: $F - n = p(S - n)$; from the future: $F + n = q(S + n)$ — solve the pair for $F, S$.`, r`অতীত থেকে: $F - n = p(S - n)$; ভবিষ্যৎ থেকে: $F + n = q(S + n)$ — জোড়া সমীকরণ সমাধান করে $F, S$ বের করো।`),
      shortcut: t('Express the elder\'s age from both equations and equate the two expressions — one unknown, one step.', 'দুটি সমীকরণ থেকেই বড়োজনের বয়স প্রকাশ করে দুটি রাশিকে সমান করো — একটিই অজানা, এক ধাপ।'),
      trap: t('The past condition uses minus on both ages and the future one plus on both; mixing a minus with a plus in one equation ruins it.', 'অতীতের শর্তে দুজনের বয়সেই বিয়োগ, ভবিষ্যতের শর্তে দুজনেরই যোগ; এক সমীকরণে বিয়োগ-যোগ গুলিয়ে ফেললে সব নষ্ট।'),
      spot: t(
        'No present-age clue is given at all: one “times” condition belongs to a **past** year and the other to a **future** year, and the present ages must be recovered from the pair.',
        'বর্তমান বয়সের কোনো তথ্যই দেওয়া থাকে না: একটি “গুণ”-এর শর্ত **অতীতের** বছরের, অন্যটি **ভবিষ্যতের** বছরের, আর জোড়া শর্ত থেকেই বর্তমান বয়স বের করতে হয়।',
      ),
      method: [
        t(r`Let the present ages be $S$ (younger) and $F$ (elder) — two unknowns, so two equations are needed.`, r`বর্তমান বয়স $S$ (ছোটোজন) ও $F$ (বড়োজন) ধরো — দুটি অজানা, তাই দুটি সমীকরণ লাগবে।`),
        t('Write the past equation with −n on both ages and the stated multiple.', 'বলা গুণ দিয়ে দুজনের বয়সে −n ব্যবহার করে অতীতের সমীকরণ লেখো।'),
        t('Write the future equation with +n on both ages and its multiple.', 'তার গুণ দিয়ে দুজনের বয়সে +n ব্যবহার করে ভবিষ্যতের সমীকরণ লেখো।'),
        t('Solve the pair (express F from each and equate), then state the present ages.', 'জোড়াটি সমাধান করো (প্রতিটি থেকে F প্রকাশ করে সমান করো), তারপর বর্তমান বয়স বলো।'),
      ],
      example: {
        question: t('$5$ years ago, a father was $7$ times as old as his son. $5$ years from now, he will be $3$ times as old as his son. Find their present ages.', '$5$ বছর আগে বাবার বয়স ছিল ছেলের $7$ গুণ। $5$ বছর পরে বাবার বয়স হবে ছেলের $3$ গুণ। তাদের বর্তমান বয়স কত?'),
        steps: [
          t(r`Past: $F - 5 = 7(S - 5)$, so $F = 7S - 30$.`, r`অতীত: $F - 5 = 7(S - 5)$, তাই $F = 7S - 30$।`),
          t(r`Future: $F + 5 = 3(S + 5)$, so $F = 3S + 10$.`, r`ভবিষ্যৎ: $F + 5 = 3(S + 5)$, তাই $F = 3S + 10$।`),
          t(r`$7S - 30 = 3S + 10$, so $4S = 40$ and $S = 10$; then $F = 40$.`, r`$7S - 30 = 3S + 10$, তাই $4S = 40$ এবং $S = 10$; তারপর $F = 40$।`),
          t(r`Check: $35 = 7 \times 5$ then, and $45 = 3 \times 15$ later.`, r`যাচাই: তখন $35 = 7 \times 5$, পরে $45 = 3 \times 15$।`),
        ],
        answer: t('The father is $40$ years and the son is $10$ years old.', 'বাবার বয়স $40$ বছর, ছেলের $10$ বছর।'),
      },
      tryIt: {
        question: t('$5$ years ago, a mother was $5$ times as old as her daughter. $5$ years from now, she will be $3$ times as old as her daughter. Find the mother\'s present age.', '$5$ বছর আগে মায়ের বয়স ছিল মেয়ের $5$ গুণ। $5$ বছর পরে মায়ের বয়স হবে মেয়ের $3$ গুণ। মায়ের বর্তমান বয়স কত?'),
        options: [t('50 years', '50 বছর'), t('60 years', '60 বছর'), t('55 years', '55 বছর'), t('45 years', '45 বছর')],
        correct: 2,
        explanation: [
          t(r`Past: $F = 5S - 20$. Future: $F = 3S + 10$. Equating: $5S - 20 = 3S + 10$.`, r`অতীত: $F = 5S - 20$। ভবিষ্যৎ: $F = 3S + 10$। সমান করে: $5S - 20 = 3S + 10$।`),
          t(r`$2S = 30$, so $S = 15$ and mother $F = 5 \times 15 - 20 = 55$ years.`, r`$2S = 30$, তাই $S = 15$ এবং মা $F = 5 \times 15 - 20 = 55$ বছর।`),
          t(r`Check: $50 = 5 \times 10$ then, and $60 = 3 \times 20$ later.`, r`যাচাই: তখন $50 = 5 \times 10$, পরে $60 = 3 \times 20$।`),
        ],
      },
    },
    // 13 ─────────────────────────────────────────────
    {
      key: 'constant_difference_ratio',
      emoji: '📏',
      name: t('Constant difference fixes the ratio scale', 'ধ্রুবক অন্তর দিয়ে অনুপাতের মাপ ঠিক করা'),
      difficulty: 'advanced',
      typicalWording: t('“6 years ago the ratio was 5 : 7 and 6 years hence it will be 7 : 9.”', '“6 বছর আগে অনুপাত ছিল 5 : 7 এবং 6 বছর পরে হবে 7 : 9।”'),
      formula: t(r`Scale both ratios so their part-differences are equal; then change in parts $=$ years between the two times, giving one part in years.`, r`দুটি অনুপাতকে এমনভাবে মাপ বদলাও যাতে অংশের অন্তর সমান হয়; তখন অংশের পরিবর্তন $=$ দুই সময়ের মাঝের বছর, ফলে এক অংশের মান বছরে পাওয়া যায়।`),
      shortcut: t('When both ratios already share the same part-difference, skip the algebra: one part = total years gap ÷ change in parts.', 'দুটি অনুপাতের অংশের অন্তর আগেই সমান থাকলে বীজগণিত বাদ দাও: এক অংশ = মোট বছরের ব্যবধান ÷ অংশের পরিবর্তন।'),
      trap: t('Ratio parts from two different times are not the same size until the differences are equalised — using one part value for both ratios directly is wrong.', 'অন্তর সমান না করা পর্যন্ত দুই ভিন্ন সময়ের অনুপাতের অংশের মাপ এক নয় — দুটি অনুপাতেই একই অংশের মান সরাসরি ব্যবহার করা ভুল।'),
      spot: t(
        'Ratios are given at **two different times** (past and future) with no ages at all; the bridge is that the **age difference is the same** at both times.',
        '**দুই ভিন্ন সময়ের** (অতীত ও ভবিষ্যৎ) অনুপাত দেওয়া থাকে, কোনো বয়সই দেওয়া থাকে না; সেতু হল এই যে **বয়সের অন্তর দুই সময়েই একই**।',
      ),
      method: [
        t('Find the difference of parts in each ratio; scale a ratio if the differences do not match.', 'প্রতিটি অনুপাতে অংশের অন্তর বের করো; না মিললে একটি অনুপাতের মাপ বদলাও।'),
        t('The rise in each person\'s parts happens over the total years between the two times.', 'প্রত্যেকের অংশের বৃদ্ধি ঘটে দুই সময়ের মোট বছরের ব্যবধানে।'),
        t('One part = total years ÷ rise in parts.', 'এক অংশ = মোট বছর ÷ অংশের বৃদ্ধি।'),
        t('Get the ages at one time from its ratio, then shift to the present.', 'একটি সময়ের অনুপাত থেকে সেই সময়ের বয়স বের করো, তারপর বর্তমানে সরাও।'),
      ],
      example: {
        question: t('$6$ years ago, the ages of A and B were in the ratio $5 : 7$. $6$ years from now, their ages will be in the ratio $7 : 9$. Find their present ages.', '$6$ বছর আগে A ও B-এর বয়সের অনুপাত ছিল $5 : 7$। $6$ বছর পরে তাদের বয়সের অনুপাত হবে $7 : 9$। তাদের বর্তমান বয়স কত?'),
        steps: [
          t(r`Both ratios have part-difference $2$, so the parts are already the same size.`, r`দুটি অনুপাতেই অংশের অন্তর $2$, তাই অংশের মাপ আগেই সমান।`),
          t(r`Each person's parts rise by $2$ over $6 + 6 = 12$ years, so one part $= 12 \div 2 = 6$ years.`, r`প্রত্যেকের অংশ বাড়ে $2$ করে, মোট $6 + 6 = 12$ বছরে, তাই এক অংশ $= 12 \div 2 = 6$ বছর।`),
          t(r`$6$ years ago: $30$ and $42$. Present ages: $36$ and $48$.`, r`$6$ বছর আগে: $30$ ও $42$। বর্তমান বয়স: $36$ ও $48$।`),
          t(r`Check ahead: $42 : 54 = 7 : 9$.`, r`সামনে যাচাই: $42 : 54 = 7 : 9$।`),
        ],
        answer: t('A is $36$ years and B is $48$ years old.', 'A-এর বয়স $36$ বছর, B-এর $48$ বছর।'),
      },
      tryIt: {
        question: t('$5$ years ago, the ages of two sisters were in the ratio $3 : 5$. $5$ years from now, their ages will be in the ratio $5 : 7$. Find the present age of the younger sister.', '$5$ বছর আগে দুই বোনের বয়সের অনুপাত ছিল $3 : 5$। $5$ বছর পরে তাদের বয়সের অনুপাত হবে $5 : 7$। ছোটো বোনের বর্তমান বয়স কত?'),
        options: [t('15 years', '15 বছর'), t('25 years', '25 বছর'), t('20 years', '20 বছর'), t('30 years', '30 বছর')],
        correct: 2,
        explanation: [
          t(r`Both part-differences are $2$; parts rise by $2$ over $10$ years, so one part $= 5$ years.`, r`দুটি অংশের অন্তরই $2$; অংশ বাড়ে $2$ করে $10$ বছরে, তাই এক অংশ $= 5$ বছর।`),
          t(r`$5$ years ago the younger was $3 \times 5 = 15$, so now she is $15 + 5 = 20$ years. ($15$ forgets the shift to today.)`, r`$5$ বছর আগে ছোটোজন ছিল $3 \times 5 = 15$, তাই এখন $15 + 5 = 20$ বছর। ($15$ হলে আজ পর্যন্ত সরাতে ভুলে গেছ।)`),
        ],
      },
    },
    // 14 ─────────────────────────────────────────────
    {
      key: 'father_son_reverse',
      emoji: '🔄',
      name: t('Reverse: future ratio and past multiple', 'উল্টো দিক থেকে: ভবিষ্যতের অনুপাত ও অতীতের গুণ'),
      difficulty: 'advanced',
      typicalWording: t('“10 years hence the father and son will be in the ratio 2 : 1; 10 years ago he was 4 times as old.”', '“10 বছর পরে বাবা ও ছেলের অনুপাত হবে 2 : 1; 10 বছর আগে তিনি ছিলেন 4 গুণ।”'),
      formula: t(r`Future ratio: $\dfrac{F + n}{S + n} = \dfrac{c}{d}$; past multiple: $F - n = p(S - n)$ — solve the pair.`, r`ভবিষ্যতের অনুপাত: $\dfrac{F + n}{S + n} = \dfrac{c}{d}$; অতীতের গুণ: $F - n = p(S - n)$ — জোড়াটি সমাধান করো।`),
      shortcut: t('In an MCQ, test the options in the past-multiple condition first — it usually kills three options before you need the ratio.', 'MCQ-তে বিকল্পগুলো আগে অতীতের গুণের শর্তে বসাও — অনুপাত লাগার আগেই সাধারণত তিনটি বিকল্প বাদ পড়ে।'),
      trap: t('The future clue is a ratio of both shifted ages, not a “times” statement about today — do not read 2 : 1 as “twice the present son”.', 'ভবিষ্যতের তথ্যটি দুজনের সরানো বয়সের অনুপাত, আজকের “গুণ”-এর কথা নয় — 2 : 1 মানে “বর্তমান ছেলের দ্বিগুণ” পড়ো না।'),
      spot: t(
        'A mixed pair of clues about a father and son: a **ratio some years hence** and a **“times as old” some years ago** — nothing is stated about today directly.',
        'বাবা ও ছেলে সম্পর্কে মিশ্র এক জোড়া তথ্য: **কয়েক বছর পরের অনুপাত** এবং **কয়েক বছর আগের “কত গুণ”** — আজকে সম্পর্কে সরাসরি কিছুই বলা থাকে না।',
      ),
      method: [
        t(r`Let the present ages be $S$ and $F$; write the future ages $S + n$, $F + n$ and set their ratio.`, r`বর্তমান বয়স $S$ ও $F$ ধরো; ভবিষ্যতের বয়স $S + n$, $F + n$ লিখে তাদের অনুপাত বসাও।`),
        t('Write the past equation with the multiple: elder minus n equals p times (younger minus n).', 'গুণ দিয়ে অতীতের সমীকরণ লেখো: বড়োজন বিয়োগ n সমান p গুণ (ছোটোজন বিয়োগ n)।'),
        t('Solve the two equations together for S and F.', 'দুটি সমীকরণ একসঙ্গে সমাধান করে S ও F বের করো।'),
        t('Verify both clues at their own times before answering.', 'উত্তর দেওয়ার আগে দুটি তথ্যই তাদের নিজ নিজ সময়ে যাচাই করো।'),
      ],
      example: {
        question: t('$10$ years from now, the ages of a father and his son will be in the ratio $2 : 1$. $10$ years ago, the father was $4$ times as old as his son. Find their present ages.', '$10$ বছর পরে বাবা ও ছেলের বয়সের অনুপাত হবে $2 : 1$। $10$ বছর আগে বাবার বয়স ছিল ছেলের $4$ গুণ। তাদের বর্তমান বয়স কত?'),
        steps: [
          t(r`Future: $F + 10 = 2(S + 10)$, so $F = 2S + 10$.`, r`ভবিষ্যৎ: $F + 10 = 2(S + 10)$, তাই $F = 2S + 10$।`),
          t(r`Past: $F - 10 = 4(S - 10)$, so $F = 4S - 30$.`, r`অতীত: $F - 10 = 4(S - 10)$, তাই $F = 4S - 30$।`),
          t(r`$2S + 10 = 4S - 30$, so $2S = 40$ and $S = 20$; then $F = 50$.`, r`$2S + 10 = 4S - 30$, তাই $2S = 40$ এবং $S = 20$; তারপর $F = 50$।`),
          t(r`Check: $60 : 30 = 2 : 1$ ahead, and $40 = 4 \times 10$ back then.`, r`যাচাই: সামনে $60 : 30 = 2 : 1$, তখন $40 = 4 \times 10$।`),
        ],
        answer: t('The father is $50$ years and the son is $20$ years old.', 'বাবার বয়স $50$ বছর, ছেলের $20$ বছর।'),
      },
      tryIt: {
        question: t('$5$ years from now, the ages of a father and his son will be in the ratio $5 : 2$. $5$ years ago, the father was $4$ times as old as his son. Find the father\'s present age.', '$5$ বছর পরে বাবা ও ছেলের বয়সের অনুপাত হবে $5 : 2$। $5$ বছর আগে বাবার বয়স ছিল ছেলের $4$ গুণ। বাবার বর্তমান বয়স কত?'),
        options: [t('40 years', '40 বছর'), t('50 years', '50 বছর'), t('35 years', '35 বছর'), t('45 years', '45 বছর')],
        correct: 3,
        explanation: [
          t(r`Future: $F + 5 = \dfrac{5}{2}(S + 5)$. Past: $F - 5 = 4(S - 5)$, so $F = 4S - 15$.`, r`ভবিষ্যৎ: $F + 5 = \dfrac{5}{2}(S + 5)$। অতীত: $F - 5 = 4(S - 5)$, তাই $F = 4S - 15$।`),
          t(r`Substituting gives $4S - 15 + 5 = \dfrac{5}{2}(S + 5)$, so $S = 15$ and $F = 45$ years.`, r`বসিয়ে পাই $4S - 15 + 5 = \dfrac{5}{2}(S + 5)$, তাই $S = 15$ এবং $F = 45$ বছর।`),
          t(r`Check: $50 : 20 = 5 : 2$ ahead, and $40 = 4 \times 10$ back then. ($50$ is his age $5$ years hence.)`, r`যাচাই: সামনে $50 : 20 = 5 : 2$, তখন $40 = 4 \times 10$। ($50$ হল $5$ বছর পরের বয়স।)`),
        ],
      },
    },
  ],
};
