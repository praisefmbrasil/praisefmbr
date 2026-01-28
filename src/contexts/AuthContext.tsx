import React, { createContext, useContext, useState } from "react";

export interface FavoriteItem {
  id: string;
  type: "program" | "track" | "devotional" | "artist";
  title: string;
  subtitle?: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;

  // Auth
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;

  // Favorites
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const signUp = async (email: string, _password: string) => {
    // mock auth (pronto pra Firebase depois)
    setUser({
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
    });
  };

  const signOut = () => {
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === item.id)
        ? prev.filter((f) => f.id !== item.id)
        : [...prev, item]
    );
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signOut,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
