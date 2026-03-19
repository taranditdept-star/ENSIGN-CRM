import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Area - Branding Gradient */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-900 text-white p-12 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-lg mx-auto relative z-10">
          <div className="bg-white p-4 rounded-xl inline-block mb-12 shadow-xl shadow-black/10">
            <Image 
              src="/logo.png" 
              alt="Ensign Holdings" 
              width={180} 
              height={55} 
              className="object-contain" 
              priority
            />
          </div>
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">Hey, Hello!</h1>
          <h2 className="text-2xl font-light mb-8 text-blue-100 opacity-90">
            Welcome to the Ensign Holdings Centralized CRM Platform.
          </h2>
          <p className="text-blue-100/70 leading-relaxed text-lg">
            We provide all the advantages that can simplify your data capture and analytics without any further requirements.
          </p>
        </div>
      </div>

      {/* Right Area - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 bg-white px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto space-y-10">
          
          {/* Mobile Logo Fallback */}
          <div className="lg:hidden flex justify-center mb-10 mt-8">
            <Image 
              src="/logo.png" 
              alt="Ensign Holdings" 
              width={200} 
              height={60} 
              className="object-contain" 
            />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Let's get started with your workspace.</p>
          </div>

          <form className="space-y-6 mt-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-slate-700 font-semibold ml-2">Email Address</Label>
              <Input 
                id="email" 
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

            <Button className="w-full h-14 mt-4 text-lg rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wide shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
