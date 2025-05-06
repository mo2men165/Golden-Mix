import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Contact Us - Golden Mix',
  description: 'Get in touch with Golden Mix for concrete solutions, construction inquiries, and project consultation',
};

export default async function ContactLayout({
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