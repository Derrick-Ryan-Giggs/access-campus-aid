
import { Card, CardContent } from '@/components/ui/card';
import { Brain, AlertTriangle, BookOpen, ShoppingCart, Clock, GraduationCap, Video, Home, Gamepad2, UserCheck, Heart, Scale } from 'lucide-react';
import FeatureCard from './FeatureCard';

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal' | 'smart-assistant' | 'emergency-support' | 'academic-hub';

interface ServicesProps {
  onNavigate: (section: ActiveSection) => void;
}

const Services = ({ onNavigate }: ServicesProps) => {
  const serviceCategories = [
    {
      title: "Smart Personal Assistant",
      description: "AI-powered task prioritization, voice commands, and personalized recommendations designed for accessibility needs.",
      icon: <Brain className="h-10 w-10 text-primary" />,
      buttonText: "Open Assistant",
      onClick: () => onNavigate('smart-assistant')
    },
    {
      title: "Emergency & Safety",
      description: "Comprehensive safety features including emergency contacts, buddy system, and campus navigation assistance.",
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      buttonText: "Safety Features",
      onClick: () => onNavigate('emergency-support')
    },
    {
      title: "Academic Integration Hub",
      description: "Assignment tracking, study groups, shared notes, and exam accommodations all in one accessible platform.",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      buttonText: "Academic Hub",
      onClick: () => onNavigate('academic-hub')
    },
    {
      title: "Grocery Shopping",
      description: "Order groceries online with easy-to-use interface designed for accessibility. Browse categories, search items, and get essentials delivered.",
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      buttonText: "Start Shopping",
      onClick: () => onNavigate('groceries')
    },
    {
      title: "Reminders",
      description: "Never miss important medications, appointments, or academic deadlines. Set up personalized reminders with notifications.",
      icon: <Clock className="h-10 w-10 text-primary" />,
      buttonText: "Manage Reminders",
      onClick: () => onNavigate('reminders')
    },
    {
      title: "Find Tutors",
      description: "Connect with qualified tutors for academic support. Search by subject and schedule sessions that work for you.",
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      buttonText: "Browse Tutors",
      onClick: () => onNavigate('tutors')
    },
    {
      title: "Live Support",
      description: "Real-time assistance for navigating campus and accessing support services through video or chat.",
      icon: <Video className="h-10 w-10 text-primary" />,
      buttonText: "Get Live Help",
      onClick: () => onNavigate('live-support')
    },
    {
      title: "Personal Care Services",
      description: "Professional assistance with daily living tasks including laundry, cleaning, and meal preparation.",
      icon: <Home className="h-10 w-10 text-primary" />,
      buttonText: "Browse Services",
      onClick: () => onNavigate('personal-care')
    },
    {
      title: "Virtual Hangouts",
      description: "Join accessible online events, gaming sessions, book clubs, and social activities with fellow students.",
      icon: <Gamepad2 className="h-10 w-10 text-primary" />,
      buttonText: "Join Community",
      onClick: () => onNavigate('virtual-hangouts')
    },
    {
      title: "Mentorship Program",
      description: "Connect with disabled alumni and professionals for career guidance and personal development.",
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      buttonText: "Find Mentors",
      onClick: () => onNavigate('mentorship')
    },
    {
      title: "Health & Wellness",
      description: "Access telehealth services, fitness programs, and mental health support tailored for disabled students.",
      icon: <Heart className="h-10 w-10 text-primary" />,
      buttonText: "Health Services",
      onClick: () => onNavigate('health-wellness')
    },
    {
      title: "Advocacy & Legal",
      description: "Get legal assistance, accommodation templates, and support for disability rights and accessibility issues.",
      icon: <Scale className="h-10 w-10 text-primary" />,
      buttonText: "Legal Resources",
      onClick: () => onNavigate('advocacy-legal')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
      {/* Welcome Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive support services designed specifically for students with disabilities.
        </p>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {serviceCategories.map((service, index) => (
          <FeatureCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            buttonText={service.buttonText}
            onClick={service.onClick}
            className="animate-fade-in"
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
