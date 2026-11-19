# ART-01 — ভারতীয় নৃত্য (Indian Dance) — Draft Report

- **Book / chapter:** art_culture, ART-01, part `performing`, subtopic `dance`. Title taken verbatim from `db/books/art_culture/toc.js` ("ভারতীয় নৃত্য").
- **Status:** DRAFT, verification UNVERIFIED.
- **Deliverables:** `chapter.json` (validator: **OK**), `pyq_map_ART-01.json`, this report.
- **Counts:** 104 claims (all used), 42 practice questions (basic 13, moderate 17, difficult 6, exam 6; formats DIRECT 36, STATEMENT 2, MATCH 1, PAIRS 1, ASSERTION_REASON 1, CHRONOLOGY 1), 7 sections, 10 events, 12 people, 12 timeline rows, 16 terms, 4 cause-effect chains.

## Sources actually fetched (browser.open, 2026-11-19)

1. **Sangeet Natak Akademi — About Us** — https://sangeetnatak.gov.in/about-us (GOVT)
2. **Sangeet Natak Akademi — Aims & Objectives** — https://sangeetnatak.gov.in/aims-objetives (GOVT)
3. **Saptakam: A Septet of Indian Dance — concept note, Ministry of Culture** — https://www.indiaculture.gov.in/sites/default/files/festival_china/post_events/Saptakam - concept note.pdf (GOVT; stored in the chapter with %20 encoding so the validator's GOVT pattern matches)
4. **e-PG Pathshala, Performing Arts Paper 5, Module 27: Tagore's Idiom of Dance** — https://epgp.inflibnet.ac.in/epgpdata/uploads/epgp_content/S000451PA/P001552/M018119/ET/1481014758P5M27TEXT.pdf (EPG)
5. **IGNOU ODN-001, Block 1: Understanding Indian Classical Dances (Units 1–8)** — https://egyankosh.ac.in/bitstream/123456789/47403/1/ODN-001-Block-1.pdf (IGNOU)

## PYQ candidates

- **Found:** 12 — 7 GK-bank items with subtopic `dance` (GK-ART-001, 002, 003, 101, 102, 103, 104) + 5 real corpus PYQs (WBP Constable 2021 Q58; Clerkship 2006 Q18; Clerkship 2023 Session-I Q61; Clerkship 2019 Afternoon Q32; WBCS 2017 Q160 analogy).
- **Mapped:** 12/12. **Taught:** 8 (GK-ART-001, GK-ART-002, GK-ART-101, and all 5 corpus PYQs). **Untaught:** 4, each with a specific reason in the map (GK-ART-003 UNESCO years; GK-ART-102 Kendra founding years 1964/1975; GK-ART-103 centre inauguration dates; GK-ART-104 SNA folk-inventory pairings).

## Subtopic coverage

Subtopic `dance` is covered end-to-end: theory base (Natyashastra, nritta/nritya, four abhinayas, rasa, hasta), the eight recognised forms with states, per-form features/history/exponents for Bharatanatyam, Mohiniyattam, Kathakali, Kuchipudi, Kathak, Manipuri and Odissi, the Sangeet Natak Akademi's units/centres/awards, folk forms of Bengal inside the Rabindranritya narrative, and Chhau via the Akademi's Chhau Kendra.

## Gaps (disclosed, never filled from memory)

1. **NCERT not used.** The on-topic NCERT chapter (Kriti, Class VIII, Ch. 11 "Pan Indian Dance Forms", `hekr111.pdf`) was attempted via browser.open and failed with a network error; per instructions it was not retried. The chapter therefore rests on IGNOU + GOVT + EPG sources only. NCERT-specific details (aramandi, sama sthana, atimandala, poloi, tahiya, mati-akhora, bani lists) are **not** taught.
2. **Sattriya** has no dedicated section: the fetched IGNOU block has no Sattriya unit. It is taught only as a list entry (IGNOU eight-form list) and via the Saptakam characterisation (Vaishnava monasteries of the Northeast) and the Sattriya Kendra. The widely-quoted recognition year **2000** is **not** asserted — no fetched allowed-publisher page states it.
3. **UNESCO ICH years not taught** (Kutiyattam 2001/2008, Chhau 2010, Sankirtana 2013): unesco.org is outside this book's publisher profile and no fetched GOVT page states the years. GK-ART-003 is therefore mapped untaught.
4. **Institutional dates not in fetched pages:** Kathak Kendra Delhi's founding year (1964), UP's state Kathak Kendra (1975), and the inauguration dates of the Chhau/Kutiyattam/Sattriya Kendras — the SNA About Us page lists the centres without dates (GK-ART-102, GK-ART-103 untaught).
5. **Kathak gharanas:** the fetched IGNOU text supports the Jaipur-court vs Delhi–Agra–Lucknow two-stream structure and Wajid Ali Shah, but not a Jaipur = nritta / Lucknow = nritya contrast in quotable prose, so that contrast is not taught. Banaras/Raigarh gharanas are not taught either.
6. **Folk dances beyond Bengal** (GK-ART-104's SNA inventory pairings) are not taught; the SNA ICH inventory was not fetched.
7. Spelling note: IGNOU spells the Assam form "Sattiriya" and Odisha "Odissa" in the eight-form list; the chapter's Bengali text uses the standard সত্রিয়া/ওড়িশা and the claim quotes are kept verbatim.

## Validation

`node scripts/validateBooks.js ~/workspace/edtech/bookwork/art-01/chapter.json` → **chapter.json: OK**
