'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { navLinks } from '@/constants';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isHeroSection, setIsHeroSection] = useState(true);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      // Determine if we're in the hero section (approximately first screen)
      const isInHeroSection = currentScrollY < window.innerHeight;
      setIsHeroSection(isInHeroSection && pathname === `/${locale}`);
      
      // Set scrolled state
      const hasScrolled = currentScrollY > 10;
      setScrolled(hasScrolled);
      
      // Hide/show navbar based on scroll direction and amount
      if (currentScrollY > 100) {
        if (scrollDirection === 'down' && !isHidden) {
          setIsHidden(true);
        } else if (scrollDirection === 'up' && isHidden) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHidden, scrollDirection, pathname, locale]);

  // Check if link is active
  const isLinkActive = (url: string) => {
    // Handle home page special case
    if (url === '/') {
      return pathname === `/${locale}` || pathname === '/';
    }
    
    // For other pages - make sure we match exactly the current section
    if (url === '/about') {
      return pathname.startsWith(`/${locale}/about`);
    }
    
    // Other pages
    return pathname.startsWith(`/${locale}${url}`);
  };
  

  // Check if we're on the homepage
  const isHomePage = pathname === `/${locale}` || pathname === '/';

  const getNavbarClass = () => {
    let classes = 'fixed w-full top-0 z-50 transition-all duration-300 ';
    
    // Add transform class for hiding/showing
    classes += isHidden ? 'transform -translate-y-full ' : 'transform translate-y-0 ';
    
    // Add appropriate background based on scroll position and section
    if (isHomePage && isHeroSection && !scrolled) {
      // On homepage hero section and at the top - transparent with blur
      classes += 'bg-transparent backdrop-blur-md bg-black/10 py-5 ';
    } else if (isHomePage && isHeroSection && scrolled) {
      // On homepage hero section but scrolled down - more opaque blur
      classes += 'bg-black/30 backdrop-blur-md shadow py-3 ';
    } else {
      // Not in hero section or not homepage - white background
      classes += scrolled ? 'bg-white shadow py-3 ' : 'bg-white py-5 ';
    }
    
    return classes;
  };

  const getLinkTextColor = (active: boolean) => {
    if (active) {
      return 'text-[#C19434] font-semibold';
    }
    
    if (isHomePage && isHeroSection) {
      return 'text-white hover:text-[#C19434]';
    }
    
    return 'text-gray-800 hover:text-[#C19434]';
  };

  return (
    <header className={getNavbarClass()}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" locale={locale}>
              <div className="relative h-24 w-72">
                <Image 
                  src="/images/logo-removebg-preview.png" 
                  alt="Golden Mix" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Middle - Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.url);
              return (
                <Link 
                  key={link.id}
                  href={link.url}
                  locale={locale}
                  className={`text-lg font-medium transition-colors ${getLinkTextColor(active)} relative group`}
                >
                  {locale === 'en' ? link.titleEn : link.titleAr}
                  <span 
                    className={`absolute left-0 bottom-[-4px] h-[2px] bg-[#C19434] transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Right - Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-5">
            <Link 
              href="/contact" 
              locale={locale}
              className="bg-[#C19434] hover:bg-[#A17A20] text-white px-5 py-2.5 rounded-xl text-base font-medium transition-all duration-300 shadow"
            >
              {t('getQuote')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-full transition-all duration-300 ${
              isHomePage && isHeroSection 
                ? 'text-white hover:bg-white/10' 
                : 'text-[#C19434] hover:bg-gray-100'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed top-[84px] left-0 w-full h-[calc(100vh-84px)] transition-all duration-500 ease-in-out transform ${
          isHomePage && isHeroSection 
            ? 'bg-black/80 backdrop-blur-md' 
            : 'bg-white'
        } ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
        style={{
          boxShadow: isMenuOpen ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col items-center justify-center gap-7 py-10">
            {navLinks.map((link) => {
              const active = isLinkActive(link.url);
              return (
                <Link 
                  key={link.id}
                  href={link.url}
                  locale={locale}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-all duration-300 py-2 text-xl font-medium ${
                    active 
                      ? 'text-[#C19434] font-semibold' 
                      : isHomePage && isHeroSection 
                        ? 'text-white hover:text-[#C19434]' 
                        : 'text-gray-800 hover:text-[#C19434]'
                  }`}
                >
                  {locale === 'en' ? link.titleEn : link.titleAr}
                  {active && (
                    <span className="block h-[2px] bg-[#C19434] mt-1 w-full"></span>
                  )}
                </Link>
              );
            })}
            <div className="pt-6 w-full max-w-xs">
              <Link 
                href="/contact"
                locale={locale}
                onClick={() => setIsMenuOpen(false)}
                className={`bg-[#C19434] hover:bg-[#A17A20] text-white py-3 px-7 rounded-xl text-lg font-medium transition-all duration-300 shadow w-full block text-center ${
                  isLinkActive('/contact') ? 'bg-[#A17A20]' : ''
                }`}
              >
                {t('getQuote')}
              </Link>
            </div>
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;