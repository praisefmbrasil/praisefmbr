import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importação do export default do App.tsx
import './index.css';

// Registro do PWA
// Se houver erro de tipos no VS Code, certifique-se que o vite-plugin-pwa está no package.json
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);