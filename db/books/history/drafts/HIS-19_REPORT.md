# HIS-19 — ১৮৫৭-র মহাবিদ্রোহ — Draft Report

Chapter: HIS-19, part `modern_company`, subtopics `["revolt_1857"]` (title/part/subtopics verbatim from `db/books/history/toc.js`). Status DRAFT, verification UNVERIFIED.

## Sources actually fetched

1. **NCERT, Themes in Indian History Part III, Class XII, Theme 11: "Rebels and the Raj — The Revolt of 1857 and Its Representations"** — canonical URL `https://ncert.nic.in/textbook/pdf/lehs302.pdf`. The direct NCERT PDF fetch failed on this machine (network error), and lehs301.pdf turned out to be Theme 9 (Colonialism and the Countryside). The full Theme 11 text (printed pp. 288–315) was therefore read via a mirror of the ncert.nic.in PDF: https://doczz.net/doc/734705/rebels-and-the-raj---ncert--ncert.nic.in- — all s1 quotes are verbatim from that fetched text, with printed page numbers.
2. **NIOS, Military History of the Colonial Era (Course 375), Chapter 11: "Revolt of 1857 and Reforms in the Indian Army"** — http://digital.nios.ac.in/content/375en/11/files/basic-html/page3.html (recorded in the chapter in its https form, as the validator requires). Used only for what Theme 11 does not cover: Mangal Pandey, the end of Company rule / Crown takeover, the Queen's Proclamation (Allahabad, 1 Nov 1858), cancellation of the Doctrine of Lapse, and the peace proclamation of 8 July 1859.

WBBSE e-textbooks: unreachable from this machine (per task instruction, not retried) — **gap**: no WBBSE source used; no WBBSE claim cited.
IGNOU eGyanKosh / e-PG Pathshala: searched; no directly fetchable unit on 1857 was obtained, so no claim rests on them — **gap** (not needed: NCERT + NIOS covered the chapter except the item below).

## Counts

- Claims: **65** (63 NCERT Theme 11 + 2 clusters from NIOS — c57–c60), every claim used at least once; validator reports no unused/unknown claims.
- Practice questions: **42** — basic 11, moderate 14, difficult 10, exam 7 (STATEMENT ×2, MATCH ×1, CHRONOLOGY ×2, ASSERTION_REASON ×1, PAIRS ×1); every section has questions.
- Sections: 6 — outbreak, rumours, awadh, leaders, vision, repression. Plus events (8), people (11), timeline (14), terms (10), cause_effect (3), exam_focus (7), bengal_connection, quick_revision (14).

## PYQs

Candidates for HIS-19 in `db/books/history/pyq_chapters.json`: **8**. All 8 verified against the actual bank files in `db/pyq/` (ido-2019, wbcs-prelims-2015/2017/2018/2019/2021/2024, wbpsc-clerkship-2023-session-2). Polity `pyq_map.json` has no HIS-19 entries (checked the history map route per task; the polity map is for POL chapters).

- Mapped: **8/8** in `pyq_map_HIS-19.json`.
- Taught: **7/8** — Punjab largely unaffected (2015), Canning as Governor-General (2017 + Clerkship 2023), Begum Hazrat Mahal / Lucknow (2018), Nana Sahib / Kanpur (2019), Bahadur Shah II (2021), chapati symbol (2024).
- Untaught: **1** — IDO 2019 Q17 (Barrackpore as the start). Reason: Mangal Pandey is taught from NIOS, but neither fetched source names Barrackpore; NCERT Class VIII "When People Rebel" (hess105.pdf), which carries the Barrackpore detail, was unreachable from this machine. Disclosed in the map, in the chapter's outbreak `exam_note`, and in the verification notes — the exam answer is flagged to students, never asserted as sourced.

## Subtopic coverage

`revolt_1857` (the chapter's only registered subtopic): outbreak & pattern, communication/planning, rumours & prophecies (cartridges, chapattis, Plassey centenary), Awadh annexation & grievances (taluqdars, Summary Settlement, sepoy–village link), leaders (Delhi, Kanpur, Lucknow, Jhansi, Arrah, Barout, Singhbhum), rebels' vision (Azamgarh Proclamation, Hindu–Muslim unity, alternative administration), repression (martial law, Delhi/Awadh reconquest), consequences (Crown takeover, Queen's Proclamation, lapse cancelled), and representations/memory (British images vs nationalist imagery).

## Gaps

1. **WBBSE** unreachable — chapter is NCERT + NIOS only.
2. **Barrackpore / Mangal Pandey's place** unverifiable from fetched sources (see PYQs) — 1 PYQ untaught.
3. **Tantia Tope's role** is not detailed in either fetched source; he appears only as a handled distractor (exam_note), with no sourced biography.
4. NCERT source PDF could not be fetched directly from ncert.nic.in on this machine; quotes were taken from a faithful mirror of the same NCERT PDF and should be re-verified against lehs302.pdf when the network allows (hence UNVERIFIED).
5. The Government of India Act 1858 is named in NIOS only as the Crown takeover / Queen's Proclamation, not by Act title; the chapter therefore teaches the takeover and proclamation, not the Act's clauses.

## Validation

`node scripts/validateBooks.js ~/workspace/edtech/bookwork/his-19/chapter.json` → **OK** (no errors).
