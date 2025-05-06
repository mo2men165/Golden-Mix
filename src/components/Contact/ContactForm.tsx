'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const t = useTranslations('contactForm');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If successful
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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
  
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t('title')}
        </h2>
        <p className="text-gray-600">
          {t('subtitle')}
        </p>
      </motion.div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('nameLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent transition-all duration-300"
              placeholder={t('namePlaceholder')}
            />
          </motion.div>
          
          {/* Email Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('emailLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent transition-all duration-300"
              placeholder={t('emailPlaceholder')}
            />
          </motion.div>
          
          {/* Phone Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t('phoneLabel')} <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent transition-all duration-300"
              placeholder={t('phonePlaceholder')}
            />
          </motion.div>
          
          {/* Subject Input */}
          <motion.div variants={itemVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              {t('subjectLabel')} <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent transition-all duration-300"
            >
              <option value="" disabled>
                {t('subjectPlaceholder')}
              </option>
              <option value="concrete">{t('subjectOptions.concrete')}</option>
              <option value="project">{t('subjectOptions.project')}</option>
              <option value="consultation">{t('subjectOptions.consultation')}</option>
              <option value="support">{t('subjectOptions.support')}</option>
              <option value="other">{t('subjectOptions.other')}</option>
            </select>
          </motion.div>
        </div>
        
        {/* Message Textarea */}
        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {t('messageLabel')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent transition-all duration-300"
            placeholder={t('messagePlaceholder')}
          />
        </motion.div>
        
        {/* Submit Button */}
        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg text-white font-medium flex items-center justify-center min-w-[180px] ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[var(--golden)] hover:bg-[var(--golden-dark)]'
            } transition-colors duration-300`}
            whileHover={!isSubmitting ? { scale: 1.03 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">{t('submitting')}</span>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : (
              <>
                <span>{t('submitButton')}</span>
                <Send size={18} className={`${isRtl ? 'mr-2' : 'ml-2'}`} />
              </>
            )}
          </motion.button>
          
          {/* Form Status Messages */}
          {formStatus === 'success' && (
            <motion.div
              className="mt-4 px-4 py-2 bg-green-50 text-green-700 rounded-lg flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Check size={18} className="mr-2" />
              <span>{t('successMessage')}</span>
            </motion.div>
          )}
          
          {formStatus === 'error' && (
            <motion.div
              className="mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-lg flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle size={18} className="mr-2" />
              <span>{t('errorMessage')}</span>
            </motion.div>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;