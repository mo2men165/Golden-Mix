'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LeadershipTeam: React.FC = () => {
  const t = useTranslations('leadership');
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Leadership team data
  const leaders = [
    {
      id: 1,
      nameEn: "Eng. Abdelnabi Hosni El-Hamd",
      nameAr: "م.عبدالنبي حسني الحامض",
      position: {
        en: "CEO",
        ar: "المدير التنفيذي"
      },
      image: "/images/abdelnaby.png",
    },
    {
      id: 2,
      nameEn: "Eng. Hassan Ahmed Kamel",
      nameAr: "م. حسن احمد كامل",
      position: {
        en: "Board Member",
        ar: "عضو مجلس إدارة"
      },
      image: "/images/hassan.png",
    },
    {
      id: 3,
      nameEn: "Eng. Osama Ahmed Oweis",
      nameAr: "م.أسامه أحمد عويس",
      position: {
        en: "Board Member",
        ar: "عضو مجلس إدارة"
      },
      image: "/images/osama.png",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Subtle Particle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            y: [0, -20, 0],
            transition: { 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            y: [0, -15, 0],
            transition: { 
              duration: 5,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            y: [0, -25, 0],
            transition: { 
              duration: 6,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            y: [0, -15, 0],
            transition: { 
              duration: 4.5,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
        
        <motion.div 
          className="absolute top-2/3 left-1/3 w-3 h-3 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2], 
            y: [0, -20, 0],
            transition: { 
              duration: 5.5,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-1/5 w-2 h-2 rounded-full bg-[var(--golden)]"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            y: [0, -15, 0],
            transition: { 
              duration: 4,
              delay: 2.5,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        />
      </div>
      
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

        {/* Leadership Team Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              className="relative"
              variants={cardVariants}
              whileHover="hover"
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden bg-[var(--golden)] bg-opacity-10">
                  <Image
                    src={leader.image}
                    alt={isRtl ? leader.nameAr : leader.nameEn}
                    fill
                    className="object-contain mt-9"
                  />
                  
                  {/* Golden Overlay Accent */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--golden)]/20 to-transparent"></div>
                  
                  {/* Image Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 font-playfair">
                    {isRtl ? leader.nameAr : leader.nameEn}
                  </h3>
                  
                  <p className="text-[var(--golden)] font-medium mb-4">
                    {isRtl ? leader.position.ar : leader.position.en}
                  </p>
                  
                  <div className="w-16 h-1 bg-[var(--golden)] mx-auto mb-4 opacity-80" />
                  
                  <p className="text-gray-600">
                    {t(`leaderBio.${leader.id}`)}
                  </p>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute transform rotate-45 bg-[var(--golden)] text-white shadow-lg w-24 h-8 -top-2 right-[-12px] flex items-end justify-center pb-1">
                    <span className="text-xs font-bold">{leader.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipTeam;