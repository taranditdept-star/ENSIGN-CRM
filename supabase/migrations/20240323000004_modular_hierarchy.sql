-- Add module_type to organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS module_type TEXT DEFAULT 'standard';

-- Seed existing organizations with their modules
UPDATE organizations SET module_type = 'lpg' WHERE name ILIKE '%Flora Gas%';
UPDATE organizations SET module_type = 'sbali' WHERE name ILIKE '%Sbali%';
UPDATE organizations SET module_type = 'sbali' WHERE name ILIKE '%Ecomatt%';

-- Ensure subsidiaries can inherit from organizations
-- We will handle the inheritance logic in the server action for better control and error handling,
-- but adding a comment here for database clarity.
COMMENT ON COLUMN organizations.module_type IS 'The default schema/module type for all branches under this organization (e.g., lpg, sbali)';
