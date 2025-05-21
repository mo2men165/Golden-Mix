'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Facebook, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getContactInfo } from '@/lib/queries';
import { ContactInfo } from '@/types/contactInfo';

// Import your nav links (assuming you want to keep these from constants)
import { navLinks } from '@/constants';

interface FooterProps {
  contactInfo?: ContactInfo | null;
}

const Footer: React.FC<FooterProps> = ({ contactInfo: initialContactInfo }) => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
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

  // Social media links (you might want to move these to Sanity too)
  const socialLinks = [
    {
      id: 'whatsapp',
      href: phoneNumbers.length > 0 ? 
        `https://wa.me/${phoneNumbers[0]!.replace(/\D/g, '')}?text=Hello Golden Mix! I'm interested in your services.` : 
        '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      label: 'WhatsApp'
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/golden-max-28aa61366/?trk=public-profile-join-page', // Replace with actual LinkedIn URL
      icon: <Linkedin size={20} />,
      label: 'LinkedIn'
    },
    {
      id: 'facebook',
      href: 'https://www.facebook.com/share/1AGzbUQ7vj/?mibextid=wwXIfr', // Replace with actual Facebook URL
      icon: <Facebook size={20} />,
      label: 'Facebook'
    }
  ];

  // Loading state
  if (loading) {
    return (
      <footer className="bg-gray-900 pt-20 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1">
              <div className="h-28 bg-gray-700 rounded mb-6"></div>
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-700 rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded w-2/3"></div>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 pt-20 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Company Logo and Brief */}
          <div className="col-span-1 max-w-xs mx-auto md:mx-0">
            <Link href="/" locale={locale}>
              <div className="relative h-28 w-72 mx-auto md:mx-0 mb-6">
                <Image 
                  src="/images/logo-removebg-preview.png" 
                  alt="Golden Mix" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[var(--golden)] hover:bg-[var(--golden-dark)] text-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 max-w-xs mx-auto md:mx-0">
            <h3 className="text-xl font-bold mb-6 relative inline-block heading-underline">
              <span className="text-gradient">
                {locale === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </span>
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.url}
                    locale={locale}
                    className="text-golden-dark w-fit hover:text-golden-light transition-all duration-300 text-md flex items-center"
                  >
                    <span className={isRtl ? "ml-2" : "mr-2"}>›</span>
                    {locale === 'en' ? link.titleEn : link.titleAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="col-span-1 max-w-xs mx-auto md:mx-0">
            <h3 className="text-xl font-bold mb-6 relative inline-block heading-underline">
              <span className="text-gradient">
                {t('contactUs')}
              </span>
            </h3>
            
            {contactInfo && (
              <ul className="space-y-5">
                {/* Address */}
                <li className="flex items-start">
                  <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                    <MapPin size={20} className="text-gray-950" />
                  </div>
                  <span className="text-golden-dark text-sm">
                    {locale === 'en' ? contactInfo.addressEn : contactInfo.addressAr}
                  </span>
                </li>
                
                {/* Phone Numbers */}
                {phoneNumbers.length > 0 && (
                  <li className="flex items-center">
                    <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                      <Phone size={20} className="text-gray-950" />
                    </div>
                    <div dir="ltr" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                      {phoneNumbers.map((phone, index) => (
                        <span key={index}>
                          <a 
                            href={`tel:${phone}`}
                            className="text-golden-dark hover:text-golden-light transition-all duration-300 text-sm"
                          >
                            {phone}
                          </a>
                          {index < phoneNumbers.length - 1 && (
                            <span className="text-golden-dark text-sm"> - </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </li>
                )}
                
                {/* Email */}
                <li className="flex items-center">
                  <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                    <Mail size={20} className="text-gray-950" />
                  </div>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-golden-dark hover:text-golden-light transition-all duration-300 text-sm"
                    dir="ltr"
                    style={{ textAlign: isRtl ? 'right' : 'left' }}
                  >
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-golden-dark text-lg">
            © {currentYear} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;