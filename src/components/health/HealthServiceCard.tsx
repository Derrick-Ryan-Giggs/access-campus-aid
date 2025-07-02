
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
      className="h-32 w-full flex flex-col items-center justify-center gap-4 p-6 border border-gray-200 hover:bg-gray-50 transition-colors" 
      onClick={onClick}
    >
      <Icon className="h-8 w-8 text-primary flex-shrink-0" />
      <span className="text-base text-center leading-relaxed font-medium px-2">{title}</span>
    </Button>
  );
};

export default HealthServiceCard;
