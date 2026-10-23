'use strict';

const t = (en, bn) => ({ en, bn });

module.exports = {
  subject: 'gs',
  topic: 'general_science',
  patterns: [
    {
      key: 'vitamin_deficiency',
      emoji: '🍊',
      name: t('Vitamins and deficiency diseases', 'ভিটামিন ও অভাবজনিত রোগ'),
      spot: t(
        'The question names a disease and asks which vitamin is lacking, or names a vitamin and asks what its lack causes.',
        'প্রশ্নে কোনো রোগের নাম দিয়ে জানতে চায় কোন ভিটামিনের অভাব, অথবা ভিটামিনের নাম দিয়ে জানতে চায় তার অভাবে কী হয়।',
      ),
      method: [
        t('A → night blindness (cannot see in dim light). B1 → beriberi.', 'A → রাতকানা (কম আলোয় দেখতে না পাওয়া)। B1 → বেরিবেরি।'),
        t('C → scurvy (bleeding gums); found in citrus fruits like lemon and amla. D → rickets (soft, bent bones in children); made by skin in sunlight.', 'C → স্কার্ভি (মাড়ি থেকে রক্ত পড়া); লেবু, আমলকীর মতো টক ফলে থাকে। D → রিকেট (শিশুদের নরম, বাঁকা হাড়); রোদে ত্বকে তৈরি হয়।'),
        t('K → helps blood clot; lack causes slow clotting (bleeding does not stop easily).', 'K → রক্ত জমাট বাঁধতে সাহায্য করে; অভাবে রক্ত সহজে জমাট বাঁধে না।'),
        t('Memory chain: "A-eyes, B-beriberi, C-citrus/scurvy, D-daylight/bones, K-blood clotting".', 'মনে রাখো: "A-চোখ, B-বেরিবেরি, C-টক ফল/স্কার্ভি, D-রোদ/হাড়, K-রক্ত জমাট"।'),
      ],
      example: {
        question: t('Lack of which vitamin causes night blindness?', 'কোন ভিটামিনের অভাবে রাতকানা রোগ হয়?'),
        steps: [
          t('Night blindness is an eye problem.', 'রাতকানা চোখের সমস্যা।'),
          t('In our chain, "A-eyes": vitamin A keeps the eyes healthy (carrots are rich in it).', 'আমাদের তালিকায় "A-চোখ": ভিটামিন A চোখ ভালো রাখে (গাজরে প্রচুর থাকে)।'),
        ],
        answer: t('Vitamin A', 'ভিটামিন A'),
      },
      tryIt: {
        question: t('Scurvy is caused by the lack of which vitamin?', 'কোন ভিটামিনের অভাবে স্কার্ভি রোগ হয়?'),
        options: [t('Vitamin C', 'ভিটামিন C'), t('Vitamin A', 'ভিটামিন A'), t('Vitamin D', 'ভিটামিন D'), t('Vitamin K', 'ভিটামিন K')],
        correct: 0,
        explanation: [
          t('Scurvy causes bleeding and swollen gums; it is prevented by citrus fruits rich in vitamin C.', 'স্কার্ভিতে মাড়ি ফোলে ও রক্ত পড়ে; ভিটামিন C যুক্ত টক ফল খেলে এটি হয় না।'),
          t('A is for night blindness, D for rickets and K for blood clotting.', 'A রাতকানার, D রিকেটের, আর K রক্ত জমাট বাঁধার সঙ্গে যুক্ত।'),
        ],
      },
    },
    {
      key: 'si_units',
      emoji: '📏',
      name: t('SI units of physical quantities', 'ভৌত রাশির SI একক'),
      spot: t(
        'The question names a quantity (force, work, power, pressure…) and asks its SI unit, or gives a unit and asks what it measures.',
        'প্রশ্নে কোনো রাশির (বল, কার্য, ক্ষমতা, চাপ…) নাম দিয়ে তার SI একক জানতে চায়, অথবা একক দিয়ে জানতে চায় সেটি কী মাপে।',
      ),
      method: [
        t('Most units are named after scientists: force – newton (N), work/energy – joule (J), power – watt (W), pressure – pascal (Pa).', 'বেশিরভাগ একক বিজ্ঞানীদের নামে: বল – নিউটন (N), কার্য/শক্তি – জুল (J), ক্ষমতা – ওয়াট (W), চাপ – প্যাসকেল (Pa)।'),
        t('Electricity: current – ampere (A), voltage – volt (V), resistance – ohm (Ω). Frequency – hertz (Hz).', 'বিদ্যুৎ: তড়িৎপ্রবাহ – অ্যাম্পিয়ার (A), বিভব – ভোল্ট (V), রোধ – ওহম (Ω)। কম্পাঙ্ক – হার্জ (Hz)।'),
        t('Link to daily life: bulbs are sold in watts (power), electricity bills count energy.', 'দৈনন্দিন জীবনের সঙ্গে মেলাও: বাল্ব ওয়াটে বিক্রি হয় (ক্ষমতা), বিদ্যুতের বিল শক্তি গোনে।'),
      ],
      example: {
        question: t('What is the SI unit of force?', 'বলের SI একক কী?'),
        steps: [
          t('Force is linked with Newton\'s laws of motion.', 'বল নিউটনের গতিসূত্রের সঙ্গে যুক্ত।'),
          t('So the SI unit of force is the newton (N).', 'তাই বলের SI একক নিউটন (N)।'),
        ],
        answer: t('Newton (N)', 'নিউটন (N)'),
      },
      tryIt: {
        question: t('What is the SI unit of power?', 'ক্ষমতার SI একক কী?'),
        options: [t('Joule', 'জুল'), t('Watt', 'ওয়াট'), t('Newton', 'নিউটন'), t('Pascal', 'প্যাসকেল')],
        correct: 1,
        explanation: [
          t('Power is how fast work is done; its SI unit is the watt (1 watt = 1 joule per second).', 'ক্ষমতা হলো কত দ্রুত কাজ হয়; এর SI একক ওয়াট (1 ওয়াট = প্রতি সেকেন্ডে 1 জুল)।'),
          t('Joule is for work/energy, newton for force and pascal for pressure.', 'জুল কার্য/শক্তির, নিউটন বলের, আর প্যাসকেল চাপের একক।'),
        ],
      },
    },
    {
      key: 'chemical_names',
      emoji: '🧪',
      name: t('Common names and chemical formulas', 'সাধারণ নাম ও রাসায়নিক সংকেত'),
      spot: t(
        'The question gives a household name (baking soda, washing soda, common salt) and asks its chemical name or formula, or the reverse.',
        'প্রশ্নে কোনো ঘরোয়া নাম (খাবার সোডা, কাপড় কাচার সোডা, খাদ্য লবণ) দিয়ে রাসায়নিক নাম বা সংকেত জানতে চায়, বা উল্টোটা।',
      ),
      method: [
        t('Common salt = sodium chloride, $\\text{NaCl}$. Baking soda = sodium hydrogen carbonate, $\\text{NaHCO}_3$.', 'খাদ্য লবণ = সোডিয়াম ক্লোরাইড, $\\text{NaCl}$। খাবার সোডা (বেকিং সোডা) = সোডিয়াম হাইড্রোজেন কার্বনেট, $\\text{NaHCO}_3$।'),
        t('Washing soda = sodium carbonate, $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$. Trick: Baking soda has the "H"; washing soda has the extra water.', 'কাপড় কাচার সোডা = সোডিয়াম কার্বনেট, $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$। কৌশল: খাবার সোডায় "H" আছে; কাচার সোডায় অনেক জল যুক্ত।'),
        t('Bleaching powder = $\\text{CaOCl}_2$. Quicklime = calcium oxide, $\\text{CaO}$. Plaster of Paris = $\\text{CaSO}_4\\cdot\\frac{1}{2}\\text{H}_2\\text{O}$.', 'ব্লিচিং পাউডার = $\\text{CaOCl}_2$। কলিচুন = ক্যালসিয়াম অক্সাইড, $\\text{CaO}$। প্লাস্টার অফ প্যারিস = $\\text{CaSO}_4\\cdot\\frac{1}{2}\\text{H}_2\\text{O}$।'),
      ],
      example: {
        question: t('What is the chemical name of washing soda?', 'কাপড় কাচার সোডার রাসায়নিক নাম কী?'),
        steps: [
          t('Baking soda and washing soda are both sodium compounds; do not mix them up.', 'খাবার সোডা আর কাচার সোডা দুটোই সোডিয়ামের যৌগ; গুলিয়ে ফেলো না।'),
          t('Baking soda has hydrogen (sodium hydrogen carbonate), so washing soda is plain sodium carbonate with 10 water molecules.', 'খাবার সোডায় হাইড্রোজেন আছে (সোডিয়াম হাইড্রোজেন কার্বনেট), তাই কাচার সোডা হলো 10টি জলের অণুযুক্ত সোডিয়াম কার্বনেট।'),
        ],
        answer: t('Sodium carbonate, $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$', 'সোডিয়াম কার্বনেট, $\\text{Na}_2\\text{CO}_3\\cdot 10\\text{H}_2\\text{O}$'),
      },
      tryIt: {
        question: t('What is the chemical formula of baking soda?', 'খাবার সোডার (বেকিং সোডা) রাসায়নিক সংকেত কী?'),
        options: [
          t('$\\text{Na}_2\\text{CO}_3$', '$\\text{Na}_2\\text{CO}_3$'),
          t('$\\text{NaCl}$', '$\\text{NaCl}$'),
          t('$\\text{CaOCl}_2$', '$\\text{CaOCl}_2$'),
          t('$\\text{NaHCO}_3$', '$\\text{NaHCO}_3$'),
        ],
        correct: 3,
        explanation: [
          t('Baking soda is sodium hydrogen carbonate: Na, H, C and three O, written $\\text{NaHCO}_3$.', 'খাবার সোডা হলো সোডিয়াম হাইড্রোজেন কার্বনেট: Na, H, C ও তিনটি O, অর্থাৎ $\\text{NaHCO}_3$।'),
          t('$\\text{Na}_2\\text{CO}_3$ is washing soda, $\\text{NaCl}$ is common salt and $\\text{CaOCl}_2$ is bleaching powder.', '$\\text{Na}_2\\text{CO}_3$ কাচার সোডা, $\\text{NaCl}$ খাদ্য লবণ আর $\\text{CaOCl}_2$ ব্লিচিং পাউডার।'),
        ],
      },
    },
    {
      key: 'human_body_superlatives',
      emoji: '🫀',
      name: t('Human body: largest, smallest, longest', 'মানবদেহ: সবচেয়ে বড়, ছোট, লম্বা'),
      spot: t(
        'The question asks for the largest organ, largest gland, smallest or longest bone, or a similar "most" fact about the body.',
        'প্রশ্নে দেহের সবচেয়ে বড় অঙ্গ, বৃহত্তম গ্রন্থি, ক্ষুদ্রতম বা দীর্ঘতম হাড়, বা এমন কোনো "সবচেয়ে" তথ্য জানতে চায়।',
      ),
      method: [
        t('Largest organ: skin (outside). Largest internal organ and largest gland: liver.', 'বৃহত্তম অঙ্গ: ত্বক (বাইরে)। বৃহত্তম অভ্যন্তরীণ অঙ্গ ও বৃহত্তম গ্রন্থি: যকৃৎ (লিভার)।'),
        t('Longest bone: femur (thigh bone). Smallest bone: stapes (in the ear).', 'দীর্ঘতম হাড়: ফিমার (ঊরুর হাড়)। ক্ষুদ্রতম হাড়: স্টেপিস (কানে)।'),
        t('Read the word carefully: "organ" vs "internal organ" vs "gland" can change the answer between skin and liver.', 'শব্দটি ভালো করে পড়ো: "অঙ্গ", "অভ্যন্তরীণ অঙ্গ" না "গ্রন্থি" তার উপর উত্তর ত্বক বা যকৃৎ হতে পারে।'),
      ],
      example: {
        question: t('Which is the smallest bone in the human body?', 'মানবদেহের ক্ষুদ্রতম হাড় কোনটি?'),
        steps: [
          t('The tiniest bones are the three small bones inside the middle ear that pass on sound.', 'সবচেয়ে ছোট হাড়গুলো মধ্যকর্ণের তিনটি ছোট হাড়, যারা শব্দ বয়ে নিয়ে যায়।'),
          t('The smallest of them is the stapes.', 'এদের মধ্যে সবচেয়ে ছোট স্টেপিস।'),
        ],
        answer: t('Stapes (in the ear)', 'স্টেপিস (কানে)'),
      },
      tryIt: {
        question: t('Which is the largest gland in the human body?', 'মানবদেহের বৃহত্তম গ্রন্থি কোনটি?'),
        options: [t('Pancreas', 'অগ্ন্যাশয়'), t('Thyroid', 'থাইরয়েড'), t('Liver', 'যকৃৎ (লিভার)'), t('Skin', 'ত্বক')],
        correct: 2,
        explanation: [
          t('The liver is both the largest internal organ and the largest gland.', 'যকৃৎ বৃহত্তম অভ্যন্তরীণ অঙ্গ এবং বৃহত্তম গ্রন্থি দুই-ই।'),
          t('Skin is the largest organ but not a gland, so it is a trap; pancreas and thyroid are much smaller glands.', 'ত্বক বৃহত্তম অঙ্গ কিন্তু গ্রন্থি নয়, তাই এটি ফাঁদ; অগ্ন্যাশয় ও থাইরয়েড অনেক ছোট গ্রন্থি।'),
        ],
      },
    },
    {
      key: 'disease_causes',
      emoji: '🦠',
      name: t('Diseases and what causes them', 'রোগ ও তার কারণ'),
      spot: t(
        'The question asks whether a disease is caused by a bacterium, virus or protozoan, or which insect spreads it.',
        'প্রশ্নে জানতে চায় কোনো রোগ ব্যাকটেরিয়া, ভাইরাস না প্রোটোজোয়া দিয়ে হয়, বা কোন পতঙ্গ রোগটি ছড়ায়।',
      ),
      method: [
        t('Bacteria: tuberculosis (TB), cholera, typhoid. Trick: "TB, Cholera, Typhoid — Bacteria".', 'ব্যাকটেরিয়া: যক্ষ্মা (TB), কলেরা, টাইফয়েড। কৌশল: "যক্ষ্মা, কলেরা, টাইফয়েড — ব্যাকটেরিয়া"।'),
        t('Virus: polio, measles, chickenpox, AIDS, influenza.', 'ভাইরাস: পোলিও, হাম, জলবসন্ত, এইডস, ইনফ্লুয়েঞ্জা।'),
        t('Protozoa: malaria (caused by Plasmodium, spread by the female Anopheles mosquito).', 'প্রোটোজোয়া: ম্যালেরিয়া (প্লাসমোডিয়াম দিয়ে হয়, স্ত্রী অ্যানোফিলিস মশা ছড়ায়)।'),
      ],
      example: {
        question: t('Malaria is caused by which organism?', 'ম্যালেরিয়া কোন জীবের দ্বারা হয়?'),
        steps: [
          t('The mosquito only carries the germ; it is not the cause itself.', 'মশা শুধু জীবাণু বহন করে; সে নিজে রোগের কারণ নয়।'),
          t('The actual germ is a protozoan called Plasmodium, spread by the female Anopheles mosquito.', 'আসল জীবাণু প্লাসমোডিয়াম নামের একটি প্রোটোজোয়া, যা স্ত্রী অ্যানোফিলিস মশা ছড়ায়।'),
        ],
        answer: t('Plasmodium (a protozoan)', 'প্লাসমোডিয়াম (একটি প্রোটোজোয়া)'),
      },
      tryIt: {
        question: t('Which of these diseases is caused by a virus?', 'নিচের কোন রোগটি ভাইরাস দিয়ে হয়?'),
        options: [t('Cholera', 'কলেরা'), t('Tuberculosis', 'যক্ষ্মা'), t('Polio', 'পোলিও'), t('Malaria', 'ম্যালেরিয়া')],
        correct: 2,
        explanation: [
          t('Polio is caused by the poliovirus; children are given polio drops to prevent it.', 'পোলিও পোলিও-ভাইরাস দিয়ে হয়; এটি আটকাতে শিশুদের পোলিও ড্রপ খাওয়ানো হয়।'),
          t('Cholera and tuberculosis are bacterial, and malaria is caused by a protozoan.', 'কলেরা ও যক্ষ্মা ব্যাকটেরিয়াজনিত, আর ম্যালেরিয়া প্রোটোজোয়াজনিত।'),
        ],
      },
    },
  ],
};
