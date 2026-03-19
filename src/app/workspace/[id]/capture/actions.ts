'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function captureCustomer(subsidiaryId: string, prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  // Map frontend input names to physical PostgreSQL column names gracefully
  const first_name = (formData.get('first_name') as string) || ''
  const surname = (formData.get('last_name') as string) || ''
  const phone = (formData.get('phone_number') as string) || ''

  if (!first_name || !phone) {
    return { error: 'First Name and Phone Number are required.' }
  }

  // Pack remaining subsidiary-specific fields into JSONB metadata
  const metadata: Record<string, unknown> = {}
  
  formData.forEach((value, key) => {
    // Next.js injects $ACTION strings into formData, securely ignore them and core strict fields
    if (!['first_name', 'last_name', 'phone_number'].includes(key) && !key.startsWith('$ACTION')) {
      metadata[key] = value
    }
  })

  // Handle Mock ID logic to satisfy PostgreSQL strict UUID / FK constraints
  let validSubId = subsidiaryId
  if (subsidiaryId === "1" || subsidiaryId === "2") {
    const { data: existingSubs } = await supabase.from('subsidiaries').select('id').limit(1)
    if (existingSubs && existingSubs.length > 0) {
      validSubId = existingSubs[0].id
    } else {
      // Need to dynamically scaffold related hierarchies to respect Postgres ON DELETE RESTRICT foreign keys
      const { data: org } = await supabase.from('organizations').insert([{ name: 'Mock HQ' }]).select().single()
      if (org) {
        const { data: sub } = await supabase.from('subsidiaries').insert([{ organization_id: org.id, name: 'Mock Branch' }]).select().single()
        if (sub) validSubId = sub.id
      }
    }
  }

  const { error } = await supabase
    .from('customers')
    .insert([
      {
        subsidiary_id: validSubId,
        first_name,
        surname,
        phone,
        customer_metadata: metadata
      }
    ])

  if (error) {
    return { error: `Database Error: ${error.message}` }
  }

  revalidatePath(`/workspace/${subsidiaryId}/capture`)
  return { success: true, message: `Successfully structured and committed ${first_name} ${surname}!` }
}
