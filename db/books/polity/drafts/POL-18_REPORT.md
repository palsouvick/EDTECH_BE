# POL-18 — সাংবিধানিক সংস্থা — UPSC, Finance Commission, CAG, অ্যাটর্নি জেনারেল — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js` → **OK**.

## Deliverables
- `chapter.json` — complete chapter (overview, 6 sections with quick/standard/deep, 4 events, 8 terms, 2 cause_effect, 6 exam_focus, bengal_connection, 12 quick_revision points, 2 sources, 40 claims, 42 questions)
- `pyq_map_POL-18.json` — 10 real PYQ candidates mapped

## Sources actually fetched (browser.open, 2026-11-19)
1. **The Constitution of India [As on 1st May, 2024]**, Legislative Department, Ministry of Law and Justice — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf — verbatim text of Articles 76, 88, 280, 281, 315–323 harvested from the fetched text (the diglot PDF extracts in interleaved two-column order; quotes were reassembled only where the article text runs contiguously in the extraction).
2. **Mandate of the CAG of India — Constitutional Provisions**, Office of the Accountant General (A&E), UP (agup.nic.in, CAG network) — https://agup.nic.in/ag_ersa/en/pagmandate.htm — clean verbatim reproduction of Articles 148–151 and the CAG (DPC) Act, 1971 reference.

Search results and coaching sites were used only to locate official pages, never as claim sources.

## Counts
- Claims: **40** (c01–c40), every one with a verbatim quote from a fetched page; every claim is used by at least one section/question (validator-enforced).
- Questions: **42** — basic 10, moderate 15, difficult 10, exam 7 (STATEMENT ×3, MATCH ×2, PAIRS ×1, ASSERTION_REASON ×1); all 6 sections tested.

## PYQs
- `pyq_map.json` (polity book) has **zero** entries registered under POL-18, and the history bank's `pyq_chapters.json` maps none to POL-18.
- Candidates were therefore extracted directly from the real question bank in `BE/db/pyq/` by topic search (Finance Commission, Public Service Commission, Attorney General, CAG reports): **10 candidates found**.
- Mapped: **10/10**. Taught: **5** (WBCS 2018 FC composition; WBCS 2019 Art 280; WBCS 2022 SPSC appointment; WBCS 2024 FC = constitutional body; Clerkship 2023 AG appointment).
- Not taught (5), with specific reasons in the map: WBCS 2016 FC count (time-bound, no fetched source states it), WBCS 2019 Q112 (needs NCSC/Art 338 = POL-19), WBCS 2019 Q121 and WBCS 2022 Q83 (Public Accounts Committee = POL-10), WBCS 2023 Q125 (GOI Act 1919 = HIS-27 history).

## Subtopic coverage
Registered subtopic `constitutional_bodies` covered across all four bodies in the TOC title: UPSC/State PSCs (2 sections), Finance Commission, CAG, Attorney General, plus an introductory section on the constitutional-body design (appointment, removal protection, charged expenses, post-office bars, reports to the legislature).

## Gaps (disclosed, not filled from memory)
- **CAG tenure (6 years / age 65)** comes from the CAG (DPC) Act, 1971, s.6 — the fetched mandate page reproduces the Act's existence and Articles 148–151 but not the tenure clause text, so tenure figures for the CAG are **not stated** in the chapter.
- **Finance Commission members' qualifications** (Finance Commission Act, 1951 categories) not taught beyond Art 280(2) (Parliament determines qualifications by law) — the 1951 Act text was not fetched.
- **First PSC under the Government of India Act, 1919 / 1926** not taught (no fetched source); the related WBCS 2023 PYQ is mapped untaught.
- **NCERT** Indian Constitution at Work was not used: the chapter's facts are article-level and are carried by the Constitution text itself plus the official CAG mandate page, both GOVT sources permitted for the polity profile.
- No `people` or `timeline` block: the polity validator profile makes both optional, and this chapter has no claim-backed dated events or office-holder facts (current incumbents were deliberately not fetched/stated, as they go stale).
- `related_facts` left empty: no GK fact codes for these bodies were verified against the fact bank in this run.
