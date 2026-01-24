// src/constants.ts

export interface PodcastItem {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
  duration: string;
}

export const DEVOTIONAL_PODCASTS: PodcastItem[] = [
  {
    id: '1',
    title: 'Confiança em Deus',
    author: 'Samuel Andrade',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
    category: 'Fé',
    duration: '12 min'
  },
  {
    id: '2',
    title: 'A Paz que Supera a Compreensão',
    author: 'Lucas Martins',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
    category: 'Paz',
    duration: '15 min'
  },
  {
    id: '3',
    title: 'O Poder da Oração',
    author: 'Rafael Costa',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
    category: 'Oração',
    duration: '10 min'
  },
  {
    id: '4',
    title: 'Deus é Fiel',
    author: 'Ana Paula',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
    category: 'Fidelidade',
    duration: '14 min'
  },
  {
    id: '5',
    title: 'Caminhando com Cristo',
    author: 'Bruno Almeida',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
    category: 'Vida Cristã',
    duration: '18 min'
  },
  {
    id: '6',
    title: 'Amor Incondicional',
    author: 'Felipe Santos',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
    category: 'Amor',
    duration: '11 min'
  },
  {
    id: '7',
    title: 'Clássicos da Fé',
    author: 'Rodrigo Veras',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
    category: 'Clássicos',
    duration: '16 min'
  },
  {
    id: '8',
    title: 'Louvor e Adoração',
    author: 'Thiago Moreira',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
    category: 'Adoração',
    duration: '13 min'
  }
];

// Outras constantes (opcional)
export const ARTISTS = [
  { name: 'Aline Barros', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp' },
  { name: 'Gabriela Rocha', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp' },
  { name: 'Fernandinho', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp' },
  { name: 'Isaias Saad', image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp' }
];