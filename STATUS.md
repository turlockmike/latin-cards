# Latin Flashcards — Status

**Status:** SHIPPED v1 (2026-08-17)

Live: https://turlockmike.github.io/latin-cards/ (primary, GitHub Pages — Mike directive 2026-08-17 "like the other one") · artifact mirror 6d36d401

Verification state: list-alignment/data/FSRS/dist oracles green (`node test.js`);
headless playwright smoke green (profile → study → flip → grade → persist;
full-session exhaustion with Bad-recycles). Latin translations authored from
weights (strong stable domain). **Dictionary spot-check DONE 2026-09-21** (n=40 of 592 core,
seed 20260921, Wiktionary oracle; table in `SPOTCHECK-2026-09-21.md`): 0 WRONG, 2 sense-ambiguous
(fixed), 2 macron-uncertain (open). Sampled 40 = verified; the other 552 remain estimated-correct
(0/40 wrong → ≈7.5% upper bound on deck-wide wrong rate, an ESTIMATE). Structure is verified.

Closed loop: producer = build_words.py/build_artifact.py · consumer = family via
artifact link · drift detector = test.js (kana-list alignment assert breaks loudly
if the source list changes) · decay rule = if family-latin interest dies again
(see ../family-latin/STATUS.md history), mark STOPPED here, keep artifact live.

Backlog (only if the family actually uses it):
- Cloud sync via the kana-flashcards worker pattern (profiles follow devices)
- Widen dictionary check to all 592 core (n=40 done 2026-09-21: 0 wrong) — only if family usage appears (Pages traffic 0 views/14d)
- Audio recorded properly instead of speechSynthesis approximation
