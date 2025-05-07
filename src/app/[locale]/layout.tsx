import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] });

// Define supported locales
const locales = ['en', 'ar'];

export const metadata: Metadata = {
  title: 'Golden Mix',
  description: 'Premier construction and design services',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params to get the locale
  const { locale } = await params;
  
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // Get the messages for the current locale
  const messages = await getMessages();

  // Determine if the current locale is RTL (Right-to-Left)
  const isRtl = locale === 'ar';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`flex flex-col min-h-screen ${inter.className}`} dir={isRtl ? 'rtl' : 'ltr'}>
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}