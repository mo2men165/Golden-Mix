'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getContactInfo } from '@/lib/queries';
import { ContactInfo } from '@/types/contactInfo';

interface ContactCTAProps {
  contactInfo?: ContactInfo | null;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ contactInfo: initialContactInfo }) => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(initialContactInfo || null);
  const [loading, setLoading] = useState(!initialContactInfo);

  // Fetch contact info if not provided as props
useEffect(() => {
  if (!initialContactInfo) {
    const fetchContactInfo = async () => {
      try {
        const data = await getContactInfo();
        if (data) {
          setContactInfo(data as unknown as ContactInfo);
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }
}, [initialContactInfo]);

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

  // Loading state
  if (loading) {
    return (
      <section className="py-16 md:py-20 relative overflow-hidden bg-gray-900">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <div className="h-8 bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-700 rounded w-2/3"></div>
              <div className="h-6 bg-gray-700 rounded w-full"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                      <div className="h-5 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-gray-700 p-8 rounded-xl">
                <div className="h-6 bg-gray-600 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-600 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Create contact info array from Sanity data
  const getContactInfoItems = () => {
    if (!contactInfo) return [];

    // Collect all available phone numbers
    const phoneNumbers: string[] = [
      contactInfo.phoneNumber1,
      contactInfo.phoneNumber2,
      contactInfo.phoneNumber3,
    ].filter((phone): phone is string => phone != null && phone.trim() !== '');

    return [
      {
        id: 1,
        icon: <Phone size={24} />,
        title: "phoneTitle",
        content: phoneNumbers.map(phone => ({ number: phone, href: `tel:${phone}` })),
        href: null,
      },
      {
        id: 2,
        icon: <Mail size={24} />,
        title: "emailTitle",
        content: contactInfo.email,
        href: `mailto:${contactInfo.email}`,
      },
      {
        id: 3,
        icon: <MapPin size={24} />,
        title: "addressTitle",
        content: isRtl ? contactInfo.addressAr : contactInfo.addressEn,
        href: null,
      },
    ];
  };

  const contactInfoItems = getContactInfoItems();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90 z-0" />
      
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 bg-repeat opacity-10 z-0"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      {/* Gold accent elements */}
      <motion.div 
        className={`absolute top-0 w-1/3 h-1 bg-[var(--golden)] ${isRtl ? 'right-0' : 'left-0'}`}
        initial={{ width: 0 }}
        whileInView={{ width: '33%' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      
      <motion.div 
        className={`absolute bottom-0 w-1/3 h-1 bg-[var(--golden)] ${isRtl ? 'left-0' : 'right-0'}`}
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
              {contactInfoItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="block text-white hover:text-[var(--golden)] transition-colors duration-300 group"
                  variants={infoItemVariants}
                  custom={index}
                >
                  <div className={`grid items-center gap-4 ${isRtl ? 'grid-cols-[1fr_auto] text-right' : 'grid-cols-[auto_1fr] text-left'}`}>
                    <div className={`w-12 h-12 rounded-full bg-[var(--golden)] bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-300 ${isRtl ? 'order-2' : 'order-1'}`}>
                      <div className="text-gray-950 transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className={`${isRtl ? 'order-1' : 'order-2'}`}>
                      <p className="font-medium text-sm text-gray-400">{t(item.title)}</p>
                      {item.id === 1 && Array.isArray(item.content) ? (
                        // Phone numbers with individual hrefs
                        <div className="font-semibold space-y-1">
                          {(item.content as Array<{ number: string; href: string }>).map((phone, idx) => (
                            <div key={idx}>
                              <a 
                                href={phone.href} 
                                className="hover:text-[var(--golden)] transition-colors block"
                                dir="ltr" 
                                style={{ textAlign: isRtl ? 'right' : 'left' }}
                              >
                                {phone.number}
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : item.id === 2 ? (
                        // Email with link
                        <a 
                          href={item.href || undefined}
                          className="font-semibold hover:text-[var(--golden)] transition-colors" 
                          dir="ltr" 
                          style={{ textAlign: isRtl ? 'right' : 'left' }}
                        >
                          {item.content as string}
                        </a>
                      ) : (
                        // Address (no link)
                        <p className="font-semibold">
                          {item.content as string}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
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
                    className={`w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent ${isRtl ? 'text-right' : 'text-left'}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  />
                </motion.div>
                
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className={`w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent ${isRtl ? 'text-right' : 'text-left'}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
                  />
                </motion.div>
                
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <textarea
                    placeholder={t('messagePlaceholder')}
                    rows={4}
                    className={`w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-3 px-4 text-gray-950 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent ${isRtl ? 'text-right' : 'text-left'}`}
                    dir={isRtl ? 'rtl' : 'ltr'}
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