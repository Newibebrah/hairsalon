import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ResultsGallery } from './components/sections/ResultsGallery';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { TeamSection } from './components/sections/TeamSection';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main id="main">
          <HeroSection />
          <ResultsGallery />
          <ProductShowcase />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;