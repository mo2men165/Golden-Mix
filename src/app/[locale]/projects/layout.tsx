import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Projects - Golden Mix',
  description: 'Discover Golden Mix projects showcasing our concrete solutions and expertise in construction',
};

export default async function ProjectsLayout({
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