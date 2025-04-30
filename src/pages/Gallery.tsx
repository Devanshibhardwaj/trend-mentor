
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, ChevronLeft, ChevronRight, Pause, Play, Image, HeadphonesIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Define exhibit data structure
interface Exhibit {
  id: string;
  title: string;
  description: string;
  image: string;
  audioSrc?: string;
  audioDescription?: string;
}

const exhibits: Exhibit[] = [
  {
    id: "exhibit-1",
    title: "The Harmony Collection",
    description: "Explore our premier collection that blends form and function in perfect harmony. Each piece tells a story of craftsmanship and innovation.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    audioSrc: "/audio/exhibit1.mp3",
    audioDescription: "Welcome to the Harmony Collection. Curator James Miller guides you through this innovative exhibition that explores the relationship between design and functionality."
  },
  {
    id: "exhibit-2",
    title: "Seasonal Transformations",
    description: "Witness how style evolves through the seasons, adapting to environmental changes while maintaining core aesthetic principles.",
    image: "https://images.unsplash.com/photo-1528219089976-968cc23f21d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    audioSrc: "/audio/exhibit2.mp3",
    audioDescription: "The Seasonal Transformations exhibit demonstrates how style adapts to weather and seasonal changes. Our curator explains the philosophy behind each piece."
  },
  {
    id: "exhibit-3",
    title: "Heritage & Innovation",
    description: "A juxtaposition of traditional craftsmanship and cutting-edge techniques, showcasing the evolution of style through time.",
    image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    audioSrc: "/audio/exhibit3.mp3",
    audioDescription: "This exhibit examines the delicate balance between honoring traditions while embracing new technologies and techniques in design."
  },
  {
    id: "exhibit-4",
    title: "Minimalist Expressions",
    description: "Less becomes more in this striking collection that focuses on essential elements and clean, purposeful design.",
    image: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    audioSrc: "/audio/exhibit4.mp3",
    audioDescription: "The Minimalist Expressions gallery showcases how simplicity and restraint can create powerful visual impact and timeless appeal."
  }
];

const Gallery = () => {
  const [currentExhibit, setCurrentExhibit] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAudioGuide, setShowAudioGuide] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const exhibitRef = useRef<HTMLDivElement>(null);
  const [audioAvailable, setAudioAvailable] = useState(false);

  // Set up audio player
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    
    const handleEnded = () => {
      setIsAudioPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Change audio source when exhibit changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
      setProgress(0);
      
      if (exhibits[currentExhibit].audioSrc) {
        setAudioAvailable(true);
        audioRef.current.src = exhibits[currentExhibit].audioSrc || '';
      } else {
        setAudioAvailable(false);
      }
    }
  }, [currentExhibit]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        toast.error("Audio couldn't be played. Make sure audio files are available.");
      });
    }
    
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newProgress = value[0];
    setProgress(newProgress);
    
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    }
  };

  const nextExhibit = () => {
    setCurrentExhibit((prev) => (prev === exhibits.length - 1 ? 0 : prev + 1));
  };

  const prevExhibit = () => {
    setCurrentExhibit((prev) => (prev === 0 ? exhibits.length - 1 : prev - 1));
  };

  const toggleFullscreen = () => {
    if (!exhibitRef.current) return;
    
    if (!isFullscreen) {
      if (exhibitRef.current.requestFullscreen) {
        exhibitRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleAudioGuide = () => {
    setShowAudioGuide(!showAudioGuide);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Gallery header */}
        <div className="py-12 px-6 md:px-10 text-center bg-gray-50">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The StyleSage Gallery
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Walk through our curated exhibits exploring the art of style
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border-black/20 hover:bg-black/5"
              onClick={toggleAudioGuide}
            >
              <HeadphonesIcon className="h-4 w-4" />
              Audio Guide
            </Button>
          </motion.div>
        </div>
        
        {/* Gallery navigation indicators */}
        <div className="flex justify-center py-4">
          {exhibits.map((_, index) => (
            <button 
              key={index}
              className={cn(
                "w-3 h-3 rounded-full mx-2 transition-all",
                currentExhibit === index 
                  ? "bg-black" 
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              onClick={() => setCurrentExhibit(index)}
              aria-label={`Go to exhibit ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Exhibit display */}
        <div className="px-6 md:px-10 py-8">
          <div 
            ref={exhibitRef}
            className="max-w-6xl mx-auto rounded-xl overflow-hidden relative"
          >
            <motion.div
              key={currentExhibit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[16/9] w-full relative"
            >
              {/* Image frame with spotlight effect */}
              <div className="absolute inset-0 border-[16px] md:border-[24px] border-[#f8f8f8] rounded-xl shadow-xl z-10"></div>
              
              {/* Spotlight effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/20"></div>
              
              {/* Exhibit image */}
              <img 
                src={exhibits[currentExhibit].image} 
                alt={exhibits[currentExhibit].title}
                className="w-full h-full object-cover"
              />
              
              {/* Exhibit information overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black to-transparent text-white">
                <h2 className="text-2xl md:text-3xl font-serif mb-2">
                  {exhibits[currentExhibit].title}
                </h2>
                <p className="text-white/90 max-w-xl">
                  {exhibits[currentExhibit].description}
                </p>
                
                <div className="flex items-center gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-white border-white/30 bg-white/10 hover:bg-white/20"
                    onClick={() => toast.info("View details coming soon!")}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Navigation controls */}
            <button 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center z-20 shadow-lg hover:bg-white"
              onClick={prevExhibit}
              aria-label="Previous exhibit"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center z-20 shadow-lg hover:bg-white"
              onClick={nextExhibit}
              aria-label="Next exhibit"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Audio guide panel */}
        {showAudioGuide && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-30"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-gray-700" />
                  <span className="font-medium">Audio Guide</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleAudioGuide}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Close
                </Button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {audioAvailable 
                  ? exhibits[currentExhibit].audioDescription 
                  : "No audio guide available for this exhibit."}
              </p>
              
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                  onClick={toggleAudio}
                  disabled={!audioAvailable}
                >
                  {isAudioPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                
                <div className="flex-1">
                  <Slider
                    value={[progress]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleProgressChange}
                    disabled={!audioAvailable}
                    className={audioAvailable ? "" : "opacity-50"}
                  />
                </div>
                
                <div className="text-sm text-gray-500 min-w-[60px]">
                  {audioAvailable 
                    ? `${Math.floor(progress)}%` 
                    : "N/A"}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
