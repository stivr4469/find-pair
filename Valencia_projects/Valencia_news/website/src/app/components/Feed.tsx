'use client'
import { useState, useEffect } from 'react'
import type { Article, ExportFile } from '@/types'
import { CHANNELS } from '@/types'
import TabBar from './TabBar'
import ArticleCard from './ArticleCard'

// Каналы с «живыми» новостями — показываем только самый свежий день
const NEWS_CHANNELS = new Set(['news', 'tourism', 'gastronomy'])

// Группировка источников афиши по подкатегориям
const EVENT_SOURCE_GROUP: Record<string, string> = {
  'Palau de la Música': 'music',
  'Les Arts': 'music',
  'Valencia CF': 'sport',
  'Valencia.es Agenda': 'city',
  'IVAM': 'exhibitions',
  'CCCC Exposiciones': 'exhibitions',
  'Museo Bellas Artes Valencia': 'exhibitions',
  'Oceanogràfic Valencia': 'exhibitions',
  'Feria Valencia': 'exhibitions',
}

const EVENT_FILTERS = [
  { value: 'all',         label: 'Все' },
  { value: 'city',        label: '🏛️ Город' },
  { value: 'music',       label: '🎵 Музыка' },
  { value: 'sport',       label: '⚽ Спорт' },
  { value: 'exhibitions', label: '🖼️ Выставки' },
]

function latestDayOnly(articles: Article[]): Article[] {
  if (articles.length === 0) return articles
  // Находим самую позднюю дату публикации (не будущую)
  const now = Date.now()
  const past = articles.filter(a => new Date(a.published_at).getTime() <= now)
  if (past.length === 0) return articles

  const maxTs = Math.max(...past.map(a => new Date(a.published_at).getTime()))
  // Берём статьи опубликованные в тот же календарный день (UTC)
  const maxDate = new Date(maxTs).toISOString().slice(0, 10)
  return articles.filter(a => a.published_at.startsWith(maxDate))
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState('all')
  const [eventsFilter, setEventsFilter] = useState('all')
  const [byChannel, setByChannel] = useState<Record<string, Article[]>>({})
  const [loading, setLoading] = useState(true)

  function handleTabChange(tab: string) {
    setActiveTab(tab)
    setEventsFilter('all')
  }

  useEffect(() => {
    Promise.all(
      CHANNELS.map(({ id }) =>
        fetch(`/data/${id}.json`)
          .then(r => r.ok ? r.json() as Promise<ExportFile> : null)
          .catch(() => null)
      )
    ).then(results => {
      const map: Record<string, Article[]> = {}
      results.forEach((r, i) => {
        const id = CHANNELS[i].id
        const raw = r?.articles ?? []
        map[id] = NEWS_CHANNELS.has(id) ? latestDayOnly(raw) : raw
      })
      setByChannel(map)
      setLoading(false)
    })
  }, [])

  const baseFiltered: Article[] = activeTab === 'all'
    ? CHANNELS.flatMap(({ id }) => byChannel[id] ?? [])
    : (byChannel[activeTab] ?? [])

  const filtered: Article[] = (activeTab === 'events' && eventsFilter !== 'all')
    ? baseFiltered.filter(a => EVENT_SOURCE_GROUP[a.source_name] === eventsFilter)
    : baseFiltered

  const now = Date.now()
  const sorted = [...filtered].sort((a, b) => {
    const ta = new Date(a.published_at).getTime()
    const tb = new Date(b.published_at).getTime()
    if (isNaN(ta) && isNaN(tb)) return 0
    if (isNaN(ta)) return 1
    if (isNaN(tb)) return -1
    const aFuture = ta > now
    const bFuture = tb > now
    if (aFuture && bFuture) return ta - tb   // события: ближайшие первыми
    if (!aFuture && !bFuture) return tb - ta  // новости: свежие первыми
    return aFuture ? 1 : -1                   // новости перед событиями
  })

  return (
    <>
      <div
        className="sticky z-40 px-4 py-3"
        style={{ top: '56px', background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <TabBar active={activeTab} onChange={handleTabChange} />
          {activeTab === 'events' && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-2">
              {EVENT_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setEventsFilter(f.value)}
                  className={[
                    'flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all',
                    eventsFilter === f.value
                      ? 'bg-white/30 text-white shadow'
                      : 'bg-white/10 text-white/70 hover:bg-white/20',
                  ].join(' ')}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-4">
        {loading ? (
          <p className="text-center py-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Загрузка…
          </p>
        ) : sorted.length === 0 ? (
          <p className="text-center py-16" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Нет материалов в этом разделе
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {sorted.map(a => (
              <ArticleCard key={`${a.channel}-${a.id}`} article={a} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
