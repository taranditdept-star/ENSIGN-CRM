'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { forgotPassword } from "./actions"
import { useActionState } from "react"

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(forgotPassword, { error: "", success: "" })

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
            <p className="text-slate-500 mt-2 font-medium">No worries! Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <form action={formAction} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-6">
          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-sm font-bold">
              {state.success}
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="email" className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="manager@floragas.co.zw" 
              required 
              className="h-12 px-5 rounded-xl border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 transition-all font-medium"
            />
          </div>

          <Button type="submit" disabled={pending} className="w-full h-12 text-base rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all">
            {pending ? 'Sending Link...' : 'Send Reset Link'}
          </Button>

          <Link href="/" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors pt-2">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </form>

      </div>
    </div>
  )
}
