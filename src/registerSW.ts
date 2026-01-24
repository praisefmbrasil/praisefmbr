export function registerSW() {
  // Verifica se o navegador suporta Service Workers
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[Praise SW] Registrado com sucesso:', registration.scope);

          // Verifica atualizações em intervalos (ex: a cada hora)
          registration.update();

          // Lógica para detectar quando um novo Service Worker está disponível
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // Novo conteúdo disponível! 
                    // Aqui você poderia disparar um alerta para o usuário recarregar
                    console.log('[Praise SW] Novo conteúdo disponível. Por favor, atualize a página.');
                  } else {
                    // Conteúdo armazenado em cache para uso offline
                    console.log('[Praise SW] Conteúdo em cache para uso offline.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('[Praise SW] Falha no registro:', error);
        });
    });
  }
}