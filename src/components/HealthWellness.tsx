
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Video, Heart, Activity, Pill, Stethoscope, Brain, Dumbbell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthWellness = () => {
  const { toast } = useToast();
  
  const telehealth = [
    {
      id: 1,
      name: 'Dr. Lisa Park',
      specialty: 'Occupational Therapy',
      rating: 4.9,
      nextAvailable: 'Today 3:00 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      experience: '12 years',
      specialties: ['Adaptive Equipment', 'Daily Living Skills', 'Workplace Accommodations']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Physical Therapy',
      rating: 4.8,
      nextAvailable: 'Tomorrow 10:00 AM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      experience: '8 years',
      specialties: ['Mobility Training', 'Pain Management', 'Strength Building']
    },
    {
      id: 3,
      name: 'Dr. Sarah Wilson',
      specialty: 'Clinical Psychology',
      rating: 5.0,
      nextAvailable: 'Today 5:00 PM',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      experience: '15 years',
      specialties: ['Disability Counseling', 'Anxiety/Depression', 'Coping Strategies']
    }
  ];

  const programs = [
    {
      title: 'Adaptive Fitness',
      icon: Dumbbell,
      description: 'Customized workout plans for all abilities',
      sessions: 24,
      difficulty: 'All Levels'
    },
    {
      title: 'Mindfulness & Meditation',
      icon: Brain,
      description: 'Mental wellness and stress management',
      sessions: 16,
      difficulty: 'Beginner Friendly'
    },
    {
      title: 'Physical Rehabilitation',
      icon: Activity,
      description: 'Recovery and mobility improvement',
      sessions: 32,
      difficulty: 'Personalized'
    }
  ];

  const handleBookConsultation = (doctorId: number) => {
    toast({
      title: "Consultation Booked",
      description: "You'll receive a video call link 15 minutes before your appointment.",
    });
  };

  const handleJoinProgram = (program: string) => {
    toast({
      title: "Program Enrollment",
      description: `Welcome to ${program}! Your personalized plan will be ready shortly.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Health & Wellness Support</h1>
        <p className="text-lg text-gray-600">
          Comprehensive healthcare services designed for students with disabilities
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button variant="outline" className="h-20 flex-col">
          <Stethoscope className="h-6 w-6 mb-2" />
          Book Telehealth
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Pill className="h-6 w-6 mb-2" />
          Medication Tracker
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Activity className="h-6 w-6 mb-2" />
          Fitness Programs
        </Button>
        <Button variant="outline" className="h-20 flex-col">
          <Heart className="h-6 w-6 mb-2" />
          Wellness Check
        </Button>
      </div>

      {/* Telehealth Providers */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Telehealth Specialists</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {telehealth.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm ml-1">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
                    <p className="text-sm text-gray-500">Next: {doctor.nextAvailable}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleBookConsultation(doctor.id)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Wellness Programs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Wellness Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map(({ title, icon: Icon, description, sessions, difficulty }) => (
            <Card key={title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-semibold">{sessions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <Badge variant="secondary" className="text-xs">{difficulty}</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleJoinProgram(title)}
                >
                  Join Program
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Medication Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-6 w-6 mr-2" />
            Medication Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Reminders</h3>
              <p className="text-sm text-gray-600">Customizable medication alerts and tracking</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Pharmacy Coordination</h3>
              <p className="text-sm text-gray-600">Direct connection with campus and local pharmacies</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Health Monitoring</h3>
              <p className="text-sm text-gray-600">Track symptoms and medication effectiveness</p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Button size="lg">Set Up Medication Tracking</Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Health Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Health Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">24/7</div>
              <p className="text-sm text-gray-600">Crisis Support</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">988</div>
              <p className="text-sm text-gray-600">Mental Health Hotline</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">15min</div>
              <p className="text-sm text-gray-600">Average Response Time</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">100+</div>
              <p className="text-sm text-gray-600">Healthcare Providers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthWellness;
