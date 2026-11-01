'use strict';

// Art & Culture. Every fact used here is in the verified GK library
// (db/gk/art_culture.jsonl, sources: ASI, Sangeet Natak Akademi, PIB, Ministry of Culture).

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'art_culture',
  patterns: [
    {
      key: 'monument_builder_place',
      emoji: '🏯',
      name: t('Monuments: who built them, where, and when inscribed', 'স্মৃতিসৌধ: কে নির্মাণ করেন, কোথায়, কবে তালিকাভুক্ত'),
      spot: t(
        'The question names a monument and asks its builder, dynasty, state or UNESCO year, or gives these and asks the monument.',
        'প্রশ্নে কোনো স্মৃতিসৌধের নাম দিয়ে তার নির্মাতা, রাজবংশ, রাজ্য বা ইউনেস্কো তালিকাভুক্তির সাল জানতে চায়, অথবা এগুলি দিয়ে স্মৃতিসৌধটি জানতে চায়।',
      ),
      method: [
        t('Qutb Minar: foundation by Qutbu\'d-Din Aibak (AD 1199, first storey); three more storeys added by Iltutmish.', 'কুতুব মিনার: ভিত্তি স্থাপন কুতুবউদ্দিন আইবক (১১৯৯ খ্রি., প্রথম তলা); আরও তিনটি তলা যোগ করেন ইলতুৎমিশ।'),
        t('Khajuraho (Madhya Pradesh): Chandella rulers. Hampi (Karnataka): seat of the Vijayanagara empire, on the Tungabhadra.', 'খাজুরাহো (মধ্যপ্রদেশ): চান্দেল্ল শাসক। হাম্পি (কর্ণাটক): বিজয়নগর সাম্রাজ্যের কেন্দ্র, তুঙ্গভদ্রার তীরে।'),
        t('Sun Temple, Konarak (Odisha): 13th century, a giant solar chariot with twelve pairs of wheels and seven horses.', 'কোনারকের সূর্য মন্দির (ওড়িশা): ত্রয়োদশ শতক, বারো জোড়া চাকা ও সাতটি ঘোড়ায় টানা বিশাল সূর্যরথের রূপ।'),
      ],
      example: {
        question: t('The Khajuraho temples belong to which dynasty?', 'খাজুরাহোর মন্দিরগুলি কোন রাজবংশের?'),
        steps: [
          t('Khajuraho is in Madhya Pradesh; its temples date from the 10th–11th centuries AD.', 'খাজুরাহো মধ্যপ্রদেশে; এর মন্দিরগুলি খ্রিস্টীয় দশম–একাদশ শতকের।'),
          t('ASI places them in the period of the Chandella rulers (Yasovarman built the Lakshmana temple, AD 954).', 'ASI এগুলিকে চান্দেল্ল শাসকদের আমলের বলে (যশোবর্মণ লক্ষ্মণ মন্দির নির্মাণ করেন, ৯৫৪ খ্রি.)।'),
        ],
        answer: t('The Chandellas', 'চান্দেল্ল বংশ'),
      },
      tryIt: {
        question: t('Hampi, the seat of the Vijayanagara empire, lies on the bank of which river?', 'বিজয়নগর সাম্রাজ্যের কেন্দ্র হাম্পি কোন নদীর তীরে অবস্থিত?'),
        options: [t('Krishna', 'কৃষ্ণা'), t('Kaveri', 'কাবেরী'), t('Tungabhadra', 'তুঙ্গভদ্রা'), t('Godavari', 'গোদাবরী')],
        correct: 2,
        explanation: [
          t('ASI describes Hampi as lying on the southern bank of the Tungabhadra.', 'ASI-র বর্ণনায় হাম্পি তুঙ্গভদ্রার দক্ষিণ তীরে।'),
          t('Its monuments were built between AD 1336 and 1570; Krishnadeva Raya is called the greatest ruler of the dynasty.', 'এর স্মৃতিসৌধগুলি ১৩৩৬ থেকে ১৫৭০ খ্রিস্টাব্দের মধ্যে নির্মিত; কৃষ্ণদেব রায়কে এই বংশের শ্রেষ্ঠ শাসক বলা হয়।'),
        ],
      },
    },
    {
      key: 'unesco_years',
      emoji: '🌐',
      name: t('UNESCO World Heritage and Intangible Heritage years', 'ইউনেস্কো বিশ্ব ঐতিহ্য ও অধরা ঐতিহ্যের সাল'),
      spot: t('The question asks in which year a site or tradition was inscribed by UNESCO, or which was inscribed first.', 'প্রশ্নে জানতে চায় কোনো স্থান বা ঐতিহ্য ইউনেস্কো কোন সালে তালিকাভুক্ত করে, বা কোনটি আগে তালিকাভুক্ত হয়।'),
      method: [
        t('1983: Agra Fort, Ajanta, Ellora, Taj Mahal. 1984: Konarak. 1986: Hampi, Khajuraho. 1993: Humayun\'s Tomb, Qutb Minar.', '১৯৮৩: আগ্রা দুর্গ, অজন্তা, ইলোরা, তাজমহল। ১৯৮৪: কোনারক। ১৯৮৬: হাম্পি, খাজুরাহো। ১৯৯৩: হুমায়ুনের সমাধি, কুতুব মিনার।'),
        t('Mountain Railways of India were inscribed in stages: Darjeeling 1999, Nilgiri 2005, Kalka–Shimla 2008.', 'ভারতের পার্বত্য রেলপথ ধাপে ধাপে তালিকাভুক্ত: দার্জিলিং ১৯৯৯, নীলগিরি ২০০৫, কালকা–সিমলা ২০০৮।'),
        t('Intangible heritage: Kutiyattam (inscribed on the Representative List 2008), Yoga 2016, Kumbh Mela 2017.', 'অধরা ঐতিহ্য: কুটিয়াট্টম (প্রতিনিধি তালিকায় ২০০৮), যোগ ২০১৬, কুম্ভমেলা ২০১৭।'),
      ],
      example: {
        question: t('Which of the Mountain Railways of India was inscribed first?', 'ভারতের পার্বত্য রেলপথগুলির মধ্যে কোনটি সবার আগে তালিকাভুক্ত হয়?'),
        steps: [
          t('The listing was extended in stages: Nilgiri in 2005 and Kalka–Shimla in 2008.', 'তালিকা ধাপে ধাপে বাড়ানো হয়: নীলগিরি ২০০৫-এ এবং কালকা–সিমলা ২০০৮-এ।'),
          t('The Darjeeling Himalayan Railway came first, in 1999.', 'দার্জিলিং হিমালয়ান রেলওয়ে সবার আগে, ১৯৯৯-এ।'),
        ],
        answer: t('Darjeeling Himalayan Railway (1999)', 'দার্জিলিং হিমালয়ান রেলওয়ে (১৯৯৯)'),
      },
    },
    {
      key: 'art_form_region',
      emoji: '🎨',
      name: t('Art forms and their regions', 'শিল্পরূপ ও তার অঞ্চল'),
      spot: t('The question names a painting, dance or ritual form and asks the state or region it belongs to.', 'প্রশ্নে কোনো চিত্রকলা, নৃত্য বা আচার-অনুষ্ঠানের নাম দিয়ে তা কোন রাজ্য বা অঞ্চলের জানতে চায়।'),
      method: [
        t('Madhubani painting: Mithila region of Bihar.', 'মধুবনী চিত্রকলা: বিহারের মিথিলা অঞ্চল।'),
        t('Kalbelia: Rajasthan. Mudiyettu: Kerala. Ramman: Garhwal Himalayas. Chhau: eastern India.', 'কালবেলিয়া: রাজস্থান। মুদিয়েট্টু: কেরল। রামমান: গাড়োয়াল হিমালয়। ছৌ: পূর্ব ভারত।'),
        t('Kutiyattam is the Sanskrit theatre of Kerala; the Sangeet Natak Akademi runs a Kutiyattam Kendra in Thiruvananthapuram.', 'কুটিয়াট্টম কেরলের সংস্কৃত নাট্য; সংগীত নাটক আকাদেমি তিরুবনন্তপুরমে কুটিয়াট্টম কেন্দ্র পরিচালনা করে।'),
      ],
      example: {
        question: t('Madhubani painting originates from which region?', 'মধুবনী চিত্রকলার উৎপত্তি কোন অঞ্চলে?'),
        steps: [
          t('Madhubani is known for bold lines, intricate patterns and natural colours.', 'মধুবনী সাহসী রেখা, জটিল নকশা ও প্রাকৃতিক রঙের জন্য পরিচিত।'),
          t('It originates from the Mithila region of Bihar.', 'এর উৎপত্তি বিহারের মিথিলা অঞ্চলে।'),
        ],
        answer: t('Mithila region of Bihar', 'বিহারের মিথিলা অঞ্চল'),
      },
    },
  ],
};
