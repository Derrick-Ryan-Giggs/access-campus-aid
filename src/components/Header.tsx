import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, User, Home, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  activeSection: 'home' | 'groceries' | 'reminders' | 'tutors';
  onNavigate: (section: 'home' | 'groceries' | 'reminders' | 'tutors') => void;
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const { toast } = useToast();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const handleEmergencyClick = () => {
    setIsEmergencyMode(true);
    toast({
      title: "Emergency Alert Sent",
      description: "Emergency services have been notified. Help is on the way. Stay calm and safe.",
    });
    
    // Reset emergency mode after 5 seconds
    setTimeout(() => {
      setIsEmergencyMode(false);
    }, 5000);
  };

  const navItems = [
    { key: 'home' as const, label: 'Home', icon: Home },
    { key: 'groceries' as const, label: 'Groceries' },
    { key: 'reminders' as const, label: 'Reminders' },
    { key: 'tutors' as const, label: 'Tutors' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <button
                  onClick={() => onNavigate('home')}
                  className="text-xl font-bold text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors"
                  aria-label="Go to home page"
                >
                  Campus Aid
                </button>
              </div>
              <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Main navigation">
                {navItems.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => onNavigate(key)}
                    className={`px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
                      activeSection === key
                        ? 'text-primary bg-blue-50'
                        : 'text-gray-700 hover:text-primary'
                    }`}
                    aria-label={label}
                  >
                    {Icon && <Icon className="inline w-4 h-4 mr-1" />}
                    {label}
                  </button>
                ))}
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
      {isEmergencyMode && (
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
                onClick={() => setIsEmergencyMode(false)}
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
