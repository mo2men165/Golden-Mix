'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const IntroductionSection: React.FC = () => {
  const t = useTranslations('introduction');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Animation variants
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
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function
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
    <section className="py-16 md:py-24 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left side - content */}
          <div className="md:w-1/2">
            <motion.h2 
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 heading-underline"
              variants={itemVariants}
            >
              {t('title')}
              <span className="text-[var(--golden)]"> {t('titleHighlight')}</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {t('paragraph1')}
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {t('paragraph2')}
            </motion.p>
            
            <motion.div
              className="grid grid-cols-2 gap-5 mb-8"
              variants={itemVariants}
            >
              <motion.div
                className={`bg-gray-50 p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                variants={statItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--golden)] font-bold text-3xl">{t('stat1Value')}</p>
                <p className="text-gray-600 text-sm">{t('stat1Label')}</p>
              </motion.div>
              <motion.div
                className={`bg-gray-50 p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                variants={statItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--golden)] font-bold text-3xl">{t('stat2Value')}</p>
                <p className="text-gray-600 text-sm">{t('stat2Label')}</p>
              </motion.div>
              <motion.div
                className={`bg-gray-50 p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                variants={statItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--golden)] font-bold text-3xl">{t('stat3Value')}</p>
                <p className="text-gray-600 text-sm">{t('stat3Label')}</p>
              </motion.div>
              <motion.div
                className={`bg-gray-50 p-4 rounded-lg shadow-sm ${isRtl ? 'border-r-4' : 'border-l-4'} border-[var(--golden)]`}
                variants={statItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--golden)] font-bold text-3xl">{t('stat4Value')}</p>
                <p className="text-gray-600 text-sm">{t('stat4Label')}</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant='outline' href='/about' className='px-6 py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg'>
              {t('aboutButton')}
              </Button>
            </motion.div>
          </div>
          
          {/* Right side - overlapping images */}
          <motion.div 
            className="md:w-1/2 relative"
            variants={imageContainerVariants}
          >
            <div className="relative h-[500px]">
              {/* Decorative elements */}
              <motion.div 
                className={`absolute -top-20 ${isRtl ? '-right-4' : '-left-4'} w-20 h-20 bg-[var(--golden)] opacity-60 ${isRtl ? 'rounded-tr-lg' : 'rounded-tl-lg'} z-10`}
                variants={decorativeElementVariants}
              />
              <motion.div 
                className={`absolute bottom-[-70] ${isRtl ? 'left-[-130]' : 'right-[-130]'} w-20 h-20 bg-gray-800 opacity-60 ${isRtl ? 'rounded-bl-lg' : 'rounded-br-lg'} z-10`}
                variants={decorativeElementVariants}
              />
              
              {/* Back image - adjust position for RTL */}
              <motion.div 
                className={`absolute -top-10 ${isRtl ? 'right-10' : 'left-0'} w-4/5 h-[350px] rounded-lg overflow-hidden shadow-xl`}
                variants={imageVariants}
              >
                <Image 
                  src="/images/concrete-plant.png" 
                  alt="Golden Mix Concrete Plant" 
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </motion.div>
              
              {/* Front image - adjust position for RTL */}
              <motion.div 
                className={`absolute bottom-[-20] ${isRtl ? 'left-[-180]' : 'right-[-100]'} w-4/5 h-[300px] rounded-lg overflow-hidden shadow-xl`}
                variants={imageVariants}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Image 
                  src="/images/concrete-plant2.png" 
                  alt="Golden Mix Concrete Mixer Trucks" 
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionSection;