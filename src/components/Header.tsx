
import { useState } from 'react';
import { Button } from './ui/button';
import { Bell, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import NotificationPanel from './NotificationPanel';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">EmpowerU</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
            <a href="#dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</a>
            <a href="#support" className="text-gray-700 hover:text-primary transition-colors">Support</a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              
              <NotificationPanel 
                isOpen={isNotificationOpen} 
                onClose={() => setIsNotificationOpen(false)} 
              />
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-gray-600 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-1">Sign Out</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;
