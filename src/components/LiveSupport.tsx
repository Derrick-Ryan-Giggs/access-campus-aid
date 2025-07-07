import { useState } from 'react';
import { MapPin, MessageCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SupportTypeCard from '@/components/support/SupportTypeCard';
import ChatInterface from '@/components/support/ChatInterface';
import QueueStatus from '@/components/support/QueueStatus';
import QuickAccessPanel from '@/components/support/QuickAccessPanel';

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
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

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

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, userMessage]);
  };

  const handleEndSession = () => {
    setActiveRequest(null);
    setChatMessages([]);
    setConnectionStatus('disconnected');
    setQueuePosition(null);
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
            <QueueStatus queuePosition={queuePosition} />
          )}

          {connectionStatus === 'connected' && (
            <ChatInterface 
              messages={chatMessages} 
              onSendMessage={handleSendMessage}
              onEndSession={handleEndSession}
              supportType={activeRequest}
            />
          )}
        </div>
      )}

      {/* Support Options */}
      {(!activeRequest || connectionStatus === 'disconnected') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {supportTypes.map((supportType) => (
            <SupportTypeCard
              key={supportType.id}
              {...supportType}
              onRequestSupport={handleRequestSupport}
            />
          ))}
        </div>
      )}

      {/* Quick Access */}
      <QuickAccessPanel />
    </div>
  );
};

export default LiveSupport;
