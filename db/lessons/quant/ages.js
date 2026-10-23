'use strict';

// Chapter lesson: Problems on Ages. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'ages',
  title: t('Problems on Ages', 'বয়স সংক্রান্ত সমস্যা'),
  emoji: '🎂',
  intro: t(
    'How old will you be when your father turns 50? How old was your sister when you were born? Age puzzles like these use one simple fact: everyone grows older at the same speed, one year every year.',
    'বাবার বয়স 50 হলে তোমার বয়স কত হবে? তুমি যখন জন্মালে তখন তোমার দিদির বয়স কত ছিল? এমন বয়সের ধাঁধা একটা সহজ সত্যের ওপর দাঁড়িয়ে: সবাই একই গতিতে বড়ো হয়, প্রতি বছরে এক বছর।',
  ),
  levels: [
    // ─────────────────────────── BASIC ───────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Past, present and future ages', 'অতীত, বর্তমান আর ভবিষ্যতের বয়স'),
          body: t(
            r`- **Present age**: how old someone is now.
- **After** $n$ years (in the future): **add** $n$. If Riya is $10$ now, after $5$ years she will be $15$.
- $n$ years **ago** (in the past): **subtract** $n$. Three years ago she was $7$.

If we do not know the present age, we call it $x$. Then after $5$ years it is $x + 5$, and $3$ years ago it was $x - 3$.`,
            r`- **বর্তমান বয়স**: এখন কারও বয়স কত।
- $n$ বছর **পরে** (ভবিষ্যতে): $n$ **যোগ** করো। রিয়ার বয়স এখন $10$ হলে $5$ বছর পরে হবে $15$।
- $n$ বছর **আগে** (অতীতে): $n$ **বিয়োগ** করো। তিন বছর আগে তার বয়স ছিল $7$।

বর্তমান বয়স জানা না থাকলে তাকে $x$ ধরি। তাহলে $5$ বছর পরে বয়স $x + 5$, আর $3$ বছর আগে ছিল $x - 3$।`,
          ),
        },
        {
          heading: t('The gap never changes', 'বয়সের পার্থক্য কখনও বদলায় না'),
          body: t(
            r`Riya is $10$ and her brother is $4$. The **difference** is $6$ years.

After $5$ years: $15$ and $9$. Difference still $6$. Two years ago: $8$ and $2$. Difference again $6$.

Both of them get one year older every year, so **the difference between two people's ages always stays the same**. This is the key to many puzzles.

But the **sum** of two ages grows by $2$ every year (each person adds $1$).`,
            r`রিয়ার বয়স $10$, তার ভাইয়ের $4$। **পার্থক্য** $6$ বছর।

$5$ বছর পরে: $15$ আর $9$। পার্থক্য তখনও $6$। দু'বছর আগে: $8$ আর $2$। পার্থক্য আবারও $6$।

দুজনেই প্রতি বছর এক বছর করে বড়ো হয়, তাই **দুজনের বয়সের পার্থক্য সবসময় একই থাকে**। অনেক ধাঁধার চাবিকাঠি এটাই।

কিন্তু দুজনের বয়সের **যোগফল** প্রতি বছর $2$ করে বাড়ে (প্রত্যেকে $1$ করে যোগ করে)।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Riya is 10 years old and her brother is 4. How old will each be after 5 years? What is the difference then?', 'রিয়ার বয়স 10 আর তার ভাইয়ের 4। 5 বছর পরে কার বয়স কত হবে? তখন পার্থক্য কত?'),
          steps: [
            t(r`Riya after $5$ years: $10 + 5 = 15$.`, r`$5$ বছর পরে রিয়া: $10 + 5 = 15$।`),
            t(r`Brother after $5$ years: $4 + 5 = 9$.`, r`$5$ বছর পরে ভাই: $4 + 5 = 9$।`),
            t(r`Difference $= 15 - 9 = 6$, the same as today ($10 - 4 = 6$).`, r`পার্থক্য $= 15 - 9 = 6$, আজকের মতোই ($10 - 4 = 6$)।`),
          ],
          answer: t('15 and 9 years; the difference stays 6 years.', '15 ও 9 বছর; পার্থক্য সেই 6 বছরই।'),
        },
        {
          question: t('A father is 5 times as old as his son. The sum of their present ages is 72 years. What will be the father\'s age after 6 years?', 'বাবার বয়স ছেলের বয়সের 5 গুণ। তাদের বর্তমান বয়সের যোগফল 72 বছর। 6 বছর পরে বাবার বয়স কত হবে?'),
          steps: [
            t(r`Let the son be $x$. Father $= 5x$. So $x + 5x = 72$, that is $6x = 72$.`, r`ছেলের বয়স $x$ ধরো। বাবার বয়স $5x$। তাই $x + 5x = 72$, অর্থাৎ $6x = 72$।`),
            t(r`$x = 12$. Son $= 12$, father $= 60$.`, r`তাই $x = 12$। ছেলে $12$, বাবা $60$।`),
            t(r`Father after $6$ years $= 60 + 6 = 66$.`, r`$6$ বছর পরে বাবার বয়স $= 60 + 6 = 66$।`),
          ],
          answer: t('66 years', '66 বছর'),
        },
      ],
    },
    // ─────────────────────── INTERMEDIATE ───────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Ages in a ratio', 'অনুপাতে বয়স'),
          body: t(
            r`"Ages of A and B are in the ratio $3 : 8$" means A has $3$ equal parts and B has $8$ equal parts. Let one part be $x$: A $= 3x$, B $= 8x$.

If the question gives a **future** or **past** sum, first bring it back to the **present**:

- Sum after $n$ years $=$ present sum $+ 2n$ (for two people).
- Sum $n$ years ago $=$ present sum $- 2n$.`,
            r`"A ও B-এর বয়সের অনুপাত $3 : 8$" মানে A-এর $3$টি সমান ভাগ আর B-এর $8$টি সমান ভাগ। এক ভাগ $x$ ধরলে A $= 3x$, B $= 8x$।

প্রশ্নে **ভবিষ্যতের** বা **অতীতের** যোগফল দেওয়া থাকলে আগে সেটাকে **বর্তমানে** ফিরিয়ে আনো:

- $n$ বছর পরের যোগফল $=$ বর্তমান যোগফল $+ 2n$ (দুজনের ক্ষেত্রে)।
- $n$ বছর আগের যোগফল $=$ বর্তমান যোগফল $- 2n$।`,
          ),
        },
        {
          heading: t('Draw a time line', 'একটা সময়রেখা আঁকো'),
          body: t(
            r`Make a small table with three columns: **past**, **now**, **future**. Write what you know in the right column, then move left or right by adding or subtracting years.

Most mistakes in age problems happen because people mix up "then" and "now". The table stops that.`,
            r`তিনটে ঘরের একটা ছোটো সারণি বানাও: **অতীত**, **বর্তমান**, **ভবিষ্যৎ**। যা জানো সেটা ঠিক ঘরে লেখো, তারপর বছর যোগ বা বিয়োগ করে বাঁয়ে-ডাইনে সরো।

বয়সের অঙ্কে বেশিরভাগ ভুল হয় "তখন" আর "এখন" গুলিয়ে ফেলার জন্য। সারণিটা সেই ভুল আটকায়।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The present ages of A and B are in the ratio 3 : 8. After 3 years the sum of their ages will be 50 years. Find B\'s present age.', 'A ও B-এর বর্তমান বয়সের অনুপাত 3 : 8। 3 বছর পরে তাদের বয়সের যোগফল হবে 50 বছর। B-এর বর্তমান বয়স কত?'),
          steps: [
            t(r`Present sum $= 50 - 2 \times 3 = 44$.`, r`বর্তমান যোগফল $= 50 - 2 \times 3 = 44$।`),
            t(r`$3x + 8x = 44$, so $11x = 44$ and $x = 4$.`, r`$3x + 8x = 44$, তাই $11x = 44$ এবং $x = 4$।`),
            t(r`B $= 8 \times 4 = 32$ (A $= 12$). Check: $15 + 35 = 50$.`, r`B-এর বয়স $= 8 \times 4 = 32$ (A $= 12$)। যাচাই: $15 + 35 = 50$।`),
          ],
          answer: t('32 years', '32 বছর'),
        },
        {
          question: t('8 years ago, A was 2 times as old as B. If B was 6 years old then, what is the sum of their present ages?', '8 বছর আগে A-এর বয়স ছিল B-এর 2 গুণ। তখন B-এর বয়স 6 হলে তাদের বর্তমান বয়সের যোগফল কত?'),
          steps: [
            t(r`Then: B $= 6$, A $= 2 \times 6 = 12$.`, r`তখন: B $= 6$, A $= 2 \times 6 = 12$।`),
            t(r`Now (add $8$ to each): A $= 20$, B $= 14$.`, r`এখন (প্রত্যেকের সঙ্গে $8$ যোগ): A $= 20$, B $= 14$।`),
            t(r`Sum $= 20 + 14 = 34$.`, r`যোগফল $= 20 + 14 = 34$।`),
          ],
          answer: t('34 years', '34 বছর'),
        },
      ],
    },
    // ───────────────────────── ADVANCED ─────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Two ratios at two times', 'দুই সময়ে দুটি অনুপাত'),
          body: t(
            r`Exams often give a ratio **now** and a different ratio **later** (or earlier). Write both ages using one letter, then set up one equation:

$$\dfrac{ax + n}{bx + n} = \dfrac{c}{d}$$

Cross-multiply and solve for $x$.

**Shortcut using the constant gap:** in the ratio $a : b$, the gap is $b - a$ parts; in $c : d$ it is $d - c$ parts. Since the real gap is the same, make these parts equal and compare.`,
            r`পরীক্ষায় প্রায়ই **এখনকার** একটা অনুপাত আর **পরের** (বা আগের) আরেকটা অনুপাত দেওয়া থাকে। একটাই অক্ষর দিয়ে দুজনের বয়স লেখো, তারপর একটা সমীকরণ বানাও:

$$\dfrac{ax + n}{bx + n} = \dfrac{c}{d}$$

আড়গুণ করে $x$ বের করো।

**স্থির পার্থক্যের কৌশল:** $a : b$ অনুপাতে পার্থক্য $b - a$ ভাগ; $c : d$ অনুপাতে $d - c$ ভাগ। আসল পার্থক্য যেহেতু একই, এই ভাগগুলো সমান করে তুলনা করো।`,
          ),
        },
        {
          heading: t('Check the options', 'বিকল্প বসিয়ে যাচাই'),
          body: t(
            r`In multiple-choice questions, you can often put each option back into the story. The right answer fits **every** sentence of the question. This is fast and avoids algebra slips.

Also remember: ages are usually whole numbers and can never be negative. An answer like $-3$ or $12.7$ years is a warning sign.`,
            r`বহু বিকল্প প্রশ্নে প্রায়ই প্রতিটা বিকল্প গল্পে বসিয়ে দেখা যায়। সঠিক উত্তর প্রশ্নের **প্রতিটা** বাক্যের সঙ্গে মিলবে। এটা দ্রুত, আর বীজগণিতের ভুলও এড়ায়।

মনে রেখো: বয়স সাধারণত পূর্ণসংখ্যা হয় আর কখনও ঋণাত্মক হয় না। $-3$ বা $12.7$ বছরের মতো উত্তর এলে বুঝবে কোথাও ভুল হয়েছে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The ages of A and B are in the ratio 4 : 5. After 6 years the ratio will be 5 : 6. Find their present ages.', 'A ও B-এর বয়সের অনুপাত 4 : 5। 6 বছর পরে অনুপাত হবে 5 : 6। তাদের বর্তমান বয়স কত?'),
          steps: [
            t(r`Let A $= 4x$, B $= 5x$. Then $\dfrac{4x + 6}{5x + 6} = \dfrac{5}{6}$.`, r`ধরো A $= 4x$, B $= 5x$। তাহলে $\dfrac{4x + 6}{5x + 6} = \dfrac{5}{6}$।`),
            t(r`Cross-multiply: $24x + 36 = 25x + 30$, so $x = 6$.`, r`আড়গুণ করে: $24x + 36 = 25x + 30$, তাই $x = 6$।`),
            t(r`A $= 24$, B $= 30$. Check: after $6$ years $30 : 36 = 5 : 6$.`, r`A-এর বয়স $24$, B-এর $30$। যাচাই: $6$ বছর পরে $30 : 36 = 5 : 6$।`),
          ],
          answer: t('A is 24 years, B is 30 years.', 'A-এর বয়স 24 বছর, B-এর 30 বছর।'),
        },
        {
          question: t('A father\'s age is 3 times his son\'s age. After 10 years, the father will be twice as old as the son. Find their present ages.', 'বাবার বয়স ছেলের বয়সের 3 গুণ। 10 বছর পরে বাবার বয়স হবে ছেলের 2 গুণ। তাদের বর্তমান বয়স কত?'),
          steps: [
            t(r`Let the son be $x$, father $3x$. After $10$ years: $3x + 10 = 2(x + 10)$.`, r`ছেলের বয়স $x$, বাবার $3x$ ধরো। $10$ বছর পরে: $3x + 10 = 2(x + 10)$।`),
            t(r`$3x + 10 = 2x + 20$, so $x = 10$.`, r`অর্থাৎ $3x + 10 = 2x + 20$, তাই $x = 10$।`),
            t(r`Son $= 10$, father $= 30$. Check: after $10$ years, $40 = 2 \times 20$.`, r`ছেলে $10$, বাবা $30$। যাচাই: $10$ বছর পরে $40 = 2 \times 20$।`),
          ],
          answer: t('Son 10 years, father 30 years.', 'ছেলের বয়স 10 বছর, বাবার 30 বছর।'),
        },
        {
          question: t('The sum of the ages of a mother and her daughter is 50 years. 5 years ago, the mother was 7 times as old as the daughter. Find their present ages.', 'মা ও মেয়ের বয়সের যোগফল 50 বছর। 5 বছর আগে মায়ের বয়স ছিল মেয়ের 7 গুণ। তাদের বর্তমান বয়স কত?'),
          steps: [
            t(r`Sum $5$ years ago $= 50 - 2 \times 5 = 40$.`, r`$5$ বছর আগে যোগফল $= 50 - 2 \times 5 = 40$।`),
            t(r`Then: daughter $= y$, mother $= 7y$, so $8y = 40$ and $y = 5$. Mother was $35$.`, r`তখন মেয়ে $= y$, মা $= 7y$, তাই $8y = 40$ এবং $y = 5$। মা ছিলেন $35$।`),
            t(r`Now: daughter $= 10$, mother $= 40$. Check: $10 + 40 = 50$.`, r`এখন মেয়ে $10$, মা $40$। যাচাই: $10 + 40 = 50$।`),
          ],
          answer: t('Daughter 10 years, mother 40 years.', 'মেয়ের বয়স 10 বছর, মায়ের 40 বছর।'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Future and past age', 'ভবিষ্যৎ ও অতীতের বয়স'),
      latex: r`\text{after } n \text{ years} = x + n,\qquad n \text{ years ago} = x - n`,
      explain: t('Add years to go forward, subtract to go back.', 'সামনে যেতে বছর যোগ করো, পিছনে যেতে বিয়োগ।'),
    },
    {
      label: t('Constant difference', 'স্থির পার্থক্য'),
      latex: r`(A + n) - (B + n) = A - B`,
      explain: t('The gap between two people\'s ages never changes.', 'দুজনের বয়সের পার্থক্য কখনও বদলায় না।'),
    },
    {
      label: t('Sum of two ages over time', 'সময়ের সঙ্গে দুজনের বয়সের যোগফল'),
      latex: r`(A + n) + (B + n) = (A + B) + 2n`,
      explain: t('For two people the sum grows by 2 each year (by k each year for k people).', 'দুজনের ক্ষেত্রে যোগফল প্রতি বছর 2 করে বাড়ে (k জনের ক্ষেত্রে k করে)।'),
    },
    {
      label: t('Ages in a ratio', 'অনুপাতে বয়স'),
      latex: r`A : B = a : b \;\Rightarrow\; A = ax,\; B = bx`,
      explain: t('Turn a ratio into ages by using one common multiplier x.', 'একটা সাধারণ গুণক x নিয়ে অনুপাতকে বয়সে বদলাও।'),
    },
    {
      label: t('Ratio now and later', 'এখন ও পরের অনুপাত'),
      latex: r`\dfrac{ax + n}{bx + n} = \dfrac{c}{d}`,
      explain: t('Add the same n to both ages, then cross-multiply.', 'দুজনের বয়সেই একই n যোগ করে আড়গুণ করো।'),
    },
  ],
  tips: [
    t('Mark clearly which ages are "then" and which are "now" before writing any equation.', 'সমীকরণ লেখার আগে কোন বয়স "তখনকার" আর কোনটা "এখনকার" তা স্পষ্ট করে চিহ্নিত করো।'),
    t('When moving a sum of two ages in time, change it by 2n, not n.', 'দুজনের বয়সের যোগফলকে সময়ে আগে-পিছে নিলে n নয়, 2n বদলাও।'),
    t('A ratio does not stay the same over time; only the difference does.', 'সময়ের সঙ্গে অনুপাত বদলায়; শুধু পার্থক্য একই থাকে।'),
    t('Read what is asked: present age, future age, or the sum. Many wrong options are the right number for the wrong person or time.', 'কী চাওয়া হয়েছে দেখো: বর্তমান বয়স, ভবিষ্যতের বয়স, না যোগফল। অনেক ভুল বিকল্প আসলে ভুল ব্যক্তি বা ভুল সময়ের ঠিক সংখ্যা।'),
    t('Put your answer back into every sentence of the question to check it.', 'উত্তরটা প্রশ্নের প্রতিটা বাক্যে বসিয়ে যাচাই করো।'),
  ],
};
