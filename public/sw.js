// public/sw.js
const CACHE_NAME = 'praise-fm-v2';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ⚠️ NÃO intercepta tudo
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // ❌ Nunca cachear streaming ou APIs
  if (
    url.origin !== location.origin ||
    url.pathname.endsWith('.mp3') ||
    url.pathname.includes('stream')
  ) {
    return;
  }

  // ✅ Cache apenas assets locais
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          })
        );
      })
    )
  );
});
