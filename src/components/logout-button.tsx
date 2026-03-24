'use client'

import { logout } from '@/app/login/actions'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      onClick={() => logout()}
      className="w-full flex items-center justify-start gap-3 px-3 py-2 h-auto text-[12px] font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all group"
    >
      <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors" />
      <span>Logout Account</span>
    </Button>
  )
}
