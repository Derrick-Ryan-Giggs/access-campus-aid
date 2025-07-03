
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  variant?: 'default' | 'emergency';
  onClick?: () => void;
}

const ServiceCard = ({ icon: Icon, title, description, variant = 'default', onClick }: ServiceCardProps) => {
  const iconBgColor = variant === 'emergency' ? 'bg-red-50' : 'bg-blue-50';
  const iconColor = variant === 'emergency' ? 'text-red-600' : 'text-blue-600';

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-3 ${iconBgColor} rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
