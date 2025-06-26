
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddGroceryForm from './forms/AddGroceryForm';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

interface GroceryShopProps {
  onCheckout?: (cart: { item: GroceryItem; quantity: number }[]) => void;
}

const mockGroceries: GroceryItem[] = [
  { id: 1, name: "Fresh Apples", category: "Fruits", price: 3.99, description: "Crisp red apples, 2lb bag", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop" },
  { id: 2, name: "Whole Milk", category: "Dairy", price: 4.29, description: "1 gallon whole milk", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop" },
  { id: 3, name: "Bread Loaf", category: "Bakery", price: 2.99, description: "Whole wheat bread", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop" },
  { id: 4, name: "Bananas", category: "Fruits", price: 1.99, description: "Fresh bananas, 2lb", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop" },
  { id: 5, name: "Chicken Breast", category: "Meat", price: 8.99, description: "Boneless chicken breast, 1lb", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop" },
  { id: 6, name: "Broccoli", category: "Vegetables", price: 2.49, description: "Fresh broccoli crowns", image: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop" },
  { id: 7, name: "Greek Yogurt", category: "Dairy", price: 5.99, description: "Plain Greek yogurt, 32oz", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop" },
  { id: 8, name: "Salmon Fillet", category: "Fish", price: 12.99, description: "Atlantic salmon, 1lb", image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop" },
  { id: 9, name: "Avocados", category: "Fruits", price: 4.49, description: "Ripe avocados, pack of 4", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop" },
  { id: 10, name: "Spinach", category: "Vegetables", price: 3.29, description: "Fresh baby spinach, 5oz", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop" },
  { id: 11, name: "Brown Rice", category: "Grains", price: 3.99, description: "Long grain brown rice, 2lb", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop" },
  { id: 12, name: "Blueberries", category: "Fruits", price: 4.99, description: "Fresh blueberries, 1 pint", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop" },
  { id: 13, name: "Cheddar Cheese", category: "Dairy", price: 6.49, description: "Sharp cheddar cheese, 8oz", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop" },
  { id: 14, name: "Sweet Potatoes", category: "Vegetables", price: 2.79, description: "Organic sweet potatoes, 2lb", image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop" },
  { id: 15, name: "Quinoa", category: "Grains", price: 7.99, description: "Organic quinoa, 1lb", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop" },
  { id: 16, name: "Organic Eggs", category: "Dairy", price: 5.49, description: "Free-range organic eggs, dozen", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=300&fit=crop" },
];

const GroceryShop = ({ onCheckout }: GroceryShopProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ item: GroceryItem; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [groceries, setGroceries] = useState(mockGroceries);
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Fish', 'Bakery', 'Grains'];

  const filteredGroceries = groceries.filter(item => {
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

    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleAddGrocery = (newGrocery: Omit<GroceryItem, 'id'>) => {
    const grocery: GroceryItem = {
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

  const cartTotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout(cart);
      toast({
        title: "Proceeding to Checkout",
        description: "Your cart has been saved. Complete your order details.",
      });
    }
  };

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
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm sm:text-base"
              aria-label="Search grocery items"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-auto"
            aria-label="Filter by category"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Cart Summary - Mobile friendly */}
        {cart.length > 0 && (
          <Card className="mb-4 sm:mb-6 bg-green-50 border-green-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="font-medium text-sm sm:text-base">Cart: {cart.length} items</span>
                <span className="font-bold text-lg sm:text-xl">${cartTotal.toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="mt-2 bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
                size="sm"
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Grocery Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredGroceries.map(item => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            {item.image && (
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            )}
            <CardHeader className="p-3 sm:p-4">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg truncate">{item.name}</CardTitle>
                  <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                </div>
                <span className="text-base sm:text-lg font-bold text-primary ml-2">${item.price}</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{item.description}</p>
              <Button
                onClick={() => addToCart(item)}
                className="w-full bg-primary hover:bg-primary/90 text-sm"
                size="sm"
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
          <p className="text-gray-500 text-base sm:text-lg">No groceries found matching your search.</p>
        </div>
      )}

      {/* Add Grocery Form Modal */}
      {showAddForm && (
        <AddGroceryForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddGrocery}
          categories={categories.filter(cat => cat !== 'All')}
        />
      )}
    </div>
  );
};

export default GroceryShop;
