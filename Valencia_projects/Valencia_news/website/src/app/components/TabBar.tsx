'use client'

const TABS = [
  { value: 'all',        label: 'Всё' },
  { value: 'news',       label: '📰 Новости' },
  { value: 'events',     label: '🎭 Афиша' },
  { value: 'tourism',    label: '🏖️ Туризм' },
  { value: 'gastronomy', label: '🍷 Гастрономия' },
]

interface TabBarProps {
  active: string
  onChange: (value: string) => void
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {TABS.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={[
            'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            active === tab.value
              ? 'bg-white text-teal-700 shadow-md'
              : 'bg-white/10 text-white hover:bg-white/20',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
