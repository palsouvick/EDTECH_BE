# HIS-08 — গুপ্ত যুগ ও হর্ষবর্ধন: Draft Report

Chapter: HIS-08, part `ancient`, subtopics `["maurya_gupta"]` (title/part/subtopics verbatim from `db/books/history/toc.js`). Status DRAFT, verification UNVERIFIED.

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Title | URL |
|---|---|---|
| s1 | NCERT Our Pasts I, Class VI, Ch. 9: New Empires and Kingdoms | https://ncert.nic.in/textbook/pdf/fess109.pdf |
| s2 | NCERT Our Pasts I, Class VI, Ch. 10: Buildings, Paintings and Books | https://ncert.nic.in/textbook/pdf/fess110.pdf |
| s3 | NCERT Themes in Indian History Part I, Class XII, Theme 2: Kings, Farmers and Towns | https://ncert.nic.in/textbook/pdf/lehs102.pdf |
| s4 | IGNOU BHIC-132, Unit 2: Economy, Society, Culture and Polity — The Guptas (eGyanKosh) | https://egyankosh.ac.in/bitstream/123456789/61902/1/Unit-2.pdf |

Also opened: the eGyanKosh handle page for BHIC-132 Unit 1 (metadata only, https://egyankosh.ac.in/handle/123456789/61900) — used to confirm the unit exists; no claims rest on it.

## Counts

- Claims: **60** (c01–c60), every one with a verbatim quote from a fetched source above; every claim is used at least once (validator-enforced).
- Practice questions: **42** — basic 11, moderate 14, difficult 10, exam 7 (STATEMENT ×2, MATCH ×2, CHRONOLOGY ×1, ASSERTION_REASON ×1, PAIRS ×1, rest DIRECT). All 7 sections carry questions.
- Sections: 7 (prashasti_samudragupta, conquest_policy, chandragupta2_succession, administration, economy_society, culture, harsha), each with quick/standard/deep and boxes.
- Events 7, people 13, timeline 6, terms 12, cause_effect 3, exam_focus 9, quick_revision 14 points.
- Validator: `node scripts/validateBooks.js chapter.json` → **OK**.

## PYQs

- Candidates for HIS-08 in `pyq_chapters.json` (chapter == HIS-08 or alt == HIS-08): **26**.
- Mapped in `pyq_map_HIS-08.json`: all 26.
- **Taught: 13** — Hiuen Tsang/Harsha (×2), Brihatsamhita–Varahamihira, Samudragupta's successor, Allahabad Prasasti author (×2) and subject, Vishti, Chandragupta II vs Sakas (×2), Pulakeshin II vs Harsha, Kumarasambhavam–Kalidasa, Meghaduta–Kalidasa.
- **Untaught: 13**, each with a specific reason in the map (see Gaps).

## Subtopic coverage

`maurya_gupta` is this chapter's only registered subtopic. Coverage: Gupta political history (Samudragupta's fourfold policy, Chandragupta I/II, genealogy), administration (bhukti–vishaya–grama, uparika/vishayapati, hereditary offices, revenue, vishti), economy/society (samantas, land grants/agrahara, gold coinage, cultivators, untouchability), culture (Kalidasa, Varahamihira, Aryabhatta, temples, Ajanta, Sanskrit), and Harsha with Pulakeshin II. Bengal connection is strong and sourced: coastal Bengal as tribute-paying neighbour, Pundravardhana Bhukti, Bengal land-sale inscriptions, Kulyavapa/Dronavapa measures, north-Bengal district representation, Harsha's Bengal campaign.

## Gaps (disclosed, never filled from memory)

1. **WBBSE** *অতীত ও ঐতিহ্য* unreachable from this machine (per task instruction, not retried) — chapter is NCERT + IGNOU only.
2. **IGNOU BHIC-132 Unit 1** (Rise and Growth of the Guptas) and **Unit 3** (Pushyabhutis and Harsha) PDFs failed to fetch (network error on the bitstream URLs; not retried per runtime instruction). Consequences, all marked untaught in the PYQ map and flagged in chapter exam_notes:
   - Skandagupta's repulse of the Hunas (WBCS 2018 Q152, WBCS 2024 Q100) and Mihirakula (WBCS 2023 Q144) — fetched sources cover only his Sudarshana lake repair.
   - Nalanda's founder (WBCS 2023 Q57, Clerkship 2023 Q40) — Nalanda is absent from all fetched sources.
   - Kadambari–Banabhatta (WBCS 2015 Q76, WBCS 2017 Q76) — only the Harshacharita is named in fetched sources.
   - Earliest sati evidence at Eran (WBCS 2022 Q95) — absent from fetched sources.
   - Mrichhakatika–Shudraka (WBCS 2019 Q72, alt HIS-07) — absent from fetched sources.
   - Chandragupta II's "second capital" (WBCS 2023 Q113) — Ujjain is sourced only as an important Gupta centre.
   - The title "Shakari" (Clerkship 2009 Q4) — the Shaka victory and Vikramaditya title are sourced; the word itself is not.
   - Foreign-traveller chronology (WBCS 2022 Q185) — Fa Xian and Xuan Zang are taught, the full sequence is not.
   - Kamarupa = Assam (Clerkship 2005 Q65, primary HIS-09) — "Assam" is sourced; the name Kamarupa is not.
3. No Gupta-era regnal years beyond NCERT XII's timeline (c. 320 / 335–375 / 375–415 CE) are asserted; Harsha's dates are given only in NCERT's relative form ("about 1400 years ago").
4. `related_facts` left empty: no GK fact codes for this chapter were verified against the taxonomy during this run.
