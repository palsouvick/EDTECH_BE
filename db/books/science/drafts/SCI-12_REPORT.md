# SCI-12 — পুষ্টি ও ভিটামিন (Nutrition & Vitamins) — Draft Report

- **Book / chapter:** science, SCI-12, part `biology`, subtopic `biology_nutrition` (title/part/subtopics verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Deliverables:** `chapter.json`, `pyq_map_SCI-12.json`, this report — in `~/workspace/edtech/bookwork/sci-12/`
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (run 2026-11-19)

## Sources actually fetched (browser.open, verbatim quotes taken)

1. **NCERT, Curiosity: Textbook of Science, Grade 6, Chapter 3 — "Mindful Eating: A Path to a Healthy Body"**
   https://ncert.nic.in/textbook/pdf/fecu103.pdf
   Nutrients, energy/body-building/protective foods, nutrient tests, Fig. 3.5 vitamin–mineral chart, scurvy & goitre cases, balanced diet, roughage, water, millets, junk food, Coluthur Gopalan box.
2. **NCERT, Chemistry Part II, Class XII, Unit 10 — Biomolecules (§10.4 Vitamins, Table 10.3; hormone passage on iodine)**
   https://ncert.nic.in/textbook/pdf/lech205.pdf
   Vitamin definition, fat/water-soluble classification, full sources-and-deficiency table for A, B1, B2, B6, B12, C, D, E, K; iodine–hypothyroidism–iodised salt.
3. **IGNOU (eGyanKosh), Nutrition Unit 16 — "The Micronutrients I: Vitamins"**
   https://egyankosh.ac.in/bitstream/123456789/118038/1/Unit-16.pdf
   Retinol/beta-carotene, sunshine vitamin, mineralization, vitamin K as anti-bleeding vitamin + prothrombin, vitamin E protection role, B-complex membership, thiamin function, polished rice, folic acid, B12/cobalamin storage exception, vitamin C "fresh food vitamin" + amla 20×, sprouting/fermentation, niacin from tryptophan.

All three URLs belong to publishers allowed for the science profile (NCERT, IGNOU). No other source was used.

## Counts

- **Claims:** 66 (c01–c66), every one with a verbatim quote from a fetched page above; every claim is referenced by at least one section/block/question (validator-verified, 0 unused).
- **Questions:** 42 — basic 11, moderate 15, difficult 9, exam 7 (MATCH ×2, STATEMENT ×2, ASSERTION_REASON ×2, PAIRS ×1); all 6 sections tested.
- **Sections:** 6 — nutrients_basics, vitamins_intro, fat_soluble, water_soluble, minerals_deficiency, balanced_diet.

## PYQ candidates

Found **9** real candidates; **7 taught, 2 untaught** (details in `pyq_map_SCI-12.json`):

- From `db/gk/general_science.jsonl` (subtopic `biology_nutrition`): GK-SCI-011 (taught), GK-SCI-022 (**untaught in part** — see gaps), GK-SCI-101 (taught).
- From `db/pyq/*.json` (genuinely on this chapter's topic): IDO-2019-Q5 riboflavin (taught), IDO-2019-Q76 protein-energy malnutrition → marasmus (**untaught** — see gaps), KP-CONSTABLE-2023-Q74 goitre (taught), WBCS-EXE-PRELIMS-2018-PRELIMS-Q47 vitamin D/rickets (taught), WBCS-EXE-PRELIMS-2022-PRELIMS-Q84 vitamin K/clotting (taught), WBPSC-CLERKSHIP-2023-SESSION-3-Q53 night blindness (taught).
- KP-2023-Q43 (ribosome/protein synthesis) was found by keyword grep but belongs to cell biology (SCI-10), not nutrition — excluded.

## Subtopic coverage

`biology_nutrition` covered: nutrient classes and food tests; vitamin definition and solubility classification; fat-soluble A/D/E/K and water-soluble B-complex/C with sources, sourced chemical names and deficiency diseases; minerals calcium/iron/iodine and their deficiency disorders; balanced diet, roughage, water, millets/nutri-cereals, junk food; Indian nutrition history (Lind 1746, goitre survey 1960s, Gopalan, Mid Day Meal 2002/PM POSHAN).

## Gaps (disclosed, never filled from memory)

1. **Chemical names Calciferol (vitamin D), Tocopherol (vitamin E), Phylloquinone (vitamin K)** — asserted by bank item GK-SCI-022, but no verbatim quote could be fetched from any allowed publisher (NCERT lech205 Table 10.3 gives no chemical names for D/E/K; IGNOU Unit 16 does not name them either; NIN/FAO pages are outside the allowed publisher list). These three names are **not taught** in the chapter; GK-SCI-022 is mapped `taught: false` for this reason. A future pass with an allowed source (e.g. an e-PG Pathshala biochemistry module) can close this.
2. **Marasmus / kwashiorkor** (IDO-2019-Q76) — the chapter teaches protein-energy deficiency generally (fecu103, Gopalan surveys) but the syndrome names appear in no fetched allowed source, so the item is mapped `taught: false`.
3. **Pellagra (niacin deficiency)** and vitamin B3 numbering — niacin is taught only as a B-complex member that can form from tryptophan; its deficiency disease is not in the fetched sources and is not taught.
4. Fig. 3.5 (fecu103) is a chart; its cell text extracts as fragments, so the four chart claims (c28–c31) carry short verbatim cell quotes rather than full sentences — flagged for the blind-check stage to verify against the printed chart.
