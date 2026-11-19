# SCI-04 — তড়িৎ ও চুম্বকত্ব (Electricity & Magnetism) — Draft Report

- **Book / code:** science / SCI-04 · part `physics` · subtopic `physics_electricity` (verbatim from `BE/db/books/science/toc.js`)
- **Status:** DRAFT · verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/sci-04/chapter.json` → **OK**

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | Science, Class X, Chapter 11: Electricity (NCERT) | https://ncert.nic.in/textbook/pdf/jesc111.pdf |
| s2 | Science, Class X, Chapter 12: Magnetic Effects of Electric Current (NCERT) | https://ncert.nic.in/textbook/pdf/jesc112.pdf |

Both URLs match the science profile's allowed publishers (`NCERT`). No other source was used; every claim quote below was copied from the fetched text of these two PDFs.

## Counts

- **Claims:** 58 (c01–c58), each with a verbatim quote, source id and printed page; every claim is used at least once (validator-enforced).
- **Sections:** 6 — `current_circuit`, `ohms_resistance`, `series_parallel`, `heating_power`, `magnetic_field`, `solenoid_force_domestic` — each with quick/standard, deep where useful, and at least one box.
- **Questions:** 43 — basic 11, moderate 15, difficult 9, exam 8; formats: DIRECT 38, STATEMENT 1, MATCH 1, PAIRS 1, ASSERTION_REASON 1, CHRONOLOGY 1. Every section is tested; every question cites its supporting claims.
- **Also present:** overview, events (2 discovery events), people (4), timeline (4 dated entries, 1745–1827), terms (12), cause_effect (2), exam_focus (8), bengal_connection, quick_revision (15 points), sources, claims.

## PYQ candidates

- **Found:** 14 real candidates — 2 from the GK bank (`db/gk/general_science.jsonl`, subtopic `physics_electricity`: GK-SCI-005, GK-SCI-019) and 12 genuinely on-topic items grepped from `db/pyq/*.json` (WBCS Prelims 2016/2017/2018/2019/2021/2023/2024, Clerkship 2009 & 2023, Miscellaneous 2023, IDO 2019). Corpus items carry no code field, so `pyq_code` follows the established corpus pattern (exam–year–tier/shift–Qn, as in the HIS/GEO maps) and each note names its source file.
- **Mapped / taught:** 6 taught (GK-SCI-005, GK-SCI-019, WBCS-2017-Q49 parallel connection, WBCS-2023-Q195 series maximum, WBCS-2024-Q191 resistivity, Clerkship-2009-Q54 kWh) — three of them are mirrored as practice questions (q13, q16, q24).
- **Untaught:** 8, each with its specific reason in `pyq_map_SCI-04.json` (semiconductor temperature behaviour, angle of dip, Tesla/Edison attributions → SCI-15, EM waves ×2, diamond conductivities, photoelectric work function → SCI-05).

## Subtopic coverage

`physics_electricity` is covered end-to-end at NCERT Class X level: current & potential difference, Ohm's law, resistance & resistivity, series/parallel combinations, heating effect, electric power & kW h, fuse, magnetic field & field lines, right-hand thumb rule, solenoid & electromagnet, Fleming's left-hand rule, domestic circuits & safety.

## Gaps (disclosed, never filled from memory)

1. **Electromagnetic induction, Fleming's right-hand rule, AC generator / motor working cycles:** the rationalised NCERT Class X Ch. 12 fetched for this chapter no longer contains the induction/generator body text (only a summary mention that motors and generators use current-carrying conductors in magnetic fields, c50, and one exercise reference). These are therefore **not taught**; GK-SCI-019's generator right-hand-rule pairing is flagged as a partial gap inside its map note. A future pass with NCERT Class XII Physics (Electromagnetic Induction / Alternating Current) as an added source could close this.
2. **Earth's magnetism / angle of dip** (WBCS-2019-Q150): absent from the sources used — untaught.
3. **Semiconductor resistance vs temperature** (WBCS-2016-Q65): only the general "resistance and resistivity vary with temperature" statement (c15) is sourced; the semiconductor direction is untaught.
4. **Inventor attributions** (Tesla–AC, Edison–bulb): belong to SCI-15 (আবিষ্কার ও উদ্ভাবন); the concepts themselves (AC home supply, tungsten filament) are taught here without the names.
5. **1 horsepower = 746 W** appears inside GK card GK-SCI-019's statement but has no quote in the two fetched NCERT chapters, so it is not taught or claimed here.
6. Page numbers in claims are the printed Science (Class X) book pages as extracted from the PDFs.
