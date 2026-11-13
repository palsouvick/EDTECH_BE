# Brief: quick answer-key check of one Geography chapter

Owner's rule (2026-11-13): no word-by-word validation of the prose. Only this check: **is every practice question's
marked answer right?** A wrong key teaches students a wrong fact, so this one check stays. Keep it fast.

For the chapter file named in your task (`E:\EDTECH\backend\db\books\geography\chNN-*.json`):

1. For each question: work out the answer yourself from the chapter's own text plus the source pages its claims cite
   (WBBSE OCR `C:\Users\DESKTOP\edtech-sources\wbbse\ocr_Prithibi_*\page_NNNN.txt`, NCERT text
   `C:\Users\DESKTOP\edtech-sources\ncert\<code>.txt`), BEFORE looking at the marked answer `a`.
   Checking only against the chapter's own claim quotes is NOT enough: open the source text for every numeric,
   superlative ("highest", "largest", "first") and name-to-place answer.
2. Compare. Also flag a statement that is geographically misleading even if a source prints it (a pass or peak placed
   in the wrong range, an outdated count) and reword it so it stays true to the source without teaching the wrong
   thing. Also flag: a second option that is also correct, a statement/match question whose key is ambiguous, or an
   explanation that contradicts the key.
3. Fix only what is wrong, directly in the chapter file: correct `a`/`w`/`e` (or rewrite the question) so exactly one
   answer is right per the sources. Do not touch the prose unless a fact in it is plainly wrong per the source.
4. Set `"verification": { "status": "VERIFIED", "checked_at": "<today YYYY-MM-DD>", "notes": "Key check (owner rule
   2026-11-13, no word-by-word check): N/N keys confirmed; fixed: <ids or none>" }`. Leave `"status": "DRAFT"`
   (the owner publishes from Admin → Books).
5. Run `cd E:\EDTECH\backend && node scripts/validateBooks.js <file>` until OK.

Reply in under 80 words: keys confirmed, questions fixed (id + one line each), any prose fact fixed.
