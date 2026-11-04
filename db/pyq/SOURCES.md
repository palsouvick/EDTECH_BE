# PYQ sources (official papers only)

Last checked 23 October 2026. Every imported question comes from a question paper and an
answer key that the commission itself publishes. Every answer is the one in the official key.
Questions that the key marks `*` (marks awarded to all candidates) were skipped.

## Imported

| File | Exam | Paper (official) | Answer key (official) | Key type | Imported |
|---|---|---|---|---|---|
| `wbcs-prelims-2022.json` | WBCS (Exe.) etc. Preliminary Examination, 2022 (Advt. 2/2022, held 19.06.2022), General Studies, **Test Booklet Series B** | https://psc.wb.gov.in/Download?param1=20240318164932_WBCS(PRELI)-2022.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202208041745_FinalWBCSKey22.pdf&param2=advertisement | **Final (revised)**, notice No. 396 CON(Q), 4 Aug 2022 | 190 of 200 |
| `wbpsc-clerkship-2023-session-1.json` | Clerkship (Part-I) Rectt. Examination, 2023, **Session I** (Advt. 13/2023, held 16.11.2024), English, GS & Arithmetic, **Test Booklet Series A** | https://psc.wb.gov.in/Download?param1=20241122165221_ClerkshipS-I.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202505191629_Session-I.pdf&param2=advertisement | **Final**, notice No. 725-PSC/CON(Q), 16 May 2025 | 93 of 100 |
| `wbcs-prelims-2024.json` | WBCS (Exe.) etc. Preliminary Examination, 2024 (Advt. 08/2024, held 14.06.2026), General Studies, **Test Booklet Series A** | https://psc.wb.gov.in/Download?param1=20260728155644_WBCS_P-2024-A_merged_1_compressed.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202608271742_FINAL_ANSWER_KEY_WBCS_2024_PRELI.pdf&param2=advertisement | **Final**, notice No. 1104-PSC(CON/Q), 27 Aug 2026 | 198 of 200 |
| `wbcs-prelims-2023.json` | WBCS (Exe.) etc. Preliminary Examination, 2023 (Advt. 01/2023, held 16.12.2023), **Test Booklet Series A** | **UNOFFICIAL compilation** of the booklet: https://files.wbcs.in/wbcs-2023-question-prelims.pdf (the Commission never published this paper — see the exception note below) | https://psc.wb.gov.in/Download?param1=202405281450_AnsWbcs2023.pdf&param2=advertisement | **Final**, notice No. 254-PSC/CON(Q), 24 May 2024 | 197 of 200 |

Both papers are listed on the WBPSC page "Previous Year Question Paper" (https://psc.wb.gov.in/previous_year_question_paper.jsp).
Both keys are listed under "What's New" (https://psc.wb.gov.in/whats_new.jsp).

### Notes on the imported papers

- **Scanned PDFs.** Both papers are image scans with no text layer. Questions were transcribed
  page by page from rendered images, and every question was cross-checked against the key
  letter for its booklet series. Each key letter was also checked to be a sensible answer, which
  confirms that the series matches (B for WBCS 2022, A for Clerkship 2023 Session I).
- **Question numbers** (`pyq.question_no`) follow the series used: WBCS Series B and Clerkship
  Series A. The Clerkship PDF contains all four series (A to D); Series A is pages 1-20.
- **WBCS 2022 cover.** The booklet cover is printed "2021", but the site lists it as "WBCS(PRELI)-2022".
  The key notice names the exam "W.B.C.S. (Exe.) etc. (Preliminary) Examination, 2022", dated 19.06.2022.
  The questions match the key exactly, so the paper is tagged as year 2022.
- **Bengali text.**
  - WBCS 2022 Q26-200 and Clerkship Q31-100 are printed bilingually, and the Bengali in the
    files is the official Bengali text from the paper.
  - The English-language sections are printed in English only: WBCS Q1-25 and Clerkship Q1-30.
    For these, the Bengali instruction line is **our translation**, and the English sentences and
    options are left in English, because they are English-language test items.
  - WBCS Q20 is an English-only GS question; its Bengali stem and options are **our translation**.
  - Clerkship Q19 is an English-only GS question; its Bengali stem and options are **our translation**.
- **Printed quirks kept as printed:**
  - WBCS Q68 prints "Loringa" (meaning Coringa); the explanation says so.
  - WBCS Q121 has the Bengali "সাবেক".
  - WBCS Q136 prints "Bisthi" (Vishti).
  - WBCS Q98 uses the old National Highway numbering; the explanation notes this.
  - For underlined words (WBCS Q13; Clerkship Q10, 14, 16, 18, 21, 23, 27), the underlined
    part is given in brackets after the sentence.
- **Explanations** (English and Bengali) are ours, written to agree with the official key.
- **Low-confidence explanation:** WBCS Q172 (Howrah's child sex ratio, Census 2011). The key
  answer is used, but we could not confirm the exact Census figures, so the explanation gives none.

### Notes on WBCS Prelims 2024 (Series A)

- The official paper PDF is a merged file of all four series; **Series A is PDF pages 1–43**
  (booklet pages A-1 to A-44 plus rough-work pages). Transcribed page by page from rendered
  images, like the earlier papers; every answer cross-checked against the final key's
  Series A column (machine-parsed from the key PDF and verified 200/200).
- The 2024 paper had appeared on the PYQ page after this file's 23 Oct 2026 check, which had
  recorded "no official paper" for it; it was imported in the 4 Nov 2026 pass.
- Q10 and Q192 were cancelled in the final key (`*`) and skipped. No time-sensitive skips
  were needed: the examination was held in June 2026, and dated current-affairs questions
  pinned to events inside the question were kept.
- A few statement/logic and classification items have no exact catalogue topic; they were
  mapped to the closest one (mostly `reasoning/analogy`, some `quant/number_system`,
  `reasoning/coding_decoding`). Printed quirks were kept as printed (e.g. "Anne Besant",
  "Versailles Conferrence", "Hundai"), and Q178's options (A) and (D) are near-duplicates
  in the printed paper itself.

### Notes on WBCS Prelims 2023 (Series A) — the documented exception

- WBPSC never published this question paper (the PYQ page lists no 2023 paper; checked
  4 Nov 2026). At the user's instruction (4 Nov 2026) the questions were imported from a
  web compilation of the Series A booklet (files.wbcs.in, linked from wbcs.in) instead.
  **Every answer was verified against the official final key** (notice No. 254-PSC/CON(Q),
  24 May 2024), machine-parsed from the official PDF and confirmed 200/200; the importer's
  host check carries a matching, narrow exception for this host that applies only when an
  official answer key is also cited.
- The compilation is a scan of a used booklet: it carries a faint "WBCS" watermark and a
  previous candidate's handwritten ticks, several of which disagree with the official key.
  All were ignored in favour of the key.
- Skipped: Q45 and Q105 (cancelled, `*` in the key) and Q74 (time-sensitive — an unpinned
  "highest yield of pulses per hectare" ranking that changes year to year).
- Flagged items where the key is debatable but was followed, with the explanation worded
  accordingly: Q122 (key records the post-Partition provinces as "East Bengal and Bengal"),
  Q126 (key: W₁ > W₂ for the flying bird in a wire cage), Q139 (key frames floating-body
  stability via centre of buoyancy vs centre of gravity), Q157 (key: Dr. Rajendra Prasad as
  first individual satyagrahi; Vinoba Bhave is not among the printed options), Q184 (the
  key's answer describes baking powder, though the question prints "Baking soda").

### Questions skipped

**WBCS Prelims 2022 (Series B)**

- Q29 and Q57 were cancelled in the key (`*`).
- Q32, 40, 49, 55, 78, 114, 178 and 188 are time-sensitive questions whose answers have
  since become wrong or misleading. Examples: "present Chairman of UPSC", "current Army Chief",
  "new CEC", "how many districts in WB", and "2026 CWG host city" (Victoria has since withdrawn).
- Other dated current-affairs questions that are pinned to 2022 in the question itself were kept,
  for example "As of 2022…", "…in May, 2022" and "Oscars, 2022".

**Clerkship 2023 Session I (Series A)**

- Q15 was cancelled in the key (`*`).
- Q50 (Renaissance art), Q84 (Sarangi musician), Q86 (FIFA founding year) and Q98
  ("causation") fit no catalogue topic.
- Q59 (livestock telemedicine guidelines) and Q65 (Bonn International badminton title) are
  recent current-affairs items. We could not write a reliable explanation for the key's answer.

## Found but not imported (official, usable in a later pass)

| Exam | Paper | Answer key | Status |
|---|---|---|---|
| Miscellaneous Services Rectt. Exam (Prelim) 2023, Advt. 11/2023, held 15.09.2024 (bilingual, Series A booklet) | https://psc.wb.gov.in/Download?param1=20250831234054_MISCELLANEOUS_SERVICES_RECRUITMENT_PRELI_EXM_2023_11_2023.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202503171627_Final_Ans_Key_Miscellaneous_Preli_2023.pdf&param2=advertisement (Final, 13.03.2025) | Scanned and legible; not imported this pass (kept to 2 papers for quality) |
| Clerkship (Part-I) 2023, Sessions II, III, IV | `…20241122165330_ClerkshipS-II.pdf`, `…20241122165426_Clerkship-III.pdf`, `…20241122165548_ClerkshipS-IV.pdf` (all `&param2=PYQP`) | Final: `…202505191630_Session-II.pdf`, `…202505191631_Session-III.pdf`, `…202505191632_Session-IV.pdf` (all `&param2=advertisement`) | Scanned; not imported this pass. Many questions repeat across sessions |
| — (imported; see the Imported table) WBCS (Exe.) Prelims 2023 | — | — | Imported 4 Nov 2026 under the user's exception, from the wbcs.in compilation, answers verified against the official final key |
| Miscellaneous Prelims 2024 | No question paper on the PYQ page | Provisional key only: `…202610051802_Provisional_AK_Miscellaneous_Preli_2024.pdf` | Skipped: no paper, and the key is provisional |
| Clerkship 2019 (FN/AN) and `CLERKSHIP_Q_compressed.pdf` | On the PYQ page | Not identified among the listed keys | Skipped: no matching official key found |
| WBCS Main 2023 | `…20250409145828_WBCS_Main_2023.pdf` | Keys for compulsory Papers III-VI are listed (`…ANSWERKEYOFCOMPULSORY(PAPER-III…VI)WBCS(MAIN)-2023.pdf`) | Not checked; Mains is outside the prelims-style catalogue for now |

The base URL for the shortened entries is `https://psc.wb.gov.in/Download?param1=`.

## Other commissions (not imported)

- **SSC (ssc.gov.in / ssc.nic.in).** Tentative keys are published together with each
  candidate's response sheet, behind the candidate login and only for a limited window. No public
  question-paper PDF was found, so nothing was imported (login-only). Example of an official
  notice: https://doc.ssc.nic.in/SecAudit/SSCFileServer/PortalManagement/UploadedFiles/Tentative_Answer_Keys_CGL-2020_T1_E_02092021.pdf
- **IBPS / SBI (ibps.in, sbi.co.in).** These do not publish question papers or answer keys
  publicly. Nothing was imported.
- **India Post (indiapost.gov.in).** GDS is merit-based (no written exam). Not searched further
  in this pass.
- Coaching and news sites (careers360, aglasem, amarujala, etc.) appeared in searches, but they
  were used only to locate official pages. No content was taken from them.
