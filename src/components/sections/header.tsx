import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Header Component
 * Features:
 * - Sticky navigation bar with scroll effect
 * - Responsive design (mobile toggle icon)
 * - Navigation links with premium scroll effect
 * - Contact email and premium "hamburger" icon
 * - Floka logo (Left)
 */

export default function Header() {
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
    { label: 'Pages', href: '#pages' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ease-in-out ${
        isSticky ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-8 max-w-[1320px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/70c7793a-9472-4c47-8fca-04aa1958d84c-floka-casethemes-net/assets/images/Logo-1.png"
                alt="Floka Logo"
                width={134}
                height={36}
                className="h-[36px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center flex-grow">
            <ul className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-black uppercase tracking-[1px] hover:opacity-70 transition-opacity duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section: Email + Toggle */}
          <div className="flex items-center space-x-10">
            <div className="hidden md:block">
              <a
                href="mailto:info@floka.com"
                className="text-sm font-medium text-black hover:opacity-70 transition-opacity duration-300"
              >
                info@floka.com
              </a>
            </div>

            {/* Custom Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative flex flex-col items-end justify-between w-[30px] h-[10px] focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className="w-full h-[1px] bg-black transition-all duration-300"></span>
              <span className="w-[14px] h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              <div className="absolute -top-1 -right-4 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[4px] leading-none mb-[2px]">.</span>
                <span className="text-[4px] leading-none mb-[2px]">.</span>
                <span className="text-[4px] leading-none">.</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (simplified) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 py-6 px-8 shadow-xl animate-in fade-in slide-in-from-top-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-black uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-gray-100">
              <a href="mailto:info@floka.com" className="text-gray-500">
                info@floka.com
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}