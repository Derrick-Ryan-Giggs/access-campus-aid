
import { Card, CardContent } from '@/components/ui/card';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
      <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">24/7</div>
          <p className="text-sm sm:text-base text-gray-600">Support Available</p>
        </CardContent>
      </Card>
      <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">500+</div>
          <p className="text-sm sm:text-base text-gray-600">Services & Resources</p>
        </CardContent>
      </Card>
      <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">150+</div>
          <p className="text-sm sm:text-base text-gray-600">Healthcare Providers</p>
        </CardContent>
      </Card>
      <Card className="text-center hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">95%</div>
          <p className="text-sm sm:text-base text-gray-600">Satisfaction Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
