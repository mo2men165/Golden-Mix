'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Search, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { getProjects } from '@/lib/queries';
import { urlFor } from '@/lib/sanity-image';
import { Project } from '@/types/project';

interface AllProjectsProps {
  projects?: Project[];
}

const AllProjects: React.FC<AllProjectsProps> = ({ projects: initialProjects }) => {
  const t = useTranslations('AllProjects');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Project categories
  const categories: string[] = ['all', 'residential', 'commercial', 'mall', 'compound'];
  
  // State for projects data
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  
  // State for active category and search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage: number = 6;

  // Fetch projects from Sanity if not provided as props
  useEffect(() => {
    if (!initialProjects) {
      const fetchProjects = async () => {
        try {
          const data = await getProjects();
          setProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProjects();
    }
  }, [initialProjects]);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Filter projects based on category and search query
  useEffect(() => {
    let results = projects;
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(project => project.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(project => 
        project.nameEn.toLowerCase().includes(query) || 
        project.nameAr.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredProjects(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [activeCategory, searchQuery, projects]);

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 md:pt-50 pt-40 md:py-24 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!projects.length) {
    return (
      <section className="py-16 md:pt-50 pt-40 md:py-24 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:pt-50 pt-40 md:py-24 bg-gray-50 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Background polygon elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-[5%] left-[2%] w-72 h-72 bg-[var(--golden)] rotate-[15deg]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[var(--golden)] rotate-[30deg]" />
      </motion.div>
      
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

        {/* Search and Filters */}
        <motion.div
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Search Bar */}
          <motion.div
            className="relative max-w-md mx-auto mb-8"
            variants={itemVariants}
          >
            <Search size={20} className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-gray-400`} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--golden)] focus:border-transparent`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-3 text-gray-400 hover:text-gray-600`}
              >
                <X size={20} />
              </button>
            )}
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            variants={containerVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 capitalize ${
                  activeCategory === category
                    ? 'bg-[var(--golden)] text-white border-[var(--golden)]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[var(--golden)]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                {t(`categories.${category}`)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {currentProjects.map((project) => (
              <motion.div
                key={project._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={urlFor(project.image).url()}
                    alt={isRtl ? project.nameAr : project.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[var(--golden)] text-white text-sm px-3 py-1 rounded-full">
                    {t(`categories.${project.category}`)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {isRtl ? project.nameAr : project.nameEn}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t('client')}: {project.client}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Location: <span className='font-bold text-black'>{project.location}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg text-gray-600">
              {t('noProjectsFound')}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 bg-[var(--golden)] text-white rounded-lg hover:bg-[var(--golden-dark)] transition-colors duration-300"
            >
              {t('resetFilters')}
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredProjects.length > projectsPerPage && (
          <motion.div
            className="flex justify-center mt-12 gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white shadow-md text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
              variants={itemVariants}
            >
              {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </motion.button>
            
            <motion.div
              className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md"
              variants={itemVariants}
            >
              <span className="text-gray-700">
                {currentPage} of {totalPages}
              </span>
            </motion.div>
            
            <motion.button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[var(--golden)] text-white hover:bg-[var(--golden-dark)]'
              }`}
              whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
              variants={itemVariants}
            >
              {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;