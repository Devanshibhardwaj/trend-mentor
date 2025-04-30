
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface CosmicSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onLocationDetect: () => void;
  popularLocations: string[];
  loading?: boolean;
}

const CosmicSearch = ({
  value,
  onChange,
  onSearch,
  onLocationDetect,
  popularLocations,
  loading = false
}: CosmicSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  
  // Close popular locations dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowPopular(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(value);
      setShowPopular(false);
    } else if (e.key === 'Escape') {
      setShowPopular(false);
    } else if (e.key === 'ArrowDown') {
      setShowPopular(true);
    }
  };
  
  // Theme-specific colors
  const getGlowColor = () => {
    switch (theme) {
      case 'nautical': return 'from-blue-500/20';
      case 'sunset': return 'from-orange-500/20';
      case 'forest': return 'from-green-500/20';
      case 'galaxy': return 'from-purple-500/20';
      default: return 'from-primary/20';
    }
  };
  
  const getStarColor = () => {
    switch (theme) {
      case 'nautical': return 'bg-blue-400';
      case 'sunset': return 'bg-orange-400';
      case 'forest': return 'bg-green-400';
      case 'galaxy': return 'bg-purple-400';
      default: return 'bg-primary';
    }
  };

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cosmic glow effect */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            className={`absolute -inset-1 -z-10 bg-gradient-radial ${getGlowColor()} to-transparent rounded-lg opacity-50`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      {/* Animated stars */}
      <AnimatePresence>
        {isFocused && (
          <>
            <motion.div
              className={`absolute w-1 h-1 rounded-full ${getStarColor()} -top-1 -right-1`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              exit={{ scale: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            />
            <motion.div
              className={`absolute w-1 h-1 rounded-full ${getStarColor()} top-1/2 -left-2`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              exit={{ scale: 0 }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
            />
            <motion.div
              className={`absolute w-1 h-1 rounded-full ${getStarColor()} -bottom-1 right-1/4`}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              exit={{ scale: 0 }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "loop" }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative flex gap-2">
        <div className="relative flex-grow" ref={inputRef}>
          <Input
            className={`backdrop-blur-sm bg-background/60 border-white/20 ${isFocused ? 'ring-1 ring-white/30' : ''}`}
            placeholder="Enter your location"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowPopular(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          />
          
          {value && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => onChange('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          
          {/* Popular locations dropdown */}
          <AnimatePresence>
            {showPopular && popularLocations.length > 0 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-1 backdrop-blur-sm bg-background/60 border border-white/20 rounded-md shadow-lg z-10"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-1">
                  {popularLocations.map((location, index) => (
                    <motion.div
                      key={location}
                      className="px-3 py-1.5 rounded-sm hover:bg-white/10 cursor-pointer text-sm"
                      onClick={() => {
                        onChange(location);
                        onSearch(location);
                        setShowPopular(false);
                      }}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {location}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Button
          className={`backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20`}
          onClick={() => {
            onSearch(value);
            setShowPopular(false);
          }}
          disabled={loading}
        >
          {loading ? (
            <motion.div 
              className="w-4 h-4 border-2 border-t-transparent border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          variant="outline"
          className="backdrop-blur-sm bg-white/5 border border-white/20 hover:bg-white/10"
          onClick={() => {
            onLocationDetect();
            setShowPopular(false);
          }}
          disabled={loading}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CosmicSearch;
