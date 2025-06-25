import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, MapPin, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CheckoutProps {
  cart: { item: GroceryItem; quantity: number }[];
  onBack: () => void;
  onOrderComplete: () => void;
}

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

const Checkout = ({ cart, onBack, onOrderComplete }: CheckoutProps) => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const total = cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    // Validate required fields
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      toast({
        title: "Missing Personal Information",
        description: "Please fill in all personal information fields.",
        variant: "destructive",
      });
      return;
    }

    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.zipCode) {
      toast({
        title: "Missing Delivery Address",
        description: "Please fill in all delivery address fields.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.nameOnCard) {
      toast({
        title: "Missing Payment Information",
        description: "Please fill in all payment information fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate order processing
    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ${cart.length} items totaling $${total.toFixed(2)} has been confirmed. You'll receive a confirmation email shortly.`,
    });

    // Call the completion handler
    onOrderComplete();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button onClick={onBack} variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shopping
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><User className="mr-2 h-5 w-5" /> Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              aria-label="Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              aria-label="Email Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              aria-label="Phone Number"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><MapPin className="mr-2 h-5 w-5" /> Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Street Address</label>
            <Input
              type="text"
              placeholder="Enter your street address"
              value={deliveryAddress.street}
              onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
              aria-label="Street Address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input
                type="text"
                placeholder="City"
                value={deliveryAddress.city}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                aria-label="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code</label>
              <Input
                type="text"
                placeholder="ZIP Code"
                value={deliveryAddress.zipCode}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, zipCode: e.target.value })}
                aria-label="ZIP Code"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number</label>
            <Input
              type="text"
              placeholder="Enter your card number"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              aria-label="Card Number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date</label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                aria-label="Expiry Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV</label>
              <Input
                type="text"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                aria-label="CVV"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Name on Card</label>
            <Input
              type="text"
              placeholder="Name as it appears on card"
              value={paymentInfo.nameOnCard}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
              aria-label="Name on Card"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
        <Button onClick={handlePlaceOrder} className="bg-secondary hover:bg-secondary/90">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
