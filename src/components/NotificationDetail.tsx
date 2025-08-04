import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, Info, Trash2, X } from 'lucide-react';
import { Notification } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDetailProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const NotificationDetail = ({ notification, isOpen, onClose, onDelete }: NotificationDetailProps) => {
  if (!notification) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      case 'success': return <Check className="h-6 w-6 text-green-600" />;
      case 'emergency': return <AlertCircle className="h-6 w-6 text-red-600" />;
      default: return <Info className="h-6 w-6 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleDelete = () => {
    onDelete(notification.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {getIcon(notification.type)}
              {notification.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(notification.type)}>
                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
          </div>
          
          {notification.data && typeof notification.data === 'object' && Object.keys(notification.data).length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Additional Details:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {Object.entries(notification.data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-2">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-right break-words">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t">
            <span>
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </span>
            <div className="flex items-center gap-2">
              {!notification.read && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Unread</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDetail;