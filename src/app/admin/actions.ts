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

  if (!name) {
    return { error: 'Name is required', success: false }
  }

  const { error } = await supabase
    .from('subsidiaries')
    .insert({ name, location })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/admin', 'layout')
  return { success: true, error: "" }
}
