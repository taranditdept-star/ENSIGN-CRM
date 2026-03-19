'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/app/login/actions'

const initialState = {
  error: null,
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="space-y-6 mt-8">
      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
          {state.error}
        </div>
      )}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-slate-700 font-semibold ml-2">Email Address</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder="manager@floragas.co.zw" 
          required 
          className="h-14 px-6 text-base rounded-full border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 bg-slate-50/50 shadow-sm transition-all"
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="password" className="text-slate-700 font-semibold ml-2">Password</Label>
        <Input 
          id="password"
          name="password"
          type="password"
          placeholder="••••••••" 
          required 
          className="h-14 px-6 text-base rounded-full border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 bg-slate-50/50 shadow-sm transition-all"
        />
        <div className="flex justify-end pt-1">
          <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Forgot Password?
          </a>
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full h-14 mt-4 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wide shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5">
        {pending ? 'Verifying...' : 'Login'}
      </Button>
    </form>
  )
}
