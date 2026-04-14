"use client";

import { Heart, Clock, Utensils } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecipeCard({ title, image, time, matchCount, totalIngredients, category }: any) {
  return (
    <Card 
      className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group"
      style={{ 
        width: '100%', 
        maxWidth: '320px', 
        borderRadius: '28px',
        backgroundColor: 'white'
      }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => e.stopPropagation()} // Keeps heart click separate
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all active:scale-90"
          >
            <Heart className="h-4 w-4 text-slate-400 hover:text-red-500 transition-colors" />
          </button>
        </div>

        <Badge className="absolute bottom-3 left-3 bg-white/95 text-[#4A9B94] border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
          {category || "Zero Waste"}
        </Badge>
      </div>

      <CardContent className="p-5 space-y-3">
        <h3 className="font-serif italic text-xl leading-tight text-slate-800 line-clamp-1 group-hover:text-[#4A9B94] transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#4A9B94]/60" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Utensils size={14} className="text-[#4A9B94]/60" />
            <span>{matchCount}/{totalIngredients} Match</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}