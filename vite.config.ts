import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Praise FM Brasil',
        short_name: 'Praise FM',
        description: 'A rádio que toca a sua vida',
        theme_color: '#ff6600',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/',
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})