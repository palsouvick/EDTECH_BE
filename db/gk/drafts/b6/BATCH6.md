# Batch 6 (2026-11-24): full pen-name list + Samadhi sthal table

Read first, all rules apply: `drafts/BRIEF.md` (incl. Practical notes, validator command), `drafts/BRIEF_PACKS.md`,
"Topic packs" in `db/gk/README.md`, and `drafts/b5/BATCH5_TITLES.md` (strict source list; quote must name the person AND the
answer). Example batch: `drafts/b3/bengali_authors.jsonl` (pen-name pack GK-WBG-240 + single facts GK-WBG-243..249).
Students see a pack as a revision table; wrong answers in practice link to the fact, and the fact page shows its pack.
Status UNVERIFIED, bengali_review PENDING, never write "the source says" in student text. Drop anything without an allowed quote and
list it in the issues file.

## Part C — pen names (ছদ্মনাম), file `b6/pen_names.jsonl`
Goal: one complete, exam-oriented pen-name list. Already verified in b3 (do NOT repeat): Tekchand Thakur, Hutom, Birbal, Banaphul,
Parashuram, Chitra Gupta, Narayan (Taraknath), Sunanda, Leelamoy Ray, Kalkut, Sankar.
Add the other commonly asked ones, e.g. Bengali: Bhanusingha (Tagore), Kamalakanta (Bankim), Nil Lohit / Sanatan Pathak / Nil Upadhyay
(Sunil Gangopadhyay), Jarasandha (Charu Chandra Chakraborty), Jajabar (Binoy Mukhopadhyay), Rupadarshi (Gour Kishore Ghosh),
Abadhut, Mouchhi, Anila Debi (Sarat Chandra), Bhaskar?, Dhurjati, Banabihari? ... ; Indian: Premchand (Dhanpat Rai), Nirala, Dinkar,
Gulzar, Firaq Gorakhpuri, Bachchan?, Kalki?, Amrita Pritam?; world (only if allowed sources, e.g. nobelprize.org): Mark Twain, George Orwell,
Saki, Voltaire, Boz (Dickens). Keep only what is sourced.
- One NEW pack GK-WBG-261 "Pen names: full list" whose table includes ALL rows (the 11 b3 ones + your new sourced ones), columns
  Pen name | Real name | Remembered for, split into packs of max 20 rows (GK-WBG-261 Bengali, GK-SGK-247 Indian & world) if needed;
  pack.related must include GK-WBG-240 and the single-fact codes. Single facts for each new pen name: GK-WBG-262.., GK-SGK-248..
- linked_existing: grep db/pyq/*.json, scripts/generators/**/*.js, db/gk/*.jsonl for EVERY pen-name question ("pen-name", "pen name",
  "pseudonym", "ছদ্মনাম", "নামে লিখতেন" ...). For a stem about a b3 fact (e.g. the PYQ "‘Parshuram’ is the pen-name of" in
  wbpsc-clerkship-2004.json → GK-WBG-247), do NOT edit b3; list it in `b6/b3_links.json` as [{ "fact": "GK-WBG-247", "stem": "<verbatim>", "file": "..." }].
  Stems about your new facts go into that fact's linked_existing (verbatim, copied by script).
Scratch folder: <scratchpad>\b6_pen.

## Part D — Samadhi sthal, file `b6/samadhi.jsonl`
topic indian_gk, subtopic misc, tags samadhi, memorials. Pack GK-IGK-300 table: Personality | Samadhi / memorial (en+bn) | Location,
e.g. Raj Ghat (Gandhi), Shantivan (Nehru), Vijay Ghat (Shastri), Shakti Sthal (Indira), Veer Bhumi (Rajiv), Kisan Ghat (Charan Singh),
Samata Sthal (Jagjivan Ram), Ekta Sthal (Zail Singh), Abhay Ghat (Morarji Desai), Narayan Ghat (Gulzarilal Nanda), Mahaprayan Ghat (Rajendra Prasad, Patna),
Sadaiv Atal (Vajpayee), Smriti Sthal, Rashtriya Smriti Sthal, Chaitya Bhoomi (Ambedkar, Mumbai), Gyan Bhoomi?, Kranti Bhumi?, Uday Bhoomi?,
Shanti Van, Pranab Mukherjee / Manmohan Singh memorials if official. Quote must name person + place (PIB "paid tributes at Vijay Ghat",
CPWD / MoHUA, Rashtrapati / PM sites, NDMC, Maharashtra govt for Chaitya Bhoomi). Single facts GK-IGK-301.., 1-2 questions each,
plus MATCH/PAIRS in the pack. Grep the bank for existing samadhi questions → linked_existing.
Scratch folder: <scratchpad>\b6_samadhi.
