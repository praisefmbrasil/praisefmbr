import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'favicon.ico'],
      manifest: {
        name: 'Praise FM Brasil',
        short_name: 'Praise FM',
        description: 'Praise FM Brasil – Rádio Cristã 24h',
        theme_color: '#ff6600',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'pt-BR',
        start_url: '/#/app',
        scope: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Opcional: se quiser usar cache offline no futuro
        // Por enquanto, mantém comportamento leve (como o USA)
        globPatterns: ['**/*.{js,css,html,png,svg,webp}']
      }
    })
  ],
  // Garante que assets públicos sejam servidos corretamente
  publicDir: 'public'
});