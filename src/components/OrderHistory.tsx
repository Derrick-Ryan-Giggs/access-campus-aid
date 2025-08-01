import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { format, parseISO } from 'date-fns';

const OrderHistory = () => {
  const { orders, loading, updateOrderStatus } = useOrders();

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
    shipped: orders.filter(o => o.status === 'shipped'),
    delivered: orders.filter(o => o.status === 'delivered'),
    cancelled: orders.filter(o => o.status === 'cancelled')
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({ordersByStatus.all.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({ordersByStatus.pending.length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({ordersByStatus.shipped.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({ordersByStatus.delivered.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({ordersByStatus.cancelled.length})</TabsTrigger>
        </TabsList>

        {Object.entries(ordersByStatus).map(([status, orderList]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {orderList.length > 0 ? (
              orderList.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Placed on {format(parseISO(order.created_at), 'PPP')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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

                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
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
    </div>
  );
};

export default OrderHistory;