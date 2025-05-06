import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Services - Golden Mix',
  description: 'Explore Golden Mix services including ready mix concrete, interlocking, precast concrete, and more',
};

export default async function ServicesLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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