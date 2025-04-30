
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind, Snowflake, CloudLightning } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CosmicNavigationProps {
  activeWeather: string | null;
  onSelectWeather: (weather: string) => void;
}

const weatherInfo = [
  { 
    id: 'sunny', 
    icon: Sun, 
    label: 'Sunny', 
    description: 'Light fabrics, breathable materials',
    color: 'yellow'
  },
  { 
    id: 'rainy', 
    icon: Droplets, 
    label: 'Rainy', 
    description: 'Waterproof materials, practical layers',
    color: 'blue'
  },
  { 
    id: 'cloudy', 
    icon: Cloud, 
    label: 'Cloudy', 
    description: 'Versatile layers, adaptable pieces',
    color: 'gray'
  },
  { 
    id: 'windy', 
    icon: Wind, 
    label: 'Windy', 
    description: 'Secure clothing, wind-resistant fabrics',
    color: 'cyan'
  },
  { 
    id: 'snowy', 
    icon: Snowflake, 
    label: 'Snowy', 
    description: 'Insulated layers, thermal protection',
    color: 'indigo'
  },
  { 
    id: 'stormy', 
    icon: CloudLightning, 
    label: 'Stormy', 
    description: 'Protective gear, high visibility elements',
    color: 'purple'
  }
];

const CosmicNavigation = ({ activeWeather, onSelectWeather }: CosmicNavigationProps) => {
  const { theme } = useTheme();
  const [hoveredWeather, setHoveredWeather] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Color mapping based on theme and weather
  const getWeatherColor = (weatherId: string, isActive: boolean) => {
    const baseColors = {
      sunny: {
        nautical: 'text-yellow-400',
        sunset: 'text-yellow-500',
        forest: 'text-yellow-300',
        galaxy: 'text-yellow-300',
        system: 'text-yellow-500',
      },
      rainy: {
        nautical: 'text-blue-400',
        sunset: 'text-blue-300',
        forest: 'text-blue-400',
        galaxy: 'text-blue-300',
        system: 'text-blue-500',
      },
      cloudy: {
        nautical: 'text-gray-400',
        sunset: 'text-gray-400',
        forest: 'text-gray-300',
        galaxy: 'text-gray-300',
        system: 'text-gray-500',
      },
      windy: {
        nautical: 'text-cyan-400',
        sunset: 'text-cyan-300',
        forest: 'text-cyan-400',
        galaxy: 'text-cyan-300',
        system: 'text-cyan-500',
      },
      snowy: {
        nautical: 'text-indigo-400',
        sunset: 'text-indigo-300',
        forest: 'text-indigo-400',
        galaxy: 'text-indigo-300',
        system: 'text-indigo-500',
      },
      stormy: {
        nautical: 'text-purple-400',
        sunset: 'text-purple-300',
        forest: 'text-purple-400',
        galaxy: 'text-purple-300',
        system: 'text-purple-500',
      }
    };
    
    const currentTheme = theme || 'system';
    const baseColor = baseColors[weatherId as keyof typeof baseColors]?.[currentTheme as keyof (typeof baseColors['sunny'])];
    
    if (isActive) {
      return baseColor || 'text-primary';
    }
    
    return (baseColor || 'text-primary').replace('text-', 'text-') + '/60';
  };
  
  // Get background glow color for active weather
  const getGlowColor = (weatherId: string) => {
    const glowMap: Record<string, Record<string, string>> = {
      sunny: {
        nautical: 'from-yellow-400/20',
        sunset: 'from-yellow-500/30',
        forest: 'from-yellow-300/20',
        galaxy: 'from-yellow-300/30',
        system: 'from-yellow-500/20',
      },
      rainy: {
        nautical: 'from-blue-400/20',
        sunset: 'from-blue-300/30',
        forest: 'from-blue-400/20',
        galaxy: 'from-blue-300/30',
        system: 'from-blue-500/20',
      },
      cloudy: {
        nautical: 'from-gray-400/20',
        sunset: 'from-gray-400/30',
        forest: 'from-gray-300/20',
        galaxy: 'from-gray-300/30',
        system: 'from-gray-500/20',
      },
      windy: {
        nautical: 'from-cyan-400/20',
        sunset: 'from-cyan-300/30',
        forest: 'from-cyan-400/20',
        galaxy: 'from-cyan-300/30',
        system: 'from-cyan-500/20',
      },
      snowy: {
        nautical: 'from-indigo-400/20',
        sunset: 'from-indigo-300/30',
        forest: 'from-indigo-400/20',
        galaxy: 'from-indigo-300/30',
        system: 'from-indigo-500/20',
      },
      stormy: {
        nautical: 'from-purple-400/20',
        sunset: 'from-purple-300/30',
        forest: 'from-purple-400/20',
        galaxy: 'from-purple-300/30',
        system: 'from-purple-500/20',
      }
    };
    
    const currentTheme = theme || 'system';
    return glowMap[weatherId]?.[currentTheme] || 'from-primary/20';
  };

  // Simulate orbital motion effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const orbitItems = container.querySelectorAll('.cosmic-orbit-item');
    
    const moveItems = () => {
      orbitItems.forEach((item, i) => {
        const elem = item as HTMLElement;
        const angle = (Date.now() * 0.0005 + i * (Math.PI / 3)) % (Math.PI * 2);
        const radius = 5;
        
        // Apply subtle floating motion
        const translateX = Math.cos(angle) * radius;
        const translateY = Math.sin(angle) * radius;
        
        elem.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
      
      requestAnimationFrame(moveItems);
    };
    
    const animationId = requestAnimationFrame(moveItems);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative py-6 px-4 rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Orbital lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <motion.ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            strokeDasharray="1 2"
            className="text-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
      
      {activeWeather && (
        <motion.div 
          className={`absolute inset-0 bg-gradient-radial ${getGlowColor(activeWeather)} to-transparent opacity-40`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
        />
      )}
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative">
        {weatherInfo.map((weather) => {
          const isActive = activeWeather === weather.id;
          const isHovered = hoveredWeather === weather.id;
          const WeatherIcon = weather.icon;
          
          return (
            <motion.div
              key={weather.id}
              className={`cosmic-orbit-item group flex flex-col items-center cursor-pointer relative`}
              onClick={() => onSelectWeather(weather.id)}
              onMouseEnter={() => setHoveredWeather(weather.id)}
              onMouseLeave={() => setHoveredWeather(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: isActive ? -5 : 0
              }}
            >
              <motion.div 
                className={`relative w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm`}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? `0 0 20px 0 ${getWeatherColor(weather.id, true).replace('text-', 'rgba(')}/30)` : 'none'
                }}
              >
                <WeatherIcon className={`w-5 h-5 ${getWeatherColor(weather.id, isActive)}`} />
                
                {/* Orbital particles */}
                {isActive && (
                  <>
                    <motion.div 
                      className={`absolute w-1 h-1 rounded-full ${getWeatherColor(weather.id, true).replace('text-', 'bg-')}`}
                      animate={{
                        rotate: [0, 360],
                        x: [0, 15, 0, -15, 0],
                        y: [15, 0, -15, 0, 15],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div 
                      className={`absolute w-1 h-1 rounded-full ${getWeatherColor(weather.id, true).replace('text-', 'bg-')}`}
                      animate={{
                        rotate: [0, -360],
                        x: [0, -12, 0, 12, 0],
                        y: [-12, 0, 12, 0, -12],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </>
                )}
              </motion.div>
              
              <motion.p 
                className={`mt-2 text-sm font-medium ${isActive ? getWeatherColor(weather.id, true) : 'text-muted-foreground'}`}
                animate={{ opacity: isActive || isHovered ? 1 : 0.7 }}
              >
                {weather.label}
              </motion.p>
              
              <motion.div
                className="absolute top-full mt-1 px-3 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-center whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                transition={{ duration: 0.2 }}
              >
                {weather.description}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CosmicNavigation;
