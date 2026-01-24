// No topo do arquivo, substitua os imports
import { getDailyBrazilianPlaylist } from '../utils/mockTracks';

// Remova MASTER_ARTISTS e ARCHIVE_DATA (opcional, mas vamos manter o archive)

// Dentro do componente Playlist:
const Playlist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState<number | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Simula carregamento rápido
    const loadPlaylist = () => {
      const dailyTracks = getDailyBrazilianPlaylist().map((t, idx) => ({
        ...t,
        trackId: t.trackId, // já tem ID único
        previewUrl: '' // não usaremos preview por enquanto
      }));
      setTracks(dailyTracks);
      setLoading(false);
    };

    const timer = setTimeout(loadPlaylist, 800); // pequeno delay para UX
    return () => clearTimeout(timer);
  }, []);

  // Mantenha togglePreview (mesmo sem áudio, o botão funciona visualmente)
  const togglePreview = (track: Track) => {
    // Opcional: adicionar aviso "Pré-visualização não disponível"
    console.log("Pré-visualização desativada para esta versão.");
  };

  // ... resto do componente igual (aList, bList, cList, renderização)
};