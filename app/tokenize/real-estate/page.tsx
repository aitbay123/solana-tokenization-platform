import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RealEstateTokenizeForm } from "@/components/tokenize/real-estate-form"

export default function RealEstateTokenizePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Токенизация недвижимости</h1>
              <p className="text-xl text-muted-foreground">
                Создайте токены для вашей коммерческой или жилой недвижимости
              </p>
            </div>
            <RealEstateTokenizeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
