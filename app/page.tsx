"use client";

import { useState } from 'react';
import IngredientInput from '@/components/ingredients/IngredientInput';
import CategoryPills from '@/components/navigation/CategoryPills';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import RecipeModal from '@/components/recipes/RecipeModal';

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]); // This starts as an empty list
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async (ingredients: string) => {
    if (!ingredients) return;
    setIsLoading(true);
    
    try {
      // Talking to your local backend on Port 8080
      const response = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(ingredients)}`);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Incoming Data:", data);
      console.log("Real recipes received:", data);
      
      // This replaces the empty list with the results from Gwenn's API
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        setRecipes([]); 
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#FDFBF7] min-h-screen text-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <section className="text-center mb-16 pt-10">
          <h1 className="text-6xl font-serif italic mb-4">
            Byte-Sized <span className="text-[#4A9B94] not-italic font-light">Recipes</span>
          </h1>
          <p className="text-slate-400 italic">“Cooking for you, by you.”</p>
        </section>

        <div className="mb-20">
          <IngredientInput onSearch={fetchRecipes} />
          <div className="flex justify-center mt-8">
            <CategoryPills />
          </div>
        </div>

        {/* VITAL CHANGE: 
          We pass 'recipes' (state) instead of 'mockRecipes' (static).
          We also pass 'isLoading' so the grid can show a spinner.
        */}
        {isLoading ? (
          <div className="text-center py-20 font-serif italic text-[#4A9B94] animate-pulse text-2xl">
            Sifting through the pantry...
          </div>
        ) : (
          <RecipeGrid 
            recipes={recipes} 
            onRecipeClick={(r: any) => setSelectedRecipe(r)} 
          />
        )}

        <RecipeModal 
          isOpen={!!selectedRecipe} 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />

      </div>
    </main>
  );
}