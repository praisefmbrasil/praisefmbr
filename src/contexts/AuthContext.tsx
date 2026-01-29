import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, AuthChangeEvent } from "@supabase/supabase-js";
import type { FavoriteItem, User } from "../types";

// Contexto
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

// Função auxiliar para criar o registro de favorito
const createFavoriteRecord = (item: FavoriteItem, userId: string) => ({
  ...item,
  user_id: userId,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Observa alterações de auth
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const userData: User = { id: session.user.id, email: session.user.email ?? null };
          setUser(userData);
          fetchFavorites(session.user.id);
        } else {
          setUser(null);
          setFavorites([]);
        }
      }
    );
    return () => listener?.subscription.unsubscribe();
  }, []);

  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("favorites") // tipo minimal
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;

      // Filtra user_id
      const cleaned: FavoriteItem[] = (data || []).map((d: any) => {
        const { user_id, ...rest } = d;
        return rest;
      });
      setFavorites(cleaned);
    } catch (err) {
      console.error("Erro ao buscar favoritos:", err);
      setFavorites([]);
    }
  };

  const isFavorite = (item: FavoriteItem) => favorites.some(f => f.id === item.id);

  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    const wasFavorite = isFavorite(item);
    const optimistic = wasFavorite ? favorites.filter(f => f.id !== item.id) : [...favorites, item];
    setFavorites(optimistic);

    try {
      if (wasFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert([createFavoriteRecord(item, user.id)]);
        if (error) throw error;
      }
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
      setFavorites(wasFavorite ? [...favorites, item] : favorites.filter(f => f.id !== item.id));
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { user: null, error: error.message };
    return { user: data.user ? { id: data.user.id, email: data.user.email ?? null } : null, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    return { user: data.user ? { id: data.user.id, email: data.user.email ?? null } : null, error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, favorites, isFavorite, toggleFavorite, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
