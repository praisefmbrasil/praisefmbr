// ... (mantenha os imports e interfaces iguais)

// Na linha 46 (aproximadamente), dentro do useEffect de carregar histórico:
const loadSavedHistory = async () => {
  setLoadingHistory(true);
  try {
    const { data } = await supabase
      .from('program_history')
      .select('*')
      .eq('program_id', program.id)
      .order('played_at', { ascending: false })
      .limit(100);

    if (data && data.length > 0) {
      const grouped: DailyHistory = {};
      // CORREÇÃO AQUI: Tipando o item do banco de dados
      data.forEach((item: { 
        played_at: string; 
        artist: string; 
        title: string; 
        label?: string; 
        image_url: string 
      }) => {
        const date = item.played_at.split('T')[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push({
          artist: item.artist,
          title: item.title,
          label: item.label || "TOCADA ANTERIORMENTE",
          image: item.image_url,
          timestamp: new Date(item.played_at).getTime(),
          isLive: false
        });
      });
      setHistoryGroups(grouped);
      localStorage.setItem(`history_v2_${program.id}`, JSON.stringify(grouped));
    }
  } catch (err) {
    console.error("Falha ao carregar histórico", err);
  } finally {
    setLoadingHistory(false);
  }
};

// ... (Restante do código)

// Na renderização do botão de Voltar:
<button 
  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onBack();
  }} 
  className="flex items-center text-gray-400 hover:text-white transition-colors group mb-6"
>
  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Voltar ao Início</span>
</button>