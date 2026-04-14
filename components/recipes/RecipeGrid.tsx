"use client";

import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from './RecipeCard';

export default function RecipeGrid({ recipes, onRecipeClick, loading }: any) {
    if (loading) return <div className="p-10 text-center italic text-slate-400">Loading...</div>;
  
    return (
      <section className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 w-full">
          <AnimatePresence mode="popLayout">
            {recipes.map((recipe: any, index: number) => (
              <motion.div
                key={recipe.id}
                onClick={() => onRecipeClick(recipe)}
                className="w-full cursor-pointer" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: index * 0.1 }}
              >
                <RecipeCard {...recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    );
  }