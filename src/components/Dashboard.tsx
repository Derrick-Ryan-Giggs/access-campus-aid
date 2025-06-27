
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import FeatureCard from './FeatureCard';
import HeroSection from './HeroSection';
import QuickStats from './QuickStats';
import ServiceCategories from './ServiceCategories';
import ContactInfo from './ContactInfo';

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal';

interface DashboardProps {
  onNavigate: (section: ActiveSection) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const features = [
    {
      title: "Grocery Shopping",
      description: "Order groceries online with easy-to-use interface designed for accessibility. Browse categories, search items, and get essentials delivered.",
      icon: "🛒",
      buttonText: "Start Shopping",
      onClick: () => onNavigate('groceries')
    },
    {
      title: "Reminders",
      description: "Never miss important medications, appointments, or academic deadlines. Set up personalized reminders with notifications.",
      icon: "⏰",
      buttonText: "Manage Reminders",
      onClick: () => onNavigate('reminders')
    },
    {
      title: "Find Tutors",
      description: "Connect with qualified tutors for academic support. Search by subject and schedule sessions that work for you.",
      icon: "👨‍🎓",
      buttonText: "Browse Tutors",
      onClick: () => onNavigate('tutors')
    },
    {
      title: "Live Support",
      description: "Real-time assistance for navigating campus and accessing support services through video or chat.",
      icon: "🎥",
      buttonText: "Get Live Help",
      onClick: () => onNavigate('live-support')
    },
    {
      title: "Personal Care Services",
      description: "Professional assistance with daily living tasks including laundry, cleaning, and meal preparation.",
      icon: "🏠",
      buttonText: "Browse Services",
      onClick: () => onNavigate('personal-care')
    },
    {
      title: "Virtual Hangouts",
      description: "Join accessible online events, gaming sessions, book clubs, and social activities with fellow students.",
      icon: "🎮",
      buttonText: "Join Community",
      onClick: () => onNavigate('virtual-hangouts')
    },
    {
      title: "Mentorship Program",
      description: "Connect with disabled alumni and professionals for career guidance and personal development.",
      icon: "🤝",
      buttonText: "Find Mentors",
      onClick: () => onNavigate('mentorship')
    },
    {
      title: "Health & Wellness",
      description: "Access telehealth services, fitness programs, and mental health support tailored for disabled students.",
      icon: "🏥",
      buttonText: "Health Services",
      onClick: () => onNavigate('health-wellness')
    },
    {
      title: "Advocacy & Legal",
      description: "Get legal assistance, accommodation templates, and support for disability rights and accessibility issues.",
      icon: "⚖️",
      buttonText: "Legal Resources",
      onClick: () => onNavigate('advocacy-legal')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
      <HeroSection />
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
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

      <QuickStats />
      <ServiceCategories />
      <ContactInfo />
    </div>
  );
};

export default Dashboard;
