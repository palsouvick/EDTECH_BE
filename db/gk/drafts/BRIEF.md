# Brief for drafting GK facts (batch G3)

Today is 2026-10-31. You are drafting part of the first reviewed batch of a bilingual (English + Bengali)
General Knowledge fact library for students preparing for WBPSC Clerkship, WBCS, SSC, Railway and
banking exams. Wrong answers do real harm to students, so **accuracy beats quantity**: a smaller set of
facts that are solidly sourced is better than hitting the number.

## Read first
- `E:\EDTECH\backend\db\gk\README.md`: the exact JSONL record format and question formats. Follow it exactly.
- `E:\EDTECH\backend\src\services\gkTaxonomy.js`: the allowed `topic` codes, code prefixes and `subtopic` slugs.
- The existing question banks in `E:\EDTECH\backend\scripts\generators\factbank\*.js` (grep them).

## What to produce, per category assigned to you
`E:\EDTECH\backend\db\gk\drafts\<topic>.jsonl`: **about 15 facts** (12–16 is fine). One JSON object per line, valid JSON,
UTF-8. Codes are `GK-<PREFIX>-001`, `-002`, ... (the prefix comes from gkTaxonomy.js).
- Spread the facts across the subtopics, choosing the most exam-relevant facts in each (the kind repeatedly asked in WBPSC / SSC / Railway papers).
  Avoid trivia.
- Each fact has 1–2 `questions`. Across your category use **at least 3 different formats**
  (DIRECT plus at least two of STATEMENT, MATCH, CHRONOLOGY, PAIRS, ASSERTION_REASON). Every question has exactly 4 options:
  `a` (correct) plus 3 in `w`. Distractors must be plausible and **definitely wrong**.
  For STATEMENT, MATCH, CHRONOLOGY and PAIRS, **every** statement, pair and date used must be supported by your sources.
- Set `verification.status` to `"UNVERIFIED"`, `method` to `"SOURCE_QUOTE"` and `verified_at` to null. A separate
  independent checker decides the final status. Put any doubt or source disagreement in `verification.notes`.
- Set `bengali_review` to `"PENDING"`.
- Set `exam_relevance` provisionally, from these values: WBPSC_CLERKSHIP, WBCS, WBPSC_MISC, SSC, RAILWAY, BANK, WB_POST.

## Sources: the core of the job
- Use the **WebFetch** tool (load it with ToolSearch `select:WebFetch` if needed) to open each source page.
  Record the exact URL you fetched, its title and `accessed_at: "2026-10-31"`, plus a **verbatim quote** from the page
  that supports the *specific answer* (not just the topic). If the supporting text is in a PDF, quote it from the PDF.
- Preferred sources, in order:
  1. Official government and statutory bodies: india.gov.in / knowindia.india.gov.in, legislative.gov.in
     (Constitution of India text), the Parliament sites (sansad.in), eci.gov.in, rbi.org.in, pib.gov.in, isro.gov.in,
     npcil.nic.in, mtp.indianrailways.gov.in (Kolkata Metro), wb.gov.in, the West Bengal department sites (wbforest.gov.in and others),
     censusindia.gov.in, mea.gov.in, asi.nic.in, the ministry sites, padmaawards.gov.in, sahitya-akademi.gov.in, and the
     institution's own official site for headquarters questions.
  2. Institutional sources: NCERT textbooks (ncert.nic.in/textbook/pdf/...), UN / UNESCO (un.org, whc.unesco.org),
     the official sites of international organisations, nobelprize.org, olympics.com, fifa.com.
  3. Use `REFERENCE` only if nothing official exists, and then leave the fact `UNVERIFIED` with a note.
- If you cannot find a source that supports the specific answer, **drop the fact**. Never write a fact from memory.
- When official sources disagree, or say less than the common "exam answer" claims, write the fact with the precise
  wording the official source supports and explain the discrepancy in `explanation` and `verification.notes`.
  Example: the national fruit/flower; some symbols are widely listed but may not be formally notified.
- Separate milestones (`milestones[]`): proposal, foundation stone, construction, inauguration and commercial operation
  are different events. A question must name which one it asks about.
- Do not use current office-holders unless the official site of that office states them. Then use `fact_kind: "CHANGING"`
  with `dates.valid_from` and `dates.review_by` (set review_by to 2027-04-30 or sooner).
- Statistics: give the reference year (`reference_year`), e.g. Census 2011.

## Links to existing questions
For each fact, grep the existing factbank files for questions that ask the same thing. If one exists **and its answer is
fully supported by your source**, add its English stem **verbatim** to `linked_existing`, and do **not** write a new duplicate
question. Write new questions only when they add something, such as a different format or angle.
If you find an existing question whose answer looks wrong, outdated or ambiguous according to an official source, record it in
`E:\EDTECH\backend\db\gk\drafts\<topic>.issues.json` as an array of
`{ "file": "...", "stem": "<verbatim English stem>", "problem": "...", "source_url": "...", "quote": "..." }`.

## Language
- English: clear, exam-style and concise.
- Bengali: standard West Bengal Bengali as used in WBPSC papers. Use the established Bengali names of people and places,
  and write numbers in Bengali digits (১৯৮৪) consistently, including in options. Keep the same fact in both languages:
  no extra or missing detail. Technical terms may keep the English term in brackets.

## Do not
- Edit any file other than your own drafts and issues files.
- Label anything as a previous-year question (PYQ).
- Invent quotes. The quote must appear on the page you fetched.

## When done
Validate that every line parses as JSON, e.g.
`node -e "require('fs').readFileSync(process.argv[1],'utf8').trim().split('\n').forEach((l,i)=>JSON.parse(l))" <file>`.
Reply with a short report covering: facts per subtopic, formats used, facts you dropped and why, any official-source
disagreements, and the existing-question issues you found.

## Practical notes from the first agents
- ncert.nic.in fails in WebFetch with a certificate error, and pib.gov.in returns 403. Download these with
  `curl -sL -A "Mozilla/5.0" -o <file> <url>` (keep certificate checks on) into **your own scratch subfolder**
  (named after your categories) inside the session scratchpad, and extract PDFs with `pdftotext -layout`.
- Check every quote against the saved text by script, ignoring differences in whitespace, quote marks and dashes.
  Note any quote that could not be checked.
- Copy `linked_existing` stems programmatically from the factbank files, so they match verbatim.
- Run the repo validator on your file before you finish:
  `cd E:\EDTECH\backend && node -e "const {validateLibrary}=require('./src/services/gkFacts.validate');const r=require('fs').readFileSync(process.argv[1],'utf8').trim().split('\n').map(l=>JSON.parse(l));console.log(validateLibrary(r).errors)" db/gk/drafts/<topic>.jsonl`
