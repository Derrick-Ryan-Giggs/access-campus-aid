
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, MessageCircle, Clock, Users } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SupportTypeCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  waitTime: string;
  available: boolean;
  volunteers: number;
  onRequestSupport: (type: string) => void;
}

const SupportTypeCard = ({
  id,
  title,
  icon: Icon,
  description,
  waitTime,
  available,
  volunteers,
  onRequestSupport
}: SupportTypeCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow bg-white">
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
            {volunteers} available
          </div>
        </div>
        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={() => onRequestSupport(id)}
            disabled={!available}
          >
            <Video className="h-4 w-4 mr-2" />
            Start Video Call
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-white"
            onClick={() => onRequestSupport(id)}
            disabled={!available}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTypeCard;
