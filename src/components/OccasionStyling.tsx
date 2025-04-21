import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OutfitCard from '@/components/OutfitCard';
import { Briefcase, Martini, Coffee, Utensils, Dumbbell, Moon } from 'lucide-react';
import { outfitImages } from '@/lib/outfit-data';

const OccasionStyling = () => {
  const occasionCategories = [
    { id: 'work', label: 'Work', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: 'formal', label: 'Formal Events', icon: <Moon className="h-4 w-4 mr-2" /> },
    { id: 'casual', label: 'Casual', icon: <Coffee className="h-4 w-4 mr-2" /> },
    { id: 'dinner', label: 'Dinner', icon: <Utensils className="h-4 w-4 mr-2" /> },
    { id: 'party', label: 'Party', icon: <Martini className="h-4 w-4 mr-2" /> },
    { id: 'workout', label: 'Workout', icon: <Dumbbell className="h-4 w-4 mr-2" /> },
  ];
  
  const occasionOutfits = {
    work: [
      {
        id: 'work-1',
        style: 'Business Casual',
        occasion: 'Office',
        description: 'Navy blazer, light blue dress shirt, gray chinos, and brown leather loafers. Add a simple watch and minimal accessories.',
        image: outfitImages.occasion.work[0]
      },
      {
        id: 'work-2',
        style: 'Business Professional',
        occasion: 'Meeting',
        description: 'Charcoal suit with a white dress shirt and burgundy tie. Black Oxford shoes and a matching belt, with a subtle pocket square.',
        image: outfitImages.occasion.work[1]
      },
      {
        id: 'work-3',
        style: 'Smart Casual',
        occasion: 'Creative Office',
        description: 'Dark jeans with a tucked-in button-up shirt, leather belt, and clean sneakers or Chelsea boots. Add a casual blazer for meetings.',
        image: outfitImages.occasion.work[2]
      }
    ],
    formal: [
      {
        id: 'formal-1',
        style: 'Black Tie',
        occasion: 'Gala',
        description: 'Classic black tuxedo with satin lapels, white dress shirt, black bow tie, and patent leather shoes. Add elegant cufflinks.',
        image: outfitImages.occasion.formal[0]
      },
      {
        id: 'formal-2',
        style: 'Formal Evening',
        occasion: 'Wedding',
        description: 'Navy or midnight blue suit with subtle pattern, white or light blue shirt, silk tie, and polished oxfords. Add a pocket square.',
        image: outfitImages.occasion.formal[1]
      },
      {
        id: 'formal-3',
        style: 'Semi-Formal',
        occasion: 'Cocktail Party',
        description: 'Dark suit (no tuxedo) with a crisp shirt, patterned tie or no tie, and leather dress shoes. Add a tasteful watch.',
        image: outfitImages.occasion.formal[2]
      }
    ],
    casual: [
      {
        id: 'casual-1',
        style: 'Smart Casual',
        occasion: 'Weekend Brunch',
        description: 'Khaki chinos with a polo shirt or casual button-down with rolled sleeves. Add clean sneakers or loafers and a casual watch.',
        image: outfitImages.occasion.casual[0]
      },
      {
        id: 'casual-2',
        style: 'Relaxed',
        occasion: 'Shopping',
        description: 'Dark wash jeans with a quality t-shirt or henley. Add a light jacket or overshirt, and comfortable sneakers or boots.',
        image: outfitImages.occasion.casual[1]
      },
      {
        id: 'casual-3',
        style: 'Streetwear',
        occasion: 'Hanging Out',
        description: 'Premium sweatshirt or hoodie with tapered joggers or jeans. Add trendy sneakers and a casual beanie or cap.',
        image: outfitImages.occasion.casual[2]
      }
    ],
    dinner: [
      {
        id: 'dinner-1',
        style: 'Smart Casual',
        occasion: 'Nice Restaurant',
        description: 'Dark jeans or chinos with a button-down shirt or polo. Add a blazer for upscale venues, and dress shoes or clean sneakers.',
        image: outfitImages.occasion.dinner[0]
      },
      {
        id: 'dinner-2',
        style: 'Formal',
        occasion: 'Fine Dining',
        description: 'Dark suit with a crisp dress shirt, elegant tie, and well-polished dress shoes. Add a subtle pocket square and minimal jewelry.',
        image: outfitImages.occasion.dinner[1]
      },
      {
        id: 'dinner-3',
        style: 'Business Casual',
        occasion: 'Business Dinner',
        description: 'Navy blazer with gray trousers, light-colored dress shirt (no tie), and leather loafers. Add a leather belt and watch.',
        image: outfitImages.occasion.dinner[2]
      }
    ],
    party: [
      {
        id: 'party-1',
        style: 'Nightclub',
        occasion: 'Club Night',
        description: 'Dark, slim-fit jeans or trousers with a stylish button-up or fashionable t-shirt. Add a leather jacket and statement sneakers or boots.',
        image: outfitImages.occasion.party[0]
      },
      {
        id: 'party-2',
        style: 'House Party',
        occasion: 'Social Gathering',
        description: 'Dark jeans with a casual button-down or quality t-shirt. Layer with a bomber jacket or cardigan, and add clean, casual footwear.',
        image: outfitImages.occasion.party[1]
      },
      {
        id: 'party-3',
        style: 'Cocktail',
        occasion: 'Upscale Party',
        description: 'Dark suit worn with an open-collar shirt (no tie) or a turtleneck. Add leather dress shoes and minimal, elegant accessories.',
        image: outfitImages.occasion.party[2]
      }
    ],
    workout: [
      {
        id: 'workout-1',
        style: 'Gym',
        occasion: 'Weight Training',
        description: 'Moisture-wicking t-shirt or tank top with performance shorts or joggers. Add supportive athletic shoes and a lightweight hoodie for warm-up.',
        image: outfitImages.occasion.workout[0]
      },
      {
        id: 'workout-2',
        style: 'Running',
        occasion: 'Outdoor Cardio',
        description: 'Lightweight running shorts or tights with a breathable performance t-shirt. Add running shoes, moisture-wicking socks, and a cap.',
        image: outfitImages.occasion.workout[1]
      },
      {
        id: 'workout-3',
        style: 'Yoga/Pilates',
        occasion: 'Flexibility Training',
        description: 'Comfortable, stretchy pants or shorts with a fitted t-shirt or tank. Add slip-resistant socks or barefoot shoes and a light zip-up for before/after.',
        image: outfitImages.occasion.workout[2]
      }
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-medium mb-2">Occasion-Based Styling Guide</h3>
        <p className="text-muted-foreground">
          Find the perfect outfit for any occasion with our tailored recommendations.
        </p>
      </div>
      
      <Tabs defaultValue="work" className="w-full">
        <TabsList className="flex flex-wrap h-auto justify-center mb-4">
          {occasionCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              {category.icon}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(occasionOutfits).map(([occasionId, outfits]) => (
          <TabsContent key={occasionId} value={occasionId} className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.map((outfit, index) => (
                <OutfitCard
                  key={outfit.id}
                  index={index}
                  style={outfit.style}
                  occasion={outfit.occasion}
                  description={outfit.description}
                  image={outfit.image}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OccasionStyling;
