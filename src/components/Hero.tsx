import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative py-16 sm:py-24 lg:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-100 animate-pulse opacity-30 blur-lg" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="relative z-10 max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-800">
          StyleSage AI ✨
        </h1>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Your personal AI stylist. Let's create a <span className="text-pink-600 font-semibold">look you'll love</span> today.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:scale-105 transition-all shadow-xl flex items-center gap-2">
            <Sparkles size={18} />
            Generate My Look
          </button>
        </div>
      </motion.div>
    </div>
  );
}