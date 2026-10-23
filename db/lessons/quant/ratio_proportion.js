'use strict';

// Chapter lesson: Ratio & Proportion. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'ratio_proportion',
  title: t('Ratio & Proportion', 'অনুপাত ও সমানুপাত'),
  emoji: '⚖️',
  intro: t(
    'A ratio compares two amounts, like "2 cups of rice for every 3 cups of water". We use ratios to share money fairly, follow recipes, read maps and mix colours.',
    'অনুপাত দুটি পরিমাণকে তুলনা করে, যেমন "প্রতি 2 কাপ চালে 3 কাপ জল"। টাকা ন্যায্যভাবে ভাগ করা, রান্নার মাপ, মানচিত্র পড়া বা রং মেশানো — সবেতেই অনুপাত লাগে।',
  ),
  levels: [
    // ───────────────────────────── BASIC ─────────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('What is a ratio?', 'অনুপাত কী?'),
          body: t(
            r`A **ratio** tells how many times one amount is of another. We write it with a colon: $a : b$ (read "a is to b"). It is the same as the fraction $\frac{a}{b}$.

- A class has 12 boys and 18 girls. Boys : girls $= 12 : 18$.
- **Order matters:** girls : boys $= 18 : 12$, which is different.
- Both amounts must be in the **same unit**. Compare 50 paise with ₹2 as $50 : 200$, not $50 : 2$.`,
            r`**অনুপাত** বলে একটি পরিমাণ অন্যটির কত গুণ বা কত অংশ। কোলন দিয়ে লেখা হয়: $a : b$ (পড়া হয় "a অনুপাত b")। এটি ভগ্নাংশ $\frac{a}{b}$-এর সমান।

- একটি ক্লাসে 12 জন ছেলে আর 18 জন মেয়ে। ছেলে : মেয়ে $= 12 : 18$।
- **ক্রম গুরুত্বপূর্ণ:** মেয়ে : ছেলে $= 18 : 12$, যা আলাদা।
- দুটি পরিমাণ **একই এককে** থাকতে হবে। 50 পয়সা আর ₹2 তুলনা করলে লিখবে $50 : 200$, $50 : 2$ নয়।`,
          ),
        },
        {
          heading: t('Simplest form of a ratio', 'অনুপাতের সরলতম রূপ'),
          body: t(
            r`Just like a fraction, a ratio does not change if we divide (or multiply) **both** terms by the same number.

$12 : 18$ — divide both by 6 — $2 : 3$.

So for every 2 boys there are 3 girls. Divide by the **HCF** (highest common factor, the biggest number that divides both) to reach the simplest form in one step.`,
            r`ভগ্নাংশের মতোই, অনুপাতের **দুটি পদকেই** একই সংখ্যা দিয়ে ভাগ (বা গুণ) করলে অনুপাত বদলায় না।

$12 : 18$ — দুটিকেই 6 দিয়ে ভাগ করো — $2 : 3$।

অর্থাৎ প্রতি 2 জন ছেলেতে 3 জন মেয়ে। **গ.সা.গু.** (গরিষ্ঠ সাধারণ গুণনীয়ক, অর্থাৎ যে বৃহত্তম সংখ্যা দুটিকেই ভাগ করে) দিয়ে ভাগ করলে এক ধাপেই সরলতম রূপ পাওয়া যায়।`,
          ),
        },
        {
          heading: t('Sharing in a ratio', 'অনুপাতে ভাগ করা'),
          body: t(
            r`To share an amount in the ratio $a : b$, think of it as **parts**.

1. Add the ratio terms: total parts $= a + b$.
2. Value of one part $= \frac{\text{total amount}}{a + b}$.
3. First share $= a$ parts, second share $= b$ parts.

Check: the shares must add up to the total amount.`,
            r`কোনো পরিমাণকে $a : b$ অনুপাতে ভাগ করতে হলে **অংশ** হিসেবে ভাবো।

1. অনুপাতের পদ যোগ করো: মোট অংশ $= a + b$।
2. এক অংশের মান $= \frac{\text{total amount}}{a + b}$।
3. প্রথম জনের ভাগ $= a$ অংশ, দ্বিতীয় জনের ভাগ $= b$ অংশ।

মিলিয়ে দেখো: দুজনের ভাগ যোগ করলে মোট পরিমাণ হতে হবে।`,
          ),
        },
      ],
      examples: [
        {
          question: t('A class has 12 boys and 18 girls. Find the ratio of boys to girls in its simplest form.', 'একটি ক্লাসে 12 জন ছেলে ও 18 জন মেয়ে আছে। ছেলে ও মেয়ের অনুপাত সরলতম রূপে লেখো।'),
          steps: [
            t(r`Boys : girls $= 12 : 18$.`, r`ছেলে : মেয়ে $= 12 : 18$।`),
            t('The HCF of 12 and 18 is 6. Divide both by 6: 12 ÷ 6 = 2, 18 ÷ 6 = 3.', '12 ও 18-এর গ.সা.গু. 6। দুটিকেই 6 দিয়ে ভাগ করো: 12 ÷ 6 = 2, 18 ÷ 6 = 3।'),
          ],
          answer: t('2 : 3', 'অনুপাত 2 : 3'),
        },
        {
          question: t('Riya and Tapu share 30 sweets in the ratio 2 : 3. How many does each get?', 'রিয়া আর তাপু 30টি মিষ্টি 2 : 3 অনুপাতে ভাগ করে নিল। কে কটি পেল?'),
          steps: [
            t('Total parts = 2 + 3 = 5.', 'মোট অংশ = 2 + 3 = 5।'),
            t('One part = 30 ÷ 5 = 6 sweets.', 'এক অংশ = 30 ÷ 5 = 6টি মিষ্টি।'),
            t('Riya = 2 × 6 = 12, Tapu = 3 × 6 = 18. Check: 12 + 18 = 30.', 'রিয়া = 2 × 6 = 12টি, তাপু = 3 × 6 = 18টি। মিলিয়ে দেখো: 12 + 18 = 30।'),
          ],
          answer: t('Riya 12, Tapu 18', 'রিয়া 12টি, তাপু 18টি'),
        },
        {
          question: t('₹1600 is divided between two persons in the ratio 5 : 3. What is the larger share?', '₹1600 দুজনের মধ্যে 5 : 3 অনুপাতে ভাগ করা হল। বড় ভাগটি কত?'),
          steps: [
            t('Total parts = 5 + 3 = 8. One part = 1600 ÷ 8 = ₹200.', 'মোট অংশ = 5 + 3 = 8। এক অংশ = 1600 ÷ 8 = ₹200।'),
            t('Larger share = 5 parts = 5 × 200 = ₹1000.', 'বড় ভাগ = 5 অংশ = 5 × 200 = ₹1000।'),
          ],
          answer: t('₹1000', 'বড় ভাগটি ₹1000'),
        },
      ],
    },
    // ───────────────────────────── INTERMEDIATE ─────────────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Proportion: two equal ratios', 'সমানুপাত: দুটি সমান অনুপাত'),
          body: t(
            r`When two ratios are equal, the four numbers are in **proportion**: $a : b = c : d$.

- $a$ and $d$ are the **extremes** (outer terms); $b$ and $c$ are the **means** (middle terms).
- **Key rule:** product of extremes = product of means, so $a \times d = b \times c$.

Example: $2 : 3 = 8 : 12$, because $2 \times 12 = 24 = 3 \times 8$.

The missing fourth number $d$ is called the **fourth proportional**: $d = \frac{b \times c}{a}$.`,
            r`দুটি অনুপাত সমান হলে চারটি সংখ্যা **সমানুপাতে** থাকে: $a : b = c : d$।

- $a$ ও $d$ হল **প্রান্তীয় পদ** (বাইরের দুটি); $b$ ও $c$ হল **মধ্যপদ** (ভিতরের দুটি)।
- **মূল নিয়ম:** প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল, অর্থাৎ $a \times d = b \times c$।

উদাহরণ: $2 : 3 = 8 : 12$, কারণ $2 \times 12 = 24 = 3 \times 8$।

অজানা চতুর্থ সংখ্যা $d$-কে বলে **চতুর্থ সমানুপাতী**: $d = \frac{b \times c}{a}$।`,
          ),
        },
        {
          heading: t('Sharing among three people', 'তিনজনের মধ্যে ভাগ'),
          body: t(
            r`The parts idea works for any number of people. For $a : b : c$, total parts $= a + b + c$, and each person gets their parts times the value of one part.`,
            r`অংশের ধারণা যতজন খুশি মানুষের জন্য খাটে। $a : b : c$ হলে মোট অংশ $= a + b + c$, আর প্রত্যেকে নিজের অংশ-সংখ্যা × এক অংশের মান পায়।`,
          ),
        },
        {
          heading: t('When the sum or difference is given', 'যোগফল বা বিয়োগফল দেওয়া থাকলে'),
          body: t(
            r`If two numbers are in the ratio $a : b$, write them as $ak$ and $bk$ (here $k$ is the value of one part).

- Sum given: $ak + bk = \text{sum}$, so $k = \frac{\text{sum}}{a + b}$.
- Difference given: $k = \frac{\text{difference}}{b - a}$.`,
            r`দুটি সংখ্যা $a : b$ অনুপাতে থাকলে তাদের $ak$ ও $bk$ লেখো (এখানে $k$ হল এক অংশের মান)।

- যোগফল দেওয়া থাকলে: $ak + bk = \text{sum}$, তাই $k = \frac{\text{sum}}{a + b}$।
- বিয়োগফল দেওয়া থাকলে: $k = \frac{\text{difference}}{b - a}$।`,
          ),
        },
      ],
      examples: [
        {
          question: t('If 11 : 55 = 14 : x, find the value of x.', '11 : 55 = 14 : x হলে x-এর মান কত?'),
          steps: [
            t(r`Extremes × extremes = means × means: $11 \times x = 55 \times 14$.`, r`প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল: $11 \times x = 55 \times 14$।`),
            t(r`$x = \frac{55 \times 14}{11} = 5 \times 14 = 70$.`, r`তাই $x = \frac{55 \times 14}{11} = 5 \times 14 = 70$।`),
          ],
          answer: t('x = 70', 'x-এর মান 70'),
        },
        {
          question: t('₹6840 is divided among three persons in the ratio 5 : 8 : 6. What does the second person get?', '₹6840 তিনজনের মধ্যে 5 : 8 : 6 অনুপাতে ভাগ করা হল। দ্বিতীয় জন কত পাবে?'),
          steps: [
            t('Total parts = 5 + 8 + 6 = 19.', 'মোট অংশ = 5 + 8 + 6 = 19।'),
            t('One part = 6840 ÷ 19 = ₹360.', 'এক অংশ = 6840 ÷ 19 = ₹360।'),
            t('Second person = 8 × 360 = ₹2880.', 'দ্বিতীয় জন = 8 × 360 = ₹2880।'),
          ],
          answer: t('₹2880', 'দ্বিতীয় জন পাবে ₹2880'),
        },
        {
          question: t('Two numbers are in the ratio 5 : 8 and their sum is 195. What is their difference?', 'দুটি সংখ্যার অনুপাত 5 : 8 এবং তাদের যোগফল 195। সংখ্যা দুটির অন্তর কত?'),
          steps: [
            t('Total parts = 5 + 8 = 13. One part = 195 ÷ 13 = 15.', 'মোট অংশ = 5 + 8 = 13। এক অংশ = 195 ÷ 13 = 15।'),
            t('The difference is 8 − 5 = 3 parts = 3 × 15 = 45.', 'অন্তর হল 8 − 5 = 3 অংশ = 3 × 15 = 45।'),
            t('Check: the numbers are 75 and 120; 75 + 120 = 195 and 120 − 75 = 45.', 'মিলিয়ে দেখো: সংখ্যা দুটি 75 ও 120; 75 + 120 = 195 আর 120 − 75 = 45।'),
          ],
          answer: t('45', 'অন্তর 45'),
        },
      ],
    },
    // ───────────────────────────── ADVANCED ─────────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Joining two ratios (A : B and B : C)', 'দুটি অনুপাত জোড়া (A : B ও B : C)'),
          body: t(
            r`If $A : B$ and $B : C$ are given, we cannot just put them side by side, because B may stand for different numbers of parts. **Make B the same** in both.

- Quick way for $A : C$: multiply across, $A : C = (A \times B') : (B \times C)$ where the first ratio is $A : B$ and the second is $B' : C$.
- For $A : B : C$: multiply the first ratio by the second B, and the second ratio by the first B.

Example: $A : B = 2 : 3$, $B : C = 4 : 5$. Make B $= 12$: $A : B : C = 8 : 12 : 15$.`,
            r`$A : B$ আর $B : C$ দেওয়া থাকলে সেগুলি সরাসরি পাশাপাশি বসানো যায় না, কারণ দুটিতে B-এর অংশ-সংখ্যা আলাদা হতে পারে। তাই **দুটিতে B-কে সমান করো**।

- $A : C$ পাওয়ার সহজ উপায়: আড়াআড়ি গুণ, প্রথম অনুপাত $A : B$ আর দ্বিতীয়টি $B' : C$ হলে $A : C = (A \times B') : (B \times C)$।
- $A : B : C$ পেতে: প্রথম অনুপাতকে দ্বিতীয়টির B দিয়ে, আর দ্বিতীয় অনুপাতকে প্রথমটির B দিয়ে গুণ করো।

উদাহরণ: $A : B = 2 : 3$, $B : C = 4 : 5$। B-কে $12$ করো: $A : B : C = 8 : 12 : 15$।`,
          ),
        },
        {
          heading: t('Adding the same number to both terms', 'দুটি পদে একই সংখ্যা যোগ'),
          body: t(
            r`If the same number is added to (or subtracted from) both numbers, the **difference between them does not change**. Use this as a shortcut.

Write the numbers as $ak$ and $bk$, form the new ratio, and cross-multiply to find $k$.`,
            r`দুটি সংখ্যার সঙ্গেই একই সংখ্যা যোগ (বা বিয়োগ) করলে **তাদের অন্তর বদলায় না**। এটি একটি দারুণ সংক্ষিপ্ত কৌশল।

সংখ্যা দুটিকে $ak$ ও $bk$ লেখো, নতুন অনুপাত গঠন করো, আর আড়াআড়ি গুণ করে $k$ বের করো।`,
          ),
        },
        {
          heading: t('Mean and third proportional', 'মধ্যসমানুপাতী ও তৃতীয় সমানুপাতী'),
          body: t(
            r`- **Mean proportional** of $a$ and $b$: the number $x$ with $a : x = x : b$. So $x^2 = ab$, $x = \sqrt{ab}$. Mean proportional of 4 and 9 is $\sqrt{36} = 6$.
- **Third proportional** of $a$ and $b$: the number $c$ with $a : b = b : c$. So $c = \frac{b^2}{a}$. Third proportional of 4 and 6 is $\frac{36}{4} = 9$.`,
            r`- $a$ ও $b$-এর **মধ্যসমানুপাতী**: সেই সংখ্যা $x$ যার জন্য $a : x = x : b$। তাই $x^2 = ab$, $x = \sqrt{ab}$। 4 ও 9-এর মধ্যসমানুপাতী $\sqrt{36} = 6$।
- $a$ ও $b$-এর **তৃতীয় সমানুপাতী**: সেই সংখ্যা $c$ যার জন্য $a : b = b : c$। তাই $c = \frac{b^2}{a}$। 4 ও 6-এর তৃতীয় সমানুপাতী $\frac{36}{4} = 9$।`,
          ),
        },
      ],
      examples: [
        {
          question: t('If A : B = 7 : 4 and B : C = 5 : 8, then A : C = ?', 'A : B = 7 : 4 এবং B : C = 5 : 8 হলে A : C কত?'),
          steps: [
            t(r`Multiply across: $A : C = (7 \times 5) : (4 \times 8) = 35 : 32$.`, r`আড়াআড়ি গুণ করো: $A : C = (7 \times 5) : (4 \times 8) = 35 : 32$।`),
            t(r`Check by making B equal to 20: $A : B = 35 : 20$ and $B : C = 20 : 32$.`, r`B-কে 20 করে মিলিয়ে দেখো: $A : B = 35 : 20$ এবং $B : C = 20 : 32$।`),
          ],
          answer: t('A : C = 35 : 32', 'নির্ণেয় অনুপাত A : C = 35 : 32'),
        },
        {
          question: t('If A : B = 4 : 3 and B : C = 5 : 7, find A : B : C.', 'A : B = 4 : 3 এবং B : C = 5 : 7 হলে A : B : C কত?'),
          steps: [
            t(r`B is 3 in the first ratio and 5 in the second. Make it $15$.`, r`প্রথম অনুপাতে B হল 3, দ্বিতীয়টিতে 5। B-কে $15$ করো।`),
            t(r`Multiply the first ratio by 5 and the second by 3: $A : B = 4 \times 5 : 3 \times 5 = 20 : 15$; $B : C = 5 \times 3 : 7 \times 3 = 15 : 21$.`, r`প্রথমটিকে 5 দিয়ে আর দ্বিতীয়টিকে 3 দিয়ে গুণ করো: $A : B = 4 \times 5 : 3 \times 5 = 20 : 15$; $B : C = 5 \times 3 : 7 \times 3 = 15 : 21$।`),
            t(r`So $A : B : C = 20 : 15 : 21$.`, r`তাই $A : B : C = 20 : 15 : 21$।`),
          ],
          answer: t('A : B : C = 20 : 15 : 21', 'নির্ণেয় অনুপাত A : B : C = 20 : 15 : 21'),
        },
        {
          question: t('Two numbers are in the ratio 3 : 5. If 10 is added to each of them, the ratio becomes 5 : 7. Find the larger of the original numbers.', 'দুটি সংখ্যার অনুপাত 3 : 5। প্রতিটির সঙ্গে 10 যোগ করলে অনুপাত হয় 5 : 7। মূল সংখ্যা দুটির মধ্যে বড়টি কত?'),
          steps: [
            t(r`Let the numbers be $3k$ and $5k$. Then $\frac{3k + 10}{5k + 10} = \frac{5}{7}$.`, r`ধরো সংখ্যা দুটি $3k$ ও $5k$। তাহলে $\frac{3k + 10}{5k + 10} = \frac{5}{7}$।`),
            t(r`Cross-multiply: $7(3k + 10) = 5(5k + 10)$, so $21k + 70 = 25k + 50$.`, r`আড়াআড়ি গুণ করো: $7(3k + 10) = 5(5k + 10)$, অর্থাৎ $21k + 70 = 25k + 50$।`),
            t(r`$4k = 20$, so $k = 5$. The numbers are 15 and 25.`, r`$4k = 20$, তাই $k = 5$। সংখ্যা দুটি 15 ও 25।`),
            t(r`Check: $15 + 10 = 25$, $25 + 10 = 35$, and $25 : 35 = 5 : 7$.`, r`মিলিয়ে দেখো: $15 + 10 = 25$, $25 + 10 = 35$, আর $25 : 35 = 5 : 7$।`),
          ],
          answer: t('25', 'বড় সংখ্যাটি 25'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Ratio as a fraction', 'অনুপাত ভগ্নাংশ হিসেবে'),
      latex: r`a : b = \frac{a}{b} = \frac{ka}{kb}`,
      explain: t('Multiplying or dividing both terms by the same number does not change a ratio.', 'দুটি পদকে একই সংখ্যা দিয়ে গুণ বা ভাগ করলে অনুপাত বদলায় না।'),
    },
    {
      label: t('Share in a ratio', 'অনুপাতে ভাগ'),
      latex: r`\text{Share of A} = \frac{a}{a + b} \times \text{Total}`,
      explain: t('Find the value of one part, then multiply by the number of parts.', 'আগে এক অংশের মান বের করো, তারপর অংশ-সংখ্যা দিয়ে গুণ করো।'),
    },
    {
      label: t('Proportion', 'সমানুপাত'),
      latex: r`a : b = c : d \iff a \times d = b \times c`,
      explain: t('Product of the outer terms equals product of the middle terms.', 'বাইরের দুটি পদের গুণফল = ভিতরের দুটি পদের গুণফল।'),
    },
    {
      label: t('Fourth proportional', 'চতুর্থ সমানুপাতী'),
      latex: r`d = \frac{b \times c}{a}`,
      explain: t('The number d that makes a : b = c : d.', 'যে সংখ্যা d-এর জন্য a : b = c : d হয়।'),
    },
    {
      label: t('Mean and third proportional', 'মধ্যসমানুপাতী ও তৃতীয় সমানুপাতী'),
      latex: r`\text{Mean} = \sqrt{ab}, \qquad \text{Third} = \frac{b^2}{a}`,
      explain: t('Mean: a : x = x : b. Third: a : b = b : c.', 'মধ্যসমানুপাতী: a : x = x : b। তৃতীয় সমানুপাতী: a : b = b : c।'),
    },
    {
      label: t('Joining two ratios', 'দুটি অনুপাত জোড়া'),
      latex: r`\frac{A}{C} = \frac{A}{B} \times \frac{B}{C}`,
      explain: t('Multiply the two fractions; B cancels out.', 'ভগ্নাংশ দুটি গুণ করো; B কাটাকাটি হয়ে যায়।'),
    },
  ],
  tips: [
    t('Order matters: boys : girls is not the same as girls : boys.', 'ক্রম গুরুত্বপূর্ণ: ছেলে : মেয়ে আর মেয়ে : ছেলে এক নয়।'),
    t('Convert both amounts to the same unit before writing a ratio (paise with paise, grams with grams).', 'অনুপাত লেখার আগে দুটি পরিমাণকে একই এককে আনো (পয়সার সঙ্গে পয়সা, গ্রামের সঙ্গে গ্রাম)।'),
    t('Always check that the shares add up to the total. It catches most mistakes.', 'সবসময় মিলিয়ে দেখো ভাগগুলি যোগ করলে মোট পরিমাণ হচ্ছে কি না। এতে বেশিরভাগ ভুল ধরা পড়ে।'),
    t('If A : B = 2 : 3 and B : C = 4 : 5, then A : C is NOT 2 : 5. The two B values stand for different amounts, so make B equal first.', 'A : B = 2 : 3 আর B : C = 4 : 5 হলে A : C কিন্তু 2 : 5 নয়। দুটি B আলাদা পরিমাণ বোঝায়, তাই আগে B-কে সমান করো।'),
    t('If the same number is added to both terms, their difference stays the same. Use this to check your answer quickly.', 'দুটি পদের সঙ্গে একই সংখ্যা যোগ করলে তাদের অন্তর একই থাকে। এটা দিয়ে চটজলদি উত্তর মিলিয়ে নিতে পারো।'),
  ],
};
