import type { Program, FavoriteItem } from './types';

// Programas
export const programs: Program[] = [
  { id: '1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', image: '/images/Samuel_Andrade.webp' },
  { id: '2', title: 'Praise FM Worship Brasil', host: '', startTime: '06:00', endTime: '07:00', image: '/images/Praise_FM_Worship.webp' },
  // ... adicione todos os programas seguindo o mesmo padrão
];

// Favoritos
export const favoriteItems: FavoriteItem[] = [
  { id: '1', title: 'Devocional Matinal', image: '/images/devotional-placeholder.png', type: 'devotional' },
  { id: '2', title: 'Top Gospel Hits', image: '/images/favorite-placeholder.png', type: 'track' },
  // ... outros favoritos
];
