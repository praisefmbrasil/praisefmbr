import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html' // Isso força o Vite a encontrar o arquivo na raiz
    }
  },
  server: {
    port: 3000
  }
});