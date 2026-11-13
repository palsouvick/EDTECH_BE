# Brief: Geography book pilot chapter (Bengali)

You are writing ONE chapter of a textbook-style Geography book for West Bengal students preparing for WBPSC
Clerkship, WBCS, WB Police (WBP/KP) and SSC, **starting from zero knowledge**. The owner reads the pilot as a beginner
would before more chapters are written, so accuracy and clarity matter more than length.

**The owner's instruction for Geography (2026-11-13): cover what exams actually ask, and the content needed to
understand it — nothing padded.** Use the PYQ candidate list (below) to see what is asked, and make sure the
Standard text teaches those things. Leave out textbook detail that no exam asks and no beginner needs.

## Read first
1. `E:\EDTECH\backend\db\books\README.md`: the exact chapter format and rules, **including the Geography section at
   the end** (`locate` table required, no timeline needed, government sources allowed for list facts).
2. `E:\EDTECH\docs\GEOGRAPHY_BOOK_PLAN.md` (plan; the table of contents is in `db/books/geography/toc.js`).
3. One published History chapter as a model of structure, tone and depth:
   `E:\EDTECH\backend\db\books\history\ch22-partition-swadeshi.json` (read the overview, two sections, some boxes and
   ten questions; do not copy its content).
4. Existing GK facts on your topic: `E:\EDTECH\backend\db\gk\geography.jsonl` (grep your subtopic). Reuse a quote only
   after re-checking it against the source yourself.

## The goal
A student who has never studied Geography reads the Standard text and can say **where a thing is, what it is, why it
is like that, and what the exam asks about it**, without searching elsewhere.
- Explain from the ground up; define each term the first time (উৎস, মোহনা, উপনদী, বদ্বীপ, জলবিভাজিকা …).
- Teach, do not list: short paragraphs that explain, then tables for the facts students must memorise.
- Natural Bengali in your own words (not a translation), the register of a good WBBSE textbook. Use the Bengali
  names students meet in WBBSE books, with the English name in brackets once: `সিন্ধু (Indus)`.
- Length: Standard about 2,500–3,500 Bengali words over 4–8 sections; Quick 2–4 sentences per section; Deep only
  where it adds real WBCS-level depth.
- Boxes: `exam_note` for things exams ask and traps; `dont_confuse` for look-alikes (e.g. two rivers with similar
  names); `remember` for memory aids. Write "official key" only for papers that have one (WBCS 2020–24, Clerkship
  2023, IDO 2019).

## Sources (official only; never from memory)
1. **NCERT** (`https://ncert.nic.in/textbook/pdf/<code>.pdf`, confirmed online 2026-11-13):
   XI *India: Physical Environment* `kegy101`…`kegy107` (location, structure/physiography, **drainage = ch 3**,
   climate, vegetation, soils, hazards); XI *Fundamentals of Physical Geography* `kegy201`…; X *Contemporary India II*
   `jess101`… (resources, water resources and dams, agriculture, minerals, industries, transport); VII *Our
   Environment* `gess201`…; VIII *Resources and Development* `hess401`…; XII *India: People and Economy* `legy201`….
   Check a chapter exists before relying on it. Download with
   `curl -sL -A "Mozilla/5.0" -o <file> https://ncert.nic.in/textbook/pdf/<code>.pdf` and extract with
   `pdftotext -enc UTF-8 -layout`.
2. **WBBSE / Banglar Shiksha** *আমাদের পৃথিবী* Classes VI, VII, VIII (Bengali; the West Bengal foundation and the
   source of Bengali terms). PDFs: `C:\Users\DESKTOP\edtech-sources\wbbse\Amader_Prithibi_Class_{VI,VII,VIII}.pdf`;
   OCR text (one `page_NNNN.txt` per PDF page): `...\wbbse\ocr_Prithibi_{VI,VII,VIII}\`. Official URLs:
   `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Amader%20Prithibi%20Class%20VIII.pdf` (VI, VII likewise).
   Write the quote **as printed** (correct the OCR errors) with the PDF page number.
3. **Official government pages** (`*.gov.in`, `*.nic.in`) only for list facts the books lack (districts, dams,
   national parks). Quote verbatim, give `accessed_at`. Never Wikipedia, news or coaching sites.

Every place, number, name and causal statement goes in `claims[]` with a verbatim quote and page. Check quotes with
`node scripts/content/checkQuotes.js <chapter.json> --text s1=<ncert.txt> --text s3=<ocr dir>` (NCERT quotes must be
OK; WBBSE quotes OK_OCR; list every NEEDS_PAGE_CHECK in your report). If no allowed source supports a detail, leave it
out and list it in your report as an "exam fact left out". If sources disagree with each other or with a PYQ's
official answer, write an `exam_note` saying so, quoting both.

## Questions (about 40)
basic 10, moderate 15, difficult 10, exam 5+ (STATEMENT, MATCH, PAIRS, ASSERTION_REASON; at least 3 formats; MATCH
and PAIRS suit Geography well — river ↔ origin, dam ↔ river). Bengali only. Every question names its `section` and
`claims`. One correct answer only, decided by the claims; distractors are real names from the chapter that are clearly
wrong. The explanation says why the answer is right and why the nearest distractor is wrong. No "all/none of the
above". Do not copy PYQ wording.

## PYQ map
For every entry in your candidate file decide whether your chapter teaches the answer. Write `pyq_map_<code>.json`
next to your chapter: `[{ "pyq_code", "section", "taught": true|false, "note" }]`. `taught: true` only if a student who
read your Standard text can answer it. For `false`, name the GEO chapter it belongs to (see toc.js) or say "not in
sources". Note any official key that conflicts with the sources. Aim: **every candidate that belongs to your chapter's
topic is taught**, unless no allowed source supports it.

## Do not
Edit any file except the ones your task names. Write anything from memory. Invent or "tidy" quotes. Label your
questions as PYQs.

## When done
Run `cd E:\EDTECH\backend && node scripts/validateBooks.js <your file>` and fix every error. Reply with a short report:
word counts per depth, sections, claims, questions per level and format, quotes not matched or NEEDS_PAGE_CHECK, exam
facts left out (no source), source vs official-key conflicts, PYQ map counts (taught / not taught / belongs elsewhere).
