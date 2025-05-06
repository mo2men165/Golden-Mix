import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'About Golden Mix',
  description: 'Learn about Golden Mix, our history, mission, and values',
};

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function AboutLayout({
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