// src/data/artists.ts
export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  biography: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
}

export const ARTISTS: Artist[] = [
  {
    id: "1",
    name: "Fernandinho",
    genre: "Worship Contemporâneo",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp",
    biography: "Um dos maiores nomes da música gospel brasileira, Fernandinho é conhecido por suas canções de adoração que tocam milhões de corações pelo Brasil e mundo afora. Sua voz suave e letras profundamente espirituais fazem dele um dos artistas mais queridos da cena gospel.",
    socialLinks: {
      instagram: "fernandinhooficial",
      youtube: "fernandinhooficial",
      spotify: "fernandinho"
    }
  },
  {
    id: "2",
    name: "Isaias Saad",
    genre: "Adoração Profética",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp",
    biography: "Ministro de louvor e compositor, Isaias Saad é reconhecido por suas canções proféticas e ministrações que levam os ouvintes a uma experiência profunda de comunhão com Deus. Suas músicas são marcadas por letras bíblicas e melodias envolventes.",
    socialLinks: {
      instagram: "isaiassaad",
      youtube: "isaiassaadoficial",
      spotify: "isaiassaad"
    }
  },
  {
    id: "3",
    name: "Gabriela Rocha",
    genre: "Pop Gospel",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp",
    biography: "Com uma voz poderosa e carismática, Gabriela Rocha conquistou o Brasil e o mundo com suas canções de adoração contemporânea. Suas músicas combinam elementos do pop com letras profundamente espirituais, alcançando milhões de jovens em todo o planeta.",
    socialLinks: {
      instagram: "gabrielarocha",
      youtube: "gabrielarochaoficial",
      spotify: "gabrielarocha"
    }
  },
  {
    id: "4",
    name: "Aline Barros",
    genre: "Gospel Infantil / Adoração",
    image: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp",
    biography: "Referência na música gospel brasileira há mais de 30 anos, Aline Barros é conhecida por suas canções que edificam gerações. Com um ministério que alcança crianças, jovens e adultos, suas músicas são verdadeiros hinos de fé que marcaram a história da música cristã no Brasil.",
    socialLinks: {
      instagram: "alinebarros",
      youtube: "alinebarrosoficial",
      spotify: "alinebarros"
    }
  }
];