import { readFile } from 'fs/promises'
import path from 'path'
import type { ExportFile } from '@/types'
import { CHANNELS } from '@/types'
import Header from './components/Header'
import Feed from './components/Feed'
import Footer from './components/Footer'

async function loadData(): Promise<ExportFile[]> {
  const dataDir = path.join(process.cwd(), 'public', 'data')
  const results: ExportFile[] = []

  for (const { id: channel } of CHANNELS) {
    try {
      const raw = await readFile(path.join(dataDir, `${channel}.json`), 'utf-8')
      results.push(JSON.parse(raw) as ExportFile)
    } catch {
      results.push({ updated_at: '', channel, articles: [] })
    }
  }

  return results
}

export default async function HomePage() {
  const data = await loadData()

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%)' }}
    >
      <Header />
      <Feed data={data} />
      <Footer />
    </div>
  )
}
