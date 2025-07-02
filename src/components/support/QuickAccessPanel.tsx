
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, Users, MessageCircle } from 'lucide-react';

const QuickAccessPanel = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Quick Access & Emergency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 p-4"
          >
            <MapPin className="h-6 w-6 flex-shrink-0" />
            <span className="text-sm text-center leading-tight">Campus Maps</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-red-50 border-red-200 hover:bg-red-100 p-4"
          >
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-600 text-center leading-tight">Emergency</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 p-4"
          >
            <Users className="h-6 w-6 flex-shrink-0" />
            <span className="text-sm text-center leading-tight">Volunteer Hub</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 p-4"
          >
            <MessageCircle className="h-6 w-6 flex-shrink-0" />
            <span className="text-sm text-center leading-tight">Report Issue</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
