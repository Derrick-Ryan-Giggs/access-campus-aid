
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, Users, MessageCircle } from 'lucide-react';
import ServiceCard from './ServiceCard';

const QuickAccessPanel = () => {
  const handleCampusMaps = () => {
    console.log('Opening campus maps...');
  };

  const handleEmergency = () => {
    console.log('Emergency support activated...');
  };

  const handleVolunteerHub = () => {
    console.log('Opening volunteer hub...');
  };

  const handleReportIssue = () => {
    console.log('Opening issue report...');
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Quick Access & Emergency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ServiceCard 
            icon={MapPin} 
            title="Campus Maps" 
            onClick={handleCampusMaps}
          />
          
          <ServiceCard 
            icon={AlertTriangle} 
            title="Emergency" 
            variant="emergency"
            onClick={handleEmergency}
          />
          
          <ServiceCard 
            icon={Users} 
            title="Volunteer Hub" 
            onClick={handleVolunteerHub}
          />
          
          <ServiceCard 
            icon={MessageCircle} 
            title="Report Issue" 
            onClick={handleReportIssue}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
