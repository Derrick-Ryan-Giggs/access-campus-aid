
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, MapPin, User, ShoppingBag, ArrowLeft } from 'lucide-react';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface CheckoutProps {
  cart: { item: GroceryItem; quantity: number }[];
  onBack: () => void;
  onOrderComplete: () => void;
}

const Checkout = ({ cart, onBack, onOrderComplete }: CheckoutProps) => {
  const [orderForm, setOrderForm] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryNotes: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Delivery Preferences
    deliveryTime: 'standard'
  });

  const subtotal = cart.reduce((sum, cartItem) => sum + (cartItem.item.price * cartItem.quantity), 0);
  const deliveryFee = 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (field: string, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment and create the order
    alert('Order submitted successfully! (This is a demo)');
    onOrderComplete();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shopping
        </Button>
        <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
        <p className="text-gray-600 mt-2">Complete your grocery order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={orderForm.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={orderForm.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={orderForm.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={orderForm.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={orderForm.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={orderForm.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="deliveryNotes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="deliveryNotes"
                    value={orderForm.deliveryNotes}
                    onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                    placeholder="Any special instructions for delivery..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <select
                    id="deliveryTime"
                    value={orderForm.deliveryTime}
                    onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="standard">Standard (2-3 days) - Free</option>
                    <option value="express">Express (Next day) - $9.99</option>
                    <option value="same-day">Same day - $14.99</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card *</Label>
                  <Input
                    id="cardName"
                    value={orderForm.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={orderForm.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={orderForm.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={orderForm.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 text-lg font-semibold"
            >
              Complete Order - ${total.toFixed(2)}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-primary" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 p-3 rounded-lg mt-4">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
                  <p className="text-xs text-blue-800">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
