'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const CompanyRegistration: React.FC = () => {
  const t = useTranslations('registration');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
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

        {/* Registration Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Tax Registration Card */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-playfair flex items-center">
                <span className="text-[var(--golden)] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                {t('taxCardTitle')}
              </h3>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">{t('companyName')}:</span>
                  <span>{t('goldenMixConcrete')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('activityType')}:</span>
                  <span>{t('concreteManufacturing')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('status')}:</span>
                  <span className="text-green-600 font-medium">{t('registered')}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Commercial Registration */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-playfair flex items-center">
                <span className="text-[var(--golden)] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                {t('commercialRegisterTitle')}
              </h3>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">{t('companyName')}:</span>
                  <span>{t('goldenMixConcrete')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('brand')}:</span>
                  <span>Golden Mix Ready Mix</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('businessType')}:</span>
                  <span>{t('limitedLiability')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('status')}:</span>
                  <span className="text-green-600 font-medium">{t('active')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyRegistration;