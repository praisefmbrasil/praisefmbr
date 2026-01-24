import { useLiveMetadata } from '../hooks/useLiveMetadata';

export function LivePlayerBar() {
  const { artist, title } = useLiveMetadata();

  return (
    <div className="glass-effect fixed bottom-0 w-full p-4 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-praise-orange text-xs font-black uppercase tracking-widest">Ao Vivo</span>
        <h3 className="text-white font-bold truncate">{title}</h3>
        <p className="text-gray-400 text-sm truncate">{artist}</p>
      </div>
      {/* Botões de Play/Pause aqui */}
    </div>
  );
}