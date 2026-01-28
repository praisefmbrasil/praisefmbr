// Tipos para Programas de Rádio
export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string;
  endTime: string;
  description?: string;
  image?: string;
}

// Tipos para Podcasts
export interface Podcast {
  id: string;
  title: string;
  category: string;
  duration: string;
  author: string;
  image?: string;
}

// Tipos para Favoritos
export type FavoriteItemType = 'program' | 'track' | 'devotional' | 'artist';

export interface FavoriteItem {
  id: string;
  title: string;
  subtitle?: string;
  host?: string;
  image?: string;
  type: FavoriteItemType;
}
