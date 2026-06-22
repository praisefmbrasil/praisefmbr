const CACHE_NAME = "praise-fm-usa-v3";

// Apenas assets seguros
const STATIC_ASSETS = [
  "/favicon.ico",
  "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
  "https://res.cloudinary.com/dtecypmsh/image/upload/v1766869698/SVGUSA_lduiui.webp",
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ❌ Nunca interceptar stream
  if (url.hostname.includes("zeno.fm")) {
    return;
  }

  // 🧭 Navegação SPA → SEMPRE rede
  if (request.mode === "navigate") {
    event.respondWith(fetch(request));
    return;
  }

  // 🖼️ Imagens → cache-first
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, clone);
              });
            }
            return response;
          })
        );
      })
    );
    return;
  }

  // 📦 Outros assets → network-first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.method === "GET") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
