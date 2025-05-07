'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronRight, ChevronLeft, Clock, MapPin, Building } from 'lucide-react';

// Define featured project interface
interface FeaturedProjectType {
  id: number;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  client: string;
  location: string;
  locationAr: string;
  year: string;
  category: string;
}

const FeaturedProjects: React.FC = () => {
  const t = useTranslations('featuredProjects');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Featured projects data
  const featuredProjects: FeaturedProjectType[] = [
    {
      id: 1,
      title: "VENIA New Capital",
      titleAr: "كومبوند فينيا العاصمة الإدارية الجديدة",
      subtitle: "Iconic Residential Compound",
      subtitleAr: "مجمع سكني متميز",
      description: "A premium residential compound featuring modern architectural design, spanning over 10,000 square meters with high-quality concrete structures and sustainable building practices.",
      descriptionAr: "مجمع سكني فاخر يتميز بتصميم معماري حديث، يمتد على مساحة 10,000 متر مربع مع هياكل خرسانية عالية الجودة وممارسات بناء مستدامة.",
      image: "/images/venia.jpg",
      client: "Gates Development",
      location: "New Administrative Capital, Egypt",
      locationAr: "العاصمة الإدارية الجديدة، مصر",
      year: "2023",
      category: "compound"
    },
    {
      id: 2,
      title: "Mall West Gate October",
      titleAr: "مول ويست جيت 6 أكتوبر",
      subtitle: "Commercial Shopping Center",
      subtitleAr: "مركز تسوق تجاري",
      description: "A state-of-the-art commercial mall with 120,000 square meters of retail space, featuring specialized concrete flooring, earthquake-resistant structures, and custom concrete architectural elements.",
      descriptionAr: "مول تجاري متطور بمساحة 120,000 متر مربع من مساحات البيع بالتجزئة، يتميز بأرضيات خرسانية متخصصة وهياكل مقاومة للزلازل وعناصر معمارية خرسانية مخصصة.",
      image: "/images/westgate.jpg",
      client: "Tatweer Misr",
      location: "6th of October City, Egypt",
      locationAr: "مدينة 6 أكتوبر، مصر",
      year: "2022",
      category: "mall"
    },
    {
      id: 3,
      title: "Catalan New Capital",
      titleAr: "مشروع كتالان العاصمة الإدارية الجديدة",
      subtitle: "Luxury Residential Complex",
      subtitleAr: "مجمع سكني فاخر",
      description: "An exclusive residential project featuring premium concrete infrastructure, custom facades, and integrated amenities across 50,000 square meters of developed space.",
      descriptionAr: "مشروع سكني حصري يتميز ببنية تحتية خرسانية متميزة وواجهات مخصصة ومرافق متكاملة عبر 50,000 متر مربع من المساحة المطورة.",
      image: "/images/catalan.jpg",
      client: "AFAAQ Developments",
      location: "New Administrative Capital, Egypt",
      locationAr: "العاصمة الإدارية الجديدة، مصر",
      year: "2023",
      category: "residential"
    }
  ];
  
  // State for active featured project
  const [activeProject, setActiveProject] = useState<number>(0);
  
  // Handle navigation
  const handlePrevious = () => {
    setActiveProject(prev => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveProject(prev => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

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
        duration: 0.7,
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

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;
  const currentProject = featuredProjects[activeProject];

  return (
    <section className="py-20 bg-white relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-100 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2">
          <div className="w-full h-full bg-repeat opacity-10" />
        </div>
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

        {/* Featured Project Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-center">
          {/* Project Image */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={currentProject.image}
                alt={isRtl ? currentProject.titleAr : currentProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Image overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-[var(--golden)] text-white text-sm px-3 py-1 rounded-full inline-block mb-3">
                  {t(`categories.${currentProject.category}`)}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {isRtl ? currentProject.titleAr : currentProject.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base">
                  {isRtl ? currentProject.subtitleAr : currentProject.subtitle}
                </p>
              </div>
            </div>

            {/* Project Indicators */}
            <div className="absolute -bottom-6 left-6 flex space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeProject === index ? 'bg-[var(--golden)]' : 'bg-gray-300'
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                {isRtl ? currentProject.titleAr : currentProject.title}
              </h3>
              <p className="text-[var(--golden)] font-medium mb-6">
                {isRtl ? currentProject.subtitleAr : currentProject.subtitle}
              </p>
              
              <p className="text-gray-700 mb-8">
                {isRtl ? currentProject.descriptionAr : currentProject.description}
              </p>
              
              {/* Project Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Building size={20} className="text-[var(--golden)] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('client')}</p>
                    <p className="font-medium">{currentProject.client}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-[var(--golden)] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('location')}</p>
                    <p className="font-medium">
                      {isRtl ? currentProject.locationAr : currentProject.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-[var(--golden)] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('year')}</p>
                    <p className="font-medium">{currentProject.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-[var(--golden)] flex items-center justify-center text-white mr-3">
                    <span className="text-xs font-bold">C</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('category')}</p>
                    <p className="font-medium capitalize">
                      {t(`categories.${currentProject.category}`)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href={`/projects/${currentProject.id}`}>
                  <motion.button
                    className="px-6 py-3 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-white font-medium rounded-lg transition-colors duration-300 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('viewProjectDetails')}
                    <ChevronIcon size={18} className="ml-2" />
                  </motion.button>
                </Link>
                
                {/* Navigation Arrows */}
                <div className="flex gap-2 ml-auto">
                  <motion.button
                    onClick={handlePrevious}
                    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 border border-gray-200"
                    whileHover={{ scale: 1.1, backgroundColor: '#F3F4F6' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-[var(--golden)] shadow-md flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--golden-dark)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom Project Thumbnails */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                activeProject === index
                  ? 'ring-4 ring-[var(--golden)] ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
              variants={itemVariants}
            >
              <Image
                src={project.image}
                alt={isRtl ? project.titleAr : project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-sm font-medium px-2 text-center">
                  {isRtl ? project.titleAr : project.title}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;