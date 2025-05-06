'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, MapPin, Star } from 'lucide-react';

const FeaturedProjectsGallery: React.FC = () => {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  
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

  // Project data based on the screenshot
  const projects = [
    {
      id: 1,
      nameEn: "VENIA New Capital",
      nameAr: "كمبوند فينيا العاصمة الإدارية الجديد",
      image: "/images/venia.jpg",
      location: "New Capital",
    },
    {
      id: 2,
      nameEn: "Compound Lugar New Zayed",
      nameAr: "كمبوند لوجار زايد الجديدة",
      image: "/images/lugar.webp",
      location: "New Zayed",
    },
    {
      id: 3,
      nameEn: "Catalan New Capital",
      nameAr: "مشروع كتالان العاصمة الادارية الجديدة",
      image: "/images/catalan.jpg",
      location: "New Capital",
    },
    {
      id: 4,
      nameEn: "Plaza Espana Sheikh Zayed",
      nameAr: "مول بلازا اسبانيا الشيخ زايد",
      image: "/images/plaza.jpg",
      location: "Sheikh Zayed",
    },
    {
      id: 5,
      nameEn: "Mall West Gate October",
      nameAr: "مول ويست جيت 6 أكتوبر",
      image: "/images/westgate.jpg",
      location: "6th October",
    },
    {
      id: 6,
      nameEn: "Mall Space October",
      nameAr: "مول سبيس أكتوبر",
      image: "/images/spaceMall.webp",
      location: "October",
    },
    {
      id: 7,
      nameEn: "AUDAZ New Capital",
      nameAr: "مول اوداز بالعاصمة الإدارية الجديدة",
      image: "/images/audaz.webp",
      location: "New Capital",
    },
  ];

  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const getVisibleProjects = () => {
    const startIdx = currentPage * projectsPerPage;
    return projects.slice(startIdx, startIdx + projectsPerPage);
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Use a state for animated stars
  const [stars] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random position from 0-100%
      y: Math.random() * 100,
      size: Math.random() * 6 + 2, // random size from 2-8px
      duration: Math.random() * 5 + 5, // random duration from 5-10s
      delay: Math.random() * 2,
    }))
  );
  
  // Create a canvas-inspired grid pattern
  const gridLines = Array.from({ length: 5 }, (_, i) => i * 20); // 0, 20, 40, 60, 80

  return (
    <section className="py-16 md:py-24 overflow-hidden relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Creative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Grid Lines */}
        {gridLines.map((position, i) => (
          <React.Fragment key={`grid-x-${i}`}>
            <motion.div 
              className="absolute left-0 right-0 h-px bg-[var(--golden)]"
              style={{ top: `${position}%` }}
              initial={{ opacity: 0.05, scaleX: 0 }}
              animate={{ 
                opacity: [0.05, 0.1, 0.05], 
                scaleX: 1,
              }}
              transition={{ 
                opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                scaleX: { duration: 2, ease: "easeOut" } 
              }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 w-px bg-[var(--golden)]"
              style={{ left: `${position}%` }}
              initial={{ opacity: 0.05, scaleY: 0 }}
              animate={{ 
                opacity: [0.05, 0.1, 0.05], 
                scaleY: 1 
              }}
              transition={{ 
                opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
                scaleY: { duration: 2, ease: "easeOut" } 
              }}
            />
          </React.Fragment>
        ))}
        
        {/* Animated Stars */}
        {stars.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-[var(--golden)]"
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Golden Accent Glow */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(218, 165, 32, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />
        
        {/* Geometric Arc */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,100 Q50,0 100,100"
            stroke="var(--golden)"
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,0 Q50,100 100,0"
            stroke="var(--golden)"
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
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
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 heading-underline relative inline-block"
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
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </motion.div>

        {/* Projects Gallery with Smooth Perspective Effect */}
        <div className="mb-16">
          <div className="relative overflow-hidden">
            <div className="w-full perspective-1000">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div 
                  key={currentPage}
                  custom={direction}
                  initial={{ 
                    opacity: 0,
                    rotateY: direction * 45
                  }}
                  animate={{ 
                    opacity: 1,
                    rotateY: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    rotateY: direction * -45
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                  }}
                  className="w-full flex flex-wrap md:flex-nowrap gap-6 justify-center items-stretch"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {getVisibleProjects().map((project, index) => (
                    <motion.div 
                      key={project.id} 
                      className="w-full md:w-1/3 lg:w-1/3"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.2,
                          duration: 0.7
                        }
                      }}
                    >
                      <motion.div 
                        className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-[0_0_15px_rgba(218,165,32,0.2)] border border-[var(--golden)]/20 group relative hover:shadow-[0_0_25px_rgba(218,165,32,0.4)] transition-all duration-300"
                        whileHover={{ 
                          y: -10,
                          scale: 1.02,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                            <Link href="/projects">
                              <motion.div 
                                className="px-6 py-3 bg-[var(--golden)] text-gray-900 font-medium rounded-lg inline-flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {t('viewDetails')}
                                <span className={`${isRtl ? 'mr-2' : 'ml-2'}`}>
                                  <ArrowIcon size={16} />
                                </span>
                              </motion.div>
                            </Link>
                          </div>
                          <Image
                            src={project.image}
                            alt={isRtl ? project.nameAr : project.nameEn}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90"
                            style={{ objectPosition: 'center' }}
                          />
                          <div className="absolute top-4 right-4 bg-[var(--golden)] text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center shadow-lg">
                            <MapPin size={12} className={`${isRtl ? 'ml-1' : 'mr-1'}`} />
                            {project.location}
                          </div>
                          
                          {/* Angle Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--golden)]/20 to-transparent opacity-50"></div>
                          
                          {/* Bottom Glow */}
                          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[var(--golden)]/30 to-transparent"></div>
                        </div>
                        
                        <div className="p-6 relative">
                          {/* Background Hexagon Pattern */}
                          <div className="absolute top-0 left-0 w-full h-full opacity-5">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <pattern id={`hex-pattern-${project.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M10,0 L20,5 L20,15 L10,20 L0,15 L0,5 Z" fill="var(--golden)" />
                              </pattern>
                              <rect width="100%" height="100%" fill={`url(#hex-pattern-${project.id})`} />
                            </svg>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-2 font-playfair relative">
                            {isRtl ? project.nameAr : project.nameEn}
                          </h3>
                          
                          <div className="w-16 h-1 bg-[var(--golden)] mb-4 opacity-80 relative" />
                          
                          <p className="text-gray-300 mb-4 line-clamp-2 relative">
                            {t(`projectDescription.${project.id}`)}
                          </p>
                          
                          <Link 
                            href="/projects"
                            className="inline-flex items-center text-[var(--golden)] font-medium group relative"
                          >
                            {t('readMore')}
                            <motion.span 
                              className={`${isRtl ? 'mr-2' : 'ml-2'} transform ${isRtl ? 'rotate-180' : ''}`}
                              initial={{ x: 0 }}
                              whileHover={{ x: isRtl ? -5 : 5 }}
                              transition={{ duration: 0.3 }}
                            >
                              →
                            </motion.span>
                          </Link>
                        </div>
                        
                        {/* Glowing Corner */}
                        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                          <div className="absolute w-4 h-20 bg-[var(--golden)] opacity-20 rotate-45 -translate-y-8 -translate-x-8"></div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-10 gap-4">
              <motion.button
                onClick={handlePrevious}
                className="w-12 h-12 mb-4 rounded-full bg-gray-800 shadow-md flex items-center justify-center text-white border border-[var(--golden)]/30"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 0 15px rgba(218,165,32,0.4)',
                  borderColor: 'rgba(218,165,32,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[var(--golden)] shadow-md flex items-center justify-center text-gray-900"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 0 15px rgba(218,165,32,0.7)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </motion.button>
            </div>
            
            {/* Page Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-3 h-3 rounded-full ${currentPage === i ? 'bg-[var(--golden)]' : 'bg-gray-600'}`}
                  onClick={() => {
                    setDirection(i > currentPage ? 1 : -1);
                    setCurrentPage(i);
                  }}
                  whileHover={{ scale: 1.2 }}
                  animate={currentPage === i ? 
                    { scale: [1, 1.2, 1], boxShadow: '0 0 8px rgba(218,165,32,0.7)' } : 
                    {}
                  }
                  transition={{ duration: 0.5, repeat: currentPage === i ? Infinity : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* View All Projects Button */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-3 bg-transparent border-2 border-[var(--golden)] text-[var(--golden)] font-medium rounded-lg transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                boxShadow: '0 0 20px rgba(218,165,32,0.4)'
              }}
            >
              <span className="relative z-10 group-hover:text-gray-900 transition-colors duration-300">
                {t('viewAllProjects')}
              </span>
              <motion.div 
                className="absolute inset-0 bg-[var(--golden)]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
                style={{ transformOrigin: 'center' }}
              />
            </motion.button>
          </Link>
          
          {/* Decorative Stars */}
          <div className="flex justify-center mt-4 gap-1 opacity-70">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className="text-[var(--golden)]"
                fill="var(--golden)"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsGallery;