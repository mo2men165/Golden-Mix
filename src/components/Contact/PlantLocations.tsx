'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Building, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';

// Define location interface
interface PlantLocationType {
  id: number;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  image: string;
  mapUrl: string;
}

const PlantLocations: React.FC = () => {
  const t = useTranslations('plantLocations');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Plant locations data
  const plantLocations: PlantLocationType[] = [
    {
      id: 1,
      name: "Alexandria Desert Road Plant",
      nameAr: "محطة طريق اسكندرية الصحراوي",
      address: "Kilometer 40, Alexandria Desert Road, in front of Cairo International Airport entrance after Dandy Mall, inside Lugar project of Genesis Real Estate Development",
      addressAr: "الكيلو 40 طريق اسكندريه الصحراوى امام مدخل مطار سفينكس الدولى بعد دالعه طريق الضبعيه داخل مشروع لوجار التابع لشركة جينسس للتطوير العقاري",
      image: "/images/alexandria-road.png",
      mapUrl: "https://maps.google.com/?q=30.1006667,30.8722083"
    },
    {
      id: 2,
      name: "North Coast Road Plant",
      nameAr: "محطة طريق الساحل الشمالي",
      address: "North Coast Road, Kilometer 205, LYV Project of Gates Real Estate Development, next to Mountain View, Ras El-Hekma.",
      addressAr: "طريق الساحل الشمالي، الكيلو 205، مشروع ليف (LYV) التابع لشركة جيتس للتطوير العقاري، بجوار ماونتن فيو، رأس الحكمة.",
      image: "/images/north-coast.png",
      mapUrl: "https://maps.app.goo.gl/j4HteJ146hwpfLxs9"
    }
  ];
  
  // State for active location
  const [activeLocation, setActiveLocation] = useState<number>(0);
  
  // Handle navigation
  const handlePrevious = () => {
    setActiveLocation(prev => (prev === 0 ? plantLocations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveLocation(prev => (prev === plantLocations.length - 1 ? 0 : prev + 1));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const currentLocation = plantLocations[activeLocation];
  
  return (
    <section className="py-16 bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
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
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Plant Image */}
          <motion.div
            className="lg:col-span-2 relative h-[350px] rounded-xl overflow-hidden shadow-xl"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src={currentLocation.image}
              alt={isRtl ? currentLocation.nameAr : currentLocation.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-white text-sm font-medium bg-[var(--golden)] px-3 py-1 rounded-full inline-block mb-3">
                {t('plantLabel')}
              </span>
              <h3 className="text-white text-xl md:text-2xl font-bold">
                {isRtl ? currentLocation.nameAr : currentLocation.name}
              </h3>
            </div>
          </motion.div>
          
          {/* Plant Details */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Building size={24} className="text-[var(--golden)] mr-3" />
                {isRtl ? currentLocation.nameAr : currentLocation.name}
              </h3>
              
              <div className="mb-6">
                <div className="flex mb-4">
                  <div className="w-10 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[var(--golden)]/10 flex items-center justify-center">
                      <MapPin size={16} className="text-[var(--golden)]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm mb-1">{t('addressLabel')}</p>
                    <p className="font-medium text-gray-800">
                      {isRtl ? currentLocation.addressAr : currentLocation.address}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <motion.a
                    href={currentLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('directionsButton')}
                    <ExternalLink size={16} className="ml-2" />
                  </motion.a>
                </div>
                
                <div className="flex gap-2">
                  <p className="text-sm text-gray-500 mt-2 mr-2">
                    {t('plantCount', { 
                      current: activeLocation + 1, 
                      total: plantLocations.length 
                    })}
                  </p>
                  
                  <motion.button
                    onClick={handlePrevious}
                    className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-700"
                    whileHover={{ scale: 1.1, backgroundColor: '#F3F4F6' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-[var(--golden)] shadow-sm flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--golden-dark)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Plant Thumbnails */}
        <motion.div
          className="flex justify-center mt-8 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plantLocations.map((location, index) => (
            <motion.button
              key={location.id}
              onClick={() => setActiveLocation(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                activeLocation === index
                  ? 'border-[var(--golden)] scale-110'
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
            >
              <Image
                src={location.image}
                alt={isRtl ? location.nameAr : location.name}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlantLocations;