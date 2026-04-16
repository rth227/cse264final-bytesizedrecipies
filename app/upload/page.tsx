"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, Clock, Users, Camera, CheckCircle2, 
  ChevronRight, Book, Globe, ChevronDown, Trash2 
} from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  // form state
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIng, setCurrentIng] = useState("");
  const [steps, setSteps] = useState<string[]>([""]); 
  const [isPublished, setIsPublished] = useState(false);
  
  // routing state
  const [selectedCookbook, setSelectedCookbook] = useState("");
  const [publishToCommunity, setPublishToCommunity] = useState(true);

  // ingredient logic
  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentIng.trim() && !ingredients.includes(currentIng)) {
      setIngredients([...ingredients, currentIng.trim()]);
      setCurrentIng("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // steps logic
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, ""]);
  
  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublished(true);
  };

  // success state - full screen
  if (isPublished) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 bg-[#4A9B94]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#4A9B94]">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-serif italic text-slate-800 mb-4 tracking-tight">Recipe Saved!</h1>
          <p className="text-slate-400 mb-12 font-medium leading-relaxed">
            Your culinary tradition has been routed to <span className="text-slate-800 font-bold">{selectedCookbook || "your library"}</span>
            {publishToCommunity && " and shared with the community explorer"}.
          </p>
          <div className="flex flex-col gap-4">
            <Link href="/cookbooks" className="bg-[#4A9B94] text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:brightness-110 transition-all">
              View My Cookbooks
            </Link>
            <button 
              onClick={() => {
                setIsPublished(false);
                setIngredients([]);
                setSteps([""]);
              }} 
              className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-600 transition-colors py-4"
            >
              Upload Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <div className="mb-16">
        <h1 className="text-6xl font-serif italic text-slate-800 tracking-tight">New Recipe</h1>
        <p className="text-slate-400 mt-4 font-medium text-lg max-w-lg">
          Standardize your kitchen traditions for the digital age.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* left col */}
        <div className="lg:col-span-4 space-y-10">
          <div className="w-full aspect-square bg-white rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:bg-slate-50 hover:border-[#4A9B94]/40 transition-all cursor-pointer shadow-sm relative overflow-hidden">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#4A9B94]/10 transition-colors">
              <Camera className="h-8 w-8 text-slate-300 group-hover:text-[#4A9B94]" />
            </div>
            <span className="text-[10px] font-black text-slate-400 mt-6 tracking-[0.2em] uppercase">Add Cover Photo</span>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Total Time</label>
              <div className="relative text-slate-800">
                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A9B94]" />
                <input type="text" placeholder="e.g. 45 min" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none text-sm font-bold outline-none" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Servings</label>
              <div className="relative text-slate-800">
                <Users className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A9B94]" />
                <input type="text" placeholder="e.g. 4 people" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-none text-sm font-bold outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* right col */}
        <div className="lg:col-span-8 space-y-12">
          
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Recipe Name</label>
              <input required type="text" placeholder="Name your creation..." className="w-full px-0 py-4 border-b-2 border-slate-100 focus:border-[#4A9B94] transition-colors bg-transparent text-4xl font-serif italic outline-none text-slate-800" />
            </div>

            {/* ingredients */}
            <div className="space-y-6 pt-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Pantry List</label>
              <div className="flex gap-3">
                <input value={currentIng} onChange={(e) => setCurrentIng(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addIngredient(e)} type="text" placeholder="Add ingredient..." className="flex-1 px-8 py-5 rounded-2xl bg-slate-50 border-none text-sm font-medium text-slate-700 outline-none" />
                <button onClick={addIngredient} type="button" className="bg-slate-900 text-white w-14 rounded-2xl hover:bg-[#4A9B94] transition-all flex items-center justify-center shadow-lg"><Plus size={24} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {ingredients.map((ing, index) => (
                    <motion.span key={ing} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#4A9B94]/5 text-[#4A9B94] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-[#4A9B94]/10">
                      {ing} <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeIngredient(index)} />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* steps */}
            <div className="space-y-8 pt-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Preparation</label>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6 items-start group relative">
                    <span className="mt-5 text-[40px] font-serif italic text-slate-100 group-focus-within:text-[#4A9B94]/20 transition-colors">0{index+1}</span>
                    <textarea required value={step} onChange={(e) => updateStep(index, e.target.value)} placeholder="Next step..." className="flex-1 px-8 py-6 rounded-3xl bg-slate-50 border-none min-h-[120px] text-sm leading-relaxed text-slate-600 outline-none focus:ring-2 focus:ring-[#4A9B94]/10" />
                    {steps.length > 1 && <button type="button" onClick={() => removeStep(index)} className="absolute right-4 top-4 text-slate-200 hover:text-red-400"><Trash2 size={16} /></button>}
                  </div>
                ))}
                <button type="button" onClick={addStep} className="w-full py-6 border-2 border-dashed border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-[#4A9B94] hover:border-[#4A9B94]/40 transition-all flex items-center justify-center gap-3"><Plus size={14} /> Add Step</button>
              </div>
            </div>
          </div>

          {/* two separate routing boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3"><Book size={16} className="text-[#4A9B94]" /><label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collection</label></div>
              <div className="relative">
                <select value={selectedCookbook} onChange={(e) => setSelectedCookbook(e.target.value)} className="w-full bg-slate-50 rounded-2xl px-6 py-4 appearance-none text-sm font-bold text-slate-600 outline-none"><option value="">Personal Library</option><option value="Staples">Weekday Staples</option><option value="Date Night">Date Night</option></select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3"><Globe size={16} className={publishToCommunity ? "text-[#4A9B94]" : "text-slate-300"} /><label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</label></div>
              <button type="button" onClick={() => setPublishToCommunity(!publishToCommunity)} className="w-full bg-slate-50 rounded-2xl px-6 py-4 flex items-center justify-between group transition-all">
                <span className="text-sm font-bold text-slate-600">{publishToCommunity ? 'Public' : 'Private'}</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${publishToCommunity ? 'bg-[#4A9B94]' : 'bg-slate-200'}`}><motion.div animate={{ x: publishToCommunity ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm" /></div>
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#3d827b] transition-all flex items-center justify-center gap-4 group shadow-2xl">
            Save Recipe <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </form>
    </div>
  );
}