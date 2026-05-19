import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Валенсия — новости и события',
  description: 'Новости, афиша, туризм и гастрономия Валенсии для русскоязычных',
  openGraph: {
    title: '🌊 Валенсия — новости и события',
    description: 'Свежие новости, афиша и гастрономия Валенсии',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
