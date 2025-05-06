import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'About Golden Mix',
  description: 'Learn about Golden Mix, our history, mission, and values',
};

export default async function AboutLayout({
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