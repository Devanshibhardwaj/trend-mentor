
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FilterOptions } from '@/components/FilterBar';

interface ActiveFilterTagsProps {
  filters: FilterOptions;
  onRemoveFilter: (filterKey: keyof FilterOptions) => void;
}

const ActiveFilterTags = ({ filters, onRemoveFilter }: ActiveFilterTagsProps) => {
  const getActiveFilters = () => {
    const activeFilters: Array<{ key: keyof FilterOptions; label: string; value: string }> = [];
    
    if (filters.mood !== 'all') {
      activeFilters.push({ key: 'mood', label: 'Mood', value: filters.mood });
    }
    
    if (filters.style !== 'all') {
      activeFilters.push({ key: 'style', label: 'Style', value: filters.style });
    }
    
    if (filters.weather !== 'all') {
      activeFilters.push({ key: 'weather', label: 'Weather', value: filters.weather });
    }
    
    if (filters.budget !== 100) {
      activeFilters.push({ key: 'budget', label: 'Budget', value: `$${filters.budget}` });
    }
    
    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <h5 className="text-sm font-medium text-muted-foreground mb-2">Active Filters:</h5>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map(({ key, label, value }) => (
          <Badge
            key={key}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1 bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <span className="text-xs font-medium">
              {label}: {value}
            </span>
            <button
              onClick={() => onRemoveFilter(key)}
              className="ml-1 hover:bg-primary/30 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${label} filter`}
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilterTags;
