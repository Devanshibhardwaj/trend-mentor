import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VibesGallery from '@/components/VibesGallery';
import OutfitRecommendation from '@/components/OutfitRecommendation';
import Footer from '@/components/Footer';
import TrendingOutfits from '@/components/TrendingOutfits';

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4">
        <section className="py-12">
          <Hero />
        </section>
        
        <section className="py-12">
          <HowItWorks />
        </section>
        
        <section className="py-12" id="trending-looks">
          <TrendingOutfits />
        </section>
        
        <section className="py-12">
          <VibesGallery />
        </section>
        
        <section className="py-12">
          <OutfitRecommendation />
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
