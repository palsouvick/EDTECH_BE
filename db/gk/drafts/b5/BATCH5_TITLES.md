# Batch 5: Famous titles / nicknames of Indians ("Waterman of India", "Iron Man of India" ...)

Owner request 2026-11-24: add the commonly asked "who is called the X of India" questions, with a
revision table. These are asked very often in WBPSC Clerkship, WBCS, SSC, Railway papers.

Read first (all rules apply): `E:\EDTECH\backend\db\gk\drafts\BRIEF.md` (incl. Practical notes + validator
command), `E:\EDTECH\backend\db\gk\drafts\BRIEF_PACKS.md`, the "Topic packs" section of `E:\EDTECH\backend\db\gk\README.md`.
Example of a finished batch: `E:\EDTECH\backend\db\gk\drafts\b4\presidents.jsonl` (+ presidents_report.md).

## Output
topic `indian_gk`, subtopic `misc`, tags include `famous_titles`.
- 1-2 topic packs whose `pack.table` has columns: Title (en/bn) | Person | Field / why the title | (the
  table is what the student revises; max 20 rows per pack, so split by theme if needed).
- One plain fact per person (title, statement, explanation, sources, 1-3 questions).
Question styles (mix): "Who is known as the Waterman of India?", reverse "Rajendra Singh is popularly known as?",
MATCH (title ↔ person, 4 pairs), PAIRS ("which pair is NOT correctly matched"). Wrong options = other people
of the same field/era with a different famous title, never silly. Use `wn` notes only where sourced.

## Sources (strict)
The quote must name the person AND the title (e.g. PIB: "Shri Jadav Payeng, popularly known as the Forest Man of India").
Allowed: PIB (pib.gov.in, fetch with curl), padmaawards.gov.in, Govt ministry / PM / President sites, india.gov.in,
indianculture.gov.in, NCERT / WBBSE textbooks, Parliament (sansad.in, Lok Sabha/Rajya Sabha), RBI, ISRO, DAE/BARC,
Sahitya Akademi, Visva-Bharati, official award bodies (e.g. SIWI Stockholm Water Prize for Rajendra Singh),
nobelprize.org, olympics.com, university / institution official sites, Banglapedia (INSTITUTIONAL).
NO Wikipedia, blogs, news-only, coaching or GK sites. If no allowed quote: DROP and list it in
`<yourfile>.issues.json` with what you tried. Several people share a title ("Father of ..." is disputed):
state exactly what the source says; if two people are called the same thing by official sources, do not ask
it as single-answer, note it.

## Duplicates
Grep `db/gk/*.jsonl`, `db/gk/drafts/**/*.jsonl`, `scripts/generators/factbank/*.js` (e.g. "Grand Old Man of India",
"Iron Man of India", "father of Indian chemistry/statistics/planning" already exist). Existing stems whose
answer your source supports go into `linked_existing` verbatim; do not re-ask the same stem.

## Language
Every text en + bn, Bengali digits, common Bengali names (রাজেন্দ্র সিং, সর্দার বল্লভভাই প্যাটেল ...).
Bengali title as used in WB exam papers (e.g. "ভারতের লৌহমানব", "ভারতের জলমানব", "ভারতের অরণ্যমানব",
"ভারতের মিসাইল ম্যান", "ভারতের নাইটিঙ্গেল", "উড়ন্ত শিখ"). Never write "the source says" in student text.
Status UNVERIFIED, bengali_review PENDING; the blind checker decides.
