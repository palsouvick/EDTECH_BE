# HIS-21 extension pass 2 report (ch21-early-congress.json)

Output: `drafts/ext2_HIS-21_chapter.json` (live file untouched). Validator: `node scripts/validateBooks.js drafts/ext2_HIS-21_chapter.json` -> **OK**.
Integrity: all 47 existing questions, 163 existing claims and 6 existing sources are byte-identical; `status` PUBLISHED and `verification` unchanged.
Top-level fields that changed: sections (text woven in, claim ids added, boxes added/updated), timeline, exam_focus, sources, claims, questions.

## Sources fetched (saved under `C:\Users\DESKTOP\edtech-sources\`)

| id | Title | Publisher | URL |
|---|---|---|---|
| s7 | IGNOU B.A.(Hons) History, Unit 4: Formation of Indian National Congress | IGNOU eGyanKosh | https://egyankosh.ac.in/bitstream/123456789/89545/3/Unit-4.pdf |
| s8 | IGNOU Unit 10: Indian National Congress: Moderates and Extremists | IGNOU eGyanKosh | https://egyankosh.ac.in/bitstream/123456789/19929/1/Unit-10.pdf |
| s9 | IGNOU M.A. History, Unit 5: Moderates and Extremists: Dadabhai Naoroji, MG Ranade and BG Tilak | IGNOU eGyanKosh | https://egyankosh.ac.in/bitstream/123456789/22538/1/Unit-5.pdf |
| s10 | IGNOU Unit 2: Responses of Indian Society | IGNOU eGyanKosh | https://egyankosh.ac.in/bitstream/123456789/21038/1/Unit-2.pdf |
| s11 | NIOS Sr Sec History 315, Lesson 20: Nationalism | NIOS | https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson20.pdf |
| s12 | NIOS Sr Sec History 315, Lesson 21: Indian National Movement | NIOS | https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson21.pdf |

Also read, not cited: e-PG Pathshala "Outlines of Indian History" ch. 34 (India under British Crown), 35, 36, 38
(https://ebooks.inflibnet.ac.in/icp01/chapter/india-under-british-crown/ etc.), IGNOU Unit 8 (Muslim thought) and
other eGyanKosh units. Quotes of all 25 new claims were machine-checked against the PDF text (page located for each).
eGyanKosh search that works with curl: `https://egyankosh.ac.in/simple-search?query=...`, then `/handle/123456789/<id>`, then `/bitstream/...pdf`.

## Worklist table (22 items)

| pyq_code | Result |
|---|---|
| WBCS-EXE-PRELIMS-2022-PRELIMS-Q110 (Grand Old Man) | TAUGHT (c183, economic_nationalism; q48) |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q118 (Grand Old Man) | TAUGHT (c183, economic_nationalism; q48) |
| WBCS-EXE-PRELIMS-2017-PRELIMS-Q90 (Poona Sarvajanik Sabha 1870) | TAUGHT (c164, associations; q49; old exam_note rewritten; timeline 1870) |
| WBCS-EXE-PRELIMS-2018-PRELIMS-Q166 (New Lamps for Old) | TAUGHT (c180, c184, c185, extremists; q58) |
| WBCS-EXE-PRELIMS-2021-PRELIMS-Q82 (safety valve) | TAUGHT (c165, c166, c186, c187, c188, founding; q50; the old "not in sources" warning in the deep text replaced) |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q42 (1886 Calcutta session / merger) | TAUGHT (c167, c168, c170, c171, founding; q51, q52, q53; timeline 1886). See note 1 |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q187 (Shivaji festival 1896) | TAUGHT (c181, c182 for 1896; c178, c179 for Ganapati 1893; extremists; q56, q57, q59) |
| WBCS-EXE-PRELIMS-2024-PRELIMS-Q97 (Age of Consent Bill) | TAUGHT (c175, c176, c177, c174, extremists; q55, q56 is not about it; exam_note on 1890 vs 1891). See note 2 |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q32 (British Committee 1889, Wedderburn) | STILL_UNTAUGHT: IGNOU Units 10 and 4 give the 1889 founding and the organ *India* (1890; taught as c172, c173, q54) but none of the pages fetched names the chairman. exam_note added in `moderates` saying so |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q66 (Naoroji, Liberal party) | STILL_UNTAUGHT: IGNOU Unit 10 says he "got elected to the British House of Commons"; no fetched page names his party |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q71 ("civil war without arms") | STILL_UNTAUGHT: IGNOU Unit 8 (Sir Syed) says he told Muslims to keep away from Congress, but the quotation is in no fetched page (the existing exam_note in `founding` stays correct) |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q176 (origin of the word "Congress") | STILL_UNTAUGHT: no fetched NCERT/WBBSE/IGNOU/NIOS/e-PG page explains the name; deep text updated to say so |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q181 (Bombay Triumvirate) | STILL_UNTAUGHT: term absent from every fetched page |
| WBCS-EXE-PRELIMS-2018-PRELIMS-Q182 (Hind-Hindi-Hindu, Malaviya) | STILL_UNTAUGHT: slogan not in any fetched page (doubtful_key unchanged) |
| WBPSC-CLERKSHIP-PART-I-2004-Q63 (Sare Jahan Se Accha, Iqbal) | STILL_UNTAUGHT: not in any fetched page; arts/culture, not this chapter's topic |
| WBPSC-CLERKSHIP-PART-I-2023-SESSION-I-Q90 (first woman INC president) | OTHER_CHAPTER HIS-22 (per the map note; the 1917 presidency is outside 1885-1905) |
| WBCS-EXE-PRELIMS-2015-PRELIMS-Q113 (same) | OTHER_CHAPTER HIS-22 |
| WBCS-EXE-PRELIMS-2019-PRELIMS-Q64 (same) | OTHER_CHAPTER HIS-22 |
| WBCS-EXE-PRELIMS-2015-PRELIMS-Q78 (Mayo murdered in Andamans) | OTHER_CHAPTER HIS-27 (no fetched page states the murder) |
| WBCS-EXE-PRELIMS-2017-PRELIMS-Q95 (Younghusband mission, Curzon) | OTHER_CHAPTER HIS-27. Hint for that pass: e-PG "India under British Crown", sec. 8, says Curzon "sent a mission to Lhasa under Sir Francis Younghusband and concluded a treaty in 1904" |
| WBCS-EXE-PRELIMS-2016-PRELIMS-Q107 (Shom Prakash, Vidyasagar) | OTHER_CHAPTER HIS-20 (not searched in sources) |
| WBCS-EXE-PRELIMS-2023-PRELIMS-Q27 (first newspaper in India) | OTHER_CHAPTER HIS-20 (not searched in sources) |

Totals: TAUGHT 8, STILL_UNTAUGHT 6, OTHER_CHAPTER 8, KEY_CONFLICT 0.

## Source disagreements and notes

1. **1886 merger (Q42).** IGNOU Unit 4 says the Indian National Conference "merged with the Indian National Congress in 1886", matching the key.
   e-PG ch. 34 reads: "In 1885, the Indian National Congress was established in Bombay; the Indian National Conference merged into it", with no separate year. Taught 1886 and disclosed in a `deep` paragraph.
   Option D of the PYQ is "All of the above"; no fetched page supports "Naoroji presided in 1886" or "Rajendralal Mitra chaired the reception committee", so I could not check whether D is also defensible. The key (merger) is untouched and taught.
2. **Age of Consent Bill year.** IGNOU Unit 5 (MA) says "1890 Age of Consent Bill" (girls' age ten to twelve); IGNOU Unit 10 (BA) says Tilak quarrelled with reformers over it "in 1891". Both quoted (c175, c174) and disclosed in an `exam_note`; the question asks only who opposed it.
3. **Hume "founder".** Existing NCERT/WBBSE claims (c12, c26, c64) call Hume a participant/"leading role"; IGNOU (c169) gives him "the credit for organizing the first meeting". Handled in the existing `dont_confuse` box with both wordings; q60 added.
4. **Safety valve.** IGNOU says the term is Hume's own expression and then reports that historians now reject the conspiracy reading (c165, c166, c186-c188). Taught as the origin of the term, not as the truth about the Congress's founding.
5. IGNOU Unit 2 is the only fetched page with the "grand old man of India" wording and gives no reason for the title; the exam_note attributes the wording to IGNOU.

## New claims (25): c164-c188
c164 PSS 1870 (s7); c165-c166 safety valve and Dufferin papers (s7); c167-c168 Second National Conference / 1886 merger (s7);
c169 Hume credit (s7); c170-c171 Calcutta 1886 delegates and annual rule (s8); c172-c173 British Committee 1889 / *India* 1890 (s8);
c174 Age of Consent 1891 (s8); c175-c177 Age of Consent 1890, Tilak, Ranade (s9); c178 Ganpati 1893 (s8); c179 Ganapati 1893 (s11, NIOS L20);
c180 New Lamps for Old (s8); c181 Shivaji festival 15 Apr 1896 (s8); c182 Shivaji 1896 (s9); c183 Naoroji grand old man (s10);
c184-c185 new-breed leaders (s12, NIOS L21); c186-c188 Bonerjee statement, conspiracy outlet, historians' view (s7).

## New questions (13): q48-q60
q48 Grand Old Man (basic); q49 PSS 1870 (moderate); q50 safety valve statements (exam); q51 conference merger year (difficult);
q52 1886 annual-session decision (moderate); q53 434 delegates (moderate); q54 British Committee organ (difficult);
q55 Age of Consent opposer (moderate); q56 Ganapati/Shivaji/New Lamps statements (exam); q57 gap between the festivals (moderate);
q58 New Lamps author (moderate); q59 Ganapati year (basic); q60 Hume organizing credit (moderate). All Bengali, each cites claim ids; all 60 stems distinct.

## Also changed (text only, in the copy)
Sections `associations`, `founding`, `moderates`, `economic_nationalism`, `extremists` got new woven paragraphs and claim ids;
exam_notes on the PSS year and on Drain of Wealth / Grand Old Man rewritten; `founding` deep note on safety valve and the word "Congress" rewritten;
two boxes added to `extremists`, one to `moderates`; timeline rows 1870, 1886, 1893, 1893-94, 1896 and three exam_focus points added.
