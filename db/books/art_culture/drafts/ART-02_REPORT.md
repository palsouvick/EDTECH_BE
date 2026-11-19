# ART-02 — ভারতীয় সংগীত (Indian Music) — Draft Report

- **Book / chapter:** art_culture, ART-02, number 2, part `performing`, subtopics `["music"]` — title taken verbatim from `db/books/art_culture/toc.js` ("ভারতীয় সংগীত").
- **Status:** DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/art-02/chapter.json` → **OK**.

## Sources actually fetched (browser.open, 2026-11-19)

| id | Source | Publisher class | URL |
|----|--------|-----------------|-----|
| s1 | IGNOU OMU-001 Block 1: Understanding Indian Music (Units 1–3) | IGNOU | https://egyankosh.ac.in/bitstream/123456789/47376/1/OMU-001-Block-1.pdf |
| s2 | IGNOU OMU-001, Basic Elements Unit 2: Saptak, That, Raga, Laya & Tala | IGNOU | https://egyankosh.ac.in/bitstream/123456789/47378/1/Unit-2.pdf |
| s3 | Music — Sangeet Natak Akademi (Ministry of Culture) | GOVT | https://www.sangeetnatak.gov.in/sections/music |
| s4 | About Us — Sangeet Natak Akademi | GOVT | https://sangeetnatak.gov.in/about-us |
| s5 | Intangible Cultural Heritage of India — PIB / Ministry of Culture backgrounder (Jan 2022) | GOVT | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2022/jan/doc20221206901.pdf |
| s6 | Shivkumar Sharma — Fellowship of Sangeet Natak Akademi (Awards 2011 doc) | GOVT | https://www.sangeetnatak.gov.in/public/uploads/awardees/docs/1750069387_1741289221_Shiv%20Kumar%20Sharma%20Fellowship%20of%20SNA%202011.pdf |

All six URLs belong to publishers allowed for art_culture in `PROFILES.art_culture` (NCERT, GOVT, IGNOU, EPG). No NCERT source is used — see gaps.

## Counts

- **Claims:** 61 (c01–c61), every one with a verbatim quote from a fetched page above; every claim is used at least once (machine-checked during build: 61/61 used, 0 unknown references).
- **Questions:** 42 — basic 13, moderate 18, difficult 6, exam 5; formats DIRECT, STATEMENT, MATCH, CHRONOLOGY, PAIRS, ASSERTION_REASON; all 6 sections tested (7 questions each).
- **Sections:** 6 — vedic_roots, scholars_raga, swara_that_raga, laya_tala, two_streams, living_heritage. Plus 8 events, 5 people, 8-row timeline (1953–2021, the dated material this subject honestly has), 10 terms, 3 cause_effect rows, 6 exam_focus points, 13 quick_revision points.

## PYQ candidates

- **Found: 9** — 3 from the GK bank (`db/gk/art_culture.jsonl`, subtopic `music`: GK-ART-004, GK-ART-105, GK-ART-106) and 6 real exam items grepped from `db/pyq/*.json` (WBCS 2022 santoor/Shiv Kumar Sharma; WBCS 2016 UCCN cities; WBPSC Miscellaneous 2023 Tansen; Clerkship 2007 Amir Khusrau–sitar; Clerkship 2007 Mallikarjun Mansur; Clerkship 2005 Kavita Krishnamurthy).
- **Mapped: 9/9** in `pyq_map_ART-02.json`. **Taught: 4** (GK-ART-004, GK-ART-105, GK-ART-106, WBCS-2022-Q112). **Untaught: 5**, each with its specific reason in the map — in every case the fact appears in no source fetched from an allowed publisher, so it was not asserted.

## Subtopic coverage (music)

Covered with fetched quotes: meaning of sangeet; Vedic/Sama origins and the chanting→singing transition; Shiksha literature, Vayu Purana, Ramayana; Bharata (Natyashastra, rasa, vadi–samvadi, arohi–avrohi) and Matanga (Brihaddeshi, first use of "raga", raga classification, nada); saptak/that (Bhatkhande's ten thats)/raga rules; laya and tala with matra counts (Dadra 6, Kaharwa 8, Ektal 12, Teental 16) and laya-wise forms (dhrupad/bada khayal, chhota khyal/bhajan, taan/tarana); the Hindustani–Karnatak split and shared origin; improvisation and the guru oral tradition; santoor and Shivkumar Sharma; UNESCO ICH music elements (Vedic chanting 2008, Kalbelia 2010, Ladakh Buddhist chanting 2012, Sankirtana 2013) and the Sangeet Natak Akademi (1953/1961/2006, awards, chairmanship, Kathak Kendra teaching).

## Gaps (disclosed, never filled from memory)

1. **NCERT unreachable:** the natural NCERT source — *Kriti* Class 8, Ch. 6 "Musical Instruments" (hekr106) and Ch. 7 "Indian Classical Music" (hekr107) on ncert.nic.in — failed to fetch from this machine (network error on both attempts). No NCERT claims are used; retry when NCERT is reachable.
2. **Carnatic detail untaught:** kriti structure (pallavi–anupallavi–charanam), the Carnatic Trinity (Tyagaraja, Muthuswami Dikshitar, Syama Sastri), Purandaradasa, and the sapta-tala names (Dhruva, Matya, Rupaka, Jhampa, Triputa, Ata, Eka) appear in no fetched allowed source, so they are not taught; the chapter's two_streams `deep` text and an exam_note box say this openly to students.
3. **Hindustani vocal-form history thin:** dhrupad/khayal/thumri are taught only where IGNOU Unit-2 names them as laya examples; their histories, gharanas (Gwalior, Kirana, Jaipur-Atrauli…), Tansen and Amir Khusrau are untaught (hence 3 untaught PYQs above).
4. **Bengal music untaught:** Rabindra Sangeet and Baul could not be verified from an allowed publisher in this run (UNESCO's Baul page is not an allowed publisher; no gov.in/IGNOU page was found). The bengal_connection therefore uses only verified material — Kolkata's Durga Puja inscription (PIB, 2021; India at 14 elements) and the ICH/oral-tradition framework — and states the Rabindra Sangeet/Baul gap to the student instead of forcing a link.
5. **Instrument coverage is one deep example** (santoor/Shivkumar Sharma, from the Akademi's own document) rather than a full instrument survey, for the same source reason as gap 1.
