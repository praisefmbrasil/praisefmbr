import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session, AuthChangeEvent } from '@supabase/supabase-js';

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

interface FavoriteDB extends FavoriteItem {
  user_id: string;
}

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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          const userData: User = { 
            id: session.user.id, 
            email: session.user.email ?? null
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

  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from<FavoriteDB, unknown>("favorites")
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

  const isFavorite = (item: FavoriteItem): boolean => {
    return favorites.some(f => f.id === item.id);
  };

  const toggleFavorite = async (item: FavoriteItem): Promise<void> => {
    if (!user) return;
    
    const wasFavorite = isFavorite(item);
    const optimisticUpdate = wasFavorite 
      ? favorites.filter(f => f.id !== item.id) 
      : [...favorites, item];

    setFavorites(optimisticUpdate);

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
          .from<FavoriteDB, unknown>("favorites")
          .insert([{ ...item, user_id: user.id } as FavoriteDB]);
        
        if (error) throw error;
      }
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
      setFavorites(wasFavorite ? [...favorites, item] : favorites.filter(f => f.id !== item.id));
      throw err;
    }
  };

  const signUp = async (
    email: string, 
    password: string
  ): Promise<{ user: User | null; error: string | null }> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) return { user: null, error: error.message };
    
    return { 
      user: data.user ? { 
        id: data.user.id, 
        email: data.user.email ?? null
      } : null, 
      error: null 
    };
  };

  const signIn = async (
    email: string, 
    password: string
  ): Promise<{ user: User | null; error: string | null }> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) return { user: null, error: error.message };
    
    return { 
      user: data.user ? { 
        id: data.user.id, 
        email: data.user.email ?? null
      } : null, 
      error: null 
    };
  };

  const signOut = async (): Promise<void> => {
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
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};