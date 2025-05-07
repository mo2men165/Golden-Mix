'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Animation variants (slightly simplified for performance)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const partnerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
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

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Simplified Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-15">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--golden)] via-transparent to-[var(--golden)]" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(var(--golden) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.08
        }} />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }} // Adjusted margin
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
              transition={{ duration: 0.8, delay: 0.5 }}
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

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col items-center bg-white h-full"
              variants={partnerVariants}
              whileHover="hover"
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-full h-56 relative mb-0 bg-gray-700 p-8 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={isRtl ? partner.nameAr : partner.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Only prioritize first few images
                />
              </div>
              
              <div className="bg-white w-full p-8 flex flex-col items-center flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair text-center">
                  {isRtl ? partner.nameAr : partner.name}
                </h3>
                
                <div className="w-16 h-1 bg-[var(--golden)] mb-4" />
                
                <p className="text-gray-600 text-center mb-6">
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