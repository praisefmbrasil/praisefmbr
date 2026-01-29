// src/constants.ts

import type { Program } from './types';

// ✅ Imagens sem espaços extras
const IMAGES = {
  SamuelAndrade: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
  LucasMartins: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
  RafaelCosta: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
  AnaPaula: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
  BrunoAlmeida: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
  RodrigoVeras: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
  FelipeSantos: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
  ThiagoMoreira: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
  WorshipBrasil: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp',
  NonStop: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp',
  LiveShow: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp',
  PregacaoPalavra: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp'
};

// ✅ Grade de SEGUNDA a SÁBADO
const WEEKDAY_SCHEDULE: Program[] = [
  {
    id: 'madrugada-cristo',
    title: 'Madrugada com Cristo',
    host: 'Samuel Andrade',
    startTime: '00:00',
    endTime: '06:00',
    description: 'Momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.',
    image: IMAGES.SamuelAndrade
  },
  {
    id: 'worship-brasil-1',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Louvores poderosos para começar seu dia com adoração.',
    image: IMAGES.WorshipBrasil
  },
  {
    id: 'manha-cristo',
    title: 'Manhã com Cristo',
    host: 'Lucas Martins',
    startTime: '07:00',
    endTime: '12:00',
    description: 'As principais novidades da música cristã e reflexões que edificam sua manhã.',
    image: IMAGES.LucasMartins
  },
  {
    id: 'worship-brasil-2',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Louvores poderosos para continuar seu dia com adoração.',
    image: IMAGES.WorshipBrasil
  },
  {
    id: 'tarde-gospel',
    title: 'Tarde Gospel',
    host: 'Rafael Costa',
    startTime: '13:00',
    endTime: '16:00',
    description: 'Interatividade e alegria com os maiores sucessos do mundo gospel atual.',
    image: IMAGES.RafaelCosta
  },
  {
    id: 'non-stop',
    title: 'Praise FM Non Stop',
    host: 'Praise FM Brasil',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Os melhores hits gospel em sequência ininterrupta.',
    image: IMAGES.NonStop
  },
  {
    id: 'praise-nova-geracao',
    title: 'Praise FM Nova Geração',
    host: 'Ana Paula',
    startTime: '17:00',
    endTime: '18:00',
    description: 'Apresentando a nova geração de artistas e os lançamentos mais frescos do worship.',
    image: IMAGES.AnaPaula
  },
  {
    id: 'carona-praise',
    title: 'De Carona com a Praise FM',
    host: 'Bruno Almeida',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Sua melhor companhia no trânsito, com hits e histórias inspiradoras.',
    image: IMAGES.BrunoAlmeida
  },
  {
    id: 'live-show',
    title: 'Praise FM Live Show',
    host: 'Praise FM Brasil',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Transmissão ao vivo com interação e músicas gospel exclusivas.',
    image: IMAGES.LiveShow
  },
  {
    id: 'praise-classicos',
    title: 'Praise FM Brasil Clássicos',
    host: 'Rodrigo Veras',
    startTime: '21:00',
    endTime: '22:00',
    description: 'Um resgate dos hinos inesquecíveis que marcaram gerações de cristãos.',
    image: IMAGES.RodrigoVeras
  },
  {
    id: 'worship-brasil-3',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '22:00',
    endTime: '00:00',
    description: 'Encerre seu dia com louvores que renovam sua alma.',
    image: IMAGES.WorshipBrasil
  }
];

// ✅ Grade de DOMINGO
const SUNDAY_SCHEDULE: Program[] = [
  {
    id: 'madrugada-cristo-dom',
    title: 'Madrugada com Cristo',
    host: 'Samuel Andrade',
    startTime: '00:00',
    endTime: '06:00',
    description: 'Momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.',
    image: IMAGES.SamuelAndrade
  },
  {
    id: 'worship-brasil-dom-1',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Louvores poderosos para começar seu domingo com adoração.',
    image: IMAGES.WorshipBrasil
  },
  {
    id: 'domingo-cristo',
    title: 'Domingo com Cristo',
    host: 'Felipe Santos',
    startTime: '07:00',
    endTime: '12:00',
    description: 'Um programa especial para abençoar seu domingo com louvores e mensagens de esperança.',
    image: IMAGES.FelipeSantos
  },
  {
    id: 'worship-brasil-dom-2',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Louvores poderosos para continuar seu domingo com adoração.',
    image: IMAGES.WorshipBrasil
  },
  {
    id: 'tarde-gospel-dom',
    title: 'Tarde Gospel',
    host: 'Rafael Costa',
    startTime: '13:00',
    endTime: '16:00',
    description: 'Interatividade e alegria com os maiores sucessos do mundo gospel atual.',
    image: IMAGES.RafaelCosta
  },
  {
    id: 'non-stop-dom',
    title: 'Praise FM Non Stop',
    host: 'Praise FM Brasil',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Os melhores hits gospel em sequência ininterrupta.',
    image: IMAGES.NonStop
  },
  {
    id: 'praise-nova-geracao-dom',
    title: 'Praise FM Nova Geração',
    host: 'Ana Paula',
    startTime: '17:00',
    endTime: '18:00',
    description: 'Apresentando a nova geração de artistas e os lançamentos mais frescos do worship.',
    image: IMAGES.AnaPaula
  },
  {
    id: 'worship-brasil-dom-3',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Louvores poderosos para encerrar seu domingo com adoração.',
    image: IMAGES.WorshipBrasil
  },
  {
    id: 'praise-pop',
    title: 'Praise FM Pop',
    host: 'Thiago Moreira',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Os maiores sucessos da música cristã pop — atualizados e vibrantes.',
    image: IMAGES.ThiagoMoreira
  },
  {
    id: 'praise-classicos-dom',
    title: 'Praise FM Brasil Clássicos',
    host: 'Rodrigo Veras',
    startTime: '21:00',
    endTime: '22:00',
    description: 'Um resgate dos hinos inesquecíveis que marcaram gerações de cristãos.',
    image: IMAGES.RodrigoVeras
  },
  {
    id: 'pregacao-palavra',
    title: 'Pregação da Palavra',
    host: 'Praise FM Brasil',
    startTime: '22:00',
    endTime: '23:00',
    description: 'Mensagem bíblica poderosa para fortalecer sua fé.',
    image: IMAGES.PregacaoPalavra
  },
  {
    id: 'worship-brasil-dom-4',
    title: 'Praise FM Worship Brasil',
    host: 'Praise FM Brasil',
    startTime: '23:00',
    endTime: '00:00',
    description: 'Encerre seu domingo com louvores que renovam sua alma.',
    image: IMAGES.WorshipBrasil
  }
];

// ✅ SCHEDULES organizado por dia (0 = Domingo)
export const SCHEDULES: Record<number, Program[]> = {
  0: SUNDAY_SCHEDULE,    // Domingo
  1: WEEKDAY_SCHEDULE,   // Segunda
  2: WEEKDAY_SCHEDULE,   // Terça
  3: WEEKDAY_SCHEDULE,   // Quarta
  4: WEEKDAY_SCHEDULE,   // Quinta
  5: WEEKDAY_SCHEDULE,   // Sexta
  6: WEEKDAY_SCHEDULE    // Sábado
};