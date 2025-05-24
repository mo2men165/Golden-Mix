'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getContactInfo } from '@/lib/queries';
import { ContactInfo } from '@/types/contactInfo';

interface ContactHeroProps {
  contactInfo?: ContactInfo | null;
}

const ContactHero: React.FC<ContactHeroProps> = ({ contactInfo: initialContactInfo }) => {
  const t = useTranslations('contactHero');
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
          setContactInfo(data as unknown as ContactInfo);
        } catch (error) {
          console.error('Error fetching contact info:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchContactInfo();
    }
  }, [initialContactInfo]);

  // Collect all available phone numbers
  const phoneNumbers: string[] = contactInfo ? [
    contactInfo.phoneNumber1,
    contactInfo.phoneNumber2,
    contactInfo.phoneNumber3,
  ].filter((phone): phone is string => phone != null && phone.trim() !== '') : [];
  
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
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative pt-36 md:pt-40 lg:pt-52 pb-16 md:pb-24 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero-bg.jpg"
            alt="Golden Mix Concrete"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/4 mx-auto mb-3"></div>
            <div className="h-16 bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto mb-8"></div>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="h-12 bg-gray-700 rounded w-48"></div>
              <div className="h-12 bg-gray-700 rounded w-64"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative pt-36 md:pt-40 lg:pt-52 pb-16 md:pb-24 overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-hero-bg.jpg"
          alt="Golden Mix Concrete"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-[var(--golden)] opacity-20 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-80 bg-[var(--golden)] opacity-20 rounded-tr-full" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-[var(--golden)] font-medium mb-3 text-lg"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>
          <motion.h1
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            {t('title')} <span className="text-[var(--golden)]">{t('titleHighlight')}</span>
          </motion.h1>
          <motion.p
            className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
          
          {/* Quick Contact Info */}
          {contactInfo && (
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-8"
              variants={itemVariants}
            >
              {/* Phone Numbers */}
              {phoneNumbers.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white border border-white/20">
                  <span className={`font-medium ${isRtl ? "ml-2" : "mr-2"}`}>
                    {t('phone')}:
                  </span>
                  <div className="inline" dir="ltr" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    {phoneNumbers.map((phone, index) => (
                      <span key={index}>
                        <a 
                          href={`tel:${phone}`}
                          className="hover:text-[var(--golden)] transition-colors"
                        >
                          {phone}
                        </a>
                        {index < phoneNumbers.length - 1 && (
                          <span className="text-white"> - </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Email */}
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white border border-white/20">
                <span className={`font-medium ${isRtl ? "ml-2" : "mr-2"}`}>
                  {t('email')}:
                </span>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-[var(--golden)] transition-colors"
                  dir="ltr"
                  style={{ textAlign: isRtl ? 'right' : 'left' }}
                >
                  {contactInfo.email}
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;