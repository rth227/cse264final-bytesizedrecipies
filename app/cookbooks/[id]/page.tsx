"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Clock, 
  Users, 
  Utensils, 
  X, 
  CheckCircle2, 
  ArrowUpRight,
  Loader2 
} from 'lucide-react';

export default function SingleCookbookPage() {
  const params = useParams();
  const cookbookId = params.id;

  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [cookbookName, setCookbookName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookbookId) {
      setLoading(true);
      fetch(`http://localhost:8080/api/cookbooks/${cookbookId}/recipes`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setRecipes(data);
          } else if (data.recipes && Array.isArray(data.recipes)) {
            setRecipes(data.recipes);
          } else {
            setRecipes([]);
          }
          setCookbookName(data.name || "My Cookbook");
          setLoading(false);
        })
        .catch(err => {
          console.error("Error loading cookbook:", err);
          setLoading(false);
        });
    }
  }, [cookbookId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#4A9B94] h-12 w-12" />
      </div>
    );
  }

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
          {cookbookName}
        </h1>
        <div className="flex items-center gap-4 mt-4">
            <span className="bg-[#4A9B94]/10 text-[#4A9B94] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {recipes.length} Recipes
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
        {recipes.map((recipe, index) => (
          <motion.div
            key={`${recipe.id}-${index}`} // Unique key to prevent console errors
            onClick={() => setSelectedRecipe(recipe)}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer flex flex-col h-full"
          >
            <div className="h-44 bg-slate-50 relative flex items-center justify-center border-b border-slate-50 overflow-hidden">
               {(recipe.image_url || recipe.image) ? (
                 <img 
                   src={recipe.image_url || recipe.image} 
                   alt={recipe.title} 
                   className="w-full h-full object-cover" 
                 />
               ) : (
                 <Utensils className="text-slate-200" size={32} />
               )}
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-serif italic text-slate-800 mb-6 group-hover:text-[#4A9B94] transition-colors leading-tight">
                {recipe.title}
              </h3>
              
              <div className="flex items-center gap-6 border-t border-slate-50 pt-6">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#4A9B94]" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {recipe.prep_time || '20'} MIN
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[#4A9B94]" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {recipe.servings || '1'} Serving
                  </span>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="relative h-64 bg-slate-100 shrink-0">
                <img 
                  src={selectedRecipe.image_url || selectedRecipe.image} 
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-6 right-6 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <X size={20} className="text-slate-800" />
                </button>
              </div>

              <div className="p-10 border-b border-slate-50 bg-white">
                <h2 className="text-4xl font-serif italic text-slate-800">{selectedRecipe.title}</h2>
                <div className="flex gap-4 mt-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4A9B94]">{selectedRecipe.prep_time || '20'} Prep</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">•</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{selectedRecipe.servings || '1'} Servings</span>
                </div>
              </div>

              <div className="p-10 space-y-12 overflow-y-auto">
              <section>
  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A9B94] mb-6">Pantry List</h4>
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
    {(() => {
      // 1. Get the data from the recipe
      const rawData = selectedRecipe.ingredients;
      
      // 2. Normalize it into a clean array of strings
      let ingredientsArray: string[] = [];
      
      if (typeof rawData === 'string') {
        // Clean up Postgres array format {"item 1", "item 2"}
        ingredientsArray = rawData.replace(/{|}|"/g, '').split(',').map(s => s.trim());
      } else if (Array.isArray(rawData)) {
        ingredientsArray = rawData.map((ing: any) => 
          typeof ing === 'string' ? ing : (ing.original || ing.name || "Unknown Ingredient")
        );
      }

      // 3. Render the list
      if (ingredientsArray.length === 0 || (ingredientsArray.length === 1 && ingredientsArray[0] === "")) {
        return <p className="text-slate-400 italic text-sm">No ingredients found in database.</p>;
      }

      return ingredientsArray.map((ingText, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4A9B94] mt-1.5 shrink-0" />
          <span className="capitalize">{ingText}</span>
        </li>
      ));
    })()}
  </ul>
</section>

                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A9B94] mb-6">Preparation</h4>
                  {/* Rendering HTML instructions using dangerouslySetInnerHTML */}
                  <div 
                    className="text-slate-600 leading-relaxed text-sm prose prose-slate max-w-none list-decimal"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedRecipe.instructions || "Check cooking mode for steps." 
                    }} 
                  />
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