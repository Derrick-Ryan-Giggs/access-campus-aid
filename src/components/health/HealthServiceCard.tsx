
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
    <Button 
      variant="outline" 
      className="h-24 w-full flex flex-col items-center justify-center gap-2 p-4 border border-gray-200 hover:bg-gray-50 transition-colors" 
      onClick={onClick}
    >
      <Icon className="h-6 w-6 text-primary flex-shrink-0" />
      <span className="text-sm text-center leading-tight font-medium">{title}</span>
    </Button>
  );
};

export default HealthServiceCard;
