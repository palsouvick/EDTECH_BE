# Batch 2 (Indian GK expansion), on top of BRIEF.md

Read `E:\EDTECH\backend\db\gk\drafts\BRIEF.md` first: every rule there applies, including "Practical notes".
Differences for this batch:

- **Size:** about **18–20 facts and about 30 questions** (1–2 questions per fact, sometimes 3). Accuracy still beats count.
- **Codes:** use ONLY the code range given in your task (e.g. GK-SGK-101 upward). Never reuse a code.
- **Output:** write ONLY `E:\EDTECH\backend\db\gk\drafts\b2\<batch>.jsonl` (and `<batch>.issues.json` if needed). `topic` must
  still be the card code from gkTaxonomy.js (indian_gk, static_gk, economy, art_culture), even though the file is named
  after the batch.
- **No duplicates:** grep the verified library `E:\EDTECH\backend\db\gk\*.jsonl` and the factbank
  `E:\EDTECH\backend\scripts\generators\factbank\*.js`. Do not repeat a fact the library already has, and do not write a question
  whose English stem matches an existing one; link existing questions in `linked_existing` instead.
- **Exam focus:** WBPSC Clerkship / WBCS / SSC / Railway level. Prefer facts that are asked repeatedly. Mix difficulty:
  about 40% d1–2, 40% d3, 20% d4–5.
- **Sites known to block automated access:** whc.unesco.org, ich.unesco.org, olympics.com, padmaawards.gov.in,
  legislative.gov.in (JS only) and india.gov.in (JS only). Find the same fact on another official page (PIB releases,
  ministry sites, the institution's own site, NCERT); otherwise drop it.
- Check your file with the repo validator before finishing (command in BRIEF.md practical notes).
