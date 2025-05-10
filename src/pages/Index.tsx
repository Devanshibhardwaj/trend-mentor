
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import VibesGallery from '@/components/VibesGallery';
import OutfitRecommendation from '@/components/OutfitRecommendation';
import Footer from '@/components/Footer';
import TrendingOutfits from '@/components/TrendingOutfits';
import StepGuide from '@/components/StepGuide';
import FilterBar, { FilterOptions } from '@/components/FilterBar';
import StylistChat from '@/components/StylistChat';

function Index() {
  // Create empty wardrobeItems array for homepage display
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    mood: 'all',
    weather: 'all',
    budget: 100,
    style: 'all'
  });

  useEffect(() => {
    async function fetchWardrobe() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products'); // Flipkart, Amazon, or mock data
        const data = await res.json();
        setWardrobeItems(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Use empty array if fetch fails
      } finally {
        setIsLoading(false);
      }
    }
    fetchWardrobe();
  }, []);

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
          <h2 className="text-3xl font-bold mb-6">Trending Looks</h2>
          <FilterBar filters={filters} onChange={setFilters} />
          <TrendingOutfits filters={filters} />
        </section>
        
        <section className="py-12">
          <VibesGallery />
        </section>
        
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-6">Outfit Recommendations</h2>
          <FilterBar filters={filters} onChange={setFilters} />
          <OutfitRecommendation 
            wardrobeItems={wardrobeItems} 
            isLoading={isLoading}
            filters={filters}
          />
        </section>
      </main>
      
      <Footer />
      
      {/* Add the Stylist Chat component */}
      <StylistChat />
    </div>
  );
}

export default Index;
