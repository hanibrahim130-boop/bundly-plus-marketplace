"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Subscriptions', href: '#subscriptions' },
    { label: 'How it Works', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
        isSticky ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-8 max-w-[1320px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/bundly-logo1-resized-1770255544090.jpg?width=8000&height=8000&resize=contain"
                alt="BundlePlus Logo"
                width={36}
                height={36}
                className="h-[36px] w-auto object-contain rounded-lg"
                priority
              />
                <span className="text-xl font-bold tracking-tighter text-black uppercase">
                  Bundly<span className="text-primary">Plus</span>
                </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center flex-grow">
            <ul className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12px] font-bold text-black uppercase tracking-[2px] hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </nav>

            {/* Right Section: Contact + Toggle */}
            <div className="flex items-center space-x-10">
              <div className="hidden md:block">
                  {session ? (
                    <div className="flex items-center gap-4">
                      <Link
                        href="/dashboard"
                        className="text-[12px] font-bold text-black uppercase tracking-[2px] border-b border-black pb-1 hover:text-primary hover:border-primary transition-all"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] hover:text-red-500 transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => signIn()}
                      className="text-[12px] font-bold text-black uppercase tracking-[2px] border-b border-black pb-1 hover:text-primary hover:border-primary transition-all"
                    >
                      Login
                    </button>
                  )}
              </div>


            {/* Custom Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex flex-col items-end justify-between w-[30px] h-[10px] focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-full h-[1px] bg-black transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`}></span>
              <span className={`w-[14px] h-[1px] bg-black transition-all duration-300 group-hover:w-full ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-[1px] bg-black transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''} ${mobileMenuOpen ? '' : 'hidden'}`}></span>
              {!mobileMenuOpen && (
                <div className="absolute -top-1 -right-4 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[4px] leading-none mb-[2px]">.</span>
                  <span className="text-[4px] leading-none mb-[2px]">.</span>
                  <span className="text-[4px] leading-none">.</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 py-10 px-8 shadow-xl transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-black uppercase tracking-wider hover:opacity-50 transition-opacity"
              >
                {link.label}
              </Link>
            </li>
          ))}
            {session ? (
              <li className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-4">
                <Link 
                  href="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold text-black uppercase tracking-widest"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="text-left text-lg font-bold text-red-500 uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="pt-6 mt-6 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signIn();
                  }}
                  className="text-xl font-bold text-black uppercase tracking-widest"
                >
                  Login
                </button>
              </li>
            )}

        </ul>
      </div>
    </header>
  );
}
