'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  nameAr: string;
  logo: string;
  description: string;
}

const PartnersSection: React.FC = () => {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check device on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define animation variants with proper TypeScript typing
  const containerVariants: Variants = prefersReducedMotion || isMobile 
    ? { 
        visible: { opacity: 1 }, 
        hidden: { opacity: 1 } 
      }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      };

  const itemVariants: Variants = prefersReducedMotion || isMobile
    ? { 
        visible: { opacity: 1 }, 
        hidden: { opacity: 1 } 
      }
    : {
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      };

  const partnerVariants: Variants = prefersReducedMotion || isMobile
    ? { 
        visible: { opacity: 1 }, 
        hidden: { opacity: 1 } 
      }
    : {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: "easeOut",
          },
        },
        hover: {
          scale: 1.03,
          y: -5,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
      };

  const partners: Partner[] = [
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
      {/* Only render the background patterns on non-mobile devices */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
          {/* Simplified Diagonal Lines Pattern with reduced opacity */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(45deg, var(--golden) 1px, transparent 1px)', 
            backgroundSize: '80px 80px', // Larger pattern size
            opacity: 0.3
          }} />
          
          {/* Simplified dotted pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(var(--golden) 1px, transparent 1px)',
            backgroundSize: '40px 40px', // Larger pattern size
            opacity: 0.05
          }} />
        </div>
      )}
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
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
            {!isMobile && (
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[var(--golden)]"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              />
            )}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col items-center bg-white h-full"
              variants={partnerVariants}
              whileHover={!isMobile ? "hover" : undefined}
              // Reduce the number of concurrent animations
              transition={{ delay: isMobile ? 0 : Math.min(index, 3) * 0.1 }}
            >
              <div className="w-full h-40 md:h-56 relative mb-0 bg-gray-700 p-4 md:p-8 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={isRtl ? partner.nameAr : partner.name}
                  width={200}
                  height={150}
                  className="object-contain max-h-full"
                  loading={index < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="bg-white w-full p-6 flex flex-col items-center flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 font-playfair text-center">
                  {isRtl ? partner.nameAr : partner.name}
                </h3>
                
                <div className="w-12 h-1 bg-[var(--golden)] mb-3" />
                
                <p className="text-gray-600 text-center text-sm md:text-base">
                  {t(partner.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;