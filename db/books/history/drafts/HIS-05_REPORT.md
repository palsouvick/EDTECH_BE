# HIS-05 — বৌদ্ধধর্ম, জৈনধর্ম ও নতুন চিন্তা: Draft Report

Chapter file: `chapter.json` (status DRAFT, verification UNVERIFIED). Validator: `node scripts/validateBooks.js` → **OK**.

## Sources actually fetched (browser text-fetch, read in full)

1. **NCERT, Themes in Indian History Part I, Class XII, Theme 4: Thinkers, Beliefs and Buildings** — https://ncert.nic.in/textbook/pdf/lehs104.pdf (3,483 lines read: background/debates, Mahavira, Buddha's life and teachings, sangha, Tipitaka/Dipavamsa, stupas, sculpture/Jatakas, Mahayana).
2. **IGNOU, BHIC-101 Unit 12: Jainism, Buddhism and Ajivikas** (eGyanKosh; adopted from EHI-02 Block 4) — https://egyankosh.ac.in/bitstream/123456789/64789/1/Unit12.pdf (1,631 lines read in full: causes, material milieu, Buddha's life/teachings, sangha, four Buddhist councils, schools, Parsvanatha/Mahavira, Jain councils and sects, Ajivikas, impact).
3. **NIOS, Senior Secondary History (315), Lesson 5: From Janapadas to Empire** — https://digital.nios.ac.in/content/315en/315_History_Eng_Lesson5.pdf (doctrines section read in full: triratna, panchamahavrata, anekantavada, Buddha's life dates, Pali, fourth-council split, Ajivika founder).

## Counts

- **Claims:** 119 (c01–c119), every one with a verbatim quote from a fetched source above; every claim is used in the chapter (validator-enforced).
- **Practice questions:** 42 (basic 14, moderate 15, difficult 7, exam 6 — STATEMENT ×2, PAIRS, MATCH, CHRONOLOGY, ASSERTION_REASON), spread across all 8 sections.
- **Sections:** 8 — background, buddha_life, buddha_teaching, sangha_texts, stupas_art, jainism, jain_development, other_thinkers. Plus 12 events, 13 people, 9 timeline rows, 18 terms, 3 cause_effect chains, 9 exam_focus points, bengal_connection, 15 quick_revision points.

## PYQs

- Candidates for HIS-05 in `db/books/history/pyq_chapters.json`: **11** (all Buddhism; none on Jainism). Full question texts verified against `db/pyq/*.json`.
- Mapped in `pyq_map_HIS-05.json`: **11/11**. Taught: **10/11**.
- **Untaught (1):** WBCS-EXE-PRELIMS-2017-PRELIMS-Q87 (Jivaka, the Buddha's physician) — the name appears in **none** of the three fetched authorised sources (all three full texts searched); left out per the no-fact-without-a-quote rule, with the reason recorded in the map.
- Polity check: `db/books/polity/pyq_map.json` contains no entries under HIS-05 (checked) — nothing further to map.

## Subtopic coverage

Registered subtopic `buddhism_jainism` covered in full: rise/background and material milieu; Buddha's life (four places), teachings (Four Noble Truths, Eightfold Path, middle path, anicca/anatta, karma, nirvana), language (Pali); sangha and women's admission; Tipitaka, Jatakas, Dipavamsa; four Buddhist councils and the Sthaviravadin/Mahasanghika and Mahayana/Hinayana splits; stupas and Jataka art; Jainism — tirthankaras, Parsvanatha, Mahavira's life, panchamahavrata, triratna, anekantavada/syadvada, Prakrit; Jain councils (Pataliputra, Vallabhi), 12 angas/purvas, Digambara/Svetambara split; Ajivikas and other heterodox teachers; social impact.

## Gaps and honest notes

- **WBBSE unreachable** from this machine (per brief; not retried) — chapter is NCERT + IGNOU + NIOS only.
- **NCERT Class VI chapter PDF (kehi107.pdf, "New Questions and Ideas") could not be fetched** — the fetch failed with a network error and was not retried; the Class XII theme plus IGNOU/NIOS covered the same ground, so no content gap resulted.
- **Jivaka** — see PYQs above; the only PYQ fact not taught.
- **Date disagreements disclosed in-chapter, not hidden:** Buddha's birth c. 566 BCE (IGNOU/NIOS) vs NCERT's undated c. 5th–4th century BCE for his death; Mahavira's birth 540 BCE (IGNOU) vs 599 BC (NIOS); NCERT's Vesali compilation reference vs IGNOU's first council at Rajagriha (483 BCE) — the chapter teaches the exam version (Rajagriha/Mahakassapa, matching WBCS 2023/2024) and flags the NCERT wording in a deep/exam_note box.
- **Bengal connection is indirect** (no Bengal event exists in the sources for this chapter): the chapter states this openly and uses the nearest honest links — Asoka's Barabar caves for Ajivikas in neighbouring Bihar and the eastward spread routes; Bengal's Buddhist flowering is left to HIS-09.
- No Jainism PYQ candidates exist in the bank for this chapter, so the Jain sections rest entirely on the fetched textbook sources.
