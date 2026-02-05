"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, ShoppingCart } from 'lucide-react';
import { CheckoutModal } from '@/components/CheckoutModal';
import { toast } from 'sonner';

const categories = ["All", "Gaming", "Streaming", "Software", "Gift Cards"];

interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  save?: string;
  badge?: string;
  features?: string[];
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative overflow-hidden rounded-[24px] bg-gray-200">
        <div className="aspect-[4/5] w-full" />
      </div>
      <div className="mt-6 flex justify-between items-start bg-white rounded-[20px] px-8 py-6">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
        <div className="text-right">
          <div className="h-5 bg-gray-200 rounded w-14 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Subscription | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Add mock originalPrice and save for UI consistency if not in DB
        const enhancedData = data.map((item: any) => ({
          ...item,
          originalPrice: item.originalPrice || Math.round(item.price * 2.5),
          save: item.save || `${Math.round(100 - (item.price / (item.price * 2.5)) * 100)}%`,
        }));
        setSubscriptions(enhancedData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredSubscriptions = activeCategory === "All" 
    ? subscriptions 
    : subscriptions.filter(sub => sub.category === activeCategory);

  const handleBuy = (sub: Subscription) => {
    setSelectedProduct(sub);
    setIsCheckoutOpen(true);
    toast.success(`${sub.name} added to checkout`);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat !== "All") {
      toast.info(`Showing ${cat} subscriptions`);
    }
  };

  const handleImageLoad = (id: number) => {
    setImageLoadStates(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="subscriptions" className="bg-[#F8F8F8] py-[140px]">
      <div className="container mx-auto max-w-[1320px] px-8">
        {/* Section Header */}
        <div className="mb-20">
          <div className="hairline-divider mb-10 opacity-30" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <h6 className="text-meta text-[12px] text-[#000000] font-semibold tracking-[2px] mb-4">
                MARKETPLACE
              </h6>
              <h2 className="text-[48px] font-semibold tracking-[-0.04em] text-black uppercase">
                Premium Deals
              </h2>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                    className={`text-[12px] font-bold uppercase tracking-[1px] px-6 py-2 rounded-full border transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-transparent text-[#666666] border-[#EEEEEE] hover:border-primary hover:text-primary'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {isLoading ? (
            // Show skeletons while loading
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </>
          ) : (
            filteredSubscriptions.map((sub) => (
              <div key={sub.id} className="group cursor-pointer" onClick={() => handleBuy(sub)}>
                  <div className="relative overflow-hidden rounded-[24px] bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
                    {/* Save Badge */}
                    <div className="absolute top-6 left-6 z-10 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[1px]">
                      SAVE {sub.save}
                    </div>
                    
                    <div className="aspect-[4/5] relative w-full overflow-hidden">
                      {/* Skeleton placeholder for image */}
                      {!imageLoadStates[sub.id] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                      )}
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 ${
                          imageLoadStates[sub.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(sub.id)}
                      />
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center text-primary transform scale-0 group-hover:scale-100 transition-transform duration-500">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                
                <div className="mt-6 flex justify-between items-start bg-white rounded-[20px] px-8 py-6 transition-colors duration-300 group-hover:bg-[#F1F1F1]">
                  <div>
                    <h3 className="text-[12px] font-bold tracking-[1px] uppercase text-[#000000] mb-1">
                      {sub.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-[#666666] uppercase tracking-[1px]">
                      {sub.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[18px] font-bold text-black">${sub.price}</div>
                    <div className="text-[12px] text-[#666666] line-through">${sub.originalPrice}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

          {/* More Button */}
          <div className="mt-20 flex flex-col items-center">
            <button className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105">
              <div className="w-[60px] h-[60px] bg-primary rounded-full flex items-center justify-center transition-transform duration-300 shadow-lg shadow-primary/20">
                <Plus className="text-white w-6 h-6" />
              </div>
              <span className="text-[12px] font-bold tracking-[1px] uppercase text-[#000000] group-hover:text-primary transition-colors">
                VIEW ALL DEALS
              </span>
            </button>
          </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        product={selectedProduct} 
      />
    </section>
  );
}
