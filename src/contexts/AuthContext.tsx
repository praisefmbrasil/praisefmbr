import { createContext, useContext, useState, ReactNode } from "react";
import { FavoriteItem } from "../types";
import { supabase } from "../lib/supabaseClient";

interface AuthContextType {
  user: any | null;
  favorites: FavoriteItem[];
  isFavorite: (item: FavoriteItem) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const isFavorite = (item: FavoriteItem) => {
    return favorites.some(fav => fav.id === item.id && fav.type === item.type);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item)) {
      setFavorites(favs => favs.filter(fav => !(fav.id === item.id && fav.type === item.type)));
    } else {
      setFavorites(favs => [...favs, item]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, favorites, isFavorite, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
