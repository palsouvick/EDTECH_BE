# Brief (FAST): one Geography book chapter in Bengali

Owner's rule (2026-11-13): **write from the West Bengal Board / school textbooks quickly. No word-by-word
validation.** Accuracy of facts still matters (students learn from this), but there is no quote checker, no blind
re-read of the prose, and no hunting for extra sources. One quick answer-key check happens after you finish.

You write ONE chapter: the code and title are in your task (see `db/books/geography/toc.js`).

## Read first (quickly)
1. `E:\EDTECH\backend\db\books\README.md`: the chapter JSON format (incl. the Geography section at the end:
   `locate` table of at least 6 rows is required; no timeline/events/people).
2. The finished chapter `E:\EDTECH\backend\db\books\geography\ch03-rivers-lakes.json` as the model of structure,
   tone and depth (read the overview, two sections, the locate table, a few boxes and 10 questions; do not copy it).

## Sources (already on disk; use these, nothing else)
- **WBBSE আমাদের পৃথিবী Class VIII (main West Bengal source, Bengali terms)**, also VI and VII:
  OCR text, one file per PDF page: `C:\Users\DESKTOP\edtech-sources\wbbse\ocr_Prithibi_{VI,VII,VIII}\page_NNNN.txt`.
  (WBBSE has no free official Geography textbook for Class IX–X; the NCERT books below stand in for that level.)
- **NCERT** text files in `C:\Users\DESKTOP\edtech-sources\ncert\`: `kegy101`–`kegy106` (XI India: location,
  structure/physiography, drainage, climate, vegetation, soils), `jess101`–`jess103` (X: resources, forests, water),
  `kegy201`–`kegy211` (XI physical geography), `legy201`–`legy207` (XII people & economy), `gess2xx/3xx` (VI–VII).
  Grep them; read only the pages you need.
- Official `*.gov.in` / `*.nic.in` pages only for a list fact the books lack (state capitals, national parks).

## What to write
- Cover what exams ask: grep `E:\EDTECH\backend\db\books\geography\drafts\pyq_all.json` (188 real past questions,
  English) for your chapter's topics and make sure the Standard text teaches those answers.
- Natural Bengali in your own words (do not copy textbook sentences), the register of a good WBBSE book; define each
  term the first time; Bengali name with the English in brackets once: `হিমালয় (Himalaya)`.
- Standard about 2,000–3,000 Bengali words over 4–7 sections; Quick 2–4 sentences per section; Deep only where it
  adds real exam depth. Tables for facts to memorise; `exam_note`, `dont_confuse`, `remember` boxes.
- **Claims: keep them coarse, about 15–40 per chapter.** One claim can cover a paragraph's facts: `claim` = what it
  supports, `quote` = one short line from the source page (OCR errors corrected; no need to be exact), `source` +
  `page`. Every section, locate row and question must list the claims it rests on (the validator requires it).
- Write only facts you found in the sources. If a source lacks a fact, leave it out.

## Questions (about 40)
basic 10, moderate 15, difficult 10, exam 5+ (STATEMENT, MATCH, PAIRS, ASSERTION_REASON; at least 3 formats).
Bengali only. Each names its `section` and `claims`. Exactly one correct answer, decided by your sources; distractors
are real names that are clearly wrong. Explanation: why the answer is right and why the nearest distractor is wrong.
No "all/none of the above". Do not copy PYQ wording and never label questions as PYQs.
**Every question stem must name its topic** (other chapters are written at the same time, and two chapters with an
identical stem make the loader drop a whole chapter): not "নীচের কোন জোড়টি সঠিকভাবে মেলানো?" but
"ভারতের কৃষি সম্পর্কে নীচের কোন জোড়টি সঠিকভাবে মেলানো?". Same for STATEMENT / ASSERTION_REASON lead-ins.

## Status fields
`"status": "DRAFT"`, `"verification": { "status": "UNVERIFIED", "checked_at": null, "notes": "" }` (the key check sets
it). File name: `db/books/geography/chNN-<short-english-slug>.json`.

## Finish
Run `cd E:\EDTECH\backend && node scripts/validateBooks.js <your file>` and fix every error until it passes. Edit
no other file. Reply in under 150 words: file, word count (standard), sections, claims, questions per level/format,
exam topics you could not cover from the sources.
