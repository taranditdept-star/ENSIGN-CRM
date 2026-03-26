-- Update branch health calculation with improved thresholds:
-- 🟢 Active: < 24 hours
-- 🟡 Warning: 24-72 hours
-- 🔴 Inactive: > 72 hours

CREATE OR REPLACE VIEW branch_health AS
SELECT
    s.id as branch_id,
    s.name as branch_name,
    s.organization_id,
    MAX(c.created_at) as last_activity,
    CASE
        WHEN MAX(c.created_at) >= (NOW() - INTERVAL '24 hours') THEN 'active'
        WHEN MAX(c.created_at) >= (NOW() - INTERVAL '72 hours') THEN 'warning'
        ELSE 'inactive'
    END as status
FROM subsidiaries s
LEFT JOIN customers c ON s.id = c.subsidiary_id
GROUP BY s.id, s.name, s.organization_id;
