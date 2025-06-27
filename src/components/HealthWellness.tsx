import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Video, Heart, Activity, Pill, Stethoscope, Brain, Dumbbell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HealthWellness = () => {
  const { toast } = useToast();
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    reason: '',
    symptoms: ''
  });
  const [programForm, setProgramForm] = useState({
    program: '',
    fitnessLevel: '',
    goals: '',
    limitations: ''
  });
  const [medicationForm, setMedicationForm] = useState({
    medications: '',
    reminders: '',
    pharmacy: '',
    allergies: ''
  });
  
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

  const handleBookConsultation = (doctorId: number, doctorName: string) => {
    setAppointmentForm({...appointmentForm, doctorId: doctorId.toString(), doctorName});
  };

  const handleSubmitAppointment = () => {
    if (!appointmentForm.date || !appointmentForm.time || !appointmentForm.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to book your consultation.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Consultation Booked!",
      description: `Your appointment with ${appointmentForm.doctorName} is scheduled for ${appointmentForm.date} at ${appointmentForm.time}`,
    });
    
    setAppointmentForm({
      doctorId: '',
      doctorName: '',
      date: '',
      time: '',
      reason: '',
      symptoms: ''
    });
  };

  const handleJoinProgram = (programTitle: string) => {
    setProgramForm({...programForm, program: programTitle});
  };

  const handleSubmitProgramEnrollment = () => {
    if (!programForm.fitnessLevel || !programForm.goals) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields to join the program.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Program Enrollment Successful!",
      description: `Welcome to ${programForm.program}! Your personalized plan will be ready within 24 hours.`,
    });
    
    setProgramForm({
      program: '',
      fitnessLevel: '',
      goals: '',
      limitations: ''
    });
  };

  const handleSetupMedicationTracking = () => {
    if (!medicationForm.medications) {
      toast({
        title: "Missing Information",
        description: "Please list your medications to set up tracking.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Medication Tracking Setup Complete!",
      description: "Your medication reminders have been configured. You'll receive notifications as scheduled.",
    });
    
    setMedicationForm({
      medications: '',
      reminders: '',
      pharmacy: '',
      allergies: ''
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-20 flex-col">
              <Pill className="h-6 w-6 mb-2" />
              Medication Tracker
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Setup Medication Tracking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="medications">Current Medications *</Label>
                <Textarea 
                  id="medications" 
                  placeholder="List your medications with dosages..."
                  value={medicationForm.medications}
                  onChange={(e) => setMedicationForm({...medicationForm, medications: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="reminders">Reminder Frequency</Label>
                <Select value={medicationForm.reminders} onValueChange={(value) => setMedicationForm({...medicationForm, reminders: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice-daily">Twice Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
                <Input 
                  id="pharmacy" 
                  placeholder="Enter pharmacy name/location"
                  value={medicationForm.pharmacy}
                  onChange={(e) => setMedicationForm({...medicationForm, pharmacy: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="allergies">Drug Allergies</Label>
                <Textarea 
                  id="allergies" 
                  placeholder="List any drug allergies or adverse reactions..."
                  value={medicationForm.allergies}
                  onChange={(e) => setMedicationForm({...medicationForm, allergies: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSetupMedicationTracking} className="w-full">
                Setup Tracking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1" 
                          onClick={() => handleBookConsultation(doctor.id, doctor.name)}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book Consultation with {doctor.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="date">Date *</Label>
                              <Input 
                                id="date" 
                                type="date" 
                                value={appointmentForm.date}
                                onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="time">Time *</Label>
                              <Select value={appointmentForm.time} onValueChange={(value) => setAppointmentForm({...appointmentForm, time: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">10:00 AM</SelectItem>
                                  <SelectItem value="11:00">11:00 AM</SelectItem>
                                  <SelectItem value="14:00">2:00 PM</SelectItem>
                                  <SelectItem value="15:00">3:00 PM</SelectItem>
                                  <SelectItem value="16:00">4:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="reason">Reason for Visit *</Label>
                            <Input 
                              id="reason" 
                              placeholder="Brief description of your concern"
                              value={appointmentForm.reason}
                              onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="symptoms">Symptoms & Details</Label>
                            <Textarea 
                              id="symptoms" 
                              placeholder="Describe your symptoms, concerns, or questions..."
                              value={appointmentForm.symptoms}
                              onChange={(e) => setAppointmentForm({...appointmentForm, symptoms: e.target.value})}
                            />
                          </div>
                          
                          <Button onClick={handleSubmitAppointment} className="w-full">
                            Book Consultation
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
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
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => handleJoinProgram(title)}
                    >
                      Join Program
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Join {title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fitnessLevel">Current Fitness Level *</Label>
                        <Select value={programForm.fitnessLevel} onValueChange={(value) => setProgramForm({...programForm, fitnessLevel: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="adapted">Requires Adaptation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="goals">Your Goals *</Label>
                        <Textarea 
                          id="goals" 
                          placeholder="What do you hope to achieve with this program?"
                          value={programForm.goals}
                          onChange={(e) => setProgramForm({...programForm, goals: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="limitations">Physical Limitations or Concerns</Label>
                        <Textarea 
                          id="limitations" 
                          placeholder="Any physical limitations we should know about..."
                          value={programForm.limitations}
                          onChange={(e) => setProgramForm({...programForm, limitations: e.target.value})}
                        />
                      </div>
                      
                      <Button onClick={handleSubmitProgramEnrollment} className="w-full">
                        Join Program
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">Set Up Medication Tracking</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Setup Medication Tracking</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="medications">Current Medications *</Label>
                    <Textarea 
                      id="medications" 
                      placeholder="List your medications with dosages..."
                      value={medicationForm.medications}
                      onChange={(e) => setMedicationForm({...medicationForm, medications: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reminders">Reminder Frequency</Label>
                    <Select value={medicationForm.reminders} onValueChange={(value) => setMedicationForm({...medicationForm, reminders: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="pharmacy">Preferred Pharmacy</Label>
                    <Input 
                      id="pharmacy" 
                      placeholder="Enter pharmacy name/location"
                      value={medicationForm.pharmacy}
                      onChange={(e) => setMedicationForm({...medicationForm, pharmacy: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="allergies">Drug Allergies</Label>
                    <Textarea 
                      id="allergies" 
                      placeholder="List any drug allergies or adverse reactions..."
                      value={medicationForm.allergies}
                      onChange={(e) => setMedicationForm({...medicationForm, allergies: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleSetupMedicationTracking} className="w-full">
                    Setup Tracking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
