
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            icon={MapPin} 
            title="Campus Maps" 
            description="Interactive campus navigation and accessible route planning"
            onClick={handleCampusMaps}
          />
          
          <ServiceCard 
            icon={AlertTriangle} 
            title="Emergency" 
            description="24/7 emergency support and immediate assistance services"
            variant="emergency"
            onClick={handleEmergency}
          />
          
          <ServiceCard 
            icon={Users} 
            title="Volunteer Hub" 
            description="Connect with student volunteers for academic and daily support"
            onClick={handleVolunteerHub}
          />
          
          <ServiceCard 
            icon={MessageCircle} 
            title="Report Issue" 
            description="Submit accessibility concerns and facility improvement requests"
            onClick={handleReportIssue}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
