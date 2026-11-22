# Batch 3 sidecars: wrong-option notes and reverse questions (2026-11-21)

Files: notes_bengali_authors.json, notes_indian_authors.json, notes_chemical_symbols.json, reverse_questions.json.
The three .jsonl files were not edited.

## Task A: notes (DIRECT and PAIRS questions only; 3 slots per question)
| file | questions covered | notes written | null |
|---|---|---|---|
| bengali_authors | 33 | 86 | 13 |
| indian_authors | 21 | 37 | 26 |
| chemical_symbols | 21 | 61 | 2 |
| total | 75 | 184 | 41 |

Every written note has a "_support" entry "<code>#<qi>#<wi>" -> supporting fact code. Two entries list two codes
separated by a comma because the claim joins two facts (GK-WBG-241,GK-WBG-243 for Matilal -> Alaler Gharer Dulal -> Peary Chand Mitra;
GK-SCI-125,GK-SCI-127 for N/Ni/Ne vs natrium -> Na).

Null slots and why (no quote in the three files or the library says what the option really is):
- Bengali: Bhudev Mukhopadhyay (WBG-244#0#1, 254#0#1), Sukumar Ray (247#0#0, 252#0#1), Ishwar Chandra Vidyasagar (256#0#1),
  Sukanta Bhattacharya and Sudhindranath Dutta (258#0#1-2), Hemendra Kumar Roy and Nihar Ranjan Gupta (260#0#0, #2),
  K.K. Raina, Sabyasachi Chakrabarty, Abir Chatterjee (260#1, whole question), years 1872/1873 (254#1#1).
- Indian: authors/books not quoted anywhere: C. Rajagopalachari, Sumitranandan Pant, Bhawani Prasad Mishra, Kala aur Burha Chand,
  Him-Tarangini, Jan Nisar Akhtar, Arshi, Imtiaz Ali, Madhya Asia Ka Itihas, Amritlal Nagar, Bhagwaticharan Verma, Jainendra Kumar,
  Bhoole Bisre Chitra, Mulk Raj Anand, Bhabani Bhattacharya, Taoos Chaman Ki Maina, Badd-E-Saba Ka Intizar, Wadda Vela,
  Mere Sainya Jio, Anita Desai, Jhumpa Lahiri, Vikram Seth (SGK-243#0#0, 244#0#2).
- Chemistry: SCI-123#0#2 ("As a subscript number": no quote on subscripts); SCI-128#0#2 ("Antimony" for hydrargyrum, see issue 1).
- For place, year and profession distractors (WBG-244#1, WBG-246#1) the note restates the quoted fact with the distractor named
  ("satirises Kolkata, not Dhaka"; "MBBS 1928, so a physician, not a lawyer"). Drop these if you want only positive identifications.

## Task B: reverse DIRECT questions (25)
| file | reverse questions |
|---|---|
| bengali_authors | 10 (Byomkesh creator->character, Ghanada, Tenida story, Pather Panchali first novel, Agni-Bina, pen names Hutom, Birbal, Banaphul, Parashuram, Chitra Gupta) |
| indian_authors | 6 (Agyeya, Dinkar, Kalki pen names; Midnight's Children, The God of Small Things, The Inheritance of Loss author) |
| chemical_symbols | 9 ("Which element has the symbol" K, P, Fe, Pb, Hg, Au, Sn, W, Cu) |

Format of reverse_questions.json: [{ code, question{format,d,q,a,w,e,wn}, wn_support[3], support }]. `wn` is [[en,bn] x 3] aligned with `w`;
`wn_support` is the supporting fact code per wrong option. All stems checked by script: no duplicate of any stem in db/gk/*.jsonl,
the b3 files or scripts/generators/factbank/*.js; 4 distinct options in en and bn.
Not drafted: Feluda reverse (existing factbank stem asks the forward direction only, but I chose Byomkesh/Ghanada first), Na (existing
"The symbol Na stands for" is already the reverse), Ag, Sb (see issue 1), Kuvempu/Firaq/Jigar/Tekchand (already two-way).

## Issues found in the existing drafts (for the owner, not fixed)
1. Antimony is not supported by any quote. GK-SCI-128 Q1 ("Stibium is the name behind the symbol of which element?" -> Antimony)
   and the statements of SCI-120/121/128 name antimony, but the sources[].quote lines say only "The element symbol Sb derives from
   the name stibium." No quote gives "Sb = antimony". Add a source quote (for example a Z/symbol/name table row "51 Sb antimony")
   or this answer is unverifiable from the file. I therefore dropped the Sb reverse question and left the Antimony note null.
2. GK-WBG-242 quotes S13/S14/S17 name the author only in the page title (Banglapedia "Bandyopadhyay, Tarashankar", etc.). The notes
   that rely on them (Tarashankar, Manik, Jibanananda, Bibhutibhushan) are supported by title plus quote together.
3. Matilal -> Peary Chand Mitra rests on two separate quotes (Banglapedia page on Alaler Gharer Dulal says Matilal is its character;
   a different quote says the book is by Peary Chand Mitra). Both are in the files.
