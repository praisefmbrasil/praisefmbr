import { Program, Podcast } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

const IMAGES = {
  // Apresentadores Brasil
  SAMUEL_ANDRADE: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp',
  LUCAS_MARTINS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp',
  RAFAEL_COSTA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp',
  ANA_PAULA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp',
  BRUNO_ALMEIDA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp',
  RODRIGO_VERAS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp',
  THIAGO_MOREIRA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp',
  FELIPE_SANTOS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp',
  
  // Programas e Temáticos
  WORSHIP_BR: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp',
  NON_STOP: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp',
  LIVE_SHOW: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp',
  PREGACAO: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Prega%C3%A7%C3%A3o_da_Palavra_zdphb4.webp',

  // Artistas Nacionais (para Podcasts/Destaques)
  FERNANDINHO: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp',
  ISAIAS_SAAD: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp',
  GABRIELA_ROCHA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp',
  ALINE_BARROS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp'
};

const commonDaily: Program[] = [
  { id: '1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Sua companhia nas madrugadas com o melhor do louvor nacional.', image: IMAGES.SAMUEL_ANDRADE },
  { id: '2', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '06:00', endTime: '07:00', description: 'Adoração profunda para começar o seu dia.', image: IMAGES.WORSHIP_BR },
  { id: '3', title: 'Manhã com Cristo', host: 'Lucas Martins', startTime: '07:00', endTime: '12:00', description: 'Informação, música e a palavra de Deus nas suas manhãs.', image: IMAGES.LUCAS_MARTINS },
  { id: '4', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '12:00', endTime: '13:00', description: 'O som da adoração no seu horário de almoço.', image: IMAGES.WORSHIP_BR },
  { id: '5', title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'As melhores músicas gospel para animar sua tarde.', image: IMAGES.RAFAEL_COSTA },
  { id: '6', title: 'Praise FM Non Stop', host: 'Música 24h', startTime: '16:00', endTime: '17:00', description: 'Uma hora de música sem interrupções.', image: IMAGES.NON_STOP },
  { id: '7', title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'Os novos talentos e hits da música cristã atual.', image: IMAGES.ANA_PAULA },
  { id: '8', title: 'De Carona com a Praise FM', host: 'Bruno Almeida', startTime: '18:00', endTime: '20:00', description: 'Sua volta para casa com muita música e alegria.', image: IMAGES.BRUNO_ALMEIDA },
  { id: '9-pop', title: 'Praise FM Pop', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'O melhor do pop cristão nacional e internacional.', image: IMAGES.THIAGO_MOREIRA },
  { id: '10', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Relembrando os grandes hinos que marcaram gerações.', image: IMAGES.RODRIGO_VERAS },
  { id: '11', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '22:00', endTime: '00:00', description: 'Encerrando o dia em total adoração.', image: IMAGES.WORSHIP_BR },
];

export const SCHEDULES: Record<number, Program[]> = {
  // Segunda (1) a Sábado (6)
  1: commonDaily,
  2: commonDaily,
  3: commonDaily.map(p => p.startTime === '20:00' ? { ...p, id: '9-live', title: 'Praise FM Live Show', host: 'Especial', description: 'Versões ao vivo exclusivas e ministrações.', image: IMAGES.LIVE_SHOW } : p),
  4: commonDaily,
  5: commonDaily,
  6: commonDaily,
  // Domingo (0)
  0: [
    { id: 's1', title: 'Madrugada com Cristo', host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Louvor e paz nas suas madrugadas de domingo.', image: IMAGES.SAMUEL_ANDRADE },
    { id: 's2', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '06:00', endTime: '07:00', description: 'Adoração matinal.', image: IMAGES.WORSHIP_BR },
    { id: 's3', title: 'Domingo com Cristo', host: 'Felipe Santos', startTime: '07:00', endTime: '12:00', description: 'O seu domingo começa melhor com louvor e a Palavra.', image: IMAGES.FELIPE_SANTOS },
    { id: 's4', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '12:00', endTime: '13:00', description: 'Reflexão e adoração ao meio-dia.', image: IMAGES.WORSHIP_BR },
    { id: 's5', title: 'Tarde Gospel', host: 'Rafael Costa', startTime: '13:00', endTime: '16:00', description: 'Sucessos que edificam a sua tarde de domingo.', image: IMAGES.RAFAEL_COSTA },
    { id: 's6', title: 'Praise FM Non Stop', host: 'Música 24h', startTime: '16:00', endTime: '17:00', description: 'Música cristã sem parar.', image: IMAGES.NON_STOP },
    { id: 's7', title: 'Praise FM Nova Geração', host: 'Ana Paula', startTime: '17:00', endTime: '18:00', description: 'A nova safra da música gospel.', image: IMAGES.ANA_PAULA },
    { id: 's8', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '18:00', endTime: '20:00', description: 'Adoração para a sua noite de domingo.', image: IMAGES.WORSHIP_BR },
    { id: 's9', title: 'Praise FM Pop', host: 'Thiago Moreira', startTime: '20:00', endTime: '21:00', description: 'Hits da música cristã contemporânea.', image: IMAGES.THIAGO_MOREIRA },
    { id: 's10', title: 'Praise FM Brasil Clássicos', host: 'Rodrigo Veras', startTime: '21:00', endTime: '22:00', description: 'Clássicos que nunca saem do coração.', image: IMAGES.RODRIGO_VERAS },
    { id: 's11', title: 'Pregação da Palavra', host: 'Ministros Convidados', startTime: '22:00', endTime: '23:00', description: 'Um momento de reflexão e ministração da Palavra de Deus.', image: IMAGES.PREGACAO },
    { id: 's12', title: 'Praise FM Worship Brasil', host: 'Equipe Praise', startTime: '23:00', endTime: '00:00', description: 'Terminando o domingo aos pés do Senhor.', image: IMAGES.WORSHIP_BR },
  ]
};

export const DEVOTIONAL_PODCASTS: Podcast[] = [
  { id: 'p1', title: 'Caminho de Fé', category: 'Estudo Bíblico', duration: '42 min', author: 'Fernandinho', image: IMAGES.FERNANDINHO },
  { id: 'p2', title: 'Bondade de Deus', category: 'Inspiração', duration: '15 min', author: 'Isaias Saad', image: IMAGES.ISAIAS_SAAD },
  { id: 'p3', title: 'Lugar Secreto', category: 'Meditação', duration: '20 min', author: 'Gabriela Rocha', image: IMAGES.GABRIELA_ROCHA },
  { id: 'p4', title: 'Ressuscita-me', category: 'Histórias', duration: '55 min', author: 'Aline Barros', image: IMAGES.ALINE_BARROS },
  { id: 'p5', title: 'Vida com Propósito', category: 'Devocional', duration: '30 min', author: 'Samuel Andrade', image: IMAGES.SAMUEL_ANDRADE },
  { id: 'p6', title: 'Manhãs com Deus', category: 'Oração', duration: '10 min', author: 'Lucas Martins', image: IMAGES.LUCAS_MARTINS },
];