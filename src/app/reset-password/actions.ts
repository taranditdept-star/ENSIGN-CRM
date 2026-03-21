'use server'

import { createClient } from "@/utils/supabase/server"

export async function resetPassword(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: "Passwords do not match.", success: "" }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message, success: "" }
  }

  return { 
    error: "", 
    success: "Your password has been reset successfully!" 
  }
}
