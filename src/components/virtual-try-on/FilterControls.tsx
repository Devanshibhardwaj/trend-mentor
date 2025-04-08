
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sliders } from 'lucide-react';

interface FilterControlsProps {
  activeFilter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  showAccessories: boolean;
  onFilterChange: (value: string) => void;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onAccessoryToggle: (value: boolean) => void;
}

const FilterControls = ({
  activeFilter,
  brightness,
  contrast,
  saturation,
  showAccessories,
  onFilterChange,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onAccessoryToggle
}: FilterControlsProps) => {
  const filters = [
    { id: 'none', name: 'None' },
    { id: 'grayscale', name: 'Grayscale' },
    { id: 'sepia', name: 'Sepia' },
    { id: 'vintage', name: 'Vintage' },
    { id: 'cool', name: 'Cool' },
    { id: 'warm', name: 'Warm' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 border">
      <div className="flex items-center mb-4">
        <Sliders className="w-5 h-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Adjust Filters</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Select 
            value={activeFilter} 
            onValueChange={onFilterChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              {filters.map(filter => (
                <SelectItem key={filter.id} value={filter.id}>
                  {filter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="show-accessories" className="flex-grow">Accessories</Label>
            <Switch
              id="show-accessories"
              checked={showAccessories}
              onCheckedChange={onAccessoryToggle}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label>Brightness</Label>
              <span className="text-xs text-muted-foreground">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              min={50}
              max={150}
              step={1}
              onValueChange={([value]) => onBrightnessChange(value)}
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label>Contrast</Label>
              <span className="text-xs text-muted-foreground">{contrast}%</span>
            </div>
            <Slider
              value={[contrast]}
              min={50}
              max={150}
              step={1}
              onValueChange={([value]) => onContrastChange(value)}
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label>Saturation</Label>
              <span className="text-xs text-muted-foreground">{saturation}%</span>
            </div>
            <Slider
              value={[saturation]}
              min={0}
              max={200}
              step={1}
              onValueChange={([value]) => onSaturationChange(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
