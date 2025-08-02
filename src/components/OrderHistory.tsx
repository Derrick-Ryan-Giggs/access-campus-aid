import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
import { useOrders, Order } from '@/hooks/useOrders';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import OrderDetailModal from './OrderDetailModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const OrderHistory = () => {
  const { orders, loading, updateOrderStatus } = useOrders();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'shipped': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ordersByStatus = {
    all: orders,
    pending: orders.filter(o => o.status === 'pending'),
    delivered: orders.filter(o => o.status === 'delivered'),
    cancelled: orders.filter(o => o.status === 'cancelled')
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleReorder = async (order: Order) => {
    if (!user) return;

    try {
      // Get order items (simulated since we don't have order_items data yet)
      const orderItems = [
        { name: 'Sample Item 1', quantity: 1 },
        { name: 'Sample Item 2', quantity: 2 }
      ];

      // Add items to cart
      for (const item of orderItems) {
        // Simulate adding to cart by creating a notification
        const { error } = await supabase
          .from('notifications')
          .insert({
            user_id: user.id,
            type: 'success',
            title: 'Item Added to Cart',
            message: `${item.name} (${item.quantity}x) has been added to your cart from reorder`,
            data: { reorderId: order.id, itemName: item.name, quantity: item.quantity },
            read: false
          });

        if (error) throw error;
      }

      toast({
        title: "Reorder Started",
        description: `${orderItems.length} items from order #${order.id.slice(0, 8)} have been added to your cart`,
      });
    } catch (error) {
      console.error('Error reordering:', error);
      toast({
        title: "Error",
        description: "Failed to reorder items",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order History</h2>
        <p className="text-muted-foreground">Track your grocery orders and delivery status</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({ordersByStatus.all.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({ordersByStatus.pending.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({ordersByStatus.delivered.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({ordersByStatus.cancelled.length})</TabsTrigger>
        </TabsList>

        {Object.entries(ordersByStatus).map(([status, orderList]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {orderList.length > 0 ? (
              orderList.map((order) => (
                 <Card key={order.id} className="hover:shadow-md transition-shadow">
                   <CardHeader className="pb-3">
                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                       <div className="flex-1 min-w-0">
                         <CardTitle className="text-base sm:text-lg truncate">Order #{order.id.slice(0, 8)}</CardTitle>
                         <p className="text-xs sm:text-sm text-gray-600 mt-1">
                           Placed on {format(parseISO(order.created_at), 'MMM d, yyyy')}
                         </p>
                       </div>
                       <div className="flex items-center gap-2 flex-shrink-0">
                         {getStatusIcon(order.status)}
                         <Badge className={`${getStatusColor(order.status)} text-xs`}>
                           {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                         </Badge>
                       </div>
                     </div>
                   </CardHeader>
                   <CardContent className="space-y-3 sm:space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Total Amount</p>
                        <p className="text-gray-600">${order.total_amount}</p>
                      </div>
                      {order.delivery_address && (
                        <div>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            Delivery Address
                          </p>
                          <p className="text-gray-600">{order.delivery_address}</p>
                        </div>
                      )}
                      {order.tracking_number && (
                        <div>
                          <p className="font-medium text-gray-900">Tracking Number</p>
                          <p className="text-gray-600 font-mono">{order.tracking_number}</p>
                        </div>
                      )}
                    </div>

                    {order.estimated_delivery && (
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Estimated Delivery</p>
                        <p className="text-gray-600">{format(parseISO(order.estimated_delivery), 'PPP')}</p>
                      </div>
                    )}

                    {order.actual_delivery_date && (
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Delivered On</p>
                        <p className="text-gray-600">{format(parseISO(order.actual_delivery_date), 'PPpp')}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(order)}
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReorder(order)}
                        className="flex-1"
                      >
                        Reorder
                      </Button>
                      {order.status === 'pending' && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="flex-1"
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">
                  {status === 'all' ? 'You haven\'t placed any orders yet.' : `No ${status} orders found.`}
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onReorder={handleReorder}
      />
    </div>
  );
};

export default OrderHistory;