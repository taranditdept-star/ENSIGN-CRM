'use server'

import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"

export async function forgotPassword(prevState: any, formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  })

  if (error) {
    return { error: error.message, success: "" }
  }

  return { 
    error: "", 
    success: "Check your email for the password reset link." 
  }
}
