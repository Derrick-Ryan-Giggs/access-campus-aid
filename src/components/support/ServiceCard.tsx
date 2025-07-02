
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  variant?: 'default' | 'emergency';
  onClick?: () => void;
}

const ServiceCard = ({ icon: Icon, title, variant = 'default', onClick }: ServiceCardProps) => {
  const baseClasses = "h-32 w-full flex flex-col items-center justify-center gap-4 p-6 border transition-colors";
  const variantClasses = variant === 'emergency' 
    ? "bg-red-50 border-red-200 hover:bg-red-100 text-red-600"
    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700";

  return (
    <Button 
      variant="outline" 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      <Icon className="h-8 w-8 flex-shrink-0" />
      <span className="text-base text-center leading-relaxed font-medium px-2">{title}</span>
    </Button>
  );
};

export default ServiceCard;
