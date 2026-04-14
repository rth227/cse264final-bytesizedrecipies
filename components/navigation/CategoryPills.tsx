"use client";

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Vegan", "Gluten-Free"];

export default function CategoryPills() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className="focus:outline-none transition-transform active:scale-95"
          >
            <Badge
              variant={isActive ? "default" : "outline"}
              className={cn(
                "px-4 py-1.5 text-sm cursor-pointer transition-all duration-200",
                isActive 
                  ? "bg-slate-900 text-white shadow-md" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
              )}
            >
              {category}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}