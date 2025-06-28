
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  email: string;
  phone?: string;
  availability?: string;
  rating: number;
  bio?: string;
  image?: string;
}

export interface TutorRequest {
  id: string;
  tutor_id: string;
  subject: string;
  message: string;
  preferred_time?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  tutor?: Tutor;
}

export function useTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [requests, setRequests] = useState<TutorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTutors = async () => {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setTutors(data || []);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      toast({
        title: "Error",
        description: "Failed to load tutors",
        variant: "destructive",
      });
    }
  };

  const fetchRequests = async () => {
    if (!user) {
      setRequests([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tutor_requests')
        .select(`
          *,
          tutor:tutors(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: "Failed to load tutor requests",
        variant: "destructive",
      });
    }
  };

  const addTutor = async (tutor: Omit<Tutor, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('tutors')
        .insert([tutor])
        .select()
        .single();

      if (error) throw error;

      setTutors(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Tutor added successfully",
      });
    } catch (error) {
      console.error('Error adding tutor:', error);
      toast({
        title: "Error",
        description: "Failed to add tutor",
        variant: "destructive",
      });
    }
  };

  const requestTutor = async (tutorId: string, subject: string, message: string, preferredTime?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tutor_requests')
        .insert([{
          user_id: user.id,
          tutor_id: tutorId,
          subject,
          message,
          preferred_time: preferredTime
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchRequests();
      toast({
        title: "Success",
        description: "Tutor request sent successfully",
      });
    } catch (error) {
      console.error('Error requesting tutor:', error);
      toast({
        title: "Error",
        description: "Failed to send tutor request",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTutors(), fetchRequests()]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    tutors,
    requests,
    loading,
    addTutor,
    requestTutor,
    refetch: () => Promise.all([fetchTutors(), fetchRequests()])
  };
}
