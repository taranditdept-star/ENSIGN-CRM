-- Add schema_type to subsidiaries to support dynamic form layouts
ALTER TABLE public.subsidiaries 
ADD COLUMN IF NOT EXISTS schema_type text DEFAULT 'fallback';

-- Update existing subsidiaries to 'lpg' if they contain 'Flora'
UPDATE public.subsidiaries 
SET schema_type = 'lpg' 
WHERE name ILIKE '%Flora%';

-- Add a check constraint for valid schema types (optional but good for consistency)
-- ALTER TABLE public.subsidiaries 
-- ADD CONSTRAINT valid_schema_type 
-- CHECK (schema_type IN ('lpg', 'mining', 'bakery', 'fuel', 'sbali', 'fallback'));
