import AutoScrollWrapper from '@/components/Home/AutoScrollWrapper';
import ContactCTA from '@/components/Home/ContactCTA';
import FeaturedProjectsGallery from '@/components/Home/FeaturedProjectsGallery';
import FeaturedServicesSection from '@/components/Home/FeaturedServicesSection';
import HeroSection from '@/components/Home/HeroSection';
import IntroductionSection from '@/components/Home/IntroductionSection';
import PartnersSection from '@/components/Home/PartnersSection';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function Home() {
  return (
    <>
      <AutoScrollWrapper>
        <HeroSection />
        <IntroductionSection />
        <FeaturedServicesSection />
        <FeaturedProjectsGallery />
        <PartnersSection />
        <ContactCTA />
      </AutoScrollWrapper>
    </>
  );
}