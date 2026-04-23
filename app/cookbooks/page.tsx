"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Book, Plus, Hash, Clock, ArrowUpRight, Loader2 } from 'lucide-react';

export default function CookbooksPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [cookbooks, setCookbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state for the button

  // 1. Fetch initial cookbooks
  const fetchCookbooks = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/cookbooks/all')
      .then(res => res.json())
      .then(data => {
        setCookbooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cookbooks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCookbooks();
  }, []);

  // 2. Handle Creating a new Collection
  const handleCreate = async () => {
    if (!newCollectionName.trim()) return;
  
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/cookbooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCollectionName,
          description: "A custom collection of your favorite recipes.",
          // FIX: Add these fields to satisfy your backend's if-statements
          user_id: 1, 
          user_role: 'admin' // Set to 'admin' or 'premium' so the backend allows it
        }),
      });
  
      if (response.ok) {
        fetchCookbooks(); 
        setNewCollectionName("");
        setIsCreateModalOpen(false);
      } else {
        // Logic to see what the specific text error was
        const errorText = await response.text();
        console.error("Backend says:", errorText);
      }
    } catch (err) {
      console.error("Error creating cookbook:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
        <div className="space-y-2">
          <h1 className="text-5xl font-serif italic text-slate-800 tracking-tight">My Cookbooks</h1>
          <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px]">Your Curated Collections</p>
        </div>
      </div>

      {/* grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <motion.div 
          onClick={() => setIsCreateModalOpen(true)}
          whileHover={{ y: -10 }}
          className="group cursor-pointer border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center p-12 min-h-[360px] transition-all hover:border-[#4A9B94]/40 hover:bg-[#4A9B94]/5 shadow-sm"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-white transition-all shadow-sm">
            <Plus className="h-8 w-8 text-slate-300 group-hover:text-[#4A9B94]" />
          </div>
          <span className="text-[11px] font-black text-slate-400 group-hover:text-[#4A9B94] tracking-[0.2em] uppercase">
            Add New Collection
          </span>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center col-span-full py-20">
            <Loader2 className="animate-spin text-[#4A9B94]" size={40} />
          </div>
        ) : (
          cookbooks.map((book) => (
            <Link href={`/cookbooks/${book.id}`} key={book.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 hover:shadow-2xl transition-all flex flex-col justify-between h-full min-h-[360px]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-[#4A9B94]/10 rounded-3xl flex items-center justify-center">
                    <Book className="text-[#4A9B94] h-7 w-7" />
                  </div>
                  <div className="bg-slate-50 px-4 py-2 rounded-full flex items-center gap-2 border border-slate-100">
                    <Hash className="h-3 w-3 text-[#4A9B94]" />
                    <span className="text-xs font-bold text-slate-600">{book.recipe_count || 0}</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-3">
                  <h3 className="text-3xl font-serif italic text-slate-800 leading-tight">
                    {book.name}
                  </h3>
                  
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    <span>Updated Recently</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#4A9B94] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      {/* modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h3 className="text-2xl font-serif italic text-slate-800 mb-2">New Collection</h3>
              <p className="text-xs text-slate-400 mb-8 font-medium italic">Create a theme like "Holiday Bakes" or "30-Minute Meals".</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Collection Name</label>
                  <input 
                    autoFocus
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()} // Allow Enter to submit
                    type="text" 
                    placeholder="e.g. Pasta Night"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4A9B94]/20 outline-none font-bold text-slate-700"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreate}
                    disabled={isSubmitting || !newCollectionName.trim()}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Create"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}