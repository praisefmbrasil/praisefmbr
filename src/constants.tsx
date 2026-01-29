// constants.ts
import type { Program } from './types';

export const programs: Program[] = [
  {
    id: 'madrugada-cristo',
    title: 'Madrugada com Cristo',
    host: 'Samuel Andrade',
    startTime: '00:00',
    endTime: '06:00',
    description: 'Momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp'
  },
  {
    id: 'manha-cristo',
    title: 'Manhã com Cristo',
    host: 'Lucas Martins',
    startTime: '06:00',
    endTime: '12:00',
    description: 'As principais novidades da música cristã e reflexões que edificam sua manhã.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp'
  },
  {
    id: 'tarde-gospel',
    title: 'Tarde Gospel',
    host: 'Rafael Costa',
    startTime: '12:00',
    endTime: '15:00',
    description: 'Interatividade e alegria com os maiores sucessos do mundo gospel atual.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp'
  },
  {
    id: 'praise-nova-geracao',
    title: 'Praise FM Nova Geração',
    host: 'Ana Paula',
    startTime: '15:00',
    endTime: '18:00',
    description: 'Apresentando a nova geração de artistas e os lançamentos mais frescos do worship.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp'
  },
  {
    id: 'carona-praise',
    title: 'De Carona com a Praise FM',
    host: 'Bruno Almeida',
    startTime: '18:00',
    endTime: '21:00',
    description: 'Sua melhor companhia no trânsito, com hits e histórias inspiradoras.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp'
  },
  {
    id: 'praise-classicos',
    title: 'Praise FM Brasil Clássicos',
    host: 'Rodrigo Veras',
    startTime: '21:00',
    endTime: '00:00',
    description: 'Um resgate dos hinos inesquecíveis que marcaram gerações de cristãos.',
    image: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp'
  }
];

// O SCHEDULES organiza a grade por dia da semana (0 = Domingo, 1 = Segunda...)
// Aqui você pode personalizar dias específicos se desejar
export const SCHEDULES: Record<number, Program[]> = {
  0: programs, // Domingo
  1: programs, // Segunda
  2: programs, // Terça
  3: programs, // Quarta
  4: programs, // Quinta
  5: programs, // Sexta
  6: programs, // Sábado
};