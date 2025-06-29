
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GroceryItemData {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

interface GroceryItemProps {
  item: GroceryItemData;
  onAddToCart: (item: GroceryItemData) => void;
}

const GroceryItem = ({ item, onAddToCart }: GroceryItemProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
          onClick={() => onAddToCart(item)}
          className="w-full bg-primary hover:bg-primary/90 text-sm"
          size="sm"
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default GroceryItem;
