import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  delivery_address?: string;
  tracking_number?: string;
  estimated_delivery?: string;
  actual_delivery_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string, trackingNumber?: string) => {
    if (!user) return;

    try {
      const updates: any = { status };
      if (trackingNumber) updates.tracking_number = trackingNumber;
      if (status === 'delivered') updates.actual_delivery_date = new Date().toISOString();

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === id ? data : o));
      
      toast({
        title: "Success",
        description: `Order status updated to ${status}`,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    updateOrderStatus,
    refetch: fetchOrders
  };
}