
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Reminder {
  id: string;
  type: 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting';
  title: string;
  description?: string;
  date: string;
  time: string;
  completed: boolean;
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReminders = async () => {
    if (!user) {
      setReminders([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      // Type cast the data to match our interface
      const typedReminders: Reminder[] = (data || []).map(item => ({
        id: item.id,
        type: item.type as 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting',
        title: item.title,
        description: item.description,
        date: item.date,
        time: item.time,
        completed: item.completed
      }));

      setReminders(typedReminders);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast({
        title: "Error",
        description: "Failed to load reminders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id' | 'completed'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert([{
          ...reminder,
          user_id: user.id,
          completed: false
        }])
        .select()
        .single();

      if (error) throw error;

      const typedReminder: Reminder = {
        id: data.id,
        type: data.type as 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting',
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        completed: data.completed
      };

      setReminders(prev => [...prev, typedReminder]);
      toast({
        title: "Success",
        description: "Reminder added successfully",
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
      toast({
        title: "Error",
        description: "Failed to add reminder",
        variant: "destructive",
      });
    }
  };

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reminders')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const typedReminder: Reminder = {
        id: data.id,
        type: data.type as 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting',
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        completed: data.completed
      };

      setReminders(prev => prev.map(r => r.id === id ? typedReminder : r));
      toast({
        title: "Success",
        description: "Reminder updated successfully",
      });
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast({
        title: "Error",
        description: "Failed to update reminder",
        variant: "destructive",
      });
    }
  };

  const deleteReminder = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reminders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setReminders(prev => prev.filter(r => r.id !== id));
      toast({
        title: "Success",
        description: "Reminder deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast({
        title: "Error",
        description: "Failed to delete reminder",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [user]);

  return {
    reminders,
    loading,
    addReminder,
    updateReminder,
    deleteReminder,
    refetch: fetchReminders
  };
}
