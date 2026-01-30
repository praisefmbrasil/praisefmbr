import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Camera, Save, Loader2, ArrowLeft, ShieldCheck, Upload, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [profile, setProfile] = useState({
    username: '',
    avatar_url: '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user?.id)
        .single();

      if (data) {
        setProfile(prev => ({ 
          ...prev, 
          username: data.username || '', 
          avatar_url: data.avatar_url || '' 
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar perfil:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem para upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      setMessage({ type: 'success', text: 'Foto carregada! Não esqueça de salvar as alterações.' });

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao carregar imagem.' });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          username: profile.username,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erro ao salvar perfil' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching && !profile.username) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header Brutalista */}
      <div className="bg-black text-white py-24 border-b-4 border-[#ff6600] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-10 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">Sua Conta</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Coluna da Foto */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div 
              className="relative w-56 h-56 group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-full h-full bg-gray-100 dark:bg-[#111] border-4 border-black dark:border-white flex items-center justify-center shadow-[10px_10px_0px_#ff6600] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none overflow-hidden">
                {uploading ? (
                  <Loader2 className="w-10 h-10 animate-spin text-[#ff6600]" />
                ) : profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <User className="w-16 h-16 mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Enviar Foto</span>
                  </div>
                )}
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Alterar</span>
              </div>

              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <h2 className="mt-12 text-4xl font-black uppercase tracking-tighter dark:text-white text-center italic">
              {profile.username || 'Ouvinte Praise'}
            </h2>
            <div className="flex items-center mt-3 space-x-2 bg-gray-100 dark:bg-white/5 px-4 py-1">
              <ShieldCheck className="w-4 h-4 text-[#ff6600]" />
              <p className="text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em]">Praise ID Verificado</p>
            </div>

            <button 
              onClick={signOut}
              className="mt-16 flex items-center space-x-2 text-red-500 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white p-3 border-2 border-red-500 transition-all w-full justify-center"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>

          {/* Coluna do Formulário */}
          <div className="md:col-span-8">
            <form onSubmit={handleUpdate} className="space-y-12">
              {message && (
                <div className={`p-6 text-xs font-black uppercase tracking-widest border-l-8 animate-in fade-in slide-in-from-top-2 shadow-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-600' : 'bg-red-50 text-red-700 border-red-600'}`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ff6600] flex items-center">
                  <User className="w-4 h-4 mr-2" /> Nome de Exibição
                </label>
                <input 
                  type="text"
                  required
                  value={profile.username}
                  onChange={(e) => setProfile({...profile, username: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-white/5 border-4 border-black dark:border-white focus:border-[#ff6600] p-6 outline-none transition-all dark:text-white text-xl font-black italic uppercase tracking-tighter"
                  placeholder="Seu Nome"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Endereço de E-mail
                </label>
                <input 
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full bg-gray-100 dark:bg-white/10 p-6 outline-none text-gray-500 font-bold cursor-not-allowed border-4 border-dashed border-gray-300 dark:border-white/10 italic text-xl uppercase tracking-tighter"
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full md:w-auto bg-[#ff6600] text-white px-16 py-6 text-[12px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all flex items-center justify-center space-x-4 disabled:opacity-50 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] active:translate-y-1 active:shadow-none"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>

            {/* Card Informativo */}
            <div className="mt-24 p-10 bg-black dark:bg-white text-white dark:text-black shadow-[15px_15px_0px_#ff6600]">
              <div className="flex items-start space-x-6">
                <Upload className="w-8 h-8 text-[#ff6600] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-black uppercase tracking-widest italic">Upload Direto Ativo</h4>
                  <p className="text-xs mt-3 uppercase leading-relaxed font-bold opacity-70">
                    Você pode clicar no seu avatar para carregar uma nova foto diretamente. Usamos tecnologia Supabase Storage para garantir que seus dados e imagens estejam sempre seguros e acessíveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;