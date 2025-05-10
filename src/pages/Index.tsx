
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VibesGallery from '@/components/VibesGallery';
import OutfitRecommendation from '@/components/OutfitRecommendation';
import Footer from '@/components/Footer';
import TrendingOutfits from '@/components/TrendingOutfits';
import StepGuide from '@/components/StepGuide';

function Index() {
  // Create empty wardrobeItems array for homepage display
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <StepGuide />
      
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
          <OutfitRecommendation 
            wardrobeItems={wardrobeItems} 
            isLoading={isLoading} 
          />
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
