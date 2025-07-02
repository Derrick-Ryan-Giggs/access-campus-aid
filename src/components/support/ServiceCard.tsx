
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  variant?: 'default' | 'emergency';
  onClick?: () => void;
}

const ServiceCard = ({ icon: Icon, title, variant = 'default', onClick }: ServiceCardProps) => {
  const baseClasses = "h-20 flex flex-col items-center justify-center space-y-2 p-4";
  const variantClasses = variant === 'emergency' 
    ? "bg-red-50 border-red-200 hover:bg-red-100"
    : "bg-white hover:bg-gray-50";
  const iconClasses = variant === 'emergency' ? "h-6 w-6 text-red-600 flex-shrink-0" : "h-6 w-6 flex-shrink-0";
  const textClasses = variant === 'emergency' 
    ? "text-sm text-red-600 text-center leading-tight"
    : "text-sm text-center leading-tight";

  return (
    <Button 
      variant="outline" 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      <Icon className={iconClasses} />
      <span className={textClasses}>{title}</span>
    </Button>
  );
};

export default ServiceCard;
