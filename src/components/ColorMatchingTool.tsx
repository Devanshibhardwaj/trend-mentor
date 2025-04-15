
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface ColorPalette {
  name: string;
  colors: {
    name: string;
    hex: string;
  }[];
}

const ColorMatchingTool = () => {
  const [skinTone, setSkinTone] = useState("");
  const [colorPreference, setColorPreference] = useState("");
  const [recommendedPalettes, setRecommendedPalettes] = useState<ColorPalette[]>([]);
  
  const skinTones = [
    { value: "fair", label: "Fair" },
    { value: "light", label: "Light" },
    { value: "medium", label: "Medium" },
    { value: "olive", label: "Olive" },
    { value: "tan", label: "Tan" },
    { value: "deep", label: "Deep" },
  ];
  
  const colorPreferences = [
    { value: "warm", label: "Warm Colors" },
    { value: "cool", label: "Cool Colors" },
    { value: "neutral", label: "Neutral Tones" },
    { value: "bright", label: "Bright Colors" },
    { value: "pastel", label: "Pastel Colors" },
  ];
  
  // Color palettes based on skin tone and preference combinations
  const colorPalettes: Record<string, Record<string, ColorPalette[]>> = {
    fair: {
      warm: [
        {
          name: "Autumn Warm",
          colors: [
            { name: "Soft Peach", hex: "#FDE1D3" },
            { name: "Copper", hex: "#D46F4D" },
            { name: "Golden Yellow", hex: "#F6BD60" },
            { name: "Forest Green", hex: "#1D3C34" },
          ]
        }
      ],
      cool: [
        {
          name: "Winter Cool",
          colors: [
            { name: "Icy Blue", hex: "#D3E4FD" },
            { name: "Deep Purple", hex: "#6E59A5" },
            { name: "Magenta", hex: "#D946EF" },
            { name: "Emerald", hex: "#059669" },
          ]
        }
      ],
      // Additional palettes would be defined similarly
    },
    medium: {
      warm: [
        {
          name: "Summer Glow",
          colors: [
            { name: "Terracotta", hex: "#C56536" },
            { name: "Soft Gold", hex: "#FEF7CD" },
            { name: "Olive Green", hex: "#626940" },
            { name: "Navy Blue", hex: "#263849" },
          ]
        }
      ],
      // Additional palettes would be defined similarly
    },
    // Additional skin tones would be defined similarly
  };
  
  const getRecommendations = () => {
    if (!skinTone || !colorPreference) {
      toast.error("Please select both skin tone and color preference");
      return;
    }
    
    // Default recommendations if specific combination not found
    const defaultPalettes = [
      {
        name: "Universal Palette",
        colors: [
          { name: "Navy Blue", hex: "#0F172A" },
          { name: "White", hex: "#FFFFFF" },
          { name: "Medium Gray", hex: "#8A898C" },
          { name: "Burgundy", hex: "#800020" },
        ]
      }
    ];
    
    const palettes = colorPalettes[skinTone]?.[colorPreference] || defaultPalettes;
    setRecommendedPalettes(palettes);
    
    toast.success("Color analysis complete! Here are your recommended color palettes.");
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Skin Tone</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={skinTone} onValueChange={setSkinTone} className="space-y-3">
              {skinTones.map((tone) => (
                <div key={tone.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={tone.value} id={`skin-${tone.value}`} />
                  <Label htmlFor={`skin-${tone.value}`}>{tone.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Color Preference</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={colorPreference} onValueChange={setColorPreference} className="space-y-3">
              {colorPreferences.map((pref) => (
                <div key={pref.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={pref.value} id={`pref-${pref.value}`} />
                  <Label htmlFor={`pref-${pref.value}`}>{pref.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button size="lg" onClick={getRecommendations}>
          Get Color Recommendations
        </Button>
      </div>
      
      {recommendedPalettes.length > 0 && (
        <div className="mt-10 space-y-6">
          <Separator />
          <h3 className="text-xl font-medium">Your Color Palette Recommendations</h3>
          <p className="text-muted-foreground">
            Based on your skin tone and preferences, these color palettes will complement your natural coloring.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedPalettes.map((palette, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{palette.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                      {palette.colors.map((color, i) => (
                        <div key={i} className="space-y-1">
                          <div 
                            className="h-16 rounded-md border border-border" 
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-xs text-center font-medium">{color.name}</p>
                          <p className="text-xs text-center text-muted-foreground">{color.hex}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <p className="font-medium">Styling Tips:</p>
                      <p className="text-muted-foreground">
                        • Use {palette.colors[0].name} for statement pieces<br />
                        • {palette.colors[1].name} works well for everyday basics<br />
                        • Add {palette.colors[2].name} for accent pieces and accessories
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMatchingTool;
