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
  ],
};
