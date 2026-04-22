"use client";

import { X, Clock, Users, ChefHat, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: any;
}

export default function RecipeModal({ isOpen, onClose, recipe }: RecipeModalProps) {
  if (!recipe) return null;

  // Use Gwenn's mapped fields with fallbacks
  const title = recipe.title || "Untitled Recipe";
  const image = recipe.image_url || recipe.image;
  const time = recipe.prep_time || recipe.readyInMinutes || "25";
  const servings = recipe.servings || "2";
  const ingredients = recipe.extendedIngredients || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 z-[110] p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group"
            >
              <X className="h-6 w-6 text-slate-600 group-hover:text-[#4A9B94]" />
            </button>

            {/* Left Side: Image & Stats */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
              <img 
                src={image || "https://via.placeholder.com/800x1200?text=Recipe+Image"} 
                alt={title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-slate-800 leading-[1.1]">
                    {title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-3">
                    <ChefHat size={18} className="text-slate-400" /> Pantry List
                  </h3>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3">
                  {ingredients.length > 0 ? (
  ingredients.map((ing: any, index: number) => (
    <div key={ing.id || index} className="group flex justify-between items-center py-2 border-b border-slate-50">
      <span className="text-sm text-slate-600 capitalize group-hover:text-slate-900 transition-colors">
        {/* Use .original for the full description */}
        {ing.original || ing.name}
      </span>
    </div>
  ))
) : (
  <p className="text-slate-400 italic text-sm">No ingredient details available.</p>
)}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-8 border-t border-slate-50 bg-white/80 backdrop-blur-sm flex gap-4">
                <Link href={`/recipe/${recipe.id}`} className="flex-1">
                  <Button className="w-full bg-[#4A9B94] hover:bg-[#3d827c] text-white rounded-2xl h-14 text-sm font-bold shadow-md shadow-[#4A9B94]/20 transition-all">
                    Start Cooking
                  </Button>
                </Link>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}