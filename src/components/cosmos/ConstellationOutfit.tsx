
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeDModelViewer from '@/components/3D/ThreeDModelViewer';
import { useTheme } from '@/contexts/ThemeContext';

interface ConstellationOutfitProps {
  id: string;
  style: string;
  occasion: string;
  description: string;
  imageUrl?: string;
  modelUrl?: string;
  index: number;
}

const ConstellationOutfit = ({
  id,
  style,
  occasion,
  description,
  imageUrl,
  modelUrl,
  index
}: ConstellationOutfitProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const [starPositions, setStarPositions] = useState<{x: number, y: number}[]>([]);
  
  // Generate a unique constellation pattern for each outfit
  useEffect(() => {
    const newPositions = [];
    const pointCount = Math.floor(Math.random() * 3) + 3; // 3-5 points
    
    for (let i = 0; i < pointCount; i++) {
      newPositions.push({
        x: Math.random() * 80 + 10, // Keep within 10-90% of container
        y: Math.random() * 80 + 10
      });
    }
    
    setStarPositions(newPositions);
  }, [id]);
  
  // Calculate staggered animation delay based on index
  const getAnimationDelay = () => {
    return (index % 3) * 0.15;
  };
  
  // Theme-specific colors
  const getStarColor = () => {
    switch (theme) {
      case 'nautical': return 'text-blue-400';
      case 'sunset': return 'text-orange-400';
      case 'forest': return 'text-green-400';
      case 'galaxy': return 'text-purple-400';
      default: return 'text-primary';
    }
  };
  
  const getLineColor = () => {
    switch (theme) {
      case 'nautical': return 'stroke-blue-400/40';
      case 'sunset': return 'stroke-orange-400/40';
      case 'forest': return 'stroke-green-400/40';
      case 'galaxy': return 'stroke-purple-400/40';
      default: return 'stroke-primary/40';
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${isExpanded ? 'h-auto' : 'h-[320px]'} transition-all duration-700`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: getAnimationDelay() }}
      whileHover={{ scale: isExpanded ? 1 : 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card */}
      <motion.div 
        className="h-full w-full backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
        animate={{ 
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Constellation visualization */}
        <div className="relative h-48 w-full">
          {/* Background stars */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Connect stars with lines */}
            {starPositions.length > 1 && (
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isHovered ? 0.8 : 0.4 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                d={`M ${starPositions.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                strokeWidth="0.5"
                className={`${getLineColor()} transition-colors duration-500`}
                strokeLinecap="round"
                strokeDasharray="1,1"
              />
            )}
            
            {/* Plot stars */}
            {starPositions.map((pos, i) => (
              <motion.circle
                key={`star-${id}-${i}`}
                cx={pos.x}
                cy={pos.y}
                r={i === 0 ? 2 : 1.5}
                className={`${getStarColor()} fill-current transition-colors duration-500`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              />
            ))}
          </svg>
          
          {/* Outfit preview - shown when expanded or hovered */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isExpanded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {modelUrl ? (
              <div className="w-full h-full">
                <ThreeDModelViewer
                  modelUrl={modelUrl}
                  title={`${style} - ${occasion}`}
                  showControls={false}
                  className="w-full h-full"
                />
              </div>
            ) : imageUrl ? (
              <motion.img 
                src={imageUrl} 
                alt={`${style} ${occasion} outfit`}
                className="object-cover w-full h-full"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            ) : (
              <div className={`flex items-center justify-center w-full h-full ${getStarColor()}`}>
                <span className="text-lg font-medium">{style}</span>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <motion.h3 
              className="font-medium"
              animate={{ 
                fontSize: isExpanded ? '1.25rem' : '1rem',
                opacity: isHovered || isExpanded ? 1 : 0.9
              }}
            >
              {style}
            </motion.h3>
            <motion.span 
              className={`px-2 py-1 text-xs rounded-full ${getStarColor().replace('text-', 'bg-')}/20`}
              whileHover={{ scale: 1.05 }}
            >
              {occasion}
            </motion.span>
          </div>
          
          <motion.p
            className="mt-2 text-sm text-muted-foreground line-clamp-3"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {description}
          </motion.p>
          
          <motion.button
            className={`mt-4 text-sm ${getStarColor()} flex items-center`}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show less' : 'Discover more'}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
              animate={{ rotate: isExpanded ? 180 : 0 }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </motion.svg>
          </motion.button>
          
          {/* Additional content when expanded */}
          {isExpanded && (
            <motion.div
              className="mt-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <hr className="border-white/10" />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Style Notes</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              
              {modelUrl && (
                <div className="mt-4 h-64 rounded-md overflow-hidden border border-white/10">
                  <ThreeDModelViewer
                    modelUrl={modelUrl}
                    title={`${style} - ${occasion}`}
                    showControls={true}
                    className="w-full h-full"
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConstellationOutfit;
