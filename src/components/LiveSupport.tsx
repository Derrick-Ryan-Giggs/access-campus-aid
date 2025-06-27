
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video, MessageCircle, Phone, MapPin, Clock, Users, Send, Mic, Camera, ScreenShare, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type: 'text' | 'system';
}

const LiveSupport = () => {
  const { toast } = useToast();
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const supportTypes = [
    {
      id: 'navigation',
      title: 'Navigation Assistance',
      icon: MapPin,
      description: 'Get live help navigating inaccessible campus areas',
      waitTime: '2-5 min',
      available: true,
      volunteers: 3
    },
    {
      id: 'tech',
      title: 'Technology Support',
      icon: MessageCircle,
      description: 'Technical assistance with assistive technology',
      waitTime: '1-3 min',
      available: true,
      volunteers: 5
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      icon: AlertTriangle,
      description: 'Immediate assistance for urgent situations',
      waitTime: 'Immediate',
      available: true,
      volunteers: 2
    }
  ];

  useEffect(() => {
    if (chatMessages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleRequestSupport = (type: string) => {
    setActiveRequest(type);
    setConnectionStatus('connecting');
    setQueuePosition(Math.floor(Math.random() * 3) + 1);
    
    // Simulate queue updates
    const queueTimer = setInterval(() => {
      setQueuePosition(prev => {
        if (prev && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(queueTimer);
          setConnectionStatus('connected');
          setChatMessages([{
            id: '1',
            text: 'Hello! I\'m here to help you with your request. How can I assist you today?',
            sender: 'support',
            timestamp: new Date(),
            type: 'text'
          }]);
          return null;
        }
      });
    }, 3000);

    toast({
      title: "Support Request Sent",
      description: "Connecting you with a support volunteer. Please stay on this page.",
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate support response
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I understand your concern. Let me help you with that right away.',
        sender: 'support',
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Voice Recording Stopped" : "Voice Recording Started",
      description: isRecording ? "Processing your voice message..." : "Speak now to record your message",
    });
  };

  const startVideoCall = () => {
    toast({
      title: "Video Call Starting",
      description: "Initializing video connection with accessibility features enabled.",
    });
  };

  const shareScreen = () => {
    toast({
      title: "Screen Sharing Enabled",
      description: "Your screen is now being shared with the support volunteer.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Support Hub</h1>
        <p className="text-lg text-gray-600">
          Connect with trained volunteers and support staff for real-time assistance
        </p>
      </div>

      {/* Active Session */}
      {activeRequest && (
        <div className="mb-8">
          {connectionStatus === 'connecting' && queuePosition && (
            <Card className="mb-4 border-yellow-500 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="animate-pulse bg-yellow-500 rounded-full w-3 h-3"></div>
                  <span className="font-semibold">Position in queue: {queuePosition}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Estimated wait time: {queuePosition * 2} minutes
                </p>
              </CardContent>
            </Card>
          )}

          {connectionStatus === 'connected' && (
            <Card className="border-green-500 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="animate-pulse bg-green-500 rounded-full w-3 h-3"></div>
                    <CardTitle>Connected to Support</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={startVideoCall}>
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={shareScreen}>
                      <ScreenShare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setActiveRequest(null);
                        setChatMessages([]);
                        setConnectionStatus('disconnected');
                      }}
                    >
                      End Session
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Chat Interface */}
                <div className="h-96 border rounded-lg mb-4 flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg max-w-xs ${
                            message.sender === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleVoiceRecording}
                        className={isRecording ? 'bg-red-100 text-red-600' : ''}
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Support Options */}
      {(!activeRequest || connectionStatus === 'disconnected') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {supportTypes.map(({ id, title, icon: Icon, description, waitTime, available, volunteers }) => (
            <Card key={id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <Badge variant={available ? "default" : "secondary"}>
                    {available ? "Available" : "Offline"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {waitTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {volunteers} available
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleRequestSupport(id)}
                    disabled={!available}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleRequestSupport(id)}
                    disabled={!available}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access & Emergency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="h-6 w-6 mb-2" />
              Campus Maps
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-red-50 border-red-200 hover:bg-red-100">
              <AlertTriangle className="h-6 w-6 mb-2 text-red-600" />
              Emergency
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Volunteer Hub
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveSupport;
