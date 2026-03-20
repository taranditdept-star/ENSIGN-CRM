'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { isValidZimbabwePhone } from '@/lib/utils'

export type ActionState = {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function captureCustomer(prevState: ActionState, formData: FormData) {
  const supabase = await createClient()
  const subsidiaryId = formData.get('subsidiaryId') as string

  // Map frontend input names to physical PostgreSQL column names gracefully
  const first_name = (formData.get('firstName') as string) || ''
  const surname = (formData.get('surname') as string) || ''
  const phone = (formData.get('phone') as string) || ''
  const gender = (formData.get('gender') as string) || null
  const physical_address = (formData.get('physicalAddress') as string) || null

  if (!first_name || !phone) {
    return { error: 'First Name and Phone Number are required.' }
  }

  if (!isValidZimbabwePhone(phone)) {
    return { error: 'Invalid Zimbabwe phone number format. Use 07... or +263...' }
  }

  // Pack remaining subsidiary-specific fields into JSONB metadata
  const metadata: Record<string, unknown> = {}
  
  formData.forEach((value, key) => {
    const coreFields = ['firstName', 'surname', 'phone', 'gender', 'physicalAddress', 'subsidiaryId']
    // Next.js injects $ACTION strings into formData, securely ignore them and core strict fields
    if (!coreFields.includes(key) && !key.startsWith('$ACTION')) {
      metadata[key] = value === 'true' ? true : value === 'false' ? false : value
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
        gender,
        physical_address,
        customer_metadata: metadata
      }
    ])

  if (error) {
    return { error: `Database Error: ${error.message}` }
  }

  revalidatePath(`/workspace/${subsidiaryId}/capture`)
  return { success: true, message: `Successfully structured and committed ${first_name} ${surname}!` }
}
