"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import SaveRecipeModal from '@/components/recipes/SaveRecipeModal';
import { ArrowLeft, BookPlus, Clock, Users, Flame } from 'lucide-react';

export default function RecipeDetailPage() {
  const params = useParams();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* nav */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-[#4A9B94] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Search</span>
        </Link>

        {/* user saves recipe */}
        <button 
          onClick={() => setIsSaveModalOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all text-slate-600 shadow-sm"
        >
          <BookPlus className="h-4 w-4 text-[#4A9B94]" />
          Add to Cookbook
        </button>
      </div>
      <SaveRecipeModal 
        isOpen={isSaveModalOpen} 
        onClose={() => setIsSaveModalOpen(false)} 
        recipeTitle="Creamy Garlic Pasta" // This will eventually be dynamic
      />

      {/* hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 aspect-square">
           <img 
            src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800" 
            className="w-full h-full object-cover" 
            alt="Recipe"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-serif italic text-slate-800 leading-tight">
            Creamy Garlic Pasta
          </h1>
          
          <div className="flex gap-6 border-y border-slate-100 py-6">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Time</p>
              <p className="text-sm font-bold text-slate-600 flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3 text-[#4A9B94]" /> 20m
              </p>
            </div>
            <div className="text-center border-x border-slate-100 px-6">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Servings</p>
              <p className="text-sm font-bold text-slate-600 flex items-center gap-1 justify-center">
                <Users className="h-3 w-3 text-[#4A9B94]" /> 2
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Calories</p>
              <p className="text-sm font-bold text-slate-600 flex items-center gap-1 justify-center">
                <Flame className="h-3 w-3 text-[#4A9B94]" /> 450
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}