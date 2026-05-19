'use client'
import { useState } from 'react'
import type { Article, ExportFile } from '@/types'
import TabBar from './TabBar'
import ArticleCard from './ArticleCard'

interface FeedProps {
  data: ExportFile[]
}

export default function Feed({ data }: FeedProps) {
  const [activeTab, setActiveTab] = useState('all')

  const all: Article[] = data.flatMap(f => f.articles)

  const filtered = activeTab === 'all'
    ? all
    : all.filter(a => a.channel === activeTab)

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  )

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
        {sorted.length === 0 ? (
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
