# Batch 1 review report — HIS-21, HIS-20, HIS-23 (2026-11-12)

All three chapters: **VERIFIED, status DRAFT** (not published). Files are in `db/books/history/drafts/`; the live
loader reads only `db/books/history/ch*.json`, so nothing here is visible to students yet.

Common sources: NCERT PDFs from ncert.nic.in; WBBSE অতীত ও ঐতিহ্য Class VIII, official Banglar Shiksha PDF
(provenance and SHA-256 in `SOURCE_MANIFEST.md`), OCR'd locally (Tesseract 5.4, ben+eng). No other WBBSE class used.
Workflow per chapter: writer (claims with verbatim quotes) → `checkQuotes.js` → `validateBooks.js` → independent blind
check from an answer-free packet → fixes applied with `applyTextFixes.js` → re-check → VERIFIED.

---

## HIS-21 — জাতীয়তাবাদের উত্থান ও আদি কংগ্রেস (১৮৮৫–১৯০৫)
- **File:** `ch21-early-congress.json`; prerequisites HIS-19, HIS-20; links to HIS-22 (1905+) and HIS-23.
- **Sources:** NCERT hees202 (Exploring Society 8 Pt 2 ch 2), hess208 (Our Pasts III ch 8), hees104, jess302, hess206;
  WBBSE VIII ch 6 "জাতীয়তাবাদের প্রাথমিক বিকাশ" (PDF pp. 371–421), ch 4 (pp. 275, 278), ch 8 (pp. 557–567).
- **Sections:** background · associations (Landholders'/জমিদার সভা, British Indian Association, ভারত সভা) · grievances
  (Lytton: Vernacular Press Act, Arms Act, Delhi Durbar during famine; Ripon repeal; Ilbert Bill) · founding (1885,
  Bombay, 72 delegates, Bonnerjee, Hume) · moderates · economic_nationalism (Naoroji, drain, R.C. Dutt) · extremists
  (Lal-Bal-Pal, Tilak, to 1905).
- **Size:** 163 claims (62 NCERT, 101 WBBSE); 47 questions: basic 10, moderate 17, difficult 11, exam 9.
- **Exam relevance (PYQs taught):** 27 of 51 candidates (WBCS Prelims 23, WBPSC Clerkship 4); 16 of 32 primary.
- **Not taught: 24.** 12 belong to other chapters (first woman president → HIS-22; Mayo, Younghusband → HIS-27; Shom
  Prakash, Aligarh → HIS-20 …). 12 are in neither book (safety-valve theory, "civil war without arms", New Lamps for
  Old, origin of the word "Congress", British Committee 1889, Bombay Triumvirate, Age of Consent Bill, Iqbal …).
- **Facts verified:** quote check 106 OK, 50 OK_OCR, 7 WBBSE quotes confirmed on the page image (c83, c94, c96, c101,
  c124, c130, c139).
- **Conflicting sources (exam_notes in chapter):** Tilak's slogan ("Freedom" hess208 vs "Swaraj" hees202); Vande
  Mataram 1875 vs "1870s"; Ilbert Bill outcome (WBBSE adds a compromise, with an apparent misprint "ইউরোপীয় বিচারকদের");
  length of the Moderate phase; the label "Extremist" vs "Nationalist"; R.C. Dutt historian vs civil servant; spelling
  নৌরজি (WBBSE) vs নওরোজি (chapter).
- **Doubtful keys:** WBCS 2018 Q182 Hind-Hindi-Hindu (key Malaviya): in neither book; not taught; not contradicted.
- **Exam answers stated without textbook support (owner to confirm acceptable):** "Grand Old Man" = Naoroji, and "first
  Muslim president" = Tyabji. Both exam_notes say the books do not use these words.
- **Source gaps:** above, plus founding years of Hindu Mela, British Indian Association, Landholders' Society (not named
  in either book), Poona Sarvajanik Sabha year.
- **Blind check:** 47/47 answers matched the key (46 SURE, 1 LIKELY). 15 prose issues, 0 errors (e.g. ভারত সভা "সবচেয়ে"
  → "অন্যতম" গুরুত্বপূর্ণ; a false link from Curzon's 1899 Calcutta municipal act to Partition removed; "leaders largely
  from Calcutta" → "Bombay and Calcutta"; Hume labelled as the usual exam answer, not a textbook "founder"). q44
  (assertion-reason) was anchored to the WBBSE book, because a second option was defensible from NCERT alone. All fixed.
- **Final status:** VERIFIED · DRAFT.

## HIS-20 — সমাজ ও ধর্মসংস্কার: বাংলার নবজাগরণ
- **File:** `ch20-bengal-renaissance.json`.
- **Sources:** NCERT hess206, hess207, hees202, hees104, lehs102 (Asiatic Society 1784; downloaded by the writer),
  lehs302, hess202; WBBSE VIII ch 3 (education, PDF pp. 174–193), ch 5 (reform, pp. 291–321), pp. 333–334.
- **Sections:** orientalism (Hastings, Jones, Asiatic Society, Wilkins) · western_education (Fort William 1800,
  Serampore, Hindu College 1817, Sanskrit College, Macaulay 1835, Wood 1854, universities 1857) · press (Bengal
  Gazette 1780, Samachar Darpan 1818, Hindu Patriot, Somprakash, Bankim) · rammohun_brahmo (sati 1829, Atmiya Sabha,
  Brahmo Samaj, Debendranath, Keshab) · derozio_vidyasagar (Young Bengal, widow remarriage 1856) · women_reform ·
  reform_india (Prarthana, Arya Samaj, Ramakrishna–Vivekananda, Aligarh, Singh Sabha) · caste_reform (Matua, Narayana
  Guru, Phule, Ambedkar, Periyar).
- **Size:** 254 claims (189 NCERT, 65 WBBSE); 44 questions: basic 10, moderate 16, difficult 11, exam 7.
- **Exam relevance (PYQs taught):** 29 of 47 candidates (WBCS 17, WBPSC Clerkship 11, IDO 1); 27 of 34 primary.
- **Not taught: 7 primary PYQs (source gaps).** Bartaman Bharat; Tattwabodhini Sabha ×2; founder of Somprakash; Akbar II's
  "Raja" title; Malabari; Vidyasagar's birthplace (Birsingha).
- **Facts verified:** 189 OK, 53 OK_OCR, 12 WBBSE quotes confirmed on the page image. The c137 quote spelling was
  corrected to the print, and the c170 page was set to 294–295.
- **Conflicting sources:** Brahmo Samaj 1830 (Our Pasts III) vs 1828 (Exploring Society, WBBSE). There is an exam_note,
  and q31 tests the difference. Benaras Hindu College founder (Duncan) is in WBBSE only. NCERT's "Scottish" for Carey
  was avoided.
- **Doubtful keys (official key kept authoritative):**
  - **Hindu College founder.** In WBCS 2016 Q171 and Clerkship 2023 Q91 the key is Rammohun Roy. WBBSE p. 186: Hyde East
    and David Hare took the initiative, and Rammohun "was also associated". The exam_note gives both, and no question
    implies another answer. **Owner may want to review this note.**
  - WBCS 2018 Q182 (Malaviya) and Q196 (Aurangzeb and sati) belong to other chapters; not contradicted.
- **Blind check:** 44/44 answers matched the key (43 SURE, 1 LIKELY). 16 prose issues, 1 ERROR: "1800 = start of Bengali
  printing". WBBSE has Halhed's grammar with Bengali type in 1778. The wording now reads "spread of Bengali printing at
  Serampore". Other fixes: an unsupported "Hicky's Gazette" nickname removed; "first" claims softened (sati law; Mohammedan
  Literary Society); Macaulay dated to the 1830s; Bethune School no longer implied to be Vidyasagar's. q24 was reworded
  from "led the founding" to "led the reform work" of the Prarthana Samaj, per WBBSE. All fixed.
- **Final status:** VERIFIED · DRAFT.

## HIS-23 — বিপ্লবী আন্দোলন
- **File:** `ch23-revolutionaries.json`; prerequisite HIS-22; links to HIS-24/25/26 (INA).
- **Sources:** NCERT hees202 (main), hess208, jess302; WBBSE VIII pp. 444–455 ("বিপ্লবী সন্ত্রাসবাদ"), 481, 499–503,
  507, 524, 566–567, 659 (chronology).
- **Sections:** background · bengal_samitis (Anushilan, Jugantar, Dhaka Anushilan / Pulin Das) · khudiram_alipore
  (Muzaffarpur 30 Apr 1908, Alipore case, Aurobindo) · maharashtra_others (Chapekar, Abhinav Bharat, Nashik,
  Vanchinathan) · ghadar_ww1 (Ghadar, Rash Behari, Bagha Jatin at Balasore 1915, Udham Singh) · hsra_bhagat (Kakori,
  HSRA, Saunders, Assembly bomb, 23 Mar 1931) · bengal_1930s (Chittagong / Surya Sen, Writers' Building 8 Dec 1930,
  Comilla, Bina Das, Matangini Hazra).
- **Size:** 129 claims. This is below the 150–200 norm because the two books hold no more; nothing was padded. 46 questions:
  basic 10, moderate 16, difficult 10, exam 10.
- **Exam relevance (PYQs taught):** 15 of 29 candidates (WBCS 14, Clerkship 1); 15 of 25 primary.
- **Not taught: 14.** Dhingra / Curzon Wyllie ×2; Pather Dabi; Irish influence; Savarkar's petitions; Philosophy of the
  Bomb; HRA founder 1924; Khudiram's place of execution; Anushilan founder ×2 (see below); others belong to HIS-22/26.
- **Facts verified:** 92 OK, 36 OK_OCR, c110 (Writers' Building) confirmed on the page image.
- **Conflicting sources (exam_notes):**
  - **Kakori leadership.** NCERT: an HRA group under Bismil, Ashfaqulla and Azad. WBBSE p. 502 calls them Bhagat Singh's
    followers, which looks wrong; students are told to follow NCERT.
  - **Saunders.** Three different descriptions across the books.
  - **HSRA.** "Army" (jess302) vs "Association".
  - Bhagat Singh's age.
  - Kingsford: judge vs Presidency Magistrate.
  - Ghadar: North America (NCERT) vs "উত্তর ভারতের" (WBBSE).
- **Doubtful/conflicting keys:** Anushilan Samiti founder (WBCS 2022 Q80; Clerkship 2004 Q67). The app's answer is
  Pramathanath Mitra; WBBSE p. 448 says "সতীশচন্দ্র বসু প্রতিষ্ঠিত". The exam_note states both. Satishchandra is not among
  those papers' options, so the key is not contradicted, and no practice question asks it.
- **Source gaps:** Pramathanath Mitra; Ghadar founding year 1913; Hardinge bomb date and place; "Buribalam"; Pritilata
  and Kalpana Datta (beyond a name list); Bengal Volunteers; India Independence League.
- **Blind check:** 46/46 answers matched the key (all SURE). 16 prose issues, 2 ERRORS:
  1. "বি. ডি. সাভারকর" corrected to ভি. ডি.
  2. "All three books name Bhagat Singh, Azad and Rajguru as Saunders' killers" was wrong. Only Our Pasts III names all
     three; the text now says what each book says.

  The other 14 fixes include: Bina Das no longer dated 1931 (the books say only "a few months later"); "first officer
  killing after 1857" softened; Ghadar leaders = Hardayal and Sohan Singh Bhakna; Aurobindo's move to Pondicherry tied to
  the 1910 arrest threat; Kartar Singh's unsourced 1915 date removed; Chittagong no longer "the biggest". All fixed.
- **Final status:** VERIFIED · DRAFT.

---

## Also done in this batch
- **HIS-24/25/26:** stale "Awaiting owner review (DRAFT)" note replaced. No other change; validator OK.
- **HIS-22 WBBSE cross-check** (read-only; `wbbse_crosscheck_HIS-22.json`): 54 facts agree, 8 differences, no factual
  error. Proposed additive exam_notes, **not applied** (published chapter):
  1. Rabindranath proposed Rakhibandhan (WBBSE p. 428). The chapter currently says the initiator can't be verified.
  2. Partition dates: announced 19 July, carried out 16 Oct 1905.
  3. Name the Morley–Minto / Indian Councils Act 1909.
  4. Capital to Delhi: chapter and q39 say 1911; WBBSE chronology says 1912.
  5. WBBSE's Surat 1907 account: the president's election.
  6. Limits of Swadeshi and its communal turn.
  7. "Most leaders meant self-rule within the Empire."

## Decisions needed from the owner
1. Approve publication of HIS-20, HIS-21, HIS-23. Publishing means moving the files from drafts/ to history/, setting
   them PUBLISHED, and merging their PYQ maps into `pyq_map.json`.
2. Is it acceptable to state an exam answer the textbooks do not support, when it is clearly labelled? This affects the
   Grand Old Man, first Muslim president and Hindu College founder notes.
3. HIS-22: apply the 7 additive notes? Item 4 affects q39.
4. Spelling consistency: HIS-22 uses খুদিরাম / চাকী / স্বদেশী; WBBSE and HIS-23 use ক্ষুদিরাম / চাকি / স্বদেশি.
5. HIS-23 is lighter (129 claims) and HIS-21 teaches only half its primary PYQs, because of the NCERT + WBBSE VIII limit.
   Should WBBSE Class IX/X History be approved as an extra source?
6. GK fact corrections suggested by the writers, **not applied**:
   - GK-SGK-212: hees104 now supports the "drain" link and the year 1901.
   - GK-IGK-110: add hees202 p. 8 so it rests on NCERT.
   - GK-HIS-014 and GK-HIS-018: optional WBBSE details.
