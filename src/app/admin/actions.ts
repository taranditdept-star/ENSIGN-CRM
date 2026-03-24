'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type SubsidiaryActionState = {
  error: string;
  success: boolean;
}

export async function createSubsidiary(state: SubsidiaryActionState, formData: FormData): Promise<SubsidiaryActionState> {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const location = formData.get('location') as string
  let schema_type = formData.get('schema_type') as string
  const organization_id = formData.get('organization_id') as string

  if (!name) {
    return { error: 'Name is required', success: false }
  }

  // If schema_type is not provided, inherit from organization
  if (!schema_type && organization_id) {
    const { data: org } = await supabase
      .from('organizations')
      .select('module_type')
      .eq('id', organization_id)
      .single()
    
    if (org?.module_type) {
      schema_type = org.module_type
    }
  }

  const { error } = await supabase
    .from('subsidiaries')
    .insert({ 
      name, 
      location, 
      schema_type: schema_type || 'fallback',
      organization_id: organization_id || null
    })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin', 'layout')
  return { success: true, error: "" }
}

export async function addInteractionNote(customerId: string, content: string, followUpDate?: string) {
  const supabase = await createClient()
  
  // 1. Fetch current metadata
  const { data: customer } = await supabase
    .from('customers')
    .select('customer_metadata')
    .eq('id', customerId)
    .single()

  const currentMetadata = customer?.customer_metadata || {}
  const currentNotes = currentMetadata.notes || []

  // 2. Add new note
  const newNote = {
    id: crypto.randomUUID(),
    content,
    timestamp: new Date().toISOString(),
    author: "Admin User", // Placeholder until full auth session is passed
    followUpDate: followUpDate || null
  }

  const updatedMetadata = {
    ...currentMetadata,
    notes: [...currentNotes, newNote]
  }

  // 3. Save
  const { error } = await supabase
    .from('customers')
    .update({ customer_metadata: updatedMetadata })
    .eq('id', customerId)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function deleteCustomer(customerId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', customerId)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/customers')
  revalidatePath('/admin/subsidiaries', 'layout')
  revalidatePath('/workspace', 'layout')
  return { success: true }
}

export async function updateCustomerAdmin(customerId: string, formData: FormData) {
  const supabase = await createClient()

  const first_name = formData.get('firstName') as string
  const surname = formData.get('surname') as string
  const phone = formData.get('phone') as string
  const email = formData.get('email') as string
  const subsidiary_id = formData.get('subsidiaryId') as string

  // Extract metadata
  const metadata: Record<string, any> = {}
  formData.forEach((value, key) => {
    if (!['firstName', 'surname', 'phone', 'email', 'subsidiaryId', 'customerId'].includes(key) && !key.startsWith('$ACTION')) {
      metadata[key] = value
    }
  })

  const { error } = await supabase
    .from('customers')
    .update({
      first_name,
      surname,
      phone,
      email,
      customer_metadata: metadata,
      updated_at: new Date().toISOString()
    })
    .eq('id', customerId)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/customers')
  revalidatePath(`/admin/subsidiaries/${subsidiary_id}`)
  revalidatePath(`/workspace/${subsidiary_id}/customers`)
  revalidatePath('/workspace', 'layout')
  return { success: true }
}
