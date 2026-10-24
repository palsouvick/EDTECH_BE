# PYQ sources (official papers only)

Last checked 23 October 2026. Every imported question comes from a question paper and an
answer key that the commission itself publishes. Every answer is the one in the official key.
Questions that the key marks `*` (marks awarded to all candidates) were skipped.

## Imported

| File | Exam | Paper (official) | Answer key (official) | Key type | Imported |
|---|---|---|---|---|---|
| `wbcs-prelims-2022.json` | WBCS (Exe.) etc. Preliminary Examination, 2022 (Advt. 2/2022, held 19.06.2022), General Studies, **Test Booklet Series B** | https://psc.wb.gov.in/Download?param1=20240318164932_WBCS(PRELI)-2022.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202208041745_FinalWBCSKey22.pdf&param2=advertisement | **Final (revised)**, notice No. 396 CON(Q), 4 Aug 2022 | 190 of 200 |
| `wbpsc-clerkship-2023-session-1.json` | Clerkship (Part-I) Rectt. Examination, 2023, **Session I** (Advt. 13/2023, held 16.11.2024), English, GS & Arithmetic, **Test Booklet Series A** | https://psc.wb.gov.in/Download?param1=20241122165221_ClerkshipS-I.pdf&param2=PYQP | https://psc.wb.gov.in/Download?param1=202505191629_Session-I.pdf&param2=advertisement | **Final**, notice No. 725-PSC/CON(Q), 16 May 2025 | 93 of 100 |

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
| WBCS (Exe.) Prelims 2024 | No question paper on the PYQ page | Final key: `…202608271742_FINAL_ANSWER_KEY_WBCS_2024_PRELI.pdf` | Skipped: no official paper |
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
