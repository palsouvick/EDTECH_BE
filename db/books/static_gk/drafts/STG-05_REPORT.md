# STG-05 — দেশ, রাজধানী ও মুদ্রা — Draft Report

- **Book / chapter:** static_gk (স্ট্যাটিক জিকে), STG-05, part `world_sport`, subtopics `['countries_capitals']` (verbatim from `db/books/static_gk/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Claims:** 15 · **Practice questions:** 42 (basic 14, moderate 15, difficult 7, exam 6; all 6 sections covered)

## Sources actually fetched (browser.open, all GOVT publisher — gov.in/nic.in)

| # | Title | URL |
|---|-------|-----|
| s1 | Embassy of India, Tokyo — Japan Profile | https://www.indembassy-tokyo.gov.in/index.php/eoityo_pages/MTc, |
| s2 | MoFPI — Country Profile: JAPAN (World Food India 2025) | https://mofpi.gov.in/api/documents/file/japan_country_profile_ver_4.pdf |
| s3 | PM's address to the Joint Session of the Australian Parliament (PM India) | https://www.pmindia.gov.in/en/news_updates/pms-address-to-the-joint-session-of-the-australian-parliament/ |
| s4 | High Commission of India, Canberra — Modes of Payment and Fee Schedule | https://www.hcicanberra.gov.in/page/modes-of-payment-and-fee-schedule/ |
| s5 | Embassy of India, Amman — Visa Fees | https://indembassy-amman.gov.in/visa_fees.html |
| s6 | Embassy of India, Amman — India–Jordan Bilateral Relations | https://indembassy-amman.gov.in/Bilateral_Relations.html |
| s7 | High Commission of India, Abuja — Fee Structure | https://www.hciabuja.gov.in/content/Fee_Structure_08jun2026.pdf |
| s8 | MEA — India-Jordan Bilateral Brief | https://www.mea.gov.in/Portal/ForeignRelation/India-Jordan-0726.pdf |
| s9 | PIB Backgrounder — India's Engagements with Jordan (Dec 2025) | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/dec/doc20251216733501.pdf |
| s10 | MEA — India-Australia Bilateral Brief | https://www.mea.gov.in/Portal/ForeignRelation/India-Australia-072026.pdf |

Fetched but unusable for claims (no capital/currency fact box): MEA India-Jordan and India-Australia briefs were used only where they carried usable quotes (s8/s10 above); several MEA bilateral-brief URLs and embassy profile hunts returned 404s or no fact boxes and were dropped.

## PYQ candidates

- `db/gk/static_gk.jsonl`: **0 items** with subtopic `countries_capitals` (bank subtopics present: awards_honours, books_authors, international_orgs, census_statistics, important_days) — so `related_facts` is empty and no GK-XXX codes exist for this chapter.
- `db/pyq/*.json` grep: **4 genuine candidates** found (other রাজধানী/মুদ্রা hits were Indian-history capitals or arithmetic coin/capital problems — excluded).
- **Mapped: 4 · Taught: 3 · Untaught: 1**
  - Taught: Australia–Canberra (2019), Nigeria–Abuja (2023 S-I), Jordan–Amman (2023 S-III)
  - Untaught: USA–Washington, D.C. (2023 S-II Q89) — no allowed-publisher quote fetched in this run; reason recorded in `pyq_map_STG-05.json`.

## Subtopic coverage

`countries_capitals` is covered for four countries with fetched GOVT quotes: Japan (Tokyo / Japanese Yen — two independent sources), Australia (Canberra / Australian Dollar), Jordan (Amman / Jordanian Dinar), Nigeria (Abuja / Naira), plus method content (pair-learning, capital ≠ largest city, currency-name families).

## Gaps (disclosed, never filled from memory)

1. **Scope gap:** Neighbouring countries (Nepal, Bangladesh, Bhutan, Pakistan, Sri Lanka, Myanmar, China) and Europe/Americas countries could NOT be sourced from allowed publishers (gov.in/nic.in, NCERT) in this run — MEA briefs carry no country fact boxes and several embassy profile pages were unreachable. The chapter therefore teaches only the four sourced countries; a later sourcing pass should extend it.
2. **USA capital untaught:** the Clerkship 2023 PYQ on Washington, D.C. is mapped as taught=false (see pyq_map).
3. **Quote-strength caveat (Amman, Abuja):** no fetched gov.in page states the literal phrase "capital of Jordan" / "capital of Nigeria". The chapter teaches Amman and Abuja from seat-of-government evidence clusters (embassy seat, royal reception of the PM, FOC hosting, mission fee documents headed by the mission city). Flagged in `verification.notes` for the blind-check stage.
4. **Zero bank items:** `static_gk.jsonl` has no `countries_capitals` items, so no GK bank cross-links were possible.
5. `cause_effect` is limited to one genuinely quote-backed chain (Amman PM visit → five MoUs); no further chains were asserted without quotes.
