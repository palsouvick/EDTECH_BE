# HIS-08 Extension Report — Gupta & Harsha (ch08-gupta-harsha.json)

Extension of the PUBLISHED chapter to teach PYQs that were untaught purely because the
originally fetched sources (NCERT VI/XII + IGNOU BHIC-132 Unit 2) did not state the facts.
Worked from `drafts/pyq_map_HIS-08.json` (13 untaught entries).

## Sources fetched (additional, allowed publishers only)

1. **NIOS Senior Secondary History (315), Module 1, Lesson 7: The Guptas and Their Successors (A.D. 300–750)** — NIOS
   https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson7.pdf
   (fetched via browser.open from nios.ac.in; added as source `s5`)
2. **e-PG Pathshala (INFLIBNET) e-Textbook "Outlines of Indian History": The Gupta Empire, by P. Bhaskar Reddy** — EPG
   https://ebooks.inflibnet.ac.in/icp01/chapter/the-gupta-empire/
   (fetched via browser.open from ebooks.inflibnet.ac.in; added as source `s6`)

Also read (for orientation only, not cited): IGNOU BHIC-132 full course text (Units 1, 8, 15
corroborate the same facts — Skandagupta/Huna in Unit 1 §1.6–1.7, Kadambari in Unit 8,
Nalanda founder + Mrichchhakatika in Unit 15), mirrored at archive.org. The individual
eGyanKosh unit PDFs for Units 1/8/15 could not be located (the original run hit the same
fetch problem), so all new claims cite the NIOS / INFLIBNET pages actually fetched.

## Facts added per PYQ code (11 flipped)

| PYQ code | Fact now taught | New claim(s) | Section |
|---|---|---|---|
| WBCS-EXE-PRELIMS-2015-PRELIMS-Q76 | Kadambari is by Banabhatta, Harsha's court poet | c66 (NIOS: "Another text written by him is Kadambari.") | harsha |
| WBCS-EXE-PRELIMS-2017-PRELIMS-Q76 | Same Kadambari–Banabhatta fact | c66 | harsha |
| WBCS-EXE-PRELIMS-2018-PRELIMS-Q152 | Prince Skandagupta repulsed the first Huna attack in Kumaragupta's reign | c61 (NIOS p. 104) | economy_society |
| WBCS-EXE-PRELIMS-2024-PRELIMS-Q100 | Same Skandagupta–Huna fact | c61 | economy_society |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q144 | Mihirakula: Huna ruler, son/successor of Toramana (AD 515), finally defeated by Yashodharman + Narasimhagupta Baladitya | c62, c63 (NIOS pp. 104–105) | economy_society |
| WBCS-EXE-PRELIMS-2019-PRELIMS-Q72 | Mrichchhakatika is by Shudraka | c65 (NIOS p. 111) | culture |
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q95 | Earliest evidence of sati: inscription of AD 510 at Eran (Madhya Pradesh) | c64 (NIOS p. 110) | economy_society |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q113 | Chandragupta II made Ujjain his second capital | c67 (INFLIBNET §4.4.2: "He made Ujjain as the second capital of the Empire.") | chandragupta2_succession |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q57 | Nalanda University was founded by Kumaragupta I | c69 (INFLIBNET §6) | harsha |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-I-Q40 | Same Nalanda-founder fact | c69 | harsha |
| WBPSC-CLERKSHIP-PART-I-2009-SESSION-II-Q4 | 'Shakari' = destroyer of the Shakas, title of Chandragupta II after defeating Rudrasimha III (source spells it 'Sakari'; disclosed in the chapter text and q50 explanation) | c68 (INFLIBNET §4.4.1) | chandragupta2_succession |

New claims: 9 (c61–c69). New practice questions: 10 (q43–q52; basic ×4, moderate ×3,
difficult ×1, exam ×2), each referencing its new claim ids. New facts were woven as short
Bengali additions into the existing `standard`/`deep` text of the four sections above
(no restructuring), the new claim ids were added to those sections' `claims[]`, and the
four exam_note boxes that disclosed these exact gaps were updated to record that the
facts are now taught from the new sources.

## Entries deliberately skipped (scope rule)

- **WBPSC-CLERKSHIP-PART-I-2005-Q65** (Kamarupa = Assam) — map note: primary chapter
  HIS-09, HIS-08 is alt-mapping only. Not this chapter's to teach. (The INFLIBNET chapter
  does state "Kamarupa (Assam)", but the scope rule excludes it regardless.)
- **WBCS-EXE-PRELIMS-2022-PRELIMS-Q185** (foreign travellers chronology) — map note:
  alt chapter HIS-06; the full traveller sequence spans periods/chapters outside HIS-08's
  own scope and is only partly covered here. Not flippable by this chapter alone.

## Entries still unsourceable

None. Every remaining in-scope source-gap entry was sourced from an allowed publisher
(NIOS / INFLIBNET e-PG Pathshala) with a verbatim quote carried in the new claims.

## Integrity checks

- `node scripts/validateBooks.js ~/workspace/edtech/bookwork/ext-his-08/chapter.json` → **OK**
- Programmatic diff vs the installed chapter: all **42/42 pre-existing questions are
  byte-identical** (id, stem, key text, options, explanation, claims unchanged) and all
  **60/60 pre-existing claims are identical**; no top-level field other than
  sections/sources/claims/questions changed; `status` remains PUBLISHED and
  `verification` is unchanged (parent appends the extension note).
