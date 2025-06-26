
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, MessageCircle, Phone, MapPin, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LiveSupport = () => {
  const { toast } = useToast();
  const [activeRequest, setActiveRequest] = useState<string | null>(null);

  const supportTypes = [
    {
      id: 'navigation',
      title: 'Navigation Assistance',
      icon: MapPin,
      description: 'Get live help navigating inaccessible campus areas',
      waitTime: '2-5 min',
      available: true
    },
    {
      id: 'tech',
      title: 'Technology Support',
      icon: MessageCircle,
      description: 'Technical assistance with assistive technology',
      waitTime: '1-3 min',
      available: true
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      icon: Phone,
      description: 'Immediate assistance for urgent situations',
      waitTime: 'Immediate',
      available: true
    }
  ];

  const handleRequestSupport = (type: string) => {
    setActiveRequest(type);
    toast({
      title: "Support Request Sent",
      description: "A support volunteer will connect with you shortly. Please stay on this page.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Support</h1>
        <p className="text-lg text-gray-600">
          Connect with trained volunteers and support staff for real-time assistance
        </p>
      </div>

      {/* Active Request Status */}
      {activeRequest && (
        <Card className="mb-8 border-primary bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse bg-green-500 rounded-full w-3 h-3"></div>
                <span className="font-semibold">Support request active</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveRequest(null)}
                size="sm"
              >
                Cancel Request
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              A volunteer will join your session shortly. Keep this page open.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {supportTypes.map(({ id, title, icon: Icon, description, waitTime, available }) => (
          <Card key={id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-8 w-8 text-primary" />
                <Badge variant={available ? "default" : "secondary"}>
                  {available ? "Available" : "Offline"}
                </Badge>
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {waitTime}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  3 available
                </div>
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => handleRequestSupport(id)}
                  disabled={!available || activeRequest !== null}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Video Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleRequestSupport(id)}
                  disabled={!available || activeRequest !== null}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="h-6 w-6 mb-2" />
              Building Maps
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Phone className="h-6 w-6 mb-2" />
              Emergency Line
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Volunteer Hub
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveSupport;
