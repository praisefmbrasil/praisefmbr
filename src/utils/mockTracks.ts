// src/utils/mockTracks.ts

export interface MockTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
}

const BRAZILIAN_GOSPEL_TRACKS: MockTrack[] = [
  { trackId: 1, trackName: "Restituição", artistName: "Aline Barros", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Aline_Barros_k6euug.webp" },
  { trackId: 2, trackName: "Ressuscita-me", artistName: "Gabriela Rocha", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Gabriela_Rocha_u1ipb5.webp" },
  { trackId: 3, trackName: "Me Ama", artistName: "Fernandinho", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Fernandinho_lwc71w.webp" },
  { trackId: 4, trackName: "Deus de Promessas", artistName: "Isaias Saad", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Isaias_Saad_fodxcn.webp" },
  { trackId: 5, trackName: "Tua Graça Me Basta", artistName: "Ana Paula Valadão", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ana_Paula_Valad%C3%A3o_qkqjvz.webp" },
  { trackId: 6, trackName: "Nada Além de Ti", artistName: "Davi Sacer", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Davi_Sacer_gxgkqh.webp" },
  { trackId: 7, trackName: "Tu És Fiel", artistName: "Ludmila Ferber", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ludmila_Ferber_vy8vqj.webp" },
  { trackId: 8, trackName: "Santo Espírito", artistName: "Paulo César Baruk", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Paulo_C%C3%A9sar_Baruk_wnrj1h.webp" },
  { trackId: 9, trackName: "Coragem", artistName: "Mariana Valadão", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Mariana_Valad%C3%A3o_yd1qwu.webp" },
  { trackId: 10, trackName: "Teu Nome é Amor", artistName: "Anderson Freire", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Anderson_Freire_jkqkxn.webp" },
  { trackId: 11, trackName: "Eu Creio", artistName: "Cassiane", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Cassiane_zcplqx.webp" },
  { trackId: 12, trackName: "Rei dos Séculos", artistName: "Ton Carfi", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Ton_Carfi_r1xqhk.webp" },
  { trackId: 13, trackName: "Ousado Amor", artistName: "Israel Salazar", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Israel_Salazar_wxqyvn.webp" },
  { trackId: 14, trackName: "Amor Maior", artistName: "Preto no Branco", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Preto_no_Branco_xqjvzm.webp" },
  { trackId: 15, trackName: "Me Ensina a Viver", artistName: "Nívea Soares", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/N%C3%ADvea_Soares_kxqjvm.webp" },
  { trackId: 16, trackName: "Ele Vive", artistName: "Bruna Karla", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Bruna_Karla_mqjxvn.webp" },
  { trackId: 17, trackName: "Grandioso És Tu", artistName: "André Valadão", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Andr%C3%A9_Valad%C3%A3o_nqjxvm.webp" },
  { trackId: 18, trackName: "Faz Chover", artistName: "Adhemar de Campos", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Adhemar_de_Campos_pqjxvn.webp" },
  { trackId: 19, trackName: "Quero Ser Como Você", artistName: "Cantores do Amor", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Cantores_do_Amor_rqjxvn.webp" },
  { trackId: 20, trackName: "Depende de Nós", artistName: "Oficina G3", artworkUrl100: "https://res.cloudinary.com/dlcliu2cv/image/upload/v1769214957/Oficina_G3_sqjxvn.webp" }
];

const getRotationSeed = () => Math.floor(Date.now() / (24 * 60 * 60 * 1000));

const shuffleWithSeed = (array: MockTrack[], seed: number) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % shuffled.length;
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getDailyBrazilianPlaylist = (): MockTrack[] => {
  const seed = getRotationSeed();
  const shuffled = shuffleWithSeed(BRAZILIAN_GOSPEL_TRACKS, seed);
  return shuffled.slice(0, 12);
};