import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

/* =========================
   TYPES
========================= */

export interface FavoriteItem {
  id: string;
  title: string;
  host: string;
  image: string;
  type: 'program' | 'track';
}

interface FavoriteRow {
  item_id: string;
  title: string;
  host: string;
  image_url: string;
  item_type: 'program' | 'track';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: FavoriteItem[];
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  toggleFavorite: (item: FavoriteItem) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

/* =========================
   CONTEXT
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  /* =========================
     AUTH SESSION
  ========================= */

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        loadFavorites(session.user.id);
      } else {
        setFavorites([]);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =========================
     FAVORITES
  ========================= */

  const loadFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from<FavoriteRow>('user_favorites')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (data) {
        const formatted: FavoriteItem[] = data.map((fav) => ({
          id: fav.item_id,
          title: fav.title,
          host: fav.host,
          image: fav.image_url,
          type: fav.item_type,
        }));

        setFavorites(formatted);
      }
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  /* =========================
     AUTH ACTIONS
  ========================= */

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { error };
    } catch (err) {
      return { error: err };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) return { error };

      if (data.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: name,
            email,
            created_at: new Date().toISOString(),
          },
        ]);
      }

      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  /* =========================
     FAVORITE TOGGLE
  ========================= */

  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    const exists = favorites.some((f) => f.id === item.id);

    try {
      if (exists) {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', item.id);

        setFavorites((prev) =>
          prev.filter((f) => f.id !== item.id)
        );
      } else {
        await supabase.from('user_favorites').insert([
          {
            user_id: user.id,
            item_id: item.id,
            item_type: item.type,
            title: item.title,
            host: item.host,
            image_url: item.image,
            created_at: new Date().toISOString(),
          },
        ]);

        setFavorites((prev) => [...prev, item]);
      }
    } catch (err) {
      console.error('Erro ao alternar favorito:', err);
    }
  };

  const isFavorite = (id: string) =>
    favorites.some((f) => f.id === id);

  /* =========================
     PROVIDER VALUE
  ========================= */

  const value: AuthContextType = {
    user,
    loading,
    favorites,
    signIn,
    signUp,
    signOut,
    toggleFavorite,
    isFavorite,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   HOOK
========================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }
  return context;
};
