//should we just delete this page?? thought it could be cool but might be too much backend trouble

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Flame, Trophy } from 'lucide-react';

const COMMUNITY_POSTS = [
  { id: 1, user: "@chef_marcus", image: "/recipe1.jpg", likes: "1.2k", comment: "Made sourdough!" },
  { id: 2, user: "@sarah_eats", image: "/recipe2.jpg", likes: "840", comment: "New pasta recipe!" },
  // ... more posts
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      

      {/* feed */}
      <section className="px-6 columns-1 sm:columns-2 gap-4 space-y-4">
        {COMMUNITY_POSTS.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="break-inside-avoid bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/5] bg-slate-200">
               {/* Replace with <Image /> tag */}
               <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic">Photo</div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-primary">{post.user}</span>
                <div className="flex gap-3 text-slate-400">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> {post.likes}</span>
                  <MessageCircle className="h-3 w-3" />
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-tight">
                {post.comment}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}