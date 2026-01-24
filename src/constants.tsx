import { Program } from './types';

// Programação Segunda a Sábado
const WEEKDAY_SCHEDULE: Program[] = [
  {
    id: "1",
    title: "Madrugada com Cristo",
    host: "Samuel Andrade",
    description: "Comece seu dia na presença de Deus com louvores e reflexões.",
    startTime: "00:00",
    endTime: "06:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
  },
  {
    id: "2",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "06:00",
    endTime: "07:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "3",
    title: "Manhã com Cristo",
    host: "Lucas Martins",
    description: "Energia e inspiração para sua manhã.",
    startTime: "07:00",
    endTime: "12:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
  },
  {
    id: "4",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "12:00",
    endTime: "13:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "5",
    title: "Tarde Gospel",
    host: "Rafael Costa",
    description: "O melhor da música gospel para sua tarde.",
    startTime: "13:00",
    endTime: "16:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
  },
  {
    id: "6",
    title: "Praise FM Non Stop",
    host: "Praise FM Brasil",
    description: "Músicas sem parar.",
    startTime: "16:00",
    endTime: "17:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
  },
  {
    id: "7",
    title: "Praise FM Nova Geração",
    host: "Ana Paula",
    description: "Descubra a próxima geração de talentos gospel.",
    startTime: "17:00",
    endTime: "18:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
  },
  {
    id: "8",
    title: "De Carona com a Praise FM",
    host: "Bruno Almeida",
    description: "Sua companhia perfeita no caminho de volta.",
    startTime: "18:00",
    endTime: "20:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
  },
  {
    id: "9",
    title: "Praise FM Live Show",
    host: "Praise FM Brasil",
    description: "Show ao vivo com os melhores hits.",
    startTime: "20:00",
    endTime: "21:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
  },
  {
    id: "10",
    title: "Praise FM Brasil Clássicos",
    host: "Rodrigo Veras",
    description: "Os clássicos que marcaram gerações.",
    startTime: "21:00",
    endTime: "22:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
  },
  {
    id: "11",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "22:00",
    endTime: "00:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  }
];

// Programação Domingo
const SUNDAY_SCHEDULE: Program[] = [
  {
    id: "1",
    title: "Madrugada com Cristo",
    host: "Samuel Andrade",
    description: "Comece seu dia na presença de Deus com louvores e reflexões.",
    startTime: "00:00",
    endTime: "06:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
  },
  {
    id: "2",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "06:00",
    endTime: "07:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "3",
    title: "Domingo com Cristo",
    host: "Felipe Santos",
    description: "Um domingo especial na presença do Senhor.",
    startTime: "07:00",
    endTime: "12:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp"
  },
  {
    id: "4",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "12:00",
    endTime: "13:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "5",
    title: "Tarde Gospel",
    host: "Rafael Costa",
    description: "O melhor da música gospel para sua tarde.",
    startTime: "13:00",
    endTime: "16:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
  },
  {
    id: "6",
    title: "Praise FM Non Stop",
    host: "Praise FM Brasil",
    description: "Músicas sem parar.",
    startTime: "16:00",
    endTime: "17:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
  },
  {
    id: "7",
    title: "Praise FM Nova Geração",
    host: "Ana Paula",
    description: "Descubra a próxima geração de talentos gospel.",
    startTime: "17:00",
    endTime: "18:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
  },
  {
    id: "8",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "18:00",
    endTime: "20:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  },
  {
    id: "9",
    title: "Praise FM POP",
    host: "Thiago Moreira",
    description: "Os maiores sucessos pop gospel.",
    startTime: "20:00",
    endTime: "21:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp"
  },
  {
    id: "10",
    title: "Praise FM Brasil Clássicos",
    host: "Rodrigo Veras",
    description: "Os clássicos que marcaram gerações.",
    startTime: "21:00",
    endTime: "22:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
  },
  {
    id: "11",
    title: "Pregação da Palavra",
    host: "Praise FM Brasil",
    description: "Mensagens que transformam vidas.",
    startTime: "22:00",
    endTime: "23:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp"
  },
  {
    id: "12",
    title: "Praise FM Worship Brasil",
    host: "Praise FM Brasil",
    description: "Uma hora de adoração pura.",
    startTime: "23:00",
    endTime: "00:00",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
  }
];

export const SCHEDULES: { [key: number]: Program[] } = {
  0: SUNDAY_SCHEDULE,    // Domingo
  1: WEEKDAY_SCHEDULE,   // Segunda
  2: WEEKDAY_SCHEDULE,   // Terça
  3: WEEKDAY_SCHEDULE,   // Quarta
  4: WEEKDAY_SCHEDULE,   // Quinta
  5: WEEKDAY_SCHEDULE,   // Sexta
  6: WEEKDAY_SCHEDULE,   // Sábado
};