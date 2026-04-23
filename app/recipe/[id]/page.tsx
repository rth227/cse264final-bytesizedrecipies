"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Clock, Users, Flame, ChevronLeft, Check, BookPlus } from 'lucide-react';
import Link from 'next/link';
import SaveRecipeModal from '@/components/recipes/SaveRecipeModal';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        // We call a new endpoint on your backend to get one specific recipe
        const response = await fetch(`http://localhost:8080/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Failed to load recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getRecipeDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-serif italic">Prepping your kitchen...</div>;
  if (!recipe) return <div className="p-20 text-center">Recipe not found.</div>;

  return (
    <main className="min-h-screen bg-[#FDFBF7] pb-20">
      {/* Header Image */}
      <div className="relative h-[40vh] w-full">
        <img src={recipe.image_url} className="h-full w-full object-cover" alt={recipe.title} />
        <Link href="/" className="absolute top-8 left-8 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
          <ChevronLeft size={24} />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-50">
          <h1 className="text-5xl font-serif italic text-slate-800 mb-8">{recipe.title}</h1>
          <button 
              onClick={() => setIsSaveModalOpen(true)}
              className={`shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all shadow-sm border ${
                isSaved 
                  ? "bg-[#4A9B94] text-white border-[#4A9B94]" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isSaved ? <Check size={16} /> : <BookPlus size={16} className="text-[#4A9B94]" />}
              {isSaved ? "Saved to Cookbook" : "Add to Cookbook"}
            </button>
        
          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 mb-12 py-6 border-y border-slate-50">
            <div className="flex items-center gap-3">
              <Clock className="text-[#4A9B94]" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-300">Time</p>
                <p className="text-lg font-bold">{recipe.prep_time}m</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-[#4A9B94]" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-300">Servings</p>
                <p className="text-lg font-bold">{recipe.servings}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif italic text-slate-800">Instructions</h2>
            <div 
              className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: recipe.instructions || "Follow the source link for full steps." }}
            />
          </div>
        </div>
      </div>
      <SaveRecipeModal 
  isOpen={isSaveModalOpen} 
  onClose={() => setIsSaveModalOpen(false)} 
  recipeId={id}
  recipeTitle={recipe.title}
  // FIX: Use extendedIngredients and map it to a string
  ingredients={
    recipe.extendedIngredients 
      ? recipe.extendedIngredients.map((ing: any) => ing.original || ing.name).join(', ')
      : ""
  } 
  instructions={recipe.instructions}
  image={recipe.image_url}
  mealType={recipe.meal_type || "recipe"}
  onSaveSuccess={() => setIsSaved(true)} 
/>
    </main>
  );
}