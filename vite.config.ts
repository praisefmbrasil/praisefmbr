import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Garante que os caminhos sejam relativos no build
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})