import { Program, Podcast } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

const IMAGES = {
  SAMUEL_ANDRADE: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
  LUCAS_MARTINS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
  RAFAEL_COSTA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
  ANA_PAULA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
  BRUNO_ALMEIDA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
  THIAGO_MOREIRA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
  RODRIGO_VERAS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
  FELIPE_SANTOS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
  WORSHIP: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp',
  NON_STOP: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp',
  LIVE_SHOW: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp',
  PREGACAO: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp'
};

const commonDaily: Program[] = [
  { id: '1', title: 'MADRUGADA COM CRISTO', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Louvores que acalmam a alma na sua madrugada.', image: IMAGES.SAMUEL_ANDRADE }, [cite: 1, 2]
  { id: '2', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '06:00', endTime: '07:00', description: 'O melhor da adoração nacional e internacional.', image: IMAGES.WORSHIP }, [cite: 1, 2]
  { id: '3', title: 'MANHÃ COM CRISTO', host: 'Lucas Martins', startTime: '07:00', endTime: '12:00', description: 'Informação, música e fé para começar o seu dia.', image: IMAGES.LUCAS_MARTINS }, [cite: 1, 2]
  { id: '4', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '12:00', endTime: '13:00', description: 'Sua pausa para adoração ao meio-dia.', image: IMAGES.WORSHIP }, [cite: 1, 2]
  { id: '5', title: 'TARDE GOSPEL', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'Os grandes sucessos da música cristã na sua tarde.', image: IMAGES.RAFAEL_COSTA }, [cite: 1, 2]
  { id: '6', title: 'PRAISE FM NON STOP', host: 'Praise FM', startTime: '16:00', endTime: '17:00', description: 'Uma hora de música sem interrupções.', image: IMAGES.NON_STOP }, [cite: 1, 2]
  { id: '7', title: 'PRAISE FM NOVA GERAÇÃO', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'O som da nova geração de adoradores.', image: IMAGES.ANA_PAULA }, [cite: 1, 2]
  { id: '8', title: 'DE CARONA COM A PRAISE FM', host: 'Bruno Almeida', startTime: '18:00', endTime: '20:00', description: 'Sua melhor companhia no trânsito e na volta para casa.', image: IMAGES.BRUNO_ALMEIDA }, [cite: 1, 2]
  { id: '9-pop', title: 'PRAISE FM POP', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'O melhor do pop gospel contemporâneo.', image: IMAGES.THIAGO_MOREIRA }, [cite: 2, 3]
  { id: '10', title: 'PRAISE FM BRASIL CLÁSSICOS', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Hinos e canções que marcaram época.', image: IMAGES.RODRIGO_VERAS }, [cite: 1, 2]
  { id: '11', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '22:00', endTime: '00:00', description: 'Encerrando o dia em adoração.', image: IMAGES.WORSHIP }, [cite: 2, 3]
];

export const SCHEDULES: Record<number, Program[]> = {
  1: commonDaily,
  2: commonDaily,
  3: commonDaily.map(p => p.startTime === '20:00' ? { ...p, id: '9-live', title: 'PRAISE FM LIVE SHOW', host: 'Praise FM', description: 'Sessões exclusivas ao vivo.', image: IMAGES.LIVE_SHOW } : p), [cite: 2]
  4: commonDaily,
  5: commonDaily,
  6: commonDaily,
  0: [ // DOMINGO
    { id: 's1', title: 'MADRUGADA COM CRISTO', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Louvores que acalmam a alma na sua madrugada.', image: IMAGES.SAMUEL_ANDRADE }, [cite: 1, 3]
    { id: 's2', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '06:00', endTime: '07:00', description: 'Manhã de adoração profunda.', image: IMAGES.WORSHIP }, [cite: 1, 3]
    { id: 's3', title: 'DOMINGO COM CRISTO', host: 'Felipe Santos', startTime: '07:00', endTime: '12:00', description: 'A celebração do dia do Senhor com você.', image: IMAGES.FELIPE_SANTOS }, [cite: 1, 3]
    { id: 's4', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '12:00', endTime: '13:00', description: 'Pausa para meditação no domingo.', image: IMAGES.WORSHIP }, [cite: 1, 3]
    { id: 's5', title: 'TARDE GOSPEL', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'O melhor do gospel para o seu domingo.', image: IMAGES.RAFAEL_COSTA }, [cite: 1, 3]
    { id: 's6', title: 'PRAISE FM NON STOP', host: 'Praise FM', startTime: '16:00', endTime: '17:00', description: 'A música que não para.', image: IMAGES.NON_STOP }, [cite: 1, 3]
    { id: 's7', title: 'PRAISE FM NOVA GERAÇÃO', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'Descobrindo talentos no dia do Senhor.', image: IMAGES.ANA_PAULA }, [cite: 1, 3]
    { id: 's8', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '18:00', endTime: '20:00', description: 'Adoração e louvor no anoitecer.', image: IMAGES.WORSHIP }, [cite: 1, 3]
    { id: 's9', title: 'PRAISE FM POP', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'Sucessos atuais da música cristã.', image: IMAGES.THIAGO_MOREIRA }, [cite: 1, 3]
    { id: 's10', title: 'PRAISE FM BRASIL CLÁSSICOS', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Clássicos eternos da nossa música.', image: IMAGES.RODRIGO_VERAS }, [cite: 1, 4]
    { id: 's11', title: 'PREGAÇÃO DA PALAVRA', host: 'Pastores', startTime: '22:00', endTime: '23:00', description: 'Uma palavra de fé para a sua semana.', image: IMAGES.PREGACAO }, [cite: 1, 3]
    { id: 's12', title: 'PRAISE FM WORSHIP BRASIL', host: 'Praise FM', startTime: '23:00', endTime: '00:00', description: 'Terminando o domingo aos pés do Senhor.', image: IMAGES.WORSHIP } [cite: 1, 3]
  ]
};

export const DEVOTIONAL_PODCASTS: Podcast[] = [
  { id: 'p1', title: 'Mensagens de Esperança', category: 'Estudo Bíblico', duration: '42 min', author: 'Praise FM Brasil', image: IMAGES.PREGACAO },
  { id: 'p2', title: 'Café com Fé', category: 'Inspiração', duration: '15 min', author: 'Lucas Martins', image: IMAGES.LUCAS_MARTINS },
  { id: 'p3', title: 'Voz da Adoração', category: 'Meditação', duration: '20 min', author: 'Ana Paula', image: IMAGES.ANA_PAULA }
];