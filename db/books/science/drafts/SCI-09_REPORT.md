# SCI-09 — দৈনন্দিন জীবনে রসায়ন (Chemistry in Everyday Life) — Draft Report

- **Chapter:** SCI-09, book `science`, part `chemistry`, subtopic `chemistry_everyday` (title/part/subtopics verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-09/chapter.json` → **OK**
- **Counts:** 76 claims, 43 practice questions (basic 10, moderate 16, difficult 10, exam 7; formats DIRECT 36, STATEMENT 2, ASSERTION_REASON 1, MATCH 4), 8 sections, 16 terms, 3 cause–effect chains, 14 quick-revision points.

## Sources actually fetched (browser.open, verbatim quotes taken from the fetched text)

1. **NIOS Senior Secondary Chemistry (313), Lesson 30: Drugs and Medicines** — https://digital.nios.ac.in/content/313en/313_Chemistry_Eng_Lesson30.pdf — fetched in full (1,469 lines). Claims c01–c32.
2. **NIOS Senior Secondary Chemistry (313), Lesson 31: Soap, Detergents and Polymers** — https://digital.nios.ac.in/content/313en/313_Chemistry_Eng_Lesson31.pdf — fetched (2,827 lines; cleansing agents, polymers, rubber, biodegradability read in full). Claims c33–c50.
3. **NCERT Science, Class X, Ch. 4: Carbon and its Compounds** (jesc104) — https://ncert.nic.in/textbook/pdf/jesc104.pdf — fetched in full; soap/detergent/ester passages read closely. Claims c51–c56.
4. **NCERT Science, Class X, Ch. 1: Chemical Reactions and Equations** (jesc101) — https://ncert.nic.in/textbook/pdf/jesc101.pdf — fetched in full; whitewash, quick lime/cement, corrosion and rancidity passages read closely. Claims c57–c63.
5. **NCERT Science, Class VII, Ch. 5: Physical and Chemical Changes** (gesc105) — https://ncert.nic.in/textbook/pdf/gesc105.pdf — fetched; baking-soda identity, CO₂–limewater test, medicines/plastics/detergents passage. Claims c64–c66.
6. **NCERT Science, Class X, Ch. 2: Acids, Bases and Salts** (jesc102) — https://ncert.nic.in/textbook/pdf/jesc102.pdf — **direct browser.open failed on this machine (network error, not retried)**. Its §2.4 salts text was read via the browser search tool's fetched copy of the same NCERT chapter, and every jesc102 quote used (c67–c76) was cross-checked verbatim against the project-verified GK bank item GK-SCI-008, which quotes this exact PDF. This limitation is disclosed here and in the chapter's verification notes.

Failed fetches (not retried, per tool guidance): jesc102.pdf (above), kech207.pdf / kech2ps.pdf (Class XII Chemistry in Everyday Life — wrong/unreachable codes on this machine), gesc104.pdf, kech110.pdf, jesc103.pdf, and two guessed digital.nios.ac.in secondary-science URLs (404). The NIOS 313 Module 8 lessons (30–31) cover the same "Chemistry in Everyday Life" syllabus ground as the unreachable NCERT Class XII unit, so the chapter's scope was built on them plus NCERT Class VII/X.

## PYQ candidates

- **GK bank (`general_science.jsonl`, subtopic `chemistry_everyday`):** exactly **1** item — GK-SCI-008 (salts family). Mapped to `common_salts`, **taught**.
- **PYQ corpus (`db/pyq/*.json`) grep for genuinely on-topic items:** **10** real items found (WBCS Prelims 2015 Q108 & Q115, 2017 Q40, 2018 Q38, 2019 Q131/Q138/Q139, 2023 Q184; IDO 2019 Q28 & Q91).
- **Total candidates: 11 — mapped 11, taught 6, untaught 5** (each untaught item carries its specific reason in `pyq_map_SCI-09.json`).

## Subtopic coverage (`chemistry_everyday`)

Taught in full: medicine classes (antipyretics, analgesics, antimalarials, antihistamines, tranquilizers, contraceptives), antacids, antiseptics vs disinfectants, antibiotics (penicillin, broad/narrow spectrum), food preservatives, antioxidants, artificial sweeteners, soaps & detergents (micelles, saponification, hard water), polymers & plastics (polyethene, PVC, Teflon, terylene, nylon-66, rubber/vulcanization, biodegradability), common-salt family (baking soda, washing soda, bleaching powder, Plaster of Paris, chlor-alkali), everyday oxidation (corrosion, whitewash chemistry, rancidity).

## Gaps (disclosed, never filled from memory)

1. **Cement composition** (calcium silicates/aluminates; limestone as main ingredient) — no fetched allowed source states it; only CaO's use in cement manufacture is taught (c59). Two PYQs (IDO-2019-Q28, WBCS-2019-Q139) marked untaught.
2. **Fertiliser nitrogen percentages** (urea ~46%) — not in any fetched source; WBCS-2019-Q131 untaught.
3. **Toothpaste is basic / pH in everyday life** — sits in NCERT jesc102 §2.3, which could not be fetched directly (see source 6 note); WBCS-2019-Q138 untaught rather than asserted from an unverified quote.
4. **HF cannot be stored in glass** — not in any fetched source; WBCS-2015-Q108 untaught.
5. **NCERT Class XII "Chemistry in Everyday Life" unit** (kech) could not be fetched on this machine; the equivalent NIOS 313 Module 8 lessons were used instead. Drug content beyond NIOS L30's scope (e.g. ranitidine/cimetidine mechanism, specific dye/cosmetic chemistry) is therefore not covered.
6. **Bengal connection** is an application-level link (whitewash, bleaching-powder water disinfection, hard-water soap experience) supported by claims c57/c75/c53; no Bengal-specific industrial fact is asserted, as no fetched source carries one.
7. Timeline is a single honest entry (1929, penicillin); the book profile does not require dated entries, and no other date in the chapter rests on a fetched quote (NIOS L31's vulcanization year was not used, as its printed figure could not be corroborated within the fetched sources).
