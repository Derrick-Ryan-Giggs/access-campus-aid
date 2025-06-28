
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  student_id TEXT,
  year TEXT,
  program TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reminders table
CREATE TABLE public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('medication', 'appointment', 'academic', 'exam', 'meeting')),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutors table
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  availability TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  bio TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutor requests table
CREATE TABLE public.tutor_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_time TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notes table
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table for Smart Assistant
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  deadline DATE,
  energy_level TEXT DEFAULT 'medium' CHECK (energy_level IN ('low', 'medium', 'high')),
  accommodations TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create virtual events table
CREATE TABLE public.virtual_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('gaming', 'book-club', 'social', 'music', 'study')),
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER, -- in minutes
  max_participants INTEGER,
  accessibility_features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event participants table
CREATE TABLE public.event_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.virtual_events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create grocery items table
CREATE TABLE public.grocery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user cart table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  grocery_item_id UUID REFERENCES public.grocery_items(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, grocery_item_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  delivery_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  grocery_item_id UUID REFERENCES public.grocery_items(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for reminders
CREATE POLICY "Users can view their own reminders" ON public.reminders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" ON public.reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" ON public.reminders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" ON public.reminders
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tutors (public read, authenticated insert/update)
CREATE POLICY "Anyone can view tutors" ON public.tutors
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Authenticated users can create tutor profiles" ON public.tutors
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update tutor profiles" ON public.tutors
  FOR UPDATE TO authenticated USING (true);

-- Create RLS policies for tutor requests
CREATE POLICY "Users can view their own tutor requests" ON public.tutor_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create tutor requests" ON public.tutor_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tutor requests" ON public.tutor_requests
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for notes
CREATE POLICY "Users can view their own notes" ON public.notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" ON public.notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON public.notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON public.notes
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for tasks
CREATE POLICY "Users can view their own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" ON public.tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for virtual events
CREATE POLICY "Anyone can view virtual events" ON public.virtual_events
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Authenticated users can create events" ON public.virtual_events
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Event creators can update their events" ON public.virtual_events
  FOR UPDATE USING (auth.uid() = creator_id);

-- Create RLS policies for event participants
CREATE POLICY "Users can view event participants" ON public.event_participants
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can join events" ON public.event_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave events" ON public.event_participants
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for grocery items (public read)
CREATE POLICY "Anyone can view grocery items" ON public.grocery_items
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Authenticated users can create grocery items" ON public.grocery_items
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create RLS policies for cart items
CREATE POLICY "Users can view their own cart" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own cart" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own cart" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for orders
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for order items
CREATE POLICY "Users can view their own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample grocery items
INSERT INTO public.grocery_items (name, category, price, description, image) VALUES
('Bananas', 'Fruits', 2.99, 'Fresh organic bananas', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'),
('Whole Wheat Bread', 'Bakery', 3.49, 'Freshly baked whole wheat bread', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'),
('Greek Yogurt', 'Dairy', 5.99, 'Creamy Greek yogurt', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'),
('Spinach', 'Vegetables', 4.29, 'Fresh baby spinach leaves', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'),
('Chicken Breast', 'Meat', 8.99, 'Boneless skinless chicken breast', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400'),
('Brown Rice', 'Grains', 3.99, 'Long grain brown rice', 'https://images.unsplash.com/photo-1586201375761-83865001e8c3?w=400');

-- Insert some sample tutors
INSERT INTO public.tutors (name, subjects, email, phone, availability, rating, bio, image) VALUES
('Dr. Sarah Johnson', ARRAY['Mathematics', 'Statistics'], 'sarah.johnson@university.edu', '(555) 123-4567', 'Mon-Wed 2-6 PM', 4.8, 'PhD in Mathematics with 5 years of tutoring experience.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'),
('Michael Chen', ARRAY['Computer Science', 'Programming'], 'm.chen@university.edu', '(555) 234-5678', 'Tue-Thu 3-7 PM', 4.9, 'Software engineer and CS graduate student specializing in web development.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'),
('Dr. Emily Rodriguez', ARRAY['Biology', 'Chemistry'], 'emily.rodriguez@university.edu', '(555) 345-6789', 'Mon-Fri 1-5 PM', 4.7, 'Biology professor with expertise in biochemistry and molecular biology.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face');
