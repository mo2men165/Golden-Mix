import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects - Golden Mix',
  description: 'Discover Golden Mix projects showcasing our concrete solutions and expertise in construction',
};

export default async function ProjectsLayout({
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