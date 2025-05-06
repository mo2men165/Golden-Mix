'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

const ReadyMixConcreteSolutions = () => {
  const t = useTranslations('readymix');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const hexagonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.1,
      transition: {
        duration: 1.2,
        ease: "backOut"
      }
    }
  };

  // Features list - index based
  const featuresCount = 5;
  const features = Array.from({ length: featuresCount }, (_, i) => `feature${i + 1}`);

  return (
    <section className="py-16 md:pt-50 pt-40 md:py-24 bg-gray-50 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative elements */}
      <motion.div 
        className={`absolute top-20 ${isRtl ? 'left-10' : 'right-10'} w-64 h-64 bg-[var(--golden)] opacity-5 rotate-45`}
        variants={hexagonVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.div 
        className={`absolute bottom-20 ${isRtl ? 'right-10' : 'left-10'} w-32 h-32 bg-[var(--golden)] opacity-10 rotate-45`}
        variants={hexagonVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      <div className="container max-w-7xl mx-auto px-4">
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
                    {t('subtitle')}
                  </motion.p>
                  <motion.h2
                    className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 heading-underline relative inline-block"
                    variants={itemVariants}
                  >
                    {t('title')}
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

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((featureKey, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[var(--golden)] opacity-20 rotate-45 mr-4 flex-shrink-0" />
                <h3 className="text-xl font-bold">{t(featureKey)}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/contact" className="inline-block">
            <motion.button
              className="px-8 py-3 bg-[var(--golden)] cursor-pointer hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cta')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReadyMixConcreteSolutions;