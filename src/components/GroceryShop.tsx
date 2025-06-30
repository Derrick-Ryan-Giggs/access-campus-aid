import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddGroceryForm from './forms/AddGroceryForm';
import Checkout from './Checkout';
import GroceryItem from './grocery/GroceryItem';
import CartSummary from './grocery/CartSummary';
import GroceryFilters from './grocery/GroceryFilters';
import { groceryItems, categories } from './grocery/mockData';

// Use the actual type from the imported groceryItems
type GroceryItemType = typeof groceryItems[0];

interface GroceryShopProps {
  onCheckout?: (cart: { item: GroceryItemType; quantity: number }[]) => void;
}

const GroceryShop = ({ onCheckout }: GroceryShopProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ item: GroceryItemType; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [groceries, setGroceries] = useState(groceryItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredGroceries = groceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: GroceryItemType) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.item.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleAddGrocery = (newGrocery: Omit<GroceryItemType, 'id'>) => {
    const grocery: GroceryItemType = {
      ...newGrocery,
      id: Math.max(...groceries.map(g => g.id)) + 1
    };
    setGroceries(prev => [...prev, grocery]);
    setShowAddForm(false);
    toast({
      title: "Grocery Added",
      description: `${newGrocery.name} has been added to the store.`,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return <Checkout cart={cart} onBack={handleBackFromCheckout} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Grocery Shopping</h2>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Item
          </Button>
        </div>
        
        <GroceryFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories.map(cat => cat.id)}
        />

        <CartSummary cart={cart} onCheckout={handleCheckout} />
      </div>

      {/* Grocery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredGroceries.map(item => (
          <GroceryItem 
            key={item.id} 
            item={item} 
            onAddToCart={addToCart} 
          />
        ))}
      </div>

      {filteredGroceries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-base sm:text-lg">No groceries found matching your search.</p>
        </div>
      )}

      {/* Add Grocery Form Modal */}
      {showAddForm && (
        <AddGroceryForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddGrocery}
          categories={categories.filter(cat => cat.id !== 'all').map(cat => cat.id)}
        />
      )}
    </div>
  );
};

export default GroceryShop;
