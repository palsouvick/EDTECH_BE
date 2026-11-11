# Brief: tag History PYQs to book chapters

Today is 2026-11-11. The History book of a West Bengal exam-prep app has 29 chapters (HIS-00 … HIS-28), listed with
their scope in `E:\EDTECH\backend\db\books\history\toc.js` and described in `E:\EDTECH\docs\HISTORY_BOOK_PLAN.md` §4.
Your job: for each real previous-year question (PYQ) in your packet, decide **which one chapter teaches its answer**.
This tells each chapter's writer exactly which exam questions the chapter must make answerable.

## Rules
- Pick the chapter whose subject matter the question is about (the answer's topic), not just a word in the stem.
  Example: "Who founded the Asiatic Society?" → HIS-20 (social and cultural reform / Bengal Renaissance),
  not HIS-17, unless the plan puts it elsewhere.
- Use the chapter boundaries in plan §4. Useful splits:
  - HIS-21 = rise of nationalism and the early Congress (1885–1905).
  - HIS-22 = partition, Swadeshi, Surat, League, 1909, Home Rule, Lucknow (1905–1918).
  - HIS-23 = revolutionaries.
  - HIS-24 = Gandhi 1915–22. HIS-25 = 1922–39. HIS-26 = 1939–47.
  - HIS-27 = Acts and Governors-General/Viceroys as a theme. Use it when the question is about an Act or a Viceroy's term as such.
  - HIS-18 = peasant and tribal revolts. HIS-19 = 1857.
- If the question is not History (it belongs in art & culture, geography, polity, etc.), use `"OUT_OF_SCOPE"` and say where it belongs.
- If two chapters fit equally well, give the better one in `chapter` and the other in `alt`.
- Do not judge whether the official answer is right; that is a separate step. But if the answer looks wrong to you, say so in `note`.
- Work from your own knowledge of the topic. **No web access is needed or wanted.** This is classification only.
  Nothing you write is shown to students.

## Output
A JSON array in the file your task names, one object per input item, in the same order:
`{ "pyq_code", "chapter": "HIS-xx" | "OUT_OF_SCOPE", "alt": "HIS-yy" | null, "topic": "<3–6 word topic label>", "note": "" }`

Check the output parses as JSON and has one entry per input item. Edit no other files. Do not open the other
reader's output files in the same folder.
