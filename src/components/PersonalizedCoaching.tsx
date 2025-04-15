
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles, BookOpen, Lightbulb, Heart, Star, Backpack } from 'lucide-react';
import { toast } from 'sonner';
import StyleAvatar from './StyleAvatar';

interface CoachingTip {
  id: string;
  category: string;
  title: string;
  description: string;
}

const initialAffirmations = [
  "Your style is a reflection of your unique personality. Embrace it!",
  "Confidence comes from within, but a great outfit can help it shine.",
  "You don't have to follow every trend. Wear what makes you feel good.",
  "Your body is perfect as it is. Dress to celebrate it, not hide it.",
  "The best accessory you can wear is your smile and confidence."
];

const PersonalizedCoaching = () => {
  const [bodyType, setBodyType] = useState('');
  const [personality, setPersonality] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [affirmation, setAffirmation] = useState(initialAffirmations[0]);
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<CoachingTip[]>([]);
  const [activeTab, setActiveTab] = useState('style');
  
  const handleGetCoaching = () => {
    if (!bodyType || !personality || !lifestyle) {
      toast.error('Please fill in all fields to get personalized coaching');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      generateCoachingTips(bodyType, personality, lifestyle);
      rotateAffirmation();
      setLoading(false);
    }, 1500);
  };
  
  const rotateAffirmation = () => {
    const currentIndex = initialAffirmations.indexOf(affirmation);
    const nextIndex = (currentIndex + 1) % initialAffirmations.length;
    setAffirmation(initialAffirmations[nextIndex]);
  };
  
  const generateCoachingTips = (bodyType: string, personality: string, lifestyle: string) => {
    const recommendations: CoachingTip[] = [];
    
    // Style recommendations based on body type
    if (bodyType === 'hourglass') {
      recommendations.push({
        id: '1',
        category: 'Body Type',
        title: 'Highlight Your Natural Curves',
        description: 'Wrap dresses, belted tops, and high-waisted bottoms will enhance your balanced proportions. Avoid oversized clothing that hides your natural shape.'
      });
    } else if (bodyType === 'pear') {
      recommendations.push({
        id: '2',
        category: 'Body Type',
        title: 'Balance Your Proportions',
        description: 'Draw attention to your upper body with structured shoulders, statement necklaces, and brighter colors on top. A-line skirts and dark bottoms will flatter your lower half.'
      });
    } else if (bodyType === 'apple') {
      recommendations.push({
        id: '3',
        category: 'Body Type',
        title: 'Emphasize Your Best Features',
        description: 'Empire waistlines, V-necks, and vertical patterns create a lengthening effect. Highlight your legs with straight-leg pants or A-line skirts.'
      });
    } else if (bodyType === 'rectangle') {
      recommendations.push({
        id: '4',
        category: 'Body Type',
        title: 'Create Dimension',
        description: 'Ruffles, layered tops, and belted waists can create the illusion of curves. Experiment with different textures and cuts to add visual interest to your silhouette.'
      });
    }
    
    // Personality-based style tips
    if (personality === 'creative') {
      recommendations.push({
        id: '5',
        category: 'Personality',
        title: 'Express Your Uniqueness',
        description: 'Mix patterns and colors that reflect your artistic side. Vintage pieces, handcrafted accessories, and unexpected combinations will showcase your creativity.'
      });
    } else if (personality === 'classic') {
      recommendations.push({
        id: '6',
        category: 'Personality',
        title: 'Timeless Elegance',
        description: 'Invest in quality basics with clean lines and neutral colors. Think tailored blazers, crisp button-downs, and well-fitted jeans that never go out of style.'
      });
    } else if (personality === 'minimalist') {
      recommendations.push({
        id: '7',
        category: 'Personality',
        title: 'Thoughtful Simplicity',
        description: 'Focus on a capsule wardrobe with high-quality pieces in harmonious colors. Each item should serve multiple purposes and pair well with others.'
      });
    } else if (personality === 'dramatic') {
      recommendations.push({
        id: '8',
        category: 'Personality',
        title: 'Make a Statement',
        description: 'Bold colors, eye-catching accessories, and avant-garde silhouettes will satisfy your desire to stand out. Don\'t be afraid to try the latest trends and statement pieces.'
      });
    }
    
    // Lifestyle recommendations
    if (lifestyle === 'professional') {
      recommendations.push({
        id: '9',
        category: 'Lifestyle',
        title: 'Corporate Confidence',
        description: 'Build a wardrobe of interchangeable professional pieces. A well-fitted blazer, tailored pants, and quality shoes create a foundation for daily confidence in the workplace.'
      });
    } else if (lifestyle === 'active') {
      recommendations.push({
        id: '10',
        category: 'Lifestyle',
        title: 'Functional Fashion',
        description: 'Invest in athleisure that transitions well from workout to casual outings. Look for breathable, stretchy fabrics with moisture-wicking properties in styles you\'d be happy to wear beyond the gym.'
      });
    } else if (lifestyle === 'casual') {
      recommendations.push({
        id: '11',
        category: 'Lifestyle',
        title: 'Effortless Style',
        description: 'Elevated basics like quality t-shirts, well-fitted jeans, and versatile sneakers form the backbone of a casual wardrobe. Add personality with accessories and statement pieces.'
      });
    } else if (lifestyle === 'social') {
      recommendations.push({
        id: '12',
        category: 'Lifestyle',
        title: 'Versatile Evening Wear',
        description: 'Have a few go-to outfits for different types of events. A classic cocktail dress or a sharp blazer with dark jeans can be styled differently with accessories for various occasions.'
      });
    } else if (lifestyle === 'student') {
      recommendations.push({
        id: '13',
        category: 'Lifestyle',
        title: 'Campus Style',
        description: 'Create a versatile wardrobe that transitions from lectures to study sessions to social events. Layer comfortable basics with statement pieces that express your individuality while remaining practical for long days on campus.'
      });
    }
    
    // Add a confidence booster
    recommendations.push({
      id: '14',
      category: 'Confidence',
      title: 'Body Language Matters',
      description: 'Stand tall with shoulders back and head held high. Research shows that good posture not only makes you look more confident but actually helps you feel more confident too.'
    });
    
    // Add a communication tip
    recommendations.push({
      id: '15',
      category: 'Communication',
      title: 'Authentic Conversations',
      description: 'Make eye contact, ask open-ended questions, and practice active listening. Remember that being interested makes you interesting to others.'
    });
    
    setTips(recommendations);
    setActiveTab('avatar');
  };
  
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-blue-950/30 dark:to-purple-900/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Personalized Style & Confidence Coaching</h3>
                <p className="text-muted-foreground">
                  Get expert advice tailored to your unique personality, body type, and lifestyle to help you look and feel your best.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="bodyType">What's your body type?</Label>
                    <Select value={bodyType} onValueChange={setBodyType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your body type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourglass">Hourglass</SelectItem>
                        <SelectItem value="pear">Pear</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="rectangle">Rectangle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="personality">How would you describe your personality?</Label>
                    <Select value={personality} onValueChange={setPersonality}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your personality style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="creative">Creative & Artistic</SelectItem>
                        <SelectItem value="classic">Classic & Traditional</SelectItem>
                        <SelectItem value="minimalist">Minimalist & Practical</SelectItem>
                        <SelectItem value="dramatic">Dramatic & Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="lifestyle">What's your primary lifestyle?</Label>
                    <Select value={lifestyle} onValueChange={setLifestyle}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your lifestyle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Corporate/Professional</SelectItem>
                        <SelectItem value="student">Student/Academic</SelectItem>
                        <SelectItem value="active">Active/Athletic</SelectItem>
                        <SelectItem value="casual">Casual/Relaxed</SelectItem>
                        <SelectItem value="social">Social/Going Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleGetCoaching} disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Personalizing your coaching...
                      </>
                    ) : (
                      'Get Personalized Coaching'
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-white/60 dark:bg-black/40 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Daily Affirmation</h4>
                      <p className="text-sm text-muted-foreground mt-1">Boost your confidence</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="italic text-sm">&ldquo;{affirmation}&rdquo;</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full" onClick={rotateAffirmation}>
                      <Star className="h-4 w-4 mr-2" />
                      New Affirmation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {tips.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-6">Your Personalized Coaching Tips</h3>
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="style">Style Tips</TabsTrigger>
              <TabsTrigger value="avatar">Virtual Avatar</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips
                  .filter(tip => tip.category === 'Body Type' || tip.category === 'Personality' || tip.category === 'Lifestyle')
                  .map(tip => (
                    <Card key={tip.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            {tip.category === 'Lifestyle' && tip.title === 'Campus Style' ? (
                              <Backpack className="h-5 w-5 text-primary" />
                            ) : (
                              <Sparkles className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">{tip.category}</span>
                            <h4 className="font-medium mt-2">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="avatar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <StyleAvatar bodyType={bodyType} personality={personality} />
                </div>
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-4">How to Apply Your Style Tips</h4>
                      <div className="space-y-4">
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h5 className="font-medium text-sm">Your Body Language</h5>
                          <p className="text-sm mt-1">
                            Research shows that 55% of first impressions are based on appearance and body language. Practicing confident posture can actually influence how you feel about yourself.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h5 className="font-medium text-sm">Matching Posture to Occasion</h5>
                          <p className="text-sm mt-1">
                            Different settings call for different body language. In professional settings, maintain an upright, engaged posture. In social settings, a more relaxed but still attentive posture works well.
                          </p>
                        </div>
                        
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h5 className="font-medium text-sm">Posture and Your Clothing</h5>
                          <p className="text-sm mt-1">
                            Good posture enhances how your clothes look on you. When trying on outfits, practice the posture you'll have when wearing them to ensure they flatter your body in motion.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="confidence">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips
                  .filter(tip => tip.category === 'Confidence')
                  .map(tip => (
                    <Card key={tip.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Lightbulb className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">{tip.category}</span>
                            <h4 className="font-medium mt-2">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
                
                {/* Additional confidence card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Lightbulb className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">Confidence</span>
                        <h4 className="font-medium mt-2">Dress for Your Mood</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          When you're feeling low on confidence, wear something in a color that makes you feel good. 
                          Research shows that colors can affect your mood and how others perceive you.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips
                  .filter(tip => tip.category === 'Communication')
                  .map(tip => (
                    <Card key={tip.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">{tip.category}</span>
                            <h4 className="font-medium mt-2">{tip.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
                
                {/* Additional communication cards */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">Communication</span>
                        <h4 className="font-medium mt-2">The Power of Pause</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          In conversations, don't rush to fill silences. Taking a moment to think before responding 
                          shows confidence and leads to more thoughtful communication.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50">Communication</span>
                        <h4 className="font-medium mt-2">Prepare for Important Conversations</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          For interviews or important meetings, prepare a few key points you want to make.
                          This reduces anxiety and helps you communicate more clearly and confidently.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PersonalizedCoaching;
