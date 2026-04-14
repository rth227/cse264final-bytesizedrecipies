"use client";

import { useState } from 'react';
import IngredientInput from '@/components/ingredients/IngredientInput';
import CategoryPills from '@/components/navigation/CategoryPills';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import RecipeModal from '@/components/recipes/RecipeModal';

export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const mockRecipes = [
    { 
      id: 1, 
      title: "Creamy Garlic Pasta", 
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500", 
      readyInMinutes: 20, 
      servings: 2,
      usedIngredientCount: 3, 
      missedIngredientCount: 2,
      extendedIngredients: [
        { id: 1, name: "Pasta", amount: 1, unit: "lb" },
        { id: 2, name: "Garlic", amount: 4, unit: "cloves" }
      ]
    },
    { 
      id: 2, 
      title: "Avocado Toast with Egg", 
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500", 
      readyInMinutes: 10, 
      servings: 1,
      usedIngredientCount: 2, 
      missedIngredientCount: 1,
      extendedIngredients: [
        { id: 3, name: "Avocado", amount: 1, unit: "whole" },
        { id: 4, name: "Egg", amount: 1, unit: "large" }
      ]
    },
  ];

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
          <IngredientInput />
          <div className="flex justify-center mt-8">
            <CategoryPills />
          </div>
        </div>

        <RecipeGrid 
          recipes={mockRecipes} 
          onRecipeClick={(r: any) => setSelectedRecipe(r)} 
        />

        <RecipeModal 
          isOpen={!!selectedRecipe} 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />

      </div>
    </main>
  );
}