"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, X, Clock, User, Plus, ChevronRight, Settings } from 'lucide-react';
import RecipeCard from '@/components/recipes/RecipeCard'; 

// Mock data
const myRecipes = [
  { id: 1, title: "Grandma's Garlic Pasta", time: "25 min", ingredients: ["Garlic", "Pasta", "Olive Oil", "Parsley"] },
  { id: 2, title: "Sunday Roast Chicken", time: "1h 20m", ingredients: ["Whole Chicken", "Rosemary", "Lemon", "Potatoes"] },
  { id: 3, title: "Bethlehem Berry Cobbler", time: "45 min", ingredients: ["Mixed Berries", "Flour", "Butter", "Sugar"] },
];

export default function ProfilePage() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      
      {/* profile header */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20 p-12 bg-white rounded-[3.5rem] border border-slate-50 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9B94]/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="w-40 h-40 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100 relative z-10">
          <User size={64} strokeWidth={1.5} />
        </div>

        <div className="text-center md:text-left flex-1 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <h1 className="text-6xl font-serif italic text-slate-800 tracking-tight">Your Kitchen</h1>
            
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Total Recipes</span>
              <span className="text-3xl font-serif italic text-[#4A9B94]">{myRecipes.length}</span>
            </div>
            <div className="w-px h-12 bg-slate-100 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Cooking Since</span>
              <span className="text-3xl font-serif italic text-slate-800">2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* recipe section */}
      <section>
        <div className="flex items-center justify-between mb-12 px-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#4A9B94]/10 rounded-2xl flex items-center justify-center text-[#4A9B94]">
              <Utensils size={20} />
            </div>
            <h2 className="text-3xl font-serif italic text-slate-800 tracking-tight">My Recipes</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {myRecipes.map((recipe) => (
            <motion.div 
              key={recipe.id} 
              whileHover={{ y: -8 }}
              onClick={() => setSelectedRecipe(recipe)} 
              className="cursor-pointer"
            >
               <RecipeCard 
                  title={recipe.title} 
                  time={recipe.time} 
                />
            </motion.div>
          ))}

        </div>
      </section>

      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
            />
            
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              className="relative bg-white w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-2xl max-h-[85vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="p-12 border-b border-slate-50 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={14} className="text-[#4A9B94]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A9B94]">
                      {selectedRecipe.time} Preparation
                    </span>
                  </div>
                  <h2 className="text-5xl font-serif italic text-slate-800 tracking-tight leading-tight">
                    {selectedRecipe.title}
                  </h2>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="p-4 hover:bg-slate-50 rounded-full transition-colors group">
                  <X size={28} className="text-slate-300 group-hover:text-slate-800 transition-colors" />
                </button>
              </div>

              {/* modal body */}
              <div className="p-12 space-y-12 overflow-y-auto">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-50 pb-4">
                    Ingredients List
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                    {selectedRecipe.ingredients.map((ing: string) => (
                      <li key={ing} className="flex items-center gap-4 text-slate-600 font-medium list-none group">
                        <div className="w-2 h-2 rounded-full bg-[#4A9B94]/20 border border-[#4A9B94]/40 group-hover:bg-[#4A9B94] transition-colors" /> 
                        {ing}
                      </li>
                    ))}
                  </ul>
                </section>
                
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full bg-slate-900 text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-[#4A9B94] transition-all flex items-center justify-center gap-3"
                >
                  Close Archive <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}