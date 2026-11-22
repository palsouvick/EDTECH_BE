# Batch 3: Authors, pen names, famous books, literary characters (on top of BRIEF.md + BRIEF_PACKS.md)

Owner request 2026-11-21: students keep getting "who created detective X / whose pen name is Y / who wrote book Z"
wrong. Build a learnable GK section for this.

Read first: `E:\EDTECH\backend\db\gk\drafts\BRIEF.md` (all rules, incl. Practical notes and the validator command),
`E:\EDTECH\backend\db\gk\drafts\BRIEF_PACKS.md` (topic pack rules), `E:\EDTECH\backend\db\gk\README.md`.

## What to build
Each drafter writes ~3 topic packs + ~15 plain facts, ~35 questions in total. Packs carry the big tables
(one row per author) so a student can revise the whole set on one page. Plain facts carry the individual
questions so they enter practice, mistakes and revision.

Question styles examiners use (mix them): "Pen name of X is?", "X is the pen name of?", "Detective Y was created by?",
"Who wrote Z?", MATCH (pen name ↔ real name; character ↔ creator), PAIRS ("which pair is NOT correctly matched").
Wrong options must be plausible (other writers of the same era/language), never silly.

## Sources (strict, owner decision 2026-11-05)
OFFICIAL / INSTITUTIONAL only: Sahitya Akademi (sahitya-akademi.gov.in, incl. award lists and "Makers of Indian
Literature" pages), Bharatiya Jnanpith (jnanpith.net), NCERT / WBBSE / state-board textbook PDFs (author
introductions often give pen names), Visva-Bharati, Paschimbanga Bangla Akademi, West Bengal govt sites, PIB,
Ministry of Culture, National Library / Indian Culture portal (indianculture.gov.in), NobelPrize.org,
Banglapedia (Asiatic Society of Bangladesh, publisher_type INSTITUTIONAL), university sites.
NO Wikipedia, blogs, coaching sites or "GK" sites. If a fact cannot be quoted from such a source, DROP it and
list it in the issues file. Do not mark anything VERIFIED yourself; use UNVERIFIED (the checker decides).

## Duplicates
Grep `db/gk/*.jsonl`, `db/gk/drafts/**/*.jsonl` and `scripts/generators/factbank/*.js`. Existing factbank stems
(e.g. Byomkesh, Feluda, Bhanusingha in west_bengal_gk_2.js) must go into `linked_existing` verbatim, not be
re-asked with the same stem. Do not repeat drafts/b2/books.jsonl facts (classical/medieval books).

## Language
Every text en + bn. In student-facing text never write "NCERT says / the source does not give"; just state the fact.
Use the spellings in the source; use the common Bengali spelling in bn.
