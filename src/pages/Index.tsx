
import { useState } from 'react';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import GroceryShop from '@/components/GroceryShop';
import Reminders from '@/components/Reminders';
import Tutors from '@/components/Tutors';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'groceries' | 'reminders' | 'tutors'>('home');

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
      description: "Never miss important medications or appointments. Set up personalized reminders with notifications.",
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
      title: "Emergency Help",
      description: "Quick access to emergency services and important contacts. Always available when you need immediate assistance.",
      icon: "🚨",
      buttonText: "Emergency Info",
      onClick: () => alert('Emergency contacts and protocols are available 24/7. Use the Emergency button in the header for immediate help.')
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'groceries':
        return <GroceryShop />;
      case 'reminders':
        return <Reminders />;
      case 'tutors':
        return <Tutors />;
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Campus Aid
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Supporting disabled university students with essential daily needs and academic resources. 
                Accessible, intuitive, and designed with you in mind.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl mr-2">🌟</span>
                  <h2 className="text-lg font-semibold text-blue-900">Accessibility First</h2>
                </div>
                <p className="text-blue-800">
                  This platform is built with accessibility standards, keyboard navigation, 
                  screen reader support, and high contrast design for optimal usability.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-gray-600">Emergency Support Available</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">500+</div>
                  <p className="text-gray-600">Grocery Items Available</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <p className="text-gray-600">Qualified Tutors Ready to Help</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card className="bg-gray-50 border-2 border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Need Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold mb-2">Technical Support</h3>
                    <p className="text-gray-600">support@campusaid.edu</p>
                    <p className="text-gray-600">(555) 123-HELP</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Accessibility Services</h3>
                    <p className="text-gray-600">accessibility@campusaid.edu</p>
                    <p className="text-gray-600">(555) 123-ACCESS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Navigation breadcrumb for non-home sections */}
      {activeSection !== 'home' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setActiveSection('home')}
              className="text-primary hover:text-primary/80 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
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
      <footer className="bg-gray-900 text-white py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Campus Aid. Supporting student success and accessibility.</p>
          <p className="text-gray-400 mt-2">
            Built with accessibility standards and student needs in mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
