
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface GroceryShopProps {
  onCheckout?: (cart: { item: GroceryItem; quantity: number }[]) => void;
}

const mockGroceries: GroceryItem[] = [
  { id: 1, name: "Fresh Apples", category: "Fruits", price: 3.99, description: "Crisp red apples, 2lb bag" },
  { id: 2, name: "Whole Milk", category: "Dairy", price: 4.29, description: "1 gallon whole milk" },
  { id: 3, name: "Bread Loaf", category: "Bakery", price: 2.99, description: "Whole wheat bread" },
  { id: 4, name: "Bananas", category: "Fruits", price: 1.99, description: "Fresh bananas, 2lb" },
  { id: 5, name: "Chicken Breast", category: "Meat", price: 8.99, description: "Boneless chicken breast, 1lb" },
  { id: 6, name: "Broccoli", category: "Vegetables", price: 2.49, description: "Fresh broccoli crowns" },
];

const GroceryShop = ({ onCheckout }: GroceryShopProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ item: GroceryItem; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery'];

  const filteredGroceries = mockGroceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: GroceryItem) => {
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
  };

  const cartTotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout(cart);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Grocery Shopping</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base"
              aria-label="Search grocery items"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-primary focus:border-primary"
            aria-label="Filter by category"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Cart: {cart.length} items</span>
                <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="mt-2 bg-secondary hover:bg-secondary/90"
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Grocery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroceries.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="text-lg font-bold text-primary">${item.price}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              <Button
                onClick={() => addToCart(item)}
                className="w-full bg-primary hover:bg-primary/90"
                aria-label={`Add ${item.name} to cart`}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroceries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No groceries found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default GroceryShop;
