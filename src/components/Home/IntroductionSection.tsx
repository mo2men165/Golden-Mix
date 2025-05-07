'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const IntroductionSection: React.FC = () => {
  const t = useTranslations('introduction');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Check screen size for responsive behaviors
  useEffect(() => {
    setIsMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsSmallScreen(width < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate style properties based on screen size
  const imageContainerStyle = isMounted ? {
    maxWidth: isSmallScreen ? '90%' : (screenWidth >= 768 && screenWidth < 1280) ? '80%' : '100%',
    margin: (screenWidth >= 768 && screenWidth < 1280) ? '0 auto' : undefined
  } : {};

  // Animation variants - only applied on larger screens
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    }
  };

  const decorativeElementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "backOut",
      }
    }
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div 
          className="flex flex-col xl:flex-row gap-12 sm:gap-16 xl:gap-12 items-center"
        >
          {/* Content section - full width on smaller screens, half on xl */}
          <div className="w-full xl:w-1/2 mb-16 xl:mb-0">
            {isSmallScreen ? (
              <>
                <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 heading-underline">
                  {t('title')}
                  <span className="text-[var(--golden)]"> {t('titleHighlight')}</span>
                </h2>
                
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  {t('paragraph1')}
                </p>
                
                <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  {t('paragraph2')}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
                  <div className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}>
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat1Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat1Label')}</p>
                  </div>
                  <div className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}>
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat2Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat2Label')}</p>
                  </div>
                  <div className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}>
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat3Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat3Label')}</p>
                  </div>
                  <div className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}>
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat4Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat4Label')}</p>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-start">
                  <Button 
                    variant='outline' 
                    href='/about' 
                    className='px-5 py-2.5 sm:px-6 sm:py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg'
                  >
                    {t('aboutButton')}
                  </Button>
                </div>
              </>
            ) : (
              // Animated content for larger screens
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2 
                  className="font-playfair text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 heading-underline"
                  variants={itemVariants}
                >
                  {t('title')}
                  <span className="text-[var(--golden)]"> {t('titleHighlight')}</span>
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
                  variants={itemVariants}
                >
                  {t('paragraph1')}
                </motion.p>
                
                <motion.p 
                  className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  {t('paragraph2')}
                </motion.p>
                
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8"
                  variants={itemVariants}
                >
                  <motion.div
                    className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                    variants={statItemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat1Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat1Label')}</p>
                  </motion.div>
                  <motion.div
                    className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                    variants={statItemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat2Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat2Label')}</p>
                  </motion.div>
                  <motion.div
                    className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                    variants={statItemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat3Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat3Label')}</p>
                  </motion.div>
                  <motion.div
                    className={`bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                    variants={statItemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[var(--golden)] font-bold text-2xl sm:text-3xl">{t('stat4Value')}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{t('stat4Label')}</p>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center sm:justify-start"
                >
                  <Button 
                    variant='outline' 
                    href='/about' 
                    className='px-5 py-2.5 sm:px-6 sm:py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg'
                  >
                    {t('aboutButton')}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
          
          {/* Images section with responsive sizing */}
          <div className="w-full xl:w-1/2 relative">
            {/* Adjust width on medium screens - FIXED VERSION */}
            <div className="relative h-[250px] xs:h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px] mx-auto" 
                 style={imageContainerStyle}>
              {/* Decorative elements */}
              <div 
                className={`absolute -top-8 sm:-top-12 md:-top-16 ${isRtl ? '-right-2 sm:-right-3 md:-right-4' : '-left-2 sm:-left-3 md:-left-4'} w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 bg-[var(--golden)] opacity-60 ${isRtl ? 'rounded-tr-lg' : 'rounded-tl-lg'} z-10`}
              />
              <div 
                className={`absolute -bottom-8 sm:-bottom-12 md:-bottom-16 ${isRtl ? '-left-2 sm:-left-4 md:-left-6 lg:-left-8' : '-right-2 sm:-right-4 md:-right-6 lg:-right-8'} w-10 sm:w-12 md:w-16 lg:w-20 h-10 sm:h-12 md:h-16 lg:h-20 bg-gray-800 opacity-60 ${isRtl ? 'rounded-bl-lg' : 'rounded-br-lg'} z-10`}
              />
              
              {/* Back image with improved responsive positioning */}
              <div 
                className={`absolute top-0 ${isRtl ? 'right-2' : 'left-2'} 
                             w-3/4 h-3/5 
                             md:w-2/3 md:h-[55%] 
                             lg:w-3/4 lg:h-3/5 
                             xl:w-3/4 xl:h-3/5 
                             rounded-lg overflow-hidden shadow-xl`}
              >
                {isSmallScreen ? (
                  <Image 
                    src="/images/concrete-plant.png" 
                    alt="Golden Mix Concrete Plant" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                ) : (
                  <motion.div 
                    className="w-full h-full"
                    variants={imageContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={imageVariants} className="w-full h-full">
                      <Image 
                        src="/images/concrete-plant.png" 
                        alt="Golden Mix Concrete Plant" 
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              {/* Front image with improved responsive positioning */}
              <div 
                className={`absolute bottom-0 
                              ${isRtl ? 
                                'left-0 sm:left-0 md:left-0 lg:-left-8 xl:-left-16' : 
                                'right-0 sm:right-0 md:right-0 lg:-right-8 xl:-right-16'} 
                              w-3/4 h-3/5 
                              md:w-2/3 md:h-[55%]
                              lg:w-3/4 lg:h-3/5
                              xl:w-3/4 xl:h-3/5
                              rounded-lg overflow-hidden shadow-xl`}
              >
                {isSmallScreen ? (
                  <Image 
                    src="/images/concrete-plant2.png" 
                    alt="Golden Mix Concrete Mixer Trucks" 
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                ) : (
                  <motion.div 
                    className="w-full h-full"
                    variants={imageContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      variants={imageVariants} 
                      className="w-full h-full"
                    >
                      <Image 
                        src="/images/concrete-plant2.png" 
                        alt="Golden Mix Concrete Mixer Trucks" 
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center' }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;