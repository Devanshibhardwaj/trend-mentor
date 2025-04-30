
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "@/contexts/ThemeContext";

interface CosmicBackgroundProps {
  weatherCondition?: string;
  interactive?: boolean;
}

const CosmicBackground = ({ 
  weatherCondition, 
  interactive = true 
}: CosmicBackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Generate stars dynamically based on weather and theme
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const container = backgroundRef.current;
    const starCount = weatherCondition === 'stormy' ? 35 : 
                     weatherCondition === 'snowy' ? 45 : 
                     weatherCondition === 'rainy' ? 25 : 
                     weatherCondition === 'cloudy' ? 30 : 70;
    
    // Clear previous stars
    const existingStars = container.querySelectorAll('.cosmic-star');
    existingStars.forEach(star => star.remove());
    
    // Create new stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'cosmic-star absolute rounded-full';
      
      // Vary star sizes
      const size = Math.random() * 4 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random positions
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Theme-specific star colors
      if (theme === 'nautical') {
        star.style.backgroundColor = `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.5})`;
      } else if (theme === 'sunset') {
        star.style.backgroundColor = `rgba(251, 146, 60, ${Math.random() * 0.5 + 0.5})`;
      } else if (theme === 'forest') {
        star.style.backgroundColor = `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})`;
      } else if (theme === 'galaxy') {
        star.style.backgroundColor = `rgba(196, 181, 253, ${Math.random() * 0.5 + 0.5})`;
      } else {
        star.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
      }
      
      // Animation durations
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
      
      container.appendChild(star);
    }
    
    return () => {
      const stars = container.querySelectorAll('.cosmic-star');
      stars.forEach(star => star.remove());
    };
  }, [weatherCondition, theme]);

  // Interactive background effect
  useEffect(() => {
    if (!interactive || !backgroundRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const container = backgroundRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const stars = container.querySelectorAll('.cosmic-star');
      stars.forEach((star: Element) => {
        const starElem = star as HTMLElement;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        // Small parallax effect
        const moveX = deltaX * (Math.random() * 10);
        const moveY = deltaY * (Math.random() * 10);
        
        starElem.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Weather-specific background colors
  const getBgGradient = () => {
    switch (weatherCondition) {
      case 'sunny':
        return theme === 'galaxy' ? 
          'from-orange-900/30 via-yellow-800/20 to-blue-900/30' : 
          'from-amber-100/20 via-yellow-50/10 to-blue-100/20';
      case 'rainy':
        return theme === 'galaxy' ? 
          'from-blue-900/30 via-slate-800/20 to-purple-900/30' : 
          'from-blue-100/20 via-slate-100/10 to-indigo-100/20';
      case 'cloudy':
        return theme === 'galaxy' ? 
          'from-slate-800/30 via-gray-800/20 to-slate-700/30' : 
          'from-gray-100/20 via-slate-50/10 to-gray-200/20';
      case 'windy':
        return theme === 'galaxy' ? 
          'from-cyan-900/30 via-blue-800/20 to-teal-900/30' : 
          'from-cyan-50/20 via-blue-50/10 to-emerald-50/20';
      case 'snowy':
        return theme === 'galaxy' ? 
          'from-indigo-900/30 via-blue-800/20 to-purple-900/30' : 
          'from-blue-50/20 via-indigo-50/10 to-purple-50/20';
      case 'stormy':
        return theme === 'galaxy' ? 
          'from-purple-900/30 via-slate-800/20 to-indigo-900/30' : 
          'from-purple-100/20 via-slate-100/10 to-blue-100/20';
      default:
        return theme === 'galaxy' ? 
          'from-blue-900/30 via-indigo-900/20 to-purple-900/30' : 
          'from-blue-50/20 via-indigo-50/10 to-purple-50/20';
    }
  };

  return (
    <motion.div
      ref={backgroundRef}
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${getBgGradient()} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background nebula effect */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
        style={{
          opacity: 0.4,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Add the CSS for star animations using standard style tag */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          .cosmic-star {
            transition: transform 0.5s ease-out;
          }
        `}
      </style>
    </motion.div>
  );
};

export default CosmicBackground;
