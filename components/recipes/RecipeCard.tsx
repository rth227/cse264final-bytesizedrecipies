"use client";

import React, { useState } from 'react';
import { Plus, Check, Clock, ListPlus, X } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

export default function RecipeCard({ title, image, time }: any) {
  const [showCookbookSelect, setShowCookbookSelect] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // mock list of user's cookbooks
  const myCookbooks = ["Weekday Staples", "Date Night", "Holiday Bakes"];

  const handleSave = (cookbook: string) => {
    console.log(`Saving ${title} to ${cookbook}`);
    setIsSaved(true);
    setShowCookbookSelect(false);
    // Here Riley/Gwenn would link the Recipe ID to the Cookbook ID in the DB
  };

  return (
    <Card className="relative overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group rounded-[28px] bg-white">
      {/* selection overlay */}
      <AnimatePresence>
        {showCookbookSelect && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md p-6 flex flex-col justify-center"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setShowCookbookSelect(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h4 className="text-white font-serif italic text-lg mb-4 text-center">Save to...</h4>
            <div className="space-y-2">
              {myCookbooks.map((book) => (
                <button
                  key={book}
                  onClick={(e) => { e.stopPropagation(); handleSave(book); }}
                  className="w-full py-3 px-4 bg-white/10 hover:bg-[#4A9B94] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                >
                  {book}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* main card ui */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowCookbookSelect(true); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest ${
              isSaved 
                ? "bg-[#4A9B94] text-white" 
                : "bg-white/90 backdrop-blur-md text-slate-600 hover:bg-white"
            }`}
          >
            {isSaved ? <Check size={14} /> : <ListPlus size={14} />}
            {isSaved ? "Saved" : "Add to Cookbook"}
          </button>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="font-serif italic text-xl text-slate-800 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <Clock size={12} className="text-[#4A9B94]" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{time}</span>
        </div>
      </CardContent>
    </Card>
  );
}