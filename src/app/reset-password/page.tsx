'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, CheckCircle2 } from "lucide-react"
import { resetPassword } from "./actions"
import { useActionState } from "react"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(resetPassword, { error: "", success: "" })

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reset Password</h1>
            <p className="text-slate-500 mt-2 font-medium">Please enter your new password below.</p>
        </div>

        <form action={formAction} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-6">
          {state?.error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
              {state.error}
            </div>
          )}
          {state?.success && (
            <div className="space-y-6 text-center py-4">
              <div className="flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
                <p className="text-emerald-600 font-bold">{state.success}</p>
              </div>
              <Link href="/" className="block w-full h-12 flex items-center justify-center rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-all">
                Login with New Password
              </Link>
            </div>
          )}

          {!state.success && (
            <>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">New Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="h-12 px-5 rounded-xl border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-bold ml-1 text-sm uppercase tracking-wider">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="h-12 px-5 rounded-xl border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 transition-all font-medium"
                />
              </div>

              <Button type="submit" disabled={pending} className="w-full h-12 text-base rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md transition-all">
                {pending ? 'Updating...' : 'Set New Password'}
              </Button>
            </>
          )}
        </form>

      </div>
    </div>
  )
}
