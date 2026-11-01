# GK fact library (`db/gk/*.jsonl`)

One file per GK chapter, one fact per line (JSON). Loaded into `gk_facts` by
`scripts/seedGkFacts.js` (run on server start, idempotent). Each fact's questions
go into the normal question bank (`questions`, subject `gs`), so practice, quizzes,
mocks, bookmarks, the mistake notebook and revision work with no extra code.

```jsonc
{
  "code": "GK-IGK-001",                 // GK-<PREFIX>-<3+ digits>, unique, never reused
  "topic": "indian_gk",                 // chapter (file name without .jsonl)
  "subtopic": "important_firsts",       // one of SUBTOPICS[topic] in src/services/gkTaxonomy.js
  "tags": ["transport", "west_bengal"], // lowercase slugs; "west_bengal" also lists it on the WB card
  "fact_kind": "STATIC",                // STATIC | CHANGING (office-holders, figures that change)
  "title":       { "en": "...", "bn": "..." },  // short heading
  "statement":   { "en": "...", "bn": "..." },  // the fact itself, one or two sentences
  "explanation": { "en": "...", "bn": "..." },  // context; how it is usually asked; common confusion
  "milestones": [                       // optional; separates proposal / foundation / opening / operation
    { "kind": "FOUNDATION", "date": "1972-12-29", "note": { "en": "...", "bn": "..." } }
  ],
  "dates": { "event_date": null, "valid_from": null, "review_by": null },  // CHANGING: valid_from + review_by required
  "reference_year": null,               // statistics: the year the figure refers to (e.g. 2011 for Census 2011)
  "difficulty": 2,                      // 1-5 (Easy 1-2, Medium 3, Hard 4-5)
  "exam_relevance": ["WBPSC_CLERKSHIP", "WBCS", "SSC", "RAILWAY"],  // syllabus fit, never a PYQ claim
  "sources": [
    {
      "title": "Page or document title as shown on the site",
      "url": "https://...",             // the page that supports the specific answer
      "publisher": "Press Information Bureau",
      "publisher_type": "OFFICIAL",     // OFFICIAL (govt / statutory body / the institution itself) | INSTITUTIONAL (NCERT, UN, university) | REFERENCE
      "accessed_at": "2026-10-31",
      "quote": "Exact sentence(s) from the page that support the answer"
    }
  ],
  "verification": {
    "status": "VERIFIED",               // VERIFIED | NEEDS_REVIEW | UNVERIFIED
    "method": "SOURCE_QUOTE+INDEPENDENT_CHECK",
    "verified_at": "2026-10-31",
    "notes": "why NEEDS_REVIEW, disagreements between sources, etc."
  },
  "bengali_review": "PENDING",          // PENDING | REVIEWED (only an admin sets REVIEWED)
  "linked_existing": [                  // English stems of existing factbank questions this fact proves, verbatim
    "Which river is known as the \"Sorrow of Bengal\"?"
  ],
  "questions": [
    {
      "format": "DIRECT",               // DIRECT | STATEMENT | MATCH | CHRONOLOGY | PAIRS | ASSERTION_REASON
      "d": 2,
      "q": ["English stem (Markdown)", "বাংলা প্রশ্ন"],
      "a": ["correct", "সঠিক"],
      "w": [["wrong 1", "ভুল ১"], ["wrong 2", "ভুল ২"], ["wrong 3", "ভুল ৩"]],
      "e": ["English explanation", "বাংলা ব্যাখ্যা"]
    }
  ]
}
```

## Rules (enforced by `src/services/gkFacts.validate.js`)

- `VERIFIED` needs at least one source with an https `url`, a `title`, an `accessed_at` date and a `quote`.
  The quote must support the specific answer, not just the topic.
- A fact is `VERIFIED` only when the author's answer, the source quote and an independent check
  (a second reader who answers every question from the source without seeing the key) all agree.
  Otherwise it is `NEEDS_REVIEW` and students see it labelled as such.
- `CHANGING` facts need `dates.valid_from` and `dates.review_by`. After `review_by` they are listed as
  stale in the admin console.
- Questions: exactly 4 options, distinct in both languages, exactly one correct, Bengali present
  in the stem, options and explanation. No stem may repeat an existing question (checked by
  `duplicate_keys` at seed time).
- Every GK question is `ORIGINAL_PRACTICE`. Only questions imported from official papers in
  `db/pyq/` carry a PYQ label.
- `bengali_review` starts `PENDING`, and students then see "Bengali translation pending review". Only
  an admin can set `REVIEWED`; the reviewer and date are recorded on the fact.

### Question formats

| format | stem shape | options |
|---|---|---|
| DIRECT | plain question | 4 answers |
| STATEMENT | "Consider the following statements:\n\n1. …\n2. …\n\nWhich of the statements given above is/are correct?" | "1 only" / "2 only" / "Both 1 and 2" / "Neither 1 nor 2" |
| MATCH | "Match List I with List II:\n\n\| List I \| List II \|\n\|---\|---\|\n\| A. … \| 1. … \|…" | "A-1, B-2, C-3, D-4" style |
| CHRONOLOGY | "Arrange in chronological order (earliest first):\n\n1. …\n2. …\n3. …\n4. …" | "1, 2, 3, 4" style |
| PAIRS | "Which of the following pairs is correctly matched?" or "…is NOT correctly matched?" | 4 pairs |
| ASSERTION_REASON | "**Assertion (A):** …\n\n**Reason (R):** …" | the 4 standard A/R options |
