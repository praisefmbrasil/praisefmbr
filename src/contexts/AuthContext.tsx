import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  favorites: any[];
  toggleFavorite: (item: any) => Promise<void>;
  isFavorite: (id: string) => boolean;
  signOut: () => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Busca sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchFavorites(session.user.id);
      setLoading(false);
    });

    // Escuta mudanças no estado de autenticação (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        fetchFavorites(currentUser.id);
      } else {
        setFavorites([]);
      }
      
      if (event === 'SIGNED_OUT') {
        window.location.hash = '#/login';
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);
      
      if (error) {
        if (error.code === 'PGRST103') {
          console.warn("Aviso Praise FM: Tabela 'favorites' não encontrada no banco de dados.");
        } else {
          console.error("Erro ao buscar favoritos:", error.message);
        }
        return;
      }
      setFavorites(data || []);
    } catch (e: any) {
      console.error("Erro inesperado:", e.message);
    }
  };

  const refreshFavorites = async () => {
    if (user) await fetchFavorites(user.id);
  };

  const toggleFavorite = async (item: any) => {
    if (!user) {
      alert("Por favor, faça login para favoritar este conteúdo.");
      return;
    }

    const itemIdString = String(item.id || item.item_id);
    const existing = favorites.find(f => String(f.item_id) === itemIdString);
    
    try {
      if (existing) {
        // Remover dos favoritos
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existing.id);
          
        if (error) throw error;
        setFavorites(prev => prev.filter(f => f.id !== existing.id));
      } else {
        // Adicionar aos favoritos
        const newItem = {
          user_id: user.id,
          item_id: itemIdString,
          item_type: item.type || 'track',
          title: item.title,
          subtitle: item.host || item.artist || item.subtitle || '',
          image: item.image || item.artwork,
        };
        
        const { data, error } = await supabase
          .from('favorites')
          .insert([newItem])
          .select();
          
        if (error) throw error;
        if (data) setFavorites(prev => [...prev, data[0]]);
      }
    } catch (err: any) {
      console.error("Erro ao atualizar favoritos:", err.message);
      if (err.code === 'PGRST103') {
        alert("Configuração necessária: A tabela de favoritos ainda não foi criada no Supabase.");
      }
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => String(f.item_id) === String(id));
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e: any) {
      console.error("Erro ao sair:", e.message);
    } finally {
      setUser(null);
      setSession(null);
      setFavorites([]);
      window.location.hash = '#/login';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      favorites, 
      toggleFavorite, 
      isFavorite, 
      signOut,
      refreshFavorites 
    }}>
      {!loading && children}
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