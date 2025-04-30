
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Wind, Snowflake, CloudLightning } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

interface CosmicWeatherDisplayProps {
  weather: WeatherData;
}

const CosmicWeatherDisplay = ({ weather }: CosmicWeatherDisplayProps) => {
  const { theme } = useTheme();
  
  // Theme-specific colors for weather conditions
  const getWeatherColor = () => {
    switch (weather.condition) {
      case 'sunny':
        return theme === 'galaxy' ? 'text-yellow-300' : 'text-yellow-500';
      case 'rainy':
        return theme === 'galaxy' ? 'text-blue-300' : 'text-blue-500';
      case 'cloudy':
        return theme === 'galaxy' ? 'text-gray-300' : 'text-gray-500';
      case 'windy':
        return theme === 'galaxy' ? 'text-cyan-300' : 'text-cyan-500';
      case 'snowy':
        return theme === 'galaxy' ? 'text-indigo-300' : 'text-indigo-500';
      case 'stormy':
        return theme === 'galaxy' ? 'text-purple-300' : 'text-purple-500';
      default:
        return 'text-primary';
    }
  };
  
  // Background glow based on condition
  const getBackgroundGlow = () => {
    switch (weather.condition) {
      case 'sunny':
        return theme === 'galaxy' ? 'from-yellow-900/30' : 'from-yellow-500/20';
      case 'rainy':
        return theme === 'galaxy' ? 'from-blue-900/30' : 'from-blue-500/20';
      case 'cloudy':
        return theme === 'galaxy' ? 'from-gray-800/30' : 'from-gray-500/20';
      case 'windy':
        return theme === 'galaxy' ? 'from-cyan-900/30' : 'from-cyan-500/20';
      case 'snowy':
        return theme === 'galaxy' ? 'from-indigo-900/30' : 'from-indigo-500/20';
      case 'stormy':
        return theme === 'galaxy' ? 'from-purple-900/30' : 'from-purple-500/20';
      default:
        return 'from-primary/20';
    }
  };
  
  // Weather description text
  const getWeatherDescription = () => {
    switch (weather.condition) {
      case 'sunny':
        return weather.temperature > 25 
          ? "Hot and sunny. Dress light and protect yourself from the sun."
          : "Pleasant and sunny. Perfect for light layers that can be adjusted.";
      case 'rainy':
        return "Rainy conditions. Waterproof clothing and proper footwear recommended.";
      case 'cloudy':
        return "Cloudy skies. Prepare for changing conditions with adaptable layers.";
      case 'windy':
        return "Windy weather. Wear secure clothing and avoid loose items.";
      case 'snowy':
        return "Snowy conditions. Bundle up with insulated and waterproof layers.";
      case 'stormy':
        return "Stormy weather. Consider staying indoors or wear protective gear if you must go out.";
      default:
        return "Check weather conditions for appropriate clothing choices.";
    }
  };

  const createWeatherParticles = () => {
    // Return different particle effects based on weather condition
    switch (weather.condition) {
      case 'sunny':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`sun-ray-${i}`}
                className={`absolute w-16 h-1 rounded-full ${theme === 'galaxy' ? 'bg-yellow-300/50' : 'bg-yellow-500/50'}`}
                style={{
                  top: '20%',
                  left: '15%',
                  transformOrigin: 'left center',
                  rotate: i * 36,
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>
        );
      
      case 'rainy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`raindrop-${i}`}
                className={`absolute w-0.5 h-3 rounded-full ${theme === 'galaxy' ? 'bg-blue-300/70' : 'bg-blue-500/70'}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                }}
                animate={{
                  y: ['0vh', '100vh'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        );
        
      case 'cloudy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className={`absolute rounded-full ${theme === 'galaxy' ? 'bg-gray-700/30' : 'bg-gray-200/30'} blur-md`}
                style={{
                  width: 50 + i * 20,
                  height: 50 + i * 10,
                  top: 20 + i * 15,
                  left: 10 + i * 30,
                }}
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5 + i * 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </div>
        );
        
      case 'windy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`wind-${i}`}
                className={`absolute h-0.5 rounded-full ${theme === 'galaxy' ? 'bg-cyan-300/40' : 'bg-cyan-500/40'}`}
                style={{
                  width: 30 + Math.random() * 70,
                  left: '-80px',
                  top: 20 + i * 25,
                }}
                animate={{
                  x: ['-100%', '200%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );
        
      case 'snowy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`snowflake-${i}`}
                className={`absolute w-1 h-1 rounded-full ${theme === 'galaxy' ? 'bg-indigo-200/80' : 'bg-white/80'}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                }}
                animate={{
                  y: ['0vh', '100vh'],
                  x: [0, Math.random() > 0.5 ? 20 : -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        );
        
      case 'stormy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute inset-0"
              animate={{
                backgroundColor: ['rgba(0,0,0,0)', 'rgba(255,255,255,0.2)', 'rgba(0,0,0,0)']
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`lightning-${i}`}
                className="absolute"
                style={{
                  width: 2,
                  height: '100%',
                  left: `${30 + i * 20}%`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  backgroundColor: [theme === 'galaxy' ? '#c4b5fd' : '#8b5cf6', 'white', theme === 'galaxy' ? '#c4b5fd' : '#8b5cf6']
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 4 + Math.random() * 6,
                }}
              />
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-radial ${getBackgroundGlow()} to-transparent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Weather particles effect */}
      {createWeatherParticles()}
      
      <div className="relative p-6">
        <div className="flex justify-between items-start">
          <div>
            <motion.h4 
              className="font-medium tracking-wide"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {weather.location}
            </motion.h4>
            <motion.p 
              className={`text-4xl font-semibold mt-2 ${getWeatherColor()}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {weather.temperature}°C
            </motion.p>
            <motion.p 
              className="text-muted-foreground capitalize"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {weather.condition}
            </motion.p>
          </div>
          
          <motion.div
            className={`p-3 rounded-full flex items-center justify-center ${getWeatherColor().replace('text-', 'bg-')}/10`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: weather.condition === 'windy' ? [0, 15, -15, 0] : 0 }}
              transition={{ 
                duration: 2, 
                repeat: weather.condition === 'windy' ? Infinity : 0,
                repeatType: "reverse" 
              }}
            >
              {weather.icon}
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 gap-3 mt-4 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-muted-foreground">Humidity: {weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-300" />
            <span className="text-muted-foreground">Wind: {weather.windSpeed} km/h</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-sm font-medium">Weather Summary</p>
          <p className="text-sm text-muted-foreground mt-1">
            {getWeatherDescription()}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CosmicWeatherDisplay;
