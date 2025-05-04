
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GalleryCarouselProps {
  items: {
    id: string;
    image: string;
    title: string;
    description: string;
    audioGuide?: string;
  }[];
  className?: string;
}

const GalleryCarousel = ({ items, className }: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    
    touchStartX.current = null;
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    const currentCarousel = carouselRef.current;
    if (currentCarousel) {
      currentCarousel.addEventListener('touchstart', handleTouchStart);
      currentCarousel.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (currentCarousel) {
        currentCarousel.removeEventListener('touchstart', handleTouchStart);
        currentCarousel.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  useEffect(() => {
    // Stop audio when changing slides
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const toggleAudio = () => {
    if (!items[currentIndex].audioGuide) {
      toast.info("No audio guide available for this exhibit");
      return;
    }
    
    if (!audioRef.current) {
      audioRef.current = new Audio(items[currentIndex].audioGuide);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = items[currentIndex].audioGuide || '';
      audioRef.current.play().catch(err => {
        console.error("Audio play failed:", err);
        toast.error("Couldn't play audio guide");
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className={cn("relative w-full overflow-hidden", className)}
      ref={carouselRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/3] md:aspect-[16/9] w-full"
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10">
            <img
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
            <h2 className="text-xl md:text-2xl font-serif font-medium mb-2">{items[currentIndex].title}</h2>
            <p className="text-sm md:text-base text-white/80 max-w-3xl">{items[currentIndex].description}</p>
          </div>
          
          {/* Exhibit number indicator */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-20">
            {currentIndex + 1} / {items.length}
          </div>
          
          {/* Audio guide button */}
          {items[currentIndex].audioGuide && (
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-4 left-4 rounded-full bg-black/50 backdrop-blur-sm text-white z-20 ${isPlaying ? 'animate-pulse-subtle' : ''}`}
              onClick={toggleAudio}
            >
              {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-sm text-white z-20 hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-sm text-white z-20 hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Thumbnail navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
