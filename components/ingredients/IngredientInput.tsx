"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CornerDownLeft, Search } from 'lucide-react'; // Added Search icon

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Added Button
import IngredientTag from "./IngredientTag"; 

interface IngredientInputProps {
    onSearch: (ingredients: string) => void;
}

export default function IngredientInput({ onSearch }: IngredientInputProps) {  
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(""); // Removed the duplicate line

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue("");
    }
  };

  const removeIngredient = (target: string) => {
    setIngredients(ingredients.filter((ing) => ing !== target));
  };

  // NEW: Logic to send all tags to the backend
  const handleFinalSearch = () => {
    if (ingredients.length > 0) {
      // Joins ['garlic', 'onion'] into "garlic,onion" for Gwenn's API
      onSearch(ingredients.join(","));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-primary/10 shadow-xl shadow-primary/5">
      
      <div className="space-y-1 text-center">
        <h2 className="text-3xl font-serif italic text-slate-800">What's in your kitchen?</h2>
        <p className="text-slate-500 text-sm font-medium tracking-tight">
          Add ingredients to reduce waste and find fresh ideas.
        </p>
      </div>

      <div className="relative group">
        <Input
          placeholder="Spinach, garlic, rice..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addIngredient()}
          className="h-16 pl-6 pr-28 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 transition-all text-lg shadow-inner bg-white/80 text-black"
        />
        
        <div className="absolute right-2 top-2 bottom-2 p-1">
          <button 
            onClick={addIngredient}
            type="button"
            className="h-full px-3 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-0.5 hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-95 group/btn"
          >
            <CornerDownLeft className="h-4 w-4 stroke-[2.5px]" />
          </button>
        </div>
      </div>

      <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 min-h-[120px]">
        <div className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {ingredients.map((ing) => (
              <IngredientTag 
                key={ing} 
                label={ing} 
                onRemove={() => removeIngredient(ing)} 
              />
            ))}
          </AnimatePresence>
          
          {ingredients.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-8 text-center"
            >
              <p className="text-sm text-slate-400 italic">Add items above to get started...</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* NEW: Final Search Button */}
      <div className="flex justify-center pt-2">
        <Button 
          onClick={handleFinalSearch}
          disabled={ingredients.length === 0}
          className="rounded-full px-8 py-6 h-auto text-lg font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all disabled:opacity-50"
        >
          <Search className="h-5 w-5" />
          Find Recipes
        </Button>
      </div>
    </div>
  );
}