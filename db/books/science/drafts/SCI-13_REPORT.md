# SCI-13 — রোগ ও রোগজীবাণু (Diseases and Pathogens): Draft Report

- **Book / part / subtopic:** science / biology / `biology_diseases` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-13/chapter.json` → **OK** (no errors)

## Sources actually fetched (browser.open, 2026-11-19)

All NCERT (allowed publisher for the science profile: NCERT, IGNOU, NIOS, EPG, GOVT):

1. **s1** — Biology, Class XII, Chapter 7: Human Health and Disease — https://ncert.nic.in/textbook/pdf/lebo107.pdf
2. **s2** — Science, Class IX, Chapter 13: Why Do We Fall Ill? — https://ncert.nic.in/textbook/pdf/iesc113.pdf
3. **s3** — Science, Class VIII, Chapter 2: Microorganisms — Friend and Foe — https://ncert.nic.in/textbook/pdf/hesc102.pdf

## Counts

- **Claims:** 66 (c01–c66), every one with a verbatim quote from a fetched page above; every claim is used at least once (validator-enforced).
- **Practice questions:** 42 — basic 12, moderate 12, difficult 10, exam 8; 7 per section across all 6 sections (health_concept, pathogen_groups, bacterial_viral, protozoa_worm_fungal, transmission_prevention, immunity_aids_cancer). Formats include DIRECT, STATEMENT, MATCH, PAIRS and ASSERTION_REASON.
- **Sections:** 6, each with quick + standard + deep, plus boxes, events (3), people (4), timeline (1798 / 1929 / 1981), terms (8), cause_effect (3), exam_focus (8) and quick_revision (16).

## PYQ candidates

Found by (1) filtering `db/gk/general_science.jsonl` for `subtopic == biology_diseases` → **2 items** (GK-SCI-012, GK-SCI-013), and (2) grepping `db/pyq/*.json` for genuine disease questions → **10 items**. Total **12 candidates**, all in `pyq_map_SCI-13.json`:

- **Taught (7):** GK-SCI-012 (malaria), GK-SCI-013 (diseases & pathogens), WBPSC Miscellaneous 2023 Q17 (typhoid is water-borne), WBPSC Miscellaneous 2023 Q55 (malaria carrier), WBP Constable 2021 Q90 (dengue–Aedes), WBCS 2017 Q40 (penicillin from fungi), WBCS 2024 Q80 (antibiotics do not work on viruses).
- **Not taught (5), each with a specific reason in the map:** WBCS 2017 Q37 (bacteriophage not defined in any fetched source), WBCS 2021 Q53 (SARS-CoV-2 name not in fetched sources), WBCS 2024 Q141 (HPV not named in fetched sources), Clerkship 2023 Session II Q52 (World AIDS Day date, 1 December, not in fetched sources), IDO 2019 Q1 (conjunctivitis and whooping cough as individual diseases not in fetched sources).

## Subtopic coverage

`biology_diseases` is covered at textbook depth: health and disease concepts (acute/chronic, infectious/non-infectious), the five pathogen groups, bacterial and viral diseases (typhoid incl. Widal/Typhoid Mary, pneumonia, common cold), protozoan/helminth/fungal diseases (malaria life cycle, amoebiasis, ascariasis, filariasis, ringworm), dengue and vectors, routes of transmission (air, water, food, contact, vectors) and prevention, antibiotics and why they fail against viruses, immunity (innate/acquired, active/passive, colostrum), vaccination (principle, Jenner 1798, smallpox eradication, hepatitis B from yeast), AIDS (HIV retrovirus, transmission routes, ELISA, 1981) and cancer (benign/malignant, metastasis, tobacco carcinogens).

## Gaps (disclosed, never filled from memory)

1. **Bacteriophage** — asked in WBCS 2017; the term is not defined in any fetched NCERT page, so it is not taught and the PYQ is mapped untaught.
2. **SARS-CoV-2** — asked in WBCS 2021; fetched sources name only the disease COVID-19, not the virus's official name, so the name is not asserted.
3. **HPV / cervical cancer vaccination** — asked in WBCS 2024; HPV is not named in the fetched sources (oncogenic viruses are taught only in general terms), so the PYQ is mapped untaught.
4. **World AIDS Day (1 December)** — asked in Clerkship 2023; no fetched source gives the date, so it is not asserted in the chapter.
5. **Conjunctivitis and whooping cough as individual diseases** — appear in IDO 2019 Q1; whooping cough appears in the fetched sources only inside a vaccine list, conjunctivitis not at all, so that PYQ is mapped untaught.
6. **Widal test wording** — lebo107's Widal sentence is split across a text box in the PDF extraction ("Typhoid fever could be confirmed by" … "Widal test"); the chapter therefore mentions the test only with a pointer to GK-SCI-013 (whose bank entry carries the verified quote) and makes no standalone claim from the split extraction.
7. **Dengue pathogen detail** — the fetched sources establish dengue only as a viral, Aedes-borne disease; no dengue virus name or serotype is asserted.
8. No WBBSE source was used: the science validator profile does not admit WBBSE, and the chapter is NCERT-only by design.
