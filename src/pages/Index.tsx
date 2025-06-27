
import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
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
        return <Dashboard onNavigate={setActiveSection} />;
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
