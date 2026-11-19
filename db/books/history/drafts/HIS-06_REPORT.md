# HIS-06 — মৌর্য সাম্রাজ্য: Draft Report

Chapter: HIS-06, part `ancient`, subtopics `["maurya_gupta"]` (verbatim from `db/books/history/toc.js`). Status DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser text-fetch, 2026-11-19)

1. **NCERT, Themes in Indian History Part I (Class XII), Theme 2: Kings, Farmers and Towns** — https://ncert.nic.in/textbook/pdf/lehs102.pdf (pp. 28–35 read in full for the Mauryan sections)
2. **NCERT, Our Pasts I (Class VI), Chapter 7: From a Kingdom to an Empire** — https://ncert.nic.in/textbook/pdf/fess107.pdf (pp. 62–72 read in full)
3. **e-PG Pathshala / INFLIBNET, Outlines of Indian History — "The Mauryan Empire" (P. Bhaskar Reddy)** — https://ebooks.inflibnet.ac.in/icp01/chapter/the-mauryan-empire/ (read in full)
4. **IGNOU eGyanKosh, Unit 5: Socio-Historical Perspective — I** — https://egyankosh.ac.in/bitstream/123456789/16873/1/Unit%205.pdf (§5.3 used: Megasthenes' seven occupational classes; slavery denied by Megasthenes vs Arthashastra)

## Counts

- Claims: **71** (c01–c71), every claim carries a verbatim quote from a fetched source above; every claim is used at least once (validator-enforced).
- Practice questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH ×2, CHRONOLOGY ×2, ASSERTION_REASON ×1, PAIRS ×1 among exam/difficult set); all 7 sections tested.
- Sections: 7 — sources, foundation, bindusara_expansion, administration, ashoka_kalinga, dhamma_edicts, decline_art.

## PYQs

- Candidates found in `pyq_chapters.json` / `drafts/pyq_candidates_HIS-06.json`: **10** (6 primary HIS-06, 4 alt).
- Mapped in `pyq_map_HIS-06.json`: 10. **Taught: 6** (Piyadasi, Sandrocottus, Megasthenes' visit, Prinsep decipherment, Megasthenes on slavery, first historical emperor).
- Not taught (4), with reasons in the map: Bisthi (HIS-08), foreign-traveller chronology (HIS-08), Alexander's invasion date (HIS-04), and the Antiochus edict question (source gap — see below).
- Polity check: `db/books/polity/pyq_map.json` contains no HIS-06 entries.

## Subtopic coverage (maurya_gupta)

Covered for the Mauryan half of the subtopic: sources and historiography (Prinsep, Megasthenes, Arthashastra), Chandragupta and foundation, Seleucid treaty, Bindusara and Hellenistic contacts, administration (five centres, taxes, spies, army committees, coinage), Ashoka, Kalinga war, dhamma and edicts (languages/scripts), art (pillars, Lion Capital), decline and the Shunga succession. The Gupta half of `maurya_gupta` belongs to HIS-08 by TOC design and is not covered here.

## Gaps (disclosed, not filled)

1. **WBBSE e-textbooks unreachable** from this machine (per brief) — not attempted; Bengali school-textbook wording could not be cross-checked.
2. **Antiochus II Theos in Ashoka's edict (WBCS 2022 Q189):** no fetched NCERT/IGNOU/e-PG source names Antiochus in Ashoka's edicts. The chapter teaches only that the edicts mention contemporary foreign rulers and that Syria's Seleucid king in Bindusara's reign was Antiochus I. The PYQ is mapped `taught: false` for this reason.
3. **Date variants kept visible, not harmonised:** founding c. 321 BCE (NCERT XII) vs c. 322 BCE (e-PG); Ashoka c. 272/268–231 BCE (NCERT XII) vs 273/269–232 BCE (e-PG). An `exam_note` in the foundation section flags this.
4. **Pillar-edict count:** e-PG says "6 Pillar edicts"; the chapter claims only the 14 Major Rock Edicts figure and does not state a pillar-edict count in student text.
5. **e-PG OCR artefact:** the fetched e-PG text reads "dried pigs" in Bindusara's request to Antiochus (standard reading: dried figs). The claim quote is reproduced verbatim as fetched; student-facing Bengali text says শুকনো ডুমুর (dried figs) in the narrative but the claim quote is left unaltered.
6. No fetched source in the allowed set covers Mauryan land-revenue rates, the seven limbs (saptanga), or Pataliputra's municipal boards of six committees — these standard topics are omitted rather than written from memory.
