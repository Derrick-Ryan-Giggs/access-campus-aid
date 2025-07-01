
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
      <div className="flex-1">
        <div className="flex items-center gap-3 p-3 border-2 border-gray-500 rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
          <Search className="text-gray-500 h-5 w-5 flex-shrink-0" />
          <Input
            type="text"
            placeholder="Search grocery items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Search grocery items"
          />
        </div>
      </div>
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-3 h-12 bg-white border-2 border-gray-500 text-gray-900 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 w-full sm:w-auto"
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
