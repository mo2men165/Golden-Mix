'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <section className="py-16 md:py-24 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
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
                  <span className="font-medium">{t('taxNumber')}:</span>
                  <span>761 / 827 / 684</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('registrationNumber')}:</span>
                  <span>37167</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('activityDate')}:</span>
                  <span>07/04/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('activityType')}:</span>
                  <span>{t('concreteManufacturing')}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/tax.png"
                    alt={t('taxCardImage')}
                    fill
                    className="object-contain"
                  />
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
                  <span className="font-medium">{t('registerNumber')}:</span>
                  <span>T.C.: 684 / 827 / 761</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('brand')}:</span>
                  <span>Golden Mix Ready Mix</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('registrationDate')}:</span>
                  <span>17/04/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t('businessType')}:</span>
                  <span>{t('limitedLiability')}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/commercial.png"
                    alt={t('commercialRegisterImage')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Company Address */}
        <motion.div
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-16"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-playfair flex items-center">
              <span className="text-[var(--golden)] mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              {t('locationsTitle')}
            </h3>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="font-medium text-lg mb-2">{t('headquartersAddress')}</h4>
                <p>{t('headquartersAddressText')}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-2">{t('plantLocations')}</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t('plantLocation1')}</li>
                  <li>{t('plantLocation2')}</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="text-[var(--golden)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <a href="tel:+201007899995" className="hover:text-[var(--golden)] transition-colors">+201007899995</a>
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--golden)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <a href="tel:+20111177775" className="hover:text-[var(--golden)] transition-colors">+20111177775</a>
                </div>
                <div className="flex items-center">
                  <span className="text-[var(--golden)] mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <a href="mailto:golenmix244@gmail.com" className="hover:text-[var(--golden)] transition-colors">golenmix244@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Bank Account Info */}
        <motion.div
          className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-playfair flex items-center">
              <span className="text-[var(--golden)] mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
              {t('bankAccountTitle')}
            </h3>
            
            <div className="space-y-3 text-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
                <div>
                  <span className="font-medium block">{t('bankName')}</span>
                  <span>CIB {t('commercialInternationalBank')}</span>
                </div>
                <div>
                  <span className="font-medium block">{t('branchName')}</span>
                  <span>Public Sodic Strip - code 150</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <span className="font-medium block">{t('accountNumber')}</span>
                  <span>100065350461</span>
                </div>
                <div className="lg:col-span-2">
                  <span className="font-medium block">IBAN</span>
                  <span className="text-sm lg:text-base break-all">EG740010015000000100065350461</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyRegistration;