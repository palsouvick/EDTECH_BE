# SCI-14 উদ্ভিদ ও প্রাণীজগৎ — Draft Report

- Chapter: SCI-14, part `biology`, subtopic `biology_plants_animals` (title/part/subtopics verbatim from `science/toc.js`).
- Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser text-fetch, all NCERT — allowed publisher for the science profile)

1. Science, Class VII, Ch. 1 Nutrition in Plants — https://ncert.nic.in/textbook/pdf/gesc101.pdf
2. Science, Class VII, Ch. 2 Nutrition in Animals — https://ncert.nic.in/textbook/pdf/gesc102.pdf
3. Science, Class X, Ch. 5 Life Processes — https://ncert.nic.in/textbook/pdf/jesc105.pdf
4. Biology, Class XI, Ch. 4 Animal Kingdom — https://ncert.nic.in/textbook/pdf/kebo104.pdf
5. Science, Class X, Ch. 7 How do Organisms Reproduce? — https://ncert.nic.in/textbook/pdf/jesc107.pdf
6. Science, Class X, Ch. 6 Control and Coordination — https://ncert.nic.in/textbook/pdf/jesc106.pdf

Fetch failures (not retried, per tool guidance): Class XI Plant Kingdom (kebo103.pdf) and Morphology of Flowering Plants (kebo105.pdf) — both returned upstream fetch errors. Consequences are listed under Gaps.

## Counts

- Claims: **51**, every one with a verbatim quote from a fetched page above; all 51 are used by sections/blocks/questions.
- Practice questions: **42** (basic 13, moderate 13, difficult 10, exam 6), across all 6 sections; formats include DIRECT, STATEMENT, MATCH, PAIRS, ASSERTION_REASON, CHRONOLOGY.
- Sections: 6 — plant_nutrition, plant_transport, plant_reproduction, animal_classification, vertebrate_classes, animal_life.

## PYQ candidates

- Found: **28** — 2 GK bank items with subtopic `biology_plants_animals` in `db/gk/general_science.jsonl` (GK-SCI-016, GK-SCI-023) + 26 real exam questions grepped from `db/pyq/*.json` on this chapter's topic.
- Mapped: 28/28 in `pyq_map_SCI-14.json`. Taught: **10** (GK-SCI-016; Misc-2023-Q41; WBCS 2017-Q29, 2018-Q167, 2022-Q153, 2023-Q136, 2024-Q74, 2024-Q163; Clerkship-2023-S1-Q95; KP-2023-Q26). Untaught: 18, each with a specific reason in the map.

## Subtopic coverage

Photosynthesis & plant nutrition modes (autotroph/parasite/insectivorous/saprotroph), plant transport (xylem/phloem/translocation/transpiration/stomata), plant reproduction (vegetative propagation), plant hormones & tropisms, animal classification (levels of organisation, phyla, notochord, metamerism), vertebrate classes (heart chambers, warm/cold-blooded, exceptions: crocodile, platypus), animal feeding diversity (ruminants, Amoeba, starfish).

## Gaps (disclosed, never filled from memory)

- **Chlorophyll's magnesium centre** (WBCS 2016 Q103, WBP 2021 Q31): not stated in any fetched chapter — untaught.
- **Pneumatophores, turmeric rhizome, root modifications/vegetables, plant-kingdom classification**: need kebo105/kebo103, which could not be fetched — untaught (IDO-2019-Q53, Misc-2023-Q58, WBCS-2024-Q82).
- **Gibberellin breaking seed dormancy** (WBCS 2023 Q56): fetched text teaches gibberellin only for stem growth — the dormancy function is untaught.
- **Photoperiodism** (WBCS 2016 Q108), **capillary soil water** (WBCS 2024 Q172), **Peripatus living fossil** (WBCS 2022 Q81), **stele** (WBCS 2017 Q38), **latest phylum** (WBCS 2017 Q30), **entomology term** (Misc-2023-Q19), **penicillin's fungal source** (WBCS 2017 Q40): absent from fetched sources — untaught.
- Out-of-scope PYQs mapped with their primary chapter: Mendel/incomplete dominance → SCI-10; cranial nerves → SCI-11; Nipah reservoir → SCI-13.
- GK-SCI-023 is only partly taught: its animal records (blue whale, Gangetic dolphin 2009, peacock 1963) have no fetched source, so the item is marked untaught.
- `people` is an empty array (no biologist is named in the fetched chapters); `timeline` carries the honest equivalent for a non-dated book — the four levels of animal organisation in order.
