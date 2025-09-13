import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AssetCategories } from "@/components/asset-categories"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070812]">
      <Header />
      <main>
        <Hero />
        <AssetCategories />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}
