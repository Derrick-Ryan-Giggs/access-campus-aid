
import { useState } from 'react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import GroceryShop from '@/components/GroceryShop';
import Reminders from '@/components/Reminders';
import Tutors from '@/components/Tutors';
import Checkout from '@/components/Checkout';
import LiveSupport from '@/components/LiveSupport';
import PersonalCare from '@/components/PersonalCare';
import VirtualHangouts from '@/components/VirtualHangouts';
import Mentorship from '@/components/Mentorship';
import HealthWellness from '@/components/HealthWellness';
import AdvocacyLegal from '@/components/AdvocacyLegal';
import { Card, CardContent } from '@/components/ui/card';

interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal';

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [cart, setCart] = useState<{ item: GroceryItem; quantity: number }[]>([]);

  const features = [
    {
      title: "Grocery Shopping",
      description: "Order groceries online with easy-to-use interface designed for accessibility. Browse categories, search items, and get essentials delivered.",
      icon: "🛒",
      buttonText: "Start Shopping",
      onClick: () => setActiveSection('groceries')
    },
    {
      title: "Reminders",
      description: "Never miss important medications, appointments, or academic deadlines. Set up personalized reminders with notifications.",
      icon: "⏰",
      buttonText: "Manage Reminders",
      onClick: () => setActiveSection('reminders')
    },
    {
      title: "Find Tutors",
      description: "Connect with qualified tutors for academic support. Search by subject and schedule sessions that work for you.",
      icon: "👨‍🎓",
      buttonText: "Browse Tutors",
      onClick: () => setActiveSection('tutors')
    },
    {
      title: "Live Support",
      description: "Real-time assistance for navigating campus and accessing support services through video or chat.",
      icon: "🎥",
      buttonText: "Get Live Help",
      onClick: () => setActiveSection('live-support')
    },
    {
      title: "Personal Care Services",
      description: "Professional assistance with daily living tasks including laundry, cleaning, and meal preparation.",
      icon: "🏠",
      buttonText: "Browse Services",
      onClick: () => setActiveSection('personal-care')
    },
    {
      title: "Virtual Hangouts",
      description: "Join accessible online events, gaming sessions, book clubs, and social activities with fellow students.",
      icon: "🎮",
      buttonText: "Join Community",
      onClick: () => setActiveSection('virtual-hangouts')
    },
    {
      title: "Mentorship Program",
      description: "Connect with disabled alumni and professionals for career guidance and personal development.",
      icon: "🤝",
      buttonText: "Find Mentors",
      onClick: () => setActiveSection('mentorship')
    },
    {
      title: "Health & Wellness",
      description: "Access telehealth services, fitness programs, and mental health support tailored for disabled students.",
      icon: "🏥",
      buttonText: "Health Services",
      onClick: () => setActiveSection('health-wellness')
    },
    {
      title: "Advocacy & Legal",
      description: "Get legal assistance, accommodation templates, and support for disability rights and accessibility issues.",
      icon: "⚖️",
      buttonText: "Legal Resources",
      onClick: () => setActiveSection('advocacy-legal')
    }
  ];

  const handleCheckout = (cartItems: { item: GroceryItem; quantity: number }[]) => {
    setCart(cartItems);
    setActiveSection('checkout');
  };

  const handleOrderComplete = () => {
    setCart([]);
    setActiveSection('home');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'groceries':
        return <GroceryShop onCheckout={handleCheckout} />;
      case 'reminders':
        return <Reminders />;
      case 'tutors':
        return <Tutors />;
      case 'live-support':
        return <LiveSupport />;
      case 'personal-care':
        return <PersonalCare />;
      case 'virtual-hangouts':
        return <VirtualHangouts />;
      case 'mentorship':
        return <Mentorship />;
      case 'health-wellness':
        return <HealthWellness />;
      case 'advocacy-legal':
        return <AdvocacyLegal />;
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onBack={() => setActiveSection('groceries')}
            onOrderComplete={handleOrderComplete}
          />
        );
      default:
        return (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
            {/* Hero Section */}
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
                  <span className="text-xl sm:text-2xl mr-2">🌟</span>
                  <h2 className="text-base sm:text-lg font-semibold text-blue-900">Accessibility First</h2>
                </div>
                <p className="text-sm sm:text-base text-blue-800">
                  This platform is built with accessibility standards, keyboard navigation, 
                  screen reader support, and high contrast design for optimal usability.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  buttonText={feature.buttonText}
                  onClick={feature.onClick}
                  className="animate-fade-in"
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
              <Card className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm sm:text-base text-gray-600">Support Available</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-2">500+</div>
                  <p className="text-sm sm:text-base text-gray-600">Services & Resources</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">150+</div>
                  <p className="text-sm sm:text-base text-gray-600">Healthcare Providers</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">95%</div>
                  <p className="text-sm sm:text-base text-gray-600">Satisfaction Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Service Categories */}
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

            {/* Contact Information */}
            <Card className="bg-gray-50 border-2 border-gray-200">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Need Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-center">
                  <div>
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Technical Support</h3>
                    <p className="text-gray-600 text-sm sm:text-base">support@empoweru.edu</p>
                    <p className="text-gray-600 text-sm sm:text-base">(555) 123-HELP</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Accessibility Services</h3>
                    <p className="text-gray-600 text-sm sm:text-base">accessibility@empoweru.edu</p>
                    <p className="text-gray-600 text-sm sm:text-base">(555) 123-ACCESS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const getHeaderActiveSection = (): 'home' | 'groceries' | 'reminders' | 'tutors' => {
    switch (activeSection) {
      case 'groceries':
      case 'checkout':
        return 'groceries';
      case 'reminders':
        return 'reminders';
      case 'tutors':
        return 'tutors';
      default:
        return 'home';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={getHeaderActiveSection()} onNavigate={setActiveSection} />
      
      {/* Navigation breadcrumb for non-home sections */}
      {activeSection !== 'home' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <button
              onClick={() => setActiveSection('home')}
              className="text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded text-sm sm:text-base"
              aria-label="Return to home"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      )}

      <main role="main">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 EmpowerU. Supporting student success and accessibility.</p>
          <p className="text-gray-400 mt-2 text-xs sm:text-sm">
            Built with accessibility standards and comprehensive support services in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
