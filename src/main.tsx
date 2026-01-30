import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais e Tailwind
import App from './App';
import { registerSW } from './registerSW'; // Suporte para PWA

// Registra o Service Worker para permitir funcionamento offline e instalação
registerSW();

// Captura o elemento root com tratamento de erro básico
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Elemento root não encontrado no arquivo HTML.");
}

// Inicialização do React 18
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* O App já gerencia o AuthProvider, Router e as rotas da Praise FM Brasil */}
    <App />
  </React.StrictMode>
);