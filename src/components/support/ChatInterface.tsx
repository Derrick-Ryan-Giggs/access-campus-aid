
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video, Send, Mic, Camera, ScreenShare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type: 'text' | 'system';
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onEndSession: () => void;
}

const ChatInterface = ({ messages, onSendMessage, onEndSession }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
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
    <Card className="border-green-500 bg-green-50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse bg-green-500 rounded-full w-3 h-3"></div>
            <CardTitle>Connected to Support</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={startVideoCall}>
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={shareScreen}>
              <ScreenShare className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEndSession}
              className="bg-white"
            >
              End Session
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 border rounded-lg mb-4 flex flex-col bg-white overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
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
          
          <div className="p-4 border-t bg-white flex-shrink-0">
            <div className="flex space-x-2 items-center">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVoiceRecording}
                className={`w-10 h-10 p-0 flex-shrink-0 ${isRecording ? 'bg-red-100 text-red-600' : 'bg-white'}`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={sendMessage} className="w-10 h-10 p-0 flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
