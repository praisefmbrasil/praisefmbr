import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from './registerSW';

// Inicializa o Service Worker para suporte a PWA (Modo Offline e Instalação)
registerSW();

// Seleção do elemento root com tratamento de erro
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Erro fatal: O elemento 'root' não foi encontrado no DOM.");
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
        <App />
          </React.StrictMode>
          );