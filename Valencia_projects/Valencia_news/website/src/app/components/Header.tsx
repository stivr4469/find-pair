'use client'
import { useEffect, useState } from 'react'

const TG_CHANNELS = [
  { emoji: '📰', label: 'Новости', href: 'https://t.me/Esp_Valencia_news' },
  { emoji: '🎭', label: 'Афиша', href: 'https://t.me/Esp_Valencia_events' },
  { emoji: '🏖️', label: 'Туризм', href: 'https://t.me/Esp_Spain_travel' },
  { emoji: '🍷', label: 'Гастрономия', href: 'https://t.me/Esp_Spain_food' },
]

interface TickerItem { title: string; id: number }
interface WeatherData { temp: string; desc: string; wind: string; cloud: string }

function latestDayTitles(articles: { id: number; title_ru: string; published_at: string }[]): TickerItem[] {
  const now = Date.now()
  const past = articles.filter(a => new Date(a.published_at).getTime() <= now)
  if (!past.length) return []
  const maxDate = new Date(Math.max(...past.map(a => new Date(a.published_at).getTime())))
    .toISOString().slice(0, 10)
  return articles
    .filter(a => a.published_at.startsWith(maxDate) && a.title_ru)
    .map(a => ({ title: a.title_ru, id: a.id }))
}

function upcomingEventTitles(articles: { id: number; title_ru: string; published_at: string }[]): TickerItem[] {
  const now = Date.now()
  return articles
    .filter(a => new Date(a.published_at).getTime() > now && a.title_ru)
    .sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
    .slice(0, 30)
    .map(a => ({ title: a.title_ru, id: a.id }))
}

function StaticMarquee() {
  const text = 'Валенсия — все новости и события в одном месте'
  return (
    <div className="overflow-hidden py-1 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="marquee-inner flex whitespace-nowrap" style={{ animationDuration: '30s' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex-shrink-0 px-8 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            ✦ {text}
          </span>
        ))}
      </div>
    </div>
  )
}

function Marquee({ items, color, speed = 40 }: { items: TickerItem[]; color: string; speed?: number }) {
  if (!items.length) return null
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-1" style={{ background: 'rgba(0,0,0,0.15)' }}>
      <div className="marquee-inner flex whitespace-nowrap" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <a
            key={i}
            href={`/#article-${item.id}`}
            className="flex-shrink-0 px-6 text-xs hover:underline transition-opacity hover:opacity-100"
            style={{ color, opacity: 0.55 }}
          >
            ✦ {item.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [newsTicker, setNewsTicker] = useState<TickerItem[]>([])
  const [eventsTicker, setEventsTicker] = useState<TickerItem[]>([])

  useEffect(() => {
    fetch('https://wttr.in/Valencia?format=j1')
      .then(r => r.ok ? r.json() : null)
      .then((data: Record<string, unknown> | null) => {
        if (!data) return
        const current = (data.current_condition as Record<string, unknown>[])?.[0]
        if (!current) return
        const temp = current.temp_C as string
        const desc = (current.lang_ru as Record<string, string>[])?.[0]?.value || ''
        const wind = current.windspeedKmph as string
        const cloud = current.cloudcover as string
        if (temp) setWeather({ temp, desc, wind, cloud })
      })
      .catch(() => {})

    fetch('/data/news.json')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.articles) setNewsTicker(latestDayTitles(d.articles)) })
      .catch(() => {})

    fetch('/data/events.json')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.articles) setEventsTicker(upcomingEventTitles(d.articles)) })
      .catch(() => {})
  }, [])

  const weatherLine = weather
    ? [`${weather.temp}°C`, weather.desc, weather.wind ? `💨 ${weather.wind} км/ч` : '', weather.cloud ? `☁️ ${weather.cloud}%` : '']
        .filter(Boolean).join('  ')
    : ''

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-black text-lg tracking-wide whitespace-nowrap">🌊 ВАЛЕНСИЯ</span>
          {weatherLine && <span className="text-white/60 text-sm truncate">{weatherLine}</span>}
        </div>
        <nav className="flex gap-1.5 flex-shrink-0">
          {TG_CHANNELS.map(ch => (
            <a key={ch.href} href={ch.href} target="_blank" rel="noopener noreferrer" title={ch.label}
              className="text-white/80 hover:text-white text-base bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all">
              {ch.emoji}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <StaticMarquee />
        <Marquee items={newsTicker} color="#a5f3fc" speed={50} />
        <Marquee items={eventsTicker} color="#fde68a" speed={40} />
      </div>

      <style>{`
        .marquee-inner {
          animation: marquee-scroll linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  )
}
