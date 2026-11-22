# Presidents of India batch (drafts/b4/presidents.jsonl), 2026-11-21

Counts: 14 records (1 topic pack GK-POL-120, order 15, 15-row table, plus 13 single facts GK-POL-121..133), 26 questions.
Formats: DIRECT 18, PAIRS 2, CHRONOLOGY 3, STATEMENT 2, MATCH 1 (pack). `wn` notes only where the wrong option has a quote in the same fact.
Validator: parse errors [], draft errors [], combined-library errors [] (run 2026-11-21). No stem repeats an existing stem.

## Sources actually fetched
- presidentofindia.gov.in `/former-presidents` (ordinal list) and 14 pages `/former-president/<slug>` (text sentence plus "Term of Office" field)
- presidentofindia.gov.in `/Profile` and `/president-india-smt-droupadi-murmu` (current President)
- pib.gov.in PRID 1843925 (Election Commission, Murmu elected), 1844263 (MHA, oath ceremony)
- Not used: PRID 1843621 and 1843627 (tweets by the PM and Home Minister; they say "tribal community" but not "first").

## Dropped claims (could not be sourced with a quote naming the person AND the claim)
| Claim | Why dropped |
|---|---|
| Rajendra Prasad is the only President elected twice | Official page says only "first President of India from 1950 to 1962". No fetched official page says re-elected or "only". |
| Zakir Husain first Muslim President | Not on his page or any fetched official page. |
| K. R. Narayanan first Dalit President | Not on his page. (Page only says VP 1992-97 and President 1997-2002.) |
| Droupadi Murmu first tribal / first Scheduled Tribe President | Profile says only "born ... to a Santhal tribal family" and "first tribal woman Governor of a State with a significant tribal population". PM tweet says "hailing from a tribal community" without "first". Her own swearing-in address says "I belong to tribal society" (first-person, name only in page title), so not used. I kept only the Santhal fact. |
| N. Sanjiva Reddy elected unopposed | No fetched official page says it. ECI site (eci.gov.in) is a JavaScript app and returned nothing readable; rajyasabha.nic.in did not connect. Kept the sourced "two-time Speaker of the Lok Sabha" fact instead. |
| Fakhruddin Ali Ahmed died in office | His page gives life dates (1905-11 Feb 1977) and term 1974-77 with end date 11 Feb 1977, but never says he died in office. That would be an inference from two fields. Only his term dates are used. |
| Zakir Husain was also Vice-President | His page does not say so (Giri's page gives Giri as 3rd VP 13 May 1967 to 3 May 1969). |
| Full list of VPs who became President | Only Radhakrishnan (1st VP), Giri (3rd VP) and Narayanan (9th VP) are stated on the pages. Venkataraman and Sharma pages do not mention the VP post. The pack lists only these three. |
| Acting Presidents (V. V. Giri 1969, M. Hidayatullah 1969, B. D. Jatti 1977) | No official page found. Supreme Court profile of Hidayatullah (sci.gov.in) has no mention of acting President. rajyasabha.nic.in unreachable. Giri's page does not mention being acting President. |
| "First President born in independent India" (Murmu) | Only in her speech in the first person (PIB 1844557), no named quote. |
| Zail Singh as "first Dalit" style claims | Page says "first person from a backward caste". Kept that wording in the explanation; not equated with Dalit. |
| Events during each President's term | Skipped as instructed. |
| WhatsApp "died in office" pair | Only Zakir Husain is stated on an official page; Fakhruddin is not (see above). Treat that part of the post as unconfirmed. |

## Source disagreements
- V. V. Giri start: page text says President "from 24 August 1969 to 24 August 1974"; the Term of Office field says 05/03/1969 (3 May 1969, the day his Vice-Presidency ended and Zakir Husain died). The table uses 24 August 1969. The box quote is included as a source in GK-POL-123 and the conflict is explained in the text.
- Pranab Mukherjee: Term of Office field starts 07/05/2012 (5 July 2012), but Pratibha Patil's page ends on 25 July 2012, and the text only says "from 2012 until 2017". The table shows "July 2012 to 25 July 2017" and no question asks his start day. The same page's text calls him the "12th president" while the former-presidents list and the page's own number field say 13th; the pack uses 13th and says so in GK-POL-131.
- Droupadi Murmu "present" end: no end date; she is shown as current because the official site's page title and press releases dated up to 27 Oct 2026 name her as President. Pack and GK-POL-132 are CHANGING with review_by 2027-04-30.
- Shankar Dayal Sharma's page spells the name "Shanker"; Bengali uses শঙ্কর দয়াল শর্মা.

## Notes for the independent checker
- The "Term of Office" source entries (field on the page) do not contain the person's name in the quote. The name sentence is the adjacent source entry for the same URL.
- Ordinals (1st..14th) come from the former-presidents list quote in GK-POL-120 / 129 / 131; other facts state ordinals in the explanation from the page sentence ("fourth", "fifth", ...). Murmu's 15th comes from the Profile page.
- Existing stems GK-IGK-010 (first President) and GK-IGK-013 (first woman President) were not repeated; Zail Singh and Giri are asked both ways, Patil is asked as "which first" and by term years.
- Pages were fetched with curl (WebFetch gets 403 from presidentofindia.gov.in); saved copies are in the session scratchpad only.
