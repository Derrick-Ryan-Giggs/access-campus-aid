
import React from 'react';
import { FileText, Scale, AlertCircle, Phone } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer ${className}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-purple-50 rounded-full">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const AdvocacyLegalCards: React.FC = () => {
  const services: Service[] = [
    {
      icon: FileText,
      title: "Templates",
      description: "Access legal document templates and accommodation request forms"
    },
    {
      icon: Scale,
      title: "Legal Help",
      description: "Connect with disability rights attorneys and legal advisors"
    },
    {
      icon: AlertCircle,
      title: "File Complaint",
      description: "Submit formal complaints for discrimination and rights violations"
    },
    {
      icon: Phone,
      title: "Emergency Legal",
      description: "24/7 urgent legal assistance for immediate rights protection"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Advocacy & Legal Support</h2>
        <p className="text-gray-600">Legal resources and advocacy services to protect student rights and ensure accessibility</p>
      </div>
      
      {/* Grid layout - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvocacyLegalCards;
