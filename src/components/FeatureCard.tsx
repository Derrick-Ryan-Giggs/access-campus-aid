
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  buttonText: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  buttonText, 
  onClick, 
  className = "",
  disabled = false
}: FeatureCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4 text-4xl">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button
          onClick={onClick}
          disabled={disabled}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 text-base"
          aria-label={`${buttonText} - ${title}`}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
