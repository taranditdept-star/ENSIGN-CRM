'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { isValidZimbabwePhone } from '@/lib/utils'

export type ActionState = {
  error?: string;
  success?: boolean;
  message?: string;
}

export async function captureCustomer(prevState: ActionState, formData: FormData): Promise<ActionState> {
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

  // Basic Sales Data Validation
  const quantity = formData.get('quantityKg') as string || formData.get('refillQuantityKg') as string
  const price = formData.get('totalPriceUSD') as string
  
  if (quantity && isNaN(Number(quantity))) {
    return { error: 'Quantity must be a valid number.' }
  }
  
  if (price && isNaN(Number(price))) {
    return { error: 'Price must be a valid number.' }
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

  // Enforce strict valid UUID for subsidiaryId
  const validSubId = subsidiaryId

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
