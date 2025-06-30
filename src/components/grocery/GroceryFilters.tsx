
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
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 text-sm sm:text-base bg-white border-2 border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
          aria-label="Search grocery items"
        />
      </div>
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 sm:px-4 py-2 bg-white border-2 border-gray-500 text-gray-900 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 w-full sm:w-auto"
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
