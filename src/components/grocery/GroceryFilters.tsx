
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface GroceryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const GroceryFilters = ({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
}: GroceryFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search groceries..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 text-sm sm:text-base"
          aria-label="Search grocery items"
        />
      </div>
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-auto"
        aria-label="Filter by category"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default GroceryFilters;
