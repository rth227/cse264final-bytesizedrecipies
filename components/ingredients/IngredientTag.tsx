"use client";

import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface IngredientTagProps {
  label: string;
  onRemove?: () => void;
}

export default function IngredientTag({ label, onRemove }: IngredientTagProps) {
  return (
    <motion.div
      // entrance animation
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileHover={{ y: -2 }}
      
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#E6F2F1', // light seafoam background
        color: '#4A9B94',
        padding: '6px 12px',
        borderRadius: '100px', // rounded shape
        fontSize: '13px',
        fontWeight: '600',
        border: '1px solid rgba(74, 155, 148, 0.2)',
        cursor: 'default',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}
    >
      <span className="capitalize">{label}</span>
      
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-[#4A9B94] hover:text-white rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </motion.div>
  );
}