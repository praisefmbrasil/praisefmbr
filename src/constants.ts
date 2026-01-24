// src/constants.ts

export interface Program {
  id: string;
  title: string;
  host: string;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
  description: string;
  image: string;
  category?: string;
}

export const SCHEDULES = [
  // DOMINGO (índice 0)
  [
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
  ],

  // SEGUNDA a SÁBADO (índice 1 a 6)
  [
    {
      id: "madrugada-seg",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-seg-1",
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
      id: "worship-seg-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-seg",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-seg",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-seg",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-seg",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-seg",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-seg",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-seg-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ],
  // TERÇA a SÁBADO (repete o mesmo que segunda, exceto quarta)
  [
    {
      id: "madrugada-ter",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-ter-1",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "06:00",
      endTime: "07:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "manha-com-cristo-ter",
      title: "Manhã com Cristo",
      host: "Lucas Martins",
      startTime: "07:00",
      endTime: "12:00",
      description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
    },
    {
      id: "worship-ter-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-ter",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-ter",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-ter",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-ter",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-ter",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-ter",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-ter-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ],
  // QUARTA (índice 3) - Live Show às 20h
  [
    {
      id: "madrugada-quarta",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-quarta-1",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "06:00",
      endTime: "07:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "manha-com-cristo-quarta",
      title: "Manhã com Cristo",
      host: "Lucas Martins",
      startTime: "07:00",
      endTime: "12:00",
      description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
    },
    {
      id: "worship-quarta-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-quarta",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-quarta",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-quarta",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-quarta",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-quarta",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-quarta",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-quarta-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ],
  // QUINTA a SÁBADO (repete o mesmo que segunda)
  [
    {
      id: "madrugada-quinta",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-quinta-1",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "06:00",
      endTime: "07:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "manha-com-cristo-quinta",
      title: "Manhã com Cristo",
      host: "Lucas Martins",
      startTime: "07:00",
      endTime: "12:00",
      description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
    },
    {
      id: "worship-quinta-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-quinta",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-quinta",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-quinta",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-quinta",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-quinta",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-quinta",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-quinta-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ],
  // SEXTA (índice 5)
  [
    {
      id: "madrugada-sexta",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-sexta-1",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "06:00",
      endTime: "07:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "manha-com-cristo-sexta",
      title: "Manhã com Cristo",
      host: "Lucas Martins",
      startTime: "07:00",
      endTime: "12:00",
      description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
    },
    {
      id: "worship-sexta-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-sexta",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-sexta",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-sexta",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-sexta",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-sexta",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-sexta",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-sexta-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ],
  // SÁBADO (índice 6)
  [
    {
      id: "madrugada-sabado",
      title: "Madrugada com Cristo",
      host: "Samuel Andrade",
      startTime: "00:00",
      endTime: "06:00",
      description: "Comece seu dia com a Palavra de Deus e louvores que renovam sua alma.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp"
    },
    {
      id: "worship-sabado-1",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "06:00",
      endTime: "07:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "manha-com-cristo-sabado",
      title: "Manhã com Cristo",
      host: "Lucas Martins",
      startTime: "07:00",
      endTime: "12:00",
      description: "Uma manhã abençoada com mensagens de fé e música gospel inspiradora.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp"
    },
    {
      id: "worship-sabado-2",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "12:00",
      endTime: "13:00",
      description: "Adoração contínua com os melhores louvores nacionais e internacionais.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    },
    {
      id: "tarde-gospel-sabado",
      title: "Tarde Gospel",
      host: "Rafael Costa",
      startTime: "13:00",
      endTime: "16:00",
      description: "A melhor seleção de músicas gospel para sua tarde.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp"
    },
    {
      id: "non-stop-sabado",
      title: "Praise FM Non Stop",
      host: "",
      startTime: "16:00",
      endTime: "17:00",
      description: "Louvores sem parar — música gospel ininterrupta para você se conectar com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_FM_Non_Stop_jzk8wz.webp"
    },
    {
      id: "nova-geracao-sabado",
      title: "Praise FM Nova Geração",
      host: "Ana Paula",
      startTime: "17:00",
      endTime: "18:00",
      description: "Música gospel contemporânea para a nova geração de adoradores.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp"
    },
    {
      id: "de-carona-sabado",
      title: "De Carona com a Praise FM",
      host: "Bruno Almeida",
      startTime: "18:00",
      endTime: "20:00",
      description: "Conversas, entrevistas e músicas gospel para você curtir na estrada ou em casa.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp"
    },
    {
      id: "live-show-sabado",
      title: "Praise FM Live Show",
      host: "",
      startTime: "20:00",
      endTime: "21:00",
      description: "Transmissão ao vivo com interação e músicas gospel exclusivas.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Praise_Fm_Live_Show_blfy7o.webp"
    },
    {
      id: "classicos-sabado",
      title: "Praise FM Brasil Clássicos",
      host: "Rodrigo Veras",
      startTime: "21:00",
      endTime: "22:00",
      description: "Clássicos eternos da música gospel brasileira.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp"
    },
    {
      id: "worship-sabado-fim",
      title: "Praise FM Worship Brasil",
      host: "",
      startTime: "22:00",
      endTime: "00:00",
      description: "Adoração contínua para encerrar seu dia em paz com Deus.",
      image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Praise_FM_Worship_jv3c0c.webp"
    }
  ]
];