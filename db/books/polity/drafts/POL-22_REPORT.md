# POL-22 — Report

Chapter: POL-22 গুরুত্বপূর্ণ অনুচ্ছেদ, তফসিল ও পরিভাষা — রিভিশন (part: revision, subtopics: schedules_articles) — title/part/subtopics taken verbatim from `BE/db/books/polity/toc.js`.

## Sources actually fetched (browser.open)
- The Constitution of India [As on 1st May, 2026], Legislative Department, Ministry of Law and Justice — https://legislative.gov.in/static/uploads/2025/07/76b9f1c47176fc65accc160f19c982b7.pdf — fetched; contents list of the 12 Schedules, Articles 1, 4, 14, 32, 37, 40, 51, 246, 246A, 248, the Eighth Schedule language list and its amendment footnotes, the Ninth Schedule heading/entries 59-60 and First-Amendment footnote, the Tenth Schedule text (paras 2, 4, 6) and 52nd-Amendment footnote, and the Eleventh/Twelfth Schedule headings and entries were all read verbatim from this fetch.
- NCERT `keps201.pdf` fetch was attempted and failed (page not found / network error); no NCERT claim is used. The chapter therefore rests on the single GOVT source, which the polity validator profile permits.

## Counts
- Claims: 36 (all with verbatim quotes from the fetched Constitution PDF, source s1)
- Questions: 46 (basic 14, moderate 18, difficult 9, exam 5; formats DIRECT, STATEMENT, MATCH, CHRONOLOGY, PAIRS, ASSERTION_REASON)
- Sections: 8 (manchitro, prothom_shostho, soptom, ashtom, nobom_doshom, ekadosh_dadosh, guruttopurno_onuchchhed, poribhasha)
- Validator: `node scripts/validateBooks.js` → chapter.json: OK

## PYQs
- `BE/db/books/polity/pyq_map.json` has POL-22 as an empty list, so candidates were searched in `BE/db/pyq/*.json` for genuine Schedule questions.
- Candidates found: 8; mapped: 8; taught: 6 (WBCS 2019 Q117 Seventh Schedule; WBCS 2023 Q43 52nd/Tenth; WBCS 2023 Q91 Concurrent List; WBCS 2022 Q155 73rd/Eleventh; Clerkship 2023 S-I Q62 and S-II Q81 73rd/Eleventh).
- Untaught: 2 (WBCS 2019 Q102 and Q104 — a Schedule appears only as a distractor option; both questions belong to POL-05/DPSP; specific reasons recorded in pyq_map_POL-22.json).

## Subtopic coverage
- schedules_articles: all 12 Schedules covered (1-6 in one section, 7, 8, 9-10, 11-12 in dedicated sections), plus an important-articles revision table (Arts 14, 21, 32, 37, 40, 51, 246, 246A, 248, 368) and a terminology/confusion-pairs section.

## Gaps
- No NCERT source could be fetched (keps201.pdf failed); chapter is single-source (Constitution text itself, GOVT) — disclosed, not filled from memory.
- The 74th Amendment / Twelfth Schedule addition date is NOT taught as a dated claim: the fetched Constitution text gives the Twelfth Schedule heading and Article 243W but the footnote line for its addition was not in the fetched portion, so the chapter teaches the 74th↔Municipalities↔Twelfth pairing without asserting a fetched year for the Twelfth Schedule's addition (the 73rd/Eleventh dates are claim-backed).
- Exact entry counts of the Union/State Lists are not stated: the fetched portions show the three list headings and Article 246 but not complete entry enumerations, so no list-entry counts are claimed.
- People/events are minimal by design in a revision chapter (1 office-holder entry, 3 schedule-addition events), following the polity profile where these blocks are optional.
