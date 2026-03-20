import { Inter } from "next/font/google"
import "@/app/globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      {children}
      <Toaster position="top-center" richColors />
    </div>
  )
}
