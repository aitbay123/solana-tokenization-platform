import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TokenizeHero } from "@/components/tokenize/tokenize-hero"
import { AssetTypeSelector } from "@/components/tokenize/asset-type-selector"

export default function TokenizePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TokenizeHero />
        <AssetTypeSelector />
      </main>
      <Footer />
    </div>
  )
}
