"use client";

import React from 'react';
import { ShieldCheck, MessageCircle, Globe, Zap } from 'lucide-react';

const features = [
  {
    title: "Instant Delivery",
    description: "Receive your credentials immediately after payment. No waiting - start streaming in Lebanon within seconds.",
    icon: <Zap className="w-8 h-8" />,
    stats: "0.1s",
    statsLabel: "Average Delivery Time"
  },
  {
    title: "Local Payments",
    description: "Pay with Visa, OMT, or Whish Money. We accept the payment methods Lebanese customers actually use.",
    icon: <ShieldCheck className="w-8 h-8" />,
    stats: "100%",
    statsLabel: "Secure Transactions"
  },
  {
    title: "WhatsApp Support",
    description: "24/7 support via WhatsApp in Arabic & English. Real humans based in Lebanon ready to help anytime.",
    icon: <MessageCircle className="w-8 h-8" />,
    stats: "24/7",
    statsLabel: "Lebanese Support"
  }
];

export default function Features() {
  return (
    <section id="features" className="bg-[#F8F8F8] py-[140px] px-8 md:px-0">
      <div className="container mx-auto max-w-[1320px]">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div className="md:w-[25%]">
            <div className="relative w-[100px] h-[100px] mb-8">
              {/* Luxury Badge */}
              <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#666666]">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] uppercase tracking-[1px] font-semibold">
                    <textPath href="#circlePath">
                      Lebanon &bull; Trusted &bull; Fast &bull; Secure &bull;
                    </textPath>
                  </text>
                </svg>
              </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
              </div>
              <p className="text-[#666666] text-[16px] leading-[1.6]">
                Built specifically for the Lebanese market with global standards.
              </p>
            </div>

            <div className="md:w-[65%]">
              <h2 className="text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#000000] uppercase">
                How <span className="text-primary">BundlyPlus</span> Works— Premium entertainment made accessible for Lebanon.
              </h2>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[30px] items-stretch">
            
            {/* Feature Cards */}
            {features.map((feature, index) => (
              <div key={index} className="md:col-span-4 bg-white rounded-[24px] p-10 flex flex-col justify-between hover:shadow-lg transition-all duration-500 border border-transparent hover:border-primary/10 group">
                <div>
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-[24px] font-bold text-black uppercase mb-4">{feature.title}</h3>
                  <p className="text-[#666666] text-[16px] leading-[1.6]">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-12 pt-8 border-t border-[#EEEEEE]">
                  <h4 className="text-[48px] font-bold text-black tracking-tighter group-hover:text-primary transition-colors">{feature.stats}</h4>
                  <p className="text-[12px] font-bold uppercase tracking-[1px] text-primary/60">
                    {feature.statsLabel}
                  </p>
                </div>
              </div>
            ))}

          </div>
      </div>
    </section>
  );
}
