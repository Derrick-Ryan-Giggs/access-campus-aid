
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Scale, Users, AlertCircle, Download, Phone, MessageCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdvocacyLegal = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    service: '',
    name: '',
    email: '',
    issue: '',
    urgency: 'normal'
  });
  
  const resources = [
    {
      title: 'Accommodation Request Templates',
      description: 'Pre-written templates for requesting academic accommodations',
      type: 'Template',
      downloads: 1250,
      category: 'Academic'
    },
    {
      title: 'ADA Complaint Filing Guide',
      description: 'Step-by-step guide for filing ADA violations',
      type: 'Guide',
      downloads: 890,
      category: 'Legal'
    },
    {
      title: 'Disability Grant Applications',
      description: 'Templates and guides for disability-related funding',
      type: 'Template',
      downloads: 567,
      category: 'Financial'
    },
    {
      title: 'Housing Accommodation Forms',
      description: 'Request forms for accessible housing modifications',
      type: 'Form',
      downloads: 734,
      category: 'Housing'
    }
  ];

  const legalServices = [
    {
      name: 'Disability Rights Clinic',
      specialty: 'Accommodation Disputes',
      contact: '(555) 123-RIGHTS',
      availability: 'Mon-Fri 9AM-5PM',
      free: true
    },
    {
      name: 'Student Legal Aid',
      specialty: 'General Legal Support',
      contact: '(555) 123-LEGAL',
      availability: '24/7 Hotline',
      free: true
    },
    {
      name: 'ADA Compliance Office',
      specialty: 'Accessibility Issues',
      contact: '(555) 123-ADA',
      availability: 'Business Hours',
      free: true
    }
  ];

  const advocacyAreas = [
    {
      title: 'Academic Accommodations',
      icon: BookOpen,
      description: 'Support for classroom and testing accommodations',
      cases: 156,
      successRate: '95%'
    },
    {
      title: 'Housing Rights',
      icon: Users,
      description: 'Accessible housing and modification requests',
      cases: 89,
      successRate: '92%'
    },
    {
      title: 'Employment Rights',
      icon: Scale,
      description: 'Workplace accommodations and discrimination',
      cases: 67,
      successRate: '88%'
    },
    {
      title: 'Transportation Access',
      icon: AlertCircle,
      description: 'Campus and public transportation accessibility',
      cases: 34,
      successRate: '91%'
    }
  ];

  const handleDownloadResource = (resource: string) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be actual file URL
    link.download = `${resource.replace(/\s+/g, '_')}.pdf`;
    
    toast({
      title: "Download Started",
      description: `${resource} is being downloaded to your device.`,
    });
    
    // Simulate download process
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${resource} has been saved to your Downloads folder.`,
      });
    }, 2000);
  };

  const handleContactLegal = (serviceName: string) => {
    setContactForm({...contactForm, service: serviceName});
  };

  const handleSubmitContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.issue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to contact legal services.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Contact Request Sent!",
      description: `Your request has been sent to ${contactForm.service}. They'll respond within 24 hours.`,
    });
    
    setContactForm({
      service: '',
      name: '',
      email: '',
      issue: '',
      urgency: 'normal'
    });
  };

  const handleDownloadRightsGuide = () => {
    const link = document.createElement('a');
    link.href = '#'; // In real app, this would be actual PDF URL
    link.download = 'Complete_Disability_Rights_Guide.pdf';
    
    toast({
      title: "Downloading Rights Guide",
      description: "Your complete disability rights guide is being prepared...",
    });
    
    // Simulate download preparation
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Complete Disability Rights Guide (156 pages) has been downloaded successfully.",
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Advocacy & Legal Assistance</h1>
        <p className="text-lg text-gray-600">
          Know your rights and get the support you need to advocate for accessibility
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button variant="outline" className="h-20 flex-col">
          <FileText className="h-6 w-6 mb-2" />
          Templates
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Scale className="h-6 w-6 mb-2" />
          Legal Help
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Users className="h-6 w-6 mb-2" />
          File Complaint
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <AlertCircle className="h-6 w-6 mb-2" />
          Emergency Legal
        </Button>
      </div>

      {/* Document Templates and Resources */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Legal Documents & Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <div className="flex items-center mt-2">
                      <Badge variant="secondary" className="mr-2">{resource.type}</Badge>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="h-4 w-4 mr-1" />
                    {resource.downloads} downloads
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleDownloadResource(resource.title)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advocacy Areas */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Our Advocacy Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advocacyAreas.map(({ title, icon: Icon, description, cases, successRate }) => (
            <Card key={title} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cases handled:</span>
                    <span className="font-semibold">{cases}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Success rate:</span>
                    <span className="font-semibold text-green-600">{successRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Legal Services */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Free Legal Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalServices.map((service, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Scale className="h-6 w-6 mr-2 text-primary" />
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm">Specialty:</p>
                    <p className="text-gray-600">{service.specialty}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Contact:</p>
                    <p className="text-gray-600">{service.contact}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Availability:</p>
                    <p className="text-gray-600">{service.availability}</p>
                  </div>
                  {service.free && (
                    <Badge variant="default" className="bg-green-600">
                      Free Service
                    </Badge>
                  )}
                  <div className="flex space-x-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1" 
                          onClick={() => handleContactLegal(service.name)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Contact {service.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Your Name *</Label>
                            <Input 
                              id="name" 
                              placeholder="Enter your full name"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="Enter your email"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="urgency">Urgency Level</Label>
                            <select 
                              id="urgency" 
                              className="w-full p-2 border rounded"
                              value={contactForm.urgency}
                              onChange={(e) => setContactForm({...contactForm, urgency: e.target.value})}
                            >
                              <option value="normal">Normal</option>
                              <option value="urgent">Urgent</option>
                              <option value="emergency">Emergency</option>
                            </select>
                          </div>
                          
                          <div>
                            <Label htmlFor="issue">Describe Your Issue *</Label>
                            <Textarea 
                              id="issue" 
                              placeholder="Please describe your legal issue or concern..."
                              rows={4}
                              value={contactForm.issue}
                              onChange={(e) => setContactForm({...contactForm, issue: e.target.value})}
                            />
                          </div>
                          
                          <Button onClick={handleSubmitContact} className="w-full">
                            Send Contact Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Know Your Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Know Your Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Your Rights Under the ADA:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Equal access to all programs and services
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Reasonable accommodations when needed
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Freedom from discrimination
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Accessible facilities and technology
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Academic Rights:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Extended time for tests and assignments
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Alternative testing formats
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Note-taking assistance
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Accessible course materials
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-6">
            <Button size="lg" onClick={handleDownloadRightsGuide}>
              <Download className="h-4 w-4 mr-2" />
              Download Complete Rights Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvocacyLegal;
