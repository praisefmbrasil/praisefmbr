import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Certifique-se de que o caminho está correto
import { User } from '@supabase/supabase-js';

interface Favorite {
  id?: string;
  item_id: string;
  item_type: 'music' | 'devotional';
  title: string;
  subtitle: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  favorites: Favorite[];
  loading: boolean;
  toggleFavorite: (item: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar sessão ativa ao carregar
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchFavorites(session.user.id);
      }
      setLoading(false);
    };

    initializeAuth();

    // 2. Escutar mudanças na autenticação (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchFavorites(currentUser.id);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Buscar favoritos do banco de dados
  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    }
  };

  // Função principal para adicionar/remover favoritos
  const toggleFavorite = async (item: any) => {
    if (!user) {
      alert("Por favor, faça login para salvar em sua biblioteca.");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.item_id === item.id);

    try {
      if (isFavorite) {
        // Remover do Supabase
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_id', item.id);

        if (error) throw error;

        // Atualizar estado local para feedback instantâneo
        setFavorites(prev => prev.filter(fav => fav.item_id !== item.id));
      } else {
        // Mapear dados para o banco
        const newFav = {
          user_id: user.id,
          item_id: item.id,
          item_type: item.type || 'music', // fallback para music
          title: item.title,
          subtitle: item.subtitle || item.artist,
          image: item.image,
        };

        const { error } = await supabase
          .from('favorites')
          .insert([newFav]);

        if (error) throw error;

        // Adicionar ao estado local
        setFavorites(prev => [...prev, newFav as Favorite]);
      }
    } catch (error: any) {
      console.error('Erro ao atualizar biblioteca:', error.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
  };

  return (
    <AuthContext.Provider value={{ user, favorites, loading, toggleFavorite, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};