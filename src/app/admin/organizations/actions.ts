'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createOrganization(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const module_type = formData.get('module_type') as string

  if (!name) return { error: 'Name is required' }

  const { error } = await supabase
    .from('organizations')
    .insert({ name, module_type })

  if (error) return { error: error.message }

  revalidatePath('/admin/organizations')
  return { success: true }
}
