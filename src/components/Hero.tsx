```tsx
import React, { useState, useEffect, useMemo } from 'react'
import { Play, Pause, ChevronRight } from 'lucide-react'
import { SCHEDULES } from '../constants'
import { Program } from '../types'

const getBrazilInfo = () => {
  const now = new Date()

  const brazilString = now.toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo',
  })

  const brazilDate = new Date(brazilString)

  const h = brazilDate.getHours()
  const m = brazilDate.getMinutes()
  const day = brazilDate.getDay()

  return {
    day,
    totalMinutes: h * 60 + m,
  }
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
  liveMetadata?: {
    artist: string
    title: string
    artwork?: string
  } | null
  onNavigateToProgram: (program: Program) => void
}

const Hero: React.FC<HeroProps> = ({
  onListenClick,
  isPlaying,
  liveMetadata,
  onNavigateToProgram,
}) => {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const brazil = useMemo(() => getBrazilInfo(), [tick])

  const { currentProgram, upNextPrograms } = useMemo(() => {
    const currentDay = brazil.day
    const nextDay = (currentDay + 1) % 7

    const scheduleToday = Array.isArray(SCHEDULES[currentDay])
      ? SCHEDULES[currentDay]
      : SCHEDULES[1]

    const scheduleTomorrow = Array.isArray(SCHEDULES[nextDay])
      ? SCHEDULES[nextDay]
      : SCHEDULES[1]

    const currentIndex = scheduleToday.findIndex((p) => {
      const startTime = parseTime(p.startTime)
      const endTime = parseTime(p.endTime)

      const start = startTime.h * 60 + startTime.m
      let end = endTime.h * 60 + endTime.m

      if (end === 0 || end <= start) {
        end = 24 * 60
      }

      return (
        brazil.totalMinutes >= start &&
        brazil.totalMinutes < end
      )
    })

    const current =
      currentIndex !== -1
        ? scheduleToday[currentIndex]
        : scheduleToday[0]

    let next: Program[] = []

    if (currentIndex !== -1) {
      const restOfToday = scheduleToday.slice(currentIndex + 1)

      next = [
        ...restOfToday,
        ...scheduleTomorrow,
      ].slice(0, 3)
    } else {
      next = scheduleToday.slice(1, 4)
    }

    return {
      currentProgram: current || null,
      upNextPrograms: next,
    }
  }, [brazil])

  const progress = useMemo(() => {
    if (!currentProgram) return 0

    const startTime = parseTime(currentProgram.startTime)
    const endTime = parseTime(currentProgram.endTime)

    const start = startTime.h * 60 + startTime.m
    let end = endTime.h * 60 + endTime.m

    if (end === 0 || end <= start) {
      end = 24 * 60
    }

    const elapsed = brazil.totalMinutes - start
    const duration = end - start

    if (duration <= 0) return 0

    return Math.min(
      Math.max(elapsed / duration, 0),
      1
    )
  }, [currentProgram, brazil.totalMinutes])

  if (!currentProgram) {
    return null
  }

  const circleSize = 190
  const strokeWidth = 6

  const center = circleSize / 2
  const radius = (circleSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <section className="bg-white dark:bg-[#121212] text-gray-950 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">

        {/* PROGRAMA NO AR */}
        <div className="flex flex-col md:grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center border-b border-gray-300 dark:border-white/10 pb-8 md:pb-10">

          {/* CAPA + PROGRESSO */}
          <div
            className="relative w-[190px] h-[190px] mx-auto md:mx-0 flex-shrink-0 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 rounded-full"
            onClick={() => onNavigateToProgram(currentProgram)}
          >
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox={'0 0 ' + circleSize + ' ' + circleSize}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                className="text-gray-300 dark:text-gray-700"
                opacity={0.3}
              />

              <circle
                cx={center}
                cy={center}
                r={radius}
                stroke="#ff6600"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* IMAGEM DO PROGRAMA */}
            <div className="absolute inset-[14px] rounded-full overflow-hidden bg-gray-200 shadow-lg">
              <img
                src={currentProgram.image}
                alt={currentProgram.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RADIO 2 */}
            <div className="absolute -right-3 bottom-1 w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-4xl font-black border-4 border-white dark:border-[#121212] shadow-lg pointer-events-none">
              2
            </div>
          </div>

          {/* INFORMAÇÕES DO PROGRAMA */}
          <div className="text-center md:text-left w-full">

            {/* AO VIVO + HORÁRIO */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-2">
              <span className="font-black text-[#ff6600]">
                AO VIVO
              </span>

              <span className="text-gray-500">
                ·
              </span>

              <span className="text-gray-500">
                {currentProgram.startTime} - {currentProgram.endTime}
              </span>
            </div>

            {/* TÍTULO DO PROGRAMA */}
            <button
              onClick={() => onNavigateToProgram(currentProgram)}
              className="group text-center md:text-left w-full md:w-auto"
            >
              <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-950 dark:text-white">
                {currentProgram.title}

                <ChevronRight
                  className="inline-block w-7 h-7 md:w-8 md:h-8 ml-1 text-[#ff6600] transition-transform group-hover:translate-x-1"
                />
              </h1>
            </button>

            {/* MÚSICA TOCANDO / HOST */}
            <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-400">
              {liveMetadata?.artist
                ? `${liveMetadata.artist} - ${liveMetadata.title}`
                : currentProgram.host || 'Praise FM Brasil'}
            </p>

            {/* BOTÃO PLAYER */}
            <button
              onClick={onListenClick}
              className="mt-6 bg-[#ff6600] hover:bg-[#e65c00] text-white px-10 md:px-12 py-3 md:py-4 font-black text-lg transition active:scale-95 inline-flex items-center justify-center gap-3 mx-auto md:mx-0 rounded-xl shadow-lg shadow-orange-500/20"
            >
              {isPlaying ? (
                <Pause
                  size={22}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={22}
                  fill="currentColor"
                />
              )}

              {isPlaying ? 'Pausar' : 'Ouvir Agora'}
            </button>
          </div>
        </div>

        {/* PRÓXIMOS 3 PROGRAMAS */}
        {upNextPrograms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-gray-300 dark:border-white/10">

            {upNextPrograms.map((prog, index) => (
              <div
                key={prog.id || index}
                className="flex gap-4 text-left group items-center bg-gray-100 dark:bg-[#1A1A1A] p-4 rounded-2xl"
              >
                {/* CAPA */}
                <div
                  className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                  onClick={() => onNavigateToProgram(prog)}
                >
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* INFORMAÇÕES */}
                <button
                  onClick={() => onNavigateToProgram(prog)}
                  className="min-w-0 text-left flex-1"
                >
                  <p className="text-[11px] font-black text-[#ff6600] uppercase tracking-wide mb-0.5">
                    {prog.startTime} - {prog.endTime}
                  </p>

                  <h3 className="text-sm font-bold leading-tight group-hover:text-[#ff6600] transition-colors truncate text-gray-950 dark:text-white">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {prog.host || 'Praise FM Brasil'}
                  </p>
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  )
}

export default Hero
```
