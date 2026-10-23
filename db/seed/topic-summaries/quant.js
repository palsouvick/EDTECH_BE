'use strict';

/**
 * "How to solve" concept sheets for Quantitative Aptitude.
 * Format: see ./validate.js header.
 *
 *   node db/seed/topic-summaries/validate.js db/seed/topic-summaries/quant.js
 */

// String.raw keeps LaTeX backslashes readable (\frac instead of \\frac).
const r = String.raw;
const t = (en, bn) => ({ en, bn });
const v = (symbol, en, bn) => ({ symbol, meaning: { en, bn } });

module.exports = [
  // ───────────────────────────── PERCENTAGE ─────────────────────────────
  {
    subject: 'quant',
    topic: 'percentage',
    title: { en: 'Percentage', bn: 'শতকরা', hi: 'प्रतिशत' },
    overview: t(
      r`A percentage is a fraction with denominator 100, and **every percentage is taken of some base**. Before computing anything, ask "per cent *of what*?" — in "A is 25% more than B" the base is B. When only percentages are given, assume the base is $100$ so every change becomes a plain number. Convert common percentages to fractions ($25\% = \frac{1}{4}$, $12.5\% = \frac{1}{8}$) and handle successive changes with multiplying factors ($+20\% \to \times 1.2$, $-10\% \to \times 0.9$) instead of adding the percentages.`,
      r`শতকরা হল এমন একটি ভগ্নাংশ যার হর 100, এবং **প্রতিটি শতকরা হার কোনো একটি ভিত্তির উপর হিসাব হয়**। কিছু হিসাব করার আগে নিজেকে জিজ্ঞাসা করুন "কিসের শতকরা?" — "A, B-এর থেকে 25% বেশি" কথাটিতে ভিত্তি হল B। শুধু শতকরা হার দেওয়া থাকলে ভিত্তি $100$ ধরে নিন, তাহলে প্রতিটি পরিবর্তন একটি সাধারণ সংখ্যা হয়ে যায়। প্রচলিত শতকরাগুলিকে ভগ্নাংশে বদলে নিন ($25\% = \frac{1}{4}$, $12.5\% = \frac{1}{8}$) এবং পরপর পরিবর্তনগুলি শতকরা যোগ না করে গুণক দিয়ে হিসাব করুন ($+20\% \to \times 1.2$, $-10\% \to \times 0.9$)।`,
    ),
    formulas: [
      {
        key: 'percent_of',
        label: t('x% of a quantity', 'কোনো রাশির x%'),
        latex: r`x\% \text{ of } A = \dfrac{x}{100} \times A`,
        variables: [v('x', 'Percentage', 'শতকরা হার'), v('A', 'Base quantity', 'ভিত্তি রাশি')],
      },
      {
        key: 'percent_change',
        label: t('Percentage change', 'শতকরা পরিবর্তন'),
        latex: r`\text{Change\%} = \dfrac{\text{New} - \text{Old}}{\text{Old}} \times 100`,
        explanation: t(
          'The base is always the **original (old)** value. A negative result means a decrease.',
          'ভিত্তি সর্বদা **পুরোনো (প্রাথমিক)** মান। ফল ঋণাত্মক হলে তা হ্রাস বোঝায়।',
        ),
      },
      {
        key: 'successive_change',
        label: t('Two successive changes', 'পরপর দুটি পরিবর্তন'),
        latex: r`\text{Net\%} = a + b + \dfrac{ab}{100}`,
        explanation: t(
          r`Use $a, b$ with sign: an increase is positive, a decrease negative. $+20\%$ then $-10\%$ gives $20 - 10 - 2 = 8\%$ increase.`,
          r`$a, b$ চিহ্নসহ নিন: বৃদ্ধি ধনাত্মক, হ্রাস ঋণাত্মক। $+20\%$ তারপর $-10\%$ হলে $20 - 10 - 2 = 8\%$ বৃদ্ধি।`,
        ),
      },
      {
        key: 'more_than_less_than',
        label: t('A is r% more than B ⇒ B is less than A by', 'A, B-এর থেকে r% বেশি হলে B, A-এর থেকে কত কম'),
        latex: r`\text{B is less by } \dfrac{r}{100 + r} \times 100\%`,
        explanation: t(
          r`For "A is $r\%$ less than B", B is more than A by $\frac{r}{100 - r} \times 100\%$.`,
          r`"A, B-এর থেকে $r\%$ কম" হলে B, A-এর থেকে $\frac{r}{100 - r} \times 100\%$ বেশি।`,
        ),
      },
      {
        key: 'price_consumption',
        label: t('Price rises, expenditure unchanged', 'দাম বাড়লে খরচ অপরিবর্তিত রাখা'),
        latex: r`\text{Cut in consumption} = \dfrac{r}{100 + r} \times 100\%`,
        explanation: t(
          r`If the price falls by $r\%$, consumption can rise by $\frac{r}{100 - r} \times 100\%$ for the same expenditure.`,
          r`দাম $r\%$ কমলে একই খরচে ভোগ $\frac{r}{100 - r} \times 100\%$ বাড়ানো যায়।`,
        ),
      },
      {
        key: 'population_growth',
        label: t('Population / value after n years', 'n বছর পরে জনসংখ্যা / মূল্য'),
        latex: r`P_n = P\left(1 + \dfrac{r}{100}\right)^{n}`,
        variables: [
          v('P', 'Present value', 'বর্তমান মান'),
          v('r', 'Rate of change per year', 'বার্ষিক পরিবর্তনের হার'),
          v('n', 'Number of years', 'বছরের সংখ্যা'),
        ],
        explanation: t(
          r`For depreciation use $1 - \frac{r}{100}$.`,
          r`অবচয় (মূল্য হ্রাস) হলে $1 - \frac{r}{100}$ ব্যবহার করুন।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Assume the base = 100', 'ভিত্তি = 100 ধরুন'),
        body: t(
          r`When no actual value is given, take the original quantity as $100$. Apply each change in order, then read the final number as the answer in per cent. Example: salary up $20\%$, then down $20\%$: $100 \to 120 \to 96$, a net $4\%$ fall.`,
          r`কোনো প্রকৃত মান দেওয়া না থাকলে প্রাথমিক রাশিকে $100$ ধরুন। প্রতিটি পরিবর্তন ক্রমানুসারে প্রয়োগ করুন, শেষ সংখ্যাটিই শতকরায় উত্তর। উদাহরণ: বেতন $20\%$ বেড়ে তারপর $20\%$ কমলে: $100 \to 120 \to 96$, অর্থাৎ মোট $4\%$ হ্রাস।`,
        ),
      },
      {
        title: t('Multiplying-factor method', 'গুণক পদ্ধতি'),
        body: t(
          r`Write every change as a factor: $+r\% \to \frac{100 + r}{100}$, $-r\% \to \frac{100 - r}{100}$. Multiply all factors for successive changes. Example: $+25\%$, $-20\%$, $+10\%$: $\frac{5}{4} \times \frac{4}{5} \times \frac{11}{10} = 1.1$, so a net $10\%$ increase.`,
          r`প্রতিটি পরিবর্তনকে গুণক হিসেবে লিখুন: $+r\% \to \frac{100 + r}{100}$, $-r\% \to \frac{100 - r}{100}$। পরপর পরিবর্তনে সব গুণক গুণ করুন। উদাহরণ: $+25\%$, $-20\%$, $+10\%$: $\frac{5}{4} \times \frac{4}{5} \times \frac{11}{10} = 1.1$, অর্থাৎ মোট $10\%$ বৃদ্ধি।`,
        ),
      },
      {
        title: t('Pass-mark questions: equate the two cases', 'পাস নম্বরের প্রশ্ন: দুই ক্ষেত্রকে সমান করুন'),
        body: t(
          r`Both students are compared with the same pass mark. Example: one student scores $30\%$ and fails by $20$ marks; another scores $40\%$ and gets $10$ marks more than the pass mark. Then $40\% - 30\% = 10\%$ of the total $= 20 + 10 = 30$, so total $= 300$ and pass mark $= 90 + 20 = 110$.`,
          r`দুজন ছাত্রকেই একই পাস নম্বরের সঙ্গে তুলনা করা হয়। উদাহরণ: একজন $30\%$ নম্বর পেয়ে $20$ নম্বরের জন্য ফেল করে; আরেকজন $40\%$ পেয়ে পাস নম্বরের থেকে $10$ বেশি পায়। তাহলে মোট নম্বরের $40\% - 30\% = 10\% = 20 + 10 = 30$, অর্থাৎ মোট নম্বর $= 300$ এবং পাস নম্বর $= 90 + 20 = 110$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Use fraction equivalents', 'শতকরার ভগ্নাংশ রূপ ব্যবহার করুন'),
        body: t(
          r`Memorise: $\frac{1}{6} = 16\frac{2}{3}\%$, $\frac{1}{7} \approx 14.28\%$, $\frac{1}{8} = 12.5\%$, $\frac{1}{9} = 11\frac{1}{9}\%$, $\frac{1}{11} \approx 9.09\%$.

Example: $37.5\%$ of $480 = \frac{3}{8} \times 480 = 180$.`,
          r`মনে রাখুন: $\frac{1}{6} = 16\frac{2}{3}\%$, $\frac{1}{7} \approx 14.28\%$, $\frac{1}{8} = 12.5\%$, $\frac{1}{9} = 11\frac{1}{9}\%$, $\frac{1}{11} \approx 9.09\%$।

উদাহরণ: $480$-এর $37.5\% = \frac{3}{8} \times 480 = 180$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('x% of y = y% of x', 'y-এর x% = x-এর y%'),
        body: t(
          r`Swap the numbers when one order is easier.

Example: $16\%$ of $25 = 25\%$ of $16 = 4$.`,
          r`যে ক্রমে হিসাব সহজ, সংখ্যা দুটি অদলবদল করে নিন।

উদাহরণ: $25$-এর $16\% = 16$-এর $25\% = 4$।`,
        ),
        approx_time_saved_sec: 10,
      },
      {
        title: t('Successive change in one line', 'এক লাইনে পরপর পরিবর্তন'),
        body: t(
          r`Net $= a + b + \frac{ab}{100}$ with signs.

Example: length $+10\%$, breadth $+20\%$ → area changes by $10 + 20 + 2 = 32\%$ increase.`,
          r`চিহ্নসহ মোট পরিবর্তন $= a + b + \frac{ab}{100}$।

উদাহরণ: দৈর্ঘ্য $+10\%$, প্রস্থ $+20\%$ → ক্ষেত্রফল $10 + 20 + 2 = 32\%$ বৃদ্ধি।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Price up r% → cut consumption by r/(100+r)', 'দাম r% বাড়লে ভোগ কমাতে হবে r/(100+r)'),
        body: t(
          r`Example: sugar price rises by $25\%$. To keep spending the same, reduce consumption by $\frac{25}{125} \times 100 = 20\%$.`,
          r`উদাহরণ: চিনির দাম $25\%$ বাড়ল। খরচ একই রাখতে ভোগ কমাতে হবে $\frac{25}{125} \times 100 = 20\%$।`,
        ),
        approx_time_saved_sec: 25,
      },
    ],
    common_traps: [
      t(
        r`**Equal rise and fall do not cancel.** $+10\%$ then $-10\%$ is a net $1\%$ **decrease** ($1.1 \times 0.9 = 0.99$), not zero.`,
        r`**সমান বৃদ্ধি ও হ্রাস পরস্পরকে বাতিল করে না।** $+10\%$ তারপর $-10\%$ মানে মোট $1\%$ **হ্রাস** ($1.1 \times 0.9 = 0.99$), শূন্য নয়।`,
      ),
      t(
        r`**Wrong base in "more than / less than".** If A is $25\%$ more than B, B is **$20\%$** less than A ($\frac{25}{125}$), not $25\%$.`,
        r`**"বেশি / কম" প্রশ্নে ভুল ভিত্তি।** A, B-এর থেকে $25\%$ বেশি হলে B, A-এর থেকে **$20\%$** কম ($\frac{25}{125}$), $25\%$ নয়।`,
      ),
      t(
        r`**Percentage points vs per cent.** A rate going from $10\%$ to $12\%$ is a rise of $2$ percentage points but a $20\%$ increase.`,
        r`**শতকরা বিন্দু (percentage point) আর শতকরা এক নয়।** হার $10\%$ থেকে $12\%$ হলে বৃদ্ধি $2$ শতকরা বিন্দু, কিন্তু শতকরা বৃদ্ধি $20\%$।`,
      ),
      t(
        r`**Percentage of the remainder.** "Spends $20\%$ on rent and $25\%$ **of the rest** on food" — the second percentage is of $80\%$, so food $= 20\%$ of the income, not $25\%$.`,
        r`**অবশিষ্ট অংশের শতকরা।** "আয়ের $20\%$ বাড়িভাড়ায় এবং **বাকি অংশের** $25\%$ খাবারে খরচ" — দ্বিতীয় হারটি $80\%$-এর উপর, তাই খাবারে খরচ আয়ের $20\%$, $25\%$ নয়।`,
      ),
    ],
  },

  // ───────────────────────────── PROFIT & LOSS ─────────────────────────────
  {
    subject: 'quant',
    topic: 'profit_loss',
    title: { en: 'Profit, Loss & Discount', bn: 'লাভ, ক্ষতি ও ছাড়', hi: 'लाभ, हानि और छूट' },
    overview: t(
      r`Every profit or loss percentage is measured on the **cost price (CP)**; every discount is measured on the **marked price (MP)**. Most errors come from mixing up these two bases. When only percentages are given, assume $CP = 100$ (or $MP = 100$ for discount chains) and work in rupees. Overheads such as transport or repair are added to CP first. For marked-price questions, link everything with $\frac{MP}{CP} = \frac{100 + P\%}{100 - D\%}$.`,
      r`সব লাভ বা ক্ষতির শতকরা হার **ক্রয়মূল্যের (CP)** উপর হিসাব হয়; সব ছাড় হিসাব হয় **ধার্যমূল্যের (MP)** উপর। বেশিরভাগ ভুল হয় এই দুটি ভিত্তি গুলিয়ে ফেলার জন্য। শুধু শতকরা হার দেওয়া থাকলে $CP = 100$ ধরুন (পরপর ছাড়ের ক্ষেত্রে $MP = 100$) এবং টাকার অঙ্কে হিসাব করুন। পরিবহন বা মেরামতের মতো অতিরিক্ত খরচ আগে ক্রয়মূল্যে যোগ করুন। ধার্যমূল্যের প্রশ্নে সবকিছু $\frac{MP}{CP} = \frac{100 + P\%}{100 - D\%}$ সূত্রে যুক্ত করুন।`,
    ),
    formulas: [
      {
        key: 'profit_percent',
        label: t('Profit %', 'শতকরা লাভ'),
        latex: r`\text{Profit\%} = \dfrac{SP - CP}{CP} \times 100`,
        variables: [v('SP', 'Selling price', 'বিক্রয়মূল্য'), v('CP', 'Cost price', 'ক্রয়মূল্য')],
        explanation: t(
          r`Loss $\% = \frac{CP - SP}{CP} \times 100$ — also on CP.`,
          r`শতকরা ক্ষতি $= \frac{CP - SP}{CP} \times 100$ — এটিও ক্রয়মূল্যের উপর।`,
        ),
      },
      {
        key: 'sp_from_profit',
        label: t('Selling price from profit %', 'লাভের হার থেকে বিক্রয়মূল্য'),
        latex: r`SP = CP \times \dfrac{100 + P\%}{100}`,
        explanation: t(r`For a loss, use $100 - L\%$.`, r`ক্ষতি হলে $100 - L\%$ ব্যবহার করুন।`),
      },
      {
        key: 'mp_cp_ratio',
        label: t('Marked price vs cost price', 'ধার্যমূল্য ও ক্রয়মূল্যের সম্পর্ক'),
        latex: r`\dfrac{MP}{CP} = \dfrac{100 + P\%}{100 - D\%}`,
        variables: [v('MP', 'Marked price', 'ধার্যমূল্য'), v(r`D\%`, 'Discount %', 'শতকরা ছাড়')],
        explanation: t('Links markup, discount and profit in one step.', 'মার্কআপ, ছাড় ও লাভকে এক ধাপে যুক্ত করে।'),
      },
      {
        key: 'successive_discount',
        label: t('Two successive discounts', 'পরপর দুটি ছাড়'),
        latex: r`D_{\text{net}} = d_1 + d_2 - \dfrac{d_1 d_2}{100}`,
        explanation: t(
          'Two discounts never simply add up: 20% then 10% is 28%, not 30%.',
          'দুটি ছাড় কখনও সরাসরি যোগ হয় না: 20% তারপর 10% মানে 28%, 30% নয়।',
        ),
      },
      {
        key: 'false_weight',
        label: t('Dishonest dealer (false weight)', 'অসৎ ব্যবসায়ী (ভুল ওজন)'),
        latex: r`\text{Gain\%} = \dfrac{\text{True wt.} - \text{False wt.}}{\text{False wt.}} \times 100`,
        explanation: t(
          r`Selling at cost price but giving 900 g for 1 kg: $\frac{100}{900} \times 100 = 11\frac{1}{9}\%$ gain.`,
          r`ক্রয়মূল্যে বিক্রি করে 1 kg-এর বদলে 900 g দিলে লাভ $\frac{100}{900} \times 100 = 11\frac{1}{9}\%$।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Assume CP = 100', 'ক্রয়মূল্য = 100 ধরুন'),
        body: t(
          r`When only percentages are given, set $CP = 100$. Every percentage then becomes a rupee amount and the answer can be read off directly. Example: marked $50\%$ above CP, discount $20\%$: $MP = 150$, $SP = 150 \times 0.8 = 120$, so profit $= 20\%$.`,
          r`শুধু শতকরা হার দেওয়া থাকলে $CP = 100$ ধরুন। তখন প্রতিটি শতকরা হার সরাসরি টাকার অঙ্কে পরিণত হয় এবং উত্তর সোজাসুজি পাওয়া যায়। উদাহরণ: ক্রয়মূল্যের $50\%$ বেশি ধার্যমূল্য, $20\%$ ছাড়: $MP = 150$, $SP = 150 \times 0.8 = 120$, অর্থাৎ লাভ $= 20\%$।`,
        ),
      },
      {
        title: t('Same SP, $x\\%$ gain and $x\\%$ loss', 'একই বিক্রয়মূল্যে $x\\%$ লাভ ও $x\\%$ ক্ষতি'),
        body: t(
          r`Two items sold at the same price, one at $x\%$ profit and one at $x\%$ loss, always give an overall **loss** of $\frac{x^2}{100}\%$. Check with $x = 20$: SP $= 120$ each, CPs $= 100$ and $150$, total CP $= 250$, total SP $= 240$, loss $= \frac{10}{250} = 4\% = \frac{20^2}{100}\%$.`,
          r`একই দামে দুটি জিনিস বিক্রি করে একটিতে $x\%$ লাভ ও অন্যটিতে $x\%$ ক্ষতি হলে মোট ফল সর্বদা $\frac{x^2}{100}\%$ **ক্ষতি**। $x = 20$ দিয়ে যাচাই: প্রতিটির বিক্রয়মূল্য $120$, ক্রয়মূল্য $100$ ও $150$, মোট ক্রয়মূল্য $250$, মোট বিক্রয়মূল্য $240$, ক্ষতি $= \frac{10}{250} = 4\% = \frac{20^2}{100}\%$।`,
        ),
      },
      {
        title: t('Find CP from two selling situations', 'দুটি বিক্রির অবস্থা থেকে ক্রয়মূল্য নির্ণয়'),
        body: t(
          r`If changing SP by an amount changes the result from $L\%$ loss to $P\%$ profit, that amount equals $(P + L)\%$ of CP. Example: sold at $10\%$ loss; had it been sold for ₹90 more, there would be $5\%$ profit. So $15\%$ of CP $= 90$, giving CP $=$ ₹600.`,
          r`বিক্রয়মূল্য কিছু টাকা বদলালে ফল $L\%$ ক্ষতি থেকে $P\%$ লাভে বদলে গেলে, ওই টাকা ক্রয়মূল্যের $(P + L)\%$। উদাহরণ: $10\%$ ক্ষতিতে বিক্রি হল; আর ₹90 বেশিতে বিক্রি হলে $5\%$ লাভ হত। তাই ক্রয়মূল্যের $15\% = 90$, অর্থাৎ ক্রয়মূল্য $=$ ₹600।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Markup then discount in one line', 'এক লাইনে মার্কআপ ও ছাড়'),
        body: t(
          r`Markup $a\%$ followed by discount $b\%$: net effect $= a - b - \frac{ab}{100}$.

Example: $40\%$ markup, $20\%$ discount → $40 - 20 - 8 = 12\%$ profit.`,
          r`$a\%$ মার্কআপ ও তারপর $b\%$ ছাড়: মোট ফল $= a - b - \frac{ab}{100}$।

উদাহরণ: $40\%$ মার্কআপ, $20\%$ ছাড় → $40 - 20 - 8 = 12\%$ লাভ।`,
        ),
        approx_time_saved_sec: 25,
      },
      {
        title: t('Swap percentages for fractions', 'শতকরাকে ভগ্নাংশে বদলান'),
        body: t(
          r`Know the common ones: $12\tfrac{1}{2}\% = \tfrac{1}{8}$, $16\tfrac{2}{3}\% = \tfrac{1}{6}$, $20\% = \tfrac{1}{5}$, $25\% = \tfrac{1}{4}$. A $25\%$ profit means $CP : SP = 4 : 5$.

Example: SP $=$ ₹450 at $25\%$ profit → CP $= 450 \times \frac{4}{5} =$ ₹360.`,
          r`সাধারণ ভগ্নাংশগুলি মনে রাখুন: $12\tfrac{1}{2}\% = \tfrac{1}{8}$, $16\tfrac{2}{3}\% = \tfrac{1}{6}$, $20\% = \tfrac{1}{5}$, $25\% = \tfrac{1}{4}$। $25\%$ লাভ মানে $CP : SP = 4 : 5$।

উদাহরণ: $25\%$ লাভে বিক্রয়মূল্য ₹450 → ক্রয়মূল্য $= 450 \times \frac{4}{5} =$ ₹360।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('CP of $x$ articles = SP of $y$ articles', '$x$টির ক্রয়মূল্য = $y$টির বিক্রয়মূল্য'),
        body: t(
          r`Profit $\% = \frac{x - y}{y} \times 100$; a negative result is a loss.

Example: CP of 15 pens = SP of 12 pens → profit $= \frac{3}{12} \times 100 = 25\%$.`,
          r`লাভ $\% = \frac{x - y}{y} \times 100$; ফল ঋণাত্মক হলে তা ক্ষতি।

উদাহরণ: 15টি কলমের ক্রয়মূল্য = 12টি কলমের বিক্রয়মূল্য → লাভ $= \frac{3}{12} \times 100 = 25\%$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('"Buy n, get m free" as a discount', '"n-টি কিনলে m-টি বিনামূল্যে" মানে ছাড়'),
        body: t(
          r`Discount $\% = \frac{m}{n + m} \times 100$ (free items over items taken).

Example: buy 4 get 1 free → $\frac{1}{5} \times 100 = 20\%$ discount.`,
          r`শতকরা ছাড় $= \frac{m}{n + m} \times 100$ (বিনামূল্যের জিনিস ÷ মোট পাওয়া জিনিস)।

উদাহরণ: 4টি কিনলে 1টি বিনামূল্যে → $\frac{1}{5} \times 100 = 20\%$ ছাড়।`,
        ),
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      t(
        '**Discount is on MP, profit is on CP.** Subtracting a 20% discount from a 40% markup to get 20% is a classic wrong option — the correct answer is 12%.',
        '**ছাড় ধার্যমূল্যের উপর, লাভ ক্রয়মূল্যের উপর।** 40% মার্কআপ থেকে 20% ছাড় বিয়োগ করে 20% পাওয়া একটি প্রচলিত ভুল বিকল্প — সঠিক উত্তর 12%।',
      ),
      t(
        r`**Profit % on SP is not profit % on CP.** If a question says "20% profit on the selling price", convert first: $\frac{20}{80} \times 100 = 25\%$ on CP.`,
        r`**বিক্রয়মূল্যের উপর লাভ আর ক্রয়মূল্যের উপর লাভ এক নয়।** প্রশ্নে "বিক্রয়মূল্যের উপর 20% লাভ" বললে আগে রূপান্তর করুন: $\frac{20}{80} \times 100 = 25\%$ (ক্রয়মূল্যের উপর)।`,
      ),
      t(
        '**Overheads belong in CP.** Transport, repair or tax paid by the seller is added to the cost price before computing profit.',
        '**অতিরিক্ত খরচ ক্রয়মূল্যের অংশ।** বিক্রেতার পরিবহন, মেরামত বা কর খরচ লাভ হিসাবের আগে ক্রয়মূল্যে যোগ করুন।',
      ),
      t(
        r`**False weight plus profit multiplies, it does not add.** Selling at $10\%$ profit while giving 900 g for 1 kg: gain $= 1.1 \times \frac{1000}{900} = 1.2\overline{2}$, i.e. $22\frac{2}{9}\%$, not $10 + 11\frac{1}{9} = 21\frac{1}{9}\%$.`,
        r`**ভুল ওজন ও লাভ গুণ হয়, যোগ হয় না।** $10\%$ লাভে বিক্রি করে 1 kg-এর বদলে 900 g দিলে লাভ $= 1.1 \times \frac{1000}{900} = 1.2\overline{2}$, অর্থাৎ $22\frac{2}{9}\%$, $10 + 11\frac{1}{9} = 21\frac{1}{9}\%$ নয়।`,
      ),
    ],
  },

  // ───────────────────────────── RATIO & PROPORTION ─────────────────────────────
  {
    subject: 'quant',
    topic: 'ratio_proportion',
    title: { en: 'Ratio & Proportion', bn: 'অনুপাত ও সমানুপাত', hi: 'अनुपात और समानुपात' },
    overview: t(
      r`A ratio compares two quantities of the same kind; $a : b$ means the quantities are $ak$ and $bk$ for some common multiplier $k$. Almost every question is solved by writing the unknowns as **parts** ($3k, 5k$) and finding the value of one part from the single real number given (total, difference, or a change). When two ratios share a term (A:B and B:C), first make the common term equal. Proportion questions ($a : b = c : d$) reduce to cross-multiplication: $ad = bc$. Partnership is a ratio question in disguise — profit is shared in the ratio of capital × time.`,
      r`অনুপাত একই জাতীয় দুটি রাশির তুলনা করে; $a : b$ মানে রাশি দুটি হল $ak$ ও $bk$, যেখানে $k$ একটি সাধারণ গুণক। প্রায় প্রতিটি প্রশ্ন সমাধান হয় অজানা রাশিগুলিকে **অংশ** ($3k, 5k$) হিসেবে লিখে এবং প্রদত্ত একটি প্রকৃত সংখ্যা (মোট, অন্তর বা পরিবর্তন) থেকে এক অংশের মান বের করে। দুটি অনুপাতে একটি পদ সাধারণ হলে (A:B ও B:C) আগে সেই সাধারণ পদটিকে সমান করুন। সমানুপাতের প্রশ্ন ($a : b = c : d$) আড়গুণনে পরিণত হয়: $ad = bc$। অংশীদারি কারবারও আসলে অনুপাতের প্রশ্ন — লাভ ভাগ হয় মূলধন × সময়ের অনুপাতে।`,
    ),
    formulas: [
      {
        key: 'proportion_rule',
        label: t('Proportion: product of extremes = product of means', 'সমানুপাত: প্রান্তীয় পদের গুণফল = মধ্যপদের গুণফল'),
        latex: r`a : b = c : d \;\Longrightarrow\; a \times d = b \times c`,
      },
      {
        key: 'divide_in_ratio',
        label: t('Dividing a total in a ratio', 'মোট রাশিকে অনুপাতে ভাগ'),
        latex: r`\text{A's share} = \dfrac{a}{a + b} \times N`,
        variables: [v('N', 'Total amount', 'মোট পরিমাণ'), v('a : b', 'Given ratio', 'প্রদত্ত অনুপাত')],
      },
      {
        key: 'combine_ratios',
        label: t('Combining A:B and B:C', 'A:B ও B:C যুক্ত করা'),
        latex: r`A : B = a : b,\; B : C = c : d \;\Longrightarrow\; A : B : C = ac : bc : bd`,
      },
      {
        key: 'mean_third_fourth',
        label: t('Mean, third and fourth proportional', 'মধ্যসমানুপাতী, তৃতীয় ও চতুর্থ সমানুপাতী'),
        latex: r`\text{Mean} = \sqrt{ab}, \quad \text{Third} = \dfrac{b^2}{a}, \quad \text{Fourth} = \dfrac{bc}{a}`,
        explanation: t(
          r`Mean proportional of $4$ and $9$ is $\sqrt{36} = 6$; third proportional of $4$ and $6$ is $\frac{36}{4} = 9$.`,
          r`$4$ ও $9$-এর মধ্যসমানুপাতী $\sqrt{36} = 6$; $4$ ও $6$-এর তৃতীয় সমানুপাতী $\frac{36}{4} = 9$।`,
        ),
      },
      {
        key: 'add_to_both',
        label: t('Number added to both terms', 'দুটি পদে একই সংখ্যা যোগ'),
        latex: r`\dfrac{a + x}{b + x} = \dfrac{c}{d} \;\Longrightarrow\; x = \dfrac{bc - ad}{d - c}`,
      },
      {
        key: 'partnership',
        label: t('Partnership profit share', 'অংশীদারি কারবারে লাভের ভাগ'),
        latex: r`P_1 : P_2 = C_1 T_1 : C_2 T_2`,
        variables: [
          v('C', 'Capital invested', 'বিনিয়োগ করা মূলধন'),
          v('T', 'Time for which it was invested', 'বিনিয়োগের সময়কাল'),
        ],
      },
    ],
    derivation_rules: [
      {
        title: t('Unit (part) method', 'একক অংশ পদ্ধতি'),
        body: t(
          r`Write each quantity as ratio-part × $k$. Match the parts to the one real number given. Example: ages are in the ratio $3 : 5$ and differ by $10$ years. Difference in parts $= 2$, so $2k = 10$, $k = 5$, ages $= 15$ and $25$.`,
          r`প্রতিটি রাশিকে অনুপাতের অংশ × $k$ হিসেবে লিখুন। প্রদত্ত প্রকৃত সংখ্যার সঙ্গে অংশগুলি মেলান। উদাহরণ: বয়সের অনুপাত $3 : 5$, বয়সের অন্তর $10$ বছর। অংশের অন্তর $= 2$, তাই $2k = 10$, $k = 5$, বয়স $= 15$ ও $25$ বছর।`,
        ),
      },
      {
        title: t('Make the common term equal', 'সাধারণ পদটিকে সমান করুন'),
        body: t(
          r`For $A : B = 2 : 3$ and $B : C = 4 : 5$, B appears as $3$ and $4$. Scale to the LCM $12$: $A : B = 8 : 12$, $B : C = 12 : 15$, so $A : B : C = 8 : 12 : 15$.`,
          r`$A : B = 2 : 3$ ও $B : C = 4 : 5$ হলে B একবার $3$, একবার $4$। ল.সা.গু. $12$ করুন: $A : B = 8 : 12$, $B : C = 12 : 15$, তাই $A : B : C = 8 : 12 : 15$।`,
        ),
      },
      {
        title: t('Coins and notes: count value per set', 'মুদ্রা ও নোট: প্রতি সেটের মূল্য হিসাব করুন'),
        body: t(
          r`If the **number** of ₹1, 50 p and 25 p coins is in the ratio $1 : 2 : 4$, one "set" has value $1 + 2(0.5) + 4(0.25) =$ ₹3. A total of ₹120 means $40$ sets: $40$, $80$ and $160$ coins.`,
          r`₹1, 50 পয়সা ও 25 পয়সার মুদ্রার **সংখ্যার** অনুপাত $1 : 2 : 4$ হলে একটি "সেট"-এর মূল্য $1 + 2(0.5) + 4(0.25) =$ ₹3। মোট ₹120 মানে $40$টি সেট: মুদ্রার সংখ্যা $40$, $80$ ও $160$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Divide by total parts once', 'একবার মোট অংশ দিয়ে ভাগ'),
        body: t(
          r`Find the value of one part, then multiply.

Example: divide ₹1200 in $3 : 5$ → one part $= \frac{1200}{8} = 150$ → shares ₹450 and ₹750.`,
          r`এক অংশের মান বের করে গুণ করুন।

উদাহরণ: ₹1200-কে $3 : 5$ অনুপাতে ভাগ → এক অংশ $= \frac{1200}{8} = 150$ → ভাগ ₹450 ও ₹750।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('Number to add for a new ratio', 'নতুন অনুপাতের জন্য কত যোগ করতে হবে'),
        body: t(
          r`Use $x = \frac{bc - ad}{d - c}$.

Example: what must be added to $5$ and $9$ to make the ratio $3 : 4$? $x = \frac{9 \times 3 - 5 \times 4}{4 - 3} = 7$. Check: $12 : 16 = 3 : 4$.`,
          r`$x = \frac{bc - ad}{d - c}$ ব্যবহার করুন।

উদাহরণ: $5$ ও $9$-এর সঙ্গে কত যোগ করলে অনুপাত $3 : 4$ হবে? $x = \frac{9 \times 3 - 5 \times 4}{4 - 3} = 7$। যাচাই: $12 : 16 = 3 : 4$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Partnership: cancel before multiplying', 'অংশীদারি: গুণের আগে কাটাকুটি'),
        body: t(
          r`Reduce capital and time ratios separately, then multiply.

Example: A invests ₹6000 for 12 months, B ₹9000 for 8 months. Capital $2 : 3$, time $3 : 2$ → profit $6 : 6 = 1 : 1$.`,
          r`মূলধন ও সময়ের অনুপাত আলাদা করে লঘিষ্ঠ করে তারপর গুণ করুন।

উদাহরণ: A ₹6000 বিনিয়োগ করে 12 মাসের জন্য, B ₹9000 করে 8 মাসের জন্য। মূলধন $2 : 3$, সময় $3 : 2$ → লাভ $6 : 6 = 1 : 1$।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        r`**Inverse ratio of three terms.** The inverse of $2 : 3 : 4$ is $\frac{1}{2} : \frac{1}{3} : \frac{1}{4} = 6 : 4 : 3$ (multiply by LCM $12$), **not** $4 : 3 : 2$.`,
        r`**তিন পদের ব্যস্ত অনুপাত।** $2 : 3 : 4$-এর ব্যস্ত অনুপাত $\frac{1}{2} : \frac{1}{3} : \frac{1}{4} = 6 : 4 : 3$ (ল.সা.গু. $12$ দিয়ে গুণ করে), $4 : 3 : 2$ **নয়**।`,
      ),
      t(
        r`**Ratio of numbers vs ratio of values.** In coin questions check whether the ratio given is of the *number* of coins or of their *value* — the answers differ.`,
        r`**সংখ্যার অনুপাত বনাম মূল্যের অনুপাত।** মুদ্রার প্রশ্নে দেখে নিন অনুপাতটি মুদ্রার *সংখ্যার* নাকি তাদের *মূল্যের* — দুই ক্ষেত্রে উত্তর আলাদা।`,
      ),
      t(
        r`**Adding to ratio parts directly.** If $A : B = 3 : 5$ and $4$ is added to each, the new ratio is $(3k + 4) : (5k + 4)$, not $7 : 9$. Always bring in $k$ first.`,
        r`**অনুপাতের অংশে সরাসরি যোগ করা।** $A : B = 3 : 5$ হলে প্রত্যেকটিতে $4$ যোগ করলে নতুন অনুপাত $(3k + 4) : (5k + 4)$, $7 : 9$ নয়। সবসময় আগে $k$ বসান।`,
      ),
      t(
        r`**Partnership with a change mid-year.** If a partner adds or withdraws money after some months, split that partner's investment into periods and add: e.g. ₹4000 for 4 months + ₹6000 for 8 months $= 16000 + 48000 = 64000$ rupee-months.`,
        r`**বছরের মাঝে মূলধন বদল।** কোনো অংশীদার কয়েক মাস পরে টাকা যোগ বা প্রত্যাহার করলে তার বিনিয়োগকে সময়ভিত্তিক ভাগে ভেঙে যোগ করুন: যেমন ₹4000 × 4 মাস + ₹6000 × 8 মাস $= 16000 + 48000 = 64000$।`,
      ),
    ],
  },

  // ───────────────────────────── TIME & WORK ─────────────────────────────
  {
    subject: 'quant',
    topic: 'time_work',
    title: { en: 'Time & Work', bn: 'সময় ও কার্য', hi: 'समय और कार्य' },
    overview: t(
      r`Time & Work questions (including pipes and cisterns) rest on one idea: **rates add, times do not**. If A finishes a job in $a$ days, A does $\frac{1}{a}$ of it per day. The fastest method is to take the **total work = LCM of the given days**, find each person's work per day (efficiency) in units, add or subtract efficiencies, and divide. For problems with men, days and hours, use $\frac{M_1 D_1 H_1}{W_1} = \frac{M_2 D_2 H_2}{W_2}$. Treat an outlet pipe or a leak as a worker with negative efficiency.`,
      r`সময় ও কার্যের প্রশ্ন (নল ও চৌবাচ্চা সহ) একটি ধারণার উপর দাঁড়িয়ে: **কাজের হার যোগ হয়, সময় নয়**। A কোনো কাজ $a$ দিনে শেষ করলে A প্রতিদিন কাজের $\frac{1}{a}$ অংশ করে। সবচেয়ে দ্রুত পদ্ধতি হল **মোট কাজ = প্রদত্ত দিনগুলির ল.সা.গু.** ধরা, প্রত্যেকের এক দিনের কাজ (কর্মদক্ষতা) একক হিসেবে বের করা, কর্মদক্ষতা যোগ বা বিয়োগ করা, তারপর ভাগ করা। লোক, দিন ও ঘণ্টার প্রশ্নে $\frac{M_1 D_1 H_1}{W_1} = \frac{M_2 D_2 H_2}{W_2}$ ব্যবহার করুন। নির্গম নল বা ছিদ্রকে ঋণাত্মক কর্মদক্ষতার কর্মী হিসেবে ধরুন।`,
    ),
    formulas: [
      {
        key: 'one_day_work',
        label: t('Work per day', 'এক দিনের কাজ'),
        latex: r`\text{1 day's work} = \dfrac{1}{n}, \qquad \text{Time} = \dfrac{\text{Total work}}{\text{Efficiency}}`,
        variables: [v('n', 'Days to finish the whole job alone', 'একা পুরো কাজ শেষ করতে লাগা দিন')],
      },
      {
        key: 'two_together',
        label: t('Two working together', 'দুজন একসঙ্গে কাজ করলে'),
        latex: r`T = \dfrac{ab}{a + b}`,
        variables: [v('a, b', 'Days taken by A and B alone', 'A ও B-এর একা কাজ শেষ করার দিন')],
      },
      {
        key: 'three_together',
        label: t('Three working together', 'তিনজন একসঙ্গে কাজ করলে'),
        latex: r`T = \dfrac{abc}{ab + bc + ca}`,
      },
      {
        key: 'one_alone_from_together',
        label: t('One person alone from the joint time', 'যৌথ সময় থেকে একজনের একার সময়'),
        latex: r`B \text{ alone} = \dfrac{a\,t}{a - t}`,
        explanation: t(
          r`Here A alone takes $a$ days and A + B together take $t$ days.`,
          r`এখানে A একা $a$ দিনে এবং A ও B একসঙ্গে $t$ দিনে কাজ শেষ করে।`,
        ),
      },
      {
        key: 'mdh',
        label: t('Men–days–hours rule', 'লোক–দিন–ঘণ্টার নিয়ম'),
        latex: r`\dfrac{M_1 D_1 H_1}{W_1} = \dfrac{M_2 D_2 H_2}{W_2}`,
        variables: [
          v('M', 'Number of workers', 'কর্মীর সংখ্যা'),
          v('D', 'Days', 'দিন'),
          v('H', 'Hours per day', 'দৈনিক ঘণ্টা'),
          v('W', 'Amount of work', 'কাজের পরিমাণ'),
        ],
      },
      {
        key: 'fill_and_empty',
        label: t('Inlet and outlet pipe together', 'পূরক ও নির্গম নল একসঙ্গে'),
        latex: r`T = \dfrac{ab}{b - a} \quad (b > a)`,
        explanation: t(
          r`Inlet fills in $a$ hours, outlet empties in $b$ hours.`,
          r`পূরক নল $a$ ঘণ্টায় ভরায়, নির্গম নল $b$ ঘণ্টায় খালি করে।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('LCM (total work) method', 'ল.সা.গু. (মোট কাজ) পদ্ধতি'),
        body: t(
          r`1. Take total work $=$ LCM of all the given times.
2. Efficiency of each $=$ total work ÷ own time.
3. Combine efficiencies (subtract for leaks / outlets).
4. Time $=$ remaining work ÷ combined efficiency.

Example: A takes $12$ days, B $18$ days. Work $= 36$; A $= 3$/day, B $= 2$/day; together $\frac{36}{5} = 7.2$ days.`,
          r`1. মোট কাজ $=$ প্রদত্ত সব সময়ের ল.সা.গু. ধরুন।
2. প্রত্যেকের কর্মদক্ষতা $=$ মোট কাজ ÷ নিজের সময়।
3. কর্মদক্ষতাগুলি যোগ করুন (ছিদ্র / নির্গম নলের জন্য বিয়োগ)।
4. সময় $=$ বাকি কাজ ÷ মিলিত কর্মদক্ষতা।

উদাহরণ: A $12$ দিনে, B $18$ দিনে। মোট কাজ $= 36$; A $= 3$/দিন, B $= 2$/দিন; একসঙ্গে $\frac{36}{5} = 7.2$ দিন।`,
        ),
      },
      {
        title: t('Efficiency-ratio method', 'কর্মদক্ষতার অনুপাত পদ্ধতি'),
        body: t(
          r`If A is $k$ times as efficient as B, efficiencies are $k : 1$ and times are $1 : k$. Example: A is twice as efficient as B and together they finish in $14$ days. Work $= (2 + 1) \times 14 = 42$ units, so A alone $= \frac{42}{2} = 21$ days and B alone $= 42$ days.`,
          r`A যদি B-এর $k$ গুণ দক্ষ হয়, কর্মদক্ষতার অনুপাত $k : 1$ এবং সময়ের অনুপাত $1 : k$। উদাহরণ: A, B-এর দ্বিগুণ দক্ষ এবং দুজনে একসঙ্গে $14$ দিনে কাজ শেষ করে। মোট কাজ $= (2 + 1) \times 14 = 42$ একক, তাই A একা $\frac{42}{2} = 21$ দিনে এবং B একা $42$ দিনে।`,
        ),
      },
      {
        title: t('Working on alternate days', 'পালাক্রমে (একদিন অন্তর) কাজ'),
        body: t(
          r`Treat a pair of days as one cycle. Example: A takes $8$ days, B $12$ days, working alternately starting with A. Work $= 24$; A $= 3$, B $= 2$, so one 2-day cycle $= 5$ units. $4$ cycles $= 8$ days $= 20$ units. Day 9 (A): $23$ units. Remaining $1$ unit takes B $\frac{1}{2}$ day. Total $= 9\frac{1}{2}$ days.`,
          r`দুই দিনকে একটি চক্র ধরুন। উদাহরণ: A $8$ দিনে, B $12$ দিনে কাজ শেষ করে; A দিয়ে শুরু করে পালাক্রমে কাজ। মোট কাজ $= 24$; A $= 3$, B $= 2$, তাই 2 দিনের এক চক্রে $5$ একক। $4$ চক্র $= 8$ দিন $= 20$ একক। 9ম দিনে (A): $23$ একক। বাকি $1$ একক করতে B-এর লাগে $\frac{1}{2}$ দিন। মোট $= 9\frac{1}{2}$ দিন।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Product over sum for two workers', 'দুজনের ক্ষেত্রে গুণফল ÷ যোগফল'),
        body: t(
          r`Together time $= \frac{ab}{a + b}$.

Example: $10$ and $15$ days → $\frac{150}{25} = 6$ days.`,
          r`একসঙ্গে সময় $= \frac{ab}{a + b}$।

উদাহরণ: $10$ ও $15$ দিন → $\frac{150}{25} = 6$ দিন।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('MDH cross-multiplication', 'MDH আড়গুণন'),
        body: t(
          r`Keep everything on one line and solve for the unknown.

Example: $12$ men working $8$ hours a day build a wall in $10$ days. How many days for $16$ men working $6$ hours a day? $12 \times 8 \times 10 = 16 \times 6 \times D \Rightarrow D = \frac{960}{96} = 10$ days.`,
          r`সবকিছু এক লাইনে রেখে অজানা রাশিটি বের করুন।

উদাহরণ: $12$ জন লোক দৈনিক $8$ ঘণ্টা কাজ করে $10$ দিনে একটি দেয়াল তৈরি করে। $16$ জন দৈনিক $6$ ঘণ্টা কাজ করলে কত দিন লাগবে? $12 \times 8 \times 10 = 16 \times 6 \times D \Rightarrow D = \frac{960}{96} = 10$ দিন।`,
        ),
        approx_time_saved_sec: 25,
      },
      {
        title: t('Pipes as ± efficiencies', 'নলকে ± কর্মদক্ষতা হিসেবে ধরুন'),
        body: t(
          r`Inlet $= +$, outlet $= -$.

Example: A fills a tank in $10$ h, B empties it in $15$ h. Tank $= 30$ units; A $= +3$, B $= -2$, net $+1$ → $30$ hours.`,
          r`পূরক নল $= +$, নির্গম নল $= -$।

উদাহরণ: A নল $10$ ঘণ্টায় চৌবাচ্চা ভরায়, B $15$ ঘণ্টায় খালি করে। চৌবাচ্চা $= 30$ একক; A $= +3$, B $= -2$, মোট $+1$ → $30$ ঘণ্টা।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        r`**Adding days instead of rates.** A in $12$ days and B in $18$ days do **not** take $30$ (or $15$) days together — add the rates: $\frac{1}{12} + \frac{1}{18} = \frac{5}{36}$, i.e. $7.2$ days.`,
        r`**দিন যোগ করা, হার নয়।** A $12$ দিনে ও B $18$ দিনে কাজ করলে একসঙ্গে $30$ (বা $15$) দিন **নয়** — হার যোগ করুন: $\frac{1}{12} + \frac{1}{18} = \frac{5}{36}$, অর্থাৎ $7.2$ দিন।`,
      ),
      t(
        r`**Wages are shared in the ratio of work done, not time taken.** A ($12$ days) and B ($18$ days) earn ₹1500 jointly: efficiencies $3 : 2$, so A gets ₹900 and B ₹600 — not in the ratio $12 : 18$.`,
        r`**মজুরি ভাগ হয় করা কাজের অনুপাতে, সময়ের অনুপাতে নয়।** A ($12$ দিন) ও B ($18$ দিন) একসঙ্গে ₹1500 পেলে কর্মদক্ষতা $3 : 2$, তাই A পায় ₹900 ও B পায় ₹600 — $12 : 18$ অনুপাতে নয়।`,
      ),
      t(
        r`**Someone leaves midway.** First compute the work done while all were present, subtract it from the total, then let the remaining workers finish only the balance.`,
        r`**কেউ মাঝপথে চলে গেলে।** আগে সবাই থাকাকালীন কতটা কাজ হয়েছে বের করুন, মোট কাজ থেকে বিয়োগ করুন, তারপর বাকি কর্মীরা শুধু অবশিষ্ট কাজটুকু শেষ করবে।`,
      ),
      t(
        r`**Ignoring the change in work in MDH.** If the second job is twice as big, put $W_2 = 2W_1$; forgetting $W$ gives exactly half the correct number of days.`,
        r`**MDH-এ কাজের পরিমাণের পরিবর্তন উপেক্ষা করা।** দ্বিতীয় কাজটি দ্বিগুণ হলে $W_2 = 2W_1$ বসান; $W$ ভুলে গেলে সঠিক দিনের ঠিক অর্ধেক উত্তর আসে।`,
      ),
    ],
  },

  // ───────────────────────────── SIMPLE & COMPOUND INTEREST ─────────────────────────────
  {
    subject: 'quant',
    topic: 'interest',
    title: { en: 'Simple & Compound Interest', bn: 'সরল সুদ ও চক্রবৃদ্ধি সুদ', hi: 'साधारण और चक्रवृद्धि ब्याज' },
    overview: t(
      r`**Simple interest (SI)** is charged only on the original principal, so it is the same every year. **Compound interest (CI)** is charged on the principal plus the interest already added, so each year's interest is the previous year's interest grown by $R\%$. First identify which one is asked and whether the question wants the **interest** or the **amount** ($A = P + I$). Convert time to years and adjust the rate and periods for half-yearly or quarterly compounding. For CI over 2–3 years, think of $R\%$ as a fraction ($10\% = \frac{1}{10}$) and use year-wise growth or the ratio $P : A$.`,
      r`**সরল সুদ** শুধুমাত্র প্রাথমিক আসলের উপর হিসাব হয়, তাই প্রতি বছরে একই থাকে। **চক্রবৃদ্ধি সুদ** আসল এবং আগে যোগ হওয়া সুদ উভয়ের উপর হিসাব হয়, তাই প্রতি বছরের সুদ আগের বছরের সুদের থেকে $R\%$ বেশি। প্রথমে দেখুন কোনটি জিজ্ঞাসা করা হয়েছে এবং প্রশ্নটি **সুদ** চাইছে নাকি **সুদে-আসলে** ($A = P + I$)। সময়কে বছরে রূপান্তর করুন এবং ষাণ্মাসিক বা ত্রৈমাসিক চক্রবৃদ্ধিতে হার ও সময়কাল বদলে নিন। 2–3 বছরের চক্রবৃদ্ধি সুদে $R\%$-কে ভগ্নাংশ হিসেবে ভাবুন ($10\% = \frac{1}{10}$) এবং বছরভিত্তিক বৃদ্ধি বা $P : A$ অনুপাত ব্যবহার করুন।`,
    ),
    formulas: [
      {
        key: 'simple_interest',
        label: t('Simple interest', 'সরল সুদ'),
        latex: r`SI = \dfrac{P \times R \times T}{100}`,
        variables: [
          v('P', 'Principal', 'আসল'),
          v('R', 'Rate per annum (%)', 'বার্ষিক সুদের হার (%)'),
          v('T', 'Time in years', 'সময় (বছরে)'),
        ],
      },
      {
        key: 'compound_amount',
        label: t('Compound amount', 'চক্রবৃদ্ধি সুদে সুদে-আসলে'),
        latex: r`A = P\left(1 + \dfrac{R}{100}\right)^{n}, \qquad CI = A - P`,
        variables: [v('A', 'Amount (principal + interest)', 'সুদে-আসলে (আসল + সুদ)'), v('n', 'Number of years', 'বছরের সংখ্যা')],
      },
      {
        key: 'half_yearly',
        label: t('Half-yearly / quarterly compounding', 'ষাণ্মাসিক / ত্রৈমাসিক চক্রবৃদ্ধি'),
        latex: r`A = P\left(1 + \dfrac{R/2}{100}\right)^{2n} \quad\text{or}\quad P\left(1 + \dfrac{R/4}{100}\right)^{4n}`,
      },
      {
        key: 'ci_si_two_years',
        label: t('CI − SI for 2 years', '2 বছরে চক্রবৃদ্ধি সুদ − সরল সুদ'),
        latex: r`CI - SI = P\left(\dfrac{R}{100}\right)^{2}`,
      },
      {
        key: 'ci_si_three_years',
        label: t('CI − SI for 3 years', '3 বছরে চক্রবৃদ্ধি সুদ − সরল সুদ'),
        latex: r`CI - SI = P\left(\dfrac{R}{100}\right)^{2}\left(3 + \dfrac{R}{100}\right)`,
      },
      {
        key: 'effective_rate_two_years',
        label: t('Effective CI rate over 2 years', '2 বছরের কার্যকর চক্রবৃদ্ধি হার'),
        latex: r`R_{\text{eff}} = 2R + \dfrac{R^2}{100}`,
        explanation: t(
          r`At $10\%$ for 2 years, total CI $= 21\%$ of P. This is the successive-percentage formula with $a = b = R$.`,
          r`$10\%$ হারে 2 বছরে মোট চক্রবৃদ্ধি সুদ আসলের $21\%$। এটি $a = b = R$ বসানো পরপর শতকরা পরিবর্তনের সূত্র।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('Year-by-year CI table', 'বছরভিত্তিক চক্রবৃদ্ধি সুদের তালিকা'),
        body: t(
          r`Year 1 interest $=$ SI. Each later year's interest $=$ previous year's interest $+ R\%$ of it. Example: ₹10000 at $10\%$: year 1 $= 1000$, year 2 $= 1000 + 100 = 1100$, year 3 $= 1100 + 110 = 1210$. CI for 3 years $= 3310$.`,
          r`প্রথম বছরের সুদ $=$ সরল সুদ। পরের প্রতি বছরের সুদ $=$ আগের বছরের সুদ $+$ তার $R\%$। উদাহরণ: ₹10000, $10\%$ হারে: 1ম বছর $= 1000$, 2য় বছর $= 1000 + 100 = 1100$, 3য় বছর $= 1100 + 110 = 1210$। 3 বছরের চক্রবৃদ্ধি সুদ $= 3310$।`,
        ),
      },
      {
        title: t('Fraction / ratio method for CI', 'চক্রবৃদ্ধি সুদে ভগ্নাংশ / অনুপাত পদ্ধতি'),
        body: t(
          r`Write $R\%$ as $\frac{x}{y}$; then each year $P : A = y : (y + x)$. For $n$ years raise to the power $n$. Example: $R = 20\% = \frac{1}{5}$, 3 years → $P : A = 5^3 : 6^3 = 125 : 216$. If $P =$ ₹1250, $A =$ ₹2160 and CI $=$ ₹910.`,
          r`$R\%$-কে $\frac{x}{y}$ লিখুন; তাহলে প্রতি বছরে $P : A = y : (y + x)$। $n$ বছরের জন্য ঘাত $n$ করুন। উদাহরণ: $R = 20\% = \frac{1}{5}$, 3 বছর → $P : A = 5^3 : 6^3 = 125 : 216$। $P =$ ₹1250 হলে $A =$ ₹2160 এবং চক্রবৃদ্ধি সুদ $=$ ₹910।`,
        ),
      },
      {
        title: t('SI: sum becomes k times', 'সরল সুদে আসল k গুণ হওয়া'),
        body: t(
          r`Interest earned $= (k - 1)P$, so $R \times T = (k - 1) \times 100$. Example: a sum doubles in $8$ years at SI → $R = \frac{100}{8} = 12.5\%$. It becomes $4$ times when interest $= 3P$, i.e. in $3 \times 8 = 24$ years.`,
          r`অর্জিত সুদ $= (k - 1)P$, তাই $R \times T = (k - 1) \times 100$। উদাহরণ: সরল সুদে কোনো টাকা $8$ বছরে দ্বিগুণ হলে $R = \frac{100}{8} = 12.5\%$। সুদ $= 3P$ হলে অর্থাৎ $3 \times 8 = 24$ বছরে তা $4$ গুণ হবে।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('CI − SI for 2 years in one step', 'এক ধাপে 2 বছরের CI − SI'),
        body: t(
          r`$D = P\left(\frac{R}{100}\right)^2$.

Example: ₹5000 at $10\%$ for 2 years → $5000 \times \frac{1}{100} =$ ₹50. Reverse it too: difference ₹50 at $10\%$ → $P = 50 \times 100 =$ ₹5000.`,
          r`$D = P\left(\frac{R}{100}\right)^2$।

উদাহরণ: ₹5000, $10\%$ হারে 2 বছর → $5000 \times \frac{1}{100} =$ ₹50। উল্টো দিকেও: অন্তর ₹50, হার $10\%$ → $P = 50 \times 100 =$ ₹5000।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Effective rate for 2 years', '2 বছরের কার্যকর হার'),
        body: t(
          r`$2R + \frac{R^2}{100}$ gives the 2-year CI as a percentage of P.

Example: ₹8000 at $10\%$ for 2 years → $21\%$ of $8000 =$ ₹1680.`,
          r`$2R + \frac{R^2}{100}$ দিয়ে 2 বছরের চক্রবৃদ্ধি সুদ আসলের শতকরা হিসেবে পাওয়া যায়।

উদাহরণ: ₹8000, $10\%$ হারে 2 বছর → $8000$-এর $21\% =$ ₹1680।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('CI: doubling time multiplies', 'চক্রবৃদ্ধিতে দ্বিগুণ হওয়ার সময় গুণ হয়'),
        body: t(
          r`If a sum doubles in $T$ years at CI, it becomes $2^k$ times in $kT$ years.

Example: doubles in $5$ years → $8 = 2^3$ times in $15$ years.`,
          r`চক্রবৃদ্ধি সুদে কোনো টাকা $T$ বছরে দ্বিগুণ হলে $kT$ বছরে তা $2^k$ গুণ হয়।

উদাহরণ: $5$ বছরে দ্বিগুণ → $15$ বছরে $8 = 2^3$ গুণ।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Rate from two consecutive amounts', 'পরপর দুই বছরের সুদে-আসলে থেকে হার'),
        body: t(
          r`$R = \frac{A_{n+1} - A_n}{A_n} \times 100$.

Example: amount is ₹4840 after 2 years and ₹5324 after 3 years → $R = \frac{484}{4840} \times 100 = 10\%$, and $P = \frac{4840}{1.21} =$ ₹4000.`,
          r`$R = \frac{A_{n+1} - A_n}{A_n} \times 100$।

উদাহরণ: 2 বছরে সুদে-আসলে ₹4840 এবং 3 বছরে ₹5324 → $R = \frac{484}{4840} \times 100 = 10\%$, এবং $P = \frac{4840}{1.21} =$ ₹4000।`,
        ),
        approx_time_saved_sec: 30,
      },
    ],
    common_traps: [
      t(
        r`**Interest vs amount.** Many wrong options are the amount when the question asks for the interest (or vice versa). Re-read the last line before choosing.`,
        r`**সুদ বনাম সুদে-আসলে।** অনেক ভুল বিকল্প হল সুদে-আসলে, যখন প্রশ্ন শুধু সুদ চাইছে (বা উল্টোটা)। উত্তর বাছার আগে প্রশ্নের শেষ লাইনটি আবার পড়ুন।`,
      ),
      t(
        r`**Half-yearly means halve the rate AND double the periods.** $10\%$ p.a. for $1\frac{1}{2}$ years compounded half-yearly is $5\%$ for $3$ periods, not $10\%$ for $1.5$ periods.`,
        r`**ষাণ্মাসিক মানে হার অর্ধেক এবং সময়কাল দ্বিগুণ।** বার্ষিক $10\%$ হারে $1\frac{1}{2}$ বছর ষাণ্মাসিক চক্রবৃদ্ধি মানে $5\%$ হারে $3$টি পর্যায়, $10\%$ হারে $1.5$ পর্যায় নয়।`,
      ),
      t(
        r`**$P(R/100)^2$ works only for 2 years.** For 3 years the difference is $P\left(\frac{R}{100}\right)^2\left(3 + \frac{R}{100}\right)$.`,
        r`**$P(R/100)^2$ শুধু 2 বছরের জন্য।** 3 বছরের ক্ষেত্রে অন্তর $P\left(\frac{R}{100}\right)^2\left(3 + \frac{R}{100}\right)$।`,
      ),
      t(
        r`**Time in months or days.** Convert to years before using $SI = \frac{PRT}{100}$: $9$ months $= \frac{3}{4}$ year, $73$ days $= \frac{1}{5}$ year.`,
        r`**মাস বা দিনে দেওয়া সময়।** $SI = \frac{PRT}{100}$ ব্যবহারের আগে বছরে রূপান্তর করুন: $9$ মাস $= \frac{3}{4}$ বছর, $73$ দিন $= \frac{1}{5}$ বছর।`,
      ),
    ],
  },

  // ───────────────────────────── AVERAGE ─────────────────────────────
  {
    subject: 'quant',
    topic: 'average',
    title: { en: 'Average', bn: 'গড়', hi: 'औसत' },
    overview: t(
      r`The average is the total divided by the number of items, so **always convert averages back to totals** ($\text{Sum} = \text{Average} \times n$) before adding, removing or replacing anyone. For "a person joins / leaves / replaces" questions, the change in the average multiplied by the number of people tells you how far the new value is from the old one. For long lists, assume a convenient average and add the mean of the deviations. When groups of different sizes are combined, use a weighted average, never the plain average of the averages.`,
      r`গড় হল মোট যোগফলকে সংখ্যা দিয়ে ভাগ করা, তাই কাউকে যোগ, বাদ বা প্রতিস্থাপন করার আগে **সবসময় গড়কে মোট যোগফলে ফিরিয়ে নিন** ($\text{Sum} = \text{Average} \times n$)। "কেউ যোগ দিল / চলে গেল / কারও জায়গায় এল" ধরনের প্রশ্নে গড়ের পরিবর্তন × লোকসংখ্যা থেকে জানা যায় নতুন মান পুরোনো মানের থেকে কত আলাদা। লম্বা তালিকায় একটি সুবিধাজনক গড় ধরে নিয়ে বিচ্যুতিগুলির গড় যোগ করুন। আলাদা আকারের দলগুলিকে মেলালে ভারযুক্ত গড় (weighted average) ব্যবহার করুন, কখনও গড়গুলির সাধারণ গড় নয়।`,
    ),
    formulas: [
      {
        key: 'average_basic',
        label: t('Average and sum', 'গড় ও যোগফল'),
        latex: r`\text{Average} = \dfrac{\text{Sum of observations}}{n}, \qquad \text{Sum} = \text{Average} \times n`,
      },
      {
        key: 'average_ap',
        label: t('Average of consecutive / evenly spaced numbers', 'ক্রমিক / সমান ব্যবধানের সংখ্যার গড়'),
        latex: r`\text{Average} = \dfrac{\text{First} + \text{Last}}{2}`,
        explanation: t(
          r`So the average of the first $n$ natural numbers is $\frac{n + 1}{2}$.`,
          r`তাই প্রথম $n$টি স্বাভাবিক সংখ্যার গড় $\frac{n + 1}{2}$।`,
        ),
      },
      {
        key: 'weighted_average',
        label: t('Weighted (combined) average', 'ভারযুক্ত (মিলিত) গড়'),
        latex: r`\bar{x} = \dfrac{n_1 \bar{x}_1 + n_2 \bar{x}_2}{n_1 + n_2}`,
        variables: [v(r`n_1, n_2`, 'Sizes of the groups', 'দলগুলির সদস্যসংখ্যা'), v(r`\bar{x}_1, \bar{x}_2`, 'Group averages', 'দলগুলির গড়')],
      },
      {
        key: 'replacement',
        label: t('Replacement: value of the new member', 'প্রতিস্থাপন: নতুন সদস্যের মান'),
        latex: r`\text{New} = \text{Old} + n \times (\text{change in average})`,
        explanation: t(
          'Use a negative change if the average falls.',
          'গড় কমলে পরিবর্তনটি ঋণাত্মক নিন।',
        ),
      },
      {
        key: 'inclusion',
        label: t('Inclusion of one new member', 'একজন নতুন সদস্য যোগ হলে'),
        latex: r`\text{New member} = \text{New avg} + n \times (\text{New avg} - \text{Old avg})`,
        variables: [v('n', 'Number of members before joining', 'যোগ দেওয়ার আগে সদস্যসংখ্যা')],
      },
      {
        key: 'average_speed',
        label: t('Average speed over equal distances', 'সমান দূরত্বে গড় গতিবেগ'),
        latex: r`\text{Average speed} = \dfrac{2xy}{x + y}`,
      },
    ],
    derivation_rules: [
      {
        title: t('Deviation (assumed mean) method', 'বিচ্যুতি (অনুমিত গড়) পদ্ধতি'),
        body: t(
          r`Pick a round number near the data, write each value as a deviation from it, and add the average deviation. Example: $47, 52, 55, 49, 57$; assume $50$: deviations $-3, +2, +5, -1, +7$, total $+10$, so average $= 50 + \frac{10}{5} = 52$.`,
          r`তথ্যের কাছাকাছি একটি পূর্ণ সংখ্যা বেছে নিন, প্রতিটি মানকে তার থেকে বিচ্যুতি হিসেবে লিখুন এবং বিচ্যুতির গড় যোগ করুন। উদাহরণ: $47, 52, 55, 49, 57$; $50$ ধরলে বিচ্যুতি $-3, +2, +5, -1, +7$, মোট $+10$, তাই গড় $= 50 + \frac{10}{5} = 52$।`,
        ),
      },
      {
        title: t('Convert to totals, then compare', 'মোট যোগফলে রূপান্তর করে তুলনা'),
        body: t(
          r`Write old total and new total and subtract. Example: the average age of $20$ students is $15$ years; including the teacher it becomes $16$. Teacher $= 21 \times 16 - 20 \times 15 = 336 - 300 = 36$ years.`,
          r`পুরোনো মোট ও নতুন মোট লিখে বিয়োগ করুন। উদাহরণ: $20$ জন ছাত্রের গড় বয়স $15$ বছর; শিক্ষককে ধরলে গড় হয় $16$ বছর। শিক্ষকের বয়স $= 21 \times 16 - 20 \times 15 = 336 - 300 = 36$ বছর।`,
        ),
      },
      {
        title: t('Cricket / innings questions', 'ক্রিকেট / ইনিংসের প্রশ্ন'),
        body: t(
          r`Let the average before the last innings be $x$ and equate totals. Example: after scoring $85$ in the 17th innings, a batsman's average rises by $3$. Then $16x + 85 = 17(x + 3) \Rightarrow x = 34$, so the new average is $37$.`,
          r`শেষ ইনিংসের আগের গড় $x$ ধরে মোট রানগুলি সমান করুন। উদাহরণ: 17তম ইনিংসে $85$ রান করে এক ব্যাটসম্যানের গড় $3$ বাড়ল। তাহলে $16x + 85 = 17(x + 3) \Rightarrow x = 34$, অর্থাৎ নতুন গড় $37$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Replacement in one line', 'এক লাইনে প্রতিস্থাপন'),
        body: t(
          r`New $=$ Old $+ n \times$ change.

Example: the average weight of $8$ people rises by $2.5$ kg when a new person replaces one weighing $65$ kg → new person $= 65 + 8 \times 2.5 = 85$ kg.`,
          r`নতুন $=$ পুরোনো $+ n \times$ পরিবর্তন।

উদাহরণ: $65$ kg ওজনের একজনের জায়গায় নতুন একজন আসায় $8$ জনের গড় ওজন $2.5$ kg বাড়ল → নতুন ব্যক্তির ওজন $= 65 + 8 \times 2.5 = 85$ kg।`,
        ),
        approx_time_saved_sec: 25,
      },
      {
        title: t('Consecutive numbers: average is the middle', 'ক্রমিক সংখ্যা: গড়ই মাঝের সংখ্যা'),
        body: t(
          r`For an odd count of evenly spaced numbers the average is the middle term.

Example: the average of $5$ consecutive odd numbers is $27$ → they are $23, 25, 27, 29, 31$; the largest is $27 + 4 = 31$.`,
          r`সমান ব্যবধানের বিজোড় সংখ্যক পদের গড় হল মাঝের পদ।

উদাহরণ: $5$টি ক্রমিক বিজোড় সংখ্যার গড় $27$ → সংখ্যাগুলি $23, 25, 27, 29, 31$; বৃহত্তমটি $27 + 4 = 31$।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Correcting a wrongly copied value', 'ভুল লেখা মান সংশোধন'),
        body: t(
          r`Correct average $=$ old average $+ \frac{\text{correct} - \text{wrong}}{n}$.

Example: the average of $10$ numbers is $40$, but $64$ was read as $46$ → correct average $= 40 + \frac{18}{10} = 41.8$.`,
          r`সঠিক গড় = পুরোনো গড় + (সঠিক মান − ভুল মান) ÷ $n$।

উদাহরণ: $10$টি সংখ্যার গড় $40$, কিন্তু $64$-কে $46$ পড়া হয়েছিল → সঠিক গড় $= 40 + \frac{18}{10} = 41.8$।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        r`**Average speed is not the mean of the speeds.** Going at $40$ km/h and returning at $60$ km/h gives $\frac{2 \times 40 \times 60}{100} = 48$ km/h, not $50$.`,
        r`**গড় গতিবেগ গতিবেগগুলির সাধারণ গড় নয়।** $40$ km/h বেগে গিয়ে $60$ km/h বেগে ফিরলে গড় গতিবেগ $\frac{2 \times 40 \times 60}{100} = 48$ km/h, $50$ নয়।`,
      ),
      t(
        r`**Average of averages.** Class A ($30$ students, average $60$) and class B ($20$ students, average $70$) have a combined average of $\frac{1800 + 1400}{50} = 64$, not $65$.`,
        r`**গড়ের গড়।** A শ্রেণি ($30$ জন, গড় $60$) ও B শ্রেণি ($20$ জন, গড় $70$)-এর মিলিত গড় $\frac{1800 + 1400}{50} = 64$, $65$ নয়।`,
      ),
      t(
        r`**Wrong divisor after inclusion.** When the teacher is included, the new total is divided by $n + 1$, not $n$. When someone leaves, divide by $n - 1$.`,
        r`**যোগ দেওয়ার পরে ভুল ভাজক।** শিক্ষককে ধরলে নতুন মোটকে $n + 1$ দিয়ে ভাগ করতে হয়, $n$ দিয়ে নয়। কেউ চলে গেলে $n - 1$ দিয়ে ভাগ করুন।`,
      ),
    ],
  },

  // ───────────────────────────── NUMBER SYSTEM ─────────────────────────────
  {
    subject: 'quant',
    topic: 'number_system',
    title: { en: 'Number System', bn: 'সংখ্যা পদ্ধতি', hi: 'संख्या पद्धति' },
    overview: t(
      r`Number System covers divisibility, remainders, HCF and LCM, factors, unit digits and series sums. The common approach is to **avoid big calculations**: test divisibility with digit rules, find remainders by reducing each part first, and get unit digits from the repeating cycle of powers. Break a number into prime factors whenever factors, HCF or LCM are involved. For "least / greatest number" questions, decide first whether the answer is built from the LCM (smallest number divisible by all) or the HCF (largest number that divides all).`,
      r`সংখ্যা পদ্ধতির মধ্যে আছে বিভাজ্যতা, ভাগশেষ, গ.সা.গু. ও ল.সা.গু., উৎপাদক, একক স্থানীয় অঙ্ক এবং শ্রেণির যোগফল। সাধারণ কৌশল হল **বড় হিসাব এড়ানো**: অঙ্কের নিয়ম দিয়ে বিভাজ্যতা যাচাই করুন, প্রতিটি অংশ আগে ছোট করে ভাগশেষ বের করুন এবং ঘাতের পুনরাবৃত্ত চক্র থেকে একক স্থানীয় অঙ্ক বের করুন। উৎপাদক, গ.সা.গু. বা ল.সা.গু. থাকলেই সংখ্যাটিকে মৌলিক উৎপাদকে ভাঙুন। "ক্ষুদ্রতম / বৃহত্তম সংখ্যা" ধরনের প্রশ্নে আগে ঠিক করুন উত্তর ল.সা.গু. থেকে আসবে (সবগুলি দিয়ে বিভাজ্য ক্ষুদ্রতম সংখ্যা) নাকি গ.সা.গু. থেকে (সবগুলিকে ভাগ করে এমন বৃহত্তম সংখ্যা)।`,
    ),
    formulas: [
      {
        key: 'division_algorithm',
        label: t('Division algorithm', 'ভাগের নিয়ম'),
        latex: r`\text{Dividend} = \text{Divisor} \times \text{Quotient} + \text{Remainder}`,
        explanation: t(
          r`Remainder is always $0 \le r < \text{divisor}$.`,
          r`ভাগশেষ সবসময় $0 \le r <$ ভাজক।`,
        ),
      },
      {
        key: 'hcf_lcm_product',
        label: t('HCF × LCM for two numbers', 'দুটি সংখ্যার গ.সা.গু. × ল.সা.গু.'),
        latex: r`\text{HCF}(a, b) \times \text{LCM}(a, b) = a \times b`,
        explanation: t(
          'True only for two numbers.',
          'শুধুমাত্র দুটি সংখ্যার ক্ষেত্রে সত্য।',
        ),
      },
      {
        key: 'hcf_lcm_fractions',
        label: t('HCF and LCM of fractions', 'ভগ্নাংশের গ.সা.গু. ও ল.সা.গু.'),
        latex: r`\text{HCF} = \dfrac{\text{HCF of numerators}}{\text{LCM of denominators}}, \quad \text{LCM} = \dfrac{\text{LCM of numerators}}{\text{HCF of denominators}}`,
      },
      {
        key: 'number_of_factors',
        label: t('Number of factors', 'উৎপাদকের সংখ্যা'),
        latex: r`N = p^{a} q^{b} r^{c} \;\Longrightarrow\; \text{factors} = (a + 1)(b + 1)(c + 1)`,
        variables: [v('p, q, r', 'Distinct prime factors of N', 'N-এর ভিন্ন ভিন্ন মৌলিক উৎপাদক')],
      },
      {
        key: 'series_sums',
        label: t('Sums of natural numbers, squares and cubes', 'স্বাভাবিক সংখ্যা, বর্গ ও ঘনের যোগফল'),
        latex: r`\sum n = \dfrac{n(n+1)}{2}, \quad \sum n^2 = \dfrac{n(n+1)(2n+1)}{6}, \quad \sum n^3 = \left[\dfrac{n(n+1)}{2}\right]^2`,
        explanation: t(
          r`Sum of the first $n$ odd numbers $= n^2$; of the first $n$ even numbers $= n(n + 1)$.`,
          r`প্রথম $n$টি বিজোড় সংখ্যার যোগফল $= n^2$; প্রথম $n$টি জোড় সংখ্যার যোগফল $= n(n + 1)$।`,
        ),
      },
      {
        key: 'trailing_zeros',
        label: t('Trailing zeros in n!', 'n!-এর শেষে শূন্যের সংখ্যা'),
        latex: r`Z = \left\lfloor \dfrac{n}{5} \right\rfloor + \left\lfloor \dfrac{n}{25} \right\rfloor + \left\lfloor \dfrac{n}{125} \right\rfloor + \cdots`,
      },
    ],
    derivation_rules: [
      {
        title: t('Key divisibility rules', 'বিভাজ্যতার প্রধান নিয়ম'),
        body: t(
          r`- **3 / 9:** sum of digits divisible by 3 / 9.
- **4 / 8:** last two / three digits divisible by 4 / 8.
- **11:** (sum of digits in odd places) − (sum in even places) is $0$ or a multiple of $11$.
- **Composite divisors:** split into **co-prime** factors — 12 → 3 and 4; 72 → 8 and 9.`,
          r`- **3 / 9:** অঙ্কগুলির যোগফল 3 / 9 দিয়ে বিভাজ্য।
- **4 / 8:** শেষ দুটি / তিনটি অঙ্কে গঠিত সংখ্যা 4 / 8 দিয়ে বিভাজ্য।
- **11:** (বিজোড় স্থানের অঙ্কগুলির যোগফল) − (জোড় স্থানের অঙ্কগুলির যোগফল) $0$ অথবা $11$-এর গুণিতক।
- **যৌগিক ভাজক:** **পরস্পর মৌলিক** উৎপাদকে ভাঙুন — 12 → 3 ও 4; 72 → 8 ও 9।`,
        ),
      },
      {
        title: t('Remainder of sums and products', 'যোগফল ও গুণফলের ভাগশেষ'),
        body: t(
          r`Replace each number by its remainder first, then combine and reduce again. Example: remainder of $17 \times 23$ ÷ $5$: remainders $2$ and $3$, product $6$, remainder $1$. (Check: $391 = 5 \times 78 + 1$.)`,
          r`প্রথমে প্রতিটি সংখ্যার জায়গায় তার ভাগশেষ বসান, তারপর মিলিয়ে আবার ছোট করুন। উদাহরণ: $17 \times 23$-কে $5$ দিয়ে ভাগ করলে ভাগশেষ: আলাদা ভাগশেষ $2$ ও $3$, গুণফল $6$, ভাগশেষ $1$। (যাচাই: $391 = 5 \times 78 + 1$।)`,
        ),
      },
      {
        title: t('LCM / HCF word problems', 'ল.সা.গু. / গ.সা.গু.-র কথার অঙ্ক'),
        body: t(
          r`- Smallest number that leaves the **same remainder $r$** when divided by $a, b, c$: $\text{LCM}(a, b, c) + r$. Example: by $12, 15, 20$ leaving $5$ → $60 + 5 = 65$.
- Largest number dividing $x, y, z$ leaving the **same remainder**: HCF of the differences $|x - y|, |y - z|$.
- Bells / lights together again: LCM of the intervals.`,
          r`- $a, b, c$ দিয়ে ভাগ করলে প্রতিক্ষেত্রে **একই ভাগশেষ $r$** থাকে এমন ক্ষুদ্রতম সংখ্যা: $\text{LCM}(a, b, c) + r$। উদাহরণ: $12, 15, 20$ দিয়ে ভাগশেষ $5$ → $60 + 5 = 65$।
- $x, y, z$-কে ভাগ করে **একই ভাগশেষ** রাখে এমন বৃহত্তম সংখ্যা: অন্তরগুলির $|x - y|, |y - z|$ গ.সা.গু.।
- ঘণ্টা / আলো আবার একসঙ্গে বাজবে / জ্বলবে: সময়-ব্যবধানগুলির ল.সা.গু.।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Unit digit by cycle of 4', '4-এর চক্রে একক স্থানীয় অঙ্ক'),
        body: t(
          r`Unit digits of powers repeat every $4$. Divide the power by $4$ and use the remainder (use $4$ if the remainder is $0$).

Example: $7^{95}$: $95 = 4 \times 23 + 3$ → unit digit of $7^3 = 343$ is $3$.`,
          r`ঘাতের একক স্থানীয় অঙ্ক প্রতি $4$ ধাপে পুনরাবৃত্ত হয়। ঘাতকে $4$ দিয়ে ভাগ করে ভাগশেষ ব্যবহার করুন (ভাগশেষ $0$ হলে $4$ নিন)।

উদাহরণ: $7^{95}$: $95 = 4 \times 23 + 3$ → $7^3 = 343$-এর একক অঙ্ক $3$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Number of factors from prime powers', 'মৌলিক ঘাত থেকে উৎপাদকের সংখ্যা'),
        body: t(
          r`Add 1 to each exponent and multiply.

Example: $360 = 2^3 \times 3^2 \times 5$ → $(3 + 1)(2 + 1)(1 + 1) = 24$ factors.`,
          r`প্রতিটি ঘাতে 1 যোগ করে গুণ করুন।

উদাহরণ: $360 = 2^3 \times 3^2 \times 5$ → $(3 + 1)(2 + 1)(1 + 1) = 24$টি উৎপাদক।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Trailing zeros of a factorial', 'ক্রমগুণিতের শেষে শূন্য'),
        body: t(
          r`Keep dividing by $5$ and add the quotients.

Example: $100!$ → $20 + 4 = 24$ zeros.`,
          r`বারবার $5$ দিয়ে ভাগ করে ভাগফলগুলি যোগ করুন।

উদাহরণ: $100!$ → $20 + 4 = 24$টি শূন্য।`,
        ),
        approx_time_saved_sec: 25,
      },
      {
        title: t('Remainder by a factor of the divisor', 'ভাজকের উৎপাদক দিয়ে ভাগশেষ'),
        body: t(
          r`If $N$ leaves remainder $r$ when divided by $d$, and $k$ divides $d$, then the remainder of $N$ by $k$ is the remainder of $r$ by $k$.

Example: $N \div 45$ leaves $27$ → $N \div 15$ leaves $27 - 15 = 12$.`,
          r`$N$-কে $d$ দিয়ে ভাগ করলে ভাগশেষ $r$ এবং $k$ যদি $d$-এর উৎপাদক হয়, তবে $N$-কে $k$ দিয়ে ভাগ করলে ভাগশেষ $= r$-কে $k$ দিয়ে ভাগ করার ভাগশেষ।

উদাহরণ: $N \div 45$-এ ভাগশেষ $27$ → $N \div 15$-এ ভাগশেষ $27 - 15 = 12$।`,
        ),
        approx_time_saved_sec: 20,
      },
    ],
    common_traps: [
      t(
        '**1 is neither prime nor composite**, and **2 is the only even prime**. Options built on "1 is prime" are traps.',
        '**1 মৌলিকও নয়, যৌগিকও নয়**, এবং **2 একমাত্র জোড় মৌলিক সংখ্যা**। "1 মৌলিক" ধরে তৈরি বিকল্পগুলি ফাঁদ।',
      ),
      t(
        r`**Divisibility by 12 is not "by 2 and 6".** $18$ is divisible by $2$ and $6$ but not by $12$. Use co-prime factors: $3$ and $4$.`,
        r`**12 দিয়ে বিভাজ্যতা মানে "2 ও 6 দিয়ে" নয়।** $18$, $2$ ও $6$ দিয়ে বিভাজ্য কিন্তু $12$ দিয়ে নয়। পরস্পর মৌলিক উৎপাদক ব্যবহার করুন: $3$ ও $4$।`,
      ),
      t(
        r`**Power a multiple of 4.** For $2^{40}$ the remainder of $40 \div 4$ is $0$, so take the 4th term of the cycle $2, 4, 8, 6$: the unit digit is $6$, not $1$ or $0$.`,
        r`**ঘাত 4-এর গুণিতক হলে।** $2^{40}$-এর ক্ষেত্রে $40 \div 4$-এর ভাগশেষ $0$, তাই $2, 4, 8, 6$ চক্রের 4র্থ পদ নিন: একক অঙ্ক $6$, $1$ বা $0$ নয়।`,
      ),
      t(
        r`**HCF × LCM = product only for two numbers.** For three numbers this identity fails; e.g. $2, 4, 8$: HCF $\times$ LCM $= 2 \times 8 = 16$, but the product is $64$.`,
        r`**গ.সা.গু. × ল.সা.গু. = গুণফল শুধু দুটি সংখ্যার জন্য।** তিনটি সংখ্যায় এটি খাটে না; যেমন $2, 4, 8$: গ.সা.গু. $\times$ ল.সা.গু. $= 2 \times 8 = 16$, কিন্তু গুণফল $64$।`,
      ),
    ],
  },

  // ───────────────────────────── TIME, SPEED & DISTANCE ─────────────────────────────
  {
    subject: 'quant',
    topic: 'time_speed_distance',
    title: { en: 'Time, Speed & Distance', bn: 'সময়, গতিবেগ ও দূরত্ব', hi: 'समय, चाल और दूरी' },
    overview: t(
      r`Every question here is built on $D = S \times T$; trains, boats and races are only special cases. Start by **making the units consistent** (km/h ↔ m/s using $\frac{5}{18}$), then decide what is fixed: if distance is fixed, speed and time are inversely proportional. For two moving bodies use **relative speed** — add speeds when they move towards each other, subtract when they move in the same direction. In train problems, the distance covered while crossing equals the train's length plus the length of whatever it crosses (zero for a pole or a man).`,
      r`এখানে প্রতিটি প্রশ্ন $D = S \times T$ সূত্রের উপর দাঁড়িয়ে; ট্রেন, নৌকা ও দৌড়ের প্রশ্ন এরই বিশেষ রূপ। শুরুতেই **এককগুলি এক করুন** ($\frac{5}{18}$ দিয়ে km/h ↔ m/s), তারপর ঠিক করুন কোনটি স্থির: দূরত্ব স্থির থাকলে গতিবেগ ও সময় ব্যস্ত সমানুপাতী। দুটি চলমান বস্তুর ক্ষেত্রে **আপেক্ষিক গতিবেগ** ব্যবহার করুন — পরস্পরের দিকে চললে গতিবেগ যোগ, একই দিকে চললে বিয়োগ। ট্রেনের প্রশ্নে অতিক্রম করার সময় অতিক্রান্ত দূরত্ব = ট্রেনের দৈর্ঘ্য + যা অতিক্রম করছে তার দৈর্ঘ্য (খুঁটি বা মানুষের ক্ষেত্রে শূন্য)।`,
    ),
    formulas: [
      {
        key: 'dst',
        label: t('Distance, speed and time', 'দূরত্ব, গতিবেগ ও সময়'),
        latex: r`D = S \times T, \qquad S = \dfrac{D}{T}, \qquad T = \dfrac{D}{S}`,
        variables: [v('D', 'Distance', 'দূরত্ব'), v('S', 'Speed', 'গতিবেগ'), v('T', 'Time', 'সময়')],
      },
      {
        key: 'unit_conversion',
        label: t('Unit conversion', 'একক রূপান্তর'),
        latex: r`1\ \text{km/h} = \dfrac{5}{18}\ \text{m/s}, \qquad 1\ \text{m/s} = \dfrac{18}{5}\ \text{km/h}`,
      },
      {
        key: 'avg_speed_equal_distance',
        label: t('Average speed for equal distances', 'সমান দূরত্বে গড় গতিবেগ'),
        latex: r`S_{\text{avg}} = \dfrac{2xy}{x + y}`,
        explanation: t(
          r`In general, average speed $= \frac{\text{total distance}}{\text{total time}}$.`,
          r`সাধারণভাবে, গড় গতিবেগ = মোট দূরত্ব ÷ মোট সময়।`,
        ),
      },
      {
        key: 'relative_speed',
        label: t('Relative speed', 'আপেক্ষিক গতিবেগ'),
        latex: r`S_{\text{rel}} = S_1 + S_2 \;(\text{opposite}), \qquad S_{\text{rel}} = |S_1 - S_2| \;(\text{same direction})`,
      },
      {
        key: 'train_crossing',
        label: t('Train crossing time', 'ট্রেনের অতিক্রম করার সময়'),
        latex: r`T = \dfrac{L_1 + L_2}{S_{\text{rel}}}`,
        explanation: t(
          r`$L_2 = 0$ for a pole, a man or a signal post; $L_2$ is the platform / bridge / other train's length otherwise.`,
          r`খুঁটি, মানুষ বা সিগন্যাল পোস্টের ক্ষেত্রে $L_2 = 0$; অন্যথায় $L_2$ হল প্ল্যাটফর্ম / সেতু / অন্য ট্রেনের দৈর্ঘ্য।`,
        ),
      },
      {
        key: 'boats_streams',
        label: t('Boats and streams', 'নৌকা ও স্রোত'),
        latex: r`D_s = u + v,\quad U_s = u - v,\quad u = \dfrac{D_s + U_s}{2},\quad v = \dfrac{D_s - U_s}{2}`,
        variables: [
          v('u', 'Speed of the boat in still water', 'স্থির জলে নৌকার গতিবেগ'),
          v('v', 'Speed of the stream', 'স্রোতের গতিবেগ'),
          v('D_s', 'Downstream speed', 'স্রোতের অনুকূলে গতিবেগ'),
          v('U_s', 'Upstream speed', 'স্রোতের প্রতিকূলে গতিবেগ'),
        ],
      },
    ],
    derivation_rules: [
      {
        title: t('Fix the constant, use proportion', 'স্থির রাশি ঠিক করে সমানুপাত ব্যবহার'),
        body: t(
          r`If distance is constant, $S_1 : S_2 = T_2 : T_1$. Example: walking at $\frac{3}{4}$ of the usual speed, a man is $20$ minutes late. Time ratio $= 4 : 3$, so the extra $1$ part $= 20$ min and the usual time $= 3 \times 20 = 60$ minutes.`,
          r`দূরত্ব স্থির থাকলে $S_1 : S_2 = T_2 : T_1$। উদাহরণ: স্বাভাবিক গতিবেগের $\frac{3}{4}$ বেগে হাঁটলে একজন $20$ মিনিট দেরিতে পৌঁছায়। সময়ের অনুপাত $= 4 : 3$, তাই বাড়তি $1$ অংশ $= 20$ মিনিট এবং স্বাভাবিক সময় $= 3 \times 20 = 60$ মিনিট।`,
        ),
      },
      {
        title: t('Train problems step by step', 'ধাপে ধাপে ট্রেনের প্রশ্ন'),
        body: t(
          r`1. Convert speed to m/s if lengths are in metres.
2. Distance $=$ sum of the lengths involved.
3. Speed $=$ relative speed (add / subtract).
4. Time $=$ distance ÷ speed.

Example: a $200$ m train at $72$ km/h $(= 20$ m/s$)$ crosses a $300$ m platform in $\frac{500}{20} = 25$ s.`,
          r`1. দৈর্ঘ্য মিটারে থাকলে গতিবেগকে m/s-এ রূপান্তর করুন।
2. দূরত্ব $=$ সংশ্লিষ্ট দৈর্ঘ্যগুলির যোগফল।
3. গতিবেগ $=$ আপেক্ষিক গতিবেগ (যোগ / বিয়োগ)।
4. সময় $=$ দূরত্ব ÷ গতিবেগ।

উদাহরণ: $200$ m লম্বা ট্রেন $72$ km/h $(= 20$ m/s$)$ বেগে $300$ m প্ল্যাটফর্ম অতিক্রম করে $\frac{500}{20} = 25$ সেকেন্ডে।`,
        ),
      },
      {
        title: t('Late / early at two speeds', 'দুই গতিবেগে দেরি / আগে পৌঁছানো'),
        body: t(
          r`$D = \frac{S_1 S_2}{S_2 - S_1} \times (\text{difference in time})$. Example: at $4$ km/h a man is $10$ min late; at $5$ km/h he is $5$ min early. Time difference $= 15$ min $= \frac{1}{4}$ h, so $D = \frac{4 \times 5}{1} \times \frac{1}{4} = 5$ km. (Check: $75$ min vs $60$ min.)`,
          r`$D = \frac{S_1 S_2}{S_2 - S_1} \times$ (সময়ের অন্তর)। উদাহরণ: $4$ km/h বেগে গেলে একজন $10$ মিনিট দেরি করে; $5$ km/h বেগে গেলে $5$ মিনিট আগে পৌঁছায়। সময়ের অন্তর $= 15$ মিনিট $= \frac{1}{4}$ ঘণ্টা, তাই $D = \frac{4 \times 5}{1} \times \frac{1}{4} = 5$ km। (যাচাই: $75$ মিনিট বনাম $60$ মিনিট।)`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Ready conversions', 'তৈরি রূপান্তর'),
        body: t(
          r`Multiples of $18$ km/h convert cleanly: $18 \to 5$, $36 \to 10$, $54 \to 15$, $72 \to 20$, $90 \to 25$ m/s.

Example: a train at $54$ km/h passes a pole in $10$ s → length $= 15 \times 10 = 150$ m.`,
          r`$18$ km/h-এর গুণিতকগুলি সহজে রূপান্তরিত হয়: $18 \to 5$, $36 \to 10$, $54 \to 15$, $72 \to 20$, $90 \to 25$ m/s।

উদাহরণ: $54$ km/h বেগের ট্রেন একটি খুঁটিকে $10$ সেকেন্ডে অতিক্রম করে → দৈর্ঘ্য $= 15 \times 10 = 150$ m।`,
        ),
        approx_time_saved_sec: 15,
      },
      {
        title: t('Average speed for a round trip', 'যাওয়া-আসার গড় গতিবেগ'),
        body: t(
          r`Use $\frac{2xy}{x + y}$ directly.

Example: $40$ km/h out and $60$ km/h back → $\frac{2 \times 40 \times 60}{100} = 48$ km/h.`,
          r`সরাসরি $\frac{2xy}{x + y}$ ব্যবহার করুন।

উদাহরণ: যাওয়া $40$ km/h ও ফেরা $60$ km/h → $\frac{2 \times 40 \times 60}{100} = 48$ km/h।`,
        ),
        approx_time_saved_sec: 20,
      },
      {
        title: t('Speeds from times after meeting', 'মিলিত হওয়ার পরের সময় থেকে গতিবেগ'),
        body: t(
          r`Two trains start together from A and B towards each other. If after meeting they take $t_1$ and $t_2$ hours to reach their destinations, then $\frac{S_1}{S_2} = \sqrt{\frac{t_2}{t_1}}$.

Example: $t_1 = 9$ h, $t_2 = 16$ h → $S_1 : S_2 = 4 : 3$.`,
          r`দুটি ট্রেন একই সময়ে A ও B থেকে পরস্পরের দিকে রওনা দেয়। মিলিত হওয়ার পরে গন্তব্যে পৌঁছাতে তাদের $t_1$ ও $t_2$ ঘণ্টা লাগলে $\frac{S_1}{S_2} = \sqrt{\frac{t_2}{t_1}}$।

উদাহরণ: $t_1 = 9$ ঘণ্টা, $t_2 = 16$ ঘণ্টা → $S_1 : S_2 = 4 : 3$।`,
        ),
        approx_time_saved_sec: 40,
      },
      {
        title: t('Boat and stream by half-sum / half-difference', 'অর্ধ-যোগফল / অর্ধ-অন্তর দিয়ে নৌকা ও স্রোত'),
        body: t(
          r`Example: downstream $18$ km/h, upstream $12$ km/h → boat $= \frac{18 + 12}{2} = 15$ km/h, stream $= \frac{18 - 12}{2} = 3$ km/h.`,
          r`উদাহরণ: স্রোতের অনুকূলে $18$ km/h, প্রতিকূলে $12$ km/h → নৌকা $= \frac{18 + 12}{2} = 15$ km/h, স্রোত $= \frac{18 - 12}{2} = 3$ km/h।`,
        ),
        approx_time_saved_sec: 15,
      },
    ],
    common_traps: [
      t(
        r`**Mixed units.** Lengths in metres with speed in km/h give answers off by a factor of $3.6$. Convert before dividing.`,
        r`**এককের মিশ্রণ।** দৈর্ঘ্য মিটারে আর গতিবেগ km/h-এ রেখে হিসাব করলে উত্তর $3.6$ গুণ ভুল হয়। ভাগ করার আগে রূপান্তর করুন।`,
      ),
      t(
        r`**Forgetting the train's own length.** Crossing a $300$ m platform means covering $300 +$ train length, not $300$ m.`,
        r`**ট্রেনের নিজের দৈর্ঘ্য ভুলে যাওয়া।** $300$ m প্ল্যাটফর্ম অতিক্রম করা মানে $300 +$ ট্রেনের দৈর্ঘ্য পথ যাওয়া, শুধু $300$ m নয়।`,
      ),
      t(
        r`**Wrong sign for relative speed.** Trains on parallel tracks in the same direction: subtract the speeds; in opposite directions: add them.`,
        r`**আপেক্ষিক গতিবেগে ভুল চিহ্ন।** সমান্তরাল লাইনে একই দিকে চললে গতিবেগ বিয়োগ; বিপরীত দিকে চললে যোগ।`,
      ),
      t(
        r`**Average speed as the simple mean.** For equal distances use $\frac{2xy}{x + y}$; the simple mean $\frac{x + y}{2}$ is correct only when equal **times** are spent at each speed.`,
        r`**গড় গতিবেগকে সাধারণ গড় ধরা।** সমান দূরত্বে $\frac{2xy}{x + y}$ ব্যবহার করুন; সাধারণ গড় $\frac{x + y}{2}$ তখনই ঠিক যখন প্রতিটি গতিবেগে সমান **সময়** কাটানো হয়।`,
      ),
    ],
  },

  // ───────────────────────────── MIXTURE & ALLIGATION ─────────────────────────────
  {
    subject: 'quant',
    topic: 'mixture_alligation',
    title: { en: 'Mixture & Alligation', bn: 'মিশ্রণ ও অ্যালিগেশন', hi: 'मिश्रण और एलिगेशन' },
    overview: t(
      r`Mixture questions ask in what ratio two ingredients of different price (or strength) must be mixed to get a mixture of a given **mean** price (or strength). The alligation rule answers this directly: the quantities are in the ratio of the **differences from the mean, taken crosswise**. Always work with the cost price of the mixture, so if a selling price and profit are given, find the mixture's CP first. Treat water as an ingredient with price $0$ (or $0\%$ concentration). For repeated "draw out and replace" questions, use the replacement formula instead of step-by-step subtraction.`,
      r`মিশ্রণের প্রশ্নে জানতে চাওয়া হয় আলাদা দাম (বা ঘনত্ব)-এর দুটি উপাদান কোন অনুপাতে মেশালে একটি নির্দিষ্ট **গড়** দাম (বা ঘনত্ব)-এর মিশ্রণ পাওয়া যাবে। অ্যালিগেশন নিয়ম সরাসরি এর উত্তর দেয়: পরিমাণগুলির অনুপাত হল **গড় থেকে অন্তরগুলির আড়াআড়ি অনুপাত**। সবসময় মিশ্রণের ক্রয়মূল্য নিয়ে কাজ করুন; বিক্রয়মূল্য ও লাভ দেওয়া থাকলে আগে মিশ্রণের ক্রয়মূল্য বের করুন। জলকে দাম $0$ (বা ঘনত্ব $0\%$) এমন উপাদান হিসেবে ধরুন। বারবার "তুলে নিয়ে জল দিয়ে ভরা" প্রশ্নে ধাপে ধাপে বিয়োগ না করে প্রতিস্থাপনের সূত্র ব্যবহার করুন।`,
    ),
    formulas: [
      {
        key: 'alligation_rule',
        label: t('Rule of alligation', 'অ্যালিগেশনের নিয়ম'),
        latex: r`\dfrac{\text{Qty of cheaper}}{\text{Qty of dearer}} = \dfrac{d - m}{m - c}`,
        variables: [
          v('c', 'Price (or strength) of the cheaper ingredient', 'সস্তা উপাদানের দাম (বা ঘনত্ব)'),
          v('d', 'Price (or strength) of the dearer ingredient', 'দামি উপাদানের দাম (বা ঘনত্ব)'),
          v('m', 'Mean price of the mixture', 'মিশ্রণের গড় দাম'),
        ],
        explanation: t(r`Valid only when $c < m < d$.`, r`শুধুমাত্র $c < m < d$ হলে প্রযোজ্য।`),
      },
      {
        key: 'mean_price',
        label: t('Mean price of a mixture', 'মিশ্রণের গড় দাম'),
        latex: r`m = \dfrac{c\,Q_1 + d\,Q_2}{Q_1 + Q_2}`,
        variables: [v(r`Q_1, Q_2`, 'Quantities mixed', 'মেশানো পরিমাণ')],
      },
      {
        key: 'replacement',
        label: t('Repeated replacement', 'বারবার প্রতিস্থাপন'),
        latex: r`\text{Pure liquid left} = x\left(1 - \dfrac{y}{x}\right)^{n}`,
        variables: [
          v('x', 'Total volume in the container', 'পাত্রে মোট আয়তন'),
          v('y', 'Volume drawn out and replaced each time', 'প্রতিবার তুলে নেওয়া ও প্রতিস্থাপিত আয়তন'),
          v('n', 'Number of operations', 'কতবার করা হল'),
        ],
      },
      {
        key: 'ratio_after_replacement',
        label: t('Fraction of original liquid left', 'মূল তরলের অবশিষ্ট ভগ্নাংশ'),
        latex: r`\dfrac{\text{Pure left}}{\text{Total}} = \left(1 - \dfrac{y}{x}\right)^{n}`,
        explanation: t(
          'Same idea as depreciation: each operation keeps the same fraction of what was there.',
          'অবচয়ের মতোই ধারণা: প্রতিবার আগের পরিমাণের একই ভগ্নাংশ থেকে যায়।',
        ),
      },
      {
        key: 'mix_two_vessels',
        label: t('Mixing contents of two vessels', 'দুটি পাত্রের মিশ্রণ একত্র করা'),
        latex: r`\text{Milk fraction} = \dfrac{Q_1 \cdot \frac{a}{a+b} + Q_2 \cdot \frac{c}{c+d}}{Q_1 + Q_2}`,
        explanation: t(
          r`Vessels have milk : water $= a : b$ and $c : d$; $Q_1, Q_2$ are the quantities taken.`,
          r`পাত্র দুটিতে দুধ : জল $= a : b$ ও $c : d$; $Q_1, Q_2$ হল নেওয়া পরিমাণ।`,
        ),
      },
    ],
    derivation_rules: [
      {
        title: t('The alligation cross', 'অ্যালিগেশনের আড়াআড়ি চিত্র'),
        body: t(
          r`Write the cheaper and dearer prices on top, the mean in the middle, and subtract crosswise:

$$\begin{array}{ccc} c & & d \\ & m & \\ d - m & & m - c \end{array}$$

The bottom row is the ratio cheaper : dearer. Example: rice at ₹30/kg and ₹45/kg mixed to get ₹36/kg → $(45 - 36) : (36 - 30) = 9 : 6 = 3 : 2$.`,
          r`সস্তা ও দামি দাম উপরে, গড় মাঝখানে লিখে আড়াআড়ি বিয়োগ করুন:

$$\begin{array}{ccc} c & & d \\ & m & \\ d - m & & m - c \end{array}$$

নিচের সারিটিই সস্তা : দামি অনুপাত। উদাহরণ: ₹30/kg ও ₹45/kg দামের চাল মিশিয়ে ₹36/kg করতে → $(45 - 36) : (36 - 30) = 9 : 6 = 3 : 2$।`,
        ),
      },
      {
        title: t('Profit given: find the mixture CP first', 'লাভ দেওয়া থাকলে আগে মিশ্রণের ক্রয়মূল্য'),
        body: t(
          r`Mean price for alligation must be the cost price. Example: milk costs ₹50/L; a milkman adds water and sells the mixture at ₹50/L to gain $25\%$. CP of mixture $= \frac{50}{1.25} = 40$. Alligation with milk $50$, water $0$, mean $40$: milk : water $= (40 - 0) : (50 - 40) = 4 : 1$.`,
          r`অ্যালিগেশনের গড় দাম অবশ্যই ক্রয়মূল্য হতে হবে। উদাহরণ: দুধের দাম ₹50/L; এক দুধওয়ালা জল মিশিয়ে মিশ্রণটি ₹50/L দরে বিক্রি করে $25\%$ লাভ করে। মিশ্রণের ক্রয়মূল্য $= \frac{50}{1.25} = 40$। দুধ $50$, জল $0$, গড় $40$ নিয়ে অ্যালিগেশন: দুধ : জল $= (40 - 0) : (50 - 40) = 4 : 1$।`,
        ),
      },
      {
        title: t('Two vessels: work with fractions', 'দুটি পাত্র: ভগ্নাংশে হিসাব'),
        body: t(
          r`Convert each ratio into the fraction of milk, then add actual quantities. Example: vessels with milk : water $3 : 1$ and $3 : 2$ are mixed in equal amounts ($1$ L each). Milk $= \frac{3}{4} + \frac{3}{5} = 1.35$ L, water $= 0.25 + 0.4 = 0.65$ L, so the ratio is $135 : 65 = 27 : 13$.`,
          r`প্রতিটি অনুপাতকে দুধের ভগ্নাংশে বদলে প্রকৃত পরিমাণ যোগ করুন। উদাহরণ: দুধ : জল $3 : 1$ ও $3 : 2$ অনুপাতের দুটি পাত্র থেকে সমান পরিমাণ ($1$ L করে) মেশানো হল। দুধ $= \frac{3}{4} + \frac{3}{5} = 1.35$ L, জল $= 0.25 + 0.4 = 0.65$ L, তাই অনুপাত $135 : 65 = 27 : 13$।`,
        ),
      },
    ],
    speed_tricks: [
      {
        title: t('Alligation for concentrations', 'ঘনত্বের ক্ষেত্রে অ্যালিগেশন'),
        body: t(
          r`Percent strengths work exactly like prices.

Example: mix $20\%$ and $50\%$ acid to get $30\%$ → $(50 - 30) : (30 - 20) = 20 : 10 = 2 : 1$.`,
          r`শতকরা ঘনত্ব ঠিক দামের মতোই কাজ করে।

উদাহরণ: $20\%$ ও $50\%$ অ্যাসিড মিশিয়ে $30\%$ করতে → $(50 - 30) : (30 - 20) = 20 : 10 = 2 : 1$।`,
        ),
        approx_time_saved_sec: 30,
      },
      {
        title: t('Replacement with a power', 'ঘাত দিয়ে প্রতিস্থাপন'),
        body: t(
          r`Example: from $40$ L of milk, $4$ L is drawn out and replaced with water, three times. Milk left $= 40 \times \left(\frac{36}{40}\right)^3 = 40 \times 0.729 = 29.16$ L.`,
          r`উদাহরণ: $40$ L দুধ থেকে $4$ L তুলে নিয়ে জল দিয়ে ভরা হল, এভাবে তিনবার। অবশিষ্ট দুধ $= 40 \times \left(\frac{36}{40}\right)^3 = 40 \times 0.729 = 29.16$ L।`,
        ),
        approx_time_saved_sec: 40,
      },
      {
        title: t('Check the answer with the mean formula', 'গড়ের সূত্র দিয়ে উত্তর যাচাই'),
        body: t(
          r`Plug the ratio back: $\frac{3 \times 30 + 2 \times 45}{5} = \frac{180}{5} = 36$ confirms the rice example. A 5-second check catches a reversed ratio.`,
          r`অনুপাতটি বসিয়ে দেখুন: $\frac{3 \times 30 + 2 \times 45}{5} = \frac{180}{5} = 36$ — চালের উদাহরণটি সঠিক। 5 সেকেন্ডের এই যাচাই উল্টো অনুপাতের ভুল ধরে ফেলে।`,
        ),
        approx_time_saved_sec: 10,
      },
    ],
    common_traps: [
      t(
        r`**Reversing the alligation ratio.** $(d - m) : (m - c)$ is cheaper : dearer. The difference next to the **dearer** price gives the quantity of the **cheaper** one.`,
        r`**অ্যালিগেশনের অনুপাত উল্টে ফেলা।** $(d - m) : (m - c)$ হল সস্তা : দামি। **দামি** দামের সঙ্গে যুক্ত অন্তরটি **সস্তা** উপাদানের পরিমাণ দেয়।`,
      ),
      t(
        r`**Using SP as the mean price.** If the mixture is sold at a profit, convert SP to CP first; using SP directly gives the wrong ratio.`,
        r`**বিক্রয়মূল্যকে গড় দাম ধরা।** মিশ্রণ লাভে বিক্রি হলে আগে বিক্রয়মূল্যকে ক্রয়মূল্যে রূপান্তর করুন; সরাসরি বিক্রয়মূল্য নিলে অনুপাত ভুল আসে।`,
      ),
      t(
        r`**Adding ratios of two vessels.** Mixing $3 : 1$ and $3 : 2$ does **not** give $6 : 3$. Convert to actual quantities (fractions of milk) before adding.`,
        r`**দুটি পাত্রের অনুপাত সরাসরি যোগ করা।** $3 : 1$ ও $3 : 2$ মেশালে $6 : 3$ **হয় না**। যোগ করার আগে প্রকৃত পরিমাণে (দুধের ভগ্নাংশে) রূপান্তর করুন।`,
      ),
      t(
        r`**Replacement formula on the wrong liquid.** $x\left(1 - \frac{y}{x}\right)^n$ gives the quantity of the **original** liquid left; water $=$ total $-$ that amount.`,
        r`**ভুল তরলে প্রতিস্থাপনের সূত্র।** $x\left(1 - \frac{y}{x}\right)^n$ দেয় **মূল** তরলের অবশিষ্ট পরিমাণ; জল $=$ মোট $-$ ওই পরিমাণ।`,
      ),
    ],
  },
];
