import Header from './components/Header'
import Feed from './components/Feed'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%)' }}
    >
      <Header />
      <Feed />
      <Footer />
    </div>
  )
}
