# Brief: History book pilot chapter (Bengali, NCERT only)

Today is 2026-11-11. You are writing ONE chapter of a textbook-style History book for West Bengal students who
are preparing for WBPSC Clerkship, WBCS, WB Police (WBP/KP) and SSC, **starting from zero knowledge**. The owner
will read this pilot chapter as a beginner would before any more chapters are written, so quality and accuracy matter
more than length.

## Read first
1. `E:\EDTECH\backend\db\books\README.md`: the exact chapter format and rules. Follow it exactly.
2. `E:\EDTECH\docs\HISTORY_BOOK_PLAN.md` §4 (table of contents), §7 (depth) and §8 (questions).
3. `E:\EDTECH\backend\db\gk\indian_history.jsonl`: existing facts and packs on your topic (grep your subtopic). Reuse
   their NCERT quotes when they support a claim, but re-check each quote against the PDF yourself.

## The goal
A student who has never studied History reads the Standard text and can explain **what happened, why, who was
involved, when, what the result was and why it matters for the exam**, without searching elsewhere.
- Explain from the ground up. Define every term the first time it is used, and say why things happened.
- Teach, do not list. Paragraphs that explain, with lists and tables where they help.
- Write natural Bengali in your own words (not a translation of NCERT sentences), in the register of a good WBBSE textbook.
- Length: Standard about 3,000-4,000 Bengali words across all sections; Quick 2-4 sentences per section; Deep
  150-500 words where it adds real depth.

## Sources: NCERT and WBBSE textbooks only
- WBBSE / Banglar Shiksha e-Text Books are allowed as the West Bengal-specific foundation (owner, 2026-11-11):
  `https://banglarshiksha.wb.gov.in/readwrite/etextbook/Atit%20O%20Aityaja%20History%20Class%20VII.pdf` and
  `.../Atit%20o%20Aityaja%20Class%20VIII.pdf` (History), `.../Amader%20Prithibi%20Class%20VI.pdf` etc. (Geography).
  The files are large (about 150 MB): download with `--max-time 1500`. Use them first for Bengal-specific facts.
- The WBBSE books are **scanned images** with no text layer. Their OCR text (Tesseract, Bengali) is in
  `C:UsersDESKTOPedtech-sourceswbbseocr_Atit_VII` and `...ocr_Atit_VIII` (one `page_NNNN.txt` per PDF page).
  Search the OCR text to find the passage, then write the quote **as printed** (correct Bengali, not the OCR mistakes)
  and give the PDF page number. If the book is not yet OCR'd, run
  `python -I scripts/content/ocrTextbook.py <book.pdf> <out_dir>` (about 7.5 s per page).
- Check quotes with `node scripts/content/checkQuotes.js <chapter.json> --text s1=<ncert.txt> --text s3=<ocr dir>`.
  NCERT quotes must be OK. WBBSE quotes must be OK_OCR (similarity ≥ 0.85); list every NEEDS_PAGE_CHECK in your
  report so the second reader confirms it against the page image.
- Download PDFs with `curl -sL -A "Mozilla/5.0" -o <file> https://ncert.nic.in/textbook/pdf/<code>.pdf` into your own
  scratch folder (named in your task) and extract them with `pdftotext -layout`. Retry once if a download fails.
- Useful NCERT books (check which chapters exist; codes are `<class letter><lang e><subject><chapter>`):
  Class 12 *Themes in Indian History* I-III (`lehs101`…, `lehs201`…, `lehs301`…); Class 8 *Our Pasts III* (`hess201`…)
  and the new *Exploring Society* Class 8 (`hees101`…, `hees201`…); Class 7 (`gess1xx`, `gees1xx`); Class 6 (`fess1xx`,
  `fees1xx`); Class 10 *India and the Contemporary World II* (`jess301`…). Each book's chapter-list PDF is `<code>ps.pdf`
  or `<code>an.pdf`; try them if you need the contents.
- Every date, name, number, place and causal claim goes in `claims[]` with a **verbatim** English quote from a PDF you
  downloaded, plus the page. Check every quote against the extracted text with a script (ignore whitespace, quote-mark
  and dash differences), and report any you could not match.
- If NCERT does not support a detail, leave it out, even if it is a well-known exam fact. List such omitted
  "exam facts" in your report so the owner can see the gap.
- If NCERT books disagree with each other, or with a common exam answer, write an `exam_note` box saying so.

## Questions (about 40)
basic 10, moderate 15, difficult 10, exam 5+ (STATEMENT, MATCH, CHRONOLOGY, ASSERTION_REASON or PAIRS; use at least 3
of these formats). Bengali only. Every question names its `section` and `claims`. Every option must be decided by the
claims: the correct one clearly supported, the distractors clearly wrong (use other real names and dates from the chapter
where possible). There must be one correct answer only. The explanation says why the answer is right and why the
nearest distractor is wrong. Do not copy PYQ wording: these are original practice questions.

## PYQ map
Your task names a candidate file of real previous-year questions (PYQs). For each candidate, decide whether your chapter
teaches the answer. Write `pyq_map_<code>.json` next to your chapter: an array of
`{ "pyq_code", "section", "taught": true|false, "note" }`. `taught: true` only if a student who read your Standard
text can answer it. For `false`, say which chapter of the plan's §4 it belongs to, or "not in NCERT".
Where a PYQ's official answer conflicts with NCERT, note it.

## Do not
- Edit any file except the ones your task names.
- Write anything from memory. Invent quotes. Label your questions as PYQs.

## When done
Run the validator: `cd E:\EDTECH\backend && node scripts/validateBooks.js <your file>` (if the script does not exist yet,
check that the JSON parses and follows the README rules yourself). Reply with a short report: word counts per depth,
sections, number of claims and questions per level, quotes you could not match, exam facts left out for lack of an NCERT
source, NCERT-vs-exam-key conflicts, and the PYQ map counts (taught / not taught).
