
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Smile, Heart, Zap, Coffee, Star, Sun } from 'lucide-react';

interface MoodScannerBarProps {
  onMoodSelect: (mood: string, emoji: string) => void;
  selectedMood?: string;
}

const MoodScannerBar = ({ onMoodSelect, selectedMood }: MoodScannerBarProps) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', icon: <Smile className="h-4 w-4" />, color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
    { id: 'confident', emoji: '💪', label: 'Confident', icon: <Zap className="h-4 w-4" />, color: 'bg-red-100 hover:bg-red-200 text-red-800' },
    { id: 'romantic', emoji: '💕', label: 'Romantic', icon: <Heart className="h-4 w-4" />, color: 'bg-pink-100 hover:bg-pink-200 text-pink-800' },
    { id: 'professional', emoji: '💼', label: 'Professional', icon: <Star className="h-4 w-4" />, color: 'bg-blue-100 hover:bg-blue-200 text-blue-800' },
    { id: 'relaxed', emoji: '😌', label: 'Relaxed', icon: <Coffee className="h-4 w-4" />, color: 'bg-green-100 hover:bg-green-200 text-green-800' },
    { id: 'energetic', emoji: '⚡', label: 'Energetic', icon: <Sun className="h-4 w-4" />, color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' }
  ];

  return (
    <Card className="mb-6 border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">How are you feeling today?</h3>
          <p className="text-sm text-gray-600">Choose your vibe to get personalized style recommendations</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {moods.map((mood) => (
            <motion.div
              key={mood.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedMood === mood.id ? "default" : "outline"}
                size="sm"
                className={`${mood.color} border-0 rounded-full px-4 py-2 transition-all duration-200 ${
                  selectedMood === mood.id ? 'ring-2 ring-purple-300' : ''
                }`}
                onClick={() => onMoodSelect(mood.id, mood.emoji)}
                onMouseEnter={() => setHoveredMood(mood.id)}
                onMouseLeave={() => setHoveredMood(null)}
              >
                <span className="text-lg mr-2">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
                {mood.icon}
              </Button>
            </motion.div>
          ))}
        </div>

        {hoveredMood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-3"
          >
            <p className="text-xs text-gray-500">
              Perfect for {moods.find(m => m.id === hoveredMood)?.label.toLowerCase()} vibes!
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodScannerBar;
