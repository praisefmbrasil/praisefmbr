// src/types.ts

// Usuário autenticado
export interface User {
  id: string;
  email: string | null;
  full_name?: string | null;
}

// Item que pode ser favorito
export interface FavoriteItem {
  id: string;
  type: "program" | "track" | "devotional" | "artist";
  title: string;
  subtitle?: string;
  image?: string;
}

// Item no banco de dados (com user_id)
export interface FavoriteDB extends FavoriteItem {
  user_id: string;
}

// Programa da grade
export interface Program {
  id: string;
  title: string;
  host: string;
  description?: string;
  image: string;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}
