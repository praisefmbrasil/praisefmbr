/**
 * Registra o Service Worker para habilitar funcionalidades de PWA
 * (Progressive Web App), como cache offline e instalação no dispositivo.
 */
export function registerSW() {
  // Verifica se o navegador suporta Service Workers
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // O caminho '/sw.js' deve apontar para o arquivo gerado no build (public folder)
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Log de sucesso com o escopo de atuação do SW
          console.log('[SW] Praise FM Brasil - Registrado:', registration.scope);
        })
        .catch((error) => {
          // Log de erro caso a rádio não consiga registrar o worker
          console.error('[SW] Erro no registro:', error);
        });
    });
  }
}