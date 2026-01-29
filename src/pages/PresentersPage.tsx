// src/data/presenters.ts
export interface Presenter {
  id: string;
  name: string;
  image: string;
  bio: string;
  programTitle: string;
  programId: string;
  weekday?: string;
}

export const PRESENTERS: Presenter[] = [
  {
    id: "1",
    name: "Samuel Andrade",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Samuel_Andrade_vbvhtd.webp",
    bio: "A voz serena das suas madrugadas. Samuel traz momentos de oração profunda e louvores que preparam o seu espírito para o novo dia.",
    programTitle: "Madrugada com Cristo",
    programId: "1"
  },
  {
    id: "2",
    name: "Lucas Martins",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Lucas_Martins_weoryq.webp",
    bio: "Comece seu dia com muita fé e energia. Lucas apresenta as principais novidades da música cristã e reflexões que edificam sua manhã.",
    programTitle: "Manhã com Cristo",
    programId: "3"
  },
  {
    id: "3",
    name: "Rafael Costa",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rafael_Costa_a7mlpu.webp",
    bio: "Sua tarde com os maiores sucessos do mundo gospel. Rafael traz interatividade e alegria para o seu horário de trabalho.",
    programTitle: "Tarde Gospel",
    programId: "5"
  },
  {
    id: "4",
    name: "Ana Paula",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Ana_Paula_nqsvtl.webp",
    bio: "Uma entusiasta dos novos talentos. Ana Paula apresenta a nova geração de artistas e os lançamentos mais frescos do worship nacional.",
    programTitle: "Praise FM Nova Geração",
    programId: "7"
  },
  {
    id: "5",
    name: "Bruno Almeida",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Bruno_Almeida_xsixw6.webp",
    bio: "Sua melhor companhia na volta para casa. Bruno mistura os hits do momento com histórias inspiradoras e muita descontração no trânsito.",
    programTitle: "De Carona com a Praise FM",
    programId: "8"
  },
  {
    id: "6",
    name: "Rodrigo Veras",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Rodrigo_Veras_vpjwxi.webp",
    bio: "Um mergulho na história da adoração. Rodrigo resgata os hinos inesquecíveis e as canções que marcaram gerações de cristãos no Brasil.",
    programTitle: "Praise FM Brasil Clássicos",
    programId: "10"
  },
  {
    id: "7",
    name: "Felipe Santos",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205840/Felipe_Santos_a2bdvs.webp",
    bio: "Um pregador apaixonado pela Palavra. Felipe traz mensagens que transformam vidas e edificam a fé dos ouvintes no Dia do Senhor.",
    programTitle: "Domingo com Cristo",
    programId: "3",
    weekday: "sunday"
  },
  {
    id: "8",
    name: "Thiago Moreira",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769205841/Thiago_Moreira_yicuhk.webp",
    bio: "Especialista em música pop gospel, Thiago apresenta os maiores sucessos nacionais e internacionais para os amantes do estilo contemporâneo.",
    programTitle: "Praise FM POP",
    programId: "9",
    weekday: "sunday"
  }
];