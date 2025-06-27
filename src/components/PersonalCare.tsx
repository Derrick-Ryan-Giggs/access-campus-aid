import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Star, Shirt, Home, Utensils, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PersonalCare = () => {
  const { toast } = useToast();
  const [bookingForm, setBookingForm] = useState({
    service: '',
    date: '',
    time: '',
    notes: '',
    frequency: 'one-time'
  });
  const [mealPlanForm, setMealPlanForm] = useState({
    dietaryRestrictions: [],
    mealsPerWeek: '7',
    cuisinePreference: '',
    budget: '',
    allergies: ''
  });
  
  const services = [
    {
      id: 'laundry',
      title: 'Laundry Service',
      icon: Shirt,
      description: 'Professional laundry with pickup and delivery',
      price: '$15/load',
      rating: 4.8,
      nextAvailable: 'Today 2:00 PM'
    },
    {
      id: 'cleaning',
      title: 'Room Cleaning',
      icon: Home,
      description: 'Deep cleaning and organization services',
      price: '$35/hour',
      rating: 4.9,
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      id: 'meal-prep',
      title: 'Meal Preparation',
      icon: Utensils,
      description: 'Custom meal prep considering dietary restrictions',
      price: '$25/meal',
      rating: 4.7,
      nextAvailable: 'Today 4:00 PM'
    },
    {
      id: 'grocery',
      title: 'Grocery Shopping',
      icon: ShoppingBag,
      description: 'Personal grocery shopping and delivery',
      price: '$8 + groceries',
      rating: 4.6,
      nextAvailable: 'Today 1:00 PM'
    }
  ];

  const handleBookService = (serviceId: string, serviceName: string) => {
    setBookingForm({ ...bookingForm, service: serviceName });
    // Dialog will open automatically due to DialogTrigger
  };

  const handleSubmitBooking = () => {
    if (!bookingForm.date || !bookingForm.time) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your service.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Service Booked Successfully!",
      description: `${bookingForm.service} scheduled for ${bookingForm.date} at ${bookingForm.time}`,
    });
    
    // Reset form
    setBookingForm({
      service: '',
      date: '',
      time: '',
      notes: '',
      frequency: 'one-time'
    });
  };

  const handleMealPlanSubmit = () => {
    toast({
      title: "Meal Plan Created!",
      description: "Your personalized meal plan will be ready in 24 hours. Check your email for details.",
    });
    
    // Reset form
    setMealPlanForm({
      dietaryRestrictions: [],
      mealsPerWeek: '7',
      cuisinePreference: '',
      budget: '',
      allergies: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Personal Care Services</h1>
        <p className="text-lg text-gray-600">
          Professional assistance with daily living tasks from trusted local providers
        </p>
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {services.map(({ id, title, icon: Icon, description, price, rating, nextAvailable }) => (
          <Card key={id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{rating}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{price}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Next: {nextAvailable}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  On-campus pickup
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => handleBookService(id, title)}>
                    Book Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Book {title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Select value={bookingForm.time} onValueChange={(value) => setBookingForm({...bookingForm, time: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={bookingForm.frequency} onValueChange={(value) => setBookingForm({...bookingForm, frequency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Special Instructions</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Any specific requirements or notes..."
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                      />
                    </div>
                    
                    <Button onClick={handleSubmitBooking} className="w-full">
                      Confirm Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meal Planning Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Custom Meal Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Dietary Assessment</h3>
              <p className="text-sm text-gray-600">We consider all dietary restrictions and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Weekly Plans</h3>
              <p className="text-sm text-gray-600">Customized meal plans delivered weekly</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Prep</h3>
              <p className="text-sm text-gray-600">Simple cooking guides with adaptive techniques</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Start Meal Planning</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Your Meal Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="meals">Meals per week</Label>
                    <Select value={mealPlanForm.mealsPerWeek} onValueChange={(value) => setMealPlanForm({...mealPlanForm, mealsPerWeek: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 meals</SelectItem>
                        <SelectItem value="14">14 meals</SelectItem>
                        <SelectItem value="21">21 meals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="cuisine">Cuisine Preference</Label>
                    <Select value={mealPlanForm.cuisinePreference} onValueChange={(value) => setMealPlanForm({...mealPlanForm, cuisinePreference: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Weekly Budget</Label>
                    <Select value={mealPlanForm.budget} onValueChange={(value) => setMealPlanForm({...mealPlanForm, budget: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">$50-75</SelectItem>
                        <SelectItem value="75">$75-100</SelectItem>
                        <SelectItem value="100">$100-125</SelectItem>
                        <SelectItem value="125">$125+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="allergies">Allergies & Dietary Restrictions</Label>
                    <Textarea 
                      id="allergies" 
                      placeholder="List any allergies, dietary restrictions, or preferences..."
                      value={mealPlanForm.allergies}
                      onChange={(e) => setMealPlanForm({...mealPlanForm, allergies: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleMealPlanSubmit} className="w-full">
                    Create Meal Plan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Provider Network */}
      <Card>
        <CardHeader>
          <CardTitle>Our Trusted Provider Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">50+</div>
              <p className="text-sm text-gray-600">Verified Providers</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">4.8</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <p className="text-sm text-gray-600">Emergency Support</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">100%</div>
              <p className="text-sm text-gray-600">Background Checked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalCare;
