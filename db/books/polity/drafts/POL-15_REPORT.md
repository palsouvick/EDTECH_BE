# POL-15 — কেন্দ্র-রাজ্য সম্পর্ক ও তফসিল — Draft Report

Status: DRAFT, verification UNVERIFIED. Validator: `node scripts/validateBooks.js ~/workspace/edtech/bookwork/pol-15/chapter.json` → **OK**.

## Deliverables
- `chapter.json` — complete chapter (11 parts), 7 sections
- `pyq_map_POL-15.json` — PYQ mapping (companion file)

## Sources actually fetched (via browser text-fetch)
1. **The Constitution of India [As on 1st May, 2024]**, Legislative Department, Ministry of Law and Justice — https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf — read verbatim: Arts. 1–4 (pp. 1–2), 245–263 (pp. 144–151), 266–281 incl. 269A/279A (pp. 152–163), 293 (p. 167), 312 (p. 175), 368 proviso (p. 229), Schedules contents (pp. xxvii–xxviii), Seventh Schedule lists (pp. 315–324), Eighth Schedule (pp. 325–326), Ninth Schedule (pp. 327–328), Tenth Schedule footnote (p. 346), Eleventh (p. 349) and Twelfth (p. 350) Schedules, Appendix I — 100th Amendment (pp. 351–355).
2. **Attempted but not fetched:** NCERT *Indian Constitution at Work* (Class XI), Chapter 7: Federalism — https://ncert.nic.in/textbook/pdf/keps207.pdf — the browser text-fetch failed with a network error on the single permitted attempt. No NCERT claims are used anywhere in the chapter; the chapter is built on the Constitution text alone (the polity validator profile allows GOVT sources). This is the run's main source gap.

## Counts
- Claims: **57** (c01–c57), every claim with a verbatim quote from the fetched Constitution PDF; every claim is used at least once (validator-enforced).
- Practice questions: **43** — basic 14, moderate 14, difficult 8, exam 7 (formats: DIRECT, STATEMENT ×2, MATCH ×2, PAIRS, ASSERTION_REASON, CHRONOLOGY). Every section has ≥5 questions; every question cites its supporting claim ids.

## PYQs
- `pyq_map.json` has **0 entries under POL-15**, so candidates were searched in `~/workspace/edtech/BE/db/pyq` (2,991 bank questions) for genuine centre–state relations / schedules questions.
- Candidates found: **19** — mapped: **19**, taught: **9**, untaught: **10**.
  - Taught: WBCS 2016 Q38 (Concurrent List 47 — taught with the 47→52 note), WBCS 2019 Q117 (Seventh Schedule), WBCS 2021 Q104 (Inter-State Council — President), WBCS 2022 Q67 (Education — Concurrent List), WBCS 2023 Q43 (anti-defection — 52nd Amendment), Clerkship 2023 Session-I Q75 (GST Council — Finance Minister), WBCS 2016 Q64 (Article 1), WBCS 2019 Q123 (Article 280), WBCS 2018 Q91 (FC = chairperson + 4).
  - Untaught: WBCS 2016 Q44 & 2022 Q60 (D. D. Basu attribution — source gap, see below), WBCS 2019 Q112 (laying of reports — only the FC limb taught), WBCS 2016 Q28 (number of FC reports — time-varying, POL-18), WBCS 2024 Q166 (FC/NCW statement — POL-18/19), WBCS 2022 Q156, Clerkship 2023 Session-IV Q32 & Clerkship 2005 Q51 (emergency / President's Rule — POL-16), Clerkship 2019 Forenoon Q37 (not-a-UT — individual First Schedule lists not in fetched quotes), WBCS 2023 Q161 (SC reservation exemption in PRIs — POL-20).

## Subtopic coverage (subtopics: federalism_emergency, schedules_articles)
- federalism_emergency (the centre–state half; emergency *provisions* proper are POL-16): Union of States and State reorganisation (Arts. 1–4), legislative relations (245–255: three lists, residuary powers, Arts. 249/250/252/253 gateways, repugnancy 254), administrative relations (256–258A, 261, 262, 263), All India Services (312), financial relations (266, 268–271, 273, 275, 293), GST (246A, 269A, 279A) and the Finance Commission (280–281), federal safeguard in Art. 368's ratification proviso.
- schedules_articles: all 12 Schedules mapped to subject and linked article; Seventh Schedule lists in depth (entries, counts, 42nd Amendment transfers); Eighth Schedule's 22 languages and the 21st/71st/92nd/96th Amendment additions; Ninth (1st Amd 1951), Tenth (52nd Amd 1985), Eleventh (29 items, 73rd Amd) and Twelfth (18 items, 74th Amd) Schedules.

## Gaps (disclosed, not filled)
- **NCERT Federalism chapter not fetched** (network failure, single attempt): no NCERT-sourced claims; NCERT-style framings (e.g. lists of "federal features" / "unitary features") are instead derived strictly from the constitutional articles themselves.
- **D. D. Basu quote** (WBCS 2016 Q44, repeated 2022 Q60): the attribution is in neither the Constitution text nor any fetched source, so the chapter does not name it; recorded untaught in the PYQ map.
- **Sarkaria Commission, Punchhi Commission, Zonal Councils, the 1990 constitution of the Inter-State Council, GST rates/slabs, Finance Commission award percentages**: none of these are in the Constitution text, and no other source was fetched, so all are deliberately omitted rather than stated from memory.
- **List sizes**: stated only as the fetched text supports — numbered entries run to 97 (List I), 66 (List II) and 47 (List III), with five inserted Concurrent entries (11A, 17A, 17B, 20A, 33A) making 52. The textbook "100/61" totals are not asserted.
- **No `people` block**: no person is named in the fetched sources within this chapter's scope (the polity profile makes `people` optional); `events` and `timeline` are built from the amendment footnotes in the Constitution text itself.
- Constitution PDF text extraction is two-column scrambled; quotes were assembled only from fragments actually visible in the fetched text, as in POL-09/POL-12.
