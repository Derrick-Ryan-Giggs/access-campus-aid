import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, MessageCircle, Video, GraduationCap, Briefcase, Heart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Mentorship = () => {
  const { toast } = useToast();
  const [connectionForm, setConnectionForm] = useState({
    message: '',
    goals: '',
    availability: '',
    experience: ''
  });
  const [messageForm, setMessageForm] = useState({
    recipient: '',
    subject: '',
    message: ''
  });
  
  const mentors = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Software Engineer at Google',
      disability: 'Visual Impairment',
      expertise: ['Computer Science', 'Career Development', 'Assistive Technology'],
      experience: '5 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Graduated from Stanford with CS degree. Passionate about making tech accessible.',
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      role: 'Clinical Psychologist',
      disability: 'Mobility Impairment',
      expertise: ['Psychology', 'Mental Health', 'Academic Support'],
      experience: '8 years',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'PhD in Clinical Psychology. Specializes in disability and mental health.',
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'Disability Rights Lawyer',
      disability: 'Hearing Impairment',
      expertise: ['Law', 'Advocacy', 'Legal Rights'],
      experience: '12 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Harvard Law graduate specializing in disability rights and accommodation law.',
      availability: 'Flexible'
    },
    {
      id: 4,
      name: 'Sarah Kim',
      role: 'Marketing Director',
      disability: 'Chronic Illness',
      expertise: ['Business', 'Marketing', 'Entrepreneurship'],
      experience: '7 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Built successful marketing career while managing chronic illness. MBA from Wharton.',
      availability: 'Mornings'
    }
  ];

  const programs = [
    {
      title: 'Career Mentorship',
      icon: Briefcase,
      description: 'Connect with professionals in your field',
      participants: 145,
      color: 'bg-blue-500'
    },
    {
      title: 'Academic Support',
      icon: GraduationCap,
      description: 'Get help with studies and research',
      participants: 89,
      color: 'bg-green-500'
    },
    {
      title: 'Peer Mentorship',
      icon: Heart,
      description: 'Connect with students with similar experiences',
      participants: 203,
      color: 'bg-purple-500'
    }
  ];

  const handleConnectMentor = (mentorId: number, mentorName: string) => {
    setConnectionForm({...connectionForm});
    // Dialog will open automatically
  };

  const handleSendConnectionRequest = (mentorName: string) => {
    if (!connectionForm.message || !connectionForm.goals) {
      toast({
        title: "Missing Information",
        description: "Please fill in your message and goals to connect with the mentor.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Connection Request Sent!",
      description: `Your message has been sent to ${mentorName}. They'll respond within 24 hours.`,
    });
    
    setConnectionForm({
      message: '',
      goals: '',
      availability: '',
      experience: ''
    });
  };

  const handleSendMessage = () => {
    if (!messageForm.subject || !messageForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in the subject and message fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: `Your message to ${messageForm.recipient} has been delivered.`,
    });
    
    setMessageForm({
      recipient: '',
      subject: '',
      message: ''
    });
  };

  const handleScheduleCall = (mentorName: string) => {
    toast({
      title: "Calendar Opening",
      description: `Opening calendar to schedule a session with ${mentorName}...`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mentorship Program</h1>
        <p className="text-lg text-gray-600">
          Connect with disabled alumni and professionals for guidance and support
        </p>
      </div>

      {/* Program Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {programs.map(({ title, icon: Icon, description, participants, color }) => (
          <Card key={title} className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className={`w-16 h-16 ${color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 mb-3">{description}</p>
              <Badge variant="secondary">{participants} participants</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Mentors */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Mentors</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mentor.image} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm ml-1">{mentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {mentor.disability}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{mentor.bio}</p>
                
                {/* Expertise */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Experience:</span>
                    <div className="font-semibold">{mentor.experience}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Available:</span>
                    <div className="font-semibold">{mentor.availability}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex-1" 
                        onClick={() => handleConnectMentor(mentor.id, mentor.name)}
                      >
                        Connect
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Connect with {mentor.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="goals">Your Goals</Label>
                          <Textarea 
                            id="goals" 
                            placeholder="What are you hoping to achieve through mentorship?"
                            value={connectionForm.goals}
                            onChange={(e) => setConnectionForm({...connectionForm, goals: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="experience">Your Background</Label>
                          <Textarea 
                            id="experience" 
                            placeholder="Tell us about your academic/professional background..."
                            value={connectionForm.experience}
                            onChange={(e) => setConnectionForm({...connectionForm, experience: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="availability">Your Availability</Label>
                          <Input 
                            id="availability" 
                            placeholder="e.g., Weekends, Evenings"
                            value={connectionForm.availability}
                            onChange={(e) => setConnectionForm({...connectionForm, availability: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="message">Personal Message</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Write a personal message to introduce yourself..."
                            value={connectionForm.message}
                            onChange={(e) => setConnectionForm({...connectionForm, message: e.target.value})}
                          />
                        </div>
                        
                        <Button onClick={() => handleSendConnectionRequest(mentor.name)} className="w-full">
                          Send Connection Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setMessageForm({...messageForm, recipient: mentor.name})}>
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Message to {mentor.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            placeholder="Enter message subject"
                            value={messageForm.subject}
                            onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="messageText">Message</Label>
                          <Textarea 
                            id="messageText" 
                            placeholder="Write your message..."
                            rows={4}
                            value={messageForm.message}
                            onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                          />
                        </div>
                        
                        <Button onClick={handleSendMessage} className="w-full">
                          Send Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm" onClick={() => handleScheduleCall(mentor.name)}>
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How Mentorship Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Browse Mentors</h3>
              <p className="text-xs text-gray-600">Find mentors that match your interests and goals</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Send Request</h3>
              <p className="text-xs text-gray-600">Send a connection request with your background</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Get Matched</h3>
              <p className="text-xs text-gray-600">Mentor reviews and accepts your request</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">Start Learning</h3>
              <p className="text-xs text-gray-600">Begin your mentorship journey</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mentorship;
