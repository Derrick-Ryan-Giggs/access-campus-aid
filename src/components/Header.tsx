
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bell, User, Home, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MobileMenu from './MobileMenu';
import AuthModal from './auth/AuthModal';
import NotificationPanel from './NotificationPanel';
import UserProfile from './UserProfile';

interface HeaderProps {
  activeSection: 'home' | 'groceries' | 'reminders' | 'tutors';
  onNavigate: (section: 'home' | 'groceries' | 'reminders' | 'tutors') => void;
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const { toast } = useToast();
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const handleEmergencyClick = () => {
    setIsEmergencyMode(true);
    toast({
      title: "Emergency Alert Sent",
      description: "Emergency services have been notified. Help is on the way. Stay calm and safe.",
    });
    
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-40" role="banner">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <div className="flex-shrink-0">
                <button
                  onClick={() => onNavigate('home')}
                  className="text-lg sm:text-xl font-bold text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors truncate"
                  aria-label="Go to home page"
                >
                  EmpowerU
                </button>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-4 xl:space-x-6" role="navigation">
                {navItems.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => onNavigate(key)}
                    className={`px-2 xl:px-3 py-2 rounded-md text-sm xl:text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors whitespace-nowrap ${
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
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              {/* Emergency Button - Responsive sizing */}
              <Button
                onClick={handleEmergencyClick}
                className="emergency-pulse bg-destructive hover:bg-destructive/90 text-white font-semibold px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base whitespace-nowrap flex-shrink-0"
                aria-label="Emergency assistance"
                size="sm"
              >
                <span className="hidden sm:inline">🚨 Emergency</span>
                <span className="sm:hidden">🚨</span>
              </Button>

              {/* Desktop Auth and User actions */}
              <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-primary px-2 lg:px-3"
                  aria-label="Sign in"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Sign In</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotificationPanelOpen(true)}
                  className="text-gray-700 hover:text-primary relative px-2 lg:px-3"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserProfileOpen(true)}
                  className="text-gray-700 hover:text-primary px-2 lg:px-3"
                  aria-label="User profile"
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu */}
              <MobileMenu
                activeSection={activeSection}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Modal */}
      {isEmergencyMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <Card className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-sm sm:max-w-md mx-4 w-full">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-4">🚨</div>
              <h2 className="text-lg sm:text-xl font-bold text-destructive mb-4">
                Emergency Assistance Activated
              </h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Emergency services have been notified. Help is on the way.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p><strong>Emergency Contacts:</strong></p>
                <p>Campus Security: (555) 123-4567</p>
                <p>Health Services: (555) 123-4568</p>
                <p>Crisis Hotline: 988</p>
              </div>
              <Button
                onClick={() => setIsEmergencyMode(false)}
                className="mt-4 bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />

      {/* User Profile */}
      <UserProfile
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </>
  );
};

export default Header;
