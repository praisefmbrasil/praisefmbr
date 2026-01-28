import type { Program, FavoriteItem } from './types';

// Programas da rádio
export const programs: Program[] = [
  { id: '1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', image: '/images/Samuel_Andrade.webp' },
  { id: '2', title: 'Praise FM Worship Brasil', host: '', startTime: '06:00', endTime: '07:00', image: '/images/Praise_FM_Worship.webp' },
  { id: '3', title: 'Manhã com Cristo', host: 'Lucas Martins', startTime: '07:00', endTime: '12:00', image: '/images/Lucas_Martins.webp' },
  { id: '4', title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', image: '/images/Rafael_Costa.webp' },
  { id: '5', title: 'Praise FM Live Show', host: '', startTime: '20:00', endTime: '21:00', image: '/images/Praise_Fm_Live_Show.webp' },
  // Adicione os outros programas conforme sua programação
];

// Favoritos / Devocionais
export const favoriteItems: FavoriteItem[] = [
  { id: '1', title: 'Devocional Matinal', type: 'devotional', image: '/images/devotional-placeholder.png' },
  { id: '2', title: 'Top Gospel Hits', type: 'track', image: '/images/favorite-placeholder.png' },
  { id: '3', title: 'Pregação da Palavra', type: 'devotional', image: '/images/Pregacao_da_Palavra.webp' },
  // Adicione outros favoritos
];
