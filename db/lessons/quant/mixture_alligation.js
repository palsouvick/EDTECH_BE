'use strict';

// Lesson: Mixture & Alligation. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'mixture_alligation',
  title: t('Mixture & Alligation', 'মিশ্রণ ও অ্যালিগেশন'),
  emoji: '🧪',
  intro: t(
    'When a shopkeeper mixes cheap rice with costly rice, or a milkman adds water to milk, we get a mixture. This chapter teaches how to find the price of a mixture and in what ratio things must be mixed.',
    'দোকানদার সস্তা চাল আর দামি চাল মেশালে, বা গোয়ালা দুধে জল মেশালে, একটা মিশ্রণ তৈরি হয়। এই অধ্যায়ে শিখব মিশ্রণের দাম কীভাবে বার করতে হয় আর কোন অনুপাতে জিনিস মেশাতে হয়।',
  ),
  levels: [
    {
      level: 'basic',
      sections: [
        {
          heading: t('What is a mixture?', 'মিশ্রণ কী?'),
          body: t(
            r`A **mixture** is what we get when we put two or more things together, like two kinds of tea leaves, or milk and water.

- Each part keeps its own cost. The mixture's price per kg is called the **mean price** (or average price).
- The mean price is always **between** the cheaper price and the costlier price.`,
            r`দুই বা তার বেশি জিনিস একসঙ্গে মেশালে যা পাই তাকে **মিশ্রণ** বলে, যেমন দুরকম চা-পাতা, বা দুধ আর জল।

- প্রতিটি অংশের নিজের দাম থাকে। মিশ্রণের প্রতি কেজির দামকে বলে **গড় দাম** (mean price)।
- গড় দাম সবসময় সস্তা দাম আর দামি দামের **মাঝামাঝি** থাকে।`,
          ),
        },
        {
          heading: t('Price of a mixture', 'মিশ্রণের দাম'),
          body: t(
            r`To find the price of $1$ kg of the mixture:

1. Find the **total cost**: (kg $\times$ price) for each kind, then add.
2. Find the **total weight**: add the kg.
3. Price per kg $= \dfrac{\text{total cost}}{\text{total weight}}$.

This is called a **weighted average**: an average where the bigger quantity counts more.`,
            r`মিশ্রণের $1$ কেজির দাম বার করতে:

1. **মোট দাম** বার করো: প্রতিটি রকমের জন্য (কেজি $\times$ দাম), তারপর যোগ।
2. **মোট ওজন** বার করো: কেজিগুলো যোগ করো।
3. প্রতি কেজির দাম $= \dfrac{\text{মোট দাম}}{\text{মোট ওজন}}$।

একে বলে **ভারযুক্ত গড়** (weighted average): এমন গড়, যেখানে যার পরিমাণ বেশি তার গুরুত্বও বেশি।`,
          ),
        },
        {
          heading: t('Why not just average the two prices?', 'দুটো দামের সাধারণ গড় নিলে হবে না কেন?'),
          body: t(
            r`- If you mix **equal** amounts, the simple average works: $1$ kg at ₹30 and $1$ kg at ₹40 gives ₹35 per kg.
- If the amounts are **different**, the price moves **closer to the bigger amount**. Lots of cheap rice with a little costly rice gives a cheap-ish mixture.`,
            r`- **সমান** পরিমাণ মেশালে সাধারণ গড়ই ঠিক: ₹30-এর $1$ কেজি আর ₹40-এর $1$ কেজি মেশালে প্রতি কেজি ₹35।
- পরিমাণ **আলাদা** হলে দাম **বেশি পরিমাণের দিকে** সরে যায়। অনেকটা সস্তা চালের সঙ্গে অল্প দামি চাল মেশালে মিশ্রণটাও সস্তার দিকেই থাকে।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            '3 kg of rice costing ₹20/kg is mixed with 1 kg costing ₹40/kg. What is the price of the mixture per kg?',
            '₹20/কেজি দামের 3 কেজি চালের সঙ্গে ₹40/কেজি দামের 1 কেজি চাল মেশানো হল। মিশ্রণের প্রতি কেজির দাম কত?',
          ),
          steps: [
            t(r`Total cost $= 3 \times 20 + 1 \times 40 = 60 + 40 = 100$.`, r`মোট দাম $= 3 \times 20 + 1 \times 40 = 60 + 40 = 100$ টাকা।`),
            t(r`Total weight $= 3 + 1 = 4$ kg.`, r`মোট ওজন $= 3 + 1 = 4$ কেজি।`),
            t(r`Price per kg $= 100 \div 4 = 25$.`, r`প্রতি কেজির দাম $= 100 \div 4 = 25$ টাকা।`),
          ],
          answer: t('₹25 per kg', 'প্রতি কেজি ₹25'),
        },
        {
          question: t(
            '8 kg of wheat costing ₹45/kg is mixed with 2 kg costing ₹61/kg. What is the price of the mixture per kg?',
            '₹45/কেজি দামের 8 কেজি গমের সঙ্গে ₹61/কেজি দামের 2 কেজি গম মেশানো হল। মিশ্রণের প্রতি কেজির দাম কত?',
          ),
          steps: [
            t(r`Total cost $= 8 \times 45 + 2 \times 61 = 360 + 122 = 482$.`, r`মোট দাম $= 8 \times 45 + 2 \times 61 = 360 + 122 = 482$ টাকা।`),
            t(r`Total weight $= 8 + 2 = 10$ kg.`, r`মোট ওজন $= 8 + 2 = 10$ কেজি।`),
            t(r`Price per kg $= 482 \div 10 = 48.2$.`, r`প্রতি কেজির দাম $= 482 \div 10 = 48.2$ টাকা।`),
          ],
          answer: t('₹48.20 per kg', 'প্রতি কেজি ₹48.20'),
        },
      ],
    },
    {
      level: 'intermediate',
      sections: [
        {
          heading: t('The rule of alligation', 'অ্যালিগেশনের নিয়ম'),
          body: t(
            r`**Alligation** is a quick rule to find the **ratio** in which two things must be mixed to get a given mean price.

$$\frac{\text{Cheaper quantity}}{\text{Dearer quantity}} = \frac{d - m}{m - c}$$

Here $c$ = cheaper price, $d$ = dearer (costlier) price, $m$ = mean price.

Draw it as a cross: write $c$ and $d$ on top, $m$ in the middle, and subtract **diagonally**.

**Why does it work?** The cheaper part "saves" $(m - c)$ on each kg and the dearer part "costs extra" $(d - m)$ on each kg. For the mixture to balance, the savings must equal the extra costs.`,
            r`কোন **অনুপাতে** দুটো জিনিস মেশালে একটা নির্দিষ্ট গড় দাম পাওয়া যাবে, তা ঝটপট বার করার নিয়মকে বলে **অ্যালিগেশন**।

$$\frac{\text{সস্তার পরিমাণ}}{\text{দামির পরিমাণ}} = \frac{d - m}{m - c}$$

এখানে $c$ = সস্তা দাম, $d$ = দামি দাম, $m$ = গড় দাম।

ক্রসের মতো করে আঁকো: উপরে $c$ আর $d$, মাঝখানে $m$, তারপর **কোনাকুনি** বিয়োগ করো।

**কেন খাটে?** সস্তা অংশ প্রতি কেজিতে $(m - c)$ "বাঁচায়" আর দামি অংশ প্রতি কেজিতে $(d - m)$ "বেশি খরচ" করায়। মিশ্রণে সমতা আনতে বাঁচানো আর বেশি খরচ সমান হতে হবে।`,
          ),
        },
        {
          heading: t('Solutions with percentages', 'শতকরা হারের দ্রবণ'),
          body: t(
            r`The same rule works for **solutions** (a liquid with something dissolved in it), like acid in water or salt in water.

- Treat the **percentage** like the price.
- A $34\%$ acid solution and a $56\%$ acid solution mixed to make $37\%$: ratio $= (56 - 37) : (37 - 34) = 19 : 3$.`,
            r`**দ্রবণের** (যে তরলে কিছু গোলা আছে, যেমন জলে অ্যাসিড বা নুন) ক্ষেত্রেও একই নিয়ম খাটে।

- **শতকরা হারকে** দামের মতো ধরো।
- $34\%$ আর $56\%$ অ্যাসিড দ্রবণ মিশিয়ে $37\%$ বানাতে অনুপাত $= (56 - 37) : (37 - 34) = 19 : 3$।`,
          ),
        },
        {
          heading: t('Adding water to a mixture', 'মিশ্রণে জল মেশানো'),
          body: t(
            r`When only water is added, the **milk does not change**. Use that as the anchor.

1. Find how much milk and water there is now (split the total in the given ratio).
2. Keep the milk fixed and use the new ratio to find the new water.
3. Water to add $=$ new water $-$ old water.`,
            r`শুধু জল মেশালে **দুধের পরিমাণ বদলায় না**। এটাকেই ভিত্তি ধরো।

1. এখন কতটা দুধ আর কতটা জল আছে বার করো (মোট পরিমাণকে দেওয়া অনুপাতে ভাগ করে)।
2. দুধ একই রেখে নতুন অনুপাত থেকে নতুন জলের পরিমাণ বার করো।
3. যত জল মেশাতে হবে $=$ নতুন জল $-$ পুরোনো জল।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'In what ratio must coffee at ₹31/kg be mixed with coffee at ₹46/kg so that the mixture is worth ₹35/kg?',
            '₹31/কেজি দামের কফির সঙ্গে ₹46/কেজি দামের কফি কোন অনুপাতে মেশালে মিশ্রণের দাম ₹35/কেজি হবে?',
          ),
          steps: [
            t(r`$c = 31$, $d = 46$, $m = 35$.`, r`এখানে $c = 31$, $d = 46$, $m = 35$।`),
            t(r`Cheaper : dearer $= (d - m) : (m - c) = (46 - 35) : (35 - 31) = 11 : 4$.`, r`সস্তা : দামি $= (d - m) : (m - c) = (46 - 35) : (35 - 31) = 11 : 4$।`),
            t(r`Check: $\frac{11 \times 31 + 4 \times 46}{15} = \frac{341 + 184}{15} = \frac{525}{15} = 35$.`, r`যাচাই: $\frac{11 \times 31 + 4 \times 46}{15} = \frac{341 + 184}{15} = \frac{525}{15} = 35$।`),
          ],
          answer: t('11 : 4', '11 : 4 অনুপাতে'),
        },
        {
          question: t(
            'In what ratio should a 34% acid solution be mixed with a 56% acid solution to get a 37% solution?',
            '34% অ্যাসিড দ্রবণের সঙ্গে 56% অ্যাসিড দ্রবণ কোন অনুপাতে মেশালে 37% দ্রবণ পাওয়া যাবে?',
          ),
          steps: [
            t(r`Weaker : stronger $= (56 - 37) : (37 - 34)$.`, r`কম তেজি : বেশি তেজি $= (56 - 37) : (37 - 34)$।`),
            t(r`$= 19 : 3$.`, r`অর্থাৎ $19 : 3$।`),
          ],
          answer: t('19 : 3', '19 : 3 অনুপাতে'),
        },
        {
          question: t(
            'A 60-litre mixture contains milk and water in the ratio 3 : 2. How much water must be added to make the ratio 1 : 4?',
            '60 লিটারের একটা মিশ্রণে দুধ ও জলের অনুপাত 3 : 2। কত লিটার জল মেশালে অনুপাত 1 : 4 হবে?',
          ),
          steps: [
            t(r`Milk $= \frac{3}{5} \times 60 = 36$ L, water $= \frac{2}{5} \times 60 = 24$ L.`, r`দুধ $= \frac{3}{5} \times 60 = 36$ লিটার, জল $= \frac{2}{5} \times 60 = 24$ লিটার।`),
            t(r`Milk stays $36$. New ratio $1 : 4$ means water $= 4 \times 36 = 144$ L.`, r`দুধ থাকবে $36$ লিটারই। নতুন অনুপাত $1 : 4$ মানে জল $= 4 \times 36 = 144$ লিটার।`),
            t(r`Water to add $= 144 - 24 = 120$ L.`, r`মেশাতে হবে $= 144 - 24 = 120$ লিটার জল।`),
          ],
          answer: t('120 litres', '120 লিটার'),
        },
      ],
    },
    {
      level: 'advanced',
      sections: [
        {
          heading: t('Taking out and replacing (repeated dilution)', 'বার বার তুলে নিয়ে জল ভরা'),
          body: t(
            r`A vessel has $V$ litres of pure milk. Each time, $x$ litres are taken out and $x$ litres of water are poured in.

- After one round, the milk left is $V \times \left(1 - \frac{x}{V}\right)$, because a fraction $\frac{x}{V}$ of everything (including milk) was removed.
- Each round multiplies the milk by the **same factor** $\left(1 - \frac{x}{V}\right)$.
- After $n$ rounds: $\text{Milk left} = V\left(1 - \dfrac{x}{V}\right)^{n}$.`,
            r`একটা পাত্রে $V$ লিটার খাঁটি দুধ আছে। প্রতিবার $x$ লিটার তুলে নিয়ে $x$ লিটার জল ঢালা হয়।

- একবার পরে দুধ থাকে $V \times \left(1 - \frac{x}{V}\right)$, কারণ সবকিছুর (দুধ-সহ) $\frac{x}{V}$ অংশ বেরিয়ে গেছে।
- প্রতিবার দুধ **একই গুণক** $\left(1 - \frac{x}{V}\right)$ দিয়ে গুণ হয়।
- $n$ বার পরে: $\text{অবশিষ্ট দুধ} = V\left(1 - \dfrac{x}{V}\right)^{n}$।`,
          ),
        },
        {
          heading: t('Water is an ingredient that costs ₹0', 'জল একটা উপাদান যার দাম ₹0'),
          body: t(
            r`In "how much water should the milkman add" problems, treat **water as an item with price $0$** and use alligation.

- Water : milk $= (\text{milk price} - m) : (m - 0)$.
- Alligation also works for anything that gets averaged: marks of two sections, speeds over equal times, profit percentages.`,
            r`"গোয়ালা কতটা জল মেশাবে" ধরনের অঙ্কে **জলকে $0$ দামের একটা জিনিস** ধরে অ্যালিগেশন করো।

- জল : দুধ $= (\text{দুধের দাম} - m) : (m - 0)$।
- যা-কিছুর গড় হয়, সবকিছুতেই অ্যালিগেশন খাটে: দুটো বিভাগের নম্বর, সমান সময়ের গতি, লাভের শতকরা হার।`,
          ),
        },
      ],
      examples: [
        {
          question: t(
            'A vessel holds 80 litres of pure milk. 20 litres are taken out and replaced with water; this is done 2 times in all. How much milk is left?',
            'একটা পাত্রে 80 লিটার খাঁটি দুধ আছে। 20 লিটার তুলে নিয়ে জল ভরা হল; মোট 2 বার এমন করা হল। কতটা দুধ রইল?',
          ),
          steps: [
            t(r`Factor each time $= 1 - \frac{20}{80} = \frac{3}{4}$.`, r`প্রতিবারের গুণক $= 1 - \frac{20}{80} = \frac{3}{4}$।`),
            t(r`Milk left $= 80 \times \left(\frac{3}{4}\right)^2 = 80 \times \frac{9}{16} = 45$ L.`, r`অবশিষ্ট দুধ $= 80 \times \left(\frac{3}{4}\right)^2 = 80 \times \frac{9}{16} = 45$ লিটার।`),
            t(r`Check: after round 1, milk $= 60$; round 2 removes $\frac{1}{4}$ of $60 = 15$, leaving $45$.`, r`যাচাই: প্রথমবারের পরে দুধ $= 60$; দ্বিতীয়বারে $60$-এর $\frac{1}{4} = 15$ বেরোয়, থাকে $45$।`),
          ],
          answer: t('45 litres', '45 লিটার'),
        },
        {
          question: t(
            'A vessel holds 100 litres of pure milk. 4 litres are taken out and replaced with water; this is done 2 times in all. How much milk is left?',
            'একটা পাত্রে 100 লিটার খাঁটি দুধ আছে। 4 লিটার তুলে নিয়ে জল ভরা হল; মোট 2 বার এমন করা হল। কতটা দুধ রইল?',
          ),
          steps: [
            t(r`Factor $= 1 - \frac{4}{100} = 0.96$.`, r`গুণক $= 1 - \frac{4}{100} = 0.96$।`),
            t(r`Milk left $= 100 \times 0.96^2 = 100 \times 0.9216 = 92.16$ L.`, r`অবশিষ্ট দুধ $= 100 \times 0.96^2 = 100 \times 0.9216 = 92.16$ লিটার।`),
          ],
          answer: t('92.16 litres', '92.16 লিটার'),
        },
        {
          question: t(
            'Milk costs ₹40 per litre. In what ratio should a milkman mix water with milk so that the mixture is worth ₹32 per litre?',
            'দুধের দাম লিটারপ্রতি ₹40। গোয়ালা দুধে কোন অনুপাতে জল মেশালে মিশ্রণের দাম লিটারপ্রতি ₹32 হবে?',
          ),
          steps: [
            t(r`Water price $c = 0$, milk price $d = 40$, mean $m = 32$.`, r`জলের দাম $c = 0$, দুধের দাম $d = 40$, গড় $m = 32$।`),
            t(r`Water : milk $= (40 - 32) : (32 - 0) = 8 : 32 = 1 : 4$.`, r`জল : দুধ $= (40 - 32) : (32 - 0) = 8 : 32 = 1 : 4$।`),
          ],
          answer: t('1 : 4 (1 litre of water for every 4 litres of milk)', '1 : 4 (প্রতি 4 লিটার দুধে 1 লিটার জল)'),
        },
      ],
    },
  ],
  rules: [
    {
      label: t('Mean price of a mixture', 'মিশ্রণের গড় দাম'),
      latex: r`m = \dfrac{q_1 p_1 + q_2 p_2}{q_1 + q_2}`,
      explain: t('Total cost divided by total quantity (q = quantity, p = price).', 'মোট দাম ভাগ মোট পরিমাণ (q = পরিমাণ, p = দাম)।'),
    },
    {
      label: t('Rule of alligation', 'অ্যালিগেশনের নিয়ম'),
      latex: r`\dfrac{\text{Cheaper}}{\text{Dearer}} = \dfrac{d - m}{m - c}`,
      explain: t('Subtract crosswise: dearer minus mean goes with the cheaper item.', 'কোনাকুনি বিয়োগ করো: দামি বিয়োগ গড় যায় সস্তা জিনিসের ভাগে।'),
    },
    {
      label: t('Repeated replacement', 'বার বার প্রতিস্থাপন'),
      latex: r`\text{Left} = V\left(1 - \dfrac{x}{V}\right)^{n}`,
      explain: t('V litres in the vessel, x litres replaced each time, n times.', 'পাত্রে V লিটার, প্রতিবার x লিটার বদলানো হয়, মোট n বার।'),
    },
    {
      label: t('Adding water', 'জল মেশানো'),
      latex: r`\text{Water added} = \text{New water} - \text{Old water}`,
      explain: t('Milk stays fixed; find the new water from the new ratio.', 'দুধ একই থাকে; নতুন অনুপাত থেকে নতুন জলের পরিমাণ বার করো।'),
    },
    {
      label: t('Water as a free item', 'বিনা দামের জল'),
      latex: r`\dfrac{\text{Water}}{\text{Milk}} = \dfrac{p - m}{m - 0}`,
      explain: t('p is the milk price and m the selling price of the mixture.', 'p হল দুধের দাম আর m হল মিশ্রণের দাম।'),
    },
  ],
  tips: [
    t('The mean price must lie between the two prices. If it does not, recheck.', 'গড় দাম দুটো দামের মাঝে থাকতেই হবে। না থাকলে আবার মিলিয়ে দেখো।'),
    t('In alligation, (dearer − mean) belongs to the cheaper item. Do not swap the sides.', 'অ্যালিগেশনে (দামি − গড়) যায় সস্তা জিনিসের দিকে। দিক উল্টে ফেলো না।'),
    t('When only water is added, the amount of milk stays the same.', 'শুধু জল মেশালে দুধের পরিমাণ একই থাকে।'),
    t('For repeated replacement, multiply by the factor again each round; do not subtract x litres of milk every time.', 'বার বার প্রতিস্থাপনে প্রতিবার গুণকটা দিয়ে গুণ করো; প্রতিবার x লিটার দুধ বিয়োগ কোরো না।'),
    t('Simplify the ratio at the end, e.g. 8 : 30 = 4 : 15.', 'শেষে অনুপাতটা লঘিষ্ঠ আকারে আনো, যেমন 8 : 30 = 4 : 15।'),
  ],
};
