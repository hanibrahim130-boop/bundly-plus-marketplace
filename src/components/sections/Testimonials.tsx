"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    author: "Hassan El-Khoury",
    role: "Beirut, Lebanon",
    rating: 5,
    quote: "BundlyPlus has saved me hundreds on my streaming subscriptions. Paid with OMT, delivery was instant. The WhatsApp support team is incredible!",
    tag: "BEST PRICE GUARANTEE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    author: "Maya Nassar",
    role: "Tripoli, Lebanon",
    rating: 5,
    quote: "Finally a service that accepts Whish Money! I've been using their Spotify and Netflix for 6 months now without a single issue.",
    tag: "LEBANESE VERIFIED",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
  },
  {
    author: "Karim Haddad",
    role: "Jounieh, Lebanon",
    rating: 5,
    quote: "The gaming deals are insane. Got my PS Plus and Game Pass for a fraction of the cost. Perfect for us in Lebanon. 10/10 service.",
    tag: "GAMING PARADISE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-[#F8F8F8] py-[140px]">
      <div className="container mx-auto px-8 max-w-[1320px]">
        {/* Header Metadata */}
        <div className="mb-12">
          <span className="text-[12px] font-semibold text-black uppercase tracking-[2px]">
            USER REVIEWS
          </span>
          <div className="h-[1px] bg-[#EEEEEE] w-full mt-4"></div>
        </div>

          {/* Hero Text */}
          <div className="flex flex-col lg:flex-row justify-end items-start mb-24">
            <div className="lg:w-2/3">
              <h2 className="text-[48px] md:text-[56px] font-semibold leading-[1.1] text-black tracking-[-0.04em] relative uppercase">
                What our Lebanese community says about their experience. 
                <span className="inline-flex items-center mx-4 gap-[-8px]">
                  {testimonials.map((t, i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-white relative overflow-hidden grayscale ${i > 0 ? '-ml-4' : ''}`}>
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                    </div>
                  ))}
                </span>
                Trusted by thousands across Lebanon &amp; the Middle East.
              </h2>
            </div>
          </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col gap-6">
              {/* Top Card: Author Info */}
              <div className="bg-white rounded-[24px] p-10 flex flex-col justify-between min-h-[120px]">
                <h6 className="text-[20px] font-bold text-black leading-tight uppercase">
                  {testimonial.author}
                </h6>
                <p className="text-[14px] text-[#666666] mt-1 font-medium">
                  {testimonial.role}
                </p>
              </div>

                {/* Bottom Card: Quote */}
                <div className="bg-white rounded-[24px] p-10 flex flex-col gap-8 flex-grow">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FF4F01" color="#FF4F01" />
                    ))}
                  </div>
                
                <p className="text-[18px] leading-[1.6] text-black font-normal">
                  &quot; {testimonial.quote} &quot;
                </p>

                <div className="mt-auto">
                  <span className="text-[11px] font-bold text-[#666666] uppercase tracking-[1px]">
                    {testimonial.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
