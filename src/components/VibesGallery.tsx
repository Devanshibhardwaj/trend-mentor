
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useTheme } from "@/contexts/ThemeContext";

const VibesGallery = () => {
  const [activeVibe, setActiveVibe] = useState('minimalist');
  const { theme } = useTheme();
  const isLightTheme = theme === "sunset" || theme === "forest" || theme === "system";
  
  const vibes = {
    minimalist: {
      title: "Minimalist",
      description: "Clean lines, neutral tones, and timeless essentials for an effortlessly sophisticated look.",
      images: [
        "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=600",
        "https://images.unsplash.com/photo-1503342452485-86b7f54527ef?q=80&w=600",
        "https://images.unsplash.com/photo-1604176424472-9d7dc5b3ceb6?q=80&w=600",
      ],
      color: isLightTheme ? "from-zinc-500 to-gray-500" : "from-zinc-600 to-gray-600",
      colorLight: isLightTheme ? "bg-gray-100" : "bg-gray-800"
    },
    vintage: {
      title: "Vintage",
      description: "Nostalgic prints, retro silhouettes, and timeless accessories that capture the essence of bygone eras.",
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600",
        "https://images.unsplash.com/photo-1596083066413-20098a8b8720?q=80&w=600",
        "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?q=80&w=600",
      ],
      color: isLightTheme ? "from-amber-500 to-yellow-500" : "from-amber-600 to-yellow-600",
      colorLight: isLightTheme ? "bg-amber-100" : "bg-amber-900/30"
    },
    bold: {
      title: "Bold",
      description: "Vibrant colors, striking patterns, and strong silhouettes for those who live life in full color.",
      images: [
        "https://images.unsplash.com/photo-1589363460779-def9cad65bd4?q=80&w=600",
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=600",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600",
      ],
      color: isLightTheme ? "from-rose-500 to-pink-500" : "from-rose-600 to-pink-600",
      colorLight: isLightTheme ? "bg-rose-100" : "bg-rose-900/30"
    },
    street: {
      title: "Street",
      description: "Casual cool with an edge—comfortable yet fashion-forward looks inspired by urban culture.",
      images: [
        "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?q=80&w=600",
        "https://images.unsplash.com/photo-1613160717888-febb7543d8a9?q=80&w=600",
        "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=600",
      ],
      color: isLightTheme ? "from-blue-500 to-indigo-500" : "from-blue-600 to-indigo-600",
      colorLight: isLightTheme ? "bg-blue-100" : "bg-blue-900/30"
    },
  };
  
  const vibesList = Object.entries(vibes).map(([key, value]) => ({ 
    id: key, 
    ...value 
  }));
  
  const selectedVibe = vibes[activeVibe as keyof typeof vibes];
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className={`text-sm font-medium uppercase tracking-wider mb-2 ${isLightTheme ? 'text-indigo-600' : 'text-indigo-400'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Find Your Match
          </motion.p>
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore Different Vibes
          </motion.h2>
          <motion.p
            className={`text-lg ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our AI can match you with the perfect style vibe that expresses who you are and how you want to present yourself to the world.
          </motion.p>
        </div>
        
        {/* Style Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {vibesList.map((vibe) => (
            <motion.button
              key={vibe.id}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeVibe === vibe.id 
                  ? `bg-gradient-to-r ${vibe.color} text-white shadow-lg`
                  : `${vibe.colorLight} ${isLightTheme ? 'text-gray-700' : 'text-gray-300'}`
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveVibe(vibe.id)}
            >
              {vibe.title}
            </motion.button>
          ))}
        </div>
        
        {/* Vibe Showcase */}
        <div className="grid md:grid-cols-7 gap-6 items-center">
          <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-purple-100/40 to-blue-100/40 dark:from-purple-900/20 dark:to-blue-900/20 border border-gray-200 dark:border-gray-800">
            <Badge 
              className={`mb-4 bg-gradient-to-r ${selectedVibe.color} hover:${selectedVibe.color} border-none text-white`}
            >
              {selectedVibe.title} Vibe
            </Badge>
            <h3 className={`text-2xl font-bold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
              {selectedVibe.title} Style
            </h3>
            <p className={`mb-6 ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
              {selectedVibe.description}
            </p>
            <Link to="/weather-styling">
              <Button
                className={`bg-gradient-to-r ${selectedVibe.color} hover:${selectedVibe.color} border-none text-white group`}
              >
                Try This Style
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="md:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeVibe}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 gap-4"
              >
                {selectedVibe.images.map((image, i) => (
                  <motion.div
                    key={i}
                    className={`overflow-hidden rounded-lg ${i === 1 ? 'row-span-2' : ''}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img 
                      src={image} 
                      alt={`${selectedVibe.title} style example`} 
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibesGallery;
