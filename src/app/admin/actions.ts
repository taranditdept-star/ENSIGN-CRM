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
