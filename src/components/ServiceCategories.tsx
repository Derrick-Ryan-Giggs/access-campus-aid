
import { Card, CardContent } from '@/components/ui/card';

const ServiceCategories = () => {
  return (
    <div className="mb-12 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Comprehensive Support Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="font-bold mb-2">Daily Living Support</h3>
          <p className="text-sm text-gray-600">Personal care, meal prep, and essential services</p>
        </Card>
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="font-bold mb-2">Academic Success</h3>
          <p className="text-sm text-gray-600">Tutoring, mentorship, and educational resources</p>
        </Card>
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">💚</div>
          <h3 className="font-bold mb-2">Health & Wellness</h3>
          <p className="text-sm text-gray-600">Mental health, telehealth, and fitness programs</p>
        </Card>
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="font-bold mb-2">Community Connection</h3>
          <p className="text-sm text-gray-600">Social events, support groups, and peer networks</p>
        </Card>
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="font-bold mb-2">Rights & Advocacy</h3>
          <p className="text-sm text-gray-600">Legal support and accessibility advocacy</p>
        </Card>
        <Card className="p-6 text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🚨</div>
          <h3 className="font-bold mb-2">Emergency Support</h3>
          <p className="text-sm text-gray-600">Crisis intervention and immediate assistance</p>
        </Card>
      </div>
    </div>
  );
};

export default ServiceCategories;
