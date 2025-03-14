
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

export const RecommendationForm = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    style: 'casual',
    occasion: 'everyday',
    colorPreference: 'neutral',
    budget: [50],
    season: 'summer'
  });

  const handleChange = (field: string, value: string | number[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Your personalized recommendations are ready!");
    }, 2000);
  };

  const getBudgetLabel = (value: number) => {
    if (value < 25) return 'Budget';
    if (value < 50) return 'Moderate';
    if (value < 75) return 'Premium';
    return 'Luxury';
  };

  return (
    <section id="ai-recommendations" className="py-20 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold">AI Style Recommendations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Answer a few questions about your preferences, and our AI will curate personalized outfit recommendations just for you.
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/60 dark:bg-black/60 border border-border/50 overflow-hidden animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-0">
            <Tabs defaultValue="preferences" className="w-full">
              <div className="p-6 border-b border-border/50">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preferences" className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="style">Your Style</Label>
                      <Select
                        value={formData.style}
                        onValueChange={(value) => handleChange('style', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="streetwear">Streetwear</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="bohemian">Bohemian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="occasion">Occasion</Label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) => handleChange('occasion', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyday">Everyday</SelectItem>
                          <SelectItem value="work">Work</SelectItem>
                          <SelectItem value="date">Date Night</SelectItem>
                          <SelectItem value="party">Party</SelectItem>
                          <SelectItem value="formal-event">Formal Event</SelectItem>
                          <SelectItem value="outdoor">Outdoor Activities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="colorPreference">Color Preference</Label>
                      <Select
                        value={formData.colorPreference}
                        onValueChange={(value) => handleChange('colorPreference', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select color preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neutral">Neutral Tones</SelectItem>
                          <SelectItem value="bright">Bright Colors</SelectItem>
                          <SelectItem value="pastels">Pastels</SelectItem>
                          <SelectItem value="monochrome">Monochrome</SelectItem>
                          <SelectItem value="earth">Earth Tones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="season">Season</Label>
                      <Select
                        value={formData.season}
                        onValueChange={(value) => handleChange('season', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="fall">Fall</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                          <SelectItem value="all-seasons">All Seasons</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="budget">Budget Range</Label>
                      <span className="text-sm font-medium">
                        {getBudgetLabel(formData.budget[0])}
                      </span>
                    </div>
                    <Slider
                      id="budget"
                      value={formData.budget}
                      onValueChange={(value) => handleChange('budget', value)}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 w-full max-w-md text-base transition-all"
                      disabled={loading}
                    >
                      {loading ? "Generating Recommendations..." : "Get AI Recommendations"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="advanced" className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label htmlFor="bodyType">Body Type</Label>
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue placeholder="Select body type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Not specified</SelectItem>
                          <SelectItem value="rectangle">Rectangle</SelectItem>
                          <SelectItem value="hourglass">Hourglass</SelectItem>
                          <SelectItem value="triangle">Triangle</SelectItem>
                          <SelectItem value="inverted-triangle">Inverted Triangle</SelectItem>
                          <SelectItem value="oval">Oval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="fabricPreference">Fabric Preference</Label>
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue placeholder="Select fabric preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">No preference</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="linen">Linen</SelectItem>
                          <SelectItem value="silk">Silk</SelectItem>
                          <SelectItem value="wool">Wool</SelectItem>
                          <SelectItem value="synthetic">Synthetic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="patternPreference">Pattern Preference</Label>
                      <Select defaultValue="default">
                        <SelectTrigger>
                          <SelectValue placeholder="Select pattern preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">No preference</SelectItem>
                          <SelectItem value="solid">Solid Colors</SelectItem>
                          <SelectItem value="stripes">Stripes</SelectItem>
                          <SelectItem value="floral">Floral</SelectItem>
                          <SelectItem value="geometric">Geometric</SelectItem>
                          <SelectItem value="plaid">Plaid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="brands">Favorite Brands</Label>
                      <Input placeholder="Enter brands separated by commas" />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button 
                      className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 w-full max-w-md text-base transition-all"
                      disabled={loading}
                    >
                      {loading ? "Generating Recommendations..." : "Get Advanced Recommendations"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecommendationForm;
