const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function runMigration() {
  console.log('Running migration...')
  
  const { error: error1 } = await supabase.rpc('exec_sql', {
    sql_string: `ALTER TABLE organizations ADD COLUMN IF NOT EXISTS module_type TEXT DEFAULT 'standard';`
  }).catch(() => ({ error: { message: 'RPC exec_sql not found, trying direct query' } }));

  // If RPC fails, we might not have it. Let's try some updates that should work if column exists.
  const { error: error2 } = await supabase
    .from('organizations')
    .update({ module_type: 'lpg' })
    .ilike('name', '%Flora Gas%')

  const { error: error3 } = await supabase
    .from('organizations')
    .update({ module_type: 'sbali' })
    .or('name.ilike.%Sbali%,name.ilike.%Ecomatt%')

  if (error1 || error2 || error3) {
    console.error('Migration errors:', { error1, error2, error3 })
  } else {
    console.log('Migration completed successfully (or partially if column was already there).')
  }
}

runMigration()
