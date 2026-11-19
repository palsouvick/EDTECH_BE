# SCI-08 ধাতু ও অধাতু — Draft Report

- **Chapter:** SCI-08, book `science`, part `chemistry`, subtopics `["chemistry_metals"]` (verbatim from `db/books/science/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-08/chapter.json` → **OK**

## Sources actually fetched (browser.open, full text read)

1. **NCERT, Chemistry Part I, Class XII, Unit 6: General Principles and Processes of Isolation of Elements** — https://ncert.nic.in/textbook/pdf/lech106.pdf (read in full, 2,200 lines; printed pp. 149–168)
2. **NIOS, Senior Secondary Chemistry (313), Module 6, Lesson 16: Occurrence and Extraction of Metals** — https://digital.nios.ac.in/content/313en/313_Chemistry_Eng_Lesson16.pdf (read in full, 1,774 lines; lesson pp. 1–18)

Both URLs match the science profile's allowed publishers (NCERT, NIOS) in `books.validate.js`.

### Fetch failures (disclosed, not retried per runtime instruction)

- NCERT Class X Science Ch. 3 *Metals and Non-metals* (https://ncert.nic.in/textbook/pdf/jesc103.pdf) — network error on fetch.
- NCERT Class VII *Curiosity* Ch. 4 *The World of Metals and Non-metals* (https://ncert.nic.in/textbook/pdf/gecu104.pdf) — network error on fetch.
- NCERT Class VIII hesc103/hesc104 were fetched successfully but are *Coal and Petroleum* / *Combustion and Flame* in the rationalised edition — not usable for this chapter.

## Counts

- **Claims:** 64 (c01–c64), every one with a verbatim quote from source 1 or 2 above; every claim is used by at least one section/event/question (validator-enforced).
- **Questions:** 42 — basic 14, moderate 13, difficult 9, exam 6 (STATEMENT ×2, MATCH, ASSERTION_REASON, PAIRS, CHRONOLOGY); 7 per section across all 6 sections.
- **Sections:** 6 — occurrence_ores, concentration, conversion_reduction, extraction_examples, refining, alloys_uses.

## PYQ candidates

- **Found:** 16 — 2 GK-bank items with subtopic `chemistry_metals` (GK-SCI-009, GK-SCI-010, copied verbatim from `db/gk/general_science.jsonl`) + 14 corpus items in `db/pyq/*.json` genuinely mentioning metals/alloys (IDO 2019, KP Constable 2023, WBPSC Misc 2023 ×2, WBCS 2016/2019/2021/2022 ×2/2023/2024, WBP Constable 2021, Clerkship 2023 S4 ×2).
- **Mapped:** 16/16 in `pyq_map_SCI-08.json`.
- **Taught:** 3 — Misc 2023 Q82 (bronze), WBCS 2019 Q140 (brass), WBCS 2022 Q146 (bronze), all in `alloys_uses`.
- **Untaught (13), each with a specific reason in the map:** solder/gun-metal/amalgam/stainless-steel compositions and 22-carat gold (not in fetched sources); liquid-metal and other physical-state exceptions (NCERT X Ch. 3 fetch failed); chlorophyll/haemoglobin metals (biology chapters); thermal expansion, resistivity, photoelectric work function (physics chapters SCI-03/04/05); Harappan metals (history HIS-02); sulphur classification (SCI-06).

## Subtopic coverage

`chemistry_metals` is covered on the extraction side in depth: occurrence/native state, minerals vs ores, principal ores of Al/Fe/Cu/Zn, all four concentration methods, calcination vs roasting, reduction routes (carbon smelting, thermite, self-reduction, electrolysis, displacement), full extraction flows for Al/Fe/Cu/Zn, five refining methods, alloys (brass, bronze, coinage alloy, german silver, steels) and uses, plus Indian metallurgy history (Mehrgarh, Zawar, Wootz, Iron Pillar, Khasi Hills) used for timeline/events/Bengal connection.

## Gaps (never filled from memory)

1. **Physical properties of metals/non-metals** (lustre, malleability, ductility, sonority, conductivity as a systematic comparison) and **exceptions** (liquid Hg, liquid Br, Ga/Cs melting on palm, lustrous iodine, diamond hardest, graphite conducting) — **not taught**: the canonical source (NCERT X Ch. 3) could not be fetched. GK-SCI-009 and KP Constable 2023 Q85 depend on these and are marked untaught.
2. **Chemical properties** (reaction with oxygen/water/acids, reactivity series as a full ordered list, ionic compounds) — **not taught** for the same reason; only the reactivity-linked extraction logic present in the fetched sources is taught (electrochemical series references in displacement/Zn-vs-Fe claims c21/c22/c64).
3. **Corrosion and its prevention** (rust formula, silver tarnish, copper patina, galvanisation as a *prevention method*) — **not taught** as a topic; zinc-for-galvanising appears only as a *use* (claim c31) and the Iron Pillar's corrosion resistance as history (claim c33), both strictly within fetched quotes.
4. **Alloy compositions beyond the fetched sources** — solder (Pb+Sn), amalgam, stainless steel (Fe+Ni+Cr), 22-carat gold: not taught; GK-SCI-010 marked untaught as a whole despite brass/bronze being taught.
5. **Bengal connection** is the nearest honest link (Central Ganga Plains iron, Khasi Hills smelting — both NCERT XII Unit 6), not a West-Bengal-specific claim; no WB-specific metallurgy fact was asserted.
6. `events`/`people`/`timeline` carry metallurgy-history equivalents (froth-floatation invention, Iron Pillar, Zawar; Kautilya, Carrie Everson; 6000 BCE → 5th c. CE), as the science profile is `dated: false`.

## Files

- `chapter.json` — complete chapter (validator OK)
- `pyq_map_SCI-08.json` — 16 candidates mapped
- `REPORT.md` — this file
