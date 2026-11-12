# Brief: Modern History batch 2 = Batch 1 of the completion plan (HIS-21, HIS-20, HIS-23): Bengali, NCERT + WBBSE VIII

Today is 2026-11-12. Repo root: `F:\CODE\GIT EDTECH\EDTECH_BE` (written below as `<BE>`). This batch follows
`BRIEF_PILOT.md` and `BRIEF_MODERN_1.md` (same folder): read both, then this file. Where they name paths on another machine
(`E:\EDTECH\...`, `C:\Users\DESKTOP\...`), use the paths below instead. `docs/HISTORY_BOOK_PLAN.md` is NOT available:
take scope from `<BE>/db/books/history/toc.js`, the boundaries listed here, and the published chapters.

## Model to imitate
Read one published chapter end to end before writing: `<BE>/db/books/history/ch24-gandhian-era-1.json` (structure,
register, length, box usage, "আগে যা জানা দরকার" recap, claims style, question style). Match its depth and length
(about 7-8 sections, 150-200 claims, 40-50 questions: basic 10, moderate 15+, difficult 10, exam 5+ using at least 3
exam formats). Format rules: `<BE>/db/books/README.md`. Do not change the schema, validator, frontend or any other file.

## Sources (approved: NCERT + WBBSE Class VIII only)
- NCERT PDFs and `pdftotext` text are in `C:\Users\IV DISPLAY\edtech-sources\ncert\<code>.pdf|.txt`. Relevant:
  `hess206` Civilising the "Native", Educating the Nation; `hess207` Women, Caste and Reform; `hess208` The Making of the
  National Movement 1870s-1947; `hees104` The Colonial Era in India (new Class 8 Part 1); `hees202` India's Long Road to
  Independence (new Class 8 Part 2); `jess302` Nationalism in India (Class 10); `lehs301`-`lehs304` (Class 12 Themes III).
  Other NCERT chapters may be downloaded into the same folder (`curl -sL -A "Mozilla/5.0" -o <code>.pdf https://ncert.nic.in/textbook/pdf/<code>.pdf`, then `pdftotext -enc UTF-8`). Source URLs in the chapter are always the `https://ncert.nic.in/textbook/pdf/<code>.pdf` form.
- WBBSE / Banglar Shiksha *অতীত ও ঐতিহ্য*, Class VIII. Official URL
  `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20o%20Aityaja%20Class%20VIII.pdf` (downloaded 2026-11-12;
  153,707,557 bytes; server Last-Modified 24 Mar 2025; sha256 f3ae979d21229edb5ff601ad241f24086ee3bd6d329f5cbee7a636b9eef9c71b).
  Local copy `C:\Users\IV DISPLAY\edtech-sources\wbbse\Atit_o_Aityaja_Class_VIII.pdf`; OCR text one file per PDF page in
  `C:\Users\IV DISPLAY\edtech-sources\wbbse\ocr_Atit_VIII\page_NNNN.txt`. Grep the OCR (Bengali), then quote **as printed**
  (correct the OCR's spelling mistakes; if unsure, view the page image with the Read tool on the PDF, `pages: "N"`), with
  `page: "PDF p. N"`. Source entry exactly as in ch24 (publisher WBBSE, class VIII, same title).
- **No other books** (no WBBSE Class VI/IX/X, no websites, no memory). If an exam-relevant fact is in neither NCERT nor
  WBBSE VIII, leave it out and list it under "source gaps" in your report. Do not force a WBBSE citation where the book does
  not actually say it.
- Check quotes:
  `node <BE>/scripts/content/checkQuotes.js <chapter.json> --text <ncertSourceId>=C:\Users\IV DISPLAY\edtech-sources\ncert\<code>.txt ... --text <wbbseSourceId>=C:\Users\IV DISPLAY\edtech-sources\wbbse\ocr_Atit_VIII`.
  NCERT quotes must be OK; WBBSE quotes OK_OCR. List every NEEDS_PAGE_CHECK id in your report.

## Exam focus
Readers prepare for WBPSC Clerkship, WBCS, WBP/KP constable/SI and SSC. Use your PYQ candidate file to see what is
actually asked and weight the text accordingly: the most-asked facts get the clearest explanation, a `remember` or
`exam_note` box and an `exam_focus` point. Academic detail with no exam value gets a sentence, not a section.
Important places belong inside the text, terms or exam_focus (there is no places field; do not add one).

## Your files (write only these)
- `<BE>/db/books/history/drafts/<file>.json` (the chapter, `status: "DRAFT"`, `verification.status: "UNVERIFIED"`)
- `<BE>/db/books/history/drafts/pyq_map_<code>.json` (format: see `pyq_map_HIS-24.json`)
- Candidate PYQs: `<BE>/db/books/history/drafts/pyq_candidates_<code>.json` (read-only). `primary: false` items belong mainly
  to `primary_chapter`; teach them only if they fall inside your scope. `doubtful_key: true` items: follow BRIEF_MODERN_1 §3
  (the official WBPSC key stays authoritative; write an exam_note if the textbooks differ; list each case).

## Chapter boundaries (no overlap; link instead)
- HIS-20 `ch20-bengal-renaissance.json`, সমাজ ও ধর্মসংস্কার: বাংলার নবজাগরণ. Western education and its institutions
  (Fort William College, Hindu College, Calcutta University etc. as the books support), the press, Rammohun Roy and the
  Brahmo movement, sati abolition, Derozio/Young Bengal, Vidyasagar and widow remarriage, women's education, later
  reform movements across India (Arya Samaj, Ramakrishna-Vivekananda, Satyashodhak/Phule, Aligarh, Prarthana Samaj,
  Theosophy etc. as supported), caste reform. Prerequisites: HIS-17 (not yet written; recap briefly). Stops before
  political associations (HIS-21).
- HIS-21 `ch21-early-congress.json`, জাতীয়তাবাদের উত্থান ও আদি কংগ্রেস (১৮৮৫–১৯০৫). Causes of nationalism, pre-Congress
  associations (incl. Bengal ones: Landholders' Society, British Indian Association, Indian Association, etc. as
  supported), Lytton-era grievances, Ilbert Bill, founding of INC 1885, early sessions and presidents, the Moderates,
  their methods and demands, drain of wealth / economic critique, the rise of the Extremist trend up to 1905. Stops at
  1905: Partition and Swadeshi, Surat split 1907, Muslim League 1906 are HIS-22 (published; link to it).
- HIS-23 `ch23-revolutionaries.json`, বিপ্লবী আন্দোলন. Revolutionary nationalism in Bengal, Maharashtra, Punjab and
  abroad: Anushilan, Jugantar, Alipore bomb case, Khudiram, Prafulla Chaki, Aurobindo, Bagha Jatin, Rash Behari Bose,
  Ghadar, Bhagat Singh and HSRA, Chittagong armoury raid and Surya Sen, Bengal Volunteers / Writers' Building, women
  revolutionaries (Pritilata, Bina Das, etc.) — only as far as the sources support. Prerequisites: HIS-22.
  Boundary: Gandhian movements are HIS-24/25; INA is HIS-26 (link).

## Report (reply)
Sources used (book, chapter, pages); sections; word counts per depth; claims and questions per level; quote-check
counts and NEEDS_PAGE_CHECK ids; PYQ map counts (taught / not taught, with reasons); NCERT-vs-WBBSE disagreements;
doubtful keys handled; source gaps (exam facts neither book supports); validator result
(`cd <BE> && node scripts/validateBooks.js <your file>`); recommended corrections to existing GK facts/factbank items your sources contradict (with quote).
