
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, User, Home, Search } from 'lucide-react';

const Header = () => {
  const [showEmergency, setShowEmergency] = useState(false);

  const handleEmergencyClick = () => {
    setShowEmergency(true);
    // In a real app, this would trigger emergency protocols
    setTimeout(() => setShowEmergency(false), 3000);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary">
                  Campus Aid
                </h1>
              </div>
              <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Main navigation">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Home"
                >
                  <Home className="inline w-4 h-4 mr-1" />
                  Home
                </a>
                <a
                  href="#groceries"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Grocery Shopping"
                >
                  Groceries
                </a>
                <a
                  href="#reminders"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Reminders"
                >
                  Reminders
                </a>
                <a
                  href="#tutors"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Find Tutors"
                >
                  Tutors
                </a>
              </nav>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Emergency Button - Always Visible */}
              <Button
                onClick={handleEmergencyClick}
                className="emergency-pulse bg-destructive hover:bg-destructive/90 text-white font-semibold px-6 py-2 text-base"
                aria-label="Emergency assistance - Click for immediate help"
                role="button"
              >
                🚨 Emergency
              </Button>

              {/* User actions */}
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-primary"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-primary"
                aria-label="User profile"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Modal */}
      {showEmergency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="emergency-title">
          <Card className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🚨</div>
              <h2 id="emergency-title" className="text-xl font-bold text-destructive mb-4">
                Emergency Assistance Activated
              </h2>
              <p className="text-gray-700 mb-4">
                Emergency services have been notified. Help is on the way.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Emergency Contacts:</strong></p>
                <p>Campus Security: (555) 123-4567</p>
                <p>Health Services: (555) 123-4568</p>
                <p>Crisis Hotline: 988</p>
              </div>
              <Button
                onClick={() => setShowEmergency(false)}
                className="mt-4 bg-primary hover:bg-primary/90"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default Header;
