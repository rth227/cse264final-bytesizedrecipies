"use client";

import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes, onRecipeClick, loading }: any) {
    if (loading) return <div className="p-10 text-center italic text-slate-400">Loading...</div>;
    if (!Array.isArray(recipes)) {
        console.error("Recipes is not an array:", recipes);
        return (
          <div className="p-10 text-center text-slate-500 bg-slate-100 rounded-3xl border border-dashed border-slate-300">
            <p className="font-serif italic">Check your backend connection...</p>
            <p className="text-xs mt-2 text-slate-400">Received: {JSON.stringify(recipes)}</p>
          </div>
        );
    }
    return (
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 w-full">
        <AnimatePresence mode="popLayout">
  {recipes.map((recipe: any, index: number) => (
    <motion.div
      key={recipe.id || index} // Use ID if it exists, otherwise fallback to index
      className="w-full" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* CHANGE THIS LINE: Pass the object and the click handler */}
      <RecipeCard 
        recipe={recipe} 
        onRecipeClick={onRecipeClick} 
      />
    </motion.div>
  ))}
</AnimatePresence>
        </div>
      </section>
    );
  }