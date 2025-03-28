
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Shirt, ShoppingBag, Wand2 } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const sequence = [1000, 2000, 3000, 4000];
    
    const timers = sequence.map((delay, index) => {
      return setTimeout(() => {
        setStep(index + 1);
        if (index === sequence.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, delay);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete]);
  
  const getThemeGradient = () => {
    return "from-indigo-500 via-indigo-400 to-indigo-600";
  };
  
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 1.5,
      transition: { duration: 0.5 }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.8
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3 }
    }
  };
  
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const slideUpVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      variants={containerVariants}
      exit="exit"
    >
      <motion.div className="text-center px-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div variants={iconVariants} className="mb-6">
                <Sparkles className="w-16 h-16 text-indigo-400 animate-pulse" />
              </motion.div>
              <motion.h1 variants={textVariants} className="text-4xl font-bold text-white mb-2">
                Welcome to StyleSage
              </motion.h1>
            </motion.div>
          )}
          
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div variants={iconVariants} className="mb-6">
                <Shirt className="w-16 h-16 text-indigo-400" />
              </motion.div>
              <motion.h1 variants={textVariants} className="text-3xl font-bold text-white mb-2">
                Discover Your Style
              </motion.h1>
              <motion.p variants={textVariants} className="text-white/70 max-w-md">
                Personalized recommendations based on your taste
              </motion.p>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div variants={iconVariants} className="mb-6">
                <ShoppingBag className="w-16 h-16 text-indigo-400" />
              </motion.div>
              <motion.h1 variants={textVariants} className="text-3xl font-bold text-white mb-2">
                Shop Smart
              </motion.h1>
              <motion.p variants={textVariants} className="text-white/70 max-w-md">
                Find the best deals on your favorite brands
              </motion.p>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div variants={iconVariants} className="mb-6">
                <Wand2 className="w-16 h-16 text-indigo-400" />
              </motion.div>
              <motion.h1 variants={textVariants} className="text-3xl font-bold text-white mb-2">
                Powered by AI
              </motion.h1>
              <motion.p variants={textVariants} className="text-white/70 max-w-md">
                Intelligent recommendations that learn your preferences
              </motion.p>
            </motion.div>
          )}
          
          {step === 4 && (
            <motion.div
              key="step4"
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <motion.div 
                className="relative w-24 h-24 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${getThemeGradient()} rounded-full`}
                  animate={{ 
                    scale: [1, 1.2, 1.2, 1, 1],
                    rotate: [0, 0, 180, 180, 0],
                    borderRadius: ["50%", "50%", "20%", "50%", "50%"],
                  }}
                  transition={{
                    duration: 2,
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
              </motion.div>
              <motion.h1 
                variants={slideUpVariants}
                className={`text-4xl font-bold text-white mb-6 bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent`}
              >
                StyleSage
              </motion.h1>
              <motion.p 
                variants={slideUpVariants}
                className="text-white/70 text-lg"
              >
                Your fashion journey begins now
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-12 flex space-x-2 justify-center">
          {[0, 1, 2, 3, 4].map((dot) => (
            <div 
              key={dot} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                step >= dot ? 'bg-indigo-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
