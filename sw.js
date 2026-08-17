/* Offline-first service worker — same cache-first pattern as kana-cards.
 * App shell cached at install; works with no network after first visit. */
const CACHE='latina-v1';
const ASSETS=['./','./index.html','./fsrs.js','./data.js','./app.js',
              './manifest.json','./icon.svg'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(new URL(e.request.url).origin!==self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit=> hit || fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return res;
    }).catch(()=>hit))
  );
});
