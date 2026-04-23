"use client";

import { X, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useState } from 'react'; 
import SaveRecipeModal from './SaveRecipeModal';
import Link from 'next/link';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: any;
  showSaveButton?: boolean;
}

export default function RecipeModal({ isOpen, onClose, recipe, showSaveButton = false }: RecipeModalProps) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  if (!recipe) return null;

  const title = recipe.title || recipe.recipe_name || "Untitled Recipe";
  const image = recipe.image || recipe.image_url || recipe.recipe_image;
  
  const rawIngredients = recipe.extendedIngredients || recipe.ingredients || [];
  const ingredientsArray = typeof rawIngredients === 'string' 
    ? rawIngredients.replace(/{|}|"/g, '').split(',') 
    : rawIngredients;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/80 backdrop-blur-xl"
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute right-6 top-6 z-[110] p-3 bg-white/90 rounded-full shadow-lg hover:scale-110 transition-transform">
              <X className="h-6 w-6 text-slate-600" />
            </button>

            {/* Left Side: Image */}
            <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10">
                <h2 className="text-4xl font-serif italic text-slate-800">{title}</h2>
                
                {/* Pantry List - Starts immediately after title now */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#4A9B94] flex items-center gap-3">
                    <ChefHat size={18} /> Pantry List
                  </h3>
                  <div className="grid grid-cols-1 gap-y-1">
                    {ingredientsArray.map((ing: any, i: number) => (
                      <div key={i} className="py-3 border-b border-slate-50 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A9B94]/30" />
                        <span className="text-sm text-slate-600 capitalize">
                          {ing.original || ing.name || ing}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-8 border-t border-slate-50 flex gap-4 bg-white">
                <Link href={`/recipe/${recipe.id}`} className="flex-1">
                  <Button className="w-full bg-[#4A9B94] hover:bg-[#3d827c] text-white rounded-2xl h-14 font-bold shadow-md shadow-[#4A9B94]/20 transition-all">
                    Start Cooking
                  </Button>
                </Link>

                {showSaveButton && (
                  <Button 
                    onClick={() => setIsSaveModalOpen(true)}
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-600 rounded-2xl h-14 font-bold hover:bg-slate-50 transition-all"
                  >
                    Add to Cookbook
                  </Button>
                )}
              </div>
            </div>

            <SaveRecipeModal
  isOpen={isSaveModalOpen}
  onClose={() => setIsSaveModalOpen(false)}
  recipeId={recipe.id}
  recipeTitle={title}
  // FIX: Convert your array back to a string so handleConfirm can process it
  ingredients={
    ingredientsArray.length > 0 
      ? ingredientsArray.map((ing: any) => ing.original || ing.name || ing).join(', ')
      : ""
  }
  instructions={recipe.instructions || ""}
  image={image}
  mealType={recipe.dishTypes?.[0] || recipe.meal_type || "main course"} 
  onSaveSuccess={() => setIsSaveModalOpen(false)}
/>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}