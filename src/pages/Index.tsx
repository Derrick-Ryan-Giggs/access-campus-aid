
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import Dashboard from "@/components/Dashboard";
import GroceryShop from "@/components/GroceryShop";
import Reminders from "@/components/Reminders";
import Tutors from "@/components/Tutors";
import LiveSupport from "@/components/LiveSupport";
import PersonalCare from "@/components/PersonalCare";
import VirtualHangouts from "@/components/VirtualHangouts";
import Mentorship from "@/components/Mentorship";
import HealthWellness from "@/components/HealthWellness";
import AdvocacyLegal from "@/components/AdvocacyLegal";
import SmartAssistant from "@/components/SmartAssistant";
import EmergencySupport from "@/components/EmergencySupport";
import AcademicHub from "@/components/AcademicHub";

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal' | 'smart-assistant' | 'emergency-support' | 'academic-hub';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleNavigate = (section: ActiveSection | string) => {
    const validSection = section as ActiveSection;
    setActiveSection(validSection);
    console.log('Navigating to:', section);
  };

  const handleBackToHome = () => {
    setActiveSection('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'groceries':
        return <GroceryShop />;
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
      case 'smart-assistant':
        return <SmartAssistant />;
      case 'emergency-support':
        return <EmergencySupport />;
      case 'academic-hub':
        return <AcademicHub />;
      default:
        return (
          <>
            <HeroSection />
            <ServiceCategories />
            <Dashboard onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} />
      <main>
        {renderActiveSection()}
      </main>
      {activeSection !== 'home' && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={handleBackToHome}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            ← Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
