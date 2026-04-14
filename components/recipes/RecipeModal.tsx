"use client";

import { X, Clock, Users, Leaf, ChefHat, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: any;
}

export default function RecipeModal({ isOpen, onClose, recipe }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          
          {/* backdrop fully covers the background noise with a heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-xl" // Increased blur to kill noise
          />

          {/* modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            /* Added h-full and max-h to ensure it doesn't overflow the screen */
            className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden flex flex-col md:flex-row"
          >
            {/* close button "X" to return */}
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 z-[110] p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group"
            >
              <X className="h-6 w-6 text-slate-600 group-hover:text-[#4A9B94]" />
            </button>

            <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 text-white hidden md:block">
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Clock size={14} className="text-[#4A9B94]" /> {recipe.readyInMinutes} MINS
                  </span>
                  <span className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Users size={14} className="text-[#4A9B94]" /> {recipe.servings} SERVINGS
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
                {/* title area */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf size={14} className="text-[#4A9B94]" />
                    <span className="text-[10px] font-bold text-[#4A9B94] uppercase tracking-widest">Zero Waste Choice</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-slate-800 leading-[1.1]">
                    {recipe.title}
                  </h2>
                </div>

                {/* ingredients area */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-3">
                    <ChefHat size={18} className="text-slate-400" /> Pantry List
                  </h3>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-3">
                    {recipe.extendedIngredients?.map((ing: any) => (
                      <div key={ing.id} className="group flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-600 capitalize group-hover:text-slate-900 transition-colors">{ing.name}</span>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">{ing.amount} {ing.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* action footer start cooking, add to my cookbook section if clicked? */}
              <div className="p-8 border-t border-slate-50 bg-white/80 backdrop-blur-sm flex gap-4">
                <Button className="flex-1 bg-[#4A9B94] hover:bg-[#3d827c] text-white rounded-2xl h-14 text-sm font-bold shadow-md shadow-[#4A9B94]/20 transition-all">
                  Start Cooking
                </Button>
                {recipe.sourceUrl && (
                  <Button variant="outline" className="rounded-2xl h-14 px-6 border-slate-200 text-slate-400 hover:text-[#4A9B94] transition-colors" asChild>
                    <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}