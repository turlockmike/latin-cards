# Tabula Latina — Latin flashcards for the family

Offline flip-card web app for classical Latin, built 2026-08-17 on Mike's ask:
*"a version of the japanese app but for latin words. same list ideally plus any
words someone studying classical latin in homeschool might want to know."*

**Live:** https://turlockmike.github.io/latin-cards/ (GitHub Pages, repo
`turlockmike/latin-cards` — same deploy shape as kana-cards; installable PWA,
offline after first visit). Artifact mirror:
https://claude.ai/code/artifact/6d36d401-c346-484b-a22d-6a7c2579a0d7

## Lineage (why this app looks the way it does)

- **Word list** = the family's 592-meaning list from `../kana-flashcards/data/words.json`
  ("same list"): each English gloss rendered in classical Latin, aligned 1:1 in order
  (test-enforced). Modern items with no ancient word (laptop, bus, coffee…) use
  living-Latin coinages tagged with a **neo-Latin** badge, so the classical core stays honest.
- **Scheduler** = `fsrs.js` copied verbatim from kana-flashcards (FSRS-5, Bad/Okay/Good).
- **Homeschool decks** (the "plus" in Mike's ask; family is applying to Classical
  Conversations per the 2026-08-17 inbox): Henle/CC-style vocabulary (73), phrases &
  mottos (20), and paradigm chants — declension/conjugation endings (14).

## Decks

| deck | cards | what |
|---|---|---|
| core | 592 | the family list in Latin, citation forms + macrons + etymology notes |
| homeschool | 73 | Henle-1/CC vocab: porta, nauta, bellum, amō, sum, prepositions… |
| phrases | 20 | carpe diem, ē plūribus ūnum, vēnī vīdī vīcī… |
| chants | 14 | 1st/2nd/3rd declension endings, present/imperfect/future, sum |

## Files

- `build_words.py` — authors `data/words.json`; **oracle**: every gloss in the
  kana list covered exactly once (duplicates consumed positionally) or hard fail.
- `index.html` + `app.js` + `fsrs.js` — the app (fetch-free; data via `data.js`).
- `build_artifact.py` — emits `data.js` + single-file `dist/latin-cards.html`.
- `test.js` — `node test.js`: data/FSRS/dist oracles (list alignment, macron
  coverage, neo tags, schedule monotonicity, no external src, <16MB).

## Change workflow

Edit `build_words.py` (words) or `app.js` (behavior) →
`python3 build_artifact.py && node test.js` → headless smoke (playwright, see
journal 2026-08-17) → republish `dist/latin-cards.html` to the SAME artifact URL.

## Design

"Tabula cerata" identity: Tyrian purple on marble (light) / wax-tablet dark;
Latin set large in Palatino-family serif with macrons (macrons are load-bearing
for homeschool Latin — never strip them from `la` fields). Speech button
approximates pronunciation via Italian voice when available — labeled approximate.
