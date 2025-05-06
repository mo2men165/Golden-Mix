'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const QualityCommitments: React.FC = () => {
  const t = useTranslations('quality');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [activeTab, setActiveTab] = useState<string>('testing');
  
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  // Quality testing processes
  const testingProcesses = [
    {
      id: 1,
      iconPath: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: t('aggregateTesting'),
      description: t('aggregateTestingDesc'),
      imagePath: "/images/aggregate.png",
    },
    {
      id: 2,
      iconPath: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: t('mixDesign'),
      description: t('mixDesignDesc'),
      imagePath: "/images/mix.png",
    },
    {
      id: 3,
      iconPath: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('strengthTesting'),
      description: t('strengthTestingDesc'),
      imagePath: "/images/strength.png",
    },
    {
      id: 4,
      iconPath: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: t('plantCalibration'),
      description: t('plantCalibrationDesc'),
      imagePath: "/images/calibration.png",
    },
  ];

  // Certifications and standards
  const certifications = [
    {
      id: 1,
      name: t('egyptianCode'),
      description: t('egyptianCodeDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "ASTM C494",
      description: t('astmDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "BS EN 933",
      description: t('bsEnDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: t('qualityManagement'),
      description: t('qualityManagementDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  // Our commitments
  const commitments = [
    {
      id: 1,
      title: t('qualityAssurance'),
      description: t('qualityAssuranceDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: t('continuousImprovement'),
      description: t('continuousImprovementDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 3,
      title: t('customerSatisfaction'),
      description: t('customerSatisfactionDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
    },
    {
      id: 4,
      title: t('environmentalResponsibility'),
      description: t('environmentalResponsibilityDesc'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container max-w-7xl mx-auto px-4">
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

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => setActiveTab('testing')}
              className={`px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors ${
                activeTab === 'testing'
                  ? 'bg-[var(--golden)] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {t('testingProcessesTab')}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
                activeTab === 'certifications'
                  ? 'bg-[var(--golden)] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {t('certificationsTab')}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('commitments')}
              className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
                activeTab === 'commitments'
                  ? 'bg-[var(--golden)] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {t('commitmentsTab')}
            </motion.button>
          </div>
        </div>

        {/* Testing Processes Tab Content */}
        {activeTab === 'testing' && (
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {testingProcesses.map((process, index) => (
              <motion.div
                key={process.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } bg-white rounded-xl overflow-hidden shadow-lg`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="md:w-1/2 relative">
                  {/* Using aspect-ratio utility to maintain a proper ratio */}
                  <div className="aspect-ratio-4/3 w-full">
                    <Image
                      src={process.imagePath}
                      alt={process.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '4/3', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="text-[var(--golden)] mr-3">
                      {process.iconPath}
                    </span>
                    <h3 className="text-2xl font-bold font-playfair">{process.title}</h3>
                  </div>
                  <p className="text-gray-700">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications Tab Content */}
        {activeTab === 'certifications' && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--golden)] bg-opacity-10 text-gray-950 mb-4">
                  {cert.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-playfair">{cert.name}</h3>
                <p className="text-gray-700">{cert.description}</p>
              </motion.div>
            ))}
            
            {/* Certification Image */}
            <motion.div
              className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-6 font-playfair text-center">
                {t('certificationEvidence')}
              </h3>
              <div className="relative w-full aspect-video">
                <Image
                  src="/images/certification.jpg"
                  alt={t('certificationEvidenceAlt')}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Commitments Tab Content */}
        {activeTab === 'commitments' && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {commitments.map((commitment) => (
                <motion.div
                  key={commitment.id}
                  className="bg-white p-6 rounded-xl shadow-lg"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--golden)] bg-opacity-10 text-gray-950 mr-4">
                      {commitment.icon}
                    </div>
                    <h3 className="text-xl font-bold font-playfair">{commitment.title}</h3>
                  </div>
                  <p className="text-gray-700">{commitment.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Quality Control Process */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 font-playfair text-center">
                {t('qualityControlProcess')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[var(--golden)] text-gray-950 text-2xl font-bold mb-4">
                    1
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t('qualityControlStep1')}</h4>
                  <p className="text-gray-700">{t('qualityControlStep1Desc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[var(--golden)] text-gray-950 text-2xl font-bold mb-4">
                    2
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t('qualityControlStep2')}</h4>
                  <p className="text-gray-700">{t('qualityControlStep2Desc')}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[var(--golden)] text-gray-950 text-2xl font-bold mb-4">
                    3
                  </div>
                  <h4 className="text-lg font-bold mb-2">{t('qualityControlStep3')}</h4>
                  <p className="text-gray-700">{t('qualityControlStep3Desc')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QualityCommitments;