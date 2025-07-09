
import { useState } from 'react';
import { Button } from './ui/button';
import { Bell, Menu, X, User, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationPanel from './NotificationPanel';
import MobileMenu from './MobileMenu';
import UserProfile from './UserProfile';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const handleEmergencyClick = () => {
    if (onNavigate) {
      onNavigate('emergency-support');
    }
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
    console.log('Notification clicked, state:', !isNotificationOpen);
  };

  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo - responsive sizing */}
            <div className="flex items-center min-w-0 flex-shrink">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-lg sm:text-xl lg:text-2xl font-bold text-primary hover:text-primary/80 transition-colors truncate"
              >
                EmpowerU
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <button 
                onClick={() => handleNavClick('services')} 
                className="text-gray-700 hover:text-primary transition-colors text-sm xl:text-base"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick('dashboard')} 
                className="text-gray-700 hover:text-primary transition-colors text-sm xl:text-base"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavClick('orders')} 
                className="text-gray-700 hover:text-primary transition-colors text-sm xl:text-base"
              >
                Orders
              </button>
              <button 
                onClick={() => handleNavClick('live-support')} 
                className="text-gray-700 hover:text-primary transition-colors text-sm xl:text-base"
              >
                Support
              </button>
            </nav>

            {/* Right side actions - responsive layout */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Emergency Button - larger size on mobile */}
              <Button
                onClick={handleEmergencyClick}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base ml-2 sm:ml-0 h-9 sm:h-10"
                size="sm"
              >
                <AlertTriangle className="h-4 w-4 sm:h-4 sm:w-4 sm:mr-1" />
                <span className="hidden xs:inline sm:hidden">Emergency</span>
                <span className="xs:hidden sm:inline">SOS</span>
                <span className="hidden sm:inline ml-1">Emergency</span>
              </Button>

              {/* Notifications - visible on all screen sizes now */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNotificationClick}
                  className="relative p-1 sm:p-2 touch-manipulation"
                  aria-label="Open notifications"
                >
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center text-[10px] sm:text-xs">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* User Menu - responsive */}
              <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserProfileOpen(true)}
                  className="flex items-center space-x-1 lg:space-x-2 p-1 lg:p-2"
                >
                  <User className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600" />
                  <span className="text-xs lg:text-sm text-gray-700 max-w-20 lg:max-w-none truncate">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-gray-600 hover:text-red-600 p-1 lg:p-2"
                >
                  <LogOut className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="hidden lg:inline ml-1 text-sm">Sign Out</span>
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-1 sm:p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu 
          activeSection="home" 
          onNavigate={onNavigate || (() => {})} 
          onAuthClick={() => {}}
          onNotificationClick={handleNotificationClick}
          onProfileClick={() => setIsUserProfileOpen(true)}
          onEmergencyClick={handleEmergencyClick}
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </header>

      {/* Notification Panel - moved outside header for proper z-index */}
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={handleNotificationClose} 
      />

      {/* User Profile Modal */}
      <UserProfile 
        isOpen={isUserProfileOpen} 
        onClose={() => setIsUserProfileOpen(false)} 
      />
    </>
  );
};

export default Header;
