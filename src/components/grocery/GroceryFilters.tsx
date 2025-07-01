
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            placeholder="Search grocery items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-14 pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base bg-gray-50 text-gray-900 placeholder:text-gray-500 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:border-gray-400 hover:bg-white"
            aria-label="Search grocery items"
          />
        </div>
      </div>
      
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-14 px-4 bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-xl text-base focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:border-gray-400 hover:bg-white w-full sm:w-auto transition-all duration-200 ease-in-out"
        aria-label="Filter by category"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroceryFilters;
