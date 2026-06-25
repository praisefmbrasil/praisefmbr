import { Program, Podcast } from './types';

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
};

const IMAGES = {
  // Apresentadores e Programas - Praise FM Brasil
  SAMUEL_ANDRADE: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/samuel_andrade_k3botd.webp',
  LUCAS_MARTINS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/lucas_martins_qmdc5s.webp',
  RAFAEL_COSTA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rafael_costa_qxzwrf.webp',
  ANA_PAULA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',
  BRUNO_ALMEIDA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/bruno_almeida_hfmekk.webp',
  RODRIGO_VERAS: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/rodrigo_veras_esognm.webp',
  PATRICK_SILVA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892293/patick_silva_r4lpvp.webp',
  CESAR_BRUM: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/cesar_brum_auudhy.webp',
  JANAINA_COSTA: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/ana_paula_wjuwju.webp',

  // Imagens de Programas Genéricos
  WORSHIP_BR: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/worship_pck4vy.webp',
  PREGACAO: 'https://res.cloudinary.com/dlcliu2cv/image/upload/v1778892292/pregacao_da_palavra_leapde.webp'
};

const commonDaily: Program[] = [
  { id: '1',  title: 'Madrugada com Cristo',  host: 'Samuel Andrade', startTime: '00:00', endTime: '06:00', description: 'Música e paz para as suas madrugadas.',          image: IMAGES.SAMUEL_ANDRADE },
  { id: '2',  title: 'Worship Brasil',        host: 'Praise FM',      startTime: '06:00', endTime: '07:00', description: 'O melhor da adoração nacional e internacional.', image: IMAGES.WORSHIP_BR     },
  { id: '3',  title: 'Manhã com Cristo',      host: 'Lucas Martins',  startTime: '07:00', endTime: '12:00', description: 'Sua manhã com muito louvor e edificação.',       image: IMAGES.LUCAS_MARTINS  },
  { id: '4',  title: 'Worship Brasil',        host: 'Praise FM',      startTime: '12:00', endTime: '13:00', description: 'Momento de adoração ao meio-dia.',               image: IMAGES.WORSHIP_BR     },
  { id: '5',  title: 'Tarde Gospel',          host: 'Rafael Costa',   startTime: '13:00', endTime: '16:00', description: 'A trilha sonora perfeita para a sua tarde.',     image: IMAGES.RAFAEL_COSTA   },
  { id: '6',  title: 'Nova Geração',          host: 'Ana Paula',      startTime: '16:00', endTime: '17:00', description: 'Descubra os novos talentos da música cristã.',   image: IMAGES.ANA_PAULA      },
  { id: '7',  title: 'Praise FM Flow',        host: 'Dj Patrick',     startTime: '17:00', endTime: '18:00', description: 'O melhor do hip hop no flow.',                   image: IMAGES.PATRICK_SILVA  },
  { id: '8',  title: 'De Carona',             host: 'Bruno Almeida',  startTime: '18:00', endTime: '20:00', description: 'Sua companhia no trânsito e na volta para casa.',image: IMAGES.BRUNO_ALMEIDA  },
  { id: '9',  title: 'Praise FM Rock',        host: 'Cesar Brum',     startTime: '20:00', endTime: '21:00', description: 'Rock cristão de alta qualidade.',                image: IMAGES.CESAR_BRUM     },
  { id: '10', title: 'Praise FM Clássicos',   host: 'Rodrigo Veras',  startTime: '21:00', endTime: '22:00', description: 'Hinos e louvores que marcaram gerações.',        image: IMAGES.RODRIGO_VERAS  },
  { id: '11', title: 'Worship Brasil',        host: 'Praise FM',      startTime: '22:00', endTime: '00:00', description: 'Encerrando o dia na presença do Senhor.',        image: IMAGES.WORSHIP_BR     },
];

export const SCHEDULES: Record<number, Program[]> = {
  1: commonDaily,
  2: commonDaily,
  3: commonDaily,
  4: commonDaily,
  5: commonDaily,
  6: commonDaily,
  // Domingo (0)
  0: [
    { id: 's1',  title: 'Madrugada com Cristo',  host: 'Samuel Andrade',     startTime: '00:00', endTime: '06:00', description: 'Madrugada de adoração.',                        image: IMAGES.SAMUEL_ANDRADE },
    { id: 's2',  title: 'Worship Brasil',        host: 'Praise FM',          startTime: '06:00', endTime: '07:00', description: 'Iniciando o domingo em adoração.',              image: IMAGES.WORSHIP_BR     },
    { id: 's3',  title: 'Domingo com Cristo',    host: 'Janaina Costa',      startTime: '07:00', endTime: '12:00', description: 'Um domingo abençoado para sua família.',        image: IMAGES.JANAINA_COSTA  },
    { id: 's4',  title: 'Worship Brasil',        host: 'Praise FM',          startTime: '12:00', endTime: '13:00', description: 'Louvor ao meio-dia.',                           image: IMAGES.WORSHIP_BR     },
    { id: 's5',  title: 'Tarde Gospel',          host: 'Rafael Costa',       startTime: '13:00', endTime: '16:00', description: 'Sua tarde de domingo com o melhor do gospel.',  image: IMAGES.RAFAEL_COSTA   },
    { id: 's6',  title: 'Praise FM Rock',        host: 'Cesar Brum',         startTime: '16:00', endTime: '17:00', description: 'Rock cristão para o seu domingo.',              image: IMAGES.CESAR_BRUM     },
    { id: 's7',  title: 'Nova Geração',          host: 'Ana Paula',          startTime: '17:00', endTime: '18:00', description: 'Novidades do mundo gospel.',                    image: IMAGES.ANA_PAULA      },
    { id: 's8',  title: 'Worship Brasil',        host: 'Praise FM',          startTime: '18:00', endTime: '20:00', description: 'Noite de adoração.',                            image: IMAGES.WORSHIP_BR     },
    { id: 's9',  title: 'Pregação da Palavra',   host: 'Convidados',         startTime: '20:00', endTime: '21:00', description: 'Uma palavra de fé para sua semana.',            image: IMAGES.PREGACAO       },
    { id: 's10', title: 'Praise FM Clássicos',   host: 'Rodrigo Veras',      startTime: '21:00', endTime: '22:00', description: 'Relíquias da música gospel.',                   image: IMAGES.RODRIGO_VERAS  },
    { id: 's11', title: 'Worship Brasil',        host: 'Praise FM',          startTime: '22:00', endTime: '00:00', description: 'Terminando o domingo em oração.',               image: IMAGES.WORSHIP_BR     },
  ]
};