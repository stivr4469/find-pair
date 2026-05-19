const CHANNELS = [
  { label: '📰 Новости',     href: 'https://t.me/Esp_Valencia_news' },
  { label: '🎭 Афиша',       href: 'https://t.me/Esp_Valencia_events' },
  { label: '🏖️ Туризм',     href: 'https://t.me/Esp_Spain_travel' },
  { label: '🍷 Гастрономия', href: 'https://t.me/Esp_Spain_food' },
]

export default function Footer() {
  return (
    <footer className="mt-12 pb-10 px-4">
      <div
        className="max-w-4xl mx-auto rounded-2xl p-6 text-center border border-white/20"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
      >
        <p className="text-white font-semibold mb-1">Подписывайся на наши Telegram-каналы</p>
        <p className="text-white/60 text-sm mb-4">
          Новости, афиша, туризм и гастрономия Валенсии прямо в мессенджере
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {CHANNELS.map(ch => (
            <a
              key={ch.href}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white rounded-full
                         px-5 py-2 text-sm font-medium transition-all border border-white/20"
            >
              {ch.label}
            </a>
          ))}
        </div>
      </div>
      <p className="text-white/25 text-xs text-center mt-6">
        Valencia News © 2026
      </p>
    </footer>
  )
}
