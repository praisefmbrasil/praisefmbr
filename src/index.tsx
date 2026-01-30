import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importação crucial dos estilos global e Tailwind

// Referência ao elemento root do seu index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root para montar a aplicação.");
}

// Inicialização do React 18+
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* O App já contém o AuthProvider e o HashRouter que configuramos,
      então o ponto de entrada permanece limpo e focado no carregamento.
    */}
    <App />
  </React.StrictMode>
);