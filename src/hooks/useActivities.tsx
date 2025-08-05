import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Activity {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description?: string;
  status: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchActivities = async () => {
    if (!user) {
      setActivities([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createActivity = async (activity: Omit<Activity, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([{
          ...activity,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      setActivities(prev => [data, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('activities')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setActivities(prev => prev.map(a => a.id === id ? data : a));
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const deleteActivity = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setActivities(prev => prev.filter(a => a.id !== id));
      
      toast({
        title: "Activity Deleted",
        description: "Activity removed successfully",
      });
    } catch (error) {
      console.error('Error deleting activity:', error);
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    loading,
    createActivity,
    updateActivity,
    deleteActivity,
    refetch: fetchActivities
  };
}