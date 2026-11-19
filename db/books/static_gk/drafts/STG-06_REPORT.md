# STG-06 — গুরুত্বপূর্ণ দিবস (সারাংশ) — Draft Report

- **Book / code:** static_gk / STG-06, number 6, part `links` (per `db/books/static_gk/toc.js`), subtopic `important_days`
- **Status:** DRAFT, verification UNVERIFIED
- **Validator:** `node scripts/validateBooks.js chapter.json` → **OK** (after fixing one banned "none-of-the-above" option and one duplicate PAIRS stem)
- **Counts:** 42 claims · 42 questions (basic 12, moderate 12, difficult 11, exam 7; 7 questions per section × 6 sections) · 38-entry calendar timeline · 7 events · 4 people · 6 terms · 3 cause–effect sets

## Task-vs-TOC discrepancies (resolved in favour of the TOC, which the validator enforces)
- The task text said part "world" and title "(সারসংক্ষেপ)". The registered TOC entry is part **`links`** and title **গুরুত্বপূর্ণ দিবস (সারাংশ)** — used verbatim. ("world" is not a valid part in `PROFILES.static_gk`.)

## Sources actually fetched (browser.open, 2026-11-19) — all allowed publishers (GOVT)
1. Important Events for celebration under ECO-Club — https://cdnbbsr.s3waas.gov.in/s32cad8fa47bbef282badbb8de5374b894/uploads/2023/07/2023070438.pdf (base list; ~25 day facts, claims c01–c24)
2. PIB — MoEFCC year-end release (WED 5 June 2025; 11th International Day of Yoga 21 June 2025) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2210100&reg=3&lang=2
3. PM's Mann Ki Baat, 28 Aug 2016 (National Sports Day / Dhyan Chand; Teachers Day / Radhakrishnan) — https://www.pmindia.gov.in/en/news_updates/pms-mann-ki-baat-programme-on-all-india-radio-on-august-28-2016/?comment=disable&tag_term
4. PIB — Constitution Day (Samvidhan Diwas), 26 November — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1675698&reg=48&lang=2
5. PIB — World AIDS Day backgrounder (1 December; first marked 1988 by WHO) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2196475&reg=3&lang=2
6. NACO News Vol. X Issue 16 (III), Apr–Dec 2018 (World Blood Donor Day 14 June; International Youth Day 12 August) — https://naco.mohfw.gov.in/sites/default/files/NACO%20Newsletter%20Volume%20X%20Issue%2016%28iii%29-English%20Version_0.pdf
7. PIB / MoHFW — World Health Day backgrounder (7 April; WHO founded 07 April 1948) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2023/apr/doc202346178601.pdf
8. PIB — Year End Review 2025, Ministry of Women & Child Development (IWD 8 March; 25 Nov → 10 Dec Human Rights Day; Veer Bal Diwas mention) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=2212747&reg=3&lang=2
9. PIB — World Telecommunication Day 2025 backgrounder (17 May; ITU + 1865 Telegraph Convention) — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/may/doc2025517556601.pdf
10. PIB — Year End Review 2022, Department of Consumer Affairs (World Consumer Rights Day celebrated 15.03.2022) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1885059&reg=3&lang=2
11. PIB — President's convocation address, University of Dhaka (International Mother Language Day 21 February; Bengal roots) — https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=92878&reg=3&lang=2
12. PIB Mumbai — Special Cover on Cancer, World Cancer Day 2021 (dated 4 February 2021) — https://www.pib.gov.in/PressReleasePage.aspx?PRID=1695269&reg=3&lang=2
13. ECI SVEEP "Reaching out to Every Voter" (National Voters' Day, 25 January) — https://ceoelection.bihar.gov.in/SveepPublication/5.pdf

Searched but not used (no usable allowed-publisher statement found): un.org / UN-system pages (not allowed publishers for this book), ncert.nic.in (no relevant day list), india.gov.in day pages.

## PYQ candidates
- **Found: 14** — 2 GK bank items with subtopic `important_days` (GK-SGK-007, GK-SGK-008) + 12 real corpus questions on important days (WBPSC Clerkship 2023 ×4, WBPSC Miscellaneous 2023 ×2, WBCS Prelims 2015/2016/2017/2018 ×5 — codes copied verbatim from the corpus).
- **Mapped: 14/14** in `pyq_map_STG-06.json`.
- **Taught: 8** (GK-SGK-007; Clerkship Q45 Blood Donor Day, Q52 AIDS Day, Q71 National Sports Day; Misc Q27 correct-match incl. Telecommunication Day; WBCS 2015 Q140 Cancer Day, 2016 Q183 Consumer Rights Day, 2017 Q63 Ozone Day).
- **Not taught: 6**, each with its reason in the map — annual themes (WBCS 2016 Q54 Human Rights Day 2015 theme; WBCS 2018 Q51 Peace Day 2017 theme), year-specific host (Clerkship 2023-I Q92, WED 2024 host), unsourced dates (GK-SGK-008's UN Day 24 Oct; WBCS 2018 Q191 World Soil Day 5 Dec), and a purpose-type question with no source (Misc Q13 Rare Disease Day).

## Subtopic coverage (`important_days`)
Taught with fetched quotes: National Youth Day, Girl Child Day, Voters' Day, Constitution Day, Children's Day (date), Science Day, Sports Day, Teachers Day, Wetlands Day/Ramsar, Cancer Day, Mother Language Day, Women's Day, Consumer Rights Day, Sparrow Day, Forestry Day, Water Day, Meteorological Day, Health Day, Heritage Day, Earth Day, Telecommunication Day, Biodiversity Day, Environment Day, Oceans Day, Blood Donor Day, Global Wind Day, Yoga Day, Population Day/Five Billion Day, International Youth Day, Ozone Day, Car Free Day, Tourism Day, Habitat Day, Elimination of Violence against Women Day, AIDS Day, Pollution Prevention Day/Bhopal, Human Rights Day, Energy Conservation Day. The chapter explicitly points students to the dedicated **Important Days** book (and **Organisations** book for organisation-linked days) instead of duplicating full month-wise lists.

## Gaps (disclosed, never filled from memory)
1. **United Nations Day (24 October)** — part of bank item GK-SGK-008 but no allowed-publisher (gov.in/nic.in/NCERT) page stating the date could be fetched; left untaught, flagged in the PYQ map.
2. **World Soil Day (5 December)** and **World Day Against Child Labour (12 June)** — appear in PYQ explanations but could not be sourced from an allowed publisher; not taught.
3. **Children's Day (14 November)** — the date is in the government ECO-Club calendar (c21), but the Nehru connection is not stated in any fetched source, so the chapter teaches the date only and says so in the section text.
4. **World Cancer Day (4 February)** — evidence is the PIB Mumbai release's own date (4 February 2021) plus its wording "This initiative taken on World Cancer Day- 2021"; solid but indirect, disclosed here and in claim c40.
5. **Thin (heading-level) quotes** for World Water Day, World Heritage Day, World Tourism Day, World Habitat Day and National Energy Conservation Day — these rest on the ECO-Club calendar's dated entries rather than prose statements.
6. **Annual themes and year-specific hosts** are deliberately excluded (they change yearly); PYQs asking them are mapped as untaught with that reason.
7. Explanations in PYQ papers that were not in fetched sources (Karl Landsteiner link for Blood Donor Day; Montreal Protocol 1987 link for Ozone Day; 2016 WED theme) are not taught.
8. Veer Bal Diwas (26 December) was seen in the MWCD review but is not taught — it is outside this chapter's fetched-claim set beyond a passing mention and is left to the dedicated Important Days book.
