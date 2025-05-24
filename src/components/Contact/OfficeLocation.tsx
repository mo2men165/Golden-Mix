'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { getContactInfo } from '@/lib/queries';
import { ContactInfo } from '@/types/contactInfo';

interface OfficeLocationProps {
  contactInfo?: ContactInfo | null;
}

const OfficeLocation: React.FC<OfficeLocationProps> = ({ contactInfo: initialContactInfo }) => {
  const t = useTranslations('officeLocation');
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

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto mb-2"></div>
            <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="bg-gray-300 rounded-xl h-[450px] animate-pulse"></div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex">
                    <div className="w-10 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-12 bg-gray-300 rounded w-40"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-lg h-[450px]"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3451.7737051828644!2d30.869591775555854!3d30.100666674895354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA2JzAyLjQiTiAzMMKwNTInMTkuOCJF!5e0!3m2!1sen!2seg!4v1746555492107!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Golden Mix Office Location"
              className="w-full h-full"
            />
          </motion.div>
          
          {/* Office Details */}
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin size={24} className={`text-[var(--golden)] ${isRtl ? "ml-2" : "mr-2"}`} />
                {t('officeHeading')}
              </h3>
              
              {contactInfo && (
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex">
                    <div className={`w-10 flex-shrink-0 ${isRtl ? "ml-0" : "mr-0"}`}>
                      <div className="w-8 h-8 rounded-full bg-[var(--golden)]/10 flex items-center justify-center">
                        <MapPin size={16} className="text-[var(--golden)]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t('addressLabel')}</p>
                      <p className="font-medium text-gray-800">
                        {locale === 'en' ? contactInfo.addressEn : contactInfo.addressAr}
                      </p>
                    </div>
                  </div>
                  
                  {/* Phone Numbers */}
                  {phoneNumbers.length > 0 && (
                    <div className="flex">
                      <div className={`w-10 flex-shrink-0 ${isRtl ? "ml-0" : "mr-0"}`}>
                        <div className="w-8 h-8 rounded-full bg-[var(--golden)]/10 flex items-center justify-center">
                          <Phone size={16} className="text-[var(--golden)]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm mb-1">{t('phoneLabel')}</p>
                        <div dir="ltr" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                          {phoneNumbers.map((phone, index) => (
                            <span key={index}>
                              <a 
                                href={`tel:${phone}`}
                                className="font-medium text-gray-800 hover:text-[var(--golden)] transition-colors"
                              >
                                {phone}
                              </a>
                              {index < phoneNumbers.length - 1 && (
                                <span className="text-gray-800"> - </span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Email */}
                  <div className="flex">
                    <div className={`w-10 flex-shrink-0 ${isRtl ? "ml-0" : "mr-0"}`}>
                      <div className="w-8 h-8 rounded-full bg-[var(--golden)]/10 flex items-center justify-center">
                        <Mail size={16} className="text-[var(--golden)]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t('emailLabel')}</p>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="font-medium text-gray-800 hover:text-[var(--golden)] transition-colors"
                        dir="ltr"
                        style={{ textAlign: isRtl ? 'right' : 'left' }}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* Working Hours */}
                  <div className="flex">
                    <div className={`w-10 flex-shrink-0 ${isRtl ? "ml-0" : "mr-0"}`}>
                      <div className="w-8 h-8 rounded-full bg-[var(--golden)]/10 flex items-center justify-center">
                        <Clock size={16} className="text-[var(--golden)]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">{t('hoursLabel')}</p>
                      <p className="font-medium text-gray-800">
                        {t('workingHours')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Get Directions Button */}
              <motion.a
                href="https://maps.google.com/?q=30.1006667,30.8722083"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 px-6 py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('directionsButton')}
                <ExternalLink size={16} className={`${isRtl ? "mr-2" : "ml-2"}`} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;