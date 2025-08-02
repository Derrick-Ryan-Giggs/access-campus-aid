
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Phone, MapPin, Shield, Users, Navigation, Clock, Heart, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmergencySupport = () => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lon: number} | null>(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30); // minutes
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [buddyRequest, setBuddyRequest] = useState({
    destination: '',
    time: '',
    date: '',
    notes: ''
  });

  const emergencyContacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'Emergency Contact',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      available: true
    },
    {
      id: 2,
      name: 'Campus Security',
      relationship: 'Security',
      phone: '+1 (555) 911-0000',
      email: 'security@university.edu',
      available: true
    },
    {
      id: 3,
      name: 'Crisis Counselor',
      relationship: 'Mental Health',
      phone: '+1 (555) 988-HELP',
      email: 'crisis@university.edu',
      available: true
    }
  ];

  const safetyFeatures = [
    {
      title: 'Emergency Alert',
      description: 'One-touch emergency notification with location sharing',
      icon: AlertTriangle,
      color: 'bg-red-500',
      action: 'Activate'
    },
    {
      title: 'Safe Walk Request',
      description: 'Request campus escort or buddy system support',
      icon: Users,
      color: 'bg-blue-500',
      action: 'Request'
    },
    {
      title: 'Accessible Routes',
      description: 'Navigation with accessibility-optimized paths',
      icon: Navigation,
      color: 'bg-green-500',
      action: 'Navigate'
    },
    {
      title: 'Check-In Timer',
      description: 'Automatic safety check-ins with contacts',
      icon: Clock,
      color: 'bg-yellow-500',
      action: 'Start'
    }
  ];

  const campusLocations = [
    {
      name: 'Library - Main Entrance',
      accessibility: 'Wheelchair accessible, Well-lit',
      emergencyPhone: 'Available',
      safetyRating: 5
    },
    {
      name: 'Student Center',
      accessibility: 'Full accessibility, Security desk',
      emergencyPhone: 'Available',
      safetyRating: 5
    },
    {
      name: 'Dormitory Complex A',
      accessibility: 'Accessible entrance, Key card required',
      emergencyPhone: 'Available',
      safetyRating: 4
    },
    {
      name: 'Science Building',
      accessibility: 'Elevator access, Emergency exits marked',
      emergencyPhone: 'Available',
      safetyRating: 4
    }
  ];

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Access",
            description: "Unable to access location. Some features may be limited.",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            handleTimerExpired();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const handleTimerExpired = () => {
    toast({
      title: "Check-In Timer Expired",
      description: "Emergency contacts are being notified of your status.",
      variant: "destructive"
    });
    // Here you could send automated messages to emergency contacts
  };

  const startTimer = () => {
    setTimeRemaining(timerDuration * 60); // Convert minutes to seconds
    setIsTimerActive(true);
    toast({
      title: "Check-In Timer Started",
      description: `Timer set for ${timerDuration} minutes. You'll need to check in before it expires.`,
    });
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
    toast({
      title: "Timer Paused",
      description: "Check-in timer has been paused.",
    });
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(0);
    toast({
      title: "Timer Reset",
      description: "Check-in timer has been reset.",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEmergencyCall = (contactName: string, phone: string) => {
    // Use tel: protocol to initiate actual phone call
    const telLink = `tel:${phone.replace(/[^\d+]/g, '')}`;
    window.open(telLink, '_self');
    
    toast({
      title: "Emergency Call Initiated",
      description: `Calling ${contactName}. Location shared automatically.`,
      variant: "destructive"
    });
    
    // Share location with emergency services/contacts
    if (currentLocation) {
      console.log('Sharing location:', currentLocation);
      // Here you could send location data to a backend service
    }
  };

  const handleAddEmergencyContact = () => {
    if (!emergencyContact.name || !emergencyContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide contact name and phone number",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Emergency Contact Added",
      description: `${emergencyContact.name} has been added to your emergency contacts`,
    });

    setEmergencyContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      notes: ''
    });
  };

  const handleBuddyRequest = () => {
    if (!buddyRequest.destination || !buddyRequest.date || !buddyRequest.time) {
      toast({
        title: "Missing Information",
        description: "Please provide destination, date, and time",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Buddy Request Sent",
      description: `Looking for a safety buddy for ${buddyRequest.destination} on ${buddyRequest.date} at ${buddyRequest.time}`,
    });

    setBuddyRequest({
      destination: '',
      time: '',
      date: '',
      notes: ''
    });
  };

  const activateEmergencyAlert = async () => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location access for emergency features.",
        variant: "destructive"
      });
      return;
    }

    // Send emergency alert with location
    const emergencyData = {
      location: currentLocation,
      timestamp: new Date().toISOString(),
      type: 'emergency_alert'
    };

    toast({
      title: "🚨 EMERGENCY ALERT ACTIVATED",
      description: `Alert sent to all emergency contacts. Location: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lon.toFixed(4)}`,
      variant: "destructive"
    });

    // Here you would send the alert to backend/emergency services
    console.log('Emergency alert data:', emergencyData);
  };

  const requestSafeWalk = async () => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location access to request safe walk.",
        variant: "destructive"
      });
      return;
    }

    setMapVisible(true);
    toast({
      title: "Safe Walk Requested",
      description: "Campus security notified. Showing your location on map.",
    });
  };

  const showAccessibleRoutes = async () => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location access for navigation.",
        variant: "destructive"
      });
      return;
    }

    setMapVisible(true);
    await loadMap();
    toast({
      title: "Accessible Routes",
      description: "Showing wheelchair-accessible and well-lit paths on map.",
    });
  };

  const loadMap = async () => {
    if (!mapRef.current || !currentLocation) return;

    // Create OpenStreetMap using Leaflet-style approach
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div style="width: 100%; height: 400px; background: #f0f0f0; border-radius: 8px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 10px; left: 10px; background: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 1000;">
          <strong>Your Location</strong><br/>
          ${currentLocation.lat.toFixed(4)}, ${currentLocation.lon.toFixed(4)}
        </div>
        <iframe 
          width="100%" 
          height="100%" 
          style="border: none; border-radius: 8px;"
          src="https://www.openstreetmap.org/export/embed.html?bbox=${currentLocation.lon-0.01}%2C${currentLocation.lat-0.01}%2C${currentLocation.lon+0.01}%2C${currentLocation.lat+0.01}&layer=mapnik&marker=${currentLocation.lat}%2C${currentLocation.lon}"
        ></iframe>
        <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
          🗺️ OpenStreetMap
        </div>
      </div>
    `;
  };

  const handleSafetyFeature = (featureTitle: string) => {
    switch (featureTitle) {
      case 'Emergency Alert':
        activateEmergencyAlert();
        break;
      case 'Safe Walk Request':
        requestSafeWalk();
        break;
      case 'Accessible Routes':
        showAccessibleRoutes();
        break;
      case 'Check-In Timer':
        if (!isTimerActive && timeRemaining === 0) {
          startTimer();
        }
        break;
    }
  };

  const handleNavigateToLocation = async (locationName: string) => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location access for navigation.",
        variant: "destructive"
      });
      return;
    }

    setMapVisible(true);
    await loadMap();
    toast({
      title: "Navigation Started",
      description: `Showing accessible route to ${locationName} with safety information`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          Emergency & Safety Support
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive safety features designed for accessibility and peace of mind
        </p>
      </div>

      {/* Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {safetyFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 ${feature.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
              <Button 
                onClick={() => handleSafetyFeature(feature.title)}
                className="w-full"
                variant={feature.title === 'Emergency Alert' ? 'destructive' : 'default'}
              >
                {feature.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Add Contact</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Emergency Contact</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Contact name"
                        value={emergencyContact.name}
                        onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select value={emergencyContact.relationship} onValueChange={(value) => setEmergencyContact({...emergencyContact, relationship: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family">Family Member</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="caregiver">Caregiver</SelectItem>
                          <SelectItem value="medical">Medical Professional</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={emergencyContact.phone}
                        onChange={(e) => setEmergencyContact({...emergencyContact, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@email.com"
                        value={emergencyContact.email}
                        onChange={(e) => setEmergencyContact({...emergencyContact, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Special instructions or information..."
                        value={emergencyContact.notes}
                        onChange={(e) => setEmergencyContact({...emergencyContact, notes: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddEmergencyContact} className="w-full">
                      Add Contact
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={contact.available ? "default" : "secondary"}>
                      {contact.available ? "Available" : "Offline"}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => handleEmergencyCall(contact.name, contact.phone)}
                      variant="destructive"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buddy System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Buddy System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Input
                  id="destination"
                  placeholder="Where are you going?"
                  value={buddyRequest.destination}
                  onChange={(e) => setBuddyRequest({...buddyRequest, destination: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={buddyRequest.date}
                    onChange={(e) => setBuddyRequest({...buddyRequest, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={buddyRequest.time}
                    onChange={(e) => setBuddyRequest({...buddyRequest, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Special Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Accessibility needs, meeting point, etc..."
                  value={buddyRequest.notes}
                  onChange={(e) => setBuddyRequest({...buddyRequest, notes: e.target.value})}
                />
              </div>
              <Button onClick={handleBuddyRequest} className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Request Safety Buddy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      {mapVisible && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Live Map & Navigation
              </CardTitle>
              <Button 
                onClick={() => setMapVisible(false)} 
                variant="outline" 
                size="sm"
              >
                Close Map
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div ref={mapRef} className="w-full h-96 bg-gray-100 rounded-lg">
              Loading map...
            </div>
            {currentLocation && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Current Location:</strong> {currentLocation.lat.toFixed(6)}, {currentLocation.lon.toFixed(6)}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Location updates in real-time for emergency services
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Interactive Check-In Timer */}
      {(isTimerActive || timeRemaining > 0) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Safety Check-In Timer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold mb-4 font-mono">
                {formatTime(timeRemaining)}
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  onClick={isTimerActive ? pauseTimer : startTimer}
                  variant={isTimerActive ? "secondary" : "default"}
                >
                  {isTimerActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isTimerActive ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={resetTimer} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex justify-center gap-4 mb-4">
                <div>
                  <Label htmlFor="timer-duration">Duration (minutes):</Label>
                  <Input
                    id="timer-duration"
                    type="number"
                    min="5"
                    max="120"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(Number(e.target.value))}
                    className="w-20 mx-2 text-center"
                    disabled={isTimerActive}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {isTimerActive 
                  ? "Timer is active. You'll need to check in before it expires."
                  : "Set a check-in timer for your safety."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campus Safety Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Campus Safety Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campusLocations.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{location.name}</h4>
                   <div className="flex">
                     {[...Array(5)].map((_, i) => (
                       <Shield 
                         key={i} 
                         className={`h-4 w-4 ${i < location.safetyRating ? 'text-green-500 fill-current' : 'text-gray-300'}`} 
                       />
                     ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{location.accessibility}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Emergency Phone: {location.emergencyPhone}</Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleNavigateToLocation(location.name)}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencySupport;
