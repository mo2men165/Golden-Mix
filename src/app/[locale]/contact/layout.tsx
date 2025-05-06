import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Contact Us - Golden Mix',
  description: 'Get in touch with Golden Mix for concrete solutions, construction inquiries, and project consultation',
};

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function ContactLayout({
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