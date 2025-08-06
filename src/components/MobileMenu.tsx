
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Menu, X, ShoppingCart, Clock, GraduationCap, LogOut, Bell, User, Settings, Headphones, AlertTriangle, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';

interface MobileMenuProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onAuthClick?: () => void;
  onNotificationClick?: (e: React.MouseEvent) => void;
  onProfileClick?: () => void;
  onEmergencyClick?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ 
  activeSection, 
  onNavigate, 
  onAuthClick, 
  onNotificationClick, 
  onProfileClick, 
  onEmergencyClick,
  isOpen, 
  onClose 
}: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const { unreadCount } = useNotifications();

  const menuItems = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'services', label: 'Services', icon: Settings },
    { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { key: 'live-support', label: 'Support', icon: Headphones },
    { key: 'groceries', label: 'Groceries', icon: ShoppingCart },
    { key: 'reminders', label: 'Reminders', icon: Clock },
    { key: 'tutors', label: 'Tutors', icon: GraduationCap },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else if (onAuthClick) {
      onAuthClick();
    }
    onClose();
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNotificationClick) {
      onNotificationClick(e);
    }
    onClose();
  };

  const handleProfileClick = () => {
    if (onProfileClick) onProfileClick();
    onClose();
  };

  const handleEmergencyClick = () => {
    if (onEmergencyClick) onEmergencyClick();
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fade-in">
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-primary">EmpowerU</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close mobile menu"
                className="touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="p-4">
              {/* Navigation Items */}
              <div className="space-y-2 mb-6">
                {menuItems.map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant="ghost"
                    onClick={() => handleNavigate(key)}
                    className={`w-full justify-start text-left p-4 h-auto transition-all duration-200 touch-manipulation ${
                      activeSection === key
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{label}</span>
                  </Button>
                ))}
              </div>

              {/* User Actions Section */}
              <div className="border-t pt-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">Account</h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    onClick={handleAuthClick}
                    className="w-full justify-start text-left p-4 h-auto hover:bg-gray-100 text-gray-700 touch-manipulation"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">{user ? 'Sign Out' : 'Sign In'}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={handleProfileClick}
                    className="w-full justify-start text-left p-4 h-auto hover:bg-gray-100 text-gray-700 touch-manipulation"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span className="font-medium">Profile</span>
                  </Button>
                </div>
              </div>
              
              {/* Emergency Section */}
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-600 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  24/7 emergency support is always available
                </p>
                <Button 
                  size="sm" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white touch-manipulation"
                  onClick={handleEmergencyClick}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Support
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
