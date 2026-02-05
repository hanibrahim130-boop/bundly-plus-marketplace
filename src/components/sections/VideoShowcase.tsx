"use client";

import React, { useState } from 'react';
import { Play, ShieldCheck, X, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

export default function VideoShowcase() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="bg-black py-[140px] overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20">
         {/* Background pattern or subtle video-like movement */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,1,0.2)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto max-w-[1320px] px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h6 className="text-primary text-[12px] font-bold tracking-[2px] uppercase mb-6">Experience BundlyPlus</h6>
            <h2 className="text-[48px] lg:text-[72px] font-bold text-white leading-[1] tracking-[-0.04em] uppercase mb-8">
              Made for <br /> <span className="text-primary">Lebanon.</span>
            </h2>
            <p className="text-white/60 text-[18px] leading-[1.6] max-w-[500px] mb-10">
              We understand the Lebanese market. Local payment methods, instant delivery, and 24/7 WhatsApp support in Arabic and English. Your favorite premium services, delivered in seconds.
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-white text-[24px] font-bold">12k+</span>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-[1px]">Lebanese Users</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white text-[24px] font-bold">24/7</span>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-[1px]">WhatsApp Support</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-white text-[24px] font-bold">$USD</span>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-[1px]">Stable Pricing</span>
              </div>
            </div>
            
            {/* Lebanese-specific trust indicators */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-[11px] text-white/80 font-medium">Serving All of Lebanon</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[11px] text-white/80 font-medium">Beirut Time Support</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div 
              className="relative aspect-video rounded-[32px] overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
              onClick={() => setIsVideoPlaying(true)}
            >
              {!isVideoPlaying ? (
                <>
                  <Image 
                    src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&q=80" 
                    alt="BundlyPlus Demo" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
                    <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                    title="BundlyPlus Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsVideoPlaying(false); }}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              {/* Animated corner badge */}
              {!isVideoPlaying && (
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] text-white font-bold uppercase tracking-wider">Verified for Lebanon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
