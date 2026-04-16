"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Utensils, X, CheckCircle2, Clock, Users, User } from 'lucide-react';
import RecipeCard from '@/components/recipes/RecipeCard'; 

// mock data
const MOCK_FAVORITES = [
  { id: 1, title: "Garlic Butter Pasta", time: "15 min", servings: 2, ingredients: ["Pasta", "Garlic", "Butter"], steps: ["Boil pasta", "Sauté garlic", "Mix"] },
  { id: 2, title: "Roasted Tomato Soup", time: "30 min", servings: 4, ingredients: ["Tomatoes", "Onion", "Basil"], steps: ["Roast", "Blend", "Simmer"] },
];

export default function ProfilePage() {
  // add state to track which recipe is currently being "cooked"
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      
      {/* header */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-20 pb-12 border-b border-slate-50">
        <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300">
          <User size={48} />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-5xl font-serif italic text-slate-800 tracking-tight">Your Kitchen</h1>
          <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Member since 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* favorites */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-[#4A9B94]/10 rounded-xl flex items-center justify-center text-[#4A9B94]">
              <Heart size={18} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-serif italic text-slate-800">Favorites</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_FAVORITES.map((recipe) => (
              <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                <RecipeCard 
                  title={recipe.title} 
                  time={recipe.time} 
                  image="/api/placeholder/400/320" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* recipes */}
        <section className="lg:border-l lg:pl-16 border-slate-50">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
              <Utensils size={18} />
            </div>
            <h2 className="text-2xl font-serif italic text-slate-800">My Recipes</h2>
          </div>

          <div className="space-y-4">
            {/* personal recipes should open the modal */}
            {MOCK_FAVORITES.map((recipe) => (
              <div 
                key={recipe.id} 
                onClick={() => setSelectedRecipe(recipe)}
                className="group bg-slate-50 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-200">
                    <Utensils size={20} />
                  </div>
                  <h4 className="font-serif italic text-lg text-slate-700">{recipe.title}</h4>
                </div>
                <span className="text-[10px] font-black uppercase text-[#4A9B94] tracking-widest group-hover:underline">View</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* modal header */}
              <div className="p-10 border-b border-slate-50 flex justify-between items-start bg-white">
                <div>
                  <h2 className="text-4xl font-serif italic text-slate-800">{selectedRecipe.title}</h2>
                  <div className="flex gap-4 mt-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A9B94]">{selectedRecipe.time} Prep</span>
                  </div>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-slate-50 rounded-full">
                  <X size={24} className="text-slate-300" />
                </button>
              </div>

              {/* modal content */}
              <div className="p-10 space-y-12 overflow-y-auto">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A9B94] mb-6">Ingredients</h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {selectedRecipe.ingredients.map((ing: string) => (
                      <li key={ing} className="flex items-center gap-3 text-slate-600 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A9B94]" /> {ing}
                      </li>
                    ))}
                  </ul>
                </section>
                
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full bg-[#4A9B94] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}