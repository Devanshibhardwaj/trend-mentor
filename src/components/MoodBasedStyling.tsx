import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Heart, Sparkles, Zap, Sun, Moon, Smile, Coffee, Music, Book, Star } from 'lucide-react';
import OutfitCard from '@/components/OutfitCard';
import { toast } from 'sonner';
import ThreeDModelViewer from '@/components/3D/ThreeDModelViewer';
import { outfitImages } from '@/lib/outfit-data';

interface MoodOutfit {
  id: string;
  style: string;
  occasion: string;
  description: string;
  imageUrl?: string;
  modelUrl?: string;
  colorPalette?: string[];
}

const moodEmojis = {
  happy: <Smile className="h-6 w-6 text-yellow-500" />,
  confident: <Zap className="h-6 w-6 text-purple-500" />,
  creative: <Sparkles className="h-6 w-6 text-blue-500" />,
  romantic: <Heart className="h-6 w-6 text-red-500" />,
  energetic: <Sun className="h-6 w-6 text-orange-500" />,
  relaxed: <Moon className="h-6 w-6 text-indigo-500" />,
  focused: <Coffee className="h-6 w-6 text-brown-500" />,
  inspired: <Music className="h-6 w-6 text-green-500" />,
  thoughtful: <Book className="h-6 w-6 text-teal-500" />
};

// 3D model URLs for different moods
const moodModelUrls = {
  happy: [
    '/models/happy-outfit-1.glb',
    '/models/happy-outfit-2.glb',
    '/models/happy-outfit-3.glb',
  ],
  confident: [
    '/models/confident-outfit-1.glb',
    '/models/confident-outfit-2.glb',
    '/models/confident-outfit-3.glb',
  ],
  creative: [
    '/models/creative-outfit-1.glb',
    '/models/creative-outfit-2.glb',
    '/models/creative-outfit-3.glb',
  ],
  romantic: [
    '/models/romantic-outfit-1.glb',
    '/models/romantic-outfit-2.glb',
    '/models/romantic-outfit-3.glb',
  ],
  energetic: [
    '/models/energetic-outfit-1.glb',
    '/models/energetic-outfit-2.glb',
    '/models/energetic-outfit-3.glb',
  ],
  relaxed: [
    '/models/relaxed-outfit-1.glb',
    '/models/relaxed-outfit-2.glb',
    '/models/relaxed-outfit-3.glb',
  ],
  focused: [
    '/models/focused-outfit-1.glb',
    '/models/focused-outfit-2.glb',
    '/models/focused-outfit-3.glb',
  ],
  inspired: [
    '/models/inspired-outfit-1.glb',
    '/models/inspired-outfit-2.glb',
    '/models/inspired-outfit-3.glb',
  ],
  thoughtful: [
    '/models/thoughtful-outfit-1.glb',
    '/models/thoughtful-outfit-2.glb',
    '/models/thoughtful-outfit-3.glb',
  ]
};

// Mood color palettes
const moodColorPalettes = {
  happy: ['#FFC700', '#FF9900', '#FFDD5C', '#FFE990', '#FFF9E0'],
  confident: ['#5E17EB', '#8549FC', '#AB7EFD', '#D4C1FE', '#F0EAFF'],
  creative: ['#00B8D9', '#0098B7', '#66D9FA', '#B3ECFF', '#E5F9FF'],
  romantic: ['#FF5670', '#FF89A0', '#FFADC0', '#FFD1DB', '#FFF0F3'],
  energetic: ['#FF5630', '#FF7452', '#FF9174', '#FFBDAD', '#FFE0D6'],
  relaxed: ['#6554C0', '#8777D9', '#ADA6E9', '#D5D1F7', '#F3F2FF'],
  focused: ['#5D4037', '#7B5E57', '#A18E88', '#D1C6C2', '#F5F0EE'],
  inspired: ['#36B37E', '#57D9A3', '#86E8C0', '#ABEDCE', '#E3F9F1'],
  thoughtful: ['#008B94', '#00A3AE', '#5BD4D7', '#A5EAEC', '#E0F8F9']
};

// Image URLs for different moods
const moodImageUrls = {
  happy: [
    '/images/moods/happy-casual.jpg',
    '/images/moods/happy-social.jpg',
    '/images/moods/happy-outdoor.jpg',
  ],
  confident: [
    '/images/moods/confident-work.jpg',
    '/images/moods/confident-evening.jpg',
    '/images/moods/confident-presentation.jpg',
  ],
  creative: [
    '/images/moods/creative-casual.jpg',
    '/images/moods/creative-workspace.jpg',
    '/images/moods/creative-artistic.jpg',
  ],
  romantic: [
    '/images/moods/romantic-date.jpg',
    '/images/moods/romantic-evening.jpg',
    '/images/moods/romantic-casual.jpg',
  ],
  energetic: [
    '/images/moods/energetic-workout.jpg',
    '/images/moods/energetic-outdoor.jpg',
    '/images/moods/energetic-casual.jpg',
  ],
  relaxed: [
    '/images/moods/relaxed-home.jpg',
    '/images/moods/relaxed-casual.jpg',
    '/images/moods/relaxed-weekend.jpg',
  ],
  focused: [
    '/images/moods/focused-work.jpg',
    '/images/moods/focused-study.jpg',
    '/images/moods/focused-meeting.jpg',
  ],
  inspired: [
    '/images/moods/inspired-creative.jpg',
    '/images/moods/inspired-artistic.jpg',
    '/images/moods/inspired-casual.jpg',
  ],
  thoughtful: [
    '/images/moods/thoughtful-casual.jpg',
    '/images/moods/thoughtful-formal.jpg',
    '/images/moods/thoughtful-reading.jpg',
  ]
};

const MoodBasedStyling = () => {
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState([50]);
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<MoodOutfit[]>([]);
  const [selectedColorPalette, setSelectedColorPalette] = useState<string[]>([]);
  
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
      setSelectedColorPalette(moodColorPalettes[mood as keyof typeof moodColorPalettes] || []);
      toast.success(`Generated outfits for your ${mood} mood!`);
    }, 1500);
  };
  
  const generateOutfitRecommendations = (selectedMood: string, energy: number) => {
    const recommendations: MoodOutfit[] = [];
    const images = outfitImages.mood[selectedMood as keyof typeof outfitImages.mood] || [];
    const models = moodModelUrls[selectedMood as keyof typeof moodModelUrls] || [];
    const colors = moodColorPalettes[selectedMood as keyof typeof moodColorPalettes] || [];
    
    if (selectedMood === 'happy' || selectedMood === 'energetic') {
      recommendations.push({
        id: '1',
        style: 'Vibrant',
        occasion: 'Casual',
        description: 'Bright colored t-shirt or blouse, paired with well-fitted jeans or a flowy skirt. Add colorful accessories and comfortable sneakers or sandals.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '2',
        style: 'Playful',
        occasion: 'Social',
        description: 'Patterned dress or jumpsuit in a cheerful print. Layer with a denim jacket and add statement earrings or a bracelet for extra flair.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '3',
        style: 'Radiant',
        occasion: 'Outdoor',
        description: 'Light, breathable fabrics in bright colors. Try a yellow sundress or coral shorts with a white tee. Add statement sunglasses and comfortable sandals.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'confident') {
      recommendations.push({
        id: '4',
        style: 'Power',
        occasion: 'Work/Formal',
        description: 'Well-tailored blazer in a bold color over a simple top, paired with tailored pants or a pencil skirt. Add minimal but striking jewelry and polished shoes.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '5',
        style: 'Bold',
        occasion: 'Evening',
        description: 'Statement piece like a leather jacket or a dress in a rich color. Pair with sleek accessories and shoes that make you feel unstoppable.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '6',
        style: 'Authoritative',
        occasion: 'Presentation',
        description: 'Structured silhouettes in commanding colors like navy, burgundy, or deep purple. Consider a matching set or a dress with architectural details.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'creative') {
      recommendations.push({
        id: '7',
        style: 'Artistic',
        occasion: 'Casual',
        description: 'Layered outfit with mixed textures - try a vintage tee with a patterned overshirt, unique jeans or pants, and ankle boots or artistic sneakers.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '8',
        style: 'Eclectic',
        occasion: 'Social',
        description: 'Unexpected color combinations or pattern mixing. Try a patterned top with differently patterned bottoms, or color blocking with complementary hues.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '9',
        style: 'Expressive',
        occasion: 'Artistic',
        description: 'Clothing as personal expression - incorporate handmade or customized pieces, interesting silhouettes, or items with artistic prints or details.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'romantic') {
      recommendations.push({
        id: '10',
        style: 'Soft',
        occasion: 'Date',
        description: 'Flowing fabrics in soft colors - try a silk blouse or dress with delicate details. Add subtle jewelry and a light perfume or cologne.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '11',
        style: 'Elegant',
        occasion: 'Evening',
        description: 'A well-fitted dress or suit in a flattering silhouette. Choose rich textures like velvet or satin and add one statement accessory.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '12',
        style: 'Dreamy',
        occasion: 'Casual',
        description: 'Soft layers with feminine or refined details - think lace trims, soft pleats, or subtle embroidery. Choose colors like blush, lavender, or baby blue.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'relaxed') {
      recommendations.push({
        id: '13',
        style: 'Comfort',
        occasion: 'Casual',
        description: 'Soft, relaxed-fit clothing like an oversized sweater with comfortable pants or leggings. Add cozy socks and minimal accessories.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '14',
        style: 'Lounge',
        occasion: 'Home',
        description: 'Elevated loungewear in coordinated colors. Try matching sets in soft fabrics or upgrade your basics with quality t-shirts and well-fitted sweatpants.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '15',
        style: 'Easygoing',
        occasion: 'Weekend',
        description: 'Casual pieces with an effortless vibe - think loose linen pants, soft cotton tops, or a simple jersey dress. Comfort is key, but with a put-together feel.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'focused') {
      recommendations.push({
        id: '16',
        style: 'Structured',
        occasion: 'Work',
        description: 'Clean lines and minimal distractions. Choose a monochromatic outfit in neutral tones with simple, functional accessories.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '17',
        style: 'Practical',
        occasion: 'Study',
        description: 'Comfortable but put-together pieces in layers that can adapt to changing environments. Think button-ups over tees with smart pants or jeans.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '18',
        style: 'Professional',
        occasion: 'Meeting',
        description: 'Polished pieces that project competence - a well-tailored blazer or cardigan, crisp shirt, and dark denim or tailored pants with minimal accessories.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'inspired') {
      recommendations.push({
        id: '19',
        style: 'Dynamic',
        occasion: 'Creative',
        description: 'Clothing that moves with you - flowy tops, interesting layers, and comfortable bottoms in energizing colors like bright blue or emerald green.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '20',
        style: 'Artistic',
        occasion: 'Artistic',
        description: 'Channel your inspiration through artistic elements - tops with interesting prints, handcrafted jewelry, or pieces with unique design details.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '21',
        style: 'Free-spirited',
        occasion: 'Casual',
        description: 'Bohemian-inspired items that express creativity - think patterned maxi dresses, relaxed-fit jeans with an embroidered top, or layered necklaces.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    } else if (selectedMood === 'thoughtful') {
      recommendations.push({
        id: '22',
        style: 'Measured',
        occasion: 'Casual',
        description: 'Simple pieces with interesting details - a basic tee with unique stitching, classic jeans with an unexpected wash, or minimalist shoes with subtle texture.',
        modelUrl: models[0],
        imageUrl: images[0],
        colorPalette: colors
      });
      recommendations.push({
        id: '23',
        style: 'Refined',
        occasion: 'Formal',
        description: 'Timeless pieces in high-quality fabrics - think cashmere sweaters, wool trousers, or a perfectly tailored blazer with minimal but meaningful accessories.',
        modelUrl: models[1],
        imageUrl: images[1],
        colorPalette: colors
      });
      recommendations.push({
        id: '24',
        style: 'Contemplative',
        occasion: 'Reading/Cafe',
        description: 'Cozy yet presentable outfits for public solitude - oversized sweater with nice jeans, comfortable but stylish shoes, and perhaps a scarf or hat.',
        modelUrl: models[2],
        imageUrl: images[2],
        colorPalette: colors
      });
    }
    
    // Adjust for energy level
    if (energy < 30) {
      // Low energy recommendations focus on comfort
      recommendations.push({
        id: '25',
        style: 'Comfort+',
        occasion: 'Low-Energy Day',
        description: 'Soft, loose-fitting clothes in neutral colors. Try jersey fabrics, oversized cardigans, and slip-on shoes. Focus on feeling good over high fashion.',
        modelUrl: '/models/low-energy-outfit.glb',
        imageUrl: '/images/moods/low-energy.jpg',
        colorPalette: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575']
      });
    } else if (energy > 70) {
      // High energy recommendations add more bold elements
      recommendations.push({
        id: '26',
        style: 'Statement',
        occasion: 'High-Energy Day',
        description: 'Bold colors and eye-catching pieces that match your energetic mood. Try a statement jacket, bright accessories, or your "power outfit" that always gets compliments.',
        modelUrl: '/models/high-energy-outfit.glb',
        imageUrl: '/images/moods/high-energy.jpg',
        colorPalette: ['#F44336', '#FF9800', '#FFEB3B', '#4CAF50', '#2196F3']
      });
    }
    
    setOutfits(recommendations);
  };
  
  const getEnergyLabel = (value: number) => {
    if (value < 30) return 'Low';
    if (value < 70) return 'Medium';
    return 'High';
  };
  
  // Function to render color palette swatches
  const renderColorSwatches = (colors: string[]) => {
    return (
      <div className="flex space-x-1 mt-2">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="w-5 h-5 rounded-full" 
            style={{ backgroundColor: color }} 
            title={color}
          />
        ))}
      </div>
    );
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
                        <SelectItem value="focused">Focused & Determined</SelectItem>
                        <SelectItem value="inspired">Inspired & Artistic</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful & Reflective</SelectItem>
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
                        
                        {selectedColorPalette.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-1">Mood Color Palette:</p>
                            {renderColorSwatches(selectedColorPalette)}
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        {mood in moodEmojis ? moodEmojis[mood as keyof typeof moodEmojis] : <Smile className="h-6 w-6 text-primary" />}
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <p className="text-muted-foreground">
                        {mood === 'happy' && "Your joyful mood calls for vibrant, uplifting clothes that match your positive energy."}
                        {mood === 'confident' && "Bold, structured pieces will complement your confident attitude and help you make a statement."}
                        {mood === 'creative' && "Expressive, unique pieces with interesting details will align with your creative energy."}
                        {mood === 'romantic' && "Soft, flowing silhouettes and delicate details will enhance your dreamy mood."}
                        {mood === 'energetic' && "Dynamic, practical pieces that move with you will complement your high energy levels."}
                        {mood === 'relaxed' && "Comfortable, effortless pieces will maintain your calm state while keeping you stylish."}
                        {mood === 'focused' && "Clean, minimal designs will help maintain your concentration without distractions."}
                        {mood === 'inspired' && "Expressive pieces with artistic elements will channel your inspirational energy."}
                        {mood === 'thoughtful' && "Refined, considered choices with meaningful details match your reflective state."}
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
          
          {mood && (
            <div className="mb-6">
              <Card className="bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  {mood in moodEmojis ? moodEmojis[mood as keyof typeof moodEmojis] : <Star className="h-6 w-6 text-primary" />}
                  <div>
                    <h4 className="font-medium capitalize">{mood} Mood Style Guide</h4>
                    <p className="text-sm text-muted-foreground">
                      {mood === 'happy' && "Express your joy through bright colors, playful patterns, and comfortable fits that let you move freely."}
                      {mood === 'confident' && "Embrace power dressing with bold colors, structured silhouettes, and statement accessories that command attention."}
                      {mood === 'creative' && "Mix unexpected patterns, textures, and colors. Break conventional rules and express your unique perspective."}
                      {mood === 'romantic' && "Choose soft fabrics, delicate details, and flowing silhouettes in gentle, flattering colors."}
                      {mood === 'energetic' && "Opt for practical, comfortable pieces in vibrant colors that won't restrict movement and match your active state."}
                      {mood === 'relaxed' && "Prioritize comfort with soft fabrics, loose fits, and calming neutral or cool tones."}
                      {mood === 'focused' && "Minimize distractions with clean lines, functional design, and limited color palettes that help maintain concentration."}
                      {mood === 'inspired' && "Channel your inspiration through unique pieces with artistic elements, interesting silhouettes, or meaningful details."}
                      {mood === 'thoughtful' && "Select timeless, quality pieces with considered details and a sense of purpose in their design."}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit, index) => (
              <div key={outfit.id} className="space-y-2">
                <OutfitCard
                  key={outfit.id}
                  index={index}
                  style={outfit.style}
                  occasion={outfit.occasion}
                  description={outfit.description}
                />
                
                {outfit.modelUrl && (
                  <div className="h-48 border rounded-md overflow-hidden">
                    <ThreeDModelViewer 
                      modelUrl={outfit.modelUrl} 
                      title={`${outfit.style} - ${outfit.occasion}`}
                      showControls={false}
                      className="w-full h-full"
                    />
                  </div>
                )}
                
                {outfit.colorPalette && outfit.colorPalette.length > 0 && (
                  <div className="flex items-center gap-2 px-2 py-1">
                    <span className="text-xs text-muted-foreground">Color Palette:</span>
                    {renderColorSwatches(outfit.colorPalette)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {mood && outfits.length > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg mt-6">
          <h4 className="font-medium mb-2">Style Tips for {mood.charAt(0).toUpperCase() + mood.slice(1)} Moods</h4>
          <ul className="space-y-2 text-sm">
            {mood === 'happy' && (
              <>
                <li>• Bright colors like yellow, coral, and turquoise can amplify your happy mood</li>
                <li>• Look for fun details like pockets, interesting buttons, or playful prints</li>
                <li>• Choose comfortable pieces that allow easy movement and won't restrict your joyful energy</li>
                <li>• Don't be afraid to add colorful accessories that bring a smile to your face</li>
              </>
            )}
            {mood === 'confident' && (
              <>
                <li>• Sharp tailoring and strong silhouettes help project confidence</li>
                <li>• Consider a signature color or accessory that becomes part of your power look</li>
                <li>• Pay attention to fit - well-fitted clothes instantly boost confidence</li>
                <li>• Balance statement pieces with more understated items for a composed look</li>
              </>
            )}
            {mood === 'creative' && (
              <>
                <li>• Mix patterns and textures in unexpected ways to express creativity</li>
                <li>• Incorporate unique vintage or handmade pieces that tell a story</li>
                <li>• Try asymmetrical designs or unconventional silhouettes</li>
                <li>• Use accessories as conversation starters or artistic statements</li>
              </>
            )}
            {mood === 'romantic' && (
              <>
                <li>• Soft fabrics like silk, chiffon, and cashmere enhance the romantic mood</li>
                <li>• Look for feminine details like lace, pleats, ruffles, or delicate embroidery</li>
                <li>• Choose a flattering silhouette that makes you feel beautiful</li>
                <li>• Subtle, personal jewelry pieces add a meaningful touch</li>
              </>
            )}
            {mood === 'energetic' && (
              <>
                <li>• Opt for lightweight, breathable fabrics that move with you</li>
                <li>• Vibrant colors and dynamic patterns can match and enhance your energy</li>
                <li>• Choose practical designs with pockets and comfortable closures</li>
                <li>• Look for versatile pieces that transition well between different activities</li>
              </>
            )}
            {mood === 'relaxed' && (
              <>
                <li>• Prioritize soft, natural fabrics that feel good against your skin</li>
                <li>• Choose loose but flattering silhouettes rather than constricting fits</li>
                <li>• Opt for a calming color palette with blues, greens, and neutrals</li>
                <li>• Consider the weight of your clothes - lighter items often feel more relaxing</li>
              </>
            )}
            {mood === 'focused' && (
              <>
                <li>• Minimize distractions with simple designs and limited patterns</li>
                <li>• Choose a consistent color palette to reduce decision fatigue</li>
                <li>• Opt for practical, functional pieces that won't need constant adjustment</li>
                <li>• Consider comfortable but professional pieces that help maintain concentration</li>
              </>
            )}
            {mood === 'inspired' && (
              <>
                <li>• Incorporate pieces that reference your sources of inspiration</li>
                <li>• Look for items with interesting construction or artistic details</li>
                <li>• Use color intentionally to express and enhance your creative energy</li>
                <li>• Mix high and low pieces to create unexpected and inspiring combinations</li>
              </>
            )}
            {mood === 'thoughtful' && (
              <>
                <li>• Choose timeless pieces with considered design and quality materials</li>
                <li>• Look for items with meaning or a story behind them</li>
                <li>• Pay attention to small details like stitching, buttons, or fabric texture</li>
                <li>• Opt for versatile items that serve multiple purposes in your wardrobe</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MoodBasedStyling;
