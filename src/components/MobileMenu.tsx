
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Menu, X, ShoppingCart, Clock, GraduationCap } from 'lucide-react';

interface MobileMenuProps {
  activeSection: 'home' | 'groceries' | 'reminders' | 'tutors';
  onNavigate: (section: 'home' | 'groceries' | 'reminders' | 'tutors') => void;
}

const MobileMenu = ({ activeSection, onNavigate }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: 'home' as const, label: 'Home', icon: Home },
    { key: 'groceries' as const, label: 'Groceries', icon: ShoppingCart },
    { key: 'reminders' as const, label: 'Reminders', icon: Clock },
    { key: 'tutors' as const, label: 'Tutors', icon: GraduationCap },
  ];

  const handleNavigate = (section: 'home' | 'groceries' | 'reminders' | 'tutors') => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Trigger */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="md:hidden text-gray-700 hover:text-primary"
        aria-label="Open mobile menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden animate-fade-in">
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-primary">EmpowerU</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="p-4">
              <div className="space-y-2">
                {menuItems.map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant="ghost"
                    onClick={() => handleNavigate(key)}
                    className={`w-full justify-start text-left p-4 h-auto transition-all duration-200 ${
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
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  24/7 emergency support is always available
                </p>
                <Button size="sm" className="w-full bg-destructive hover:bg-destructive/90">
                  🚨 Emergency
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
