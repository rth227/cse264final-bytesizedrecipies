// log in page

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion';
import {Mail, Lock, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// login page - get email and password from users 
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // next auth for login - sign in using their credentials
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // if theres an error, return 
    if (res?.error) {
      setError('invalid email or passsword');
      return;
    }

    // login worked, go to home page
    router.push('/');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md w-full bg-white rounded-[3.5rem] p-12 shadow-xl shadow-slate-100 border border-slate-100"
      >
        {/* header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-4xl font-serif italic text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 mt-3 text-[10px] font-black uppercase tracking-[0.2em]">Open your personal kitchen archive</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* email input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</label>
            <div className="relative text-slate-800">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input 
                required
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="chef@lehigh.edu"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-[#4A9B94]/10 transition-all"
              />
            </div>
          </div>

          {/* pw input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
            </div>
            <div className="relative text-slate-800">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <input 
                required
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none text-sm font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-[#4A9B94]/10 transition-all"
              />
            </div>
          </div>

          {/* error alert */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-[10px] font-bold uppercase tracking-wider"
            >
              <AlertCircle size={14} />
              {error}
            </motion.div>
          )}

          {/* submit button */}
          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#4A9B94] transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-100 group"
          >
            Open My Kitchen
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* redirect to signup */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-[13px] font-black uppercase tracking-widest">
            Don't have a kitchen yet? {' '}
            <Link href="/signup" className="text-[#4A9B94] hover:underline">Sign Up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}