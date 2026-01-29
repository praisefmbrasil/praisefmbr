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

  // Busca favoritos do banco de dados
  const fetchFavorites = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      if (error.code === 'PGRST103') {
        console.warn("Tabela 'favorites' não encontrada no Supabase.");
      } else {
        console.error("Erro ao buscar favoritos:", error.message);
      }
    }
  };

  useEffect(() => {
    // 1. Estado inicial: verifica se já existe uma sessão ativa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchFavorites(session.user.id);
      setLoading(false);
    });

    // 2. Listener de mudanças de autenticação (Login, Logout, Refresh)
    // ✅ CORREÇÃO: Estrutura correta para extrair subscription no Supabase v2
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      
      if (currentUser) {
        await fetchFavorites(currentUser.id);
      } else {
        setFavorites([]);
      }

      if (event === 'SIGNED_OUT') {
        window.location.hash = '#/login'; // Redirecionamento simples
      }
      
      setLoading(false);
    });

    // Cleanup: Remove o ouvinte quando o componente é desmontado
    return () => subscription.unsubscribe();
  }, []);

  const toggleFavorite = async (item: any) => {
    if (!user) {
      alert("Você precisa estar logado para favoritar.");
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
          title: item.title || 'Sem título',
          subtitle: item.host || item.author || item.subtitle || '',
          image: item.image || '',
        };
        
        const { data, error } = await supabase
          .from('favorites')
          .insert([newItem])
          .select()
          .single();
          
        if (error) throw error;
        if (data) setFavorites(prev => [...prev, data]);
      }
    } catch (err: any) {
      console.error("Erro na operação de favoritos:", err.message);
      alert("Erro ao atualizar favoritos. Verifique a tabela no banco de dados.");
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some(f => String(f.item_id) === String(id));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshFavorites = async () => {
    if (user) await fetchFavorites(user.id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, session, loading, favorites, 
      toggleFavorite, isFavorite, signOut, refreshFavorites 
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
