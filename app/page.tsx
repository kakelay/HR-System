import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { CEOMessage } from "@/components/ceo-message";
import { QuickLook } from "@/components/quick-look";
import { MainContent } from "@/components/main-content";
import { DesktopNavigation } from "@/components/desktop-navigation";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="max-h-screen bg-gray-50">
      <Header />
      <DesktopNavigation />
      <main>
        <HeroCarousel />
        {/* ❌ Removed container and padding classes */}
        <div className="py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
            <div className="xl:col-span-3 space-y-4 sm:space-y-6">
              <CEOMessage />
              <MainContent />
            </div>
            <div className="xl:col-span-1 order-first xl:order-last">
              <QuickLook />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
