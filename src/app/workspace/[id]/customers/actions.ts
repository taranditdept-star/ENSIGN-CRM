'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { isValidZimbabwePhone } from '@/lib/utils'

export type ActionState = {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function updateCustomer(
  customerId: string,
  subsidiaryId: string,
  prevState: ActionState, 
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient()

  // Map core fields
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
    if (!coreFields.includes(key) && !key.startsWith('$ACTION')) {
      metadata[key] = value === 'true' ? true : value === 'false' ? false : value
    }
  })

  const { error } = await supabase
    .from('customers')
    .update({
      first_name,
      surname,
      phone,
      gender,
      physical_address,
      customer_metadata: metadata,
      updated_at: new Date().toISOString()
    })
    .eq('id', customerId)
    .eq('subsidiary_id', subsidiaryId) // Security check: ensure it belongs to the same branch

  if (error) {
    return { error: `Database Error: ${error.message}` }
  }

  revalidatePath(`/workspace/${subsidiaryId}/customers`)
  revalidatePath(`/workspace/${subsidiaryId}`)
  return { success: true, message: `Successfully updated ${first_name}'s record!` }
}
