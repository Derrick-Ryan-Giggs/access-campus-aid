
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Star, Shirt, Home, Utensils, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PersonalCare = () => {
  const { toast } = useToast();
  
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

  const handleBookService = (serviceId: string) => {
    toast({
      title: "Service Booking Request",
      description: "We'll connect you with a verified provider shortly.",
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
              <Button 
                className="w-full" 
                onClick={() => handleBookService(id)}
              >
                Book Service
              </Button>
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
            <Button size="lg">Start Meal Planning</Button>
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
