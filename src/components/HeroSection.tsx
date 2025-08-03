
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
        EmpowerU
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
        Empowering disabled university students with comprehensive support services, 
        essential daily needs, and academic resources. Accessible, intuitive, and designed with you in mind.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Star className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-600" />
          <h2 className="text-base sm:text-lg font-semibold text-blue-900">Accessibility First</h2>
        </div>
        <p className="text-sm sm:text-base text-blue-800">
          This platform is built with accessibility standards, keyboard navigation, 
          screen reader support, and high contrast design for optimal usability.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
