import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";

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
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser({ id: data.session.user.id, email: data.session.user.email });
        fetchFavorites(data.session.user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email });
        fetchFavorites(session.user.id);
      } else {
        setUser(null);
        setFavorites([]);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const fetchFavorites = async (userId: string) => {
    const { data, error } = await supabase
      .from<FavoriteItem>("favorites")
      .select("*")
      .eq("user_id", userId);

    if (!error && data) setFavorites(data);
  };

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(f => f.id === item.id);
  };

  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    if (isFavorite(item)) {
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("id", item.id);
      setFavorites(prev => prev.filter(f => f.id !== item.id));
    } else {
      await supabase.from("favorites").insert([{ ...item, user_id: user.id }]);
      setFavorites(prev => [...prev, item]);
    }
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { user: null, error: error.message };
    const u = data.user ? { id: data.user.id, email: data.user.email } : null;
    setUser(u);
    return { user: u, error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error: error.message };
    const u = data.user ? { id: data.user.id, email: data.user.email } : null;
    setUser(u);
    return { user: u, error: null };
  };

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
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
