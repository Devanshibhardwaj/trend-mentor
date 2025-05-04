
import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import GalleryCarousel from './gallery/GalleryCarousel';

const LUXURY_ITEMS = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    title: "Timeless Elegance Collection",
    description: "Hand-crafted Italian leather goods embodying the essence of traditional craftsmanship with modern sensibilities, each piece telling a unique story of artisanal excellence.",
    audioGuide: "https://example.com/audio-guide-1.mp3"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200", 
    title: "Modern Heritage Series",
    description: "Where contemporary design meets timeless tradition, featuring garments that seamlessly blend innovative tailoring techniques with classic silhouettes for the discerning fashionista.",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1592842232655-e5d345cbc2d0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    title: "Avant-Garde Accessories",
    description: "Pushing the boundaries of conventional design, these statement pieces challenge perceptions while maintaining an unwavering commitment to quality and distinctive style.",
    audioGuide: "https://example.com/audio-guide-3.mp3"
  }
];

const LuxuryShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections = [
    { title: "Featured Collections", content: <GalleryCarousel items={LUXURY_ITEMS} /> },
    { title: "Designer Spotlight", content: <DesignerSpotlight /> },
    { title: "Limited Editions", content: <LimitedEditions /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('luxury-showcase');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isElementVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isElementVisible && !isVisible) {
          setIsVisible(true);
          controls.start("visible");
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls, isVisible]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section 
      id="luxury-showcase"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium uppercase tracking-wider">Curated Experience</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6 leading-tight">
              Discover Our Exquisite Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in a gallery of fashion excellence, where each piece tells a story of craftsmanship and innovation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8 mt-12">
            {sections.map((section, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button 
                  className="w-full p-6 flex justify-between items-center text-left bg-background hover:bg-accent/5 transition-colors"
                  onClick={() => setActiveSection(activeSection === index ? null : index)}
                >
                  <h3 className="text-xl font-medium">{section.title}</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${activeSection === index ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeSection === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Placeholder components for other sections
const DesignerSpotlight = () => (
  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
    <Button onClick={() => toast.info("Designer details coming soon!")}>
      View Designer Profiles
    </Button>
  </div>
);

const LimitedEditions = () => (
  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
    <Button onClick={() => toast.info("Limited editions will be available soon!")}>
      View Limited Editions
    </Button>
  </div>
);

export default LuxuryShowcase;
