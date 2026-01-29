// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';

// =====================
// TIPOS EXPORTADOS
// =====================
export interface User {
  id: string;
  email: string | null;
  full_name?: string | null;
}

export interface FavoriteItem {
  id: string;
  type: "program" | "track" | "devotional" | "artist";
  title: string;
  subtitle?: string;
  image?: string;
}

// Tipo interno para operações no banco
interface FavoriteDB extends FavoriteItem {
  user_id: string;
}

// Helper para criar objeto compatível com o banco
const createFavoriteDB = (item: FavoriteItem, userId: string): FavoriteDB => ({
  ...item,
  user_id: userId,
});

// =====================
// CONTEXTO
// =====================
export interface AuthContextType {
  user: User | null;
  favorites: FavoriteItem[];
  isFavorite: (item: FavoriteItem) => boolean;
  toggleFavorite: (item: FavoriteItem) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

// =====================
// PROVIDER
// =====================
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Monitora mudanças de login/logout
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email ?? null,
            full_name: session.user.user_metadata?.full_name ?? null
          };
          setUser(userData);
          fetchFavorites(session.user.id);
        } else {
          setUser(null);
          setFavorites([]);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Busca favoritos do usuário
  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from<FavoriteDB>("favorites")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      const cleanedFavorites: FavoriteItem[] = (data || []).map(({ user_id, ...item }) => item);
      setFavorites(cleanedFavorites);
    } catch (err) {
      console.error("Erro ao buscar favoritos:", err);
      setFavorites([]);
    }
  };

  // Checa se o item já está nos favoritos
  const isFavorite = (item: FavoriteItem): boolean =>
    favorites.some(f => f.id === item.id);

  // Alterna favorito
  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    const wasFavorite = isFavorite(item);
    const optimisticUpdate = wasFavorite
      ? favorites.filter(f => f.id !== item.id)
      : [...favorites, item];

    setFavorites(optimisticUpdate);

    try {
      if (wasFavorite) {
        const { error } = await supabase
          .from<FavoriteDB>("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("id", item.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from<FavoriteDB>("favorites")
          .insert([createFavoriteDB(item, user.id)]);

        if (error) throw error;
      }
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
      setFavorites(wasFavorite ? [...favorites, item] : favorites.filter(f => f.id !== item.id));
      throw err;
    }
  };

  // Signup
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { user: null, error: error.message };
    return { 
      user: data.user ? { id: data.user.id, email: data.user.email ?? null } : null,
      error: null
    };
  };

  // Signin
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    return {
      user: data.user ? { id: data.user.id, email: data.user.email ?? null } : null,
      error: null
    };
  };

  // Signout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        isFavorite,
        toggleFavorite,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
