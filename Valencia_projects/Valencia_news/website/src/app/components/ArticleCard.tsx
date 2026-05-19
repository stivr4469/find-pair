import type { Article } from '@/types'
import { isSafeUrl } from '@/lib/url'

const CHANNEL_EMOJI: Record<string, string> = {
  news: '📰',
  events: '🎭',
  tourism: '🏖️',
  gastronomy: '🍷',
}

function formatRelativeTime(iso: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return 'только что'
  if (h < 24) return `${h}ч назад`
  const d = Math.floor(h / 24)
  if (d < 8) return `${d}д назад`
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      className="rounded-2xl border border-white/20 overflow-hidden flex flex-col"
      style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
    >
      {isSafeUrl(article.image_url) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.image_url}
          alt={article.title_ru}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          <span>{CHANNEL_EMOJI[article.channel] ?? '📄'}</span>
          <span className="truncate">{article.source_name}</span>
          <span>·</span>
          <span className="whitespace-nowrap">{formatRelativeTime(article.published_at)}</span>
        </div>

        <h2 className="text-white font-semibold text-[15px] leading-snug mb-2">
          {article.title_ru}
        </h2>

        <p
          className="text-sm leading-relaxed mb-3 flex-1"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {article.summary_ru}
        </p>

        <a
          href={isSafeUrl(article.url) ? article.url : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium transition-colors mt-auto"
          style={{ color: '#ccfbf1' }}
          onMouseOver={e => (e.currentTarget.style.color = '#ffffff')}
          onMouseOut={e => (e.currentTarget.style.color = '#ccfbf1')}
        >
          Читать оригинал →
        </a>
      </div>
    </article>
  )
}
