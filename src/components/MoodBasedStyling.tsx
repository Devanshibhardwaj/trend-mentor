
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Heart, Sparkles, Zap, Sun, Moon, Smile } from 'lucide-react';
import OutfitCard from '@/components/OutfitCard';
import { toast } from 'sonner';

interface MoodOutfit {
  id: string;
  style: string;
  occasion: string;
  description: string;
}

const moodEmojis = {
  happy: <Smile className="h-6 w-6 text-yellow-500" />,
  confident: <Zap className="h-6 w-6 text-purple-500" />,
  creative: <Sparkles className="h-6 w-6 text-blue-500" />,
  romantic: <Heart className="h-6 w-6 text-red-500" />,
  energetic: <Sun className="h-6 w-6 text-orange-500" />,
  relaxed: <Moon className="h-6 w-6 text-indigo-500" />
};

const MoodBasedStyling = () => {
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState([50]);
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<MoodOutfit[]>([]);
  
  const handleGetSuggestions = () => {
    if (!mood) {
      toast.error('Please select your mood');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      generateOutfitRecommendations(mood, energyLevel[0]);
      setLoading(false);
    }, 1500);
  };
  
  const generateOutfitRecommendations = (selectedMood: string, energy: number) => {
    const recommendations: MoodOutfit[] = [];
    
    if (selectedMood === 'happy' || selectedMood === 'energetic') {
      recommendations.push({
        id: '1',
        style: 'Vibrant',
        occasion: 'Casual',
        description: 'Bright colored t-shirt or blouse, paired with well-fitted jeans or a flowy skirt. Add colorful accessories and comfortable sneakers or sandals.'
      });
      recommendations.push({
        id: '2',
        style: 'Playful',
        occasion: 'Social',
        description: 'Patterned dress or jumpsuit in a cheerful print. Layer with a denim jacket and add statement earrings or a bracelet for extra flair.'
      });
    } else if (selectedMood === 'confident') {
      recommendations.push({
        id: '3',
        style: 'Power',
        occasion: 'Work/Formal',
        description: 'Well-tailored blazer in a bold color over a simple top, paired with tailored pants or a pencil skirt. Add minimal but striking jewelry and polished shoes.'
      });
      recommendations.push({
        id: '4',
        style: 'Bold',
        occasion: 'Evening',
        description: 'Statement piece like a leather jacket or a dress in a rich color. Pair with sleek accessories and shoes that make you feel unstoppable.'
      });
    } else if (selectedMood === 'creative') {
      recommendations.push({
        id: '5',
        style: 'Artistic',
        occasion: 'Casual',
        description: 'Layered outfit with mixed textures - try a vintage tee with a patterned overshirt, unique jeans or pants, and ankle boots or artistic sneakers.'
      });
      recommendations.push({
        id: '6',
        style: 'Eclectic',
        occasion: 'Social',
        description: 'Unexpected color combinations or pattern mixing. Try a patterned top with differently patterned bottoms, or color blocking with complementary hues.'
      });
    } else if (selectedMood === 'romantic') {
      recommendations.push({
        id: '7',
        style: 'Soft',
        occasion: 'Date',
        description: 'Flowing fabrics in soft colors - try a silk blouse or dress with delicate details. Add subtle jewelry and a light perfume or cologne.'
      });
      recommendations.push({
        id: '8',
        style: 'Elegant',
        occasion: 'Evening',
        description: 'A well-fitted dress or suit in a flattering silhouette. Choose rich textures like velvet or satin and add one statement accessory.'
      });
    } else if (selectedMood === 'relaxed') {
      recommendations.push({
        id: '9',
        style: 'Comfort',
        occasion: 'Casual',
        description: 'Soft, relaxed-fit clothing like an oversized sweater with comfortable pants or leggings. Add cozy socks and minimal accessories.'
      });
      recommendations.push({
        id: '10',
        style: 'Lounge',
        occasion: 'Home',
        description: 'Elevated loungewear in coordinated colors. Try matching sets in soft fabrics or upgrade your basics with quality t-shirts and well-fitted sweatpants.'
      });
    }
    
    // Adjust for energy level
    if (energy < 30) {
      // Low energy recommendations focus on comfort
      recommendations.push({
        id: '11',
        style: 'Comfort+',
        occasion: 'Low-Energy Day',
        description: 'Soft, loose-fitting clothes in neutral colors. Try jersey fabrics, oversized cardigans, and slip-on shoes. Focus on feeling good over high fashion.'
      });
    } else if (energy > 70) {
      // High energy recommendations add more bold elements
      recommendations.push({
        id: '12',
        style: 'Statement',
        occasion: 'High-Energy Day',
        description: 'Bold colors and eye-catching pieces that match your energetic mood. Try a statement jacket, bright accessories, or your "power outfit" that always gets compliments.'
      });
    }
    
    setOutfits(recommendations);
  };
  
  const getEnergyLabel = (value: number) => {
    if (value < 30) return 'Low';
    if (value < 70) return 'Medium';
    return 'High';
  };
  
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-900/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Mood-Based Outfit Suggestions</h3>
                <p className="text-muted-foreground">
                  Get outfit recommendations that match how you feel today and boost your confidence.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="mood">How are you feeling today?</Label>
                    <Select value={mood} onValueChange={setMood}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="happy">Happy & Upbeat</SelectItem>
                        <SelectItem value="confident">Confident & Bold</SelectItem>
                        <SelectItem value="creative">Creative & Inspired</SelectItem>
                        <SelectItem value="romantic">Romantic & Dreamy</SelectItem>
                        <SelectItem value="energetic">Energetic & Adventurous</SelectItem>
                        <SelectItem value="relaxed">Relaxed & Chill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="energy">Energy Level</Label>
                      <span className="text-sm font-medium">
                        {getEnergyLabel(energyLevel[0])}
                      </span>
                    </div>
                    <Slider
                      id="energy"
                      value={energyLevel}
                      onValueChange={setEnergyLevel}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>
                  
                  <Button onClick={handleGetSuggestions} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Finding the perfect outfit...
                      </>
                    ) : (
                      'Get Mood-Based Recommendations'
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {mood && (
              <div>
                <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Your Mood</h4>
                        <p className="text-lg font-semibold mt-2 capitalize">{mood}</p>
                        <p className="text-muted-foreground">Energy: {getEnergyLabel(energyLevel[0])}</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        {mood in moodEmojis ? moodEmojis[mood as keyof typeof moodEmojis] : <Smile className="h-6 w-6 text-primary" />}
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="text-muted-foreground">
                        Your outfit can enhance how you feel. We'll suggest clothes that complement and boost your current mood.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {outfits.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-6">Recommended Outfits for Your Mood</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit, index) => (
              <OutfitCard
                key={outfit.id}
                index={index}
                style={outfit.style}
                occasion={outfit.occasion}
                description={outfit.description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBasedStyling;
