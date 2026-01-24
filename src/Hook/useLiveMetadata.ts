import { useState, useEffect } from 'react';

interface ZenoMetadata {
  streamTitle: string; // O Zeno envia geralmente como "Artista - Música"
}

export function useLiveMetadata() {
  const [metadata, setMetadata] = useState<{ artist: string; title: string }>({
    artist: 'Praise FM',
    title: 'Brasil'
  });

  useEffect(() => {
    // URL da sua rádio no Zeno
    const url = 'https://api.zeno.fm/mounts/metadata/subscribe/olisuxy9v3vtv';
    
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data: ZenoMetadata = JSON.parse(event.data);
        
        if (data.streamTitle) {
          // Divide a string "Artista - Música"
          const parts = data.streamTitle.split(' - ');
          const artist = parts[0]?.trim() || 'Praise FM';
          const title = parts[1]?.trim() || 'Brasil';

          setMetadata({ artist, title });

          // Opcional: Atualiza o título da aba do navegador
          document.title = `🔴 Ao Vivo: ${title} - ${artist}`;
        }
      } catch (error) {
        console.error('Erro ao processar metadados do Zeno:', error);
      }
    };

    eventSource.onerror = (err) => {
      console.error('Erro na conexão SSE:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Limpa a conexão quando o componente desmontar
    };
  }, []);

  return metadata;
}