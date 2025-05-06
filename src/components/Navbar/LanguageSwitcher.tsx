'use client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import ReactCountryFlag from 'react-country-flag';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  
  // The issue is in how we're extracting the path
  // We need to properly handle the locale pattern in the pathname
  
  // Get the path without the locale prefix
  let path = pathname;
  
  // Check if the current locale is in the pathname
  const localePattern = new RegExp(`^/(${locale})(/?|/.+)$`);
  const match = pathname.match(localePattern);
  
  if (match) {
    // If there's a match, extract the path after the locale
    path = match[2] || '/';
  }
  
  // This handles alternating between English and Arabic
  const alternateLocale = locale === 'en' ? 'ar' : 'en';
  
  return (
    <Link 
      href={path} 
      locale={alternateLocale}
      className="flex items-center px-3 py-2 rounded-full bg-white shadow border border-gray-200 hover:shadow-md transition-all duration-300"
    >
      {locale === 'en' ? (
        <>
          <ReactCountryFlag svg countryCode="EG" />
          <span className="font-medium ml-2 text-gray-800">العربية</span>
        </>
      ) : (
        <>
          <ReactCountryFlag svg countryCode="GB" />
          <span className="font-medium mr-2 text-gray-800">English</span>
        </>
      )}
    </Link>
  );
};

export default LanguageSwitcher;