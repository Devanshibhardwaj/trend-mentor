
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NavStar {
  id: string;
  x: number;
  y: number;
  size: number;
  title: string;
  path?: string;
  color: string;
  delay: number;
}

const CelestialNavigation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<NavStar[]>([]);
  const [connections, setConnections] = useState<{from: number, to: number}[]>([]);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Generate stars based on available routes
    const navStars: NavStar[] = [
      {
        id: "home",
        x: Math.random() * 35 + 10,
        y: Math.random() * 30 + 20,
        size: 2.5,
        title: "Home",
        path: "/",
        color: "rgb(var(--primary-rgb))",
        delay: 0.1
      },
      {
        id: "wardrobe",
        x: Math.random() * 30 + 50,
        y: Math.random() * 30 + 10,
        size: 2,
        title: "Wardrobe",
        path: "/wardrobe",
        color: "#f59e0b",
        delay: 0.3
      },
      {
        id: "try-on",
        x: Math.random() * 30 + 5,
        y: Math.random() * 30 + 65,
        size: 2,
        title: "Virtual Try-On",
        path: "/virtual-try-on",
        color: "#10b981",
        delay: 0.5
      },
      {
        id: "weather",
        x: Math.random() * 30 + 60,
        y: Math.random() * 30 + 60,
        size: 2.2,
        title: "Weather Styling",
        path: "/weather-styling",
        color: "#3b82f6",
        delay: 0.7
      },
      {
        id: "gallery",
        x: Math.random() * 40 + 30,
        y: Math.random() * 20 + 40,
        size: 2.3,
        title: "Gallery",
        path: "/gallery",
        color: "#8b5cf6",
        delay: 0.9
      }
    ];
    
    setStars(navStars);
    
    // Create connections between stars
    const starConnections = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 4 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 3, to: 4 }
    ];
    
    setConnections(starConnections);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Calculate parallax effect
  const getStarStyle = (star: NavStar) => {
    const parallaxFactor = 0.02;
    const dx = (mousePosition.x - star.x) * parallaxFactor;
    const dy = (mousePosition.y - star.y) * parallaxFactor;
    
    return {
      left: `${star.x + dx}%`,
      top: `${star.y + dy}%`,
      width: `${star.size}rem`,
      height: `${star.size}rem`,
      backgroundColor: hoveredStar === star.id ? 'white' : star.color,
      boxShadow: `0 0 ${star.size * 2}px ${hoveredStar === star.id ? 'white' : star.color}`
    };
  };
  
  const handleStarHover = (id: string) => {
    setHoveredStar(id);
  };
  
  const handleStarLeave = () => {
    setHoveredStar(null);
  };
  
  const handleStarClick = (path?: string) => {
    if (!path) {
      toast.info("This feature is coming soon!");
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Fashion Cosmos</h2>
          <p className="text-muted-foreground">
            Navigate our fashion universe through an interactive star map. Each star represents a different part of our style galaxy.
          </p>
        </div>
        
        <div 
          ref={containerRef}
          className="relative h-[60vh] max-h-[500px] rounded-xl border border-border bg-black/30 backdrop-blur-sm overflow-hidden"
        >
          {/* Star particles */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/30 animate-pulse-subtle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 3}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            {connections.map((connection, i) => {
              if (!stars[connection.from] || !stars[connection.to]) return null;
              
              const from = stars[connection.from];
              const to = stars[connection.to];
              
              const isActive = 
                hoveredStar === from.id || 
                hoveredStar === to.id;
                
              return (
                <motion.line
                  key={`connection-${i}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isActive ? 0.6 : 0.15,
                    strokeWidth: isActive ? 1.5 : 0.5
                  }}
                  transition={{ duration: 0.5, delay: (from.delay + to.delay) / 2 }}
                  stroke="white"
                  strokeDasharray={isActive ? "none" : "5,5"}
                />
              );
            })}
          </svg>
          
          {/* Navigation stars */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className={cn(
                "absolute rounded-full z-20 flex items-center justify-center cursor-pointer",
                "before:content-[''] before:absolute before:inset-0 before:rounded-full before:opacity-20",
                "before:bg-current before:animate-ping-slow before:scale-150"
              )}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: star.delay }}
              style={getStarStyle(star)}
              onMouseEnter={() => handleStarHover(star.id)}
              onMouseLeave={handleStarLeave}
              onClick={() => handleStarClick(star.path)}
            >
              <Link to={star.path || "#"} className="absolute inset-0 z-30" />
              
              {/* Star icon */}
              <Star className={`h-full w-full ${hoveredStar === star.id ? 'text-white' : ''}`} />
              
              {/* Star label */}
              <motion.div 
                className="absolute whitespace-nowrap px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs font-medium transform -translate-y-[calc(100%+8px)] pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredStar === star.id ? 1 : 0,
                  y: hoveredStar === star.id ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {star.title}
              </motion.div>
              
              {/* Star glow */}
              {hoveredStar === star.id && (
                <motion.div 
                  className="absolute inset-0 rounded-full z-10 border border-white/50"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              {/* Sparkles for hovered star */}
              {hoveredStar === star.id && (
                <motion.div 
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ left: '50%', top: '50%' }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelestialNavigation;
