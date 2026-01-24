import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Mail, Camera, Save, Loader2, ArrowLeft, ShieldCheck, Upload } from 'lucide-react';
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
        throw new Error('Você deve selecionar uma imagem para upload.');
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
      setMessage({ type: 'success', text: 'Foto enviada! Não esqueça de salvar as alterações.' });

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erro ao fazer upload da imagem.' });
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
      <div className="bg-black text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 text-[10px] font-black uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Minha Conta</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4 flex flex-col items-center">
            
            {/* Foto de Perfil */}
            <div 
              className="relative w-48 h-48 group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-white/5 border-[3px] border-[#ff6600] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-white">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-[#ff6600]" />
                ) : profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <User className="w-12 h-12 mb-2" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-center px-4">Upload Foto</span>
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-[9px] font-black uppercase tracking-widest">Alterar</span>
              </div>

              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <h2 className="mt-8 text-3xl font-black uppercase tracking-tighter dark:text-white text-center">
              {profile.username || 'Ouvinte Praise'}
            </h2>
            <div className="flex items-center mt-2 space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#ff6600]" />
              <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">ID Praise Verificado</p>
            </div>

            <button 
              onClick={signOut}
              className="mt-12 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] hover:underline transition-all"
            >
              Sair de todos os dispositivos
            </button>
          </div>

          <div className="md:col-span-8">
            <form onSubmit={handleUpdate} className="space-y-10">
              {message && (
                <div className={`p-5 text-xs font-bold uppercase tracking-widest border-l-4 animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-600' : 'bg-red-50 text-red-600 border-red-600'}`}>
                  {message.text}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center">
                  <User className="w-3 h-3 mr-2" /> Nome de Exibição
                </label>
                <input 
                  type="text"
                  required
                  value={profile.username}
                  onChange={(e) => setProfile({...profile, username: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent focus:border-[#ff6600] p-5 outline-none transition-all dark:text-white text-lg font-bold"
                  placeholder="Seu Nome"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center">
                  <Mail className="w-3 h-3 mr-2" /> Endereço de E-mail
                </label>
                <input 
                  type="email"
                  disabled
                  value={profile.email}
                  className="w-full bg-gray-100 dark:bg-white/10 p-5 outline-none text-gray-500 font-bold cursor-not-allowed border-2 border-transparent"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full md:w-auto bg-[#ff6600] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-black transition-all flex items-center justify-center space-x-4 disabled:opacity-50 shadow-2xl active:scale-95"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>

            <div className="mt-20 p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <div className="flex items-start space-x-5">
                <Upload className="w-6 h-6 text-[#ff6600]" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">Upload Direto Ativado</h4>
                  <p className="text-xs text-gray-500 mt-2 uppercase leading-relaxed font-bold">
                    Você pode clicar no seu avatar para enviar uma imagem. Utilizamos Supabase Storage para manter seus dados seguros e criptografados.
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