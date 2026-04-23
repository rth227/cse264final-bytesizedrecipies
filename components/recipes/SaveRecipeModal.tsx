"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Check, Loader2 } from 'lucide-react';

export default function SaveRecipeModal({ 
  isOpen, 
  onClose, 
  recipeTitle, 
  recipeId, 
  onSaveSuccess, 
  ingredients, 
  instructions, 
  image,
  mealType 
}: any) {  
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [cookbooks, setCookbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the user's cookbooks when the modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('http://localhost:8080/api/cookbooks/all') 
        .then(res => res.json())
        .then(data => {
          setCookbooks(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!selectedId) return;
    setStatus('saving');
  
    // Format ingredients into a PostgreSQL-friendly array string: {"item1", "item2"}
    const postgresArray = ingredients 
      ? `{${ingredients.split(',').map((i: string) => `"${i.trim().replace(/"/g, '\\"')}"`).join(',')}}`
      : '{}';
  
    const payload = {
      recipeId: recipeId,
      cookbookId: selectedId,
      recipeTitle: recipeTitle || "Untitled Recipe",
      ingredients: postgresArray, 
      instructions: instructions || "Check cooking mode for steps.",
      image_url: image || "",
      meal_type: mealType || "recipe"
    };

    try {
      const response = await fetch('http://localhost:8080/api/cookbooks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onSaveSuccess();
          onClose();
          setStatus('idle');
          setSelectedId(null);
        }, 1500);
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error}`);
        setStatus('idle');
      }
    } catch (err) {
      console.error("Save error:", err);
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif italic text-slate-800">Save Recipe</h3>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 truncate max-w-[250px]">
                   {recipeTitle}
                </p>
              </div>
              <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cookbook List */}
            <div className="p-6 space-y-3 max-h-[300px] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center p-10">
                  <Loader2 className="animate-spin text-[#4A9B94]" size={32} />
                </div>
              ) : cookbooks.length > 0 ? (
                cookbooks.map((book) => (
                  <button
                    key={book.id}
                    disabled={status !== 'idle'}
                    onClick={() => setSelectedId(book.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2 ${
                      selectedId === book.id 
                      ? "border-[#4A9B94] bg-[#4A9B94]/5" 
                      : "border-transparent bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Book size={18} className={selectedId === book.id ? "text-[#4A9B94]" : "text-slate-400"} />
                      <div className="flex flex-col items-start">
                        <span className={`font-bold text-sm ${selectedId === book.id ? "text-[#4A9B94]" : "text-slate-600"}`}>
                          {book.name}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
                          {book.recipe_count || 0} Recipes
                        </span>
                      </div>
                    </div>
                    {selectedId === book.id && <Check size={18} className="text-[#4A9B94]" />}
                  </button>
                ))
              ) : (
                <p className="text-center text-slate-400 text-sm italic py-10">No cookbooks found.</p>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-8 bg-slate-50/50">
              <button 
                onClick={handleConfirm}
                disabled={!selectedId || status !== 'idle'}
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center relative shadow-lg active:scale-95 disabled:opacity-50"
                style={{ backgroundColor: status === 'success' ? '#4A9B94' : '#0f172a', color: 'white' }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>
                      Confirm Save
                    </motion.span>
                  )}
                  {status === 'saving' && (
                    <motion.span key="saving" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Loader2 className="animate-spin h-5 w-5" />
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.div key="success" className="flex items-center gap-2" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Check className="h-4 w-4" />
                      Saved
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}