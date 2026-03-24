'use client'

import { logout } from '@/app/login/actions'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      onClick={() => logout()}
      className="w-full flex items-center justify-start gap-4 px-4 py-3 h-auto text-[13px] font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 rounded-2xl transition-all group"
    >
      <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
        <LogOut className="w-4 h-4" />
      </div>
      Logout Account
    </Button>
  )
}
