-- Create activities table for tracking all user activities across services
CREATE TABLE public.activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'order', 'tutor_session', 'reminder', 'health_check', 'legal_consultation', etc.
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL, -- 'pending', 'completed', 'cancelled', 'scheduled', 'in_progress', etc.
  metadata JSONB DEFAULT '{}', -- Store additional data like order_id, tutor_id, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create policies for activities
CREATE POLICY "Users can view their own activities" 
ON public.activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" 
ON public.activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" 
ON public.activities 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities" 
ON public.activities 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update orders table to include tracking information
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS estimated_delivery DATE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS actual_delivery_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create health_checks table
CREATE TABLE public.health_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'checkup', 'consultation', 'therapy', 'mental_health'
  provider TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'rescheduled'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for health_checks
ALTER TABLE public.health_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own health checks" 
ON public.health_checks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health checks" 
ON public.health_checks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health checks" 
ON public.health_checks 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health checks" 
ON public.health_checks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create legal_consultations table
CREATE TABLE public.legal_consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL, -- 'accommodation_request', 'rights_consultation', 'discrimination_case'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted', -- 'submitted', 'in_review', 'scheduled', 'completed', 'closed'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
  scheduled_date DATE,
  scheduled_time TIME,
  lawyer_assigned TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for legal_consultations
ALTER TABLE public.legal_consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own legal consultations" 
ON public.legal_consultations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own legal consultations" 
ON public.legal_consultations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own legal consultations" 
ON public.legal_consultations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own legal consultations" 
ON public.legal_consultations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_activities_updated_at
BEFORE UPDATE ON public.activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_health_checks_updated_at
BEFORE UPDATE ON public.health_checks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_legal_consultations_updated_at
BEFORE UPDATE ON public.legal_consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_activities_user_id_created_at ON public.activities(user_id, created_at DESC);
CREATE INDEX idx_activities_type ON public.activities(type);
CREATE INDEX idx_health_checks_user_id ON public.health_checks(user_id);
CREATE INDEX idx_legal_consultations_user_id ON public.legal_consultations(user_id);