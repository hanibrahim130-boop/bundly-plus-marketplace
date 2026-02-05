"use client";

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappNumber = "96170123456";
  const defaultMessage = encodeURIComponent("Hi! I'm interested in BundlyPlus subscriptions.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="flex items-center justify-center w-14 h-14">
        <MessageCircle className="w-6 h-6" />
      </div>
      <span 
        className={`pr-5 font-bold text-[12px] uppercase tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isHovered ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
        }`}
      >
        Chat with us
      </span>
    </a>
  );
}
