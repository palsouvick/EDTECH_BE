# Brief for batch WB1 — West Bengal GS for WBPSC Clerkship Part-I

Today is **2026-11-10**. Follow `E:\EDTECH\backend\db\gk\drafts\BRIEF.md` and `E:\EDTECH\backend\db\gk\README.md`
exactly, with these changes:

- `accessed_at` is `"2026-11-10"`.
- Write only your assigned file in `E:\EDTECH\backend\db\gk\drafts\wb1\` (and its `.issues.json` if you find issues).
- Use exactly the code range you are given, in order, with no gaps.
- **About 15 facts** (12–16). Accuracy beats count: drop anything you cannot quote from a page you fetched.
- `exam_relevance` must include `WBPSC_CLERKSHIP`; add `WBPSC_MISC`, `WBCS`, `WB_POST` where the syllabus fits.
- Difficulty for Clerkship level: mostly 2–3 (Madhyamik-plus). Avoid trivia such as exact rupee amounts that change
  every budget, unless the official page states them and you mark the fact `CHANGING` with `valid_from` and
  `review_by: "2027-04-30"`.
- **Sources:** official only — wb.gov.in and West Bengal department / scheme portals (e.g. wbkanyashree.gov.in,
  socialsecurity.wb.gov.in, swasthyasathi.gov.in, krishakbandhu.net, wbsedcl, wbforest.gov.in, wbtourism.gov.in,
  wbassembly.gov.in, calcuttahighcourt.gov.in, wbsec.gov.in, ceowestbengal.wb.gov.in, district sites *.nic.in / *.gov.in),
  PIB, central ministry sites, censusindia.gov.in, NCERT, ASI, UNESCO, and the institution's own site.
  **No Wikipedia, no coaching sites, no news sites, no blogs.** If an official page cannot be fetched, say so and
  drop the fact; do not substitute a non-official page.
- Scheme names: give the official English spelling and the official Bengali name where the portal shows it.
- Changing facts (office-holders, number of districts, beneficiary counts, amounts): `fact_kind: "CHANGING"`,
  `dates.valid_from` = the date the source states (or the accessed date), `review_by: "2027-04-30"`.
- Before you start, grep `E:\EDTECH\backend\db\gk\*.jsonl` and `E:\EDTECH\backend\scripts\generators\factbank\west_bengal_gk*.js`
  so you do not duplicate an existing fact; use `linked_existing` for matching existing questions as BRIEF.md says.
- Save fetched pages in your own scratch folder: `C:\Users\DESKTOP\AppData\Local\Temp\claude\3334be2ac0865473\44d77a66-034e-4f85-b38d-c46a6fe8c6a8\scratchpad\wb1\<your-pack>\`
  and check every quote against the saved text by script.
- Run the repo validator on your file before finishing (command in BRIEF.md, with the path `db/gk/drafts/wb1/<file>`).
