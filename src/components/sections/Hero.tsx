"use client";

import React from 'react';
import { Plus, CreditCard, Smartphone, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#F8F8F8] pt-[100px] pb-[140px]"
    >
      {/* Background Watermark Text */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center px-8 lg:px-16 select-none pointer-events-none">
        <h1 className="watermark-text leading-[0.8] tracking-[-0.04em] opacity-[0.03] uppercase font-bold text-[clamp(100px,20vw,320px)]">
          Bundly
        </h1>
        <h1 className="watermark-text leading-[0.8] tracking-[-0.04em] opacity-[0.03] ml-[0.5em] uppercase font-bold text-[clamp(100px,20vw,320px)]">
          Plus
        </h1>
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mx-auto px-8 max-w-[1320px]">
        {/* Left Space */}
        <div className="hidden lg:block lg:col-span-6" />

        {/* Right Content Area */}
        <div className="lg:col-span-6 flex flex-col gap-12">
          
            {/* Headline and Description */}
            <div className="flex flex-col gap-6 lg:max-w-[520px] lg:ml-auto text-right items-end">
                <h2 className="text-[48px] lg:text-[72px] font-bold leading-[1.05] text-black tracking-[-0.04em] uppercase">
                  Lebanon&apos;s #1 Subscription <span className="text-primary">Marketplace.</span>
                </h2>
                <p className="text-[18px] lg:text-[20px] text-[#666666] leading-[1.6] font-normal">
                  Premium streaming, gaming, and software subscriptions at unbeatable USD prices. Pay with Visa, OMT, or Whish Money - tailored for Lebanon.
                </p>
                
                {/* Payment Methods Badge */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#999999]">Pay with:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#EEEEEE]">
                      <CreditCard className="w-3.5 h-3.5 text-[#666666]" />
                      <span className="text-[10px] font-bold text-[#666666]">VISA</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#EEEEEE]">
                      <Smartphone className="w-3.5 h-3.5 text-[#666666]" />
                      <span className="text-[10px] font-bold text-[#666666]">OMT</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#EEEEEE]">
                      <Wallet className="w-3.5 h-3.5 text-[#666666]" />
                      <span className="text-[10px] font-bold text-[#666666]">WHISH</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <Link 
                    href="#subscriptions"
                    className="group flex items-center gap-4 focus:outline-none"
                  >
                    <span className="text-[12px] font-bold uppercase tracking-[2px] border-b border-primary pb-1 group-hover:text-primary transition-colors">
                      Explore Deals
                    </span>
                    <div className="w-[60px] h-[60px] bg-primary text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Plus className="w-6 h-6" />
                    </div>
                  </Link>
                </div>
            </div>

          {/* Floating Trust Badge */}
          <div className="bg-white rounded-[24px] p-6 pr-10 flex items-center gap-6 shadow-sm self-start lg:self-end transform hover:translate-y-[-5px] transition-transform duration-500 max-w-full">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#666666] mb-1">
                Trusted in Lebanon
              </span>
                <h3 className="text-[20px] font-semibold text-black leading-tight">
                  12k+ Happy Customers
                </h3>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-[8px] font-bold text-white">LB</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-[8px] font-bold text-white">AE</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">SA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footnote */}
      <div className="container mt-auto pt-20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mx-auto px-8 max-w-[1320px]">
        <div className="max-w-[600px]">
          <h2 className="text-[24px] lg:text-[32px] font-medium leading-[1.2] text-black tracking-[-0.02em]">
            Premium access doesn&apos;t have to be expensive. We bring world-class entertainment to Lebanon at local-friendly prices.
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center animate-bounce">
            <div className="w-1 h-3 bg-black rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
