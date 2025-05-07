'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import motion with no SSR to avoid hydration issues
const MotionDiv = dynamic(() => 
  import('framer-motion').then((mod) => mod.motion.div), 
  { ssr: false }
);

// Create a non-animated version for mobile with proper TypeScript types
interface StaticDivProps {
  children: React.ReactNode;
  className?: string;
}

const StaticDiv: React.FC<StaticDivProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const PartnersSection = () => {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR
  const [isClient, setIsClient] = useState(false);

  // Check device only after component mounts
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple animation variants (only used on desktop)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

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

  // Choose which component to use based on device
  // Choose which component to use based on device and client-side rendering status
  const Component: React.ElementType = (!isClient || isMobile) ? StaticDiv : MotionDiv;

  // Simplified background with inline styles to avoid CSS module issues
  const backgroundStyle = {
    backgroundImage: 'linear-gradient(45deg, var(--golden) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
    opacity: 0.1
  };

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* No complex SVG backgrounds, just a simple pattern */}
      {!isMobile && isClient && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={backgroundStyle}></div>
      )}
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Static heading section for better performance */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-[var(--golden)] font-medium mb-2"
            variants={itemVariants}
          >
            {t('subheading')}
          </motion.p>
          <motion.h2
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 heading-underline relative inline-block"
            variants={itemVariants}
          >
            {t('heading')}
            <span className="text-[var(--golden)]"> {t('headingHighlight')}</span>
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[var(--golden)]"
              initial={{ width: 0, left: isRtl ? '70%' : '30%' }}
              whileInView={{ width: 80, left: '50%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <Component
              key={partner.id}
              className="rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col items-center bg-white h-full"
              // Only apply variants to MotionDiv
              {...(!isMobile && isClient ? {
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-50px" },
                variants: itemVariants,
                transition: { delay: Math.min(index * 0.1, 0.3) }
              } : {})}
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
            </Component>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;