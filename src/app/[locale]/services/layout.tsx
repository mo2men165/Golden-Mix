import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Services - Golden Mix',
  description: 'Explore Golden Mix services including ready mix concrete, interlocking, precast concrete, and more',
};

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params to get the locale
  const { locale } = await params;
  
  // Validate that the locale is supported
  const locales = ['en', 'ar'];
  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <>
      {children}
    </>
  );
}