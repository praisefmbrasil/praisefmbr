// Service Worker - Praise FM Brasil
// Versão com cache offline para assets estáticos

const CACHE_NAME = 'praisefm-brasil-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206554/LOGOBRASL_aigm87.webp',
  'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769206553/LOGO_HEADER_uygoqx.webp'
];

// Instalação: armazena assets no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação: remove caches antigos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cache_names.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: usa cache quando possível, senão busca na rede
self.addEventListener('fetch', (event) => {
  // Não faz cache de streams de áudio ou APIs dinâmicas
  if (
    event.request.url.includes('zeno.fm') ||
    event.request.destination === 'audio' ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se disponível
        if (response) {
          return response;
        }
        // Senão, busca na rede
        return fetch(event.request).then((networkResponse) => {
          // Clona a resposta para salvar no cache
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
          }
          return networkResponse;
        });
      })
  );
});