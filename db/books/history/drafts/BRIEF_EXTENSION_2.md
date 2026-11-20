# Brief: extension pass 2 — teach the untaught PYQs of one published chapter

Today is 2026-11-20. Repo root `E:\EDTECH\backend` (written `<BE>`). This is the same kind of work as the History
extension pass of 2026-11-19 (read `<BE>/db/books/history/drafts/ext_HIS-08_EXTENSION_REPORT.md` first: it is the model).
Format rules: `<BE>/db/books/README.md`. Do not change the schema, validator, frontend, `pyq_map.json`, or any file
other than the three you are told to write.

## Goal
The owner's goal is **PYQ → topic → proper study content → practice → revision**. A student who meets one of these
past questions must be able to *study the fact in the chapter*, not just see the answer. Your worklist
(`ext2_<CODE>_worklist.json` in the same drafts folder as your chapter) lists every past exam question whose home is your
chapter and which **no chapter teaches yet**, with the earlier reader's note on why. Teach as many as can be taught
**honestly from allowed sources**; leave the rest untaught with a precise reason. Never force one.

## Allowed sources (validator-enforced, per book)
- **history** (HIS-xx): NCERT, WBBSE (অতীত ও ঐতিহ্য VII/VIII), **IGNOU eGyanKosh** (`egyankosh.ac.in`), **NIOS**
  (`nios.ac.in`, e.g. Senior Secondary History 315 lessons), **e-PG Pathshala / INFLIBNET** (`inflibnet.ac.in`).
  IGNOU/NIOS/e-PG were admitted on 2026-11-19 — most worklist notes ("not in NCERT") were written *before* that, so
  these items are your main opportunity.
- **static_gk** (STG-xx): **GOVT** (`*.gov.in`, `*.nic.in`: PIB, Ministry of Youth Affairs & Sports `yas.gov.in`,
  Sports Authority of India, CAG, etc.) and **NCERT** (e.g. the Class XI/XII *Health and Physical Education* books for
  Olympic basics — rings, motto, history — find the code on ncert.nic.in).
- Nothing else: no Wikipedia, news sites, ICC/FIFA/IOC sites, coaching material, or memory. A fact no allowed page
  states stays untaught.
- Fetch with `curl -sL -A "Mozilla/5.0" -o <file> <url>`; PDFs to text with `pdftotext -enc UTF-8`. Keep downloads in
  `C:\Users\DESKTOP\edtech-sources\<publisher>\`. The source URL in the chapter must match the validator's pattern for
  that publisher (see `src/services/books.validate.js` SOURCE_PUBLISHERS).

## Rules
1. **Work on a copy.** Copy the live chapter to `drafts/ext2_<CODE>_chapter.json` and edit only the copy.
2. **Existing content stays byte-identical:** every existing question (id, stem, options, key, explanation, claims) and
   every existing claim. Do not renumber anything. New claims continue the numbering (`c87`, …); new questions continue
   (`q44`, …). Keep `status` and `verification` as they are (the parent records the extension).
3. **Weave, don't bolt on.** Add each new fact as short Bengali sentences in the section where a student would look for
   it (`standard`, or `deep` for WBCS-only detail), and add its claim id to that section's `claims[]`. Add a `remember`
   or `exam_note` box only where a fact is asked repeatedly. Add terms, people, events or timeline rows where they help.
   You may add one new section if several new facts form a topic of their own (keep the chapter's style and length
   balance). Bengali only for student text, own words, Bengali digits.
4. **Claims:** English `claim`, exact verbatim `quote` from the page, `page` (PDF page or section), `source` id. Every
   date, name, number and place you add must be in a claim.
5. **Official keys stay authoritative.** If a source disagrees with the keyed answer, do not teach a fact that
   contradicts the key silently: write an `exam_note` quoting both, and list the case in your report. Never change a
   PYQ's answer.
6. **Time-bound facts** (sports results, office-holders, "recently"): teach only with the date/year stated ("২০২২-এর
   থমাস কাপে ভারত…"), never as a permanent truth.
7. **Questions:** about one new practice question per newly taught fact (more for a fact asked in several papers), in
   the README format, Bengali, each citing its claim ids. **No generic stems** (a stem must name its subject — identical
   stems across chapters make the loader drop the chapter). Never copy a PYQ word for word; test the same fact in a new
   situation.
8. **Scope:** an item that really belongs to another chapter (the topic is clearly another chapter's) is not yours —
   mark it `OTHER_CHAPTER <code>` in the report; do not teach it here.
9. Run until OK: `cd <BE> && node scripts/validateBooks.js <your copy>`. For NCERT/WBBSE quotes also run
   `node scripts/content/checkQuotes.js <your copy> --text <srcId>=<text file>` where you have the text.

## Write exactly these files (in your chapter's `drafts/` folder)
- `ext2_<CODE>_chapter.json` — the extended chapter.
- `ext2_<CODE>_flipped.json` — `["<pyq_code>", …]` the PYQs that a student can now answer from the chapter.
- `ext2_<CODE>_REPORT.md` — sources fetched (title, URL, publisher); one table row per worklist item:
  `pyq_code | TAUGHT (claim ids, section) / STILL_UNTAUGHT (exact reason) / OTHER_CHAPTER <code> / KEY_CONFLICT`;
  new claims and new question ids; validator result.

Reply in under 120 words: taught / still untaught / other chapter counts, sources used, validator result.
