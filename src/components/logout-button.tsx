'use client'

import { logout } from '@/app/login/actions'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <Button 
      variant="ghost" 
      onClick={() => logout()}
      className="text-sm font-bold text-slate-400 hover:text-red-600 transition-colors gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  )
}
