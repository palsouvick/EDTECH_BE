'use strict';

// Chapter lesson: Simple & Compound Interest. Format: see ../validate.js.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'interest',
  title: t('Simple & Compound Interest', 'সরল ও চক্রবৃদ্ধি সুদ'),
  emoji: '💰',
  intro: t(
    'When you keep money in a bank, the bank pays you a little extra for using it. When you borrow money, you pay a little extra back. That extra money is called interest, and this chapter shows how to calculate it.',
    'ব্যাংকে টাকা রাখলে ব্যাংক সেই টাকা ব্যবহারের জন্য তোমাকে কিছু বাড়তি টাকা দেয়। আবার টাকা ধার করলে ফেরত দেওয়ার সময় কিছু বাড়তি দিতে হয়। এই বাড়তি টাকাকেই বলে সুদ। এই অধ্যায়ে শিখব সুদের হিসাব কীভাবে করতে হয়।',
  ),
  levels: [
    // ─────────────────────────── BASIC ───────────────────────────
    {
      level: 'basic',
      sections: [
        {
          heading: t('The words we need', 'যে শব্দগুলো জানা দরকার'),
          body: t(
            r`Suppose you lend your uncle ₹100 for one year and he gives back ₹110.

- **Principal** ($P$): the money first lent or borrowed. Here ₹100.
- **Interest** ($I$): the extra money paid for using it. Here ₹10.
- **Rate** ($R$): interest on every ₹100 for one year, written as a percentage. Here $10\%$ **per annum** (per annum = per year).
- **Time** ($T$): how long the money is kept, in years. Here $1$ year.
- **Amount** ($A$): principal + interest. Here ₹110.`,
            r`ধরো, তুমি কাকুকে এক বছরের জন্য ₹100 ধার দিলে, আর তিনি ফেরত দিলেন ₹110।

- **আসল** ($P$): প্রথমে যে টাকা ধার দেওয়া বা নেওয়া হয়। এখানে ₹100।
- **সুদ** ($I$): টাকা ব্যবহারের জন্য দেওয়া বাড়তি টাকা। এখানে ₹10।
- **সুদের হার** ($R$): প্রতি ₹100-তে এক বছরে কত সুদ, শতকরায় লেখা হয়। এখানে **বার্ষিক** $10\%$ (বার্ষিক = প্রতি বছরে)।
- **সময়** ($T$): টাকা কত দিন রাখা হল, বছরের হিসাবে। এখানে $1$ বছর।
- **সুদাসল** ($A$): আসল + সুদ। এখানে ₹110।`,
          ),
        },
        {
          heading: t('Simple interest', 'সরল সুদ'),
          body: t(
            r`In **simple interest** (SI), the interest is the same every year, because it is always calculated on the original principal.

If ₹100 earns ₹10 in a year, then in $3$ years it earns $10 + 10 + 10 = ₹30$. So:

$$\text{SI} = \dfrac{P \times R \times T}{100}$$

**Why divide by 100?** Because the rate is "per hundred". A quick method: find **one year's** interest, then multiply by the number of years.`,
            r`**সরল সুদে** প্রতি বছরের সুদ সমান, কারণ সুদ সবসময় শুধু প্রথম আসলের ওপর হিসাব হয়।

₹100 এক বছরে ₹10 সুদ দিলে $3$ বছরে দেবে $10 + 10 + 10 = ₹30$। তাই:

$$\text{SI} = \dfrac{P \times R \times T}{100}$$

**100 দিয়ে ভাগ কেন?** কারণ হার মানে "প্রতি শতে"। সহজ উপায়: আগে **এক বছরের** সুদ বের করো, তারপর বছরের সংখ্যা দিয়ে গুণ করো।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Find the simple interest on ₹500 at 4% per annum for 3 years. What is the amount?', 'বার্ষিক 4% হারে ₹500-এর 3 বছরের সরল সুদ কত? সুদাসল কত?'),
          steps: [
            t(r`One year's interest $= \dfrac{500 \times 4}{100} = ₹20$.`, r`এক বছরের সুদ $= \dfrac{500 \times 4}{100} = ₹20$।`),
            t(r`For $3$ years: $20 \times 3 = ₹60$.`, r`$3$ বছরের সুদ: $20 \times 3 = ₹60$।`),
            t(r`Amount $= 500 + 60 = ₹560$.`, r`সুদাসল $= 500 + 60 = ₹560$।`),
          ],
          answer: t('SI = ₹60, Amount = ₹560', 'সরল সুদ ₹60, সুদাসল ₹560'),
        },
        {
          question: t('Find the simple interest on ₹12000 at 10% per annum for 2 years.', 'বার্ষিক 10% হারে ₹12000-এর 2 বছরের সরল সুদ নির্ণয় করো।'),
          steps: [
            t(r`$\text{SI} = \dfrac{12000 \times 10 \times 2}{100}$.`, r`সূত্রে বসাই: $\text{SI} = \dfrac{12000 \times 10 \times 2}{100}$।`),
            t(r`$= 120 \times 10 \times 2 = ₹2400$.`, r`হিসাব করে পাই $120 \times 10 \times 2 = ₹2400$।`),
          ],
          answer: t('₹2400', 'সরল সুদ ₹2400'),
        },
      ],
    },
    // ─────────────────────── INTERMEDIATE ───────────────────────
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('Turning the formula around', 'সূত্র উলটে ব্যবহার'),
          body: t(
            r`$\text{SI} = \dfrac{PRT}{100}$ links four things. If you know any three, you can find the fourth:

- Principal: $P = \dfrac{100 \times \text{SI}}{R \times T}$
- Rate: $R = \dfrac{100 \times \text{SI}}{P \times T}$
- Time: $T = \dfrac{100 \times \text{SI}}{P \times R}$

Read the question carefully: is the given number the **interest** or the **amount**? If it is the amount, first do $\text{SI} = A - P$.`,
            r`$\text{SI} = \dfrac{PRT}{100}$ চারটি জিনিসকে যুক্ত করে। যে কোনো তিনটি জানলে চতুর্থটি বের করা যায়:

- আসল: $P = \dfrac{100 \times \text{SI}}{R \times T}$
- হার: $R = \dfrac{100 \times \text{SI}}{P \times T}$
- সময়: $T = \dfrac{100 \times \text{SI}}{P \times R}$

প্রশ্নটা মন দিয়ে পড়ো: দেওয়া সংখ্যাটা **সুদ** না **সুদাসল**? সুদাসল হলে আগে $\text{SI} = A - P$ করে নাও।`,
          ),
        },
        {
          heading: t('When money doubles', 'যখন টাকা দ্বিগুণ হয়'),
          body: t(
            r`"A sum doubles in $8$ years at simple interest." Doubling means the interest earned equals the principal itself.

So $\dfrac{P \times R \times 8}{100} = P$, which gives $R \times 8 = 100$, so $R = 12.5\%$.

Shortcut: for doubling, $R \times T = 100$. For tripling, the interest is $2P$, so $R \times T = 200$.`,
            r`"সরল সুদে একটি টাকা $8$ বছরে দ্বিগুণ হয়।" দ্বিগুণ হওয়া মানে সুদের পরিমাণ আসলের সমান।

তাই $\dfrac{P \times R \times 8}{100} = P$, অর্থাৎ $R \times 8 = 100$, তাই $R = 12.5\%$।

কৌশল: দ্বিগুণ হলে $R \times T = 100$। তিনগুণ হলে সুদ $2P$, তাই $R \times T = 200$।`,
          ),
        },
      ],
      examples: [
        {
          question: t('A sum of money earns a simple interest of ₹2100 in 5 years at 12% per annum. Find the sum.', 'বার্ষিক 12% সরল সুদে একটি অর্থ 5 বছরে ₹2100 সুদ দেয়। আসল অর্থ কত?'),
          steps: [
            t(r`$P = \dfrac{100 \times 2100}{12 \times 5} = \dfrac{210000}{60}$.`, r`আসল $P = \dfrac{100 \times 2100}{12 \times 5} = \dfrac{210000}{60}$।`),
            t(r`$= ₹3500$.`, r`অতএব আসল $= ₹3500$।`),
            t(r`Check: $\dfrac{3500 \times 12 \times 5}{100} = 35 \times 60 = 2100$.`, r`যাচাই: $\dfrac{3500 \times 12 \times 5}{100} = 35 \times 60 = 2100$।`),
          ],
          answer: t('₹3500', 'আসল ₹3500'),
        },
        {
          question: t('At what rate percent per annum will ₹2500 earn a simple interest of ₹300 in 3 years?', 'বার্ষিক শতকরা কত হার সুদে ₹2500, 3 বছরে ₹300 সরল সুদ দেবে?'),
          steps: [
            t(r`$R = \dfrac{100 \times 300}{2500 \times 3} = \dfrac{30000}{7500}$.`, r`হার $R = \dfrac{100 \times 300}{2500 \times 3} = \dfrac{30000}{7500}$।`),
            t(r`$= 4$, so the rate is $4\%$.`, r`অর্থাৎ $4$, তাই হার $4\%$।`),
          ],
          answer: t('4% per annum', 'বার্ষিক 4%'),
        },
        {
          question: t('A sum becomes double in 8 years at simple interest. What is the rate of interest per annum?', 'সরল সুদে একটি অর্থ 8 বছরে দ্বিগুণ হয়। বার্ষিক সুদের হার কত?'),
          steps: [
            t(r`Doubling means $\text{SI} = P$, so $R \times T = 100$.`, r`দ্বিগুণ মানে সুদ = আসল, তাই $R \times T = 100$।`),
            t(r`$R = 100 \div 8 = 12.5$.`, r`তাই $R = 100 \div 8 = 12.5$।`),
          ],
          answer: t('12.5% per annum', 'বার্ষিক 12.5%'),
        },
      ],
    },
    // ───────────────────────── ADVANCED ─────────────────────────
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Compound interest: interest on interest', 'চক্রবৃদ্ধি সুদ: সুদের ওপরও সুদ'),
          body: t(
            r`In **compound interest** (CI), at the end of each year the interest is **added to the principal**, and next year's interest is calculated on this bigger amount. So the money grows faster than with SI.

₹1000 at $10\%$ compounded yearly:

- Year 1: interest ₹100, amount ₹1100.
- Year 2: interest on ₹1100 is ₹110, amount ₹1210.

Formula: $A = P\left(1 + \dfrac{R}{100}\right)^n$ and $\text{CI} = A - P$. Here $1000 \times 1.1^2 = 1210$, so CI $= ₹210$ (SI would be only ₹200).`,
            r`**চক্রবৃদ্ধি সুদে** প্রতি বছরের শেষে সুদ **আসলের সঙ্গে যোগ হয়ে যায়**, আর পরের বছরের সুদ হিসাব হয় এই বড়ো অঙ্কের ওপর। তাই সরল সুদের চেয়ে টাকা তাড়াতাড়ি বাড়ে।

বার্ষিক $10\%$ চক্রবৃদ্ধি হারে ₹1000:

- প্রথম বছর: সুদ ₹100, সুদাসল ₹1100।
- দ্বিতীয় বছর: ₹1100-এর সুদ ₹110, সুদাসল ₹1210।

সূত্র: $A = P\left(1 + \dfrac{R}{100}\right)^n$ এবং চক্রবৃদ্ধি সুদ $= A - P$। এখানে $1000 \times 1.1^2 = 1210$, তাই চক্রবৃদ্ধি সুদ $= ₹210$ (সরল সুদ হত মাত্র ₹200)।`,
          ),
        },
        {
          heading: t('Fraction trick and half-yearly interest', 'ভগ্নাংশের কৌশল ও ষাণ্মাসিক সুদ'),
          body: t(
            r`- Write the rate as a fraction to multiply fast: $5\% \to \frac{21}{20}$, $10\% \to \frac{11}{10}$, $20\% \to \frac{6}{5}$, $8\% \to \frac{27}{25}$, $4\% \to \frac{26}{25}$.
- **Half-yearly** compounding: halve the rate and double the number of periods. $10\%$ for $1$ year half-yearly becomes $5\%$ for $2$ periods.
- **Quarterly**: rate $\div 4$, periods $\times 4$.`,
            r`- দ্রুত গুণ করতে হারকে ভগ্নাংশে লেখো: $5\% \to \frac{21}{20}$, $10\% \to \frac{11}{10}$, $20\% \to \frac{6}{5}$, $8\% \to \frac{27}{25}$, $4\% \to \frac{26}{25}$।
- **ষাণ্মাসিক** (ছ'মাস অন্তর) সুদ যুক্ত হলে হার অর্ধেক আর সময়ের ধাপ দ্বিগুণ। বার্ষিক $10\%$ হারে $1$ বছর ষাণ্মাসিক হলে হয় $5\%$ হারে $2$ ধাপ।
- **ত্রৈমাসিক** হলে হার $\div 4$, ধাপ $\times 4$।`,
          ),
        },
        {
          heading: t('CI − SI shortcut', 'চক্রবৃদ্ধি সুদ − সরল সুদের কৌশল'),
          body: t(
            r`For the **same** $P$ and $R$:

- For $2$ years: $\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2$. The extra is just the interest earned on the first year's interest.
- For $3$ years: $\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2\left(3 + \dfrac{R}{100}\right)$.

In year 1, CI and SI are always equal.`,
            r`একই $P$ আর $R$ হলে:

- $2$ বছরে: $\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2$। বাড়তিটুকু আসলে প্রথম বছরের সুদের ওপর দ্বিতীয় বছরের সুদ।
- $3$ বছরে: $\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2\left(3 + \dfrac{R}{100}\right)$।

প্রথম বছরে চক্রবৃদ্ধি আর সরল সুদ সবসময় সমান।`,
          ),
        },
      ],
      examples: [
        {
          question: t('Find the compound interest on ₹2500 for 2 years at 12% per annum, compounded annually.', 'বার্ষিক 12% চক্রবৃদ্ধি হারে ₹2500-এর 2 বছরের চক্রবৃদ্ধি সুদ নির্ণয় করো।'),
          steps: [
            t(r`Year 1: interest $= 12\%$ of $2500 = 300$, amount $= 2800$.`, r`প্রথম বছর: সুদ $= 2500$-এর $12\% = 300$, সুদাসল $= 2800$।`),
            t(r`Year 2: interest $= 12\%$ of $2800 = 336$, amount $= 3136$.`, r`দ্বিতীয় বছর: সুদ $= 2800$-এর $12\% = 336$, সুদাসল $= 3136$।`),
            t(r`CI $= 3136 - 2500 = ₹636$. (Formula check: $2500 \times 1.12^2 = 2500 \times 1.2544 = 3136$.)`, r`চক্রবৃদ্ধি সুদ $= 3136 - 2500 = ₹636$। (সূত্রে যাচাই: $2500 \times 1.12^2 = 2500 \times 1.2544 = 3136$।)`),
          ],
          answer: t('₹636', 'চক্রবৃদ্ধি সুদ ₹636'),
        },
        {
          question: t('What is the difference between the compound interest and the simple interest on ₹5000 for 2 years at 8% per annum?', 'বার্ষিক 8% হারে ₹5000-এর 2 বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য কত?'),
          steps: [
            t(r`Shortcut: $P\left(\dfrac{R}{100}\right)^2 = 5000 \times \dfrac{8}{100} \times \dfrac{8}{100}$.`, r`কৌশল: $P\left(\dfrac{R}{100}\right)^2 = 5000 \times \dfrac{8}{100} \times \dfrac{8}{100}$।`),
            t(r`$= 5000 \times \dfrac{64}{10000} = ₹32$.`, r`হিসাব করে পাই $5000 \times \dfrac{64}{10000} = ₹32$।`),
            t(r`Check: SI $= 800$. CI: $5000 \to 5400 \to 5832$, so CI $= 832$. Difference $= 32$.`, r`যাচাই: সরল সুদ $= 800$। চক্রবৃদ্ধি: $5000 \to 5400 \to 5832$, তাই চক্রবৃদ্ধি সুদ $= 832$। পার্থক্য $= 32$।`),
          ],
          answer: t('₹32', 'পার্থক্য ₹32'),
        },
        {
          question: t('Find the compound interest on ₹16000 for 3 years at 5% per annum, compounded annually.', 'বার্ষিক 5% চক্রবৃদ্ধি হারে ₹16000-এর 3 বছরের চক্রবৃদ্ধি সুদ নির্ণয় করো।'),
          steps: [
            t(r`$5\% \to \frac{21}{20}$, so $A = 16000 \times \left(\frac{21}{20}\right)^3 = 16000 \times \frac{9261}{8000}$.`, r`$5\% \to \frac{21}{20}$, তাই $A = 16000 \times \left(\frac{21}{20}\right)^3 = 16000 \times \frac{9261}{8000}$।`),
            t(r`$= 2 \times 9261 = ₹18522$.`, r`সুদাসল $= 2 \times 9261 = ₹18522$।`),
            t(r`CI $= 18522 - 16000 = ₹2522$.`, r`চক্রবৃদ্ধি সুদ $= 18522 - 16000 = ₹2522$।`),
          ],
          answer: t('₹2522', 'চক্রবৃদ্ধি সুদ ₹2522'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Simple interest', 'সরল সুদ'),
      latex: r`\text{SI} = \dfrac{P \times R \times T}{100}`,
      explain: t('Principal × rate × time, divided by 100. Time must be in years.', 'আসল × হার × সময়, ভাগ 100। সময় বছরে নিতে হবে।'),
    },
    {
      label: t('Amount', 'সুদাসল'),
      latex: r`A = P + \text{SI}`,
      explain: t('The total you get back: principal plus interest.', 'মোট যা ফেরত পাওয়া যায়: আসল যোগ সুদ।'),
    },
    {
      label: t('Principal, rate or time from SI', 'সরল সুদ থেকে আসল, হার বা সময়'),
      latex: r`P = \dfrac{100\,\text{SI}}{RT},\quad R = \dfrac{100\,\text{SI}}{PT},\quad T = \dfrac{100\,\text{SI}}{PR}`,
      explain: t('Put 100 × SI on top and the other two on the bottom.', 'ওপরে 100 × সুদ, নীচে বাকি দুটির গুণফল।'),
    },
    {
      label: t('Doubling at simple interest', 'সরল সুদে দ্বিগুণ'),
      latex: r`R \times T = 100`,
      explain: t('A sum doubles when rate × years = 100 (triples when it is 200).', 'হার × বছর = 100 হলে টাকা দ্বিগুণ হয় (200 হলে তিনগুণ)।'),
    },
    {
      label: t('Compound amount', 'চক্রবৃদ্ধি সুদাসল'),
      latex: r`A = P\left(1 + \dfrac{R}{100}\right)^n,\qquad \text{CI} = A - P`,
      explain: t('Multiply by (1 + R/100) once for every year; subtract P to get the interest.', 'প্রতি বছরের জন্য একবার করে (1 + R/100) দিয়ে গুণ করো; আসল বাদ দিলে সুদ।'),
    },
    {
      label: t('CI − SI for 2 years', '2 বছরের চক্রবৃদ্ধি সুদ − সরল সুদ'),
      latex: r`\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2`,
      explain: t('The extra is the interest on the first year\'s interest.', 'বাড়তিটুকু হল প্রথম বছরের সুদের ওপর সুদ।'),
    },
    {
      label: t('CI − SI for 3 years', '3 বছরের চক্রবৃদ্ধি সুদ − সরল সুদ'),
      latex: r`\text{CI} - \text{SI} = P\left(\dfrac{R}{100}\right)^2\left(3 + \dfrac{R}{100}\right)`,
      explain: t('Use only for 3 years, same rate every year.', 'শুধু 3 বছরের জন্য, প্রতি বছর একই হার হলে।'),
    },
  ],
  tips: [
    t('Check whether the question asks for the interest or the amount. Amount = principal + interest.', 'প্রশ্নে সুদ চাওয়া হয়েছে না সুদাসল, দেখে নাও। সুদাসল = আসল + সুদ।'),
    t('Convert months to years before using the formula: 6 months = 1/2 year, 9 months = 3/4 year.', 'সূত্রে বসানোর আগে মাসকে বছরে বদলাও: 6 মাস = 1/2 বছর, 9 মাস = 3/4 বছর।'),
    t('For 1 year (compounded yearly), CI and SI are the same. CI is bigger only from the second year.', '1 বছরে (বার্ষিক চক্রবৃদ্ধি) চক্রবৃদ্ধি আর সরল সুদ সমান। দ্বিতীয় বছর থেকে চক্রবৃদ্ধি সুদ বেশি হয়।'),
    t('In compound interest, do not multiply one year\'s interest by n: each year\'s interest is bigger than the last.', 'চক্রবৃদ্ধি সুদে এক বছরের সুদকে n দিয়ে গুণ কোরো না: প্রতি বছরের সুদ আগের বছরের চেয়ে বেশি।'),
    t('Half-yearly compounding: halve the rate and double the number of periods.', 'ষাণ্মাসিক চক্রবৃদ্ধিতে হার অর্ধেক আর ধাপের সংখ্যা দ্বিগুণ করো।'),
  ],
};
