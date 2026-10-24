'use strict';

/**
 * Pattern-tagging rules for the General Studies chapters (see src/services/patternTagger.js).
 * Key order = priority. Subtopic rules win over stem rules.
 *
 * Precision first: GS banks ask many one-off facts that no pattern describes
 * (state capitals, national parks, dams, element symbols, "who wrote" ...).
 * Those stay untagged on purpose. current_affairs has no patterns.
 */

module.exports = {
  indian_history: {
    battles_years: {
      stem: [
        /^(?!.*\bbanks of\b).*\b[Bb]attle\b/,
        /\bwar of succession\b/i,
        // chronology items whose year is a famous battle year
        /^Which of the following events occurred in (?:1191|1192|1526|1527|1539|1540|1556|1565|1576|1757|1760|1761|1764)\?/,
      ],
    },
    governor_general_events: {
      stem: [
        /^(?!.*\b(?:free|independent) India\b).*\b(?:Governor[- ]General|Viceroys?|viceroyalty)\b/i,
        /^The (?:Permanent Settlement|Mahalwari system|Dual Government)\b[^?]*\bintroduced by:?$/i,
        /^Who announced the Partition of Bengal\b/i,
      ],
    },
    reform_founders: {
      stem: [
        /^(?!.*\bat:?$)(?!.*\b(?:dynasty|Sultanate|Empire|University|settlement)\b).*\b(?:Samaj|Sabha|Mission|Society|Samit[iy]|Yogam|Movement|Party|League|Bloc|Khalsa|order|Abhinav Bharat)\b.*\b(?:founded|founder|formed|established)\b/i,
        /^(?!.*\bat:?$)(?!.*\b(?:dynasty|Sultanate|Empire|University)\b).*\b(?:founded|founder of|formed|established)\b.*\b(?:Samaj|Sabha|Mission|Society|Samit[iy]|Yogam|Movement|Party|League)\b/i,
        /\bfounder of the Indian National Congress\b/i,
      ],
    },
    freedom_movement_dates: {
      stem: [
        /^(?!.*\bBattle\b).*\b(?:In which year|When (?:was|did|were)|in the year\b|year\?)[^?]*\b(?:Cabinet Mission|Cripps Mission|Dandi March|Jallianwala|Partition of Bengal|Poona Pact|Indian National Congress|Non-Cooperation|Civil Disobedience|Quit India|Simon Commission|Gandhi-Irwin Pact|Montagu-Chelmsford|Swadeshi|Khilafat|Lucknow Pact|Home Rule|Great Revolt|Carlyle Circular)\b/i,
        /\b(?:Montagu-Chelmsford Reforms|Poona Pact)\b[^?]*\bin the year\b/i,
        /^When (?:was )?(?:the )?(?:Gandhi-Irwin Pact|'Carlyle Circular')/i,
        /^Which of the following events occurred in (?:1857|1885|1905|1919|1920|1930|1932|1942|1946)\?/,
      ],
    },
    buddha_mahavira_places: {
      stem: [
        /^(?!.*\bis called\b).*\b(?:Buddha|Mahavira)\b.*\b(?:born|enlightenment|sermon|died|death|nirvana)\b/i,
      ],
    },
    // not tagged: literature ("Who wrote ..."), dynasties, monuments, travellers,
    // inscriptions and similar one-off facts – no history pattern describes them
  },

  geography: {
    tropic_of_cancer_states: {
      stem: [/^(?!.*\bcontinent\b).*\bTropic of Cancer\b/i, /\bIndian Standard Time\b/i, /\bStandard Meridian\b/i],
    },
    atmosphere_layers: {
      stem: [
        /\b(?:troposphere|stratosphere|mesosphere|thermosphere|ionosphere|exosphere|tropopause|ozone layer)\b/i,
        /\blayer of the atmosphere\b|\batmospheric layer\b/i,
      ],
    },
    planets_solar_system: {
      stem: [/\bplanets?\b/i, /\b(?:Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune)\b/],
    },
    soils_and_crops: {
      stem: [/\bsoils?\b/i, /\b(?:Khadar|Bhangar|Regur)\b/],
    },
    rivers_of_india: {
      stem: [
        /^(?!.*\b(?:Nile|Amazon|world|Bangladesh)\b).*\b(?:river|rivers|Ganga|Indus|Godavari|Krishna|Kaveri|Narmada|Brahmaputra|Bhagirathi|Alak[a]?nanda|Teesta|Koel|Mahanadi|Tapi|Yamuna)\b.*\b(?:originates?|rises?|source|flows?|tributar(?:y|ies)|confluence|meet|mouth|known as)\b/i,
        /\b(?:Alak[a]?nanda|Bhagirathi)\b.*\b(?:confluence|meet)\b/i,
      ],
    },
    // not tagged: capitals, world capitals, national parks, dams, "city on the
    // banks of which river", mountain passes, minerals – no geography pattern
  },

  polity: {
    which_article: {
      subtopics: ['articles'],
      stem: [
        /\bwhich Articles?\b/i,
        /^Article \d+\w* of the\b/i,
        /\bWhich Directive Principle Article\b/i,
        // "... is provided under:" / "... is guaranteed by:" – the options are Article numbers
        /\b(?:is|are) (?:provided|guaranteed) (?:under|by):?$/i,
        /\b(?:is|a Directive Principle) under:?$/i,
      ],
    },
    amendments: {
      stem: [
        /\bby which (?:Constitutional )?Amendment\b/i,
        /^Which (?:of the following )?(?:Constitutional )?Amendments?\b/i,
        /\bWhich Constitutional Amendment\b/i,
        /^(?:The )?\d+(?:st|nd|rd|th) (?:Constitutional )?Amendment\b/i,
        /\b(?:by|Under) the \d+(?:st|nd|rd|th) Amendment\b/i,
        /\bconstitutional amendments? gives?\b/i,
      ],
    },
    borrowed_features: {
      stem: [
        /\bborrowed from\b/i,
        /\binspired by(?: the constitution of)?\b/i,
        /\bbased on the system of which country\b/i,
        /\bfeature borrowed\b/i,
        /\bmain source of the structural part\b/i,
      ],
    },
    fr_vs_dpsp: {
      stem: [
        /\b(?:Fundamental Rights|Directive Principles(?: of State Policy)?|Fundamental Duties) are (?:contained|listed) in which Part\b/i,
        /\bWhich of the following is (?:NOT )?a (?:Fundamental Right|Directive Principle|Fundamental Duty)\b/i,
      ],
    },
    who_appoints: {
      stem: [
        /^Who (?:appoints|can dissolve|removes|elects)\b/i,
        /\b(?:is|are) (?:appointed|elected) by:?$/i,
        /\bcan be removed from office by:?$/i,
        /\bremoved from office in the same manner as\b/i,
        /\bholds office during the pleasure of\b/i,
      ],
    },
  },

  economy: {
    planning_in_india: {
      stem: [
        /\bFive[- ]Year Plans?\b/i,
        /\bPlan(?:s| Holiday)?\b/, // "Bombay Plan", "Rolling Plan", "which Plan?" (capital P only)
        /\bPlanning Commission\b|\bNITI Aayog\b|\bNational Development Council\b|\bNational Planning Committee\b/i,
        /\bPlanned Economy for India\b|\bfather of Indian planning\b/i,
      ],
    },
    direct_indirect_tax: {
      stem: [/\b(?:direct|indirect) tax\b/i, /\bGST\b/, /\bGoods and Services? Tax\b/i, /\bVAT\b/],
    },
    sectors_of_economy: {
      stem: [
        /\bbelong to which sector\b|\b(?:are )?part of which sector\b/i,
        /\b(?:primary|secondary|tertiary|quaternary) sector\b/i,
        /^Knowledge-based activities\b/i,
      ],
    },
    international_organisations: {
      stem: [
        /\b(?:WTO|World Trade Organi[sz]ation|IMF|International Monetary Fund|World Bank|ADB|Asian Development Bank|AIIB|Asian Infrastructure Investment Bank|Bank for International Settlements|New Development Bank|GATT)\b/,
        /\b(?:Special Drawing Right)\b/i,
      ],
    },
    economic_terms: {
      stem: [
        // describes a situation and asks for the term
        /^(?!.*\b(?:Who|which committee|which year|in which year|Plan)\b).*\b(?:is|are) (?:called|known as|termed)(?: a| an| the)?:?$/i,
        /^(?!.*\bWho\b).*\bit is called:?$/i,
        // gives the term and asks its meaning
        /^(?:Inflation|Stagflation|Devaluation of a currency|Fiscal deficit|Revenue deficit|Primary deficit|Effective revenue deficit|Real GDP|GDP deflator|Personal disposable income|Per capita income|Fiscal policy|Balance of trade|Core inflation|"Green GDP"|"Twin deficits"|"Deficit financing"|GNP|NNP at factor cost|Net National Product|Net Domestic Product|GDP at market prices)\b/i,
        /^What does GDP measure\?/i,
        /\b(?:A|The) (?:Gini coefficient|Laffer curve|Phillips curve)\b/i,
        /\bdescribes a 'bear market'|\ba "bull market" refers to\b/i,
        /\bIn national income accounting\b/i,
      ],
    },
  },

  general_science: {
    vitamin_deficiency: {
      stem: [/\bvitamins?\b/i, /\b(?:Rickets|Scurvy|Beriberi|Pellagra|Night blindness|Pernicious anaemia|Delayed blood clotting)\b/i],
    },
    si_units: {
      subtopics: ['physics'],
      stem: [
        /\bSI (?:base )?units?\b/i,
        /^(?!.*\bfunctional unit\b).*\bunits? (?:of|used to measure)\b/i,
        /\b(?:is|are) (?:commonly )?(?:measured|expressed) in:?$/i,
        /\bcommercial unit of\b/i,
        /^(?:1 kilowatt-hour|One horsepower)\b/i,
      ],
    },
    chemical_names: {
      stem: [
        /\bchemical (?:name|formula)\b/i,
        /\bis chemically\b|^Chemically,/i,
        /\bcommon name of\b/i,
        /^(?:Blue vitriol|Dry ice|Laughing gas)\b/i,
      ],
    },
    human_body_superlatives: {
      stem: [/\b(?:largest|smallest|longest|shortest|hardest|strongest|biggest)\b[^?]*\bhuman body\b/i],
    },
    disease_causes: {
      stem: [
        /^(?!.*\bdeficiency\b).*\bis caused by(?: a)?:?$/i,
        /\b(?:spread|transmitted) by\b/i,
        /\bcaused by a (?:virus|bacterium|protozoan?)\b/i,
      ],
    },
    // not tagged: element symbols (chemistry subtopic), discoveries/inventors, and
    // general physics/biology facts – no general-science pattern describes them.
    // The "health" subtopic is not used as a whole: it mixes iodine/iron deficiency
    // (not vitamins) with vitamin ones; the stem rules pick the vitamin ones.
  },

  banking_awareness: {
    banking_abbreviations: {
      stem: [/\bstands? for\b/i, /\bfull form\b/i],
    },
    rbi_facts: {
      stem: [
        /\b(?:Reserve Bank of India|RBI)\b[^?]*\b(?:established|set up|nationalised|started functioning|central office|recommendation)\b/i,
        /\bfirst (?:Indian )?Governor of the (?:RBI|Reserve Bank)/i,
        /\bWho appoints the Governor of the Reserve Bank\b/i,
        /\bfunctions? of the RBI\b/i,
        /"Banker's Bank"|\blender of last resort\b/i,
        /\bDeputy Governors\b/,
        /\bsole right to issue bank notes\b|\bpromissory note payable to bearer on demand\b/i,
        /\bissuing currency notes\b/i,
        /\bissued by the Ministry of Finance and not by the RBI\b/i,
      ],
    },
    monetary_policy_tools: {
      stem: [
        /\b(?:repo rate|reverse repo|Bank Rate|Cash Reserve Ratio|CRR|Statutory Liquidity Ratio|Open Market Operations|Marginal Standing Facility|Liquidity Adjustment Facility|policy rate corridor)\b/i,
        /\b(?:qualitative|selective) (?:\(selective\) )?(?:tool|instrument) of credit control\b/i,
        /\bTo control (?:high )?inflation, the RBI\b/i,
        /\bWhen the RBI (?:buys|sells)\b/i,
      ],
    },
    bank_nationalisation: {
      stem: [
        /^(?!.*\b(?:insurance|Reserve Bank|RBI)\b).*(?:\bbanks? (?:were |was )?nationalised\b|\bnationalisation\b)/i,
        /\b(?:Imperial Bank|State Bank of India|Bank of Bengal)\b/i,
        /\bSBI\b/,
      ],
    },
    development_institutions: {
      stem: [
        /^(?!.*\b(?:headquarter\w*|stands? for|full form)\b).*\b(?:NABARD|SIDBI|EXIM|National Housing Bank|NHB|SEBI|IRDAI|PFRDA)\b/i,
        /\bWhich body regulates\b|\bWhich regulator oversees\b/i,
        /\b(?:regulated|supervised|maintained) by:?$/i,
        /\bapex development bank\b/i,
        /\bcredit insurance to Indian exporters\b/i,
      ],
    },
  },

  west_bengal_gk: {
    folk_culture: {
      stem: [
        /\b(?:Chhau|Jhumur|Bhawaiya|Gambhira|Bhatiyali|Raibenshe|Tusu|folk)\b[^?]*\b(?:district|region|part of West Bengal|associated with|popular in)\b/i,
      ],
    },
    wb_rivers_nature: {
      stem: [
        /^(?!.*\b(?:hill town|inscription|headquarters)\b).*\b(?:rivers?|Teesta|Damodar|Hooghly|Haldi|Rupnarayan|Kasai|Keleghai)\b/i,
        /\bhighest peak\b|\bSandakphu\b|\bTiger Hill\b/i,
        /\b(?:National Park|Tiger Reserve|Sundarbans|Ajodhya Hills|plateau|Dooars)\b/i,
      ],
    },
    famous_bengalis: {
      stem: [
        /\b(?:written|composed|created|directed|invented|discovered|started|painted) by(?: whom)?\??:?$/i,
        /\bwas written by whom\?$/i,
        /\bis the work of which poet\b/i,
        /^Which (?:poet|educationist|freedom fighter|singer|journalist|Bengali film actor)\b/i,
        /^Who (?:introduced|gave|is called|led the Raksha Bandhan)\b/i,
        /\b(?:Tagore|Rabindranath|Bankim|Vidyasagar|Rammohan|Vivekananda|Jagadish Chandra Bose|Prafulla Chandra Ray|Satyajit Ray|Sarat Chandra|Mukundaram|Ramprasad|Tarashankar|Abhijit Banerjee|Upendranath Brahmachari)\b[^?]*\b(?:for which work|for work on|famous for|known for|invented|discovering|discovered|pen name|title|first Bengali novel|first film|novel by|literary monthly|background of|received the Jnanpith)\b/i,
        /\bwas a famous\b/i,
        /\bnamed after which Kolkata physicist\b/i,
        /\bthrough the efforts of whom\b/i,
      ],
    },
    bengal_history_dates: {
      stem: [
        /\bin which year\b|\bwhich year\?|\bwhich date\b/i,
        /^(?!.*\b(?:Nobel|Bharat Ratna|Oscar|Award|canonised)\b).*\b(?:founded|established|set up|opened|formed|commissioned|merged|transferred|published|launched|started|fought|adopted|renamed)\b[^?]*\b(?:in|on):?$/i,
        /\b(?:founded|established)\b[^?]*\bby(?: whom)?\??:?$/i,
        /\b(?:founded|established)\b[^?]*\bby which (?:Governor-General|scientist)\b/i,
        /\bfounded by Surendranath Banerjea and:?$/i,
        /\bfounder of Calcutta\b/i,
        /^Who (?:was|became) the first (?:Mayor|Vice-Chancellor|principal|Chief Minister)\b/i,
      ],
    },
    places_famous_for: {
      stem: [
        /^(?!.*\b(?:headquarters|belonged|born|died|killed)\b).*\b(?:in which (?:district|town)|which district|which town|which hill town|which place|which Kolkata temple)\b/i,
        /\bis in:?$|\bis located (?:in|at):?$|\blocated at:?$/i,
        /\b(?:craft of|belong to|grown mainly in):?$/i,
        /\b(?:Queen of the Hills|Land of White Orchids)\b/i,
        /\boldest coalfield\b/i,
      ],
    },
    // not tagged: district headquarters (districts subtopic), state symbols, and
    // other one-off facts
  },
};
