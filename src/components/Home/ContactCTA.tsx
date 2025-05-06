'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactCTA: React.FC = () => {
  const t = useTranslations('contact');
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

  const infoItemVariants = {
    hidden: { opacity: 0, x: isRtl ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
      },
    },
  };

  const contactInfo = [
    {
      id: 1,
      icon: <Phone size={24} />,
      title: "phoneTitle",
      content: "+20 100 789 9995 ",
      href: "tel:+201007899995 ",
    },
    {
      id: 2,
      icon: <Mail size={24} />,
      title: "emailTitle",
      content: "golenmix244@gmail.com",
      href: "mailto:golenmix244@gmail.com",
    },
    {
      id: 3,
      icon: <MapPin size={24} />,
      title: "addressTitle",
      content: "addressContent",
      href: "https://maps.google.com",
    },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90 z-0" />
      
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat opacity-10 z-0"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      {/* Gold accent elements */}
      <motion.div 
        className="absolute top-0 ltr:left-0 rtl:right-0 w-1/3 h-1 bg-[var(--golden)]"
        initial={{ width: 0 }}
        whileInView={{ width: '33%' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      <motion.div 
        className="absolute bottom-0 ltr:right-0 rtl:left-0 w-1/3 h-1 bg-[var(--golden)]"
        initial={{ width: 0 }}
        whileInView={{ width: '33%' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Side - Content */}
          <div className="md:col-span-3">
            <motion.p
              className="text-[var(--golden)] font-medium mb-2"
              variants={itemVariants}
            >
              {t('subheading')}
            </motion.p>
            <motion.h2
              className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              {t('heading')}
              <span className="text-[var(--golden)]"> {t('headingHighlight')}</span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-300 mb-8"
              variants={itemVariants}
            >
              {t('description')}
            </motion.p>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="flex items-center text-white hover:text-[var(--golden)] transition-colors duration-300 group"
                  variants={infoItemVariants}
                  whileHover="hover"
                  custom={index}
                  target={item.id === 3 ? "_blank" : undefined}
                  rel={item.id === 3 ? "noopener noreferrer" : undefined}
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--golden)] bg-opacity-20 flex items-center justify-center mr-4 group-hover:bg-opacity-100 transition-all duration-300">
                    <div className="text-gray-950 transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-400">{t(item.title)}</p>
                    <p className="font-semibold">
                      {item.id === 3 ? t(item.content) : item.content}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="md:col-span-2">
            <motion.div 
              className="bg-white bg-opacity-10 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white border-opacity-20 shadow-xl"
              variants={itemVariants}
            >
              <h3 className="text-white text-xl font-bold mb-6 font-playfair">{t('formTitle')}</h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <input
                    type="text"
                    placeholder={t('namePlaceholder')}
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <textarea
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent"
                  ></textarea>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center mt-6"
                >
                  <button
                    type="submit"
                    className="w-full py-3 px-8 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 shadow-lg"
                  >
                    {t('sendButton')}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;