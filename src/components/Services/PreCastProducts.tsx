'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const PreCastProducts = () => {
  const t = useTranslations('precast');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Product types
  const products = ['walls', 'interlock', 'curbstone', 'custom'];
  
  // State for active product
  const [activeProduct, setActiveProduct] = React.useState(0);
  
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  // Polygon background element
  const polygonBackground = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: {
        duration: 1.0
      }
    }
  };

  const handlePrevious = () => {
    setActiveProduct(prev => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProduct(prev => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background polygon elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={polygonBackground}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-[var(--golden)] rotate-[30deg]" />
        <div className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-[var(--golden)] rotate-[45deg]" />
      </motion.div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
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

        {/* Product Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Product Image */}
          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
          >
            <Image
              src={t(`products.${products[activeProduct]}.imageSrc`)}
              alt={t(`products.${products[activeProduct]}.imageAlt`)}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-white text-lg font-medium bg-[var(--golden)] px-4 py-1 rounded-full inline-block mb-4 max-w-max">
                {t(`products.${products[activeProduct]}.badge`)}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                {t(`products.${products[activeProduct]}.title`)}
              </h3>
              <p className="text-gray-200">
                {t(`products.${products[activeProduct]}.shortDescription`)}
              </p>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t(`products.${products[activeProduct]}.title`)}
              </h3>
              <p className="text-gray-700 mb-6">
                {t(`products.${products[activeProduct]}.fullDescription`)}
              </p>
              
              {/* Features List */}
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                {t('keyFeatures')}
              </h4>
              <ul className="space-y-2 mb-6">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-[var(--golden)] mr-2 mt-1">•</span>
                    <span>{t(`products.${products[activeProduct]}.features.feature${item}`)}</span>
                  </li>
                ))}
              </ul>
              
              {/* Learn More Button */}
              <Link href={`/products/${products[activeProduct]}`} className="inline-block">
                <motion.button
                  className="px-6 py-2 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('learnMore')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Products Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product, index) => (
            <motion.button
              key={product}
              onClick={() => setActiveProduct(index)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                activeProduct === index
                  ? 'bg-[var(--golden)] text-white border-[var(--golden)]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[var(--golden)]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {t(`products.${product}.tabName`)}
            </motion.button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-8 gap-4">
          <motion.button
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 border border-gray-200"
            whileHover={{ scale: 1.1, backgroundColor: '#F3F4F6' }}
            whileTap={{ scale: 0.95 }}
          >
            {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[var(--golden)] shadow-md flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, backgroundColor: 'var(--golden-dark)' }}
            whileTap={{ scale: 0.95 }}
          >
            {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PreCastProducts;