"use client";

import React from 'react';
import Image from 'next/image';
import { Star, Plus, Play } from 'lucide-react';

export default function AwardsAndStats() {
  const partners = [
    { name: 'NETFLIX', color: 'bg-red-600' },
    { name: 'SPOTIFY', color: 'bg-green-600' },
    { name: 'DISNEY+', color: 'bg-blue-600' },
    { name: 'PLAYSTATION', color: 'bg-blue-800' },
    { name: 'XBOX', color: 'bg-green-800' },
    { name: 'ADOBE', color: 'bg-red-800' },
    { name: 'STEAM', color: 'bg-zinc-800' },
  ];

  return (
    <section className="bg-[#F8F8F8] pt-[140px] pb-0 overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1320px]">
        {/* Fun Facts Header */}
        <div className="mb-10">
          <span className="text-[12px] font-semibold uppercase tracking-[1px] text-[#666666]">
            OUR IMPACT
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[30px] items-stretch mb-[140px]">
          {/* Successful Projects Card */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-[24px] p-[40px] h-full flex flex-col justify-between shadow-sm border border-[#EEEEEE]">
              <div>
                <p className="text-[#000000] text-[16px] leading-[1.4] mb-8 font-bold uppercase">
                  Happy Customers Served
                </p>
                <h3 className="text-[64px] font-bold tracking-[-0.04em] flex items-baseline">
                  12k<span className="text-primary/20 ml-1">+</span>
                </h3>
              </div>
            </div>
          </div>

          {/* Rating Card */}
          <div className="md:col-span-5">
            <div className="bg-white rounded-[24px] p-[40px] h-full shadow-sm border border-[#EEEEEE]">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#FF4F01" color="#FF4F01" />
                ))}
              </div>
              <h2 className="text-[80px] lg:text-[120px] font-bold leading-[0.9] tracking-[-0.04em] mb-10">
                4.9/5.0
              </h2>
              <div className="border-t border-[#EEEEEE] pt-8">
                <p className="text-[#666666] text-[16px] mb-8 font-medium">
                  We maintain the highest satisfaction rate in the digital marketplace.
                </p>
                <button className="flex items-center gap-3 group">
                  <div className="w-[50px] h-[50px] bg-primary rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                    <Plus size={20} />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-[1px] group-hover:text-primary transition-colors">JOIN THE COMMUNITY</span>
                </button>
              </div>
            </div>
          </div>

          {/* Location Stat */}
          <div className="md:col-span-4 space-y-[30px]">
            <div className="bg-white rounded-[24px] overflow-hidden relative min-h-[160px] flex items-center p-[40px] shadow-sm border border-[#EEEEEE]">
              <div className="relative z-10">
                <p className="text-[16px] font-bold mb-1 uppercase">Instant Setup</p>
                <p className="text-[#666666] text-[14px]">fully automated</p>
              </div>
              <div className="absolute right-10 bottom-6">
                <span className="text-[64px] font-bold tracking-[-0.04em]">0.1<span className="text-primary/20">s</span></span>
              </div>
            </div>

            {/* Sub-card/Image Placeholder */}
            <div className="bg-black rounded-[24px] p-[40px] text-white overflow-hidden min-h-[350px] relative">
              <div className="relative z-10 h-full flex flex-col justify-end">
                <p className="text-[18px] leading-[1.6] text-white/90 font-medium">
                  Saving users over $500k+ annually in subscription costs. Premium for everyone.
                </p>
              </div>
              <div className="absolute inset-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <Image 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
                  alt="Tech"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

          {/* Happy Users Section */}
          <div className="mb-[140px]">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[12px] font-semibold uppercase tracking-[1px] text-[#666666]">
                OUR TRUSTED PARTNERS
              </span>
              <span className="text-[12px] font-semibold text-[#666666]">
                ©2026 BUNDLEPLUS™ STUDIO
              </span>
            </div>

            <div className="bg-white rounded-[24px] overflow-hidden border border-[#EEEEEE] shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {partners.map((partner, index) => (
                  <div 
                    key={index} 
                    className="h-[180px] flex items-center justify-center border-r border-b border-[#EEEEEE] last:border-r-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-10"
                  >
                    <p className="font-bold text-xl tracking-tighter flex items-center gap-2">
                      <span className={`w-6 h-6 ${partner.color} rounded-sm rotate-45 inline-block`} />
                      {partner.name}
                    </p>
                  </div>
                ))}
                <div className="h-[180px] flex flex-col items-center justify-center border-b border-[#EEEEEE] px-10 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#BBBBBB] mb-2">NEXT DEAL SOON.</p>
                  <a href="#" className="text-[12px] font-bold uppercase tracking-[1px] border-b border-primary hover:text-primary transition-colors">REQUEST BRAND</a>
                </div>
              </div>
            </div>

            {/* Video Reel Section */}
            <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden group shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80" 
                alt="Marketplace Background"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
              
              <div className="absolute bottom-[40px] left-[40px]">
                <button className="flex items-center gap-4 bg-white/95 backdrop-blur-sm rounded-full py-3 px-6 shadow-xl transition-all duration-300 hover:bg-white hover:scale-105">
                  <div className="w-[36px] h-[36px] bg-primary rounded-full flex items-center justify-center text-white">
                    <Play size={14} fill="white" />
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-black pr-2">WATCH HOW IT WORKS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
