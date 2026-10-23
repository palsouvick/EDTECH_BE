'use strict';

// Chapter lesson: Number System. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'number_system',
  title: t('Number System', 'সংখ্যা পদ্ধতি'),
  emoji: '🔢',
  intro: t(
    'Numbers are everywhere: counting sweets, reading a cricket score, checking the price at a shop. In this chapter we learn the different kinds of numbers, how division really works, quick tricks to test divisibility, and HCF and LCM.',
    'মিষ্টি গোনা, ক্রিকেটের স্কোর পড়া, দোকানে দাম দেখা — সংখ্যা সব জায়গায়। এই অধ্যায়ে আমরা শিখব সংখ্যার নানা রকম ভাগ, ভাগ আসলে কীভাবে কাজ করে, বিভাজ্যতা যাচাইয়ের সহজ কৌশল, আর গ.সা.গু. ও ল.সা.গু.।',
  ),
  levels: [
    // ─────────────────────────── BASIC ───────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('Kinds of numbers', 'সংখ্যার প্রকারভেদ'),
          body: t(
            r`Numbers live in families. Each family has a name:

- **Natural numbers**: the counting numbers $1, 2, 3, 4, \dots$ (the numbers you use to count sweets).
- **Whole numbers**: natural numbers plus zero: $0, 1, 2, 3, \dots$
- **Integers**: whole numbers and their negatives: $\dots, -2, -1, 0, 1, 2, \dots$ (think of a lift going below the ground floor).
- **Even numbers** can be split into two equal groups: $2, 4, 6, 8, \dots$
- **Odd numbers** always leave one extra: $1, 3, 5, 7, \dots$
- A **prime number** has exactly two factors, $1$ and itself: $2, 3, 5, 7, 11, \dots$ Note that $1$ is **not** prime.`,
            r`সংখ্যারা যেন নানা পরিবারে থাকে। প্রত্যেক পরিবারের একটা নাম আছে:

- **স্বাভাবিক সংখ্যা**: গোনার সংখ্যা $1, 2, 3, 4, \dots$ (যা দিয়ে তুমি মিষ্টি গোনো)।
- **পূর্ণসংখ্যা**: স্বাভাবিক সংখ্যার সঙ্গে শূন্য: $0, 1, 2, 3, \dots$
- **অখণ্ড সংখ্যা**: পূর্ণসংখ্যা আর তাদের ঋণাত্মক রূপ: $\dots, -2, -1, 0, 1, 2, \dots$ (লিফট যেমন একতলার নীচে নামে)।
- **যুগ্ম সংখ্যা** দুটি সমান ভাগে ভাগ করা যায়: $2, 4, 6, 8, \dots$
- **অযুগ্ম সংখ্যা** ভাগ করলে সবসময় একটা বাড়তি থাকে: $1, 3, 5, 7, \dots$
- **মৌলিক সংখ্যার** ঠিক দুটি উৎপাদক: $1$ আর সংখ্যাটি নিজে: $2, 3, 5, 7, 11, \dots$ মনে রেখো, $1$ মৌলিক **নয়**।`,
          ),
        },
        {
          heading: t('How division works', 'ভাগ কীভাবে কাজ করে'),
          body: t(
            r`Suppose you share $17$ toffees among $5$ friends. Each friend gets $3$ and $2$ are left over.

- The number being shared ($17$) is the **dividend**.
- The number of groups ($5$) is the **divisor**.
- How many each gets ($3$) is the **quotient**.
- What is left over ($2$) is the **remainder**.

They are always linked: $17 = 5 \times 3 + 2$. In words: **Dividend = Divisor × Quotient + Remainder**. The remainder is always smaller than the divisor.`,
            r`ধরো, $17$টা লজেন্স $5$ জন বন্ধুর মধ্যে ভাগ করে দিলে। প্রত্যেকে পেল $3$টা, আর $2$টা বেঁচে রইল।

- যে সংখ্যাকে ভাগ করা হচ্ছে ($17$) তা **ভাজ্য**।
- যত ভাগে ভাগ হচ্ছে ($5$) তা **ভাজক**।
- প্রত্যেকে যত পেল ($3$) তা **ভাগফল**।
- যা বেঁচে রইল ($2$) তা **ভাগশেষ**।

এরা সবসময় এভাবে যুক্ত: $17 = 5 \times 3 + 2$। অর্থাৎ **ভাজ্য = ভাজক × ভাগফল + ভাগশেষ**। ভাগশেষ সবসময় ভাজকের থেকে ছোটো হয়।`,
          ),
        },
        {
          heading: t('Adding 1 + 2 + 3 + … quickly', '1 + 2 + 3 + … তাড়াতাড়ি যোগ করা'),
          body: t(
            r`To add $1 + 2 + \dots + 10$, pair the first and last numbers: $1 + 10 = 11$, $2 + 9 = 11$, and so on. There are $5$ such pairs, so the sum is $5 \times 11 = 55$.

This gives a shortcut: the sum of the first $n$ natural numbers is $\dfrac{n(n+1)}{2}$.

Another neat fact: adding odd numbers from $1$ gives perfect squares. $1 + 3 = 4$, $1 + 3 + 5 = 9$, $1 + 3 + 5 + 7 = 16$. So the sum of the first $n$ odd numbers is $n^2$.`,
            r`$1 + 2 + \dots + 10$ যোগ করতে প্রথম আর শেষ সংখ্যাকে জোড়া বাঁধো: $1 + 10 = 11$, $2 + 9 = 11$, এভাবে চলবে। এমন জোড়া আছে $5$টি, তাই যোগফল $5 \times 11 = 55$।

এখান থেকেই একটা সহজ সূত্র পাই: প্রথম $n$টি স্বাভাবিক সংখ্যার যোগফল $\dfrac{n(n+1)}{2}$।

আরেকটা মজার কথা: $1$ থেকে অযুগ্ম সংখ্যাগুলো যোগ করলে পূর্ণবর্গ পাওয়া যায়। $1 + 3 = 4$, $1 + 3 + 5 = 9$, $1 + 3 + 5 + 7 = 16$। তাই প্রথম $n$টি অযুগ্ম সংখ্যার যোগফল $n^2$।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'On dividing a number by 6, the quotient is 7 and the remainder is 4. What is the number?',
            'একটি সংখ্যাকে 6 দিয়ে ভাগ করলে ভাগফল হয় 7 আর ভাগশেষ 4। সংখ্যাটি কত?',
          ),
          steps: [
            t('Use: Dividend = Divisor × Quotient + Remainder.', 'সূত্র: ভাজ্য = ভাজক × ভাগফল + ভাগশেষ।'),
            t(r`Number $= 6 \times 7 + 4 = 42 + 4 = 46$.`, r`সংখ্যাটি $= 6 \times 7 + 4 = 42 + 4 = 46$।`),
            t(r`Check: $46 \div 6$ gives $7$ with $4$ left over. Correct.`, r`যাচাই: $46 \div 6$ করলে ভাগফল $7$, ভাগশেষ $4$। ঠিক আছে।`),
          ],
          answer: t('The number is 46.', 'সংখ্যাটি 46।'),
        },
        {
          question: t('Find the sum of all natural numbers from 1 to 20.', '1 থেকে 20 পর্যন্ত সব স্বাভাবিক সংখ্যার যোগফল নির্ণয় করো।'),
          steps: [
            t(r`Here $n = 20$. Use $\dfrac{n(n+1)}{2}$.`, r`এখানে $n = 20$। সূত্র $\dfrac{n(n+1)}{2}$।`),
            t(r`$\dfrac{20 \times 21}{2} = \dfrac{420}{2} = 210$.`, r`হিসাব: $\dfrac{20 \times 21}{2} = \dfrac{420}{2} = 210$।`),
          ],
          answer: t('The sum is 210.', 'যোগফল 210।'),
        },
        {
          question: t('What is the sum of the first 6 odd natural numbers?', 'প্রথম 6টি অযুগ্ম স্বাভাবিক সংখ্যার যোগফল কত?'),
          steps: [
            t(r`The first 6 odd numbers are $1, 3, 5, 7, 9, 11$.`, r`প্রথম 6টি অযুগ্ম সংখ্যা হল $1, 3, 5, 7, 9, 11$।`),
            t(r`Shortcut: sum $= n^2 = 6^2 = 36$.`, r`সহজ সূত্র: যোগফল $= n^2 = 6^2 = 36$।`),
            t(r`Check by adding: $1 + 3 + 5 + 7 + 9 + 11 = 36$.`, r`যোগ করে যাচাই: $1 + 3 + 5 + 7 + 9 + 11 = 36$।`),
          ],
          answer: t('The sum is 36.', 'যোগফল 36।'),
        },
      ],
    },
    // ─────────────────────── INTERMEDIATE ───────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Divisibility rules', 'বিভাজ্যতার নিয়ম'),
          body: t(
            r`A number is **divisible** by another if it divides with remainder $0$. You can test this without doing the full division:

- By **2**: last digit is even ($0, 2, 4, 6, 8$).
- By **3**: the sum of the digits is divisible by $3$.
- By **4**: the number formed by the last two digits is divisible by $4$.
- By **5**: last digit is $0$ or $5$.
- By **8**: the number formed by the last three digits is divisible by $8$.
- By **9**: the sum of the digits is divisible by $9$.
- By **10**: last digit is $0$.
- By **11**: (sum of digits in odd places) − (sum of digits in even places) is $0$ or divisible by $11$.`,
            r`কোনো সংখ্যাকে অন্য সংখ্যা দিয়ে ভাগ করলে ভাগশেষ $0$ হলে তাকে **বিভাজ্য** বলে। পুরো ভাগ না করেও এটা যাচাই করা যায়:

- **2** দিয়ে: শেষ অঙ্ক যুগ্ম ($0, 2, 4, 6, 8$)।
- **3** দিয়ে: অঙ্কগুলির যোগফল $3$ দিয়ে বিভাজ্য।
- **4** দিয়ে: শেষ দুটি অঙ্কে তৈরি সংখ্যা $4$ দিয়ে বিভাজ্য।
- **5** দিয়ে: শেষ অঙ্ক $0$ বা $5$।
- **8** দিয়ে: শেষ তিনটি অঙ্কে তৈরি সংখ্যা $8$ দিয়ে বিভাজ্য।
- **9** দিয়ে: অঙ্কগুলির যোগফল $9$ দিয়ে বিভাজ্য।
- **10** দিয়ে: শেষ অঙ্ক $0$।
- **11** দিয়ে: (বিজোড় স্থানের অঙ্কগুলির যোগফল) − (জোড় স্থানের অঙ্কগুলির যোগফল) $0$ অথবা $11$ দিয়ে বিভাজ্য।`,
          ),
        },
        {
          heading: t('Counting multiples', 'গুণিতক গোনা'),
          body: t(
            r`How many numbers from $1$ to $N$ are divisible by $k$? Just divide $N$ by $k$ and keep only the **whole part** (ignore the remainder).

For example, from $1$ to $50$, the multiples of $7$ are $7, 14, \dots, 49$. And $50 \div 7 = 7$ remainder $1$, so there are $7$ of them.`,
            r`$1$ থেকে $N$ পর্যন্ত কতগুলি সংখ্যা $k$ দিয়ে বিভাজ্য? শুধু $N$-কে $k$ দিয়ে ভাগ করো আর **ভাগফলের পূর্ণ অংশটুকু** নাও (ভাগশেষ বাদ দাও)।

যেমন, $1$ থেকে $50$-এর মধ্যে $7$-এর গুণিতক $7, 14, \dots, 49$। আর $50 \div 7$ করলে ভাগফল $7$, ভাগশেষ $1$, তাই গুণিতক আছে $7$টি।`,
          ),
        },
        {
          heading: t('Least number to add or subtract', 'ন্যূনতম কত যোগ বা বিয়োগ করতে হবে'),
          body: t(
            r`Divide the number by the divisor and look at the remainder.

- To make it divisible by **subtracting**, subtract the **remainder**.
- To make it divisible by **adding**, add **divisor − remainder**.

Example: $250 \div 7$ leaves remainder $5$. Subtract $5$ to get $245$, or add $7 - 5 = 2$ to get $252$. Both are divisible by $7$.`,
            r`সংখ্যাটিকে ভাজক দিয়ে ভাগ করে ভাগশেষটা দেখো।

- **বিয়োগ** করে বিভাজ্য করতে হলে **ভাগশেষ** বিয়োগ করো।
- **যোগ** করে বিভাজ্য করতে হলে **ভাজক − ভাগশেষ** যোগ করো।

উদাহরণ: $250 \div 7$ করলে ভাগশেষ $5$। $5$ বিয়োগ করলে $245$, অথবা $7 - 5 = 2$ যোগ করলে $252$। দুটোই $7$ দিয়ে বিভাজ্য।`,
          ),
        },
      ],
      examples: [
        {
          question: t('How many numbers from 1 to 412 are divisible by 4?', '1 থেকে 412 পর্যন্ত কতগুলি সংখ্যা 4 দিয়ে বিভাজ্য?'),
          steps: [
            t(r`Divide: $412 \div 4 = 103$ exactly.`, r`ভাগ করো: $412 \div 4 = 103$, ভাগশেষ নেই।`),
            t(r`The multiples are $4, 8, \dots, 412$, that is $4 \times 1$ up to $4 \times 103$.`, r`গুণিতকগুলি $4, 8, \dots, 412$, অর্থাৎ $4 \times 1$ থেকে $4 \times 103$ পর্যন্ত।`),
          ],
          answer: t('103 numbers.', '103টি সংখ্যা।'),
        },
        {
          question: t('What is the sum of the first 17 odd natural numbers?', 'প্রথম 17টি অযুগ্ম স্বাভাবিক সংখ্যার যোগফল কত?'),
          steps: [
            t(r`Sum of the first $n$ odd numbers $= n^2$.`, r`প্রথম $n$টি অযুগ্ম সংখ্যার যোগফল $= n^2$।`),
            t(r`$17^2 = 289$.`, r`তাই যোগফল $17^2 = 289$।`),
          ],
          answer: t('The sum is 289.', 'যোগফল 289।'),
        },
        {
          question: t('What is the least number that must be added to 250 so that the sum is exactly divisible by 7?', '250-এর সঙ্গে ন্যূনতম কোন সংখ্যা যোগ করলে যোগফল 7 দিয়ে নিঃশেষে বিভাজ্য হবে?'),
          steps: [
            t(r`$250 = 7 \times 35 + 5$, so the remainder is $5$.`, r`$250 = 7 \times 35 + 5$, তাই ভাগশেষ $5$।`),
            t(r`Number to add $= 7 - 5 = 2$.`, r`যোগ করতে হবে $= 7 - 5 = 2$।`),
            t(r`Check: $252 = 7 \times 36$. Correct.`, r`যাচাই: $252 = 7 \times 36$। ঠিক আছে।`),
          ],
          answer: t('2 must be added.', '2 যোগ করতে হবে।'),
        },
      ],
    },
    // ───────────────────────── ADVANCED ─────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('HCF and LCM', 'গ.সা.গু. ও ল.সা.গু.'),
          body: t(
            r`- A **factor** of a number divides it exactly ($3$ is a factor of $12$). A **multiple** is the number times $1, 2, 3, \dots$ ($24$ is a multiple of $12$).
- **HCF** (Highest Common Factor) is the biggest number that divides all the given numbers. Use it for "largest equal pieces / groups" questions.
- **LCM** (Lowest Common Multiple) is the smallest number that all the given numbers divide. Use it for "when will they meet again / ring together" questions.

Find both with **prime factors**: $12 = 2^2 \times 3$, $18 = 2 \times 3^2$. HCF takes the **lowest** power of each common prime: $2 \times 3 = 6$. LCM takes the **highest** power of every prime: $2^2 \times 3^2 = 36$.`,
            r`- কোনো সংখ্যাকে যে সংখ্যা নিঃশেষে ভাগ করে সে তার **উৎপাদক** ($3$ হল $12$-এর উৎপাদক)। সংখ্যাটিকে $1, 2, 3, \dots$ দিয়ে গুণ করলে পাই **গুণিতক** ($24$ হল $12$-এর গুণিতক)।
- **গ.সা.গু.** (গরিষ্ঠ সাধারণ গুণনীয়ক) হল সবচেয়ে বড়ো সংখ্যা যা প্রদত্ত সব সংখ্যাকে ভাগ করে। "সবচেয়ে বড়ো সমান টুকরো / দল" ধরনের প্রশ্নে কাজে লাগে।
- **ল.সা.গু.** (লঘিষ্ঠ সাধারণ গুণিতক) হল সবচেয়ে ছোটো সংখ্যা যাকে প্রদত্ত সব সংখ্যা ভাগ করে। "আবার কখন একসঙ্গে বাজবে / মিলবে" ধরনের প্রশ্নে কাজে লাগে।

দুটোই **মৌলিক উৎপাদকে** ভেঙে বের করো: $12 = 2^2 \times 3$, $18 = 2 \times 3^2$। গ.সা.গু.-তে প্রতিটি সাধারণ মৌলিকের **সবচেয়ে ছোটো** ঘাত নাও: $2 \times 3 = 6$। ল.সা.গু.-তে প্রতিটি মৌলিকের **সবচেয়ে বড়ো** ঘাত নাও: $2^2 \times 3^2 = 36$।`,
          ),
        },
        {
          heading: t('The golden link: HCF × LCM', 'সোনালি সম্পর্ক: গ.সা.গু. × ল.সা.গু.'),
          body: t(
            r`For **two** numbers $a$ and $b$: $\text{HCF} \times \text{LCM} = a \times b$.

Check with $12$ and $18$: $6 \times 36 = 216$ and $12 \times 18 = 216$. So if you know the HCF, the LCM and one number, the other number is $\dfrac{\text{HCF} \times \text{LCM}}{\text{given number}}$.

Exam trick for remainders: the smallest number that leaves the **same remainder** $r$ when divided by several numbers is $\text{LCM} + r$.`,
            r`**দুটি** সংখ্যা $a$ ও $b$-এর জন্য: $\text{HCF} \times \text{LCM} = a \times b$, অর্থাৎ গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটির গুণফল।

$12$ ও $18$ দিয়ে যাচাই: $6 \times 36 = 216$ আর $12 \times 18 = 216$। তাই গ.সা.গু., ল.সা.গু. আর একটি সংখ্যা জানা থাকলে অন্য সংখ্যাটি $\dfrac{\text{HCF} \times \text{LCM}}{\text{given number}}$, অর্থাৎ (গ.সা.গু. × ল.সা.গু.) ÷ প্রদত্ত সংখ্যা।

ভাগশেষের পরীক্ষা-কৌশল: কয়েকটি সংখ্যা দিয়ে ভাগ করলে প্রতিবার **একই ভাগশেষ** $r$ থাকে এমন ক্ষুদ্রতম সংখ্যা হল $\text{LCM} + r$ (ল.সা.গু. + ভাগশেষ)।`,
          ),
        },
        {
          heading: t('Finding a missing digit', 'হারানো অঙ্ক খোঁজা'),
          body: t(
            r`Questions like "find $x$ so that $42x06$ is divisible by $9$" use the digit-sum rule.

1. Add the known digits.
2. Find the next multiple of $9$ (or $3$) that you can reach by adding one digit $x$ from $0$ to $9$.
3. Check the answer by putting $x$ back.

For $9$, there is usually only one answer (unless both $0$ and $9$ work).`,
            r`"$42x06$ যেন $9$ দিয়ে বিভাজ্য হয় এমন $x$ বের করো" — এই ধরনের প্রশ্নে অঙ্কের যোগফলের নিয়ম লাগে।

1. জানা অঙ্কগুলো যোগ করো।
2. $0$ থেকে $9$-এর মধ্যে একটি অঙ্ক $x$ যোগ করে $9$ (বা $3$)-এর যে পরের গুণিতকে পৌঁছানো যায় সেটা খোঁজো।
3. $x$ বসিয়ে উত্তর যাচাই করো।

$9$-এর ক্ষেত্রে সাধারণত একটাই উত্তর হয় (শুধু $0$ আর $9$ দুটোই খাটলে দুটি)।`,
          ),
        },
      ],
      examples: [
        {
          question: t('The HCF and LCM of two numbers are 15 and 630. If one number is 90, find the other.', 'দুটি সংখ্যার গ.সা.গু. ও ল.সা.গু. যথাক্রমে 15 ও 630। একটি সংখ্যা 90 হলে অন্যটি কত?'),
          steps: [
            t(r`HCF × LCM = product of the two numbers, so other $= \dfrac{15 \times 630}{90}$.`, r`গ.সা.গু. × ল.সা.গু. = সংখ্যা দুটির গুণফল, তাই অন্য সংখ্যা $= \dfrac{15 \times 630}{90}$।`),
            t(r`$15 \times 630 = 9450$, and $9450 \div 90 = 105$.`, r`$15 \times 630 = 9450$, আর $9450 \div 90 = 105$।`),
            t(r`Check: $90 = 2 \times 3^2 \times 5$, $105 = 3 \times 5 \times 7$. HCF $= 15$, LCM $= 2 \times 3^2 \times 5 \times 7 = 630$.`, r`যাচাই: $90 = 2 \times 3^2 \times 5$, $105 = 3 \times 5 \times 7$। গ.সা.গু. $= 15$, ল.সা.গু. $= 2 \times 3^2 \times 5 \times 7 = 630$।`),
          ],
          answer: t('The other number is 105.', 'অন্য সংখ্যাটি 105।'),
        },
        {
          question: t('Find the digit x so that the number 42x06 is divisible by 9.', '42x06 সংখ্যাটি 9 দিয়ে বিভাজ্য হলে x অঙ্কটি কত?'),
          steps: [
            t(r`Sum of known digits: $4 + 2 + 0 + 6 = 12$.`, r`জানা অঙ্কগুলির যোগফল: $4 + 2 + 0 + 6 = 12$।`),
            t(r`$12 + x$ must be a multiple of $9$. With $x$ from $0$ to $9$, the only choice is $12 + 6 = 18$.`, r`$12 + x$ অবশ্যই $9$-এর গুণিতক। $x$ যেহেতু $0$ থেকে $9$, তাই একমাত্র সম্ভাবনা $12 + 6 = 18$।`),
            t(r`Check: $42606 = 9 \times 4734$. Correct.`, r`যাচাই: $42606 = 9 \times 4734$। ঠিক আছে।`),
          ],
          answer: t('x = 6', 'x-এর মান 6'),
        },
        {
          question: t('Find the smallest number which leaves remainder 5 when divided by 12, 15 or 20.', 'কোন ক্ষুদ্রতম সংখ্যাকে 12, 15 বা 20 দিয়ে ভাগ করলে প্রতিবার ভাগশেষ 5 থাকে?'),
          steps: [
            t(r`LCM of $12, 15, 20$: $12 = 2^2 \times 3$, $15 = 3 \times 5$, $20 = 2^2 \times 5$, so LCM $= 2^2 \times 3 \times 5 = 60$.`, r`$12, 15, 20$-এর ল.সা.গু.: $12 = 2^2 \times 3$, $15 = 3 \times 5$, $20 = 2^2 \times 5$, তাই ল.সা.গু. $= 2^2 \times 3 \times 5 = 60$।`),
            t(r`Required number $= \text{LCM} + 5 = 65$.`, r`নির্ণেয় সংখ্যা $= 60 + 5 = 65$।`),
            t(r`Check: $65 = 12 \times 5 + 5 = 15 \times 4 + 5 = 20 \times 3 + 5$.`, r`যাচাই: $65 = 12 \times 5 + 5 = 15 \times 4 + 5 = 20 \times 3 + 5$।`),
          ],
          answer: t('The number is 65.', 'সংখ্যাটি 65।'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Division rule', 'ভাগের নিয়ম'),
      latex: r`\text{Dividend} = \text{Divisor} \times \text{Quotient} + \text{Remainder}`,
      explain: t('Multiply divisor and quotient, then add what was left over.', 'ভাজক আর ভাগফল গুণ করে ভাগশেষ যোগ করলে ভাজ্য পাওয়া যায়।'),
    },
    {
      label: t('Sum of first n natural numbers', 'প্রথম n টি স্বাভাবিক সংখ্যার যোগফল'),
      latex: r`1 + 2 + \dots + n = \dfrac{n(n+1)}{2}`,
      explain: t('Pair the first and last numbers; each pair adds to n + 1.', 'প্রথম আর শেষ সংখ্যা জোড়া বাঁধো; প্রতিটি জোড়ার যোগফল n + 1।'),
    },
    {
      label: t('Sum of first n odd numbers', 'প্রথম n টি অযুগ্ম সংখ্যার যোগফল'),
      latex: r`1 + 3 + 5 + \dots + (2n-1) = n^2`,
      explain: t('Just square how many odd numbers you are adding.', 'কতগুলি অযুগ্ম সংখ্যা যোগ হচ্ছে, সেই সংখ্যার বর্গ করো।'),
    },
    {
      label: t('Sum of first n even numbers', 'প্রথম n টি যুগ্ম সংখ্যার যোগফল'),
      latex: r`2 + 4 + \dots + 2n = n(n+1)`,
      explain: t('Twice the sum of the first n natural numbers.', 'প্রথম n টি স্বাভাবিক সংখ্যার যোগফলের দ্বিগুণ।'),
    },
    {
      label: t('Multiples of k from 1 to N', '1 থেকে N পর্যন্ত k-এর গুণিতকের সংখ্যা'),
      latex: r`\text{Count} = \left\lfloor \dfrac{N}{k} \right\rfloor`,
      explain: t('Divide N by k and keep only the whole-number part.', 'N-কে k দিয়ে ভাগ করে শুধু পূর্ণ অংশটুকু নাও।'),
    },
    {
      label: t('HCF × LCM of two numbers', 'দুটি সংখ্যার গ.সা.গু. × ল.সা.গু.'),
      latex: r`\text{HCF} \times \text{LCM} = a \times b`,
      explain: t('Works only for two numbers. Use it to find a missing number.', 'শুধু দুটি সংখ্যার ক্ষেত্রে খাটে। হারানো সংখ্যা বের করতে কাজে লাগে।'),
    },
    {
      label: t('Divisibility by 3 and 9', '3 ও 9 দিয়ে বিভাজ্যতা'),
      latex: r`9 \mid N \iff 9 \mid (\text{sum of digits of } N)`,
      explain: t('A number is divisible by 9 (or 3) exactly when the sum of its digits is.', 'অঙ্কগুলির যোগফল 9 (বা 3) দিয়ে বিভাজ্য হলে তবেই সংখ্যাটি 9 (বা 3) দিয়ে বিভাজ্য।'),
    },
  ],
  tips: [
    t(r`$1$ is neither prime nor composite, and $2$ is the only even prime.`, r`$1$ মৌলিকও নয়, যৌগিকও নয়; আর $2$ হল একমাত্র যুগ্ম মৌলিক সংখ্যা।`),
    t('The remainder must always be smaller than the divisor. If it is not, you can divide once more.', 'ভাগশেষ সবসময় ভাজকের থেকে ছোটো হবে। না হলে আরও একবার ভাগ করা যায়।'),
    t('To make a number divisible by adding, add (divisor − remainder), not the remainder itself.', 'যোগ করে বিভাজ্য করতে চাইলে (ভাজক − ভাগশেষ) যোগ করো, ভাগশেষটা নয়।'),
    t('HCF × LCM = product works for two numbers only, not for three.', 'গ.সা.গু. × ল.সা.গু. = গুণফল শুধু দুটি সংখ্যার জন্য খাটে, তিনটির জন্য নয়।'),
    t('The HCF always divides the LCM. If an option breaks this, it is wrong.', 'গ.সা.গু. সবসময় ল.সা.গু.-কে ভাগ করে। কোনো বিকল্পে তা না হলে সেটা ভুল।'),
  ],
};
