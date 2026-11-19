# SAF-03 — অগ্নি নিরাপত্তা (Fire Safety) — Draft Report

Chapter: SAF-03, book `industrial_safety`, part `workplace`, subtopics `["fire_safety"]` (verbatim from `db/books/industrial_safety/toc.js`). Status DRAFT, verification UNVERIFIED.

## Sources actually fetched (browser.open, all allowed publishers for this book: GOVT)

1. **The Factories Act, 1948 — full Act text (Act 63 of 1948), Government of India (S3WAAS)**
   https://cdn.s3waas.gov.in/s3bf62768ca46b6c3b5bea9515d1a1fc45/uploads/2025/07/17538667858907.pdf
   — Sections 7A, 37, 38, 40B, 41B, 88, 88A, 92; arrangement of sections (Chapter IV).
2. **Abstract of Factories Act, 1948 and the Delhi Factories Rules, 1950 (Form No. 20) | Labour Department, Government of NCT of Delhi**
   https://labour.delhi.gov.in/it/form-no20
   — Item 27 (Section 38 abstract: outward-opening doors, marked exits, audible warning, >20-workers-above-ground-floor training threshold); Item 37 (explosion/fire as notifiable accident).
3. **Handbook Series on Fire Safety: Industrial Buildings | Gujarat Institute of Disaster Management (GIDM), June 2022**
   https://gidm.gujarat.gov.in/sites/default/files/Handbook-Industrial-Buildings-Eng.pdf?download=true
   — Fire triangle, IS 15683:2018 five classes (A/B/C/D/F), extinguishment principles (starvation/smothering/cooling), four common extinguisher types, industrial fire causes, drills/assembly point, dial 101, Stop-Drop-Roll, ELCB/MCB, FSC, IS 2190.
4. **West Bengal Factories Rules, 1958 — Amendment Notification incl. Rule 62 Schedule-I, The Calcutta Gazette Extraordinary, 12 December 1991 | Directorate of Factories, Government of West Bengal**
   https://factories.wb.gov.in/main/files/contents/rules/5_factories_rules_1991.pdf
   — Schedule-I: classes A–E with suitable appliances; 9-litre bucket per 100 sq m; 1 extinguisher per 6 buckets; 15 m maximum travel; 750 mm mounting height; two 2 kg CO₂/dry-powder extinguishers within 15 m of electrical apparatus; light/ordinary/extra hazard; illuminated exits; spontaneous-ignition storage ≥10 m.
5. **Acts & Rules Master List | Silpasathi, Government of West Bengal**
   https://silpasathi.wb.gov.in/eodb-acts-rules-master-list
   — Sl. 5 (West Bengal Fire Services Act, 1950; Fire Prevention & Fire Safety Rules, 2003; Fire License Rules, 2004) and Sl. 8 (Factories Act, 1948 + West Bengal Factories Rules, 1958).

## Counts

- Claims: **52** (c01–c53, with c17 not used; every claim carries a verbatim quote from a fetched page above and is referenced by at least one section/event/person/cause-effect/question).
- Practice questions: **42** — basic 12, moderate 17, difficult 7, exam 6 (DIRECT, STATEMENT, PAIRS, MATCH, ASSERTION_REASON, CHRONOLOGY all represented); every one of the 6 sections is tested.
- Sections: 6 (fire_triangle, fire_classes_india, extinguishers, factories_act_fire, prevention_explosion, escape_drill_reporting), each with quick/standard/deep and a box.

## PYQ candidates

- GK bank (`db/gk/industrial_safety.jsonl`): 14 items total; exactly **1** has subtopic `fire_safety` — **GK-SAF-006** (fire triangle + NFPA classes A/B/C/D/K). Mapped in `pyq_map_SAF-03.json` to section `fire_classes_india`, **taught: false** — its triangle part is taught, but its class answers are NFPA-keyed (C = electrical, K = cooking, wet chemical), which contradicts the Indian systems this chapter is sourced on (IS 15683: C = gas, F = cooking; WB Rules: E = electrical). No allowed-publisher source stating the NFPA mapping was fetched, so it is disclosed, not taught.
- Exam PYQ corpus (`db/pyq/*.json`): full-text search for fire/extinguisher/আগুন/অগ্নি returned only false positives (firing of bullets, "Wings of Fire", fire insurance, idioms). **No genuine fire-safety PYQ exists in the corpus**, so no corpus codes were mapped.

## Subtopic coverage

`fire_safety` covered in full from the fetched sources: fire triangle and extinguishment principles; Indian fire classes (IS 15683:2018 and WB Factories Rules A–E) with matched extinguishers; extinguisher provision scales (buckets, travel distance, mounting height, electrical-room rule, hazard grades); Factories Act Sections 38, 37, 7A, 40B, 41B, 88, 88A, 92; escape/drill/reporting practice; West Bengal fire-law framework (Fire Services Act 1950, Rules 2003/2004, Factories Rules 1958).

## Gaps (disclosed, never filled from memory)

1. **NFPA class system (A/B/C/D/K) and wet-chemical extinguishers**: present in GK-SAF-006 but no GOVT/NCERT/NIOS source fetched states them; the chapter teaches the Indian systems only and warns about the letter difference. If a later stage fetches an official Indian document reproducing NFPA letters, this can be added.
2. **Ignition temperature / combustion definitions from NCERT Class 8 Science (Combustion and Flame)**: the NCERT PDF URL could not be obtained verbatim through search in this run, so no NCERT source was used; the fire-science part rests on the GIDM handbook instead.
3. **Extinguisher colour codes (label bands) and PASS technique**: widely taught, but no fetched allowed-publisher page in this run states them verbatim; left out rather than asserted.
4. **National Building Code Part 4 occupancy detail beyond Group G**: the GIDM handbook's Part B detail was only sampled; the chapter uses only the handbook passages actually read (extinguishers as first line of defence, IS 2190 reference, FSC).
5. **West Bengal Fire Services Act section-level detail** (e.g. FSC under Section 11C, 14.5 m high-rise threshold): found only in non-government secondary sources; the chapter states only what the Silpasathi master list itself lists (Act name/year and the 2003/2004 Rules).
6. The 1991 Gazette PDF is a poor OCR scan; Schedule-I quotes reproduce the fetched extraction verbatim, including its OCR artefacts (e.g. "carbondioxide", "chemica's") — a blind-check stage should verify these against the printed Gazette before publication.
