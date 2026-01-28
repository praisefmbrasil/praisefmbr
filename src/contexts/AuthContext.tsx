// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export interface User {
  id: string;
  email: string;
}

export type FavoriteItem = {
  id: string;
  type: "program" | "track" | "devotional" | "artist";
  title: string;
  image?: string;
  subtitle?: string;
};

interface AuthContextType {
  user: User | null;
  favorites: FavoriteItem[];
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isFavorite: (item: FavoriteItem) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Inicializa usuário logado
  useEffect(() => {
    const session = supabase.auth.session();
    if (session?.user) {
      setUser({ id: session.user.id, email: session.user.email! });
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => listener?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(f => f.id === item.id && f.type === item.type);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item)) {
      setFavorites(prev => prev.filter(f => !(f.id === item.id && f.type === item.type)));
    } else {
      setFavorites(prev => [...prev, item]);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, favorites, signUp, signIn, signOut, isFavorite, toggleFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
