'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Beaker, Shield, Clock, Gauge, Award } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const CustomConcreteMixtures = () => {
  const t = useTranslations('custommixtures');
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

  const diagonalVariants = {
    hidden: { opacity: 0, x: isRtl ? 50 : -50 },
    visible: {
      opacity: 0.07,
      x: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut"
      }
    }
  };

  // Mixture types with their associated icons
  const mixtureTypes = [
    { key: 'standard', Icon: Beaker },
    { key: 'highStrength', Icon: Shield },
    { key: 'quickSetting', Icon: Clock },
    { key: 'highPerformance', Icon: Gauge },
    { key: 'certified', Icon: Award }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        variants={diagonalVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--golden)] transform -skew-y-6 origin-top-right" />
      </motion.div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            className={`${isRtl ? 'md:order-2' : ''}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl"
              variants={itemVariants}
            >
              <Image
                src="/images/mixer.png"
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <span className="text-white text-lg font-medium bg-[var(--golden)] px-4 py-2 rounded-full inline-block mb-4 max-w-max">
                  {t('imageBadge')}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                  {t('imageTitle')}
                </h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className={`${isRtl ? 'md:order-1' : ''}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
            
            {/* Mixture Types */}
            <motion.div
              className="space-y-4 mb-8"
              variants={containerVariants}
            >
              {mixtureTypes.map(({ key, Icon }, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-[var(--golden)]">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{t(`types.${key}.title`)}</h3>
                    <p className="text-gray-600 text-sm">{t(`types.${key}.description`)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
            >
              <Link href="/contact" className="inline-block">
                <motion.button
                  className="px-8 py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomConcreteMixtures;