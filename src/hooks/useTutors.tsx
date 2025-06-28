
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
  user_id: string;
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
  const [tutorRequests, setTutorRequests] = useState<TutorRequest[]>([]);
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

      const typedTutors: Tutor[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        subjects: item.subjects,
        email: item.email,
        phone: item.phone,
        availability: item.availability,
        rating: typeof item.rating === 'string' ? parseFloat(item.rating) : (item.rating || 0),
        bio: item.bio,
        image: item.image
      }));

      setTutors(typedTutors);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      toast({
        title: "Error",
        description: "Failed to load tutors",
        variant: "destructive",
      });
    }
  };

  const fetchTutorRequests = async () => {
    if (!user) {
      setTutorRequests([]);
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

      const typedRequests: TutorRequest[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        tutor_id: item.tutor_id,
        subject: item.subject,
        message: item.message,
        preferred_time: item.preferred_time,
        status: item.status as 'pending' | 'accepted' | 'rejected' | 'completed',
        created_at: item.created_at,
        tutor: item.tutor ? {
          id: item.tutor.id,
          name: item.tutor.name,
          subjects: item.tutor.subjects,
          email: item.tutor.email,
          phone: item.tutor.phone,
          availability: item.tutor.availability,
          rating: typeof item.tutor.rating === 'string' ? parseFloat(item.tutor.rating) : (item.tutor.rating || 0),
          bio: item.tutor.bio,
          image: item.tutor.image
        } : undefined
      }));

      setTutorRequests(typedRequests);
    } catch (error) {
      console.error('Error fetching tutor requests:', error);
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

      const typedTutor: Tutor = {
        id: data.id,
        name: data.name,
        subjects: data.subjects,
        email: data.email,
        phone: data.phone,
        availability: data.availability,
        rating: typeof data.rating === 'string' ? parseFloat(data.rating) : (data.rating || 0),
        bio: data.bio,
        image: data.image
      };

      setTutors(prev => [...prev, typedTutor]);
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
          preferred_time: preferredTime,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Tutor request sent successfully",
      });

      await fetchTutorRequests();
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
      await Promise.all([fetchTutors(), fetchTutorRequests()]);
      setLoading(false);
    };

    loadData();
  }, [user]);

  return {
    tutors,
    tutorRequests,
    loading,
    addTutor,
    requestTutor,
    refetch: () => Promise.all([fetchTutors(), fetchTutorRequests()])
  };
}
