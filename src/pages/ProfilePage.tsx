import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
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

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 é "nenhum registro encontrado"

      if (data) {
        setProfile(prev => ({ 
          ...prev, 
          username: data.username || '', 
          avatar_url: data.avatar_url || '' 
        }));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`; // Usar timestamp é mais seguro que random
      const filePath = `${fileName}`;

      // 1. Upload para o Bucket 'avatars'
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // 2. Obter URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Atualizar estado local
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      setMessage({ type: 'success', text: 'Foto carregada! Não esqueça de salvar as alterações.' });

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro no upload. Verifique se o bucket "avatars" é público.' });
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
      
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Erro ao salvar perfil' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching && !profile.username) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#ff6600]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Sincronizando Praise ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300 antialiased">
      {/* Header Editorial */}
      <div className="bg-black text-white py-24 border-b border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-[#ff6600] mb-12 text-[10px] font-bold uppercase tracking-[0.4em] group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-2 transition-transform" />
            Voltar
          </button>
          <h1 className="text-6xl md:text-8xl font-medium uppercase tracking-tighter leading-none">
            Minha<br />Conta
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Coluna da Esquerda: Avatar e Status */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div 
              className="relative w-56 h-56 group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-white/5 border-[1px] border-gray-200 dark:border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-[#ff6600]">
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
                  </div>
                ) : profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <User className="w-16 h-16 mb-2 opacity-20" />
                  </div>
                )}
              </div>
              
              {/* Overlay de Upload */}
              <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
                <Camera className="w-8 h-8 mb-2 text-[#ff6600]" />
                <span className="text-[9px] font-black uppercase tracking-widest">Alterar Foto</span>
              </div>

              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <div className="text-center mt-10">
              <h2 className="text-3xl font-medium uppercase tracking-tighter dark:text-white">
                {profile.username || 'Ouvinte Praise'}
              </h2>
              <div className="flex items-center justify-center mt-3 space-x-3">
                <ShieldCheck className="w-4 h-4 text-[#ff6600]" />
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Praise ID Verificado</p>
              </div>
            </div>

            <button 
              onClick={signOut}
              className="mt-16 flex items-center space-x-3 text-red-500/60 hover:text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>Encerrar Sessão</span>
            </button>
          </div>

          {/* Coluna da Direita: Formulário */}
          <div className="lg:col-span-8">
            <form onSubmit={handleUpdate} className="space-y-12">
              {message && (
                <div className={`p-6 text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 animate-in fade-in slide-in-from-left-4 ${
                  message.type === 'success' 
                  ? 'bg-green-500/5 text-green-500 border-green-500' 
                  : 'bg-red-500/5 text-red-500 border-red-500'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="grid gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                    Nome de Exibição
                  </label>
                  <input 
                    type="text"
                    required
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 focus:border-[#ff6600] py-4 outline-none transition-all dark:text-white text-2xl font-light tracking-tight placeholder:text-gray-200 dark:placeholder:text-white/5"
                    placeholder="Como quer ser chamado?"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                    E-mail de Acesso
                  </label>
                  <div className="flex items-center border-b border-gray-100 dark:border-white/5 py-4">
                    <Mail className="w-4 h-4 mr-4 text-gray-300" />
                    <input 
                      type="email"
                      disabled
                      value={profile.email}
                      className="w-full bg-transparent outline-none text-gray-400 font-light text-xl cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full md:w-auto bg-[#ff6600] text-white px-20 py-6 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all flex items-center justify-center space-x-4 disabled:opacity-30 shadow-xl active:scale-95"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>

            {/* Info Box Estilo Editorial */}
            <div className="mt-24 p-10 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
              <div className="flex items-start space-x-6">
                <Upload className="w-6 h-6 text-[#ff6600] mt-1" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest dark:text-white mb-3">Privacidade e Dados</h4>
                  <p className="text-[11px] text-gray-500 uppercase leading-loose font-normal tracking-wider">
                    Suas informações de perfil são usadas apenas para personalizar sua experiência na Praise FM Brasil. 
                    As fotos de perfil são armazenadas de forma segura via Supabase Storage.
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