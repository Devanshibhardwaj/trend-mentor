
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Smile, Palette, Zap } from 'lucide-react';
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

  const moods = [
    { id: 'happy', label: 'Happy', icon: <Smile className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { id: 'relaxed', label: 'Relaxed', icon: <Heart className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { id: 'confident', label: 'Confident', icon: <Zap className="h-5 w-5" />, color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { id: 'creative', label: 'Creative', icon: <Palette className="h-5 w-5" />, color: 'bg-pink-100 text-pink-800 border-pink-300' }
  ];

  const energyLevels = [
    { id: 'low', label: 'Low-key', description: 'Comfortable & subtle' },
    { id: 'medium', label: 'Balanced', description: 'Put together but relaxed' },
    { id: 'high', label: 'Energetic', description: 'Bold & attention-grabbing' }
  ];

  const vibes = [
    { id: 'casual', label: 'Casual Cool', description: 'Effortless everyday style' },
    { id: 'elegant', label: 'Elegant', description: 'Refined & sophisticated' },
    { id: 'playful', label: 'Playful', description: 'Fun & expressive' },
    { id: 'minimalist', label: 'Minimalist', description: 'Clean lines & neutral tones' }
  ];

  const handleSubmit = () => {
    if (!selectedMood || !selectedEnergy || !selectedVibe) {
      toast.error("Please select all options to get personalized recommendations");
      return;
    }

    onSelectMood({
      mood: selectedMood,
      energyLevel: selectedEnergy,
      vibe: selectedVibe
    });

    toast.success("Generating mood-based outfit recommendations");
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
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
        <p className="text-muted-foreground mb-6">Let's find an outfit that matches your mood</p>

        <div className="space-y-6">
          {/* Mood selection */}
          <div>
            <h4 className="text-sm font-medium mb-3">Your mood</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {moods.map((mood) => (
                <Button
                  key={mood.id}
                  variant="outline"
                  className={`flex items-center justify-center gap-2 h-auto py-3 ${
                    selectedMood === mood.id ? `border-2 ${mood.color}` : ''
                  }`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <span>{mood.icon}</span>
                  <span>{mood.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Energy level selection */}
          <div>
            <h4 className="text-sm font-medium mb-3">Energy level</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {energyLevels.map((level) => (
                <motion.div
                  key={level.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedEnergy(level.id as 'low' | 'medium' | 'high')}
                  className={`cursor-pointer rounded-md border p-3 ${
                    selectedEnergy === level.id
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="font-medium">{level.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{level.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vibe selection */}
          <div>
            <h4 className="text-sm font-medium mb-3">Your vibe today</h4>
            <div className="grid grid-cols-2 gap-3">
              {vibes.map((vibe) => (
                <motion.div
                  key={vibe.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedVibe(vibe.id)}
                  className={`cursor-pointer rounded-md border p-3 ${
                    selectedVibe === vibe.id
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="font-medium">{vibe.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{vibe.description}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!selectedMood || !selectedEnergy || !selectedVibe}
            className="w-full mt-4"
            size="lg"
          >
            Create My Mood-Based Outfit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodBasedOutfits;
