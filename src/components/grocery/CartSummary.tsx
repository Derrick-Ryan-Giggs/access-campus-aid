
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartItem {
  item: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  onCheckout: () => void;
}

const CartSummary = ({ cart, onCheckout }: CartSummaryProps) => {
  if (cart.length === 0) return null;

  const cartTotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);

  return (
    <Card className="mb-4 sm:mb-6 bg-green-50 border-green-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="font-medium text-sm sm:text-base">Cart: {cart.length} items</span>
          <span className="font-bold text-lg sm:text-xl">${cartTotal.toFixed(2)}</span>
        </div>
        <Button 
          onClick={onCheckout}
          className="mt-2 bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
          size="sm"
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
