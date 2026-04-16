"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  BookOpen, 
  Tag as TagIcon,
  Search
} from 'lucide-react';

// Mock data
const PENDING_RECIPES = [
  { id: 101, title: "Spicy Ramen Hack", author: "User123", date: "2h ago", status: "Pending" },
  { id: 102, title: "Grandma's Cookies", author: "BakerJoy", date: "5h ago", status: "Flagged" },
  { id: 103, title: "Water Soup", author: "Troll42", date: "1d ago", status: "Pending" },
];

export default function AdminDashboard() {
  const [filter, setFilter] = useState('');

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-[#4A9B94] h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A9B94]">Admin Portal</span>
            </div>
            <h1 className="text-5xl font-serif italic text-slate-800">Management Dashboard</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="bg-transparent outline-none text-sm text-slate-600 w-48"
              />
            </div>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Users", value: "1,284", icon: Users },
            { label: "Total Recipes", value: "4,592", icon: BookOpen },
            { label: "Pending Review", value: "12", icon: AlertCircle },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-serif italic text-slate-800">{stat.value}</p>
              </div>
              <div className="h-12 w-12 bg-[#4A9B94]/10 rounded-2xl flex items-center justify-center text-[#4A9B94]">
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* table */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              Moderation Queue <span className="text-[10px] bg-[#4A9B94] text-white px-2 py-0.5 rounded-full">New</span>
            </h3>
          </div>
          
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                <th className="px-8 py-6">Recipe Name</th>
                <th className="px-8 py-6">Submitted By</th>
                <th className="px-8 py-6">Time</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PENDING_RECIPES.map((recipe) => (
                <tr key={recipe.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-serif italic text-slate-700 text-lg">{recipe.title}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{recipe.author}</td>
                  <td className="px-8 py-6 text-xs text-slate-400 font-medium">{recipe.date}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="h-10 w-10 rounded-xl bg-[#4A9B94]/10 text-[#4A9B94] hover:bg-[#4A9B94] hover:text-white transition-all flex items-center justify-center shadow-sm">
                        <CheckCircle size={18} />
                      </button>
                      <button className="h-10 w-10 rounded-xl bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* tag mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <TagIcon className="text-[#4A9B94]" size={20} />
                    <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Ingredient Tag Manager</h3>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Merge duplicates to keep search results accurate.</p>
                    <div className="flex gap-2">
                        <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 text-xs text-slate-500 border border-slate-100">Cilantro</div>
                        <div className="flex items-center text-[#4A9B94]">→</div>
                        <div className="flex-1 bg-[#4A9B94]/5 rounded-xl px-4 py-3 text-xs text-[#4A9B94] border border-[#4A9B94]/20 font-bold">Fresh Cilantro</div>
                    </div>
                    <button className="w-full py-3 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all mt-2">
                        Merge Selected Tags
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}