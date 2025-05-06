import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects - Golden Mix',
  description: 'Discover Golden Mix projects showcasing our concrete solutions and expertise in construction',
};

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function ProjectsLayout({
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