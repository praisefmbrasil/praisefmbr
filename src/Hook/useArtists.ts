// src/hooks/useArtists.ts
import { useState, useEffect } from 'react';

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image?: string;
  biography?: string;
}

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua por sua chamada de API real
        const mockArtists: Artist[] = [
          {
            id: '1',
            name: 'Artista 1',
            genre: 'Gospel',
            image: '/artist1.jpg',
            biography: 'Biografia do artista 1'
          },
          {
            id: '2',
            name: 'Artista 2',
            genre: 'Worship',
            image: '/artist2.jpg',
            biography: 'Biografia do artista 2'
          }
        ];
        
        setArtists(mockArtists);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar artistas'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { artists, loading, error };
};