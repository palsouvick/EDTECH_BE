'use strict';

// Question patterns: Mixture & Alligation. Format: see ../validate.js header.
const r = String.raw;
const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'quant',
  topic: 'mixture_alligation',
  patterns: [
    {
      key: 'mixture_price',
      emoji: '⚖️',
      name: t('Price of the mixture (weighted average)', 'মিশ্রণের দাম (ভারযুক্ত গড়)'),
      difficulty: 'beginner',
      practiceLevels: ['beginner'],
      typicalWording: t('“x kg at ₹a per kg is mixed with y kg at ₹b per kg. What is the price per kg of the mixture?”', '“₹a প্রতি kg দরে x kg-এর সঙ্গে ₹b প্রতি kg দরে y kg মেশানো হল। মিশ্রণের প্রতি kg দাম কত?”'),
      formula: t(r`Mixture price $=\dfrac{Q_1P_1+Q_2P_2}{Q_1+Q_2}$ (total cost $\div$ total quantity).`, r`মিশ্রণের দর $=\dfrac{Q_1P_1+Q_2P_2}{Q_1+Q_2}$ (মোট দাম $\div$ মোট পরিমাণ)।`),
      shortcut: t('Start from the cheaper price and add the gap weighted by the dearer share: price = cheap + (dear − cheap) × dear quantity ÷ total quantity.', 'সস্তা দর থেকে শুরু করে দামি অংশের ওজনে ব্যবধান যোগ করো: দর = সস্তা + (দামি − সস্তা) × দামি পরিমাণ ÷ মোট পরিমাণ।'),
      trap: t('Do not take the simple average of the two prices — the quantities differ, so the answer leans towards the price of the bigger quantity.', 'দুটি দরের সাধারণ গড় নিও না — পরিমাণ আলাদা, তাই উত্তর বড় পরিমাণের দরের দিকে ঝুঁকবে।'),
      spot: t(
        'The **quantities and prices** of two items are given, and you must find the price per kg (or per litre) of the mixture.',
        'দুটি জিনিসের **পরিমাণ ও দাম** দেওয়া থাকে, আর মিশ্রণের প্রতি kg (বা প্রতি লিটার) দাম বের করতে হয়।',
      ),
      method: [
        t('Find the cost of each part: quantity × price.', 'প্রতিটি অংশের দাম বের করো: পরিমাণ × দর।'),
        t('Add the costs and add the quantities.', 'দামগুলো যোগ করো, পরিমাণগুলোও যোগ করো।'),
        t('Mixture price = total cost ÷ total quantity.', 'মিশ্রণের দর = মোট দাম ÷ মোট পরিমাণ।'),
      ],
      example: {
        question: t(
          '20 kg of rice at ₹40 per kg is mixed with 30 kg of rice at ₹50 per kg. What is the price per kg of the mixture?',
          '₹40 প্রতি kg দরের 20 kg চালের সঙ্গে ₹50 প্রতি kg দরের 30 kg চাল মেশানো হল। মিশ্রণের প্রতি kg দাম কত?',
        ),
        steps: [
          t(r`Costs: $20 \times 40 = 800$ and $30 \times 50 = 1500$ rupees.`, r`দাম: $20 \times 40 = 800$ টাকা ও $30 \times 50 = 1500$ টাকা।`),
          t(r`Total cost $= 2300$, total quantity $= 50$ kg.`, r`মোট দাম $= 2300$ টাকা, মোট পরিমাণ $= 50$ kg।`),
          t(r`Price $= 2300 \div 50 = 46$ rupees per kg.`, r`দর $= 2300 \div 50 = 46$ টাকা প্রতি kg।`),
        ],
        answer: t('₹46 per kg', 'প্রতি kg ₹46'),
      },
      tryIt: {
        question: t(
          '15 litres of oil at ₹60 per litre is mixed with 25 litres of oil at ₹80 per litre. Find the price (in ₹) per litre of the mixture.',
          '₹60 প্রতি লিটার দরের 15 লিটার তেলের সঙ্গে ₹80 প্রতি লিটার দরের 25 লিটার তেল মেশানো হল। মিশ্রণের প্রতি লিটারের দাম (₹-এ) কত?',
        ),
        options: [t('70', '70'), t('72.5', '72.5'), t('67.5', '67.5'), t('140', '140')],
        correct: 1,
        explanation: [
          t(r`Total cost $= 15 \times 60 + 25 \times 80 = 900 + 2000 = 2900$ rupees.`, r`মোট দাম $= 15 \times 60 + 25 \times 80 = 900 + 2000 = 2900$ টাকা।`),
          t(r`Total quantity $= 40$ L, so price $= 2900 \div 40 = 72.5$ rupees per litre. (70 is the simple average, wrong because the quantities differ.)`, r`মোট পরিমাণ $= 40$ লিটার, তাই দর $= 2900 \div 40 = 72.5$ টাকা প্রতি লিটার। (70 হল সাধারণ গড়, পরিমাণ আলাদা বলে তা ভুল।)`),
        ],
      },
    },
    {
      key: 'alligation_ratio',
      emoji: '✖️',
      name: t('Ratio to mix two kinds (alligation rule)', 'দুই রকম জিনিস কোন অনুপাতে মেশাবে (অ্যালিগেশন)'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“In what ratio must the cheaper be mixed with the dearer so that the mixture costs ₹m per kg?”', '“সস্তাটির সঙ্গে দামিটি কোন অনুপাতে মেশালে মিশ্রণের দাম প্রতি kg ₹m হবে?”'),
      formula: t(r`Cheap : Dear $=(d-m):(m-c)$, where $c$ = cheap price, $d$ = dear price, $m$ = mean (mixture) price.`, r`সস্তা : দামি $=(d-m):(m-c)$, যেখানে $c$ = সস্তা দর, $d$ = দামি দর, $m$ = গড় (মিশ্রণের) দর।`),
      shortcut: t('Draw the alligation cross: write c and d on top, m in the middle, and subtract diagonally — the difference written under each price is the quantity of the OTHER ingredient.', 'অ্যালিগেশনের আড়াআড়ি চিত্র আঁকো: উপরে c ও d, মাঝে m লিখে কোণাকুণি বিয়োগ করো — প্রতিটি দরের নিচে লেখা পার্থক্যটি হল অন্য উপাদানের পরিমাণ।'),
      trap: t('The differences are taken crosswise: the quantity of the cheap ingredient pairs with (d − m), not with (m − c). Reversing them flips the ratio.', 'পার্থক্যগুলো আড়াআড়ি নেওয়া হয়: সস্তা উপাদানের পরিমাণ (d − m)-এর সঙ্গে যায়, (m − c)-এর সঙ্গে নয়। উল্টে দিলে অনুপাত উল্টে যায়।'),
      spot: t(
        'Two prices (cheap and dear) and the **mixture price** are given; the question asks **in what ratio** they must be mixed.',
        'দুটি দর (সস্তা ও দামি) আর **মিশ্রণের দর** দেওয়া থাকে; জানতে চাওয়া হয় **কোন অনুপাতে** মেশাতে হবে।',
      ),
      method: [
        t('Write cheap price, dear price and mean (mixture) price.', 'সস্তা দর, দামি দর আর গড় (মিশ্রণের) দর লেখো।'),
        t('Cheap : Dear = (Dear − Mean) : (Mean − Cheap).', 'সস্তা : দামি = (দামি − গড়) : (গড় − সস্তা)।'),
        t('Simplify the ratio.', 'অনুপাতটি সরল করো।'),
      ],
      example: {
        question: t(
          'In what ratio must rice at ₹30 per kg be mixed with rice at ₹45 per kg so that the mixture costs ₹36 per kg?',
          '₹30 প্রতি kg দরের চালের সঙ্গে ₹45 প্রতি kg দরের চাল কোন অনুপাতে মেশালে মিশ্রণের দাম ₹36 প্রতি kg হবে?',
        ),
        steps: [
          t('Cheap = 30, Dear = 45, Mean = 36.', 'সস্তা = 30, দামি = 45, গড় = 36।'),
          t(r`Cheap : Dear $= (45 - 36) : (36 - 30) = 9 : 6$.`, r`সস্তা : দামি $= (45 - 36) : (36 - 30) = 9 : 6$।`),
          t(r`Simplify: $9 : 6 = 3 : 2$. Check: $\frac{3 \times 30 + 2 \times 45}{5} = \frac{180}{5} = 36$.`, r`সরল করে: $9 : 6 = 3 : 2$। যাচাই: $\frac{3 \times 30 + 2 \times 45}{5} = \frac{180}{5} = 36$।`),
        ],
        answer: t('3 : 2', '3 : 2 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'In what ratio should tea costing ₹120 per kg be mixed with tea costing ₹180 per kg to get a mixture worth ₹140 per kg?',
          '₹120 প্রতি kg দামের চা আর ₹180 প্রতি kg দামের চা কোন অনুপাতে মেশালে মিশ্রণের দাম ₹140 প্রতি kg হবে?',
        ),
        options: [t('1 : 2', '1 : 2'), t('2 : 1', '2 : 1'), t('2 : 3', '2 : 3'), t('1 : 1', '1 : 1')],
        correct: 1,
        explanation: [
          t(r`Cheap : Dear $= (180 - 140) : (140 - 120) = 40 : 20 = 2 : 1$.`, r`সস্তা : দামি $= (180 - 140) : (140 - 120) = 40 : 20 = 2 : 1$।`),
          t('The mean 140 is closer to 120, so there must be more of the cheap tea. (1 : 2 is the reversed, wrong answer.)', 'গড় 140, 120-এর কাছাকাছি, তাই সস্তা চা বেশি লাগবে। (1 : 2 হল উল্টো, ভুল উত্তর।)'),
        ],
      },
    },
    {
      key: 'add_to_change_ratio',
      emoji: '🥛',
      name: t('Add water to change the milk : water ratio', 'জল মিশিয়ে দুধ : জলের অনুপাত বদলানো'),
      difficulty: 'intermediate',
      practiceLevels: ['intermediate'],
      typicalWording: t('“A mixture of V litres has milk : water = a : b. How much water must be added to make the ratio c : d?”', '“V লিটার মিশ্রণে দুধ : জল = a : b। কত লিটার জল মেশালে অনুপাত c : d হবে?”'),
      formula: t(r`The ingredient NOT added stays fixed: new amount of the added one $=$ fixed amount $\times \dfrac{\text{its new ratio part}}{\text{fixed one's ratio part}}$; added $=$ new $-$ old.`, r`যেটা মেশানো হচ্ছে না তা স্থির থাকে: মেশানো জিনিসের নতুন পরিমাণ $=$ স্থির পরিমাণ $\times \dfrac{\text{তার নতুন অনুপাতের অংশ}}{\text{স্থিরটির অনুপাতের অংশ}}$; মেশানো $=$ নতুন $-$ পুরোনো।`),
      shortcut: t('Scale the new ratio so the unchanged ingredient matches its actual litres, then read off the other ingredient directly.', 'নতুন অনুপাতটিকে এমনভাবে বাড়াও যাতে অপরিবর্তিত উপাদানটি তার আসল লিটারের সঙ্গে মেলে, তারপর অন্য উপাদানটি সরাসরি পড়ে নাও।'),
      trap: t('The answer is the water ADDED (new total water − old water), not the new total water itself.', 'উত্তর হল মেশানো জল (নতুন মোট জল − পুরোনো জল), নতুন মোট জল নিজে নয়।'),
      spot: t(
        'A mixture of given quantity has milk : water in one ratio; **how much water (or milk) must be added** to make a new ratio.',
        'নির্দিষ্ট পরিমাণ মিশ্রণে দুধ : জল একটি অনুপাতে আছে; নতুন অনুপাত পেতে **কতটা জল (বা দুধ) মেশাতে হবে**।',
      ),
      method: [
        t('Find the actual milk and water from the ratio.', 'অনুপাত থেকে আসল দুধ ও জলের পরিমাণ বের করো।'),
        t('The thing NOT added stays the same (here, milk).', 'যেটা মেশানো হচ্ছে না, সেটা একই থাকে (এখানে দুধ)।'),
        t('Use the new ratio to find the new water; added water = new − old.', 'নতুন অনুপাত দিয়ে নতুন জল বের করো; মেশানো জল = নতুন − পুরোনো।'),
      ],
      example: {
        question: t(
          'A 40-litre mixture has milk and water in the ratio 3 : 1. How much water must be added to make the ratio 3 : 2?',
          '40 লিটার মিশ্রণে দুধ ও জলের অনুপাত 3 : 1। কত লিটার জল মেশালে অনুপাত 3 : 2 হবে?',
        ),
        steps: [
          t(r`Milk $= \frac{3}{4} \times 40 = 30$ L, water $= 10$ L.`, r`দুধ $= \frac{3}{4} \times 40 = 30$ লিটার, জল $= 10$ লিটার।`),
          t(r`Milk stays 30 L. New ratio 3 : 2 means water $= \frac{2}{3} \times 30 = 20$ L.`, r`দুধ 30 লিটারই থাকবে। নতুন অনুপাত 3 : 2 মানে জল $= \frac{2}{3} \times 30 = 20$ লিটার।`),
          t(r`Water to add $= 20 - 10 = 10$ L.`, r`মেশাতে হবে $= 20 - 10 = 10$ লিটার জল।`),
        ],
        answer: t('10 litres', '10 লিটার'),
      },
      tryIt: {
        question: t(
          'A 60-litre mixture contains milk and water in the ratio 7 : 3. How many litres of water must be added to make the ratio 3 : 2?',
          '60 লিটার মিশ্রণে দুধ ও জলের অনুপাত 7 : 3। কত লিটার জল মেশালে অনুপাত 3 : 2 হবে?',
        ),
        options: [t('18', '18'), t('28', '28'), t('10', '10'), t('12', '12')],
        correct: 2,
        explanation: [
          t(r`Milk $= \frac{7}{10} \times 60 = 42$ L, water $= 18$ L.`, r`দুধ $= \frac{7}{10} \times 60 = 42$ লিটার, জল $= 18$ লিটার।`),
          t(r`New water $= \frac{2}{3} \times 42 = 28$ L.`, r`নতুন জল $= \frac{2}{3} \times 42 = 28$ লিটার।`),
          t(r`Water to add $= 28 - 18 = 10$ L. (28 is the new total water, not the amount added.)`, r`মেশাতে হবে $= 28 - 18 = 10$ লিটার। (28 হল মোট নতুন জল, মেশানো জল নয়।)`),
        ],
      },
    },
    {
      key: 'repeated_replacement',
      emoji: '🔄',
      name: t('Take out and replace, again and again', 'বারবার তুলে নিয়ে প্রতিস্থাপন'),
      difficulty: 'advanced',
      practiceLevels: ['advanced'],
      typicalWording: t('“x litres are drawn out and replaced with water. The process is repeated n times. How much milk is left?”', '“x লিটার তুলে নিয়ে জল ঢালা হল। কাজটি n বার করা হল। কত লিটার দুধ বাকি?”'),
      formula: t(r`Pure liquid left $= V\left(1 - \dfrac{x}{V}\right)^n$, where $V$ = total volume, $x$ = amount replaced each time, $n$ = number of operations.`, r`অবশিষ্ট খাঁটি তরল $= V\left(1 - \dfrac{x}{V}\right)^n$, যেখানে $V$ = মোট আয়তন, $x$ = প্রতিবার প্রতিস্থাপিত পরিমাণ, $n$ = কতবার করা হল।`),
      shortcut: t('Compute the surviving fraction once, (1 − x/V), and raise it to the power n in one step instead of tracking the mixture round by round.', 'একবার টিকে থাকা ভগ্নাংশ (1 − x/V) বের করে সরাসরি n ঘাতে তোলো, প্রতিবার মিশ্রণ ধরে ধরে হিসাব করার বদলে।'),
      trap: t('Never subtract x litres of milk per round: from the second round on, the liquid drawn out already contains water, so less milk leaves each time.', 'প্রতিবার x লিটার দুধ বিয়োগ করো না: দ্বিতীয়বার থেকে তোলা তরলে জলও থাকে, তাই প্রতিবার কম দুধ বেরোয়।'),
      spot: t(
        'Some litres are **taken out and replaced with water**, and this is done **two or more times**.',
        'কিছু লিটার **তুলে নিয়ে সমপরিমাণ জল ঢালা হয়**, আর এটা **দুই বা তার বেশি বার** করা হয়।',
      ),
      method: [
        t(r`Each time, the milk left is multiplied by $\left(1 - \frac{\text{taken out}}{\text{total}}\right)$.`, r`প্রতিবার অবশিষ্ট দুধকে $\left(1 - \frac{x}{V}\right)$ দিয়ে গুণ হয় ($x$ = তুলে নেওয়া পরিমাণ, $V$ = মোট পরিমাণ)।`),
        t(r`After $n$ times: milk left $= V \left(1 - \frac{x}{V}\right)^n$.`, r`$n$ বার পর অবশিষ্ট দুধ $= V \left(1 - \frac{x}{V}\right)^n$।`),
        t('Do not just subtract the litres taken out: some of the later liquid is already water.', 'শুধু তুলে নেওয়া লিটার বিয়োগ করো না: পরের বার তোলা তরলের কিছুটা তো জল।'),
      ],
      example: {
        question: t(
          'A can holds 80 litres of pure milk. 8 litres are taken out and replaced with water. This is done once more. How much milk is now in the can?',
          'একটি পাত্রে 80 লিটার খাঁটি দুধ আছে। 8 লিটার তুলে নিয়ে সমপরিমাণ জল ঢালা হল। এই কাজটি আরও একবার করা হল। এখন পাত্রে কত লিটার দুধ আছে?',
        ),
        steps: [
          t(r`Each time milk is multiplied by $1 - \frac{8}{80} = \frac{9}{10}$.`, r`প্রতিবার দুধ $1 - \frac{8}{80} = \frac{9}{10}$ দিয়ে গুণ হয়।`),
          t(r`Done 2 times: $80 \times \frac{9}{10} \times \frac{9}{10} = 80 \times \frac{81}{100}$.`, r`2 বার করা হয়েছে: $80 \times \frac{9}{10} \times \frac{9}{10} = 80 \times \frac{81}{100}$।`),
          t(r`$= 64.8$ litres of milk.`, r`$= 64.8$ লিটার দুধ।`),
        ],
        answer: t('64.8 litres', '64.8 লিটার'),
      },
      tryIt: {
        question: t(
          'A vessel contains 60 litres of milk. 12 litres are drawn out and replaced with water, and the process is repeated once more. How many litres of milk are left?',
          'একটি পাত্রে 60 লিটার দুধ আছে। 12 লিটার তুলে নিয়ে জল ঢালা হল, এবং আরও একবার একই কাজ করা হল। পাত্রে কত লিটার দুধ বাকি আছে?',
        ),
        options: [t('36', '36'), t('38.4', '38.4'), t('48', '48'), t('21.6', '21.6')],
        correct: 1,
        explanation: [
          t(r`Each time milk is multiplied by $1 - \frac{12}{60} = \frac{4}{5}$.`, r`প্রতিবার দুধ $1 - \frac{12}{60} = \frac{4}{5}$ দিয়ে গুণ হয়।`),
          t(r`Milk left $= 60 \times \frac{4}{5} \times \frac{4}{5} = 60 \times \frac{16}{25} = 38.4$ L.`, r`অবশিষ্ট দুধ $= 60 \times \frac{4}{5} \times \frac{4}{5} = 60 \times \frac{16}{25} = 38.4$ লিটার।`),
          t('(36 comes from just subtracting 24 L, which is wrong; 21.6 L is the water.)', '(শুধু 24 লিটার বিয়োগ করলে ভুল উত্তর 36 আসে; 21.6 লিটার হল জল।)'),
        ],
      },
    },
    {
      key: 'mixing_two_mixtures',
      emoji: '🧪',
      name: t('Mixing two mixtures to get a new ratio', 'দুটি মিশ্রণ মিশিয়ে নতুন অনুপাত'),
      difficulty: 'intermediate',
      typicalWording: t('“Vessel A has milk : water = a : b and vessel B has c : d. In what ratio should they be mixed to get milk : water = e : f?”', '“পাত্র A-তে দুধ : জল = a : b এবং পাত্র B-তে c : d। কোন অনুপাতে মেশালে দুধ : জল = e : f হবে?”'),
      formula: t(r`Convert each ratio to a milk fraction $f=\dfrac{\text{milk part}}{\text{milk part}+\text{water part}}$, then A : B $=(f_{\text{target}}-f_B):(f_A-f_{\text{target}})$ by alligation.`, r`প্রতিটি অনুপাতকে দুধের ভগ্নাংশে বদলাও $f=\dfrac{\text{দুধের অংশ}}{\text{দুধের অংশ}+\text{জলের অংশ}}$, তারপর অ্যালিগেশনে A : B $=(f_{\text{লক্ষ্য}}-f_B):(f_A-f_{\text{লক্ষ্য}})$।`),
      shortcut: t('Work with the milk fractions as decimals when they are friendly (0.75, 0.5, 0.4); the cross differences then come out in one line.', 'দুধের ভগ্নাংশ সহজ দশমিক হলে (0.75, 0.5, 0.4) দশমিকেই কাজ করো; আড়াআড়ি পার্থক্য এক লাইনে বেরিয়ে আসে।'),
      trap: t('Do not apply alligation to the ratio parts (3 : 1, 1 : 1) directly — alligation needs the fraction (or %) of ONE ingredient in each mixture.', 'অনুপাতের অংশগুলোর (3 : 1, 1 : 1) উপর সরাসরি অ্যালিগেশন করো না — অ্যালিগেশনে প্রতিটি মিশ্রণে একটি উপাদানের ভগ্নাংশ (বা %) লাগে।'),
      spot: t(
        'Two vessels each have milk and water in **different ratios**, and they are mixed to get a **third ratio**. Find the ratio in which they are mixed.',
        'দুটি পাত্রে দুধ ও জল **আলাদা অনুপাতে** আছে; সেগুলো মিশিয়ে **তৃতীয় একটি অনুপাত** পেতে হবে। কোন অনুপাতে মেশাতে হবে বের করো।',
      ),
      method: [
        t('Turn each ratio into the fraction of milk in it (milk ÷ total).', 'প্রতিটি অনুপাত থেকে দুধের ভগ্নাংশ বের করো (দুধ ÷ মোট)।'),
        t('Apply alligation on these fractions: first : second = (second − mean) : (mean − first), taking the differences as positive.', 'এই ভগ্নাংশগুলোর উপর অ্যালিগেশন করো: প্রথম : দ্বিতীয় = (দ্বিতীয় − গড়) : (গড় − প্রথম), পার্থক্যগুলো ধনাত্মক ধরে।'),
        t('Simplify the ratio.', 'অনুপাতটি সরল করো।'),
      ],
      example: {
        question: t(
          'Vessel A has milk and water in the ratio 3 : 1, and vessel B has them in the ratio 1 : 1. In what ratio should A and B be mixed to get milk and water in the ratio 2 : 1?',
          'পাত্র A-তে দুধ ও জলের অনুপাত 3 : 1, আর পাত্র B-তে 1 : 1। A ও B কোন অনুপাতে মেশালে দুধ ও জলের অনুপাত 2 : 1 হবে?',
        ),
        steps: [
          t(r`Milk fractions: A $= \frac{3}{4}$, B $= \frac{1}{2}$, wanted mixture $= \frac{2}{3}$.`, r`দুধের ভগ্নাংশ: A $= \frac{3}{4}$, B $= \frac{1}{2}$, চাই $= \frac{2}{3}$।`),
          t(r`A : B $= \left(\frac{2}{3} - \frac{1}{2}\right) : \left(\frac{3}{4} - \frac{2}{3}\right) = \frac{1}{6} : \frac{1}{12}$.`, r`তাই A : B $= \left(\frac{2}{3} - \frac{1}{2}\right) : \left(\frac{3}{4} - \frac{2}{3}\right) = \frac{1}{6} : \frac{1}{12}$।`),
          t(r`Multiply both by 12: A : B $= 2 : 1$.`, r`দুদিকে 12 দিয়ে গুণ করে: A : B $= 2 : 1$।`),
        ],
        answer: t('2 : 1', '2 : 1 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'Vessel P contains milk and water in the ratio 7 : 3, and vessel Q in the ratio 2 : 3. In what ratio should P and Q be mixed so that the new mixture has milk and water in equal amounts?',
          'পাত্র P-তে দুধ ও জলের অনুপাত 7 : 3 এবং পাত্র Q-তে 2 : 3। P ও Q কোন অনুপাতে মেশালে নতুন মিশ্রণে দুধ ও জল সমান সমান থাকবে?',
        ),
        options: [t('2 : 1', '2 : 1'), t('1 : 1', '1 : 1'), t('1 : 2', '1 : 2'), t('7 : 2', '7 : 2')],
        correct: 2,
        explanation: [
          t(r`Milk fractions: P $= \frac{7}{10} = 0.7$, Q $= \frac{2}{5} = 0.4$, wanted $= \frac{1}{2} = 0.5$.`, r`দুধের ভগ্নাংশ: P $= \frac{7}{10} = 0.7$, Q $= \frac{2}{5} = 0.4$, চাই $= \frac{1}{2} = 0.5$।`),
          t(r`P : Q $= (0.5 - 0.4) : (0.7 - 0.5) = 0.1 : 0.2 = 1 : 2$.`, r`তাই P : Q $= (0.5 - 0.4) : (0.7 - 0.5) = 0.1 : 0.2 = 1 : 2$।`),
          t('Check: 1 L of P and 2 L of Q give milk 0.7 + 0.8 = 1.5 L out of 3 L, exactly half.', 'যাচাই: P থেকে 1 লিটার ও Q থেকে 2 লিটার নিলে দুধ = 0.7 + 0.8 = 1.5 লিটার, মোট 3 লিটারের ঠিক অর্ধেক।'),
        ],
      },
    },
    {
      key: 'dilution_target_concentration',
      emoji: '💧',
      name: t('Add water to reach a target strength (%)', 'লক্ষ্য ঘনত্ব (%) পেতে জল মেশানো'),
      difficulty: 'beginner',
      typicalWording: t('“A solution is p% strong. How much water must be added to make it q% strong?”', '“একটি দ্রবণ p% ঘন। এটিকে q% ঘন করতে কত জল মেশাতে হবে?”'),
      formula: t(r`The pure ingredient stays fixed: new total $=\dfrac{\text{pure amount}}{\text{target fraction}}$; water to add $=$ new total $-$ old total.`, r`খাঁটি উপাদান স্থির থাকে: নতুন মোট $=\dfrac{\text{খাঁটি পরিমাণ}}{\text{লক্ষ্য ভগ্নাংশ}}$; মেশানো জল $=$ নতুন মোট $-$ পুরোনো মোট।`),
      shortcut: t('Use alligation with water as a 0% ingredient: solution : water = target% : (original% − target%), then scale to the given litres.', 'জলকে 0% উপাদান ধরে অ্যালিগেশন করো: দ্রবণ : জল = লক্ষ্য% : (মূল% − লক্ষ্য%), তারপর দেওয়া লিটারে মাপো।'),
      trap: t('Adding water changes the total volume, so do not compute the target % on the OLD total; the pure amount is the only fixed quantity.', 'জল মেশালে মোট আয়তন বদলায়, তাই পুরোনো মোটের উপর লক্ষ্য % হিসাব করো না; খাঁটি পরিমাণই একমাত্র স্থির জিনিস।'),
      spot: t(
        'A solution has a **percentage strength** (alcohol, acid, milk %) and water must be added until it reaches a **lower target %**.',
        'একটি দ্রবণের **শতকরা ঘনত্ব** (অ্যালকোহল, অ্যাসিড, দুধ %) দেওয়া থাকে; জল মিশিয়ে **কম লক্ষ্য %**-এ পৌঁছাতে হয়।',
      ),
      method: [
        t('Find the pure ingredient: volume × strength %. It does not change.', 'খাঁটি উপাদান বের করো: আয়তন × ঘনত্ব %। এটি বদলায় না।'),
        t('New total volume = pure amount ÷ target strength (as a fraction).', 'নতুন মোট আয়তন = খাঁটি পরিমাণ ÷ লক্ষ্য ঘনত্ব (ভগ্নাংশে)।'),
        t('Water to add = new total − old total.', 'মেশানো জল = নতুন মোট − পুরোনো মোট।'),
      ],
      example: {
        question: t(
          'A container has 20 litres of a 60% alcohol solution. How much water must be added to make it a 40% alcohol solution?',
          'একটি পাত্রে 20 লিটার 60% অ্যালকোহল দ্রবণ আছে। এটিকে 40% অ্যালকোহল দ্রবণ করতে কত লিটার জল মেশাতে হবে?',
        ),
        steps: [
          t(r`Alcohol $= 60\% \text{ of } 20 = 12$ L. This stays the same.`, r`অ্যালকোহল $= 20$-এর $60\% = 12$ লিটার। এটি একই থাকবে।`),
          t(r`New total $= 12 \div 0.40 = 30$ L.`, r`নতুন মোট $= 12 \div 0.40 = 30$ লিটার।`),
          t(r`Water to add $= 30 - 20 = 10$ L.`, r`মেশাতে হবে $= 30 - 20 = 10$ লিটার জল।`),
        ],
        answer: t('10 litres', '10 লিটার'),
      },
      tryIt: {
        question: t(
          '25 litres of an 80% acid solution is to be diluted to a 50% acid solution. How many litres of water should be added?',
          '25 লিটার 80% অ্যাসিড দ্রবণকে পাতলা করে 50% অ্যাসিড দ্রবণ করতে হবে। কত লিটার জল মেশাতে হবে?',
        ),
        options: [t('10', '10'), t('20', '20'), t('15', '15'), t('12.5', '12.5')],
        correct: 2,
        explanation: [
          t(r`Acid $= 80\% \text{ of } 25 = 20$ L, and it does not change.`, r`অ্যাসিড $= 25$-এর $80\% = 20$ লিটার, আর এটি বদলায় না।`),
          t(r`New total $= 20 \div 0.50 = 40$ L, so water to add $= 40 - 25 = 15$ L.`, r`নতুন মোট $= 20 \div 0.50 = 40$ লিটার, তাই মেশানো জল $= 40 - 25 = 15$ লিটার।`),
        ],
      },
    },
    {
      key: 'find_quantity_one_ingredient',
      emoji: '🔍',
      name: t('Find how much of one ingredient is used', 'একটি উপাদান কতটা লেগেছে বের করা'),
      difficulty: 'beginner',
      typicalWording: t('“The two kinds are mixed to get T kg of mixture at ₹m per kg. How many kg of the cheaper (or dearer) kind is used?”', '“দুই রকম মিশিয়ে প্রতি kg ₹m দরে মোট T kg মিশ্রণ তৈরি হল। সস্তা (বা দামি) রকমের কত kg লেগেছে?”'),
      formula: t(r`First get the mixing ratio by alligation, $a:b$; then quantity of one kind $=\dfrac{\text{its ratio part}}{a+b}\times\text{total quantity}$.`, r`আগে অ্যালিগেশনে মেশানোর অনুপাত $a:b$ বের করো; তারপর একটি রকমের পরিমাণ $=\dfrac{\text{তার অনুপাতের অংশ}}{a+b}\times\text{মোট পরিমাণ}$।`),
      shortcut: t('The ingredient whose price is FARTHER from the mean is used LESS — use this to sanity-check which part of the ratio belongs to which ingredient before scaling.', 'যে উপাদানের দর গড় থেকে বেশি দূরে, সেটি কম লাগে — মাপার আগে এই যাচাই দিয়ে দেখো অনুপাতের কোন অংশ কার।'),
      trap: t('The alligation parts belong crosswise: the part written under the dear price is the quantity of the CHEAP ingredient. Swapping them gives the other ingredient\'s quantity.', 'অ্যালিগেশনের অংশগুলো আড়াআড়ি যায়: দামি দরের নিচে লেখা অংশটি সস্তা উপাদানের পরিমাণ। বদলে দিলে অন্য উপাদানের পরিমাণ পাবে।'),
      spot: t(
        'Two prices, the **mixture price** and the **total quantity** of mixture are given; the question asks for the **actual kg/litre of one** of the two ingredients.',
        'দুটি দর, **মিশ্রণের দর** আর মিশ্রণের **মোট পরিমাণ** দেওয়া থাকে; জানতে চাওয়া হয় **একটি উপাদানের আসল kg/লিটার**।',
      ),
      method: [
        t('Use alligation on the two prices and the mean price to get the mixing ratio.', 'দুটি দর ও গড় দরের উপর অ্যালিগেশন করে মেশানোর অনুপাত বের করো।'),
        t('Add the ratio parts to get the total number of parts.', 'অনুপাতের অংশগুলো যোগ করে মোট অংশ পাও।'),
        t('Quantity of the asked ingredient = (its part ÷ total parts) × total quantity.', 'চাওয়া উপাদানের পরিমাণ = (তার অংশ ÷ মোট অংশ) × মোট পরিমাণ।'),
      ],
      example: {
        question: t(
          'Rice at ₹25 per kg is mixed with rice at ₹40 per kg to make 75 kg of a mixture worth ₹32 per kg. How many kg of the cheaper rice is used?',
          '₹25 প্রতি kg দরের চালের সঙ্গে ₹40 প্রতি kg দরের চাল মিশিয়ে ₹32 প্রতি kg দরের 75 kg মিশ্রণ তৈরি হল। সস্তা চাল কত kg লেগেছে?',
        ),
        steps: [
          t(r`Alligation: Cheap : Dear $= (40 - 32) : (32 - 25) = 8 : 7$.`, r`অ্যালিগেশন: সস্তা : দামি $= (40 - 32) : (32 - 25) = 8 : 7$।`),
          t(r`Total parts $= 8 + 7 = 15$, so each part $= 75 \div 15 = 5$ kg.`, r`মোট অংশ $= 8 + 7 = 15$, তাই প্রতি অংশ $= 75 \div 15 = 5$ kg।`),
          t(r`Cheaper rice $= 8 \times 5 = 40$ kg.`, r`সস্তা চাল $= 8 \times 5 = 40$ kg।`),
        ],
        answer: t('40 kg', '40 kg চাল'),
      },
      tryIt: {
        question: t(
          'Tea at ₹100 per kg is mixed with tea at ₹150 per kg to prepare 50 kg of a mixture worth ₹120 per kg. How many kg of the cheaper tea is used?',
          '₹100 প্রতি kg দামের চার সঙ্গে ₹150 প্রতি kg দামের চা মিশিয়ে ₹120 প্রতি kg দামের 50 kg মিশ্রণ তৈরি হল। সস্তা চা কত kg লেগেছে?',
        ),
        options: [t('20', '20'), t('30', '30'), t('25', '25'), t('35', '35')],
        correct: 1,
        explanation: [
          t(r`Cheap : Dear $= (150 - 120) : (120 - 100) = 30 : 20 = 3 : 2$.`, r`সস্তা : দামি $= (150 - 120) : (120 - 100) = 30 : 20 = 3 : 2$।`),
          t(r`Cheaper tea $= \frac{3}{5} \times 50 = 30$ kg. (20 kg is the quantity of the dearer tea.)`, r`সস্তা চা $= \frac{3}{5} \times 50 = 30$ kg। (20 kg হল দামি চার পরিমাণ।)`),
        ],
      },
    },
    {
      key: 'water_milk_profit',
      emoji: '💰',
      name: t('Water added to milk, sold at cost price: gain %', 'দুধে জল মিশিয়ে ক্রয়দরে বিক্রি: লাভ %'),
      difficulty: 'intermediate',
      typicalWording: t('“A milkman buys milk at ₹x per litre, adds water and sells the mixture at ₹x per litre. Find his gain %.”', '“একজন দুধওয়ালা প্রতি লিটার ₹x দরে দুধ কিনে জল মিশিয়ে মিশ্রণটি প্রতি লিটার ₹x দরেই বিক্রি করে। তার লাভ % কত?”'),
      formula: t(r`Gain $\% = \dfrac{\text{water added}}{\text{milk bought}} \times 100$ when the mixture is sold at the milk's cost price (water costs nothing).`, r`মিশ্রণ দুধের ক্রয়দরে বিক্রি হলে লাভ $\% = \dfrac{\text{মেশানো জল}}{\text{কেনা দুধ}} \times 100$ (জলের দাম শূন্য)।`),
      shortcut: t('Skip the money entirely: gain % is just the water as a percentage of the milk bought, because every litre of water is sold at the milk price for free.', 'টাকার হিসাব বাদ দাও: লাভ % হল কিনা দুধের উপর জলের শতকরা হার, কারণ প্রতি লিটার জল দুধের দামে বিনামূল্যে বিক্রি হয়।'),
      trap: t('Gain % is always calculated on the COST (the milk he actually paid for), not on the total mixture volume — dividing by the mixture gives a smaller, wrong %.', 'লাভ % সবসময় ক্রয়মূল্যের উপর (যে দুধের দাম সে সত্যিই দিয়েছে) হিসাব হয়, মোট মিশ্রণের আয়তনের উপর নয় — মিশ্রণ দিয়ে ভাগ করলে ছোট, ভুল % আসে।'),
      spot: t(
        'A seller buys a liquid, **adds free water**, and sells the whole mixture **at the same price he bought it**; the question asks his **gain %**.',
        'একজন বিক্রেতা একটি তরল কিনে **বিনামূল্যে জল মেশায়** আর পুরো মিশ্রণটি **কেনা দরেই** বিক্রি করে; জানতে চাওয়া হয় তার **লাভ %**।',
      ),
      method: [
        t('Cost price = litres of milk × price per litre (water costs nothing).', 'ক্রয়মূল্য = দুধের লিটার × প্রতি লিটার দাম (জলের দাম শূন্য)।'),
        t('Selling price = (milk + water) litres × the same price per litre.', 'বিক্রয়মূল্য = (দুধ + জল) লিটার × একই প্রতি লিটার দাম।'),
        t('Gain % = (SP − CP) ÷ CP × 100.', 'লাভ % = (বিক্রয়মূল্য − ক্রয়মূল্য) ÷ ক্রয়মূল্য × 100।'),
      ],
      example: {
        question: t(
          'A milkman buys 20 litres of milk at ₹30 per litre, adds 5 litres of water and sells the mixture at ₹30 per litre. What is his gain percent?',
          'একজন দুধওয়ালা ₹30 প্রতি লিটার দরে 20 লিটার দুধ কিনে 5 লিটার জল মেশাল এবং মিশ্রণটি ₹30 প্রতি লিটার দরেই বিক্রি করল। তার লাভের শতকরা হার কত?',
        ),
        steps: [
          t(r`Cost price $= 20 \times 30 = 600$ rupees (water is free).`, r`ক্রয়মূল্য $= 20 \times 30 = 600$ টাকা (জল বিনামূল্যে)।`),
          t(r`Selling price $= (20 + 5) \times 30 = 25 \times 30 = 750$ rupees.`, r`বিক্রয়মূল্য $= (20 + 5) \times 30 = 25 \times 30 = 750$ টাকা।`),
          t(r`Gain $\% = \frac{750 - 600}{600} \times 100 = 25\%$.`, r`লাভ $\% = \frac{750 - 600}{600} \times 100 = 25\%$।`),
        ],
        answer: t('25% gain', '25% লাভ'),
      },
      tryIt: {
        question: t(
          'A milkman buys 10 litres of milk at ₹50 per litre, mixes 2 litres of water in it and sells the mixture at ₹50 per litre. His gain percent is:',
          'একজন দুধওয়ালা ₹50 প্রতি লিটার দরে 10 লিটার দুধ কিনে তাতে 2 লিটার জল মেশাল এবং মিশ্রণটি ₹50 প্রতি লিটার দরেই বিক্রি করল। তার লাভের শতকরা হার:',
        ),
        options: [t('25%', '25%'), t('10%', '10%'), t('16.67%', '16.67%'), t('20%', '20%')],
        correct: 3,
        explanation: [
          t(r`Cost $= 10 \times 50 = 500$ rupees; selling price $= 12 \times 50 = 600$ rupees.`, r`ক্রয়মূল্য $= 10 \times 50 = 500$ টাকা; বিক্রয়মূল্য $= 12 \times 50 = 600$ টাকা।`),
          t(r`Gain $\% = \frac{100}{500} \times 100 = 20\%$ — the same as water $\div$ milk $= 2 \div 10$.`, r`লাভ $\% = \frac{100}{500} \times 100 = 20\%$ — জল $\div$ দুধ $= 2 \div 10$ হিসাবেও একই আসে।`),
        ],
      },
    },
    {
      key: 'single_replacement',
      emoji: '🥤',
      name: t('One draw-out and refill operation', 'একবার তুলে নিয়ে ভরা'),
      difficulty: 'intermediate',
      typicalWording: t('“From a vessel of pure liquid, x litres are drawn out and replaced with water (only once). Find the milk left / the new ratio.”', '“খাঁটি তরলের পাত্র থেকে x লিটার তুলে নিয়ে জল ঢালা হল (মাত্র একবার)। অবশিষ্ট দুধ / নতুন অনুপাত বের করো।”'),
      formula: t(r`After ONE operation: pure liquid left $= V\left(1 - \dfrac{x}{V}\right) = V - x$, and the added liquid in the vessel is exactly $x$ litres.`, r`একবার করার পর: অবশিষ্ট খাঁটি তরল $= V\left(1 - \dfrac{x}{V}\right) = V - x$, আর পাত্রে মেশানো তরল ঠিক $x$ লিটার।`),
      shortcut: t('For a single operation starting from a PURE liquid, the drawn-out liquid is all pure — so just subtract: pure left = V − x, no fraction work needed.', 'খাঁটি তরল থেকে একবারের ক্ষেত্রে তোলা তরল পুরোটাই খাঁটি — তাই সরাসরি বিয়োগ করো: অবশিষ্ট খাঁটি = V − x, ভগ্নাংশের হিসাব লাগে না।'),
      trap: t('The shortcut V − x works only for the FIRST operation on a pure liquid; if the vessel already holds a mixture, the drawn liquid carries both ingredients in the current ratio.', 'V − x শর্টকাট শুধু খাঁটি তরলের উপর প্রথমবারের ক্ষেত্রে চলে; পাত্রে আগে থেকেই মিশ্রণ থাকলে তোলা তরলে বর্তমান অনুপাতে দুটি উপাদানই থাকে।'),
      spot: t(
        'A vessel of a **pure** liquid has some litres **drawn out and replaced just once**; find what is left or the resulting ratio.',
        'খাঁটি তরলের পাত্র থেকে কিছু লিটার **মাত্র একবার তুলে নিয়ে প্রতিস্থাপন** করা হয়; কী বাকি থাকল বা নতুন অনুপাত বের করতে হয়।',
      ),
      method: [
        t('Note the total volume V and the amount x drawn out.', 'মোট আয়তন V ও তোলা পরিমাণ x লিখে নাও।'),
        t('The vessel starts pure, so the x litres drawn out are all the pure liquid.', 'পাত্র খাঁটি দিয়ে শুরু, তাই তোলা x লিটার পুরোটাই খাঁটি তরল।'),
        t('Pure left = V − x; the refill liquid present = x. Write the ratio if asked.', 'অবশিষ্ট খাঁটি = V − x; ভরা তরল = x। চাইলে অনুপাত লেখো।'),
      ],
      example: {
        question: t(
          'A vessel contains 50 litres of pure milk. 10 litres are drawn out and replaced with water. What is the ratio of milk to water in the vessel now?',
          'একটি পাত্রে 50 লিটার খাঁটি দুধ আছে। 10 লিটার তুলে নিয়ে জল ঢালা হল। এখন পাত্রে দুধ ও জলের অনুপাত কত?',
        ),
        steps: [
          t(r`The 10 litres drawn out are pure milk, so milk left $= 50 - 10 = 40$ L.`, r`তোলা 10 লিটার খাঁটি দুধ, তাই অবশিষ্ট দুধ $= 50 - 10 = 40$ লিটার।`),
          t(r`Water in the vessel $= 10$ L (the refill).`, r`পাত্রে জল $= 10$ লিটার (ভরা জল)।`),
          t(r`Milk : Water $= 40 : 10 = 4 : 1$.`, r`দুধ : জল $= 40 : 10 = 4 : 1$।`),
        ],
        answer: t('4 : 1', '4 : 1 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'A container holds 40 litres of pure spirit. 8 litres are drawn out and replaced with water. How many litres of spirit are left in the container?',
          'একটি পাত্রে 40 লিটার খাঁটি স্পিরিট আছে। 8 লিটার তুলে নিয়ে জল ঢালা হল। পাত্রে কত লিটার স্পিরিট বাকি আছে?',
        ),
        options: [t('30', '30'), t('36', '36'), t('32', '32'), t('28', '28')],
        correct: 2,
        explanation: [
          t(r`The container starts pure, so all 8 litres drawn out are spirit.`, r`পাত্র খাঁটি দিয়ে শুরু, তাই তোলা 8 লিটার পুরোটাই স্পিরিট।`),
          t(r`Spirit left $= 40 - 8 = 32$ L. (Equivalently, $40 \times (1 - \frac{8}{40}) = 32$.)`, r`অবশিষ্ট স্পিরিট $= 40 - 8 = 32$ লিটার। (অন্যভাবে, $40 \times (1 - \frac{8}{40}) = 32$।)`),
        ],
      },
    },
    {
      key: 'add_pure_or_evaporate',
      emoji: '🔥',
      name: t('Raise the strength: add pure or evaporate', 'ঘনত্ব বাড়ানো: খাঁটি মেশানো বা জল উড়িয়ে দেওয়া'),
      difficulty: 'intermediate',
      typicalWording: t('“How much pure ingredient must be added / how much water must be evaporated so that the solution becomes q% strong?”', '“কতটা খাঁটি উপাদান মেশাতে হবে / কতটা জল উড়িয়ে দিতে হবে যাতে দ্রবণটি q% ঘন হয়?”'),
      formula: t(r`Adding pure: solve $\dfrac{P+x}{V+x}=$ target fraction. Evaporating: the pure amount $P$ is fixed, water removed $= V - \dfrac{P}{\text{target fraction}}$.`, r`খাঁটি মেশালে: $\dfrac{P+x}{V+x}=$ লক্ষ্য ভগ্নাংশ সমীকরণটি সমাধান করো। উড়িয়ে দিলে: খাঁটি পরিমাণ $P$ স্থির, জল সরানো $= V - \dfrac{P}{\text{লক্ষ্য ভগ্নাংশ}}$।`),
      shortcut: t('For evaporation, ignore the water bookkeeping: new total = pure ÷ target fraction, and the difference from the old total is the water boiled off.', 'উড়িয়ে দেওয়ার ক্ষেত্রে জলের হিসাব ভুলে যাও: নতুন মোট = খাঁটি ÷ লক্ষ্য ভগ্নাংশ, আর পুরোনো মোটের সঙ্গে পার্থক্যই উড়িয়ে দেওয়া জল।'),
      trap: t('When pure ingredient is ADDED, it increases BOTH the pure amount and the total — forgetting it in the denominator gives too small an answer.', 'খাঁটি উপাদান মেশালে তা খাঁটি পরিমাণ ও মোট — দুটোই বাড়ায়; হরে (denominator) তা ভুলে গেলে উত্তর ছোট আসে।'),
      spot: t(
        'A solution is **too weak** and must be made **stronger** — either by adding the **pure ingredient** or by **boiling off water**; find how much.',
        'একটি দ্রবণ **খুব পাতলা**, সেটিকে **ঘন** করতে হবে — হয় **খাঁটি উপাদান মিশিয়ে** নয়তো **জল ফুটিয়ে উড়িয়ে**; কতটা লাগবে বের করতে হয়।',
      ),
      method: [
        t('Find the pure amount P in the solution; note what stays fixed (evaporation: P fixed; adding pure: the OTHER ingredient fixed).', 'দ্রবণে খাঁটি পরিমাণ P বের করো; কী স্থির থাকে খেয়াল করো (উড়িয়ে দিলে: P স্থির; খাঁটি মেশালে: অন্য উপাদানটি স্থির)।'),
        t('Write the target strength as an equation with the unknown x.', 'অজানা x দিয়ে লক্ষ্য ঘনত্বের সমীকরণ লেখো।'),
        t('Solve for x and check the new strength.', 'x বের করে নতুন ঘনত্ব যাচাই করো।'),
      ],
      example: {
        question: t(
          '20 litres of a solution contains 30% alcohol. How much pure alcohol must be added to make it a 50% alcohol solution?',
          '20 লিটার দ্রবণে 30% অ্যালকোহল আছে। এটিকে 50% অ্যালকোহল দ্রবণ করতে কত লিটার খাঁটি অ্যালকোহল মেশাতে হবে?',
        ),
        steps: [
          t(r`Alcohol now $= 30\% \text{ of } 20 = 6$ L; water $= 14$ L stays fixed.`, r`এখন অ্যালকোহল $= 20$-এর $30\% = 6$ লিটার; জল $= 14$ লিটার স্থির থাকে।`),
          t(r`Let $x$ litres of pure alcohol be added: $\frac{6 + x}{20 + x} = \frac{1}{2}$.`, r`ধরো $x$ লিটার খাঁটি অ্যালকোহল মেশানো হল: $\frac{6 + x}{20 + x} = \frac{1}{2}$।`),
          t(r`$12 + 2x = 20 + x$, so $x = 8$ L. Check: $\frac{14}{28} = 50\%$.`, r`$12 + 2x = 20 + x$, তাই $x = 8$ লিটার। যাচাই: $\frac{14}{28} = 50\%$।`),
        ],
        answer: t('8 litres', '8 লিটার'),
      },
      tryIt: {
        question: t(
          '50 litres of salt solution contains 8% salt. How much water must be evaporated to make it a 10% salt solution?',
          '50 লিটার লবণ দ্রবণে 8% লবণ আছে। এটিকে 10% লবণ দ্রবণ করতে কত লিটার জল উড়িয়ে দিতে হবে?',
        ),
        options: [t('5', '5'), t('10', '10'), t('12.5', '12.5'), t('8', '8')],
        correct: 1,
        explanation: [
          t(r`Salt $= 8\% \text{ of } 50 = 4$ L, and evaporation does not change the salt.`, r`লবণ $= 50$-এর $8\% = 4$ লিটার, আর উড়িয়ে দিলে লবণ বদলায় না।`),
          t(r`New total $= 4 \div 0.10 = 40$ L, so water evaporated $= 50 - 40 = 10$ L.`, r`নতুন মোট $= 4 \div 0.10 = 40$ লিটার, তাই উড়িয়ে দেওয়া জল $= 50 - 40 = 10$ লিটার।`),
        ],
      },
    },
    {
      key: 'three_ingredient_mix',
      emoji: '🎨',
      name: t('Mixing three ingredients', 'তিনটি উপাদান মেশানো'),
      difficulty: 'advanced',
      typicalWording: t('“Three kinds priced ₹a, ₹b and ₹c are mixed in the ratio p : q : r. Find the price per kg of the mixture.”', '“₹a, ₹b ও ₹c দামের তিন রকম জিনিস p : q : r অনুপাতে মেশানো হল। মিশ্রণের প্রতি kg দাম কত?”'),
      formula: t(r`Mean price $=\dfrac{p \cdot a + q \cdot b + r \cdot c}{p + q + r}$ — the weighted average extended to three parts.`, r`গড় দর $=\dfrac{p \cdot a + q \cdot b + r \cdot c}{p + q + r}$ — ভারযুক্ত গড়ের তিন অংশে সম্প্রসারণ।`),
      shortcut: t('Pair the outer two first: average the first and third prices weighted by their parts, then combine that sub-mixture with the middle kind — useful when two prices average neatly.', 'আগে বাইরের দুটিকে জোড়া বাঁধো: প্রথম ও তৃতীয় দরের অংশ অনুযায়ী গড় করে সেই উপ-মিশ্রণকে মাঝের রকমের সঙ্গে মেশাও — দুটি দরের গড় সহজ হলে কাজে দেয়।'),
      trap: t('Alligation in its cross form works for TWO ingredients only; with three, do not try to force one cross — use the full weighted average.', 'আড়াআড়ি অ্যালিগেশন শুধু দুটি উপাদানের ক্ষেত্রে চলে; তিনটি থাকলে জোর করে একবারে আড়াআড়ি করো না — পুরো ভারযুক্ত গড় ব্যবহার করো।'),
      spot: t(
        '**Three** kinds (prices or strengths) are mixed in a given ratio or given quantities; find the mixture\'s price/strength.',
        '**তিন** রকম জিনিস (দাম বা ঘনত্ব) নির্দিষ্ট অনুপাতে বা পরিমাণে মেশানো হয়; মিশ্রণের দাম/ঘনত্ব বের করতে হয়।',
      ),
      method: [
        t('List each kind\'s quantity (or ratio part) and price.', 'প্রতিটি রকমের পরিমাণ (বা অনুপাতের অংশ) ও দাম লেখো।'),
        t('Total cost = Σ (quantity × price) over all three kinds.', 'মোট দাম = তিন রকমেরই (পরিমাণ × দাম)-এর যোগফল।'),
        t('Mean price = total cost ÷ total quantity.', 'গড় দর = মোট দাম ÷ মোট পরিমাণ।'),
      ],
      example: {
        question: t(
          '10 kg of rice at ₹20 per kg, 20 kg at ₹30 per kg and 10 kg at ₹40 per kg are mixed. What is the price per kg of the mixture?',
          '₹20 প্রতি kg দরের 10 kg চাল, ₹30 প্রতি kg দরের 20 kg চাল ও ₹40 প্রতি kg দরের 10 kg চাল মেশানো হল। মিশ্রণের প্রতি kg দাম কত?',
        ),
        steps: [
          t(r`Costs: $10 \times 20 = 200$, $20 \times 30 = 600$, $10 \times 40 = 400$ rupees.`, r`দাম: $10 \times 20 = 200$, $20 \times 30 = 600$, $10 \times 40 = 400$ টাকা।`),
          t(r`Total cost $= 1200$ rupees; total quantity $= 40$ kg.`, r`মোট দাম $= 1200$ টাকা; মোট পরিমাণ $= 40$ kg।`),
          t(r`Price $= 1200 \div 40 = 30$ rupees per kg.`, r`দর $= 1200 \div 40 = 30$ টাকা প্রতি kg।`),
        ],
        answer: t('₹30 per kg', 'প্রতি kg ₹30'),
      },
      tryIt: {
        question: t(
          'Three types of tea costing ₹100, ₹150 and ₹200 per kg are mixed in the ratio 2 : 1 : 1. What is the price (in ₹) per kg of the mixture?',
          '₹100, ₹150 ও ₹200 প্রতি kg দামের তিন রকম চা 2 : 1 : 1 অনুপাতে মেশানো হল। মিশ্রণের প্রতি kg দাম (₹-এ) কত?',
        ),
        options: [t('150', '150'), t('125', '125'), t('137.5', '137.5'), t('140', '140')],
        correct: 2,
        explanation: [
          t(r`Take quantities $2, 1, 1$ kg: total cost $= 2 \times 100 + 1 \times 150 + 1 \times 200 = 550$ rupees.`, r`পরিমাণ $2, 1, 1$ kg ধরো: মোট দাম $= 2 \times 100 + 1 \times 150 + 1 \times 200 = 550$ টাকা।`),
          t(r`Price $= 550 \div 4 = 137.5$ rupees per kg. (150 is the plain average of the prices, ignoring the ratio.)`, r`দর $= 550 \div 4 = 137.5$ টাকা প্রতি kg। (150 হল অনুপাত উপেক্ষা করে দামগুলোর সাধারণ গড়।)`),
        ],
      },
    },
    {
      key: 'vessels_exchange',
      emoji: '🔀',
      name: t('Equal quantity exchanged between two vessels', 'দুটি পাত্রের মধ্যে সমপরিমাণ বিনিময়'),
      difficulty: 'advanced',
      typicalWording: t('“x litres are taken from vessel A and poured into B; then x litres of the mixture in B are poured back into A. Find the final ratio in A.”', '“পাত্র A থেকে x লিটার নিয়ে B-তে ঢালা হল; তারপর B-এর মিশ্রণ থেকে x লিটার ফিরিয়ে A-তে ঢালা হল। A-তে চূড়ান্ত অনুপাত কত?”'),
      formula: t(r`Track amounts, not ratios: after each transfer, an ingredient moved $=$ volume moved $\times$ its current fraction in the source vessel.`, r`অনুপাত নয়, পরিমাণ ধরে চলো: প্রতিটি স্থানান্তরে একটি উপাদান যায় $=$ স্থানান্তরিত আয়তন $\times$ উৎস পাত্রে তার বর্তমান ভগ্নাংশ।`),
      shortcut: t('The total volume of each vessel returns to its starting value, and the TOTAL milk in A + B never changes — use that conservation to check your final numbers.', 'প্রতিটি পাত্রের মোট আয়তন শুরুর মানে ফিরে আসে, আর A + B-তে মোট দুধ কখনও বদলায় না — চূড়ান্ত সংখ্যা যাচাইয়ে এই সংরক্ষণ ব্যবহার করো।'),
      trap: t('The liquid poured BACK is B\'s NEW mixture (after receiving A\'s liquid), not B\'s original mixture — using the original ratio for the return trip is the classic error.', 'ফিরিয়ে ঢালা তরলটি B-এর নতুন মিশ্রণ (A-এর তরল পাওয়ার পরের), B-এর মূল মিশ্রণ নয় — ফেরার ধাপে মূল অনুপাত ব্যবহার করাই চিরাচরিত ভুল।'),
      spot: t(
        'The **same volume** is transferred from A to B, mixed, and the **same volume transferred back**; find a final amount or ratio in one vessel.',
        'একই আয়তন A থেকে B-তে নেওয়া হয়, মেশানো হয়, তারপর **একই আয়তন ফিরিয়ে** A-তে ঢালা হয়; একটি পাত্রে চূড়ান্ত পরিমাণ বা অনুপাত বের করতে হয়।',
      ),
      method: [
        t('Write the actual milk and water in each vessel from its ratio and volume.', 'প্রতিটি পাত্রের অনুপাত ও আয়তন থেকে আসল দুধ ও জল লেখো।'),
        t('Move x litres from A to B using A\'s current fractions; update both vessels\' amounts.', 'A-এর বর্তমান ভগ্নাংশ দিয়ে x লিটার A থেকে B-তে নাও; দুই পাত্রের পরিমাণ হালনাগাদ করো।'),
        t('Move x litres back from B to A using B\'s NEW fractions; update A.', 'B-এর নতুন ভগ্নাংশ দিয়ে x লিটার B থেকে A-তে ফিরিয়ে নাও; A হালনাগাদ করো।'),
        t('Read off the final amounts/ratio in the asked vessel.', 'চাওয়া পাত্রের চূড়ান্ত পরিমাণ/অনুপাত পড়ে নাও।'),
      ],
      example: {
        question: t(
          'Vessel A has 20 litres of milk and water in the ratio 3 : 1, and vessel B has 20 litres in the ratio 1 : 1. 5 litres are taken from A and poured into B; then 5 litres of B\'s mixture are poured back into A. Find the ratio of milk to water in A now.',
          'পাত্র A-তে 20 লিটার দুধ ও জল 3 : 1 অনুপাতে আছে, আর পাত্র B-তে 20 লিটার 1 : 1 অনুপাতে আছে। A থেকে 5 লিটার নিয়ে B-তে ঢালা হল; তারপর B-এর মিশ্রণ থেকে 5 লিটার ফিরিয়ে A-তে ঢালা হল। এখন A-তে দুধ ও জলের অনুপাত কত?',
        ),
        steps: [
          t(r`A starts: milk $15$, water $5$. B starts: milk $10$, water $10$.`, r`A শুরুতে: দুধ $15$, জল $5$। B শুরুতে: দুধ $10$, জল $10$।`),
          t(r`5 L from A (3 : 1) carries milk $3.75$, water $1.25$. Now A: $11.25, 3.75$; B (25 L): milk $13.75$, water $11.25$.`, r`A থেকে 5 লিটার (3 : 1) নিয়ে গেল দুধ $3.75$, জল $1.25$। এখন A: $11.25, 3.75$; B (25 লিটার): দুধ $13.75$, জল $11.25$।`),
          t(r`B's milk fraction is now $\frac{13.75}{25} = 0.55$, so 5 L back carries milk $2.75$, water $2.25$.`, r`B-তে দুধের ভগ্নাংশ এখন $\frac{13.75}{25} = 0.55$, তাই ফিরিয়ে আনা 5 লিটারে দুধ $2.75$, জল $2.25$।`),
          t(r`A finally: milk $11.25 + 2.75 = 14$, water $3.75 + 2.25 = 6$, so ratio $14 : 6 = 7 : 3$.`, r`A শেষে: দুধ $11.25 + 2.75 = 14$, জল $3.75 + 2.25 = 6$, তাই অনুপাত $14 : 6 = 7 : 3$।`),
        ],
        answer: t('7 : 3', '7 : 3 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'Vessel A has 30 litres with milk : water = 2 : 1 and vessel B has 30 litres with milk : water = 1 : 2. 10 litres are taken from A into B, mixed, and 10 litres are poured back into A. How many litres of milk are in A now?',
          'পাত্র A-তে 30 লিটার আছে যাতে দুধ : জল = 2 : 1 এবং পাত্র B-তে 30 লিটার আছে যাতে দুধ : জল = 1 : 2। A থেকে 10 লিটার B-তে নেওয়া হল, মেশানো হল, এবং 10 লিটার ফিরিয়ে A-তে ঢালা হল। এখন A-তে কত লিটার দুধ আছে?',
        ),
        options: [t('20', '20'), t('15', '15'), t('18', '18'), t('17.5', '17.5')],
        correct: 3,
        explanation: [
          t(r`A starts: milk $20$, water $10$; B: milk $10$, water $20$. 10 L from A carries milk $\frac{20}{3}$, water $\frac{10}{3}$, leaving A with milk $\frac{40}{3}$.`, r`A শুরুতে: দুধ $20$, জল $10$; B: দুধ $10$, জল $20$। A থেকে 10 লিটারে দুধ $\frac{20}{3}$, জল $\frac{10}{3}$ যায়, A-তে দুধ থাকে $\frac{40}{3}$।`),
          t(r`B now has 40 L with milk $\frac{50}{3}$, so its milk fraction is $\frac{5}{12}$; 10 L back carries milk $\frac{25}{6}$.`, r`B-তে এখন 40 লিটার, দুধ $\frac{50}{3}$, তাই দুধের ভগ্নাংশ $\frac{5}{12}$; ফিরিয়ে আনা 10 লিটারে দুধ $\frac{25}{6}$।`),
          t(r`Milk in A $= \frac{40}{3} + \frac{25}{6} = \frac{105}{6} = 17.5$ L.`, r`A-তে দুধ $= \frac{40}{3} + \frac{25}{6} = \frac{105}{6} = 17.5$ লিটার।`),
        ],
      },
    },
    {
      key: 'mixing_for_profit_percent',
      emoji: '📈',
      name: t('Mix so that selling gives a target profit', 'এমনভাবে মেশাও যাতে বিক্রিতে লক্ষ্য লাভ হয়'),
      difficulty: 'advanced',
      typicalWording: t('“Two grades cost ₹c and ₹d. In what ratio should they be mixed so that selling the mixture at ₹s per kg gives a profit of p%?”', '“দুই রকমের দাম ₹c ও ₹d। কোন অনুপাতে মেশালে মিশ্রণটি প্রতি kg ₹s দরে বিক্রি করে p% লাভ হবে?”'),
      formula: t(r`Mixture CP $=\dfrac{\text{SP}}{1 + p/100}$; then alligation on $c$, $d$ and this CP: Cheap : Dear $=(d-\text{CP}):(\text{CP}-c)$.`, r`মিশ্রণের ক্রয়মূল্য $=\dfrac{\text{বিক্রয়মূল্য}}{1 + p/100}$; তারপর $c$, $d$ ও এই ক্রয়মূল্যের উপর অ্যালিগেশন: সস্তা : দামি $=(d-\text{ক্রয়মূল্য}):(\text{ক্রয়মূল্য}-c)$।`),
      shortcut: t('Convert the profit into the CP in one move (divide SP by 1.10, 1.20, 1.25 for 10%, 20%, 25%) and the rest is a plain alligation cross.', 'এক ধাপে লাভকে ক্রয়মূল্যে বদলাও (10%, 20%, 25%-এর জন্য বিক্রয়মূল্যকে 1.10, 1.20, 1.25 দিয়ে ভাগ করো), বাকিটা সাধারণ অ্যালিগেশন আড়াআড়ি।'),
      trap: t('Never run alligation on the SELLING price — alligation balances cost prices. Skipping the CP step puts the mean too high and wrecks the ratio.', 'বিক্রয়মূল্যের উপর কখনও অ্যালিগেশন করো না — অ্যালিগেশন ক্রয়মূল্যের ভারসাম্য করে। ক্রয়মূল্যের ধাপ বাদ দিলে গড় বেশি হয়ে অনুপাত নষ্ট হয়।'),
      spot: t(
        'A **selling price and a target profit %** are given for the mixture; you must first recover the mixture\'s **cost price** before any alligation.',
        'মিশ্রণের জন্য **বিক্রয়মূল্য ও লক্ষ্য লাভ %** দেওয়া থাকে; অ্যালিগেশনের আগে মিশ্রণের **ক্রয়মূল্য** বের করা বাধ্যতামূলক।',
      ),
      method: [
        t('Find the mixture\'s cost price: CP = SP ÷ (1 + profit%/100).', 'মিশ্রণের ক্রয়মূল্য বের করো: ক্রয়মূল্য = বিক্রয়মূল্য ÷ (1 + লাভ%/100)।'),
        t('Treat this CP as the mean price in the alligation cross.', 'এই ক্রয়মূল্যকে অ্যালিগেশন আড়াআড়িতে গড় দর হিসেবে ধরো।'),
        t('Cheap : Dear = (Dear − CP) : (CP − Cheap); simplify.', 'সস্তা : দামি = (দামি − ক্রয়মূল্য) : (ক্রয়মূল্য − সস্তা); সরল করো।'),
      ],
      example: {
        question: t(
          'In what ratio should tea costing ₹70 per kg be mixed with tea costing ₹100 per kg so that selling the mixture at ₹88 per kg gives a profit of 10%?',
          '₹70 প্রতি kg দামের চা আর ₹100 প্রতি kg দামের চা কোন অনুপাতে মেশালে মিশ্রণটি প্রতি kg ₹88 দরে বিক্রি করে 10% লাভ হবে?',
        ),
        steps: [
          t(r`Mixture CP $= 88 \div 1.10 = 80$ rupees per kg.`, r`মিশ্রণের ক্রয়মূল্য $= 88 \div 1.10 = 80$ টাকা প্রতি kg।`),
          t(r`Alligation with mean 80: Cheap : Dear $= (100 - 80) : (80 - 70) = 20 : 10$.`, r`গড় 80 ধরে অ্যালিগেশন: সস্তা : দামি $= (100 - 80) : (80 - 70) = 20 : 10$।`),
          t(r`Simplify: $20 : 10 = 2 : 1$.`, r`সরল করে: $20 : 10 = 2 : 1$।`),
        ],
        answer: t('2 : 1', '2 : 1 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'Wheat at ₹30 per kg is to be mixed with wheat at ₹45 per kg so that selling the mixture at ₹44 per kg yields a profit of 10%. The ratio (cheap : dear) is:',
          '₹30 প্রতি kg দরের গমের সঙ্গে ₹45 প্রতি kg দরের গম এমন অনুপাতে মেশাতে হবে যাতে মিশ্রণটি প্রতি kg ₹44 দরে বিক্রি করে 10% লাভ হয়। অনুপাতটি (সস্তা : দামি) হল:',
        ),
        options: [t('2 : 1', '2 : 1'), t('1 : 2', '1 : 2'), t('1 : 1', '1 : 1'), t('2 : 3', '2 : 3')],
        correct: 1,
        explanation: [
          t(r`Mixture CP $= 44 \div 1.10 = 40$ rupees per kg.`, r`মিশ্রণের ক্রয়মূল্য $= 44 \div 1.10 = 40$ টাকা প্রতি kg।`),
          t(r`Cheap : Dear $= (45 - 40) : (40 - 30) = 5 : 10 = 1 : 2$. (Using 44 directly as the mean gives the wrong 2 : 1-type answer.)`, r`সস্তা : দামি $= (45 - 40) : (40 - 30) = 5 : 10 = 1 : 2$। (44-কে সরাসরি গড় ধরলে ভুল 2 : 1 ধরনের উত্তর আসে।)`),
        ],
      },
    },
    {
      key: 'two_vessels_final_ratio',
      emoji: '🪣',
      name: t('Two mixtures poured together: final ratio', 'দুটি মিশ্রণ একসঙ্গে ঢাললে: চূড়ান্ত অনুপাত'),
      difficulty: 'advanced',
      typicalWording: t('“Vessel A has V₁ litres in ratio a : b and vessel B has V₂ litres in ratio c : d. Both are poured into one vessel. Find the final ratio.”', '“পাত্র A-তে a : b অনুপাতে V₁ লিটার এবং পাত্র B-তে c : d অনুপাতে V₂ লিটার আছে। দুটোই একটি পাত্রে ঢালা হল। চূড়ান্ত অনুপাত কত?”'),
      formula: t(r`Total milk $= V_1 \cdot \dfrac{a}{a+b} + V_2 \cdot \dfrac{c}{c+d}$; total water likewise; final ratio $=$ total milk : total water.`, r`মোট দুধ $= V_1 \cdot \dfrac{a}{a+b} + V_2 \cdot \dfrac{c}{c+d}$; মোট জলও একইভাবে; চূড়ান্ত অনুপাত $=$ মোট দুধ : মোট জল।`),
      shortcut: t('Compute only the milk from both vessels, then get water by subtracting from the combined volume (V₁ + V₂) — one ingredient\'s arithmetic instead of two.', 'দুই পাত্র থেকে শুধু দুধ হিসাব করো, তারপর সম্মিলিত আয়তন (V₁ + V₂) থেকে বিয়োগ করে জল পাও — দুটি উপাদানের বদলে একটির হিসাব।'),
      trap: t('Never average or add the two ratios (4 : 1 and 3 : 2 do NOT combine into anything like 7 : 3) — the vessels have different volumes, so convert to litres first.', 'দুটি অনুপাতের গড় বা যোগ কখনও করো না (4 : 1 আর 3 : 2 মিলে 7 : 3-এর মতো কিছু হয় না) — পাত্রগুলোর আয়তন আলাদা, তাই আগে লিটারে বদলাও।'),
      spot: t(
        'Two mixtures with **given volumes and given ratios** are **fully poured together**; find the **final ratio** in the combined vessel.',
        'নির্দিষ্ট আয়তন ও অনুপাতের দুটি মিশ্রণ **পুরোপুরি একসঙ্গে ঢালা** হয়; সম্মিলিত পাত্রে **চূড়ান্ত অনুপাত** বের করতে হয়।',
      ),
      method: [
        t('From each vessel\'s volume and ratio, find its actual milk and water in litres.', 'প্রতিটি পাত্রের আয়তন ও অনুপাত থেকে তার আসল দুধ ও জল লিটারে বের করো।'),
        t('Add the milks together and the waters together.', 'দুধগুলো একসঙ্গে যোগ করো, জলগুলোও একসঙ্গে যোগ করো।'),
        t('Write total milk : total water and simplify.', 'মোট দুধ : মোট জল লিখে সরল করো।'),
      ],
      example: {
        question: t(
          'Vessel A contains 30 litres of milk and water in the ratio 4 : 1. Vessel B contains 20 litres in the ratio 3 : 2. Both are poured into a third vessel. Find the ratio of milk to water in it.',
          'পাত্র A-তে 30 লিটার দুধ ও জল 4 : 1 অনুপাতে আছে। পাত্র B-তে 20 লিটার 3 : 2 অনুপাতে আছে। দুটোই তৃতীয় একটি পাত্রে ঢালা হল। তাতে দুধ ও জলের অনুপাত কত?',
        ),
        steps: [
          t(r`A: milk $= \frac{4}{5} \times 30 = 24$ L, water $= 6$ L. B: milk $= \frac{3}{5} \times 20 = 12$ L, water $= 8$ L.`, r`A: দুধ $= \frac{4}{5} \times 30 = 24$ লিটার, জল $= 6$ লিটার। B: দুধ $= \frac{3}{5} \times 20 = 12$ লিটার, জল $= 8$ লিটার।`),
          t(r`Total milk $= 24 + 12 = 36$ L; total water $= 6 + 8 = 14$ L.`, r`মোট দুধ $= 24 + 12 = 36$ লিটার; মোট জল $= 6 + 8 = 14$ লিটার।`),
          t(r`Ratio $= 36 : 14 = 18 : 7$.`, r`অনুপাত $= 36 : 14 = 18 : 7$।`),
        ],
        answer: t('18 : 7', '18 : 7 অনুপাতে'),
      },
      tryIt: {
        question: t(
          'A mixture of 40 litres has milk and water in the ratio 3 : 1. Another mixture of 35 litres has them in the ratio 5 : 2. When both are combined, the ratio of milk to water is:',
          '40 লিটার মিশ্রণে দুধ ও জলের অনুপাত 3 : 1। আরেকটি 35 লিটার মিশ্রণে অনুপাত 5 : 2। দুটো একসঙ্গে মেশালে দুধ ও জলের অনুপাত:',
        ),
        options: [t('4 : 11', '4 : 11'), t('3 : 1', '3 : 1'), t('11 : 4', '11 : 4'), t('5 : 2', '5 : 2')],
        correct: 2,
        explanation: [
          t(r`First mixture: milk $30$ L, water $10$ L. Second: milk $= \frac{5}{7} \times 35 = 25$ L, water $= 10$ L.`, r`প্রথম মিশ্রণ: দুধ $30$ লিটার, জল $10$ লিটার। দ্বিতীয়: দুধ $= \frac{5}{7} \times 35 = 25$ লিটার, জল $= 10$ লিটার।`),
          t(r`Total milk $= 55$ L, total water $= 20$ L, so ratio $= 55 : 20 = 11 : 4$.`, r`মোট দুধ $= 55$ লিটার, মোট জল $= 20$ লিটার, তাই অনুপাত $= 55 : 20 = 11 : 4$।`),
        ],
      },
    },
  ],
};
