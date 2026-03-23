-- 1. Create Organizations table (Parent Companies)
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  logo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Update Subsidiaries to link to Organizations
ALTER TABLE public.subsidiaries 
ADD COLUMN IF NOT EXISTS organization_id uuid REFERENCES public.organizations(id);

-- 3. Ensure customers table is correct
-- Pre-filling with standard columns as per features.md
ALTER TABLE public.customers
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS surname text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS physical_address text,
ADD COLUMN IF NOT EXISTS customer_metadata jsonb DEFAULT '{}'::jsonb;

-- 4. Sample Data for Hierarchy
INSERT INTO public.organizations (name) 
VALUES ('Tarand'), ('Granite Haven'), ('Redeem Resources'), ('Ecomatt')
ON CONFLICT (name) DO NOTHING;

-- Map existing subsidiaries to organizations if possible
UPDATE public.subsidiaries SET organization_id = (SELECT id FROM public.organizations WHERE name = 'Tarand' LIMIT 1) WHERE name ILIKE '%Flora%';
UPDATE public.subsidiaries SET organization_id = (SELECT id FROM public.organizations WHERE name = 'Ecomatt' LIMIT 1) WHERE name ILIKE '%Ecomatt%';
UPDATE public.subsidiaries SET organization_id = (SELECT id FROM public.organizations WHERE name = 'Granite Haven' LIMIT 1) WHERE name ILIKE '%Granite%';
