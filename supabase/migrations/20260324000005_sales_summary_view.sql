-- Create a dynamic view for sales aggregation across all subsidiaries
-- Handles different metadata fields (totalPriceUSD, quantityKg, refillQuantityKg, etc.)

CREATE OR REPLACE VIEW sales_summary AS
SELECT
  -- Generate a unique ID for the row (branch_id + date)
  md5(c.subsidiary_id::text || DATE(c.created_at)::text)::uuid as id,
  c.organization_id,
  c.subsidiary_id as branch_id,
  s.name as branch_name,
  s.schema_type as subsidiary_type,
  DATE(c.created_at) as sale_date,
  COUNT(c.id) as total_transactions,
  SUM(COALESCE((c.customer_metadata->>'totalPriceUSD')::numeric, 
          (c.customer_metadata->>'orderValue')::numeric, 
          0)) as total_revenue,
  SUM(COALESCE((c.customer_metadata->>'quantityKg')::numeric, 
           (c.customer_metadata->>'refillQuantityKg')::numeric,
           (c.customer_metadata->>'quantity')::numeric,
           (c.customer_metadata->>'volumeLitres')::numeric,
           (c.customer_metadata->>'volumeGrams')::numeric,
           0)) as total_quantity,
  -- Average transaction value
  CASE 
    WHEN COUNT(c.id) > 0 THEN 
      ROUND(SUM(COALESCE((c.customer_metadata->>'totalPriceUSD')::numeric, 
                   (c.customer_metadata->>'orderValue')::numeric, 
                   0)) / COUNT(c.id), 2)
    ELSE 0
  END as avg_transaction_value,
  MAX(c.created_at) as last_activity
FROM customers c
JOIN subsidiaries s ON c.subsidiary_id = s.id
GROUP BY c.organization_id, c.subsidiary_id, s.name, s.schema_type, DATE(c.created_at)
ORDER BY sale_date DESC;

-- Add a helper for branch health calculation (last 24h/48h/72h)
-- This allows searching "Active" branches directly via query
CREATE OR REPLACE VIEW branch_health AS
SELECT
    s.id as branch_id,
    s.name as branch_name,
    s.organization_id,
    MAX(c.created_at) as last_activity,
    CASE
        WHEN MAX(c.created_at) >= (NOW() - INTERVAL '24 hours') THEN 'active'
        WHEN MAX(c.created_at) >= (NOW() - INTERVAL '48 hours') THEN 'warning'
        ELSE 'inactive'
    END as status
FROM subsidiaries s
LEFT JOIN customers c ON s.id = c.subsidiary_id
GROUP BY s.id, s.name, s.organization_id;
