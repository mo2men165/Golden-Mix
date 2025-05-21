'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building, Layers, Truck, Package } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const FeaturedServicesSection: React.FC = () => {
  const t = useTranslations('services');
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      }
    },
    hover: {
      y: -12,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.4,
        ease: "easeOut", 
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      }
    },
    hover: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };
  
  const services = [
    {
      id: 1,
      icon: <Truck size={40} />,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      image: '/images/concrete-mixer.png',
      titleKey: 'readyMixTitle',
      descriptionKey: 'readyMixDescription',
    },
    {
      id: 2,
      icon: <Layers size={40} />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      image: '/images/interlock.jpg',
      titleKey: 'interlockTitle',
      descriptionKey: 'interlockDescription',
    },
    {
      id: 3,
      icon: <Building size={40} />,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      image: '/images/precast.jpg',
      titleKey: 'precastTitle',
      descriptionKey: 'precastDescription',
    },
    {
      id: 4,
      icon: <Package size={40} />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      image: '/images/Cement-blocks.jpg',
      titleKey: 'cementBlocksTitle',
      descriptionKey: 'cementBlocksDescription',
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden relative">
      {/* Creative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dotted Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `radial-gradient(var(--golden) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Flowing Lines */}
        <svg className="absolute top-0 inset-x-0 w-full opacity-30" height="70" viewBox="0 0 1200 70" preserveAspectRatio="none">
          <motion.path 
            d="M0,0 C200,40 400,0 600,30 C800,60 1000,20 1200,0 V70 H0 Z" 
            fill="none" 
            stroke="var(--golden)" 
            strokeWidth="1.5" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,30 C150,10 350,40 600,20 C850,0 1050,40 1200,20" 
            fill="none" 
            stroke="var(--golden)" 
            strokeWidth="1" 
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Bottom Flowing Lines */}
        <svg className="absolute bottom-0 inset-x-0 w-full opacity-30" height="70" viewBox="0 0 1200 70" preserveAspectRatio="none">
          <motion.path 
            d="M0,70 C200,30 400,70 600,40 C800,10 1000,50 1200,70 V0 H0 Z" 
            fill="none" 
            stroke="var(--golden)" 
            strokeWidth="1.5" 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          <motion.path 
            d="M0,40 C150,60 350,30 600,50 C850,70 1050,30 1200,50" 
            fill="none" 
            stroke="var(--golden)" 
            strokeWidth="1" 
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Abstract Shapes */}
        <motion.div 
          className="absolute top-1/4 left-0 w-24 h-24 opacity-20"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.2, rotate: 45 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <div className="w-full h-full border-2 border-[var(--golden)] rounded-md"></div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-0 w-32 h-32 opacity-15"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.15, rotate: -30 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="w-full h-full border-2 border-[var(--golden)] rounded-full"></div>
        </motion.div>
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
          <motion.p
            className="text-lg text-gray-700 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 relative"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              dir={isRtl ? 'rtl' : 'ltr'}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              {/* Corner Accents */}
              <motion.div 
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute top-0 left-0 w-3 h-12 bg-[var(--golden)] opacity-20"></div>
                <div className="absolute top-0 left-0 h-3 w-12 bg-[var(--golden)] opacity-20"></div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute bottom-0 right-0 w-3 h-12 bg-[var(--golden)] opacity-20"></div>
                <div className="absolute bottom-0 right-0 h-3 w-12 bg-[var(--golden)] opacity-20"></div>
              </motion.div>
              
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={t(service.titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              </div>
              
              <div className="p-6 relative">
                <motion.div
                  className={`absolute -top-8 ltr:left-6 rtl:right-6 w-16 h-16 rounded-full ${service.iconBg} ${service.iconColor} flex items-center justify-center shadow-md`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {service.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3 font-playfair">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t(service.descriptionKey)}
                </p>
                
                <Link 
                  href={`/services`}
                  className="inline-flex items-center text-[var(--golden)] font-medium group"
                >
                  {t('learnMore')}
                  <motion.span 
                    className={`ltr:ml-2 rtl:mr-2 transform ${isRtl ? 'rotate-180' : ''}`}
                    initial={{ x: 0 }}
                    whileHover={{ x: isRtl ? -5 : 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
              
              {/* Service Number */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-sm text-[var(--golden)] font-medium">
                {service.id}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/services">
            <motion.button
              className="relative px-8 py-3 cursor-pointer hover:bg-golden transition-all duration-500 bg-white border border-[var(--golden)] text-[var(--golden)] font-medium rounded-lg overflow-hidden group"
              whileHover={{ boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {t('viewAllServices')}
              </span>
              <motion.div 
                className="absolute inset-0 bg-[var(--golden)]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          
          {/* Decorative Line */}
          <motion.div 
            className="w-24 h-px bg-[var(--golden)] mx-auto mt-8 opacity-50"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;