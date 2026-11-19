# HIS-27 — Draft Report

Chapter: **সাংবিধানিক বিকাশ এবং গভর্নর-জেনারেল ও ভাইসরয় (১৭৭৩–১৯৪৭)** · part `modern_national` · subtopics `acts_policies` (verbatim from `history/toc.js`) · status DRAFT · verification UNVERIFIED.

Deliverables in `~/workspace/edtech/bookwork/his-27/`: `chapter.json`, `pyq_map_HIS-27.json`, this report.
Validator: `node scripts/validateBooks.js chapter.json` → **OK** (after level rebalance to basic 10 / moderate 15 / difficult 10 / exam 7).

## Sources actually fetched (browser text-fetch, 2026-11-19)

NCERT first, then IGNOU eGyanKosh (owner-authorised 2026-11-19) for what NCERT does not carry:

1. NCERT, *Our Pasts III* (VIII), Ch. 2 "From Trade to Territory" — https://ncert.nic.in/textbook/pdf/hess202.pdf
2. NCERT, *Our Pasts III* (VIII), Ch. 5 "When People Revolt: 1857 and After" — https://ncert.nic.in/textbook/pdf/hess205.pdf
3. NCERT, *Our Pasts III* (VIII), Ch. 8 "The Making of the National Movement: 1870s–1947" — https://ncert.nic.in/textbook/pdf/hess208.pdf
4. NCERT, *Politics in India Since Independence* (XII), Ch. 1 "Challenges of Nation Building" — https://ncert.nic.in/textbook/pdf/leps201.pdf
5. IGNOU, *Impact of British Rule: Polity and Society*, Block 6 — Units 23 (Constitutional Developments 1757–1858), 24 (Administration and Law), 25 (Social Policy and Indian Response) — https://egyankosh.ac.in/bitstream/123456789/62949/1/Block-6.pdf
6. IGNOU, BPSC-102 Unit 1 "The Making of the Indian Constitution" — https://egyankosh.ac.in/bitstream/123456789/57865/1/Unit1.pdf
7. IGNOU, *History of India VIII (c. 1857–1950)*, Unit 4 "Formation of Indian National Congress" — https://egyankosh.ac.in/bitstream/123456789/89545/3/Unit-4.pdf

One fetch failed and was not retried per instructions: `lehs306.pdf` (wrong NCERT code; network error) — its intended content (1947 transfer) was covered instead by leps201 + hess208.

## Counts

- Claims: **70** (c01–c70), every one with a verbatim quote from a fetched source above; every claim is used in the chapter (validator-enforced).
- Practice questions: **42** (basic 10, moderate 15, difficult 10, exam 7; formats include STATEMENT ×2, MATCH, CHRONOLOGY ×2, ASSERTION_REASON, PAIRS), spread over all 7 sections, each referencing its claim ids.
- Sections: 7 — regulating_pitt · charter_acts · company_governors · crown_1858 · viceroys_councils · reforms_1919_1935 · road_to_1947. Plus 16 events, 10 people, 25 timeline rows, 11 terms, 4 cause→effect chains, 6 exam-focus points, Bengal connection, 14 quick-revision lines.

## PYQs

- Candidates found: **32** — 30 from `history/pyq_chapters.json` (11 with HIS-27 as primary chapter, 19 with HIS-27 as alternate) + 2 assigned to HIS-27 by `polity/pyq_map.json` (WBCS-2023-Q194 Charter Act 1853; WBCS-2023-Q125 first PSC under GOI Act 1919). All 32 question texts/keys were verified against `BE/db/pyq/*.json`.
- Mapped in `pyq_map_HIS-27.json`: 32/32. **Taught: 21. Untaught: 11**, each with a specific reason.

## Subtopic coverage (acts_policies)

Fully covered from fetched sources: Regulating Act 1773, Pitt's Act 1784 (+1786), Charter Acts 1793/1813/1833/1853, civil-service evolution (patronage → 1833 limited competition → 1853 open competition), GOI Act 1858, Mayo's financial decentralisation 1870, VPA/Arms Act 1878 + repeal, Ilbert Bill 1883, Partition of Bengal 1905, Councils Act 1909 (representative element, separate representation), GOI Act 1919 (dyarchy) + Rowlatt Act, Simon Commission 1927, Nehru Report 1928, GOI Act 1935 (provincial autonomy, three lists, federal court, failed federation, 1937 elections), Cripps 1942, Cabinet Mission 1946, Mountbatten Plan, independence 15 Aug 1947, first Indian GG Rajagopalachari. Governor-Generals/Viceroys covered: Hastings, Cornwallis, Lord Hastings, Bentinck, Dalhousie, Canning, Mayo, Lytton, Ripon, Curzon.

## Gaps (disclosed, never filled from memory)

- **WBBSE** *অতীত ও ঐতিহ্য*: unreachable from this machine (per task instruction, not retried) — chapter is NCERT + IGNOU only.
- **Indian Councils Acts 1861 & 1892**: detailed provisions not present in the fetched units; the chapter teaches the line only up to what sources support and says so in the viceroys_councils deep text.
- **Untaught PYQ facts** (11): Mayo's murder in the Andamans; Younghusband Mission (Curzon); Chamber of Princes 1920; Viceroy at Quit India (Linlithgow) and at Civil Disobedience (Irwin) — movements taught, viceroys unnamed in sources; Widow Remarriage Act year 1856 (×2; HIS-20's chapter; hess205 gives no year); Montagu-Chelmsford "announced 1918" (the 1919 Act is taught, the announcement year is not in sources); Independence Act month (July 1947); Mountbatten as first GG of independent India (only the Mountbatten Plan + Rajagopalachari as first *Indian* GG are sourced — the chapter's exam_note flags the distinction); first Public Service Commission under GOI Act 1919.
- **Source disagreement disclosed in-chapter**: Congress provincial governments after the 1937 elections — NCERT hess208 says 7 of 11 provinces, IGNOU BPSC-102 says eight provinces; both quoted in an exam_note.
- Two PYQ identifications carry caveats in the map: "Black Bill" nickname and the Rowlatt Act's official long title do not literally appear in the fetched sources, though the Act itself is fully taught.
