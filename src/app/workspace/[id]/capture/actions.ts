'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function captureCustomer(subsidiaryId: string, prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  // Extract core structured fields
  const first_name = (formData.get('first_name') as string) || ''
  const last_name = (formData.get('last_name') as string) || ''
  const phone_number = (formData.get('phone_number') as string) || ''
  const email = (formData.get('email') as string) || ''

  if (!first_name || !phone_number) {
    return { error: 'First Name and Phone Number are required.' }
  }

  // Pack remaining subsidiary-specific fields into JSONB metadata
  const metadata: Record<string, unknown> = {}
  
  formData.forEach((value, key) => {
    // Next.js injects $ACTION strings into formData, securely ignore them and standard fields
    if (!['first_name', 'last_name', 'phone_number', 'email'].includes(key) && !key.startsWith('$ACTION')) {
      metadata[key] = value
    }
  })

  // Hack for POC: If the ID is a mock string ("1" or "2"), insert with a NULL foreign key 
  // since Postgres UUID validation will reject "1" for the subsidiary_id column.
  const isMockId = subsidiaryId === "1" || subsidiaryId === "2"

  const { error } = await supabase
    .from('customers')
    .insert([
      {
        subsidiary_id: isMockId ? null : subsidiaryId,
        first_name,
        last_name,
        phone_number,
        email,
        customer_metadata: metadata
      }
    ])

  if (error) {
    return { error: `Database Error: ${error.message}` }
  }

  revalidatePath(`/workspace/${subsidiaryId}/capture`)
  return { success: true, message: `Successfully captured data for ${first_name} ${last_name}` }
}
