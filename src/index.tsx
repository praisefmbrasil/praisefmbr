import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importante: Garante que o Tailwind e seus estilos customizados sejam carregados
import { AuthProvider } from './contexts/AuthContext'; // ✅ Importação adicionada

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root para montar a aplicação. Verifique seu index.html.");
}

const root = ReactDOM.createRoot(rootElement);

// Renderização otimizada com AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Contexto de autenticação adicionado */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

/**
 * Praise FM Brasil - Sistema de Gestão de UI
 * Versão: 2.0.26
 * Estilo: Minimalista / Editorial / Premium
 */