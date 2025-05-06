import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';

import { contactInfo, navLinks } from '@/constants';

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const isRtl = locale === 'ar';

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
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                  <MapPin size={20} className="text-gray-950" />
                </div>
                <span className="text-golden-dark text-sm">
                  {locale === 'en' ? contactInfo.address.en : contactInfo.address.ar}
                </span>
              </li>
              <li className="flex items-center">
                <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                  <Phone size={20} className="text-gray-950" />
                </div>
                <div>
                  <a 
                    href={`tel:${contactInfo.phones[0]}`}
                    className="text-golden-dark hover:text-golden-light transition-all duration-300 text-sm"
                  >
                    {contactInfo.phones[0]}
                  </a>
                  {" - "}
                  <a 
                    href={`tel:${contactInfo.phones[1]}`}
                    className="text-golden-dark hover:text-golden-light transition-all duration-300 text-sm"
                  >
                    {contactInfo.phones[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                  <Mail size={20} className="text-gray-950" />
                </div>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-golden-dark hover:text-golden-light transition-all duration-300 text-sm"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <div className={`bg-golden-dark p-2.5 rounded-full flex-shrink-0 shadow-sm ${isRtl ? "ml-3" : "mr-3"}`}>
                  <Clock size={20} className="text-gray-950" />
                </div>
                <span className="text-golden-dark text-sm mt-2">
                  {locale === 'en' ? contactInfo.workingHours.en : contactInfo.workingHours.ar}
                </span>
              </li>
            </ul>
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