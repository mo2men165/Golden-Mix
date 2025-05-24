'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { getPartners } from '@/lib/queries';
import { urlFor } from '@/lib/sanity-image';
import { Partner } from '@/types/partner';

interface PartnersSectionProps {
  partners?: Partner[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ 
  partners: initialPartners 
}) => {
  const t = useTranslations('partners');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [partners, setPartners] = useState<Partner[]>(initialPartners || []);
  const [loading, setLoading] = useState(!initialPartners);

  // Client-side only code
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set mounted after a small delay to allow for smooth transitions
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Fetch partners from Sanity only if not provided as props
  useEffect(() => {
    if (!initialPartners) {
      const fetchPartners = async () => {
        try {
          const data = await getPartners();
          setPartners(data);
        } catch (error) {
          console.error('Error fetching partners:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPartners();
    }
  }, [initialPartners]);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Loading partners...</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!partners.length) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">No partners available at the moment.</p>
        </div>
      </section>
    );
  }

  const getImageSize = (partnerName: string) => {
  const name = partnerName.toLowerCase();
  
  // Zaya - scale 200 (keeping your custom scale-200 class)
  if (name.includes('zaya') || name.includes('زايا')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-200"
    };
  }
  
  // Gates - scale 150
  if (name.includes('gates') || name.includes('جيتس')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-150"
    };
  }
  
  // Nabny - scale 150
  if (name.includes('nabny') || name.includes('نبني')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-120"
    };
  }
  
  // Tatweer - scale 150
  if (name.includes('tatweer') || name.includes('تطوير مصر')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-150"
    };
  }
  
  // Madaen - scale 150
  if (name.includes('madaeen') || name.includes('مدائن')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-150"
    };
  }
  
  // Alostaz - scale 120
  if (name.includes('alostaz') || name.includes('الأستاذ')) {
    return {
      width: 200,
      height: 120,
      className: "object-contain max-w-full max-h-full scale-120"
    };
  }
  
  // Afaaq - no scale (default)
  if (name.includes('afaaq') || name.includes('آفاق')) {
    return {
      width: 160,
      height: 100,
      className: "object-contain max-w-full max-h-full"
    };
  }
  
  // Default size for other partners
  return {
    width: 160,
    height: 100,
    className: "object-contain max-w-full max-h-full"
  };
};

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Simple background pattern only on desktop */}
      {!isMobile && isClient && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(45deg, var(--golden) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
      )}
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-opacity duration-500 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[var(--golden)] font-medium mb-2">
            {t('subheading')}
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 relative inline-block">
            {t('heading')}
            <span className="text-[var(--golden)]"> {t('headingHighlight')}</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => {
            // Check if logo has a proper asset reference
            let imageUrl;
            if (partner.logo?.asset?._ref) {
              imageUrl = urlFor(partner.logo).url();
            } else if (partner.logo?._upload?.previewImage) {
              // Use the preview image if available (for images still being uploaded)
              imageUrl = partner.logo._upload.previewImage;
            } else {
              // Fallback placeholder image
              imageUrl = '/images/placeholder-logo.png';
            }

            return (
              <div
                key={partner._id}
                className={`rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col items-center bg-white h-full transition-all duration-500 ease-in-out ${
                  mounted 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                // Using CSS variables for delay to avoid the animation/animationDelay conflict
                style={{
                  '--delay': `${Math.min(index * 0.1, 0.7)}s`,
                  transitionDelay: mounted ? 'var(--delay)' : '0s'
                } as React.CSSProperties}
              >
                <div className="w-full h-40 md:h-48 relative mb-0 bg-gray-700 p-4 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {(() => {
                      const imageSize = getImageSize(isRtl ? partner.nameAr : partner.name);
                      return (
                        <Image
                          src={imageUrl}
                          alt={isRtl ? partner.nameAr : partner.name}
                          width={imageSize.width}
                          height={imageSize.height}
                          className={imageSize.className}
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder-logo.png';
                          }}
                        />
                      );
                    })()}
                  </div>
                </div>
                
                <div className="bg-white w-full p-6 flex flex-col items-center flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 font-playfair text-center">
                    {isRtl ? partner.nameAr : partner.name}
                  </h3>
                  
                  <div className="w-12 h-1 bg-[var(--golden)] mb-3"></div>
                  
                  <p className="text-gray-600 text-center text-sm md:text-base">
                    {isRtl ? partner.descriptionAr : partner.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;