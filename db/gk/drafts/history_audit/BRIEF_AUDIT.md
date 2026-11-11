# Brief: History fact audit (NCERT only)

Today is 2026-11-11. The owner asked for a fact-validation pass over the existing History content. Wrong answers
harm students. **Source rule: NCERT textbooks only** (ncert.nic.in/textbook/pdf/…). Download PDFs with
`curl -sL -A "Mozilla/5.0" -o <file> https://ncert.nic.in/textbook/pdf/<code>.pdf` into your own scratch folder
(named in your task) and extract them with `pdftotext -layout`; retry once on failure. Useful books: Class 12
*Themes in Indian History* I-III (`lehs101`-`lehs104`, `lehs201`-`lehs204`, `lehs301`-`lehs304`), Class 8 *Our Pasts III*
(`hess201`…) and *Exploring Society* (`hees101`…, `hees201`…), Class 7 (`gess1xx`, `gees1xx`), Class 6 (`fess1xx`,
`fees1xx`), Class 10 (`jess301`…). Grep the extracted text for the names and dates in each item.

Quote verbatim, and check every quote against the extracted text by script. Never judge from memory: if you cannot find
the point in NCERT, the verdict is NOT_IN_NCERT, even if you believe the item is right.

## Verdicts, per item
- `CONFIRMED`: NCERT supports the answer, and the distractors are wrong according to NCERT or plainly unrelated.
- `CONTRADICTED`: NCERT says something different from the answer, the statement or the explanation. Give the NCERT quote
  and a corrected version (`fix`) that changes as little as possible: keep the question's meaning and its number of options.
- `PARTLY_WRONG`: the answer is right, but the explanation, a statement or a distractor is wrong or also defensible. Give
  the quote and the `fix`.
- `NOT_IN_NCERT`: no NCERT text found. Say what you searched for.
- `AMBIGUOUS`: two options are defensible on NCERT's text. Say which, and why.

Output: a JSON array in the file your task names, one object per item:
`{ "ref", "verdict", "problem", "fix": { "q"?, "answer"?, "wrong"?, "explanation"? } | null, "source_url", "page", "quote", "searched" }`.
English only (the Bengali is corrected afterwards from your English fix).

## Do not
Edit any file except your output file. Change an item's meaning to make it fit a source.

## When done
Reply with counts per verdict, and list every CONTRADICTED, PARTLY_WRONG and AMBIGUOUS item in one line each.
