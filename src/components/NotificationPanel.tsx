
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Check, AlertCircle, Info } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();

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

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-end animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-md h-full shadow-xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="touch-manipulation"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="mb-4 w-full touch-manipulation"
            >
              Mark All as Read
            </Button>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.length > 0 ? notifications.map(notification => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${getBorderColor(notification.type)} ${
                    !notification.read ? 'bg-blue-50' : ''
                  } touch-manipulation`}
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
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
