import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Services - Golden Mix',
  description: 'Explore Golden Mix services including ready mix concrete, interlocking, precast concrete, and more',
};

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function ServicesLayout({
  children,
  params: { locale }
}: LayoutProps) {
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