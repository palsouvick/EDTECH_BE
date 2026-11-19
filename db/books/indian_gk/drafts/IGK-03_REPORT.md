# IGK-03 — রাজ্য ও রাজধানী (States & Capitals): Draft Report

- **Book / chapter:** indian_gk, IGK-03, part `india_map`, subtopic `states_capitals` (title/part/subtopics taken verbatim from `db/books/indian_gk/toc.js`).
- **Status:** DRAFT, verification UNVERIFIED.
- **Validator:** `node scripts/validateBooks.js ~/workspace/edtech/bookwork/igk-03/chapter.json` → **OK**.
- **Counts:** 40 claims, 42 practice questions (basic 12, moderate 15, difficult 8, exam 7), 6 sections, every section tested.

## Sources actually fetched (via browser.open)

| ID | Title | URL |
|---|---|---|
| s1 | NCERT Class VI, *The Earth: Our Habitat*, Ch. 7 "Our Country – India" | https://ncert.nic.in/textbook/pdf/fess207.pdf |
| s2 | NCERT Class VI, *The Earth: Our Habitat*, Ch. 8 + Appendix I "State and Union Territories of India" (pp. 62–63) | https://ncert.nic.in/textbook/pdf/fess208.pdf |
| s3 | Bengal at a Glance — Government of West Bengal | https://wb.gov.in/about-west-bengal-at-a-glance.aspx |
| s4 | PIB (MHA), 13 Sep 2024, Release ID 2054647 — Port Blair renamed Sri Vijaya Puram | https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2054647 |
| s5 | Akashvani News, 7 Apr 2026 — Amaravati sole capital of Andhra Pradesh | https://newsonair.gov.in/president-droupadi-murmu-approves-bill-making-amaravati-sole-capital-of-andhra-pradesh/ |
| s6 | Gazette of India (eGazette), 1 Apr 2026 — AP Reorganisation (Amendment) Bill, 2026 (Bill No. 105 of 2026) | https://egazette.gov.in/WriteReadData/2026/271493.pdf |
| s7 | Govt of J&K, GAD Order No. 1664-JK(GAD) of 2026 — Annual Darbar Move, Srinagar → Jammu (Winter 2026-27) | https://jkgad.nic.in/common/showOrder.aspx?actCode=O45658 |

All URLs belong to the indian_gk validator profile's allowed publishers (NCERT + GOVT: *.gov.in / *.nic.in).

## Coverage

- All **28 state capitals** taught from NCERT Appendix I (s2), organised in 4 regional sections + framework + special cases.
- All **8 UT capitals** taught as capital pairs in `special_cases` (full UT treatment is IGK-04's scope, per the book plan).
- Special cases taught with primary sources: Chandigarh as common capital of Punjab & Haryana (NCERT's own exercise question), Hyderabad's ≤10-year common-capital period and Amaravati's statutory recognition (Gazette + AIR), Port Blair → Sri Vijaya Puram rename (PIB), J&K Darbar Move (J&K GAD order).

## PYQ candidates

- Found: **4** (1 GK bank item with subtopic `states_capitals` in `db/gk/indian_gk.jsonl` + 3 genuine state-capital items grepped from `db/pyq/*.json`).
- Mapped: **4** in `pyq_map_IGK-03.json`. Taught: **3** (GK-IGK-020, KP Constable 2023 Q27 — Raipur, WBCS 2017 Q127 — Amaravati). Untaught: **1** (WBCS 2024 Q135 — the capital pair is taught, but the question asks the meaning of 'dun', a Geography-book landform fact not covered by this chapter's sources; reason recorded in the map).
- Other "capital" hits in the PYQ corpus were rejected as off-topic: historical capitals (Kanishka, Chandragupta II, Tughlaq), capital of British India shifts (History), foreign capitals (Australia, Nigeria, USA, Jordan — Static GK/World), and finance senses of "capital" (Economy/Maths).

## Gaps (disclosed, never filled from memory)

1. **india.gov.in "Facts of India" states list could not be fetched** (page returns 403 to the text fetcher; knowindia.india.gov.in / knowindia.gov.in do not resolve). The chapter therefore rests on NCERT Appendix I + targeted official releases instead of the National Portal list. Consequence: the Portal's current spellings (e.g. "Bangalore", "Bhubaneshwar") could not be quoted; NCERT spellings are used and flagged in the text where they differ (Gandhi Nagar, Bhubaneshwar).
2. **NCERT Appendix I is stale for Andhra Pradesh** (prints Hyderabad). Handled openly: the chapter teaches the current position (Amaravati) from the Gazette/AIR, with an `exam_note` quoting both positions — the same treatment the exemplar chapters give source disagreements.
3. **Second/winter capitals not taught** — Maharashtra (Nagpur), Himachal Pradesh (Dharamshala), Uttarakhand (Gairsain/Bhararisain): no fetched allowed source states them, so they are omitted rather than asserted. Only J&K's seasonal arrangement is taught, because the J&K GAD order was fetched.
4. **Kerala renaming reports (2026):** third-party pages seen during search mentioned a proposed "Keralam" rename; no fetched official source in this run confirms it, and NCERT + the exam corpus use Kerala — the chapter teaches Kerala–Thiruvananthapuram and does not mention the rename.
5. State-formation dates, largest/smallest state facts and High-Court seats are out of this chapter's sourced scope (Geography/Polity books) and are not taught here.
