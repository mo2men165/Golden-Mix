import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Contact Us - Golden Mix',
  description: 'Get in touch with Golden Mix for concrete solutions, construction inquiries, and project consultation',
};

export default async function ContactLayout({
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