/* Tabula Latina — Latin flashcards for the family.
 *
 * Lineage: word list = the family's 592-meaning list from kana-flashcards
 * (same meanings, classical Latin), plus homeschool/phrases/chants decks.
 * Scheduling = fsrs.js (copied verbatim from kana-flashcards, FSRS-5).
 * Storage = localStorage, per profile:
 *   latina_meta_v1                 -> {active, profiles:[{id,name,dir}]}
 *   latina_deck_v1:<profileId>     -> {cardId:{S,D,reps,lapses,last,due,state}}
 * dir: 'en2la' (see English, recall Latin — default, matches kana app
 * sound→character production direction) or 'la2en' (recognition).
 * Data: window.CARDS from data.js — [{id,en,la,gram,deck,neo?,note?}].
 */
(function(){
  'use strict';
  const $ = sel => document.querySelector(sel);
  const app = $('#app');
  const CARDS = window.CARDS || [];
  const DECKS = [
    {key:'core',       name:'Core Words',          blurb:'The family 592 — same list as the Japanese app'},
    {key:'homeschool', name:'Homeschool Latin',    blurb:'Henle & CC-style classical vocabulary'},
    {key:'phrases',    name:'Phrases & Mottos',    blurb:'carpe diem and friends'},
    {key:'chants',     name:'Chants',              blurb:'Declension & conjugation endings, CC-style'},
  ];
  const NEW_PER_SESSION = 15;
  const META_KEY = 'latina_meta_v1';

  /* ---------- storage ---------- */
  function loadMeta(){
    try{ return JSON.parse(localStorage.getItem(META_KEY)) || {active:null,profiles:[]}; }
    catch(e){ return {active:null,profiles:[]}; }
  }
  function saveMeta(m){ localStorage.setItem(META_KEY, JSON.stringify(m)); }
  const deckKey = pid => 'latina_deck_v1:'+pid;
  function loadDeck(pid){
    try{ return JSON.parse(localStorage.getItem(deckKey(pid))) || {}; }
    catch(e){ return {}; }
  }
  function saveDeck(pid,d){ localStorage.setItem(deckKey(pid), JSON.stringify(d)); }

  let meta = loadMeta();
  const activeProfile = () => meta.profiles.find(p=>p.id===meta.active) || null;

  /* ---------- queue building ---------- */
  function cardsOf(deck){ return CARDS.filter(c=>c.deck===deck); }
  function buildQueue(deck, state, now){
    const cs = cardsOf(deck);
    const due = cs.filter(c => state[c.id] && state[c.id].due <= now)
                  .sort((a,b)=>state[a.id].due-state[b.id].due);
    const fresh = cs.filter(c => !state[c.id]).slice(0, NEW_PER_SESSION);
    return due.concat(fresh);
  }
  function counts(deck, state, now){
    const cs = cardsOf(deck);
    let due=0, seen=0;
    cs.forEach(c=>{ if(state[c.id]){ seen++; if(state[c.id].due<=now) due++; } });
    return {due, fresh: Math.min(cs.length-seen, NEW_PER_SESSION), seen, total: cs.length};
  }

  /* ---------- speech (approximate — Latin via Italian phonology) ---------- */
  function speak(la){
    if(!('speechSynthesis' in window)) return;
    const plain = la.replace(/,.*$/,'').replace(/\(.*?\)/g,'')
      .replace(/[āĀ]/g,'a').replace(/[ēĒ]/g,'e').replace(/[īĪ]/g,'i')
      .replace(/[ōŌ]/g,'o').replace(/[ūŪ]/g,'u').replace(/[ȳ]/g,'y');
    const u = new SpeechSynthesisUtterance(plain);
    const vs = speechSynthesis.getVoices();
    u.voice = vs.find(v=>/^la/i.test(v.lang)) || vs.find(v=>/^it/i.test(v.lang)) || null;
    u.rate = 0.85;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }

  /* ---------- rendering ---------- */
  function h(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content; }
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  function renderHome(){
    const now = Date.now();
    const p = activeProfile();
    app.replaceChildren(h(`
      <div class="eyebrow">discipulī et discipulae</div>
      <h1 class="brand serif">Tabula Lat<span class="macron">ī</span>na</h1>
      <p class="sub">Latin flip cards — the family word list, in the language of Rome.</p>
      <div class="stack">
        <div class="row" id="profiles"></div>
        ${p ? `
        <div class="row" role="group" aria-label="direction">
          <span class="eyebrow">Direction</span>
          <button class="chip ${p.dir!=='la2en'?'active':''}" data-dir="en2la">English → Latin</button>
          <button class="chip ${p.dir==='la2en'?'active':''}" data-dir="la2en">Latin → English</button>
        </div>
        <div class="stack" id="decks"></div>
        <div class="row"><button id="browseBtn">Browse all words</button></div>
        <p class="hint">Cards you grade come back on a smart schedule (same engine as the kana app). New words arrive ${NEW_PER_SESSION} per deck per visit.</p>
        ` : `<p class="hint">Add a name to start — each learner gets their own schedule.</p>`}
      </div>`));

    const prof = $('#profiles');
    meta.profiles.forEach(pr=>{
      const b=document.createElement('button');
      b.className='chip'+(pr.id===meta.active?' active':''); b.textContent=pr.name;
      b.onclick=()=>{ meta.active=pr.id; saveMeta(meta); renderHome(); };
      prof.appendChild(b);
    });
    const add=document.createElement('button');
    add.className='chip'; add.textContent='+ add learner';
    add.onclick=()=>{
      const name=prompt('Learner name (e.g. Emma):'); if(!name) return;
      const id='p'+Math.random().toString(36).slice(2,9);
      meta.profiles.push({id,name:name.trim(),dir:'en2la'}); meta.active=id; saveMeta(meta); renderHome();
    };
    prof.appendChild(add);

    if(!p) return;
    app.querySelectorAll('[data-dir]').forEach(b=>{
      b.onclick=()=>{ p.dir=b.dataset.dir; saveMeta(meta); renderHome(); };
    });
    const state = loadDeck(p.id);
    const decksEl = $('#decks');
    DECKS.forEach(d=>{
      const c = counts(d.key, state, now);
      const n = c.due + c.fresh;
      const btn=document.createElement('button');
      btn.className='deck';
      btn.innerHTML = `<span><b class="serif">${esc(d.name)}</b><small>${esc(d.blurb)} · <span class="stat">${c.seen}/${c.total}</span> started</small></span>
                       <span class="due-pill ${n?'':'zero'}">${n?n+' to study':'done for now'}</span>`;
      btn.onclick=()=>renderStudy(d.key);
      decksEl.appendChild(btn);
    });
    $('#browseBtn').onclick=renderBrowse;
  }

  function renderStudy(deck){
    const p = activeProfile(); if(!p) return renderHome();
    const state = loadDeck(p.id);
    const queue = buildQueue(deck, state, Date.now());
    const total = queue.length;
    const deckName = DECKS.find(d=>d.key===deck).name;
    if(!total){ renderHome(); return; }
    let idx = 0, again = [];

    function current(){ return queue[idx] || again[idx - queue.length]; }
    function remainingCount(){ return queue.length + again.length - idx; }

    function show(){
      const c = current();
      if(!c){ renderDone(deckName, total); return; }
      const isChant = c.gram === 'chant';
      const front = p.dir==='la2en' && !isChant ? c.la : c.en;
      const frontCls = p.dir==='la2en' && !isChant ? 'latin serif' : 'serif';
      app.replaceChildren(h(`
        <div class="topbar">
          <button id="back">‹ ${esc(deckName)}</button>
          <div class="progress" aria-hidden="true"><i style="width:${Math.max(0,Math.round(100*(total-remainingCount())/total))}%"></i></div>
          <span class="hint stat">${remainingCount()} left</span>
        </div>
        <div class="tabula" id="card" role="button" tabindex="0" aria-label="flip card">
          <div class="eyebrow">${isChant?'chant it':(p.dir==='la2en'?'what does it mean?':'say it in Latin')}</div>
          <div class="word ${frontCls}">${esc(front)}</div>
          <div class="hint" id="fliphint">tap to flip</div>
          <div id="answer" hidden></div>
        </div>
        <div class="grades" id="grades" hidden>
          <button class="bad">Bad<small>show again soon</small></button>
          <button class="okay">Okay<small>short wait</small></button>
          <button class="good">Good<small>longer wait</small></button>
        </div>`));
      $('#back').onclick=renderHome;
      const card=$('#card');
      function flip(){
        const ans=$('#answer');
        if(!ans.hidden) return;
        const backTxt = p.dir==='la2en' && !isChant ? c.en : c.la;
        const backCls = p.dir==='la2en' && !isChant ? '' : 'latin';
        ans.innerHTML = `
          <div class="word serif ${backCls}">${esc(backTxt)}</div>
          <div class="gram">${esc(c.gram)}${c.neo?' <span class="neo-badge">neo-Latin</span>':''}</div>
          ${c.note?`<div class="note">${esc(c.note)}</div>`:''}
          <button class="speak" aria-label="pronounce">🔊 pronounce</button>`;
        ans.hidden=false; $('#fliphint').hidden=true; $('#grades').hidden=false;
        ans.querySelector('.speak').onclick=(e)=>{ e.stopPropagation(); speak(c.la); };
      }
      card.onclick=flip;
      card.onkeydown=e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); flip(); } };
      $('#grades').querySelectorAll('button').forEach((b,gi)=>{
        b.onclick=()=>{
          const G = gi+1; // 1 bad, 2 okay, 3 good
          const upd = FSRS.schedule(state[c.id]||{state:'new'}, G, Date.now());
          state[c.id]=upd; saveDeck(p.id, state);
          if(G===1) again.push(c);
          idx++; show();
        };
      });
    }
    show();
  }

  function renderDone(deckName, n){
    app.replaceChildren(h(`
      <div class="tabula" style="cursor:default">
        <div class="eyebrow">bene factum!</div>
        <div class="word serif">Well done — ${n} card${n===1?'':'s'}.</div>
        <div class="note">${esc(deckName)} is clear for now. The schedule will bring words back right before you'd forget them.</div>
      </div>
      <div class="row" style="margin-top:14px;justify-content:center"><button class="primary" id="home">Back to decks</button></div>`));
    $('#home').onclick=renderHome;
  }

  function renderBrowse(){
    app.replaceChildren(h(`
      <div class="topbar"><button id="back">‹ Decks</button><span class="eyebrow">all ${CARDS.length} cards</span></div>
      <input type="text" id="q" placeholder="Search English or Latin…" aria-label="search">
      <div id="list" style="margin-top:10px"></div>`));
    $('#back').onclick=renderHome;
    const list=$('#list');
    function paint(q){
      q=(q||'').toLowerCase();
      const rows = CARDS.filter(c=>!q || c.en.toLowerCase().includes(q) ||
        c.la.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').includes(q) ||
        c.la.toLowerCase().includes(q)).slice(0,200);
      list.innerHTML = rows.map(c=>`
        <div class="browse-item">
          <span><span class="la serif">${esc(c.la)}</span> — ${esc(c.en)}</span>
          <span class="meta">${esc(c.gram)}${c.neo?' · neo':''}</span>
        </div>`).join('') || '<p class="hint">No matches.</p>';
    }
    paint('');
    $('#q').oninput=e=>paint(e.target.value);
  }

  renderHome();
})();
