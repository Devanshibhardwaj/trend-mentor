
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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
    
    return () => {
      // Clean up all timeouts and audio on unmount
      timeouts.forEach(clearTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
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
      
      {/* Morphing fashion silhouettes */}
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
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-300/40 to-pink-200/40"
              style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
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
        </motion.div>
      )}
      
      {/* Brand logo */}
      {step >= 4 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-24 h-24">
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
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl"
            >
              S
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Text animations */}
      <div className="relative z-10 max-w-md text-center">
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
                    "0 0 12px rgba(255,255,255,0.8)", 
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
              >
                Welcome to Your Personal
                <span className="block font-medium bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">
                  AI Stylist
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
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg"
                  >
                    Start Your Style Quiz
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FashionIntroAnimation;
