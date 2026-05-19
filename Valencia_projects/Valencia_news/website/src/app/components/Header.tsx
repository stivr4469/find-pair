'use client'
import { useEffect, useState } from 'react'

const TG_CHANNELS = [
  { emoji: '📰', label: 'Новости', href: 'https://t.me/Esp_Valencia_news' },
  { emoji: '🎭', label: 'Афиша', href: 'https://t.me/Esp_Valencia_events' },
  { emoji: '🏖️', label: 'Туризм', href: 'https://t.me/Esp_Spain_travel' },
  { emoji: '🍷', label: 'Гастрономия', href: 'https://t.me/Esp_Spain_food' },
]

export default function Header() {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    fetch('https://wttr.in/Valencia?format=%t+%C&lang=ru')
      .then(r => r.text())
      .then(t => setWeather(t.trim()))
      .catch(() => {})
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-black text-lg tracking-wide whitespace-nowrap">
            🌊 ВАЛЕНСИЯ
          </span>
          {weather && (
            <span className="text-white/60 text-sm truncate">{weather}</span>
          )}
        </div>
        <nav className="flex gap-1.5 flex-shrink-0">
          {TG_CHANNELS.map(ch => (
            <a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              title={ch.label}
              className="text-white/80 hover:text-white text-base bg-white/10 hover:bg-white/20
                         rounded-full w-8 h-8 flex items-center justify-center transition-all"
            >
              {ch.emoji}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
