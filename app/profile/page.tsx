"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, X, Clock, User, Plus, ChevronRight, Image as ImageIcon, Loader2 } from 'lucide-react';
import RecipeCard from '@/components/recipes/RecipeCard';

export default function ProfilePage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [cookbooks, setCookbooks] = useState<any[]>([]);
  
  // Form State
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState(""); 
  const [selectedCookbook, setSelectedCookbook] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/cookbooks/all')
      .then(res => res.json())
      .then(data => setCookbooks(data))
      .catch(err => console.error("Error loading cookbooks:", err));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    const recipeData = {
      recipeId: Math.floor(Math.random() * 1000000), 
      cookbookId: selectedCookbook,
      recipeTitle: title,
      ingredients: ingredients,
      instructions: instructions,
      image_url: imagePreview || "", 
      meal_type: "homemade"
    };

    try {
      const response = await fetch('http://localhost:8080/api/cookbooks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        setIsUploadOpen(false);
        setTitle(""); setIngredients(""); setInstructions(""); setImagePreview(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20 p-12 bg-white rounded-[3.5rem] border border-slate-50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A9B94]/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="w-40 h-40 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 border-2 border-dashed border-slate-100 relative z-10">
          <User size={64} strokeWidth={1.5} />
        </div>
        <div className="text-center md:text-left flex-1 relative z-10">
          <h1 className="text-6xl font-serif italic text-slate-800 tracking-tight">Your Kitchen</h1>
          
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-5xl rounded-[3rem] p-12 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-serif italic text-slate-800">New Creation</h2>
                <button onClick={() => setIsUploadOpen(false)}><X className="text-slate-300 hover:text-slate-800" /></button>
              </div>

              <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Recipe Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-700" placeholder="e.g. Lemon Basil Risotto" />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Assign to Cookbook</label>
                    <select required value={selectedCookbook} onChange={(e) => setSelectedCookbook(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-600 appearance-none font-bold">
                      <option value="">Select a Collection...</option>
                      {cookbooks.map(cb => <option key={cb.id} value={cb.id}>{cb.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Ingredients</label>
                    <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-4 h-28 resize-none font-medium text-slate-600" placeholder="2 cups Rice, 1 Lemon..." />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Cooking Steps</label>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl p-4 h-40 resize-none font-medium text-slate-600" placeholder="1. Boil water..." />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Recipe Photo</label>
                  
                  {/* Smaller Photo Container */}
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-full h-48 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-[#4A9B94]/30 transition-all relative mb-6"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center">
                        <ImageIcon size={32} className="text-slate-200 mb-2 mx-auto group-hover:text-[#4A9B94] transition-colors" />
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Select Photo</span>
                      </div>
                    )}
                    {/* The actual hidden input */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      accept="image/*" 
                    />
                  </div>

                  <button type="submit" disabled={isUploading || !selectedCookbook} className="w-full bg-[#4A9B94] text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#3d827b] transition-all disabled:opacity-50 mt-auto">
                    {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Save Recipe to Kitchen"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}