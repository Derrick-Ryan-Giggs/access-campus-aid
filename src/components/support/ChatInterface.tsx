
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Video, Send, Mic, Camera, ScreenShare, VideoOff, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { generateSupportResponse, generateContextualResponse } from '@/utils/chatResponses';

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
  supportType?: string;
}

const ChatInterface = ({ messages, onSendMessage, onEndSession, supportType = 'general' }: ChatInterfaceProps) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Voice input functionality
  const { isRecording, toggleRecording } = useVoiceInput({
    onTranscription: (text: string) => {
      setNewMessage(text);
    }
  });

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Cleanup streams on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = newMessage;
    onSendMessage(userMessage);
    setNewMessage('');
    setMessageCount(prev => prev + 1);

    // Generate varied support responses
    setTimeout(() => {
      const contextualResponse = generateContextualResponse(userMessage);
      const supportResponses = generateSupportResponse(supportType, messageCount + 1, userMessage);
      
      // Send the contextual response first
      const contextualMessage: ChatMessage = {
        id: (Date.now() + Math.random()).toString(),
        text: contextualResponse.text,
        sender: 'support',
        timestamp: new Date(),
        type: 'text'
      };
      onSendMessage(''); // Trigger parent to add support message
      
      // Add follow-up responses if available
      supportResponses.forEach((response, index) => {
        setTimeout(() => {
          const followupMessage: ChatMessage = {
            id: (Date.now() + Math.random() + index).toString(),
            text: response.text,
            sender: 'support',
            timestamp: new Date(),
            type: 'text'
          };
          onSendMessage(''); // Trigger parent to add support message
        }, response.delay || 1000);
      });
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startVideoCall = async () => {
    try {
      if (!isVideoActive) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsVideoActive(true);
        setIsCameraOn(true);
        toast({
          title: "Video Call Started",
          description: "Video connection established with accessibility features enabled.",
        });
      } else {
        // Stop video call
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        setIsVideoActive(false);
        setIsCameraOn(false);
        setIsScreenSharing(false);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        toast({
          title: "Video Call Ended",
          description: "Video connection has been terminated.",
        });
      }
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to start video calling.",
        variant: "destructive"
      });
    }
  };

  const toggleCamera = async () => {
    if (!stream) return;
    
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !isCameraOn;
      setIsCameraOn(!isCameraOn);
      toast({
        title: isCameraOn ? "Camera Turned Off" : "Camera Turned On",
        description: isCameraOn ? "Your camera is now disabled" : "Your camera is now enabled",
      });
    }
  };

  const shareScreen = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true 
        });
        
        // Replace video track with screen share
        if (stream && videoRef.current) {
          const screenTrack = screenStream.getVideoTracks()[0];
          const videoTrack = stream.getVideoTracks()[0];
          
          if (videoTrack) {
            stream.removeTrack(videoTrack);
            videoTrack.stop();
          }
          
          stream.addTrack(screenTrack);
          videoRef.current.srcObject = stream;
        }
        
        setIsScreenSharing(true);
        toast({
          title: "Screen Sharing Started",
          description: "Your screen is now being shared with the support volunteer.",
        });

        // Handle when user stops sharing from browser
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          // Switch back to camera if it was on
          if (isCameraOn && !isScreenSharing) {
            startVideoCall();
          }
          toast({
            title: "Screen Sharing Stopped",
            description: "Screen sharing has been disabled.",
          });
        };
      } else {
        // Stop screen sharing and go back to camera
        if (stream) {
          const screenTrack = stream.getVideoTracks()[0];
          if (screenTrack) {
            stream.removeTrack(screenTrack);
            screenTrack.stop();
          }
        }
        setIsScreenSharing(false);
        
        if (isCameraOn) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          const videoTrack = mediaStream.getVideoTracks()[0];
          if (stream && videoTrack) {
            stream.addTrack(videoTrack);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          }
        }
        
        toast({
          title: "Screen Sharing Stopped",
          description: "Switched back to camera view.",
        });
      }
    } catch (error) {
      toast({
        title: "Screen Share Failed",
        description: "Please allow screen sharing access or try again.",
        variant: "destructive"
      });
    }
  };

  const handleEndSession = () => {
    // Stop all media streams
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsVideoActive(false);
    setIsCameraOn(false);
    setIsScreenSharing(false);
    
    toast({
      title: "Session Ended",
      description: "Support session has been terminated. All media connections closed.",
    });
    
    onEndSession();
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
            <Button 
              variant={isVideoActive ? "default" : "outline"} 
              size="sm" 
              onClick={startVideoCall}
              className={isVideoActive ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isVideoActive ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
            {isVideoActive && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleCamera}
              >
                {isCameraOn ? <Camera className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
            )}
            <Button 
              variant={isScreenSharing ? "default" : "outline"} 
              size="sm" 
              onClick={shareScreen}
              className={isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <ScreenShare className="h-4 w-4" />
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleEndSession}
            >
              End Session
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Video Display */}
        {isVideoActive && (
          <div className="mb-4 relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-48 bg-black rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              {isScreenSharing && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                  Screen Sharing
                </span>
              )}
              {!isCameraOn && !isScreenSharing && (
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                  Camera Off
                </span>
              )}
            </div>
          </div>
        )}

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
                placeholder="Type your message or use voice input..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleRecording}
                className={`w-10 h-10 p-0 flex-shrink-0 ${
                  isRecording 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={sendMessage} className="w-10 h-10 p-0 flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isRecording && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                🎤 Listening... Tap microphone to stop
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
