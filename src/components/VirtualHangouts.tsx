import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Users, Video, Gamepad2, BookOpen, Music, Coffee, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VirtualHangouts = () => {
  const { toast } = useToast();
  const [eventForm, setEventForm] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    maxParticipants: '',
    accessibilityFeatures: []
  });
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Gaming Night - Accessible Games',
      type: 'Gaming',
      icon: Gamepad2,
      time: 'Today 7:00 PM',
      participants: 12,
      maxParticipants: 15,
      description: 'Join us for accessible gaming with adaptive controllers and screen readers',
      accessibility: ['Screen Reader Friendly', 'Closed Captions', 'Voice Commands']
    },
    {
      id: 2,
      title: 'Book Club - "Nothing About Us Without Us"',
      type: 'Book Club',
      icon: BookOpen,
      time: 'Tomorrow 6:00 PM',
      participants: 8,
      maxParticipants: 12,
      description: 'Monthly discussion of disability rights literature',
      accessibility: ['Audio Books Available', 'Large Print Options', 'Sign Language Interpreter']
    },
    {
      id: 3,
      title: 'Virtual Coffee Chat',
      type: 'Social',
      icon: Coffee,
      time: 'Friday 3:00 PM',
      participants: 15,
      maxParticipants: 20,
      description: 'Casual conversation and peer support in a relaxed setting',
      accessibility: ['All Levels Welcome', 'Text Chat Option', 'Quiet Background']
    },
    {
      id: 4,
      title: 'Music Listening Party',
      type: 'Music',
      icon: Music,
      time: 'Saturday 8:00 PM',
      participants: 6,
      maxParticipants: 10,
      description: 'Share and discover new music together with audio descriptions',
      accessibility: ['Audio Focus', 'No Flashing Lights', 'Volume Control']
    }
  ];

  const eventTypes = [
    { name: 'Gaming', color: 'bg-blue-500', count: 8 },
    { name: 'Book Club', color: 'bg-green-500', count: 4 },
    { name: 'Social', color: 'bg-purple-500', count: 12 },
    { name: 'Music', color: 'bg-pink-500', count: 6 },
    { name: 'Study Group', color: 'bg-orange-500', count: 10 }
  ];

  const handleJoinEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Joined!",
      description: `You've successfully joined "${eventTitle}". You'll receive a reminder 15 minutes before the event starts.`,
    });
  };

  const handleCreateEvent = () => {
    if (!eventForm.title || !eventForm.type || !eventForm.date || !eventForm.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to create your event.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Event Created Successfully!",
      description: `"${eventForm.title}" has been scheduled for ${eventForm.date} at ${eventForm.time}`,
    });
    
    // Reset form
    setEventForm({
      title: '',
      type: '',
      date: '',
      time: '',
      duration: '',
      description: '',
      maxParticipants: '',
      accessibilityFeatures: []
    });
  };

  const handleBrowseCommunities = () => {
    toast({
      title: "Communities Directory",
      description: "Opening community browser with 50+ active groups...",
    });
  };

  const toggleAccessibilityFeature = (feature: string) => {
    const updatedFeatures = eventForm.accessibilityFeatures.includes(feature)
      ? eventForm.accessibilityFeatures.filter(f => f !== feature)
      : [...eventForm.accessibilityFeatures, feature];
    
    setEventForm({...eventForm, accessibilityFeatures: updatedFeatures});
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Virtual Hangouts & Clubs</h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students in accessible online events and communities
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input 
                  id="title" 
                  placeholder="Enter event title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="type">Event Type *</Label>
                <Select value={eventForm.type} onValueChange={(value) => setEventForm({...eventForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="book-club">Book Club</SelectItem>
                    <SelectItem value="social">Social Chat</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="study">Study Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={eventForm.date}
                    onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={eventForm.time}
                    onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={eventForm.duration} onValueChange={(value) => setEventForm({...eventForm, duration: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input 
                    id="maxParticipants" 
                    type="number" 
                    placeholder="e.g., 15"
                    value={eventForm.maxParticipants}
                    onChange={(e) => setEventForm({...eventForm, maxParticipants: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your event..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Accessibility Features</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Closed Captions', 'Screen Reader Friendly', 'Sign Language', 'Voice Commands', 'Large Text', 'Audio Description'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox 
                        id={feature}
                        checked={eventForm.accessibilityFeatures.includes(feature)}
                        onCheckedChange={() => toggleAccessibilityFeature(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button onClick={handleCreateEvent} className="w-full">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="lg" onClick={handleBrowseCommunities}>
          <Users className="h-5 w-5 mr-2" />
          Browse Communities
        </Button>
        
        <Button variant="outline" size="lg">
          <Video className="h-5 w-5 mr-2" />
          Join Random Chat
        </Button>
      </div>

      {/* Event Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {eventTypes.map(({ name, color, count }) => (
          <Card key={name} className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className={`w-12 h-12 ${color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <span className="text-white font-bold">{count}</span>
              </div>
              <h3 className="font-semibold text-sm">{name}</h3>
              <p className="text-xs text-gray-600">{count} events this week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <event.icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{event.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{event.time}</div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {event.participants}/{event.maxParticipants}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                {/* Accessibility Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.accessibility.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleJoinEvent(event.id, event.title)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Join Event
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Our Inclusive Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Inclusive Environment</h3>
              <p className="text-sm text-gray-600">All events are designed with accessibility in mind</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Multiple Access Options</h3>
              <p className="text-sm text-gray-600">Join via video, audio-only, or text chat</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Safe Space</h3>
              <p className="text-sm text-gray-600">Moderated environments with peer support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualHangouts;
