'use strict';

/**
 * GK subcategories for the hand-written General Studies banks (factbank/*.js)
 * and the template generators (supplement/gs.js). Subcategory codes are the
 * ones in src/services/gkTaxonomy.js; the section headers in each bank file
 * ("// ------ Geography: rivers ------") decide the subcategory of the items
 * below them.
 *
 *   itemSubtopics(file, bank)        -> [subtopic | null] per item, or null if the
 *                                       file cannot be parsed reliably
 *   generatorSubtopic(topic, value)  -> subcategory for a generator's subtopic value
 *
 * A header with no fitting subcategory maps to null, and the item stays untagged
 * ("Other" on the progress view) rather than being put somewhere wrong.
 */

const fs = require('node:fs');

// Header → subcategory, per chapter. Matched on the lower-cased header text.
const HEADERS = {
  indian_history: {
    '1857': 'revolt_1857',
    'ancient: guptas and after': 'maurya_gupta',
    'ancient: indus valley': 'ivc',
    'ancient: jainism and buddhism': 'buddhism_jainism',
    'ancient: magadha, mauryas and after': 'maurya_gupta',
    'ancient: vedic': 'vedic',
    'art and culture': null,
    'bhakti and sufi': 'bhakti_sufi',
    'british expansion': 'company_rule',
    'buddhism, jainism, mahajanapadas': 'buddhism_jainism',
    'delhi sultanate': 'sultanate',
    'early nationalism': 'inc',
    'gandhian era': 'freedom_movement',
    'guptas and post-gupta': 'maurya_gupta',
    'marathas': 'marathas',
    'mauryas and after': 'maurya_gupta',
    'medieval: bhakti, sufi, sikh': 'bhakti_sufi',
    'medieval: mughals and surs': 'mughal',
    'medieval: vijayanagara, deccan, marathas': 'vijayanagara',
    'medieval: early invasions and delhi sultanate': 'sultanate',
    'modern: 1857 and tribal or peasant revolts': 'revolt_1857',
    'modern: congress and nationalism': 'inc',
    'modern: europeans and company rule': 'company_rule',
    'modern: gandhian era': 'freedom_movement',
    'modern: viceroys and laws': 'acts_policies',
    'modern: reform movements': 'reform_movements',
    'modern: revolutionaries': 'freedom_movement',
    'mughals': 'mughal',
    'revolutionaries': 'freedom_movement',
    'social reform and bengal renaissance': 'reform_movements',
    'south india': 'early_medieval',
    'towards independence': 'freedom_movement',
    'vedic': 'vedic',
    'vijayanagara, bahmani, deccan': 'vijayanagara',
  },
  geography: {
    'atmosphere': 'climate_soil',
    'atmosphere, weather, climate': 'climate_soil',
    'crops': 'agriculture',
    'dams and lakes': 'dams_projects',
    "earth's interior, rocks, landforms": 'physical_geography',
    'earth, latitude and time': 'physical_geography',
    'india: location and boundaries': 'physical_india',
    'india: minerals and industry': 'minerals_resources',
    'india: mountains, hills, passes': 'mountains_plateaus',
    'india: national parks': 'parks_sanctuaries',
    'india: rivers and lakes': 'rivers',
    'india: soils and crops': 'climate_soil',
    'indian physical features': 'physical_india',
    'indian rivers': 'rivers',
    'landforms': 'physical_geography',
    'minerals': 'minerals_resources',
    'monsoon': 'climate_soil',
    'mountains and passes': 'mountains_plateaus',
    'national parks': 'parks_sanctuaries',
    'oceans': 'physical_geography',
    'rocks and interior': 'physical_geography',
    'soils': 'climate_soil',
    "solar system and earth's motions": 'physical_geography',
    'winds and climate': 'climate_soil',
    'world': 'world_geography',
    'world geography': 'world_geography',
  },
  polity: {
    'amendment': 'amendments',
    'amendments': 'amendments',
    'basics and sources': 'preamble',
    'citizenship, fundamental rights, dpsp': 'fundamental_rights',
    'constitutional bodies': 'constitutional_bodies',
    'dpsp': 'dpsp_duties',
    'elections': 'elections',
    'emergency': 'federalism_emergency',
    'federalism': 'federalism_emergency',
    'finance and services': 'federalism_emergency',
    'fundamental duties': 'dpsp_duties',
    'fundamental rights': 'fundamental_rights',
    'governor and states': 'state_govt',
    'important amendments': 'amendments',
    'judiciary': 'judiciary',
    'local government': 'panchayati_raj',
    'making of the constitution': 'preamble',
    'pm and council of ministers': 'union_executive',
    'parliament': 'parliament',
    'parts and schedules': 'schedules_articles',
    'preamble': 'preamble',
    'president and vice-president': 'union_executive',
    'prime minister and council of ministers': 'union_executive',
    'schedules': 'schedules_articles',
    'sources': 'preamble',
    'state government': 'state_govt',
    'union and territory, citizenship': 'union_citizenship',
    'writs': 'judiciary',
  },
  economy: {
    'agriculture and sectors': 'agri_industry',
    'budget terminology': 'budget_tax',
    'capital market and insurance': 'financial_institutions',
    'committees': 'plans_reforms',
    'economic thought': 'basics',
    'economists and theories': 'basics',
    'external sector': 'external_sector',
    'fiscal & monetary policy': 'rbi_banking',
    'gst': 'budget_tax',
    'inflation': 'inflation_income',
    'international bodies': 'financial_institutions',
    'money and banking': 'rbi_banking',
    'niti aayog': 'plans_reforms',
    'national income and basic concepts': 'inflation_income',
    'national income concepts': 'inflation_income',
    'planning': 'plans_reforms',
    'planning history': 'plans_reforms',
    'poverty and unemployment': 'poverty_development',
    'poverty, unemployment, development': 'poverty_development',
    'public finance, budget and taxation': 'budget_tax',
    'reforms, agriculture, misc': 'agri_industry',
    'sectors': 'agri_industry',
    'taxes & gst': 'budget_tax',
  },
  banking_awareness: {
    'abbreviations': 'banking_operations',
    'accounts & products': 'banking_operations',
    'accounts and deposits': 'banking_operations',
    'bank history, mergers and headquarters': 'rbi_banking',
    'basel': 'banking_operations',
    'capital market': 'financial_institutions',
    'cheques & instruments': 'banking_operations',
    'cheques and negotiable instruments': 'banking_operations',
    'dfis, regulators, international bodies': 'financial_institutions',
    'development financial institutions & regulators': 'financial_institutions',
    'financial inclusion': 'schemes',
    'insurance': 'financial_institutions',
    'kyc, npa, basel': 'banking_operations',
    'loans, securities and npas': 'banking_operations',
    'monetary policy tools': 'rbi_banking',
    'nationalisation': 'rbi_banking',
    'payment systems': 'banking_operations',
    'rbi: law, structure, functions': 'rbi_banking',
    'reserve bank of india': 'rbi_banking',
    'schemes and currency': 'schemes',
    'types of banks': 'rbi_banking',
    'types of banks & history': 'rbi_banking',
  },
  general_science: {
    'biology': null,
    'biology: animals and ecology': 'biology_plants_animals',
    'biology: cell and classification': 'biology_cell_genetics',
    'biology: diseases and health': 'biology_diseases',
    'biology: human body': 'biology_human_body',
    'biology: nutrition': 'biology_nutrition',
    'biology: plants': 'biology_plants_animals',
    'chemistry': null,
    'chemistry: acids, bases, indicators': 'chemistry_acids_bases',
    'chemistry: common names': 'chemistry_everyday',
    'chemistry: metals, alloys, elements': 'chemistry_metals',
    'chemistry: polymers and materials': 'chemistry_everyday',
    'physics': null,
    'physics: electricity': 'physics_electricity',
    'physics: heat': 'physics_heat_light_sound',
    'physics: light': 'physics_heat_light_sound',
    'physics: mechanics and properties of matter': 'physics_mechanics',
    'physics: modern physics': 'physics_modern',
    'physics: sound': 'physics_heat_light_sound',
    'physics: units': 'physics_units',
  },
  west_bengal_gk: {
    'bengal renaissance': 'renaissance',
    'cinema': 'literature_culture',
    'colonial settlements and institutions': 'heritage_tourism',
    'crafts and gi products': 'festivals_folk',
    'culture': 'literature_culture',
    'economy': 'economy_industry',
    'festivals, music and folk forms': 'festivals_folk',
    'geography: sundarbans and coast': 'geography_rivers',
    'geography: sundarbans, hills, plateau, borders': 'geography_rivers',
    'geography: hills, forests, wildlife': 'geography_rivers',
    'geography: rivers': 'geography_rivers',
    'history: british period': 'history',
    'history: sultans and nawabs': 'history',
    'history: ancient & medieval': 'history',
    'history: revolts and peasant movements': 'history',
    'institutions & landmarks': 'heritage_tourism',
    'landmarks': 'heritage_tourism',
    'literature': 'literature_culture',
    'nationalism and revolutionaries': 'freedom_movement',
    'netaji': 'freedom_movement',
    'nobel laureates and scientists': 'personalities',
    'sports and education': 'sports',
    'state symbols': 'state_symbols',
    'tagore': 'personalities',
    'transport, industry, ports': 'economy_industry',
  },
};

// Values the template generators (supplement/gs.js) give as subtopic.
const GENERATOR = {
  'geography.capitals': 'states_capitals',
  'geography.dams': 'dams_projects',
  'geography.national_parks': 'parks_sanctuaries',
  'geography.rivers': 'rivers',
  'geography.world': 'world_geography',
  'general_science.health': 'biology_diseases',
  'general_science.discoveries': 'discoveries',
  'west_bengal_gk.districts': 'districts_admin',
};

const HEADER_RE = /^\s*\/\/\s*-{3,}\s*(.+?)\s*-{3,}\s*$/;
// An item starts with '{ d:' / '{' followed by 'd:' on the next line, or with a one-letter helper call such as Q(3, / I(2, (compact banks).
const ITEM_RE = /^\s*(?:\{\s*(?:d:|$)|[A-Z]\(\s*\d)/;

/**
 * Subcategory of each item of a bank, by the section header above it. Returns null when the
 * number of item starts found in the text differs from the bank's item count (layout not understood).
 */
function itemSubtopics(file, bank) {
  const map = HEADERS[bank.topic];
  if (!map || !Array.isArray(bank.items)) return null;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  let current = null;
  let inItems = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inItems) {
      if (/^\s*items:\s*\[/.test(line)) inItems = true;
      continue;
    }
    const h = HEADER_RE.exec(line);
    if (h) {
      const key = h[1].toLowerCase();
      current = key in map ? map[key] : null;
      continue;
    }
    if (!ITEM_RE.test(line)) continue;
    // "{" alone counts only when the next non-empty line starts an item body (d:).
    if (/^\s*\{\s*$/.test(line) && !/^\s*d:/.test(lines[i + 1] || '')) continue;
    out.push(current);
  }
  return out.length === bank.items.length ? out : null;
}

function generatorSubtopic(topic, value) {
  if (!value) return null;
  return GENERATOR[`${topic}.${value}`] ?? null;
}

module.exports = { itemSubtopics, generatorSubtopic, HEADERS };
