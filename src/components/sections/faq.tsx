"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  image?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick, image }) => {
  return (
    <div className="border-b border-[#EEEEEE] last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group transition-colors duration-300"
      >
        <span className={`text-[20px] font-bold tracking-tight transition-colors duration-300 uppercase ${isOpen ? 'text-black' : 'text-black/80 hover:text-black'}`}>
          {title}
        </span>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary text-white' : 'bg-[#F1F1F1] text-black group-hover:bg-primary group-hover:text-white'}`}>
            {isOpen ? <Minus size={18} /> : <Plus size={18} />}
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {image && (
              <div className="w-full md:w-[320px] shrink-0 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={image}
                  alt={title}
                  width={320}
                  height={220}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-[#666666] text-[16px] leading-[1.6] mb-6 font-medium">
                {content}
              </p>
              <button className="flex items-center gap-3 group/btn">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white transition-transform duration-300 group-hover/btn:scale-110">
                  <Plus size={16} />
                </div>
                <span className="text-[12px] font-bold uppercase tracking-widest text-black group-hover/btn:text-primary transition-colors">Contact Support</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      title: "Is it legal and safe?",
      content: "Yes, we provide shared family plans and legitimate digital keys. Your account's safety and privacy are our top priorities. Thousands of users trust us with their digital needs.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
    },
    {
      title: "How do I receive my account?",
      content: "After a successful payment, you will receive an email with your login credentials or activation key instantly. You can also view them in your user dashboard.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    },
    {
      title: "What if the account stops working?",
      content: "All our subscriptions come with a full-term warranty. If you face any issues, our 24/7 support team will resolve it or provide a replacement within minutes.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      title: "Can I renew my subscription?",
      content: "Yes, you can easily renew your subscription through our marketplace. We'll send you a reminder before your current plan expires.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    }
  ];

  return (
    <section id="faq" className="bg-[#F8F8F8] py-[140px]">
      <div className="container mx-auto px-8 max-w-[1320px]">
        <div className="mb-14">
          <span className="text-[12px] font-bold uppercase tracking-[2px] text-black">
            FAQ & HELP CENTER
          </span>
          <div className="h-[1px] bg-[#EEEEEE] w-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] items-start">
          {/* Left Column: Image & Support Info */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-[24px] overflow-hidden image-hover-zoom shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80"
                alt="Support team"
                width={655}
                height={450}
                className="w-full aspect-[4/5] object-cover grayscale"
              />
            </div>
            
            <div className="mt-8">
              <h2 className="text-[48px] font-bold leading-[1.1] text-black mb-6 uppercase">
                Got questions? We have the answers.
              </h2>
                <p className="text-[#666666] mb-8 font-medium">
                  Can&apos;t find what you&apos;re looking for? Our team is available 24/7. {' '}
                  <a href="#" className="text-primary font-bold border-b border-primary uppercase tracking-wider hover:opacity-70 transition-opacity">
                    Let&apos;s Talk
                  </a>
                </p>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  title={faq.title}
                  content={faq.content}
                  image={faq.image}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
