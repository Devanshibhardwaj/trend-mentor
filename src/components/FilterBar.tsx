
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Smile, CloudSun, CloudRain, Shirt } from 'lucide-react';

export interface FilterOptions {
  mood: 'chill' | 'work' | 'date' | 'all';
  weather: 'rainy' | 'sunny' | 'all';
  budget: number;
  style: 'minimal' | 'street' | 'ethnic' | 'all';
}

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Mood Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Smile className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Mood</Label>
            </div>
            <RadioGroup 
              defaultValue={filters.mood}
              value={filters.mood} 
              onValueChange={(value) => updateFilter('mood', value as FilterOptions['mood'])}
              className="flex gap-2 flex-wrap"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="all" id="mood-all" />
                <Label htmlFor="mood-all" className="cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="chill" id="mood-chill" />
                <Label htmlFor="mood-chill" className="cursor-pointer">Chill</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="work" id="mood-work" />
                <Label htmlFor="mood-work" className="cursor-pointer">Work</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="date" id="mood-date" />
                <Label htmlFor="mood-date" className="cursor-pointer">Date</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Weather Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <CloudSun className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Weather</Label>
            </div>
            <RadioGroup 
              defaultValue={filters.weather}
              value={filters.weather} 
              onValueChange={(value) => updateFilter('weather', value as FilterOptions['weather'])}
              className="flex gap-2 flex-wrap"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="all" id="weather-all" />
                <Label htmlFor="weather-all" className="cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="sunny" id="weather-sunny" />
                <Label htmlFor="weather-sunny" className="cursor-pointer">Sunny</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="rainy" id="weather-rainy" />
                <Label htmlFor="weather-rainy" className="cursor-pointer">Rainy</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm font-medium">Max Budget: ${filters.budget}</Label>
            </div>
            <Slider 
              value={[filters.budget]} 
              min={10} 
              max={500} 
              step={10}
              onValueChange={([value]) => updateFilter('budget', value)} 
              className="py-4"
            />
          </div>

          {/* Style Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Shirt className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Style</Label>
            </div>
            <Select 
              value={filters.style} 
              onValueChange={(value) => updateFilter('style', value as FilterOptions['style'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="street">Street</SelectItem>
                <SelectItem value="ethnic">Ethnic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
