import { Program, Podcast } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

const IMAGES = {
  // Apresentadores e Programas - Praise FM Brasil
  SAMUEL_ANDRADE: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
  LUCAS_MARTINS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
  RAFAEL_COSTA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
  ANA_PAULA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
  BRUNO_ALMEIDA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
  RODRIGO_VERAS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
  FELIPE_SANTOS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
  THIAGO_MOREIRA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
  
  // Imagens de Programas Genéricos
  WORSHIP_BR: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp',
  NON_STOP_BR: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp',
  LIVE_SHOW_BR: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp',
  PREGACAO: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp'
};

const commonDaily: Program[] = [
  { id: '1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Música e paz para as suas madrugadas.', image: IMAGES.SAMUEL_ANDRADE },
  { id: '2', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '06:00', endTime: '07:00', description: 'O melhor da adoração nacional e internacional.', image: IMAGES.WORSHIP_BR },
  { id: '3', title: 'Manhã com Cristo', host: 'Lucas Martins', startTime: '07:00', endTime: '12:00', description: 'Sua manhã com muito louvor e edificação.', image: IMAGES.LUCAS_MARTINS },
  { id: '4', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '12:00', endTime: '13:00', description: 'Momento de adoração ao meio-dia.', image: IMAGES.WORSHIP_BR },
  { id: '5', title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'A trilha sonora perfeita para a sua tarde.', image: IMAGES.RAFAEL_COSTA },
  { id: '6', title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', description: 'Uma hora de música sem paradas.', image: IMAGES.NON_STOP_BR },
  { id: '7', title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'Descubra os novos talentos da música cristã.', image: IMAGES.ANA_PAULA },
  { id: '8', title: 'De Carona com a Praise FM', host: 'Bruno Almeida', startTime: '18:00', endTime: '20:00', description: 'Sua companhia no trânsito e na volta para casa.', image: IMAGES.BRUNO_ALMEIDA },
  { id: '9-pop', title: 'Praise FM Pop', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'Os maiores sucessos do pop gospel contemporâneo.', image: IMAGES.THIAGO_MOREIRA },
  { id: '10', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Hinos e louvores que marcaram gerações.', image: IMAGES.RODRIGO_VERAS },
  { id: '11', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '22:00', endTime: '00:00', description: 'Encerrando o dia na presença do Senhor.', image: IMAGES.WORSHIP_BR },
];

export const SCHEDULES: Record<number, Program[]> = {
  // Segunda (1) a Sábado (6), com exceção da Quarta-feira (3) para o Live Show
  1: commonDaily,
  2: commonDaily,
  3: commonDaily.map(p => p.startTime === '20:00' ? { ...p, id: '9-live', title: 'Praise FM Live Show', host: 'Equipe Praise FM', description: 'Gravações exclusivas ao vivo.', image: IMAGES.LIVE_SHOW_BR } : p),
  4: commonDaily,
  5: commonDaily,
  6: commonDaily,
  // Domingo (0)
  0: [
    { id: 's1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Madrugada de adoração.', image: IMAGES.SAMUEL_ANDRADE },
    { id: 's2', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '06:00', endTime: '07:00', description: 'Iniciando o domingo em adoração.', image: IMAGES.WORSHIP_BR },
    { id: 's3', title: 'Domingo com Cristo', host: 'Felipe Santos', startTime: '07:00', endTime: '12:00', description: 'Um domingo abençoado para sua família.', image: IMAGES.FELIPE_SANTOS },
    { id: 's4', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '12:00', endTime: '13:00', description: 'Louvor ao meio-dia.', image: IMAGES.WORSHIP_BR },
    { id: 's5', title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'Sua tarde de domingo com o melhor do gospel.', image: IMAGES.RAFAEL_COSTA },
    { id: 's6', title: 'Praise FM Non Stop', host: 'Praise FM', startTime: '16:00', endTime: '17:00', description: 'Música cristã sem intervalos.', image: IMAGES.NON_STOP_BR },
    { id: 's7', title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'Novidades do mundo gospel.', image: IMAGES.ANA_PAULA },
    { id: 's8', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '18:00', endTime: '20:00', description: 'Noite de adoração.', image: IMAGES.WORSHIP_BR },
    { id: 's9', title: 'Praise FM Pop', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'O melhor do pop cristão.', image: IMAGES.THIAGO_MOREIRA },
    { id: 's10', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Relíquias da música gospel.', image: IMAGES.RODRIGO_VERAS },
    { id: 's11', title: 'Pregação da Palavra', host: 'Pastores Convidados', startTime: '22:00', endTime: '23:00', description: 'Uma palavra de fé para sua semana.', image: IMAGES.PREGACAO },
    { id: 's12', title: 'Praise FM Worship Brasil', host: 'Equipe Praise FM', startTime: '23:00', endTime: '00:00', description: 'Terminando o domingo em oração.', image: IMAGES.WORSHIP_BR },
  ]
};

export const DEVOTIONAL_PODCASTS: Podcast[] = [
  { id: 'p1', title: 'Raízes Profundas', category: 'Estudo Bíblico', duration: '42 min', author: 'Pr. Samuel Andrade', image: IMAGES.SAMUEL_ANDRADE },
  { id: 'p2', title: 'Pão Diário', category: 'Inspiração', duration: '15 min', author: 'Lucas Martins', image: IMAGES.LUCAS_MARTINS },
  { id: 'p3', title: 'Hora de Quietude', category: 'Meditação', duration: '20 min', author: 'Ana Paula', image: IMAGES.ANA_PAULA },
  { id: 'p4', title: 'Notas de Graça', category: 'História da Música', duration: '55 min', author: 'Rodrigo Veras', image: IMAGES.RODRIGO_VERAS },
];