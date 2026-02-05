"use client";

import React from 'react';
import Image from 'next/image';

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      category: "GUIDE",
      date: "FEB 05, 2026",
      title: "How to maximize your streaming experience in 2026.",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
    },
    {
      id: 2,
      category: "TIPS",
      date: "FEB 03, 2026",
      title: "Top 10 gaming subscriptions worth your money.",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    },
    {
      id: 3,
      category: "UPDATE",
      date: "JAN 28, 2026",
      title: "New PlayStation Plus tiers explained: What to choose?",
      image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?w=800&q=80",
    }
  ];

  return (
    <section id="blog" className="py-[140px] bg-[#F8F8F8]">
      <div className="container mx-auto px-8 max-w-[1320px]">
        {/* Section Heading */}
          <div className="text-center mb-[80px]">
            <span className="text-[12px] font-bold uppercase tracking-[2px] text-primary block mb-4">
              INSIGHTS
            </span>
            <h2 className="text-[48px] font-bold tracking-tight text-black uppercase">
              Marketplace News
            </h2>
          </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <div className="bg-black text-white p-10 rounded-[24px] flex flex-col justify-between min-h-[180px]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider">{posts[0].category}</span>
                  <span className="text-[11px] text-primary/60 font-medium">{posts[0].date}</span>
                </div>
              <h3 className="text-[24px] font-bold leading-tight uppercase tracking-tighter">
                {posts[0].title}
              </h3>
            </div>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden group shadow-lg">
              <Image 
                src={posts[0].image}
                alt={posts[0].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden group order-2 md:order-1 shadow-lg">
              <Image 
                src={posts[1].image}
                alt={posts[1].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
              />
            </div>
            <div className="bg-white text-black p-10 rounded-[24px] flex flex-col justify-between min-h-[180px] order-1 md:order-2 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-40">{posts[1].category}</span>
                <span className="text-[11px] text-[#666666] font-medium">{posts[1].date}</span>
              </div>
              <h3 className="text-[24px] font-bold leading-tight uppercase tracking-tighter">
                {posts[1].title}
              </h3>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            <div className="bg-black text-white p-10 rounded-[24px] flex flex-col justify-between min-h-[180px]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider">{posts[2].category}</span>
                  <span className="text-[11px] text-primary/60 font-medium">{posts[2].date}</span>
                </div>
              <h3 className="text-[24px] font-bold leading-tight uppercase tracking-tighter">
                {posts[2].title}
              </h3>
            </div>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden group shadow-lg">
              <Image 
                src={posts[2].image}
                alt={posts[2].title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSection;
