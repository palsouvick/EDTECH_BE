# Brief: Modern History batch 1 (HIS-26, HIS-25, HIS-24): Bengali, NCERT + WBBSE

Today is 2026-11-11. This batch follows the pilot rules in `BRIEF_PILOT.md` (same folder): read it first and follow
everything there (format `db/books/README.md`, Bengali only, own words, claims with verbatim quotes, about 40 questions,
PYQ map, no pipe tables, run the validator). Below is what is **new or different** for this batch.

## 1. Sources: NCERT + WBBSE
- NCERT for the all-India story: Class 8 *Exploring Society* Part 2 Ch 2 (`hees202`), Class 8 *Our Pasts III* Ch 8
  (`hess208`), Class 10 *Nationalism in India* (`jess302`), Class 12 *Themes III* (`lehs303` Gandhi, `lehs304` Framing of the Constitution / Partition
  chapters: check which `lehs30x` files exist).
- **WBBSE / Banglar Shiksha *অতীত ও ঐতিহ্য*, Class VIII** for the Bengal side and the Bengali terms WB students learn:
  PDF `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20o%20Aityaja%20Class%20VIII.pdf` (do not download it again).
  The local copy is `C:\Users\DESKTOP\edtech-sources\wbbse\Atit_o_Aityaja_Class_VIII.pdf`, and its OCR text, one file per PDF page,
  is `C:\Users\DESKTOP\edtech-sources\wbbse\ocr_Atit_VIII\page_NNNN.txt`. The OCR is still finishing the last pages: if
  a page you need is missing, work on other parts first and look again later (pages arrive in order, about 8 per minute).
  Grep the OCR text (Bengali) to find passages. Then write the quote **as printed** (correct Bengali spelling, not the OCR's
  mistakes) and give `page: "PDF p. NNN"`. In `sources`, use the official URL above with `"publisher": "WBBSE"`,
  `"class": "VIII"`, and title `"অতীত ও ঐতিহ্য, অষ্টম শ্রেণি (পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ)"`.
- Check quotes:
  `node scripts/content/checkQuotes.js <chapter.json> --text <ncertId>=<extracted.txt> ... --text <wbbseId>=C:\Users\DESKTOP\edtech-sources\wbbse\ocr_Atit_VIII`.
  NCERT quotes must be OK. WBBSE quotes must be OK_OCR. List every NEEDS_PAGE_CHECK in your report.
- When NCERT and WBBSE disagree (dates, names, emphasis), write an `exam_note` with both. Do not pick one silently.

## 2. Continuity (prerequisites)
These chapters are written before the chapters they build on. Do not leave a beginner stranded:
- Set `prerequisites` to the earlier chapters the reader needs (e.g. HIS-26 → ["HIS-25", "HIS-23"]).
- In the first section, add a short **"আগে যা জানা দরকার"** recap (a `remember` box, 80–150 words). It should restate the
  minimum earlier facts the chapter relies on, with claims, and end with a line like **"আরও জানতে আগে পড়ো: HIS-25 — …"**.
  Do the same inside a later section wherever it suddenly depends on an earlier idea (for example, separate electorates
  → HIS-22).
- Chapter scope and boundaries are as in `docs/HISTORY_BOOK_PLAN.md` §4. Do not teach in depth what belongs to another
  chapter; link to it instead.

## 3. PYQs and disputed answer keys
- Your candidate file `drafts/pyq_candidates_<code>.json` lists every History PYQ whose chapter (`primary: true`) or
  alternative chapter is yours, with exam, options and the app's answer. Make the chapter teach, as far as NCERT/WBBSE support
  it, what these questions ask. Then write `pyq_map_<code>.json` as in the pilot.
- Items marked `doubtful_key: true` have an official answer that readers questioned. The **official WBPSC key stays
  authoritative**: never contradict it silently, and never write a question that implies a different answer is "the exam
  answer". If your sources state something different, add an `exam_note` saying exactly what the textbook says and that the
  official key of that paper differs (name the paper). In your report, list each such case.
  Known case for HIS-26: WBCS 2023 Q157 "first Individual Satyagrahi": the official key is Rajendra Prasad (Vinoba Bhave is
  not among its options).

## 4. Your report must cover
sources used (books, chapters, pages); topics covered (sections); exam relevance (which WB exams, from the PYQ map);
PYQs connected (taught / not taught, with reasons); fact-check status (quote check counts); disputed facts (NCERT vs
WBBSE, or within a book); answer-key conflicts; missing content (exam facts neither book supports); recommended
corrections (to existing GK facts, factbank or packs that your sources contradict, with the quote).
