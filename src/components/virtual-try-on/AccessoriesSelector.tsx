
import { Card, CardContent } from '@/components/ui/card';
import { Wand2, Glasses, Crown, Shapes } from 'lucide-react';

interface AccessoriesSelectorProps {
  selectedAccessory: string | null;
  onAccessorySelect: (name: string) => void;
}

const AccessoriesSelector = ({
  selectedAccessory,
  onAccessorySelect
}: AccessoriesSelectorProps) => {
  // Sample accessories for demonstration
  const accessories = [
    { id: 1, name: "Sunglasses", icon: <Glasses className="h-5 w-5" /> },
    { id: 2, name: "Crown", icon: <Crown className="h-5 w-5" /> },
    { id: 3, name: "Earrings", icon: <Shapes className="h-5 w-5" /> },
    { id: 4, name: "Necklace", icon: <Shapes className="h-5 w-5" /> },
  ];

  return (
    <div className="bg-card rounded-lg p-4 border">
      <div className="flex items-center mb-4">
        <Wand2 className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Accessories</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {accessories.map(accessory => (
          <Card 
            key={accessory.id}
            className={`cursor-pointer transition-all hover:border-primary ${selectedAccessory === accessory.name ? 'border-2 border-primary' : ''}`}
            onClick={() => onAccessorySelect(accessory.name)}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {accessory.icon}
              </div>
              <span className="text-sm">{accessory.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesSelector;
