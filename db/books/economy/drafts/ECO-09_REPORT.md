# ECO-09 — কৃষি ও শিল্প (Agriculture & Industry) — Draft Report

- **Chapter:** ECO-09, book `economy`, part `sectors`, subtopic `agri_industry` (title/part/subtopics verbatim from `economy/toc.js`)
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK**
- **Deliverables:** `chapter.json`, `pyq_map_ECO-09.json`, this report — in `~/workspace/edtech/bookwork/eco-09/`

## Sources actually fetched (browser text-fetch, 2026-11-19)

| id | Title | URL | Publisher class |
|----|-------|-----|-----------------|
| s1 | Indian Economic Development, Class XI, Ch. 2: Indian Economy 1950–1990 | https://ncert.nic.in/textbook/pdf/keec102.pdf | NCERT |
| s2 | Indian Economic Development, Class XI, Ch. 3: Liberalisation, Privatisation and Globalisation — An Appraisal | https://ncert.nic.in/textbook/pdf/keec103.pdf | NCERT |
| s3 | PM-KISAN Scheme — official portal | https://pmkisan.gov.in/ | GOVT |
| s4 | PIB: Prime Minister to Launch 'Make in India' Initiative (24 Sep 2014) | https://pib.gov.in/newsite/PrintRelease.aspx?relid=109953 | GOVT |
| s5 | PIB: PM launches PM Vishwakarma Scheme (17 Sep 2023, PRID 1958244) | https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1958244 | GOVT |

All five URLs are inside the economy validator profile (NCERT / GOVT). No RBI source was needed for this chapter's scope.

## Counts

- **Claims:** 48 (c01–c48), every one with a verbatim quote from a fetched page above; every claim is used by at least one section/box/event/question (validator-enforced).
- **Questions:** 42 — basic 14, moderate 14, difficult 7, exam 7 (STATEMENT ×4, CHRONOLOGY, ASSERTION_REASON, MATCH); all 7 sections tested, 6 questions per section.
- **Sections:** 7 — agri_start, land_reforms, green_revolution, support_risk, industry_policy, small_scale, reforms_sectors.
- Time-sensitive figures carry as-of dates in claim text (PM-KISAN ₹6,000/yr in 3 instalments — "as on 19 Nov 2026", source portal fetched that day).

## PYQ candidates

- **Found:** 11 — 4 from the GK bank (`db/gk/economy.jsonl`, subtopic `agri_industry`: GK-ECO-011, GK-ECO-101, GK-ECO-107, GK-ECO-118) + 7 from the real-exam corpus (`db/pyq/*.json`: WBCS 2015 Q36, WBCS 2015 Q198, WBCS 2017 Q147, WBCS 2018 Q120, WBCS 2019 Q28, WBCS 2021 Q134, WBPSC Clerkship 2023 Session-II Q87).
- **Mapped:** 11/11 in `pyq_map_ECO-09.json`.
- **Taught:** 8 (all 4 GK items; WBCS 2015 Q36, 2015 Q198, 2017 Q147, 2021 Q134).
- **Untaught (3), each with a specific source-gap reason in the map:**
  - WBCS 2018 Q120 — IADP/IAAP programme names are not in NCERT keec102/keec103 (flagged in an exam_note box).
  - WBCS 2019 Q28 — West Bengal Land Reforms Act year (1955) is a state-Act detail absent from the NCERT sources (disclosed in bengal_connection).
  - Clerkship 2023 S-II Q87 — Operation Flood / White Revolution (dairy) is outside the fetched sources.

## Subtopic coverage (agri_industry)

Agriculture at independence and sector structure; land reforms (intermediaries, ceiling, success/failure, Kerala–West Bengal); Green Revolution (HYV, two phases, marketed surplus, buffer stock); subsidy debate, risks and PM-KISAN; industrial policy (IPR 1948/1956, licensing, import substitution, permit-licence raj, sector outcomes); small-scale industry (Karve Committee, definition, reservation, PM Vishwakarma); post-1991 sector picture (delicensing, dereservation, Make in India, reforms' limits in agriculture). Bengal connection is genuine and NCERT-sourced (WB land-reform success; Kolkata steel firm and jute).

## Gaps (disclosed, never filled from memory)

1. IADP/IAAP names for the Green Revolution's district programmes — not in NCERT Ch. 2; untaught.
2. Operation Flood / White Revolution and dairy — outside this chapter's fetched sources; untaught.
3. West Bengal Land Reforms Act (1955) year and Operation Barga details — state sources not fetched; only NCERT's "WB land reforms succeeded" is taught.
4. MSP, agricultural marketing/APMC, NABARD, cooperative credit and MSME's current (post-2020) definition — no fetched source carried them in this run; not taught. The small-scale investment limit is taught only as NCERT states it (₹5 lakh in 1950), with the textbook's own "present ₹1 crore" line deliberately not turned into a current-affairs claim.
5. `people` is an empty array: no person-level fact (e.g. a named architect of the Green Revolution) is carried by the fetched sources, so none was invented.
