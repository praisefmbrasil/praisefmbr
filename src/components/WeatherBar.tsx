import React, { useEffect, useState } from 'react'

interface ForecastItem {
  day: string
  temp: string
  condition: string
}

export default function WeatherBar() {
  const [forecast, setForecast] = useState<ForecastItem[]>([
    { day: 'Hoje', temp: '--°C', condition: 'Carregando...' },
    { day: 'Amanhã', temp: '--°C', condition: 'Carregando...' },
    { day: 'Próximo', temp: '--°C', condition: 'Carregando...' }
  ])

  // OpenWeatherMap
  const API_KEY = '46c6e2c5797e2e465e06600d29810afe'

  // Rio de Janeiro, RJ
  const LAT = '-22.9068'
  const LON = '-43.1729'

  const translateCondition = (condition: string) => {
    const conditions: Record<string, string> = {
      Clear: 'Céu limpo',
      Clouds: 'Nublado',
      Rain: 'Chuva',
      Drizzle: 'Garoa',
      Thunderstorm: 'Tempestade',
      Mist: 'Névoa',
      Fog: 'Neblina',
      Haze: 'Neblina',
      Smoke: 'Fumaça',
      Dust: 'Poeira',
      Sand: 'Areia',
      Ash: 'Cinzas',
      Squall: 'Rajadas',
      Tornado: 'Tornado',
      Snow: 'Neve'
    }

    return conditions[condition] || condition
  }

  useEffect(() => {
    // Celsius
    const url =
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar previsão do tempo')
        }

        return res.json()
      })
      .then((data) => {
        if (data && data.list && data.list.length > 0) {
          // Forecast em intervalos de 3 horas
          const todayData = data.list[0]
          const tomorrowData = data.list[8] || data.list[1]
          const nextDayData = data.list[16] || data.list[2]

          const daysOfWeek = [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
          ]

          // Dia atual no horário de Brasília/Rio de Janeiro
          const brazilDateString = new Date().toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo'
          })

          const brazilDate = new Date(brazilDateString)
          const todayIndex = brazilDate.getDay()

          const formatDayName = (offset: number) => {
            return daysOfWeek[(todayIndex + offset) % 7]
          }

          setForecast([
            {
              day: 'Hoje',
              temp: `${Math.round(todayData.main.temp)}°C`,
              condition: translateCondition(todayData.weather[0].main)
            },
            {
              day: 'Amanhã',
              temp: `${Math.round(tomorrowData.main.temp)}°C`,
              condition: translateCondition(tomorrowData.weather[0].main)
            },
            {
              day: formatDayName(2),
              temp: `${Math.round(nextDayData.main.temp)}°C`,
              condition: translateCondition(nextDayData.weather[0].main)
            }
          ])
        }
      })
      .catch(() => {
        setForecast([
          { day: 'Hoje', temp: '--°C', condition: 'Indisponível' },
          { day: 'Amanhã', temp: '--°C', condition: 'Indisponível' },
          { day: 'Próximo', temp: '--°C', condition: 'Indisponível' }
        ])
      })
  }, [])

  return (
    <div className="py-6 border-b border-gray-300 dark:border-white/10">
      <div className="bg-gray-100 dark:bg-[#1A1A1A] p-4 transition-colors rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#121212] shadow-sm flex items-center justify-center text-orange-500 flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h10a4 4 0 001.5-7.7A5 5 0 008.5 7.3 4.5 4.5 0 003 15z"
                />
              </svg>
            </div>

            <div>
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-wide">
                Rio de Janeiro, RJ
              </p>

              <h3 className="text-sm font-bold leading-tight">
                Previsão do Tempo
              </h3>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 dark:bg-[#121212]/60 px-3 py-2 rounded-xl text-center flex flex-col items-center justify-center min-w-[85px]"
            >
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                {item.day}
              </span>

              <span className="text-sm font-black text-gray-950 dark:text-white my-0.5">
                {item.temp}
              </span>

              <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-full">
                {item.condition}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

