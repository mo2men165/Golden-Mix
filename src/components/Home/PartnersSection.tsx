'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Client-side only code
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set mounted after a small delay to allow for smooth transitions
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const partners = [
    {
      id: 1,
      name: "Gates",
      nameAr: "جيتس",
      logo: "/images/gates2-removebg-preview.png",
      description: "partnerGatesDescription",
    },
    {
      id: 2,
      name: "Nabny",
      nameAr: "نبني",
      logo: "/images/nabny.png",
      description: "partnerNabnyDescription",
    },
    {
      id: 3,
      name: "Alostaz",
      nameAr: "الأستاذ",
      logo: "/images/alostaz-removebg-preview.png",
      description: "partnerUstazDescription",
    },
    {
      id: 4,
      name: "Zaya Developments",
      nameAr: "زايا للتطوير",
      logo: "/images/zaya-removebg-preview.png",
      description: "partnerZayaDescription",
    },
    {
      id: 5,
      name: "AFAAQ Developments",
      nameAr: "آفاق للتطوير",
      logo: "/images/afaaq-logo.webp", 
      description: "partnerAfaaqDescription",
    },
    {
      id: 6,
      name: "Madaen Group",
      nameAr: "مجموعة مدائن",
      logo: "/images/madaen.webp",
      description: "partnerMadaenDescription",
    },
    {
      id: 7,
      name: "Tatweer Misr",
      nameAr: "تطوير مصر",
      logo: "/images/tatweer.png",
      description: "partnerTatweerDescription",
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Simple background pattern only on desktop */}
      {!isMobile && isClient && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(45deg, var(--golden) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
      )}
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-opacity duration-500 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[var(--golden)] font-medium mb-2">
            {t('subheading')}
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            {t('heading')}
            <span className="text-[var(--golden)]"> {t('headingHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col items-center bg-white h-full transition-all duration-500 ease-in-out ${
                mounted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              // Using CSS variables for delay to avoid the animation/animationDelay conflict
              style={{
                '--delay': `${Math.min(index * 0.1, 0.7)}s`,
                transitionDelay: mounted ? 'var(--delay)' : '0s'
              } as React.CSSProperties}
            >
              <div className="w-full h-40 md:h-48 relative mb-0 bg-gray-700 p-4 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={isRtl ? partner.nameAr : partner.name}
                    width={160}
                    height={100}
                    className="object-contain max-w-full max-h-full"
                    loading={index < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              
              <div className="bg-white w-full p-6 flex flex-col items-center flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 font-playfair text-center">
                  {isRtl ? partner.nameAr : partner.name}
                </h3>
                
                <div className="w-12 h-1 bg-[var(--golden)] mb-3"></div>
                
                <p className="text-gray-600 text-center text-sm md:text-base">
                  {t(partner.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;