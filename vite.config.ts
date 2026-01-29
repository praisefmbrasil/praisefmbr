import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite que o servidor seja acessado externamente no Codespaces
    port: 5173, // Define a porta padrão
    strictPort: true, // Garante que o Vite não tente mudar de porta se a 5173 estiver ocupada
    hmr: {
      clientPort: 443 // Necessário para o Hot Module Replacement funcionar via HTTPS no Codespaces
    }
  }
})