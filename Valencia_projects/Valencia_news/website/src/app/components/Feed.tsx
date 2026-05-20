'use client'
import { useState, useEffect } from 'react'
import type { Article, ExportFile } from '@/types'
import { CHANNELS } from '@/types'
import TabBar from './TabBar'
import ArticleCard from './ArticleCard'

export default function Feed() {
  const [activeTab, setActiveTab] = useState('all')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all(
      CHANNELS.map(({ id }) =>
        fetch(`/data/${id}.json`)
          .then(r => r.ok ? r.json() as Promise<ExportFile> : null)
          .catch(() => null)
      )
    ).then(results => {
      const all = results
        .filter((r): r is ExportFile => r !== null)
        .flatMap(f => f.articles)
      setArticles(all)
      setLoading(false)
    })
  }, [])

  const filtered = activeTab === 'all'
    ? articles
    : articles.filter(a => a.channel === activeTab)

  const now = Date.now()
  const sorted = [...filtered].sort((a, b) => {
    const ta = new Date(a.published_at).getTime()
    const tb = new Date(b.published_at).getTime()
    if (isNaN(ta) && isNaN(tb)) return 0
    if (isNaN(ta)) return 1
    if (isNaN(tb)) return -1
    const aFuture = ta > now
    const bFuture = tb > now
    // Будущие события — ближайшие первыми (по возрастанию)
    if (aFuture && bFuture) return ta - tb
    // Прошедшие — новейшие первыми (по убыванию)
    if (!aFuture && !bFuture) return tb - ta
    // Прошедшие перед будущими в общей ленте
    return aFuture ? 1 : -1
  })

  return (
    <>
      <div
        className="sticky z-40 px-4 py-3"
        style={{ top: '56px', background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <TabBar active={activeTab} onChange={setActiveTab} />
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
