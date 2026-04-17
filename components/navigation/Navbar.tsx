"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Standard shadcn helper

export default function Navbar() {
  const pathname = usePathname();
  
  // This will eventually come from Riley's NextAuth session
  // Toggle this to 'false' to test the "Sign In" view
  const isLoggedIn = true; 
  const isAdmin = true;

  const navLinks = [
    { name: 'Browse', href: '/', style: 'standard' },
    { name: 'My Cookbooks', href: '/cookbooks', style: 'serif' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* branding */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center shrink-0 group transition-transform hover:scale-105 active:scale-95">
            <svg viewBox="0 0 140 40" className="h-11 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="32" y="30" fill="#4A9B94" className="text-[28px] font-black italic font-serif tracking-tighter">
                BSR
              </text>
              <text x="33" y="38" fill="#4A9B94" className="text-[5.5px] font-bold tracking-[4px] opacity-60 uppercase">
                Byte-Sized
              </text>
            </svg>
          </Link>
        </div>

        {/* center nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-all relative py-1",
                link.style === 'serif' 
                  ? "font-serif italic text-xl lowercase hover:text-primary" 
                  : "text-[11px] font-bold uppercase tracking-[0.2em] hover:text-primary",
                pathname === link.href ? "text-primary" : "text-slate-500"
              )}
            >
              {link.name}
              
            </Link>
          ))}
        </div>

        {/* action buttons */}
        <div className="flex-1 flex justify-end items-center gap-3">
          

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Quick Action: Upload (Great for your User Stories!) */}
              <Link href="/upload">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full">
                  <PlusCircle className="h-6 w-6" />
                </Button>
              </Link>

              {/* Profile Link */}
              <Link href="/profile">
                <Button 
                  variant="ghost" 
                  className="gap-3 rounded-2xl hover:bg-slate-50 transition-all pl-2 pr-4 h-11 border border-transparent hover:border-slate-100"
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm overflow-hidden">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start leading-none">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-700 font-serif italic lowercase">kristen</span>
                      {isAdmin && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" title="Admin Active" />}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Account</span>
                  </div>
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full border-primary/20 hover:bg-primary hover:text-white transition-all px-6 border-2 font-black text-[10px] uppercase tracking-widest gap-2"
            >
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}