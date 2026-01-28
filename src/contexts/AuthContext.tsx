import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface FavoriteItem {
  id: string;
  title: string;
  host: string;
  image: string;
  type: 'program' | 'track';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  favorites: FavoriteItem[];
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Carregar usuário e favoritos
  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadFavorites(session.user.id);
      }
      setLoading(false);
    });

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadFavorites(session.user.id);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar favoritos do usuário
  const loadFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      if (data) {
        const formattedFavorites: FavoriteItem[] = data.map(fav => ({
          id: fav.item_id,
          title: fav.title,
          host: fav.host,
          image: fav.image_url,
          type: fav.item_type
        }));
        setFavorites(formattedFavorites);
      }
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  // Função de Login
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  // Função de Cadastro
  const signUp = async (email: string, password: string, name: string) => {
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

      // Se o cadastro foi bem-sucedido e o usuário foi criado
      if (data.user) {
        // Criar perfil do usuário na tabela profiles (se existir)
        try {
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              full_name: name,
              email: email,
              created_at: new Date().toISOString(),
            },
          ]);
        } catch (profileError) {
          console.log('Perfil não criado (tabela pode não existir):', profileError);
        }
      }

      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  // Função de Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  // Toggle Favorito
  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    const isFav = favorites.some(f => f.id === item.id);

    if (isFav) {
      // Remover favorito
      try {
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', item.id);

        setFavorites(prev => prev.filter(f => f.id !== item.id));
      } catch (err) {
        console.error('Erro ao remover favorito:', err);
      }
    } else {
      // Adicionar favorito
      try {
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

        setFavorites(prev => [...prev, item]);
      } catch (err) {
        console.error('Erro ao adicionar favorito:', err);
      }
    }
  };

  // Verificar se é favorito
  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id);
  };

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};