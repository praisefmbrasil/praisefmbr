import React, { useState, useEffect, useMemo } from 'react'
import { Play, Pause, ChevronRight } from 'lucide-react'
import { SCHEDULES } from '../constants'
import { Program } from '../types'
import { useNavigate } from 'react-router-dom'

const getBrazilInfo = () => {
  const now = new Date()
  const brazilString = now.toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
  })
  const brazilDate = new Date(brazilString)
  const h = brazilDate.getHours()
  const m = brazilDate.getMinutes()
  const day = brazilDate.getDay()
  return { day, totalMinutes: h * 60 + m }
}

const parseTime = (time24: string) => {
  const parts = time24.split(':')
  const h = parseInt(parts[0] || '0', 10)
  const m = parseInt(parts[1] || '0', 10)
  return { h, m }
}

interface HeroProps {
  onListenClick: () => void
  isPlaying: boolean
  liveMetadata?: { artist: string; title: string; artwork?: string } | null
  onNavigateToProgram: (program: Program) => void
}

const Hero: React.FC<HeroProps> = ({
  onListenClick,
  isPlaying,
  liveMetadata,
  onNavigateToProgram,
}) => {
  const [tick, setTick] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(interval)
  }, [])

  const brazil = useMemo(() => getBrazilInfo(), [tick])

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const schedule = Array.isArray(SCHEDULES[brazil.day]) ? SCHEDULES[brazil.day] : SCHEDULES[1]

    const currentIndex = schedule.findIndex((p) => {
      const startTime = parseTime(p.startTime)
      const endTime = parseTime(p.endTime)

      const start = startTime.h * 60 + startTime.m
      let end = endTime.h * 60 + endTime.m

      if (end === 0 || end <= start) end = 24 * 60

      return brazil.totalMinutes >= start && brazil.totalMinutes < end
    })

    const current = currentIndex !== -1 ? schedule[currentIndex] : schedule[0]
    const next =
      currentIndex !== -1
        ? schedule.slice(currentIndex + 1, currentIndex + 4)
        : schedule.slice(1, 4)

    return {
      currentProgram: current || null,
      upNextPrograms: Array.isArray(next) ? next : [],
    }
  }, [brazil])

  const progress = useMemo(() => {
    if (!currentProgram) return 0

    const startTime = parseTime(currentProgram.startTime)
    const endTime = parseTime(currentProgram.endTime)

    const start = startTime.h * 60 + startTime.m
    let end = endTime.h * 60 + endTime.m

    if (end === 0 || end <= start) end = 24 * 60

    const elapsed = brazil.totalMinutes - start
    const duration = end - start

    if (duration <= 0) return 0

    return Math.min(Math.max(elapsed / duration, 0), 1)
  }, [currentProgram, brazil.totalMinutes])

  if (!currentProgram) return null

  const circleSize = 192
  const strokeWidth = 8
  const center = circleSize / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <section className="bg-white dark:bg-[#000000] pt-10 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Bloco do Ao Vivo */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-12 mb-10">
          <div
            className="relative flex-shrink-0 group cursor-pointer"
            onClick={() => onNavigateToProgram(currentProgram)}
          >
            <div
              className="relative"
              style={{ width: circleSize, height: circleSize }}
            >
              <div
                className="rounded-full overflow-hidden absolute"
                style={{
                  top: strokeWidth + 6,
                  left: strokeWidth + 6,
                  width: circleSize - (strokeWidth + 6) * 2,
                  height: circleSize - (strokeWidth + 6) * 2,
                }}
              >
                <img
                  src={currentProgram.image}
                  alt={currentProgram.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <svg
                width={circleSize}
                height={circleSize}
                className="absolute inset-0 -rotate-90 pointer-events-none"
              >
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="#dbdbdb"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  className="dark:stroke-white/10"
                />
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="#ff6600"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="butt"
                />
              </svg>

              <div className="absolute bottom-0 right-0 w-14 h-14 bg-black rounded-full flex items-center justify-center border-[3px] border-[#1a1a1a] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">
                <span className="text-white text-3xl font-bold">2</span>
              </div>
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="text-[11px] font-normal text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-center md:justify-start space-x-2">
              <span className="text-[#ff6600] font-black uppercase tracking-[0.2em]">AO VIVO</span>
              <span>·</span>
              <span>
                {currentProgram.startTime} - {currentProgram.endTime}
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 hover:text-[#ff6600] transition-colors cursor-pointer inline-flex items-center"
              onClick={() => onNavigateToProgram(currentProgram)}
            >
              {currentProgram.title}
              <ChevronRight className="w-8 h-8 ml-1 text-[#ff6600]" />
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 font-normal mb-6 max-w-xl">
              {liveMetadata?.title ? `${liveMetadata.artist} - ${liveMetadata.title}` : currentProgram.description}
            </p>

            <button
              onClick={onListenClick}
              className="bg-[#ff6600] text-white px-10 py-3.5 flex items-center justify-center space-x-3 hover:bg-[#e65c00] transition-all active:scale-95 mx-auto md:mx-0 rounded-md shadow-md"
            >
              {isPlaying ? (
                <Pause className="fill-current w-5 h-5" />
              ) : (
                <Play className="fill-current w-5 h-5" />
              )}
              <span className="text-lg font-bold tracking-tight">
                {isPlaying ? 'Pausar' : 'Ouvir Agora'}
              </span>
            </button>
          </div>
        </div>

        {/* Grade Horizontal de Próximos Programas (Substituindo 'Novidade na Praise') */}
        {upNextPrograms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {upNextPrograms.slice(0, 3).map((prog) => (
              <button
                key={prog.id}
                className="flex gap-4 text-left group items-center bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:hover:bg-[#252525] p-4 transition-colors w-full rounded-2xl border border-transparent dark:border-zinc-900"
                onClick={() => onNavigateToProgram(prog)}
              >
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-[#ff6600] uppercase tracking-wide mb-0.5">
                    {prog.startTime} - {prog.endTime}
                  </p>
                  <h3 className="text-sm font-bold leading-tight group-hover:text-[#ff6600] transition-colors truncate text-gray-900 dark:text-white">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {prog.host || "Praise FM Brasil"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Hero
