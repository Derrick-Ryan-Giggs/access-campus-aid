import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, MapPin, Calendar, Truck, ShoppingCart, Clock, X } from 'lucide-react';
import { Order } from '@/hooks/useOrders';
import { format, parseISO } from 'date-fns';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onReorder: (order: Order) => void;
}

const OrderDetailModal = ({ order, isOpen, onClose, onReorder }: OrderDetailModalProps) => {
  if (!order) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <Package className="h-5 w-5 text-green-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled': return <X className="h-5 w-5 text-red-600" />;
      default: return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReorder = () => {
    onReorder(order);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order #{order.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${order.total_amount}</p>
              <p className="text-sm text-gray-500">Total Amount</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-sm">Order Date</span>
                </div>
                <p className="text-sm text-gray-600">
                  {format(parseISO(order.created_at), 'PPP')}
                </p>
              </div>

              {order.tracking_number && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-sm">Tracking</span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono">
                    {order.tracking_number}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {order.estimated_delivery && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-sm">Est. Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {format(parseISO(order.estimated_delivery), 'PPP')}
                  </p>
                </div>
              )}

              {order.actual_delivery_date && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sm">Delivered</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {format(parseISO(order.actual_delivery_date), 'PPp')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {order.delivery_address && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Delivery Address</span>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.delivery_address}
              </p>
            </div>
          )}

          {order.notes && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-sm">Notes</span>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {order.notes}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={handleReorder}
              className="flex-1 flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Reorder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;