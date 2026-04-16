"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Clock, 
  Users, 
  Utensils, 
  X, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

// Mock data
const MOCK_RECIPES = [
  { 
    id: 1, 
    title: "Garlic Butter Pasta", 
    time: "15 min", 
    servings: 2, 
    ingredients: ["200g Pasta", "4 cloves Garlic", "50g Butter", "Parsley"], 
    steps: ["Boil salted water and cook pasta.", "Mince garlic and sauté in butter until golden.", "Toss pasta with garlic butter and fresh parsley."] 
  },
  { 
    id: 2, 
    title: "Roasted Tomato Soup", 
    time: "30 min", 
    servings: 4, 
    ingredients: ["6 Tomatoes", "1 Onion", "2 cloves Garlic", "Fresh Basil"], 
    steps: ["Roast vegetables at 400°F for 20 minutes.", "Blend until smooth with fresh basil.", "Simmer for 5 minutes and season to taste."] 
  },
  { 
    id: 3, 
    title: "Honey Glazed Salmon", 
    time: "20 min", 
    servings: 2, 
    ingredients: ["2 Salmon Fillets", "2 tbsp Honey", "1 tbsp Soy Sauce", "Lemon"], 
    steps: ["Season salmon and sear in a hot pan for 4 mins per side.", "Whisk honey and soy sauce, then pour over salmon.", "Glaze until sticky and serve with lemon."] 
  },
];

export default function SingleCookbookPage({ params }: { params: { id: string } }) {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      
      {/* nav */}
      <Link 
        href="/cookbooks" 
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#4A9B94] transition-colors mb-8"
      >
        <ChevronLeft size={14} /> Back to Library
      </Link>

      {/* header */}
      <div className="mb-16">
        <h1 className="text-5xl font-serif italic text-slate-800 tracking-tight">
          Weekday Staples
        </h1>
        <div className="flex items-center gap-4 mt-4">
            <span className="bg-[#4A9B94]/10 text-[#4A9B94] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {MOCK_RECIPES.length} Recipes
            </span>
            <span className="text-slate-300 text-xs">|</span>
            <Link 
              href="/" 
              className="group flex items-center gap-1 text-slate-400 hover:text-[#4A9B94] text-[10px] font-black uppercase tracking-widest transition-colors underline decoration-slate-200 underline-offset-4 hover:decoration-[#4A9B94]"
            >
                Browse more to add
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
        </div>
      </div>

      {/* recipe grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_RECIPES.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer flex flex-col h-full"
          >
            {/* header */}
            <div className="h-44 bg-slate-50 relative flex items-center justify-center border-b border-slate-50 overflow-hidden">
               <div className="absolute inset-0 bg-[#4A9B94]/5 group-hover:bg-transparent transition-colors" />
               <Utensils className="text-slate-200 group-hover:scale-110 transition-transform relative z-10" size={32} />
            </div>

            {/* info */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-serif italic text-slate-800 mb-6 group-hover:text-[#4A9B94] transition-colors leading-tight">
                {recipe.title}
              </h3>
              
              <div className="flex items-center gap-6 border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#4A9B94]" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{recipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#4A9B94]" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{recipe.servings} Servings</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* modal overlay */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* modal header */}
              <div className="p-10 border-b border-slate-50 flex justify-between items-start bg-white">
                <div>
                  <h2 className="text-4xl font-serif italic text-slate-800">{selectedRecipe.title}</h2>
                  <div className="flex gap-4 mt-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4A9B94]">{selectedRecipe.time} Prep</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">•</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedRecipe.servings} Servings</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedRecipe(null)} 
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-300" />
                </button>
              </div>

              {/* scrollable */}
              <div className="p-10 space-y-12 overflow-y-auto">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A9B94] mb-6">Pantry List</h4>
                  <ul className="grid grid-cols-2 gap-4">
                    {selectedRecipe.ingredients.map((ing: string) => (
                      <li key={ing} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A9B94]" /> {ing}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A9B94] mb-6">Preparation</h4>
                  <div className="space-y-8">
                    {selectedRecipe.steps.map((step: string, i: number) => (
                      <div key={i} className="flex gap-6">
                        <span className="font-serif italic text-3xl text-slate-200">0{i+1}</span>
                        <p className="text-slate-600 leading-relaxed text-sm pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="w-full bg-[#4A9B94] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#4A9B94]/20 hover:bg-[#3d827b] transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle2 size={18} />
                  Done Cooking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}