
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, Check, AlertCircle, Info, Trash2 } from 'lucide-react';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import NotificationDetail from './NotificationDetail';
import { useState } from 'react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loading } = useNotifications();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailOpen(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleDeleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification(id);
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
                  onClick={() => handleNotificationClick(notification)}
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
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                          </p>
                           <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleDeleteNotification(notification.id, e)}
                            className="h-12 w-12 p-0 text-gray-400 hover:text-red-600 touch-manipulation min-h-12 min-w-12 active:bg-red-50 active:scale-95 transition-all duration-150"
                            onTouchStart={(e) => {
                              e.stopPropagation();
                              e.currentTarget.style.transform = 'scale(0.95)';
                              e.currentTarget.style.backgroundColor = 'rgb(254 242 242)';
                            }}
                            onTouchEnd={(e) => {
                              e.stopPropagation();
                              e.currentTarget.style.transform = '';
                              e.currentTarget.style.backgroundColor = '';
                            }}
                          >
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </div>
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
      
      <NotificationDetail
        notification={selectedNotification}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onDelete={deleteNotification}
      />
    </div>
  );
};

export default NotificationPanel;
