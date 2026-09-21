# Latin core-deck spot-check — 2026-09-21

**Sample:** n=40 of the 592 core cards, `random.Random(20260921).sample(core, 40)` (core = `deck=='core'` in `data/words.json`).
**Oracle:** English Wiktionary Latin entries via the MediaWiki API (cites Lewis & Short / Gaffiot) — an external dictionary, NOT my weights.
**Result (n=40):** WRONG = **0** · gloss-QUESTIONABLE = **2** (both fixed: victima sense note, chartula neo-flag) · macron-uncertain = **2** (ūncia — Wiktionary itself unsure; vendō — Wiktionary says vēndō, deck has short; left unchanged, single-source) · OK = 38.
**Deck-wide estimate (NOT verified — a 40/592 sample):** 0 WRONG in 40 → ≈95% upper bound on the wrong-gloss rate ≈ 7.5% (rule of three); sense-ambiguity flags 2/40 (5%) → expect ~30 ambiguous-English-gloss cards deck-wide (estimate, wide interval). Below the ≥4-WRONG widen threshold; the 552 unsampled cards remain "authored from weights", not dictionary-verified.
**Usage context:** GitHub Pages traffic API showed 0 views/0 uniques for 2026-09-07..09-20; family-latin is STOPPED (kids not interested, 2026-06-29) → work capped at this sample by design.

| id | English | Latin (deck) | Gloss verdict | Macron | Dictionary evidence |
|---|---|---|---|---|---|
| c247 | mouth | ōs, ōris | OK | ok | Wiktionary ōs n3 ōris "mouth" (Etym.1; ossis = bone is Etym.2) |
| c037 | bird | avis, -is | OK | ok | Wiktionary avis f3 "a bird" |
| c195 | inch | ūncia, -ae | OK | ? | Wiktionary ūncia: "(historical) inch, 1/12 of a foot"; vowel length of u UNCERTAIN per Wiktionary (ū̆ncia) — deck keeps ū (Bennett 1907) |
| c079 | club | sodālitās, -ātis | OK | ok | Wiktionary sodālitās f3 "an association, club, society" |
| c046 | bottle | lagoena, -ae | OK | ok | Wiktionary lagoena f1 "narrow-necked vessel" (L&S: flask, bottle) |
| c161 | gold | aurum, -ī | OK | ok | Wiktionary aurum n2 "gold" |
| c388 | they | eī / eae / ea | OK | ok | Wiktionary is/ea/id demonstrative "he, she, it, they"; plural paradigm eī/eae/ea standard — lemma verified, plural table not separately fetched |
| c357 | soup | iūs, iūris | OK | ok | Wiktionary iūs n3 iūris "broth, soup" (homograph of iūs = law; deck note says so) |
| c192 | husband | marītus, -ī | OK | ok | Wiktionary marītus m2 "husband, married man" |
| c338 | silver | argentum, -ī | OK | ok | Wiktionary argentum n2 "silver" |
| c334 | shoes | calceī, -ōrum | OK | ok | Wiktionary calceus → calceī (nom. pl.) "shoe" |
| c072 | child | puer, puerī | OK | ok | Wiktionary puer m2 "a child; a boy" |
| c366 | shop | taberna, -ae | OK | ok | Wiktionary taberna f1 "shop, store" |
| c293 | poison | venēnum, -ī | OK | ok | Wiktionary venēnum n2 "poison, venom" |
| c071 | chicken | pullus, -ī | OK | ok | Wiktionary pullus m2 "a chick, chicken or any young fowl" (adult hen = gallīna; deck note "as in poultry") |
| c415 | victim | victima, -ae | QUESTIONABLE→fixed | ok | Wiktionary victima f1 "sacrificial victim" ONLY — English "victim" is ambiguous (crime victim). FIX: note added "sacrificial victim (the animal offered) — not a crime victim" |
| c578 | toe | digitus pedis | OK | ok | Wiktionary digitus m2 "a finger, toe" — phrase digitus pedis = toe standard |
| c203 | june | Iūnius, -ī | OK | ok | Wiktionary Iūnius (mensis Iūnius) June |
| c028 | bed | lectus, -ī | OK | ok | Wiktionary lectus m2 "bed" |
| c561 | to speak | loquor, loquī | OK | ok | Wiktionary loquor, loquī dep. "to speak" |
| c514 | to lock | obserō, obserāre | OK | ok | Wiktionary obserō, obserāre "to bar, bolt, shut up" (≈ lock) |
| c202 | july | Iūlius, -ī | OK | ok | Wiktionary Iūlius (mensis Iūlius) July |
| c434 | window | fenestra, -ae | OK | ok | Wiktionary fenestra f1 "window" |
| c292 | pocket | loculus, -ī | OK | ok | Wiktionary loculus m2 "purse, pocket" (also compartment/coffin) |
| c475 | earth | terra, -ae | OK | ok | Wiktionary terra f1 "earth, ground, land" |
| c549 | to sell | vendō, vendere | OK | ? | Wiktionary vēndō, vēndere "to sell" — Wiktionary marks ē LONG; deck has short vendō. Macron unresolved (single source) |
| c591 | orange | aurantius, -a, -um | OK | ok | Wiktionary aurantius "(New Latin) orange" — deck neo=1 correct |
| c521 | to mix | misceō, miscēre | OK | ok | Wiktionary misceō, miscēre "to mix" |
| c128 | expensive | cārus, -a, -um | OK | ok | Wiktionary cārus "dear; costly, expensive" |
| c035 | bill | ratiō, -ōnis | OK | ok | Wiktionary ratiō f3 "calculation, account, reckoning" (deck note: account/reckoning) |
| c444 | you | tū / vōs | OK | ok | Wiktionary tū "you (sg.)" / vōs "you all" |
| c057 | building | aedificium, -ī | OK | ok | Wiktionary aedificium n2 "building, edifice" |
| c272 | one | ūnus, -a, -um | OK | ok | Wiktionary ūnus, -a, -um "one" |
| c572 | thin | tenuis, -e | OK | ok | Wiktionary tenuis, -e "thin, slender" |
| c583 | to wash | lavō, lavāre | OK | ok | Wiktionary lavō, lavāre "to wash, bathe" |
| c505 | to laugh | rīdeō, rīdēre | OK | ok | Wiktionary rīdeō, rīdēre "to laugh" |
| c208 | knee | genū, -ūs | OK | ok | Wiktionary genū n4 "knee" |
| c187 | hotel | dēversōrium, -ī | OK | ok | Wiktionary dēversōrium n2 "inn, lodging house" (≈ hotel) |
| c174 | hat | petasus, -ī | OK | ok | Wiktionary petasus m2 "broad-brimmed travelling hat" |
| c063 | card | chartula, -ae | QUESTIONABLE→fixed | ok | Wiktionary chartula f1 "little paper; memorandum" — supports "small paper/note", NOT a modern card. FIX: neo=1 (shows neo-Latin badge) + note |
