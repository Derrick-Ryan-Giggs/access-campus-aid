-- Allow users to update their own orders status
CREATE POLICY "Users can update their own orders status" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = user_id);