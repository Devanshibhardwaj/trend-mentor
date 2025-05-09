
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FashionIntroAnimationProps {
  onComplete: () => void;
  skipIntro?: boolean;
}

const FashionIntroAnimation = ({ onComplete, skipIntro = false }: FashionIntroAnimationProps) => {
  const [step, setStep] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Skip animation if requested
    if (skipIntro) {
      onComplete();
      return;
    }
    
    // Create and play ambient sound
    audioRef.current = new Audio('/ambient-fashion.mp3');
    audioRef.current.volume = 0.2;
    audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
    
    // Animation sequence timing
    const sequence = [
      { step: 1, delay: 500 },   // Analyzing Your Aura text
      { step: 2, delay: 1800 },  // Color waves
      { step: 3, delay: 3500 },  // Silhouettes
      { step: 4, delay: 5000 },  // Brand logo
      { step: 5, delay: 6200 }   // Final message and button
    ];
    
    let timeouts: NodeJS.Timeout[] = [];
    
    // Set up the animation sequence
    sequence.forEach(({ step, delay }) => {
      const timeout = setTimeout(() => {
        setStep(step);
        if (step === 5) {
          setShowButton(true);
          // Auto-complete after a short delay if user doesn't click
          const finalTimeout = setTimeout(() => {
            handleComplete();
          }, 6000);
          timeouts.push(finalTimeout);
        }
      }, delay);
      timeouts.push(timeout);
    });
    
    // Track mouse movement for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: ((e.clientX - rect.left) / rect.width) - 0.5,
          y: ((e.clientY - rect.top) / rect.height) - 0.5
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      // Clean up all timeouts and audio on unmount
      timeouts.forEach(clearTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [skipIntro, onComplete]);
  
  const handleComplete = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onComplete();
  };
  
  // Early return if skipping
  if (skipIntro) return null;
  
  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Skip button */}
      <motion.button
        className="absolute top-4 right-4 text-white/50 text-sm hover:text-white/90 transition-colors z-50"
        onClick={handleComplete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Skip
      </motion.button>
      
      {/* Dynamic grid overlay - cyberpunk/holographic effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <div className="w-full h-full" style={{
          background: `repeating-linear-gradient(
            to right,
            rgba(32, 202, 255, 0.1),
            rgba(32, 202, 255, 0.1) 1px,
            transparent 1px,
            transparent 50px
          ), repeating-linear-gradient(
            to bottom,
            rgba(32, 202, 255, 0.1),
            rgba(32, 202, 255, 0.1) 1px,
            transparent 1px,
            transparent 50px
          )`
        }} />
      </motion.div>
      
      {/* Abstract color waves */}
      {step >= 2 && (
        <>
          <motion.div 
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%]"
                style={{
                  background: "radial-gradient(circle at 30% 70%, rgba(255,100,200,0.4), transparent 50%), radial-gradient(circle at 70% 30%, rgba(100,200,255,0.4), transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,200,100,0.4), transparent 50%)"
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>
          </motion.div>
        </>
      )}
      
      {/* Holographic effect overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(
            135deg,
            rgba(255, 0, 255, 0.2) 0%,
            rgba(0, 255, 255, 0.2) 25%, 
            rgba(0, 255, 255, 0.2) 50%,
            rgba(255, 255, 0, 0.2) 75%,
            rgba(255, 0, 255, 0.2) 100%
          )`,
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
      />
      
      {/* Interactive Morphing fashion silhouettes that follow cursor */}
      {step >= 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="w-64 h-96 relative"
            animate={{
              filter: ["blur(10px)", "blur(8px)", "blur(12px)"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              transform: `translate(${cursorPosition.x * 20}px, ${cursorPosition.y * 20}px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-300/40 to-pink-200/40"
              style={{ 
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                boxShadow: '0 0 40px rgba(255, 100, 255, 0.3)',
              }}
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Secondary silhouette with different movement pattern */}
          <motion.div 
            className="absolute w-40 h-60"
            style={{
              transform: `translate(${-cursorPosition.x * 40}px, ${-cursorPosition.y * 40}px) rotate(${cursorPosition.x * 10}deg)`,
              filter: 'blur(8px)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-blue-400/30"
              style={{ borderRadius: "70% 30% 50% 50% / 40% 60% 40% 60%" }}
              animate={{
                borderRadius: [
                  "70% 30% 50% 50% / 40% 60% 40% 60%",
                  "50% 50% 30% 70% / 60% 40% 60% 40%",
                  "70% 30% 50% 50% / 40% 60% 40% 60%"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </motion.div>
      )}
      
      {/* 3D-like brand logo with holographic effect */}
      {step >= 4 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="relative w-24 h-24"
            style={{
              transform: `rotateX(${cursorPosition.y * 20}deg) rotateY(${-cursorPosition.x * 20}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-600 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["50%", "50%", "20%", "50%", "50%"],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.6)',
              }}
            />
            
            {/* Holographic overlay on the logo */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              animate={{ 
                borderRadius: ["50%", "50%", "20%", "50%", "50%"],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(120,120,255,0.3) 50%, rgba(255,120,255,0.3) 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 5s ease infinite',
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl"
              style={{
                textShadow: '0 0 10px rgba(255,255,255,0.8)',
              }}
            >
              S
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Text animations */}
      <div className="relative z-30 max-w-md text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-light text-white tracking-wider"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.6)", 
                    "0 0 12px rgba(255,255,255,0.8) 0 0 40px rgba(120,180,255,0.6)", 
                    "0 0 8px rgba(255,255,255,0.6)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Analyzing Your Aura...
              </motion.h1>
            </motion.div>
          )}
          
          {step === 5 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.h2 
                className="text-2xl md:text-4xl font-light text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  textShadow: '0 0 20px rgba(120,180,255,0.5)'
                }}
              >
                You're about to enter your
                <span className="block font-medium bg-gradient-to-r from-indigo-200 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent">
                  Fashion Multiverse
                </span>
              </motion.h2>
              
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Button
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg relative group overflow-hidden"
                  >
                    <span className="relative z-10">Find Your Runway Path</span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,0.5)`
            }}
            animate={{
              y: [0, -(Math.random() * 50 + 50)],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FashionIntroAnimation;
