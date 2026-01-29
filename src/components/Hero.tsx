// ... (mantenha os imports e a lógica de tempo inalterados)

const Hero: React.FC<HeroProps> = ({ onListenClick, isPlaying, currentProgram, upNextPrograms }) => {
  return (
    <section className="bg-white dark:bg-[#000000] py-10 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          {/* Avatar com progresso */}
          <div className="relative flex-shrink-0 group cursor-pointer">
             {/* ... (SVG do círculo mantido) */}
             <div className="absolute bottom-2 right-2 w-12 h-12 bg-black rounded-full flex items-center justify-center border-[1px] border-white/20 shadow-lg">
               <span className="text-white text-2xl font-normal">2</span>
             </div>
          </div>

          <div className="flex-grow pt-4 text-center md:text-left">
            <div className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-[0.2em]">
              <span>{currentProgram.startTime} — {currentProgram.endTime}</span>
            </div>
            
            {/* Título: Grande, mas peso 500 */}
            <h2 className="text-4xl md:text-6xl font-medium text-gray-900 dark:text-white tracking-tighter mb-4 leading-none">
              {currentProgram.title} <span className="text-gray-400 font-normal ml-2">com {currentProgram.host}</span>
            </h2>
            
            <p className="text-xl text-gray-500 dark:text-gray-400 font-normal mb-8 leading-relaxed max-w-2xl">
              {currentProgram.description}
            </p>

            <button 
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-12 py-4 flex items-center justify-center space-x-3 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-sm"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span className="text-lg font-medium tracking-tight">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {/* Up Next - Estilo Lista BBC */}
        <div className="mt-20 pt-8 border-t border-gray-100 dark:border-white/10">
          <h3 className="text-[10px] font-normal text-gray-400 uppercase tracking-[0.4em] mb-10">A seguir na rádio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {upNextPrograms.map((prog) => (
              <div key={prog.id} className="flex items-start space-x-6 group">
                <div className="w-20 h-20 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                  <img src={prog.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-normal text-[#ff6600] uppercase tracking-widest">{prog.startTime}</span>
                  <h4 className="text-2xl font-normal text-gray-900 dark:text-white tracking-tight mt-1">{prog.title}</h4>
                  <p className="text-sm text-gray-500 font-normal mt-1">{prog.host}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};