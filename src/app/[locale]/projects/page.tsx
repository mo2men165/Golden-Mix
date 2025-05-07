import { getTranslations } from 'next-intl/server';
import ContactCTA from '@/components/Home/ContactCTA';
import PartnersSection from '@/components/Home/PartnersSection';
import ProjectsShowcase from '@/components/projects/ProjectShowcase';
import FeaturedProjects from '@/components/projects/FeaturedProjects';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projectsPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function Projects() {
  return (
    <>
    <ProjectsShowcase />
    <FeaturedProjects />
    {/* <PartnersSection /> */}
    <ContactCTA />
    </>
  );
}