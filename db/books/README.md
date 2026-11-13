# Study books (`db/books/<book>/*.json`)

Textbook-style chapters ("Learn like a book"). One JSON file per chapter, e.g.
`db/books/history/ch02-harappan.json`. Loaded by `src/services/books.js`, checked by
`src/services/books.validate.js`, and served at `/books/:book`. The chapter's practice questions
are seeded into the ordinary question bank by `scripts/seedBooks.js`, so practice, custom tests, the mistake
book and revision work with them.

Plan and owner decisions: `docs/HISTORY_BOOK_PLAN.md`.

## Language

**All student-facing text is Bengali only** (owner decision of 2026-11-11). Standard West Bengal Bengali, as in
WBPSC papers and WBBSE textbooks; Bengali digits (১৯০৫); the established Bengali names of people and places. A
technical term may carry the English in brackets once: `দুর্গ (Citadel)`.
The internal claims sheet (`claims[]`) is in English, because it quotes the English NCERT text.

Text fields are Markdown strings (bold, lists, simple tables). No HTML.

## Sources

Two official textbook sources only (owner decisions of 2026-11-11):

1. **NCERT textbooks** (`https://ncert.nic.in/textbook/pdf/…`): the all-India foundation.
2. **WBBSE / Banglar Shiksha e-Text Books** (`https://banglarshiksha.wb.gov.in/readwrite/etextbook/…`, listed at
   banglarshiksha.wb.gov.in → E-Text Book, Bengali medium; History is *অতীত ও ঐতিহ্য*, Classes VII–VIII; Geography
   is *আমাদের পৃথিবী*, VI–VIII): the West Bengal-specific foundation. Use them first for Bengal history, Bengal
   personalities and the Bengali names and terms students meet at school. Quotes from these books are in Bengali.

Every date, name, number, place and causal claim in the chapter must be in `claims[]` with a verbatim quote from one
of these books. A detail that neither supports is left out. It is never written from memory. Where the books disagree with each other (NCERT vs NCERT, or NCERT vs WBBSE), or with the usual "exam answer", say so
in an `exam_note` box, quoting both.

The text is written in our own words: explain, do not translate NCERT paragraphs.

## Record

```jsonc
{
  "book": "history",
  "code": "HIS-02",                 // HIS-<2 digits>; never reused
  "number": 2,                      // reading order (0-28)
  "part": "ancient",                // intro | ancient | medieval | modern_company | modern_national | post_independence
  "title": "হরপ্পা সভ্যতা",
  "subtitle": "ভারতের প্রথম নগর সভ্যতা",
  "subtopics": ["ivc"],             // GK subtopic slugs (src/services/gkTaxonomy.js) this chapter covers
  "related_facts": ["GK-HIS-001", "GK-HIS-104"],   // GK fact / topic-pack codes shown as "also see"
  "prerequisites": ["HIS-01"],      // chapters to read first (may be empty)
  "reading_minutes": { "quick": 6, "standard": 30, "deep": 45 },
  "status": "DRAFT",                // DRAFT | PUBLISHED (only the owner's approval sets PUBLISHED)
  "verification": {
    "status": "UNVERIFIED",         // UNVERIFIED | NEEDS_REVIEW | VERIFIED
    "checked_at": null,
    "notes": ""
  },

  // 1. Chapter overview
  "overview": {
    "intro": "Markdown: what this chapter is about and why it matters (80-150 words)",
    "you_will_learn": ["৫-৮টি বিন্দু"]
  },

  // 2. Detailed explanation: 4-8 sections
  "sections": [
    {
      "id": "town_planning",        // lowercase slug, unique in the chapter; questions point to it
      "heading": "নগর পরিকল্পনা",
      "quick": "Markdown, 2-4 sentences: the section in short",
      "standard": "Markdown, the full beginner explanation (300-700 words)",
      "deep": "Markdown or null: extra depth for WBCS-level students (150-500 words)",
      "boxes": [
        { "kind": "exam_note", "title": "...", "body": "Markdown" }
        // kind: exam_note | dont_confuse | did_you_know | bengal | remember
      ],
      "claims": ["c05", "c06"]      // claim ids this section relies on
    }
  ],

  // 3. Important events (each says why it matters)
  "events": [{ "title": "...", "when": "১৯২১", "what": "...", "why_it_matters": "...", "section": "discovery", "claims": ["c01"] }],

  // 4. Important people
  "people": [{ "name": "দয়ারাম সাহনি", "when": "...", "role": "...", "contribution": "...", "section": "discovery", "claims": ["c01"] }],

  // 5. Timeline (sort_year: a number for ordering; BCE is negative, e.g. -2600)
  "timeline": [{ "sort_year": -2600, "when": "খ্রিস্টপূর্ব ২৬০০", "label": "...", "claims": ["c03"] }],

  // 6. Important terms
  "terms": [{ "term": "সিটাডেল (Citadel)", "meaning": "...", "section": "town_planning" }],

  // 7. Cause → Event → Result (where it applies; may be empty for a chapter that has none)
  "cause_effect": [{ "title": "...", "causes": ["..."], "event": "...", "results": ["..."], "section": "decline", "claims": ["c20"] }],

  // 8. Exam focus (what to learn hardest). PYQ evidence is added at run time from db/pyq/history_sections.json,
  //    so never write "asked in exam X" here.
  "exam_focus": [{ "point": "...", "section": "seals_script" }],

  // 9. Bengal connection (a Bengal angle for this chapter; for chapters with no direct one, the nearest honest link,
  //    such as Bengali archaeologists, or Bengal at that time)
  "bengal_connection": { "body": "Markdown", "claims": ["c02"] },

  // 10. Quick revision (8-15 one-line points)
  "quick_revision": ["..."],

  // Internal, not shown to students except as the source list
  "sources": [
    { "id": "s1", "title": "Themes in Indian History Part I, Theme 1: Bricks, Beads and Bones", "class": "XII",
      "url": "https://ncert.nic.in/textbook/pdf/lehs101.pdf", "accessed_at": "2026-11-11" }
  ],
  "claims": [
    { "id": "c01", "claim": "English: the exact fact used", "source": "s1", "page": "p. 2",
      "quote": "Verbatim sentence(s) from the NCERT PDF that support the claim" }
  ],

  // 11. Practice questions (~40): basic 10, moderate 15, difficult 10, exam 5+ (exam = STATEMENT, MATCH,
  //     CHRONOLOGY, ASSERTION_REASON or PAIRS). Bengali only. The mini test is drawn from these.
  "questions": [
    {
      "id": "q01",                  // q01..q99, never reused; becomes question code BK-HIS-02-Q01
      "section": "town_planning",
      "level": "basic",             // basic | moderate | difficult | exam
      "format": "DIRECT",           // DIRECT | STATEMENT | MATCH | CHRONOLOGY | PAIRS | ASSERTION_REASON
      "q": "প্রশ্ন (Markdown)",
      "a": "সঠিক উত্তর",
      "w": ["ভুল ১", "ভুল ২", "ভুল ৩"],
      "e": "ব্যাখ্যা: কেন সঠিক, আর অন্যগুলো কেন ভুল",
      "claims": ["c05"]             // every fact the question and its options rely on
    }
  ]
}
```

## Rules (enforced by the validator)

- Every section has `quick` and `standard`; `deep` is optional. 4-8 sections.
- Every `section` reference (events, people, terms, cause_effect, exam_focus, questions) names an existing section.
- Every `claims` reference names an existing claim; every claim names an existing source with an https NCERT URL,
  and has a non-empty quote.
- Questions: exactly 4 distinct options, exactly one correct, ids unique, with at least 30 questions and every level
  present. STATEMENT and MATCH options follow the formats in `db/gk/README.md`.
- A question's distractors must be definitely wrong according to the claims. "All of the above" and "None of these" are not allowed.
- `status: PUBLISHED` requires `verification.status: VERIFIED`. Questions reach students only from a PUBLISHED chapter.

## The Geography book (`db/books/geography/`, codes `GEO-NN`)

Plan, table of contents and owner decisions: `docs/GEOGRAPHY_BOOK_PLAN.md` (TOC in `geography/toc.js`, chapters 1–16).
The record is the same as History's, with these differences (the validator's `PROFILES.geography`):

- `book: "geography"`, `code: "GEO-03"`, `part`: `india_land | india_resources | west_bengal | earth_world`;
  `subtopics` from the Geography GK card (`rivers`, `west_bengal_geography`, …).
- `events`, `people` and `timeline` are optional (leave them out, or use them only where a date really matters,
  for example a dam's year of completion).
- **`locate` is required** (at least 6 rows): the "Locate it" table, place → where → what to remember.
  ```jsonc
  "locate": [{ "place": "গঙ্গোত্রী হিমবাহ", "where": "উত্তরাখণ্ড", "about": "ভাগীরথীর উৎস", "section": "himalayan", "claims": ["c04"] }]
  ```
- `cause_effect` reads as cause → effect (for example why the peninsular rivers are seasonal).
- `bengal_connection` is the **West Bengal connection** of the chapter.
- Sources: NCERT and WBBSE, as for History, **plus official Government of India / West Bengal pages**
  (`https://…gov.in/…`, `https://…nic.in/…`) for list facts the textbooks do not carry: districts, dams, national
  parks (owner decision of 2026-11-13). Quote the page verbatim like any other source and record the date you read it
  (`accessed_at`). A news site, Wikipedia or a coaching site is never a source.
- Maps are not drawn yet (owner decision of 2026-11-13): use the `locate` table, and where a figure helps, say which
  textbook figure to look at (for example "NCERT XI ভারত: প্রাকৃতিক পরিবেশ, চিত্র ৩.১").
