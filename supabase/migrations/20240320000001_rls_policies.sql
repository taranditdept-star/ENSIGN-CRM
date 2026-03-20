-- 0. CREATE PROFILES TABLE (If not already present)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  role text CHECK (role IN ('super_admin', 'subsidiary_admin', 'clerk')) DEFAULT 'subsidiary_admin',
  subsidiary_id uuid REFERENCES public.subsidiaries(id),
  full_name text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 1. ENABLE RLS ON TABLES
ALTER TABLE public.subsidiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'subsidiary_admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create the trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$;

-- 3. CREATE POLICIES FOR SUBSIDIARIES
-- Super Admins can see all subsidiaries
CREATE POLICY "Super Admins can view all subsidiaries" 
ON public.subsidiaries FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'
  )
);

-- Subsidiary Admins can only see their own subsidiary
CREATE POLICY "Subsidiary users can view their own subsidiary" 
ON public.subsidiaries FOR SELECT 
USING (
  id = (
    SELECT subsidiary_id FROM public.profiles 
    WHERE profiles.id = auth.uid()
  )
);

-- 4. CREATE POLICIES FOR CUSTOMERS
-- Super Admins can see all customers
CREATE POLICY "Super Admins can manage all customers" 
ON public.customers FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'
  )
);

-- Subsidiary Users can only manage customers in their branch
CREATE POLICY "Subsidiary users can manage their own customers" 
ON public.customers FOR ALL 
USING (
  subsidiary_id = (
    SELECT subsidiary_id FROM public.profiles 
    WHERE profiles.id = auth.uid()
  )
)
WITH CHECK (
  subsidiary_id = (
    SELECT subsidiary_id FROM public.profiles 
    WHERE profiles.id = auth.uid()
  )
);

-- 5. CREATE POLICIES FOR PROFILES
-- Users can only read their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Super Admins can manage all profiles
CREATE POLICY "Super Admins can manage all profiles" 
ON public.profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'super_admin'
  )
);
