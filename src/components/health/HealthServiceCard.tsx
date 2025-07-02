
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface HealthServiceCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const HealthServiceCard = ({ icon: Icon, title, onClick, children }: HealthServiceCardProps) => {
  if (children) {
    return children;
  }

  return (
    <Button variant="outline" className="h-20 flex-col" onClick={onClick}>
      <Icon className="h-6 w-6 mb-2" />
      {title}
    </Button>
  );
};

export default HealthServiceCard;
