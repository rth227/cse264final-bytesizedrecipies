"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, Check, Plus, Loader2 } from 'lucide-react';

export default function SaveRecipeModal({ isOpen, onClose, recipeTitle }: any) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  
  const myCookbooks = [
    { id: 1, title: "Weekday Staples", count: 12 },
    { id: 2, title: "Family Secrets", count: 8 },
  ];

  const handleConfirm = () => {
    setStatus('saving');
    
    // simulate a database delay
    setTimeout(() => {
      setStatus('success');
      
      // close the modal automatically after the user sees the success message
      setTimeout(() => {
        onClose();
        setStatus('idle'); // reset for next time
      }, 1500);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
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
            {/* header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif italic text-slate-800">Save Recipe</h3>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
                   {recipeTitle}
                </p>
              </div>
              <button onClick={onClose} className="text-slate-300 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {/* list section */}
            <div className="p-6 space-y-3">
              {myCookbooks.map((book) => (
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
                    <span className={`font-bold text-sm ${selectedId === book.id ? "text-[#4A9B94]" : "text-slate-600"}`}>
                      {book.title}
                    </span>
                  </div>
                  {selectedId === book.id && <Check size={18} className="text-[#4A9B94]" />}
                </button>
              ))}
            </div>

            {/* action footer */}
            <div className="p-8 bg-slate-50/50">
              <button 
                onClick={handleConfirm}
                disabled={!selectedId || status !== 'idle'}
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center overflow-hidden relative"
                style={{ backgroundColor: status === 'success' ? '#4A9B94' : '#0f172a', color: 'white' }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                      Confirm Save
                    </motion.span>
                  )}
                  {status === 'saving' && (
                    <motion.span key="saving" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                      <Loader2 className="animate-spin h-5 w-5" />
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.div key="success" className="flex items-center gap-2" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}>
                      <Check className="h-4 w-4" />
                      Saved to Cookbook
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