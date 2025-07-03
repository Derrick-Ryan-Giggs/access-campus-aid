
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface HealthServiceCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const HealthServiceCard = ({ icon: Icon, title, description, onClick, children }: HealthServiceCardProps) => {
  if (children) {
    return children;
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
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

export default HealthServiceCard;
