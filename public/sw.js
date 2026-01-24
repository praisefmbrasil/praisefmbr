// Service Worker - Praise FM Brasil (clone do USA)
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Não faz cache — repassa tudo (igual ao original dos EUA)
  // Útil para streaming ao vivo e dados dinâmicos
});