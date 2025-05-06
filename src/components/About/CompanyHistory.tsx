'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CompanyHistory: React.FC = () => {
  const t = useTranslations('history');
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

  const decorElementVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "backOut",
      },
    },
  };

  // Equipment list based on screenshot
  const equipment = [
    { name: "concretePump", count: 5 },
    { name: "concreteMixer", count: 20 },
    { name: "loader", count: 4 },
    { name: "quartzonTruck", count: 3 },
    { name: "doubleCapTruck", count: 3 }
  ];

  return (
    <section className="py-16 pt-50 md:py-24 md:pt-36 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Honeycomb Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 26.6L60 30 45 56.6 30 60 15 33.4 0 30 15 3.4z' fill='%23DBA628' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }} />
        
        {/* Top Right Corner Design */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M100,0 C80,40 60,60 0,100 L0,0 Z" 
              fill="var(--golden)" 
              fillOpacity="0.2"
            />
          </svg>
        </motion.div>
        
        {/* Bottom Left Corner Design */}
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,100 C40,80 60,40 100,0 L100,100 Z" 
              fill="var(--golden)" 
              fillOpacity="0.2"
            />
          </svg>
        </motion.div>
        
        {/* Circle Accents */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[var(--golden)] opacity-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 1.0 }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[var(--golden)] opacity-15"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
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
        </motion.div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 font-playfair"
              variants={itemVariants}
            >
              {t('overviewTitle')}
            </motion.h3>
            
            <motion.div 
              className="w-20 h-1 bg-[var(--golden)] mb-6"
              variants={itemVariants}
            />
            
            <motion.p
              className="text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {t('overview1')}
            </motion.p>
            
            <motion.p
              className="text-gray-700 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {t('overview2')}
            </motion.p>
            
            <motion.ul className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.li 
                  key={item} 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="min-w-[24px] h-6 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--golden)]"></div>
                  </div>
                  <p className="text-gray-700 ml-4">{t(`keyPoint${item}`)}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div
            className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Image 
              src="/images/crew2.png" 
              alt="Golden Mix History" 
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex flex-wrap gap-4">
                <div className="bg-[var(--golden)] rounded-lg p-4 text-center text-white min-w-[100px]">
                  <p className="text-3xl font-bold">40+</p>
                  <p className="text-sm">{t('yearsExperience')}</p>
                </div>
                
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center text-golden-dark min-w-[100px]">
                  <p className="text-3xl font-bold">1B+</p>
                  <p className="text-sm">{t('egyptianPounds')}</p>
                </div>
                
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center text-golden-dark min-w-[100px]">
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-sm">{t('projectsCompleted')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Equipment Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 font-playfair text-center"
            variants={itemVariants}
          >
            {t('equipmentTitle')}
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {equipment.map((item, index) => (
              <motion.div
                key={item.name}
                className="bg-gray-50 rounded-lg shadow-md p-6 text-center border border-gray-200"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl font-bold text-[var(--golden)] mb-2">
                  {item.count}
                </div>
                <div className="text-gray-700 font-medium">
                  {t(item.name)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <motion.div
            className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--golden)] bg-opacity-10 flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--golden)] text-white flex items-center justify-center font-bold text-xl">
                M
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">{t('missionTitle')}</h3>
            <p className="text-gray-700 leading-relaxed">{t('missionText')}</p>
          </motion.div>
          
          <motion.div
            className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-100"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-[var(--golden)] bg-opacity-10 flex items-center justify-center mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--golden)] text-white flex items-center justify-center font-bold text-xl">
                V
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-playfair">{t('visionTitle')}</h3>
            <p className="text-gray-700 leading-relaxed">{t('visionText')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;