
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Smile, Palette, Zap, Crown, Coffee, Briefcase, Sparkles, CircleArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface MoodBasedOutfitProps {
  onSelectMood: (mood: MoodData) => void;
  isLoading?: boolean;
}

export interface MoodData {
  mood: string;
  energyLevel: 'low' | 'medium' | 'high';
  vibe: string;
  colorPreference?: string;
}

const MoodBasedOutfits = ({ onSelectMood, isLoading = false }: MoodBasedOutfitProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<'low' | 'medium' | 'high' | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Add animation effect after initial render
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const moods = [
    { id: 'happy', label: 'Happy', icon: <Smile className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800 border-yellow-300', description: 'Uplifting pieces to match your energy' },
    { id: 'confident', label: 'Confident Queen', icon: <Crown className="h-5 w-5" />, color: 'bg-purple-100 text-purple-800 border-purple-300', description: 'Bold looks to showcase your power' },
    { id: 'relaxed', label: 'Relaxed', icon: <Coffee className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800 border-blue-300', description: 'Comfortable yet stylish ensembles' },
    { id: 'professional', label: 'Boss Energy', icon: <Briefcase className="h-5 w-5" />, color: 'bg-indigo-100 text-indigo-800 border-indigo-300', description: 'Polished looks for career success' },
    { id: 'creative', label: 'Creative', icon: <Palette className="h-5 w-5" />, color: 'bg-pink-100 text-pink-800 border-pink-300', description: 'Express your unique artistic vibe' },
    { id: 'nightlife', label: 'Nightlife Spark', icon: <Sparkles className="h-5 w-5" />, color: 'bg-violet-100 text-violet-800 border-violet-300', description: 'Stand out after sunset' }
  ];

  const energyLevels = [
    { id: 'low', label: 'Low-key', description: 'Comfortable & subtle', icon: '🌙' },
    { id: 'medium', label: 'Balanced', description: 'Put together but relaxed', icon: '✨' },
    { id: 'high', label: 'Energetic', description: 'Bold & attention-grabbing', icon: '🔥' }
  ];

  const vibes = [
    { id: 'casual', label: 'Casual Cool', description: 'Effortless everyday style', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=300' },
    { id: 'elegant', label: 'Elegant', description: 'Refined & sophisticated', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=300' },
    { id: 'playful', label: 'Playful', description: 'Fun & expressive', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=300' },
    { id: 'minimalist', label: 'Minimalist', description: 'Clean lines & neutral tones', image: 'https://images.unsplash.com/photo-1523380677598-64d85d4f4030?q=80&w=300' }
  ];

  const colorPalettes = [
    { id: 'neutral', colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575'] },
    { id: 'warm', colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'] },
    { id: 'cool', colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5'] },
    { id: 'vibrant', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'] }
  ];

  const handleSubmit = () => {
    if (!selectedMood || !selectedEnergy || !selectedVibe) {
      toast.error("Please select all options to get personalized recommendations");
      return;
    }

    onSelectMood({
      mood: selectedMood,
      energyLevel: selectedEnergy,
      vibe: selectedVibe,
      colorPreference: selectedColor || undefined
    });

    toast.success("Generating your perfect outfit recommendations");
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col space-y-4 p-6 border rounded-lg bg-card">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
      <CardContent className="p-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Style, Your Mood
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Not sure what to wear? Let your style DNA speak. Tell us how you're feeling today.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Mood selection */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-sm font-medium mb-3 flex items-center"
            >
              <Heart className="inline-block mr-2 h-4 w-4 text-rose-500" />
              Your mood today
            </motion.h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {moods.map((mood, index) => (
                <motion.div
                  key={mood.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.8 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className={`flex flex-col items-center justify-center gap-2 h-auto py-3 w-full transition-all ${
                      selectedMood === mood.id ? `border-2 ${mood.color} shadow-md` : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedMood(mood.id)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedMood === mood.id ? mood.color : 'bg-gray-100'}`}>
                      <span>{mood.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{mood.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Energy level selection with animated indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Zap className="inline-block mr-2 h-4 w-4 text-amber-500" />
              Energy level
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {energyLevels.map((level) => (
                <motion.div
                  key={level.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedEnergy(level.id as 'low' | 'medium' | 'high')}
                  className={`cursor-pointer rounded-md border p-4 ${
                    selectedEnergy === level.id
                      ? 'border-primary/50 bg-primary/5 shadow-lg'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{level.description}</div>
                    </div>
                    <div className="text-2xl">{level.icon}</div>
                  </div>
                  
                  {/* Energy level indicator */}
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${
                        level.id === 'low' ? 'bg-blue-400' : 
                        level.id === 'medium' ? 'bg-amber-400' : 'bg-rose-500'
                      }`}
                      initial={{ width: '0%' }}
                      animate={{ width: level.id === 'low' ? '33%' : level.id === 'medium' ? '66%' : '100%' }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vibe selection with images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Sparkles className="inline-block mr-2 h-4 w-4 text-purple-500" />
              Your vibe today
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vibes.map((vibe) => (
                <motion.div
                  key={vibe.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`cursor-pointer rounded-md overflow-hidden relative group ${
                    selectedVibe === vibe.id
                      ? 'ring-2 ring-primary ring-offset-2'
                      : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                  <img 
                    src={vibe.image} 
                    alt={vibe.label}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
                    <div className="font-medium">{vibe.label}</div>
                    <div className="text-xs text-white/80 mt-1">{vibe.description}</div>
                  </div>
                  
                  {selectedVibe === vibe.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-3 right-3 z-20 bg-primary/80 text-white p-1 rounded-full"
                    >
                      <CircleArrowRight className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Optional: Color preference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pt-2"
          >
            <h4 className="text-sm font-medium mb-3 flex items-center opacity-80">
              <Palette className="inline-block mr-2 h-4 w-4 text-teal-500" />
              Color preference (optional)
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {colorPalettes.map((palette) => (
                <motion.div
                  key={palette.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedColor(palette.id)}
                  className={`cursor-pointer rounded-md border p-2 ${
                    selectedColor === palette.id
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex gap-1 justify-center mb-2">
                    {palette.colors.map((color, i) => (
                      <div 
                        key={i}
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-center font-medium capitalize">{palette.id}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Styled submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="pt-4"
          >
            <Button 
              onClick={handleSubmit}
              disabled={!selectedMood || !selectedEnergy || !selectedVibe}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Style Me Now
            </Button>
            
            {(selectedMood && selectedEnergy && selectedVibe) && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-sm text-muted-foreground mt-3"
              >
                Click to discover looks that feel exactly like you
              </motion.p>
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedOutfits;
