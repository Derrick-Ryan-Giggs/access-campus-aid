
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Check, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success' | 'emergency';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'info',
      title: 'Tutor Response',
      message: 'Sarah Johnson has accepted your tutoring request for Mathematics.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Reminder Due Soon',
      message: 'Your medication reminder is due in 30 minutes.',
      timestamp: '30 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Order Delivered',
      message: 'Your grocery order has been successfully delivered.',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature',
      message: 'Check out our new accessibility features in settings.',
      timestamp: '2 days ago',
      read: true
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <Check className="h-4 w-4 text-green-600" />;
      case 'emergency': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-400';
      case 'success': return 'border-l-green-400';
      case 'emergency': return 'border-l-red-400';
      default: return 'border-l-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="mb-4 w-full"
            >
              Mark All as Read
            </Button>
          )}

          <div className="space-y-3">
            {notifications.map(notification => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${getBorderColor(notification.type)} ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
