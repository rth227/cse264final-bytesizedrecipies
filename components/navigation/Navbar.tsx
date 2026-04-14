"use client";

import Link from 'next/link';
import { User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* branding and logo section */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center shrink-0 group transition-transform hover:scale-105 active:scale-95">
            <svg 
              viewBox="0 0 140 40" 
              style={{ height: '44px', width: 'auto' }} 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              
              <text x="32" y="30" fill="#4A9B94" style={{ fontSize: '28px', fontWeight: '900', fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
                BSR
              </text>
              <text x="33" y="38" fill="#4A9B94" style={{ fontSize: '5.5px', fontWeight: 'bold', letterSpacing: '4px', opacity: 0.6 }}>
                BYTE-SIZED
              </text>
            </svg>
          </Link>
        </div>

        {/* center nav */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '60px' }} 
          className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]"
        >
          <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
            Browse
          </Link>
          
          <Link 
            href="/cookbooks" 
            className="hover:text-primary transition-colors font-serif italic lowercase text-lg tracking-normal normal-case whitespace-nowrap"
          >
            My Cookbooks
          </Link>
          
          <Link href="/community" className="hover:text-primary transition-colors whitespace-nowrap">
            Community
          </Link>
        </div>

        {/* action buttons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
            <Search className="h-5 w-5 text-slate-400" />
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 rounded-full border-primary/20 hover:bg-primary hover:text-white transition-all px-6 border-2"
          >
            <User className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sign In</span>
          </Button>
        </div>

      </div>
    </nav>
  );
}