// src/constants.ts

import { Program, Podcast } from './types';

export const DEVOTIONAL_PODCASTS: Podcast[] = [
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

// Função auxiliar para criar blocos repetitivos
const createWeekdaySchedule = (isWednesday = false): Program[] => [
  {
    id: "madrugada",
    title: "Madrugada com Cristo",
    host: "Samuel Andrade",
    startTime: "00:00",
    endTime: "06:00",
    description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
  },
  {
    id: "worship-1",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "06:00",
    endTime: "07:00",
    description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "manha-com-cristo",
    title: "Manhã com Cristo",
    host: "Lucas Martins",
    startTime: "07:00",
    endTime: "12:00",
    description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
  },
  {
    id: "worship-2",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "12:00",
    endTime: "13:00",
    description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "tarde-gospel",
    title: "Tarde Gospel",
    host: "Rafael Costa",
    startTime: "13:00",
    endTime: "16:00",
    description: "A melhor seleção de músicas gospel para sua tarde.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
  },
  {
    id: "non-stop",
    title: "Praise FM Non Stop",
    host: "",
    startTime: "16:00",
    endTime: "17:00",
    description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
  },
  {
    id: "nova-geracao",
    title: "Praise FM Nova Geração",
    host: "Ana Paula",
    startTime: "17:00",
    endTime: "18:00",
    description: "Música gospel contemporânea para a nova geração de adoradores.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
  },
  {
    id: "de-carona",
    title: "De Carona com a Praise FM",
    host: "Bruno Almeida",
    startTime: "18:00",
    endTime: "20:00",
    description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
  },
  {
    id: "live-show",
    title: "Praise FM Live Show",
    host: "",
    startTime: "20:00",
    endTime: "21:00",
    description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
  },
  {
    id: "classicos",
    title: "Praise FM Brasil Clássicos",
    host: "Rodrigo Veras",
    startTime: "21:00",
    endTime: "22:00",
    description: "Clássicos eternos da música gospel brasileira.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
  },
  {
    id: "worship-fim",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "22:00",
    endTime: "00:00",
    description: "Adoração contínua para encerrar seu dia em paz com Deus.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  }
];

const createSundaySchedule = (): Program[] => [
  {
    id: "madrugada-dom",
    title: "Madrugada com Cristo",
    host: "Samuel Andrade",
    startTime: "00:00",
    endTime: "06:00",
    description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
  },
  {
    id: "worship-dom-1",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "06:00",
    endTime: "07:00",
    description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "domingo-com-cristo",
    title: "Domingo com Cristo",
    host: "Felipe Santos",
    startTime: "07:00",
    endTime: "12:00",
    description: "Um domingo abençoado com mensagens de fé e música gospel inspiradora.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp"
  },
  {
    id: "worship-dom-2",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "12:00",
    endTime: "13:00",
    description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "tarde-gospel-dom",
    title: "Tarde Gospel",
    host: "Rafael Costa",
    startTime: "13:00",
    endTime: "16:00",
    description: "A melhor seleção de músicas gospel para sua tarde.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
  },
  {
    id: "non-stop-dom",
    title: "Praise FM Non Stop",
    host: "",
    startTime: "16:00",
    endTime: "17:00",
    description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
  },
  {
    id: "nova-geracao-dom",
    title: "Praise FM Nova Geração",
    host: "Ana Paula",
    startTime: "17:00",
    endTime: "18:00",
    description: "Música gospel contemporânea para a nova geração de adoradores.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
  },
  {
    id: "worship-dom-3",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "18:00",
    endTime: "20:00",
    description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "pop-dom",
    title: "Praise FM Pop",
    host: "Thiago Moreira",
    startTime: "20:00",
    endTime: "21:00",
    description: "Os maiores sucessos da música cristã pop — atualizados e vibrantes.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp"
  },
  {
    id: "classicos-dom",
    title: "Praise FM Brasil Clássicos",
    host: "Rodrigo Veras",
    startTime: "21:00",
    endTime: "22:00",
    description: "Clássicos eternos da música gospel brasileira.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
  },
  {
    id: "pregacao-dom",
    title: "Pregação da Palavra",
    host: "",
    startTime: "22:00",
    endTime: "23:00",
    description: "Uma mensagem poderosa da Palavra de Deus para fortalecer sua fé.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp"
  },
  {
    id: "worship-dom-fim",
    title: "Praise FM Worship Brasil",
    host: "",
    startTime: "23:00",
    endTime: "00:00",
    description: "Adoração contínua para encerrar seu dia em paz com Deus.",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  }
];

// SCHEDULES[0] = DOMINGO
// SCHEDULES[1] = SEGUNDA
// ...
// SCHEDULES[6] = SÁBADO
export const SCHEDULES: Program[][] = [
  createSundaySchedule(),        // 0 - Domingo
  createWeekdaySchedule(),      // 1 - Segunda
  createWeekdaySchedule(),      // 2 - Terça
  createWeekdaySchedule(true),  // 3 - Quarta (Live Show às 20h)
  createWeekdaySchedule(),      // 4 - Quinta
  createWeekdaySchedule(),      // 5 - Sexta
  createWeekdaySchedule()       // 6 - Sábado
];