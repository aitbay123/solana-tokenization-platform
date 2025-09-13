import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TokenizationWizard } from "@/components/tokenize/tokenization-wizard"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#070812]">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Tokenize Your</span>{" "}
                <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                  Assets
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transform your real-world assets into digital tokens on Solana blockchain
              </p>
            </div>
            <TokenizationWizard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
